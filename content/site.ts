/**
 * Informations institutionnelles globales.
 * Source : Kit_Complet_Site_Web_PIDECO.docx (§2.6 et §4).
 * ⚠️ Toutes les coordonnées sont des DONNÉES DE DÉMONSTRATION à confirmer par PIDECO.
 */
export const site = {
  acronym: "PIDECO",
  name: "Programme Intégré de Développement Communautaire",
  tagline: "Bâtir l'avenir de nos communautés par l'emploi et l'action locale.",
  description:
    "Le Programme Intégré de Développement Communautaire (PIDECO) accompagne la jeunesse et les acteurs locaux de la RDC vers l'autonomie économique et l'amélioration durable des conditions de vie.",
  // Nom de domaine provisoire (à confirmer : .org, .cd, .com)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pideco-rdc.org",
  country: "République Démocratique du Congo",
} as const;

export const contact = {
  demo: true,
  address: {
    street: "Avenue de la Justice",
    district: "Commune de la Gombe",
    city: "Kinshasa",
    country: "RDC",
  },
  phones: ["+243 81 000 00 00", "+243 99 000 00 00"],
  email: "contact@pideco-rdc.org",
  hours: "Lundi – Vendredi, de 08h00 à 16h30",
  /** Coordonnées GPS non confirmées : la carte n'est pas affichée tant qu'elles sont nulles. */
  geo: null as null | { lat: number; lng: number },
};

/** Réseaux sociaux : comptes officiels à collecter. `url: null` = non encore fourni. */
export const socials: { label: string; url: string | null }[] = [
  { label: "Facebook", url: null },
  { label: "LinkedIn", url: null },
  { label: "X (Twitter)", url: null },
  { label: "YouTube", url: null },
];

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export const mainNav: NavItem[] = [
  {
    label: "À propos",
    href: "/a-propos",
    children: [
      { label: "Qui sommes-nous", href: "/a-propos#qui-sommes-nous" },
      { label: "Mission & Vision", href: "/a-propos#mission" },
      { label: "Valeurs", href: "/a-propos#valeurs" },
      { label: "Gouvernance & Équipe", href: "/a-propos#gouvernance" },
      { label: "Zones d'intervention", href: "/a-propos#zones" },
    ],
  },
  { label: "Programmes", href: "/programmes" },
  { label: "Projets", href: "/projets" },
  { label: "Actualités & Médias", href: "/actualites" },
  { label: "Transparence", href: "/transparence" },
  { label: "Contact", href: "/contact" },
];

export const candidatesCta = { label: "Espace candidats", href: "/candidats" };
