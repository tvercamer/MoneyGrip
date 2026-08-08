import type {HTMLAttributes, ReactNode} from "react";
import {Heading, Text} from "./foundations";
import styles from "./styles.module.css";
import {cx} from "./utils";

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    actions?: ReactNode;
    breadcrumbs?: ReactNode;
    description?: ReactNode;
    eyebrow?: ReactNode;
    title: ReactNode;
}

export function PageHeader({
                               actions,
                               breadcrumbs,
                               className,
                               description,
                               eyebrow,
                               title,
                               ...props
                           }: PageHeaderProps) {
    return (
        <header className={cx(styles.pageHeader, className)} {...props}>
            <div className={styles.pageHeaderText}>
                {breadcrumbs}
                {eyebrow ? (
                    <Text muted size="caption" weight="semibold">
                        {eyebrow}
                    </Text>
                ) : null}
                <Heading as="h1" size="lg">
                    {title}
                </Heading>
                {description ? <Text muted>{description}</Text> : null}
            </div>
            {actions ? <div className={styles.pageHeaderActions}>{actions}</div> : null}
        </header>
    );
}

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
    "aria-label": string;
}

export function Toolbar({className, ...props}: ToolbarProps) {
    return <div className={cx(styles.toolbar, className)} role="toolbar" {...props} />;
}

export interface FilterBarProps extends HTMLAttributes<HTMLFormElement> {
    actions?: ReactNode;
}

export function FilterBar({actions, children, className, ...props}: FilterBarProps) {
    return (
        <form className={cx(styles.filterBar, className)} {...props}>
            <div className={styles.filterFields}>{children}</div>
            {actions ? <div className={styles.filterActions}>{actions}</div> : null}
        </form>
    );
}

export function SummaryGrid({className, ...props}: HTMLAttributes<HTMLDivElement>) {
    return <div className={cx(styles.summaryGrid, className)} {...props} />;
}

export interface ResponsiveDataViewProps {
    cards: ReactNode;
    table: ReactNode;
}

export function ResponsiveDataView({cards, table}: ResponsiveDataViewProps) {
    return (
        <div>
            <div className={styles.desktopDataView}>{table}</div>
            <div className={styles.mobileDataView}>{cards}</div>
        </div>
    );
}
