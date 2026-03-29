import type { ReactNode } from "react";

interface ButtonProps {
    readonly children: ReactNode;
    readonly type?: "button" | "submit";
    readonly variant?: "primary" | "ghost" | "outline";
    readonly disabled?: boolean;
    readonly onClick?: () => void;
}

export function Button({
    children,
    type = "button",
    variant = "primary",
    disabled = false,
    onClick,
}: ButtonProps) {
    return (
        <button type={type} disabled={disabled} onClick={onClick} className={`btn btn-${variant}`}>
            {children}
        </button>
    );
}
