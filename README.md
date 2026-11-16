# PIDECO — Site institutionnel

Site du **Programme Intégré de Développement Communautaire** (RDC). Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript.

> ⚠️ **Version de démonstration.** Les chiffres, projets, actualités, appels et coordonnées sont des contenus de démonstration issus du kit de cadrage. Les formulaires valident les données mais ne les enregistrent pas encore.

## Démarrer

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production
npm run lint
```

## Pages

| Route | Contenu |
|---|---|
| `/` | Accueil : hero, présentation, chiffres clés, axes, projets phares, approche, actualités, partenaires, appel à candidatures |
| `/a-propos` | Présentation, historique, mission & vision, valeurs, objectifs, gouvernance & équipe, zones |
| `/programmes`, `/programmes/[slug]` | Les 4 axes, avec une fiche détaillée par axe |
| `/projets`, `/projets/[slug]` | Catalogue filtrable (axe, province, statut), réalisations par province, fiches projet avec galerie |
| `/actualites`, `/actualites/[slug]` | Articles par catégorie, communiqués, rapports, galerie photo |
| `/candidats` | Démarche, éligibilité, appels ouverts et clôturés, FAQ |
| `/candidats/appels/[slug]` | Détail d'un appel |
| `/candidats/soumettre` | Formulaire de candidature en 4 étapes avec pièces jointes |
| `/transparence` | Rapports, documents institutionnels, résultats, financements |
| `/contact` | Coordonnées, bureaux, formulaire, réseaux sociaux, carte (si coordonnées GPS confirmées) |

## Modifier les contenus

Tous les contenus se trouvent dans [`content/`](content/). Une valeur `null` signifie « à fournir » ; elle s'affiche comme un emplacement explicite.

## Variables d'environnement

| Variable | Défaut | Rôle |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://pideco-rdc.org` | URL canonique (SEO, sitemap) |
| `NEXT_PUBLIC_DEMO_MODE` | activé | `false` masque le bandeau démo et autorise l'indexation |

## Documentation

- [docs/DECISIONS.md](docs/DECISIONS.md) : architecture, design system, arbitrages, ce qui est fonctionnel ou non.
- [docs/CONTENUS_A_COLLECTER.md](docs/CONTENUS_A_COLLECTER.md) : informations à obtenir auprès de PIDECO.
- [docs/references/](docs/references/) : kit de contenu et maquettes de référence.
