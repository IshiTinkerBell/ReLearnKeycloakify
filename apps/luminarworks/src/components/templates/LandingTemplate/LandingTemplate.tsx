import { HeroSection } from "@/components/organisms/HeroSection/HeroSection";
import { StatsBar } from "@/components/organisms/StatsBar/StatsBar";
import { FeaturesSection } from "@/components/organisms/FeaturesSection/FeaturesSection";
import styles from "./LandingTemplate.module.css";

interface LandingTemplateProps {
    readonly onSignIn: () => Promise<void>;
}

export function LandingTemplate({ onSignIn }: LandingTemplateProps) {
    return (
        <div className={styles.page}>
            <HeroSection onSignIn={onSignIn} signUpHref="/signup" />
            <StatsBar />
            <FeaturesSection />
            <footer className={styles.footer}>
                <p>© {new Date().getFullYear()} Arctic Wolves Security. All rights reserved.</p>
            </footer>
        </div>
    );
}
