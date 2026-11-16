import type { PublicDocument } from "@/content/documents";
import { Download, FileIcon } from "./icons";

/**
 * Liste de documents téléchargeables. Un document sans fichier est affiché
 * comme « à publier » : le bouton de téléchargement est désactivé.
 */
export function DocumentList({ items }: { items: PublicDocument[] }) {
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-card bg-white shadow-card">
      {items.map((d) => (
        <li key={d.title} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-leaf-100 text-forest-900">
              <FileIcon className="size-5" />
            </span>
            <div>
              <p className="font-semibold text-night-900">{d.title}</p>
              <p className="mt-0.5 text-sm text-muted">
                {d.category}
                {d.year ? ` · ${d.year}` : ""}
                {!d.file && " · document à publier"}
              </p>
            </div>
          </div>
          {d.file ? (
            <a
              href={d.file}
              download
              className="inline-flex items-center justify-center gap-2 rounded-full border border-forest-900 px-4 py-2 text-sm font-semibold text-forest-900 hover:bg-forest-900 hover:text-white"
            >
              <Download className="size-4" /> Télécharger (PDF)
            </a>
          ) : (
            <span
              aria-disabled="true"
              className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-dashed border-line px-4 py-2 text-sm text-muted"
            >
              <Download className="size-4" /> Bientôt disponible
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
