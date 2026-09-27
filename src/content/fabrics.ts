import type { IconName } from "./icons";

export type FabricGroup = {
  id: string;
  /** Title on the Fabrics page. */
  title: string;
  /** Short title on the Home preview card. */
  shortTitle: string;
  icon: IconName;
  intro: string;
  fabrics: { name: string; text: string }[];
  image?: { src: string; alt: string };
};

export const fabricGroups: FabricGroup[] = [
  {
    id: "sports",
    title: "Sports uniform fabrics",
    shortTitle: "Sports",
    icon: "trophy",
    intro: "Performance-driven materials designed for athletic comfort.",
    fabrics: [
      { name: "Moisture-wicking", text: "Keeps students cool and dry." },
      { name: "Flexible and lightweight", text: "Allows unrestricted movement." },
      { name: "Quick-dry performance", text: "Suited to physical education and sports activities." },
    ],
    image: { src: "/photos/dig3.jpg", alt: "Students running on a sports field in printed sports uniforms" },
  },
  {
    id: "tshirt",
    title: "T-shirt fabrics",
    shortTitle: "T-shirt",
    icon: "shirt",
    intro:
      "Chosen for breathability, softness and shape retention. All are durable and stretchable, keeping their shape with daily wear.",
    fabrics: [
      { name: "Honey Comb", text: "Breathable textured knit that keeps air circulating." },
      { name: "Lacoste", text: "Premium pique weave known for strength and a refined look." },
      { name: "Spun Nirmal Knit", text: "Smooth, soft-touch knit for all-day comfort." },
      { name: "Mars", text: "Lightweight and wrinkle-resistant, great for active students." },
      { name: "Polycotton", text: "Polyester-cotton blend that resists shrinkage and fading." },
      { name: "100% Combed Cotton", text: "Naturally soft, durable and gentle on skin." },
      { name: "Saleena", text: "Soft-feel, high-stretch knit for easy movement." },
    ],
  },
  {
    id: "pants",
    title: "Pant and shorts fabrics",
    shortTitle: "Pant and shorts",
    icon: "scissors",
    intro: "Engineered for comfort and endurance, with strength, flexibility and a smart finish that lasts.",
    fabrics: [
      { name: "Superpoly", text: "High-tenacity fabric with a smooth finish and easy maintenance." },
      { name: "T815", text: "Premium polyester blend, durable with a crisp appearance." },
      { name: "NS Lycra", text: "Soft-stretch knit with excellent recovery and comfort." },
      { name: "Four-Way Lycra", text: "Maximum flexibility; stretches in all directions." },
      { name: "Two-Way Lycra", text: "Balanced stretch and strength for daily school wear." },
      { name: "Loopknit", text: "Soft and warm; ideal for pants and sweaters." },
    ],
  },
];

export const fabricsPage = {
  hero: {
    crumb: "Fabrics",
    title: "Fabrics and customisation",
    intro: "The right fabric makes a uniform comfortable, durable and easy to care for. Here's what we work with.",
  },
  guide: {
    title: "Which fabric for which uniform?",
    note: "A starting guide — we'll confirm the best option with your sample.",
    columns: ["Uniform", "Fabrics"],
    rows: [
      { use: "Everyday school T-shirts", fabrics: ["Polycotton", "100% Combed Cotton"] },
      { use: "Premium school polos", fabrics: ["Lacoste", "Spun Nirmal Knit"] },
      { use: "PE and sports T-shirts", fabrics: ["Honey Comb", "Mars", "Saleena"] },
      { use: "Daily school pants and shorts", fabrics: ["Two-Way Lycra", "T815", "Superpoly"] },
      { use: "Sports track pants", fabrics: ["Four-Way Lycra", "NS Lycra"] },
      { use: "Winter wear and sweaters", fabrics: ["Loopknit"] },
    ],
  },
};
