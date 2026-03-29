import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
    it("renders with correct id", () => {
        render(<Input id="email" name="email" />);
        expect(document.getElementById("email")).toBeInTheDocument();
    });

    it("renders with placeholder", () => {
        render(<Input id="email" name="email" placeholder="Enter email" />);
        expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
    });

    it("defaults to type='text'", () => {
        render(<Input id="name" name="name" />);
        expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
    });

    it("renders password input when type='password'", () => {
        const { container } = render(<Input id="pwd" name="pwd" type="password" />);
        expect(container.querySelector("input")).toHaveAttribute("type", "password");
    });

    it("applies input-base class", () => {
        render(<Input id="name" name="name" />);
        expect(screen.getByRole("textbox")).toHaveClass("input-base");
    });

    it("calls onChange when value changes", () => {
        const onChange = vi.fn();
        render(<Input id="name" name="name" onChange={onChange} />);
        fireEvent.change(screen.getByRole("textbox"), { target: { value: "test" } });
        expect(onChange).toHaveBeenCalled();
    });

    it("is disabled when disabled prop is true", () => {
        render(<Input id="name" name="name" disabled />);
        expect(screen.getByRole("textbox")).toBeDisabled();
    });
});
