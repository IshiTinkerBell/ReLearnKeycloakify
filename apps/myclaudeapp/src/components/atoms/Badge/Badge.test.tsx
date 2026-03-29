import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
    it("renders children", () => {
        render(<Badge>New</Badge>);
        expect(screen.getByText("New")).toBeInTheDocument();
    });

    it("applies badge-base class", () => {
        render(<Badge>New</Badge>);
        expect(screen.getByText("New")).toHaveClass("badge-base");
    });

    it("applies default variant styles by default", () => {
        render(<Badge>Default</Badge>);
        expect(screen.getByText("Default")).toHaveClass("badge-default");
    });

    it("applies success variant styles", () => {
        render(<Badge variant="success">Active</Badge>);
        expect(screen.getByText("Active")).toHaveClass("badge-success");
    });

    it("applies warning variant styles", () => {
        render(<Badge variant="warning">Pending</Badge>);
        expect(screen.getByText("Pending")).toHaveClass("badge-warning");
    });

    it("applies error variant styles", () => {
        render(<Badge variant="error">Failed</Badge>);
        expect(screen.getByText("Failed")).toHaveClass("badge-error");
    });
});
