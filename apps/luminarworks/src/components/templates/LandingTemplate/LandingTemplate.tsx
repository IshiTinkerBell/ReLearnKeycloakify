import { HeroSection } from "@/components/organisms/HeroSection/HeroSection";
import { StatsBar } from "@/components/organisms/StatsBar/StatsBar";
import { FeaturesSection } from "@/components/organisms/FeaturesSection/FeaturesSection";

interface LandingTemplateProps {
    readonly onSignIn: () => Promise<void>;
}

export function LandingTemplate({ onSignIn }: LandingTemplateProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <HeroSection onSignIn={onSignIn} signUpHref="/signup" />
            <StatsBar />
            <FeaturesSection />
            <footer className="py-8 px-10 text-center border-t border-cyber/[7%] text-[0.8rem] text-slate-700 mt-auto">
                <p>© {new Date().getFullYear()} Arctic Wolves Security. All rights reserved.</p>
            </footer>
        </div>
    );
}
