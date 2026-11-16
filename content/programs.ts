/**
 * Les 4 axes d'intervention. Description : Kit §2.3 (texte officiel du kit).
 * Objectifs / activités / bénéficiaires sont reformulés à partir du kit.
 * Les « résultats attendus » chiffrés ne sont pas fournis : à compléter par PIDECO.
 */
export type Program = {
  slug: string;
  number: number;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  objectives: string[];
  activities: string[];
  beneficiaries: string[];
  expectedResults: string[] | null;
  tone: "forest" | "night" | "sun" | "leaf";
};

export const programs: Program[] = [
  {
    slug: "emploi-des-jeunes",
    number: 1,
    title: "Emploi et insertion socioprofessionnelle des jeunes",
    shortTitle: "Emploi des jeunes",
    summary:
      "Formations qualifiantes, accompagnement à la création d'entreprise et micro-subventions de démarrage.",
    description:
      "Formations professionnelles qualifiantes (métiers du bâtiment, numérique, énergie solaire, mécanique, artisanat), accompagnement à la création d'entreprise et octroi de micro-subventions de démarrage.",
    objectives: [
      "Améliorer l'employabilité des jeunes dans des filières porteuses.",
      "Favoriser la création d'activités génératrices de revenus et de micro-entreprises.",
    ],
    activities: [
      "Formations qualifiantes : métiers du bâtiment, numérique, énergie solaire, mécanique, artisanat.",
      "Accompagnement à la création d'entreprise.",
      "Octroi de micro-subventions de démarrage.",
    ],
    beneficiaries: ["Jeunes diplômés", "Jeunes déscolarisés", "Jeunes femmes porteuses de projets"],
    expectedResults: null,
    tone: "forest",
  },
  {
    slug: "agriculture-securite-alimentaire",
    number: 2,
    title: "Développement agricole et sécurité alimentaire",
    shortTitle: "Agriculture & sécurité alimentaire",
    summary:
      "Appui aux coopératives paysannes, semences améliorées et structuration des chaînes de valeur.",
    description:
      "Appui technique aux coopératives paysannes, distribution de semences améliorées, modernisation des unités de transformation locale et structuration des chaînes de valeur vers les marchés urbains.",
    objectives: [
      "Accroître la productivité et les revenus des exploitations familiales.",
      "Renforcer la sécurité alimentaire des communautés.",
    ],
    activities: [
      "Appui technique aux coopératives paysannes.",
      "Distribution de semences améliorées.",
      "Modernisation des unités de transformation locale.",
      "Structuration des chaînes de valeur vers les marchés urbains.",
    ],
    beneficiaries: ["Coopératives paysannes", "Groupements de femmes agricultrices", "Unités de transformation locales"],
    expectedResults: null,
    tone: "leaf",
  },
  {
    slug: "infrastructures-communautaires",
    number: 3,
    title: "Infrastructures communautaires de base",
    shortTitle: "Infrastructures de base",
    summary:
      "Construction et réhabilitation participative d'écoles, centres de santé, forages et pistes rurales.",
    description:
      "Construction et réhabilitation participative d'écoles, de centres de santé, de points d'eau potable (forages) et de routes de desserte agricole selon l'approche Haute Intensité de Main-d'Œuvre (HIMO).",
    objectives: [
      "Améliorer l'accès des populations aux services sociaux de base.",
      "Créer des emplois locaux temporaires grâce à l'approche HIMO.",
    ],
    activities: [
      "Construction et réhabilitation d'écoles et de centres de santé.",
      "Réalisation de points d'eau potable (forages).",
      "Réouverture de routes de desserte agricole selon l'approche HIMO.",
    ],
    beneficiaries: ["Communautés rurales et périurbaines", "Élèves et personnels de santé", "Main-d'œuvre locale"],
    expectedResults: null,
    tone: "night",
  },
  {
    slug: "gouvernance-locale",
    number: 4,
    title: "Gouvernance locale et planification participative",
    shortTitle: "Gouvernance locale",
    summary:
      "Renforcement des Comités Locaux de Développement pour piloter leurs Plans Locaux de Développement.",
    description:
      "Renforcement des capacités des Comités Locaux de Développement (CLD) pour élaborer, budgétiser et piloter leurs propres Plans Locaux de Développement (PLD).",
    objectives: [
      "Rendre les communautés actrices de la planification de leur territoire.",
      "Améliorer la redevabilité dans la gestion des initiatives locales.",
    ],
    activities: [
      "Renforcement des capacités des Comités Locaux de Développement (CLD).",
      "Appui à l'élaboration et à la budgétisation des Plans Locaux de Développement (PLD).",
      "Harmonisation des outils de suivi-évaluation des initiatives communautaires.",
    ],
    beneficiaries: ["Comités Locaux de Développement", "Autorités locales", "Organisations communautaires"],
    expectedResults: null,
    tone: "sun",
  },
];

export const getProgram = (slug: string) => programs.find((p) => p.slug === slug);
