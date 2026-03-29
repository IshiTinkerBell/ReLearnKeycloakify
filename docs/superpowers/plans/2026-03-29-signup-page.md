# Sign-Up Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an auth-free sign-up page in `apps/myclaudeapp` matching the Figma "Create Account" design with Luminar Works branding (two-column layout, gradient left panel, form card right panel).

**Architecture:** Route-scoped Tailwind CSS theme file (`luminar-works.css`) activated via `app/signup/globals.css` overrides the design tokens for this route. A `PhoneInput` atom handles the phone number field. A `SignUpForm` organism owns all UI state and renders the form card. The two-column page shell lives in `app/signup/page.tsx` as local (non-exported) sub-components. A route-scoped `app/signup/layout.tsx` loads Google Fonts.

**Tech Stack:** Next.js 15 App Router, Tailwind CSS v4 (`@theme`), `next/font/google` (Rethink Sans 800 + Jost 400/500/600), Vitest + React Testing Library

---

## File Map

| File | Action |
|------|--------|
| `apps/myclaudeapp/src/components/themes/luminar-works.css` | Create |
| `apps/myclaudeapp/src/app/signup/globals.css` | Create |
| `apps/myclaudeapp/src/components/atoms/PhoneInput/PhoneInput.tsx` | Create |
| `apps/myclaudeapp/src/components/atoms/PhoneInput/PhoneInput.test.tsx` | Create |
| `apps/myclaudeapp/src/components/organisms/SignUpForm/SignUpForm.tsx` | Create |
| `apps/myclaudeapp/src/components/organisms/SignUpForm/SignUpForm.test.tsx` | Create |
| `apps/myclaudeapp/src/app/signup/layout.tsx` | Create |
| `apps/myclaudeapp/src/app/signup/page.tsx` | Create |

---

### Task 1: Luminar Works theme CSS + signup route globals

**Context:** The sign-up page uses different brand colors than the rest of `myclaudeapp` (Luminar Works vs the default app palette). Tailwind v4 `@theme` rules land on `:root`, so a route-scoped CSS file in `app/signup/` is enough to override the tokens for this route only — Next.js App Router splits CSS per route segment.

**Files:**
- Create: `apps/myclaudeapp/src/components/themes/luminar-works.css`
- Create: `apps/myclaudeapp/src/app/signup/globals.css`

No tests for CSS files — verified visually in Task 4.

- [ ] **Step 1: Create the Luminar Works theme token file**

Create `apps/myclaudeapp/src/components/themes/luminar-works.css`:

```css
@theme {
    --color-primary: #155dfc;
    --color-primary-dark: #1044c4;
    --color-fg: #020617;
    --color-fg-muted: #64748b;
    --color-surface: #f8fafc;
    --color-line: #e2e8f0;
    --color-bg: #ffffff;
}
```

- [ ] **Step 2: Create the route-scoped signup globals.css**

Create `apps/myclaudeapp/src/app/signup/globals.css`:

```css
@import "tailwindcss";
@import "../../components/themes/luminar-works.css";
```

> **Why `@import "tailwindcss"` here?** The root layout's `globals.css` already provides `@layer components` classes (`.btn`, `.input-base`, etc.). Re-importing `tailwindcss` in this file causes the Tailwind v4 compiler to re-process the `@theme` block in `luminar-works.css` and generate utilities with the Figma token values (`bg-primary` → `#155dfc`, `border-line` → `#e2e8f0`, etc.) for this route.

- [ ] **Step 3: Commit**

```bash
git add apps/myclaudeapp/src/components/themes/luminar-works.css apps/myclaudeapp/src/app/signup/globals.css
git commit -m "feat(myclaudeapp): add luminar-works theme tokens and signup route CSS"
```

---

### Task 2: PhoneInput atom (TDD)

**Context:** The sign-up form has a phone number row with a static US flag + country code prefix, then a text input. The outer container is styled to look like `input-base` (same border/background/radius) but it's a flex container with two regions, so we can't use the `input-base` class directly (it adds padding and expects to be an `<input>` element).

**Files:**
- Create: `apps/myclaudeapp/src/components/atoms/PhoneInput/PhoneInput.tsx`
- Create: `apps/myclaudeapp/src/components/atoms/PhoneInput/PhoneInput.test.tsx`

- [ ] **Step 1: Write the failing tests**

Create `apps/myclaudeapp/src/components/atoms/PhoneInput/PhoneInput.test.tsx`:

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { PhoneInput } from "./PhoneInput";

describe("PhoneInput", () => {
    it("renders the input element", () => {
        render(<PhoneInput id="phone" name="phone" value="" onChange={() => {}} />);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("shows country code +1", () => {
        render(<PhoneInput id="phone" name="phone" value="" onChange={() => {}} />);
        expect(screen.getByText("+1")).toBeInTheDocument();
    });

    it("calls onChange when value changes", () => {
        const handleChange = vi.fn();
        render(<PhoneInput id="phone" name="phone" value="" onChange={handleChange} />);
        fireEvent.change(screen.getByRole("textbox"), { target: { value: "555-0100" } });
        expect(handleChange).toHaveBeenCalledTimes(1);
    });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
pnpm exec nx test myclaudeapp
```

Expected: 3 FAIL with "Cannot find module './PhoneInput'"

- [ ] **Step 3: Implement PhoneInput**

Create `apps/myclaudeapp/src/components/atoms/PhoneInput/PhoneInput.tsx`:

```tsx
interface PhoneInputProps {
    readonly id: string;
    readonly name: string;
    readonly value: string;
    readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readonly disabled?: boolean;
}

export function PhoneInput({ id, name, value, onChange, disabled }: PhoneInputProps) {
    return (
        <div className="flex items-center border border-line bg-surface rounded-[6px] overflow-hidden w-full">
            <span className="flex items-center gap-1 pl-3 pr-2 py-[0.625rem] text-fg-muted border-r border-line text-sm shrink-0 select-none">
                🇺🇸 <span>+1</span>
            </span>
            <input
                id={id}
                name={name}
                type="tel"
                value={value}
                onChange={onChange}
                disabled={disabled}
                placeholder="(555) 000-0000"
                className="flex-1 px-3 py-[0.625rem] bg-transparent outline-none text-fg placeholder:text-fg-muted text-[0.9375rem]"
            />
        </div>
    );
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
pnpm exec nx test myclaudeapp
```

Expected: 3 PASS for PhoneInput tests (plus all prior tests still passing)

- [ ] **Step 5: Commit**

```bash
git add apps/myclaudeapp/src/components/atoms/PhoneInput/PhoneInput.tsx apps/myclaudeapp/src/components/atoms/PhoneInput/PhoneInput.test.tsx
git commit -m "feat(myclaudeapp): add PhoneInput atom with static US flag and country code"
```

---

### Task 3: SignUpForm organism (TDD)

**Context:** The form card owns all state: company name, email, full name, phone, verified (toggled by Verify button), and agreed (terms checkbox). The form is auth-free — no submit handler, no API call. The "Create Account" button is disabled until the user clicks "Verify". The Verify toggle is one-way (no reset).

Existing atoms/molecules used:
- `FormField` from `@/components/molecules/FormField/FormField` — for Company Name, Email Address, Full Name
- `Button` from `@/components/atoms/Button/Button` — for the "Create Account" button (primary variant, `disabled={!verified}`)
- `PhoneInput` from `@/components/atoms/PhoneInput/PhoneInput` — for the contact number field

The "Verify" button is a plain `<button>` (not the `Button` atom) because its style — white background, `#e2e8f0` border, `#155dfc` text — doesn't match any existing atom variant.

**Files:**
- Create: `apps/myclaudeapp/src/components/organisms/SignUpForm/SignUpForm.tsx`
- Create: `apps/myclaudeapp/src/components/organisms/SignUpForm/SignUpForm.test.tsx`

- [ ] **Step 1: Write the failing tests**

Create `apps/myclaudeapp/src/components/organisms/SignUpForm/SignUpForm.test.tsx`:

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { SignUpForm } from "./SignUpForm";

describe("SignUpForm", () => {
    it("renders all 4 fields", () => {
        render(<SignUpForm />);
        expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/contact number/i)).toBeInTheDocument();
    });

    it("renders the Terms of Service checkbox", () => {
        render(<SignUpForm />);
        expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("Create Account button is disabled initially", () => {
        render(<SignUpForm />);
        expect(screen.getByRole("button", { name: /create account/i })).toBeDisabled();
    });

    it("clicking Verify enables the Create Account button", () => {
        render(<SignUpForm />);
        fireEvent.click(screen.getByRole("button", { name: /verify/i }));
        expect(screen.getByRole("button", { name: /create account/i })).not.toBeDisabled();
    });

    it("Create Account button is enabled after verification", () => {
        render(<SignUpForm />);
        fireEvent.click(screen.getByRole("button", { name: /verify/i }));
        expect(screen.getByRole("button", { name: /create account/i })).toBeEnabled();
    });

    it("renders 'Already have an account? Sign in' text", () => {
        render(<SignUpForm />);
        expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
    });

    it("checkbox toggles when clicked", () => {
        render(<SignUpForm />);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).not.toBeChecked();
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
    });
});
```

> **Why `getByLabelText`?** It verifies both that the label text is present AND that each label is properly linked to its input via `htmlFor`/`id`. A render-only check (e.g. `getByText`) would pass even if the label/input association is broken.

- [ ] **Step 2: Run tests to verify they fail**

```bash
pnpm exec nx test myclaudeapp
```

Expected: 7 FAIL with "Cannot find module './SignUpForm'"

- [ ] **Step 3: Implement SignUpForm**

Create `apps/myclaudeapp/src/components/organisms/SignUpForm/SignUpForm.tsx`:

```tsx
"use client";

import { useState } from "react";
import { FormField } from "@/components/molecules/FormField/FormField";
import { PhoneInput } from "@/components/atoms/PhoneInput/PhoneInput";
import { Button } from "@/components/atoms/Button/Button";

export function SignUpForm() {
    const [phone, setPhone] = useState("");
    const [verified, setVerified] = useState(false);
    const [agreed, setAgreed] = useState(false);

    return (
        <div
            style={{
                background: "rgba(255, 255, 255, 0.4)",
                borderRadius: "24px",
                padding: "36px",
                maxWidth: "459px",
                width: "100%",
            }}
        >
            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col gap-1">
                    <h1
                        className="text-2xl font-semibold text-fg"
                        style={{ fontFamily: "var(--font-jost)" }}
                    >
                        Create your Account
                    </h1>
                    <p className="text-sm text-fg-muted" style={{ fontFamily: "var(--font-jost)" }}>
                        Enter your details to get started
                    </p>
                </div>

                {/* Fields */}
                <div className="flex flex-col gap-4">
                    <FormField
                        id="company-name"
                        name="company-name"
                        label="Company Name"
                        placeholder="Acme Inc."
                    />
                    <FormField
                        id="email"
                        name="email"
                        type="email"
                        label="Email Address"
                        placeholder="you@company.com"
                    />
                    <FormField
                        id="full-name"
                        name="full-name"
                        label="Full Name"
                        placeholder="Jane Smith"
                    />

                    {/* Contact Number row */}
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="phone"
                            className="text-sm font-medium text-fg"
                            style={{ fontFamily: "var(--font-jost)" }}
                        >
                            Contact Number
                        </label>
                        <div className="flex gap-2">
                            <PhoneInput
                                id="phone"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                disabled={verified}
                            />
                            <button
                                type="button"
                                onClick={() => setVerified(true)}
                                className="shrink-0 px-4 py-2 rounded-[6px] bg-white border border-[#e2e8f0] text-[#155dfc] text-sm font-medium cursor-pointer whitespace-nowrap"
                                style={{ fontFamily: "var(--font-jost)" }}
                            >
                                Verify
                            </button>
                        </div>
                    </div>
                </div>

                {/* Terms checkbox */}
                <label className="flex items-start gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-0.5 accent-primary"
                    />
                    <span className="text-sm text-fg-muted" style={{ fontFamily: "var(--font-jost)" }}>
                        I agree to the{" "}
                        <a href="#" className="text-primary underline">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-primary underline">
                            Privacy Policy
                        </a>
                    </span>
                </label>

                {/* Create Account button */}
                <Button disabled={!verified}>Create Account</Button>

                {/* Sign in link */}
                <p
                    className="text-center text-sm text-fg-muted"
                    style={{ fontFamily: "var(--font-jost)" }}
                >
                    Already have an account?{" "}
                    <a href="#" className="text-primary font-medium underline">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
pnpm exec nx test myclaudeapp
```

Expected: all 10 tests PASS (3 PhoneInput + 7 SignUpForm + all prior tests)

- [ ] **Step 5: Commit**

```bash
git add apps/myclaudeapp/src/components/organisms/SignUpForm/SignUpForm.tsx apps/myclaudeapp/src/components/organisms/SignUpForm/SignUpForm.test.tsx
git commit -m "feat(myclaudeapp): add SignUpForm organism with UI-only phone verification"
```

---

### Task 4: Signup route — layout.tsx + page.tsx

**Context:** The route files wire up fonts and the two-column shell. `layout.tsx` loads Google Fonts via `next/font/google` and exposes them as CSS variables (`--font-rethink`, `--font-jost`) scoped to the signup route segment. `page.tsx` renders the two-column desktop layout: a gradient left panel with logo and taglines, and a white right panel centering the `SignUpForm` card.

`LeftPanel` and `RightPanel` are local sub-components defined in `page.tsx` — they are layout shells with no reuse outside this page and should not be exported.

No new tests for this task — visual verification via the dev server.

**Files:**
- Create: `apps/myclaudeapp/src/app/signup/layout.tsx`
- Create: `apps/myclaudeapp/src/app/signup/page.tsx`

- [ ] **Step 1: Create signup/layout.tsx**

Create `apps/myclaudeapp/src/app/signup/layout.tsx`:

```tsx
import type { ReactNode } from "react";
import { Rethink_Sans, Jost } from "next/font/google";
import "./globals.css";

const rethink = Rethink_Sans({
    weight: "800",
    subsets: ["latin"],
    variable: "--font-rethink",
});

const jost = Jost({
    weight: ["400", "500", "600"],
    subsets: ["latin"],
    variable: "--font-jost",
});

export default function SignUpLayout({ children }: { readonly children: ReactNode }) {
    return (
        <div className={`${rethink.variable} ${jost.variable}`}>
            {children}
        </div>
    );
}
```

> **Why a `<div>` wrapper (not `<html>`/`<body>`):** The root layout in `app/layout.tsx` already provides the `<html>` and `<body>` tags. Nested layouts in Next.js App Router wrap only the children — they slot into the root layout's `<body>`. The `rethink.variable` and `jost.variable` props set CSS custom properties (`--font-rethink`, `--font-jost`) on this div, making them available to all descendant elements.

- [ ] **Step 2: Create signup/page.tsx**

Create `apps/myclaudeapp/src/app/signup/page.tsx`:

```tsx
import { SignUpForm } from "@/components/organisms/SignUpForm/SignUpForm";

function LeftPanel() {
    return (
        <div
            className="hidden md:flex md:w-[52%] relative flex-col justify-between p-10"
            style={{
                background: [
                    "radial-gradient(ellipse at 20% 20%, #7c3aed 0%, transparent 45%)",
                    "radial-gradient(ellipse at 80% 70%, #ec4899 0%, transparent 45%)",
                    "radial-gradient(ellipse at 50% 50%, #2563eb 0%, transparent 60%)",
                    "#1e1a4d",
                ].join(", "),
            }}
        >
            {/* Logo — top right */}
            <div className="flex justify-end">
                <span
                    className="text-white text-lg font-semibold tracking-wide"
                    style={{ fontFamily: "var(--font-jost)" }}
                >
                    Luminar Works
                </span>
            </div>

            {/* Taglines — bottom left */}
            <div className="flex flex-col gap-1">
                <p
                    className="text-[64px] font-extrabold italic leading-none"
                    style={{ color: "#1e1a4d", fontFamily: "var(--font-rethink)" }}
                >
                    Big Business Tools.
                </p>
                <p
                    className="text-[64px] font-extrabold italic leading-none"
                    style={{ color: "#1e1a4d", fontFamily: "var(--font-rethink)" }}
                >
                    Built For You.
                </p>
            </div>
        </div>
    );
}

function RightPanel({ children }: { readonly children: React.ReactNode }) {
    return (
        <div className="flex-1 md:w-[48%] bg-white flex items-center justify-center p-6 min-h-screen">
            {children}
        </div>
    );
}

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex">
            <LeftPanel />
            <RightPanel>
                <SignUpForm />
            </RightPanel>
        </div>
    );
}
```

- [ ] **Step 3: Run the full test suite to confirm nothing broke**

```bash
pnpm exec nx test myclaudeapp
```

Expected: all tests PASS (same count as after Task 3)

- [ ] **Step 4: Start the dev server and verify the page visually**

```bash
pnpm exec nx dev myclaudeapp
```

Open `http://localhost:3002/signup` and verify:
- Desktop: two-column layout with gradient left panel and white right panel
- Left panel: "Luminar Works" logo top-right, taglines bottom-left in italic
- Right panel: form card with Company Name, Email Address, Full Name, Contact Number (with US flag + Verify button), Terms checkbox, disabled "Create Account" button
- Clicking "Verify": "Create Account" button becomes enabled
- Mobile (< 768px): left panel hidden, form takes full width

Stop the dev server with `Ctrl+C`.

- [ ] **Step 5: Commit**

```bash
git add apps/myclaudeapp/src/app/signup/layout.tsx apps/myclaudeapp/src/app/signup/page.tsx
git commit -m "feat(myclaudeapp): add signup page with two-column Luminar Works layout"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Covered by |
|-----------------|-----------|
| luminar-works.css with 7 token overrides | Task 1 Step 1 |
| route-scoped globals.css importing tailwindcss + theme | Task 1 Step 2 |
| PhoneInput: renders input, shows +1, fires onChange | Task 2 (3 tests) |
| PhoneInput props: id, name, value, onChange, disabled? | Task 2 Step 3 |
| PhoneInput container styled like input-base | Task 2 Step 3 |
| SignUpForm: all 4 fields rendered | Task 3 test 1 |
| SignUpForm: Terms checkbox | Task 3 test 2 |
| Create Account disabled initially | Task 3 test 3 |
| Clicking Verify enables Create Account | Task 3 tests 4 + 5 |
| "Already have an account?" text | Task 3 test 6 |
| Checkbox toggles on click | Task 3 test 7 |
| Verify is one-way toggle (onClick sets verified=true) | Task 3 Step 3 |
| No form submission handler | Task 3 Step 3 (no onSubmit) |
| signup/layout.tsx with Rethink Sans + Jost | Task 4 Step 1 |
| signup/page.tsx two-column shell | Task 4 Step 2 |
| LeftPanel/RightPanel as local non-exported sub-components | Task 4 Step 2 |
| Mobile: left panel hidden (< md) | Task 4 Step 2 (hidden md:flex) |
| Left panel: gradient bg, logo top-right, taglines bottom-left | Task 4 Step 2 |
| Card: rgba(255,255,255,0.4), 24px radius, 36px padding, 459px max-width | Task 3 Step 3 |
| Fonts: Rethink Sans 800 for taglines, Jost for form elements | Tasks 3 + 4 |

**Placeholder scan:** No TBDs, TODOs, or "implement later" — all steps include complete code.

**Type consistency:** `PhoneInput` props defined in Task 2 and used in Task 3 with the same signature (`id`, `name`, `value`, `onChange`, `disabled?`). `FormField` reused from existing molecule — no new props needed. `Button` reused from existing atom.
