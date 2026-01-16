# =============================================================================
# Clinical Food Analysis API - Production Dockerfile
# =============================================================================
# Multi-stage build for optimized production image

# -----------------------------------------------------------------------------
# Stage 1: Build dependencies
# -----------------------------------------------------------------------------
FROM python:3.12-slim as builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Create virtual environment
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# -----------------------------------------------------------------------------
# Stage 2: Production runtime
# -----------------------------------------------------------------------------
FROM python:3.12-slim as runtime

# Security: Run as non-root user
RUN groupadd --gid 1000 appgroup && \
    useradd --uid 1000 --gid appgroup --shell /bin/bash --create-home appuser

WORKDIR /app

# Copy virtual environment from builder
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Copy application code
COPY --chown=appuser:appgroup . .

# Switch to non-root user
USER appuser

# Environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    FLASK_APP=app.py \
    FLASK_ENV=production

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:5000/health')" || exit 1

# Run with Gunicorn
# - 4 workers (adjust based on CPU cores: 2-4 x num_cores)
# - 120s timeout for AI inference latency
# - Bind to all interfaces
# Run with Gunicorn
# - Bind to $PORT environment variable (required for Cloud Run)
# - 4 workers (adjust based on CPU cores)
# - 120s timeout
CMD exec gunicorn --bind 0.0.0.0:$PORT --workers 4 --timeout 120 --access-logfile - --error-logfile - --capture-output app:app
