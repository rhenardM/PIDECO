import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { getProgram } from "@/content/programs";
import { illustrations, type IllustrationKey } from "@/content/images";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { ProjectCard } from "@/components/ui/Cards";
import { Alert, DemoBadge, Pending, StatusPill } from "@/components/ui/Status";
import { MapPin } from "@/components/ui/icons";

/** Galerie d'illustration : 6 photos de la banque d'images, en commençant par celle du projet. */
const galleryPool: IllustrationKey[] = [
  "ecole-paysanne-kasheke",
  "champ-de-manioc",
  "marche-kinshasa",
  "agriculteur-ananas",
  "rentree-scolaire",
  "paysage-collines",
  "habitants-village",
];
const galleryKeys = (first: IllustrationKey) => [first, ...galleryPool.filter((k) => k !== first)].slice(0, 6);

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projets/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/projets/${p.slug}` },
    openGraph: { title: p.title, description: p.summary, type: "article" },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projets/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const program = getProgram(project.programSlug);
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  const facts = [
    { label: "Statut", value: <StatusPill status={project.status} /> },
    { label: "Axe", value: program ? <Link className="text-forest-700 hover:underline" href={`/programmes/${program.slug}`}>{program.shortTitle}</Link> : null },
    { label: "Zones", value: project.provinces.join(", ") },
    { label: "Période", value: <Pending>à préciser</Pending> },
    { label: "Budget", value: <Pending>à préciser</Pending> },
    { label: "Partenaires", value: <Pending>à préciser</Pending> },
  ];

  return (
    <article>
      <header className="bg-paper">
        <div className="container-site pt-10 pb-8">
          <Breadcrumbs tone="dark" items={[{ label: "Nos projets", href: "/projets" }, { label: project.title }]} />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <StatusPill status={project.status} />
            <DemoBadge />
            <span className="flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="size-4" /> {project.provinces.join(" · ")}
            </span>
          </div>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-night-900 md:text-5xl">{project.title}</h1>
        </div>
        <MediaPlaceholder label={project.title} image={project.image} className="h-64 md:h-96" priority />
      </header>

      <div className="container-site grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Alert tone="warning" className="mb-8">
            Fiche de démonstration : description et indicateurs à confirmer par PIDECO.
          </Alert>
          <h2 className="text-2xl font-bold text-night-900">Description & impact attendu</h2>
          <p className="mt-4 text-lg leading-relaxed">{project.summary}</p>
          <p className="mt-4">
            <Pending>Contexte, objectifs spécifiques et activités détaillées à rédiger</Pending>
          </p>

          <h2 className="mt-14 text-2xl font-bold text-night-900">Indicateurs & résultats</h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            {project.indicators.map((i) => (
              <div key={i.label} className="rounded-card bg-forest-900 p-6 text-white">
                <dt className="sr-only">{i.label}</dt>
                <dd>
                  <span className="block font-display text-4xl font-bold">{i.value}</span>
                  <span className="mt-1 block text-white/75">{i.label}</span>
                </dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-14 text-2xl font-bold text-night-900">Galerie photo</h2>
          <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
            {galleryKeys(project.image).map((key) => (
              <li key={key}>
                <MediaPlaceholder
                  label={illustrations[key].alt}
                  image={key}
                  className="aspect-square rounded-xl"
                  showLabel={false}
                  sizes="(min-width: 768px) 22vw, 50vw"
                />
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted">
            Photos d&apos;illustration sans lien avec ce projet —{" "}
            <Link href="/credits" className="underline">
              crédits
            </Link>
            . Les photos réelles du projet sont à fournir.
          </p>
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-28 rounded-card bg-white p-7 shadow-card">
            <h2 className="font-display text-lg font-semibold text-night-900">Fiche projet</h2>
            <dl className="mt-5 divide-y divide-line text-sm">
              {facts.map((f) => (
                <div key={f.label} className="flex items-start justify-between gap-4 py-3">
                  <dt className="text-muted">{f.label}</dt>
                  <dd className="text-right font-medium text-night-900">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>

      <section className="bg-sand/60 py-16 md:py-20" aria-labelledby="autres">
        <div className="container-site">
          <h2 id="autres" className="mb-8 text-2xl font-bold text-night-900">
            Autres projets
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
