# MARKO SITE FEATURES

This document lists all features available on the website, page by page, as well as the specifications of the "Luxury Retail" design system.

# BASIC INFORMATION
Company: MARKO
Website Name: MARKO

# CONTEXT
Project Context: E-commerce web app, specializing in branded textile sales

# PROJECT VISION
Objective: Create a platform for selling branded textiles
Target Audience: Consumers of branded textiles
Problem Solved: Make buying branded textiles simple and intuitive with numerous brands

## Technical Stack

### Frontend (Luxury Edition)
*   **Core**: Vue 3 (Composition API) + Vite
*   **Styling**: Tailwind CSS (v3) + Design System "Luxury"
*   **State Management**: Pinia (Stores: Auth, Cart, Favorites, Toast)
*   **Routing**: Vue Router 4
*   **Animations**: VueUse Motion / GSAP
*   **Icons**: Lucide-vue / Heroicons

### Backend & Data
*   **API**: FastAPI (Python)
*   **Database**: PostgreSQL
*   **Payment**: Stripe API (Simulation)


## Global Navigation (Navbar)
*   **Top Bar**: Display promotions (e.g., Free Shipping).
*   **Logo**: Return to homepage.
*   **Search**:
    *   Text search bar (Desktop & Mobile).
*   **Main Menu (Mega Menu)**:
    *   Navigation by categories (Women, Men, Beauty, Home).
    *   Detailed sub-categories on hover.
    *   Visual highlight ("New Collection" Image).
    *   "Sales" link (Promotions).
*   **User Menu**:
    *   Connection indicator (Login / Account / Admin).
    *   Dropdown menu or redirect to profile/login.
*   **Cart**:
    *   Icon with direct access to cart page.
*   **Mobile Menu**:
    *   Hamburger menu for category access on mobile.

## Homepage (Home)
*   **Hero Banner**: Large visual banner with call-to-actions (Shop Women / Shop Men).
*   **Promotional Grid**: Visual shortcuts to Women and Men collections.
*   **"Trending Now" Section**:
    *   Display of popular products.
    *   Links to full product list.

## Product List (Product List)
*   **Breadcrumbs**: Hierarchical navigation (e.g., Home / Women).
*   **Sidebar Filters**:
    *   By Category (T-Shirts, Jackets, Accessories, Shoes).
    *   By Price (Price ranges).
*   **Sorting & Display**:
    *   Count of displayed products.
    *   Product sorting (New Arrivals, Price Low to High, Price High to Low).
*   **Product Grid**: Display of product cards.

## Product Detail (Product Detail)
*   **Product Information**:
    *   Image gallery.
    *   Name, Reference, Price (with promotion/discount handling).
    *   Detailed description.
*   **Selection**:
    *   Dynamic size selector.
    *   "Out of Stock" indication for unavailable sizes.
    *   **Size Guide**: Interactive modal with measurement table.
*   **Actions**:
    *   Add to cart (disabled if size not selected).
    *   Add to favorites (Toggle).
*   **Additional Information**:
    *   "Delivery & Returns" accordion.
*   **Customer Reviews**:
    *   List of reviews with rating (stars) and comments.

## Cart (Cart)
*   **Item List**:
    *   Full display (Image, Name, Price, Size, Ref).
    *   Quantity modification (+/-).
    *   Item removal.
*   **Empty State**: Message and button to continue shopping if cart is empty.
*   **Order Summary**:
    *   Subtotal calculation.
    *   Shipping costs (Free/Calculated).
    *   Global total.
*   **Action**: Validation button (Checkout).

## Checkout (Checkout)
*   **Shipping Form**: Name, Email, Address, City, Zip Code.
*   **Payment Form**: Credit card, Expiration, CVC.
*   **Order Summary**: Reminder of items and total.
*   **Validation**: Payment button (with simulated API wait).

## User Account (Profile)
*   **Dashboard**:
    *   Tab navigation (Profile, Orders, Addresses, Payment).
    *   Sign Out.
*   **Profile Info**: View Name, Email, Registration Date.
*   **Order History**:
    *   List of past orders.
    *   Details (ID, Date, Total, Status, Items).
*   **Address Book**: Shipping address modification form.
*   **Payment Methods**:
    *   Display of saved card.
    *   Add new card.

## Administration (Admin)
*   **Product Management**:
    *   Tabular list of products (Name, Price, Stock).
    *   "Add Product" button.
    *   Actions: Edit, Delete.

## Authentication
*   **Login**: User connection.
*   **Register**: Account creation.

## Footer (Footer)
*   *Standard navigation features and legal links (to be confirmed based on implementation).*

---

## Design System & Style Guide "Luxury Retail"

This design system defines the visual identity for all modules listed above.

### Colors
*   **Brand**
    *   `gl-black`: #000000 (Main text, primary buttons)
    *   `gl-red`: #E2001A (Accents, errors, sales, logo dot)
    *   `gl-gray`: #F4F4F4 (Subtle backgrounds, inputs)
    *   `gl-dark-gray`: #333333 (Secondary text)
*   **Utility Luxury**
    *   `gl-white-glass`: rgba(255, 255, 255, 0.9) (Clear blurred backgrounds, premium)
    *   `gl-black-glass`: rgba(0, 0, 0, 0.9) (Dark blurred backgrounds)

### Typography
*   **Sans-serif (Body)**: `Inter` (Reading, UI, Buttons)
*   **Serif (Editorial)**: `Playfair Display` (Section titles, Quotes, Marketing)

### Grid & Container
*   **Container**: Centered, padding 2rem.
*   **Max-width**: 1400px (2xl).

### Animations "Editorial"
These animations must be subtle and fluid, reinforcing the sense of quality.

*   `fade-in`: Opacity 0 -> 1 (0.8s ease-out). For soft page appearance.
*   `slide-up`: Slight rise of 15px + Fade In (0.8s ease-out). For list items and product cards.
*   `slide-down`: Slight descent of 15px (0.3s ease-out). For menus and dropdowns.
*   `zoom-subtle`: Very slow and progressive zoom (Scale 1 -> 1.05 over 20s). For background images (Hero Banner).

---
