// Copy reused on more than one page. All text is the approved copy from
// docs/SITE_SPEC.md; edit it here rather than in components.

import type { RangeSlug } from "@/lib/models";
import type { IconName } from "./icons";

export type Feature = { icon: IconName; title: string; text: string };

export const whoWeServe = {
  title: "Who we serve",
  items: [
    {
      icon: "school",
      title: "Schools",
      text: "Regular, house, PE and kindergarten uniforms in your school colours and crest.",
    },
    {
      icon: "building",
      title: "Corporates",
      text: "Branded polos, T-shirts and workwear for teams and staff.",
    },
    {
      icon: "trophy",
      title: "Sports institutions",
      text: "Moisture-wicking jerseys, tracksuits and shorts for training and matches.",
    },
    {
      icon: "megaphone",
      title: "Promotional apparel",
      text: "Printed T-shirts and hoodies for events, campaigns and launches.",
    },
  ] satisfies Feature[],
};

export const customisation = {
  title: "Made to your colours, crest and brief",
  intro:
    "From concept development to final delivery, every stage is handled in-house, so your uniform looks exactly the way you imagined it.",
  image: { src: "/photos/dig2.jpg", alt: "Students in digitally printed sports polos outside a science lab" },
  items: [
    {
      icon: "shield",
      title: "Logo embroidery",
      text: "School crests and company logos embroidered in-house.",
    },
    {
      icon: "printer",
      title: "Screen and digital printing",
      text: "Names, slogans and artwork printed sharp and wash-fast.",
    },
    {
      icon: "layers",
      title: "Sublimation prints",
      text: "All-over, full-colour designs that won't crack or peel.",
    },
    {
      icon: "palette",
      title: "Your colours",
      text: "Body, collar, cuff and panel colours matched to your house colours.",
    },
    {
      icon: "ruler",
      title: "Sampling first",
      text: "Our design and sampling team makes a sample before bulk production.",
    },
    {
      icon: "badge",
      title: "Quality checked",
      text: "Every order passes our in-house quality control and packing.",
    },
  ] satisfies Feature[],
};

export const process = {
  id: "process",
  title: "How an order moves",
  intro: "Four clear steps from your first message to the delivered carton.",
  steps: [
    {
      title: "Share your requirement",
      text: "Send model numbers, quantities and sizes on WhatsApp, or call us.",
    },
    {
      title: "Design and sampling",
      text: "We confirm fabric, colours and branding, then make a sample for your approval.",
    },
    {
      title: "Production and QC",
      text: "Cutting, stitching, printing and embroidery run in-house, followed by quality checks.",
    },
    {
      title: "Packed and delivered",
      text: "Our packing team labels by size and dispatches to your school or office.",
    },
  ],
};

export const ctaBand = {
  title: "Ready to plan your next uniform order?",
  text: "Send us the model numbers you like, quantities and sizes. We'll reply with fabric options, customisation and pricing.",
  whatsappLabel: "Chat on WhatsApp",
  callLabel: "Call +91 99524 01313",
};

export const enquiryForm = {
  title: "Send your requirement",
  intro: "Fill this in and WhatsApp opens with your message ready to send.",
  fields: {
    name: { label: "Your name", placeholder: "" },
    organisation: { label: "School / organisation", placeholder: "" },
    enquiryFor: {
      label: "Enquiry for",
      options: ["School", "College", "Corporate", "Sports academy or club", "Event or promotion", "Other"],
    },
    garment: { label: "Garment", notSure: "Not sure yet" },
    quantity: { label: "Approx. quantity", placeholder: "e.g. 400 pieces" },
    city: { label: "City", placeholder: "" },
    details: { label: "Details", placeholder: "Model numbers, colours, sizes" },
  },
  selectPlaceholder: "Select",
  nameError: "Add your name so we know who to reply to.",
  submit: "Send on WhatsApp",
  greeting: "Hello M.M Fashions, I have an enquiry.",
  sentNote: "WhatsApp has opened in a new tab with your message.",
  sentFallback: "If it didn't open, tap here to send it.",
};

export const footer = {
  about:
    "Manufacturers of hosiery garments, sportswear, regular and house uniforms for schools, corporates and sports institutions across Tamil Nadu and South India.",
  exploreTitle: "Explore",
  rangesTitle: "Ranges",
  contactTitle: "Contact",
  ranges: ["polo", "sub", "kg", "girls", "track", "winter"] as RangeSlug[],
  rights: "All rights reserved.",
  creditPrefix: "Website by",
};
