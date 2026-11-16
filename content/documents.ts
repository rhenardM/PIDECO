/**
 * Publications, rapports et documents de transparence.
 * Aucun document réel n'a été fourni : chaque entrée est un emplacement
 * dont `file` reste null tant que PIDECO n'a pas transmis le PDF.
 */
export type DocCategory =
  | "Rapport annuel"
  | "Rapport d'activités"
  | "Document institutionnel"
  | "Résultats des programmes"
  | "Financements & partenariats"
  | "Communiqué de presse";

export type PublicDocument = {
  title: string;
  category: DocCategory;
  year: number | null;
  file: string | null; // chemin dans /public/documents
};

export const documents: PublicDocument[] = [
  { title: "Rapport annuel", category: "Rapport annuel", year: null, file: null },
  { title: "Rapport d'activités semestriel", category: "Rapport d'activités", year: null, file: null },
  { title: "Document de présentation du programme", category: "Document institutionnel", year: null, file: null },
  { title: "Manuel de procédures", category: "Document institutionnel", year: null, file: null },
  { title: "Cadre de résultats et indicateurs", category: "Résultats des programmes", year: null, file: null },
  { title: "Liste des partenaires techniques et financiers", category: "Financements & partenariats", year: null, file: null },
  { title: "Communiqués de presse", category: "Communiqué de presse", year: null, file: null },
];

/**
 * Partenaires : le kit cite « BAD, PNUD, Coopération… » à titre d'EXEMPLE uniquement.
 * Aucun logo ni nom n'est affiché tant que le partenariat n'est pas confirmé.
 */
export const partners: { name: string; logo: string | null; confirmed: boolean }[] = [];
export const partnerSlots = 5;
