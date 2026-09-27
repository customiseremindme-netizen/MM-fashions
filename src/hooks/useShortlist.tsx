import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getModelByNumber } from "@/lib/models";

const STORAGE_KEY = "mm-fashions:shortlist";

type ShortlistContextValue = {
  /** Model numbers in the order they were added. */
  items: string[];
  has: (no: string) => boolean;
  toggle: (no: string) => void;
  clear: () => void;
};

const ShortlistContext = createContext<ShortlistContextValue | null>(null);

function read(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    // Drop anything that is no longer in models.json.
    return [...new Set(parsed.filter((no): no is string => typeof no === "string" && !!getModelByNumber(no)))];
  } catch {
    return [];
  }
}

function write(items: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage can be unavailable (private mode, quota); the shortlist still works for this visit.
  }
}

export function ShortlistProvider({ children }: { children: ReactNode }) {
  // Empty for the prerendered HTML and hydration; the saved list loads after mount.
  const [items, setItems] = useState<string[]>([]);

  // Load the saved list, and keep several open tabs in step.
  useEffect(() => {
    setItems(read());
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setItems(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const update = useCallback((next: (prev: string[]) => string[]) => {
    setItems((prev) => {
      const value = next(prev);
      write(value);
      return value;
    });
  }, []);

  const toggle = useCallback(
    (no: string) => update((prev) => (prev.includes(no) ? prev.filter((n) => n !== no) : [...prev, no])),
    [update],
  );
  const clear = useCallback(() => update(() => []), [update]);

  const value = useMemo<ShortlistContextValue>(() => {
    const set = new Set(items);
    return { items, has: (no) => set.has(no), toggle, clear };
  }, [items, toggle, clear]);

  return <ShortlistContext.Provider value={value}>{children}</ShortlistContext.Provider>;
}

export function useShortlist() {
  const ctx = useContext(ShortlistContext);
  if (!ctx) throw new Error("useShortlist must be used inside <ShortlistProvider>");
  return ctx;
}
