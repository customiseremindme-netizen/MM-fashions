import { ArrowUpRight, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Seo } from "@/components/layout/Seo";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { site } from "@/config/site";
import { contactPage } from "@/content/contact";

const cardClass =
  "group flex h-full flex-col rounded-card border border-line bg-white p-6 transition-[transform,box-shadow,border-color] duration-500 ease-premium hover:-translate-y-1 hover:border-transparent hover:shadow-[0_22px_48px_-28px_rgba(28,31,38,0.45)] sm:p-7";

function CardHead({ icon: IconCmp, title, tone = "teal" }: { icon: LucideIcon | typeof WhatsAppIcon; title: string; tone?: "teal" | "green" }) {
  return (
    <>
      <span className={tone === "green" ? "grid size-12 place-items-center rounded-full bg-whatsapp text-white" : "grid size-12 place-items-center rounded-full bg-teal text-white"}>
        <IconCmp className="size-[22px]" aria-hidden />
      </span>
      <h2 className="text-h3 mt-6">{title}</h2>
    </>
  );
}

function LinkCard({ href, external, children }: { href: string; external?: boolean; children: ReactNode }) {
  return (
    <a href={href} className={cardClass} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
      <ArrowUpRight aria-hidden className="mt-auto size-5 translate-y-3 self-end text-ink/30 transition-[color,transform] duration-500 ease-premium group-hover:-translate-y-0 group-hover:translate-x-0.5 group-hover:text-red" />
    </a>
  );
}

export default function ContactPage() {
  const { cards, map } = contactPage;
  return (
    <>
      <Seo page="contact" />
      <PageHero {...contactPage.hero} />

      <section className="section-y bg-white" aria-label="Ways to reach us">
        <RevealGroup as="ul" className="container-page grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          <RevealItem as="li">
            <div className={cardClass}>
              <CardHead icon={Phone} title={cards.call.title} />
              <div className="mt-3 flex flex-col">
                {site.phones.map((p) => (
                  <a key={p.href} href={p.href} className="inline-flex min-h-11 items-center text-[16px] font-medium text-ink transition-colors hover:text-red">
                    {p.label}
                  </a>
                ))}
              </div>
            </div>
          </RevealItem>
          <RevealItem as="li">
            <LinkCard href={site.whatsapp.quoteUrl} external>
              <CardHead icon={WhatsAppIcon} title={cards.whatsapp.title} tone="green" />
              <p className="mt-3 text-[16px] text-muted">
                {cards.whatsapp.text.replace(site.whatsapp.label, "")}
                <span className="whitespace-nowrap">{site.whatsapp.label}</span>
              </p>
            </LinkCard>
          </RevealItem>
          <RevealItem as="li">
            <LinkCard href={`mailto:${site.email}`}>
              <CardHead icon={Mail} title={cards.email.title} />
              <p className="mt-3 text-[16px] font-medium break-words text-ink">
                {/* Break after the @ rather than mid-word on narrow cards. */}
                {site.email.split("@")[0]}@<wbr />
                {site.email.split("@")[1]}
              </p>
            </LinkCard>
          </RevealItem>
          <RevealItem as="li">
            <LinkCard href={site.mapsUrl} external>
              <CardHead icon={MapPin} title={cards.visit.title} />
              <p className="mt-3 text-[16px] text-muted">{cards.visit.text}</p>
            </LinkCard>
          </RevealItem>
        </RevealGroup>
      </section>

      <section className="section-y bg-chalk" aria-label="Send your requirement and factory address">
        <div className="container-page grid gap-10 lg:grid-cols-[52fr_48fr] lg:gap-12 xl:gap-16">
          <Reveal>
            <EnquiryForm className="border border-line shadow-none" />
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col lg:pt-2">
            <h3 className="text-h3">{map.title}</h3>
            <address className="mt-4 text-copy not-italic">
              {site.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex min-h-11 items-center gap-2 self-start text-[15px] font-semibold text-teal hover:text-ink"
            >
              {map.open}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </a>
            <div className="mt-6 h-[280px] overflow-hidden rounded-card border border-line bg-white sm:h-[320px] lg:h-[360px]">
              <iframe
                title={map.iframeTitle}
                src={site.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Faq />
    </>
  );
}
