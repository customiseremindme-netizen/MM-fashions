import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: ReactNode;
  intro?: ReactNode;
  /** Button or link shown beside (desktop) or below (mobile) the heading. */
  action?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  id?: string;
  className?: string;
};

/** Teal rule, H2 and intro. Used at the top of most sections. */
export function SectionHeader({ title, intro, action, align = "left", tone = "light", id, className }: SectionHeaderProps) {
  const dark = tone === "dark";
  const centered = align === "center";
  return (
    <Reveal
      as="header"
      className={cn(
        "mb-10 flex flex-col gap-6 sm:mb-12 lg:mb-14",
        centered ? "items-center text-center" : action && "lg:flex-row lg:items-end lg:justify-between lg:gap-12",
        className,
      )}
    >
      <div className={cn(centered && "flex flex-col items-center")}>
        <span aria-hidden className={cn("mb-5 block h-1 w-12 rounded-full", dark ? "bg-teal-light" : "bg-teal")} />
        <h2 id={id} className={cn("text-h2 max-w-[22ch]", dark ? "text-white" : "text-ink")}>
          {title}
        </h2>
        {intro && (
          <p className={cn("text-lead measure mt-4", dark ? "text-white/75" : "text-muted", centered && "mx-auto")}>{intro}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}
