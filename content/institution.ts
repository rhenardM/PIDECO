/**
 * Contenus institutionnels (page À propos, chiffres clés).
 * Textes : Kit §2.1 et §2.2. Les chiffres clés sont des DONNÉES DE DÉMONSTRATION.
 */

export const keyFigures = {
  demo: true,
  items: [
    { value: 15000, suffix: "+", label: "Jeunes formés et insérés", detail: "professionnellement dans des filières porteuses." },
    { value: 120, suffix: "", label: "Infrastructures réhabilitées", detail: "écoles, centres de santé, pistes rurales." },
    { value: 8, suffix: "", label: "Provinces d'intervention", detail: "actives à travers la République Démocratique du Congo." },
    { value: 450, suffix: "", label: "Coopératives & micro-entreprises", detail: "accompagnées et financées." },
  ],
};

export const about = {
  whoWeAre:
    "Le PIDECO est une initiative de développement multisectoriel dédiée à la revitalisation économique et sociale des territoires urbains et ruraux en République Démocratique du Congo. Face aux défis du sous-emploi des jeunes et du déficit en infrastructures de base, le programme agit comme un catalyseur entre les communautés locales, les institutions publiques et les partenaires techniques et financiers.",
  mission:
    "Accélérer l'amélioration des conditions de vie des populations vulnérables en mettant en place des mécanismes durables de création d'emplois, de renforcement des capacités et de planification participative.",
  vision:
    "Des communautés congolaises résilientes, autonomes et prospères, où chaque jeune dispose des outils nécessaires pour devenir un acteur clé du développement de son territoire.",
};

export const values = [
  {
    title: "Participation communautaire",
    text: "Les projets naissent des besoins réels exprimés par les habitants et les comités locaux.",
  },
  {
    title: "Transparence et redevabilité",
    text: "Une gestion rigoureuse des ressources et un suivi-évaluation ouvert à tous les acteurs.",
  },
  {
    title: "Inclusion sociale",
    text: "Une priorité accordée aux femmes, aux jeunes diplômés ou déscolarisés et aux groupes vulnérables.",
  },
  {
    title: "Durabilité",
    text: "Des solutions techniques et économiques pensées pour perdurer après la fin des financements.",
  },
];

/**
 * Objectifs stratégiques : reformulation directe des 4 axes du Kit (§2.3).
 * À valider par la coordination.
 */
export const strategicObjectives = [
  "Améliorer l'employabilité et l'insertion socioprofessionnelle des jeunes.",
  "Renforcer la productivité agricole et la sécurité alimentaire des communautés.",
  "Doter les territoires d'infrastructures communautaires de base durables.",
  "Renforcer la gouvernance locale et la planification participative du développement.",
];

/** Éléments institutionnels manquants : affichés comme « à compléter ». */
export const pendingInstitutionalInfo = {
  history: null as string | null, // Historique : date de création, étapes clés
  supervisingMinistry: null as string | null, // Ministère de tutelle / organisme porteur
};

/** Gouvernance : aucun nom confirmé. Les postes sont indicatifs. */
export const team: { role: string; name: string | null }[] = [
  { role: "Coordonnateur(trice) national(e)", name: null },
  { role: "Responsable administratif et financier", name: null },
  { role: "Responsable suivi-évaluation", name: null },
  { role: "Responsable communication", name: null },
];

export const governanceBodies = [
  {
    title: "Organe d'orientation",
    text: "Instance de pilotage stratégique (composition et mandat à confirmer par PIDECO).",
  },
  {
    title: "Coordination nationale",
    text: "Mise en œuvre opérationnelle, gestion fiduciaire et suivi-évaluation (organigramme à fournir).",
  },
  {
    title: "Comités Locaux de Développement (CLD)",
    text: "Relais communautaires chargés d'élaborer et de piloter les Plans Locaux de Développement.",
  },
];
