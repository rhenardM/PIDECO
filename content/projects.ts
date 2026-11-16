/**
 * Projets. Source : Kit §2.4 — « 4 projets fictifs » (fiche de collecte).
 * ⚠️ TOUS les projets ci-dessous sont des DONNÉES DE DÉMONSTRATION.
 */
export type ProjectStatus = "En cours" | "Achevé" | "Planifié";

export type Project = {
  slug: string;
  title: string;
  provinces: string[];
  status: ProjectStatus;
  programSlug: string;
  summary: string;
  indicators: { value: string; label: string }[];
  demo: true;
};

export const projectStatuses: ProjectStatus[] = ["En cours", "Achevé", "Planifié"];

export const projects: Project[] = [
  {
    slug: "academie-des-metiers-verts",
    title: "Académie des Métiers Verts",
    provinces: ["Kinshasa", "Kongo-Central"],
    status: "En cours",
    programSlug: "emploi-des-jeunes",
    summary:
      "Formation de 2 500 jeunes aux métiers de l'énergie solaire, du recyclage plastique et de l'agriculture urbaine.",
    indicators: [{ value: "2 500", label: "jeunes à former" }],
    demo: true,
  },
  {
    slug: "rehabilitation-pistes-rurales-himo",
    title: "Réhabilitation des Pistes Rurales (HIMO)",
    provinces: ["Kasaï-Oriental"],
    status: "Achevé",
    programSlug: "infrastructures-communautaires",
    summary:
      "Réouverture de 85 km de routes de desserte agricole générant 1 200 emplois temporaires locaux.",
    indicators: [
      { value: "85 km", label: "de routes rouvertes" },
      { value: "1 200", label: "emplois temporaires" },
    ],
    demo: true,
  },
  {
    slug: "fonds-impulsion-entrepreneuriat-feminin",
    title: "Fonds d'Impulsion Entrepreneuriat Féminin",
    provinces: ["Nord-Kivu", "Sud-Kivu"],
    status: "En cours",
    programSlug: "agriculture-securite-alimentaire",
    summary:
      "Financement et mentorat de 300 groupements de femmes actives dans la transformation agroalimentaire.",
    indicators: [{ value: "300", label: "groupements de femmes" }],
    demo: true,
  },
  {
    slug: "acces-eau-potable-assainissement",
    title: "Accès à l'Eau Potable et Assainissement",
    provinces: ["Tshopo", "Équateur"],
    status: "Planifié",
    programSlug: "infrastructures-communautaires",
    summary:
      "Forage de 40 puits équipés de pompes solaires et mise en place de comités de gestion communautaires.",
    indicators: [{ value: "40", label: "puits à pompe solaire" }],
    demo: true,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const projectProvinces = Array.from(new Set(projects.flatMap((p) => p.provinces))).sort((a, b) =>
  a.localeCompare(b, "fr"),
);
