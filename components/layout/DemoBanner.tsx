/**
 * Bandeau global signalant que le site contient des données de démonstration.
 * À retirer (NEXT_PUBLIC_DEMO_MODE=false) une fois les contenus officiels intégrés.
 */
export function DemoBanner() {
  if (process.env.NEXT_PUBLIC_DEMO_MODE === "false") return null;
  return (
    <div className="bg-sun-400 text-night-900">
      <p className="container-site py-2 text-center text-xs font-medium sm:text-sm">
        Version de démonstration : les chiffres, projets, actualités et coordonnées marqués « Démo » sont à confirmer par PIDECO.
      </p>
    </div>
  );
}
