import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { navItems } from "../data/site";
import { getStations } from "../data/stations";
import { getOfficers } from "../data/contacts";

/** A `#services`-style hash needs to route to "/" first (with the hash
 *  attached) so `ScrollToHash` can land it — everything else (an internal
 *  route like "/police-stations", or nothing at all) is already a valid
 *  `<Link to>` target as-is. */
function toLink(href: string): string {
  return href.startsWith("#") ? `/${href}` : href;
}

const MAX_RESULTS_PER_GROUP = 4;

/** Plain client-side filter across both directories — ~100 records total,
 *  no index library or debounce needed. */
function useSiteSearch(query: string) {
  const q = query.trim().toLowerCase();

  return useMemo(() => {
    if (!q) return { stationResults: [], officerResults: [] };
    return {
      stationResults: getStations()
        .filter((s) => s.name.toLowerCase().includes(q) || s.zone.toLowerCase().includes(q))
        .slice(0, MAX_RESULTS_PER_GROUP),
      officerResults: getOfficers()
        .filter(
          (o) =>
            (o.name?.toLowerCase().includes(q) ?? false) ||
            o.designation.toLowerCase().includes(q),
        )
        .slice(0, MAX_RESULTS_PER_GROUP),
    };
  }, [q]);
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { stationResults, officerResults } = useSiteSearch(searchQuery);
  const hasResults = stationResults.length > 0 || officerResults.length > 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function closeSearch() {
    setSearchOpen(false);
    setSearchQuery("");
  }

  function submitSearch(event: FormEvent) {
    event.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/police-stations?q=${encodeURIComponent(q)}`);
    closeSearch();
    setMenuOpen(false);
  }

  const searchResultsPanel = hasResults ? (
    <div className="mt-3 flex flex-col gap-3 rounded-xl border border-border/40 bg-popover p-3 shadow-lift">
      {stationResults.length > 0 && (
        <div>
          <p className="px-2 text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Stations
          </p>
          <ul className="mt-1">
            {stationResults.map((station) => (
              <li key={station.id}>
                <Link
                  to={`/police-stations?q=${encodeURIComponent(station.name)}`}
                  onClick={() => {
                    closeSearch();
                    setMenuOpen(false);
                  }}
                  className="block rounded-lg px-2 py-2 text-sm text-popover-foreground transition-colors hover:bg-secondary"
                >
                  {station.name} <span className="text-muted-foreground">— {station.zone}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {officerResults.length > 0 && (
        <div>
          <p className="px-2 text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Officers
          </p>
          <ul className="mt-1">
            {officerResults.map((officer) => (
              <li key={officer.id}>
                <Link
                  to={`/contact-directory?q=${encodeURIComponent(officer.name ?? officer.designation)}`}
                  onClick={() => {
                    closeSearch();
                    setMenuOpen(false);
                  }}
                  className="block rounded-lg px-2 py-2 text-sm text-popover-foreground transition-colors hover:bg-secondary"
                >
                  {officer.name ?? officer.designation}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  ) : searchQuery.trim() ? (
    <p className="mt-3 px-1 text-xs text-primary-foreground/60">
      No matches — press Enter to search all stations.
    </p>
  ) : null;

  return (
    <header
      className={`sticky top-0 z-50 surface-navy transition-shadow duration-500 ${
        scrolled ? "shadow-lift" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/hcp-emblem.png"
            alt="Hyderabad City Police emblem"
            width={549}
            height={676}
            className="h-12 w-12 object-contain drop-shadow"
          />
          <span className="leading-tight">
            <span className="block font-display text-base font-semibold tracking-[0.14em] text-primary-foreground sm:text-lg">
              HYDERABAD CITY POLICE
            </span>
            <span className="block text-[10px] tracking-[0.3em] text-sky">
              YOUR CITY. YOUR SAFETY. OUR DUTY.
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <div key={item.label} className="group relative">
              <Link
                to={toLink(item.href)}
                className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-primary-foreground/85 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground focus-visible:bg-primary-foreground/10 focus-visible:text-primary-foreground focus-visible:outline-none"
              >
                {item.label}
                {item.children && <ChevronDown className="h-3.5 w-3.5" />}
              </Link>
              {item.children && (
                <div className="pointer-events-none absolute left-0 top-full w-56 translate-y-2 rounded-xl border border-border/40 bg-popover p-2 opacity-0 shadow-lift transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      to={toLink(child.href)}
                      className="block rounded-lg px-3 py-2 text-sm text-popover-foreground transition-colors hover:bg-secondary"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Search"
          aria-expanded={searchOpen}
          onClick={() => {
            setSearchOpen((open) => !open);
            setMenuOpen(false);
          }}
          className="ml-auto hidden rounded-full p-2.5 text-primary-foreground/85 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground lg:block"
        >
          <Search className="h-4.5 w-4.5" />
        </button>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => {
            setMenuOpen((open) => !open);
            setSearchOpen(false);
          }}
          className="ml-auto rounded-lg p-2 text-primary-foreground lg:hidden"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {searchOpen && (
        <div className="hidden border-t border-primary-foreground/15 px-5 py-4 lg:block">
          <form onSubmit={submitSearch} className="mx-auto max-w-xl">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-foreground/50" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search stations or officers…"
                aria-label="Search stations or officers"
                className="w-full rounded-full border border-primary-foreground/20 bg-primary-foreground/10 py-2.5 pl-11 pr-4 text-sm text-primary-foreground placeholder:text-primary-foreground/40 outline-none backdrop-blur-sm transition-colors focus:border-sky/50"
              />
            </div>
            {searchResultsPanel}
          </form>
        </div>
      )}

      {menuOpen && (
        <div className="border-t border-primary-foreground/15 px-5 pb-5 lg:hidden">
          <form onSubmit={submitSearch} className="pt-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-foreground/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search stations or officers…"
                aria-label="Search stations or officers"
                className="w-full rounded-full border border-primary-foreground/20 bg-primary-foreground/10 py-2.5 pl-11 pr-4 text-sm text-primary-foreground placeholder:text-primary-foreground/40 outline-none backdrop-blur-sm transition-colors focus:border-sky/50"
              />
            </div>
            {searchResultsPanel}
          </form>

          <nav className="mt-3 flex flex-col gap-1">
            {navItems.map((item) =>
              item.children ? (
                <details key={item.label} className="group rounded-lg">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-primary-foreground/85 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground [&::-webkit-details-marker]:hidden">
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <div className="flex flex-col gap-1 py-1 pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={toLink(child.href)}
                        onClick={() => setMenuOpen(false)}
                        className="rounded-lg px-3 py-2 text-sm text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  key={item.label}
                  to={toLink(item.href)}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-primary-foreground/85 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
