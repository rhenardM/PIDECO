# Contenus à collecter auprès de PIDECO

Pour chaque élément : où le renseigner une fois obtenu.

## Décisions institutionnelles

| Élément | Valeur actuelle | Fichier |
|---|---|---|
| Sigle exact : **PIDECO ou PICEDO ?** | PIDECO | `content/site.ts` (+ rechercher/remplacer) |
| Ministère de tutelle / organisme porteur | non renseigné | `content/institution.ts` → `pendingInstitutionalInfo` |
| Historique (création, étapes clés) | non renseigné | `content/institution.ts` |
| Nom de domaine | pideco-rdc.org (provisoire) | variable `NEXT_PUBLIC_SITE_URL` |
| Charte graphique (couleurs, logo HD) | palette provisoire, logo typographique | `app/globals.css`, `components/layout/Logo.tsx` |

## Données (actuellement en démonstration)

| Élément | Fichier |
|---|---|
| Chiffres clés réels (jeunes, infrastructures, provinces, coopératives) | `content/institution.ts` → `keyFigures` |
| Liste réelle des projets (titre, zones, statut, description, indicateurs, période, budget, partenaires) | `content/projects.ts` |
| Articles d'actualité (texte intégral) | `content/news.ts` → `body` |
| Appels à projets réels (critères, dates limites) | `content/calls.ts` |
| Réponses de la FAQ candidats | `content/calls.ts` → `faq` |
| Résultats attendus par axe | `content/programs.ts` → `expectedResults` |

## Gouvernance et équipe

- Composition des instances de gouvernance et organigramme.
- Noms, fonctions et photos de l'équipe dirigeante (dont le Coordonnateur national) → `content/institution.ts` → `team`.

## Coordonnées

- Adresse exacte du siège, coordonnées GPS (active la carte) → `content/site.ts` → `contact.geo`.
- Téléphones et e-mail officiels.
- Bureaux provinciaux.
- Comptes officiels sur les réseaux sociaux → `content/site.ts` → `socials`.

## Partenaires et transparence

- Liste **confirmée** des partenaires techniques et financiers et leurs logos (avec autorisation d'usage) → `content/documents.ts` → `partners`.
- Rapports annuels, rapports d'activités, documents institutionnels, cadre de résultats (PDF) → `public/documents/` + `content/documents.ts`.
- Informations financières publiables (budget, bailleurs, répartition).

## Médias

- Photographies authentiques des activités, avec crédits et consentement des personnes photographiées. Chaque emplacement indique la photo attendue (« Photo à fournir — … »).
- Témoignages de bénéficiaires, avec consentement.

## Décisions techniques à prendre

- Hébergement et backend pour **enregistrer les candidatures** (base de données et stockage privé des pièces jointes) et **envoyer les messages de contact**.
- Besoin éventuel d'un CMS ou d'une interface d'administration (non prévue dans le kit).
