import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { programs } from "@/content/programs";
import { projects } from "@/content/projects";
import { news } from "@/content/news";
import { calls } from "@/content/calls";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/a-propos", "/programmes", "/projets", "/actualites", "/candidats", "/candidats/soumettre", "/transparence", "/contact", "/credits"];
  return [
    ...staticPaths.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8 })),
    ...programs.map((p) => ({ url: `${site.url}/programmes/${p.slug}`, priority: 0.7 })),
    ...projects.map((p) => ({ url: `${site.url}/projets/${p.slug}`, priority: 0.6 })),
    ...news.map((n) => ({ url: `${site.url}/actualites/${n.slug}`, lastModified: n.date, priority: 0.6 })),
    ...calls.map((c) => ({ url: `${site.url}/candidats/appels/${c.slug}`, priority: 0.6 })),
  ];
}
