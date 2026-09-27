import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { site } from "@/config/site";

/**
 * 58px WhatsApp button, bottom right, with a soft ping ring. It rises above
 * the catalogue shortlist bar through the --shortlist-offset variable that
 * the bar sets while it is open.
 */
export function FloatingWhatsApp() {
  return (
    <a
      href={site.whatsapp.quoteUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with M.M Fashions on WhatsApp"
      data-cursor="cta"
      className="group fixed right-4 bottom-4 z-40 grid size-[58px] place-items-center rounded-full bg-whatsapp text-white shadow-[0_12px_30px_-10px_rgba(31,168,85,0.65)] transition-transform duration-500 ease-premium sm:right-6 sm:bottom-6"
      style={{ transform: "translate3d(0, calc(-1 * var(--shortlist-offset, 0px)), 0)" }}
    >
      <span aria-hidden className="motion-static absolute inset-0 animate-ping-soft rounded-full bg-whatsapp" />
      <WhatsAppIcon className="relative size-7 transition-transform duration-300 group-hover:scale-110" />
    </a>
  );
}
