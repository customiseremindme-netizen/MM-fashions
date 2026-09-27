import { whatsappLink } from "@/config/site";
import { catalogue } from "@/content/catalogue";
import { enquiryForm } from "@/content/shared";
import { getModelByNumber, models, ranges } from "@/lib/models";

/**
 * "Hello M.M Fashions, I would like a quote for these models from your catalogue:"
 * then one line per range ("Cut & sew polos: 057, 061"), then the follow-up
 * prompts for quantity, sizes and organisation.
 */
export function buildShortlistMessage(numbers: string[]): string {
  const selected = new Set(numbers.filter((no) => getModelByNumber(no)));
  const lines: string[] = [catalogue.shortlist.message, ""];
  for (const range of ranges) {
    const picked = models.filter((m) => m.range === range.slug && selected.has(m.no));
    if (picked.length) lines.push(`${range.name}: ${picked.map((m) => m.no).join(", ")}`);
  }
  lines.push("", ...catalogue.shortlist.followUps);
  return lines.join("\n");
}

export function shortlistWhatsappUrl(numbers: string[]): string {
  return whatsappLink(buildShortlistMessage(numbers));
}

export type EnquiryValues = {
  name: string;
  organisation: string;
  enquiryFor: string;
  garment: string;
  quantity: string;
  city: string;
  details: string;
};

/** Greeting, then one line per filled field, then the free-text details. */
export function buildEnquiryMessage(values: EnquiryValues): string {
  const f = enquiryForm.fields;
  const rows: [string, string][] = [
    ["Name", values.name],
    [f.organisation.label, values.organisation],
    [f.enquiryFor.label, values.enquiryFor],
    [f.garment.label, values.garment],
    [f.quantity.label, values.quantity],
    [f.city.label, values.city],
  ];
  const lines = [enquiryForm.greeting, ""];
  for (const [label, value] of rows) {
    if (value.trim()) lines.push(`${label}: ${value.trim()}`);
  }
  if (values.details.trim()) lines.push("", `${f.details.label}:`, values.details.trim());
  return lines.join("\n");
}

export function enquiryWhatsappUrl(values: EnquiryValues): string {
  return whatsappLink(buildEnquiryMessage(values));
}
