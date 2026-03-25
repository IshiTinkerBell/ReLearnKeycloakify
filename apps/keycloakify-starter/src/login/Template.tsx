import { useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        documentTitle,
        bodyClassName,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;

    const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", realm.displayName || realm.name);
    }, []);

    useSetClassName({
        qualifiedName: "html",
        className: kcClsx("kcHtmlClass")
    });

    useSetClassName({
        qualifiedName: "body",
        className: bodyClassName ?? kcClsx("kcBodyClass")
    });

    const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    return (
        <div className="min-h-screen bg-night relative overflow-hidden flex items-center justify-center p-4">
            {/* Background effects */}
            <div className="aurora" />
            <div className="aurora-secondary" />
            <div className="grid-overlay" />

            <div className="relative z-10 w-full max-w-[460px] flex flex-col gap-8 py-8">
                {/* Branding */}
                <div className="flex items-center justify-center gap-3">
                    <svg width="32" height="32" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                        <polygon
                            points="14,2 26,8 26,20 14,26 2,20 2,8"
                            fill="none"
                            stroke="#00d4ff"
                            strokeWidth="1.5"
                        />
                        <polygon
                            points="14,7 21,11 21,17 14,21 7,17 7,11"
                            fill="rgba(0,212,255,0.15)"
                            stroke="#00d4ff"
                            strokeWidth="1"
                        />
                        <circle cx="14" cy="14" r="3" fill="#00d4ff" />
                    </svg>
                    <span className="text-xl font-extrabold text-[#f0f6ff] tracking-[0.02em]">
                        Arctic Wolves
                    </span>
                </div>

                {/* Card */}
                <div
                    className="bg-white/[3%] border border-cyber/10 rounded-2xl px-8 py-10 flex flex-col gap-6"
                    style={{ backdropFilter: "blur(4px)" }}
                >
                    {/* Language switcher */}
                    {enabledLanguages.length > 1 && (
                        <div className="flex justify-end">
                            <select
                                onChange={e => (window.location.href = e.target.value)}
                                defaultValue={currentLanguage.href}
                                className="bg-night border border-cyber/20 text-slate-400 text-sm rounded-md px-2 py-1 cursor-pointer outline-none focus:border-cyber/50"
                            >
                                {enabledLanguages.map(({ languageTag, label, href }) => (
                                    <option key={languageTag} value={href}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Title / username display */}
                    {auth !== undefined && auth.showUsername && !auth.showResetCredentials ? (
                        <div className="flex items-center justify-between gap-3">
                            <span className="text-[#f0f6ff] font-semibold text-sm">
                                {auth.attemptedUsername}
                            </span>
                            <a
                                href={url.loginRestartFlowUrl}
                                aria-label={msgStr("restartLoginTooltip")}
                                className="text-cyber text-sm hover:underline shrink-0"
                            >
                                {msg("restartLoginTooltip")}
                            </a>
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-[1.6rem] font-extrabold text-[#f0f6ff] tracking-[-0.02em]">
                                {headerNode}
                            </h1>
                            {displayRequiredFields && (
                                <p className="text-[0.8rem] text-slate-500 mt-1">
                                    <span className="text-red-400">*</span> {msg("requiredFields")}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Alert message */}
                    {displayMessage &&
                        message !== undefined &&
                        (message.type !== "warning" || !isAppInitiatedAction) && (
                            <div
                                className={clsx(
                                    "px-4 py-3 rounded-lg text-sm border",
                                    message.type === "success" &&
                                        "text-green-400 bg-green-400/[8%] border-green-400/20",
                                    message.type === "warning" &&
                                        "text-yellow-400 bg-yellow-400/[8%] border-yellow-400/20",
                                    message.type === "error" &&
                                        "text-red-400 bg-red-400/[8%] border-red-400/20",
                                    message.type === "info" &&
                                        "text-cyber bg-cyber/[8%] border-cyber/20"
                                )}
                                dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }}
                            />
                        )}

                    {/* Page content */}
                    {children}

                    {/* Try another way */}
                    {auth !== undefined && auth.showTryAnotherWayLink && (
                        <form
                            id="kc-select-try-another-way-form"
                            action={url.loginAction}
                            method="post"
                        >
                            <input type="hidden" name="tryAnotherWay" value="on" />
                            <a
                                href="#"
                                className="text-sm text-cyber hover:underline"
                                onClick={event => {
                                    document.forms[
                                        "kc-select-try-another-way-form" as never
                                    ].requestSubmit();
                                    event.preventDefault();
                                    return false;
                                }}
                            >
                                {msg("doTryAnotherWay")}
                            </a>
                        </form>
                    )}

                    {/* Social providers */}
                    {socialProvidersNode}

                    {/* Info area */}
                    {displayInfo && (
                        <div className="border-t border-cyber/[7%] pt-4">{infoNode}</div>
                    )}
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-slate-700">
                    © {new Date().getFullYear()} Arctic Wolves Security. All rights reserved.
                </p>
            </div>
        </div>
    );
}
