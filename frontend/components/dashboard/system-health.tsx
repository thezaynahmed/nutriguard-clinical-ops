"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, Database, CheckCircle2 } from "lucide-react";

export function SystemHealth() {
    return (
        <Card className="col-span-1 shadow-sm border-slate-200">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-800">System Health</CardTitle>
                <p className="text-sm text-slate-500">Infrastructure status monitor</p>
            </CardHeader>
            <CardContent className="space-y-6">

                {/* Vertex AI Worker */}
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <Server className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-slate-700">Vertex AI Worker</h4>
                            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                Operational
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 mb-2">Google Cloud Platform • us-central1</p>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[98%]" />
                        </div>
                        <p className="text-[10px] text-right text-slate-400 mt-1">99.9% Uptime</p>
                    </div>
                </div>

                {/* Redis Queue */}
                <div className="flex items-start gap-4">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                        <Database className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-slate-700">Redis Queue</h4>
                            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Healthy
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 mb-2">Job processing latency: 45ms</p>

                        {/* Visual indicator for queue load */}
                        <div className="flex items-center gap-1 mt-2">
                            <div className="h-8 w-1 bg-emerald-400 rounded-full opacity-100"></div>
                            <div className="h-6 w-1 bg-emerald-400 rounded-full opacity-60"></div>
                            <div className="h-4 w-1 bg-emerald-400 rounded-full opacity-40"></div>
                            <div className="h-3 w-1 bg-emerald-400 rounded-full opacity-30"></div>
                            <div className="h-2 w-1 bg-emerald-400 rounded-full opacity-20"></div>
                            <span className="ml-2 text-xs text-slate-400">Load: Low</span>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between text-sm text-slate-600">
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            All systems normal
                        </span>
                        <span className="text-xs text-slate-400">
                            Updated 30s ago
                        </span>
                    </div>
                </div>

            </CardContent>
        </Card>
    );
}
