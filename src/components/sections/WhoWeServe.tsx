import { Icon } from "@/components/icons/registry";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { whoWeServe } from "@/content/shared";
import { cn } from "@/lib/utils";

type WhoWeServeGridProps = {
  /** "compact" = 2 / 2 / 1 beside the Home intro; "wide" = 4 / 2 / 1 on About. */
  layout?: "compact" | "wide";
  headingLevel?: "h3" | "h4";
};

export function WhoWeServeGrid({ layout = "wide", headingLevel = "h3" }: WhoWeServeGridProps) {
  const Heading = headingLevel;
  return (
    <RevealGroup
      as="ul"
      className={cn("grid gap-3 sm:grid-cols-2 sm:gap-4", layout === "wide" && "lg:grid-cols-4 lg:gap-5")}
    >
      {whoWeServe.items.map((item) => (
        <RevealItem as="li" key={item.title}>
          <article className="group flex h-full gap-4 rounded-card border border-line bg-white p-5 transition-[transform,box-shadow,border-color] duration-500 ease-premium hover:-translate-y-1 hover:border-transparent hover:shadow-[0_22px_48px_-28px_rgba(28,31,38,0.45)] sm:flex-col sm:gap-6 sm:p-7">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-chalk text-teal transition-colors duration-500 group-hover:bg-teal group-hover:text-white">
              <Icon name={item.icon} className="size-[22px]" />
            </span>
            <div>
              <Heading className="text-h3">{item.title}</Heading>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{item.text}</p>
            </div>
          </article>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
