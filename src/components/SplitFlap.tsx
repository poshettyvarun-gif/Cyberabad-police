import { useEffect, useRef, useState } from "react";

const GLYPHS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ+×.";

const SETTLE_START = 220;
const SETTLE_STEP = 110;
const FLIP_MS = 45;

/**
 * A Solari departure-board counter: each character riffles through glyphs and
 * settles left to right when the value scrolls into view.
 */
export function SplitFlap({ value, className = "" }: { value: string; className?: string }) {
  const chars = [...value];
  const ref = useRef<HTMLSpanElement>(null);
  // Starts at the real value, so the number is readable even if the observer
  // never fires (no JS, hidden tab, older browser). The riffle overwrites it.
  const [display, setDisplay] = useState<string[]>(chars);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(chars);
      setDone(true);
      return;
    }

    let frame = 0;
    let startedAt = 0;

    const settleAt = chars.map((char, i) =>
      char === " " ? 0 : SETTLE_START + i * SETTLE_STEP,
    );
    const total = Math.max(...settleAt, 0) + FLIP_MS;

    function tick(now: number) {
      if (!startedAt) startedAt = now;
      const elapsed = now - startedAt;

      setDisplay(
        chars.map((char, i) => {
          if (char === " ") return " ";
          if (elapsed >= settleAt[i]) return char;
          // Riffle: change glyph on a fixed cadence rather than every frame.
          const step = Math.floor(elapsed / FLIP_MS) + i;
          return GLYPHS[step % GLYPHS.length];
        }),
      );

      if (elapsed < total) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(chars);
        setDone(true);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          frame = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`} aria-label={value}>
      {display.map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block transition-transform duration-100"
          style={{
            transform: done || char === " " ? "none" : "scaleY(0.86)",
            minWidth: char === " " ? "0.28em" : undefined,
          }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}
