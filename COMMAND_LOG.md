# Journal des Commandes Exécutées - Phase 1.1 & 1.2

Voici la liste chronologique des commandes exécutées pour l'initialisation du projet.

## 1. Tentative d'initialisation directe (Échouée)
```bash
npm create vite@latest . -- --template vue
```
*Note : Échec car le dossier n'était pas vide.*

## 2. Initialisation via dossier temporaire et installation des dépendances
```bash
npm create vite@latest temp-app -- --template vue && \
mv temp-app/* . && \
mv temp-app/.* . 2>/dev/null || true && \
rm -rf temp-app && \
npm install && \
npm install pinia vue-router tailwindcss postcss autoprefixer @vueuse/core @vueuse/motion
```
*Note : Contournement du problème de dossier non vide. Installation de Vue 3, Vite, Pinia, Vue Router, TailwindCSS, etc.*

## 3. Tentative d'initialisation Tailwind (Échouée)
```bash
npx tailwindcss init -p
```
*Note : Échec de la commande automatique. Les fichiers `tailwind.config.js` et `postcss.config.js` ont été créés manuellement par la suite.*

## 4. Création de l'architecture des dossiers
```bash
mkdir -p src/assets src/components/ui src/composables src/views src/stores
```

## 5. Build et Debugging (Tailwind v4)
```bash
npm run build
```
*Note : Échec initial car Tailwind v4 nécessite `@tailwindcss/postcss`.*

```bash
npm install @tailwindcss/postcss
```
*Note : Installation du plugin PostCSS pour Tailwind v4.*

```bash
npm run build
```
*Note : Succès après configuration correcte de `style.css` et `postcss.config.js`.*

## 6. Backend & Docker
```bash
mkdir -p backend/app/api/v1/endpoints backend/app/core backend/app/db backend/app/models backend/app/schemas backend/app/crud
```

```bash
docker compose up -d --build
```
*Note : Lancement réussi des conteneurs Backend et DB.*

```bash
curl http://localhost:8000/api/v1/health
```
*Note : Test de l'API OK.*

## 7. Phase 2.1: Top Bar & Navbar
```bash
npm install lucide-vue-next
```
*Note : Installation de la librairie d'icônes `lucide-vue-next` pour la Navbar.*
