"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ConfidenceMeterProps {
    score: number;
    requiresReview: boolean;
    className?: string;
    showLabel?: boolean;
}

const CONFIDENCE_THRESHOLD = 0.85;

export function ConfidenceMeter({
    score,
    requiresReview,
    className,
    showLabel = true,
}: ConfidenceMeterProps) {
    const percentage = Math.round(score * 100);
    const isVerified = score >= CONFIDENCE_THRESHOLD;

    return (
        <div className={cn("space-y-3", className)}>
            {showLabel && (
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">
                        AI Confidence Level
                    </span>
                    <Badge
                        className={cn(
                            "text-xs font-semibold px-3 py-1 transition-all duration-300",
                            isVerified
                                ? "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                                : "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100"
                        )}
                    >
                        {isVerified ? (
                            <>
                                <svg
                                    className="w-3.5 h-3.5 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                Verified
                            </>
                        ) : (
                            <>
                                <svg
                                    className="w-3.5 h-3.5 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                    />
                                </svg>
                                Review Needed
                            </>
                        )}
                    </Badge>
                </div>
            )}

            {/* Progress Bar */}
            <div className="relative">
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 border border-slate-200">
                    <div
                        className={cn(
                            "h-full rounded-full transition-all duration-700 ease-out",
                            isVerified
                                ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                                : "bg-gradient-to-r from-amber-400 to-amber-500"
                        )}
                        style={{ width: `${percentage}%` }}
                    />
                </div>

                {/* Threshold Indicator */}
                <div
                    className="absolute top-0 bottom-0 w-0.5 bg-slate-400"
                    style={{ left: `${CONFIDENCE_THRESHOLD * 100}%` }}
                    title="85% Threshold"
                >
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 font-medium whitespace-nowrap">
                        85%
                    </div>
                </div>
            </div>

            {/* Score Display */}
            <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Score</span>
                <span
                    className={cn(
                        "font-bold text-lg tabular-nums",
                        isVerified ? "text-emerald-600" : "text-amber-600"
                    )}
                >
                    {percentage}%
                </span>
            </div>

            {/* Review Warning */}
            {requiresReview && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
                    <svg
                        className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m0 4.5v.008m-9.303-4.883c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z"
                        />
                    </svg>
                    <div>
                        <p className="text-sm font-medium text-amber-800">
                            Clinical Review Required
                        </p>
                        <p className="text-xs text-amber-600 mt-0.5">
                            Confidence below 85% threshold. Manual verification recommended
                            before use in clinical decision-making.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
