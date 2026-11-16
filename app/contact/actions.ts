"use server";

export type ContactState =
  | { status: "idle" }
  | { status: "error"; errors: Record<string, string> }
  | { status: "received"; persisted: boolean };

const subjects = ["Information générale", "Partenariat", "Presse & médias", "Candidature", "Autre"];

/**
 * Formulaire de contact.
 * ⚠️ BACKEND NON CONNECTÉ : validation serveur complète, mais aucun e-mail n'est envoyé.
 * Brancher ici un service d'envoi (SMTP / API transactionnelle) — voir docs/DECISIONS.md.
 */
export async function sendContact(_prev: ContactState, fd: FormData): Promise<ContactState> {
  if (fd.get("website")) return { status: "error", errors: { form: "Envoi refusé." } };
  const get = (k: string) => String(fd.get(k) ?? "").trim();
  const errors: Record<string, string> = {};
  if (get("name").length < 2) errors.name = "Indiquez votre nom.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(get("email"))) errors.email = "Adresse e-mail invalide.";
  if (!subjects.includes(get("subject"))) errors.subject = "Choisissez un objet.";
  const msg = get("message");
  if (msg.length < 20) errors.message = "Votre message doit contenir au moins 20 caractères.";
  else if (msg.length > 5000) errors.message = "5 000 caractères maximum.";
  if (Object.keys(errors).length) return { status: "error", errors };
  // TODO(backend) : envoyer le message à l'adresse officielle de PIDECO.
  return { status: "received", persisted: false };
}
