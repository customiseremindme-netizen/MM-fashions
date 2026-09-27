import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { catalogue } from "@/content/catalogue";
import { getRangeCount, ranges, totalModelCount, type RangeSlug } from "@/lib/models";
import { cn } from "@/lib/utils";

type FilterBarProps = {
  range: RangeSlug | null;
  onRangeChange: (range: RangeSlug | null) => void;
  query: string;
  onQueryChange: (query: string) => void;
};

const FADE = 48;

/**
 * Horizontal chip row that can be scrolled by touch, trackpad, mouse drag or
 * the arrow buttons. Reports which ends still have chips out of view.
 */
function useChipScroller() {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{ x: number; start: number; moved: boolean; id: number } | null>(null);
  const suppressClick = useRef(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const left = el.scrollLeft > 2;
    const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 2;
    setEdges((prev) => (prev.left === left && prev.right === right ? prev : { left, right }));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update]);

  // Mouse drag to scroll. Touch keeps the browser's native swipe.
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { x: e.clientX, start: e.currentTarget.scrollLeft, moved: false, id: e.pointerId };
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      setDragging(true);
      e.currentTarget.setPointerCapture(d.id);
    }
    if (d.moved) e.currentTarget.scrollLeft = d.start - dx;
  };
  const onPointerEnd = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (!d.moved) return;
    setDragging(false);
    if (e.currentTarget.hasPointerCapture(d.id)) e.currentTarget.releasePointerCapture(d.id);
    // A drag should not also select the chip it started on.
    suppressClick.current = true;
    window.setTimeout(() => (suppressClick.current = false), 0);
  };
  const onClickCapture = (e: MouseEvent) => {
    if (!suppressClick.current) return;
    e.preventDefault();
    e.stopPropagation();
    suppressClick.current = false;
  };

  const scrollBy = (direction: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: direction * el.clientWidth * 0.7, behavior: "smooth" });
  };

  const mask = `linear-gradient(to right, ${edges.left ? "transparent" : "#000"} 0, #000 ${FADE}px, #000 calc(100% - ${FADE}px), ${
    edges.right ? "transparent" : "#000"
  } 100%)`;

  return {
    ref,
    edges,
    dragging,
    scrollBy,
    rowProps: {
      onScroll: update,
      onPointerDown,
      onPointerMove,
      onPointerUp: onPointerEnd,
      onPointerCancel: onPointerEnd,
      onClickCapture,
      style: { maskImage: mask, WebkitMaskImage: mask },
    },
  };
}

/**
 * Sticky bar under the header: range chips with counts and a model-number
 * search. On mobile the search sits on top and the chips scroll edge to edge.
 */
export function FilterBar({ range, onRangeChange, query, onQueryChange }: FilterBarProps) {
  const { ref: scroller, edges, dragging, scrollBy, rowProps } = useChipScroller();

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

        <div className="relative lg:order-1 lg:min-w-0 lg:flex-1">
          <div
            ref={scroller}
            role="group"
            aria-label="Filter by range"
            {...rowProps}
            className={cn(
              "no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] select-none lg:mx-0 lg:px-0",
              dragging ? "cursor-grabbing [&_button]:cursor-grabbing" : "lg:cursor-grab",
            )}
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

          {/* Desktop arrows, shown only while there are chips out of view on that side. */}
          {(["left", "right"] as const).map((side) =>
            edges[side] ? (
              <button
                key={side}
                type="button"
                tabIndex={-1}
                aria-label={side === "left" ? "Show earlier ranges" : "Show more ranges"}
                onClick={() => scrollBy(side === "left" ? -1 : 1)}
                className={cn(
                  "absolute top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-ink shadow-[0_6px_16px_-8px_rgba(28,31,38,0.35)] transition-colors hover:border-ink hover:bg-ink hover:text-white lg:grid",
                  side === "left" ? "-left-3" : "-right-3",
                )}
              >
                {side === "left" ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
              </button>
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
}
