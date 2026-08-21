import { Link, useParams } from "react-router-dom";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { Reveal, SectionHeading } from "../components/Reveal";
import { getWingPage } from "../data/wingDetails";
import NotFound from "./NotFound";

export default function Wings() {
  const { slug } = useParams();
  const wing = getWingPage(slug);

  if (!wing) return <NotFound />;

  const Icon = wing.icon;

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
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary-foreground/10 text-sky">
              <Icon className="h-7 w-7" />
            </span>
            <SectionHeading tone="light" eyebrow="STRUCTURE" title={wing.title} description={wing.description} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        {wing.location && (
          <Reveal>
            <p className="flex items-center gap-2 text-base font-semibold text-accent">
              <MapPin className="h-4 w-4 shrink-0" />
              {wing.location}
            </p>
          </Reveal>
        )}

        {wing.paragraphs && wing.paragraphs.length > 0 && (
          <Reveal delay={40}>
            <div className="mt-4 flex flex-col gap-4 text-base font-semibold leading-relaxed text-foreground/85">
              {wing.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
        )}

        <div className={`grid gap-10 lg:grid-cols-2 lg:items-start ${wing.location || wing.paragraphs ? "mt-8" : ""}`}>
          <Reveal delay={80}>
            <div className="flex flex-col gap-5">
              {wing.leadership.map((leader) => (
                <div
                  key={leader.designation}
                  className="flex items-center gap-6 rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8"
                >
                  <img
                    src={leader.photo}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-32 w-32 shrink-0 rounded-full border border-border object-cover sm:h-40 sm:w-40"
                  />
                  <div className="min-w-0">
                    {leader.name && (
                      <p className="truncate font-display text-2xl font-bold text-foreground">
                        {leader.name}
                      </p>
                    )}
                    <p className="text-lg font-semibold leading-snug text-muted-foreground">{leader.designation}</p>
                    <div className="mt-3 flex flex-col gap-2">
                      {leader.phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone}`}
                          className="flex items-center gap-2 text-lg font-semibold text-accent hover:underline"
                        >
                          <Phone className="h-4 w-4 shrink-0" />
                          {phone}
                        </a>
                      ))}
                      {leader.email && (
                        <a
                          href={`mailto:${leader.email}`}
                          className="flex items-center gap-2 truncate text-lg font-semibold text-accent hover:underline"
                        >
                          <Mail className="h-4 w-4 shrink-0" />
                          {leader.email}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="flex flex-col gap-10">
            {wing.bulletSections.map((section, index) => (
              <Reveal key={section.heading} delay={120 + index * 60}>
                <p className="text-sm font-semibold tracking-[0.32em] text-accent uppercase">{section.heading}</p>
                {section.intro && (
                  <p className="mt-3 text-base font-semibold leading-relaxed text-foreground/85">{section.intro}</p>
                )}
                <ul className="mt-4 flex flex-col gap-3 text-base font-semibold leading-relaxed text-foreground/85">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>

        {wing.contactsTable && (
          <Reveal delay={160}>
            <div className="mt-12 border-t border-border pt-12">
              <p className="text-sm font-semibold tracking-[0.32em] text-accent uppercase">
                {wing.contactsTable.heading}
              </p>
              <div className="mt-4 overflow-x-auto rounded-xl border border-border">
                <table className="w-full min-w-[480px] border-collapse text-left text-base">
                  <thead>
                    <tr className="bg-secondary/60 text-sm font-bold tracking-wide text-muted-foreground uppercase">
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Landline No</th>
                      <th className="px-4 py-3">Mobile No</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wing.contactsTable.rows.map((row) => (
                      <tr key={row.label} className="border-t border-border font-semibold">
                        <td className="px-4 py-3 text-foreground">{row.label}</td>
                        <td className="px-4 py-3">
                          {row.landline.map((num) => (
                            <a key={num} href={`tel:${num}`} className="mr-2 text-accent hover:underline">
                              {num}
                            </a>
                          ))}
                        </td>
                        <td className="px-4 py-3">
                          {row.mobile.map((num) => (
                            <a key={num} href={`tel:${num}`} className="mr-2 text-accent hover:underline">
                              {num}
                            </a>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        )}

        {wing.officerRoster && (
          <Reveal delay={160}>
            <div className="mt-12 border-t border-border pt-12">
              <p className="text-sm font-semibold tracking-[0.32em] text-accent uppercase">
                {wing.officerRoster.heading}
              </p>
              <div className="mt-4 overflow-x-auto rounded-xl border border-border">
                <table className="w-full min-w-[560px] border-collapse text-left text-base">
                  <thead>
                    <tr className="bg-secondary/60 text-sm font-bold tracking-wide text-muted-foreground uppercase">
                      <th className="px-4 py-3">S.No.</th>
                      <th className="px-4 py-3">Name of the Officer</th>
                      <th className="px-4 py-3">Rank</th>
                      <th className="px-4 py-3">Mobile Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wing.officerRoster.rows.map((row, index) =>
                      row.kind === "group" ? (
                        <tr key={`group-${row.label}-${index}`} className="border-t border-border bg-secondary/30">
                          <td colSpan={4} className="px-4 py-2 text-sm font-bold tracking-wide text-foreground/80">
                            {row.label}
                          </td>
                        </tr>
                      ) : (
                        <tr key={row.no} className="border-t border-border font-semibold">
                          <td className="px-4 py-3 text-muted-foreground">{row.no}</td>
                          <td className="px-4 py-3 text-foreground">{row.name ?? "—"}</td>
                          <td className="px-4 py-3 text-foreground/85">{row.rank}</td>
                          <td className="px-4 py-3">
                            {row.mobile ? (
                              <a href={`tel:${row.mobile}`} className="text-accent hover:underline">
                                {row.mobile}
                              </a>
                            ) : (
                              "—"
                            )}
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        )}

        {wing.paragraphSections && wing.paragraphSections.length > 0 && (
          <div className="mt-12 flex flex-col gap-10 border-t border-border pt-12">
            {wing.paragraphSections.map((section, index) => (
              <Reveal key={section.heading} delay={160 + index * 60}>
                <p className="text-sm font-semibold tracking-[0.32em] text-accent uppercase">{section.heading}</p>
                <div className="mt-4 flex flex-col gap-4 text-base font-semibold leading-relaxed text-foreground/85">
                  {section.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={220}>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-border pt-8">
            {wing.officialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-base font-semibold text-accent underline decoration-accent/40 underline-offset-4 hover:text-foreground"
              >
                {link.label}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ))}
            <Link
              to={`/contact-directory?q=${encodeURIComponent(wing.directoryQuery)}`}
              className="inline-flex items-center gap-1.5 text-base font-semibold text-accent underline decoration-accent/40 underline-offset-4 hover:text-foreground"
            >
              See officers in this wing
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
