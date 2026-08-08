import type {CSSProperties, HTMLAttributes} from "react";
import styles from "./styles.module.css";
import {type CustomProperties, cx} from "./utils";

type BoxElement = "article" | "aside" | "div" | "main" | "section";

export interface BoxProps extends HTMLAttributes<HTMLElement> {
    as?: BoxElement;
}

export function Box({as: Element = "div", ...props}: BoxProps) {
    return <Element {...props} />;
}

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
    align?: CSSProperties["alignItems"];
    gap?: "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12";
}

export function Stack({align, className, gap = "4", style, ...props}: StackProps) {
    return (
        <div
            className={cx(styles.stack, className)}
            style={
                {
                    "--moneygrip-stack-gap": `var(--moneygrip-space-${gap})`,
                    alignItems: align,
                    ...style,
                } as CustomProperties
            }
            {...props}
        />
    );
}

export interface InlineProps extends HTMLAttributes<HTMLDivElement> {
    align?: CSSProperties["alignItems"];
    gap?: "1" | "2" | "3" | "4" | "5" | "6" | "8";
    justify?: CSSProperties["justifyContent"];
    wrap?: boolean;
}

export function Inline({align = "center", className, gap = "3", justify, style, wrap = true, ...props}: InlineProps) {
    return (
        <div
            className={cx(styles.inline, !wrap && styles.noWrap, className)}
            style={
                {
                    "--moneygrip-inline-gap": `var(--moneygrip-space-${gap})`,
                    alignItems: align,
                    justifyContent: justify,
                    ...style,
                } as CustomProperties
            }
            {...props}
        />
    );
}

export type ClusterProps = InlineProps;

export function Cluster(props: ClusterProps) {
    return <Inline {...props} />;
}

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
    gap?: "2" | "3" | "4" | "5" | "6" | "8";
    minItemWidth?: string;
}

export function Grid({className, gap = "4", minItemWidth = "16rem", style, ...props}: GridProps) {
    return (
        <div
            className={cx(styles.grid, className)}
            style={
                {
                    "--moneygrip-grid-gap": `var(--moneygrip-space-${gap})`,
                    "--moneygrip-grid-min": minItemWidth,
                    ...style,
                } as CustomProperties
            }
            {...props}
        />
    );
}

export function Container({className, ...props}: HTMLAttributes<HTMLDivElement>) {
    return <div className={cx(styles.container, className)} {...props} />;
}

export function Divider({className, ...props}: HTMLAttributes<HTMLHRElement>) {
    return <hr className={cx(styles.divider, className)} {...props} />;
}
