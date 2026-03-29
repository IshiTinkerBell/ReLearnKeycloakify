import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
    it("renders children", () => {
        render(<Card><p>Card content</p></Card>);
        expect(screen.getByText("Card content")).toBeInTheDocument();
    });

    it("renders title heading when title is provided", () => {
        render(<Card title="My Card"><p>Content</p></Card>);
        expect(screen.getByRole("heading", { name: "My Card" })).toBeInTheDocument();
    });

    it("does not render heading when title is not provided", () => {
        render(<Card><p>Content</p></Card>);
        expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });

    it("applies card-base class to container", () => {
        const { container } = render(<Card><p>Content</p></Card>);
        expect(container.firstChild).toHaveClass("card-base");
    });

    it("applies additional className when provided", () => {
        const { container } = render(<Card className="custom-class"><p>Content</p></Card>);
        expect(container.firstChild).toHaveClass("custom-class");
    });
});
