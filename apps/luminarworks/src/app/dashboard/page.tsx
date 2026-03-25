import { auth } from "@/auth";
import { signOutAction } from "@/app/actions";
import { DashboardTemplate } from "@/components/templates/DashboardTemplate/DashboardTemplate";

export default async function DashboardPage() {
    const session = await auth();

    return (
        <DashboardTemplate
            userName={session?.user?.name}
            userEmail={session?.user?.email}
            onSignOut={signOutAction}
        />
    );
}
