
# FONCTIONNALITÉS DU SITE MARKO

Ce document recense l'ensemble des fonctionnalités disponibles sur le site web, page par page, ainsi que les spécifications du système de design "Antigravity".

## Stack Technique

### Frontend (Luxury Edition)
*   **Core** : Vue 3 (Composition API) + Vite
*   **Styling** : Tailwind CSS (v3) + Design System "Luxury"
*   **State Management** : Pinia (Stores: Auth, Cart, Favorites, Toast)
*   **Routing** : Vue Router 4
*   **Animations** : VueUse Motion / GSAP
*   **Icons** : Lucide-vue / Heroicons

### Backend & Data
*   **API** : FastAPI (Python)
*   **Base de données** : PostgreSQL
*   **Paiement** : Stripe API (Simulation)


## Navigation Globale (Navbar)
*   **Top Bar** : Affichage des promotions (ex: Livraison gratuite).
*   **Logo** : Retour à la page d'accueil.
*   **Recherche** :
    *   Barre de recherche textuelle (Desktop & Mobile).
*   **Menu Principal (Mega Menu)** :
    *   Navigation par catégories (Femme, Homme, Beauté, Maison).
    *   Sous-catégories détaillées au survol.
    *   Mise en avant visuelle (Image "Nouvelle Collection").
    *   Lien "Sales" (Promotions).
*   **Menu Utilisateur** :
    *   Indicateur de connexion (Login / Account / Admin).
    *   Menu déroulant ou redirection vers le profil/login.
*   **Panier** :
    *   Icône avec accès direct à la page panier.
*   **Menu Mobile** :
    *   Menu hamburger pour l'accès aux catégories sur mobile.

## Page d'Accueil (Home)
*   **Hero Banner** : Grande bannière visuelle avec appels à l'action (Shop Women / Shop Men).
*   **Grille Promotionnelle** : Raccourcis visuels vers les collections Femme et Homme.
*   **Section "Trending Now"** :
    *   Affichage des produits populaires.
    *   Liens vers la liste complète des produits.

## Liste des Produits (Product List)
*   **Fil d'Ariane (Breadcrumbs)** : Navigation hiérarchique (ex: Home / Women).
*   **Filtres Latéraux** :
    *   Par Catégorie (T-Shirts, Vestes, Accessoires, Chaussures).
    *   Par Prix (Tranches de prix).
*   **Tri & Affichage** :
    *   Compteur de produits affichés.
    *   Tri des produits (Nouveautés, Prix croissant, Prix décroissant).
*   **Grille de Produits** : Affichage des cartes produits.

## Détail Produit (Product Detail)
*   **Informations Produit** :
    *   Galerie d'images.
    *   Nom, Référence, Prix (avec gestion des promotions/remises).
    *   Description détaillée.
*   **Sélection** :
    *   Sélecteur de taille dynamique.
    *   Indication "Rupture de stock" (Out of Stock) pour les tailles indisponibles.
    *   **Guide des Tailles** : Modal interactive avec tableau de mesures.
*   **Actions** :
    *   Ajout au panier (désactivé si taille non sélectionnée).
    *   Ajout aux favoris (Toggle).
*   **Informations Complémentaires** :
    *   Accordéon "Livraison & Retours".
*   **Avis Clients** :
    *   Liste des avis avec notation (étoiles) et commentaires.

## Panier (Cart)
*   **Liste des Articles** :
    *   Affichage complet (Image, Nom, Prix, Taille, Ref).
    *   Modification de la quantité (+/-).
    *   Suppression d'un article.
*   **État Vide** : Message et bouton pour continuer les achats si le panier est vide.
*   **Résumé de Commande** :
    *   Calcul du sous-total.
    *   Frais de livraison (Gratuit/Calculé).
    *   Total global.
*   **Action** : Bouton de validation (Checkout).

## Paiement (Checkout)
*   **Formulaire de Livraison** : Nom, Email, Adresse, Ville, Code Postal.
*   **Formulaire de Paiement** : Carte bancaire, Expiration, CVC.
*   **Résumé de la Commande** : Rappel des articles et du total.
*   **Validation** : Bouton de paiement (avec simulation d'attente API).

## Compte Utilisateur (Profile)
*   **Tableau de Bord** :
    *   Navigation par onglets (Profil, Commandes, Adresses, Paiement).
    *   Déconnexion (Sign Out).
*   **Infos Profil** : Consultation Nom, Email, Date d'inscription.
*   **Historique des Commandes** :
    *   Liste des commandes passées.
    *   Détails (ID, Date, Total, Statut, Articles).
*   **Carnet d'Adresses** : Formulaire de modification de l'adresse de livraison.
*   **Moyens de Paiement** :
    *   Affichage de la carte enregistrée.
    *   Ajout d'une nouvelle carte.

## Administration (Admin)
*   **Gestion des Produits** :
    *   Liste tabulaire des produits (Nom, Prix, Stock).
    *   Bouton "Ajouter un produit".
    *   Actions : Éditer, Supprimer.

## Authentification
*   **Login** : Connexion utilisateur.
*   **Register** : Création de compte.

## Pied de Page (Footer)
*   *Fonctionnalités standards de navigation et liens légaux (à confirmer selon implémentation).*

---

## Design System & Style Guide "Luxury Retail"

Ce design system définit l'identité visuelle pour l'ensemble des modules listés ci-dessus.

### Couleurs
*   **Brand**
    *   `gl-black`: #000000 (Texte principal, boutons primaires)
    *   `gl-red`: #E2001A (Accents, erreurs, soldes, point final logo)
    *   `gl-gray`: #F4F4F4 (Arrière-plans subtils, inputs)
    *   `gl-dark-gray`: #333333 (Texte secondaire)
*   **Utility Luxury**
    *   `gl-white-glass`: rgba(255, 255, 255, 0.9) (Fonds floutés clairs, premium)
    *   `gl-black-glass`: rgba(0, 0, 0, 0.9) (Fonds floutés sombres)

### Typographie
*   **Sans-serif (Corps)** : `Inter` (Lecture, UI, Boutons)
*   **Serif (Editorial)** : `Playfair Display` (Titres de sections, Citations, Marketing)

### Grid & Conteneur
*   **Container** : Centré, padding 2rem.
*   **Max-width** : 1400px (2xl).

### Animations "Editorial"
Ces animations doivent être subtiles et fluides, renforçant le sentiment de qualité.

*   `fade-in` : Opacité 0 -> 1 (0.8s ease-out). Pour l'apparition douce des pages.
*   `slide-up` : Montée légère de 15px + Fade In (0.8s ease-out). Pour les éléments de liste et cartes produits.
*   `slide-down` : Descente légère de 15px (0.3s ease-out). Pour les menus et dropdowns.
*   `zoom-subtle` : Zoom très lent et progressif (Scale 1 -> 1.05 sur 20s). Pour les images de fond (Hero Banner).

---
