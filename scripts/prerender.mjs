// Prerenders every route to static HTML after `vite build`.
//
//   dist/index.html            → /            (home)
//   dist/about/index.html      → /about       …and so on for each page
//   dist/404.html              → any unknown path
//
// Each file carries its own title, description, canonical, Open Graph and
// JSON-LD, the page's rendered markup (hydrated in the browser), and
// modulepreload hints for that page's JavaScript chunk. Also writes
// sitemap.xml (with each page's images), robots.txt and llms.txt.

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "vite";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const serverOut = path.join(dist, ".server");

// Route → the lazily loaded module that renders it (for modulepreload hints).
const routeModules = {
  "/": "src/components/home/HomeSections.tsx",
  "/about": "src/pages/About.tsx",
  "/collections": "src/pages/Collections.tsx",
  "/catalogue": "src/pages/Catalogue.tsx",
  "/fabrics": "src/pages/Fabrics.tsx",
  "/contact": "src/pages/Contact.tsx",
  "/404": "src/pages/NotFound.tsx",
};

// Route → the files that hold its main content. A page's sitemap <lastmod> is
// the date of the last commit that touched any of them.
const routeSources = {
  "/": ["src/pages/Home.tsx", "src/components/home", "src/content/home.ts", "src/content/shared.ts", "src/content/faq.ts", "src/data/models.json"],
  "/about": ["src/pages/About.tsx", "src/content/about.ts", "src/content/shared.ts"],
  "/collections": ["src/pages/Collections.tsx", "src/content/collections.ts", "src/data/models.json"],
  "/catalogue": ["src/pages/Catalogue.tsx", "src/components/catalogue", "src/content/catalogue.ts", "src/data/models.json"],
  "/fabrics": ["src/pages/Fabrics.tsx", "src/content/fabrics.ts", "src/content/shared.ts"],
  "/contact": ["src/pages/Contact.tsx", "src/content/contact.ts", "src/content/shared.ts", "src/content/faq.ts", "src/config/site.ts"],
};

const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();

/**
 * Last commit date (YYYY-MM-DD) for a route's content, or null when it can't
 * be known for certain: no git, files with uncommitted edits, or a shallow
 * clone whose history stops before the real change. A wrong date is worse
 * than none, so the sitemap simply leaves <lastmod> out then.
 */
function lastModified(route) {
  const files = routeSources[route];
  if (!files) return null;
  try {
    if (git("status", "--porcelain", "--", ...files)) return null;
    const [sha, date] = git("log", "-1", "--format=%H %cI", "--", ...files).split(" ");
    if (!sha) return null;
    const shallow = git("rev-parse", "--is-shallow-repository") === "true";
    if (shallow) {
      const boundary = git("rev-parse", "--git-path", "shallow");
      const cut = readFileSync(path.resolve(root, boundary), "utf8");
      if (cut.includes(sha)) return null;
    }
    return date.slice(0, 10);
  } catch {
    return null;
  }
}

const xmlEscape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

await build({
  root,
  logLevel: "warn",
  build: { ssr: "src/entry-server.tsx", outDir: serverOut, emptyOutDir: true, manifest: false, copyPublicDir: false },
});

const { render, renderHead, renderLlmsTxt, routePages } = await import(pathToFileURL(path.join(serverOut, "entry-server.js")).href);
const template = await readFile(path.join(dist, "index.html"), "utf8");
const manifest = JSON.parse(await readFile(path.join(dist, ".vite", "manifest.json"), "utf8"));

/** A chunk and its static imports, minus the main entry that every page already loads. */
function chunkFiles(key, seen = new Set()) {
  const entry = manifest[key];
  if (!entry || entry.isEntry || seen.has(key)) return [];
  seen.add(key);
  return [entry.file, ...(entry.imports ?? []).flatMap((k) => chunkFiles(k, seen))];
}

// Pages arrive fully rendered, so the hydration script can wait behind CSS,
// fonts and images.
const lowPriorityTemplate = template.replace(/<script type="module" crossorigin src=/, '<script type="module" crossorigin fetchpriority="low" src=');
if (lowPriorityTemplate === template) throw new Error("could not find the entry <script> in dist/index.html");

const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
const ROOT = '<div id="root"></div>';
if (!SEO_BLOCK.test(template) || !template.includes(ROOT)) throw new Error("dist/index.html is missing the SEO block or #root");

const models = JSON.parse(await readFile(path.join(root, "src/data/models.json"), "utf8")).models;
const pageImages = new Map();

let count = 0;
for (const page of routePages) {
  const url = page.path;
  const markup = await render(url);
  if (markup.includes("$RC") || /<div hidden id="S:/.test(markup)) throw new Error(`${url}: prerendered HTML contains streamed segments`);
  const preloads = [...new Set(chunkFiles(routeModules[url]))]
    .map((file) => `<link rel="modulepreload" crossorigin fetchpriority="low" href="/${file}" />`)
    .join("\n    ");
  // Content photos in the page (the logo is listed once, on the home page).
  const images = new Set(
    [...markup.matchAll(/<img\b[^>]*?\ssrc="(\/[^"]+)"/g)]
      .map((m) => m[1])
      .filter((src) => url === "/" || src !== "/photos/logo.png"),
  );
  // The catalogue grid is filled in the browser, so list every model photo.
  if (url === "/catalogue") for (const model of models) images.add(model.img);
  pageImages.set(url, [...images]);

  const routeAttr = page.key === "notFound" ? "*" : url;
  const html = lowPriorityTemplate
    .replace(SEO_BLOCK, `${renderHead(page.key)}\n    ${preloads}`)
    .replace(ROOT, `<div id="root" data-route="${routeAttr}">${markup}</div>`);

  const out =
    page.key === "home"
      ? path.join(dist, "index.html")
      : page.key === "notFound"
        ? path.join(dist, "404.html")
        : path.join(dist, url.slice(1), "index.html");
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, html);
  count++;
}

const site = "https://www.mmfashions.in";
const urls = routePages
  .filter((p) => !p.noindex)
  .map((p) => {
    const lastmod = lastModified(p.path);
    const images = (pageImages.get(p.path) ?? [])
      .map((src) => `\n    <image:image><image:loc>${xmlEscape(site + src)}</image:loc></image:image>`)
      .join("");
    return [
      `  <url>\n    <loc>${p.path === "/" ? `${site}/` : site + p.path}</loc>`,
      lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : "",
      images,
      "\n  </url>",
    ].join("");
  })
  .join("\n");
await writeFile(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`,
);
await writeFile(path.join(dist, "llms.txt"), renderLlmsTxt());
await writeFile(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);

// Build-only files: the server bundle and Vite's chunk manifest.
await rm(serverOut, { recursive: true, force: true });
await rm(path.join(dist, ".vite"), { recursive: true, force: true });
console.log(`prerendered ${count} pages, sitemap.xml, robots.txt and llms.txt`);
