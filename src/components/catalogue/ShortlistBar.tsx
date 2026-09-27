import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { catalogue } from "@/content/catalogue";
import { useShortlist } from "@/hooks/useShortlist";
import { ease } from "@/lib/motion";
import { shortlistWhatsappUrl } from "@/lib/whatsapp";

const PREVIEW = 8;

/**
 * Fixed Ink bar that slides up once anything is shortlisted. While open it
 * publishes its height as --shortlist-offset, which lifts the floating
 * WhatsApp button and pads the page so nothing is hidden behind it.
 */
export function ShortlistBar() {
  const { items, clear } = useShortlist();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const open = items.length > 0;

  useEffect(() => {
    const root = document.documentElement;
    const el = ref.current;
    if (!open || !el) {
      root.style.setProperty("--shortlist-offset", "0px");
      return;
    }
    const sync = () => root.style.setProperty("--shortlist-offset", `${el.offsetHeight}px`);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.setProperty("--shortlist-offset", "0px");
    };
  }, [open]);

  const s = catalogue.shortlist;
  const preview = items.slice(0, PREVIEW).join(", ") + (items.length > PREVIEW ? ` +${items.length - PREVIEW} more` : "");

  return (
    <AnimatePresence>
      {open && (
        <m.div
          ref={ref}
          role="region"
          aria-label="Shortlist"
          className="on-dark fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink text-white shadow-[0_-20px_40px_-24px_rgba(0,0,0,0.5)]"
          initial={reduce ? { opacity: 0 } : { y: "100%" }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: "100%" }}
          transition={{ duration: 0.5, ease }}
        >
          <div className="container-page flex flex-col gap-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:gap-6 sm:py-4">
            <div className="flex min-w-0 flex-1 items-center gap-3.5">
              <span
                key={items.length}
                className="grid size-10 shrink-0 animate-pop place-items-center rounded-full bg-red text-sm font-bold tabular-nums"
                aria-hidden
              >
                {items.length}
              </span>
              <div className="min-w-0 flex-1" aria-live="polite">
                <p className="text-[15px] font-semibold">
                  {items.length} {items.length === 1 ? s.one : s.many}
                </p>
                <p className="truncate text-sm text-white/60 tabular-nums">{preview}</p>
              </div>
              <Button type="button" variant="ghostLight" size="sm" onClick={clear} className="sm:hidden">
                {s.clear}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button type="button" variant="ghostLight" size="sm" onClick={clear} className="hidden sm:inline-flex">
                {s.clear}
              </Button>
              <Button asChild variant="whatsapp" className="w-full sm:w-auto">
                <a href={shortlistWhatsappUrl(items)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-[18px]" />
                  {s.send}
                </a>
              </Button>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
