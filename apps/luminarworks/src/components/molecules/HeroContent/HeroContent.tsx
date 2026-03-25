import Link from "next/link";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Button } from "@/components/atoms/Button/Button";

interface HeroContentProps {
    readonly onSignIn: () => Promise<void>;
    readonly signUpHref: string;
}

export function HeroContent({ onSignIn, signUpHref }: HeroContentProps) {
    return (
        <div className="flex flex-col gap-6 max-w-[580px] relative z-[2]">
            <Badge>Elite Cybersecurity</Badge>
            <h1 className="text-[clamp(2.6rem,5vw,4.2rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-[#f0f6ff]">
                Protecting the
                <br />
                <span className="text-gradient">Digital Frontier</span>
            </h1>
            <p className="text-[1.05rem] leading-[1.75] text-slate-400 max-w-[500px]">
                Arctic Wolves is the apex predator of enterprise security. We deploy elite threat
                intelligence, zero-trust architecture, and 24/7 SOC operations to neutralize
                advanced persistent threats before they strike.
            </p>
            <p className="text-[1.05rem] font-bold italic text-cyber/75 tracking-[0.04em]">
                We hunt. You sleep.
            </p>
            <form action={onSignIn} className="mt-[0.25rem]">
                <Button type="submit" variant="primary">
                    Sign in with Keycloak
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </Button>
            </form>
            <p className="text-[0.9rem] text-slate-600 -mt-2">
                New to Arctic Wolves?{" "}
                <Link href={signUpHref} className="text-cyber font-semibold hover:underline">
                    Create an account
                </Link>
            </p>
        </div>
    );
}
