"use client";

import {SidebarNav} from "@moneygrip/ui";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import {useHash} from "@/hooks/useHash";
import {
    MONEYGRIP_DEFAULT_TOOL,
    MONEYGRIP_LEDGER_TOOLS,
    MONEYGRIP_SUBSCRIPTIONS_TOOLS,
    MONEYGRIP_TOOLS,
} from "@/options";

export default function AppSidebarNav() {
    const hash = useHash();
    const [view, setView] = useState(hash);
    const pathname = usePathname();

    useEffect(() => {
        setView(hash);
    }, [hash]);

    function getCurrentTool() {
        for (const tool of MONEYGRIP_TOOLS) {
            if (pathname.startsWith(tool.path)) {
                return tool;
            }
        }
        return MONEYGRIP_DEFAULT_TOOL;
    }

    const currentTool = getCurrentTool();

    function getCurrentSidebarItems() {
        switch (currentTool.label) {
            case "Ledger":
                return MONEYGRIP_LEDGER_TOOLS;
            case "Subscriptions":
                return MONEYGRIP_SUBSCRIPTIONS_TOOLS;
            default:
                return [];
        }
    }

    const sidebarItems = getCurrentSidebarItems();

    return (
        <SidebarNav
            aria-label={`${currentTool.label}-navigatie`}
            items={sidebarItems.map((item) => ({
                active: view === `#${item.name}`,
                href: item.path,
                icon: item.icon,
                label: item.label,
            }))}
        />
    );
}
