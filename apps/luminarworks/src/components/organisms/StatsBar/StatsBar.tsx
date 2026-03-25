import { StatItem } from "@/components/molecules/StatItem/StatItem";
import styles from "./StatsBar.module.css";

const STATS = [
    { value: "500+", label: "Enterprises Protected" },
    { value: "99.97%", label: "Threat Detection Rate" },
    { value: "<15min", label: "Mean Response Time" },
];

export function StatsBar() {
    return (
        <div className={styles.bar}>
            <div className={styles.container}>
                {STATS.map((stat) => (
                    <StatItem key={stat.label} value={stat.value} label={stat.label} />
                ))}
            </div>
        </div>
    );
}
