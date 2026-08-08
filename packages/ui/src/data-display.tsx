import type {HTMLAttributes, ReactNode, TableHTMLAttributes} from "react";
import {Heading, Text} from "./foundations";
import {Stack} from "./layout";
import styles from "./styles.module.css";
import {cx} from "./utils";

export interface CardProps extends HTMLAttributes<HTMLElement> {
    as?: "article" | "div" | "section";
    padding?: "lg" | "md" | "none" | "sm";
    raised?: boolean;
}

export function Card({as: Element = "div", className, padding = "md", raised = false, ...props}: CardProps) {
    return (
        <Element
            className={cx(styles.card, styles[`padding-${padding}`], raised && styles.cardRaised, className)}
            {...props}
        />
    );
}

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    actions?: ReactNode;
    description?: ReactNode;
    title: ReactNode;
}

export function CardHeader({actions, className, description, title, ...props}: CardHeaderProps) {
    return (
        <div className={cx(styles.cardHeader, className)} {...props}>
            <Stack gap="1">
                <Heading as="h3" size="sm">
                    {title}
                </Heading>
                {description ? (
                    <Text muted size="small">
                        {description}
                    </Text>
                ) : null}
            </Stack>
            {actions}
        </div>
    );
}

export function CardBody({className, ...props}: HTMLAttributes<HTMLDivElement>) {
    return <div className={cx(styles.cardBody, className)} {...props} />;
}

export function CardFooter({className, ...props}: HTMLAttributes<HTMLDivElement>) {
    return <div className={cx(styles.cardFooter, className)} {...props} />;
}

export interface StatProps extends HTMLAttributes<HTMLDivElement> {
    context?: ReactNode;
    label: ReactNode;
    value: ReactNode;
}

export function Stat({className, context, label, value, ...props}: StatProps) {
    return (
        <div className={cx(styles.stat, className)} {...props}>
            <Text muted size="small">
                {label}
            </Text>
            <div className={styles.statValue}>{value}</div>
            {context ? <div className={styles.statContext}>{context}</div> : null}
        </div>
    );
}

export type BadgeTone = "accent" | "danger" | "info" | "neutral" | "success" | "warning";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    tone?: BadgeTone;
}

export function Badge({className, tone = "neutral", ...props}: BadgeProps) {
    return <span className={cx(styles.badge, styles[`badge-${tone}`], className)} {...props} />;
}

export interface AvatarProps {
    alt: string;
    fallback: string;
    size?: "lg" | "md" | "sm";
    src?: string;
}

export function Avatar({alt, fallback, size = "md", src}: AvatarProps) {
    return (
        <span className={cx(styles.avatar, styles[`avatar-${size}`])}>
      {src ? (
          <img alt={alt} className={styles.avatarImage} src={src}/>
      ) : (
          <span aria-label={alt} role="img">
          {fallback}
        </span>
      )}
    </span>
    );
}

export interface DefinitionItem {
    label: ReactNode;
    value: ReactNode;
}

export interface DefinitionListProps {
    items: DefinitionItem[];
}

export function DefinitionList({items}: DefinitionListProps) {
    return (
        <dl className={styles.definitionList}>
            {items.map((item) => (
                <div className={styles.definitionItem} key={String(item.label)}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                </div>
            ))}
        </dl>
    );
}

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
    containerClassName?: string;
}

export function Table({className, containerClassName, ...props}: TableProps) {
    return (
        <div className={cx(styles.tableResponsive, containerClassName)}>
            <table className={cx(styles.table, className)} {...props} />
        </div>
    );
}

export interface DataTableColumn<Row> {
    align?: "center" | "end" | "start";
    cell: (row: Row) => ReactNode;
    header: ReactNode;
    id: string;
}

export interface DataTableProps<Row> {
    caption: ReactNode;
    columns: DataTableColumn<Row>[];
    emptyState?: ReactNode;
    getRowKey: (row: Row) => string;
    rows: Row[];
}

export function DataTable<Row>({caption, columns, emptyState, getRowKey, rows}: DataTableProps<Row>) {
    return (
        <Table>
            <caption className={styles.visuallyHidden}>{caption}</caption>
            <thead>
            <tr>
                {columns.map((column) => (
                    <th className={styles[`align-${column.align ?? "start"}`]} key={column.id} scope="col">
                        {column.header}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {rows.length > 0 ? (
                rows.map((row) => (
                    <tr key={getRowKey(row)}>
                        {columns.map((column) => (
                            <td className={styles[`align-${column.align ?? "start"}`]} key={column.id}>
                                {column.cell(row)}
                            </td>
                        ))}
                    </tr>
                ))
            ) : (
                <tr>
                    <td className={styles.emptyCell} colSpan={columns.length}>
                        {emptyState}
                    </td>
                </tr>
            )}
            </tbody>
        </Table>
    );
}
