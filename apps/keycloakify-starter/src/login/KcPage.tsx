import "./theme.css";
import { Suspense, lazy, useEffect } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "./Template";

const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const Register = lazy(() => import("./pages/Register"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const LoginUpdatePassword = lazy(() => import("./pages/LoginUpdatePassword"));
const Info = lazy(() => import("./pages/Info"));

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    useEffect(() => {
        switch (kcContext.themeName) {
            case "chocolate":
                import("./main-chocolate.css");
                break;
            case "vanila":
                import("./main-vanila.css");
                break;
        }
    }, []);

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "register.ftl":
                        return (
                            <Register
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={false}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                    case "verify-email.ftl":
                        return (
                            <VerifyEmail
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={false}
                            />
                        );
                    case "login-update-password.ftl":
                        return (
                            <LoginUpdatePassword
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={false}
                            />
                        );
                    case "info.ftl":
                        return (
                            <Info
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={false}
                            />
                        );
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={false}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

const classes = {
    /* Form structure */
    kcFormGroupClass: "flex flex-col gap-1 mb-4",
    kcLabelWrapperClass: "mb-1",
    kcLabelClass:
        "text-[0.8rem] font-semibold text-slate-400 tracking-[0.05em] uppercase",
    kcInputWrapperClass: "",
    kcInputClass: "kc-input",
    kcInputErrorMessageClass: "text-[0.8rem] text-red-400 mt-1 block",

    /* Buttons */
    kcFormButtonsClass: "mt-2",
    kcFormButtonsWrapperClass: "flex flex-col gap-2",
    kcButtonClass: "kc-btn",
    kcButtonPrimaryClass: "kc-btn-primary",
    kcButtonDefaultClass: "kc-btn-ghost",
    kcButtonBlockClass: "w-full",
    kcButtonLargeClass: "",

    /* Checkbox */
    kcCheckboxInputClass: "mr-2 accent-cyber",

    /* Social providers */
    kcFormSocialAccountSectionClass: "mt-4 pt-4 border-t border-cyber/[7%] flex flex-col gap-3",
    kcFormSocialAccountListClass: "flex flex-col gap-2",
    kcFormSocialAccountButtonClass: "kc-btn kc-btn-ghost w-full",

    /* Sign-up / info links */
    kcSignUpClass: "mt-4 pt-4 border-t border-cyber/[7%] text-center text-sm text-slate-600",

    /* Alerts */
    kcAlertClass: "hidden",
    kcAlertTitleClass: "hidden",
} satisfies { [key in ClassKey]?: string };
