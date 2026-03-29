# myclaudeapp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold `apps/myclaudeapp` — a Next.js 15 + Tailwind v4 app with atomic design components, neutral theme tokens, and an optional Arctic Wolves theme import, runnable from the monorepo root via `pnpm exec nx dev myclaudeapp`.

**Architecture:** Mirror `apps/luminarworks` exactly — same Nx `project.json` target structure, same PostCSS Tailwind v4 setup, same atomic folder layout (`atoms → molecules → organisms → templates`). Neutral CSS custom properties in `globals.css` define the design tokens; `arctic-wolves.css` overrides them with the dark palette on demand. All component classes are defined as raw CSS in `@layer components` (not `@apply`), following the established pattern. Vitest + React Testing Library provides component tests.

**Tech Stack:** Next.js 15 App Router, React 18, TypeScript 5 (strict), Tailwind CSS v4 (`@tailwindcss/postcss`), Vitest, `@testing-library/react`

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `apps/myclaudeapp/package.json` | Create | Project metadata, scripts, deps |
| `apps/myclaudeapp/project.json` | Create | Nx targets (dev/build/start/lint/test) |
| `apps/myclaudeapp/next.config.ts` | Create | Next.js config (empty defaults) |
| `apps/myclaudeapp/postcss.config.mjs` | Create | Tailwind v4 PostCSS plugin |
| `apps/myclaudeapp/tsconfig.json` | Create | TypeScript strict config, `@/*` alias |
| `apps/myclaudeapp/.eslintrc.json` | Create | Next.js ESLint config |
| `apps/myclaudeapp/vitest.config.ts` | Create | Vitest + jsdom + React plugin + path alias |
| `apps/myclaudeapp/src/test/setup.ts` | Create | `@testing-library/jest-dom` import |
| `apps/myclaudeapp/src/test/mocks/next-link.tsx` | Create | `next/link` stub for jsdom |
| `apps/myclaudeapp/src/app/globals.css` | Create | Neutral `@theme` tokens + `@layer components` classes |
| `apps/myclaudeapp/src/app/layout.tsx` | Create | Root layout (`html`, `body`, metadata) |
| `apps/myclaudeapp/src/app/page.tsx` | Create | Placeholder home (wired in Task 12) |
| `apps/myclaudeapp/src/app/loading.tsx` | Create | Suspense spinner |
| `apps/myclaudeapp/src/components/themes/arctic-wolves.css` | Create | Dark palette `@theme` override |
| `apps/myclaudeapp/src/components/atoms/Button/Button.tsx` | Create | Button atom |
| `apps/myclaudeapp/src/components/atoms/Button/Button.test.tsx` | Create | Button tests |
| `apps/myclaudeapp/src/components/atoms/Input/Input.tsx` | Create | Input atom |
| `apps/myclaudeapp/src/components/atoms/Input/Input.test.tsx` | Create | Input tests |
| `apps/myclaudeapp/src/components/atoms/Badge/Badge.tsx` | Create | Badge atom |
| `apps/myclaudeapp/src/components/atoms/Badge/Badge.test.tsx` | Create | Badge tests |
| `apps/myclaudeapp/src/components/molecules/FormField/FormField.tsx` | Create | FormField molecule |
| `apps/myclaudeapp/src/components/molecules/FormField/FormField.test.tsx` | Create | FormField tests |
| `apps/myclaudeapp/src/components/molecules/Card/Card.tsx` | Create | Card molecule |
| `apps/myclaudeapp/src/components/molecules/Card/Card.test.tsx` | Create | Card tests |
| `apps/myclaudeapp/src/components/organisms/Header/Header.tsx` | Create | Header organism |
| `apps/myclaudeapp/src/components/organisms/Header/Header.test.tsx` | Create | Header tests |
| `apps/myclaudeapp/src/components/templates/PageLayout/PageLayout.tsx` | Create | PageLayout template |
| `apps/myclaudeapp/src/components/templates/PageLayout/PageLayout.test.tsx` | Create | PageLayout tests |
| `CLAUDE.md` | Modify | Add myclaudeapp entry to the app table |

---

## Task 1: Project config files

**Files:**
- Create: `apps/myclaudeapp/package.json`
- Create: `apps/myclaudeapp/project.json`
- Create: `apps/myclaudeapp/next.config.ts`
- Create: `apps/myclaudeapp/postcss.config.mjs`
- Create: `apps/myclaudeapp/tsconfig.json`
- Create: `apps/myclaudeapp/.eslintrc.json`

- [ ] **Step 1: Create `apps/myclaudeapp/package.json`**

```json
{
    "name": "myclaudeapp",
    "version": "0.0.0",
    "private": true,
    "scripts": {
        "dev": "next dev --port 3002",
        "build": "next build",
        "start": "next start",
        "lint": "next lint",
        "test": "vitest run",
        "test:watch": "vitest"
    },
    "dependencies": {
        "@tailwindcss/postcss": "^4.2.2",
        "next": "^15.0.0",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "tailwindcss": "^4.2.2"
    },
    "devDependencies": {
        "@testing-library/jest-dom": "^6.0.0",
        "@testing-library/react": "^16.0.0",
        "@types/node": "^20.0.0",
        "@types/react": "^18.2.0",
        "@types/react-dom": "^18.2.0",
        "@vitejs/plugin-react": "^4.0.0",
        "jsdom": "^24.0.0",
        "typescript": "^5.2.2",
        "vitest": "^2.0.0"
    }
}
```

- [ ] **Step 2: Create `apps/myclaudeapp/project.json`**

```json
{
    "$schema": "../../node_modules/nx/schemas/project-schema.json",
    "name": "myclaudeapp",
    "projectType": "application",
    "sourceRoot": "apps/myclaudeapp/src",
    "targets": {
        "dev": {
            "executor": "nx:run-script",
            "options": {
                "script": "dev"
            }
        },
        "build": {
            "executor": "nx:run-script",
            "options": {
                "script": "build"
            },
            "cache": true,
            "outputs": ["{projectRoot}/.next"]
        },
        "start": {
            "executor": "nx:run-script",
            "options": {
                "script": "start"
            }
        },
        "lint": {
            "executor": "nx:run-script",
            "options": {
                "script": "lint"
            }
        },
        "test": {
            "executor": "nx:run-script",
            "options": {
                "script": "test"
            }
        }
    }
}
```

- [ ] **Step 3: Create `apps/myclaudeapp/next.config.ts`**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

- [ ] **Step 4: Create `apps/myclaudeapp/postcss.config.mjs`**

```js
const config = {
    plugins: {
        "@tailwindcss/postcss": {},
    },
};

export default config;
```

- [ ] **Step 5: Create `apps/myclaudeapp/tsconfig.json`**

```json
{
    "compilerOptions": {
        "target": "ES2017",
        "lib": ["dom", "dom.iterable", "esnext"],
        "allowJs": true,
        "skipLibCheck": true,
        "strict": true,
        "noEmit": true,
        "esModuleInterop": true,
        "module": "esnext",
        "moduleResolution": "bundler",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "jsx": "preserve",
        "incremental": true,
        "plugins": [{ "name": "next" }],
        "paths": {
            "@/*": ["./src/*"]
        }
    },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    "exclude": ["node_modules"]
}
```

- [ ] **Step 6: Create `apps/myclaudeapp/.eslintrc.json`**

```json
{
    "extends": "next/core-web-vitals"
}
```

- [ ] **Step 7: Install dependencies from monorepo root**

Run from `apps/keycloakify-starter/` (the monorepo root):
```bash
pnpm install
```

Expected: `packages/myclaudeapp` resolved, `node_modules` populated inside `apps/myclaudeapp/`.

- [ ] **Step 8: Commit**

```bash
git add apps/myclaudeapp/package.json apps/myclaudeapp/project.json apps/myclaudeapp/next.config.ts apps/myclaudeapp/postcss.config.mjs apps/myclaudeapp/tsconfig.json apps/myclaudeapp/.eslintrc.json pnpm-lock.yaml
git commit -m "feat(myclaudeapp): add project config files"
```

---

## Task 2: Test infrastructure

**Files:**
- Create: `apps/myclaudeapp/vitest.config.ts`
- Create: `apps/myclaudeapp/src/test/setup.ts`
- Create: `apps/myclaudeapp/src/test/mocks/next-link.tsx`

- [ ] **Step 1: Create `apps/myclaudeapp/vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        setupFiles: ["./src/test/setup.ts"],
        globals: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "next/link": path.resolve(__dirname, "./src/test/mocks/next-link.tsx"),
        },
    },
});
```

- [ ] **Step 2: Create `apps/myclaudeapp/src/test/setup.ts`**

```ts
import "@testing-library/jest-dom";
```

- [ ] **Step 3: Create `apps/myclaudeapp/src/test/mocks/next-link.tsx`**

This replaces Next.js `Link` with a plain `<a>` so tests don't require the Next.js router context.

```tsx
import type { ReactNode } from "react";

export default function Link({
    href,
    children,
    className,
}: {
    readonly href: string;
    readonly children: ReactNode;
    readonly className?: string;
}) {
    return (
        <a href={href} className={className}>
            {children}
        </a>
    );
}
```

- [ ] **Step 4: Verify Vitest can find and run (no tests yet)**

Run from `apps/myclaudeapp/`:
```bash
pnpm vitest run
```

Expected output:
```
No test files found, exiting with code 0
```

If you see a module resolution error instead, check that `vitest` and `@vitejs/plugin-react` installed correctly in step 7 of Task 1.

- [ ] **Step 5: Commit**

```bash
git add apps/myclaudeapp/vitest.config.ts apps/myclaudeapp/src/test/
git commit -m "feat(myclaudeapp): add Vitest + RTL test infrastructure"
```

---

## Task 3: App shell

**Files:**
- Create: `apps/myclaudeapp/src/app/globals.css`
- Create: `apps/myclaudeapp/src/app/layout.tsx`
- Create: `apps/myclaudeapp/src/app/page.tsx`
- Create: `apps/myclaudeapp/src/app/loading.tsx`

- [ ] **Step 1: Create `apps/myclaudeapp/src/app/globals.css`**

Neutral token names map to generated Tailwind utilities: `--color-bg` → `bg-bg`, `--color-primary` → `bg-primary`, `--color-fg` → `text-fg`, etc.

```css
@import "tailwindcss";

@theme {
    --color-bg: #ffffff;
    --color-surface: #f8f9fa;
    --color-primary: #3b82f6;
    --color-primary-dark: #1d4ed8;
    --color-fg: #111827;
    --color-fg-muted: #6b7280;
    --color-line: #e5e7eb;
}

@layer base {
    *,
    *::before,
    *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html,
    body {
        height: 100%;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", Helvetica, Arial,
            sans-serif;
        background: var(--color-bg);
        color: var(--color-fg);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
}

@layer components {
    .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.625rem 1.25rem;
        border-radius: 6px;
        font-size: 0.9375rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        font-family: inherit;
        white-space: nowrap;
    }

    .btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .btn-primary {
        background: var(--color-primary);
        color: #ffffff;
        border: none;
    }

    .btn-primary:hover:not(:disabled) {
        background: var(--color-primary-dark);
    }

    .btn-ghost {
        background: transparent;
        color: var(--color-fg);
        border: 1.5px solid var(--color-line);
    }

    .btn-ghost:hover:not(:disabled) {
        background: var(--color-surface);
    }

    .btn-outline {
        background: transparent;
        color: var(--color-primary);
        border: 1.5px solid var(--color-primary);
    }

    .btn-outline:hover:not(:disabled) {
        background: var(--color-primary);
        color: #ffffff;
    }

    .input-base {
        width: 100%;
        padding: 0.625rem 0.875rem;
        border-radius: 6px;
        border: 1px solid var(--color-line);
        background: var(--color-surface);
        color: var(--color-fg);
        font-size: 0.9375rem;
        font-family: inherit;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .input-base::placeholder {
        color: var(--color-fg-muted);
    }

    .input-base:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }

    .input-base:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .card-base {
        border-radius: 12px;
        border: 1px solid var(--color-line);
        background: var(--color-surface);
        padding: 1.5rem;
    }

    .badge-base {
        display: inline-flex;
        align-items: center;
        padding: 0.2rem 0.625rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 500;
    }
}
```

- [ ] **Step 2: Create `apps/myclaudeapp/src/app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "My Claude App",
    description: "Figma-to-code learning project",
};

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>{children}</body>
        </html>
    );
}
```

- [ ] **Step 3: Create `apps/myclaudeapp/src/app/page.tsx`** (placeholder — wired with components in Task 12)

```tsx
export default function Home() {
    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">My Claude App</h1>
            <p className="text-fg-muted mt-2">Components coming soon.</p>
        </main>
    );
}
```

- [ ] **Step 4: Create `apps/myclaudeapp/src/app/loading.tsx`**

```tsx
export default function Loading() {
    return (
        <div className="min-h-screen bg-bg flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-line border-t-primary animate-spin" />
        </div>
    );
}
```

- [ ] **Step 5: Verify dev server starts**

Run from monorepo root (`apps/keycloakify-starter/`):
```bash
pnpm exec nx dev myclaudeapp
```

Expected: server starts on `http://localhost:3002`. Open browser — should show "My Claude App" heading on a white background.

Stop the server with `Ctrl+C`.

- [ ] **Step 6: Commit**

```bash
git add apps/myclaudeapp/src/app/
git commit -m "feat(myclaudeapp): add app shell with neutral design tokens"
```

---

## Task 4: Arctic Wolves theme file

**Files:**
- Create: `apps/myclaudeapp/src/components/themes/arctic-wolves.css`

- [ ] **Step 1: Create `apps/myclaudeapp/src/components/themes/arctic-wolves.css`**

```css
/*
 * Arctic Wolves theme — dark cybersecurity palette.
 *
 * To activate: add this line to src/app/globals.css, after @import "tailwindcss":
 *   @import "../components/themes/arctic-wolves.css";
 *
 * To deactivate: remove that line.
 */

@theme {
    --color-bg: #06091a;
    --color-surface: rgba(255, 255, 255, 0.025);
    --color-primary: #00d4ff;
    --color-primary-dark: #0288d1;
    --color-fg: #e2e8f0;
    --color-fg-muted: #64748b;
    --color-line: rgba(0, 212, 255, 0.15);
}
```

- [ ] **Step 2: Verify it works (manual smoke test)**

In `apps/myclaudeapp/src/app/globals.css`, temporarily add this line after `@import "tailwindcss"`:
```css
@import "../components/themes/arctic-wolves.css";
```

Run `pnpm exec nx dev myclaudeapp`. Open `http://localhost:3002` — background should now be dark (`#06091a`).

**Remove the import line after verifying.** The neutral theme is the default.

- [ ] **Step 3: Commit**

```bash
git add apps/myclaudeapp/src/components/themes/arctic-wolves.css
git commit -m "feat(myclaudeapp): add Arctic Wolves theme override"
```

---

## Task 5: Button atom (TDD)

**Files:**
- Create: `apps/myclaudeapp/src/components/atoms/Button/Button.test.tsx`
- Create: `apps/myclaudeapp/src/components/atoms/Button/Button.tsx`

- [ ] **Step 1: Write the failing test**

Create `apps/myclaudeapp/src/components/atoms/Button/Button.test.tsx`:

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
    it("renders children", () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
    });

    it("defaults to type='button'", () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("applies btn and btn-primary classes by default", () => {
        render(<Button>Click me</Button>);
        const btn = screen.getByRole("button");
        expect(btn).toHaveClass("btn");
        expect(btn).toHaveClass("btn-primary");
    });

    it("applies btn-ghost class when variant='ghost'", () => {
        render(<Button variant="ghost">Click me</Button>);
        expect(screen.getByRole("button")).toHaveClass("btn-ghost");
    });

    it("applies btn-outline class when variant='outline'", () => {
        render(<Button variant="outline">Click me</Button>);
        expect(screen.getByRole("button")).toHaveClass("btn-outline");
    });

    it("calls onClick when clicked", () => {
        const onClick = vi.fn();
        render(<Button onClick={onClick}>Click me</Button>);
        fireEvent.click(screen.getByRole("button"));
        expect(onClick).toHaveBeenCalledOnce();
    });

    it("is disabled when disabled prop is true", () => {
        render(<Button disabled>Click me</Button>);
        expect(screen.getByRole("button")).toBeDisabled();
    });

    it("renders as type='submit' when specified", () => {
        render(<Button type="submit">Submit</Button>);
        expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd apps/myclaudeapp && pnpm vitest run src/components/atoms/Button/Button.test.tsx
```

Expected: `FAIL` — `Cannot find module './Button'`

- [ ] **Step 3: Implement `Button.tsx`**

Create `apps/myclaudeapp/src/components/atoms/Button/Button.tsx`:

```tsx
import type { ReactNode } from "react";

interface ButtonProps {
    readonly children: ReactNode;
    readonly type?: "button" | "submit";
    readonly variant?: "primary" | "ghost" | "outline";
    readonly disabled?: boolean;
    readonly onClick?: () => void;
}

export function Button({
    children,
    type = "button",
    variant = "primary",
    disabled = false,
    onClick,
}: ButtonProps) {
    return (
        <button type={type} disabled={disabled} onClick={onClick} className={`btn btn-${variant}`}>
            {children}
        </button>
    );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm vitest run src/components/atoms/Button/Button.test.tsx
```

Expected: `PASS` — 8 tests passed.

- [ ] **Step 5: Commit**

```bash
git add apps/myclaudeapp/src/components/atoms/Button/
git commit -m "feat(myclaudeapp): add Button atom"
```

---

## Task 6: Input atom (TDD)

**Files:**
- Create: `apps/myclaudeapp/src/components/atoms/Input/Input.test.tsx`
- Create: `apps/myclaudeapp/src/components/atoms/Input/Input.tsx`

- [ ] **Step 1: Write the failing test**

Create `apps/myclaudeapp/src/components/atoms/Input/Input.test.tsx`:

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
    it("renders with correct id", () => {
        render(<Input id="email" name="email" />);
        expect(document.getElementById("email")).toBeInTheDocument();
    });

    it("renders with placeholder", () => {
        render(<Input id="email" name="email" placeholder="Enter email" />);
        expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
    });

    it("defaults to type='text'", () => {
        render(<Input id="name" name="name" />);
        expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
    });

    it("renders password input when type='password'", () => {
        const { container } = render(<Input id="pwd" name="pwd" type="password" />);
        expect(container.querySelector("input")).toHaveAttribute("type", "password");
    });

    it("applies input-base class", () => {
        render(<Input id="name" name="name" />);
        expect(screen.getByRole("textbox")).toHaveClass("input-base");
    });

    it("calls onChange when value changes", () => {
        const onChange = vi.fn();
        render(<Input id="name" name="name" onChange={onChange} />);
        fireEvent.change(screen.getByRole("textbox"), { target: { value: "test" } });
        expect(onChange).toHaveBeenCalled();
    });

    it("is disabled when disabled prop is true", () => {
        render(<Input id="name" name="name" disabled />);
        expect(screen.getByRole("textbox")).toBeDisabled();
    });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run src/components/atoms/Input/Input.test.tsx
```

Expected: `FAIL` — `Cannot find module './Input'`

- [ ] **Step 3: Implement `Input.tsx`**

Create `apps/myclaudeapp/src/components/atoms/Input/Input.tsx`:

```tsx
interface InputProps {
    readonly id: string;
    readonly name: string;
    readonly type?: "text" | "email" | "password" | "number";
    readonly placeholder?: string;
    readonly value?: string;
    readonly defaultValue?: string;
    readonly required?: boolean;
    readonly disabled?: boolean;
    readonly onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
    id,
    name,
    type = "text",
    placeholder,
    value,
    defaultValue,
    required,
    disabled,
    onChange,
}: InputProps) {
    return (
        <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            required={required}
            disabled={disabled}
            onChange={onChange}
            className="input-base"
        />
    );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm vitest run src/components/atoms/Input/Input.test.tsx
```

Expected: `PASS` — 7 tests passed.

- [ ] **Step 5: Commit**

```bash
git add apps/myclaudeapp/src/components/atoms/Input/
git commit -m "feat(myclaudeapp): add Input atom"
```

---

## Task 7: Badge atom (TDD)

**Files:**
- Create: `apps/myclaudeapp/src/components/atoms/Badge/Badge.test.tsx`
- Create: `apps/myclaudeapp/src/components/atoms/Badge/Badge.tsx`

- [ ] **Step 1: Write the failing test**

Create `apps/myclaudeapp/src/components/atoms/Badge/Badge.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
    it("renders children", () => {
        render(<Badge>New</Badge>);
        expect(screen.getByText("New")).toBeInTheDocument();
    });

    it("applies badge-base class", () => {
        render(<Badge>New</Badge>);
        expect(screen.getByText("New")).toHaveClass("badge-base");
    });

    it("applies default variant styles by default", () => {
        render(<Badge>Default</Badge>);
        expect(screen.getByText("Default")).toHaveClass("badge-default");
    });

    it("applies success variant styles", () => {
        render(<Badge variant="success">Active</Badge>);
        expect(screen.getByText("Active")).toHaveClass("badge-success");
    });

    it("applies warning variant styles", () => {
        render(<Badge variant="warning">Pending</Badge>);
        expect(screen.getByText("Pending")).toHaveClass("badge-warning");
    });

    it("applies error variant styles", () => {
        render(<Badge variant="error">Failed</Badge>);
        expect(screen.getByText("Failed")).toHaveClass("badge-error");
    });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run src/components/atoms/Badge/Badge.test.tsx
```

Expected: `FAIL` — `Cannot find module './Badge'`

- [ ] **Step 3: Add badge variant classes to `globals.css`**

Open `apps/myclaudeapp/src/app/globals.css`. Inside `@layer components`, append after `.badge-base`:

```css
    .badge-default {
        background: var(--color-surface);
        color: var(--color-fg-muted);
        border: 1px solid var(--color-line);
    }

    .badge-success {
        background: #dcfce7;
        color: #166534;
    }

    .badge-warning {
        background: #fef9c3;
        color: #854d0e;
    }

    .badge-error {
        background: #fee2e2;
        color: #991b1b;
    }
```

- [ ] **Step 4: Implement `Badge.tsx`**

Create `apps/myclaudeapp/src/components/atoms/Badge/Badge.tsx`:

```tsx
import type { ReactNode } from "react";

interface BadgeProps {
    readonly children: ReactNode;
    readonly variant?: "default" | "success" | "warning" | "error";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
    return (
        <span className={`badge-base badge-${variant}`}>
            {children}
        </span>
    );
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
pnpm vitest run src/components/atoms/Badge/Badge.test.tsx
```

Expected: `PASS` — 6 tests passed.

- [ ] **Step 6: Commit**

```bash
git add apps/myclaudeapp/src/components/atoms/Badge/ apps/myclaudeapp/src/app/globals.css
git commit -m "feat(myclaudeapp): add Badge atom"
```

---

## Task 8: FormField molecule (TDD)

`FormField` composes `Input` (atom) with a `<label>` and optional error message.

**Files:**
- Create: `apps/myclaudeapp/src/components/molecules/FormField/FormField.test.tsx`
- Create: `apps/myclaudeapp/src/components/molecules/FormField/FormField.tsx`

- [ ] **Step 1: Write the failing test**

Create `apps/myclaudeapp/src/components/molecules/FormField/FormField.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FormField } from "./FormField";

describe("FormField", () => {
    it("renders label text", () => {
        render(<FormField id="email" name="email" label="Email" />);
        expect(screen.getByText("Email")).toBeInTheDocument();
    });

    it("associates label with input via htmlFor", () => {
        render(<FormField id="email" name="email" label="Email address" />);
        expect(screen.getByLabelText(/Email address/)).toBeInTheDocument();
    });

    it("renders error message when provided", () => {
        render(<FormField id="email" name="email" label="Email" error="Required field" />);
        expect(screen.getByRole("alert")).toHaveTextContent("Required field");
    });

    it("does not render alert when error prop is omitted", () => {
        render(<FormField id="email" name="email" label="Email" />);
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("shows required asterisk when required is true", () => {
        render(<FormField id="email" name="email" label="Email" required />);
        expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("does not show required asterisk when required is false", () => {
        render(<FormField id="email" name="email" label="Email" />);
        expect(screen.queryByText("*")).not.toBeInTheDocument();
    });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run src/components/molecules/FormField/FormField.test.tsx
```

Expected: `FAIL` — `Cannot find module './FormField'`

- [ ] **Step 3: Implement `FormField.tsx`**

Create `apps/myclaudeapp/src/components/molecules/FormField/FormField.tsx`:

```tsx
import { Input } from "@/components/atoms/Input/Input";

interface FormFieldProps {
    readonly id: string;
    readonly name: string;
    readonly label: string;
    readonly type?: "text" | "email" | "password" | "number";
    readonly placeholder?: string;
    readonly error?: string;
    readonly required?: boolean;
}

export function FormField({
    id,
    name,
    label,
    type = "text",
    placeholder,
    error,
    required,
}: FormFieldProps) {
    return (
        <div className="flex flex-col gap-1">
            <label
                htmlFor={id}
                className="text-sm font-medium text-fg"
            >
                {label}
                {required && (
                    <span className="text-red-500 ml-1" aria-hidden="true">
                        *
                    </span>
                )}
            </label>
            <Input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
            />
            {error && (
                <span className="text-xs text-red-500" role="alert">
                    {error}
                </span>
            )}
        </div>
    );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm vitest run src/components/molecules/FormField/FormField.test.tsx
```

Expected: `PASS` — 6 tests passed.

- [ ] **Step 5: Commit**

```bash
git add apps/myclaudeapp/src/components/molecules/FormField/
git commit -m "feat(myclaudeapp): add FormField molecule"
```

---

## Task 9: Card molecule (TDD)

**Files:**
- Create: `apps/myclaudeapp/src/components/molecules/Card/Card.test.tsx`
- Create: `apps/myclaudeapp/src/components/molecules/Card/Card.tsx`

- [ ] **Step 1: Write the failing test**

Create `apps/myclaudeapp/src/components/molecules/Card/Card.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
    it("renders children", () => {
        render(<Card><p>Card content</p></Card>);
        expect(screen.getByText("Card content")).toBeInTheDocument();
    });

    it("renders title heading when title is provided", () => {
        render(<Card title="My Card"><p>Content</p></Card>);
        expect(screen.getByRole("heading", { name: "My Card" })).toBeInTheDocument();
    });

    it("does not render heading when title is not provided", () => {
        render(<Card><p>Content</p></Card>);
        expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });

    it("applies card-base class to container", () => {
        const { container } = render(<Card><p>Content</p></Card>);
        expect(container.firstChild).toHaveClass("card-base");
    });

    it("applies additional className when provided", () => {
        const { container } = render(<Card className="custom-class"><p>Content</p></Card>);
        expect(container.firstChild).toHaveClass("custom-class");
    });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run src/components/molecules/Card/Card.test.tsx
```

Expected: `FAIL` — `Cannot find module './Card'`

- [ ] **Step 3: Implement `Card.tsx`**

Create `apps/myclaudeapp/src/components/molecules/Card/Card.tsx`:

```tsx
import type { ReactNode } from "react";

interface CardProps {
    readonly children: ReactNode;
    readonly title?: string;
    readonly className?: string;
}

export function Card({ children, title, className = "" }: CardProps) {
    return (
        <div className={`card-base ${className}`}>
            {title && (
                <h3 className="text-lg font-semibold text-fg mb-4">{title}</h3>
            )}
            {children}
        </div>
    );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm vitest run src/components/molecules/Card/Card.test.tsx
```

Expected: `PASS` — 5 tests passed.

- [ ] **Step 5: Commit**

```bash
git add apps/myclaudeapp/src/components/molecules/Card/
git commit -m "feat(myclaudeapp): add Card molecule"
```

---

## Task 10: Header organism (TDD)

`Header` uses `next/link` — which the `vitest.config.ts` alias maps to `src/test/mocks/next-link.tsx` so the `<a href>` is rendered and accessible in jsdom.

**Files:**
- Create: `apps/myclaudeapp/src/components/organisms/Header/Header.test.tsx`
- Create: `apps/myclaudeapp/src/components/organisms/Header/Header.tsx`

- [ ] **Step 1: Write the failing test**

Create `apps/myclaudeapp/src/components/organisms/Header/Header.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Header } from "./Header";

describe("Header", () => {
    it("renders the title", () => {
        render(<Header title="My App" />);
        expect(screen.getByText("My App")).toBeInTheDocument();
    });

    it("renders a <header> landmark", () => {
        render(<Header title="My App" />);
        expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("does not render nav when no navItems provided", () => {
        render(<Header title="My App" />);
        expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    });

    it("renders nav when navItems are provided", () => {
        const navItems = [
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
        ];
        render(<Header title="My App" navItems={navItems} />);
        expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("renders nav links with correct hrefs", () => {
        const navItems = [
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
        ];
        render(<Header title="My App" navItems={navItems} />);
        expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
        expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run src/components/organisms/Header/Header.test.tsx
```

Expected: `FAIL` — `Cannot find module './Header'`

- [ ] **Step 3: Implement `Header.tsx`**

Create `apps/myclaudeapp/src/components/organisms/Header/Header.tsx`:

```tsx
import Link from "next/link";

interface NavItem {
    readonly label: string;
    readonly href: string;
}

interface HeaderProps {
    readonly title: string;
    readonly navItems?: readonly NavItem[];
}

export function Header({ title, navItems = [] }: HeaderProps) {
    return (
        <header className="w-full border-b border-line bg-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <span className="text-xl font-bold text-fg">{title}</span>
                {navItems.length > 0 && (
                    <nav aria-label="Main navigation">
                        <ul className="flex gap-6 list-none">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-fg-muted hover:text-fg transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm vitest run src/components/organisms/Header/Header.test.tsx
```

Expected: `PASS` — 5 tests passed.

- [ ] **Step 5: Commit**

```bash
git add apps/myclaudeapp/src/components/organisms/Header/
git commit -m "feat(myclaudeapp): add Header organism"
```

---

## Task 11: PageLayout template (TDD)

`PageLayout` composes `Header` (organism) with a `<main>` content area. It is a layout shell with no business logic.

**Files:**
- Create: `apps/myclaudeapp/src/components/templates/PageLayout/PageLayout.test.tsx`
- Create: `apps/myclaudeapp/src/components/templates/PageLayout/PageLayout.tsx`

- [ ] **Step 1: Write the failing test**

Create `apps/myclaudeapp/src/components/templates/PageLayout/PageLayout.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PageLayout } from "./PageLayout";

describe("PageLayout", () => {
    it("renders title in the header", () => {
        render(<PageLayout title="My App"><p>Content</p></PageLayout>);
        expect(screen.getByText("My App")).toBeInTheDocument();
    });

    it("renders children inside a main element", () => {
        render(<PageLayout title="My App"><p>Page content</p></PageLayout>);
        const main = screen.getByRole("main");
        expect(main).toContainElement(screen.getByText("Page content"));
    });

    it("passes navItems to Header", () => {
        const navItems = [{ label: "Home", href: "/" }];
        render(
            <PageLayout title="My App" navItems={navItems}>
                <p>Content</p>
            </PageLayout>
        );
        expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    });

    it("renders both header and main landmarks", () => {
        render(<PageLayout title="My App"><p>Content</p></PageLayout>);
        expect(screen.getByRole("banner")).toBeInTheDocument();
        expect(screen.getByRole("main")).toBeInTheDocument();
    });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run src/components/templates/PageLayout/PageLayout.test.tsx
```

Expected: `FAIL` — `Cannot find module './PageLayout'`

- [ ] **Step 3: Implement `PageLayout.tsx`**

Create `apps/myclaudeapp/src/components/templates/PageLayout/PageLayout.tsx`:

```tsx
import type { ReactNode } from "react";
import { Header } from "@/components/organisms/Header/Header";

interface NavItem {
    readonly label: string;
    readonly href: string;
}

interface PageLayoutProps {
    readonly children: ReactNode;
    readonly title: string;
    readonly navItems?: readonly NavItem[];
}

export function PageLayout({ children, title, navItems }: PageLayoutProps) {
    return (
        <div className="min-h-screen bg-bg">
            <Header title={title} navItems={navItems} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm vitest run src/components/templates/PageLayout/PageLayout.test.tsx
```

Expected: `PASS` — 4 tests passed.

- [ ] **Step 5: Commit**

```bash
git add apps/myclaudeapp/src/components/templates/PageLayout/
git commit -m "feat(myclaudeapp): add PageLayout template"
```

---

## Task 12: Wire home page + final verification

Update `page.tsx` to use all atomic components. Run all tests. Verify dev server. Update `CLAUDE.md`.

**Files:**
- Modify: `apps/myclaudeapp/src/app/page.tsx`
- Modify: `CLAUDE.md`

- [ ] **Step 1: Run all tests to confirm full green suite**

```bash
pnpm --filter myclaudeapp test
```

Expected: All test files pass. Count: 41 tests (8 Button + 7 Input + 6 Badge + 6 FormField + 5 Card + 5 Header + 4 PageLayout).

- [ ] **Step 2: Update `apps/myclaudeapp/src/app/page.tsx`**

Replace the placeholder with a composed page using all atomic layers:

```tsx
import { PageLayout } from "@/components/templates/PageLayout/PageLayout";
import { Card } from "@/components/molecules/Card/Card";
import { Badge } from "@/components/atoms/Badge/Badge";
import { Button } from "@/components/atoms/Button/Button";

const NAV_ITEMS = [{ label: "Home", href: "/" }] as const;

export default function Home() {
    return (
        <PageLayout title="My Claude App" navItems={NAV_ITEMS}>
            <div className="flex flex-col gap-6">
                <div>
                    <Badge>Learning Project</Badge>
                    <h1 className="text-3xl font-bold text-fg mt-2">
                        Figma-to-Code Workspace
                    </h1>
                    <p className="text-fg-muted mt-2">
                        Implement Figma designs component by component using atomic design.
                    </p>
                </div>
                <Card title="Getting Started">
                    <p className="text-fg-muted mb-4">
                        Add a Figma design, extract its tokens, and implement atoms → molecules →
                        organisms → templates → pages.
                    </p>
                    <div className="flex gap-3">
                        <Button variant="primary">Add Design</Button>
                        <Button variant="ghost">Learn More</Button>
                    </div>
                </Card>
            </div>
        </PageLayout>
    );
}
```

- [ ] **Step 3: Verify dev server renders the wired page**

```bash
pnpm exec nx dev myclaudeapp
```

Open `http://localhost:3002`. Expected: white page with a top header bar titled "My Claude App", a badge labelled "Learning Project", h1 heading, a card with two buttons.

Stop the server with `Ctrl+C`.

- [ ] **Step 4: Update `CLAUDE.md`**

In the monorepo root `CLAUDE.md`, update the app table (near the top) to add the new entry:

Find this block:
```markdown
| App | Path | Purpose | Dev command |
|-----|------|---------|-------------|
| `keycloakify-starter` | `apps/keycloakify-starter/` | Keycloak custom theme (Vite + Storybook) | `pnpm exec nx storybook keycloakify-starter` → :6006 |
| `luminarworks` | `apps/luminarworks/` | Next.js 15 + NextAuth v5 consumer app | `pnpm exec nx dev luminarworks` → :3000 |
```

Replace with:
```markdown
| App | Path | Purpose | Dev command |
|-----|------|---------|-------------|
| `keycloakify-starter` | `apps/keycloakify-starter/` | Keycloak custom theme (Vite + Storybook) | `pnpm exec nx storybook keycloakify-starter` → :6006 |
| `luminarworks` | `apps/luminarworks/` | Next.js 15 + NextAuth v5 consumer app | `pnpm exec nx dev luminarworks` → :3000 |
| `myclaudeapp` | `apps/myclaudeapp/` | Next.js 15 Figma-to-code learning app (auth-free) | `pnpm exec nx dev myclaudeapp` → :3002 |
```

- [ ] **Step 5: Final commit**

```bash
git add apps/myclaudeapp/src/app/page.tsx CLAUDE.md
git commit -m "feat(myclaudeapp): wire home page and update CLAUDE.md"
```

---

## Done — Success Criteria Checklist

- [ ] `pnpm exec nx dev myclaudeapp` starts on `:3002` with no errors
- [ ] `pnpm exec nx build myclaudeapp` completes with no TypeScript errors
- [ ] `pnpm --filter myclaudeapp test` — all 41 tests pass
- [ ] Atomic folder structure exists: `atoms/`, `molecules/`, `organisms/`, `templates/`, `themes/`
- [ ] `globals.css` has neutral tokens; `arctic-wolves.css` ready to import
- [ ] `CLAUDE.md` updated with `myclaudeapp` entry
