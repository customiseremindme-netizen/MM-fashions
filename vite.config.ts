import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { renderHead } from "./src/lib/seo.ts";

/**
 * Puts the home page's metadata into index.html. After the build,
 * scripts/prerender.mjs swaps in each route's own metadata and markup.
 */
function seoHead(): Plugin {
  return {
    name: "mm-seo-head",
    transformIndexHtml: {
      order: "pre",
      handler: (html) => html.replace("<!--seo-->", renderHead("home")),
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoHead()],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
  build: {
    target: "es2022",
    manifest: true,
    assetsInlineLimit: 0,
  },
});
