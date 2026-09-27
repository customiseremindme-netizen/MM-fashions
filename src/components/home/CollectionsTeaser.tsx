import { Link } from "react-router";
import { Arrow } from "@/components/Arrow";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Picture } from "@/components/Picture";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { home } from "@/content/home";
import { catalogueHref } from "@/lib/models";

/** Four tall image cards: Kindergarten, Boys, Girls, Digital printed. */
export function CollectionsTeaser() {
  const { collections } = home;
  return (
    <section className="section-y bg-chalk" aria-labelledby="collections-title">
      <div className="container-page">
        <SectionHeader
          id="collections-title"
          title={collections.title}
          intro={collections.intro}
          action={
            <Button asChild variant="outline">
              <Link to={collections.cta.to}>
                {collections.cta.label}
                <Arrow />
              </Link>
            </Button>
          }
        />
        <RevealGroup as="ul" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {collections.cards.map((card) => (
            <RevealItem as="li" key={card.title}>
              <Link
                to={catalogueHref(card.range)}
                className="group relative block h-[240px] overflow-hidden rounded-card bg-ink sm:h-[380px] lg:h-[440px]"
              >
                <Picture
                  src={card.image.src}
                  alt={card.image.alt}
                  sizes="(min-width: 1024px) 300px, 50vw"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-premium group-hover:scale-[1.07]"
                />
                <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/95 via-ink/35 via-45% to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                  <h3 className="text-h3 text-white">{card.title}</h3>
                  <p className="mt-2 hidden text-[15px] leading-relaxed text-white/80 sm:block">{card.text}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white sm:mt-5">
                    {collections.cardCta}
                    <Arrow className="size-4" />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
