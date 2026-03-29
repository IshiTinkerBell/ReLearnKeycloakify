import type { ReactNode } from "react";

interface BadgeProps {
    readonly children: ReactNode;
    readonly variant?: "default" | "success" | "warning" | "error";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
    return (
        <span className={`badge-base badge-${variant}`}>
            {children}
        </span>
    );
}
