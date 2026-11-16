import NextImage from "next/image";
import { illustrations, type IllustrationKey } from "@/content/images";
import { Image as ImageIcon } from "./icons";

export type Tone = "forest" | "night" | "sun" | "leaf";

const tones: Record<Tone, string> = {
  forest: "from-forest-800 via-forest-900 to-night-900",
  night: "from-night-700 via-night-900 to-forest-950",
  sun: "from-sun-500 via-forest-800 to-forest-950",
  leaf: "from-forest-600 via-forest-800 to-night-900",
};

/**
 * Visuel d'une section.
 * - Avec `image` : photo d'ILLUSTRATION libre de droits (content/images.ts), toujours
 *   signalée comme telle et créditée — ce ne sont pas des photos d'activités PIDECO.
 * - Sans `image` : visuel de remplacement décrivant la photo attendue.
 * `label` décrit la photo officielle à fournir à terme.
 */
export function MediaPlaceholder({
  label,
  image,
  tone = "forest",
  className = "",
  showLabel = true,
  sizes = "100vw",
  priority = false,
}: {
  label: string;
  image?: IllustrationKey;
  tone?: Tone;
  className?: string;
  showLabel?: boolean;
  sizes?: string;
  priority?: boolean;
}) {
  // L'appelant peut positionner le visuel en absolu ; sinon il sert de repère.
  const position = /(^|\s)absolute(\s|$)/.test(className) ? "" : "relative";

  if (image) {
    const img = illustrations[image];
    return (
      <figure className={`${position} m-0 overflow-hidden bg-night-900 ${className}`}>
        <NextImage
          src={img.src}
          alt={img.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
        {showLabel && (
          <figcaption
            className="absolute right-2 bottom-2 max-w-[90%] truncate rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white/85 backdrop-blur-sm"
            title={`${img.alt} — ${img.author}, ${img.license}`}
          >
            Illustration · {img.author}, {img.license}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Photo à fournir : ${label}`}
      className={`${position} overflow-hidden bg-linear-to-br ${tones[tone]} ${className}`}
    >
      <span aria-hidden className="media-pattern absolute inset-0" />
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        className="absolute -right-10 -bottom-10 size-64 text-white/6"
        fill="currentColor"
      >
        <path d="M100 10c30 30 50 60 50 95a50 50 0 0 1-100 0c0-35 20-65 50-95Z" />
      </svg>
      {showLabel && (
        <span className="absolute bottom-3 left-3 inline-flex max-w-[85%] items-center gap-1.5 rounded-md bg-black/35 px-2 py-1 text-[11px] text-white/85 backdrop-blur-sm">
          <ImageIcon className="size-3.5 shrink-0" />
          <span className="truncate">Photo à fournir — {label}</span>
        </span>
      )}
    </div>
  );
}
