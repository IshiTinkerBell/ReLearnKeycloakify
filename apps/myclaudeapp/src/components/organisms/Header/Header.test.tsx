import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Header } from "./Header";

describe("Header", () => {
    it("renders the title", () => {
        render(<Header title="My App" />);
        expect(screen.getByText("My App")).toBeInTheDocument();
    });

    it("renders a <header> landmark", () => {
        render(<Header title="My App" />);
        expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("does not render nav when no navItems provided", () => {
        render(<Header title="My App" />);
        expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    });

    it("renders nav when navItems are provided", () => {
        const navItems = [
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
        ];
        render(<Header title="My App" navItems={navItems} />);
        expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("renders nav links with correct hrefs", () => {
        const navItems = [
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
        ];
        render(<Header title="My App" navItems={navItems} />);
        expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
        expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    });
});
