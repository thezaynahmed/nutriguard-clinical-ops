"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ShieldAlert, Users, Zap } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
    { value: 40 },
    { value: 30 },
    { value: 45 },
    { value: 80 },
    { value: 55 },
    { value: 90 },
    { value: 65 },
    { value: 75 },
    { value: 60 },
    { value: 90 },
];

const data2 = [
    { value: 85 },
    { value: 70 },
    { value: 92 },
    { value: 65 },
    { value: 80 },
    { value: 85 },
    { value: 90 },
    { value: 80 },
    { value: 95 },
    { value: 92 },
];

function Sparkline({ color = "#3b82f6", dataSet = data }: { color?: string, dataSet?: typeof data }) {
    return (
        <div className="h-[40px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataSet}>
                    <Tooltip
                        contentStyle={{ background: "transparent", border: "none", boxShadow: "none" }}
                        itemStyle={{ display: "none" }}
                        cursor={false}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export function DashboardStats() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Scans Today
                    </CardTitle>
                    <Activity className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">142</div>
                    <p className="text-xs text-muted-foreground mb-1">+12% from yesterday</p>
                    <Sparkline color="#3b82f6" />
                </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Avg. Confidence Score
                    </CardTitle>
                    <ShieldAlert className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-emerald-600">92.4%</div>
                    <p className="text-xs text-muted-foreground mb-1">+2.1% improvement</p>
                    <Sparkline color="#10b981" dataSet={data2} />
                </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                {/* Subtle red tint for attention */}
                <div className="absolute top-0 right-0 p-2 opacity-10">
                    <ShieldAlert className="w-24 h-24 text-red-500" />
                </div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Flagged for Review
                    </CardTitle>
                    <ShieldAlert className="h-4 w-4 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-amber-600">23</div>
                    <p className="text-xs text-muted-foreground mb-1">Requires attention</p>
                    <div className="h-1 w-full bg-slate-100 rounded-full mt-4 overflow-hidden">
                        <div className="h-full bg-amber-500 w-[45%]" />
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        Avg. Latency
                    </CardTitle>
                    <Zap className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1.2s</div>
                    <p className="text-xs text-muted-foreground mb-1">-0.3s from last hour</p>
                    <Sparkline color="#a855f7" />
                </CardContent>
            </Card>
        </div>
    );
}
