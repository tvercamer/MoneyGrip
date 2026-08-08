import {type AnchorHTMLAttributes, type ButtonHTMLAttributes, forwardRef, type ReactNode} from "react";
import {VisuallyHidden} from "./foundations";
import styles from "./styles.module.css";
import {cx} from "./utils";

export type ButtonVariant = "danger" | "ghost" | "primary" | "secondary";
export type ButtonSize = "lg" | "md" | "sm";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    size?: ButtonSize;
    variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    {children, className, disabled, loading = false, size = "md", type = "button", variant = "secondary", ...props},
    ref,
) {
    return (
        <button
            ref={ref}
            className={cx(styles.button, styles[`button-${variant}`], styles[`control-${size}`], className)}
            disabled={disabled || loading}
            type={type}
            {...props}
        >
            {loading ? <span className={styles.buttonSpinner} aria-hidden="true"/> : null}
            {children}
        </button>
    );
});

export interface IconButtonProps extends Omit<ButtonProps, "children"> {
    icon: ReactNode;
    label: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
    {icon, label, ...props},
    ref,
) {
    return (
        <Button ref={ref} className={styles.iconButton} {...props}>
            {icon}
            <VisuallyHidden>{label}</VisuallyHidden>
        </Button>
    );
});

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    subtle?: boolean;
}

export function ButtonLink({className, subtle = false, ...props}: LinkProps) {
    return <a className={cx(styles.link, subtle && styles.linkSubtle, className)} {...props} />;
}

export interface ButtonGroupProps extends ButtonHTMLAttributes<HTMLDivElement> {
    "aria-label": string;
}

export function ButtonGroup({className, ...props}: ButtonGroupProps) {
    // biome-ignore lint/a11y/useSemanticElements: role needs to be "group" for better semantics
    return <div className={cx(styles.buttonGroup, className)} role="group" {...props} />;
}
