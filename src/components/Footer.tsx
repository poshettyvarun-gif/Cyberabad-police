import { Mail, MapPin, Phone } from "lucide-react";
import { footerColumns } from "../data/site";

/**
 * Small patrol car that cruises the footer's bottom rule, left to right, on
 * an endless loop. Purely decorative — `aria-hidden` and skipped outright
 * under prefers-reduced-motion rather than frozen mid-track, since (unlike
 * the header ticker) it carries no information to preserve.
 */
function FooterPatrolCar() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-0 -translate-y-1/2 animate-footer-car motion-reduce:hidden"
    >
      <div className="relative flex items-center">
        {/* Trailing streak, opposite the direction of travel. */}
        <span className="absolute right-full h-[3px] w-8 -translate-y-[3px] rounded-full bg-gradient-to-l from-sky/80 to-transparent blur-[1.5px]" />
        {/* Soft ambient glow so the car reads as lit, not flat. */}
        <span className="absolute left-1/2 top-1/2 h-5 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky/30 blur-md" />

        <svg
          viewBox="0 0 48 20"
          className="relative h-[13px] w-[31px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
          fill="none"
        >
          {/* Body */}
          <path
            d="M4 16v-4q0-2 2-2h4l3-4q1-1 3-1h14q2 0 3 1l3 4h4q2 0 2 2v4z"
            fill="var(--color-primary-foreground)"
          />
          {/* Livery stripe */}
          <rect x="4" y="10.5" width="40" height="2" fill="var(--color-sky)" />
          {/* Cabin glass */}
          <path
            d="M15 9.5l2.4-3.3q.6-.7 1.6-.7h10q1 0 1.6.7l2.4 3.3z"
            fill="var(--color-navy-deep)"
            opacity="0.55"
          />
          {/* Wheels */}
          <circle cx="13" cy="16" r="3" fill="var(--color-navy-deep)" />
          <circle cx="35" cy="16" r="3" fill="var(--color-navy-deep)" />
          {/* Light bar */}
          <rect x="19" y="2" width="5" height="3.5" rx="0.75" fill="var(--color-destructive)" />
          <rect x="24" y="2" width="5" height="3.5" rx="0.75" fill="var(--color-azure)" />
        </svg>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="surface-navy">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src="/assets/hcp-emblem.png"
            alt="Hyderabad City Police emblem"
            width={549}
            height={676}
            loading="lazy"
            className="h-16 w-16 object-contain"
          />
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
            Hyderabad City Police Commissionerate, Integrated Command &amp; Control Centre,
            Banjara Hills, Hyderabad — 500034.
          </p>
        </div>

        {footerColumns.map((column) => (
          <div key={column.heading}>
            <h4 className="text-sm font-semibold tracking-[0.2em] text-sky">
              {column.heading}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/75">
              {column.links.map((link) => (
                <li key={link}>
                  <a
                    href={column.href}
                    className="transition-colors hover:text-primary-foreground"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-sm font-semibold tracking-[0.2em] text-sky">CONTACT</h4>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/75">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-sky" />
              100 / 112
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-sky" />
              cp@hyderabadpolice.gov.in
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-sky" />
              Banjara Hills, Hyderabad
            </li>
          </ul>
        </div>
      </div>

      <div className="relative overflow-hidden border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/55">
        <FooterPatrolCar />
        © {new Date().getFullYear()} Hyderabad City Police. All rights reserved.
      </div>
    </footer>
  );
}
