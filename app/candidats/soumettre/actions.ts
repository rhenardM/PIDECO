"use server";

import { randomUUID } from "node:crypto";
import { fileFields, validateAll, type SubmitState } from "@/lib/application";

/** Signatures binaires attendues (« magic bytes ») : ne pas se fier à l'extension seule. */
async function hasAllowedSignature(file: File) {
  const head = new Uint8Array(await file.slice(0, 4).arrayBuffer());
  const isPdf = head[0] === 0x25 && head[1] === 0x50 && head[2] === 0x44 && head[3] === 0x46; // %PDF
  const isZip = head[0] === 0x50 && head[1] === 0x4b && head[2] === 0x03 && head[3] === 0x04; // DOCX (zip)
  const isJpeg = head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff;
  return isPdf || isZip || isJpeg;
}

/**
 * Réception d'une candidature.
 *
 * ⚠️ BACKEND NON CONNECTÉ : les données sont intégralement validées côté serveur,
 * mais elles ne sont ni enregistrées ni transmises. Brancher ici le stockage
 * (base de données + stockage de fichiers privé) et la notification e-mail.
 * Voir docs/DECISIONS.md.
 */
export async function submitApplication(_prev: SubmitState, formData: FormData): Promise<SubmitState> {
  // Champ piège anti-robot : rempli uniquement par les robots
  if (formData.get("website")) {
    return { status: "error", message: "Soumission refusée.", errors: {} };
  }

  const errors = validateAll(formData);

  for (const f of fileFields) {
    const file = formData.get(f.name);
    if (file instanceof File && file.size > 0 && !errors[f.name] && !(await hasAllowedSignature(file))) {
      errors[f.name] = "Le contenu du fichier ne correspond pas à un PDF, DOCX ou JPG valide.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Certaines informations sont manquantes ou invalides. Corrigez les champs signalés.",
      errors,
    };
  }

  const reference = `PID-${randomUUID().slice(0, 8).toUpperCase()}`;

  // TODO(backend) : persister la candidature et les fichiers, puis notifier le candidat.
  return { status: "received", reference, persisted: false };
}
