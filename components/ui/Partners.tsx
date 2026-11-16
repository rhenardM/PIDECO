import { partners, partnerSlots } from "@/content/documents";

/**
 * Bandeau partenaires. Tant qu'aucun partenariat n'est confirmé,
 * des emplacements neutres sont affichés (aucun faux logo).
 */
export function Partners() {
  const confirmed = partners.filter((p) => p.confirmed);
  return (
    <div>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {confirmed.length > 0
          ? confirmed.map((p) => (
              <li key={p.name} className="flex h-24 items-center justify-center rounded-xl bg-white p-4 shadow-card">
                {p.name}
              </li>
            ))
          : Array.from({ length: partnerSlots }).map((_, i) => (
              <li
                key={i}
                className="flex h-24 items-center justify-center rounded-xl border border-dashed border-line bg-white/60 p-4 text-center text-xs text-muted"
              >
                Logo partenaire
                <br />à confirmer
              </li>
            ))}
      </ul>
      {confirmed.length === 0 && (
        <p className="mt-6 text-sm text-muted">
          Les partenaires techniques et financiers seront affichés après confirmation officielle par PIDECO.
        </p>
      )}
    </div>
  );
}
