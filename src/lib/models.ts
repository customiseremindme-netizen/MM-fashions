// Derived helpers over src/data/models.json, the single source of truth for
// model numbers, ranges and images. Nothing here duplicates that data.

import data from "@/data/models.json";

export type RangeSlug =
  | "sports"
  | "girls"
  | "track"
  | "polo"
  | "sub"
  | "layered"
  | "vest"
  | "shorts"
  | "skirts"
  | "pants"
  | "winter"
  | "kg";

export type Range = { slug: RangeSlug; name: string };
export type Model = { no: string; range: RangeSlug; img: string };

export const ranges = data.ranges as Range[];
export const models = data.models as Model[];

const rangeMap = new Map(ranges.map((r) => [r.slug, r]));
const modelMap = new Map(models.map((m) => [m.no, m]));
const byRange = new Map<RangeSlug, Model[]>(ranges.map((r) => [r.slug, []]));
for (const m of models) byRange.get(m.range)?.push(m);

if (import.meta.env?.DEV) {
  for (const m of models) {
    if (!rangeMap.has(m.range)) console.warn(`models.json: model ${m.no} has unknown range "${m.range}"`);
  }
  if (modelMap.size !== models.length) console.warn("models.json: duplicate model numbers");
}

/** Every model in the catalogue, including both page-32 shorts variants of 008. */
export const totalModelCount = models.length;

/** Distinct numbered models (008 and its two shorts variants share one number). */
export const numberedModelCount = new Set(models.map((m) => digitsOf(m.no))).size;

export function isRangeSlug(value: unknown): value is RangeSlug {
  return typeof value === "string" && rangeMap.has(value as RangeSlug);
}

export function getRangeBySlug(slug: string | null | undefined): Range | undefined {
  return slug ? rangeMap.get(slug as RangeSlug) : undefined;
}

export function getRangeName(slug: RangeSlug): string {
  return rangeMap.get(slug)?.name ?? slug;
}

/** Models in a range, in catalogue order. With no slug, returns every model. */
export function getModelsByRange(slug?: RangeSlug | null): Model[] {
  if (!slug) return models;
  return byRange.get(slug) ?? [];
}

export function getRangeCount(slug?: RangeSlug | null): number {
  return getModelsByRange(slug).length;
}

/** The first model in a range, used as its cover image. */
export function getRangeCover(slug: RangeSlug): Model {
  return getModelsByRange(slug)[0];
}

/**
 * Finds a model by its number. Accepts the exact catalogue label
 * ("008 (shorts A)") or a bare number ("57" or "057").
 */
export function getModelByNumber(no: string): Model | undefined {
  const exact = modelMap.get(no.trim());
  if (exact) return exact;
  const digits = digitsOf(no);
  if (!digits) return undefined;
  return modelMap.get(digits.padStart(3, "0"));
}

/**
 * Filters models by a search query. Digits match anywhere in the model
 * number ("57" finds 057 and 157); text without digits matches the model
 * label or range name.
 */
export function searchModels(query: string, list: Model[] = models): Model[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  const digits = digitsOf(q);
  if (digits) return list.filter((m) => digitsOf(m.no).includes(digits));
  return list.filter((m) => m.no.toLowerCase().includes(q) || getRangeName(m.range).toLowerCase().includes(q));
}

export function modelLabel(m: Model): string {
  return `Model ${m.no}`;
}

/** Alt text, e.g. "Model 057, Cut & sew polos". */
export function modelAlt(m: Model): string {
  return `Model ${m.no}, ${getRangeName(m.range)}`;
}

/** WebP thumbnail (480px, or 240px with `small`) generated from the original by scripts/optimize-images.mjs. */
export function modelThumb(m: Model, small = false): string {
  return m.img.replace("/models/", "/models/thumbs/").replace(/\.jpe?g$/i, small ? "-240.webp" : ".webp");
}

export function catalogueHref(slug?: RangeSlug | null): string {
  return slug ? `/catalogue?range=${slug}` : "/catalogue";
}

function digitsOf(value: string): string {
  return value.replace(/\D/g, "");
}
