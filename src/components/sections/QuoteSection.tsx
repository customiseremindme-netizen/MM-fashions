import { Reveal } from "@/components/motion/Reveal";
import { home } from "@/content/home";
import { ContactList } from "./ContactList";
import { EnquiryForm } from "./EnquiryForm";

/** Home [11]: contact details beside the enquiry form, on Ink. */
export function QuoteSection() {
  return (
    <section id="quote" className="on-dark section-y bg-ink text-white" aria-labelledby="quote-title">
      <div className="container-page grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16 xl:gap-20">
        <Reveal>
          <span aria-hidden className="mb-5 block h-1 w-12 rounded-full bg-teal-light" />
          <h2 id="quote-title" className="text-h2 max-w-[18ch] text-white">
            {home.quote.title}
          </h2>
          <p className="text-lead mt-4 max-w-[46ch] text-white/75">{home.quote.intro}</p>
          <ContactList />
        </Reveal>
        <Reveal delay={0.1} className="on-light">
          <EnquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
