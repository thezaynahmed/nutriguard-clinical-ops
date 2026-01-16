"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ConfidenceMeter } from "@/components/ui/confidence-meter";
import { FoodAnalysisResponse } from "@/types/api";
import { cn } from "@/lib/utils";

interface AnalysisCardProps {
    data: FoodAnalysisResponse;
    className?: string;
}

export function AnalysisCard({ data, className }: AnalysisCardProps) {
    const isVerified = data.confidence_score >= 0.85;

    return (
        <Card
            className={cn(
                "overflow-hidden transition-all duration-300",
                isVerified
                    ? "border-emerald-200 shadow-emerald-100/50"
                    : "border-amber-200 shadow-amber-100/50",
                "shadow-lg",
                className
            )}
        >
            {/* Status Header Bar */}
            <div
                className={cn(
                    "h-1.5 w-full",
                    isVerified
                        ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                        : "bg-gradient-to-r from-amber-400 to-amber-500"
                )}
            />

            <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-xl font-semibold text-slate-800">
                            Analysis Result
                        </CardTitle>
                        <p className="text-sm text-slate-500 mt-1">
                            AI-powered nutritional assessment
                        </p>
                    </div>
                    <Badge
                        variant="outline"
                        className="text-xs font-mono bg-slate-50 text-slate-600 border-slate-200"
                    >
                        {data.model_version}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Food Information */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Food Identified
                        </label>
                        <p className="text-lg font-semibold text-slate-800">
                            {data.food_name}
                        </p>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Calories
                        </label>
                        <p className="text-lg font-semibold text-slate-800">
                            {data.calories}{" "}
                            <span className="text-sm font-normal text-slate-500">kcal</span>
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100" />

                {/* Confidence Meter */}
                <ConfidenceMeter
                    score={data.confidence_score}
                    requiresReview={data.requires_human_review}
                />
            </CardContent>
        </Card>
    );
}
