import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FormField } from "./FormField";

describe("FormField", () => {
    it("renders label text", () => {
        render(<FormField id="email" name="email" label="Email" />);
        expect(screen.getByText("Email")).toBeInTheDocument();
    });

    it("associates label with input via htmlFor", () => {
        render(<FormField id="email" name="email" label="Email address" />);
        expect(screen.getByLabelText(/Email address/)).toBeInTheDocument();
    });

    it("renders error message when provided", () => {
        render(<FormField id="email" name="email" label="Email" error="Required field" />);
        expect(screen.getByRole("alert")).toHaveTextContent("Required field");
    });

    it("does not render alert when error prop is omitted", () => {
        render(<FormField id="email" name="email" label="Email" />);
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("shows required asterisk when required is true", () => {
        render(<FormField id="email" name="email" label="Email" required />);
        expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("does not show required asterisk when required is false", () => {
        render(<FormField id="email" name="email" label="Email" />);
        expect(screen.queryByText("*")).not.toBeInTheDocument();
    });
});
