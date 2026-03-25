import { SignUpForm } from "@/components/organisms/SignUpForm/SignUpForm";
import type { SignUpState } from "@/app/actions";
import styles from "./SignUpTemplate.module.css";

interface SignUpTemplateProps {
    readonly signUpAction: (state: SignUpState, formData: FormData) => Promise<SignUpState>;
}

export function SignUpTemplate({ signUpAction }: SignUpTemplateProps) {
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.logo}>
                        <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                            <polygon points="20,2 38,34 2,34" fill="none" stroke="#00d4ff" strokeWidth="2.5" />
                            <polygon points="20,10 32,30 8,30" fill="rgba(0,212,255,0.12)" stroke="rgba(0,212,255,0.4)" strokeWidth="1" />
                        </svg>
                        <span className={styles.logoText}>Arctic Wolves</span>
                    </div>
                    <h1 className={styles.title}>Create your account</h1>
                    <p className={styles.subtitle}>Join the frontline of enterprise security.</p>
                </div>

                <SignUpForm signUpAction={signUpAction} />

                <p className={styles.loginPrompt}>
                    Already have an account?{" "}
                    <a href="/" className={styles.loginLink}>Sign in</a>
                </p>
            </div>
        </div>
    );
}
