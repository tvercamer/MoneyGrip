"use client";

import {AppShell} from "@moneygrip/ui";
import type {ReactNode} from "react";
import {AppHeader} from "@/components/AppHeader";
import {AppSidebar} from "@/components/AppSidebar";

interface ShellProps {
    children: ReactNode;
}

export default function Shell({children}: ShellProps) {
    return (
        <AppShell header={AppHeader} sidebar={AppSidebar}>
            {children}
        </AppShell>
    );
}
