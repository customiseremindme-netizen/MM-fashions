import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router";

/**
 * Scroll handling for client-side navigation: new pages start at the top,
 * back/forward restores the previous position, and query-only changes (the
 * catalogue filters) leave the scroll alone.
 */
export function ScrollManager() {
  const location = useLocation();
  const navType = useNavigationType();
  const positions = useRef(new Map<string, number>());
  const lastPath = useRef(location.pathname);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  // Remember where each history entry was scrolled to.
  useEffect(() => {
    const key = location.key;
    let frame = 0;
    const save = () => {
      frame = 0;
      positions.current.set(key, window.scrollY);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(save);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [location.key]);

  useLayoutEffect(() => {
    const pathChanged = lastPath.current !== location.pathname;
    lastPath.current = location.pathname;
    if (navType === "POP") {
      const y = positions.current.get(location.key);
      if (y !== undefined) window.scrollTo(0, y);
      return;
    }
    if (location.hash) {
      document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
      return;
    }
    if (pathChanged) window.scrollTo(0, 0);
  }, [location.key, location.pathname, location.hash, navType]);

  return null;
}
