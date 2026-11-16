import type { Metadata } from "next";
import Link from "next/link";
import { programs } from "@/content/programs";
import { projects } from "@/content/projects";
import { PageHero } from "@/components/ui/PageHero";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { ArrowRight, Check } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Nos programmes",
  description:
    "Les quatre axes d'intervention du PIDECO : emploi des jeunes, agriculture et sécurité alimentaire, infrastructures communautaires, gouvernance locale.",
  alternates: { canonical: "/programmes" },
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos programmes"
        title="Quatre axes d'intervention complémentaires"
        intro="Une approche intégrée : former et insérer les jeunes, renforcer l'agriculture, équiper les territoires et outiller la gouvernance locale."
        crumbs={[{ label: "Nos programmes" }]}
      >
        <ul className="flex flex-wrap gap-2">
          {programs.map((p) => (
            <li key={p.slug}>
              <a href={`#${p.slug}`} className="inline-block rounded-full border border-white/30 px-4 py-2 text-sm text-white hover:bg-white/10">
                {p.number}. {p.shortTitle}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <div className="container-site space-y-20 py-20 md:space-y-28 md:py-28">
        {programs.map((p, i) => {
          const count = projects.filter((pr) => pr.programSlug === p.slug).length;
          const reverse = i % 2 === 1;
          return (
            <section key={p.slug} id={p.slug} className="scroll-mt-28" aria-labelledby={`t-${p.slug}`}>
              <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16`}>
                <MediaPlaceholder
                  label={p.shortTitle}
                  tone={p.tone}
                  className={`aspect-[4/3] ${reverse ? "lg:order-2 rounded-tr-feature" : "rounded-tl-feature"} rounded-card`}
                />
                <div>
                  <p className="eyebrow text-forest-700">Axe {p.number}</p>
                  <h2 id={`t-${p.slug}`} className="mt-3 text-3xl font-bold leading-tight text-night-900">
                    {p.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted">{p.description}</p>
                  <ul className="mt-6 space-y-2">
                    {p.activities.map((a) => (
                      <li key={a} className="flex gap-3 text-sm text-ink">
                        <Check className="mt-0.5 size-4 shrink-0 text-forest-600" />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap items-center gap-6">
                    <Link
                      href={`/programmes/${p.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-forest-900 px-6 py-3 font-display text-sm font-semibold text-white hover:bg-forest-800"
                    >
                      Fiche détaillée <ArrowRight className="size-4" />
                    </Link>
                    {count > 0 && (
                      <Link href={`/projets?axe=${p.slug}`} className="text-sm font-semibold text-forest-700 hover:underline">
                        {count} projet{count > 1 ? "s" : ""} associé{count > 1 ? "s" : ""}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
