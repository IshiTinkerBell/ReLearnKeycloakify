import type { AnchorHTMLAttributes, ReactNode } from "react";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    readonly href: string;
    readonly children: ReactNode;
}

export default function Link({ href, children, ...rest }: LinkProps) {
    return (
        <a href={href} {...rest}>
            {children}
        </a>
    );
}
