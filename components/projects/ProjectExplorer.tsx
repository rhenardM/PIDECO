"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { projects, projectProvinces, projectStatuses } from "@/content/projects";
import { programs } from "@/content/programs";
import { ProjectCard } from "@/components/ui/Cards";
import { ProjectGrid } from "./ProjectGrid";

type Filters = { axe: string; province: string; statut: string };
const keys: (keyof Filters)[] = ["axe", "province", "statut"];

/**
 * Catalogue filtrable. Les filtres sont synchronisés avec l'URL
 * (?axe=…&province=…&statut=…) pour permettre le partage d'une sélection.
 */
export function ProjectExplorer() {
  const params = useSearchParams();
  const [filters, setFilters] = useState<Filters>({
    axe: params.get("axe") ?? "",
    province: params.get("province") ?? "",
    statut: params.get("statut") ?? "",
  });

  const update = (key: keyof Filters, value: string) => {
    const next = { ...filters, [key]: value };
    setFilters(next);
    const qs = new URLSearchParams();
    keys.forEach((k) => next[k] && qs.set(k, next[k]));
    window.history.replaceState(null, "", qs.size ? `?${qs}` : window.location.pathname);
  };

  const results = useMemo(
    () =>
      projects.filter(
        (p) =>
          (!filters.axe || p.programSlug === filters.axe) &&
          (!filters.province || p.provinces.includes(filters.province)) &&
          (!filters.statut || p.status === filters.statut),
      ),
    [filters],
  );

  const active = keys.some((k) => filters[k]);
  const selectClass =
    "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-night-900 shadow-sm focus:border-forest-600 focus:ring-2 focus:ring-forest-600/20 focus:outline-none";

  return (
    <div>
      <form
        role="search"
        aria-label="Filtrer les projets"
        className="grid gap-4 rounded-card bg-white p-5 shadow-card sm:grid-cols-2 lg:grid-cols-4 lg:items-end"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Secteur</span>
          <select className={selectClass} value={filters.axe} onChange={(e) => update("axe", e.target.value)}>
            <option value="">Tous les axes</option>
            {programs.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.shortTitle}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Zone géographique</span>
          <select className={selectClass} value={filters.province} onChange={(e) => update("province", e.target.value)}>
            <option value="">Toutes les provinces</option>
            {projectProvinces.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Statut</span>
          <select className={selectClass} value={filters.statut} onChange={(e) => update("statut", e.target.value)}>
            <option value="">Tous les statuts</option>
            {projectStatuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          disabled={!active}
          onClick={() => {
            setFilters({ axe: "", province: "", statut: "" });
            window.history.replaceState(null, "", window.location.pathname);
          }}
          className="rounded-xl border border-line px-4 py-3 text-sm font-semibold text-night-900 hover:bg-paper disabled:opacity-40"
        >
          Réinitialiser
        </button>
      </form>

      <p className="mt-8 mb-6 text-sm text-muted" aria-live="polite">
        {results.length} projet{results.length > 1 ? "s" : ""} trouvé{results.length > 1 ? "s" : ""}
      </p>

      {results.length > 0 ? (
        <ProjectGrid>
          {results.map((p) => (
            <ProjectCard key={p.slug} project={p} headingLevel={2} />
          ))}
        </ProjectGrid>
      ) : (
        <div className="rounded-card border border-dashed border-line p-12 text-center text-muted">
          Aucun projet ne correspond à ces critères.
        </div>
      )}
    </div>
  );
}
