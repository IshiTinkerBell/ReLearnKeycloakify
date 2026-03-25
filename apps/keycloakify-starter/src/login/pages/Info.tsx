import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function Info(
    props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>
) {
    const { kcContext, i18n, Template, doUseDefaultCss, classes } = props;
    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const { messageHeader, message, actionUri } = kcContext;

    const signInHref = actionUri ?? "http://localhost:3000/login";
    const ctaLabel = actionUri
        ? "Complete your account setup — set a password"
        : "Sign in to Arctic Wolves";

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={messageHeader ?? "Account updated"}
            displayMessage={false}
        >
            <div className="flex flex-col gap-6">
                {message?.summary && (
                    <p
                        className="text-slate-400 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }}
                    />
                )}
                <a
                    href={signInHref}
                    className={`${kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass")} mt-2 no-underline`}
                >
                    {ctaLabel}
                </a>
            </div>
        </Template>
    );
}
