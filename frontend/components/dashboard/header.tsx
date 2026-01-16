"use client";

import * as React from "react";
import { useSession, signOut } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User, Settings } from "lucide-react";

export function DashboardHeader() {
    const { data: session } = useSession();

    return (
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo & Brand */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/25">
                            <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                                />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-slate-800 tracking-tight">
                                NutriGuard
                            </h1>
                            <p className="text-xs text-slate-500">
                                Clinical Nutrition Analysis
                            </p>
                        </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-6">
                        {/* System Status */}
                        <div className="hidden md:flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-sm text-slate-600">System Online</span>
                        </div>

                        <div className="hidden md:block h-8 w-px bg-slate-200" />

                        {/* Date */}
                        <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span className="font-mono">
                                {new Date().toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </span>
                        </div>

                        {/* User Profile Dropdown */}
                        {session?.user && (
                            <>
                                <div className="h-8 w-px bg-slate-200" />
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1 pr-3 rounded-full transition-colors border border-transparent hover:border-slate-200">
                                            <Avatar className="h-8 w-8 border border-slate-200">
                                                <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
                                                <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
                                                    {session.user.name?.charAt(0) || "U"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="hidden lg:block text-left">
                                                <p className="text-sm font-medium text-slate-700 leading-none max-w-[150px] truncate">{session.user.name}</p>
                                            </div>
                                            <Settings className="w-4 h-4 text-slate-400" />
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">{session.user.name}</p>
                                                <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="cursor-pointer">
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
