import Link from "next/link";

export default function CheckEmailPage() {
    return (
        <div className="min-h-screen bg-night flex items-center justify-center p-4">
            <div className="w-full max-w-[440px] bg-white/[3%] border border-cyber/10 rounded-2xl px-9 py-10 flex flex-col items-center gap-6 text-center">
                <div className="flex items-center justify-center">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                        <rect width="48" height="48" rx="12" fill="rgba(0,212,255,0.08)" />
                        <path
                            d="M10 16a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V16z"
                            stroke="#00d4ff"
                            strokeWidth="1.8"
                            fill="none"
                        />
                        <path
                            d="M10 17l14 10 14-10"
                            stroke="#00d4ff"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                <div className="flex flex-col gap-[0.6rem]">
                    <h1 className="text-[1.6rem] font-extrabold text-[#f0f6ff] tracking-[-0.02em]">
                        Check your email
                    </h1>
                    <p className="text-[0.9rem] text-slate-400 leading-[1.6]">
                        We&apos;ve sent a verification link to your inbox. Click the link to
                        activate your account before signing in.
                    </p>
                </div>

                <ul className="w-full flex flex-col gap-[0.4rem] border-t border-cyber/[7%] pt-5 list-none">
                    <li className="text-[0.825rem] text-slate-600">
                        Check your spam or junk folder if you don&apos;t see it.
                    </li>
                    <li className="text-[0.825rem] text-slate-600">
                        The link expires after 24 hours.
                    </li>
                </ul>

                <div className="w-full border-t border-cyber/[7%] pt-5">
                    <Link href="/" className="text-[0.875rem] text-cyber font-semibold hover:underline">
                        Back to sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
