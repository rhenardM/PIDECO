import type { Metadata } from "next";
import { calls, faq, legalStatuses, sectors } from "@/content/calls";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CallCard } from "@/components/ui/Cards";
import { LinkButton } from "@/components/ui/Button";
import { Check, ChevronDown } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Espace candidats",
  description:
    "Appels à projets du PIDECO, conditions d'éligibilité, FAQ et formulaire de soumission en ligne pour jeunes, associations, coopératives et micro-entreprises.",
  alternates: { canonical: "/candidats" },
};

const processSteps = [
  { title: "Consultez les appels", text: "Vérifiez les appels ouverts et leurs conditions d'éligibilité." },
  { title: "Préparez votre dossier", text: "Note conceptuelle, pièce d'identité et statuts (pour les structures)." },
  { title: "Déposez en ligne", text: "Remplissez le formulaire en 4 étapes et joignez vos documents." },
  { title: "Suivi de l'instruction", text: "Vous êtes contacté(e) par téléphone ou e-mail (délais à confirmer)." },
];

export default function CandidatesPage() {
  const open = calls.filter((c) => c.status === "Ouvert");
  const closed = calls.filter((c) => c.status === "Clôturé");

  return (
    <>
      <PageHero
        eyebrow="Espace candidats"
        title="Soumettez votre initiative communautaire"
        intro="Jeunes entrepreneurs, associations, coopératives et micro-entreprises : le PIDECO accompagne les projets qui créent de l'emploi et répondent aux besoins des communautés."
        crumbs={[{ label: "Espace candidats" }]}
        photoLabel="jeune entrepreneure dans son atelier"
        image="commerce-bananes"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <LinkButton href="/candidats/soumettre" variant="secondary" arrow>
            Soumettre une initiative
          </LinkButton>
          <LinkButton href="#appels" variant="outline-light">
            Voir les appels
          </LinkButton>
        </div>
      </PageHero>

      <section className="container-site py-16 md:py-20" aria-labelledby="etapes">
        <SectionHeading eyebrow="Comment ça marche" title="Quatre étapes pour candidater" id="etapes" />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((p, i) => (
            <li key={p.title} className="relative rounded-card bg-white p-7 shadow-card">
              <span className="font-display text-4xl font-bold text-sun-400">{i + 1}</span>
              <h3 className="mt-3 font-semibold text-night-900">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="eligibilite" className="scroll-mt-28 bg-forest-900 py-16 md:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Conditions d'éligibilité" title="Qui peut candidater ?" tone="light" />
            <ul className="space-y-3">
              {legalStatuses.map((s) => (
                <li key={s} className="flex gap-3 text-white/85">
                  <Check className="mt-0.5 size-5 shrink-0 text-leaf-400" />
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-white/60">Des critères spécifiques s&apos;appliquent à chaque appel.</p>
          </div>
          <div className="rounded-card bg-white/5 p-7 ring-1 ring-white/10">
            <h3 className="font-display text-lg font-semibold text-white">Secteurs éligibles</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {sectors.map((s) => (
                <li key={s} className="rounded-full bg-white/10 px-3 py-1.5 text-sm text-white">
                  {s}
                </li>
              ))}
            </ul>
            <h3 className="mt-8 font-display text-lg font-semibold text-white">Pièces à fournir</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>• Note conceptuelle du projet</li>
              <li>• Carte d&apos;identité du porteur ou du représentant</li>
              <li>• Statuts (associations, coopératives, micro-entreprises)</li>
              <li className="pt-2 text-white/60">Formats PDF, DOCX ou JPG — 5 Mo maximum par fichier.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="appels" className="container-site scroll-mt-28 py-16 md:py-20">
        <SectionHeading eyebrow="Appels à projets" title="Appels ouverts" />
        {open.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {open.map((c) => (
              <CallCard key={c.slug} call={c} />
            ))}
          </div>
        ) : (
          <p className="rounded-card border border-dashed border-line p-10 text-center text-muted">
            Aucun appel ouvert actuellement. Vous pouvez soumettre une candidature spontanée.
          </p>
        )}
        <h2 className="mt-16 mb-8 text-2xl font-bold text-night-900">Appels clôturés</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {closed.map((c) => (
            <CallCard key={c.slug} call={c} />
          ))}
        </div>
      </section>

      <section id="faq" className="scroll-mt-28 bg-sand/60 py-16 md:py-20">
        <div className="container-site max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Questions fréquentes" />
          <div className="divide-y divide-line overflow-hidden rounded-card bg-white shadow-card">
            {faq.map((f) => (
              <details key={f.q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-night-900 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted">Réponses à valider par PIDECO.</p>
        </div>
      </section>
    </>
  );
}
