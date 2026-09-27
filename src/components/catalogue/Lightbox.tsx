import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { ModelImage } from "@/components/ModelImage";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/config/site";
import { catalogue } from "@/content/catalogue";
import { getRangeName, modelAlt, modelLabel, type Model } from "@/lib/models";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type LightboxProps = {
  /** The models currently shown in the grid; prev/next move through these. */
  list: Model[];
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  isSelected: (no: string) => boolean;
  onToggle: (no: string) => void;
};

const SWIPE_THRESHOLD = 50;

/**
 * Large product view. Radix Dialog gives focus trapping, Escape and
 * backdrop-click close; arrow keys, the side buttons and swipes move between
 * models (wrapping at the ends).
 */
export function Lightbox({ list, index, onIndexChange, onClose, isSelected, onToggle }: LightboxProps) {
  const reduce = useReducedMotion();
  const open = index !== null && index >= 0 && index < list.length;
  const model = open ? list[index] : null;
  const [direction, setDirection] = useState(0);

  const go = (step: number) => {
    if (index === null || list.length < 2) return;
    setDirection(step);
    onIndexChange((index + step + list.length) % list.length);
  };

  // Warm the neighbours so browsing feels instant.
  useEffect(() => {
    if (index === null || list.length < 2) return;
    for (const step of [1, -1]) {
      const neighbour = list[(index + step + list.length) % list.length];
      const img = new Image();
      img.src = neighbour.img;
    }
  }, [index, list]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  // Swipe: follow the finger, then change model past a threshold.
  const start = useRef<{ x: number; y: number; id: number } | null>(null);
  const [dragX, setDragX] = useState(0);
  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === "mouse") return;
    start.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
  };
  const onPointerMove = (e: PointerEvent) => {
    if (!start.current || start.current.id !== e.pointerId) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    if (Math.abs(dx) > Math.abs(dy)) setDragX(dx);
  };
  const onPointerEnd = (e: PointerEvent) => {
    if (!start.current || start.current.id !== e.pointerId) return;
    const dx = e.clientX - start.current.x;
    start.current = null;
    setDragX(0);
    if (dx <= -SWIPE_THRESHOLD) go(1);
    else if (dx >= SWIPE_THRESHOLD) go(-1);
  };

  const selected = model ? isSelected(model.no) : false;

  return (
    <Dialog.Root open={open} onOpenChange={(value) => !value && onClose()}>
      <AnimatePresence>
        {open && model && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay forceMount asChild>
              <m.div
                className="fixed inset-0 z-50 bg-ink/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Dialog.Overlay>
            <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
              <Dialog.Content forceMount asChild onKeyDown={onKeyDown} aria-describedby="lightbox-range">
                <m.div
                  className="pointer-events-auto relative grid max-h-full w-full max-w-[1040px] overflow-y-auto rounded-card bg-white shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] lg:grid-cols-[minmax(0,1fr)_340px] lg:overflow-hidden"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
                  transition={{ duration: 0.4, ease }}
                >
                  {/* Image */}
                  <div
                    className="relative touch-pan-y bg-white select-none"
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerEnd}
                    onPointerCancel={onPointerEnd}
                  >
                    <div
                      className="relative mx-auto aspect-square w-full max-w-[min(100%,calc(100dvh-260px))] lg:max-w-[min(100%,calc(100dvh-48px))]"
                      style={{
                        transform: `translate3d(${dragX}px, 0, 0)`,
                        transition: dragX ? "none" : "transform 0.3s var(--ease-premium)",
                      }}
                    >
                      <AnimatePresence initial={false} custom={direction}>
                        <m.div
                          key={model.no}
                          className="absolute inset-0 p-5 sm:p-8"
                          initial={reduce ? { opacity: 0 } : { opacity: 0, x: direction * 60 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={reduce ? { opacity: 0 } : { opacity: 0, x: direction * -60 }}
                          transition={{ duration: 0.35, ease }}
                        >
                          <LightboxImage model={model} />
                        </m.div>
                      </AnimatePresence>
                    </div>

                    {list.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => go(-1)}
                          aria-label={catalogue.lightbox.previous}
                          className="absolute top-1/2 left-2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-white/90 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white sm:left-4 sm:size-12"
                        >
                          <ChevronLeft className="size-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => go(1)}
                          aria-label={catalogue.lightbox.next}
                          className="absolute top-1/2 right-2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-white/90 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white sm:right-4 sm:size-12"
                        >
                          <ChevronRight className="size-5" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex flex-col border-t border-line p-5 sm:p-7 lg:border-t-0 lg:border-l lg:p-8">
                    <p className="text-sm font-medium text-muted tabular-nums">
                      {index + 1} / {list.length}
                    </p>
                    <Dialog.Title className="text-h2 mt-1 lg:mt-4">{modelLabel(model)}</Dialog.Title>
                    <p id="lightbox-range" className="mt-2 text-[15px] font-medium text-teal">
                      {getRangeName(model.range)}
                    </p>
                    <p className="mt-5 hidden text-[15px] leading-relaxed text-muted lg:block">{catalogue.hint}</p>

                    <div className="mt-5 flex flex-col gap-3 lg:mt-auto">
                      <Button
                        type="button"
                        variant={selected ? "outline" : "primary"}
                        onClick={() => onToggle(model.no)}
                        aria-pressed={selected}
                        className={cn(selected && "border-red text-red hover:border-red hover:bg-red hover:text-white")}
                      >
                        {selected ? <Check className="size-[18px]" strokeWidth={2.5} /> : <Plus className="size-[18px]" strokeWidth={2.25} />}
                        {selected ? catalogue.shortlist.remove : catalogue.shortlist.add}
                      </Button>
                      <a
                        href={whatsappLink(
                          catalogue.lightbox.askMessage.replace("{model}", model.no).replace("{range}", getRangeName(model.range)),
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-teal"
                      >
                        <WhatsAppIcon className="size-4 text-whatsapp" />
                        {catalogue.lightbox.ask}
                      </a>
                      <p className="hidden text-center text-xs text-muted lg:block">
                        <kbd className="rounded border border-line px-1.5 py-0.5 font-sans">←</kbd>{" "}
                        <kbd className="rounded border border-line px-1.5 py-0.5 font-sans">→</kbd> to browse ·{" "}
                        <kbd className="rounded border border-line px-1.5 py-0.5 font-sans">Esc</kbd> to close
                      </p>
                    </div>
                  </div>

                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label={catalogue.lightbox.close}
                      className="absolute top-2 right-2 z-10 grid size-11 place-items-center rounded-full bg-ink text-white transition-colors hover:bg-red sm:top-3 sm:right-3"
                    >
                      <X className="size-5" />
                    </button>
                  </Dialog.Close>
                </m.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

/** Shows the cached thumbnail at once, then fades in the full-size original. */
function LightboxImage({ model }: { model: Model }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative size-full">
      <ModelImage model={model} eager alt="" sizes="600px" className="absolute inset-0 size-full" />
      <img
        src={model.img}
        alt={modelAlt(model)}
        width={1000}
        height={1000}
        draggable={false}
        onLoad={() => setLoaded(true)}
        className={cn(
          "absolute inset-0 size-full object-contain transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
