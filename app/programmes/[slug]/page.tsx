import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProgram, programs } from "@/content/programs";
import { projects } from "@/content/projects";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectCard } from "@/components/ui/Cards";
import { Pending } from "@/components/ui/Status";
import { LinkButton } from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/icons";

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/programmes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProgram(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/programmes/${p.slug}` },
    openGraph: { title: p.title, description: p.description },
  };
}

export default async function ProgramPage({ params }: PageProps<"/programmes/[slug]">) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const related = projects.filter((p) => p.programSlug === program.slug);
  const idx = programs.indexOf(program);
  const next = programs[(idx + 1) % programs.length];

  const blocks: { title: string; items: string[] | null; pending?: string }[] = [
    { title: "Objectifs", items: program.objectives },
    { title: "Activités", items: program.activities },
    { title: "Bénéficiaires", items: program.beneficiaries },
    { title: "Résultats attendus", items: program.expectedResults, pending: "Cadre de résultats et indicateurs à fournir par PIDECO" },
  ];

  return (
    <>
      <PageHero
        eyebrow={`Axe ${program.number}`}
        title={program.title}
        intro={program.description}
        crumbs={[{ label: "Nos programmes", href: "/programmes" }, { label: program.shortTitle }]}
        photoLabel={program.shortTitle}
      />

      <section className="container-site py-20 md:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {blocks.map((b) => (
            <article key={b.title} className="rounded-card bg-white p-7 shadow-card md:p-9">
              <h2 className="text-xl font-bold text-night-900">{b.title}</h2>
              {b.items ? (
                <ul className="mt-5 space-y-3">
                  {b.items.map((it) => (
                    <li key={it} className="flex gap-3 leading-relaxed">
                      <Check className="mt-1 size-4 shrink-0 text-forest-600" />
                      {it}
                    </li>
                  ))}
                </ul>
              ) : (
                <Pending className="mt-5">{b.pending}</Pending>
              )}
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          Objectifs, activités et bénéficiaires reformulés à partir du document de cadrage — à valider par la coordination.
        </p>
      </section>

      {related.length > 0 && (
        <section className="bg-sand/60 py-20 md:py-24" aria-labelledby="projets-axe">
          <div className="container-site">
            <h2 id="projets-axe" className="mb-10 text-3xl font-bold text-night-900">
              Projets de cet axe
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-site flex flex-col gap-6 py-16 sm:flex-row sm:items-center sm:justify-between">
        <LinkButton href="/candidats" variant="primary" arrow>
          Soumettre une initiative
        </LinkButton>
        <Link href={`/programmes/${next.slug}`} className="group text-right">
          <span className="block text-xs uppercase tracking-wider text-muted">Axe suivant</span>
          <span className="inline-flex items-center gap-2 font-display font-semibold text-night-900 group-hover:text-forest-700">
            {next.shortTitle} <ArrowRight className="size-4" />
          </span>
        </Link>
      </section>
    </>
  );
}
