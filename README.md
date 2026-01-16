# MARKO - Luxury Retail E-Commerce

## Project Overview

MARKO is a high-end e-commerce platform specializing in branded textiles. This project uses a modern stack with Vue 3 for the frontend and FastAPI for the backend, orchestrated via Docker.

## Technical Stack

- **Frontend**: Vue 3, Vite, Pinia, Tailwind CSS (Luxury Design System)
- **Backend**: FastAPI, SQLAlchemy, Pydantic
- **Database**: PostgreSQL
- **Infrastructure**: Docker & Docker Compose

## Getting Started

### Prerequisites

- Docker & Docker Compose
- Node.js (for local frontend development if needed)
- Git

### Installation & Running

1. **Clone the repository**

   ```bash
   git clone https://github.com/Titusk99/challenge_web_MARKO.git
   cd challenge_web_MARKO
   ```

2. **Start the Application (Backend + DB)**

   ```bash
   docker compose up -d --build
   ```

   - The Backend API will be available at `http://localhost:8000`.
   - The Database will be running on port `5432`.

3. **Frontend Setup**
   ```bash
   npm install
   npm run dev
   ```
   - The Frontend will be available at `http://localhost:5173`.

## Project Structure

- `/src`: Vue 3 Frontend source code
- `/backend`: FastAPI Backend source code
- `docker-compose.yml`: Docker orchestration configuration

## 🚀 Site Tour & Functionality Guide

Here is a quick guide to explore the main features of MARKO:

### 👤 Customer Journey
1.  **Browse Products**: Use the **Mega Menu** (hover over Women/Men) or the **Search Bar** to find products.
2.  **Product Details**: Click on a product to view images, select sizes, and check the **Size Guide**.
3.  **Favorites**: Create an account to save items to your **Favorites** (Heart icon).
4.  **Cart & Checkout**: Add items to the cart and proceed to our **Multi-step Checkout**.
    *   *Note: Payment is simulated. You can use any dummy card data.*
5.  **User Dashboard**: Upon registration, access your profile to view **Order History** and manage **Saved Addresses**.

### 🛠️ Admin Dashboard
To manage the catalog (Products, Stock, Prices), you must log in as an administrator.

**Admin Credentials:**
- **Email**: `admin@admin.com`
- **Password**: `admin`

**Admin Features:**
- **Product Management**: Create, Edit, or Delete products.
- **Stock Control**: Use the "Stock" button to adjust quantities per size/variant.

## Documentation

- `STEP.md`: Detailed reconstruction guide and phases.
- `FEATURES.md`: List of features and design system specifications.
- `DATABASE.md`: Database schema and ERD.

### 📄 Licence
Distributed under the MIT License. See LICENSE for more information.