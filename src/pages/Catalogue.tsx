import { SearchX } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { FilterBar } from "@/components/catalogue/FilterBar";
import { Lightbox } from "@/components/catalogue/Lightbox";
import { ModelCard } from "@/components/catalogue/ModelCard";
import { ShortlistBar } from "@/components/catalogue/ShortlistBar";
import { Seo } from "@/components/layout/Seo";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/button";
import { catalogue } from "@/content/catalogue";
import { useHydrated } from "@/hooks/useHydrated";
import { useIsTabletUp } from "@/hooks/useMediaQuery";
import { useShortlist } from "@/hooks/useShortlist";
import { getModelsByRange, getRangeName, isRangeSlug, searchModels, type RangeSlug } from "@/lib/models";

const STAGGER = 0.035;

export default function CataloguePage() {
  const [params, setParams] = useSearchParams();
  // The prerendered page is the unfiltered catalogue (its first cards are in
  // the HTML); ?range= and ?q= apply once the page has hydrated, so server and
  // client markup always match.
  const hydrated = useHydrated();
  const rangeParam = params.get("range");
  const range: RangeSlug | null = hydrated && isRangeSlug(rangeParam) ? rangeParam : null;

  // The search box keeps its own state (so typing never lags) and mirrors
  // itself into ?q= for shareable links.
  const urlQuery = params.get("q") ?? "";
  const [queryState, setQuery] = useState(urlQuery);
  const query = hydrated ? queryState : "";
  const written = useRef(urlQuery);
  useEffect(() => {
    if (urlQuery !== written.current) {
      written.current = urlQuery;
      setQuery(urlQuery);
    }
  }, [urlQuery]);

  const updateParams = useCallback(
    (next: { range?: RangeSlug | null; q?: string }) => {
      setParams(
        (prev) => {
          const p = new URLSearchParams(prev);
          if ("range" in next) {
            if (next.range) p.set("range", next.range);
            else p.delete("range");
          }
          if ("q" in next) {
            if (next.q) p.set("q", next.q);
            else p.delete("q");
          }
          return p;
        },
        { replace: true, preventScrollReset: true },
      );
    },
    [setParams],
  );

  const onQueryChange = (value: string) => {
    setQuery(value);
    written.current = value.trim();
    updateParams({ q: value.trim() });
  };

  const inRange = getModelsByRange(range);
  const results = useMemo(() => searchModels(query, inRange), [query, inRange]);
  const elsewhere = useMemo(
    () => (range && query.trim() && results.length === 0 ? searchModels(query).length : 0),
    [range, query, results.length],
  );

  // 30 cards at a time on tablet and desktop, 12 on mobile.
  const pageSize = useIsTabletUp() ? 30 : 12;
  const [visible, setVisible] = useState(pageSize);
  const previousVisible = useRef(0);
  const lastFilter = useRef<string | null>(null);
  const filter = `${range ?? ""}|${query}`;
  useEffect(() => {
    // A new filter starts the grid's entry animation from the first card. If
    // only the page size changed (the prerendered 12 growing to 30 on wider
    // screens, or a resize), the cards already on screen stay put.
    // (`visible` is read, not a dependency: "Show more" must not re-run this.)
    previousVisible.current = lastFilter.current === filter ? Math.min(visible, results.length) : 0;
    lastFilter.current = filter;
    setVisible(pageSize);
  }, [filter, pageSize]);

  const shown = results.slice(0, visible);
  const showMore = () => {
    previousVisible.current = visible;
    setVisible((v) => v + pageSize);
  };

  const { has, toggle } = useShortlist();

  // Lightbox index into `results`.
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const onOpen = useCallback(
    (no: string) => {
      const i = results.findIndex((mdl) => mdl.no === no);
      if (i >= 0) setOpenIndex(i);
    },
    [results],
  );
  useEffect(() => setOpenIndex(null), [range, query]);

  const status = [
    `Showing ${shown.length} of ${results.length} ${results.length === 1 ? "model" : "models"}`,
    range ? ` in ${getRangeName(range)}` : "",
    query.trim() ? ` matching "${query.trim()}"` : "",
  ].join("");

  return (
    <>
      <Seo page="catalogue" />
      <PageHero {...catalogue.hero} next="chalk" compact />

      <section aria-labelledby="finder-title" className="bg-chalk">
        <h2 id="finder-title" className="sr-only">
          Model finder
        </h2>
        <FilterBar
          range={range}
          onRangeChange={(r) => updateParams({ range: r })}
          query={query}
          onQueryChange={onQueryChange}
        />

        <div className="container-page pt-6 pb-16 sm:pt-8 sm:pb-20 lg:pb-24">
          <div className="mb-6 flex flex-col gap-1.5 sm:mb-8 lg:flex-row lg:items-baseline lg:justify-between lg:gap-8">
            <p className="text-[15px] font-semibold text-fg" aria-live="polite">
              {status}
            </p>
            <p className="text-sm text-muted">{catalogue.hint}</p>
          </div>

          {!hydrated && <GridSkeleton count={pageSize} />}
          {results.length === 0 ? (
            <div className="flex flex-col items-center rounded-card border border-dashed border-fg/15 bg-surface px-6 py-16 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-chalk text-muted">
                <SearchX className="size-6" aria-hidden />
              </span>
              <p className="measure mt-5 text-[16px] text-fg">{catalogue.empty.text.replace("{query}", query.trim())}</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button type="button" variant="outline" onClick={() => onQueryChange("")}>
                  {catalogue.empty.clear}
                </Button>
                {elsewhere > 0 && (
                  <Button type="button" onClick={() => updateParams({ range: null })}>
                    {catalogue.empty.elsewhere} ({elsewhere})
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <ul
              key={range ?? "all"}
              data-ssr-grid={hydrated ? undefined : ""}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-[repeat(auto-fill,minmax(176px,1fr))]"
            >
              {shown.map((model, i) => (
                <ModelCard
                  key={model.no}
                  model={model}
                  selected={has(model.no)}
                  onToggle={toggle}
                  onOpen={onOpen}
                  // Lazy in the prerendered HTML so the cards don't compete with
                  // the first paint; the first six switch to eager once hydrated.
                  eager={hydrated && i < 6}
                  animateIn={hydrated}
                  delay={Math.min(Math.max(0, i - previousVisible.current) * STAGGER, 1.2)}
                />
              ))}
            </ul>
          )}

          {visible < results.length && (
            <div className="mt-10 flex flex-col items-center gap-3">
              <Button type="button" variant="dark" size="lg" onClick={showMore}>
                {catalogue.showMore}
              </Button>
              <p className="text-sm text-muted tabular-nums">
                {results.length - visible} more to see
              </p>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        title={catalogue.cta.title}
        text={catalogue.cta.text}
        whatsappLabel={catalogue.cta.whatsapp}
        callLabel={catalogue.cta.call}
      />

      <Lightbox
        list={results}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
        isSelected={has}
        onToggle={toggle}
      />
      <ShortlistBar />
    </>
  );
}

/**
 * Same footprint as the real cards. Part of the prerendered HTML but hidden,
 * unless the link carries ?range= or ?q= (see index.html and index.css), so
 * those visitors never see the unfiltered cards before the filter applies.
 */
function GridSkeleton({ count }: { count: number }) {
  return (
    <ul aria-hidden data-ssr-skeleton="" className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-[repeat(auto-fill,minmax(176px,1fr))]">
      {Array.from({ length: count }, (_, i) => (
        <li key={i} className="flex flex-col rounded-card border border-line bg-surface">
          <span className="m-[10px] block aspect-square rounded-xl bg-chalk" />
          <span className="flex items-center gap-2 border-t border-line/70 py-2 pr-2 pl-3 sm:pl-4">
            <span className="flex-1">
              <span className="block h-4 w-10 rounded bg-chalk" />
              <span className="mt-1.5 block h-3 w-20 rounded bg-chalk" />
            </span>
            <span className="size-11 rounded-full border border-line" />
          </span>
        </li>
      ))}
    </ul>
  );
}
