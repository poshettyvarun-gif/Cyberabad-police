import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import { cityAlerts, heroStats, tickerItems } from "../data/site";
import { CctvMesh } from "./CctvMesh";
import { SplitFlap } from "./SplitFlap";

/** Staggered entrance delay for the hero column. */
const enter = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  const [alertIndex, setAlertIndex] = useState(1);
  const emblemRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const id = window.setInterval(
      () => setAlertIndex((i) => (i + 1) % cityAlerts.length),
      5000,
    );
    return () => window.clearInterval(id);
  }, []);

  // Subtle pointer tilt on the emblem — it's a flat PNG, so this is the only
  // depth available without a vector version.
  useEffect(() => {
    const node = emblemRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function onMove(event: PointerEvent) {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      node!.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 7}deg)`;
    }

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const alert = cityAlerts[alertIndex];
  const AlertIcon = alert.icon;

  return (
    <section className="relative isolate overflow-hidden surface-navy">
      <img
        src="/assets/hero-charminar-night.jpg"
        alt="Hyderabad City Police patrol vehicles at the Charminar on a wet night"
        width={1672}
        height={941}
        className="absolute inset-0 h-full w-full object-cover opacity-100"
      />
      {/* Scrim runs the other way now: the copy sits on the right, over the
          lit Charminar, so that side needs the cover. */}
      <div className="absolute inset-0 bg-[linear-gradient(240deg,oklch(0.19_0.062_262/0.94),oklch(0.19_0.062_262/0.62)_52%,oklch(0.19_0.062_262/0.25))]" />
      <CctvMesh />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:py-32">
        {/* Copy: first in the DOM and on mobile, second (right) on desktop. */}
        <div className="order-1 lg:order-2">
          <span
            style={enter(80)}
            className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-1.5 text-xs tracking-[0.28em] text-sky"
          >
            TELANGANA POLICE
          </span>

          <h1 className="mt-6 font-display text-[clamp(2.4rem,6vw,4.6rem)] font-semibold leading-[1.03] text-primary-foreground">
            <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
              <span style={enter(180)} className="block animate-line-wipe">
                Modern policing,
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
              <span style={enter(320)} className="block animate-line-wipe text-sky">
                safer streets.
              </span>
            </span>
          </h1>

          <p
            style={enter(520)}
            className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-primary-foreground/75 sm:text-lg"
          >
            Your trusted gateway to Hyderabad City Police — essential citizen services, emergency assistance, and reliable information, all in one place.
          </p>

          <div style={enter(640)} className="mt-9 flex animate-fade-up flex-wrap gap-3">
            <a
              href="#services"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-sky px-7 py-3.5 text-sm font-semibold text-navy-deep transition-transform duration-300 hover:-translate-y-0.5"
            >
              Citizen Services
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="pointer-events-none absolute inset-y-0 w-1/3 bg-background/40 animate-sheen" />
            </a>
            <Link
              to="/police-stations"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              <MapPin className="h-4 w-4" />
              View all police stations
            </Link>
          </div>

          <dl
            style={enter(760)}
            className="mt-14 grid max-w-xl animate-fade-up grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-2xl font-semibold text-primary-foreground">
                  <SplitFlap value={stat.value} />
                </dt>
                <dd className="mt-1 text-xs tracking-wider text-primary-foreground/60">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Emblem: second in the DOM, but first (left) on desktop. */}
        <div className="relative order-2 lg:order-1">
          <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,oklch(0.62_0.15_246/0.5),transparent_65%)] blur-2xl" />
          <img
            ref={emblemRef}
            src="/assets/hcp-emblem.png"
            alt=""
            width={549}
            height={676}
            loading="lazy"
            className="mx-auto hidden w-[26rem] max-w-full animate-float drop-shadow-2xl transition-transform duration-300 ease-out lg:block"
          />

          <div className="mt-0 lg:mt-8">
            <div
              className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-5 backdrop-blur-md"
              aria-live="polite"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.3em] text-sky">CITY ALERTS</span>
                <span className="flex gap-1.5">
                  {cityAlerts.map((item, index) => (
                    <button
                      key={item.key}
                      type="button"
                      aria-label={item.label}
                      onClick={() => setAlertIndex(index)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        index === alertIndex ? "w-5 bg-sky" : "w-1.5 bg-primary-foreground/35"
                      }`}
                    />
                  ))}
                </span>
              </div>

              <div key={alert.key} className="mt-4 flex animate-fade-up items-start gap-3">
                <span className="rounded-xl bg-sky/15 p-2.5 text-sky">
                  <AlertIcon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-primary-foreground/60">
                    {alert.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-primary-foreground">
                    {alert.headline}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-primary-foreground/70">
                    {alert.detail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-primary-foreground/15 bg-navy-deep/60 py-3">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap px-6 text-sm text-primary-foreground/80">
          {[...tickerItems, ...tickerItems].map((item, index) =>
            item.href ? (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 underline decoration-sky/40 underline-offset-4 transition-colors hover:text-primary-foreground"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-sky" />
                {item.text}
              </a>
            ) : (
              <span key={index} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-sky" />
                {item.text}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
