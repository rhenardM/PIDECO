import Link from "next/link";

/**
 * Logotype provisoire (typographique) en attendant le logo HD officiel.
 * Le pictogramme « pousse » symbolise la croissance communautaire.
 */
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label="PIDECO — Accueil">
      <span
        className={`grid size-10 place-items-center rounded-full ${light ? "bg-white/10" : "bg-forest-900"} transition-colors`}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="size-6" fill="none">
          <path d="M12 21v-8" stroke={light ? "#b5dc8f" : "#9bcf6b"} strokeWidth="2" strokeLinecap="round" />
          <path d="M12 13c0-4 2.5-7 7-7 0 4.5-3 7-7 7Z" fill="#9bcf6b" />
          <path d="M12 15c0-3.5-2.2-6-6-6 0 3.8 2.6 6 6 6Z" fill="#f2b33d" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-xl font-bold tracking-tight ${light ? "text-white" : "text-forest-900"}`}>
          PIDECO
        </span>
        <span className={`mt-1 hidden text-[10px] font-medium uppercase tracking-[0.12em] sm:block ${light ? "text-white/60" : "text-muted"}`}>
          Développement communautaire
        </span>
      </span>
    </Link>
  );
}
