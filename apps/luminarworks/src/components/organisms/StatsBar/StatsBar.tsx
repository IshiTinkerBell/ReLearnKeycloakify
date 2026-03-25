import { StatItem } from "@/components/molecules/StatItem/StatItem";

const STATS = [
    { value: "500+", label: "Enterprises Protected" },
    { value: "99.97%", label: "Threat Detection Rate" },
    { value: "<15min", label: "Mean Response Time" },
];

export function StatsBar() {
    return (
        <div className="border-y border-cyber/[7%] bg-cyber/[2%] py-12">
            <div className="max-w-[1200px] mx-auto px-10 grid grid-cols-3 gap-8 max-sm:grid-cols-1">
                {STATS.map((stat) => (
                    <StatItem key={stat.label} value={stat.value} label={stat.label} />
                ))}
            </div>
        </div>
    );
}
