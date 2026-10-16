import { Link } from "react-router";
import { Arrow } from "@/components/Arrow";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Picture } from "@/components/Picture";
import { CurveEdge } from "@/components/sections/CurveEdge";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { home } from "@/content/home";
import { cn } from "@/lib/utils";

const { hero } = home;

// Intro timing (seconds). The hero animates with CSS keyframes so it starts
// on first paint of the prerendered HTML, without waiting for JavaScript.
const LINE_DELAY = 0.12;
const LINE_STAGGER = 0.09;
const BAR_DELAY = LINE_DELAY + hero.lines.length * LINE_STAGGER + 0.2;
const delay = (s: number) => ({ animationDelay: `${s}s` });

export function HomeHero() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink text-white" aria-labelledby="hero-title">
      <div className="container-page grid items-center gap-14 pt-10 pb-24 sm:gap-16 sm:pt-14 sm:pb-32 lg:grid-cols-[56fr_44fr] lg:gap-10 lg:pt-16 lg:pb-40 xl:pt-20">
        <div>
          <p className="flex max-w-[46ch] animate-fade-up items-start gap-3 text-sm leading-relaxed text-white/65 sm:text-[15px]">
            <span aria-hidden className="mt-[0.7em] h-px w-8 shrink-0 bg-red" />
            {hero.eyebrow}
          </p>

          <h1 id="hero-title" className="text-hero mt-6 text-white uppercase sm:mt-8">
            {hero.lines.map((line, i) => (
              // Each word slides up out of its own mask, 90ms apart. The space
              // after each word isn't rendered (the spans are blocks) but keeps
              // the words apart in the page's text.
              <span key={line.word} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
                <span
                  className={cn(
                    "block animate-rise",
                    line.tone === "red" && "text-red",
                    line.tone === "teal" && "text-teal-light",
                  )}
                  style={delay(LINE_DELAY + i * LINE_STAGGER)}
                >
                  {line.word}
                </span>{" "}
              </span>
            ))}
          </h1>

          {/* Teal bar grows left to right once the headline has landed. */}
          <span
            aria-hidden
            className="mt-7 block h-1.5 w-28 origin-left animate-grow-x rounded-full bg-teal-light sm:w-36"
            style={delay(BAR_DELAY)}
          />

          {/* Visible from the first paint: this is the page's largest text. */}
          <p className="text-lead mt-7 max-w-[46ch] text-white/80">{hero.text}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg">
              <Link to={hero.primary.to}>
                {hero.primary.label}
                <Arrow />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outlineLight">
              <a href={site.whatsapp.quoteUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-[18px]" />
                {hero.secondary.label}
              </a>
            </Button>
          </div>
        </div>

        <HeroVisual />
      </div>
      <CurveEdge next="red" />
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[300px] animate-settle sm:max-w-[400px] lg:mr-[4%] lg:ml-auto lg:max-w-[460px]">
      <div className="relative aspect-square">
        {/* Rotating dashed outer ring (60s). */}
        <div
          aria-hidden
          className="motion-static absolute -inset-[7%] animate-spin-slow rounded-full border-[1.5px] border-dashed border-teal-light/55"
        />
        {/* Grayscale circle with a 10px teal ring and a slow Ken Burns zoom (18s). */}
        <div className="absolute inset-0 overflow-hidden rounded-full border-[10px] border-teal bg-ink-soft">
          <Picture
            src={hero.image.src}
            alt={hero.image.alt}
            sizes="(min-width: 1024px) 460px, (min-width: 640px) 400px, 300px"
            eager
            className="motion-static h-full w-full animate-kenburns object-cover grayscale"
          />
        </div>
        {/* Polo cluster overlapping the lower left, floating ±10px (7s). */}
        <div className="motion-static absolute -bottom-[10%] -left-[6%] w-[50%] animate-float sm:-left-[16%]">
          <Picture
            src={hero.polos.src}
            alt={hero.polos.alt}
            sizes="(min-width: 1024px) 230px, (min-width: 640px) 200px, 150px"
            eager
            fetchPriority="low"
            className="h-auto w-full"
          />
        </div>
        <p className="absolute -right-[2%] -bottom-[12%] hidden text-right text-sm leading-snug font-medium text-white/60 lg:block">
          {hero.motto[0]}
          <br />
          <span className="text-teal-light">{hero.motto[1]}</span>
        </p>
      </div>
    </div>
  );
}
