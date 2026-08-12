import { useEffect, useState } from "react";

type Waypoint = { id: string; at: number };

/**
 * A patrol route down the left edge: the trail fills as you scroll and each
 * section's waypoint lights up as the unit passes it.
 */
export function PatrolLine() {
  const [progress, setProgress] = useState(0);
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);

  useEffect(() => {
    function measure() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) {
        setWaypoints([]);
        return;
      }
      const sections = [...document.querySelectorAll<HTMLElement>("section[id]")];
      setWaypoints(
        sections.map((section) => ({
          id: section.id,
          at: Math.min(1, Math.max(0, (section.offsetTop - window.innerHeight * 0.5) / max)),
        })),
      );
    }

    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    }

    measure();
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 left-2.5 z-40 hidden w-2.5 lg:block"
    >
      {/* Track */}
      <div className="absolute inset-y-8 left-1/2 w-px -translate-x-1/2 bg-foreground/10" />

      {/* Trail travelled so far */}
      <div
        className="absolute left-1/2 top-8 w-px -translate-x-1/2 bg-gradient-to-b from-accent/0 via-accent/70 to-sky"
        style={{ height: `calc((100% - 4rem) * ${progress})` }}
      />

      {waypoints.map((waypoint) => {
        const passed = progress >= waypoint.at - 0.005;
        return (
          <span
            key={waypoint.id}
            className={`absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ${
              passed ? "scale-100 bg-sky" : "scale-75 bg-foreground/20"
            }`}
            style={{ top: `calc(2rem + (100% - 4rem) * ${waypoint.at})` }}
          />
        );
      })}

      {/* The patrol unit */}
      <span
        className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky shadow-[0_0_10px_2px_rgba(134,191,232,0.65)]"
        style={{ top: `calc(2rem + (100% - 4rem) * ${progress})` }}
      />
    </div>
  );
}
