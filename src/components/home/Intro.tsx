import { Link } from "react-router";
import { Arrow } from "@/components/Arrow";
import { Reveal } from "@/components/motion/Reveal";
import { WhoWeServeGrid } from "@/components/sections/WhoWeServe";
import { Button } from "@/components/ui/button";
import { home } from "@/content/home";
import { whoWeServe } from "@/content/shared";

/** "Your uniform partner in Tirupur" beside the "Who we serve" cards, 42 / 58. */
export function Intro() {
  const { intro } = home;
  return (
    <section className="section-y bg-surface" aria-labelledby="intro-title">
      <div className="container-page grid gap-12 lg:grid-cols-[42fr_58fr] lg:gap-16 xl:gap-20">
        <Reveal className="lg:pt-2">
          <span aria-hidden className="mb-5 block h-1 w-12 rounded-full bg-accent" />
          <h2 id="intro-title" className="text-h2 max-w-[16ch]">
            {intro.title}
          </h2>
          <div className="mt-6 space-y-5 text-copy">
            {intro.paragraphs.map((p) => (
              <p key={p} className="measure">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link to={intro.cta.to}>
                {intro.cta.label}
                <Arrow />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to={intro.contact.to}>
                {intro.contact.label}
                <Arrow />
              </Link>
            </Button>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <h3 className="mb-5 flex items-center gap-3 text-sm font-semibold tracking-wide text-accent">
              <span aria-hidden className="h-px w-8 bg-accent" />
              {whoWeServe.title}
            </h3>
          </Reveal>
          <WhoWeServeGrid layout="compact" headingLevel="h4" />
        </div>
      </div>
    </section>
  );
}
