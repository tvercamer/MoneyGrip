import type {LucideIcon} from "lucide-react";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {type KeyboardEvent, type ReactNode, useId, useState} from "react";
import {Button, IconButton, Link} from "./actions";
import {Icon} from "./foundations";
import styles from "./styles.module.css";
import {cx} from "./utils";

export interface TabItem {
    disabled?: boolean;
    id: string;
    label: ReactNode;
    panel: ReactNode;
}

export interface TabsProps {
    "aria-label": string;
    defaultValue?: string;
    items: TabItem[];
    onValueChange?: (id: string) => void;
    value?: string;
}

export function Tabs({"aria-label": ariaLabel, defaultValue, items, onValueChange, value}: TabsProps) {
    const baseId = useId();
    const firstEnabled = items.find((item) => !item.disabled)?.id ?? "";
    const [internalValue, setInternalValue] = useState(defaultValue ?? firstEnabled);
    const selectedValue = value ?? internalValue;
    const selectedItem = items.find((item) => item.id === selectedValue) ?? items[0];

    const select = (id: string) => {
        if (value === undefined) setInternalValue(id);
        onValueChange?.(id);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        const enabled = items.filter((item) => !item.disabled);
        if (enabled.length === 0) return;
        event.preventDefault();
        const currentIndex = enabled.findIndex((item) => item.id === selectedValue);
        let nextIndex = currentIndex;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = enabled.length - 1;
        if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + enabled.length) % enabled.length;
        if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % enabled.length;
        const nextItem = enabled[nextIndex];
        if (nextItem) {
            select(nextItem.id);
            document.getElementById(`${baseId}-tab-${nextItem.id}`)?.focus();
        }
    };

    return (
        <div className={styles.tabs}>
            <div aria-label={ariaLabel} className={styles.tabList} onKeyDown={onKeyDown} role="tablist">
                {items.map((item) => (
                    <button
                        aria-controls={`${baseId}-panel-${item.id}`}
                        aria-selected={selectedValue === item.id}
                        className={styles.tab}
                        disabled={item.disabled}
                        id={`${baseId}-tab-${item.id}`}
                        key={item.id}
                        onClick={() => select(item.id)}
                        role="tab"
                        tabIndex={selectedValue === item.id ? 0 : -1}
                        type="button"
                    >
                        {item.label}
                    </button>
                ))}
            </div>
            {selectedItem ? (
                <div
                    aria-labelledby={`${baseId}-tab-${selectedItem.id}`}
                    className={styles.tabPanel}
                    id={`${baseId}-panel-${selectedItem.id}`}
                    role="tabpanel"
                >
                    {selectedItem.panel}
                </div>
            ) : null}
        </div>
    );
}

export interface BreadcrumbItem {
    href?: string;
    label: ReactNode;
}

export interface BreadcrumbsProps {
    "aria-label": string;
    items: BreadcrumbItem[];
}

export function Breadcrumbs({"aria-label": ariaLabel, items}: BreadcrumbsProps) {
    return (
        <nav aria-label={ariaLabel}>
            <ol className={styles.breadcrumbs}>
                {items.map((item, index) => {
                    const isCurrent = index === items.length - 1;
                    return (
                        <li className={styles.breadcrumbItem} key={item.href ?? String(item.label)}>
                            {item.href && !isCurrent ? (
                                <Link href={item.href} subtle>
                                    {item.label}
                                </Link>
                            ) : (
                                <span aria-current={isCurrent ? "page" : undefined}>{item.label}</span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

export interface SidebarNavItem {
    active?: boolean;
    href: string;
    icon?: LucideIcon;
    label: ReactNode;
}

export interface SidebarNavProps {
    "aria-label": string;
    items: SidebarNavItem[];
}

export function SidebarNav({"aria-label": ariaLabel, items}: SidebarNavProps) {
    return (
        <nav aria-label={ariaLabel} className={styles.sidebarNav}>
            {items.map((item) => (
                <a
                    aria-current={item.active ? "page" : undefined}
                    className={cx(styles.sidebarNavItem, item.active && styles.sidebarNavItemActive)}
                    href={item.href}
                    key={item.href}
                >
                    {item.icon ? <Icon icon={item.icon}/> : null}
                    {item.label}
                </a>
            ))}
        </nav>
    );
}

export interface PaginationLabels {
    label: string;
    next: string;
    page: (page: number) => string;
    previous: string;
}

export interface PaginationProps {
    currentPage: number;
    labels: PaginationLabels;
    onPageChange: (page: number) => void;
    totalPages: number;
}

export function Pagination({currentPage, labels, onPageChange, totalPages}: PaginationProps) {
    const pages = Array.from({length: totalPages}, (_, index) => index + 1);
    return (
        <nav aria-label={labels.label} className={styles.pagination}>
            <IconButton
                disabled={currentPage <= 1}
                icon={<ChevronLeft aria-hidden="true"/>}
                label={labels.previous}
                onClick={() => onPageChange(currentPage - 1)}
                size="sm"
            />
            <div className={styles.paginationPages}>
                {pages.map((page) => (
                    <Button
                        aria-current={page === currentPage ? "page" : undefined}
                        aria-label={labels.page(page)}
                        key={page}
                        onClick={() => onPageChange(page)}
                        size="sm"
                        variant={page === currentPage ? "primary" : "ghost"}
                    >
                        {page}
                    </Button>
                ))}
            </div>
            <IconButton
                disabled={currentPage >= totalPages}
                icon={<ChevronRight aria-hidden="true"/>}
                label={labels.next}
                onClick={() => onPageChange(currentPage + 1)}
                size="sm"
            />
        </nav>
    );
}

export interface AppShellProps {
    children: ReactNode;
    header?: ReactNode;
    sidebar: ReactNode;
}

export function AppShell({children, header, sidebar}: AppShellProps) {
    return (
        <div className={styles.appShell}>
            <aside className={styles.appSidebar}>{sidebar}</aside>
            <div className={styles.appBody}>
                {header ? <header className={styles.appHeader}>{header}</header> : null}
                <main className={styles.appMain}>{children}</main>
            </div>
        </div>
    );
}
