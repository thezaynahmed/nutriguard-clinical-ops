/**
 * API Types for Clinical Food Analysis
 */

export interface FoodAnalysisResponse {
  food_name: string;
  calories: number;
  confidence_score: number;
  model_version: string;
  requires_human_review: boolean;
}

export interface FoodAnalysisRequest {
  image_base64?: string;
  food_description?: string;
}

export interface ApiError {
  error: string;
  message?: string;
  details?: Array<{
    loc: string[];
    msg: string;
    type: string;
  }>;
}
