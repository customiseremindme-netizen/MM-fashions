import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { ctaBand } from "@/content/shared";

type CtaBandProps = {
  title?: string;
  text?: string;
  whatsappLabel?: string;
  callLabel?: string;
};

/** Ink call-to-action band at the foot of About, Collections, Fabrics and Catalogue. */
export function CtaBand({
  title = ctaBand.title,
  text = ctaBand.text,
  whatsappLabel = ctaBand.whatsappLabel,
  callLabel = ctaBand.callLabel,
}: CtaBandProps) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink text-white">
      <div
        aria-hidden
        className="motion-static absolute top-1/2 -right-56 -z-10 size-[560px] -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-teal-light/25 lg:-right-32"
      />
      <div aria-hidden className="absolute top-1/2 -right-40 -z-10 size-[380px] -translate-y-1/2 rounded-full border-[10px] border-teal/30 lg:-right-16" />
      <Reveal className="container-page section-y grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
        <div>
          <span aria-hidden className="mb-5 block h-1 w-12 rounded-full bg-teal-light" />
          <h2 className="text-h2 max-w-[22ch] text-white">{title}</h2>
          <p className="text-lead measure mt-4 text-white/75">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <Button asChild variant="whatsapp" size="lg">
            <a href={site.whatsapp.quoteUrl} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-5" />
              {whatsappLabel}
            </a>
          </Button>
          <Button asChild variant="outlineLight" size="lg">
            <a href={site.phones[0].href}>
              <Phone className="size-[18px]" aria-hidden />
              {callLabel}
            </a>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
