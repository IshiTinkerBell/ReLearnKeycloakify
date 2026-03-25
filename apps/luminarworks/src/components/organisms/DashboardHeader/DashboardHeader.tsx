interface DashboardHeaderProps {
    readonly userName: string | null | undefined;
    readonly userEmail: string | null | undefined;
    readonly onSignOut: () => Promise<void>;
}

export function DashboardHeader({ userName, userEmail, onSignOut }: DashboardHeaderProps) {
    const initials =
        userName
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2) ?? "AW";

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between px-10 h-16 bg-[rgba(6,9,26,0.85)] backdrop-blur-[12px] border-b border-cyber/10">
            <div className="flex items-center gap-[0.65rem]">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <polygon
                        points="14,2 26,8 26,20 14,26 2,20 2,8"
                        fill="none"
                        stroke="#00d4ff"
                        strokeWidth="1.5"
                    />
                    <polygon
                        points="14,7 21,11 21,17 14,21 7,17 7,11"
                        fill="rgba(0,212,255,0.15)"
                        stroke="#00d4ff"
                        strokeWidth="1"
                    />
                    <circle cx="14" cy="14" r="3" fill="#00d4ff" />
                </svg>
                <span className="text-base font-extrabold text-[#f0f6ff] tracking-[0.02em]">
                    Arctic Wolves
                </span>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex flex-col items-end gap-[0.1rem]">
                    <span className="text-[0.88rem] font-semibold text-slate-200 leading-none">
                        {userName}
                    </span>
                    <span className="text-[0.75rem] text-slate-600 leading-none">{userEmail}</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyber to-cyber-deep text-[#030712] text-[0.78rem] font-extrabold flex items-center justify-center shrink-0">
                    {initials}
                </div>
                <form action={onSignOut}>
                    <button type="submit" className="sign-out-btn">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Sign Out
                    </button>
                </form>
            </div>
        </header>
    );
}
