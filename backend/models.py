"""
Pydantic models for the Clinical Food Analysis API.

This module defines the data models used for food analysis responses,
including automatic validation logic for clinical safety thresholds.
"""

from pydantic import BaseModel, field_validator, model_validator
from typing import Self


class FoodAnalysisResponse(BaseModel):
    """
    Response model for food analysis results.
    
    This model represents the output from the AI-powered food analysis system.
    It includes automatic flagging for human review when confidence scores
    fall below clinical safety thresholds.
    
    Attributes:
        food_name: The identified name of the food item.
        calories: Estimated caloric content of the food.
        confidence_score: AI model's confidence in the analysis (0.0 to 1.0).
        model_version: Version identifier of the AI model used.
        requires_human_review: Flag indicating if manual review is needed.
    """
    
    food_name: str
    calories: int
    confidence_score: float
    model_version: str
    requires_human_review: bool = False
    
    @field_validator('confidence_score')
    @classmethod
    def validate_confidence_score(cls, v: float) -> float:
        """Ensure confidence score is within valid range [0.0, 1.0]."""
        if not 0.0 <= v <= 1.0:
            raise ValueError('confidence_score must be between 0.0 and 1.0')
        return v
    
    @field_validator('calories')
    @classmethod
    def validate_calories(cls, v: int) -> int:
        """Ensure calories is a non-negative value."""
        if v < 0:
            raise ValueError('calories must be a non-negative integer')
        return v
    
    @model_validator(mode='after')
    def set_human_review_flag(self) -> Self:
        """
        Automatically flag for human review if confidence is below threshold.
        
        Clinical safety requires human oversight when the AI model's
        confidence score falls below 0.85 (85%).
        """
        if self.confidence_score < 0.85:
            self.requires_human_review = True
        return self


class FoodAnalysisRequest(BaseModel):
    """
    Request model for food analysis.
    
    Attributes:
        image_base64: Base64 encoded image data (optional for mock).
        food_description: Text description of the food item (optional).
    """
    
    image_base64: str | None = None
    food_description: str | None = None
