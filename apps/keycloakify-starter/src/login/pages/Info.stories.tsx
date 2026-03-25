import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "info.ftl" });

const meta = {
    title: "login/info.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const DefaultChocolate: Story = {
    render: () => <KcPageStory kcContext={{ themeName: "chocolate" }} />
};

export const AccountUpdated: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                message: { type: "success", summary: "Your account has been updated." },
                client: { baseUrl: "http://localhost:3000" }
            }}
        />
    )
};
