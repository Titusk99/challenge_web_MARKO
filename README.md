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

### Installation & Running

1. **Clone the repository**

   ```bash
   git clone <repository-url>
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

## Documentation

- `STEP.md`: Detailed reconstruction guide and phases.
- `FEATURES.md`: List of features and design system specifications.
- `DATABASE.md`: Database schema and ERD.
