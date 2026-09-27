import { CountUp } from "@/components/motion/CountUp";
import { home } from "@/content/home";
import { cn } from "@/lib/utils";

/** Red band under the hero: four counters, 4 / 2 / 2, hairline dividers on desktop. */
export function Stats() {
  return (
    <section aria-label="M.M Fashions in numbers" className="on-dark relative bg-red text-white">
      <div className="container-page pt-6 pb-12 sm:pt-4 sm:pb-14 lg:pt-2 lg:pb-16">
        <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:gap-y-0">
          {home.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "flex flex-col-reverse justify-end pr-4 sm:pr-8 lg:px-8 xl:px-10",
                i % 2 === 1 && "pl-4 sm:pl-8",
                i > 0 && "lg:border-l lg:border-white/30",
                i === 0 && "lg:pl-0",
              )}
            >
              <dt className="mt-3 max-w-[24ch] text-sm leading-snug text-white sm:text-[15px]">{stat.label}</dt>
              <dd className="text-[44px] leading-none font-extrabold tracking-tight sm:text-[56px] lg:text-[64px]">
                <CountUp value={stat.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
