import { Icon } from "@/components/icons/registry";
import { Seo } from "@/components/layout/Seo";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Picture } from "@/components/Picture";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/sections/CtaBand";
import { Customisation } from "@/components/sections/Customisation";
import { PageHero } from "@/components/sections/PageHero";
import { Process } from "@/components/sections/Process";
import { fabricGroups, fabricsPage } from "@/content/fabrics";

function FabricChips({ names }: { names: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {names.map((name) => (
        <li key={name} className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-fg">
          {name}
        </li>
      ))}
    </ul>
  );
}

export default function FabricsPage() {
  const { guide } = fabricsPage;
  return (
    <>
      <Seo page="fabrics" />
      <PageHero {...fabricsPage.hero} />

      {/* Three fabric groups, 3 / 1 / 1 */}
      <section className="section-y bg-surface" aria-label="Fabric groups">
        <RevealGroup as="ul" className="container-page grid gap-4 lg:grid-cols-3 lg:gap-5">
          {fabricGroups.map((group) => (
            <RevealItem as="li" key={group.id}>
              <article id={group.id} className="flex h-full flex-col rounded-card border border-line bg-surface p-6 sm:p-8">
                <span className="grid size-12 place-items-center rounded-full bg-teal text-white">
                  <Icon name={group.icon} className="size-[22px]" />
                </span>
                <h2 className="text-h3 mt-6">{group.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{group.intro}</p>
                <dl className="mt-6 border-t border-line">
                  {group.fabrics.map((fabric) => (
                    <div key={fabric.name} className="border-b border-line py-4 last:border-b-0 sm:grid sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-6 lg:block">
                      <dt className="text-[16px] font-semibold text-fg">{fabric.name}</dt>
                      <dd className="mt-1 text-[15px] leading-relaxed text-muted sm:mt-0 lg:mt-1">{fabric.text}</dd>
                    </div>
                  ))}
                </dl>
                {group.image && (
                  // Fills the rest of the card on desktop so the three cards stay balanced.
                  <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl bg-chalk lg:aspect-auto lg:min-h-[220px] lg:flex-1">
                    <Picture
                      src={group.image.src}
                      alt={group.image.alt}
                      sizes="(min-width: 1024px) 340px, calc(100vw - 100px)"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                )}
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Which fabric for which uniform? */}
      <section className="section-y bg-chalk" aria-labelledby="guide-title">
        <div className="container-page">
          <SectionHeader id="guide-title" title={guide.title} intro={guide.note} />
          <Reveal>
            {/* Table on tablet and desktop */}
            <div className="hidden overflow-hidden rounded-card border border-line bg-surface sm:block">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">{guide.title}</caption>
                <thead>
                  <tr className="border-b border-line bg-ink text-white">
                    <th scope="col" className="w-[42%] px-6 py-4 text-sm font-semibold lg:px-8">
                      {guide.columns[0]}
                    </th>
                    <th scope="col" className="px-6 py-4 text-sm font-semibold lg:px-8">
                      {guide.columns[1]}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {guide.rows.map((row) => (
                    <tr key={row.use} className="border-b border-line transition-colors last:border-b-0 hover:bg-chalk/60">
                      <th scope="row" className="px-6 py-5 text-[16px] font-semibold text-fg lg:px-8">
                        {row.use}
                      </th>
                      <td className="px-6 py-5 lg:px-8">
                        <FabricChips names={row.fabrics} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Stacked cards on mobile */}
            <ul className="grid gap-3 sm:hidden">
              {guide.rows.map((row) => (
                <li key={row.use} className="rounded-card border border-line bg-surface p-5">
                  <p className="text-[16px] font-semibold text-fg">{row.use}</p>
                  <div className="mt-3">
                    <FabricChips names={row.fabrics} />
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Customisation variant="light" />
      <Process className="bg-chalk" />
      <CtaBand />
    </>
  );
}
