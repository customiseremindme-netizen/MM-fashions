import { m, useInView, useReducedMotion, type Transition, type Variants } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { ease, reveal } from "@/lib/motion";

type Tag = "div" | "ul" | "ol" | "li" | "section" | "article" | "header";

const motionTags = { div: m.div, ul: m.ul, ol: m.ol, li: m.li, section: m.section, article: m.article, header: m.header };

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
const instant: Transition = { duration: 0 };

/**
 * Scroll reveal state. The prerendered HTML shows everything, so content is
 * never hidden before JavaScript runs (or without it). After hydration, only
 * content that is still below the fold is tucked away, to fade up when it
 * scrolls into view. Content already on screen, and everything under reduced
 * motion, simply stays put.
 */
function useReveal(ref: RefObject<Element | null>) {
  const reduce = useReducedMotion();
  const [armed, setArmed] = useState(false);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    if (el.getBoundingClientRect().top > window.innerHeight * 0.92) setArmed(true);
    // Only decided once, on mount.
  }, []);

  return armed && !inView ? "hidden" : "show";
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: Tag;
  delay?: number;
  id?: string;
};

/** Fades content up 20px the first time it scrolls into view. */
export function Reveal({ children, className, as = "div", delay = 0, id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const state = useReveal(ref);
  const Comp = motionTags[as];
  const variants: Variants = {
    hidden: { opacity: 0, y: reveal.y, transition: instant },
    show: { opacity: 1, y: 0, transition: { duration: reveal.duration, ease, delay } },
  };
  return (
    <Comp ref={ref as any} id={id} className={className} initial={false} animate={state} variants={variants}>
      {children}
    </Comp>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: reveal.y, transition: instant },
  show: { opacity: 1, y: 0, transition: { duration: reveal.duration, ease } },
};

/** A grid or list whose <RevealItem> children fade up one after another (60–100ms apart). */
export function RevealGroup({
  children,
  className,
  as = "div",
  stagger = reveal.stagger,
}: Omit<RevealProps, "delay"> & { stagger?: number }) {
  const ref = useRef<HTMLElement>(null);
  const state = useReveal(ref);
  const Comp = motionTags[as];
  const variants: Variants = {
    hidden: { transition: instant },
    show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
  };
  return (
    <Comp ref={ref as any} className={className} initial={false} animate={state} variants={variants}>
      {children}
    </Comp>
  );
}

export function RevealItem({ children, className, as = "div" }: Omit<RevealProps, "delay">) {
  const Comp = motionTags[as];
  return (
    <Comp className={className} variants={itemVariants}>
      {children}
    </Comp>
  );
}
