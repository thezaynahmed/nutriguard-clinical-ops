#!/bin/bash
echo "🥗 Starting NutriGuard Backend on port 5001..."

# Activate virtual environment if it exists
if [ -d ".venv" ]; then
    source .venv/bin/activate
fi

cd backend
# Check if dependencies are installed, if not, install them silently
python3 -c "import flask" 2>/dev/null || pip install -r requirements.txt

# Run the app
python3 -c "from app import app; app.run(port=5001)"
