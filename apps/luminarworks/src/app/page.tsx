import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { signInWithKeycloak } from "@/app/actions";
import { LandingTemplate } from "@/components/templates/LandingTemplate/LandingTemplate";

export default async function HomePage() {
    const session = await auth();

    if (session) {
        redirect("/dashboard");
    }

    return <LandingTemplate onSignIn={signInWithKeycloak} />;
}
