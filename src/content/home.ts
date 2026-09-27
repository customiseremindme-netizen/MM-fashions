import type { RangeSlug } from "@/lib/models";

export const home = {
  hero: {
    eyebrow: "Manufacturers of hosiery garments, sportswear, regular and house uniforms in Tirupur",
    // One word per line. `tone` picks the accent colour for that line.
    lines: [
      { word: "We" },
      { word: "Stitch" },
      { word: "Quality", tone: "red" },
      { word: "Wear" },
      { word: "Confidence", tone: "teal" },
    ] as { word: string; tone?: "red" | "teal" }[],
    text: "Crafting uniforms that represent your identity with pride. School, house, sports and corporate wear — cut, stitched, printed and finished under one roof.",
    primary: { label: "Browse 250+ models", to: "/catalogue" },
    secondary: { label: "Get a quote" },
    image: { src: "/photos/hero_sew.jpg", alt: "Close-up of a garment being stitched on a sewing machine" },
    polos: { src: "/photos/hero_polos.png", alt: "Four school polo T-shirts in navy, sky blue, red and grey, and yellow" },
    motto: ["Designed to perform.", "Made to last."],
  },

  stats: [
    { value: 253, label: "Uniform models in our catalogue" },
    { value: 12, label: "Garment ranges, from polos to hoodies" },
    { value: 13, label: "Fabric options for tees, pants and sportswear" },
    { value: 4, label: "In-house departments, from sampling to packing" },
  ],

  intro: {
    title: "Your uniform partner in Tirupur",
    paragraphs: [
      "M.M Fashions is one of Tirupur's reliable names in custom apparel and uniform manufacturing. Every fabric is handpicked for its texture, breathability and long-lasting performance, and every garment is made to balance durability, comfort and style.",
      "We make school uniforms, corporate wear, sportswear, T-shirts, track pants, hoodies and promotional apparel for schools, corporates and sports institutions across Tamil Nadu and South India.",
    ],
    cta: { label: "About us", to: "/about" },
  },

  collections: {
    title: "Uniforms for every age and activity",
    intro:
      "From kindergarten co-ords to house-team jerseys, every collection is cut, stitched, printed and finished in our own Tirupur unit.",
    cta: { label: "Explore collections", to: "/collections" },
    cardCta: "See models",
    cards: [
      {
        title: "Kindergarten",
        text: "Soft co-ord sets in prints, checks and stripes.",
        image: { src: "/photos/kg2.jpg", alt: "Kindergarten children in teal and navy uniform sets" },
        range: "kg" as RangeSlug,
      },
      {
        title: "Boys collections",
        text: "Polos, layered tees, waistcoats, shorts and track pants.",
        image: { src: "/photos/boy1.jpg", alt: "Schoolboys in green and black panelled polos" },
        range: "polo" as RangeSlug,
      },
      {
        title: "Girls collections",
        text: "Pinafores, skirt sets and pleated skirts.",
        image: { src: "/photos/girl4.jpg", alt: "Schoolgirls in blue polo tops and pleated pinafore dresses" },
        range: "girls" as RangeSlug,
      },
      {
        title: "Digital printed",
        text: "Full-colour sublimation for sports days and houses.",
        image: { src: "/photos/dig1.jpg", alt: "Students in green sublimation-printed tracksuits by a swimming pool" },
        range: "sub" as RangeSlug,
      },
    ],
  },

  marquee: {
    title: "A glimpse of 250+ models",
    intro: "Every design carries a model number, so ordering is as simple as sending us the numbers you like.",
  },

  ranges: {
    title: "Everything a uniform wardrobe needs",
    intro: "Twelve ranges from one factory. Tap a range to see its models.",
    cta: { label: "Browse all models", to: "/catalogue" },
  },

  fabrics: {
    title: "Fabrics we work with",
    intro:
      "Chosen for breathability, stretch and shape retention, so uniforms keep looking right through daily wear and washing.",
    cta: { label: "See all fabrics", to: "/fabrics" },
  },

  quote: {
    title: "Get a quote for your school or team",
    intro:
      "Share the models you like, quantities and sizes. We'll come back with fabric options, customisation and pricing.",
  },
};
