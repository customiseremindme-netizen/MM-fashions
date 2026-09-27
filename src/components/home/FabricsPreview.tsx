import { Link } from "react-router";
import { Arrow } from "@/components/Arrow";
import { Icon } from "@/components/icons/registry";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { fabricGroups } from "@/content/fabrics";
import { home } from "@/content/home";

/** Three fabric groups with the fabric names as chips (3 / 1 / 1). */
export function FabricsPreview() {
  const content = home.fabrics;
  return (
    <section className="section-y bg-chalk" aria-labelledby="fabrics-title">
      <div className="container-page">
        <SectionHeader
          id="fabrics-title"
          title={content.title}
          intro={content.intro}
          action={
            <Button asChild variant="outline">
              <Link to={content.cta.to}>
                {content.cta.label}
                <Arrow />
              </Link>
            </Button>
          }
        />
        <RevealGroup as="ul" className="grid gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {fabricGroups.map((group) => (
            <RevealItem as="li" key={group.id}>
              <article className="flex h-full flex-col rounded-card border border-line bg-surface p-6 transition-[transform,box-shadow,border-color] duration-500 ease-premium hover:-translate-y-1 hover:border-transparent dark:hover:border-fg/20 hover:shadow-[0_22px_48px_-28px_rgba(28,31,38,0.45)] sm:p-8">
                <div className="flex items-center gap-3.5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-teal text-white">
                    <Icon name={group.icon} className="size-5" />
                  </span>
                  <h3 className="text-h3">{group.shortTitle}</h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{group.intro}</p>
                <ul className="mt-6 flex flex-wrap gap-2 border-t border-line pt-6" aria-label={`${group.shortTitle} fabrics`}>
                  {group.fabrics.map((fabric) => (
                    <li key={fabric.name} className="rounded-full border border-line bg-chalk px-3.5 py-1.5 text-sm font-medium text-fg">
                      {fabric.name}
                    </li>
                  ))}
                </ul>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
