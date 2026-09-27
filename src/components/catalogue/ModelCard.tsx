import { m, useReducedMotion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { memo, useState } from "react";
import { ModelImage } from "@/components/ModelImage";
import { catalogue } from "@/content/catalogue";
import { getRangeName, type Model } from "@/lib/models";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ModelCardProps = {
  model: Model;
  selected: boolean;
  onToggle: (no: string) => void;
  onOpen: (no: string) => void;
  /** Stagger delay for the fade-in, in seconds. */
  delay: number;
  eager?: boolean;
};

export const ModelCard = memo(function ModelCard({ model, selected, onToggle, onOpen, delay, eager }: ModelCardProps) {
  const reduce = useReducedMotion();
  const [touched, setTouched] = useState(false);
  const rangeName = getRangeName(model.range);

  return (
    <m.li
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay }}
      className="list-none"
    >
      <article
        className={cn(
          "group relative flex h-full flex-col rounded-card border bg-white transition-[transform,box-shadow,border-color] duration-500 ease-premium hover:-translate-y-1 hover:shadow-[0_22px_48px_-28px_rgba(28,31,38,0.45)]",
          selected ? "border-red ring-1 ring-red" : "border-line",
        )}
      >
        <button
          type="button"
          data-cursor="view"
          aria-haspopup="dialog"
          onClick={() => onOpen(model.no)}
          className="block overflow-hidden rounded-t-[15px] p-[10px]"
        >
          <ModelImage
            model={model}
            eager={eager}
            className="w-full transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
          />
        </button>
        <div className="flex items-center gap-2 border-t border-line/70 py-2 pr-2 pl-3 sm:pl-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] leading-tight font-bold text-ink tabular-nums">{model.no}</p>
            <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-muted">{rangeName}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setTouched(true);
              onToggle(model.no);
            }}
            aria-pressed={selected}
            aria-label={`${selected ? catalogue.shortlist.remove : catalogue.shortlist.add}: model ${model.no}`}
            className={cn(
              "grid size-11 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color] duration-300",
              selected ? "border-red bg-red text-white" : "border-line bg-white text-ink hover:border-ink hover:bg-ink hover:text-white",
            )}
          >
            <span key={String(selected)} className={cn("grid place-items-center", touched && "animate-pop")}>
              {selected ? <Check className="size-[18px]" strokeWidth={2.5} /> : <Plus className="size-[18px]" strokeWidth={2.25} />}
            </span>
          </button>
        </div>
      </article>
    </m.li>
  );
});
