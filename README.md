# 🥗 NutriGuard

**Clinical Food Analysis & Monitoring System**

NutriGuard is a modern, full-stack application designed for clinical environments to track and analyze patient food intake using AI. It features a real-time clinician dashboard and an automated analysis engine.

## 🏗 Architecture

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Shadcn/UI
- **Features**: 
  - Real-time "Live Feed" of patient scans.
  - Interactive "New Analysis" modal.
  - Responsive dashboards for clinicians.

### Backend
- **Framework**: Flask (Python)
- **Role**: API for AI analysis simulation and live data feed.
- **Key Endpoints**:
  - `POST /analyze`: Food recognition (Mocked AI Model `nutriguard-v1.2.0`).
  - `GET /feed`: Live stream of patient intake data.
  - `GET /metrics`: Model performance monitoring (Drift Detection).

## 🚀 Getting Started

### Prerequisites
- Node.js & npm
- Python 3.10+

### 1. Start the Backend
The backend runs on **port 5001**. We've included a helper script to set up the environment and start the server:

```bash
./start-backend.sh
```

*This will automatically create a virtual environment, install dependencies, and start the Flask app.*

### 2. Start the Frontend
In a new terminal window:

```bash
cd frontend
npm install
npm run dev
```

Visit the app at [http://localhost:3000](http://localhost:3000).

## 🛡 Production Considerations
- **Environment Variables**: ensure `.env.local` is configured in production.
- **Server**: The backend includes `gunicorn.conf.py` for production deployment.
- **Logging**: Structured JSON logging is enabled for observability.
