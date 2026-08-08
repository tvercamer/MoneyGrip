import {describe, expect, it} from "vitest";
import {createMoneyGripFormatters} from "./provider";

describe("createMoneyGripFormatters", () => {
    it("uses Belgian Dutch defaults", () => {
        const formatters = createMoneyGripFormatters();
        expect(formatters.formatNumber(1234.56)).toBe("1.234,56");
        expect(formatters.formatDate(new Date("2026-08-03T12:00:00Z"))).toBe("03/08/2026");
    });

    it("supports arbitrary locales", () => {
        const formatters = createMoneyGripFormatters("en-US");
        expect(formatters.formatPercent(0.128)).toContain("12.8");
    });
});
