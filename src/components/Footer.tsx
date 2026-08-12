import { Mail, MapPin, Phone } from "lucide-react";
import { footerColumns } from "../data/site";

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

      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/55">
        © {new Date().getFullYear()} Hyderabad City Police. All rights reserved.
      </div>
    </footer>
  );
}
