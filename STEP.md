# RECONSTRUCTION GUIDE (STEPS.MD) - MARKO "LUXURY RETAIL"

**Concept:** "Luxury Retail" (Inspiration: Hermès, Zalando Premium, Printemps)
**Stack:** Vue 3 (Composition API) + Vite // FastAPI + PostgreSQL

This operational guide is divided into 5 critical phases. Each task must strictly respect the style guidelines (Design System) and the defined technical architecture.

---

## 📅 PHASE 1: ARCHITECTURE & DESIGN SYSTEM (FOUNDATIONS)
*Objective: Set up a solid "Pixel Perfect" foundation ready for atomic development.*

### 1.1 Frontend Configuration (use tailwindconfig.md)
*   **Tech**: Vue 3, Vite, Pinia, Vue Router, TailwindCSS.
*   **Architecture**: Set up the `/src` structure (assets, components/ui, composables, views, stores).
*   **"Luxury" Design System**:
    *   Implement `tailwind.config.js` with the palette `gl-black`, `gl-red`, `gl-white-glass`.
    *   Configure fonts: `Inter` (UI) and `Playfair Display` (Titles).
    *   Define global animations: `fade-in`, `slide-up`, `zoom-subtle`.
*   **Deliverable**: Project that compiles, blank page with the correct font and CSS variables ready.


### 1.2 Backend Configuration (FastAPI)
*   **Tech**: FastAPI, SQLAlchemy, Pydantic.
*   **Structure**: MVC Pattern (v1/api/endpoints, models, schemas, crud).
*   **Database**: PostgreSQL schema for `Users`, `Products`, `Orders`. use db.png for exemple   
*   **Deliverable**: Functional "Health Check" API and DB connection established.

### 1.3 Basic UI Components (Design System)
*   **Luxury UX/UI**: Create reusable atomic components.
    *   `BaseButton`: Deep black (`gl-black`), white text, subtle hover (no vulgar drop shadow).
    *   `GlassContainer`: Utility for blurred backgrounds (`gl-white-glass` + `backdrop-blur`).
*   **Store**: `useToastStore` for elegant user feedback.

---

## 🧭 PHASE 2: IMMERSIVE NAVIGATION
*Objective: Create a "Premium" first impression with fluid and airy navigation.*

### 2.1 Top Bar & Navbar
*   **Luxury UX/UI**:
    *   Thin black Top Bar with white text (promotions).
    *   Sticky Navbar with `gl-white-glass` background.
    *   MARKO Logo with the red dot `gl-red`. The `slide-down` animation must be used on load.
*   **Tech**: `Navbar.vue` component.
*   **Store**: Connect `authStore` state (show "Login" or "Account").

### 2.2 "Frosty" Mega Menu
*   **Luxury UX/UI**:
    *   Full-width menu opening on hover with a blur effect (`backdrop-blur-md`).
    *   Integrated category images.
*   **Animation**: Fast `fade-in` for opening.

### 2.3 Minimalist Footer
*   **Luxury UX/UI**: Very airy design on very light `gl-gray` background. Hierarchical typography (Titles in Playfair).

---

## 🛍️ PHASE 3: CATALOG EXPERIENCE (DISCOVERY)
*Objective: Seduce through imagery and fluidity of browsing.*

### 3.1 Home Page (Showcase)
*   **Luxury UX/UI**:
    *   **Hero Section**: Full-screen Image/Video with continuous `zoom-subtle` animation (Ken Burns). Centered "Editorial" white title.
    *   **Trending Slider**: Fluid horizontal carousel without visible scrollbar.
*   **API**: `GET /products/trending`.

### 3.2 Product List & Filters
*   **Luxury UX/UI**:
    *   **Grid**: Clean product cards. Image changes on hover (very slow `scale-105`).
    *   **Off-Canvas Filters**: "Glassmorphism" Sidebar sliding from the left. Do not overlay content.
    *   **Appearance**: Each product card arrives with `slide-up` and a slight delay (stagger).
*   **Tech**: `ProductCard.vue` component. Filter management via Query Params.
*   **API**: `GET /products?category=x&color=y`.

---

## 💎 PHASE 4: CONVERSION & CHECKOUT
*Objective: Reassure and convert with a friction-free UX.*

### 4.1 Product Detail
*   **Luxury UX/UI**:
    *   Layout: Sticky image gallery on the left, fixed product info on the right.
    *   Titles: Product name in `Playfair Display`, Price in `Inter` Bold.
    *   **Size Guide**: Modal in `gl-black-glass` overlay (dark) centered.
*   **Tech**: `ProductDetail.vue`.
*   **Store**: `cartStore` for addition without page reload.

### 4.2 Side Cart (Drawer)
*   **Luxury UX/UI**: Sliding drawer from the right. Pure white background. Massive black action buttons.
*   **Function**: Real-time quantity modification.
*   **Tech**: `CartDrawer.vue` (Global state `isCartOpen`).

### 4.3 Payment Tunnel (Checkout)
*   **Luxury UX/UI**:
    *   Step-by-step process (Shipping > Payment).
    *   Clean "border-bottom" only style forms.
*   **Tech**: Stripe Elements integration (or API simulation).
*   **API**: `POST /orders`.

---

## 👤 PHASE 5: CLIENT AREA & ADMIN
*Objective: Retain and Manage.*

### 5.1 Classy Authentication
*   **Luxury UX/UI**:
    *   Login/Register pages centered on blurred image background (`brightness-50`).
    *   White form in the center.
*   **API**: `POST /auth/login` (JWT Token).

### 5.2 Client Area (Dashboard)
*   **Luxury UX/UI**:
    *   Minimalist dashboard. List of orders with discrete colored status (badge).
*   **API**: `GET /users/me/orders`.

### 5.3 Admin Dashboard (Back-office)
*   **Luxury UX/UI**:
    *   Sober, "Data-first" interface.
    *   Product management tables with quick actions (Edit/Delete).
*   **API**: Full CRUD on `/admin/products`.

---

**Note to CTO:** Compliance with `tailwind.config.js` is non-negotiable. Developers must use `gl-*` utility classes for colors and respect defined animation timings (minimum `duration-700` for major transitions).
