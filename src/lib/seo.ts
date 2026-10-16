// Page metadata and structured data. Used at runtime by <Seo /> and at build
// time by the Vite plugin that writes a pre-filled index.html for every route,
// so crawlers and link previews see the right title without running JS.
// Keep this file free of browser APIs.

import { nav, site } from "../config/site.ts";
import { faq } from "../content/faq.ts";
import { pages, type PageKey, type PageMeta } from "../content/seo.ts";

export function absoluteUrl(path: string) {
  return path === "/" ? `${site.url}/` : `${site.url}${path}`;
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.tagline,
    url: `${site.url}/`,
    logo: `${site.url}${site.logo.src}`,
    image: `${site.url}${site.ogImage.src}`,
    telephone: site.phones[0].label,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      postalCode: site.address.postalCode,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    hasMap: site.mapsUrl,
    areaServed: ["Tamil Nadu", "South India"],
    contactPoint: site.phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: p.label,
      contactType: "sales",
    })),
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** The site itself, published by the business above. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    url: `${site.url}/`,
    inLanguage: "en-IN",
    publisher: { "@id": `${site.url}/#business` },
  };
}

/** Mirrors the visible "Home / Page" breadcrumb on inner pages. */
export function breadcrumbJsonLd(key: PageKey) {
  const page = pages[key];
  const label = nav.find((item) => item.to === page.path)?.label;
  if (page.path === "/" || page.noindex || !label) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: label, item: absoluteUrl(page.path) },
    ],
  };
}

/** Every JSON-LD block for a page, keyed by the id of its <script>. */
export function structuredData(key: PageKey): { id: string; data: unknown }[] {
  const page = pages[key];
  const blocks: { id: string; data: unknown }[] = [{ id: "ld-business", data: localBusinessJsonLd() }];
  if (key === "home") blocks.push({ id: "ld-website", data: websiteJsonLd() });
  const breadcrumb = breadcrumbJsonLd(key);
  if (breadcrumb) blocks.push({ id: "ld-breadcrumb", data: breadcrumb });
  if (page.faq) blocks.push({ id: "ld-faq", data: faqJsonLd() });
  return blocks;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const jsonScript = (id: string, data: unknown) =>
  `<script type="application/ld+json" id="${id}">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;

/** The <head> block for a page. Wrapped in markers so the build can swap it per route. */
export function renderHead(key: PageKey): string {
  const page: PageMeta = pages[key];
  const url = absoluteUrl(page.path);
  const og = `${site.url}${site.ogImage.src}`;
  const tags = [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    page.noindex ? `<meta name="robots" content="noindex" />` : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${site.name}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${og}" />`,
    `<meta property="og:image:width" content="${site.ogImage.width}" />`,
    `<meta property="og:image:height" content="${site.ogImage.height}" />`,
    `<meta property="og:image:alt" content="Close-up of a garment being stitched on a sewing machine" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    `<meta name="twitter:image" content="${og}" />`,
    ...structuredData(key).map((block) => jsonScript(block.id, block.data)),
  ];
  if (key === "home") {
    // On desktop the hero photo is the largest element above the fold (on
    // phones it sits below the headline, so it is not preloaded there).
    tags.push(
      `<link rel="preload" as="image" type="image/webp" media="(min-width: 1024px)" href="/photos/opt/hero_sew-800.webp" imagesrcset="/photos/opt/hero_sew-480.webp 480w, /photos/opt/hero_sew-800.webp 800w, /photos/opt/hero_sew-1200.webp 1200w" imagesizes="460px" fetchpriority="high" />`,
    );
  }
  return `<!--seo:start-->\n    ${tags.join("\n    ")}\n    <!--seo:end-->`;
}

export const routePages = (Object.keys(pages) as PageKey[]).map((key) => ({ key, ...pages[key] }));
