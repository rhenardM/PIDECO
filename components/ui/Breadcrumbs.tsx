import Link from "next/link";
import { site } from "@/content/site";

export type Crumb = { label: string; href?: string };

/** Fil d'Ariane + données structurées BreadcrumbList. */
export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const all: Crumb[] = [{ label: "Accueil", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${site.url}${c.href === "/" ? "" : c.href}` } : {}),
    })),
  };
  const linkClass = tone === "light" ? "text-white/70 hover:text-white" : "text-forest-700 hover:text-forest-900";
  const currentClass = tone === "light" ? "text-white" : "text-night-900";
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={i} className="flex items-center gap-2">
              {c.href && !last ? (
                <Link href={c.href} className={`${linkClass} transition-colors`}>
                  {c.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={currentClass}>
                  {c.label}
                </span>
              )}
              {!last && (
                <span aria-hidden className={tone === "light" ? "text-white/40" : "text-muted/60"}>
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}
