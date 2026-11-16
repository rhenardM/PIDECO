import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import { Alert } from "@/components/ui/Status";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Soumettre une initiative",
  description: "Formulaire de soumission en ligne d'une initiative communautaire au PIDECO.",
  alternates: { canonical: "/candidats/soumettre" },
};

export default function SubmitPage() {
  return (
    <div className="bg-sand/50">
      <div className="container-site grid gap-10 py-10 md:py-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Breadcrumbs tone="dark" items={[{ label: "Espace candidats", href: "/candidats" }, { label: "Soumettre une initiative" }]} />
          <h1 className="mt-8 text-3xl font-bold leading-tight text-night-900 md:text-4xl">Soumettre une initiative</h1>
          <p className="mt-4 leading-relaxed text-muted">
            Le formulaire comporte 4 étapes et prend environ 15 minutes. Préparez votre note conceptuelle, votre pièce
            d&apos;identité et, pour les structures, vos statuts.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted">
            <li>• Les champs marqués d&apos;un <span className="text-danger">*</span> sont obligatoires.</li>
            <li>• Vous pouvez revenir aux étapes précédentes à tout moment.</li>
            <li>
              • Une question ? <a href={`mailto:${contact.email}`} className="text-forest-700 underline">{contact.email}</a>
            </li>
          </ul>
          <Alert tone="warning" className="mt-8">
            Version de démonstration : les dossiers sont vérifiés mais <strong>pas encore enregistrés</strong>.
          </Alert>
        </div>
        <div className="lg:col-span-8">
          <ApplicationForm />
        </div>
      </div>
    </div>
  );
}
