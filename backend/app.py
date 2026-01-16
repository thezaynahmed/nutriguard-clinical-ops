"""
Clinical Food Analysis API

A production-ready Flask application for AI-powered food analysis
in clinical/healthcare settings.
"""

import time
import random
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from pydantic import ValidationError

from models import FoodAnalysisResponse, FoodAnalysisRequest


# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
MODEL_VERSION = "nutriguard-v1.2.0"
MOCK_FOOD_DATABASE = [
    {"name": "Grilled Chicken Breast", "calories": 165},
    {"name": "Caesar Salad", "calories": 220},
    {"name": "Apple", "calories": 95},
    {"name": "Brown Rice Bowl", "calories": 340},
    {"name": "Salmon Fillet", "calories": 280},
    {"name": "Vegetable Soup", "calories": 120},
    {"name": "Greek Yogurt", "calories": 150},
    {"name": "Quinoa Salad", "calories": 180},
]


def simulate_ai_analysis() -> dict:
    """
    Simulate AI model inference with realistic latency.
    
    In production, this would call the actual ML model.
    For testing, returns randomized mock data.
    
    Returns:
        dict: Mock analysis results with food name, calories, and confidence.
    """
    # Simulate AI model inference latency
    time.sleep(1.0)
    
    # Select random food from mock database
    food = random.choice(MOCK_FOOD_DATABASE)
    
    # Generate random confidence score between 0.70 and 0.99
    # This range ensures we test both "Safe" (>= 0.85) and "Unsafe" (< 0.85) scenarios
    confidence = round(random.uniform(0.70, 0.99), 4)
    
    return {
        "food_name": food["name"],
        "calories": food["calories"],
        "confidence_score": confidence,
    }


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint for container orchestration."""
    return jsonify({
        "status": "healthy",
        "model_version": MODEL_VERSION
    }), 200


@app.route('/analyze', methods=['POST'])
def analyze_food():
    """
    Analyze food from image or description.
    
    POST /analyze
    
    Request Body (JSON):
        - image_base64 (optional): Base64 encoded image data
        - food_description (optional): Text description of the food
    
    Response (JSON):
        - food_name: Identified food name
        - calories: Estimated caloric content
        - confidence_score: Model confidence (0.0 - 1.0)
        - model_version: AI model version used
        - requires_human_review: True if confidence < 0.85
    
    Returns:
        JSON response with analysis results or error details.
    """
    try:
        # Parse and validate request
        request_data = request.get_json() or {}
        food_request = FoodAnalysisRequest(**request_data)
        
        logger.info(f"Received analysis request: {food_request.model_dump()}")
        
        # Perform AI analysis (mocked)
        analysis_result = simulate_ai_analysis()
        
        # Build response using Pydantic model
        # The model_validator will automatically set requires_human_review
        response = FoodAnalysisResponse(
            food_name=analysis_result["food_name"],
            calories=analysis_result["calories"],
            confidence_score=analysis_result["confidence_score"],
            model_version=MODEL_VERSION,
            requires_human_review=False  # Will be auto-set by validator if needed
        )
        
        # Log result with review status
        review_status = "REQUIRES REVIEW" if response.requires_human_review else "SAFE"
        logger.info(
            f"Analysis complete: {response.food_name} | "
            f"Confidence: {response.confidence_score:.2%} | "
            f"Status: {review_status}"
        )
        
        return jsonify(response.model_dump()), 200
        
    except ValidationError as e:
        logger.error(f"Validation error: {e}")
        return jsonify({
            "error": "Validation Error",
            "details": e.errors()
        }), 422
        
    except Exception as e:
        logger.exception(f"Unexpected error during analysis: {e}")
        return jsonify({
            "error": "Internal Server Error",
            "message": "An unexpected error occurred during analysis"
        }), 500


# Mock scan database for live feed
MOCK_SCANS = [
    {"patient_id": "PT-8821", "food": "Sockeye Salmon", "confidence": 0.991},
    {"patient_id": "PT-9932", "food": "Unknown Mixed Bowl", "confidence": 0.724},
    {"patient_id": "SickKids-004", "food": "Quinoa Salad", "confidence": 0.968},
    {"patient_id": "PT-7714", "food": "Grilled Chicken Breast", "confidence": 0.975},
    {"patient_id": "PT-6623", "food": "Mixed Vegetable Stir-fry", "confidence": 0.942},
    {"patient_id": "SickKids-012", "food": "Blended Smoothie", "confidence": 0.812},
]


def generate_relative_timestamp(minutes_ago: int) -> str:
    """Generate a human-readable relative timestamp."""
    if minutes_ago == 0:
        return "Just now"
    elif minutes_ago == 1:
        return "1 min ago"
    else:
        return f"{minutes_ago} mins ago"


@app.route('/feed', methods=['GET'])
def get_live_feed():
    """
    Get live ingestion feed data for the dashboard.
    
    GET /feed
    
    Response (JSON):
        - scans: List of scan objects with patient_id, food, confidence, timestamp, status
        - total: Total number of scans
        - flagged_count: Number of items requiring review
    
    Returns:
        JSON response with shuffled scan data.
    """
    try:
        # Shuffle scans to simulate live feed
        shuffled_scans = random.sample(MOCK_SCANS, len(MOCK_SCANS))
        
        # Build response with dynamic timestamps and status
        scans = []
        flagged_count = 0
        
        for i, scan in enumerate(shuffled_scans):
            # Generate dynamic timestamp (0-10 mins ago)
            minutes_ago = i * 2  # 0, 2, 4, 6, 8, 10 mins ago
            
            # Determine status based on confidence threshold
            is_flagged = scan["confidence"] < 0.85
            if is_flagged:
                flagged_count += 1
            
            scans.append({
                "id": f"scan-{i+1}",
                "patient_id": scan["patient_id"],
                "food": scan["food"],
                "confidence": scan["confidence"],
                "timestamp": generate_relative_timestamp(minutes_ago),
                "status": "flagged" if is_flagged else "verified",
                "requires_review": is_flagged,
            })
        
        logger.info(f"Feed requested: {len(scans)} scans, {flagged_count} flagged")
        
        return jsonify({
            "scans": scans,
            "total": len(scans),
            "flagged_count": flagged_count,
            "model_version": MODEL_VERSION,
        }), 200
        
    except Exception as e:
        logger.exception(f"Error generating feed: {e}")
        return jsonify({
            "error": "Internal Server Error",
            "message": "Failed to generate feed data"
        }), 500


# =============================================================================
# ML EVALUATION & FEEDBACK LOOP
# =============================================================================

# In-memory "Feedback Database" for evaluation logs
# In production, this would be PostgreSQL/BigQuery for persistence
EVALUATION_LOGS = []


@app.route('/feedback', methods=['POST'])
def submit_feedback():
    """
    Submit clinician feedback for model evaluation.
    
    POST /feedback
    
    Request Body (JSON):
        - scan_id (str): The ID of the scan being evaluated
        - is_correct (bool): Whether the model prediction was correct
        - actual_food (str): The actual food item (ground truth)
    
    Returns:
        JSON response confirming feedback submission.
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        # Validate required fields
        required_fields = ['scan_id', 'is_correct', 'actual_food']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Create feedback entry with timestamp
        feedback_entry = {
            "scan_id": data['scan_id'],
            "is_correct": bool(data['is_correct']),
            "actual_food": data['actual_food'],
            "timestamp": time.time(),
        }
        
        EVALUATION_LOGS.append(feedback_entry)
        
        logger.info(
            f"Feedback received: scan={data['scan_id']} | "
            f"correct={data['is_correct']} | actual={data['actual_food']}"
        )
        
        return jsonify({
            "status": "success",
            "message": "Feedback recorded successfully",
            "total_feedback_count": len(EVALUATION_LOGS),
        }), 201
        
    except Exception as e:
        logger.exception(f"Error processing feedback: {e}")
        return jsonify({
            "error": "Internal Server Error",
            "message": "Failed to process feedback"
        }), 500


@app.route('/metrics', methods=['GET'])
def get_metrics():
    """
    Get real-time model evaluation metrics.
    
    GET /metrics
    
    Response (JSON):
        - precision (float): Proportion of correct predictions (0.0 - 1.0)
        - sample_size (int): Number of feedback samples collected
        - drift_status (str): "Stable" or "Drift Detected"
        - model_version (str): Current model version
    
    Drift Detection Logic:
        - If precision < 0.85, drift is detected (model needs retraining)
        - If no feedback data, defaults to 0.92 precision (baseline)
    
    Returns:
        JSON response with evaluation metrics.
    """
    try:
        sample_size = len(EVALUATION_LOGS)
        
        if sample_size == 0:
            # Default baseline when no feedback has been collected
            precision = 0.92
        else:
            # Calculate precision: correct predictions / total feedback
            correct_count = sum(1 for entry in EVALUATION_LOGS if entry['is_correct'])
            precision = round(correct_count / sample_size, 4)
        
        # Drift detection threshold
        DRIFT_THRESHOLD = 0.85
        drift_status = "Drift Detected" if precision < DRIFT_THRESHOLD else "Stable"
        
        logger.info(
            f"Metrics requested: precision={precision:.2%} | "
            f"samples={sample_size} | drift={drift_status}"
        )
        
        return jsonify({
            "precision": precision,
            "sample_size": sample_size,
            "drift_status": drift_status,
            "model_version": MODEL_VERSION,
            "drift_threshold": DRIFT_THRESHOLD,
        }), 200
        
    except Exception as e:
        logger.exception(f"Error calculating metrics: {e}")
        return jsonify({
            "error": "Internal Server Error",
            "message": "Failed to calculate metrics"
        }), 500


# =============================================================================
# ERROR HANDLERS
# =============================================================================

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors."""
    return jsonify({
        "error": "Not Found",
        "message": "The requested resource was not found"
    }), 404


@app.errorhandler(405)
def method_not_allowed(error):
    """Handle 405 errors."""
    return jsonify({
        "error": "Method Not Allowed",
        "message": "The method is not allowed for this endpoint"
    }), 405


if __name__ == '__main__':
    # Development server only - use Gunicorn in production
    app.run(host='0.0.0.0', port=5000, debug=True)
