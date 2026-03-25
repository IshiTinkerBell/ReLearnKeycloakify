import type { ReactNode } from "react";

interface FeatureCardProps {
    readonly icon: ReactNode;
    readonly title: string;
    readonly description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <article className="card-cyber flex flex-col gap-[0.875rem] p-7 transition-all duration-300 hover:-translate-y-[3px] hover:border-cyber/[28%] hover:bg-cyber/[4%]">
            <div className="w-[46px] h-[46px] flex items-center justify-center rounded-[10px] bg-cyber/10 text-cyber shrink-0">
                {icon}
            </div>
            <h3 className="text-base font-bold text-[#f0f6ff] tracking-[0.01em]">{title}</h3>
            <p className="text-[0.88rem] leading-[1.65] text-slate-500">{description}</p>
        </article>
    );
}
