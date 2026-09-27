import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Reveal } from "@/components/motion/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/config/site";
import { faq } from "@/content/faq";

/** "Questions buyers ask", 38 / 62 on desktop, first answer open. */
export function Faq() {
  return (
    <section id={faq.id} className="section-y bg-white" aria-labelledby="faq-title">
      <div className="container-page grid gap-10 lg:grid-cols-[38fr_62fr] lg:gap-16 xl:gap-24">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <span aria-hidden className="mb-5 block h-1 w-12 rounded-full bg-teal" />
          <h2 id="faq-title" className="text-h2 max-w-[16ch]">
            {faq.title}
          </h2>
          <p className="text-lead mt-4 max-w-[34ch] text-muted">{faq.intro}</p>
          <Button asChild variant="whatsapp" className="mt-8">
            <a href={whatsappLink(faq.whatsappMessage)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-[18px]" />
              {faq.cta}
            </a>
          </Button>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible defaultValue="faq-0" className="border-t border-line">
            {faq.items.map((item, i) => (
              <AccordionItem key={item.q} value={`faq-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
