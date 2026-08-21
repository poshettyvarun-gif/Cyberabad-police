import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

/** lucide-react has no WhatsApp mark — one small hand-authored glyph rather
 *  than pulling in an icon library for a single icon. */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.13-2.9-7C17.18 3.03 14.7 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.26-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.4-.12-.56.13-.17.25-.65.81-.79.97-.15.17-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.22-.73-.66-1.23-1.46-1.37-1.71-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31s-.88.86-.88 2.1.9 2.44 1.03 2.6c.13.17 1.77 2.71 4.29 3.8.6.26 1.07.42 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29Z" />
    </svg>
  );
}

const socials = [
  { label: "YouTube", href: "https://www.youtube.com/c/BhupathiVikramrajPROHYDERABADCITY/", Icon: Youtube },
  { label: "Instagram", href: "https://www.instagram.com/hyderabadcitypolice/", Icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/hyderabadpolice", Icon: Facebook },
  { label: "Twitter", href: "https://twitter.com/hydcitypolice", Icon: Twitter },
  { label: "WhatsApp", href: "https://wa.me/919490616555", Icon: WhatsAppIcon },
];

export function SocialLinks() {
  return (
    <ul className="flex items-center gap-2.5">
      {socials.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="grid h-9 w-9 place-items-center rounded-full border border-primary-foreground/15 bg-primary-foreground/5 text-primary-foreground/75 transition-all duration-300 hover:border-sky/50 hover:bg-sky/10 hover:text-sky"
          >
            <Icon className="h-4 w-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}
