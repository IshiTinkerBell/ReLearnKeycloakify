import { type ButtonProps, Button } from "@patternfly/react-core";
import { css } from "@patternfly/react-styles";
import styles from "./CustomButton.module.css";

export function CustomButton(props: ButtonProps) {
    const { children, variant = "primary", className: className_props, ...rest } = props;

    const className = css(styles.button, styles[variant], className_props);

    if (variant === "link") {
        return (
            <Button {...rest} className={className} variant="link">
                {children}
            </Button>
        );
    }

    return (
        <Button {...rest} className={className}>
            {children}
        </Button>
    );
}
