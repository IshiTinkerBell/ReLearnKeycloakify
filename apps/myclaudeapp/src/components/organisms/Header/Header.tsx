import Link from "next/link";

interface NavItem {
    readonly label: string;
    readonly href: string;
}

interface HeaderProps {
    readonly title: string;
    readonly navItems?: readonly NavItem[];
}

export function Header({ title, navItems = [] }: HeaderProps) {
    return (
        <header className="w-full border-b border-line bg-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <span className="text-xl font-bold text-fg">{title}</span>
                {navItems.length > 0 && (
                    <nav aria-label="Main navigation">
                        <ul className="flex gap-6 list-none">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-fg-muted hover:text-fg transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
}
