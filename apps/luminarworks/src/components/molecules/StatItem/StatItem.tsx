interface StatItemProps {
    readonly value: string;
    readonly label: string;
}

export function StatItem({ value, label }: StatItemProps) {
    return (
        <div className="flex flex-col items-center gap-[0.3rem] text-center">
            <span className="text-gradient-cyan text-[clamp(2rem,3.5vw,2.75rem)] font-extrabold leading-none">
                {value}
            </span>
            <span className="text-[0.75rem] font-semibold tracking-[0.1em] uppercase text-slate-600">
                {label}
            </span>
        </div>
    );
}
