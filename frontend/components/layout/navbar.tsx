"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shield, Check, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Shield className="w-6 h-6 text-blue-500" />
                        <Check className="w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth={3} />
                    </div>
                    <span className="text-lg font-bold text-slate-50 tracking-tight">NutriGuard</span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {["Features", "Clinical Data", "Security", "API"].map((item) => (
                        <Link
                            key={item}
                            href={`/#${item.toLowerCase().replace(" ", "-")}`}
                            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-900">
                            Login
                        </Button>
                    </Link>
                    <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-6">
                        Request Demo
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden text-slate-400" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-b border-white/10 bg-slate-950 px-6 py-4 overflow-hidden"
                    >
                        <div className="flex flex-col gap-4">
                            {["Features", "Clinical Data", "Security", "API"].map((item) => (
                                <Link
                                    key={item}
                                    href={`/#${item.toLowerCase().replace(" ", "-")}`}
                                    className="text-sm font-medium text-slate-400 hover:text-white"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item}
                                </Link>
                            ))}
                            <div className="h-px bg-white/10 my-2" />
                            <Link href="/login" onClick={() => setIsOpen(false)}>
                                <span className="text-sm font-medium text-slate-300">Login</span>
                            </Link>
                            <span className="text-sm font-medium text-blue-500">Request Demo</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
