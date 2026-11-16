import type { Metadata } from "next";
import { about, governanceBodies, keyFigures, pendingInstitutionalInfo, strategicObjectives, team, values } from "@/content/institution";
import { projects } from "@/content/projects";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { DemoBadge, Pending } from "@/components/ui/Status";
import { User, MapPin } from "@/components/ui/icons";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Qui sommes-nous, mission, vision, valeurs, gouvernance et zones d'intervention du Programme Intégré de Développement Communautaire (PIDECO) en RDC.",
  alternates: { canonical: "/a-propos" },
};

const sections = [
  { id: "qui-sommes-nous", label: "Qui sommes-nous" },
  { id: "historique", label: "Historique" },
  { id: "mission", label: "Mission & Vision" },
  { id: "valeurs", label: "Valeurs" },
  { id: "objectifs", label: "Objectifs stratégiques" },
  { id: "gouvernance", label: "Gouvernance & Équipe" },
  { id: "zones", label: "Zones d'intervention" },
];

export default function AboutPage() {
  const provinces = Array.from(new Set(projects.flatMap((p) => p.provinces)));
  const provinceCount = keyFigures.items.find((i) => i.label.startsWith("Provinces"))?.value;

  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="Un programme au service des communautés congolaises"
        intro="Revitaliser durablement les territoires urbains et ruraux de la RDC par l'emploi, l'investissement communautaire et la gouvernance participative."
        crumbs={[{ label: "À propos" }]}
        photoLabel="portrait d'équipe sur le terrain"
        image="riziculture-ruzizi"
      />

      {/* Sommaire de page */}
      <nav aria-label="Sommaire de la page" className="sticky top-18 z-30 border-b border-line bg-paper/95 backdrop-blur lg:top-20">
        <ul className="container-site flex gap-1 overflow-x-auto py-2 text-sm whitespace-nowrap">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="inline-block rounded-full px-3 py-1.5 text-night-900 hover:bg-sand">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="qui-sommes-nous" className="container-site scroll-mt-36 py-20 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-forest-700">Présentation institutionnelle</p>
            <h2 className="mt-3 text-3xl font-bold text-night-900 md:text-4xl">Qui sommes-nous ?</h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-lg leading-relaxed">{about.whoWeAre}</p>
            <dl className="mt-8 grid gap-4 rounded-card bg-white p-6 shadow-card sm:grid-cols-2">
              <div>
                <dt className="text-sm font-semibold text-night-900">Ministère de tutelle / organisme porteur</dt>
                <dd className="mt-1">
                  {pendingInstitutionalInfo.supervisingMinistry ?? <Pending>Information à fournir par PIDECO</Pending>}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-night-900">Pays d&apos;intervention</dt>
                <dd className="mt-1 text-muted">République Démocratique du Congo</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id="historique" className="scroll-mt-36 bg-sand/60 py-20 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-forest-700">Historique</p>
            <h2 className="mt-3 text-3xl font-bold text-night-900 md:text-4xl">Notre parcours</h2>
          </div>
          <div className="lg:col-span-7">
            {pendingInstitutionalInfo.history ? (
              <p className="text-lg leading-relaxed">{pendingInstitutionalInfo.history}</p>
            ) : (
              <ol className="relative space-y-6 border-l-2 border-dashed border-forest-600/40 pl-6">
                {["Création du programme", "Lancement des premières interventions", "Extension provinciale"].map((step) => (
                  <li key={step} className="relative">
                    <span aria-hidden className="absolute top-1.5 -left-[31px] size-3 rounded-full bg-forest-600 ring-4 ring-sand" />
                    <p className="font-semibold text-night-900">{step}</p>
                    <Pending className="mt-1">Date et description à fournir</Pending>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </section>

      <section id="mission" className="container-site scroll-mt-36 py-20 md:py-24">
        <div className="grid overflow-hidden rounded-feature md:grid-cols-2">
          <div className="bg-forest-900 p-8 sm:p-12">
            <p className="eyebrow text-leaf-300">Notre mission</p>
            <p className="mt-4 font-display text-xl leading-relaxed font-medium text-white md:text-2xl">{about.mission}</p>
          </div>
          <div className="bg-night-900 p-8 sm:p-12">
            <p className="eyebrow text-sun-400">Notre vision</p>
            <p className="mt-4 font-display text-xl leading-relaxed font-medium text-white md:text-2xl">{about.vision}</p>
          </div>
        </div>
      </section>

      <section id="valeurs" className="container-site scroll-mt-36 pb-20 md:pb-24">
        <SectionHeading eyebrow="Nos valeurs fondamentales" title="Ce qui guide notre action" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <article key={v.title} className="rounded-card bg-white p-7 shadow-card">
              <span className="grid size-11 place-items-center rounded-full bg-leaf-100 font-display font-bold text-forest-900">
                {i + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-night-900">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="objectifs" className="scroll-mt-36 bg-night-900 py-20 md:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Objectifs stratégiques"
            title="Quatre objectifs, alignés sur nos axes d'intervention"
            tone="light"
            intro={<span className="text-sm">Formulation dérivée des axes d&apos;intervention — à valider par la coordination.</span>}
          />
          <ol className="grid gap-px overflow-hidden rounded-card bg-white/10 md:grid-cols-2">
            {strategicObjectives.map((o, i) => (
              <li key={o} className="flex gap-5 bg-night-900 p-7">
                <span className="font-display text-3xl font-bold text-leaf-400">0{i + 1}</span>
                <p className="text-lg leading-relaxed text-white/85">{o}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="gouvernance" className="container-site scroll-mt-36 py-20 md:py-24">
        <SectionHeading
          eyebrow="Gouvernance & équipe"
          title="Une organisation au service de la redevabilité"
          intro="L'organigramme officiel et la composition des instances seront publiés après validation."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {governanceBodies.map((g) => (
            <article key={g.title} className="rounded-card border border-line bg-white/70 p-7">
              <h3 className="text-lg font-semibold text-night-900">{g.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{g.text}</p>
            </article>
          ))}
        </div>

        <h3 className="mt-16 text-2xl font-bold text-night-900">Équipe dirigeante</h3>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <li key={m.role} className="overflow-hidden rounded-card bg-white shadow-card">
              <div className="grid aspect-[4/3] place-items-center bg-sand text-muted">
                <User className="size-14 opacity-50" />
              </div>
              <div className="p-5">
                <p className="font-semibold text-night-900">{m.name ?? <Pending>Nom à compléter</Pending>}</p>
                <p className="mt-2 text-sm text-muted">{m.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="zones" className="scroll-mt-36 bg-sand/60 py-20 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Zones d'intervention"
              title={`${provinceCount ?? "Plusieurs"} provinces d'intervention en RDC`}
              intro={
                <span className="flex flex-wrap items-center gap-2">
                  Provinces citées dans les projets de démonstration <DemoBadge />
                </span>
              }
            />
            <ul className="flex flex-wrap gap-2">
              {provinces.map((p) => (
                <li key={p} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm text-night-900 shadow-card">
                  <MapPin className="size-4 text-forest-600" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              La liste officielle des provinces et bureaux de représentation est à fournir par PIDECO.
            </p>
            <LinkButton href="/projets" variant="ghost" arrow className="mt-4">
              Voir les projets par province
            </LinkButton>
          </div>
          <MediaPlaceholder label="carte des zones d'intervention (à produire)" tone="forest" className="aspect-[4/3] rounded-feature" />
        </div>
      </section>
    </>
  );
}
