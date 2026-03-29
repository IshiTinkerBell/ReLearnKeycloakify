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
                                className="shrink-0 px-4 py-2 rounded-[6px] bg-white border border-line text-primary text-sm font-medium cursor-pointer whitespace-nowrap"
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
