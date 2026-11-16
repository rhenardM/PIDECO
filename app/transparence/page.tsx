import type { Metadata } from "next";
import { documents, type DocCategory } from "@/content/documents";
import { keyFigures } from "@/content/institution";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DocumentList } from "@/components/ui/DocumentList";
import { StatGrid } from "@/components/ui/StatGrid";
import { Partners } from "@/components/ui/Partners";
import { Pending } from "@/components/ui/Status";
import { values } from "@/content/institution";

export const metadata: Metadata = {
  title: "Transparence et redevabilité",
  description:
    "Rapports annuels, rapports d'activités, documents institutionnels, résultats des programmes et informations sur les financements du PIDECO.",
  alternates: { canonical: "/transparence" },
};

const groups: { id: string; title: string; categories: DocCategory[] }[] = [
  { id: "rapports-annuels", title: "Rapports annuels", categories: ["Rapport annuel"] },
  { id: "rapports-activites", title: "Rapports d'activités", categories: ["Rapport d'activités"] },
  { id: "documents-institutionnels", title: "Documents institutionnels", categories: ["Document institutionnel"] },
];

export default function TransparencyPage() {
  const commitment = values.find((v) => v.title.startsWith("Transparence"));
  return (
    <>
      <PageHero
        eyebrow="Transparence et redevabilité"
        title="Rendre compte de notre action"
        intro={commitment?.text}
        crumbs={[{ label: "Transparence" }]}
        tone="night"
      />

      <div className="container-site space-y-16 py-16 md:py-20">
        {groups.map((g) => (
          <section key={g.id} id={g.id} className="scroll-mt-28" aria-labelledby={`h-${g.id}`}>
            <h2 id={`h-${g.id}`} className="mb-6 text-2xl font-bold text-night-900">
              {g.title}
            </h2>
            <DocumentList items={documents.filter((d) => g.categories.includes(d.category))} />
          </section>
        ))}
      </div>

      <section id="resultats" className="scroll-mt-28 bg-forest-900 py-16 md:py-20">
        <div className="container-site">
          <SectionHeading eyebrow="Résultats des programmes" title="Indicateurs clés" tone="light" />
          <StatGrid items={keyFigures.items} demo={keyFigures.demo} tone="light" />
          <div className="mt-10">
            <DocumentList items={documents.filter((d) => d.category === "Résultats des programmes")} />
          </div>
        </div>
      </section>

      <section id="financements" className="container-site scroll-mt-28 py-16 md:py-20">
        <SectionHeading
          eyebrow="Financements & partenariats"
          title="Informations publiques sur les financements"
          intro="Sources de financement, montants engagés et répartition par axe seront publiés après validation par PIDECO."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {["Budget global du programme", "Bailleurs et contributions", "Répartition par axe"].map((t) => (
            <div key={t} className="rounded-card bg-white p-7 shadow-card">
              <h3 className="font-semibold text-night-900">{t}</h3>
              <Pending className="mt-4">Donnée à publier</Pending>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Partners />
        </div>
        <div className="mt-10">
          <DocumentList items={documents.filter((d) => d.category === "Financements & partenariats")} />
        </div>
      </section>
    </>
  );
}
