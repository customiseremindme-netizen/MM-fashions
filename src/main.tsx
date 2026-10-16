import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App, { knownPaths, pageLoaders, preloadPage } from "./App";
import "./index.css";

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Pages are prerendered at build time (see scripts/prerender.mjs). Hydrate
// when the HTML was rendered for this URL; otherwise (e.g. a host that serves
// index.html for every path) render from scratch. The page's own chunk is
// loaded first (the HTML already preloads it), so React hydrates the
// prerendered markup in one pass instead of replacing it.
const path = window.location.pathname.replace(/\/+$/, "") || "/";
const rendered = container.dataset.route;
const matches = rendered === path || (rendered === "*" && !knownPaths.includes(path));

if (container.firstElementChild && matches) {
  preloadPage(path)
    .catch(() => {})
    .then(() => hydrateRoot(container, app));
} else {
  container.replaceChildren();
  createRoot(container).render(app);
}

// Warm the other pages once the browser is idle, so navigation feels instant.
window.addEventListener(
  "load",
  () => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
    window.setTimeout(() => idle(() => Object.values(pageLoaders).forEach((load) => load().catch(() => {}))), 3000);
  },
  { once: true },
);
