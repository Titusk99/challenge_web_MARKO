# MARKO - Available Features

This document provides a comprehensive list of the features currently implemented and available in the MARKO Luxury Retail application.

## 1. Authentication & Security
- **User Registration**: Create a new account with email, password, and full name.
- **Login**: Secure JWT-based authentication.
- **Role-Based Access**: Specialized access for 'Admin' vs 'Client' users.
- **Protected Routes**: Redirects unauthorized users from protected pages (e.g., Admin Dashboard, Checkout).
- **Auto-Login**: Automatic login upon successful registration.

## 2. Global Navigation (Navbar)
- **Mega Menu**: Hover-based navigation for major categories (Women, Men, Accessories).
- **Search Bar**: Integrated search functionality (desktop & mobile) redirecting to filtered product results.
- **Real-Time Cart Badge**: Dynamic counter showing the number of items in the cart.
- **User Menu**: Quick access to Profile, Admin Dashboard (if applicable), or Login/Logout.
- **Responsive Design**: Mobile-optimized hamburger menu.

## 3. Product Catalog
- **Product Listing**: Responsive grid layout displaying product images, names, brands, and prices.
- **Filtering**: Filter products by Category (e.g., Bags, Shoes) and Gender.
- **Trending Products**: Homepage section displaying dynamically fetched trending items.
- **Stock Status**: Visual indicators for product availability.

## 4. Product Details
- **Image Gallery**: High-quality product image display.
- **Variant Selection**: Select available sizes/variants.
- **Stock Validation**: "Add to Cart" disabled if size/stock is unavailable.
- **Size Guide**: Interactive modal displaying measurement charts.
- **Favorites**: Toggle "Heart" icon to save products to a personal wishlist.
- **Rich Information**: Detailed descriptions, delivery info, and secure payment assurances.

## 5. Shopping Cart
- **Slide-Over Drawer**: Non-intrusive cart view accessible from any page.
- **Item Management**:
    - Adjust quantities (+/-).
    - Remove items.
- **Real-Time Totals**: Automatic calculation of Subtotal and Shipping costs.
- **Shipping Thresholds**: Dynamic free shipping calculation (e.g., "Free shipping over $200").

## 6. Checkout & Payment
- **Multi-Step Flow**: Clear, step-by-step process (Shipping -> Payment).
- **Address Management**:
    - **Select Saved Address**: Choose from previously used addresses.
    - **Add New Address**: Enter a new address which is **automatically saved** to your profile.
- **Payment Integration**:
    - Simulated Stripe Payment Intent flow.
    - Secure form UI for credit card entry.
    - Order Confirmation/Success page upon completion.

## 7. User Dashboard (Client Area)
- **Profile Management**: Update Full Name, Email, and Password.
- **Order History**: View a list of past orders with status (Paid, Pending), dates, and totals.
- **Address Book**: Manage saved shipping addresses (View, Delete).
- **Favorites**: dedicated tab to view and manage favorited products.

## 8. Admin Dashboard
- **Product Management**:
    - **List View**: formatted table of all products with status and price.
    - **Create Product**: Modal form to add new items.
    - **Edit Product**: Update details (Price, Description, etc.).
    - **Delete Product**: Remove items from the catalog.
- **Stock Management**:
    - **Variant Control**: Detailed modal to adjust stock levels for specific sizes (e.g., S, M, L).
- **Security**: Route guards ensure only users with 'admin' role can access this area.

---

## Design System "Luxury Retail"

The application follows a strict "Luxury" design system.

### Colors
*   **Brand**:
    *   `gl-black`: #000000 (Primary)
    *   `gl-red`: #E2001A (Accents)
    *   `gl-gray`: #F4F4F4 (Backgrounds)
*   **UI Elements**:
    *   `gl-white-glass`: Frosted glass effect for headers/modals.

### Typography
*   **Headings**: `Playfair Display` (Serif) - Used for titles and elegance.
*   **Body**: `Inter` (Sans-serif) - Used for readability and UI elements.

### Animations
*   Subtle fade-ins and slide-ups for a premium feel.
*   Micro-interactions on buttons and links (hover effects).
