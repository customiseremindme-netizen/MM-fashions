// Company and contact details. Every page, link and structured-data block reads
// from here, so a change to a phone number or address is made once.

const whatsappNumber = "919952401313";
const quoteText = "Hello M.M Fashions, I would like a quote for uniforms.";

export const site = {
  name: "M.M Fashions",
  /** How people often type the name; used in structured data and llms.txt. */
  alternateName: "MM Fashions",
  tagline: "Mfrs of hosiery garments, sports wear, regular and house uniforms",
  url: "https://www.mmfashions.in",
  websiteLabel: "www.mmfashions.in",

  phones: [
    { label: "+91 99524 01313", href: "tel:+919952401313" },
    { label: "+91 95431 21313", href: "tel:+919543121313" },
  ],

  whatsapp: {
    number: whatsappNumber,
    label: "+91 99524 01313",
    baseUrl: `https://wa.me/${whatsappNumber}`,
    quoteUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(quoteText)}`,
  },

  email: "mmfashionstirupur@gmail.com",

  address: {
    lines: [
      "SF.No.3/253, Athupalayam,",
      "Pattathurasi Amman Kovil Back Side,",
      "Thirumurugan Poondi (PO),",
      "Tirupur 641652, Tamil Nadu",
    ],
    full: "SF.No.3/253, Athupalayam, Pattathurasi Amman Kovil Back Side, Thirumurugan Poondi (PO), Tirupur 641652, Tamil Nadu",
    short: "Thirumurugan Poondi, Tirupur 641652",
    street: "SF.No.3/253, Athupalayam, Pattathurasi Amman Kovil Back Side, Thirumurugan Poondi (PO)",
    locality: "Tirupur",
    postalCode: "641652",
    region: "Tamil Nadu",
    country: "IN",
  },

  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Pattathurasi+Amman+Kovil+Athupalayam+Thirumurugan+Poondi+Tirupur+641652",
  mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(
    "Pattathurasi Amman Kovil, Athupalayam, Thirumurugan Poondi, Tirupur 641652",
  )}&z=15&output=embed`,

  credit: { label: "Designing Portal", url: "https://www.designingportal.com" },

  logo: { src: "/photos/logo.png", width: 1600, height: 832 },
  ogImage: { src: "/photos/hero_sew.jpg", width: 1920, height: 1282 },
} as const;

export const nav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Collections", to: "/collections" },
  { label: "Catalogue", to: "/catalogue" },
  { label: "Fabrics", to: "/fabrics" },
  { label: "Contact", to: "/contact" },
] as const;

/** Builds a wa.me link with a prefilled message. */
export function whatsappLink(message: string) {
  return `${site.whatsapp.baseUrl}?text=${encodeURIComponent(message)}`;
}
