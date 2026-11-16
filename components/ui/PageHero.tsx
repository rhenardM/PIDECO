import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { MediaPlaceholder, type Tone } from "./MediaPlaceholder";
import type { IllustrationKey } from "@/content/images";

/**
 * En-tête des pages intérieures.
 * Composition inspirée des références « bloc de couleur arrondi + photo »
 * (cf. docs/references/maquettes/ref-trees-for-the-future-bloc-arrondi.jpeg).
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  photoLabel,
  image,
  tone = "forest",
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  crumbs: Crumb[];
  photoLabel?: string;
  image?: IllustrationKey;
  tone?: Tone;
  children?: ReactNode;
}) {
  const bg = tone === "night" ? "bg-night-900" : "bg-forest-900";
  return (
    <section className={`relative overflow-hidden ${bg}`}>
      {photoLabel && (
        <MediaPlaceholder
          label={photoLabel}
          image={image}
          sizes="40vw"
          priority
          tone={tone === "night" ? "forest" : "night"}
          className="absolute inset-y-0 right-0 hidden w-[38%] rounded-bl-feature lg:block"
        />
      )}
      <div className="container-site relative py-12 md:py-16 lg:py-24">
        <div className={photoLabel ? "lg:max-w-[56%]" : "max-w-3xl"}>
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mt-8 text-leaf-300">{eyebrow}</p>
          <h1 className="animate-rise mt-3 text-4xl font-bold leading-[1.1] text-white md:text-5xl">{title}</h1>
          {intro && <div className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{intro}</div>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
