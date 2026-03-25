import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-update-password.ftl" });

const meta = {
    title: "login/login-update-password.ftl",
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

export const WithPasswordError: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                messagesPerField: {
                    existsError: (field: string) => field === "password",
                    get: (field: string) => field === "password" ? "Password is too short." : ""
                }
            }}
        />
    )
};

export const WithConfirmPasswordError: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                messagesPerField: {
                    existsError: (field: string) => field === "password-confirm",
                    get: (field: string) => field === "password-confirm" ? "Passwords do not match." : ""
                }
            }}
        />
    )
};
