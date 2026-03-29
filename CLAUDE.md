# Project: Keycloakify Monorepo

Nx monorepo with pnpm workspaces. Two apps:

| App | Path | Purpose | Dev command |
|-----|------|---------|-------------|
| `keycloakify-starter` | `apps/keycloakify-starter/` | Keycloak custom theme (Vite + Storybook) | `pnpm exec nx storybook keycloakify-starter` → :6006 |
| `luminarworks` | `apps/luminarworks/` | Next.js 15 + NextAuth v5 consumer app | `pnpm exec nx dev luminarworks` → :3000 |
| `myclaudeapp` | `apps/myclaudeapp/` | Next.js 15 Figma-to-code learning app (auth-free) | `pnpm exec nx dev myclaudeapp` → :3002 |

> The root `src/` no longer exists — it was a leftover and has been deleted. All source lives under `apps/<app>/src/`.

---

## apps/keycloakify-starter

**Themes:** `vanila` (default) | `chocolate`
**Keycloakify version:** 11.x
**Account theme:** `Single-Page` (SPA implementation via `@keycloakify/keycloak-account-ui`)
**CSS framework:** Tailwind CSS v4 (via `@tailwindcss/vite` plugin)

### How Keycloakify works

Keycloakify converts React components into Keycloak FreeMarker (`.ftl`) themes bundled as a JAR file. At runtime inside Keycloak, the server injects `window.kcContext` (a JSON object with realm/auth/url data) into the page. The React app reads this and renders the appropriate page component. Outside Keycloak (Storybook/dev), `window.kcContext` is mocked.

**Theme types supported:** Login | Account | Email | Admin
**Keycloak compatibility:** v11 through latest (two JARs generated for v11-21/26+ and v22-25)

### Core architecture — file roles

| File | Role |
|------|------|
| `src/kc.gen.tsx` | **Auto-generated** by `update-kc-gen`. Exports `ThemeName`, `KcEnvName`, top-level `KcPage` that dispatches to login/account/admin. **Never edit manually.** |
| `src/main.tsx` | Entry point. Reads `window.kcContext`, renders `<KcPage kcContext={window.kcContext} />`. |
| `src/login/KcContext.ts` | Extends base `KcContext` with custom fields (`themeName`, env vars). Uses `ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>`. |
| `src/login/KcPage.tsx` | Page router. Switches on `kcContext.pageId` to render custom or `DefaultPage`. Imports `theme.css`. Sets `doUseDefaultCss={false}` and shared `classes` mapping for ALL pages. |
| `src/login/Template.tsx` | Shell wrapper rendered by every page. Full Arctic Wolves dark layout (aurora + grid bg, centered card, hex logo). Props: `kcContext`, `i18n`, `doUseDefaultCss`, `classes`, `headerNode`, `displayMessage`, `displayRequiredFields`, `displayInfo`, `socialProvidersNode`, `infoNode`, `children`. |
| `src/login/i18n.ts` | i18n setup. Uses `i18nBuilder.withThemeName<ThemeName>().build()`. Exports `useI18n`, `I18n` type. |
| `src/login/KcPageStory.tsx` | Storybook helper. Calls `createGetKcContextMock` to produce typed mock contexts. `createKcPageStory({ pageId })` returns a `KcPageStory` component that accepts partial `kcContext` overrides. |
| `src/login/theme.css` | Tailwind v4 entry. `@import "tailwindcss"`. Arctic Wolves `@theme` tokens. `@layer components`: `.kc-input`, `.kc-btn`, `.kc-btn-primary`, `.kc-btn-ghost`. Raw CSS for aurora/grid effects. |

### Key files
- `src/login/KcPage.tsx` — routes custom pages; sets `doUseDefaultCss={false}` + `classes` for all pages
- `src/login/pages/Register.tsx` — custom register page using `UserProfileFormFields`
- `src/login/pages/Register.stories.tsx` — 12+ Storybook stories; `Default`=vanila, `DefaultChocolate`=chocolate
- `src/login/pages/VerifyEmail.tsx` — custom verify email page with Tailwind styling
- `src/login/pages/LoginUpdatePassword.tsx` — custom update-password page with Tailwind styling
- `src/login/pages/Info.tsx` — custom info page; CTA goes to `actionUri` or `http://localhost:3000/login`
- `src/login/Template.tsx` — Arctic Wolves full-page layout (aurora bg, glass card, hex logo)
- `src/login/theme.css` — Tailwind v4 entry with design tokens and component classes
- `src/login/main.css` / `main-vanila.css` / `main-chocolate.css` — kept as empty comment stubs (styles moved to theme.css + Tailwind)

### CSS customization system — Tailwind + Keycloakify pattern

**The approach used in this project:**
```tsx
// KcPage.tsx — applied to ALL pages including DefaultPage
const classes = {
    kcFormGroupClass: "flex flex-col gap-1 mb-4",
    kcLabelClass: "text-[0.8rem] font-semibold text-slate-400 tracking-[0.05em] uppercase",
    kcInputClass: "kc-input",           // defined in theme.css @layer components
    kcInputErrorMessageClass: "text-[0.8rem] text-red-400 mt-1 block",
    kcButtonClass: "kc-btn",
    kcButtonPrimaryClass: "kc-btn-primary",
    kcButtonDefaultClass: "kc-btn-ghost",
    kcButtonBlockClass: "w-full",
    kcAlertClass: "hidden",
    kcAlertTitleClass: "hidden",
} satisfies { [key in ClassKey]?: string };

// ALL pages rendered with:
doUseDefaultCss={false}   // disables ALL PatternFly styles
classes={classes}         // applies Arctic Wolves mapping
```

This means both custom pages AND `DefaultPage`/`UserProfileFormFields` internal components pick up Arctic Wolves styling without any per-page CSS work.

**Two class types in Keycloakify:**
- **`kc*` classes** (e.g. `kcLabelClass`, `kcButtonClass`) — no default styles; mapped to custom CSS via `classes` prop.
- **`pf-` classes** — PatternFly framework classes (eliminated by `doUseDefaultCss={false}`).

`getKcClsx({ doUseDefaultCss, classes })` resolves which classes are applied on a given element.

### Tailwind CSS v4 setup (Vite)

Uses `@tailwindcss/vite` plugin — NOT PostCSS (that's for Next.js):

```ts
// vite.config.ts
import tailwindcss from "@tailwindcss/vite";
plugins: [react(), tailwindcss(), keycloakify({ ... })]
```

```css
/* theme.css */
@import "tailwindcss";

@theme {
    --color-night: #06091a;
    --color-cyber: #00d4ff;
    --color-cyber-deep: #0288d1;
}

@layer components {
    .kc-input { /* dark input field with cyber focus ring */ }
    .kc-btn { /* base button */ }
    .kc-btn-primary { /* cyan gradient button with glow */ }
    .kc-btn-ghost { /* transparent border button */ }
}
```

### Arctic Wolves design tokens

| Token | Value | Tailwind class |
|-------|-------|----------------|
| `--color-night` | `#06091a` | `bg-night`, `text-night` |
| `--color-cyber` | `#00d4ff` | `text-cyber`, `border-cyber`, `bg-cyber` |
| `--color-cyber-deep` | `#0288d1` | `text-cyber-deep`, `from-cyber-deep` |

Opacity modifiers: `border-cyber/10`, `bg-cyber/8`, `bg-white/[3%]`

### Adding a new custom page

1. Create `src/login/pages/MyPage.tsx` — props type: `PageProps<Extract<KcContext, { pageId: "my-page.ftl" }>, I18n>`
2. Add the story: `npx keycloakify add-story` (interactive CLI) or manually create `MyPage.stories.tsx`
3. Route it in `KcPage.tsx`: add `case "my-page.ftl": return <MyPage ... />`
   - Pass `doUseDefaultCss={false}` and `classes={classes}` — same as all other pages

### Story pattern

```tsx
// MyPage.stories.tsx
import { createKcPageStory } from "../KcPageStory";
const { KcPageStory } = createKcPageStory({ pageId: "my-page.ftl" });
export const Default: Story = { render: () => <KcPageStory /> };
export const WithError: Story = {
    render: () => <KcPageStory kcContext={{ message: { type: "error", summary: "..." } }} />
};
```

`kcContext` overrides are **deeply partial** — only specify what you want to change.

### Multi-theme setup

Defined in `vite.config.ts`:
```ts
keycloakify({ themeName: ["vanila", "chocolate"], accountThemeImplementation: "Single-Page" })
```
`kc.gen.tsx` auto-generates `ThemeName = "vanila" | "chocolate"`. Access active theme via `kcContext.themeName` at runtime.

### Keycloak local instance
- Realm: `myrealm` | Client: `myclient`
- Realm export: `.keycloakify/realm-kc-26.json`
- Run: `pnpm exec nx start-keycloak keycloakify-starter`
- Admin console: `http://localhost:8080` | Test user: `testuser / password123`
- Theme preview (hot reload): `https://my-theme.keycloakify.dev`

### Build & deploy

```bash
# Build JAR (runs tsc + vite build + keycloakify build)
pnpm exec nx build-keycloak-theme keycloakify-starter
# or inside the app:
npm run build-keycloak-theme
```

Outputs to `dist_keycloak/`:
- `keycloak-theme-for-kc-all-other-versions.jar` — Keycloak 11–21, 26+
- `keycloak-theme-for-kc-22-to-25.jar` — Keycloak 22–25

Deploy: copy JAR to `/opt/keycloak/providers/`, then run `bin/kc.sh build`.
Enable: Admin Console → Realm Settings → Themes → select theme name.

### Dev mode page testing (without Storybook)

Uncomment the block in `src/main.tsx`:
```ts
import { getKcContextMock } from "./login/KcPageStory";
if (import.meta.env.DEV) {
    window.kcContext = getKcContextMock({ pageId: "register.ftl", overrides: {} });
}
```
Then run `pnpm dev` to render a specific page in the browser with hot reload.

### Extending KcContext (custom server-side properties)

To add data from Keycloak (e.g. custom realm attributes) to `window.kcContext`, extend `KcContextExtension` in `src/login/KcContext.ts` and add corresponding FreeMarker logic. See: `https://docs.keycloakify.dev/faq-and-help/some-values-you-need-are-missing-from-in-kccontext`

---

## apps/luminarworks

**Stack:** Next.js 15 App Router, NextAuth v5, Tailwind CSS v4
**Theme:** Arctic Wolves Security Portal — dark (`#06091a`), cyan accent (`#00d4ff`)
**Design pattern:** Atomic design (atoms → molecules → organisms → templates → pages)

### Tailwind CSS v4 setup (Next.js / PostCSS)

Uses `@tailwindcss/postcss` — NOT the Vite plugin:

```js
// postcss.config.mjs
const config = { plugins: { "@tailwindcss/postcss": {} } };
export default config;
```

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
    --color-night: #06091a;
    --color-cyber: #00d4ff;
    --color-cyber-deep: #0288d1;
}

@layer components {
    .btn { ... }
    .btn-primary { ... }
    .btn-ghost { ... }
    .input-cyber { ... }
    .card-cyber { ... }
    .submit-cyber { ... }
    .sign-out-btn { ... }
}
/* Raw CSS for aurora/aurora-secondary/grid-overlay visual effects */
```

No `tailwind.config.js` needed for Tailwind v4.

### Routes
| Route | File | Notes |
|-------|------|-------|
| `/` | `src/app/page.tsx` | Landing page; redirects to `/dashboard` if session exists |
| `/dashboard` | `src/app/dashboard/page.tsx` | Protected dashboard |
| `/signup` | `src/app/signup/page.tsx` | Sign-up form; redirects to `/dashboard` if already signed in |
| `/signup/check-email` | `src/app/signup/check-email/page.tsx` | Post-registration email verification prompt |
| `/login` | `src/app/login/route.ts` | **Route Handler** (GET) — triggers NextAuth Keycloak sign-in; required because page.tsx cannot call signIn() |
| `/api/auth/[...nextauth]` | NextAuth handler | OAuth callback |

### Route Handler — `/login`

`/login` MUST be a Route Handler (`route.ts`), not a page. `signIn()` modifies cookies, which is only allowed in Server Actions or Route Handlers — calling it from `page.tsx` throws "Cookies can only be modified in Server Action or Route Handler".

```ts
// src/app/login/route.ts
import { signIn } from "@/auth";
export async function GET() {
    await signIn("keycloak", { redirectTo: "/dashboard" }, { prompt: "login" });
}
```

This endpoint is used by the Info.ftl page CTA to send users back to the Keycloak login flow after registration/password-setup.

### Sign-up flow

1. User fills `SignUpForm` → `signUpAction` creates Keycloak user → redirect to `/signup/check-email`
2. User verifies email → Keycloak sends to `verify-email.ftl` (custom `VerifyEmail` page)
3. User verifies → Keycloak sends `info.ftl` (custom `Info` page) with `actionUri` for password setup
4. User clicks CTA → goes to `actionUri` (Keycloak required-action) to set password via `login-update-password.ftl`
5. After password set → Keycloak sends `info.ftl` again (no `actionUri`) → CTA goes to `http://localhost:3000/login`
6. `GET /login` triggers NextAuth Keycloak sign-in → user lands on `/dashboard`

### Server actions (`src/app/actions.ts`)
- `signInWithKeycloak()` — NextAuth signIn with `prompt: "login"` (forces Keycloak login UI even with existing SSO session)
- `signOutAction()` — NextAuth signOut → redirect `/`
- `signUpAction(prevState, formData)` — creates Keycloak user via Admin REST API:
  1. Gets admin token from `{baseUrl}/realms/master/protocol/openid-connect/token`
  2. POSTs to `{baseUrl}/admin/realms/{realm}/users`
  3. Returns `{ error }` on failure | `redirect("/signup/check-email")` on success

### Component tree
```
atoms/        Badge, Button (primary | ghost)
molecules/    HeroContent, FeatureCard, StatItem, MetricCard
organisms/    HeroSection, StatsBar, FeaturesSection, DashboardHeader, SignUpForm (client)
templates/    LandingTemplate, DashboardTemplate, SignUpTemplate
```

No CSS Modules — all components use Tailwind utilities + named global classes from `globals.css`.

### Environment variables (`apps/luminarworks/.env.local`)
```
AUTH_SECRET
AUTH_KEYCLOAK_ID=myclient
AUTH_KEYCLOAK_SECRET
AUTH_KEYCLOAK_ISSUER=http://localhost:8080/realms/myrealm
KEYCLOAK_ADMIN_USERNAME=admin
KEYCLOAK_ADMIN_PASSWORD=admin
APP_URL=http://localhost:3000
```

### Next.js best practices applied
- `<Link>` for all internal navigation (never `<a href>` for internal routes)
- `suppressHydrationWarning` on `<html>` in `layout.tsx`
- `loading.tsx` at `/` and `/dashboard` for Suspense streaming
- `readonly` on all component props interfaces
- `"use server"` actions in dedicated `actions.ts` module (SonarLint S7721)

---

## Code style rules (SonarLint — fix immediately on IDE diagnostic)

| Rule | Fix |
|------|-----|
| S6759 | Mark component props as `readonly` |
| S7721 | `"use server"` actions must be in a dedicated module, not inline in components |
| S4325 | Remove unnecessary type assertions |
| S6594 | Use `RegExp.exec(str)` not `str.match(regex)` |
| S6551 | Narrow `FormDataEntryValue` with `typeof val === "string"` before using string methods |
| S7780 | Use `String.raw\`...\`` for regex patterns containing backslashes |
