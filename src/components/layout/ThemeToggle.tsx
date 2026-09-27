import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

/**
 * Light / dark switch. Both icons are rendered and CSS shows the right one,
 * so the prerendered HTML matches whatever theme the page opens in.
 */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Dark mode"
      aria-pressed={theme === null ? undefined : theme === "dark"}
      title="Switch light / dark mode"
      data-cursor="cta"
      className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-fg transition-colors hover:border-fg"
    >
      <Moon aria-hidden className="size-[18px] dark:hidden" strokeWidth={2} />
      <Sun aria-hidden className="hidden size-[18px] dark:block" strokeWidth={2} />
    </button>
  );
}
