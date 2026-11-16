import type { Metadata } from "next";
import NextImage from "next/image";
import { illustrations } from "@/content/images";
import { PageHero } from "@/components/ui/PageHero";
import { Alert } from "@/components/ui/Status";

export const metadata: Metadata = {
  title: "Crédits photographiques",
  description: "Sources et licences des photographies d'illustration utilisées sur le site PIDECO.",
  alternates: { canonical: "/credits" },
};

export default function CreditsPage() {
  const items = Object.values(illustrations);
  return (
    <>
      <PageHero
        eyebrow="Crédits"
        title="Crédits photographiques"
        intro="Sources et licences des images d'illustration utilisées sur ce site."
        crumbs={[{ label: "Crédits photographiques" }]}
      />
      <div className="container-site py-16">
        <Alert tone="warning" className="mb-10">
          Les photographies ci-dessous sont des <strong>images d&apos;illustration</strong> issues de Wikimedia Commons,
          sous licence libre. Elles ne représentent pas des activités, bénéficiaires ou personnels de PIDECO et seront
          remplacées par les photographies officielles du programme.
        </Alert>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((img) => (
            <li key={img.src} className="overflow-hidden rounded-card bg-white shadow-card">
              <div className="relative aspect-[16/10]">
                <NextImage
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 text-sm">
                <p className="font-semibold text-night-900">{img.alt}</p>
                <p className="mt-2 text-muted">
                  Auteur : {img.author}
                  <br />
                  Licence :{" "}
                  {img.licenseUrl ? (
                    <a href={img.licenseUrl} className="text-forest-700 underline" rel="noopener noreferrer license" target="_blank">
                      {img.license}
                    </a>
                  ) : (
                    img.license
                  )}
                </p>
                <a href={img.source} className="mt-2 inline-block text-forest-700 underline" rel="noopener noreferrer" target="_blank">
                  Source (Wikimedia Commons)
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
