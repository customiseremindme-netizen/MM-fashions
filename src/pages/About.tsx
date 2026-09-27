import { CircleCheck } from "lucide-react";
import { Icon } from "@/components/icons/registry";
import { Seo } from "@/components/layout/Seo";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Picture } from "@/components/Picture";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { WhoWeServeGrid } from "@/components/sections/WhoWeServe";
import { about } from "@/content/about";
import { whoWeServe } from "@/content/shared";

export default function AboutPage() {
  const { story, mission, values, infrastructure } = about;
  const [before, after] = mission.statement.split(mission.highlight);

  return (
    <>
      <Seo page="about" />
      <PageHero {...about.hero} />

      {/* Story */}
      <section className="section-y bg-surface" aria-labelledby="story-title">
        <div className="container-page grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <span aria-hidden className="mb-5 block h-1 w-12 rounded-full bg-accent" />
            <h2 id="story-title" className="text-h2 max-w-[20ch]">
              {story.title}
            </h2>
            <div className="mt-7 space-y-5 text-copy">
              {story.paragraphs.map((p) => (
                <p key={p} className="measure">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative mx-auto w-full max-w-[460px] pr-4 pb-4 sm:pr-5 sm:pb-5 lg:max-w-none">
            <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-card border-2 border-accent sm:translate-x-5 sm:translate-y-5" />
            <div className="relative aspect-[992/1056] overflow-hidden rounded-card bg-chalk">
              <Picture
                src={story.image.src}
                alt={story.image.alt}
                sizes="(min-width: 1024px) 500px, (min-width: 640px) 460px, calc(100vw - 52px)"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission */}
      <section className="section-y bg-chalk" aria-labelledby="mission-title">
        <Reveal className="container-page flex flex-col items-center text-center">
          <span aria-hidden className="mb-5 block h-1 w-12 rounded-full bg-accent" />
          <h2 id="mission-title" className="text-h2">
            {mission.title}
          </h2>
          <p className="mt-8 max-w-[22ch] text-[30px] leading-[1.2] font-semibold tracking-tight text-fg text-balance sm:text-[40px] lg:text-[52px]">
            {before}
            <span className="text-accent">{mission.highlight}</span>
            {after}
          </p>
        </Reveal>
      </section>

      {/* What we stand for */}
      <section className="section-y bg-surface" aria-labelledby="values-title">
        <div className="container-page">
          <SectionHeader id="values-title" title={values.title} />
          <RevealGroup as="ul" className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {values.items.map((item, i) => (
              <RevealItem as="li" key={item.title}>
                <article className="group flex h-full flex-col rounded-card border border-line bg-surface p-6 transition-[transform,box-shadow,border-color] duration-500 ease-premium hover:-translate-y-1 hover:border-transparent dark:hover:border-fg/20 hover:shadow-[0_22px_48px_-28px_rgba(28,31,38,0.45)] sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-full bg-red text-white">
                      <Icon name={item.icon} className="size-[22px]" />
                    </span>
                    <span aria-hidden data-num={String(i + 1).padStart(2, "0")} className="text-sm font-semibold text-fg/30 before:content-[attr(data-num)]" />
                  </div>
                  <h3 className="text-h3 mt-8">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{item.text}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="section-y bg-chalk" aria-labelledby="infra-title">
        <div className="container-page grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-[560px] pb-4 pl-4 sm:pb-5 sm:pl-5 lg:max-w-none">
            <div aria-hidden className="absolute inset-0 -translate-x-4 translate-y-4 rounded-card border-2 border-accent sm:-translate-x-5 sm:translate-y-5" />
            <div className="relative aspect-[1280/800] overflow-hidden rounded-card bg-surface">
              <Picture
                src={infrastructure.image.src}
                alt={infrastructure.image.alt}
                sizes="(min-width: 1024px) 580px, (min-width: 640px) 560px, calc(100vw - 52px)"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span aria-hidden className="mb-5 block h-1 w-12 rounded-full bg-accent" />
            <h2 id="infra-title" className="text-h2">
              {infrastructure.title}
            </h2>
            <p className="measure mt-6 text-copy">{infrastructure.text}</p>
            <ul className="mt-8 space-y-4">
              {infrastructure.checklist.map((item) => (
                <li key={item} className="flex gap-3.5 text-[16px] font-medium text-fg">
                  <CircleCheck className="mt-0.5 size-[22px] shrink-0 text-accent" strokeWidth={1.75} aria-hidden />
                  {item}.
                </li>
              ))}
            </ul>
            <p className="mt-10 border-t border-line pt-8 text-[26px] leading-tight font-bold tracking-tight text-fg sm:text-[30px]">
              {infrastructure.motto[0]}
              <br />
              <span className="text-accent">{infrastructure.motto[1]}</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Who we serve */}
      <section className="section-y bg-surface" aria-labelledby="serve-title">
        <div className="container-page">
          <SectionHeader id="serve-title" title={whoWeServe.title} />
          <WhoWeServeGrid layout="wide" />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
