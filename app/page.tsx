import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { about, keyFigures, values } from "@/content/institution";
import { programs } from "@/content/programs";
import { projects } from "@/content/projects";
import { news } from "@/content/news";
import { LinkButton } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { StatGrid } from "@/components/ui/StatGrid";
import { NewsCard, ProgramCard, ProjectCard } from "@/components/ui/Cards";
import { Partners } from "@/components/ui/Partners";
import { ArrowRight, Check } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: { absolute: `${site.acronym} — ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featured = projects.slice(0, 3);
  const [leadNews, ...otherNews] = news;

  return (
    <>
      {/* HERO */}
      <section className="relative bg-paper">
        <div className="relative lg:pt-16">
          <MediaPlaceholder
            label="jeunes en formation sur un chantier communautaire (RDC)"
            tone="night"
            className="h-72 sm:h-96 lg:absolute lg:inset-x-0 lg:top-36 lg:bottom-0 lg:h-auto"
          />
          <div className="container-site relative pb-0 lg:pb-28">
            <div className="animate-rise relative -mt-24 max-w-3xl overflow-hidden rounded-card shadow-lift sm:-mt-32 lg:mt-0">
              <div className="bg-forest-700 px-6 pt-8 pb-4 sm:px-10 sm:pt-10">
                <p className="eyebrow text-leaf-300">Programme Intégré de Développement Communautaire</p>
                <h1 className="mt-3 text-3xl font-bold leading-[1.12] text-white sm:text-4xl lg:text-[3.25rem]">
                  {site.tagline}
                </h1>
              </div>
              <div className="bg-forest-900 px-6 pt-5 pb-8 sm:px-10 sm:pb-10">
                <p className="max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">{site.description}</p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <LinkButton href="/projets" variant="secondary" arrow>
                    Découvrir nos projets
                  </LinkButton>
                  <LinkButton href="/candidats/soumettre" variant="outline-light">
                    Soumettre une initiative
                  </LinkButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRÉSENTATION */}
      <section className="container-site py-20 md:py-28" aria-labelledby="presentation">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow text-forest-700">Qui sommes-nous</p>
            <h2 id="presentation" className="mt-3 text-3xl font-bold leading-tight text-night-900 md:text-4xl">
              Un catalyseur entre communautés, institutions et partenaires.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-ink">{about.whoWeAre}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {values.map((v) => (
                <li key={v.title} className="flex gap-3 text-sm font-medium text-night-900">
                  <Check className="mt-0.5 size-5 shrink-0 text-forest-600" />
                  {v.title}
                </li>
              ))}
            </ul>
            <LinkButton href="/a-propos" variant="ghost" arrow className="mt-8">
              En savoir plus sur le programme
            </LinkButton>
          </div>
        </div>
      </section>

      {/* CHIFFRES CLÉS */}
      <section className="bg-night-900 py-20 md:py-24" aria-labelledby="impact">
        <div className="container-site">
          <SectionHeading eyebrow="L'impact en chiffres" title="Des résultats mesurables sur le terrain" tone="light" id="impact" />
          <StatGrid items={keyFigures.items} demo={keyFigures.demo} tone="light" />
        </div>
      </section>

      {/* AXES */}
      <section className="container-site py-20 md:py-28" aria-labelledby="axes">
        <SectionHeading
          eyebrow="Nos axes d'intervention"
          title="Quatre leviers pour un développement durable"
          intro="Une approche intégrée qui combine emploi, agriculture, infrastructures et gouvernance locale."
          id="axes"
          action={
            <LinkButton href="/programmes" variant="ghost" arrow>
              Tous les programmes
            </LinkButton>
          }
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((p) => (
            <ProgramCard key={p.slug} program={p} />
          ))}
        </div>
      </section>

      {/* PROJETS PHARES */}
      <section className="bg-sand/60 py-20 md:py-28" aria-labelledby="projets">
        <div className="container-site">
          <SectionHeading
            eyebrow="Projets phares"
            title="L'action sur le terrain"
            id="projets"
            action={
              <LinkButton href="/projets" variant="ghost" arrow>
                Tous les projets
              </LinkButton>
            }
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* APPROCHE / MISSION — composition « bloc arrondi » */}
      <section className="py-20 md:py-28" aria-labelledby="mission">
        <div className="container-site">
        <div className="grid items-stretch overflow-hidden rounded-feature lg:grid-cols-2">
          <div className="bg-forest-900 p-8 sm:p-12 lg:p-16">
            <p className="eyebrow text-leaf-300">Notre approche</p>
            <h2 id="mission" className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl">
              Des projets qui naissent des besoins des communautés
            </h2>
            <dl className="mt-8 space-y-6">
              <div>
                <dt className="font-display font-semibold text-leaf-300">Notre mission</dt>
                <dd className="mt-1 leading-relaxed text-white/80">{about.mission}</dd>
              </div>
              <div>
                <dt className="font-display font-semibold text-leaf-300">Notre vision</dt>
                <dd className="mt-1 leading-relaxed text-white/80">{about.vision}</dd>
              </div>
            </dl>
            <LinkButton href="/a-propos#mission" variant="light" arrow className="mt-10">
              Mission, vision & valeurs
            </LinkButton>
          </div>
          <MediaPlaceholder label="réunion d'un Comité Local de Développement" tone="leaf" className="min-h-72" />
        </div>
        </div>
      </section>

      {/* ACTUALITÉS */}
      <section className="container-site pb-20 md:pb-28" aria-labelledby="actualites">
        <SectionHeading
          eyebrow="Actualités"
          title="Les dernières nouvelles du programme"
          id="actualites"
          action={
            <LinkButton href="/actualites" variant="ghost" arrow>
              Toutes les actualités
            </LinkButton>
          }
        />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-3">
            <NewsCard article={leadNews} featured />
          </div>
          {otherNews.map((a) => (
            <div key={a.slug} className="lg:col-span-1">
              <NewsCard article={a} />
            </div>
          ))}
          <Link
            href="/actualites#publications"
            className="flex flex-col justify-between rounded-card border border-line bg-white/50 p-7 transition-colors hover:bg-white"
          >
            <span className="eyebrow text-forest-700">Médias</span>
            <span className="mt-4 font-display text-xl font-semibold text-night-900">
              Rapports, communiqués et galerie photo
            </span>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest-700">
              Accéder aux médias <ArrowRight className="size-4" />
            </span>
          </Link>
        </div>
      </section>

      {/* PARTENAIRES */}
      <section className="border-y border-line bg-white/40 py-16" aria-labelledby="partenaires">
        <div className="container-site">
          <SectionHeading eyebrow="Ils nous accompagnent" title="Partenaires techniques et financiers" id="partenaires" />
          <Partners />
        </div>
      </section>

      {/* CTA CANDIDATURE */}
      <section className="container-site py-20 md:py-28">
        <div className="relative overflow-hidden rounded-feature bg-night-900 px-6 py-14 text-center sm:px-12 md:py-20">
          <div aria-hidden className="absolute -top-24 -right-24 size-72 rounded-full bg-forest-700/40" />
          <div aria-hidden className="absolute -bottom-32 -left-16 size-72 rounded-full bg-sun-400/15" />
          <div className="relative mx-auto max-w-2xl">
            <p className="eyebrow text-leaf-300">Espace candidats</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl">
              Vous portez une initiative pour votre communauté ?
            </h2>
            <p className="mt-4 text-lg text-white/75">
              Jeunes entrepreneurs, associations, coopératives et micro-entreprises : consultez les appels ouverts et
              déposez votre dossier en ligne.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <LinkButton href="/candidats/soumettre" variant="secondary" arrow>
                Soumettre une initiative
              </LinkButton>
              <LinkButton href="/candidats" variant="outline-light">
                Voir les appels à projets
              </LinkButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
