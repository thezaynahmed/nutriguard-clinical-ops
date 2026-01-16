"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-slate-950 border-t border-white/10 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                    <div>
                        <h4 className="font-semibold text-white mb-6">Product</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href="/#platform" className="hover:text-blue-400 transition-colors">Platform</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Integrations</Link></li>
                            <li><Link href="/#security" className="hover:text-blue-400 transition-colors">Security</Link></li>
                            <li><Link href="/#api" className="hover:text-blue-400 transition-colors">API</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-6">Company</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">About</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Contact</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Blog</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-6">Legal</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Privacy</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Terms</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">BAA</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Compliance</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-6">Resources</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Documentation</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Clinical Trials</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Case Studies</Link></li>
                            <li><Link href="#" className="hover:text-blue-400 transition-colors">Support</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-blue-500" />
                        <span className="font-bold text-white">NutriGuard</span>
                        <span className="mx-2">·</span>
                        <span>© 2026 All rights reserved.</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span>Systems Operational (North America)</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}