"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";

export function NewAnalysisDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsAnalyzing(false);
        setIsOpen(false);
        // Ideally trigger a refresh of the dashboard here
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20">
                    <Plus className="w-4 h-4 mr-2" />
                    New Analysis
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>New Food Analysis</DialogTitle>
                    <DialogDescription>
                        Upload a food image to analyze nutritional content and allergens.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div
                        className={`
                border-2 border-dashed rounded-xl p-8 text-center transition-colors
                ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'}
            `}
                        onDragEnter={() => setDragActive(true)}
                        onDragLeave={() => setDragActive(false)}
                    >
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Plus className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-slate-700">
                            Drag and drop your image here
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                            or click to browse from your computer
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button onClick={handleAnalyze} disabled={isAnalyzing} className="bg-blue-600 hover:bg-blue-700">
                        {isAnalyzing ? "Analyzing..." : "Start Analysis"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
