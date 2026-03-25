"use server";

import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

export async function signInWithKeycloak() {
    await signIn("keycloak", { redirectTo: "/dashboard" }, { prompt: "login" });
}

export async function signOutAction() {
    await signOut({ redirectTo: "/" });
}

export interface SignUpState {
    error?: string;
}

export async function signUpAction(_prevState: SignUpState, formData: FormData): Promise<SignUpState> {
    const field = (key: string): string => { const v = formData.get(key); return typeof v === "string" ? v : ""; };
    const firstName = field("firstName").trim();
    const lastName = field("lastName").trim();
    const email = field("email").trim();

    if (!firstName || !lastName || !email) {
        return { error: "All fields are required." };
    }

    const issuer = process.env.AUTH_KEYCLOAK_ISSUER ?? "";
    const baseUrl = issuer.replace(/\/realms\/.*$/, "");
    const realm = /\/realms\/([^/]+)/.exec(issuer)?.[1];

    if (!realm) {
        return { error: "Server configuration error." };
    }

    // Get admin token from master realm
    const tokenRes = await fetch(`${baseUrl}/realms/master/protocol/openid-connect/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            grant_type: "password",
            client_id: "admin-cli",
            username: process.env.KEYCLOAK_ADMIN_USERNAME ?? "",
            password: process.env.KEYCLOAK_ADMIN_PASSWORD ?? "",
        }),
    });

    if (!tokenRes.ok) {
        return { error: "Failed to connect to authentication service." };
    }

    const { access_token } = await tokenRes.json() as { access_token: string };

    // Create user via Admin REST API
    const createRes = await fetch(`${baseUrl}/admin/realms/${realm}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            username: email,
            enabled: true,
            requiredActions: ["VERIFY_EMAIL", "UPDATE_PASSWORD"],
            attributes: { favourite_pet: [""] },
        }),
    });

    if (createRes.status === 409) {
        return { error: "An account with this email already exists. Please sign in." };
    }

    if (!createRes.ok) {
        return { error: "Failed to create account. Please try again." };
    }

    const location = createRes.headers.get("Location") ?? "";
    const userId = location.split("/").at(-1);

    if (userId) {
        const clientId = process.env.AUTH_KEYCLOAK_ID ?? "";
        const appUrl = process.env.APP_URL ?? "http://localhost:3000";
        const params = new URLSearchParams({ client_id: clientId, redirect_uri: appUrl });
        await fetch(`${baseUrl}/admin/realms/${realm}/users/${userId}/send-verify-email?${params}`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${access_token}` },
        });
    }

    redirect("/signup/check-email");
}
