import { Link } from "react-router-dom";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { Reveal, SectionHeading } from "../components/Reveal";
import { wings } from "../data/site";
import { getWingDetail } from "../data/wingDetails";

export default function Wings() {
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
            eyebrow="STRUCTURE"
            title="Wings of Hyderabad City Police"
            description="How each specialised wing is organised, what it handles, and where to reach it — as published by the Commissionerate."
          />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-14">
        <div className="flex flex-col gap-6">
          {wings.map((wing, index) => {
            const detail = getWingDetail(wing.slug);
            const Icon = wing.icon;
            return (
              <Reveal key={wing.slug} delay={index * 60}>
                <div
                  id={wing.slug}
                  className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8"
                >
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-foreground">{wing.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{wing.blurb}</p>
                    </div>
                  </div>

                  {detail?.leadership && detail.leadership.length > 0 && (
                    <div className="mt-6 grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
                      {detail.leadership.map((leader) => (
                        <div
                          key={leader.designation}
                          className="flex items-center gap-4 rounded-xl border border-border bg-secondary/40 p-4"
                        >
                          <img
                            src={leader.photo}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            className="h-16 w-16 shrink-0 rounded-full border border-border object-cover"
                          />
                          <div className="min-w-0">
                            {leader.name && (
                              <p className="truncate text-sm font-semibold text-foreground">{leader.name}</p>
                            )}
                            <p className="text-xs leading-snug text-muted-foreground">{leader.designation}</p>
                            <div className="mt-1.5 flex flex-col gap-0.5">
                              {leader.phones.map((phone) => (
                                <a
                                  key={phone}
                                  href={`tel:${phone}`}
                                  className="flex items-center gap-1.5 text-xs text-accent hover:underline"
                                >
                                  <Phone className="h-3 w-3 shrink-0" />
                                  {phone}
                                </a>
                              ))}
                              {leader.email && (
                                <a
                                  href={`mailto:${leader.email}`}
                                  className="flex items-center gap-1.5 truncate text-xs text-accent hover:underline"
                                >
                                  <Mail className="h-3 w-3 shrink-0" />
                                  {leader.email}
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {detail && (detail.structure.length > 0 || detail.scope.length > 0) && (
                    <div className="mt-6 grid gap-6 border-t border-border pt-6 sm:grid-cols-2">
                      {detail.structure.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                            Structure
                          </p>
                          <ul className="mt-2 flex flex-col gap-1.5 text-sm leading-relaxed text-foreground/85">
                            {detail.structure.map((line) => (
                              <li key={line} className="flex gap-2">
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                                {line}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {detail.scope.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                            Responsibilities
                          </p>
                          <ul className="mt-2 flex flex-col gap-1.5 text-sm leading-relaxed text-foreground/85">
                            {detail.scope.map((line) => (
                              <li key={line} className="flex gap-2">
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                                {line}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {detail?.contact && detail.contact.length > 0 && (
                    <div className="mt-6 flex flex-col gap-1.5 border-t border-border pt-6 text-sm text-foreground/85">
                      <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                        Contact
                      </p>
                      {detail.contact.map((line) => (
                        <p key={line} className="flex items-start gap-2">
                          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                          {line}
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-5">
                    <a
                      href={wing.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:text-foreground"
                    >
                      View official page
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    {detail?.directoryQuery && (
                      <Link
                        to={`/contact-directory?q=${encodeURIComponent(detail.directoryQuery)}`}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:text-foreground"
                      >
                        See officers in this wing
                      </Link>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
