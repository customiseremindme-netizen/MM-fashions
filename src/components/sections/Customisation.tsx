import { Icon } from "@/components/icons/registry";
import { Picture } from "@/components/Picture";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { customisation } from "@/content/shared";

/**
 * "Made to your colours, crest and brief". The Home version is Ink with the
 * dig2 photo in an offset teal frame; the Fabrics page reuses the items on
 * white as a 3 / 2 / 1 grid.
 */
export function Customisation({ variant = "dark" }: { variant?: "dark" | "light" }) {
  if (variant === "light") {
    return (
      <section className="section-y bg-surface" aria-labelledby="customisation-title">
        <div className="container-page">
          <SectionHeader id="customisation-title" title={customisation.title} intro={customisation.intro} />
          <RevealGroup as="ul" className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
            {customisation.items.map((item) => (
              <RevealItem as="li" key={item.title}>
                <div className="flex h-full gap-4 rounded-card border border-line bg-surface p-6 transition-[transform,box-shadow,border-color] duration-500 ease-premium hover:-translate-y-1 hover:border-transparent dark:hover:border-fg/20 hover:shadow-[0_22px_48px_-28px_rgba(28,31,38,0.45)] sm:p-7">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-red text-white">
                    <Icon name={item.icon} className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-[17px] leading-snug font-semibold text-fg">{item.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{item.text}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    );
  }

  return (
    <section className="on-dark section-y overflow-hidden bg-ink text-white" aria-labelledby="customisation-title">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[5fr_7fr] lg:gap-16 xl:gap-24">
        <Reveal className="relative mx-auto w-full max-w-[460px] pr-4 pb-4 sm:pr-5 sm:pb-5 lg:max-w-none">
          <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-card border-2 border-teal-light sm:translate-x-5 sm:translate-y-5" />
          <div className="relative aspect-square overflow-hidden rounded-card bg-ink-soft">
            <Picture
              src={customisation.image.src}
              alt={customisation.image.alt}
              sizes="(min-width: 1024px) 480px, (min-width: 640px) 460px, calc(100vw - 52px)"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <div>
          <SectionHeader id="customisation-title" tone="dark" title={customisation.title} intro={customisation.intro} />
          <RevealGroup as="ul" className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {customisation.items.map((item) => (
              <RevealItem as="li" key={item.title} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-red text-white">
                  <Icon name={item.icon} className="size-5" />
                </span>
                <div>
                  <h3 className="text-[17px] leading-snug font-semibold text-white">{item.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-white/70">{item.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
