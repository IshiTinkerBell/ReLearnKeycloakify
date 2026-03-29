import { SignUpForm } from "@/components/organisms/SignUpForm/SignUpForm";

function LeftPanel() {
    return (
        <div
            className="hidden md:flex md:w-[52%] relative flex-col justify-between p-10"
            style={{
                background: [
                    "radial-gradient(ellipse at 20% 20%, #7c3aed 0%, transparent 45%)",
                    "radial-gradient(ellipse at 80% 70%, #ec4899 0%, transparent 45%)",
                    "radial-gradient(ellipse at 50% 50%, #2563eb 0%, transparent 60%)",
                    "#1e1a4d",
                ].join(", "),
            }}
        >
            {/* Logo — top right */}
            <div className="flex justify-end">
                <span
                    className="text-white text-lg font-semibold tracking-wide"
                    style={{ fontFamily: "var(--font-jost)" }}
                >
                    Luminar Works
                </span>
            </div>

            {/* Taglines — bottom left */}
            <div className="flex flex-col gap-1">
                <p
                    className="text-[64px] font-extrabold italic leading-none"
                    style={{ color: "#1e1a4d", fontFamily: "var(--font-rethink)" }}
                >
                    Big Business Tools.
                </p>
                <p
                    className="text-[64px] font-extrabold italic leading-none"
                    style={{ color: "#1e1a4d", fontFamily: "var(--font-rethink)" }}
                >
                    Built For You.
                </p>
            </div>
        </div>
    );
}

function RightPanel({ children }: { readonly children: React.ReactNode }) {
    return (
        <div className="flex-1 md:w-[48%] bg-white flex items-center justify-center p-6 min-h-screen">
            {children}
        </div>
    );
}

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex">
            <LeftPanel />
            <RightPanel>
                <SignUpForm />
            </RightPanel>
        </div>
    );
}
