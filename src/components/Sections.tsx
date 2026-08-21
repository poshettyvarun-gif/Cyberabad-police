import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import {
  aboutFacts,
  citizenServices,
  emergencyContacts,
  galleryPhotos,
  highlightCards,
  newsArchiveUrl,
  newsItems,
  wings,
} from "../data/site";
import { wingPages } from "../data/wingDetails";

const wingsWithDetailPage = new Set(wingPages.map((w) => w.slug));

export function EmergencyContacts() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-navy-deep"
    >
      <img
        src="/assets/alwayson-charminar-pulse.jpg"
        alt=""
        aria-hidden="true"
        width={2048}
        height={768}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-95"
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.12_0.04_262/0.62),oklch(0.12_0.04_262/0.35)_45%,oklch(0.12_0.04_262/0.12))]" />

      <div className="relative mx-auto max-w-7xl px-5 py-20">
        <SectionHeading
          tone="light"
          eyebrow="ALWAYS ON"
          title="Emergency contacts"
          description="One call connects you to the nearest response unit, 24 hours a day."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {emergencyContacts.map((contact, index) => {
            const Icon = contact.icon;

            return (
              <Reveal key={contact.label} delay={index * 60}>
                <a
                  href={`tel:${contact.tel}`}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lift"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl tile-gradient text-primary-foreground transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>

                  <span>
                    <span className="block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      {contact.label}
                    </span>

                    <span className="mt-1 block font-display text-lg font-semibold text-foreground">
                      {contact.value}
                    </span>
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CitizenServices() {
  const [hovered, setHovered] = useState<number | null>(null);

  const rows = [
    citizenServices.slice(0, 4),
    citizenServices.slice(4, 8),
    citizenServices.slice(8, 12),
  ];

  return (
    <section
      id="services"
      className="relative isolate overflow-hidden border-y border-primary-foreground/10 bg-navy-deep py-20"
    >
      <img
        src="/assets/services-wings-shield.jpg"
        alt=""
        aria-hidden="true"
        width={1983}
        height={793}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-95"
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.12_0.04_262/0.58),oklch(0.12_0.04_262/0.30)_48%,oklch(0.12_0.04_262/0.42))]" />

      <div className="relative mx-auto max-w-7xl px-5">
        <SectionHeading
          tone="light"
          eyebrow="ONLINE"
          title="Citizen services"
          description="Everyday police services, digitised end to end."
        />

        <div className="mt-8 flex flex-col gap-3">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-2 gap-3 md:grid-cols-4"
            >
              {row.map((service, colIndex) => {
                const index = rowIndex * 4 + colIndex;
                const Icon = service.icon;
                const isHovered = hovered === index;

                return (
                  <a
                    key={service.label}
                    href={service.href}
                    target={service.external ? "_blank" : undefined}
                    rel={service.external ? "noopener noreferrer" : undefined}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(index)}
                    onBlur={() => setHovered(null)}
                    className={`group relative flex min-h-[120px] min-w-0 flex-col justify-between overflow-hidden rounded-xl border bg-card p-4 text-foreground transition-all duration-500 ease-out ${
                      isHovered
                        ? "z-20 -translate-y-1.5 scale-[1.02] border-accent/50 shadow-lift"
                        : "border-border shadow-soft"
                    }`}
                  >
                    <img
                      src={service.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Keeps the icon and label clear on the left while the
                        artwork reads on the right, where each image places its
                        subject. Matches the Wings cards. */}
                    <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,oklch(1_0_0/0.94)_0%,oklch(1_0_0/0.78)_45%,oklch(1_0_0/0.12)_100%)]" />

                    <span
                      className={`pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-accent/20 blur-2xl transition-all duration-700 ${
                        isHovered
                          ? "scale-[2] opacity-100"
                          : "scale-100 opacity-0"
                      }`}
                    />

                    <span
                      className={`pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-accent/8 via-transparent to-transparent transition-opacity duration-500 ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    <span
                      className={`pointer-events-none absolute right-0 top-0 h-8 w-8 rounded-bl-xl border-b border-l transition-all duration-500 ${
                        isHovered
                          ? "border-accent/40"
                          : "border-border"
                      }`}
                    />

                    <span
                      className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-500 ${
                        isHovered
                          ? "scale-110 border-accent/50 bg-accent/10 text-accent"
                          : "border-border bg-secondary/50 text-accent"
                      }`}
                    >
                      <Icon className="h-5 w-5 transition-transform duration-500 group-hover:rotate-3" />
                    </span>

                    <span className="relative z-10 mt-5 flex items-center justify-between gap-2">
                      <span
                        className={`truncate text-xs font-semibold leading-snug transition-colors duration-300 sm:text-sm ${
                          isHovered
                            ? "text-accent"
                            : "text-foreground"
                        }`}
                      >
                        {service.label}
                      </span>

                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                          isHovered
                            ? "border-accent/50 bg-accent/10 text-accent"
                            : "border-border bg-secondary/40 text-muted-foreground"
                        }`}
                      >
                        <ArrowUpRight
                          className={`h-3.5 w-3.5 transition-transform duration-500 ${
                            isHovered
                              ? "-translate-y-0.5 translate-x-0.5"
                              : ""
                          }`}
                        />
                      </span>
                    </span>

                    <span
                      className={`absolute bottom-0 left-0 z-10 h-[2px] bg-accent transition-all duration-500 ${
                        isHovered ? "w-full" : "w-0"
                      }`}
                    />
                  </a>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Wings() {
  return (
    <section
      id="wings"
      className="relative isolate overflow-hidden bg-navy-deep"
    >
      <img
        src="/assets/services-wings-shield.jpg"
        alt=""
        aria-hidden="true"
        width={1983}
        height={793}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-95"
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.12_0.04_262/0.58),oklch(0.12_0.04_262/0.30)_48%,oklch(0.12_0.04_262/0.42))]" />

      <div className="relative mx-auto max-w-7xl px-5 py-16">
        <SectionHeading
          tone="light"
          eyebrow="STRUCTURE"
          title="Wings of Hyderabad City Police"
          description="Specialised units working together across the Commissionerate."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wings.map((wing, index) => {
            const Icon = wing.icon;
            const className =
              "group relative flex min-h-[130px] h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-card p-4 text-left shadow-soft transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.015] hover:border-accent/50 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";
            const content = (
              <>
                <img
                  src={wing.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Keeps the copy clear on the left while the artwork reads
                    on the right, where each image places its subject. */}
                <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,oklch(1_0_0/0.94)_0%,oklch(1_0_0/0.78)_45%,oklch(1_0_0/0.12)_100%)]" />

                <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-transparent via-sky to-transparent transition-transform duration-500 group-hover:scale-x-100" />

                <span className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-sky/10 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:bg-sky/20" />

                <span className="relative grid h-10 w-10 place-items-center rounded-lg border border-border bg-secondary/40 text-accent transition-all duration-500 group-hover:scale-105 group-hover:border-accent/50 group-hover:bg-accent/10">
                  <Icon className="h-5 w-5 transition-transform duration-500 group-hover:rotate-3" />
                </span>

                <h3 className="relative mt-3 text-base font-semibold leading-tight text-foreground transition-colors duration-300 group-hover:text-accent">
                  {wing.title}
                </h3>

                <p className="relative mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {wing.blurb}
                </p>

                <span className="relative mt-auto inline-flex items-center gap-2 pt-3 text-xs font-semibold text-accent">
                  Explore

                  <span className="grid h-6 w-6 place-items-center rounded-full border border-accent/20 bg-accent/5 transition-all duration-300 group-hover:border-accent/50 group-hover:bg-accent/10">
                    <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </span>
              </>
            );

            return (
              <Reveal
                key={wing.title}
                delay={(index % 3) * 80}
                className="relative z-0 h-full hover:z-30"
              >
                {wingsWithDetailPage.has(wing.slug) ? (
                  <Link to={`/wings/${wing.slug}`} className={className}>
                    {content}
                  </Link>
                ) : (
                  <a href={wing.href} target="_blank" rel="noopener noreferrer" className={className}>
                    {content}
                  </a>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* COMMISSIONER NOTE                                                          */
/* -------------------------------------------------------------------------- */

export function CommissionerNote() {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-[linear-gradient(115deg,#061936_0%,#082653_48%,#0877c9_100%)] py-16 lg:py-20"
    >
      {/* Soft atmospheric glow */}
      <div className="pointer-events-none absolute -left-32 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-sky/10 blur-[100px]" />

      <div className="pointer-events-none absolute -right-32 top-0 h-[450px] w-[450px] rounded-full bg-blue-400/10 blur-[100px]" />

      {/* Subtle police-tech grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      {/* Diagonal technical lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0px, transparent 38px, rgba(125,211,252,0.45) 39px, transparent 40px)",
        }}
      />

      {/* Large subtle rings */}
      <div className="pointer-events-none absolute right-[8%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full border border-sky/10" />

      <div className="pointer-events-none absolute right-[11%] top-1/2 h-[440px] w-[440px] -translate-y-1/2 rounded-full border border-sky/5" />

      {/* Left timeline */}
      <div className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-white/10 lg:block">
        <span className="absolute top-[22%] -left-[3px] h-1.5 w-1.5 rounded-full bg-sky shadow-[0_0_12px_rgba(56,189,248,0.8)]" />

        <span className="absolute top-[50%] -left-[3px] h-1.5 w-1.5 rounded-full bg-sky shadow-[0_0_12px_rgba(56,189,248,0.8)]" />

        <span className="absolute top-[78%] -left-[3px] h-1.5 w-1.5 rounded-full bg-sky shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
      </div>

      {/* Main content */}
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Commissioner portrait */}
        <Reveal>
          <div className="relative mx-auto w-fit">
            {/* Large ambient glow */}
            <div className="absolute -inset-14 rounded-full bg-sky/20 blur-[55px]" />

            {/* Outer technical ring */}
            <div className="absolute -inset-8 rounded-full border border-sky/15" />

            {/* Second ring */}
            <div className="absolute -inset-5 rounded-full border border-white/10" />

            {/* Decorative markers */}
            <span className="absolute -right-6 top-1/4 h-2 w-2 rounded-full bg-sky shadow-[0_0_15px_rgba(56,189,248,0.9)]" />

            <span className="absolute -left-6 bottom-1/4 h-2 w-2 rounded-full bg-sky shadow-[0_0_15px_rgba(56,189,248,0.9)]" />

            {/* Portrait frame */}
            <div className="relative h-64 w-64 rounded-full border border-sky/50 bg-gradient-to-br from-white/20 via-transparent to-sky/20 p-[5px] shadow-[0_0_60px_rgba(56,189,248,0.20)] sm:h-80 sm:w-80">
              <div className="h-full w-full rounded-full border border-white/20 bg-navy-deep/50 p-1.5">
                <div className="h-full w-full overflow-hidden rounded-full">
                  <img
                    src="/assets/cp-sajjanar.jpg"
                    alt="V.C. Sajjanar, IPS, Commissioner of Police, Hyderabad City"
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Commissioner badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-sky/40 bg-[#071d3b]/90 px-5 py-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.30)] backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky shadow-[0_0_10px_rgba(56,189,248,0.9)]" />

                <span className="text-[10px] font-semibold tracking-[0.22em] text-white">
                  COMMISSIONER OF POLICE
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Commissioner message */}
        <Reveal delay={120}>
          <div className="relative">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-sky" />

              <p className="text-[11px] font-medium tracking-[0.34em] text-sky">
                FROM THE CP'S DESK
              </p>
            </div>

            {/* Name */}
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              V.C. Sajjanar
              <span className="ml-2 text-sky">, IPS</span>
            </h2>

            {/* Designation */}
            <p className="mt-2 text-base text-white/60">
              Commissioner of Police, Hyderabad City
            </p>

            {/* Quote */}
            <div className="mt-7 max-w-2xl">
              <div className="mb-4 font-serif text-5xl leading-none text-sky/40">
                “
              </div>

              <p className="font-display text-xl font-medium leading-relaxed text-white sm:text-2xl">
                Service. Security. Trust.
              </p>

              <div className="mt-5 h-px w-16 bg-sky/60" />
            </div>

            {/* Message */}
            <div className="mt-7 max-w-2xl space-y-4">
              <p className="text-sm leading-7 text-white/70 sm:text-base">
                We in Hyderabad City Police work hard to maintain peace and
                communal harmony. As a rapidly growing metro, the city has the
                highest number of CCTVs in the country, enabling speedy
                detection of crime. Women safety through SHE Teams and
                Bharosa Centres is regarded as the best in India, and a large
                fleet of patrol cars and Blue Colts ensures quick response to
                Dial 100 calls.
              </p>

              <p className="text-sm leading-7 text-white/70 sm:text-base">
                Our headquarters — the modern Integrated Command &amp; Control
                Centre at Banjara Hills — also serves as the State Multi Agency
                Disaster Management Centre.
              </p>
            </div>

            {/* Bottom decorative line */}
            <div className="mt-8 flex items-center gap-3">
              <span className="h-1 w-1 rounded-full bg-sky" />

              <span className="h-px w-24 bg-gradient-to-r from-sky/60 to-transparent" />

              <span className="text-[9px] tracking-[0.28em] text-white/30">
                HYDERABAD CITY POLICE
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Institutional facts as published on the official site's About page — no
 * mission/vision statement, history, or personnel-strength figure is
 * published there, so none appears here either (`aboutFacts` only carries
 * what's real). Mirrors the `heroStats` `dl/dt/dd` pattern in `Hero.tsx` for
 * visual consistency.
 */
export function AboutFacts() {
  return (
    <section
      id="about-facts"
      className="border-b border-border bg-secondary/50 py-14 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-5">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.32em] text-accent">JURISDICTION</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Hyderabad City Police at a glance
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
            {aboutFacts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-display text-2xl font-semibold text-foreground">
                  {fact.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug tracking-wide text-muted-foreground">
                  {fact.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/** Autoplay is blocked on most browsers without a user gesture anyway, so the
 *  video simply waits for the visitor to press play — no muted-autoplay hack
 *  needed, and it matches the "play/stop button" the section calls for. */
function CommunityVideoPanel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-navy-deep">
      <video
        ref={videoRef}
        src="/assets/sajjanar2.mp4"
        preload="metadata"
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onClick={toggle}
        // preload="metadata" fetches duration/dimensions but paints nothing —
        // nudging the playhead forces the browser to decode one frame, so the
        // panel isn't solid black before the visitor presses play.
        onLoadedMetadata={(event) => {
          event.currentTarget.currentTime = 0.05;
        }}
        className="h-full w-full cursor-pointer object-cover"
      />

      <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-primary-foreground backdrop-blur-sm">
        COMMISSIONER&rsquo;S MESSAGE
      </span>

      {/* Centre play button — the resting state before anything has played. */}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className={`absolute inset-0 flex items-center justify-center bg-black/25 transition-opacity duration-300 ${
          playing ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <span className="grid h-16 w-16 place-items-center rounded-full bg-primary-foreground/95 text-navy-deep shadow-lift transition-transform duration-300 hover:scale-105 sm:h-20 sm:w-20">
          <Play className="h-7 w-7 translate-x-0.5 sm:h-8 sm:w-8" fill="currentColor" />
        </span>
      </button>

      {/* Small persistent control once playing, so pausing never needs a hunt. */}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className={`absolute bottom-4 left-4 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-primary-foreground backdrop-blur-sm transition-all duration-300 hover:bg-black/75 ${
          playing ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {playing ? (
          <Pause className="h-4 w-4" fill="currentColor" />
        ) : (
          <Play className="h-4 w-4 translate-x-0.5" fill="currentColor" />
        )}
      </button>
    </div>
  );
}

export function Gallery() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % galleryPhotos.length),
      5500,
    );

    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="gallery"
      className="mx-auto max-w-7xl px-5 py-14 sm:py-16"
    >
      <SectionHeading
        eyebrow="GALLERY"
        title="Community in Focus"
        description="A visual journey through service, operations and community outreach."
      />

      <Reveal delay={120}>
        <div className="mt-8 grid gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Photos — advance on their own, no input needed. */}
          <div
            className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lift"
            aria-roledescription="carousel"
          >
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[4/3]">
              {galleryPhotos.map((photo, index) => (
                <figure
                  key={photo.src}
                  aria-hidden={index !== active}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
                    index === active ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="h-full w-full object-cover"
                  />

                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-5 pb-5 pt-14 text-sm text-white sm:text-base">
                    {photo.caption}
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="absolute right-4 top-4 flex gap-2">
              {galleryPhotos.map((photo, index) => (
                <button
                  key={photo.src}
                  type="button"
                  aria-label={`Show photo ${index + 1}`}
                  aria-current={index === active}
                  onClick={() => setActive(index)}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    index === active
                      ? "w-7 bg-white"
                      : "w-2.5 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Video — waits for a press; browsers block real autoplay anyway. */}
          <div className="relative overflow-hidden rounded-3xl border border-border shadow-lift">
            <div className="aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-[4/3]">
              <CommunityVideoPanel />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function News() {
  return (
    <section
      id="news"
      className="mx-auto max-w-7xl px-5 py-20"
    >
      <SectionHeading
        eyebrow="UPDATES"
        title="Police Bulletin"
        description="Official updates, community initiatives and important notices."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {newsItems.map((item, index) => (
          <Reveal key={item.title} delay={index * 90}>
            <a
              href={newsArchiveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block h-full w-full overflow-hidden rounded-2xl border border-border bg-card p-6 text-left shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <img
                src={item.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Keeps the date/title/excerpt clear on the left while the
                  artwork reads on the right. Matches Citizen Services. */}
              <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,oklch(1_0_0/0.94)_0%,oklch(1_0_0/0.78)_45%,oklch(1_0_0/0.12)_100%)]" />

              <time className="relative z-10 text-xs font-medium tracking-[0.2em] text-accent">
                {item.date}
              </time>

              <h3 className="relative z-10 mt-3 text-lg font-semibold leading-snug text-foreground">
                {item.title}
              </h3>

              <p className="relative z-10 mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.excerpt}
              </p>

              <span className="relative z-10 mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent">
                Read more
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Highlights() {
  return (
    <section
      id="stations"
      className="border-t border-border bg-secondary/50 py-20"
    >
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="DISCOVER"
          title="Explore more"
          description="Awareness programmes, and the fastest way to find your nearest police station."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {highlightCards.map((card, index) => {
            const Icon = card.icon;
            const className =
              "group relative flex h-full w-full flex-col overflow-hidden rounded-3xl surface-navy p-8 text-left shadow-soft transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky";
            const content = (
              <>
                <span className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-primary-foreground/10 transition-transform duration-500 group-hover:scale-125" />

                <span className="relative grid h-12 w-12 place-items-center rounded-xl border border-sky/20 bg-sky/5 text-sky transition-all duration-500 group-hover:scale-110 group-hover:border-sky/50 group-hover:bg-sky/10">
                  <Icon className="h-7 w-7 transition-transform duration-500 group-hover:rotate-3" />
                </span>

                <h3 className="relative mt-6 text-xl font-semibold text-primary-foreground transition-colors duration-300 group-hover:text-sky">
                  {card.title}
                </h3>

                <p className="relative mt-3 text-sm leading-relaxed text-primary-foreground/75">
                  {card.blurb}
                </p>

                <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky">
                  Explore

                  <span className="grid h-7 w-7 place-items-center rounded-full border border-sky/20 bg-sky/5 transition-all duration-300 group-hover:border-sky/50 group-hover:bg-sky/10">
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </span>
              </>
            );

            return (
              <Reveal key={card.title} delay={index * 90}>
                {card.to ? (
                  <Link to={card.to} className={className}>
                    {content}
                  </Link>
                ) : (
                  <a href={card.href} target="_blank" rel="noopener noreferrer" className={className}>
                    {content}
                  </a>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}