import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PageLayout } from "./PageLayout";

describe("PageLayout", () => {
    it("renders title in the header", () => {
        render(<PageLayout title="My App"><p>Content</p></PageLayout>);
        expect(screen.getByText("My App")).toBeInTheDocument();
    });

    it("renders children inside a main element", () => {
        render(<PageLayout title="My App"><p>Page content</p></PageLayout>);
        const main = screen.getByRole("main");
        expect(main).toContainElement(screen.getByText("Page content"));
    });

    it("passes navItems to Header", () => {
        const navItems = [{ label: "Home", href: "/" }];
        render(
            <PageLayout title="My App" navItems={navItems}>
                <p>Content</p>
            </PageLayout>
        );
        expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    });

    it("renders both header and main landmarks", () => {
        render(<PageLayout title="My App"><p>Content</p></PageLayout>);
        expect(screen.getByRole("banner")).toBeInTheDocument();
        expect(screen.getByRole("main")).toBeInTheDocument();
    });
});
