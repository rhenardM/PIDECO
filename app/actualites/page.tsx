import type { Metadata } from "next";
import Link from "next/link";
import { illustrations, type IllustrationKey } from "@/content/images";
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

const gallery: IllustrationKey[] = [
  "ecole-paysanne-kasheke",
  "installation-panneaux-solaires",
  "champ-de-manioc",
  "marche-legumes",
  "eleves-en-classe",
  "rassemblement-ecole",
  "riziculture-ruzizi",
  "marche-kinshasa",
  "commerce-bananes",
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
            intro="Photos d'illustration en attendant les photographies officielles des activités."
          />
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {gallery.map((key, i) => (
              <li key={key} className={i === 0 ? "col-span-2 row-span-2" : ""}>
                <MediaPlaceholder
                  label={illustrations[key].alt}
                  image={key}
                  className="h-full min-h-36 rounded-xl"
                  showLabel={false}
                  sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                />
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-white/60">
            Images d&apos;exemple (Wikimedia Commons) sans lien avec PIDECO —{" "}
            <Link href="/credits" className="underline hover:text-white">
              voir les crédits
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
