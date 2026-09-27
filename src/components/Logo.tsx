import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * The supplied logo.png, exactly as provided: only scaled, never redrawn,
 * recoloured or re-encoded. It is a large file, so it loads at low priority
 * and never holds up the page's text or hero image.
 */
export function Logo({ className, eager = true }: { className?: string; eager?: boolean }) {
  return (
    <img
      src={site.logo.src}
      alt="M.M Fashions"
      width={site.logo.width}
      height={site.logo.height}
      loading={eager ? "eager" : "lazy"}
      fetchPriority="low"
      decoding="async"
      className={cn("block h-12 w-auto", className)}
    />
  );
}
