import type { ReactNode } from "react";
import { Rethink_Sans, Jost } from "next/font/google";
import "./globals.css";

const rethink = Rethink_Sans({
    weight: "800",
    subsets: ["latin"],
    variable: "--font-rethink",
});

const jost = Jost({
    weight: ["400", "500", "600"],
    subsets: ["latin"],
    variable: "--font-jost",
});

export default function SignUpLayout({ children }: { readonly children: ReactNode }) {
    return (
        <div className={`${rethink.variable} ${jost.variable}`}>
            {children}
        </div>
    );
}
