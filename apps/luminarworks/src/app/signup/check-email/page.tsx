import styles from "./CheckEmailPage.module.css";

export default function CheckEmailPage() {
    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={styles.iconWrapper}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                        <rect width="48" height="48" rx="12" fill="rgba(0,212,255,0.08)" />
                        <path d="M10 16a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V16z" stroke="#00d4ff" strokeWidth="1.8" fill="none" />
                        <path d="M10 17l14 10 14-10" stroke="#00d4ff" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                </div>
                <div className={styles.header}>
                    <h1 className={styles.title}>Check your email</h1>
                    <p className={styles.subtitle}>
                        We&apos;ve sent a verification link to your inbox. Click the link to activate your account before signing in.
                    </p>
                </div>
                <ul className={styles.tips}>
                    <li>Check your spam or junk folder if you don&apos;t see it.</li>
                    <li>The link expires after 24 hours.</li>
                </ul>
                <div className={styles.footer}>
                    <a href="/" className={styles.link}>Back to sign in</a>
                </div>
            </div>
        </div>
    );
}
