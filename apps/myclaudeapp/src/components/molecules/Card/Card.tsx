import type { ReactNode } from "react";

interface CardProps {
    readonly children: ReactNode;
    readonly title?: string;
    readonly className?: string;
}

export function Card({ children, title, className = "" }: CardProps) {
    return (
        <div className={`card-base ${className}`}>
            {title && (
                <h3 className="text-lg font-semibold text-fg mb-4">{title}</h3>
            )}
            {children}
        </div>
    );
}
