import type { ReactNode } from "react";
import { DashboardHeader } from "@/components/organisms/DashboardHeader/DashboardHeader";
import { MetricCard } from "@/components/molecules/MetricCard/MetricCard";

const METRICS: {
    label: string;
    value: string;
    description: string;
    trend: "up" | "down" | "neutral";
    trendLabel: string;
    icon: ReactNode;
}[] = [
    {
        label: "Endpoints Monitored",
        value: "1,284",
        description: "Across 6 network segments and 3 cloud regions",
        trend: "up",
        trendLabel: "↑ 12 added this week",
        icon: (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
            </svg>
        ),
    },
    {
        label: "Threats Blocked Today",
        value: "47",
        description: "Including 3 zero-day exploit attempts neutralized",
        trend: "neutral",
        trendLabel: "→ Within normal range",
        icon: (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
    },
    {
        label: "Open Incidents",
        value: "2",
        description: "Both classified P3 — under active investigation",
        trend: "down",
        trendLabel: "↓ 5 resolved this week",
        icon: (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
        ),
    },
    {
        label: "Coverage Score",
        value: "98.3%",
        description: "Detection and response coverage across all assets",
        trend: "up",
        trendLabel: "↑ +0.4% from last month",
        icon: (
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
        ),
    },
];

const ACTIVITY = [
    {
        type: "resolved",
        title: "Threat Intelligence Update",
        detail: "742 new APT indicators ingested from threat feeds. Signatures deployed to all sensors.",
        time: "2 minutes ago",
    },
    {
        type: "info",
        title: "Zero-Trust Policy Review",
        detail: "Quarterly access audit completed. 18 stale permissions revoked across 5 service accounts.",
        time: "1 hour ago",
    },
    {
        type: "resolved",
        title: "Lateral Movement Detected & Neutralized",
        detail: "Suspicious east-west traffic identified on segment B. Automated isolation applied. Root cause: compromised dev token.",
        time: "4 hours ago",
    },
    {
        type: "info",
        title: "Critical Patch Deployment",
        detail: "CVE-2025-1987 and CVE-2025-2041 patches applied to 47 endpoints. Zero downtime.",
        time: "Yesterday, 11:30 PM",
    },
];

interface DashboardTemplateProps {
    readonly userName: string | null | undefined;
    readonly userEmail: string | null | undefined;
    readonly onSignOut: () => Promise<void>;
}

export function DashboardTemplate({ userName, userEmail, onSignOut }: DashboardTemplateProps) {
    const firstName = userName?.split(" ")[0] ?? "Agent";

    return (
        <div className="min-h-screen flex flex-col bg-night">
            <DashboardHeader userName={userName} userEmail={userEmail} onSignOut={onSignOut} />

            <main className="flex-1 max-w-[1200px] w-full mx-auto px-10 py-10 pb-16 flex flex-col gap-12">
                {/* Welcome */}
                <section className="flex items-start justify-between gap-4 flex-wrap pt-2">
                    <div>
                        <h1 className="text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold text-[#f0f6ff] tracking-[-0.02em] mb-[0.4rem]">
                            Welcome back,{" "}
                            <span className="text-gradient-cyan">{firstName}</span>
                        </h1>
                        <p className="text-[0.95rem] text-slate-600">
                            Arctic Wolves Security Operations — your perimeter is holding.
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-[0.45rem] rounded-full text-[0.78rem] font-bold tracking-[0.06em] uppercase text-green-400 bg-green-400/[8%] border border-green-400/25 whitespace-nowrap">
                        <span className="w-[7px] h-[7px] rounded-full bg-green-400 animate-pulse-dot" />
                        Threat Level: Normal
                    </div>
                </section>

                {/* Metrics */}
                <section className="flex flex-col gap-5">
                    <h2 className="text-[0.78rem] font-bold text-slate-400 tracking-[0.08em] uppercase pb-3 border-b border-cyber/[7%]">
                        Live Security Metrics
                    </h2>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
                        {METRICS.map((m) => (
                            <MetricCard key={m.label} {...m} />
                        ))}
                    </div>
                </section>

                {/* Recent Activity */}
                <section className="flex flex-col gap-5">
                    <h2 className="text-[0.78rem] font-bold text-slate-400 tracking-[0.08em] uppercase pb-3 border-b border-cyber/[7%]">
                        Recent Activity
                    </h2>
                    <div className="rounded-xl overflow-hidden border border-cyber/[8%]">
                        {ACTIVITY.map((item, i) => (
                            <div
                                key={item.title}
                                className={`flex gap-5 items-start px-6 py-5 bg-white/[2%] hover:bg-cyber/[3%] transition-colors ${
                                    i < ACTIVITY.length - 1 ? "border-b border-cyber/[6%]" : ""
                                }`}
                            >
                                <span
                                    className={`w-2 h-2 rounded-full shrink-0 mt-[5px] ${
                                        item.type === "resolved"
                                            ? "bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.5)]"
                                            : "bg-cyber shadow-[0_0_6px_rgba(0,212,255,0.5)]"
                                    }`}
                                />
                                <div className="flex-1 flex flex-col gap-[0.3rem]">
                                    <div className="flex items-center justify-between gap-4 flex-wrap">
                                        <span className="text-[0.9rem] font-bold text-slate-200">
                                            {item.title}
                                        </span>
                                        <span className="text-[0.75rem] text-slate-700 whitespace-nowrap">
                                            {item.time}
                                        </span>
                                    </div>
                                    <p className="text-[0.85rem] text-slate-600 leading-[1.55]">
                                        {item.detail}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* About */}
                <section className="flex flex-col gap-5">
                    <h2 className="text-[0.78rem] font-bold text-slate-400 tracking-[0.08em] uppercase pb-3 border-b border-cyber/[7%]">
                        About This Platform
                    </h2>
                    <div className="card-cyber p-7 flex flex-col gap-4">
                        <p className="text-[0.9rem] leading-[1.75] text-slate-500">
                            <strong className="text-slate-400 font-semibold">
                                Arctic Wolves Security Portal
                            </strong>{" "}
                            is the unified command interface for enterprise threat management. Built
                            on a zero-trust foundation, this platform integrates real-time SOC
                            telemetry, threat intelligence feeds, and automated incident response
                            workflows into a single pane of glass.
                        </p>
                        <p className="text-[0.9rem] leading-[1.75] text-slate-500">
                            Authentication is enforced via{" "}
                            <strong className="text-slate-400 font-semibold">Keycloak</strong> with
                            OIDC and enforces MFA for all operator access. All sessions are audited
                            and anomaly-scored in real time.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                            {["Next.js 15", "NextAuth v5", "Keycloak", "Zero-Trust", "React 18"].map(
                                (t) => (
                                    <span
                                        key={t}
                                        className="px-3 py-[0.25rem] rounded-full text-[0.72rem] font-semibold tracking-[0.06em] text-cyber bg-cyber/[7%] border border-cyber/[18%]"
                                    >
                                        {t}
                                    </span>
                                )
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
