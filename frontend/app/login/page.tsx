"use client"

import { signIn } from "next-auth/react"
import { motion } from "framer-motion"
import { ShieldCheck, Activity, Lock, CheckCircle2, Network } from "lucide-react"
import { useState } from "react"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = () => {
    setIsLoading(true)
    signIn("google", { callbackUrl: "/dashboard" })
  }

  return (
    <div className="bg-slate-950 min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* Main Content Wrapper - Added pt-20 for fixed navbar */}
      <div className="flex flex-1 pt-20">
        {/* Left Panel - The "Trust" Side */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-slate-900 to-slate-950 relative overflow-hidden flex-col justify-center items-center p-12 text-center border-r border-white/5">
          {/* Background Abstract/Icon with Data Graph Texture */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <Network className="w-[1000px] h-[1000px] text-white absolute" strokeWidth={0.5} />
            <ShieldCheck className="w-[600px] h-[600px] text-white relative z-10" strokeWidth={0.5} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 max-w-xl"
          >
            <div className="mb-8 flex justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>RxFood Clinical Standard</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif text-slate-100 leading-tight mb-6">
              &quot;Reducing A1C levels by 0.8% through precision tracking.&quot;
            </h1>

            <p className="text-lg text-slate-400 font-medium">
              — Validated in the SickKids Pediatric Diabetes Trial
            </p>
          </motion.div>
        </div>

        {/* Right Panel - The "Authentication" Side */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 md:p-12 lg:p-24 bg-slate-950 relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-md mx-auto"
          >
            {/* Header */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-2 text-blue-500 font-semibold tracking-wide uppercase text-sm">
                <Activity className="w-5 h-5" />
                <span>NutriGuard</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Clinician Access Portal</h2>
              <p className="text-slate-400">
                Please authenticate to access patient records. Access is logged to immutable audit trails for SOC 2 compliance.
              </p>
            </div>

            {/* Login Card */}
            <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6 backdrop-blur-sm shadow-xl">
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-medium h-12 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                )}
                Continue with Google Workspace
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-900/50 px-2 text-slate-500">or sign in with SSO</span>
                </div>
              </div>

              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="clinician@sickkids.ca"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 h-11 text-sm text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-slate-600"
                />
                <button
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium h-11 rounded-lg transition-colors text-sm"
                >
                  Sign in with SSO
                </button>
              </div>
            </div>

            {/* Security Footer - Two Layer Grid */}
            <div className="mt-12 pt-6 border-t border-slate-900/60 grid gap-y-4">
              
              {/* Top Layer: Links & Main Security Badge */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
                <div className="flex items-center gap-6">
                  <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
                  <span className="w-1 h-1 rounded-full bg-slate-800" />
                  <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
                  <span className="w-1 h-1 rounded-full bg-slate-800" />
                  <a href="#" className="hover:text-slate-300 transition-colors">Help Desk</a>
                </div>
                
                <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800/50 backdrop-blur-sm">
                   <Lock className="w-3 h-3 text-emerald-500/80" />
                   <span className="text-slate-400">Encrypted via TLS 1.3 | SOC 2 Type II Compliant</span>
                </div>
              </div>

              {/* Bottom Layer: Technical Status Details */}
              <div className="flex items-center justify-center md:justify-end">
                <div className="flex items-center gap-2 px-1 opacity-75 hover:opacity-100 transition-opacity">
                  <span className="text-[10px] text-emerald-500/80 font-mono tracking-wide">
                    ● System Status: Operational
                  </span>
                  <span className="text-slate-800 text-[10px]">|</span>
                  <span className="text-[10px] text-slate-600 font-mono uppercase tracking-tight">
                    Region: northamerica-northeast1 (GCP-MTL)
                  </span>
                </div>
              </div>
              
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}