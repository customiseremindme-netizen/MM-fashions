import { Search, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { catalogue } from "@/content/catalogue";
import { getRangeCount, ranges, totalModelCount, type RangeSlug } from "@/lib/models";
import { cn } from "@/lib/utils";

type FilterBarProps = {
  range: RangeSlug | null;
  onRangeChange: (range: RangeSlug | null) => void;
  query: string;
  onQueryChange: (query: string) => void;
};

/**
 * Sticky bar under the header: range chips with counts and a model-number
 * search. On mobile the search sits on top and the chips scroll edge to edge.
 */
export function FilterBar({ range, onRangeChange, query, onQueryChange }: FilterBarProps) {
  const scroller = useRef<HTMLDivElement>(null);

  // Keep the active chip in view, e.g. after arriving on ?range=kg.
  useEffect(() => {
    const el = scroller.current;
    const chip = el?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!el || !chip) return;
    const left = chip.offsetLeft - el.clientWidth / 2 + chip.offsetWidth / 2;
    el.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [range]);

  const chips: { slug: RangeSlug | null; name: string; count: number }[] = [
    { slug: null, name: catalogue.allLabel, count: totalModelCount },
    ...ranges.map((r) => ({ slug: r.slug, name: r.name, count: getRangeCount(r.slug) })),
  ];

  return (
    <div className="sticky top-16 z-30 border-b border-line bg-chalk">
      <div className="container-page flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:gap-6 lg:py-4">
        <div className="relative lg:order-2 lg:w-72 lg:shrink-0">
          <label htmlFor="model-search" className="sr-only">
            {catalogue.searchLabel}
          </label>
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-muted" />
          <input
            id="model-search"
            type="search"
            inputMode="numeric"
            autoComplete="off"
            enterKeyHint="search"
            placeholder={catalogue.searchPlaceholder}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="h-12 w-full rounded-full border border-line bg-white pr-12 pl-11 text-[15px] text-ink placeholder:text-muted/80 transition-[border-color,box-shadow] hover:border-ink/25 focus-visible:border-teal focus-visible:ring-4 focus-visible:ring-teal/15 focus-visible:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              aria-label={catalogue.empty.clear}
              className="absolute top-1/2 right-1 grid size-10 -translate-y-1/2 place-items-center rounded-full text-muted transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div
          ref={scroller}
          role="group"
          aria-label="Filter by range"
          className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] lg:order-1 lg:mx-0 lg:min-w-0 lg:flex-1 lg:px-0 lg:[mask-image:linear-gradient(to_right,#000_92%,transparent)]"
        >
          {chips.map((chip) => {
            const active = chip.slug === range;
            return (
              <button
                key={chip.slug ?? "all"}
                type="button"
                aria-pressed={active}
                onClick={() => onRangeChange(chip.slug)}
                className={cn(
                  "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-colors duration-300",
                  active ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink/40",
                )}
              >
                {chip.name}
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-xs leading-none font-semibold tabular-nums",
                    active ? "bg-white/15 text-white" : "bg-chalk text-muted",
                  )}
                >
                  {chip.count}
                </span>
              </button>
            );
          })}
          <span aria-hidden className="w-6 shrink-0 lg:w-10" />
        </div>
      </div>
    </div>
  );
}
