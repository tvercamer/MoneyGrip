import {MoneyGripI18nProvider} from "@moneygrip/i18n";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {describe, expect, it, vi} from "vitest";
import {Button} from "../buttons";
import {Money} from "../finance";
import {TextField} from "../forms";
import {Tabs} from "../navigation";

describe("Button", () => {
    it("supports activation and a loading state", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        const {rerender} = render(<Button onClick={onClick}>Save</Button>);
        await user.click(screen.getByRole("button", {name: "Save"}));
        expect(onClick).toHaveBeenCalledOnce();

        rerender(<Button loading>Save</Button>);
        expect(screen.getByRole("button", {name: "Save"})).toBeDisabled();
    });
});

describe("TextField", () => {
    it("associates labels and validation messages", () => {
        render(<TextField error="Enter a value" label="Amount"/>);
        const input = screen.getByRole("textbox", {name: "Amount"});
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(input).toHaveAccessibleDescription("Enter a value");
    });
});

describe("Tabs", () => {
    it("moves selection with arrow keys", async () => {
        const user = userEvent.setup();
        render(
            <Tabs
                aria-label="View"
                items={[
                    {id: "one", label: "One", panel: "First"},
                    {id: "two", label: "Two", panel: "Second"},
                ]}
            />,
        );
        const first = screen.getByRole("tab", {name: "One"});
        first.focus();
        await user.keyboard("{ArrowRight}");
        expect(screen.getByRole("tab", {name: "Two"})).toHaveAttribute("aria-selected", "true");
        expect(screen.getByRole("tabpanel")).toHaveTextContent("Second");
    });
});

describe("Money", () => {
    it("uses the active application locale", () => {
        render(
            <MoneyGripI18nProvider locale="nl-BE">
                <Money value={1234.56}/>
            </MoneyGripI18nProvider>,
        );
        expect(screen.getByText(/1\.234,56/)).toBeInTheDocument();
    });
});
