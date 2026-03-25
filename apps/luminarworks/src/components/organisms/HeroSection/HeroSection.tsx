import { HeroContent } from "@/components/molecules/HeroContent/HeroContent";
import styles from "./HeroSection.module.css";

interface HeroSectionProps {
    readonly onSignIn: () => Promise<void>;
    readonly signUpHref: string;
}

export function HeroSection({ onSignIn, signUpHref }: HeroSectionProps) {
    return (
        <section className={styles.hero}>
            <div className={styles.background}>
                <div className={styles.aurora} />
                <div className={styles.auroraSecondary} />

                {/* Wolf howling at the moon */}
                <svg
                    className={styles.wolfArt}
                    viewBox="0 0 600 700"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    {/* Moon glow rings */}
                    <circle cx="390" cy="185" r="155" fill="rgba(0,212,255,0.015)" />
                    <circle cx="390" cy="185" r="120" fill="rgba(0,212,255,0.025)" />
                    <circle cx="390" cy="185" r="90" fill="rgba(0,212,255,0.035)" />
                    <circle cx="390" cy="185" r="90" fill="none" stroke="rgba(0,212,255,0.22)" strokeWidth="1.5" />
                    <circle cx="390" cy="185" r="58" fill="rgba(0,212,255,0.045)" />

                    {/* Wolf silhouette — group opacity prevents fill compounding on overlaps */}
                    <g opacity="0.13" fill="#00d4ff">
                        {/* Haunches / lower body */}
                        <ellipse cx="210" cy="468" rx="118" ry="80" />
                        {/* Upper torso */}
                        <ellipse cx="205" cy="375" rx="72" ry="88" />
                        {/* Neck */}
                        <ellipse
                            cx="200"
                            cy="265"
                            rx="48"
                            ry="80"
                            transform="rotate(-10 200 265)"
                        />
                        {/* Head */}
                        <circle cx="205" cy="180" r="70" />
                        {/* Snout pointing up-right toward moon */}
                        <ellipse
                            cx="256"
                            cy="122"
                            rx="27"
                            ry="58"
                            transform="rotate(38 256 122)"
                        />
                        {/* Left ear */}
                        <polygon points="163,132 138,55 195,124" />
                        {/* Right ear */}
                        <polygon points="242,118 252,42 282,114" />
                        {/* Front left leg */}
                        <rect x="162" y="498" width="36" height="98" rx="16" />
                        {/* Front right leg */}
                        <rect x="218" y="502" width="36" height="92" rx="16" />
                        {/* Tail sweeping right */}
                        <ellipse
                            cx="342"
                            cy="420"
                            rx="22"
                            ry="95"
                            transform="rotate(-30 342 420)"
                        />
                    </g>

                    {/* Subtle wolf edge glow */}
                    <g opacity="0.2" fill="none" stroke="#00d4ff" strokeWidth="1">
                        <ellipse cx="210" cy="468" rx="118" ry="80" />
                        <circle cx="205" cy="180" r="70" />
                    </g>

                    {/* Scan line effect across moon */}
                    <line
                        x1="260"
                        y1="185"
                        x2="520"
                        y2="185"
                        stroke="rgba(0,212,255,0.12)"
                        strokeWidth="1"
                        strokeDasharray="4 8"
                    />
                </svg>

                <div className={styles.gridOverlay} />
            </div>

            <div className={styles.container}>
                <HeroContent onSignIn={onSignIn} signUpHref={signUpHref} />
            </div>
        </section>
    );
}
