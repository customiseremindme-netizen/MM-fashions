// Minimal production-like static server for local checks of `dist/`:
// clean URLs (/about → about/index.html), 404.html with a 404 status,
// gzip, and long-lived caching for hashed assets.
//
//   node scripts/serve.mjs [port]

import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import zlib from "node:zlib";

const root = path.resolve(import.meta.dirname, "..", "dist");
const port = Number(process.argv[2] ?? 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};
const compressible = new Set([".html", ".js", ".css", ".json", ".webmanifest", ".xml", ".txt", ".svg"]);

async function resolve(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
  const candidates = [clean, path.join(clean, "index.html"), `${clean}.html`];
  for (const c of candidates) {
    const file = path.join(root, c);
    if (!file.startsWith(root)) continue;
    try {
      if ((await stat(file)).isFile()) return file;
    } catch {}
  }
  return null;
}

http
  .createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");
    let file = await resolve(url.pathname);
    let status = 200;
    if (!file) {
      file = path.join(root, "404.html");
      status = 404;
    }
    const ext = path.extname(file);
    const headers = { "Content-Type": types[ext] ?? "application/octet-stream" };
    headers["Cache-Control"] = file.includes(`${path.sep}assets${path.sep}`)
      ? "public, max-age=31536000, immutable"
      : ext === ".html"
        ? "no-cache"
        : "public, max-age=86400";
    const gzip = compressible.has(ext) && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "");
    if (gzip) headers["Content-Encoding"] = "gzip";
    res.writeHead(status, headers);
    if (req.method === "HEAD") return res.end();
    const stream = createReadStream(file);
    (gzip ? stream.pipe(zlib.createGzip()) : stream).pipe(res);
  })
  .listen(port, () => console.log(`serving dist on http://localhost:${port}`));
