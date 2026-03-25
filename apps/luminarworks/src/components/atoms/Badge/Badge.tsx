import type { ReactNode } from "react";

interface BadgeProps {
    readonly children: ReactNode;
}

export function Badge({ children }: BadgeProps) {
    return (
        <span className="badge-dot inline-flex items-center gap-[0.45rem] px-[0.9rem] py-[0.35rem] rounded-full text-[0.7rem] font-bold tracking-[0.14em] uppercase text-cyber bg-cyber/8 border border-cyber/25">
            {children}
        </span>
    );
}
