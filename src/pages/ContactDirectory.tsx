import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ExternalLink, Mail, Phone, Search } from "lucide-react";
import { Reveal, SectionHeading } from "../components/Reveal";
import { getOfficers, officialContactsUrl, type OfficerCategory } from "../data/contacts";

const officers = getOfficers();

const categories: OfficerCategory[] = [
  "Senior Command",
  "Joint Commissioners",
  "Deputy Commissioners — Zones",
  "Deputy Commissioners — Specialized Wings",
];

function categoryPill(active: boolean) {
  return `rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide transition-colors ${
    active
      ? "border-accent bg-accent text-accent-foreground"
      : "border-border text-muted-foreground hover:border-accent/50 hover:text-accent"
  }`;
}

export default function ContactDirectory() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState<OfficerCategory | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return officers.filter((officer) => {
      if (category && officer.category !== category) return false;
      if (!q) return true;
      return (
        (officer.name?.toLowerCase().includes(q) ?? false) ||
        officer.designation.toLowerCase().includes(q) ||
        (officer.jurisdiction?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [query, category]);

  return (
    <>
      <section className="border-b border-border bg-secondary/50 py-16">
        <div className="mx-auto max-w-7xl px-5">
          <SectionHeading
            eyebrow="CONTACT"
            title="Officer directory"
            description={`Senior officers, zone Deputy Commissioners and wing heads — ${officers.length} entries as published by the Commissionerate.`}
          />

          {/* Officer postings and mobiles change far more often than the
              rest of this site's content — this stays visible above every
              result, not buried in a footnote. */}
          <Reveal delay={100}>
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-accent/25 bg-accent/5 px-4 py-3 text-sm text-foreground">
              <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <p>
                Contact details as published on the official Hyderabad City Police site.
                Postings change — for the latest information, visit the{" "}
                <a
                  href={officialContactsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:text-foreground"
                >
                  official contact page
                </a>
                .
              </p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-6 flex flex-col gap-4">
              <div className="relative max-w-xl">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by name, designation or zone…"
                  aria-label="Search the officer directory"
                  className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-accent/50"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setCategory(null)} className={categoryPill(category === null)}>
                  All
                </button>
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={categoryPill(category === c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No entries match &ldquo;{query}&rdquo;.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((officer, index) => (
              <Reveal key={officer.id} delay={(index % 6) * 60}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <p className="font-display text-base font-semibold leading-snug text-foreground">
                    {officer.name ?? officer.designation}
                  </p>
                  {officer.name && (
                    <p className="mt-1 text-sm text-muted-foreground">{officer.designation}</p>
                  )}
                  {officer.jurisdiction && (
                    <span className="mt-2 inline-flex w-fit rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {officer.jurisdiction}
                    </span>
                  )}

                  <div className="mt-4 flex flex-col gap-1.5 border-t border-border pt-3">
                    {officer.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone}`}
                        className="flex items-center gap-2 text-sm text-accent hover:underline"
                      >
                        <Phone className="h-3.5 w-3.5 shrink-0" />
                        {phone}
                      </a>
                    ))}
                    {officer.email && (
                      <a
                        href={`mailto:${officer.email}`}
                        className="flex items-center gap-2 text-sm text-accent hover:underline"
                      >
                        <Mail className="h-3.5 w-3.5 shrink-0" />
                        {officer.email}
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
