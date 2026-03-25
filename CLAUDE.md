# Project: Keycloakify Monorepo

Nx monorepo with pnpm workspaces. Two apps:

| App | Path | Purpose | Dev command |
|-----|------|---------|-------------|
| `keycloakify-starter` | `apps/keycloakify-starter/` | Keycloak custom theme (Vite + Storybook) | `pnpm exec nx storybook keycloakify-starter` → :6006 |
| `luminarworks` | `apps/luminarworks/` | Next.js 15 + NextAuth v5 consumer app | `pnpm exec nx dev luminarworks` → :3000 |

> The root `src/` no longer exists — it was a leftover and has been deleted. All source lives under `apps/<app>/src/`.

---

## apps/keycloakify-starter

**Themes:** `vanila` (default) | `chocolate`
**Keycloakify version:** 11.x
**Account theme:** `Single-Page` (SPA implementation via `@keycloakify/keycloak-account-ui`)

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
| `src/login/KcPage.tsx` | Page router. Switches on `kcContext.pageId` (`"register.ftl"`, etc.) to render custom or `DefaultPage`. Also handles per-theme CSS import via `kcContext.themeName`. |
| `src/login/Template.tsx` | Shell wrapper rendered by every page. Props: `kcContext`, `i18n`, `doUseDefaultCss`, `classes`, `headerNode`, `displayMessage`, `displayRequiredFields`, `displayInfo`, `socialProvidersNode`, `infoNode`, `children`. |
| `src/login/i18n.ts` | i18n setup. Uses `i18nBuilder.withThemeName<ThemeName>().build()`. Exports `useI18n`, `I18n` type. |
| `src/login/KcPageStory.tsx` | Storybook helper. Calls `createGetKcContextMock` to produce typed mock contexts. `createKcPageStory({ pageId })` returns a `KcPageStory` component that accepts partial `kcContext` overrides. |

### Key files
- `src/login/KcPage.tsx` — routes `register.ftl` to custom Register; everything else → DefaultPage
- `src/login/pages/Register.tsx` — custom register page using UserProfileFormFields
- `src/login/pages/Register.stories.tsx` — 12+ Storybook stories; Default=vanila, DefaultChocolate=chocolate
- `src/login/Template.tsx` — custom Template with per-theme logo switching
- `src/login/main.css` — shared button overrides (purple gradient `#6a11cb → #2575fc`)
- `src/login/main-vanila.css` / `main-chocolate.css` — per-theme backgrounds

### CSS customization system

Two class types coexist in every Keycloakify component:

- **`kc*` classes** (e.g. `kcLabelClass`, `kcButtonClass`) — no default styles; pure CSS selectors for your custom styles.
- **`pf-` classes** — PatternFly framework classes providing the default look.

**Controlling styles:**
```tsx
// Remove specific default styles by overriding with empty string:
const classes = { kcButtonClass: "", kcButtonPrimaryClass: "" } satisfies { [key in ClassKey]?: string };

// Disable ALL PatternFly styles globally:
<MyPage doUseDefaultCss={false} ... />

// Use a CSS framework (Tailwind/Bootstrap) by mapping kc classes:
const classes = { kcLabelClass: "form-label col-form-label" };
```

`getKcClsx({ doUseDefaultCss, classes })` resolves which classes are applied on a given element.

### Adding a new custom page

1. Create `src/login/pages/MyPage.tsx` — props type: `PageProps<Extract<KcContext, { pageId: "my-page.ftl" }>, I18n>`
2. Add the story: `npx keycloakify add-story` (interactive CLI) or manually create `MyPage.stories.tsx`
3. Route it in `KcPage.tsx`: add `case "my-page.ftl": return <MyPage ... />`

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

**Stack:** Next.js 15 App Router, NextAuth v5, CSS Modules
**Theme:** Arctic Wolves Security Portal — dark (`#06091a`), cyan accent (`#00d4ff`)
**Design pattern:** Atomic design (atoms → molecules → organisms → templates → pages)

### Routes
| Route | File | Notes |
|-------|------|-------|
| `/` | `src/app/page.tsx` | Landing page; redirects to `/dashboard` if session exists |
| `/dashboard` | `src/app/dashboard/page.tsx` | Protected dashboard |
| `/signup` | `src/app/signup/page.tsx` | Sign-up form; redirects to `/dashboard` if already signed in |

### Server actions (`src/app/actions.ts`)
- `signInWithKeycloak()` — NextAuth signIn with `prompt: "login"` (forces Keycloak login UI even with existing SSO session)
- `signOutAction()` — NextAuth signOut → redirect `/`
- `signUpAction(prevState, formData)` — creates Keycloak user via Admin REST API:
  1. Gets admin token from `{baseUrl}/realms/master/protocol/openid-connect/token`
  2. POSTs to `{baseUrl}/admin/realms/{realm}/users`
  3. Returns `{ error }` on failure | `redirect("/")` on success

### Component tree
```
atoms/        Badge, Button (primary | ghost)
molecules/    HeroContent, FeatureCard, StatItem, MetricCard
organisms/    HeroSection, StatsBar, FeaturesSection, DashboardHeader, SignUpForm (client)
templates/    LandingTemplate, DashboardTemplate, SignUpTemplate
```

### Environment variables (`apps/luminarworks/.env.local`)
```
AUTH_SECRET
AUTH_KEYCLOAK_ID=myclient
AUTH_KEYCLOAK_SECRET
AUTH_KEYCLOAK_ISSUER=http://localhost:8080/realms/myrealm
KEYCLOAK_ADMIN_USERNAME=admin
KEYCLOAK_ADMIN_PASSWORD=admin
```

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
