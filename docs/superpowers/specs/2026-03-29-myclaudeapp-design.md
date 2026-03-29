# Design Spec: myclaudeapp

**Date:** 2026-03-29
**Status:** Approved
**Location:** `apps/myclaudeapp/`

---

## Purpose

`myclaudeapp` is a Next.js 15 learning project within the Keycloakify monorepo. Its dual purpose:

1. **Figma-to-code experimentation** — implement UI components and pages directly from Figma designs provided via Claude
2. **Next.js + Atomic Design learning** — practice App Router patterns, component composition, and the atomic design methodology in a real monorepo context

---

## Approach

Mirror the `luminarworks` app structure exactly — same tooling, same conventions, same Nx target names. Start auth-free and design-neutral. Arctic Wolves theme available as an optional import.

---

## Directory Structure

```
apps/myclaudeapp/
├── src/
│   ├── app/
│   │   ├── globals.css          ← neutral Tailwind v4 base + CSS custom properties
│   │   ├── layout.tsx           ← root layout (html, body, font)
│   │   ├── page.tsx             ← home page placeholder
│   │   └── loading.tsx          ← Suspense fallback
│   └── components/
│       ├── atoms/
│       │   ├── Button/Button.tsx
│       │   ├── Input/Input.tsx
│       │   └── Badge/Badge.tsx
│       ├── molecules/
│       │   ├── FormField/FormField.tsx
│       │   └── Card/Card.tsx
│       ├── organisms/
│       │   └── Header/Header.tsx
│       ├── templates/
│       │   └── PageLayout/PageLayout.tsx
│       └── themes/
│           └── arctic-wolves.css
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
└── project.json
```

---

## Tech Stack

| Item | Value |
|------|-------|
| Next.js | `^15.0.0` App Router |
| React | `^18.2.0` |
| TypeScript | `^5.2.2`, strict mode |
| Tailwind CSS | `^4.2.2` via `@tailwindcss/postcss` |
| Dev port | `3002` |
| Module alias | `@/*` → `./src/*` |
| Auth | None (auth-free to start) |

---

## Nx Integration

**Run from monorepo root:**

```bash
pnpm exec nx dev myclaudeapp       # dev server on :3002
pnpm exec nx build myclaudeapp     # production build
pnpm exec nx start myclaudeapp     # start production server
pnpm exec nx lint myclaudeapp      # ESLint
```

**`project.json` targets:** `dev`, `build`, `start`, `lint` — identical structure to `luminarworks/project.json`.

---

## Design System

### Neutral Base (`globals.css`)

```css
@import "tailwindcss";

@theme {
  --color-background: #ffffff;
  --color-surface: #f8f9fa;
  --color-primary: #3b82f6;
  --color-primary-dark: #1d4ed8;
  --color-text: #111827;
  --color-text-muted: #6b7280;
  --color-border: #e5e7eb;
}
```

### Arctic Wolves Theme (`src/components/themes/arctic-wolves.css`)

Optional override — activated by adding one `@import` line to `globals.css`:

```css
@import "../components/themes/arctic-wolves.css";
```

Overrides all neutral tokens with the Arctic Wolves dark palette (`#06091a` background, `#00d4ff` primary).

### Figma Design Workflow

For each new Figma design:
1. Extract design tokens from the Figma file
2. Either update `@theme` in `globals.css` or create a new `themes/<design-name>.css` file
3. Implement components bottom-up: atoms → molecules → organisms → templates → pages

---

## Atomic Design Conventions

| Layer | Rule | Starting components |
|-------|------|---------------------|
| `atoms/` | Single HTML element, no child components | `Button`, `Input`, `Badge` |
| `molecules/` | 2–4 atoms combined, single responsibility | `FormField`, `Card` |
| `organisms/` | Full UI section, may contain molecules | `Header` |
| `templates/` | Layout shells — no business logic | `PageLayout` |
| `app/` pages | Compose templates + organisms | `page.tsx` |

### Component File Convention

```
atoms/
  Button/
    Button.tsx     ← component + props interface
```

### Props Convention (SonarLint S6759)

All component props interfaces use `readonly`:

```tsx
interface ButtonProps {
  readonly label: string;
  readonly variant?: "primary" | "ghost" | "outline";
  readonly onClick?: () => void;
}
```

### Server Actions Convention (SonarLint S7721)

When auth is added later, all `"use server"` actions go in a dedicated `actions.ts` — never inline in components.

---

## What Is NOT Included (by design)

- No NextAuth / Keycloak auth (add later as a learning module)
- No `middleware.ts` (no protected routes yet)
- No shared libs from `libs/` (add when a genuine shared need arises)
- No Storybook (can be added later)

---

## Success Criteria

- `pnpm exec nx dev myclaudeapp` starts cleanly on port 3002
- Atomic component folders exist with one starter component each
- Neutral design tokens in `globals.css`; Arctic Wolves available as opt-in import
- TypeScript strict mode, no errors
- Consistent with `luminarworks` patterns so CLAUDE.md conventions apply
