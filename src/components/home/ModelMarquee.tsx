import { Link } from "react-router";
import { ModelImage } from "@/components/ModelImage";
import { SectionHeader } from "@/components/SectionHeader";
import { home } from "@/content/home";
import { catalogueHref, getRangeName, models, type Model } from "@/lib/models";
import { cn } from "@/lib/utils";

// An even spread across the whole catalogue, split into two rows.
const sample = models.filter((_, i) => i % 8 === 3);
const rows = [sample.filter((_, i) => i % 2 === 0), sample.filter((_, i) => i % 2 === 1)];

function Row({ items, reverse }: { items: Model[]; reverse?: boolean }) {
  return (
    <div className="group/marquee fade-x flex overflow-hidden py-2 motion-reduce:overflow-x-auto">
      {/* Two copies of the row; the track slides by exactly one copy for a seamless loop. */}
      <ul
        className={cn(
          "flex w-max shrink-0 group-focus-within/marquee:[animation-play-state:paused] group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {[...items, ...items].map((model, i) => {
          const copy = i >= items.length;
          return (
            <li key={`${model.no}-${i}`} aria-hidden={copy || undefined} className={cn("pr-3 sm:pr-4", copy && "motion-reduce:hidden")}>
              <Link
                to={catalogueHref(model.range)}
                tabIndex={copy ? -1 : undefined}
                aria-label={`Model ${model.no}, ${getRangeName(model.range)}: see the range`}
                className="relative block size-[120px] rounded-card border border-line bg-white p-2.5 transition-[transform,border-color,box-shadow] duration-500 ease-premium hover:-translate-y-1 hover:border-ink/15 hover:shadow-[0_16px_32px_-20px_rgba(28,31,38,0.45)] sm:size-[150px] sm:p-3 lg:size-[180px]"
              >
                <ModelImage model={model} className="size-full" sizes="(min-width: 1024px) 160px, (min-width: 640px) 130px, 100px" />
                <span className="absolute top-2 left-2 rounded-full bg-ink px-2 py-0.5 text-[11px] leading-5 font-semibold text-white tabular-nums sm:top-2.5 sm:left-2.5">
                  {model.no}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** "A glimpse of 250+ models": two infinite rows running in opposite directions. */
export function ModelMarquee() {
  const { marquee } = home;
  return (
    <section className="section-y overflow-hidden bg-white" aria-labelledby="marquee-title">
      <div className="container-page">
        <SectionHeader id="marquee-title" align="center" title={marquee.title} intro={marquee.intro} />
      </div>
      <div className="space-y-2 sm:space-y-3">
        <Row items={rows[0]} />
        <Row items={rows[1]} reverse />
      </div>
    </section>
  );
}
