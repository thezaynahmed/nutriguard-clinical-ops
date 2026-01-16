"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfidenceMeter } from "@/components/ui/confidence-meter"; // Assuming this exists from previous info
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const recentScans = [
    {
        id: "PT-2024-001",
        item: "Grilled Salmon Salad",
        calories: 450,
        confidence: 0.94,
        time: "2 mins ago",
        status: "verified",
    },
    {
        id: "PT-2024-002",
        item: "Vegetable Lasagna",
        calories: 320,
        confidence: 0.78,
        time: "15 mins ago",
        status: "flagged",
    },
    {
        id: "PT-2024-003",
        item: "Chicken Rice Bowl",
        calories: 550,
        confidence: 0.96,
        time: "42 mins ago",
        status: "verified",
    },
    {
        id: "PT-2024-004",
        item: "Unknown Dish #22",
        calories: 0,
        confidence: 0.45,
        time: "1 hour ago",
        status: "flagged",
    },
    {
        id: "PT-2024-005",
        item: "Fruit Mix",
        calories: 120,
        confidence: 0.98,
        time: "2 hours ago",
        status: "verified",
    },
];

export function RecentScans() {
    return (
        <Card className="col-span-1 lg:col-span-2 shadow-sm border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-xl font-bold text-slate-800">Recent Scans</CardTitle>
                    <p className="text-sm text-slate-500 mt-1">Live feed of incoming analysis requests</p>
                </div>
                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-5 h-5 text-slate-400" />
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[120px]">Patient ID</TableHead>
                            <TableHead>Food Item</TableHead>
                            <TableHead>Calories</TableHead>
                            <TableHead className="w-[200px]">Confidence</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentScans.map((scan) => (
                            <TableRow key={scan.id}>
                                <TableCell className="font-medium text-slate-600">
                                    {scan.id}
                                    <div className="text-xs text-slate-400 font-normal">{scan.time}</div>
                                </TableCell>
                                <TableCell>
                                    <span className="font-medium text-slate-800">{scan.item}</span>
                                </TableCell>
                                <TableCell>{scan.calories > 0 ? `${scan.calories} kcal` : "N/A"}</TableCell>
                                <TableCell>
                                    <ConfidenceMeter
                                        score={scan.confidence}
                                        requiresReview={scan.confidence < 0.85}
                                        showLabel={false}
                                        className="w-full max-w-[180px]"
                                    />
                                </TableCell>
                                <TableCell className="text-right">
                                    {scan.status === "verified" ? (
                                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                            Verified
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                            Review
                                        </Badge>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
