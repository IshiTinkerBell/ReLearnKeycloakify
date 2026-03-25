import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Arctic Wolves | Elite Cybersecurity",
    description:
        "Arctic Wolves delivers elite threat intelligence, zero-trust architecture, and 24/7 SOC operations to enterprises facing advanced persistent threats.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
