import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function VerifyEmail(
    props: PageProps<Extract<KcContext, { pageId: "verify-email.ftl" }>, I18n>
) {
    const { kcContext, i18n, Template, doUseDefaultCss, classes } = props;
    const { msg } = i18n;
    const { url } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("emailVerifyTitle")}
            displayMessage={false}
        >
            <p id="instruction1" className="instruction">
                {msg("emailVerifyInstruction1")}
            </p>
            <p id="instruction2" className="instruction">
                {msg("emailVerifyInstruction2")}
                &nbsp;
                <a href={url.loginAction}>{msg("doClickHere")}</a>
                &nbsp;
                {msg("emailVerifyInstruction3")}
            </p>
        </Template>
    );
}
