import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { CurveEdge } from "./CurveEdge";

type PageHeroProps = {
  crumb: string;
  title: string;
  intro: string;
  /** Background of the section below, so the curved edge blends into it. */
  next?: "white" | "chalk";
  compact?: boolean;
};

const delay = (s: number) => ({ animationDelay: `${s}s` });

/**
 * Inner-page hero: Ink, breadcrumb, H1, intro and the curved red edge. The
 * short intro animation is CSS so it plays from the prerendered HTML.
 */
export function PageHero({ crumb, title, intro, next = "white", compact }: PageHeroProps) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink text-white">
      {/* Echo of the home-page hero ring. */}
      <div
        aria-hidden
        className="motion-static absolute -top-40 -right-40 -z-10 size-[520px] animate-spin-slow rounded-full border border-dashed border-teal-light/25 sm:-right-24 lg:-top-48 lg:right-[4%] lg:size-[640px]"
      />
      <div
        aria-hidden
        className="absolute -top-24 -right-24 -z-10 size-[360px] rounded-full border-[10px] border-teal/35 sm:-right-8 lg:-top-28 lg:right-[10%] lg:size-[440px]"
      />

      <div
        className={cn(
          "container-page relative",
          compact ? "pt-9 pb-20 sm:pt-12 sm:pb-24 lg:pt-14 lg:pb-32" : "pt-10 pb-24 sm:pt-14 sm:pb-32 lg:pt-20 lg:pb-40",
        )}
      >
        <nav aria-label="Breadcrumb" className="animate-fade-up">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-white/65">
            <li>
              <Link to="/" className="inline-flex min-h-11 items-center transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-white/35">
              /
            </li>
            <li aria-current="page" className="font-medium text-white">
              {crumb}
            </li>
          </ol>
        </nav>
        {/* The title slides up out of a mask, like the home-page headline. */}
        <h1 className="text-h1 mt-3 max-w-[20ch] text-white sm:mt-5">
          <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
            <span className="block animate-rise" style={delay(0.08)}>
              {title}
            </span>
          </span>
        </h1>
        <span
          aria-hidden
          className="mt-6 block h-1 w-16 origin-left animate-grow-x rounded-full bg-teal-light"
          style={delay(0.45)}
        />
        <p className="text-lead measure mt-6 text-white/75">{intro}</p>
      </div>
      <CurveEdge next={next} />
    </section>
  );
}
