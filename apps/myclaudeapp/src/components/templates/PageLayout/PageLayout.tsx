import type { ReactNode } from "react";
import { Header } from "@/components/organisms/Header/Header";

interface NavItem {
    readonly label: string;
    readonly href: string;
}

interface PageLayoutProps {
    readonly children: ReactNode;
    readonly title: string;
    readonly navItems?: readonly NavItem[];
}

export function PageLayout({ children, title, navItems }: PageLayoutProps) {
    return (
        <div className="min-h-screen bg-bg">
            <Header title={title} navItems={navItems} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
