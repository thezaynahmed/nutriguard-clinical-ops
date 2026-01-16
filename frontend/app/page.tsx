"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Activity,
    Server,
    Shield,
    ShieldCheck,
    Clock,
    ArrowRight,
    FileText,
    Database,
    Lock,
    Zap,
    Network,
    ChevronDown,
    Scan,
    CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

// --- Configuration ---
const FADE_UP = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6, ease: "easeOut" }
} as const;

const STAGGER_CHILDREN = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const STAGGER_ITEM = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

// --- Components ---

const Hero = () => {
    return (
        <section className="relative pt-40 pb-24 overflow-hidden bg-slate-950">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Ambient Glows */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none opacity-30" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column (Text) */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        {/* Hook Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                            Clinically Validated • Vertex AI Vision v2.4
                        </div>

                        {/* Headline */}
                        <h1 className="text-6xl lg:text-8xl font-bold tracking-tighter text-white leading-[1.1] mb-6">
                            Nutrition, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                                reimagined as medicine.
                            </span>
                        </h1>

                        {/* Subhead */}
                        <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                            Forget calorie counting. We translate the complexity of food into actionable metabolic insights in real-time. A 0.8% reduction in A1C isn&apos;t just a data point—it&apos;s a life-changing outcome.
                        </p>

                        {/* CTA Row */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <Link href="/dashboard">
                                <Button size="lg" className="relative h-14 px-8 text-base bg-blue-600 hover:bg-blue-500 text-white rounded-full group shadow-lg shadow-blue-900/20 overflow-hidden transition-all hover:scale-105">
                                    <span className="relative z-10 flex items-center">
                                        Access Clinical Portal
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    {/* Pulse Animation */}
                                    <span className="absolute inset-0 rounded-full ring-4 ring-white/20 group-hover:ring-white/40 animate-pulse transition-all duration-700" />
                                </Button>
                            </Link>
                            <Button size="lg" className="h-14 px-8 text-base bg-white text-slate-900 hover:bg-slate-200 rounded-full border border-transparent transition-all shadow-lg hover:shadow-xl hover:scale-105">
                                <FileText className="mr-2 w-4 h-4 text-slate-900" />
                                View Clinical Trial Data
                            </Button>
                        </div>

                        {/* Social Proof */}
                        <div className="flex items-center gap-4 pt-4 opacity-80">
                            <div className="flex -space-x-4">
                                <div className="w-10 h-10 rounded-full border-2 border-slate-950 overflow-hidden hover:scale-110 transition-transform z-0 hover:z-10">
                                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100" alt="User" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-10 h-10 rounded-full border-2 border-slate-950 overflow-hidden hover:scale-110 transition-transform z-0 hover:z-10">
                                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100" alt="User" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-10 h-10 rounded-full border-2 border-slate-950 overflow-hidden hover:scale-110 transition-transform z-0 hover:z-10">
                                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100" alt="User" className="w-full h-full object-cover" />
                                </div>
                                <div className="w-10 h-10 rounded-full border-2 border-slate-950 overflow-hidden hover:scale-110 transition-transform z-0 hover:z-10">
                                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100" alt="User" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 font-medium">Trusted by 50+ Research Labs</p>
                        </div>
                    </motion.div>

                    {/* Right Column: Visual (Clinical Value Card) */}
                    <div className="relative w-full max-w-xl mx-auto lg:mr-0 perspective-[2000px]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl overflow-hidden group hover:shadow-blue-900/20 transition-all duration-500 hover:scale-[1.02]"
                        >
                            {/* Header */}
                            <div className="h-10 border-b border-white/5 bg-slate-950/50 flex items-center justify-between px-4 text-[10px] font-mono tracking-wide">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Live Inference: Vertex AI v2.4
                                </div>
                                <div className="flex items-center gap-1.5 text-blue-400 font-semibold">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Protocol: SickKids Validated
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="grid grid-cols-2 h-[320px]">
                                {/* Left: The Input (Computer Vision) */}
                                <div className="relative border-r border-white/5 overflow-hidden group/image">
                                    <img
                                        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
                                        alt="Salmon Assessment"
                                        className="w-full h-full object-cover opacity-80 group-hover/image:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                                    {/* Bounding Box */}
                                    <div className="absolute top-[20%] left-[15%] right-[15%] bottom-[25%] border-2 border-green-500/80 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                                        <div className="absolute -top-1 -left-1 w-2 h-2 bg-green-400" />
                                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400" />
                                        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-400" />
                                        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-400" />
                                    </div>

                                    {/* Analysis Label */}
                                    <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md border border-white/10 rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
                                            <Scan className="w-3 h-3 text-green-400" />
                                            <span className="text-[10px] font-bold text-slate-300 uppercase">Input Analysis</span>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-xs">
                                                <span className="text-slate-500">Object</span>
                                                <span className="text-white font-medium">Sockeye Salmon</span>
                                            </div>
                                            <div className="flex justify-between text-xs">
                                                <span className="text-slate-500">Confidence</span>
                                                <span className="text-green-400 font-mono">98.4%</span>
                                            </div>
                                            <div className="flex justify-between text-xs pt-1 mt-1 border-t border-white/5">
                                                <span className="text-slate-500">Data Type</span>
                                                <span className="text-blue-300 font-mono text-[10px]">Unstructured → Structured</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: The Outcome (Metabolic Intelligence) */}
                                <div className="relative p-5 bg-slate-900/50 flex flex-col">
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Glucose Response (CGM)</span>
                                        <Activity className="w-3 h-3 text-blue-500" />
                                    </div>

                                    {/* Graph Area */}
                                    <div className="relative flex-1">
                                        {/* Grid Lines */}
                                        <div className="absolute inset-0 flex flex-col justify-between text-[8px] text-slate-600 font-mono py-2">
                                            <div className="border-t border-dashed border-white/5 w-full h-0" />
                                            <div className="border-t border-dashed border-white/5 w-full h-0" />
                                            <div className="border-t border-dashed border-green-500/20 w-full h-0" /> {/* Target Range Top */}
                                            <div className="border-t border-dashed border-white/5 w-full h-0" />
                                        </div>

                                        <svg className="absolute inset-0 w-full h-full overflow-visible">
                                            <defs>
                                                <linearGradient id="cgmGradient" x1="0" y1="0" x2="1" y2="0">
                                                    <stop offset="0%" stopColor="#3b82f6" />
                                                    <stop offset="50%" stopColor="#3b82f6" />
                                                    <stop offset="100%" stopColor="#22c55e" />
                                                </linearGradient>
                                            </defs>
                                            <motion.path
                                                d="M 0 80 C 40 80, 60 40, 100 50 S 160 60, 220 55"
                                                fill="none"
                                                stroke="url(#cgmGradient)"
                                                strokeWidth="3"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 2, delay: 0.5 }}
                                            />
                                        </svg>

                                        {/* Floating Badges */}
                                        <motion.div
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 1.5 }}
                                            className="absolute top-0 right-0 bg-green-500/10 border border-green-500/20 rounded px-2 py-1"
                                        >
                                            <div className="text-[10px] text-green-400 font-bold whitespace-nowrap">Proj. A1C: -0.8%</div>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 1.7 }}
                                            className="absolute bottom-4 right-0 bg-blue-500/10 border border-blue-500/20 rounded px-2 py-1"
                                        >
                                            <div className="text-[10px] text-blue-300 font-bold whitespace-nowrap">Time: 3x Faster</div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="bg-slate-950/80 border-t border-white/5 px-4 py-3 flex items-center gap-2">
                                <Lock className="w-3 h-3 text-slate-500" />
                                <span className="text-[10px] text-slate-500 font-mono">Privacy: PHIPA/HIPAA Compliant • Encryption: AES-256 • Storage: Canada (North)</span>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>


        </section>
    );
};

const LogoStrip = () => {
    return (
        <section className="py-12 border-y border-white/5 bg-slate-950">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <p className="text-xs uppercase tracking-widest text-slate-500 mb-8 font-medium">Powering outcomes for leading institutions:</p>
                <motion.div
                    variants={STAGGER_CHILDREN}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8"
                >
                    {["SickKids", "MAYO CLINIC", "CLEVELAND CLINIC", "GreenShield"].map((logo) => (
                        <motion.span
                            key={logo}
                            variants={STAGGER_ITEM}
                            className="text-xl md:text-2xl font-bold text-slate-300 tracking-wider font-serif opacity-40 grayscale hover:opacity-100 transition-opacity duration-500 cursor-default"
                        >
                            {logo}
                        </motion.span>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

const Features = () => {
    return (
        <section className="py-32 bg-slate-950 text-slate-50" id="platform">
            <div className="max-w-7xl mx-auto px-6">
                <motion.h2
                    {...FADE_UP}
                    className="text-3xl md:text-5xl font-bold mb-16 text-center tracking-tight"
                >
                    Built for the rigors of <br /><span className="text-blue-500">clinical reality.</span>
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Large Box (Left) */}
                    <motion.div
                        {...FADE_UP}
                        whileHover={{ y: -5 }}
                        className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 md:p-12 relative overflow-hidden group flex flex-col justify-between min-h-[400px] hover:border-white/20 hover:shadow-2xl transition-all duration-300"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-blue-900/20 text-blue-400 flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                                <Database className="w-6 h-6" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4">Artificial intelligence with human humility.</h3>
                            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                                Our probabilistic engine doesn&apos;t guess. It knows when it needs help. We prioritize Recall over Precision, automatically flagging low-confidence data for human dietitian review. Safety isn&apos;t a feature; it&apos;s our entire architecture.
                            </p>
                        </div>

                        {/* Visual: Toggle Switch Animation */}
                        <div className="mt-8 bg-black/40 rounded-xl p-4 border border-white/5 w-full max-w-sm group-hover:border-white/20 transition-colors">
                            <div className="flex items-center justify-between text-sm font-medium text-slate-400 mb-2">
                                <span>Confidence Check</span>
                                <span className="text-yellow-500">Below Threshold (0.82)</span>
                            </div>
                            <div className="relative h-12 bg-slate-800 rounded-lg p-1 flex">
                                <div className="w-1/2 flex items-center justify-center text-slate-500 z-10">AI Auto</div>
                                <div className="w-1/2 flex items-center justify-center text-white z-10 font-bold">Human Review</div>
                                <motion.div
                                    className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-yellow-600 rounded-md shadow-md"
                                    animate={{ left: ["4px", "calc(50% + 0px)", "calc(50% + 0px)", "4px"] }}
                                    transition={{ duration: 4, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column (Two Smaller Boxes) */}
                    <div className="flex flex-col gap-6">

                        {/* Small Box 1 (Top) */}
                        <motion.div
                            {...FADE_UP}
                            transition={{ delay: 0.1 }}
                            whileHover={{ y: -5 }}
                            className="flex-1 rounded-3xl border border-white/10 bg-slate-900/50 p-8 flex flex-col justify-center relative group min-h-[240px] hover:border-white/20 hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="w-10 h-10 rounded-lg bg-purple-900/20 text-purple-400 flex items-center justify-center mb-4 border border-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                                <Lock className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Privacy by design. Trust by default.</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Immutable audit logs for every pixel. PHIPA/HIPAA compliant out of the box. We treat patient data with the same reverence as a medical record.
                            </p>
                        </motion.div>

                        {/* Small Box 2 (Bottom) */}
                        <motion.div
                            {...FADE_UP}
                            transition={{ delay: 0.2 }}
                            whileHover={{ y: -5 }}
                            className="flex-1 rounded-3xl border border-white/10 bg-slate-900/50 p-8 flex flex-col justify-center relative group min-h-[240px] hover:border-white/20 hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="w-10 h-10 rounded-lg bg-amber-900/20 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/20 group-hover:scale-110 transition-transform duration-300">
                                <Zap className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Speed that respects the clinician.</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Engineered to fit your workflow like a diagnostic test, completing dietary histories 3x faster. Give clinicians back the time to do what they do best: care.
                            </p>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    )
}

const WhyChooseUs = () => {
    const stats = [
        { label: "-0.8% A1C", sub: "Clinically Proven", icon: Activity },
        { label: "$1,000+", sub: "Annual Savings", icon: Activity },
        { label: "AES-256", sub: "Ironclad Security", icon: Lock },
        { label: "FHIR Native", sub: "Seamlessly Connected", icon: Network },
    ]
    return (
        <section className="py-24 border-y border-white/5 bg-slate-900/20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            {...FADE_UP}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="group cursor-default"
                        >
                            <div className="flex justify-center mb-6">
                                <div className="w-12 h-12 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-blue-500 group-hover:border-blue-500/30 group-hover:bg-blue-500/10 transition-all duration-300">
                                    <stat.icon className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{stat.label}</div>
                            <div className="text-sm font-medium text-slate-500 uppercase tracking-widest">{stat.sub}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const Testimonials = () => {
    const testimonials = [
        {
            quote: "NutriGuard's confidence scoring allowed us to trust AI in a clinical setting.",
            author: "Dr. Sarah Chen",
            role: "Chief of Endocrinology",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100&h=100"
        },
        {
            quote: "The API latency is incredible. We process 50k+ daily scans with zero downtime.",
            author: "Marcus Thorne",
            role: "CTO, HealthStream",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
        },
        {
            quote: "Finally, a solution that respects HIPAA compliance out of the box.",
            author: "Elena Rodriguez",
            role: "Director of Clinical Ops",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100"
        }
    ];

    return (
        <section className="py-32 bg-slate-950">
            <div className="max-w-7xl mx-auto px-6">
                <motion.h2
                    {...FADE_UP}
                    className="text-3xl font-bold text-white mb-16 text-center"
                >
                    Trusted by those who care for patients.
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((item, i) => (
                        <motion.div
                            key={i}
                            {...FADE_UP}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between hover:border-slate-700 hover:bg-slate-800/50 transition-colors duration-300"
                        >
                            <div className="mb-6">
                                <div className="flex gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map(s => <div key={s} className="w-4 h-4 text-blue-500 fill-blue-500">★</div>)}
                                </div>
                                <p className="text-slate-300 text-lg leading-relaxed font-light">
                                    &quot;{item.quote}&quot;
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-700 group-hover:border-slate-500 transition-colors">
                                    <img
                                        src={item.image}
                                        alt={item.author}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">{item.author}</p>
                                    <p className="text-xs text-slate-500">{item.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        { q: "How do you handle model drift?", a: "We version every dataset and retrain weekly on 'hard negative' examples collected from our human-in-the-loop verification queue." },
        { q: "Is data encrypted at rest?", a: "Yes, via Google Cloud KMS with customer-managed keys (CMEK), ensuring exclusive control over data access." },
        { q: "Do you support SSO?", a: "We provide native OIDC and SAML 2.0 support for Enterprise identity providers like Okta, Azure AD, and PingIdentity." },
    ];

    return (
        <section className="py-24 bg-slate-950" id="faq">
            <div className="max-w-3xl mx-auto px-6">
                <motion.h2
                    {...FADE_UP}
                    className="text-3xl font-bold text-white mb-12 text-center"
                >
                    Frequently Asked Questions
                </motion.h2>
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            {...FADE_UP}
                            transition={{ delay: idx * 0.1 }}
                            className="border border-white/10 rounded-xl bg-slate-900/30 overflow-hidden hover:bg-slate-900/50 transition-colors"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="font-medium text-slate-200 text-lg">{faq.q}</span>
                                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${openIndex === idx ? "rotate-180" : ""}`} />
                            </button>
                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const PreFooter = () => {
    return (
        <section className="py-32 relative overflow-hidden">
            {/* Background Layer */}
            <div className="absolute inset-0 bg-slate-950 z-[-2]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-slate-950 z-[-1]" />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-[-1]" />

            <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    {...FADE_UP}
                    className="relative z-10"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                        Be part of the future of <br />
                        <span className="text-blue-500">metabolic health.</span>
                    </h2>
                    <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
                        Join the forward-thinking institutions using AI to deliver evidence-based personalized nutrition at scale.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" className="h-14 px-10 text-lg bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all hover:scale-105 hover:shadow-blue-500/50">
                            Deploy on Google Cloud
                        </Button>
                        <Button size="lg" className="h-14 px-10 text-lg bg-white text-slate-900 hover:bg-slate-200 rounded-full shadow-lg border border-transparent transition-all hover:scale-105">
                            Partner with Us
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

// --- Main Page Component ---

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-slate-950 selection:bg-blue-500/30 selection:text-white font-sans scroll-smooth">
            <Hero />
            <LogoStrip />
            <Features />
            <WhyChooseUs />
            <Testimonials />
            <FAQ />
            <PreFooter />
        </main>
    );
}