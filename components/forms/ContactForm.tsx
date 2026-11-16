"use client";

import { startTransition, useActionState } from "react";
import { sendContact, type ContactState } from "@/app/contact/actions";
import { SelectField, TextArea, TextField } from "./Fields";
import { Alert } from "@/components/ui/Status";
import { Button } from "@/components/ui/Button";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const errors = state.status === "error" ? state.errors : {};

  if (state.status === "received") {
    return (
      <Alert tone={state.persisted ? "success" : "warning"} title={state.persisted ? "Message envoyé" : "Message valide — envoi non activé"}>
        {state.persisted
          ? "Merci, votre message a bien été transmis à l'équipe PIDECO."
          : "Votre message est correctement rempli, mais l'envoi n'est pas encore activé sur cette version de démonstration. Il n'a pas été transmis."}
      </Alert>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(() => action(fd));
      }}
      className="grid gap-5"
    >
      {errors.form && <Alert tone="error">{errors.form}</Alert>}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="name" label="Nom complet" required autoComplete="name" error={errors.name} />
        <TextField name="email" type="email" label="Adresse e-mail" required autoComplete="email" error={errors.email} />
      </div>
      <SelectField
        name="subject"
        label="Objet"
        required
        options={["Information générale", "Partenariat", "Presse & médias", "Candidature", "Autre"]}
        error={errors.subject}
      />
      <TextArea name="message" label="Message" required maxLength={5000} error={errors.message} />
      <div>
        <Button type="submit" disabled={pending} aria-busy={pending}>
          {pending ? "Envoi…" : "Envoyer le message"}
        </Button>
      </div>
    </form>
  );
}
