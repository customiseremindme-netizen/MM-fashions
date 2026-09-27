import { useCallback, useSyncExternalStore } from "react";

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Tablet and up (≥640px). */
export const useIsTabletUp = () => useMediaQuery("(min-width: 640px)");
/** Desktop (≥1024px). */
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
