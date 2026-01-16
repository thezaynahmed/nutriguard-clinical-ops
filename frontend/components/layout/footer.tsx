import { Shield } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <Shield className="w-5 h-5 text-blue-500" />
                            <span className="font-bold text-white">NutriGuard</span>
                        </div>
                        <p className="text-sm text-slate-500">
                            Precision nutrition analysis for the modern clinical workflow.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-blue-400">Features</a></li>
                            <li><a href="#" className="hover:text-blue-400">Clinical Data</a></li>
                            <li><a href="#" className="hover:text-blue-400">Security</a></li>
                            <li><a href="#" className="hover:text-blue-400">API</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-blue-400">About</a></li>
                            <li><a href="#" className="hover:text-blue-400">Careers</a></li>
                            <li><a href="#" className="hover:text-blue-400">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-blue-400">Privacy</a></li>
                            <li><a href="#" className="hover:text-blue-400">Terms</a></li>
                            <li><a href="#" className="hover:text-blue-400">BAA</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600">
                    <p>© 2026 NutriGuard Inc. All rights reserved.</p>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-slate-400 text-xs font-medium">Powered by Vertex AI</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
