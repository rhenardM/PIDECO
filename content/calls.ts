/**
 * Appels à projets & formulaire de candidature.
 * Champs du formulaire : Kit §3 (référence officielle du formulaire).
 * ⚠️ Les appels ci-dessous sont des DONNÉES DE DÉMONSTRATION : le kit n'en définit aucun.
 */
export type CallStatus = "Ouvert" | "Clôturé";

export type Call = {
  slug: string;
  title: string;
  status: CallStatus;
  deadline: string | null; // ISO — null = à définir
  programSlug: string;
  sectors: string[];
  summary: string;
  eligibility: string[];
  demo: true;
};

export const calls: Call[] = [
  {
    slug: "initiatives-jeunes-entrepreneurs",
    title: "Appel à initiatives — Jeunes entrepreneurs et coopératives",
    status: "Ouvert",
    deadline: null,
    programSlug: "emploi-des-jeunes",
    sectors: ["Agriculture", "Artisanat & Métiers", "Numérique", "Énergie verte"],
    summary:
      "Appel destiné aux jeunes porteurs de projets, associations, coopératives et micro-entreprises souhaitant obtenir un appui pour lancer ou développer une activité à impact communautaire.",
    eligibility: [
      "Être un jeune porteur de projet, une association, une coopérative ou une micro-entreprise.",
      "Mener ou prévoir l'activité dans une province d'intervention du programme.",
      "Présenter un projet relevant d'un secteur éligible.",
      "Fournir les pièces jointes demandées (note conceptuelle, pièce d'identité, statuts le cas échéant).",
    ],
    demo: true,
  },
  {
    slug: "infrastructures-communautaires-2026",
    title: "Appel à propositions — Microprojets d'infrastructures communautaires",
    status: "Clôturé",
    deadline: null,
    programSlug: "infrastructures-communautaires",
    sectors: ["Infrastructure communautaire"],
    summary:
      "Appel destiné aux Comités Locaux de Développement pour proposer des microprojets d'infrastructures identifiés dans leur Plan Local de Développement.",
    eligibility: [
      "Être un Comité Local de Développement reconnu.",
      "Le microprojet doit figurer dans le Plan Local de Développement.",
    ],
    demo: true,
  },
];

export const getCall = (slug: string) => calls.find((c) => c.slug === slug);

export const legalStatuses = ["Individuel (Jeune)", "Association", "Coopérative", "Micro-entreprise"] as const;

export const sectors = [
  "Agriculture",
  "Artisanat & Métiers",
  "Numérique",
  "Énergie verte",
  "Infrastructure communautaire",
] as const;

/** Les 26 provinces de la RDC (Constitution de 2006). */
export const drcProvinces = [
  "Bas-Uele",
  "Équateur",
  "Haut-Katanga",
  "Haut-Lomami",
  "Haut-Uele",
  "Ituri",
  "Kasaï",
  "Kasaï-Central",
  "Kasaï-Oriental",
  "Kinshasa",
  "Kongo-Central",
  "Kwango",
  "Kwilu",
  "Lomami",
  "Lualaba",
  "Mai-Ndombe",
  "Maniema",
  "Mongala",
  "Nord-Kivu",
  "Nord-Ubangi",
  "Sankuru",
  "Sud-Kivu",
  "Sud-Ubangi",
  "Tanganyika",
  "Tshopo",
  "Tshuapa",
] as const;

export const upload = {
  maxBytes: 5 * 1024 * 1024,
  maxFiles: 3,
  accept: ".pdf,.docx,.jpg,.jpeg",
  mimeTypes: [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
  ],
};

export const summaryMaxWords = 500;

export const faq = [
  {
    q: "Qui peut soumettre une initiative ?",
    a: "Les jeunes porteurs de projets à titre individuel, les associations, les coopératives et les micro-entreprises, selon les conditions propres à chaque appel.",
  },
  {
    q: "Quels documents dois-je préparer ?",
    a: "Une note conceptuelle, une copie de votre pièce d'identité et, pour les structures, leurs statuts. Formats acceptés : PDF, DOCX ou JPG, 5 Mo maximum par fichier.",
  },
  {
    q: "La soumission est-elle payante ?",
    a: "Les modalités financières doivent être confirmées par PIDECO. Ne versez jamais d'argent à un intermédiaire se présentant au nom du programme.",
  },
  {
    q: "Comment serai-je informé(e) du résultat ?",
    a: "Par téléphone (WhatsApp) ou par e-mail, aux coordonnées indiquées dans votre dossier. Les délais de réponse sont à confirmer par PIDECO.",
  },
];
