import { Link } from "react-router";
import { Arrow } from "@/components/Arrow";
import { ModelImage } from "@/components/ModelImage";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { home } from "@/content/home";
import { catalogueHref, getRangeCount, getRangeCover, ranges } from "@/lib/models";

/** All 12 ranges as tiles (6 / 4 / 3), each opening that range in the catalogue. */
export function RangeGrid() {
  const content = home.ranges;
  return (
    <section className="section-y bg-chalk" aria-labelledby="ranges-title">
      <div className="container-page">
        <SectionHeader
          id="ranges-title"
          title={content.title}
          intro={content.intro}
          action={
            <Button asChild variant="dark">
              <Link to={content.cta.to}>
                {content.cta.label}
                <Arrow />
              </Link>
            </Button>
          }
        />
        <RevealGroup as="ul" stagger={0.06} className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6">
          {ranges.map((range) => (
            <RevealItem as="li" key={range.slug}>
              <Link
                to={catalogueHref(range.slug)}
                className="group flex h-full flex-col rounded-card border border-line bg-surface p-2 transition-[transform,box-shadow,border-color] duration-500 ease-premium hover:-translate-y-1 hover:border-transparent dark:hover:border-fg/20 hover:shadow-[0_22px_48px_-28px_rgba(28,31,38,0.45)] sm:p-3"
              >
                <span className="block aspect-square overflow-hidden rounded-xl bg-white">
                  <ModelImage
                    model={getRangeCover(range.slug)}
                    alt=""
                    sizes="(min-width: 1024px) 180px, (min-width: 640px) 22vw, 30vw"
                    className="size-full transition-transform duration-700 ease-premium group-hover:scale-[1.07]"
                  />
                </span>
                <span className="flex flex-1 flex-col px-1 pt-2.5 pb-1 sm:px-1.5 sm:pt-3">
                  <span className="text-[13px] leading-snug font-semibold text-fg sm:text-[15px]">{range.name}</span>
                  <span className="mt-1 flex items-center justify-between gap-2 text-xs text-muted sm:text-[13px]">
                    {getRangeCount(range.slug)} models
                    <Arrow className="hidden size-4 text-fg/40 group-hover:text-red-fg sm:block" />
                  </span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
