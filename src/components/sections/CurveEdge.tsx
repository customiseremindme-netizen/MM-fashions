import { cn } from "@/lib/utils";

type Fill = "white" | "chalk" | "red";
const fills: Record<Fill, string> = {
  white: "var(--color-surface)",
  chalk: "var(--color-chalk)",
  red: "var(--color-red)",
};

/**
 * The asymmetric curved bottom edge of dark heroes: a red sweep that runs
 * into the colour of the next section. With `next="red"` the sweep simply
 * becomes the red band below (home stats).
 */
export function CurveEdge({ next, className }: { next: Fill; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute inset-x-0 -bottom-px block h-[44px] w-full sm:h-[72px] lg:h-[104px]", className)}
    >
      <path d="M0 120V58C220 22 470 8 760 30s520 64 680 40v50Z" fill="var(--color-red)" />
      {next !== "red" && <path d="M0 120V92C260 60 520 50 800 66s470 50 640 36v18Z" fill={fills[next]} />}
    </svg>
  );
}
