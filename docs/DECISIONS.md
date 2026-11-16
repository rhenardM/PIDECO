# Décisions techniques — Site PIDECO

## Sources et arbitrages

| Source | Rôle | Constat |
|---|---|---|
| `references/Kit_Complet_Site_Web_PIDECO.docx` | Référence fonctionnelle et textes | Arborescence, textes, formulaire. **Chiffres, projets, actualités et coordonnées = démonstration.** Aucune administration prévue. |
| `references/maquettes/*.jpeg` | Direction artistique | Captures de sites tiers (UNDP, One Acre Fund, Trees for the Future, Spark, WFP, Kicheko). Pas de maquette PIDECO propre. |

**Arbitrages :**
- Les maquettes sont des références d'autres organisations. On en retient les **principes** (bloc de couleur posé sur la photo, rayons généreux, typographie grasse, cartes photo, page intérieure éditoriale), **sans reprendre leurs photos, logos ou identités**.
- Le kit fait foi pour le contenu. L'arborescence du brief (8 pages) et celle du kit (7 menus) sont fusionnées. La page **Transparence**, demandée par le brief et absente du kit, est ajoutée.
- **Aucune interface d'administration** : le kit n'en prévoit pas. Les contenus sont centralisés dans `content/*.ts`, ce qui prépare une migration vers un CMS.

## Stack (inchangée)

Next.js 16.4 (App Router, `cacheComponents` + `partialPrefetching`), React 19.3, Tailwind CSS 4, TypeScript. **Aucune dépendance ajoutée.**

## Architecture

```
app/                  Routes (une page = un dossier)
  candidats/soumettre/actions.ts   Server Action candidature
  contact/actions.ts               Server Action contact
  sitemap.ts, robots.ts
components/
  layout/             Header, Footer, Logo, DemoBanner
  ui/                 Boutons, cartes, titres, fil d'Ariane, statuts, visuels, stats…
  forms/              Champs accessibles, formulaires
  projects/, news/    Composants interactifs (filtres)
content/              Toutes les données (marquées demo / null = à fournir)
lib/application.ts    Règles de validation partagées client/serveur
```

## Design system

Tokens centralisés dans `app/globals.css` (`@theme`) : couleurs `forest` (vert profond), `night` (bleu nuit), `paper` (blanc cassé), `leaf` (vert clair), `sun` (jaune chaud), polices Poppins (titres) et Inter (texte), rayons `card` et `feature`, ombres. **Palette provisoire** en attendant la charte officielle.

## Photos d'illustration

Faute de photos PIDECO, le site utilise **19 photos d'exemple** issues de **Wikimedia Commons**, toutes sous licence libre (CC0, domaine public, CC BY-SA 2.0/4.0). La plupart ont été prises en RDC.

- Fichiers dans `public/images/illustrations/`. Les métadonnées (légende, auteur, licence, source) sont dans `content/images.ts`.
- Chaque photo visible porte la mention « Illustration · auteur, licence ». La page `/credits`, liée depuis le footer, donne l'attribution complète exigée par les licences CC BY-SA.
- **Ce ne sont pas des photos d'activités PIDECO.** Les personnes photographiées n'ont aucun lien avec le programme. Exclusions volontaires : photos militaires ou sensibles, et photos de responsables politiques réels.
- **L'équipe dirigeante n'est illustrée par aucune photo de personne réelle** (pictogrammes uniquement), pour ne pas faire croire que ces personnes travaillent pour PIDECO.
- Pour remplacer une illustration par une photo officielle : ajouter le fichier dans `public/images/`, puis changer la clé `image` de l'élément dans `content/*.ts` ou l'entrée de `content/images.ts`.

## Gestion des contenus non confirmés

- `DemoBanner` global, désactivable avec `NEXT_PUBLIC_DEMO_MODE=false`.
- Badge « Démo » sur chaque chiffre, projet, actualité, appel et sur les coordonnées.
- Composant `Pending` (« à fournir ») pour les informations manquantes : historique, tutelle, équipe, budgets, bureaux.
- `MediaPlaceholder` affiche soit une photo d'illustration créditée, soit un visuel de remplacement décrivant la photo attendue.
- Partenaires : emplacements neutres, **aucun logo**. Témoignages : section vide expliquée.
- `robots.txt` bloque l'indexation tant que le mode démo est actif.

## Formulaires : ce qui marche, ce qui manque

| | Fonctionne | Manque (backend) |
|---|---|---|
| Candidature | Formulaire en 4 étapes, validation par étape, validation serveur complète (mêmes règles), contrôle taille/extension **et signature binaire** des fichiers, champ piège anti-robot, retour à l'étape en erreur, saisie conservée | **Enregistrement** des dossiers et fichiers, e-mail de confirmation, limitation de débit, back-office de suivi |
| Contact | Validation serveur, anti-robot | **Envoi de l'e-mail** |

L'écran de confirmation indique explicitement que **rien n'a été transmis**. Le point d'intégration est marqué `TODO(backend)` dans chaque `actions.ts`.

## Points d'attention techniques

- Formulaires : soumission via `startTransition(() => action(fd))` et non `<form action>`, car React 19 réinitialise les champs après chaque action, y compris en cas d'erreur.
- Boutons « Continuer » / « Soumettre » : `key` distinctes, sinon React réutilise le même `<button>` et le formulaire se soumet au clic sur « Continuer ».
- Menu mobile positionné en `absolute` sous le header : le `backdrop-filter` du header crée un bloc conteneur pour les éléments `fixed`.
- Filtres projets synchronisés avec l'URL (`?axe=&province=&statut=`), avec un repli statique dans `<Suspense>` (exigence de `cacheComponents` pour `useSearchParams`).

## Tests réalisés

- `npm run lint`, `npm run build` : OK (31 pages prérendues).
- Navigateur headless, 13 pages × 2 tailles d'écran (1440 px, 390 px) : aucune erreur console, aucun débordement horizontal, aucun lien interne cassé.
- Parcours complet du formulaire : erreurs par étape, focus sur le premier champ en erreur, présélection de l'appel, fichier piégé refusé par le serveur, soumission valide.
- Filtres projets et menu mobile (ouverture, Échap).
