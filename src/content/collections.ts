import type { RangeSlug } from "@/lib/models";

export type CollectionFeature = {
  id: string;
  title: string;
  text: string;
  images: { src: string; alt: string }[];
  /** Range chips. Each links to that range in the catalogue. */
  chips: RangeSlug[];
  /** Show the model count of this range as an extra chip. */
  countOf?: RangeSlug;
  cta: { label: string; range: RangeSlug };
};

export const collectionsPage = {
  hero: {
    crumb: "Collections",
    title: "Uniform collections",
    intro: "Four collections and twelve ranges, designed for every age, activity and occasion.",
  },

  features: [
    {
      id: "kindergarten",
      title: "Kindergarten",
      text: "Comfortable, colourful and easy to wear. Our kindergarten sets pair soft polo tops with shorts or skirts in fun prints, checks and stripes — made to handle playtime, washing and everyday school life.",
      images: [
        { src: "/photos/kg2.jpg", alt: "A class of kindergarten children in teal and navy uniform sets" },
        { src: "/photos/kg1.jpg", alt: "A kindergarten boy and girl in teal and yellow polos with navy shorts and skirt" },
        { src: "/photos/kg4.jpg", alt: "Kindergarten children playing in purple polo T-shirts" },
      ],
      chips: ["kg"],
      countOf: "kg",
      cta: { label: "See kindergarten models", range: "kg" },
    },
    {
      id: "boys",
      title: "Boys collections",
      text: "Smart everyday uniforms and active sportswear for boys: panelled polos, layered-look tees, waistcoats, shorts and track pants, in your school and house colours.",
      images: [
        { src: "/photos/boy1.jpg", alt: "Schoolboys in green and black panelled polos" },
        { src: "/photos/boy4.jpg", alt: "A schoolboy in a layered-look red and grey polo with track pants" },
        { src: "/photos/boy3.jpg", alt: "Schoolboys in red and navy polos beside a school bus" },
      ],
      chips: ["polo", "layered", "vest", "shorts", "pants"],
      cta: { label: "See polo models", range: "polo" },
    },
    {
      id: "girls",
      title: "Girls collections",
      text: "Neat, comfortable uniforms for girls: polo tops with pleated skirts, pinafore-style dresses and skirts in solids and checks, cut for easy movement.",
      images: [
        { src: "/photos/girl4.jpg", alt: "Schoolgirls in blue polo tops and pleated pinafore dresses in a classroom" },
        { src: "/photos/girl2.jpg", alt: "A smiling schoolgirl in a teal and white polo" },
        { src: "/photos/girl1.jpg", alt: "Three schoolgirls in maroon polos and grey track pants" },
      ],
      chips: ["girls", "skirts"],
      cta: { label: "See girls' models", range: "girls" },
    },
    {
      id: "digital",
      title: "Digital printed",
      text: "Sublimation-printed uniforms in full colour, edge to edge. Ideal for sports days, house teams, clubs and events — bold designs that stay bright wash after wash.",
      images: [
        { src: "/photos/dig1.jpg", alt: "Students in green sublimation-printed tracksuits by a swimming pool" },
        { src: "/photos/dig2.jpg", alt: "Students in blue, green and yellow printed polos outside a science lab" },
        { src: "/photos/dig3.jpg", alt: "Students running on a sports field in pink printed sports uniforms" },
      ],
      chips: ["sub"],
      countOf: "sub",
      cta: { label: "See sublimation models", range: "sub" },
    },
  ] satisfies CollectionFeature[],

  allRanges: {
    title: "All 12 ranges",
  },
};

/** One-line description for each range, keyed by the slug in models.json. */
export const rangeDescriptions: Record<RangeSlug, string> = {
  sports: "Polo and shorts sets for PE, sports days and house teams.",
  girls: "Polo tops with pleated skirts and pinafore-style dresses.",
  track: "Full sets with jackets or polos and matching track pants.",
  polo: "Panelled polo T-shirts in school and house colours.",
  sub: "All-over digitally printed polos for sports and events.",
  layered: "Polos with a waistcoat-style front in one garment.",
  vest: "Sleeveless waistcoats and vests in checks and solids.",
  shorts: "School and sports shorts with contrast piping and panels.",
  skirts: "Pleated and panelled skirts, including checks.",
  pants: "Track pants with side stripes and cuffed hems.",
  winter: "Sweatshirts, hoodies and varsity jackets for cooler days.",
  kg: "Printed, checked and striped co-ord sets for little ones.",
};
