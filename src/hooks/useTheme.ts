import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

export const THEME_KEY = "mm-fashions:theme";
const THEME_COLOR = { light: "#1C1F26", dark: "#0B0C0F" } as const;

function stored(): Theme | null {
  try {
    const value = window.localStorage.getItem(THEME_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function apply(theme: Theme, animate: boolean) {
  const root = document.documentElement;
  const run = () => {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
  };
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (animate && !reduce && "startViewTransition" in document) {
    (document as Document & { startViewTransition: (cb: () => void) => unknown }).startViewTransition(run);
  } else {
    run();
  }
}

/**
 * Light / dark theme. The inline script in index.html sets the theme before
 * the first paint (saved choice, else the system setting); this hook reads it
 * after hydration, follows system changes until the visitor picks one, and
 * saves an explicit choice.
 */
export function useTheme() {
  // Unknown in the prerendered HTML and during hydration.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      if (stored()) return;
      const next: Theme = mql.matches ? "dark" : "light";
      apply(next, true);
      setTheme(next);
    };
    mql.addEventListener("change", onSystemChange);
    return () => mql.removeEventListener("change", onSystemChange);
  }, []);

  const toggle = useCallback(() => {
    const current: Theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const next: Theme = current === "dark" ? "light" : "dark";
    apply(next, true);
    setTheme(next);
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      // Storage unavailable: the choice lasts for this visit.
    }
  }, []);

  return { theme, toggle };
}
