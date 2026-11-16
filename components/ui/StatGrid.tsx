import { CountUp } from "./CountUp";
import { DemoBadge } from "./Status";

type Stat = { value: number; suffix: string; label: string; detail: string };

export function StatGrid({ items, demo, tone = "dark" }: { items: Stat[]; demo?: boolean; tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <div>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {items.map((s) => (
          <div key={s.label} className={`border-l-2 pl-5 ${light ? "border-leaf-400" : "border-forest-600"}`}>
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <span className={`block font-display text-4xl font-bold md:text-5xl ${light ? "text-white" : "text-forest-900"}`}>
                <CountUp value={s.value} />
                {s.suffix}
              </span>
              <span className={`mt-2 block font-semibold ${light ? "text-white" : "text-night-900"}`}>{s.label}</span>
              <span className={`mt-1 block text-sm leading-relaxed ${light ? "text-white/65" : "text-muted"}`}>{s.detail}</span>
            </dd>
          </div>
        ))}
      </dl>
      {demo && (
        <p className={`mt-8 flex items-center gap-2 text-xs ${light ? "text-white/60" : "text-muted"}`}>
          <DemoBadge tone={light ? "dark" : "light"} /> Chiffres de démonstration — à remplacer par les données officielles de PIDECO.
        </p>
      )}
    </div>
  );
}
