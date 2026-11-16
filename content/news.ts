/**
 * Actualités. Source : Kit §2.5 — 3 articles types.
 * ⚠️ DONNÉES DE DÉMONSTRATION. Le corps des articles n'est pas fourni :
 * seul le chapeau du kit est affiché, le reste est à rédiger par PIDECO.
 */
export type NewsCategory = "Emploi des jeunes" | "Partenariats" | "Gouvernance locale" | "Communiqué";

export type NewsArticle = {
  slug: string;
  title: string;
  date: string; // ISO
  category: NewsCategory;
  excerpt: string;
  body: string[] | null;
  demo: true;
};

export const newsCategories: NewsCategory[] = ["Emploi des jeunes", "Partenariats", "Gouvernance locale", "Communiqué"];

export const news: NewsArticle[] = [
  {
    slug: "lancement-3e-cohorte-insertion-jeunes-kinshasa",
    title: "Lancement officiel de la 3ème cohorte d'insertion des jeunes à Kinshasa",
    date: "2026-11-10",
    category: "Emploi des jeunes",
    excerpt:
      "Plus de 800 jeunes retenus entament cette semaine leur parcours de formation pratique dans les filières techniques et numériques au sein de nos centres partenaires.",
    body: null,
    demo: true,
  },
  {
    slug: "partenariat-electrification-solaire-centres-sante",
    title: "Partenariat stratégique pour l'électrification solaire des centres de santé",
    date: "2026-10-24",
    category: "Partenariats",
    excerpt:
      "Le PIDECO s'associe aux acteurs du secteur énergétique pour doter 15 centres de santé ruraux de systèmes photovoltaïques autonomes.",
    body: null,
    demo: true,
  },
  {
    slug: "atelier-national-harmonisation-outils-cld",
    title: "Atelier national d'harmonisation des outils des Comités Locaux de Développement",
    date: "2026-10-05",
    category: "Gouvernance locale",
    excerpt:
      "Trois jours d'échanges fructueux avec les représentants provinciaux pour standardiser le suivi-évaluation des initiatives communautaires.",
    body: null,
    demo: true,
  },
];

export const getArticle = (slug: string) => news.find((n) => n.slug === slug);

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(iso + "T00:00:00Z"),
  );
