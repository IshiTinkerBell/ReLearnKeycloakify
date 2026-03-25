import type { ReactNode } from "react";

type TrendDirection = "up" | "down" | "neutral";

interface MetricCardProps {
    readonly label: string;
    readonly value: string;
    readonly description: string;
    readonly trend: TrendDirection;
    readonly trendLabel: string;
    readonly icon: ReactNode;
}

const trendClasses: Record<TrendDirection, string> = {
    up: "text-green-400 bg-green-400/10",
    down: "text-red-400 bg-red-400/10",
    neutral: "text-slate-400 bg-slate-400/10",
};

export function MetricCard({ label, value, description, trend, trendLabel, icon }: MetricCardProps) {
    return (
        <div className="card-cyber flex flex-col gap-2 p-6">
            <div className="flex items-center justify-between">
                <span className="text-[0.75rem] font-semibold tracking-[0.1em] uppercase text-slate-600">
                    {label}
                </span>
                <div className="text-cyber opacity-70">{icon}</div>
            </div>
            <p className="text-[2rem] font-extrabold text-[#f0f6ff] leading-none">{value}</p>
            <p className="text-[0.82rem] text-slate-600 leading-[1.5]">{description}</p>
            <span
                className={`inline-flex items-center text-[0.75rem] font-semibold px-[0.6rem] py-[0.2rem] rounded-full w-fit ${trendClasses[trend]}`}
            >
                {trendLabel}
            </span>
        </div>
    );
}
