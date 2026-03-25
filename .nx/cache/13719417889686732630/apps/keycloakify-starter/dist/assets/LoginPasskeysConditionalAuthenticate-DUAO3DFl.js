import{r as O,j as e}from"./index-Bes2gMOx.js";import{u as B,g as S,c as F}from"./KcPage-cu43ba7v.js";import{a as N}from"./assert-vnZbOQIH.js";import{w}from"./waitForElementMountedOnDom-qpCjLZnq.js";import"./logo-kaIfqRYZ.js";N();N();function $(j){const{authButtonId:i,kcContext:c,i18n:o}=j,{url:l,isUserIdentified:b,challenge:m,userVerification:d,rpId:k,createTimeout:u}=c,{msgStr:p,isFetchingTranslations:h}=o,{insertScriptTags:n}=B({componentOrHookName:"LoginPasskeysConditionalAuthenticate",scriptTags:[{type:"module",textContent:()=>`
                    import { authenticateByWebAuthn } from "${l.resourcesPath}/js/webauthnAuthenticate.js";
                    import { initAuthenticate } from "${l.resourcesPath}/js/passkeysConditionalAuth.js";

                    const authButton = document.getElementById("${i}");
                    const input = {
                        isUserIdentified : ${b},
                        challenge : ${JSON.stringify(m)},
                        userVerification : ${JSON.stringify(d)},
                        rpId : ${JSON.stringify(k)},
                        createTimeout : ${u}
                    };
                    authButton.addEventListener("click", () => {
                        authenticateByWebAuthn({
                            ...input,
                            errmsg : ${JSON.stringify(p("webauthn-unsupported-browser-text"))}
                        });
                    }, { once: true });

                    initAuthenticate({
                        ...input,
                        errmsg : ${JSON.stringify(p("passkey-unsupported-browser-text"))}
                    }, available => {
                        const loginForm = document.getElementById("kc-form-login");
                        const passkeyButton = document.getElementById("kc-form-passkey-button");

                        if (!loginForm || !passkeyButton) {
                            return;
                        }

                        if (available) {
                            loginForm.style.display = "block";
                        } else {
                            passkeyButton.style.display = "block";
                        }
                    });
                `}]});O.useEffect(()=>{h||(async()=>(await w({elementId:i}),n()))()},[h])}function J(j){var i;const{kcContext:c,i18n:o,doUseDefaultCss:l,Template:b,classes:m}=j,{messagesPerField:d,login:k,url:u,usernameHidden:p,shouldDisplayAuthenticators:h,authenticators:n,registrationDisabled:I,realm:y}=c,{msg:r,msgStr:A,advancedMsg:f}=o,{kcClsx:t}=S({doUseDefaultCss:l,classes:m}),C="authenticateWebAuthnButton";return $({authButtonId:C,kcContext:c,i18n:o}),e.jsxs(b,Object.assign({kcContext:c,i18n:o,doUseDefaultCss:l,classes:m,headerNode:r("passkey-login-title"),infoNode:y.registrationAllowed&&!I&&e.jsx("div",Object.assign({id:"kc-registration"},{children:e.jsxs("span",{children:["$",r("noAccount")," ",e.jsx("a",Object.assign({tabIndex:6,href:u.registrationUrl},{children:r("doRegister")}))]})}))},{children:[e.jsxs("form",Object.assign({id:"webauth",action:u.loginAction,method:"post"},{children:[e.jsx("input",{type:"hidden",id:"clientDataJSON",name:"clientDataJSON"}),e.jsx("input",{type:"hidden",id:"authenticatorData",name:"authenticatorData"}),e.jsx("input",{type:"hidden",id:"signature",name:"signature"}),e.jsx("input",{type:"hidden",id:"credentialId",name:"credentialId"}),e.jsx("input",{type:"hidden",id:"userHandle",name:"userHandle"}),e.jsx("input",{type:"hidden",id:"error",name:"error"})]})),e.jsxs("div",Object.assign({className:t("kcFormGroupClass"),"no-bottom-margin":"true",style:{marginBottom:0}},{children:[n!==void 0&&Object.keys(n).length!==0&&e.jsxs(e.Fragment,{children:[e.jsx("form",Object.assign({id:"authn_select",className:t("kcFormClass")},{children:n.authenticators.map((s,a)=>e.jsx("input",{type:"hidden",name:"authn_use_chk",readOnly:!0,value:s.credentialId},a))})),h&&e.jsxs(e.Fragment,{children:[n.authenticators.length>1&&e.jsx("p",Object.assign({className:t("kcSelectAuthListItemTitle")},{children:r("passkey-available-authenticators")})),e.jsx("div",Object.assign({className:t("kcFormClass")},{children:n.authenticators.map((s,a)=>e.jsxs("div",Object.assign({id:`kc-webauthn-authenticator-item-${a}`,className:t("kcSelectAuthListItemClass")},{children:[e.jsx("i",{className:F((()=>{const g=t(s.transports.iconClass);return g===s.transports.iconClass?t("kcWebAuthnDefaultIcon"):g})(),t("kcSelectAuthListItemIconPropertyClass"))}),e.jsxs("div",Object.assign({className:t("kcSelectAuthListItemBodyClass")},{children:[e.jsx("div",Object.assign({id:`kc-webauthn-authenticator-label-${a}`,className:t("kcSelectAuthListItemHeadingClass")},{children:f(s.label)})),s.transports!==void 0&&s.transports.displayNameProperties!==void 0&&s.transports.displayNameProperties.length!==0&&e.jsx("div",Object.assign({id:`kc-webauthn-authenticator-transport-${a}`,className:t("kcSelectAuthListItemDescriptionClass")},{children:s.transports.displayNameProperties.map((g,x,v)=>e.jsxs(O.Fragment,{children:[e.jsxs("span",{children:[" ",f(g)," "]},x),x!==v.length-1&&e.jsx("span",{children:", "})]},x))})),e.jsxs("div",Object.assign({className:t("kcSelectAuthListItemDescriptionClass")},{children:[e.jsx("span",Object.assign({id:`kc-webauthn-authenticator-createdlabel-${a}`},{children:r("passkey-createdAt-label")})),e.jsx("span",Object.assign({id:`kc-webauthn-authenticator-created-${a}`},{children:s.createdAt}))]}))]})),e.jsx("div",{className:t("kcSelectAuthListItemFillClass")})]}),a))}))]})]}),e.jsx("div",Object.assign({id:"kc-form"},{children:e.jsxs("div",Object.assign({id:"kc-form-wrapper"},{children:[y.password&&e.jsx("form",Object.assign({id:"kc-form-login",action:u.loginAction,method:"post",style:{display:"none"},onSubmit:s=>{try{s.target.login.disabled=!0}catch{}return!0}},{children:!p&&e.jsxs("div",Object.assign({className:t("kcFormGroupClass")},{children:[e.jsx("label",Object.assign({htmlFor:"username",className:t("kcLabelClass")},{children:r("passkey-autofill-select")})),e.jsx("input",{tabIndex:1,id:"username","aria-invalid":d.existsError("username"),className:t("kcInputClass"),name:"username",defaultValue:(i=k.username)!==null&&i!==void 0?i:"",autoComplete:"username webauthn",type:"text",autoFocus:!0}),d.existsError("username")&&e.jsx("span",Object.assign({id:"input-error-username",className:t("kcInputErrorMessageClass"),"aria-live":"polite"},{children:d.get("username")}))]}))})),e.jsx("div",Object.assign({id:"kc-form-passkey-button",className:t("kcFormButtonsClass"),style:{display:"none"}},{children:e.jsx("input",{id:C,type:"button",autoFocus:!0,value:A("passkey-doAuthenticate"),className:t("kcButtonClass","kcButtonPrimaryClass","kcButtonBlockClass","kcButtonLargeClass")})}))]}))}))]}))]}))}export{J as default};
