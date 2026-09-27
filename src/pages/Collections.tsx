import { Link } from "react-router";
import { Arrow } from "@/components/Arrow";
import { Seo } from "@/components/layout/Seo";
import { ModelImage } from "@/components/ModelImage";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Picture } from "@/components/Picture";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/button";
import { collectionsPage, rangeDescriptions, type CollectionFeature } from "@/content/collections";
import { catalogueHref, getRangeCount, getRangeCover, getRangeName, ranges } from "@/lib/models";
import { cn } from "@/lib/utils";

export default function CollectionsPage() {
  const { features } = collectionsPage;
  return (
    <>
      <Seo page="collections" />
      <PageHero {...collectionsPage.hero} />

      {features.map((feature, i) => (
        <FeatureBlock key={feature.id} feature={feature} index={i} total={features.length} />
      ))}

      <section className="section-y bg-surface" aria-labelledby="all-ranges-title">
        <div className="container-page">
          <SectionHeader id="all-ranges-title" title={collectionsPage.allRanges.title} />
          <RevealGroup as="ul" stagger={0.06} className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {ranges.map((range) => (
              <RevealItem as="li" key={range.slug}>
                <Link
                  to={catalogueHref(range.slug)}
                  className="group flex h-full flex-col rounded-card border border-line bg-surface p-2.5 transition-[transform,box-shadow,border-color] duration-500 ease-premium hover:-translate-y-1 hover:border-transparent dark:hover:border-fg/20 hover:shadow-[0_22px_48px_-28px_rgba(28,31,38,0.45)] sm:p-3"
                >
                  <span className="block aspect-[4/3] overflow-hidden rounded-xl bg-white">
                    <ModelImage
                      model={getRangeCover(range.slug)}
                      alt=""
                      sizes="(min-width: 1024px) 220px, (min-width: 640px) 26vw, 36vw"
                      className="mx-auto h-full w-auto transition-transform duration-700 ease-premium group-hover:scale-[1.07]"
                    />
                  </span>
                  <span className="flex flex-1 flex-col px-1.5 pt-3 pb-2 sm:px-2">
                    <span className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                      <span className="text-[15px] leading-snug font-semibold text-fg sm:text-[17px]">{range.name}</span>
                      <span className="shrink-0 text-xs font-medium text-accent tabular-nums sm:text-[13px]">
                        {getRangeCount(range.slug)} models
                      </span>
                    </span>
                    <span className="mt-2 text-[13px] leading-relaxed text-muted sm:text-sm">{rangeDescriptions[range.slug]}</span>
                    <span className="mt-auto hidden items-center gap-2 pt-4 text-sm font-semibold text-fg group-hover:text-red-fg sm:inline-flex">
                      See models
                      <Arrow className="size-4" />
                    </span>
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function FeatureBlock({ feature, index, total }: { feature: CollectionFeature; index: number; total: number }) {
  const flip = index % 2 === 1;
  const [tall, ...stacked] = feature.images;
  return (
    <section
      className={cn("section-y", index % 2 === 0 ? "bg-surface" : "bg-chalk")}
      aria-labelledby={`${feature.id}-title`}
      id={feature.id}
    >
      <div className="container-page grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        {/* Mosaic: one tall image and two stacked. Always first on tablet and mobile. */}
        <Reveal className={cn("grid h-[340px] grid-cols-[1.15fr_1fr] grid-rows-2 gap-3 sm:h-[480px] sm:gap-4 lg:h-[560px]", flip && "lg:order-2")}>
          <div className="row-span-2 overflow-hidden rounded-card bg-chalk">
            <Picture
              src={tall.src}
              alt={tall.alt}
              sizes="(min-width: 1024px) 330px, 52vw"
              priority={index === 0}
              className="h-full w-full object-cover transition-transform duration-[1400ms] ease-premium hover:scale-[1.07]"
            />
          </div>
          {stacked.map((img) => (
            <div key={img.src} className="overflow-hidden rounded-card bg-chalk">
              <Picture
                src={img.src}
                alt={img.alt}
                sizes="(min-width: 1024px) 290px, 45vw"
                eager={index === 0}
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-premium hover:scale-[1.07]"
              />
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.1} className={cn(flip && "lg:order-1")}>
          <p className="text-sm font-semibold text-accent tabular-nums">
            {String(index + 1).padStart(2, "0")}
            <span className="text-muted"> / {String(total).padStart(2, "0")}</span>
          </p>
          <h2 id={`${feature.id}-title`} className="text-h2 mt-4">
            {feature.title}
          </h2>
          <p className="measure mt-5 text-copy">{feature.text}</p>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Ranges">
            {feature.chips.map((slug) => (
              <li key={slug}>
                <Link
                  to={catalogueHref(slug)}
                  className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 text-sm font-medium text-fg transition-colors duration-300 hover:border-fg hover:bg-fg hover:text-surface"
                >
                  {getRangeName(slug)}
                </Link>
              </li>
            ))}
            {feature.countOf && (
              <li className="inline-flex min-h-11 items-center rounded-full bg-teal px-4 text-sm font-semibold text-white tabular-nums">
                {getRangeCount(feature.countOf)} models
              </li>
            )}
          </ul>
          <Button asChild className="mt-9">
            <Link to={catalogueHref(feature.cta.range)}>
              {feature.cta.label}
              <Arrow />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
