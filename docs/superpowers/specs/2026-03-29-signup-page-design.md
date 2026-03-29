# Design Spec: Sign-Up Page

**Date:** 2026-03-29
**Status:** Approved
**Figma:** `OVMtFYJMJ3bHNW0Bsvn1u2` — "Create Account" section, frames `74:17717` and `74:17791`
**Location:** `apps/myclaudeapp/`

---

## Purpose

Implement the sign-up page from the Figma "Sign Up Process" design as a Figma-to-code learning exercise inside `myclaudeapp`. The page is auth-free (no real account creation) and uses UI-only phone verification (clicking "Verify" toggles a state flag that enables the "Create Account" button).

---

## Page Layout

Full-viewport two-column desktop layout (`min-h-screen flex`):

### Left panel (`~52%` width)
- Background: colorful mesh gradient (CSS `radial-gradient` approximating the Figma gradient using purple/pink/blue tones)
- **Logo** top-right corner of the left panel: text "Luminar Works" in Jost SemiBold
- **Taglines** bottom-left: "Big Business Tools." and "Built For You." stacked, in Rethink Sans 800 italic, large (~64px), dark navy `#1e1a4d`

### Right panel (`~48%` width)
- Background: solid `#ffffff`
- Vertically and horizontally centers the form card

### Form card
- Background: `rgba(255, 255, 255, 0.4)`
- Border radius: `24px`
- Padding: `36px`
- Max-width: `459px`

### Mobile (< `md` breakpoint)
- Single column: left panel hidden, right panel takes full width

---

## Design Tokens

New file: `src/components/themes/luminar-works.css`

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

Activated by importing this file in `app/signup/globals.css` (route-scoped, does not affect the rest of the app).

---

## Typography

Loaded in `app/signup/layout.tsx` via `next/font/google`:

| Font | Weights | Used for |
|------|---------|----------|
| `Rethink_Sans` | 800 | Left panel taglines |
| `Jost` | 400, 500, 600 | Form labels, inputs, buttons, body text |

Applied as CSS variables `--font-rethink` and `--font-jost` scoped to the `app/signup/` route segment.

---

## Components

### New: `src/components/themes/luminar-works.css`
Figma token overrides. Imported via route-scoped `globals.css`.

### New: `src/components/atoms/PhoneInput/PhoneInput.tsx`
A specialised input atom for phone numbers.

**Props:**
```ts
interface PhoneInputProps {
    readonly id: string;
    readonly name: string;
    readonly value: string;
    readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readonly disabled?: boolean;
}
```

**Renders:**
- Container styled like `input-base` (same border/bg/radius as other inputs)
- Left: static US flag emoji `🇺🇸` + country code `+1`
- Right: text `<input>` for the phone number digits

### New: `src/components/organisms/SignUpForm/SignUpForm.tsx`
Owns all form state. No submission handler (auth-free).

**Internal state:**
```ts
const [companyName, setCompanyName] = useState("");
const [email, setEmail] = useState("");
const [fullName, setFullName] = useState("");
const [phone, setPhone] = useState("");
const [verified, setVerified] = useState(false);
const [agreed, setAgreed] = useState(false);
```

**Renders:**
1. Card header: "Create your Account" (h1) + subtitle
2. `FormField` for Company Name, Email Address, Full Name
3. Contact Number row: `PhoneInput` + "Verify" button — white bg, `#e2e8f0` border, `#155dfc` text. Rendered as a `<button>` with inline class override (not a reused variant — this specific style doesn't match any existing atom variant)
4. Terms checkbox: "I agree to the Terms of Service and Privacy Policy" (links are `<a>` placeholders)
5. "Create Account" `Button` — `disabled={!verified}` — primary variant
6. "Already have an account? Sign in" link

**Verify behaviour:** `onClick={() => setVerified(true)}` — one-way toggle, no reset.

### New: `src/app/signup/layout.tsx`
Route layout that loads Google Fonts and imports the route-scoped `globals.css`.

### New: `src/app/signup/globals.css`
```css
@import "tailwindcss";
@import "../../components/themes/luminar-works.css";
```

The root layout's `globals.css` (loaded first via Next.js App Router layout inheritance) already provides `@layer components` classes (`.btn`, `.input-base`, etc.). This file re-imports `tailwindcss` to activate the `luminar-works.css` `@theme` overrides and generate utilities with the Figma token values (`bg-primary` → `#155dfc`, etc.).

### New: `src/app/signup/page.tsx`
Two-column shell page.

```
<div class="min-h-screen flex">
  <LeftPanel />        ← gradient bg, logo, taglines
  <RightPanel>
    <SignUpForm />
  </RightPanel>
</div>
```

`LeftPanel` and `RightPanel` are local sub-components (not exported, defined in the same file) — they are layout shells with no reuse outside this page.

---

## File Map

| File | Action |
|------|--------|
| `apps/myclaudeapp/src/components/themes/luminar-works.css` | Create |
| `apps/myclaudeapp/src/components/atoms/PhoneInput/PhoneInput.tsx` | Create |
| `apps/myclaudeapp/src/components/atoms/PhoneInput/PhoneInput.test.tsx` | Create |
| `apps/myclaudeapp/src/components/organisms/SignUpForm/SignUpForm.tsx` | Create |
| `apps/myclaudeapp/src/components/organisms/SignUpForm/SignUpForm.test.tsx` | Create |
| `apps/myclaudeapp/src/app/signup/globals.css` | Create |
| `apps/myclaudeapp/src/app/signup/layout.tsx` | Create |
| `apps/myclaudeapp/src/app/signup/page.tsx` | Create |

---

## Tests

### `PhoneInput.test.tsx` — 3 tests
1. Renders the input element
2. Shows country code "+1"
3. Calls `onChange` when value changes

### `SignUpForm.test.tsx` — 7 tests
1. Renders all 4 fields (Company Name, Email, Full Name, Contact Number)
2. Renders the Terms of Service checkbox
3. "Create Account" button is disabled initially
4. Clicking "Verify" enables the "Create Account" button
5. "Create Account" button is enabled after verification
6. Renders "Already have an account? Sign in" text
7. Checkbox toggles when clicked

---

## What Is NOT Included (by design)

- No form submission / API call (auth-free)
- No real OTP / SMS verification (UI-only state toggle)
- No country code dropdown (static US flag + "+1")
- No route protection or redirect after "Create Account"
- No Storybook stories (can be added later)
