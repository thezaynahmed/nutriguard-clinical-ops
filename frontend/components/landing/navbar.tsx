"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl transition-all duration-300"
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Left: Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <ShieldCheck className="w-7 h-7 text-blue-500 fill-blue-500/10 group-hover:scale-110 transition-transform" />
                    <span className="text-xl font-bold text-white tracking-tight">NutriGuard</span>
                </Link>

                {/* Center: Links */}
                <div className="hidden md:flex items-center gap-8">
                    {["Platform", "Clinical Data", "Security", "API"].map((item) => (
                        <Link
                            key={item}
                            href={`/#${item.toLowerCase().replace(" ", "-")}`}
                            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Right: Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <Link href="/login">
                        <Button variant="ghost" className="text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5">
                            Login
                        </Button>
                    </Link>
                    <Link href="/book-demo">
                        <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-6 py-2 text-sm font-medium shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all hover:scale-105">
                            Book Demo
                        </Button>
                    </Link>
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
                            {["Platform", "Clinical Data", "Security", "API"].map((item) => (
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
                            <span className="text-sm font-medium text-blue-500">Book Demo</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};
