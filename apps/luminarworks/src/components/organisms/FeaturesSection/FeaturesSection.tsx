import { FeatureCard } from "@/components/molecules/FeatureCard/FeatureCard";

const FEATURES = [
    {
        title: "Threat Intelligence",
        description:
            "AI-powered detection of zero-day exploits and APT campaigns before they breach your perimeter.",
        icon: (
            <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
        ),
    },
    {
        title: "Zero-Trust Architecture",
        description:
            "Never trust, always verify. We design and deploy frameworks that assume breach at every layer.",
        icon: (
            <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
        ),
    },
    {
        title: "24/7 SOC Operations",
        description:
            "Our analysts never sleep. Round-the-clock monitoring across endpoints, networks, and cloud infrastructure.",
        icon: (
            <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        ),
    },
    {
        title: "Incident Response",
        description:
            "Rapid containment, forensic investigation, and full recovery orchestration within minutes of detection.",
        icon: (
            <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
        ),
    },
];

export function FeaturesSection() {
    return (
        <section className="py-20 pb-24 border-t border-cyber/[7%]">
            <div className="max-w-[1200px] mx-auto px-10 flex flex-col gap-12">
                <div className="text-center">
                    <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold text-[#f0f6ff] tracking-[-0.02em] mb-3">
                        Our Capabilities
                    </h2>
                    <p className="text-base text-slate-500 tracking-[0.02em]">
                        Four disciplines. One mission. Eliminate the threat.
                    </p>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
                    {FEATURES.map((feature) => (
                        <FeatureCard
                            key={feature.title}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
