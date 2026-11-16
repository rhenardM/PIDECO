import type { ReactNode } from "react";
import { Info } from "./icons";

/** Badge signalant une donnée de démonstration (non officielle). */
export function DemoBadge({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const styles = tone === "dark" ? "bg-white/15 text-white ring-white/30" : "bg-sun-100 text-night-900 ring-sun-400/60";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1 ${styles} ${className}`}
      title="Donnée de démonstration — à confirmer par PIDECO"
    >
      Démo
    </span>
  );
}

/** Emplacement d'une information à collecter auprès de PIDECO. */
export function Pending({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border border-dashed border-muted/50 bg-white/60 px-2 py-1 text-sm italic text-muted ${className}`}
    >
      <Info className="size-4 shrink-0" />
      {children}
    </span>
  );
}

type AlertTone = "info" | "success" | "error" | "warning";
const alertStyles: Record<AlertTone, string> = {
  info: "border-night-700/20 bg-white text-night-900",
  success: "border-forest-600/30 bg-leaf-100 text-forest-950",
  error: "border-danger/30 bg-danger-50 text-danger",
  warning: "border-sun-500/40 bg-sun-100 text-night-900",
};

export function Alert({
  tone = "info",
  title,
  children,
  className = "",
}: {
  tone?: AlertTone;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div role={tone === "error" ? "alert" : "status"} className={`rounded-xl border p-4 text-sm ${alertStyles[tone]} ${className}`}>
      {title && <p className="mb-1 font-semibold">{title}</p>}
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}

const statusStyles: Record<string, string> = {
  "En cours": "bg-leaf-100 text-forest-900",
  Achevé: "bg-white text-night-900",
  Planifié: "bg-sun-100 text-night-900",
  Ouvert: "bg-leaf-100 text-forest-900",
  Clôturé: "bg-sand text-night-800",
};

export function StatusPill({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[status] ?? ""}`}>
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {status}
    </span>
  );
}
