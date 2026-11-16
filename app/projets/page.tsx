import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { projects } from "@/content/projects";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectCard } from "@/components/ui/Cards";
import { ProjectExplorer } from "@/components/projects/ProjectExplorer";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Alert, DemoBadge } from "@/components/ui/Status";
import { MapPin } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Nos projets",
  description:
    "Catalogue des projets du PIDECO en RDC : projets en cours, achevés et planifiés, filtrables par secteur, province et statut.",
  alternates: { canonical: "/projets" },
};

export default function ProjectsPage() {
  const byProvince = projects
    .flatMap((p) => p.provinces.map((prov) => ({ prov, p })))
    .reduce<Record<string, typeof projects>>((acc, { prov, p }) => {
      (acc[prov] ??= []).push(p);
      return acc;
    }, {});

  return (
    <>
      <PageHero
        eyebrow="Nos projets"
        title="L'action du programme sur le terrain"
        intro="Projets en cours, achevés et planifiés dans les provinces d'intervention."
        crumbs={[{ label: "Nos projets" }]}
        photoLabel="chantier HIMO de réhabilitation de piste rurale"
        tone="night"
      />

      <section className="container-site py-16 md:py-20">
        <Alert tone="warning" className="mb-8">
          Les {projects.length} projets présentés sont des <strong>fiches de démonstration</strong> issues du document de
          cadrage. Ils seront remplacés par la liste officielle des projets PIDECO.
        </Alert>
        {/* Le fallback affiche la liste complète (rendu statique) avant lecture des filtres d'URL */}
        <Suspense
          fallback={
            <ProjectGrid>
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} headingLevel={2} />
              ))}
            </ProjectGrid>
          }
        >
          <ProjectExplorer />
        </Suspense>
      </section>

      <section className="bg-night-900 py-20 md:py-24" aria-labelledby="carte">
        <div className="container-site">
          <SectionHeading
            eyebrow="Carte des réalisations"
            title="Les réalisations par province"
            tone="light"
            id="carte"
            intro="Une carte interactive pourra être intégrée dès que les coordonnées géographiques des sites seront disponibles."
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(byProvince)
              .sort(([a], [b]) => a.localeCompare(b, "fr"))
              .map(([prov, list]) => (
                <li key={prov} className="rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
                  <p className="flex items-center gap-2 font-display font-semibold text-white">
                    <MapPin className="size-4 text-leaf-400" />
                    {prov}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {list.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/projets/${p.slug}`} className="text-white/70 hover:text-white hover:underline">
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
          </ul>
          <p className="mt-6 flex items-center gap-2 text-xs text-white/60">
            <DemoBadge tone="dark" /> Répartition basée sur les projets de démonstration.
          </p>
        </div>
      </section>

      <section className="container-site py-20 md:py-24" aria-labelledby="temoignages">
        <SectionHeading eyebrow="Témoignages" title="La parole aux bénéficiaires" id="temoignages" />
        <div className="rounded-card border border-dashed border-line bg-white/60 p-10 text-center text-muted">
          Les témoignages de bénéficiaires seront publiés après recueil et consentement des personnes concernées.
        </div>
      </section>
    </>
  );
}
