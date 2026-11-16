"use client";

import { useState } from "react";
import { news, newsCategories } from "@/content/news";
import { NewsCard } from "@/components/ui/Cards";

/** Liste des actualités filtrable par catégorie. */
export function NewsExplorer() {
  const [category, setCategory] = useState<string>("");
  const results = category ? news.filter((n) => n.category === category) : news;
  const tabs = ["", ...newsCategories];

  return (
    <div>
      <div role="group" aria-label="Filtrer par catégorie" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
        {tabs.map((c) => {
          const selected = category === c;
          return (
            <button
              key={c || "all"}
              type="button"
              aria-pressed={selected}
              onClick={() => setCategory(c)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${selected ? "bg-forest-900 text-white" : "bg-white text-night-900 shadow-card hover:bg-sand"}`}
            >
              {c || "Toutes"}
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {results.length} article(s)
      </p>
      {results.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((a) => (
            <NewsCard key={a.slug} article={a} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-card border border-dashed border-line p-12 text-center text-muted">
          Aucun article publié dans cette catégorie pour le moment.
        </div>
      )}
    </div>
  );
}
