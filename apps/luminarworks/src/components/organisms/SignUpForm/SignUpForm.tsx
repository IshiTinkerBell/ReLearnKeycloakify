"use client";

import { useActionState } from "react";
import type { SignUpState } from "@/app/actions";

interface SignUpFormProps {
    readonly signUpAction: (state: SignUpState, formData: FormData) => Promise<SignUpState>;
}

export function SignUpForm({ signUpAction }: SignUpFormProps) {
    const [state, action, isPending] = useActionState(signUpAction, {});

    return (
        <form action={action} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-[0.45rem]">
                    <label
                        htmlFor="firstName"
                        className="text-[0.8rem] font-semibold text-slate-400 tracking-[0.05em] uppercase"
                    >
                        First Name
                    </label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        autoComplete="given-name"
                        className="input-cyber"
                        placeholder="John"
                    />
                </div>
                <div className="flex flex-col gap-[0.45rem]">
                    <label
                        htmlFor="lastName"
                        className="text-[0.8rem] font-semibold text-slate-400 tracking-[0.05em] uppercase"
                    >
                        Last Name
                    </label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        autoComplete="family-name"
                        className="input-cyber"
                        placeholder="Doe"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-[0.45rem]">
                <label
                    htmlFor="email"
                    className="text-[0.8rem] font-semibold text-slate-400 tracking-[0.05em] uppercase"
                >
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="input-cyber"
                    placeholder="john.doe@company.com"
                />
            </div>

            {state.error && (
                <p
                    role="alert"
                    className="text-[0.875rem] text-red-400 bg-red-400/[8%] border border-red-400/20 rounded-lg px-4 py-3"
                >
                    {state.error}
                </p>
            )}

            <button type="submit" disabled={isPending} className="submit-cyber">
                {isPending ? "Creating account…" : "Create Account"}
            </button>
        </form>
    );
}
