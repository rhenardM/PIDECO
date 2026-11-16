import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatDate, getArticle, news } from "@/content/news";
import { site } from "@/content/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { NewsCard } from "@/components/ui/Cards";
import { Alert, DemoBadge } from "@/components/ui/Status";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/actualites/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: `/actualites/${a.slug}` },
    openGraph: { title: a.title, description: a.excerpt, type: "article", publishedTime: a.date },
  };
}

export default async function ArticlePage({ params }: PageProps<"/actualites/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const others = news.filter((n) => n.slug !== article.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    datePublished: article.date,
    description: article.excerpt,
    publisher: { "@type": "Organization", name: site.acronym },
  };

  return (
    <>
      <article>
        <header className="container-site max-w-4xl pt-10 pb-10">
          <Breadcrumbs tone="dark" items={[{ label: "Actualités", href: "/actualites" }, { label: article.title }]} />
          <div className="mt-10 flex flex-wrap items-center gap-3 text-sm">
            <span className="eyebrow text-forest-700">{article.category}</span>
            <time dateTime={article.date} className="text-muted">
              {formatDate(article.date)}
            </time>
            <DemoBadge />
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-night-900 md:text-5xl">{article.title}</h1>
          <p className="mt-6 text-xl leading-relaxed text-muted">{article.excerpt}</p>
        </header>
        <div className="container-site max-w-5xl">
          <MediaPlaceholder label={article.title} tone="night" className="aspect-[16/8] rounded-card" />
        </div>
        <div className="container-site prose-pideco max-w-3xl py-12 text-lg">
          {article.body ? (
            article.body.map((p, i) => <p key={i}>{p}</p>)
          ) : (
            <Alert tone="warning" title="Article de démonstration">
              Seul le chapeau de cet article est fourni dans le document de cadrage. Le texte complet est à rédiger et à
              valider par l&apos;équipe communication de PIDECO.
            </Alert>
          )}
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </article>

      <section className="bg-sand/60 py-16 md:py-20" aria-labelledby="a-lire">
        <div className="container-site">
          <h2 id="a-lire" className="mb-8 text-2xl font-bold text-night-900">
            À lire aussi
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {others.map((a) => (
              <NewsCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
