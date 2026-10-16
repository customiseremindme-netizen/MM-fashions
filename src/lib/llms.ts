// Builds /llms.txt: a plain-text summary of the site for AI assistants and
// answer engines (see llmstxt.org; an informal convention, not a standard).
// Everything comes from the same config and content as the pages, so it can't
// drift from what the site says. Used at build time by scripts/prerender.mjs.

import { site } from "@/config/site";
import { about } from "@/content/about";
import { fabricGroups } from "@/content/fabrics";
import { faq } from "@/content/faq";
import { home } from "@/content/home";
import { pages, type PageKey } from "@/content/seo";
import { ctaBand, customisation, footer, whoWeServe } from "@/content/shared";
import { absoluteUrl } from "@/lib/seo";
import { catalogueHref, getRangeCount, ranges, totalModelCount } from "@/lib/models";

const pageOrder: PageKey[] = ["home", "about", "collections", "catalogue", "fabrics", "contact"];

export function renderLlmsTxt(): string {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${footer.about}`,
    "",
    `Also written as ${site.alternateName}.`,
    "",
    home.intro.paragraphs.join("\n\n"),
    "",
    about.story.paragraphs[2],
    "",
    "## Pages",
    "",
    ...pageOrder.map((key) => `- [${pages[key].title}](${absoluteUrl(pages[key].path)}): ${pages[key].description}`),
    "",
    "## Who we serve",
    "",
    ...whoWeServe.items.map((item) => `- ${item.title}: ${item.text}`),
    "",
    `## Catalogue ranges (${totalModelCount} models)`,
    "",
    ...ranges.map((r) => `- [${r.name}](${site.url}${catalogueHref(r.slug)}): ${getRangeCount(r.slug)} models`),
    "",
    "## Fabrics",
    "",
    ...fabricGroups.map((g) => `- ${g.title}: ${g.fabrics.map((f) => f.name).join(", ")}`),
    "",
    "## Customisation",
    "",
    ...customisation.items.map((item) => `- ${item.title}: ${item.text}`),
    "",
    "## Frequently asked questions",
    "",
    ...faq.items.flatMap((item) => [`### ${item.q}`, "", item.a, ""]),
    "## Contact",
    "",
    ctaBand.text,
    "",
    `- Phone: ${site.phones.map((p) => p.label).join(", ")}`,
    `- WhatsApp: ${site.whatsapp.label} (${site.whatsapp.baseUrl})`,
    `- Email: ${site.email}`,
    `- Address: ${site.address.full}, India`,
    `- Map: ${site.mapsUrl}`,
    `- Website: ${site.url}/`,
    "",
  ];
  return lines.join("\n");
}
