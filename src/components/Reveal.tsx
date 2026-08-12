import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/** Fades + lifts its children into view the first time they cross the viewport. */
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-visible={visible}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  /** "light" for sections sitting on a dark image or navy band. */
  tone?: "dark" | "light";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "dark",
}: SectionHeadingProps) {
  const light = tone === "light";

  return (
    <Reveal>
      <div className="max-w-2xl">
        <p
          className={`text-xs font-medium tracking-[0.32em] ${
            light ? "text-sky" : "text-accent"
          }`}
        >
          {eyebrow}
        </p>
        <h2
          className={`mt-3 font-display text-3xl font-semibold sm:text-4xl ${
            light ? "text-primary-foreground" : "text-foreground"
          }`}
        >
          {title}
        </h2>
        <p
          className={`mt-3 text-base ${
            light ? "text-primary-foreground/70" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      </div>
    </Reveal>
  );
}
