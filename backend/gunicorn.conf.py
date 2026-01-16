"""
Gunicorn configuration for Clinical Food Analysis API.

This configuration is optimized for production deployment
with considerations for AI inference latency.
"""

import multiprocessing
import os

# Server socket
bind = os.getenv("GUNICORN_BIND", "0.0.0.0:5000")
backlog = 2048

# Worker processes
# Recommended: 2-4 x $(NUM_CORES)
workers = int(os.getenv("GUNICORN_WORKERS", multiprocessing.cpu_count() * 2 + 1))
worker_class = "sync"  # Use 'gevent' or 'eventlet' for async if needed
worker_connections = 1000
max_requests = 1000  # Restart workers after N requests to prevent memory leaks
max_requests_jitter = 50  # Add randomness to prevent all workers restarting at once

# Timeout configuration
# Extended timeout for AI model inference
timeout = 120
graceful_timeout = 30
keepalive = 5

# Process naming
proc_name = "nutriguard-api"

# Logging
accesslog = "-"  # stdout
errorlog = "-"   # stderr
loglevel = os.getenv("LOG_LEVEL", "info")
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s" %(D)s'

# Security
limit_request_line = 4094
limit_request_fields = 100
limit_request_field_size = 8190

# Server mechanics
daemon = False
pidfile = None
umask = 0
user = None
group = None
tmp_upload_dir = None

# Hook functions
def on_starting(server):
    """Called just before the master process is initialized."""
    pass

def on_reload(server):
    """Called when SIGHUP is received."""
    pass

def worker_int(worker):
    """Called when a worker receives SIGINT or SIGQUIT."""
    pass

def worker_abort(worker):
    """Called when a worker receives SIGABRT."""
    pass
