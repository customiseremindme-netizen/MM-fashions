import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Link arrow that nudges 6px when its group (button, card or link) is hovered. */
export function Arrow({ className }: { className?: string }) {
  return (
    <ArrowRight
      aria-hidden
      strokeWidth={2}
      className={cn(
        "size-[18px] transition-transform duration-500 ease-premium group-hover:translate-x-1.5 group-hover/btn:translate-x-1.5 group-focus-visible:translate-x-1.5",
        className,
      )}
    />
  );
}
