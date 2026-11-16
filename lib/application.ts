/**
 * Règles de validation du formulaire « Soumettre une initiative » (Kit §3).
 * Partagées entre le client (retour immédiat par étape) et le serveur
 * (validation faisant foi dans la Server Action).
 */
import { drcProvinces, legalStatuses, sectors, summaryMaxWords, upload } from "@/content/calls";

export type FieldErrors = Record<string, string>;

export const steps = [
  { id: "porteur", title: "Porteur de projet", fields: ["fullName", "organization", "legalStatus", "province", "locality", "phone", "email"] },
  { id: "projet", title: "Projet", fields: ["call", "sectors", "projectTitle", "summary", "budget"] },
  { id: "pieces", title: "Pièces jointes", fields: ["conceptNote", "idDocument", "statutes"] },
  { id: "verification", title: "Vérification", fields: ["consent"] },
] as const;

export const fileFields = [
  { name: "conceptNote", label: "Note conceptuelle", required: true },
  { name: "idDocument", label: "Carte d'identité du porteur / représentant", required: true },
  { name: "statutes", label: "Statuts de la structure", required: "if-organization" },
] as const;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Numéro RDC : +243 suivi de 9 chiffres, ou 0 suivi de 9 chiffres (espaces tolérés)
const phoneRe = /^(\+243|0)\d{9}$/;

export const countWords = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

const str = (fd: FormData, k: string) => (typeof fd.get(k) === "string" ? (fd.get(k) as string).trim() : "");

export function needsStatutes(fd: FormData) {
  const s = str(fd, "legalStatus");
  return s !== "" && s !== legalStatuses[0];
}

/** Valide un fichier (taille et type déclaré). Le serveur vérifie en plus la signature binaire. */
export function checkFile(file: File | null, required: boolean): string | null {
  if (!file || file.size === 0) return required ? "Ce document est obligatoire." : null;
  if (file.size > upload.maxBytes) return "Le fichier dépasse 5 Mo.";
  const ext = file.name.toLowerCase().split(".").pop() ?? "";
  if (!["pdf", "docx", "jpg", "jpeg"].includes(ext)) return "Formats acceptés : PDF, DOCX ou JPG.";
  return null;
}

export function validateStep(stepId: (typeof steps)[number]["id"], fd: FormData): FieldErrors {
  const e: FieldErrors = {};
  if (stepId === "porteur") {
    const fullName = str(fd, "fullName");
    if (fullName.length < 3) e.fullName = "Indiquez votre nom complet.";
    else if (fullName.length > 120) e.fullName = "120 caractères maximum.";
    if (str(fd, "organization").length > 160) e.organization = "160 caractères maximum.";
    if (!(legalStatuses as readonly string[]).includes(str(fd, "legalStatus"))) e.legalStatus = "Sélectionnez un statut juridique.";
    if (!(drcProvinces as readonly string[]).includes(str(fd, "province"))) e.province = "Sélectionnez une province.";
    if (str(fd, "locality").length < 2) e.locality = "Indiquez le territoire ou la commune.";
    const phone = str(fd, "phone").replace(/[\s.-]/g, "");
    if (!phoneRe.test(phone)) e.phone = "Format attendu : +243 81 234 56 78 ou 081 234 56 78.";
    if (!emailRe.test(str(fd, "email"))) e.email = "Adresse e-mail invalide.";
  }
  if (stepId === "projet") {
    const chosen = fd.getAll("sectors").map(String);
    if (chosen.length === 0) e.sectors = "Cochez au moins un secteur.";
    else if (chosen.some((s) => !(sectors as readonly string[]).includes(s))) e.sectors = "Secteur invalide.";
    const title = str(fd, "projectTitle");
    if (title.length < 5) e.projectTitle = "Indiquez un titre (5 caractères minimum).";
    else if (title.length > 150) e.projectTitle = "150 caractères maximum.";
    const words = countWords(str(fd, "summary"));
    if (words < 30) e.summary = "Décrivez votre besoin et l'impact attendu (30 mots minimum).";
    else if (words > summaryMaxWords) e.summary = `${summaryMaxWords} mots maximum (actuellement ${words}).`;
    const budgetRaw = str(fd, "budget");
    const budget = Number(budgetRaw);
    if (!budgetRaw || !Number.isFinite(budget) || budget <= 0) e.budget = "Indiquez un montant en USD supérieur à 0.";
    else if (budget > 10_000_000) e.budget = "Montant anormalement élevé : vérifiez la saisie.";
  }
  if (stepId === "pieces") {
    for (const f of fileFields) {
      const required = f.required === true || (f.required === "if-organization" && needsStatutes(fd));
      const v = fd.get(f.name);
      const err = checkFile(v instanceof File ? v : null, required);
      if (err) e[f.name] = err;
    }
  }
  if (stepId === "verification") {
    if (fd.get("consent") !== "on") e.consent = "Vous devez certifier l'exactitude des informations.";
  }
  return e;
}

export function validateAll(fd: FormData): FieldErrors {
  return steps.reduce<FieldErrors>((acc, s) => ({ ...acc, ...validateStep(s.id, fd) }), {});
}

export type SubmitState =
  | { status: "idle" }
  | { status: "error"; message: string; errors: FieldErrors }
  | { status: "received"; reference: string; persisted: boolean };
