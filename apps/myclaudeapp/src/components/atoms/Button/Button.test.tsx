import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
    it("renders children", () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
    });

    it("defaults to type='button'", () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("applies btn and btn-primary classes by default", () => {
        render(<Button>Click me</Button>);
        const btn = screen.getByRole("button");
        expect(btn).toHaveClass("btn");
        expect(btn).toHaveClass("btn-primary");
    });

    it("applies btn-ghost class when variant='ghost'", () => {
        render(<Button variant="ghost">Click me</Button>);
        expect(screen.getByRole("button")).toHaveClass("btn-ghost");
    });

    it("applies btn-outline class when variant='outline'", () => {
        render(<Button variant="outline">Click me</Button>);
        expect(screen.getByRole("button")).toHaveClass("btn-outline");
    });

    it("calls onClick when clicked", () => {
        const onClick = vi.fn();
        render(<Button onClick={onClick}>Click me</Button>);
        fireEvent.click(screen.getByRole("button"));
        expect(onClick).toHaveBeenCalledOnce();
    });

    it("is disabled when disabled prop is true", () => {
        render(<Button disabled>Click me</Button>);
        expect(screen.getByRole("button")).toBeDisabled();
    });

    it("renders as type='submit' when specified", () => {
        render(<Button type="submit">Submit</Button>);
        expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });
});
