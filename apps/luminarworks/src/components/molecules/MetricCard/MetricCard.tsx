import styles from "./MetricCard.module.css";

type TrendDirection = "up" | "down" | "neutral";

interface MetricCardProps {
    readonly label: string;
    readonly value: string;
    readonly description: string;
    readonly trend: TrendDirection;
    readonly trendLabel: string;
    readonly icon: React.ReactNode;
}

export function MetricCard({ label, value, description, trend, trendLabel, icon }: MetricCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.top}>
                <span className={styles.label}>{label}</span>
                <div className={styles.iconWrap}>{icon}</div>
            </div>
            <p className={styles.value}>{value}</p>
            <p className={styles.description}>{description}</p>
            <span className={`${styles.trend} ${styles[trend]}`}>{trendLabel}</span>
        </div>
    );
}
