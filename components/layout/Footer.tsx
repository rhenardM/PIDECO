import Link from "next/link";
import { contact, mainNav, site, socials, candidatesCta } from "@/content/site";
import { programs } from "@/content/programs";
import { Logo } from "./Logo";
import { Clock, Mail, MapPin, Phone } from "@/components/ui/icons";
import { DemoBadge } from "@/components/ui/Status";

export function Footer() {
  return (
    <footer className="bg-night-950 text-white/75">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{site.description}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Réseaux sociaux">
            {socials.map((s) =>
              s.url ? (
                <li key={s.label}>
                  <a href={s.url} className="rounded-full border border-white/20 px-3 py-1.5 text-xs hover:bg-white/10" rel="noopener noreferrer" target="_blank">
                    {s.label}
                  </a>
                </li>
              ) : (
                <li key={s.label} className="rounded-full border border-dashed border-white/20 px-3 py-1.5 text-xs text-white/45" title="Compte officiel à communiquer">
                  {s.label} · à venir
                </li>
              ),
            )}
          </ul>
        </div>

        <nav aria-label="Plan du site" className="lg:col-span-2">
          <h2 className="eyebrow mb-4 text-leaf-300">Le programme</h2>
          <ul className="space-y-2.5 text-sm">
            {mainNav.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="hover:text-white">
                  {i.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={candidatesCta.href} className="hover:text-white">
                {candidatesCta.label}
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Axes d'intervention" className="lg:col-span-3">
          <h2 className="eyebrow mb-4 text-leaf-300">Axes d&apos;intervention</h2>
          <ul className="space-y-2.5 text-sm">
            {programs.map((p) => (
              <li key={p.slug}>
                <Link href={`/programmes/${p.slug}`} className="hover:text-white">
                  {p.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="eyebrow mb-4 flex items-center gap-2 text-leaf-300">
            Contact {contact.demo && <DemoBadge tone="dark" />}
          </h2>
          <address className="space-y-3 text-sm not-italic">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-leaf-400" />
              <span>
                {contact.address.street}, {contact.address.district}, {contact.address.city}, {contact.address.country}
              </span>
            </p>
            <p className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-leaf-400" />
              <span>{contact.phones.join(" / ")}</span>
            </p>
            <p className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-leaf-400" />
              <a href={`mailto:${contact.email}`} className="hover:text-white">
                {contact.email}
              </a>
            </p>
            <p className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-leaf-400" />
              <span>{contact.hours}</span>
            </p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-white/50 md:flex-row md:justify-between">
          <p>© 2026 PIDECO - Programme Intégré de Développement Communautaire. Tous droits réservés.</p>
          <p>Version de démonstration — contenus en cours de validation.</p>
        </div>
      </div>
    </footer>
  );
}
