import {createContext, type PropsWithChildren, useContext, useMemo} from "react";

export type MoneyGripLocale = string;
export type MoneyGripDateInput = Date | number | string;

export interface MoneyGripFormatters {
    locale: MoneyGripLocale;
    timeZone: string;
    formatCurrency: (
        value: number,
        currency?: string,
        options?: Omit<Intl.NumberFormatOptions, "currency" | "style">,
    ) => string;
    formatDate: (value: MoneyGripDateInput, options?: Intl.DateTimeFormatOptions) => string;
    formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string;
    formatPercent: (value: number, options?: Intl.NumberFormatOptions) => string;
}

export interface MoneyGripI18nProviderProps extends PropsWithChildren {
    locale?: MoneyGripLocale;
    timeZone?: string;
}

export function createMoneyGripFormatters(
    locale: MoneyGripLocale = "nl-BE",
    timeZone = "Europe/Brussels",
): MoneyGripFormatters {
    return {
        locale,
        timeZone,
        formatCurrency(value, currency = "EUR", options = {}) {
            return new Intl.NumberFormat(locale, {
                style: "currency",
                currency,
                currencyDisplay: "symbol",
                ...options,
            }).format(value);
        },
        formatDate(value, options = {}) {
            return new Intl.DateTimeFormat(locale, {
                timeZone,
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                ...options,
            }).format(value instanceof Date ? value : new Date(value));
        },
        formatNumber(value, options = {}) {
            return new Intl.NumberFormat(locale, options).format(value);
        },
        formatPercent(value, options = {}) {
            return new Intl.NumberFormat(locale, {
                style: "percent",
                maximumFractionDigits: 2,
                signDisplay: "auto",
                ...options,
            }).format(value);
        },
    };
}

const defaultFormatters = createMoneyGripFormatters();
const MoneyGripI18nContext = createContext<MoneyGripFormatters>(defaultFormatters);

export function MoneyGripI18nProvider({
                                          children,
                                          locale = "nl-BE",
                                          timeZone = "Europe/Brussels",
                                      }: MoneyGripI18nProviderProps) {
    const value = useMemo(() => createMoneyGripFormatters(locale, timeZone), [locale, timeZone]);
    return <MoneyGripI18nContext value={value}>{children}</MoneyGripI18nContext>;
}

export function useMoneyGripI18n(): MoneyGripFormatters {
    return useContext(MoneyGripI18nContext);
}
