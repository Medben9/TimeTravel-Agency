## Membres du Groupe
- Mohamed Benhamid
- Youness Belmadani
- El Mehdi Kachour

# TimeTravel Agency - Webapp Interactive

Webapp pour une agence de voyage temporel fictive, construite avec React + Tailwind et enrichie avec IA conversationnelle.

## Description
Le projet propose une landing page premium en mode sombre avec:
- Hero avec fond anime et support video optionnel
- Galerie de 3 destinations temporelles
- Vue detaillee par destination (modal)
- Chatbot IA avec integration Mistral (et mode fallback local)
- Quiz de recommandation personnalisee (4 questions)
- Formulaire de reservation avec destination + dates

## Stack Technique
- React 18 + TypeScript
- Tailwind CSS
- Vite
- API Mistral (optionnelle via variable d'environnement)

## Features Implémentees
- Header sticky avec navigation
- Hero section avec CTA
- 3 cards destinations interactives avec visuels lazy-load
- Modal destination avec infos detaillees et CTA booking
- Widget chatbot flottant bas droite
- FAQ/conseils/prix coherents via Mistral ou fallback local
- Quiz de personnalisation avec recommandation finale
- Formulaire de reservation avec confirmation

## IA et Transparence
- Generation/iteration de code: GitHub Copilot
- Modele d'assistance conversationnelle: GPT-5.3-Codex
- Chatbot applicatif: Mistral API (mistral-small-latest)
- Fallback local sans API pour demo hors-ligne



## Structure du Projet
- src/App.tsx: orchestration des sections et etat global page
- src/components/Header.tsx: navigation
- src/components/Hero.tsx: hero et media de fond
- src/components/Cards.tsx: cards destinations
- src/components/DestinationModal.tsx: vue detail destination
- src/components/RecommendationQuiz.tsx: quiz personnalise
- src/components/Chatbot.tsx: widget chatbot UI + logique conversation
- src/components/Booking.tsx: formulaire reservation
- src/data/destinations.ts: donnees destinations centralisees
- src/types/destination.ts: type partage Destination
- src/services/mistral.ts: appel API Mistral
- public/assets/destinations/*.png: visuels de destination
- public/assets/destinations/Time Travel Agency.mp4: video hero

## Installation
1. Installer les dependances:

```bash
npm install
```

2. Copier le template d'env:

```bash
cp .env.example .env
```

3. Renseigner la cle Mistral dans `.env`:

```env
VITE_MISTRAL_API_KEY=your_key_here
VITE_MISTRAL_MODEL=mistral-small-latest
```

4. Lancer en local:

```bash
npm run dev
```

## Verification Qualite
```bash
npm run typecheck
npm run lint
npm run build
```

## Integration de vos assets du Projet 1
- Remplacer les visuels demo dans `public/assets/destinations/` par vos images.
- Option video hero: ajouter votre mp4 dans `public/assets/destinations/` (fichier actuel: `Time Travel Agency.mp4`).
- Les images des cards utilisent `loading="lazy"` pour optimiser le chargement.

## Questions de test recommandees (chatbot)
1. Quelle destination est ideale pour l'art et l'architecture ?
2. Quels sont les prix de depart pour chaque epoque ?
3. Je veux voir des dinosaures en securite, que proposes-tu ?
4. Quelle destination pour une ambiance urbaine elegante ?
5. Je veux un voyage tres culturel, quelle epoque choisir ?
6. Quels conseils de preparation avant un voyage temporel ?

## Deploiement Vercel
1. Push du projet sur GitHub.
2. Import du repository dans Vercel.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Ajouter variables d'environnement dans Vercel:
   - `VITE_MISTRAL_API_KEY`
   - `VITE_MISTRAL_MODEL`
6. Deploy et tester l'URL publique sur desktop + mobile.

## Credits
- Projet pedagogique M1/M2 Digital & IA
- API conversationnelle: Mistral
- Assets visuels: PNG + MP4 du projet TimeTravel Agency

## Licence
Projet pedagogique / demonstration.
