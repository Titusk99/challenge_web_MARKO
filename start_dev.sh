#!/bin/bash

# Function to check if a port is in use
is_port_in_use() {
    lsof -i :$1 >/dev/null 2>&1
}

# Default port
PORT=8000

# Check if port 8000 is in use
if is_port_in_use $PORT; then
    echo "Port $PORT is in use. Switching to 8001."
    PORT=8001
else
    echo "Port $PORT is free. Using it."
fi

# Export variables for Docker and Vite
export BACKEND_PORT=$PORT
export VITE_API_URL="http://localhost:$PORT"

# Create or update .env.local for Vite to pick up the variable if needed, 
# but exporting it before running npm run dev usually works if we run them in the same shell.
# However, since we run docker and npm separately usually, let's print instructions or run them.

echo "Starting Backend on port $BACKEND_PORT..."
docker compose up -d backend db

echo "Starting Frontend with VITE_API_URL=$VITE_API_URL..."
# We pass the env var directly to the npm command
VITE_API_URL=$VITE_API_URL npm run dev
