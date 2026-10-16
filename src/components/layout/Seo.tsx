import { useEffect } from "react";
import { pages, type PageKey } from "@/content/seo";
import { absoluteUrl, structuredData } from "@/lib/seo";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/**
 * Keeps title, description, canonical, Open Graph and structured data in
 * step with the current route. The build writes the same tags into each
 * route's HTML, so crawlers get them without JavaScript.
 */
export function Seo({ page }: { page: PageKey }) {
  useEffect(() => {
    const meta = pages[page];
    const url = absoluteUrl(meta.path);
    document.title = meta.title;
    setMeta("name", "description", meta.description);
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (meta.noindex) {
      canonical?.remove();
      if (!robots) setMeta("name", "robots", "noindex");
    } else {
      robots?.remove();
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = url;
    }

    // Structured data: keep the blocks this page needs, drop the rest.
    const blocks = structuredData(page);
    const ids = new Set(blocks.map((block) => block.id));
    document.head.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"][id^="ld-"]').forEach((el) => {
      if (!ids.has(el.id)) el.remove();
    });
    for (const block of blocks) {
      let script = document.getElementById(block.id);
      if (!script) {
        script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        script.id = block.id;
        document.head.appendChild(script);
      }
      const json = JSON.stringify(block.data);
      if (script.textContent !== json) script.textContent = json;
    }
  }, [page]);

  return null;
}
