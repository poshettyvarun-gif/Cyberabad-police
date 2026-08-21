import { Link } from "react-router-dom";
import { ExternalLink, Mail, Phone, Scale } from "lucide-react";
import { Reveal, SectionHeading } from "../components/Reveal";
import { lawOrderLeadership, lawOrderScope, lawOrderStructure } from "../data/wingDetails";

const officialUrl = "https://hyderabadpolice.gov.in/law_order.html";

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
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary-foreground/10 text-sky">
              <Scale className="h-7 w-7" />
            </span>
            <SectionHeading
              tone="light"
              eyebrow="STRUCTURE"
              title="Law and Order"
              description="How the wing is organised, what it handles, and where to reach it — as published by the Commissionerate."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {lawOrderLeadership.map((leader) => (
              <div
                key={leader.designation}
                className="flex items-center gap-5 rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <img
                  src={leader.photo}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-20 w-20 shrink-0 rounded-full border border-border object-cover"
                />
                <div className="min-w-0">
                  {leader.name && (
                    <p className="truncate font-display text-base font-semibold text-foreground">
                      {leader.name}
                    </p>
                  )}
                  <p className="mt-0.5 text-sm leading-snug text-muted-foreground">{leader.designation}</p>
                  <div className="mt-2 flex flex-col gap-1">
                    {leader.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone}`}
                        className="flex items-center gap-1.5 text-sm text-accent hover:underline"
                      >
                        <Phone className="h-3.5 w-3.5 shrink-0" />
                        {phone}
                      </a>
                    ))}
                    {leader.email && (
                      <a
                        href={`mailto:${leader.email}`}
                        className="flex items-center gap-1.5 truncate text-sm text-accent hover:underline"
                      >
                        <Mail className="h-3.5 w-3.5 shrink-0" />
                        {leader.email}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 border-t border-border pt-12 sm:grid-cols-2">
          <Reveal delay={80}>
            <p className="text-xs font-medium tracking-[0.32em] text-accent">STRUCTURE</p>
            <ul className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-foreground/85">
              {lawOrderStructure.map((line) => (
                <li key={line} className="flex gap-2.5">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-xs font-medium tracking-[0.32em] text-accent">RESPONSIBILITIES</p>
            <ul className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-foreground/85">
              {lawOrderScope.map((line) => (
                <li key={line} className="flex gap-2.5">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-border pt-8">
            <a
              href={officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:text-foreground"
            >
              View official page
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <Link
              to="/contact-directory?q=Law%20%26%20Order"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:text-foreground"
            >
              See officers in this wing
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
