"use client";

import { useActionState } from "react";
import type { SignUpState } from "@/app/actions";
import styles from "./SignUpForm.module.css";

interface SignUpFormProps {
    readonly signUpAction: (state: SignUpState, formData: FormData) => Promise<SignUpState>;
}

export function SignUpForm({ signUpAction }: SignUpFormProps) {
    const [state, action, isPending] = useActionState(signUpAction, {});

    return (
        <form action={action} className={styles.form}>
            <div className={styles.row}>
                <div className={styles.field}>
                    <label htmlFor="firstName" className={styles.label}>First Name</label>
                    <input id="firstName" name="firstName" type="text" required autoComplete="given-name" className={styles.input} placeholder="John" />
                </div>
                <div className={styles.field}>
                    <label htmlFor="lastName" className={styles.label}>Last Name</label>
                    <input id="lastName" name="lastName" type="text" required autoComplete="family-name" className={styles.input} placeholder="Doe" />
                </div>
            </div>

            <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input id="email" name="email" type="email" required autoComplete="email" className={styles.input} placeholder="john.doe@company.com" />
            </div>

{state.error && (
                <p className={styles.error} role="alert">{state.error}</p>
            )}

            <button type="submit" disabled={isPending} className={styles.submit}>
                {isPending ? "Creating account…" : "Create Account"}
            </button>
        </form>
    );
}
