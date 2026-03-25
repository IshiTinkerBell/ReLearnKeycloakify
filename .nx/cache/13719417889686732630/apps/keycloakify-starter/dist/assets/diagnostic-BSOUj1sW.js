import{i as k,O as s,W as f}from"./createOidc-riH8GZlE.js";import{c as C}from"./earlyInit_DPoP-CwJ5_Gpx.js";import{c as w}from"./keycloakUtils-BP8H9Md9.js";import"./index-Bes2gMOx.js";function y(a){return fetch(a).then(async e=>{if(!e.ok)return!1;try{await e.json()}catch{return!1}return!0},()=>!1)}function P(a){const{stringWithWildcards:e,candidate:n}=a;if(!e.includes("*"))return e===n;const t=e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/\\\*/g,".*");return new RegExp(`^${t}$`).test(n)}async function T(a){const{issuerUri:e}=a,n=["The OIDC server is either down or the issuerUri you provided is incorrect.",`You provided the issuerUri: ${e}`,`Endpoint that couldn't be reached: ${e}${f}`].join(`
`);if(!k({issuerUri:e}))return new s({messageOrCause:[n,"","If you happen to be using Keycloak, be aware that the issuerUri you provided doesn't match the expected shape.","It should look like: https://<YOUR_KEYCLOAK_DOMAIN><KC_HTTP_RELATIVE_PATH>/realms/<YOUR_REALM>","Unless configured otherwise the KC_HTTP_RELATIVE_PATH is '/' by default on recent version of Keycloak."].join(`
`),isAuthServerLikelyDown:!0});const t=w({issuerUri:e}),u=r=>{const{kcHttpRelativePath:l}=r;return`${t.issuerUriParsed.origin}${l??""}/realms/${encodeURIComponent(t.issuerUriParsed.realm)}`};if(t.issuerUriParsed.kcHttpRelativePath===void 0){const r=u({kcHttpRelativePath:"/auth"});if(await y(`${r}${f}`))return new s({messageOrCause:["Your Keycloak server is configured with KC_HTTP_RELATIVE_PATH=/auth",`The issuerUri you provided: ${e}`,`The correct issuerUri is: ${r}`,"(You are missing the /auth portion)"].join(`
`),isAuthServerLikelyDown:!1})}else{const r=u({kcHttpRelativePath:void 0});if(await y(`${r}${f}`))return new s({messageOrCause:["Your Keycloak server is configured with KC_HTTP_RELATIVE_PATH=/",`The issuerUri you provided: ${e}`,`The correct issuerUri is: ${r}`,`(You should remove the ${t.issuerUriParsed.kcHttpRelativePath} portion.)`].join(`
`),isAuthServerLikelyDown:!1})}return new s({messageOrCause:[n,"","Given the shape of the issuerUri you provided, it seems that you are using Keycloak.",`- Make sure the realm '${t.issuerUriParsed.realm}' exists.`,"- Check the KC_HTTP_RELATIVE_PATH that you might have configured your keycloak server with.",`  For example if you have KC_HTTP_RELATIVE_PATH=/xxx the issuerUri should be ${u({kcHttpRelativePath:"/xxx"})}`].join(`
`),isAuthServerLikelyDown:!0})}async function R(a){const{redirectUri:e,issuerUri:n,clientId:t,authorizationEndpointUrl:u}=a;e:{if(await y(`${n}${f}`))break e;return T({issuerUri:n})}{const r=await fetch(e).then(o=>o.ok?{"Content-Security-Policy":o.headers.get("Content-Security-Policy"),"X-Frame-Options":o.headers.get("X-Frame-Options")}:new Error(`${e} responded with a ${o.status} status code.`),o=>o);if(r instanceof Error)return new s({isAuthServerLikelyDown:!1,messageOrCause:new Error("Unexpected error while trying to diagnose why the silent sign-in process timed out.",{cause:cspOrError})});const l=r;e:{const o=l["Content-Security-Policy"];if(o===null)break e;const d=Object.fromEntries(o.split(";").filter(i=>i!=="").map(i=>{const[m,...p]=i.split(" ");return C(m!==void 0),C(p.length!==0),[m,p]}));t:{const i=d["frame-src"];if(i===void 0||!(()=>{for(const c of i){if(c==="'none'")return!0;const h=new URL(u).origin;if(c==="'self'"&&new URL(location.href).origin===h||P({candidate:h,stringWithWildcards:c}))return!1}return!0})())break t;const p=(()=>{const c=new URL(location.href).hostname,{hostname:h,origin:g}=new URL(u);if(c===h)return"'self'";const[$,v]=c.split(".").reverse();return v&&h.endsWith(`.${v}.${$}`)?`https://*.${v}.${$}`:g})();return new s({isAuthServerLikelyDown:!1,messageOrCause:[`Session restoration via iframe failed due to the following HTTP header on GET ${e}:`,`
Content-Security-Policy “frame-src”: ${i.join("; ")}`,`
This header prevents opening an iframe to ${u}.`,`
To fix this:`,`
  - Update your CSP to: frame-src ${[...i.filter(c=>c!=="'none'"),p]}`,`
  - OR remove the frame-src directive from your CSP`,`
  - OR, if you cannot change your CSP, call bootstrapOidc/createOidc with sessionRestorationMethod: "full page redirect"`,`

More info: https://docs.oidc-spa.dev/v/v10/resources/csp-configuration`].join(" ")})}t:{const i=d["frame-ancestors"];if(i===void 0||!(i.includes("'none'")||!i.includes("'self'")))break t;return new s({isAuthServerLikelyDown:!1,messageOrCause:[`Session restoration via iframe failed due to the following HTTP header on GET ${e}:`,`
Content-Security-Policy “frame-ancestors”: ${i.join("; ")}`,`
This header prevents your app from being iframed by itself.`,`
To fix this:`,`
  - Update your CSP to: frame-ancestors 'self'`,`
  - OR remove the frame-ancestors directive from your CSP`,`
  - OR, if you cannot modify your CSP, call bootstrapOidc/createOidc with sessionRestorationMethod: "full page redirect"`,`

More info: https://docs.oidc-spa.dev/v/v10/resources/csp-configuration`].join(" ")})}}e:{const o="X-Frame-Options",d=l[o];if(d===null||!d.toLowerCase().includes("deny"))break e;return new s({isAuthServerLikelyDown:!1,messageOrCause:[`Session restoration via iframe failed due to the following HTTP header on GET ${e}:`,`
${o}: ${d}`,`
This header prevents your app from being framed by itself.`,`
To fix this, remove the ${o} header and rely on Content-Security-Policy if you need to restrict framing.`,`

More info: https://docs.oidc-spa.dev/v/v10/resources/csp-configuration`].join(" ")})}}return new s({isAuthServerLikelyDown:!1,messageOrCause:[`The silent sign-in process timed out.
`,`Based on the diagnostic performed by oidc-spa the more likely causes are:
`,`- Either the client ID "${t}" does not exist, or
`,`- You forgot to add the OIDC callback URL to the list of Valid Redirect URIs.
`,`Client ID: "${t}"
`,`Callback URL to add to the list of Valid Redirect URIs: "${e}"

`,...(()=>{if(!k({issuerUri:n}))return["Check the documentation of your OIDC server to learn how to configure the public client (Authorization Code Flow + PKCE) properly."];const r=w({issuerUri:n});return[`It seems you are using Keycloak. Follow these steps to resolve the issue:

`,`1. Go to the Keycloak admin console: ${r.adminConsoleUrl_master}
`,`2. Log in as an admin user.
`,`3. In the top left corner select the realm "${r.issuerUriParsed.realm}".
`,`4. In the left menu, click on "Clients".
`,`5. Locate the client "${t}" in the list and click on it.
`,`6. Find "Valid Redirect URIs" and add "${e}" to the list.
`,`7. Save the changes.

`,"For more information, refer to the documentation: https://docs.oidc-spa.dev/v/v10/providers-configuration/keycloak"]})(),`

`,"If nothing works, or if you see in the console a message mentioning 'refused to frame' there might be a problem with your CSP.","Read more: https://docs.oidc-spa.dev/v/v10/resources/csp-configuration"].join(" ")})}async function _(a){const{issuerUri:e,clientId:n}=a;e:{if(await y(`${e}${f}`))break e;return T({issuerUri:e})}return new s({isAuthServerLikelyDown:!1,messageOrCause:[`Failed to fetch the token endpoint.
`,`This is usually due to a CORS issue.
`,`Make sure you have added '${window.location.origin}' to the list of Web Origins`,`in the '${n}' client configuration of your OIDC server.
`,`
`,...(()=>{if(!k({issuerUri:e}))return["Check the documentation of your OIDC server to learn how to configure the public client (Authorization Code Flow + PKCE) properly."];const t=w({issuerUri:e});return[`Since it seems that you are using Keycloak, here are the steps to follow:
`,`1. Go to the Keycloak admin console: ${t.adminConsoleUrl_master}
`,`2. Log in as an admin user.
`,`3. In the top left corner select the realm "${t.issuerUriParsed.realm}".
`,`4. In the left menu, click on "Clients".
`,`5. Find '${n}' in the list of clients and click on it.
`,`6. Find 'Web Origins' and add '${window.location.origin}' to the list.
`,`7. Save the changes.

`,"More info: https://docs.oidc-spa.dev/v/v10/providers-configuration/keycloak"]})()].join(" ")})}export{_ as createFailedToFetchTokenEndpointInitializationError,R as createIframeTimeoutInitializationError,T as createWellKnownOidcConfigurationEndpointUnreachableInitializationError};
