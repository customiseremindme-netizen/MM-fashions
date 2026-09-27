import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { process } from "@/content/shared";
import { cn } from "@/lib/utils";

/** "How an order moves": four numbered steps, 4 / 2 / 1. */
export function Process({ className }: { className?: string }) {
  return (
    <section id={process.id} className={cn("section-y bg-surface", className)} aria-labelledby="process-title">
      <div className="container-page">
        <SectionHeader id="process-title" align="center" title={process.title} intro={process.intro} />
        <RevealGroup as="ol" className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {process.steps.map((step, i) => (
            <RevealItem as="li" key={step.title}>
              <article className="group relative h-full overflow-hidden rounded-card border border-line bg-surface p-6 transition-[transform,box-shadow,border-color] duration-500 ease-premium hover:-translate-y-1 hover:border-transparent dark:hover:border-fg/20 hover:shadow-[0_22px_48px_-28px_rgba(28,31,38,0.45)] sm:p-7 lg:p-8">
                {/* Faint numeral, drawn as generated content: decorative, the <ol> carries the order. */}
                <span
                  aria-hidden
                  data-num={String(i + 1).padStart(2, "0")}
                  className="block text-[64px] leading-none font-extrabold tracking-tight text-fg/[0.08] transition-colors duration-500 group-hover:text-red/25 before:content-[attr(data-num)] lg:text-[72px]"
                />
                <span aria-hidden className="mt-6 block h-0.5 w-8 rounded-full bg-red transition-[width] duration-500 ease-premium group-hover:w-14" />
                <h3 className="text-h3 mt-5">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.text}</p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
