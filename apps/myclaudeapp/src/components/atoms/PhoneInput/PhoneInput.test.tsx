import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PhoneInput } from "./PhoneInput";

describe("PhoneInput", () => {
    it("renders the input element", () => {
        render(<PhoneInput id="phone" name="phone" value="" onChange={() => {}} />);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("shows country code +1", () => {
        render(<PhoneInput id="phone" name="phone" value="" onChange={() => {}} />);
        expect(screen.getByText("+1")).toBeInTheDocument();
    });

    it("calls onChange when value changes", () => {
        const handleChange = vi.fn();
        render(<PhoneInput id="phone" name="phone" value="" onChange={handleChange} />);
        fireEvent.change(screen.getByRole("textbox"), { target: { value: "555-0100" } });
        expect(handleChange).toHaveBeenCalledTimes(1);
    });
});
