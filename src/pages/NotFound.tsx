import { Link } from "react-router-dom";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-5 py-24 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl border border-border bg-secondary/60 text-accent">
        <ShieldAlert className="h-7 w-7" />
      </span>
      <h1 className="mt-6 font-display text-3xl font-semibold text-foreground">Page not found</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>
    </section>
  );
}
