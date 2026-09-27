import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "cta" | "view" | "hidden";

const SELECTOR_VIEW = '[data-cursor="view"]';
const SELECTOR_CTA = '[data-cursor="cta"], a, button, [role="button"], summary, label[for]';
const SELECTOR_NATIVE = "input, textarea, select, iframe, [contenteditable]";

/**
 * Desktop-only cursor: a small circle that follows the pointer exactly (no
 * lag), grows slightly over links and buttons, and becomes a "VIEW" disc over
 * catalogue products. Off for touch, coarse pointers, small screens and
 * reduced motion; the native cursor returns over form fields and the map.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>("hidden");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mql = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(mql.matches && !motion.matches);
    update();
    mql.addEventListener("change", update);
    motion.addEventListener("change", update);
    return () => {
      mql.removeEventListener("change", update);
      motion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    let current: CursorState = "hidden";
    let frame = 0;
    let x = -100;
    let y = -100;

    const set = (next: CursorState) => {
      if (next !== current) {
        current = next;
        setState(next);
      }
    };

    const paint = () => {
      frame = 0;
      if (ref.current) ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    let active = false;
    const classify = (target: Element | null) => {
      if (!target || target.closest(SELECTOR_NATIVE)) set("hidden");
      else if (target.closest(SELECTOR_VIEW)) set("view");
      else if (target.closest(SELECTOR_CTA)) set("cta");
      else set("default");
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") {
        active = false;
        root.classList.remove("has-custom-cursor");
        set("hidden");
        return;
      }
      active = true;
      root.classList.add("has-custom-cursor");
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
      classify(e.target instanceof Element ? e.target : null);
    };
    // The page can change under a still pointer (a dialog opens, the page
    // scrolls), so look again at what is under it.
    let recheck = 0;
    const onChange = () => {
      if (!active || recheck) return;
      recheck = requestAnimationFrame(() => {
        recheck = 0;
        classify(document.elementFromPoint(x, y));
      });
    };
    const onClick = () => window.setTimeout(onChange, 60);
    const onLeave = () => set("hidden");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onChange, { passive: true });
    window.addEventListener("click", onClick, true);
    window.addEventListener("keyup", onChange);
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onChange);
      window.removeEventListener("click", onClick, true);
      window.removeEventListener("keyup", onChange);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      if (frame) cancelAnimationFrame(frame);
      if (recheck) cancelAnimationFrame(recheck);
      root.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  const view = state === "view";
  const size = view ? 84 : state === "cta" ? 40 : 14;

  return (
    // Difference blending sits on the outer fixed element: it forms its own
    // stacking context, so it is the one that can blend with the page behind
    // it. That turns the white circle dark on light backgrounds and light on
    // dark ones. The VIEW disc switches blending off to stay solid ink.
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100]"
      style={{ transform: "translate3d(-100px,-100px,0)", mixBlendMode: view ? "normal" : "difference" }}
    >
      <div
        className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full transition-[width,height,opacity,background-color] duration-300 ease-premium"
        style={{
          width: size,
          height: size,
          opacity: state === "hidden" ? 0 : 1,
          backgroundColor: view ? "var(--color-ink)" : "#fff",
        }}
      >
        <span
          className="text-[11px] font-semibold tracking-[0.18em] text-white transition-opacity duration-200"
          style={{ opacity: view ? 1 : 0 }}
        >
          VIEW
        </span>
      </div>
    </div>
  );
}
