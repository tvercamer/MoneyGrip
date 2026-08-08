"use client";

import {redirect, usePathname} from "next/navigation";
import type {MouseEvent} from "react";
import "./AppHeader.styles.css";
import {MONEYGRIP_DEFAULT_TOOL, MONEYGRIP_TOOLS} from "@/options";

export default function AppToolsNavigation() {
    const pathname = usePathname();

    const handleClick = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const path = e.currentTarget.getAttribute("data-href") || MONEYGRIP_DEFAULT_TOOL.path;
        redirect(path);
    };

    return (
        <nav aria-label="MoneyGrip Tools" className="toolNav">
            {MONEYGRIP_TOOLS.map((tool) => (
                <button
                    aria-current={pathname.startsWith(tool.path) ? "page" : undefined}
                    key={tool.path}
                    type="button"
                    onClick={handleClick}
                    data-href={tool.path}
                >
                    {tool.label}
                </button>
            ))}
        </nav>
    );
}
