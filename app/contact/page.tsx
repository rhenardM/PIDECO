import type { Metadata } from "next";
import Link from "next/link";
import { contact, socials } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { DemoBadge, Pending } from "@/components/ui/Status";
import { Clock, Mail, MapPin, Phone } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Coordonnées du siège du PIDECO à Kinshasa, bureaux provinciaux et formulaire de contact.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const rows = [
    {
      icon: MapPin,
      label: "Adresse du siège",
      value: `${contact.address.street}, ${contact.address.district}, ${contact.address.city}, ${contact.address.country}`,
    },
    { icon: Phone, label: "Téléphone", value: contact.phones.join(" / ") },
    { icon: Mail, label: "E-mail", value: contact.email, href: `mailto:${contact.email}` },
    { icon: Clock, label: "Heures d'ouverture", value: contact.hours },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre communauté"
        intro="Bénéficiaires, porteurs de projets, partenaires techniques et financiers, médias : l'équipe de coordination vous répond."
        crumbs={[{ label: "Contact" }]}
      />

      <div className="container-site grid gap-12 py-16 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-night-900">
            Coordination nationale {contact.demo && <DemoBadge />}
          </h2>
          <ul className="mt-6 space-y-5">
            {rows.map((r) => (
              <li key={r.label} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-leaf-100 text-forest-900">
                  <r.icon className="size-5" />
                </span>
                <div>
                  <p className="text-sm text-muted">{r.label}</p>
                  {r.href ? (
                    <a href={r.href} className="font-medium text-night-900 hover:text-forest-700">
                      {r.value}
                    </a>
                  ) : (
                    <p className="font-medium text-night-900">{r.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-xl font-bold text-night-900">Bureaux provinciaux</h2>
          <Pending className="mt-4">Liste des bureaux et représentations à fournir</Pending>

          <h2 className="mt-12 text-xl font-bold text-night-900">Réseaux sociaux</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {socials.map((s) =>
              s.url ? (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-4 py-2 text-sm shadow-card hover:bg-sand">
                    {s.label}
                  </a>
                </li>
              ) : (
                <li key={s.label} className="rounded-full border border-dashed border-line px-4 py-2 text-sm text-muted">
                  {s.label} · à venir
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-card bg-white p-6 shadow-card md:p-10">
            <h2 className="text-2xl font-bold text-night-900">Écrivez-nous</h2>
            <p className="mt-2 mb-8 text-sm text-muted">
              Pour soumettre un projet, utilisez plutôt l&apos;
              <Link href="/candidats/soumettre" className="text-forest-700 underline">
                espace candidats
              </Link>
              .
            </p>
            <ContactForm />
          </div>
        </div>
      </div>

      <section aria-labelledby="carte" className="container-site pb-20">
        <h2 id="carte" className="sr-only">
          Localisation
        </h2>
        {contact.geo ? (
          <iframe
            title="Localisation du siège PIDECO"
            className="h-96 w-full rounded-card border-0"
            loading="lazy"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${contact.geo.lng - 0.01}%2C${contact.geo.lat - 0.01}%2C${contact.geo.lng + 0.01}%2C${contact.geo.lat + 0.01}&marker=${contact.geo.lat}%2C${contact.geo.lng}`}
          />
        ) : (
          <div className="grid h-64 place-items-center rounded-card border border-dashed border-line bg-white/60 p-6 text-center text-muted">
            La carte de localisation sera affichée dès confirmation de l&apos;adresse exacte du siège.
          </div>
        )}
      </section>
    </>
  );
}
