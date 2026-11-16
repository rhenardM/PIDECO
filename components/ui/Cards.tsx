import Link from "next/link";
import type { Program } from "@/content/programs";
import type { Project } from "@/content/projects";
import { formatDate, type NewsArticle } from "@/content/news";
import type { Call } from "@/content/calls";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { DemoBadge, StatusPill, Pending } from "./Status";
import { ArrowRight, MapPin } from "./icons";
import { getProgram } from "@/content/programs";

const cardBase =
  "group relative flex h-full flex-col overflow-hidden rounded-card bg-white shadow-card transition-shadow hover:shadow-lift";

/** Lien « carte entière cliquable » accessible : un seul lien, étendu via ::after. */
const stretched = "after:absolute after:inset-0 after:content-['']";

export function ProgramCard({ program }: { program: Program }) {
  return (
    <article className={`${cardBase} p-7`}>
      <span className="font-display text-5xl font-bold text-forest-900/12">0{program.number}</span>
      <h3 className="mt-4 text-xl font-semibold leading-snug text-night-900">
        <Link href={`/programmes/${program.slug}`} className={`${stretched} focus-visible:outline-none`}>
          {program.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{program.summary}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest-700 group-hover:gap-3 transition-all">
        Découvrir l&apos;axe <ArrowRight className="size-4" />
      </span>
    </article>
  );
}

export function ProjectCard({ project, headingLevel = 3 }: { project: Project; headingLevel?: 2 | 3 }) {
  const program = getProgram(project.programSlug);
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className={cardBase}>
      <div className="relative">
        <MediaPlaceholder
          label={project.title}
          image={project.image}
          tone={program?.tone ?? "forest"}
          className="aspect-[16/10]"
          showLabel={false}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <StatusPill status={project.status} />
        </div>
        <DemoBadge className="absolute top-3 right-3" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        {program && <p className="eyebrow text-forest-700">{program.shortTitle}</p>}
        <H className="mt-2 text-lg font-semibold leading-snug text-night-900">
          <Link href={`/projets/${project.slug}`} className={`${stretched} focus-visible:outline-none`}>
            {project.title}
          </Link>
        </H>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
        <p className="mt-5 flex items-center gap-1.5 text-sm text-night-800">
          <MapPin className="size-4 text-forest-700" />
          {project.provinces.join(" · ")}
        </p>
      </div>
    </article>
  );
}

export function NewsCard({ article, featured = false }: { article: NewsArticle; featured?: boolean }) {
  return (
    <article className={`${cardBase} ${featured ? "md:flex-row" : ""}`}>
      <MediaPlaceholder
        label={article.title}
        image={article.image}
        sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
        tone="night"
        showLabel={false}
        className={featured ? "aspect-[16/10] md:aspect-auto md:w-1/2" : "aspect-[16/9]"}
      />
      <div className={`flex flex-1 flex-col p-6 ${featured ? "md:p-10" : ""}`}>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="eyebrow text-forest-700">{article.category}</span>
          <time dateTime={article.date} className="text-muted">
            {formatDate(article.date)}
          </time>
          <DemoBadge />
        </div>
        <h3 className={`mt-3 font-semibold leading-snug text-night-900 ${featured ? "text-2xl md:text-3xl" : "text-lg"}`}>
          <Link href={`/actualites/${article.slug}`} className={`${stretched} focus-visible:outline-none`}>
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{article.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest-700">
          Lire l&apos;article <ArrowRight className="size-4" />
        </span>
      </div>
    </article>
  );
}

export function CallCard({ call }: { call: Call }) {
  return (
    <article className={`${cardBase} p-7`}>
      <div className="flex items-center gap-2">
        <StatusPill status={call.status} />
        <DemoBadge />
      </div>
      <h3 className="mt-4 text-xl font-semibold leading-snug text-night-900">
        <Link href={`/candidats/appels/${call.slug}`} className={`${stretched} focus-visible:outline-none`}>
          {call.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{call.summary}</p>
      <div className="mt-5 text-sm">
        <span className="font-semibold text-night-900">Date limite : </span>
        {call.deadline ? formatDate(call.deadline) : <Pending>à définir</Pending>}
      </div>
    </article>
  );
}
