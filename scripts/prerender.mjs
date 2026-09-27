// Prerenders every route to static HTML after `vite build`.
//
//   dist/index.html            → /            (home)
//   dist/about/index.html      → /about       …and so on for each page
//   dist/404.html              → any unknown path
//
// Each file carries its own title, description, canonical, Open Graph and
// JSON-LD, the page's rendered markup (hydrated in the browser), and
// modulepreload hints for that page's JavaScript chunk. Also writes
// sitemap.xml and robots.txt.

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

await build({
  root,
  logLevel: "warn",
  build: { ssr: "src/entry-server.tsx", outDir: serverOut, emptyOutDir: true, manifest: false, copyPublicDir: false },
});

const { render, renderHead, routePages } = await import(pathToFileURL(path.join(serverOut, "entry-server.js")).href);
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

let count = 0;
for (const page of routePages) {
  const url = page.path;
  const markup = await render(url);
  if (markup.includes("$RC") || /<div hidden id="S:/.test(markup)) throw new Error(`${url}: prerendered HTML contains streamed segments`);
  const preloads = [...new Set(chunkFiles(routeModules[url]))]
    .map((file) => `<link rel="modulepreload" crossorigin fetchpriority="low" href="/${file}" />`)
    .join("\n    ");
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
const today = new Date().toISOString().slice(0, 10);
const urls = routePages
  .filter((p) => !p.noindex)
  .map((p) => `  <url><loc>${p.path === "/" ? `${site}/` : site + p.path}</loc><lastmod>${today}</lastmod></url>`)
  .join("\n");
await writeFile(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
await writeFile(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);

await rm(serverOut, { recursive: true, force: true });
console.log(`prerendered ${count} pages, sitemap.xml and robots.txt`);
