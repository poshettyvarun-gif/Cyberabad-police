import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router doesn't scroll on navigation the way a plain multi-page site
 * does. This restores that: a `#services`-style hash lands on the matching
 * element (working both for in-page nav and for a hash link clicked from a
 * different route, once it has routed to `/` first), and a plain route
 * change with no hash resets to the top.
 */
export function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = hash.slice(1);
    const existing = document.getElementById(id);
    if (existing) {
      existing.scrollIntoView();
      return;
    }

    // Coming from a different route, the target section mounts on this same
    // render — wait one frame rather than silently failing to scroll.
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView();
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
