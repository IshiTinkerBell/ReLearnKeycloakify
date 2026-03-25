import { DashboardHeader } from "@/components/organisms/DashboardHeader/DashboardHeader";
import { MetricCard } from "@/components/molecules/MetricCard/MetricCard";
import styles from "./DashboardTemplate.module.css";

const METRICS = [
    {
        label: "Endpoints Monitored",
        value: "1,284",
        description: "Across 6 network segments and 3 cloud regions",
        trend: "up" as const,
        trendLabel: "↑ 12 added this week",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
            </svg>
        ),
    },
    {
        label: "Threats Blocked Today",
        value: "47",
        description: "Including 3 zero-day exploit attempts neutralized",
        trend: "neutral" as const,
        trendLabel: "→ Within normal range",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
    },
    {
        label: "Open Incidents",
        value: "2",
        description: "Both classified P3 — under active investigation",
        trend: "down" as const,
        trendLabel: "↓ 5 resolved this week",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
        ),
    },
    {
        label: "Coverage Score",
        value: "98.3%",
        description: "Detection and response coverage across all assets",
        trend: "up" as const,
        trendLabel: "↑ +0.4% from last month",
        icon: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <div className={styles.page}>
            <DashboardHeader userName={userName} userEmail={userEmail} onSignOut={onSignOut} />

            <main className={styles.main}>
                {/* Welcome */}
                <section className={styles.welcome}>
                    <div>
                        <h1 className={styles.welcomeHeading}>
                            Welcome back, <span className={styles.accent}>{firstName}</span>
                        </h1>
                        <p className={styles.welcomeSub}>
                            Arctic Wolves Security Operations — your perimeter is holding.
                        </p>
                    </div>
                    <div className={styles.statusBadge}>
                        <span className={styles.statusDot} />
                        Threat Level: Normal
                    </div>
                </section>

                {/* Metrics */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Live Security Metrics</h2>
                    <div className={styles.metricsGrid}>
                        {METRICS.map((m) => (
                            <MetricCard key={m.label} {...m} />
                        ))}
                    </div>
                </section>

                {/* Recent Activity */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Recent Activity</h2>
                    <div className={styles.activityList}>
                        {ACTIVITY.map((item) => (
                            <div key={item.title} className={styles.activityItem}>
                                <span className={`${styles.activityDot} ${styles[item.type]}`} />
                                <div className={styles.activityBody}>
                                    <div className={styles.activityTop}>
                                        <span className={styles.activityTitle}>{item.title}</span>
                                        <span className={styles.activityTime}>{item.time}</span>
                                    </div>
                                    <p className={styles.activityDetail}>{item.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* About */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>About This Platform</h2>
                    <div className={styles.aboutCard}>
                        <p className={styles.aboutText}>
                            <strong>Arctic Wolves Security Portal</strong> is the unified command interface for
                            enterprise threat management. Built on a zero-trust foundation, this platform
                            integrates real-time SOC telemetry, threat intelligence feeds, and automated
                            incident response workflows into a single pane of glass.
                        </p>
                        <p className={styles.aboutText}>
                            Authentication is enforced via <strong>Keycloak</strong> with OIDC and enforces
                            MFA for all operator access. All sessions are audited and anomaly-scored in real time.
                        </p>
                        <div className={styles.techStack}>
                            {["Next.js 15", "NextAuth v5", "Keycloak", "Zero-Trust", "React 18"].map((t) => (
                                <span key={t} className={styles.techBadge}>{t}</span>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
