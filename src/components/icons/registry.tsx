import {
  Award,
  BadgeCheck,
  Building2,
  Droplets,
  Layers,
  Megaphone,
  Palette,
  PencilRuler,
  Printer,
  School,
  Scissors,
  Shield,
  Shirt,
  Timer,
  Trophy,
  Users,
  Wind,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/content/icons";

export const icons: Record<IconName, LucideIcon> = {
  school: School,
  building: Building2,
  trophy: Trophy,
  megaphone: Megaphone,
  shield: Shield,
  printer: Printer,
  layers: Layers,
  palette: Palette,
  ruler: PencilRuler,
  badge: BadgeCheck,
  scissors: Scissors,
  shirt: Shirt,
  users: Users,
  award: Award,
  droplets: Droplets,
  wind: Wind,
  timer: Timer,
};

export function Icon({ name, className, strokeWidth = 1.75 }: { name: IconName; className?: string; strokeWidth?: number }) {
  const Cmp = icons[name];
  return <Cmp aria-hidden className={className} strokeWidth={strokeWidth} />;
}
