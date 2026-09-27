import type { Feature } from "./shared";

export const about = {
  hero: {
    crumb: "About",
    title: "About M.M Fashions",
    intro:
      "Uniforms and sportswear made in Tirupur, the textile hub of India, for schools, corporates and sports institutions.",
  },

  story: {
    title: "We don't just manufacture garments — we craft confidence",
    paragraphs: [
      "M.M Fashions is one of Tirupur's most reliable names in custom apparel and uniform manufacturing. Built on a foundation of quality craftsmanship and innovation, we design and produce garments that balance durability, comfort and style for every client.",
      "Each fabric is handpicked for its premium texture, breathability and long-lasting performance, so our products stand out in both look and feel. From concept development to final delivery, every stage of production is handled with care.",
      "Our in-house embroidery, printing and customisation services bring your brand or institution's vision to life with accuracy.",
    ],
    image: { src: "/photos/about.jpg", alt: "A schoolgirl and schoolboy in navy and sky-blue uniforms in a classroom" },
  },

  mission: {
    title: "Our mission",
    // `highlight` is rendered in teal inside the statement.
    statement: "To create apparel that reflects identity, unity and pride.",
    highlight: "identity, unity and pride",
  },

  values: {
    title: "What we stand for",
    items: [
      {
        icon: "scissors",
        title: "Quality manufacturing",
        text: "Precision stitching and advanced finishing on every garment.",
      },
      {
        icon: "shirt",
        title: "Wide range of garments",
        text: "Twelve ranges, from polos and tracksuits to hoodies and kindergarten sets.",
      },
      {
        icon: "users",
        title: "Uniforms for every need",
        text: "School, house, sports, corporate and promotional wear from one partner.",
      },
      {
        icon: "award",
        title: "Commitment to excellence",
        text: "Consistent quality and on-time delivery, order after order.",
      },
    ] satisfies Feature[],
  },

  infrastructure: {
    title: "Our infrastructure",
    text: "Located in the textile hub of Tirupur, our production facility is equipped with modern technology and managed by skilled professionals dedicated to consistent quality and timely delivery.",
    checklist: [
      "State-of-the-art cutting and stitching units",
      "Advanced digital printing and embroidery division",
      "Dedicated design and sampling team for customised apparel",
      "In-house quality control and packaging department",
    ],
    motto: ["Designed to perform.", "Made to last."],
    image: { src: "/photos/infra.jpg", alt: "Students in red polo uniforms walking down a school corridor" },
  },
};
