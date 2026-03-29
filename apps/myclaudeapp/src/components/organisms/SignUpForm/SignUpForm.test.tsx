import { render, screen, fireEvent } from "@testing-library/react";
import { SignUpForm } from "./SignUpForm";

describe("SignUpForm", () => {
    it("renders all 4 fields", () => {
        render(<SignUpForm />);
        expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/contact number/i)).toBeInTheDocument();
    });

    it("renders the Terms of Service checkbox", () => {
        render(<SignUpForm />);
        expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("Create Account button is disabled initially", () => {
        render(<SignUpForm />);
        expect(screen.getByRole("button", { name: /create account/i })).toBeDisabled();
    });

    it("clicking Verify enables the Create Account button", () => {
        render(<SignUpForm />);
        fireEvent.click(screen.getByRole("button", { name: /verify/i }));
        expect(screen.getByRole("button", { name: /create account/i })).not.toBeDisabled();
    });

    it("Create Account button is enabled after verification", () => {
        render(<SignUpForm />);
        fireEvent.click(screen.getByRole("button", { name: /verify/i }));
        expect(screen.getByRole("button", { name: /create account/i })).toBeEnabled();
    });

    it("renders 'Already have an account? Sign in' text", () => {
        render(<SignUpForm />);
        expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
    });

    it("checkbox toggles when clicked", () => {
        render(<SignUpForm />);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).not.toBeChecked();
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
    });
});
