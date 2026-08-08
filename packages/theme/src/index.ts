import "@fontsource-variable/source-sans-3";
import "./styles/index.css";

export const MONEYGRIP_THEME_ATTRIBUTE = "data-moneygrip-theme";
export const MONEYGRIP_COLOR_MODE_ATTRIBUTE = "data-moneygrip-color-mode";
export const MONEYGRIP_THEME = "editorial";

export type MoneyGripTheme = typeof MONEYGRIP_THEME;
export type MoneyGripColorMode = "light" | "dark" | "system";
export type ResolvedMoneyGripColorMode = Exclude<MoneyGripColorMode, "system">;

export function resolveColorMode(
    mode: MoneyGripColorMode,
    prefersDark = typeof window === "undefined" ? false : window.matchMedia("(prefers-color-scheme: dark)").matches,
): ResolvedMoneyGripColorMode {
    return mode === "system" ? (prefersDark ? "dark" : "light") : mode;
}

export function applyFinFamTheme(
    element: HTMLElement,
    options: { mode?: MoneyGripColorMode; theme?: MoneyGripTheme } = {},
): void {
    element.dataset.moneygripTheme = options.theme ?? MONEYGRIP_THEME;
    element.dataset.moneygripColorMode = options.mode ?? "system";
}
