export type PageKey = "home" | "about" | "collections" | "catalogue" | "fabrics" | "contact" | "notFound";

export type PageMeta = {
  path: string;
  title: string;
  description: string;
  /** Adds FAQPage structured data. */
  faq?: boolean;
  noindex?: boolean;
};

export const pages: Record<PageKey, PageMeta> = {
  home: {
    path: "/",
    title: "M.M Fashions | School, Sports & House Uniform Manufacturers in Tirupur",
    description:
      "School, house, sports and corporate uniforms made in Tirupur, Tamil Nadu. Browse 250+ models across 12 ranges and get a quote on WhatsApp.",
    faq: true,
  },
  about: {
    path: "/about",
    title: "About M.M Fashions | Uniform Manufacturer, Tirupur",
    description:
      "Uniforms and sportswear made in Tirupur, the textile hub of India, for schools, corporates and sports institutions, with in-house embroidery and printing.",
  },
  collections: {
    path: "/collections",
    title: "Uniform Collections | Kindergarten, Boys, Girls & Sublimation | M.M Fashions",
    description:
      "Kindergarten, boys, girls and sublimation-printed uniforms from Tirupur. Four collections and twelve ranges, designed for every age, activity and occasion.",
  },
  catalogue: {
    path: "/catalogue",
    title: "Uniform Catalogue – 250+ Models | M.M Fashions",
    description:
      "250+ designs across 12 ranges. Filter by range or search a model number, shortlist what you like and send the list to us on WhatsApp for a quote.",
  },
  fabrics: {
    path: "/fabrics",
    title: "Uniform Fabrics & Customisation | M.M Fashions",
    description:
      "Uniform fabrics we work with, from Honey Comb, Lacoste and Polycotton to Lycra and Loopknit, plus logo embroidery, screen, digital and sublimation printing.",
  },
  contact: {
    path: "/contact",
    title: "Contact M.M Fashions, Tirupur | Get a Uniform Quote",
    description:
      "Contact M.M Fashions, Tirupur, for school, house, sports or corporate uniforms. Call or WhatsApp us; we reply with fabric options, customisation and pricing.",
    faq: true,
  },
  notFound: {
    path: "/404",
    title: "Page not found | M.M Fashions",
    description: "The link may be old or mistyped.",
    noindex: true,
  },
};
