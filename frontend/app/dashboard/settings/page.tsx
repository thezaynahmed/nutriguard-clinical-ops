"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
    Shield,
    User,
    Bell,
    Lock,
    Key,
    Globe,
    Database,
    Mail,
    Building,
    ChevronRight,
    LogOut,
    Camera,
    Save,
    LayoutDashboard,
    Activity,
    Server,
    Settings,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// --- Sidebar Navigation (Shared) ---
const Sidebar = () => {
    const { data: session } = useSession();

    const menuItems = [
        { icon: LayoutDashboard, label: "Live Operations", href: "/dashboard" },
        { icon: Activity, label: "Clinical Review Queue", href: "/dashboard", badge: "3" },
        { icon: Database, label: "Data Lineage", href: "/dashboard" },
        { icon: Server, label: "GKE Infrastructure", href: "/dashboard" },
        { icon: Settings, label: "Settings", href: "/dashboard/settings", active: true },
    ];

    return (
        <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-slate-800">
                <Link href="/dashboard" className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white tracking-tight">NutriGuard</h1>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Mission Control</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {menuItems.map((item, idx) => (
                    <Link
                        key={idx}
                        href={item.href}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all text-sm font-medium ${item.active
                            ? "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                            : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                        </div>
                        {item.badge && (
                            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30 text-[10px]">
                                {item.badge}
                            </Badge>
                        )}
                    </Link>
                ))}
            </nav>

            {/* User Profile Section */}
            {session?.user && (
                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-700">
                            {session.user.image ? (
                                <img src={session.user.image} alt={session.user.name || ""} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                                    <User className="w-5 h-5 text-slate-400" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{session.user.name}</p>
                            <p className="text-xs text-slate-500 truncate">{session.user.email}</p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="w-full bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700"
                    >
                        <LogOut className="w-3 h-3 mr-2" />
                        Sign Out
                    </Button>
                </div>
            )}
        </aside>
    );
};

// --- Settings Page ---
export default function SettingsPage() {
    const { data: session } = useSession();
    const [activeTab, setActiveTab] = useState("profile");

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "security", label: "Security", icon: Lock },
        { id: "api", label: "API Keys", icon: Key },
        { id: "organization", label: "Organization", icon: Building },
    ];

    return (
        <div className="min-h-screen bg-slate-950 flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white tracking-tight">Settings</h1>
                    <p className="text-sm text-slate-500">Manage your account settings and preferences</p>
                </div>

                <div className="flex gap-8">
                    {/* Settings Tabs */}
                    <div className="w-56 space-y-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                    ? "bg-slate-800 text-white"
                                    : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Settings Content */}
                    <div className="flex-1 max-w-2xl">
                        {activeTab === "profile" && (
                            <div className="space-y-6">
                                {/* Profile Picture */}
                                <Card className="bg-slate-900 border-slate-800">
                                    <CardHeader>
                                        <CardTitle className="text-white text-lg">Profile Picture</CardTitle>
                                        <CardDescription className="text-slate-500">
                                            This is your avatar visible to team members
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-6">
                                            <div className="relative">
                                                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-700">
                                                    {session?.user?.image ? (
                                                        <img src={session.user.image} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                                            <User className="w-8 h-8 text-slate-500" />
                                                        </div>
                                                    )}
                                                </div>
                                                <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center border-2 border-slate-900 hover:bg-blue-500 transition-colors">
                                                    <Camera className="w-3 h-3 text-white" />
                                                </button>
                                            </div>
                                            <div>
                                                <Button size="sm" className="bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white">
                                                    Upload New Photo
                                                </Button>
                                                <p className="text-xs text-slate-500 mt-2">JPG, PNG or GIF. Max 2MB.</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Personal Information */}
                                <Card className="bg-slate-900 border-slate-800">
                                    <CardHeader>
                                        <CardTitle className="text-white text-lg">Personal Information</CardTitle>
                                        <CardDescription className="text-slate-500">
                                            Update your personal details
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                                                <input
                                                    type="text"
                                                    defaultValue={session?.user?.name || ""}
                                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 h-10 text-sm text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                                                <input
                                                    type="email"
                                                    defaultValue={session?.user?.email || ""}
                                                    disabled
                                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 h-10 text-sm text-slate-500 cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-400 mb-2">Role</label>
                                                <input
                                                    type="text"
                                                    defaultValue="Clinical Dietitian"
                                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 h-10 text-sm text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-400 mb-2">Department</label>
                                                <input
                                                    type="text"
                                                    defaultValue="Nutrition Services"
                                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 h-10 text-sm text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="pt-4">
                                            <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                                                <Save className="w-4 h-4 mr-2" />
                                                Save Changes
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Connected Accounts */}
                                <Card className="bg-slate-900 border-slate-800">
                                    <CardHeader>
                                        <CardTitle className="text-white text-lg">Connected Accounts</CardTitle>
                                        <CardDescription className="text-slate-500">
                                            Manage your linked authentication providers
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">Google</p>
                                                    <p className="text-xs text-slate-500">{session?.user?.email}</p>
                                                </div>
                                            </div>
                                            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">Connected</Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {activeTab === "notifications" && (
                            <Card className="bg-slate-900 border-slate-800">
                                <CardHeader>
                                    <CardTitle className="text-white text-lg">Notification Preferences</CardTitle>
                                    <CardDescription className="text-slate-500">
                                        Choose what notifications you receive
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {[
                                        { label: "Low Confidence Alerts", desc: "Get notified when scans fall below threshold", enabled: true },
                                        { label: "System Health Alerts", desc: "Receive alerts about infrastructure issues", enabled: true },
                                        { label: "Weekly Digest", desc: "Summary of clinical outcomes and metrics", enabled: false },
                                        { label: "New Feature Updates", desc: "Learn about new NutriGuard capabilities", enabled: true },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-slate-950 border border-slate-800">
                                            <div>
                                                <p className="text-sm font-medium text-white">{item.label}</p>
                                                <p className="text-xs text-slate-500">{item.desc}</p>
                                            </div>
                                            <button
                                                className={`relative w-11 h-6 rounded-full transition-colors ${item.enabled ? "bg-blue-600" : "bg-slate-700"
                                                    }`}
                                            >
                                                <span
                                                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${item.enabled ? "left-6" : "left-1"
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === "security" && (
                            <div className="space-y-6">
                                <Card className="bg-slate-900 border-slate-800">
                                    <CardHeader>
                                        <CardTitle className="text-white text-lg">Two-Factor Authentication</CardTitle>
                                        <CardDescription className="text-slate-500">
                                            Add an extra layer of security to your account
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between p-4 rounded-lg bg-slate-950 border border-slate-800">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                                    <Shield className="w-5 h-5 text-emerald-400" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">2FA via Authenticator App</p>
                                                    <p className="text-xs text-emerald-400">Enabled</p>
                                                </div>
                                            </div>
                                            <Button size="sm" className="bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white">
                                                Manage
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-slate-900 border-slate-800">
                                    <CardHeader>
                                        <CardTitle className="text-white text-lg">Active Sessions</CardTitle>
                                        <CardDescription className="text-slate-500">
                                            Manage devices where you&apos;re signed in
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-center justify-between p-4 rounded-lg bg-slate-950 border border-emerald-500/30">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                                                    <Globe className="w-5 h-5 text-slate-400" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">Chrome on macOS</p>
                                                    <p className="text-xs text-slate-500">Toronto, CA • Current Session</p>
                                                </div>
                                            </div>
                                            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">Active</Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {activeTab === "api" && (
                            <Card className="bg-slate-900 border-slate-800">
                                <CardHeader>
                                    <CardTitle className="text-white text-lg">API Keys</CardTitle>
                                    <CardDescription className="text-slate-500">
                                        Manage API keys for programmatic access
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-sm font-medium text-white">Production Key</p>
                                            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">Active</Badge>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <code className="flex-1 px-3 py-2 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
                                                ng_prod_••••••••••••••••••••
                                            </code>
                                            <Button size="sm" className="bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white">
                                                Reveal
                                            </Button>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-2">Created: Jan 10, 2026 • Last used: 2 hours ago</p>
                                    </div>
                                    <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                                        <Key className="w-4 h-4 mr-2" />
                                        Generate New Key
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === "organization" && (
                            <Card className="bg-slate-900 border-slate-800">
                                <CardHeader>
                                    <CardTitle className="text-white text-lg">Organization Settings</CardTitle>
                                    <CardDescription className="text-slate-500">
                                        Manage your organization&apos;s NutriGuard instance
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Organization Name</label>
                                        <input
                                            type="text"
                                            defaultValue="SickKids Hospital"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 h-10 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Instance Region</label>
                                        <div className="flex items-center gap-2 px-4 h-10 rounded-lg bg-slate-950 border border-slate-800">
                                            <Globe className="w-4 h-4 text-slate-500" />
                                            <span className="text-sm text-slate-300">northamerica-northeast1 (Montreal)</span>
                                            <Badge className="ml-auto bg-blue-500/10 text-blue-400 border-blue-500/30 text-[10px]">PHIPA Compliant</Badge>
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                                            <Save className="w-4 h-4 mr-2" />
                                            Save Organization Settings
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
