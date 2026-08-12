import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/* ---------------------------------------------------------------------- *
 * Timeline
 * Slower, more cinematic version.
 * ---------------------------------------------------------------------- */

const AMBIENT_MS = 450;
const FALL_MS = 850;
const IMPACT_AT = AMBIENT_MS + FALL_MS;

const TRICOLOUR_AT = 1900;
const CRACK_FADE_AT = 2450;
const LANDMARK_AT = 2550;
const PUSH_AT = 2650;

const HOLD_UNTIL = 3600;
const FADE_MS = 700;

const TOTAL = HOLD_UNTIL + FADE_MS;

/** Set true to show the intro only on the first load of a browser session. */
const ONCE_PER_SESSION = false;
const SEEN_KEY = "hcp-intro-seen";

/* ---------------------------------------------------------------------- *
 * Deterministic RNG
 * ---------------------------------------------------------------------- */

function seeded(seed: number) {
  let state = seed;

  return () => {
    state =
      (state * 1664525 + 1013904223) %
      4294967296;

    return state / 4294967296;
  };
}

type Crack = {
  d: string;
  width: number;
  delay: number;
};

/* ---------------------------------------------------------------------- *
 * Cracks
 * ---------------------------------------------------------------------- */

function buildCracks(): Crack[] {
  const rand = seeded(20260811);
  const FLATTEN = 0.32;
  const cracks: Crack[] = [];
  const spokes = 11;

  for (let i = 0; i < spokes; i++) {
    let angle =
      (i / spokes) * Math.PI * 2 +
      (rand() - 0.5) * 0.55;

    let x = 0;
    let y = 0;

    const points: string[] = ["0 0"];
    const steps = 5 + Math.floor(rand() * 4);
    const reach = 0.6 + rand();

    for (let k = 0; k < steps; k++) {
      const segment =
        (14 + rand() * 26) * reach;

      angle +=
        (rand() - 0.5) * 0.9;

      x +=
        Math.cos(angle) * segment;

      y +=
        Math.sin(angle) *
        segment *
        FLATTEN;

      points.push(
        `${x.toFixed(1)} ${y.toFixed(1)}`,
      );
    }

    const split = Math.max(
      2,
      Math.ceil(points.length * 0.55),
    );

    const jitter = rand() * 70;

    cracks.push({
      d: `M ${points
        .slice(0, split)
        .join(" L ")}`,
      width: 1.5,
      delay: jitter,
    });

    cracks.push({
      d: `M ${points
        .slice(split - 1)
        .join(" L ")}`,
      width: 0.75,
      delay: jitter + 90,
    });

    if (rand() > 0.32) {
      const at =
        1 +
        Math.floor(
          rand() *
            (points.length - 2),
        );

      const [bxRaw, byRaw] =
        points[at].split(" ");

      let bx = parseFloat(bxRaw);
      let by = parseFloat(byRaw);

      let bAngle =
        angle +
        (rand() - 0.5) * 1.7;

      const branch: string[] = [
        `${bx.toFixed(1)} ${by.toFixed(1)}`,
      ];

      for (
        let k = 0;
        k < 2 + Math.floor(rand() * 2);
        k++
      ) {
        const segment =
          12 + rand() * 20;

        bAngle +=
          (rand() - 0.5) * 0.85;

        bx +=
          Math.cos(bAngle) *
          segment;

        by +=
          Math.sin(bAngle) *
          segment *
          FLATTEN;

        branch.push(
          `${bx.toFixed(1)} ${by.toFixed(1)}`,
        );
      }

      cracks.push({
        d: `M ${branch.join(" L ")}`,
        width: 0.7,
        delay:
          jitter +
          120 +
          rand() * 70,
      });
    }
  }

  return cracks;
}

/* ---------------------------------------------------------------------- *
 * Atmospheric particles
 * ---------------------------------------------------------------------- */

function buildMotes() {
  const rand = seeded(778101);

  return Array.from(
    { length: 18 },
    () => ({
      left: `${(
        rand() * 100
      ).toFixed(1)}%`,

      top: `${(
        30 +
        rand() * 68
      ).toFixed(1)}%`,

      size: `${(
        1 +
        rand() * 2.2
      ).toFixed(1)}px`,

      opacity: (
        0.08 +
        rand() * 0.22
      ).toFixed(2),

      mx: `${(
        rand() * 40 -
        20
      ).toFixed(0)}px`,

      my: `${(
        -60 -
        rand() * 70
      ).toFixed(0)}px`,

      duration: `${(
        7 +
        rand() * 9
      ).toFixed(1)}s`,

      delay: `${(
        -rand() * 12
      ).toFixed(1)}s`,
    }),
  );
}

/* ---------------------------------------------------------------------- *
 * Debris
 * ---------------------------------------------------------------------- */

function buildDebris() {
  const rand = seeded(4420197);

  return Array.from(
    { length: 16 },
    () => {
      const angle =
        Math.PI +
        rand() * Math.PI;

      const distance =
        40 + rand() * 130;

      return {
        dx: `${(
          Math.cos(angle) *
          distance
        ).toFixed(0)}px`,

        dy: `${(
          Math.sin(angle) *
            distance *
            0.5 +
          26 +
          rand() * 40
        ).toFixed(0)}px`,

        size: `${(
          1.5 +
          rand() * 2.5
        ).toFixed(1)}px`,

        opacity: (
          0.3 +
          rand() * 0.45
        ).toFixed(2),

        duration: `${(
          620 +
          rand() * 520
        ).toFixed(0)}ms`,

        delay: Math.round(
          rand() * 70,
        ),
      };
    },
  );
}

/* ---------------------------------------------------------------------- *
 * Sparks
 * ---------------------------------------------------------------------- */

function buildSparks() {
  const rand = seeded(91125501);

  return Array.from(
    { length: 14 },
    () => ({
      left: `${(
        rand() * 200 -
        100
      ).toFixed(0)}px`,

      dx: `${(
        rand() * 120 -
        60
      ).toFixed(0)}px`,

      dy: `${(
        -50 -
        rand() * 110
      ).toFixed(0)}px`,

      size: `${(
        1.2 +
        rand() * 1.8
      ).toFixed(1)}px`,

      opacity: (
        0.5 +
        rand() * 0.45
      ).toFixed(2),

      duration: `${(
        900 +
        rand() * 800
      ).toFixed(0)}ms`,

      delay: Math.round(
        rand() * 220,
      ),
    }),
  );
}

/* ---------------------------------------------------------------------- *
 * Charminar
 * ---------------------------------------------------------------------- */

const CHARMINAR = [
  "M 100 500 H 500",
  "M 150 500 V 150",
  "M 450 500 V 150",
  "M 190 500 V 150",
  "M 410 500 V 150",
  "M 150 200 H 450",
  "M 138 200 H 462",
  "M 142 188 H 458",
  "M 240 500 V 390 Q 300 300 360 390 V 500",
  "M 140 380 H 200",
  "M 400 380 H 460",
  "M 140 300 H 200",
  "M 400 300 H 460",
  "M 140 220 H 200",
  "M 400 220 H 460",
  "M 200 200 V 150 H 400 V 200",
  "M 275 200 V 175 Q 300 155 325 175 V 200",
  "M 190 150 H 410",
  "M 162 150 V 118",
  "M 178 150 V 118",
  "M 422 150 V 118",
  "M 438 150 V 118",
  "M 158 118 Q 170 84 182 118",
  "M 418 118 Q 430 84 442 118",
  "M 265 150 Q 300 95 335 150",
  "M 170 101 V 74",
  "M 430 101 V 74",
  "M 300 122 V 92",
];

/* ---------------------------------------------------------------------- *
 * Opening Sequence
 * ---------------------------------------------------------------------- */

export function OpeningSequence({
  onDone,
}: {
  onDone: () => void;
}) {
  const cracks = useMemo(
    buildCracks,
    [],
  );

  const motes = useMemo(
    buildMotes,
    [],
  );

  const debris = useMemo(
    buildDebris,
    [],
  );

  const sparks = useMemo(
    buildSparks,
    [],
  );

  const [ready, setReady] =
    useState(false);

  const [leaving, setLeaving] =
    useState(false);

  const finished =
    useRef(false);

  const finish = useCallback(() => {
    if (finished.current)
      return;

    finished.current = true;

    if (ONCE_PER_SESSION) {
      try {
        sessionStorage.setItem(
          SEEN_KEY,
          "1",
        );
      } catch {
        // Ignore private mode errors.
      }
    }

    onDone();
  }, [onDone]);

  const skip = useCallback(() => {
    if (
      finished.current ||
      leaving
    ) {
      return;
    }

    setLeaving(true);

    window.setTimeout(
      finish,
      FADE_MS,
    );
  }, [finish, leaving]);

  /* ------------------------------------------------------------------ *
   * Image safety timeout
   * ------------------------------------------------------------------ */

  useEffect(() => {
    if (ready) return;

    const bail =
      window.setTimeout(
        () => setReady(true),
        1800,
      );

    return () =>
      window.clearTimeout(bail);
  }, [ready]);

  /* ------------------------------------------------------------------ *
   * Timeline controller
   * ------------------------------------------------------------------ */

  useEffect(() => {
    if (!ready) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const leaveAt =
      window.setTimeout(
        () => setLeaving(true),
        TOTAL - FADE_MS,
      );

    const doneAt =
      window.setTimeout(
        finish,
        TOTAL,
      );

    const onKey = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key === "Escape" ||
        event.key === "Enter" ||
        event.key === " "
      ) {
        skip();
      }
    };

    window.addEventListener(
      "keydown",
      onKey,
    );

    window.addEventListener(
      "wheel",
      skip,
      { passive: true },
    );

    window.addEventListener(
      "touchstart",
      skip,
      { passive: true },
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.clearTimeout(
        leaveAt,
      );

      window.clearTimeout(
        doneAt,
      );

      window.removeEventListener(
        "keydown",
        onKey,
      );

      window.removeEventListener(
        "wheel",
        skip,
      );

      window.removeEventListener(
        "touchstart",
        skip,
      );
    };
  }, [
    ready,
    finish,
    skip,
  ]);

  const at = (ms: number) => ({
    animationDelay: `${ms}ms`,
  });

  return (
    <div
      role="presentation"
      onClick={skip}
      style={{
        transitionDuration: `${FADE_MS}ms`,
      }}
      className={`intro-stage fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#07070a] transition-opacity ease-out ${
        leaving
          ? "pointer-events-none opacity-0"
          : "opacity-100"
      }`}
    >
      {/* -------------------------------------------------------------- *
       * Ambient smoke
       * -------------------------------------------------------------- */}

      <span
        aria-hidden="true"
        className="intro-smoke pointer-events-none absolute left-[12%] top-[38%] h-[70vh] w-[70vw] rounded-full bg-[radial-gradient(circle,rgba(120,140,180,0.10),transparent_65%)] blur-3xl"
        style={{
          ["--dur" as string]:
            "17s",
        }}
      />

      <span
        aria-hidden="true"
        className="intro-smoke pointer-events-none absolute right-[8%] top-[52%] h-[60vh] w-[60vw] rounded-full bg-[radial-gradient(circle,rgba(90,110,150,0.09),transparent_65%)] blur-3xl"
        style={{
          ["--dur" as string]:
            "23s",

          animationDirection:
            "reverse",
        }}
      />

      {/* Floating particles */}

      {motes.map(
        (mote, index) => (
          <span
            key={index}
            aria-hidden="true"
            className="intro-mote pointer-events-none absolute rounded-full bg-[#cdd6e4]"
            style={{
              left: mote.left,
              top: mote.top,
              width: mote.size,
              height: mote.size,
              ["--o" as string]:
                mote.opacity,
              ["--mx" as string]:
                mote.mx,
              ["--my" as string]:
                mote.my,
              ["--dur" as string]:
                mote.duration,
              animationDelay:
                mote.delay,
            }}
          />
        ),
      )}

      {/* -------------------------------------------------------------- *
       * Camera push
       * -------------------------------------------------------------- */}

      <div
        className={
          ready
            ? "intro-push"
            : undefined
        }
        style={
          ready
            ? at(PUSH_AT)
            : undefined
        }
      >
        {/* Impact shake */}

        <div
          className={
            ready
              ? "intro-shake"
              : undefined
          }
          style={
            ready
              ? at(IMPACT_AT)
              : undefined
          }
        >
          <div className="relative flex items-center justify-center">
            {/* -------------------------------------------------------- *
             * Charminar
             * -------------------------------------------------------- */}

            <svg
              viewBox="0 0 600 520"
              aria-hidden="true"
              className={`pointer-events-none absolute w-[calc(var(--emblem)*2.6)] text-[#9fb3d4] ${
                ready
                  ? "intro-landmark"
                  : "opacity-0"
              }`}
              style={
                ready
                  ? at(LANDMARK_AT)
                  : undefined
              }
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {CHARMINAR.map(
                (d) => (
                  <path
                    key={d}
                    d={d}
                  />
                ),
              )}
            </svg>

            {/* -------------------------------------------------------- *
             * Tricolour effects
             * -------------------------------------------------------- */}

            <span
              aria-hidden="true"
              className={`pointer-events-none absolute left-[-52%] top-[56%] h-[calc(var(--emblem)*0.11)] w-[calc(var(--emblem)*1.5)] blur-lg bg-[linear-gradient(90deg,transparent,rgba(255,145,50,1))] ${
                ready
                  ? "intro-streak-left"
                  : "opacity-0"
              }`}
              style={
                ready
                  ? at(TRICOLOUR_AT)
                  : undefined
              }
            />

            <span
              aria-hidden="true"
              className={`pointer-events-none absolute right-[-52%] top-[63%] h-[calc(var(--emblem)*0.11)] w-[calc(var(--emblem)*1.5)] blur-lg bg-[linear-gradient(270deg,transparent,rgba(45,205,80,0.92))] ${
                ready
                  ? "intro-streak-right"
                  : "opacity-0"
              }`}
              style={
                ready
                  ? at(
                      TRICOLOUR_AT +
                        120,
                    )
                  : undefined
              }
            />

            {/* White glow */}

            <span
              aria-hidden="true"
              className={`pointer-events-none absolute bottom-[64%] h-[calc(var(--emblem)*0.7)] w-[calc(var(--emblem)*1.15)] blur-2xl bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.32),transparent_70%)] ${
                ready
                  ? "intro-bloom"
                  : "opacity-0"
              }`}
              style={
                ready
                  ? at(TRICOLOUR_AT)
                  : undefined
              }
            />

            {/* -------------------------------------------------------- *
             * Emblem
             * -------------------------------------------------------- */}

            <div className="relative">
              <div
                className={`relative z-10 ${
                  ready
                    ? "intro-fall"
                    : "opacity-0"
                }`}
                style={
                  ready
                    ? at(AMBIENT_MS)
                    : undefined
                }
              >
                {/* Motion trail */}

                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute bottom-[52%] left-1/2 h-[calc(var(--emblem)*1.6)] w-[calc(var(--emblem)*0.4)] -translate-x-1/2 blur-lg bg-[linear-gradient(to_top,rgba(190,205,235,0.34),transparent)] ${
                    ready
                      ? "intro-trail"
                      : "opacity-0"
                  }`}
                  style={
                    ready
                      ? at(AMBIENT_MS)
                      : undefined
                  }
                />

                {/* -------------------------------------------------- *
                 * Logo + branding
                 * -------------------------------------------------- */}

                <div className="relative flex flex-col items-center">
                  <img
                    src="/assets/hcp-emblem.png"
                    alt="Hyderabad City Police"
                    aria-hidden="true"
                    width={549}
                    height={676}
                    onLoad={() =>
                      setReady(true)
                    }
                    onError={() =>
                      setReady(true)
                    }
                    className="relative w-[var(--emblem)] drop-shadow-[0_20px_45px_rgba(0,0,0,0.65)]"
                  />

                  {/* Branding */}

                  <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-4 -translate-x-1/2 text-center">
                    {/* Divider */}

                    <div className="mx-auto mb-4 h-px w-32 bg-gradient-to-r from-transparent via-white/80 to-transparent" />

                    {/* Heading */}

                    <h1 className="whitespace-nowrap font-display text-[clamp(1.1rem,2.5vw,1.8rem)] font-semibold tracking-[0.25em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] sm:tracking-[0.32em]">
                      HYDERABAD CITY POLICE
                    </h1>

                    {/* Tagline */}

                    <p className="mt-3 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.4em] text-sky drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-xs sm:tracking-[0.48em]">
                      YOUR CITY. YOUR SAFETY. OUR DUTY.
                    </p>
                  </div>
                </div>
              </div>

              {/* ------------------------------------------------------ *
               * Floor impact
               * ------------------------------------------------------ */}

              <span
                aria-hidden="true"
                className={`pointer-events-none absolute left-1/2 top-full h-[calc(var(--emblem)*0.9)] w-[calc(var(--emblem)*3.2)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-2xl bg-[radial-gradient(ellipse_at_center,rgba(126,136,156,0.18),rgba(60,66,80,0.08)_45%,transparent_72%)] ${
                  ready
                    ? "intro-floor"
                    : "opacity-0"
                }`}
                style={
                  ready
                    ? at(IMPACT_AT)
                    : undefined
                }
              />

              {/* Contact shadow */}

              <span
                aria-hidden="true"
                className={`absolute left-1/2 top-full h-[calc(var(--emblem)*0.1)] w-[calc(var(--emblem)*0.8)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-black/80 blur-md ${
                  ready
                    ? "intro-contact"
                    : "opacity-0"
                }`}
                style={
                  ready
                    ? at(IMPACT_AT)
                    : undefined
                }
              />

              {/* Dust */}

              <span
                aria-hidden="true"
                className={`pointer-events-none absolute left-1/2 top-full h-[calc(var(--emblem)*0.4)] w-[calc(var(--emblem)*1.3)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(190,200,215,0.20),transparent_70%)] blur-lg ${
                  ready
                    ? "intro-dust"
                    : "opacity-0"
                }`}
                style={
                  ready
                    ? at(IMPACT_AT)
                    : undefined
                }
              />

              {/* ------------------------------------------------------ *
               * Debris
               * ------------------------------------------------------ */}

              {debris.map(
                (bit, index) => (
                  <span
                    key={`d-${index}`}
                    aria-hidden="true"
                    className={`pointer-events-none absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b9c3d4] ${
                      ready
                        ? "intro-debris"
                        : "opacity-0"
                    }`}
                    style={{
                      width: bit.size,
                      height: bit.size,
                      ["--dx" as string]:
                        bit.dx,
                      ["--dy" as string]:
                        bit.dy,
                      ["--o" as string]:
                        bit.opacity,
                      ["--dur" as string]:
                        bit.duration,
                      animationDelay: `${
                        IMPACT_AT +
                        bit.delay
                      }ms`,
                    }}
                  />
                ),
              )}

              {/* ------------------------------------------------------ *
               * Sparks
               * ------------------------------------------------------ */}

              {sparks.map(
                (spark, index) => (
                  <span
                    key={`s-${index}`}
                    aria-hidden="true"
                    className={`pointer-events-none absolute top-full -translate-y-1/2 rounded-full bg-[#ff8a3d] shadow-[0_0_6px_2px_rgba(255,120,45,0.5)] ${
                      ready
                        ? "intro-spark"
                        : "opacity-0"
                    }`}
                    style={{
                      left: `calc(50% + ${spark.left})`,
                      width: spark.size,
                      height: spark.size,
                      ["--dx" as string]:
                        spark.dx,
                      ["--dy" as string]:
                        spark.dy,
                      ["--o" as string]:
                        spark.opacity,
                      ["--dur" as string]:
                        spark.duration,
                      animationDelay: `${
                        IMPACT_AT +
                        spark.delay
                      }ms`,
                    }}
                  />
                ),
              )}

              {/* ------------------------------------------------------ *
               * Cracks
               * ------------------------------------------------------ */}

              <div
                className={`pointer-events-none absolute left-1/2 top-full w-[calc(var(--emblem)*3)] -translate-x-1/2 -translate-y-1/2 ${
                  ready
                    ? "intro-crackfade"
                    : "opacity-0"
                }`}
                style={
                  ready
                    ? at(CRACK_FADE_AT)
                    : undefined
                }
              >
                <svg
                  aria-hidden="true"
                  viewBox="-270 -135 540 270"
                  className="w-full"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <defs>
                    <filter
                      id="hcp-ember"
                      x="-25%"
                      y="-25%"
                      width="150%"
                      height="150%"
                    >
                      <feGaussianBlur stdDeviation="3.2" />
                    </filter>
                  </defs>

                  {/* Ember */}

                  <g filter="url(#hcp-ember)">
                    {cracks.map(
                      (
                        crack,
                        index,
                      ) => (
                        <path
                          key={`ember-${index}`}
                          d={crack.d}
                          pathLength={1}
                          strokeDasharray={1}
                          stroke="#ff6a12"
                          strokeWidth={
                            crack.width *
                            1.7
                          }
                          className={
                            ready
                              ? "intro-ember"
                              : "opacity-0"
                          }
                          style={
                            ready
                              ? at(
                                  IMPACT_AT +
                                    crack.delay,
                                )
                              : undefined
                          }
                        />
                      ),
                    )}
                  </g>

                  {/* Cool fracture */}

                  {cracks.map(
                    (
                      crack,
                      index,
                    ) => (
                      <path
                        key={`line-${index}`}
                        d={crack.d}
                        pathLength={1}
                        strokeDasharray={1}
                        stroke="#c3ccdb"
                        strokeWidth={
                          crack.width
                        }
                        opacity={0.5}
                        className={
                          ready
                            ? "intro-crack"
                            : "opacity-0"
                        }
                        style={
                          ready
                            ? at(
                                IMPACT_AT +
                                  crack.delay,
                              )
                            : undefined
                        }
                      />
                    ),
                  )}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vignette */}

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(0,0,0,0.78)_100%)]"
      />

      {/* Skip */}

      <button
        type="button"
        onClick={skip}
        className="absolute bottom-7 right-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40 transition-colors hover:text-white"
      >
        Skip
      </button>
    </div>
  );
}

/* ---------------------------------------------------------------------- *
 * Intro helpers
 * ---------------------------------------------------------------------- */

export function shouldPlayIntro() {
  if (
    typeof window ===
    "undefined"
  ) {
    return false;
  }

  if (
    window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
  ) {
    return false;
  }

  if (!ONCE_PER_SESSION) {
    return true;
  }

  try {
    return (
      sessionStorage.getItem(
        SEEN_KEY,
      ) !== "1"
    );
  } catch {
    return true;
  }
}

export const INTRO_TIMING = {
  AMBIENT_MS,
  FALL_MS,
  IMPACT_AT,
  TOTAL,
};