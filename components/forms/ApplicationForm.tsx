"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { submitApplication } from "@/app/candidats/soumettre/actions";
import { calls, drcProvinces, legalStatuses, sectors, summaryMaxWords, upload } from "@/content/calls";
import {
  countWords,
  fileFields,
  needsStatutes,
  steps,
  validateStep,
  type FieldErrors,
  type SubmitState,
} from "@/lib/application";
import { CheckboxGroup, SelectField, TextArea, TextField } from "./Fields";
import { Alert } from "@/components/ui/Status";
import { Button, LinkButton } from "@/components/ui/Button";
import { Check, FileIcon, Upload } from "@/components/ui/icons";

const initial: SubmitState = { status: "idle" };
const openCalls = calls.filter((c) => c.status === "Ouvert");

/**
 * Formulaire de candidature en 4 étapes.
 * Toutes les étapes restent montées (masquées via `hidden`) : un seul <form>
 * transmet l'ensemble des champs et fichiers à la Server Action.
 */
export function ApplicationForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [summaryWords, setSummaryWords] = useState(0);
  const [statutesRequired, setStatutesRequired] = useState(false);
  const [fileNames, setFileNames] = useState<Record<string, string>>({});
  const [review, setReview] = useState<{ label: string; value: string }[]>([]);
  const [state, formAction, pending] = useActionState(submitApplication, initial);

  // Présélection de l'appel via ?appel=slug
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("appel");
    const select = formRef.current?.elements.namedItem("call") as HTMLSelectElement | null;
    if (slug && select && openCalls.some((c) => c.slug === slug)) select.value = slug;
  }, []);

  // Erreurs renvoyées par le serveur : retour à la première étape concernée
  const [handled, setHandled] = useState<SubmitState>(initial);
  if (state !== handled) {
    setHandled(state);
    if (state.status === "error") {
      setErrors(state.errors);
      const first = steps.findIndex((s) => s.fields.some((f) => state.errors[f]));
      if (first >= 0) setStep(first);
    }
  }

  const focusFirstError = (errs: FieldErrors) => {
    const first = Object.keys(errs)[0];
    if (!first) return;
    requestAnimationFrame(() => {
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
      el?.focus();
    });
  };

  const goTo = (i: number) => {
    setStep(i);
    requestAnimationFrame(() => {
      headingRef.current?.focus();
      headingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const buildReview = (fd: FormData) => {
    const callSlug = String(fd.get("call") ?? "");
    setReview([
      { label: "Porteur", value: String(fd.get("fullName")) },
      { label: "Structure", value: String(fd.get("organization") || "—") },
      { label: "Statut juridique", value: String(fd.get("legalStatus")) },
      { label: "Localisation", value: `${fd.get("locality")}, ${fd.get("province")}` },
      { label: "Contacts", value: `${fd.get("phone")} · ${fd.get("email")}` },
      { label: "Appel", value: calls.find((c) => c.slug === callSlug)?.title ?? "Candidature spontanée" },
      { label: "Secteurs", value: fd.getAll("sectors").join(", ") },
      { label: "Titre du projet", value: String(fd.get("projectTitle")) },
      { label: "Budget sollicité", value: `${Number(fd.get("budget")).toLocaleString("fr-FR")} USD` },
      {
        label: "Pièces jointes",
        value: fileFields.map((f) => fileNames[f.name]).filter(Boolean).join(", ") || "—",
      },
    ]);
  };

  const next = () => {
    const fd = new FormData(formRef.current!);
    const errs = validateStep(steps[step].id, fd);
    setErrors(errs);
    if (Object.keys(errs).length) return focusFirstError(errs);
    if (steps[step + 1]?.id === "verification") buildReview(fd);
    goTo(step + 1);
  };

  // Soumission manuelle (et non via `action=`) : React réinitialiserait sinon
  // tous les champs après l'action, y compris en cas d'erreur serveur.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const errs = validateStep("verification", fd);
    setErrors(errs);
    if (Object.keys(errs).length) return focusFirstError(errs);
    startTransition(() => formAction(fd));
  };

  if (state.status === "received") {
    return (
      <div className="rounded-card bg-white p-8 text-center shadow-card md:p-12" role="status">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-leaf-100 text-forest-700">
          <Check className="size-8" />
        </span>
        <h2 className="mt-6 text-2xl font-bold text-night-900">Dossier complet et valide</h2>
        <p className="mt-3 text-muted">
          Référence de vérification : <strong className="font-mono text-night-900">{state.reference}</strong>
        </p>
        {!state.persisted && (
          <Alert tone="warning" title="Mode démonstration" className="mx-auto mt-8 max-w-xl text-left">
            Votre dossier a été entièrement vérifié par le serveur, mais <strong>il n&apos;a pas été transmis</strong> :
            l&apos;enregistrement des candidatures n&apos;est pas encore activé sur cette version du site.
          </Alert>
        )}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <LinkButton href="/candidats">Retour à l&apos;espace candidats</LinkButton>
          <LinkButton href="/" variant="ghost">
            Accueil
          </LinkButton>
        </div>
      </div>
    );
  }

  const current = steps[step];

  return (
    <div>
      {/* Indicateur d'étapes */}
      <ol className="mb-8 grid grid-cols-4 gap-2" aria-label="Étapes du formulaire">
        {steps.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <li key={s.id} aria-current={active ? "step" : undefined}>
              <div className={`h-1.5 rounded-full ${done || active ? "bg-forest-700" : "bg-line"}`} />
              <p className={`mt-2 hidden text-xs font-medium sm:block ${active ? "text-forest-900" : "text-muted"}`}>
                {i + 1}. {s.title}
              </p>
            </li>
          );
        })}
      </ol>

      <form
        ref={formRef}
        onSubmit={onSubmit}
        noValidate
        className="rounded-card bg-white p-6 shadow-card md:p-10"
      >
        <p className="text-sm text-muted">
          Étape {step + 1} sur {steps.length}
        </p>
        <h2 ref={headingRef} tabIndex={-1} className="mt-1 scroll-mt-32 text-2xl font-bold text-night-900 focus:outline-none">
          {current.title}
        </h2>

        {state.status === "error" && (
          <Alert tone="error" className="mt-6">
            {state.message}
          </Alert>
        )}

        {/* Champ piège anti-robot (invisible pour les humains) */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Site web
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        {/* Étape 1 */}
        <div hidden={step !== 0} className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <TextField name="fullName" label="Nom complet du porteur de projet / représentant" required autoComplete="name" error={errors.fullName} />
          </div>
          <div className="md:col-span-2">
            <TextField name="organization" label="Nom de l'association, coopérative ou entreprise" autoComplete="organization" hint="Si applicable." error={errors.organization} />
          </div>
          <SelectField
            name="legalStatus"
            label="Statut juridique"
            required
            options={legalStatuses}
            error={errors.legalStatus}
            onChange={(e) => {
              const fd = new FormData();
              fd.set("legalStatus", e.target.value);
              setStatutesRequired(needsStatutes(fd));
            }}
          />
          <SelectField name="province" label="Province" required options={drcProvinces} error={errors.province} />
          <div className="md:col-span-2">
            <TextField name="locality" label="Territoire / Commune" required error={errors.locality} />
          </div>
          <TextField name="phone" type="tel" label="Téléphone (WhatsApp)" required autoComplete="tel" placeholder="+243 81 234 56 78" error={errors.phone} />
          <TextField name="email" type="email" label="Adresse e-mail" required autoComplete="email" error={errors.email} />
        </div>

        {/* Étape 2 */}
        <div hidden={step !== 1} className="mt-8 grid gap-6">
          <SelectField
            name="call"
            label="Appel à projets concerné"
            placeholder="Candidature spontanée"
            options={openCalls.map((c) => ({ value: c.slug, label: c.title }))}
            hint="Laissez « Candidature spontanée » si votre initiative ne répond pas à un appel ouvert."
          />
          <CheckboxGroup name="sectors" legend="Secteur d'activité du projet" options={sectors} required error={errors.sectors} />
          <TextField name="projectTitle" label="Titre du projet" required maxLength={150} error={errors.projectTitle} />
          <TextArea
            name="summary"
            label="Résumé du besoin et de l'impact communautaire attendu"
            required
            error={errors.summary}
            hint={
              <span className={summaryWords > summaryMaxWords ? "text-danger" : ""}>
                {summaryWords} / {summaryMaxWords} mots
              </span>
            }
            onChange={(e) => setSummaryWords(countWords(e.target.value))}
          />
          <div className="max-w-xs">
            <TextField name="budget" type="number" min={1} step="any" inputMode="decimal" label="Budget estimatif sollicité (USD)" required error={errors.budget} />
          </div>
        </div>

        {/* Étape 3 */}
        <div hidden={step !== 2} className="mt-8 grid gap-5">
          <p className="text-sm text-muted">Formats acceptés : PDF, DOCX ou JPG — 5 Mo maximum par fichier.</p>
          {fileFields.map((f) => {
            const required = f.required === true || (f.required === "if-organization" && statutesRequired);
            const err = errors[f.name];
            return (
              <div key={f.name}>
                <label
                  htmlFor={f.name}
                  className={`flex cursor-pointer flex-col gap-3 rounded-xl border-2 border-dashed p-5 transition-colors hover:bg-paper sm:flex-row sm:items-center ${err ? "border-danger" : fileNames[f.name] ? "border-forest-600 bg-leaf-100/40" : "border-line"}`}
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-leaf-100 text-forest-900">
                    {fileNames[f.name] ? <FileIcon className="size-5" /> : <Upload className="size-5" />}
                  </span>
                  <span className="flex-1">
                    <span className="block font-semibold text-night-900">
                      {f.label}
                      {required ? <span className="text-danger"> *</span> : <span className="font-normal text-muted"> (facultatif{f.required === "if-organization" ? " pour un porteur individuel" : ""})</span>}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted">{fileNames[f.name] ?? "Cliquez pour choisir un fichier"}</span>
                  </span>
                  <input
                    id={f.name}
                    name={f.name}
                    type="file"
                    accept={upload.accept}
                    aria-invalid={!!err}
                    aria-describedby={err ? `${f.name}-error` : undefined}
                    className="sr-only"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      setFileNames((prev) => {
                        const nextNames = { ...prev };
                        if (file) nextNames[f.name] = `${file.name} (${(file.size / 1024 / 1024).toFixed(1)} Mo)`;
                        else delete nextNames[f.name];
                        return nextNames;
                      });
                    }}
                  />
                </label>
                {err && (
                  <p id={`${f.name}-error`} className="mt-1.5 text-sm text-danger">
                    {err}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Étape 4 */}
        <div hidden={step !== 3} className="mt-8">
          <dl className="divide-y divide-line rounded-xl border border-line">
            {review.map((r) => (
              <div key={r.label} className="grid gap-1 p-4 sm:grid-cols-3">
                <dt className="text-sm text-muted">{r.label}</dt>
                <dd className="text-sm font-medium break-words text-night-900 sm:col-span-2">{r.value}</dd>
              </div>
            ))}
          </dl>
          <label className="mt-6 flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              name="consent"
              className="mt-0.5 size-4 accent-forest-700"
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
            />
            <span>
              Je certifie l&apos;exactitude des informations fournies et j&apos;accepte qu&apos;elles soient utilisées par PIDECO pour
              l&apos;instruction de mon dossier. <span className="text-danger">*</span>
            </span>
          </label>
          {errors.consent && (
            <p id="consent-error" className="mt-1.5 text-sm text-danger">
              {errors.consent}
            </p>
          )}
        </div>

        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-between">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={() => goTo(step - 1)} className="sm:px-0">
              ← Étape précédente
            </Button>
          ) : (
            <span />
          )}
          {step < steps.length - 1 ? (
            // Clés distinctes : sinon React réutilise le même <button> et bascule son type
            // en « submit » pendant le clic, ce qui soumettrait le formulaire prématurément.
            <Button key="next" type="button" onClick={next}>
              Continuer
            </Button>
          ) : (
            <Button key="submit" type="submit" variant="secondary" disabled={pending} aria-busy={pending}>
              {pending ? "Vérification en cours…" : "Soumettre mon dossier"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
