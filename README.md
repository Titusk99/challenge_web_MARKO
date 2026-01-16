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
   git clone https://github.com/Titusk99/challenge_web_MARKO.git
   cd challenge_web_MARKO
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Application**
   ```bash
   npm start
   ```
   This command will:
   - Start the Docker containers (Backend + DB).
   - Start the Frontend development server at `http://localhost:5173`.
   - The Backend API will be available at `http://localhost:8000`.

## Project Structure

- `/src`: Vue 3 Frontend source code
- `/backend`: FastAPI Backend source code
- `docker-compose.yml`: Docker orchestration configuration

## Documentation

- `STEP.md`: Detailed reconstruction guide and phases.
- `FEATURES.md`: List of features and design system specifications.
- `DATABASE.md`: Database schema and ERD.
