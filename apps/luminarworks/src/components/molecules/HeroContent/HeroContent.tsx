import { Badge } from "@/components/atoms/Badge/Badge";
import { Button } from "@/components/atoms/Button/Button";
import styles from "./HeroContent.module.css";

interface HeroContentProps {
    readonly onSignIn: () => Promise<void>;
    readonly signUpHref: string;
}

export function HeroContent({ onSignIn, signUpHref }: HeroContentProps) {
    return (
        <div className={styles.content}>
            <Badge>Elite Cybersecurity</Badge>
            <h1 className={styles.headline}>
                Protecting the
                <br />
                <span className={styles.gradient}>Digital Frontier</span>
            </h1>
            <p className={styles.description}>
                Arctic Wolves is the apex predator of enterprise security. We deploy elite threat
                intelligence, zero-trust architecture, and 24/7 SOC operations to neutralize
                advanced persistent threats before they strike.
            </p>
            <p className={styles.tagline}>We hunt. You sleep.</p>
            <form action={onSignIn} className={styles.ctaForm}>
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
            <p className={styles.signUpPrompt}>
                New to Arctic Wolves?{" "}
                <a href={signUpHref} className={styles.signUpLink}>
                    Create an account
                </a>
            </p>
        </div>
    );
}
