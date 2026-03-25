import type { ReactNode } from "react";

interface ButtonProps {
    readonly children: ReactNode;
    readonly type?: "button" | "submit";
    readonly variant?: "primary" | "ghost";
}

export function Button({ children, type = "button", variant = "primary" }: ButtonProps) {
    return (
        <button type={type} className={`btn btn-${variant}`}>
            {children}
        </button>
    );
}
