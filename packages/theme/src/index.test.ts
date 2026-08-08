import { describe, expect, it } from "vitest";
import { resolveColorMode } from "./index";

describe("resolveColorMode", () => {
  it("resolves system preferences without reading the DOM", () => {
    expect(resolveColorMode("system", true)).toBe("dark");
    expect(resolveColorMode("system", false)).toBe("light");
  });
});
