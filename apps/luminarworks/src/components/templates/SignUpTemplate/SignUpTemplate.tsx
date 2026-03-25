import Link from "next/link";
import { SignUpForm } from "@/components/organisms/SignUpForm/SignUpForm";
import type { SignUpState } from "@/app/actions";

interface SignUpTemplateProps {
    readonly signUpAction: (state: SignUpState, formData: FormData) => Promise<SignUpState>;
}

export function SignUpTemplate({ signUpAction }: SignUpTemplateProps) {
    return (
        <div className="min-h-screen bg-night flex items-center justify-center p-4">
            <div className="w-full max-w-[480px] bg-white/[3%] border border-cyber/10 rounded-2xl px-9 py-10 flex flex-col gap-7">
                <div className="flex flex-col gap-[0.6rem]">
                    <div className="flex items-center gap-[0.6rem] mb-2">
                        <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                            <polygon
                                points="20,2 38,34 2,34"
                                fill="none"
                                stroke="#00d4ff"
                                strokeWidth="2.5"
                            />
                            <polygon
                                points="20,10 32,30 8,30"
                                fill="rgba(0,212,255,0.12)"
                                stroke="rgba(0,212,255,0.4)"
                                strokeWidth="1"
                            />
                        </svg>
                        <span className="text-base font-bold text-cyber tracking-[0.04em]">
                            Arctic Wolves
                        </span>
                    </div>
                    <h1 className="text-[1.6rem] font-extrabold text-[#f0f6ff] tracking-[-0.02em]">
                        Create your account
                    </h1>
                    <p className="text-[0.9rem] text-slate-600">
                        Join the frontline of enterprise security.
                    </p>
                </div>

                <SignUpForm signUpAction={signUpAction} />

                <p className="text-center text-[0.875rem] text-slate-600 border-t border-cyber/[7%] pt-1">
                    Already have an account?{" "}
                    <Link href="/" className="text-cyber font-semibold hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
