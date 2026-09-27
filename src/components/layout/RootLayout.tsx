import { m, useReducedMotion } from "framer-motion";
import { Suspense, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router";
import { CustomCursor } from "./CustomCursor";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { PageBoundary } from "./PageBoundary";
import { ScrollManager } from "./ScrollManager";

export function RootLayout() {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  // After client-side navigation, move focus to the new page for keyboard and
  // screen-reader users. The first load keeps the browser's default focus.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[60] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition-transform focus-visible:translate-y-0"
      >
        Skip to content
      </a>
      <Header />
      <m.main
        ref={mainRef}
        id="main"
        tabIndex={-1}
        key={pathname}
        className="outline-none"
        // 250ms fade between pages; the very first paint is not delayed.
        initial={firstRender.current || reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <PageBoundary>
          {/* Holds the page's space while a page chunk loads, so the footer does not jump. */}
          <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
            <Outlet />
          </Suspense>
        </PageBoundary>
      </m.main>
      <Footer />
      <FloatingWhatsApp />
      <CustomCursor />
      <ScrollManager />
    </>
  );
}
