"use client";

import {MoneyGripI18nProvider} from "@moneygrip/i18n";
import {ThemeProvider} from "@moneygrip/ui";
import type {ReactNode} from "react";

interface ProviderProps {
    children: ReactNode;
}

export default function Providers({children}: ProviderProps) {
    return (
        <MoneyGripI18nProvider locale="nl-BE" timeZone="Europe/Brussels">
            <ThemeProvider mode="system">
                <div className="app">{children}</div>
            </ThemeProvider>
        </MoneyGripI18nProvider>
    );
}
