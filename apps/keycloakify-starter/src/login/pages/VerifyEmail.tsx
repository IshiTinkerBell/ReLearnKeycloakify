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
            <div className="flex flex-col gap-4">
                <p className="text-slate-400 text-sm leading-relaxed">
                    {msg("emailVerifyInstruction1")}
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                    {msg("emailVerifyInstruction2")}
                    {" "}
                    <a
                        href={url.loginAction}
                        className="text-cyber font-semibold hover:underline"
                    >
                        {msg("doClickHere")}
                    </a>
                    {" "}
                    {msg("emailVerifyInstruction3")}
                </p>
            </div>
        </Template>
    );
}
