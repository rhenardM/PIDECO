import type { Metadata } from "next";
import { documents } from "@/content/documents";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NewsExplorer } from "@/components/news/NewsExplorer";
import { DocumentList } from "@/components/ui/DocumentList";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

export const metadata: Metadata = {
  title: "Actualités & médias",
  description:
    "Actualités, communiqués de presse, publications, rapports téléchargeables et galerie photo du PIDECO.",
  alternates: { canonical: "/actualites" },
};

const sections = [
  { id: "articles", label: "Articles" },
  { id: "communiques", label: "Communiqués" },
  { id: "publications", label: "Publications & rapports" },
  { id: "galerie", label: "Galerie photo" },
];

export default function NewsPage() {
  const pressReleases = documents.filter((d) => d.category === "Communiqué de presse");
  const publications = documents.filter((d) => d.category === "Rapport annuel" || d.category === "Rapport d'activités");

  return (
    <>
      <PageHero
        eyebrow="Actualités & médias"
        title="Suivre l'avancement du programme"
        intro="Articles, communiqués, rapports et images des activités menées sur le terrain."
        crumbs={[{ label: "Actualités & médias" }]}
      >
        <ul className="flex flex-wrap gap-2">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="inline-block rounded-full border border-white/30 px-4 py-2 text-sm text-white hover:bg-white/10">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <section id="articles" className="container-site scroll-mt-28 py-16 md:py-20">
        <SectionHeading eyebrow="Articles" title="Dernières actualités" />
        <NewsExplorer />
      </section>

      <section id="communiques" className="scroll-mt-28 bg-sand/60 py-16 md:py-20">
        <div className="container-site">
          <SectionHeading eyebrow="Presse" title="Communiqués de presse" />
          <DocumentList items={pressReleases} />
        </div>
      </section>

      <section id="publications" className="container-site scroll-mt-28 py-16 md:py-20">
        <SectionHeading eyebrow="Publications" title="Rapports téléchargeables" />
        <DocumentList items={publications} />
      </section>

      <section id="galerie" className="scroll-mt-28 bg-night-900 py-16 md:py-20">
        <div className="container-site">
          <SectionHeading
            eyebrow="Galerie photo"
            title="Le programme en images"
            tone="light"
            intro="Les photographies officielles des activités seront intégrées ici (avec crédits et légendes)."
          />
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              "formation aux métiers verts",
              "coopérative agricole",
              "forage communautaire",
              "atelier CLD",
              "chantier HIMO",
              "remise de kits",
              "centre de santé",
              "lancement de cohorte",
            ].map((l, i) => (
              <li key={l} className={i === 0 ? "col-span-2 row-span-2" : ""}>
                <MediaPlaceholder label={l} tone={i % 3 === 0 ? "forest" : i % 3 === 1 ? "night" : "leaf"} className="h-full min-h-36 rounded-xl" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
