import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function Info(
    props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>
) {
    const { kcContext, i18n, Template, doUseDefaultCss, classes } = props;
    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const { msg } = i18n;
    const { messageHeader, message, actionUri } = kcContext;

    const signInHref = actionUri ?? "http://localhost:3000/login";
    const ctaLabel = actionUri
        ? "Set your password to complete your account setup"
        : "Login to the application";

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={messageHeader ?? "Account updated"}
            displayMessage={false}
        >
            <div id="kc-info-message">
                {message?.summary && (
                    <p
                        className="instruction"
                        dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }}
                    />
                )}
                <p>
                    <a
                        href={signInHref}
                        className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonLargeClass")}
                    >
                        {ctaLabel}
                    </a>
                </p>
            </div>
        </Template>
    );
}
