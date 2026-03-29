import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "My Claude App",
    description: "Figma-to-code learning project",
};

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>{children}</body>
        </html>
    );
}
