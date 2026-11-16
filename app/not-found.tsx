import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-site grid min-h-[60vh] place-items-center py-24 text-center">
      <div>
        <p className="font-display text-7xl font-bold text-forest-900/15">404</p>
        <h1 className="mt-2 text-3xl font-bold text-night-900">Page introuvable</h1>
        <p className="mt-3 text-muted">La page demandée n&apos;existe pas ou a été déplacée.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <LinkButton href="/">Retour à l&apos;accueil</LinkButton>
          <LinkButton href="/contact" variant="ghost">
            Nous contacter
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
