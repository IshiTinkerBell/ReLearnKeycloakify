import type { ReactNode } from "react";

export default function Link({
    href,
    children,
    className,
}: {
    readonly href: string;
    readonly children: ReactNode;
    readonly className?: string;
}) {
    return (
        <a href={href} className={className}>
            {children}
        </a>
    );
}
