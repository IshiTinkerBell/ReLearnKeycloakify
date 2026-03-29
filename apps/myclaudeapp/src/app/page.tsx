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
