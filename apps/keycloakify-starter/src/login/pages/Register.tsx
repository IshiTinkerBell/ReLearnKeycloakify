import { useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function Register(
    props: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { url, messagesPerField, recaptchaRequired, recaptchaVisible, recaptchaSiteKey, recaptchaAction, termsAcceptanceRequired } = kcContext;

    const { msg, msgStr } = i18n;

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("registerTitle")}
            displayRequiredFields
        >
            <form
                id="kc-register-form"
                className={kcClsx("kcFormClass")}
                action={url.registrationAction}
                method="post"
            >
                <UserProfileFormFields
                    kcContext={kcContext}
                    i18n={i18n}
                    kcClsx={kcClsx}
                    onIsFormSubmittableValueChange={setIsFormSubmittable}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />

                {termsAcceptanceRequired && (
                    <div className={kcClsx("kcFormGroupClass")}>
                        <div className={kcClsx("kcLabelWrapperClass")}>
                            <input
                                type="checkbox"
                                id="termsAccepted"
                                name="termsAccepted"
                                className={kcClsx("kcCheckboxInputClass")}
                                checked={areTermsAccepted}
                                onChange={e => setAreTermsAccepted(e.target.checked)}
                                aria-invalid={messagesPerField.existsError("termsAccepted")}
                            />
                            <label htmlFor="termsAccepted" className={kcClsx("kcLabelClass")}>
                                <span
                                    dangerouslySetInnerHTML={{ __html: msgStr("termsText") }}
                                />
                            </label>
                        </div>
                        {messagesPerField.existsError("termsAccepted") && (
                            <span
                                id="input-error-terms-accepted"
                                className={kcClsx("kcInputErrorMessageClass")}
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: messagesPerField.get("termsAccepted") ?? ""
                                }}
                            />
                        )}
                    </div>
                )}

                {recaptchaRequired && (recaptchaVisible || recaptchaAction === undefined) && (
                    <div className={kcClsx("kcFormGroupClass")}>
                        <div className={kcClsx("kcInputWrapperClass")}>
                            <div
                                className="g-recaptcha"
                                data-size="compact"
                                data-sitekey={recaptchaSiteKey}
                                data-action={recaptchaAction}
                            />
                        </div>
                    </div>
                )}

                <div className={kcClsx("kcFormGroupClass")}>
                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        <button
                            disabled={
                                !isFormSubmittable ||
                                (termsAcceptanceRequired && !areTermsAccepted)
                            }
                            className={clsx(
                                kcClsx(
                                    "kcButtonClass",
                                    "kcButtonPrimaryClass",
                                    "kcButtonBlockClass",
                                    "kcButtonLargeClass"
                                )
                            )}
                            type="submit"
                        >
                            {msg("doRegister")}
                        </button>
                    </div>
                </div>
            </form>
        </Template>
    );
}
