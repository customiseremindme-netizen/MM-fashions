import { animate, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { ease } from "@/lib/motion";

/**
 * Counts from 0 to `value` when it scrolls into view. The HTML carries the
 * final number, so it is right before JavaScript runs and for reduced motion;
 * a counter already on screen when the page hydrates is left as it is.
 */
export function CountUp({ value, duration = 1.6 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    let controls: ReturnType<typeof animate> | undefined;
    let first = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (first) {
          first = false;
          if (entry.isIntersecting) {
            io.disconnect();
            return;
          }
          el.textContent = "0";
          return;
        }
        if (!entry.isIntersecting) return;
        io.disconnect();
        controls = animate(0, value, {
          duration,
          ease,
          onUpdate: (v) => {
            el.textContent = String(Math.round(v));
          },
        });
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      controls?.stop();
      el.textContent = String(value);
    };
  }, [reduce, value, duration]);

  return (
    <>
      <span ref={ref} aria-hidden className="tabular-nums">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
