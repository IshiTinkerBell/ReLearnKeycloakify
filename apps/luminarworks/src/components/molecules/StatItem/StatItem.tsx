import styles from "./StatItem.module.css";

interface StatItemProps {
    value: string;
    label: string;
}

export function StatItem({ value, label }: StatItemProps) {
    return (
        <div className={styles.item}>
            <span className={styles.value}>{value}</span>
            <span className={styles.label}>{label}</span>
        </div>
    );
}
