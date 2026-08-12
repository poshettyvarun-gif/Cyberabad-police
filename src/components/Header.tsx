import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { navItems } from "../data/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 surface-navy transition-shadow duration-500 ${
        scrolled ? "shadow-lift" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3">
        <a href="#top" className="flex items-center gap-3">
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
        </a>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <div key={item.label} className="group relative">
              <a
                href={item.href}
                className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-primary-foreground/85 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                {item.label}
                {item.children && <ChevronDown className="h-3.5 w-3.5" />}
              </a>
              {item.children && (
                <div className="pointer-events-none absolute left-0 top-full w-56 translate-y-2 rounded-xl border border-border/40 bg-popover p-2 opacity-0 shadow-lift transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                  {item.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      className="block rounded-lg px-3 py-2 text-sm text-popover-foreground transition-colors hover:bg-secondary"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="ml-auto rounded-lg p-2 text-primary-foreground lg:hidden"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-primary-foreground/15 px-5 pb-5 lg:hidden">
          <nav className="flex flex-col gap-1 pt-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-primary-foreground/85 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
