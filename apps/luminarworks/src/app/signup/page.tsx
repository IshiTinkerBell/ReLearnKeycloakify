import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { signUpAction } from "@/app/actions";
import { SignUpTemplate } from "@/components/templates/SignUpTemplate/SignUpTemplate";

export default async function SignUpPage() {
    const session = await auth();

    if (session) {
        redirect("/dashboard");
    }

    return <SignUpTemplate signUpAction={signUpAction} />;
}
