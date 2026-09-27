import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * False in the prerendered HTML and during hydration, true afterwards. Use it
 * for UI that depends on the URL query or browser-only state.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
