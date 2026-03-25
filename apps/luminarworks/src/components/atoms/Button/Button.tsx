import styles from "./Button.module.css";

interface ButtonProps {
    children: React.ReactNode;
    type?: "button" | "submit";
    variant?: "primary" | "ghost";
}

export function Button({ children, type = "button", variant = "primary" }: ButtonProps) {
    return (
        <button type={type} className={`${styles.button} ${styles[variant]}`}>
            {children}
        </button>
    );
}
