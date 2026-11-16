import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { calls, getCall } from "@/content/calls";
import { getProgram } from "@/content/programs";
import { formatDate } from "@/content/news";
import { PageHero } from "@/components/ui/PageHero";
import { LinkButton } from "@/components/ui/Button";
import { Alert, DemoBadge, Pending, StatusPill } from "@/components/ui/Status";
import { Check } from "@/components/ui/icons";

export function generateStaticParams() {
  return calls.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/candidats/appels/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCall(slug);
  if (!c) return {};
  return { title: c.title, description: c.summary, alternates: { canonical: `/candidats/appels/${c.slug}` } };
}

export default async function CallPage({ params }: PageProps<"/candidats/appels/[slug]">) {
  const { slug } = await params;
  const call = getCall(slug);
  if (!call) notFound();
  const program = getProgram(call.programSlug);
  const isOpen = call.status === "Ouvert";

  return (
    <>
      <PageHero
        eyebrow="Appel à projets"
        title={call.title}
        crumbs={[{ label: "Espace candidats", href: "/candidats" }, { label: "Appel à projets" }]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <StatusPill status={call.status} />
          <DemoBadge tone="dark" />
        </div>
      </PageHero>

      <div className="container-site grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Alert tone="warning" className="mb-8">
            Appel de démonstration : intitulé, critères et calendrier à définir par PIDECO.
          </Alert>
          <h2 className="text-2xl font-bold text-night-900">Présentation</h2>
          <p className="mt-4 text-lg leading-relaxed">{call.summary}</p>

          <h2 className="mt-12 text-2xl font-bold text-night-900">Conditions d&apos;éligibilité</h2>
          <ul className="mt-5 space-y-3">
            {call.eligibility.map((e) => (
              <li key={e} className="flex gap-3 leading-relaxed">
                <Check className="mt-1 size-4 shrink-0 text-forest-600" />
                {e}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl font-bold text-night-900">Secteurs concernés</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {call.sectors.map((s) => (
              <li key={s} className="rounded-full bg-leaf-100 px-3 py-1.5 text-sm text-forest-900">
                {s}
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-28 rounded-card bg-white p-7 shadow-card">
            <dl className="divide-y divide-line text-sm">
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted">Statut</dt>
                <dd>
                  <StatusPill status={call.status} />
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-muted">Date limite</dt>
                <dd className="text-right">{call.deadline ? formatDate(call.deadline) : <Pending>à définir</Pending>}</dd>
              </div>
              {program && (
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-muted">Axe</dt>
                  <dd className="text-right font-medium text-night-900">{program.shortTitle}</dd>
                </div>
              )}
            </dl>
            {isOpen ? (
              <LinkButton href={`/candidats/soumettre?appel=${call.slug}`} variant="secondary" arrow className="mt-6 w-full">
                Postuler à cet appel
              </LinkButton>
            ) : (
              <p className="mt-6 rounded-xl bg-paper p-4 text-center text-sm text-muted">Cet appel est clôturé.</p>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}
