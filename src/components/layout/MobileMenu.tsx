import { Menu } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useIsDesktop } from "@/hooks/useMediaQuery";

// The panel (and the Radix dialog code behind it) loads on first open.
const loadPanel = () => import("./MobileMenuPanel");
const MobileMenuPanel = lazy(loadPanel);

type MobileMenuProps = { open: boolean; onOpenChange: (open: boolean) => void };

/** Hamburger below 1024px, opening the full-height slide-down menu. */
export function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const desktop = useIsDesktop();
  const [requested, setRequested] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) setRequested(true);
  }, [open]);

  // Close if the window grows past the breakpoint while the menu is open.
  useEffect(() => {
    if (desktop && open) onOpenChange(false);
  }, [desktop, open, onOpenChange]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        data-cursor="cta"
        onClick={() => onOpenChange(true)}
        onPointerEnter={() => void loadPanel()}
        onFocus={() => void loadPanel()}
        className="grid size-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink lg:hidden"
      >
        <Menu className="size-5" strokeWidth={2} />
      </button>
      {requested && (
        <Suspense fallback={null}>
          <MobileMenuPanel open={open} onOpenChange={onOpenChange} returnFocusTo={trigger} />
        </Suspense>
      )}
    </>
  );
}
