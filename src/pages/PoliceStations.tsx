import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ExternalLink, MapPin, Search } from "lucide-react";
import { Reveal, SectionHeading } from "../components/Reveal";
import { getStations, knowYourPsUrl, zones, type Station } from "../data/stations";

const stations = getStations();

function zonePill(active: boolean) {
  return `rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide transition-colors ${
    active
      ? "border-sky bg-sky text-navy-deep"
      : "border-primary-foreground/20 text-primary-foreground/70 hover:border-sky/50 hover:text-primary-foreground"
  }`;
}

export default function PoliceStations() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [zoneFilter, setZoneFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return stations.filter((station) => {
      if (zoneFilter && station.zone !== zoneFilter) return false;
      if (!q) return true;
      return (
        station.name.toLowerCase().includes(q) ||
        station.zone.toLowerCase().includes(q) ||
        (station.division?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [query, zoneFilter]);

  const groups = useMemo(() => {
    const byZone = new Map<string, Station[]>();
    for (const station of filtered) {
      const list = byZone.get(station.zone) ?? [];
      list.push(station);
      byZone.set(station.zone, list);
    }
    return zones
      .map((zone) => ({ zone, list: byZone.get(zone.name) ?? [] }))
      .filter((group) => group.list.length > 0);
  }, [filtered]);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-deep">
        <img
          src="/assets/services-wings-shield.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-95"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.12_0.04_262/0.72),oklch(0.12_0.04_262/0.42)_55%,oklch(0.12_0.04_262/0.5))]" />

        <div className="relative mx-auto max-w-7xl px-5 py-16">
          <SectionHeading
            tone="light"
            eyebrow="DIRECTORY"
            title="Police stations"
            description={`Search all ${stations.length} stations across ${zones.length} zones of the Hyderabad City Police Commissionerate.`}
          />

          <Reveal delay={100}>
            <div className="mt-8 flex flex-col gap-4">
              <div className="relative max-w-xl">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-foreground/50" />
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by station name…"
                  aria-label="Search police stations"
                  className="w-full rounded-full border border-primary-foreground/20 bg-primary-foreground/10 py-3 pl-11 pr-4 text-sm text-primary-foreground placeholder:text-primary-foreground/40 outline-none backdrop-blur-sm transition-colors focus:border-sky/50"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setZoneFilter(null)} className={zonePill(zoneFilter === null)}>
                  All zones
                </button>
                {zones.map((zone) => (
                  <button
                    key={zone.name}
                    type="button"
                    onClick={() => setZoneFilter(zone.name)}
                    className={zonePill(zoneFilter === zone.name)}
                  >
                    {zone.name}
                  </button>
                ))}
              </div>

              {/* No per-station phone/address is published in the official
                  list view — one honest outbound link, rather than 73
                  fabricated ones. */}
              <a
                href={knowYourPsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-1.5 text-xs font-medium text-sky underline decoration-sky/40 underline-offset-4 transition-colors hover:text-primary-foreground"
              >
                For station contact details and maps, visit the official Know Your PS page
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14">
        {groups.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No stations match &ldquo;{query}&rdquo;{zoneFilter ? ` in ${zoneFilter}` : ""}.
          </p>
        ) : (
          <div className="flex flex-col gap-10">
            {groups.map(({ zone, list }, index) => (
              <Reveal key={zone.name} delay={index * 60}>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-3">
                    <h3 className="font-display text-lg font-semibold text-foreground">{zone.name}</h3>
                    <span className="text-xs tracking-wide text-muted-foreground">
                      {zone.range} · {list.length} station{list.length === 1 ? "" : "s"}
                    </span>
                  </div>

                  <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {list.map((station) => (
                      <li
                        key={station.id}
                        className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm"
                      >
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
                        <span className="truncate text-foreground">{station.name}</span>
                        {station.division && (
                          <span className="ml-auto shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                            {station.division}
                          </span>
                        )}
                        {station.kind === "outpost" && (
                          <span className="ml-auto shrink-0 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
                            Outpost
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
