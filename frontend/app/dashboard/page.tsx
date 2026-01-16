"use client";

import * as React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Activity,
  Database,
  Server,
  Settings,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Zap,
  Lock,
  User,
  LogOut,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// =============================================================================
// TYPES
// =============================================================================

interface Scan {
  id: string;
  patient_id: string;
  food: string;
  confidence: number;
  timestamp: string;
  status: "verified" | "flagged";
  requires_review: boolean;
}

interface FeedResponse {
  scans: Scan[];
  total: number;
  flagged_count: number;
  model_version: string;
}

interface MetricsResponse {
  precision: number;
  sample_size: number;
  drift_status: "Stable" | "Drift Detected";
  model_version: string;
  drift_threshold: number;
}

// =============================================================================
// SIDEBAR NAVIGATION
// =============================================================================

const Sidebar = () => {
  const { data: session } = useSession();

  const menuItems = [
    { icon: LayoutDashboard, label: "Mission Control", href: "/dashboard", active: true },
    { icon: Activity, label: "Clinical Review Queue", href: "/dashboard", badge: "3 Pending" },
    { icon: Database, label: "Data Lineage", href: "/dashboard" },
    { icon: Server, label: "GKE Infrastructure", href: "/dashboard" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-950 border-r border-slate-800 flex flex-col">
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
      {session?.user ? (
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
      ) : (
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Vertex AI v2.4 Connected</span>
          </div>
        </div>
      )}
    </aside>
  );
};

// =============================================================================
// HERO PRECISION CARD (Compact - with Drift Detection)
// =============================================================================

interface HeroPrecisionCardProps {
  metrics: MetricsResponse;
  isLoading: boolean;
}

const HeroPrecisionCard = ({ metrics, isLoading }: HeroPrecisionCardProps) => {
  const isDriftDetected = metrics.drift_status === "Drift Detected";

  return (
    <Card
      className={`transition-all duration-500 ${isDriftDetected
        ? "bg-slate-900 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
        : "bg-slate-900 border-slate-800"
        }`}
    >
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-xs text-slate-500 uppercase tracking-wider">Model Precision</p>
              {isLoading && <RefreshCw className="w-3 h-3 text-slate-500 animate-spin" />}
            </div>
            <p className={`text-3xl font-bold ${isDriftDetected ? "text-red-400" : "text-emerald-400"}`}>
              {(metrics.precision * 100).toFixed(1)}%
            </p>
            {isDriftDetected && (
              <Badge variant="outline" className="mt-2 bg-red-500/10 text-red-400 border-red-500/30 text-[10px]">
                ⚠ Retraining Required
              </Badge>
            )}
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDriftDetected ? "bg-red-500/10" : "bg-emerald-500/10"
            }`}>
            {isDriftDetected ? (
              <AlertTriangle className="w-6 h-6 text-red-400" />
            ) : (
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            )}
          </div>
        </div>
        <div className="mt-3 h-1 rounded-full bg-slate-800 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${isDriftDetected ? "bg-red-500" : "bg-emerald-500"}`}
            style={{ width: `${metrics.precision * 100}%` }}
          />
        </div>
        <p className="text-[10px] text-slate-500 mt-2">
          {metrics.sample_size} samples • {metrics.drift_status}
        </p>
      </CardContent>
    </Card>
  );
};


// =============================================================================
// SECONDARY METRICS CARDS
// =============================================================================

interface SecondaryMetricsProps {
  feed: FeedResponse;
}

const SecondaryMetrics = ({ feed }: SecondaryMetricsProps) => {
  const metrics = [
    {
      title: "Total Scans Today",
      value: `${feed.total}`,
      icon: Activity,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "API Latency (p99)",
      value: "84ms",
      icon: Zap,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Flagged for Review",
      value: `${feed.flagged_count} Items`,
      icon: AlertTriangle,
      color: feed.flagged_count > 0 ? "text-yellow-400" : "text-emerald-400",
      bg: feed.flagged_count > 0 ? "bg-yellow-500/10" : "bg-emerald-500/10",
    },
  ];

  return (
    <>
      {metrics.map((metric, idx) => (
        <Card key={idx} className="bg-slate-900 border-slate-800">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">{metric.title}</p>
                <p className={`text-3xl font-bold ${metric.color}`}>{metric.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${metric.bg} flex items-center justify-center`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

// =============================================================================
// LIVE FEED TABLE
// =============================================================================

interface LiveFeedTableProps {
  feed: FeedResponse;
  isLoading: boolean;
  error: string | null;
}

const LiveFeedTable = ({ feed, isLoading, error }: LiveFeedTableProps) => {
  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader className="border-b border-slate-800 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white text-lg flex items-center gap-2">
              Real-Time Ingestion Pipeline
              {isLoading && <RefreshCw className="w-4 h-4 text-slate-500 animate-spin" />}
            </CardTitle>
            <p className="text-xs text-slate-500 mt-1">
              {feed.model_version} • {feed.total} scans today
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-400">Live</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {error ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-yellow-400 text-sm">{error}</p>
              <p className="text-slate-500 text-xs mt-1">Make sure backend is running on port 5001</p>
            </div>
          </div>
        ) : feed.scans.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center text-slate-500">
              <Activity className="w-8 h-8 mx-auto mb-2 animate-pulse" />
              <p>Waiting for scans...</p>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800 hover:bg-transparent">
                <TableHead className="text-slate-500 text-xs uppercase tracking-wider">Timestamp</TableHead>
                <TableHead className="text-slate-500 text-xs uppercase tracking-wider">Patient ID</TableHead>
                <TableHead className="text-slate-500 text-xs uppercase tracking-wider">Detected Food</TableHead>
                <TableHead className="text-slate-500 text-xs uppercase tracking-wider">Confidence</TableHead>
                <TableHead className="text-slate-500 text-xs uppercase tracking-wider text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feed.scans.map((scan) => {
                const confidencePercent = scan.confidence * 100;
                const isLowConfidence = scan.confidence < 0.85;

                return (
                  <TableRow
                    key={scan.id}
                    className={`border-slate-800 transition-colors ${isLowConfidence
                      ? "bg-yellow-900/10 hover:bg-yellow-900/20"
                      : "hover:bg-slate-800/50"
                      }`}
                  >
                    <TableCell className="text-slate-400 font-mono text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {scan.timestamp}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300 font-medium">{scan.patient_id}</TableCell>
                    <TableCell className="text-white font-medium">{scan.food}</TableCell>
                    <TableCell>
                      <span
                        className={`font-mono font-bold ${confidencePercent >= 90
                          ? "text-emerald-400"
                          : isLowConfidence
                            ? "text-yellow-400"
                            : "text-slate-300"
                          }`}
                      >
                        {confidencePercent.toFixed(1)}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {isLowConfidence ? (
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30">
                          ⚠ Review
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                          ✓ Verified
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

// =============================================================================
// CLINICAL GUIDELINES PANEL (For Doctors)
// =============================================================================

const ClinicalGuidelinesPanel = () => {
  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-lg flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-400" />
          Clinical Guidelines
        </CardTitle>
        <p className="text-xs text-slate-500 mt-1">AI confidence interpretation for clinical use</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Verified Threshold */}
        <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                ≥ 85%
              </Badge>
              <span className="text-emerald-400 font-semibold text-sm">Verified</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              High confidence. Safe for clinical decision-making without additional review.
            </p>
          </div>
        </div>

        {/* Review Required Threshold */}
        <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
          <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                &lt; 85%
              </Badge>
              <span className="text-yellow-400 font-semibold text-sm">Review Required</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Manual verification by clinical staff recommended before use.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-4">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Compliance Status</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-3 h-3 text-blue-400" />
                <span className="text-slate-300 text-sm">HIPAA Compliant</span>
              </div>
              <Badge className="bg-blue-600 text-white text-[10px]">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-3 h-3 text-blue-400" />
                <span className="text-slate-300 text-sm">FDA 21 CFR Part 11</span>
              </div>
              <Badge className="bg-blue-600 text-white text-[10px]">Active</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// =============================================================================
// MAIN DASHBOARD PAGE
// =============================================================================

export default function Dashboard() {
  // State for backend data
  const [feed, setFeed] = React.useState<FeedResponse>({
    scans: [],
    total: 0,
    flagged_count: 0,
    model_version: "nutriguard-v1.2.0",
  });

  const [metrics, setMetrics] = React.useState<MetricsResponse>({
    precision: 0.92,
    sample_size: 0,
    drift_status: "Stable",
    model_version: "nutriguard-v1.2.0",
    drift_threshold: 0.85,
  });

  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Poll backend every 2 seconds
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both endpoints in parallel
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

        const [feedRes, metricsRes] = await Promise.all([
          fetch(`${API_URL}/feed`),
          fetch(`${API_URL}/metrics`),
        ]);

        if (!feedRes.ok || !metricsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const feedData: FeedResponse = await feedRes.json();
        const metricsData: MetricsResponse = await metricsRes.json();

        setFeed(feedData);
        setMetrics(metricsData);
        setError(null);
      } catch (err) {
        setError("Unable to connect to backend");
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Poll every 2 seconds
    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Live Clinical Mission Control</h1>
            <p className="text-sm text-slate-500">Real-time ML observability & drift detection</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
              <Clock className="w-3 h-3 text-slate-400" />
              <span className="text-xs text-slate-400 font-mono">
                {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </span>
            </div>
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${metrics.drift_status === "Drift Detected"
                ? "bg-red-500/10 border-red-500/20"
                : "bg-emerald-500/10 border-emerald-500/20"
                }`}
            >
              <span
                className={`w-2 h-2 rounded-full animate-pulse ${metrics.drift_status === "Drift Detected" ? "bg-red-500" : "bg-emerald-500"
                  }`}
              />
              <span
                className={`text-xs font-medium ${metrics.drift_status === "Drift Detected" ? "text-red-400" : "text-emerald-400"
                  }`}
              >
                {metrics.drift_status === "Drift Detected" ? "⚠ Drift Alert" : "All Systems Operational"}
              </span>
            </div>
          </div>
        </div>

        {/* Top Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <HeroPrecisionCard metrics={metrics} isLoading={isLoading} />
          <SecondaryMetrics feed={feed} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Feed Table (2/3) */}
          <div className="lg:col-span-2">
            <LiveFeedTable feed={feed} isLoading={isLoading} error={error} />
          </div>

          {/* Clinical Guidelines (1/3) */}
          <ClinicalGuidelinesPanel />
        </div>
      </main>
    </div>
  );
}
