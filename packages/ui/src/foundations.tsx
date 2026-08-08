import type {MoneyGripColorMode, MoneyGripTheme} from "@moneygrip/theme";
import type {LucideIcon} from "lucide-react";
import {createContext, type HTMLAttributes, type ReactNode, useContext} from "react";
import styles from "./styles.module.css";
import {cx} from "./utils";

export interface ThemeProviderProps extends HTMLAttributes<HTMLDivElement> {
    mode?: MoneyGripColorMode;
    theme?: MoneyGripTheme;
}

interface ThemeContextValue {
    mode: MoneyGripColorMode;
    theme: MoneyGripTheme;
}

const ThemeContext = createContext<ThemeContextValue>({mode: "system", theme: "editorial"});

export function ThemeProvider({
                                  children,
                                  className,
                                  mode = "system",
                                  theme = "editorial",
                                  ...props
                              }: ThemeProviderProps) {
    return (
        <ThemeContext value={{mode, theme}}>
            <div
                className={cx(styles.themeRoot, className)}
                data-moneygrip-color-mode={mode}
                data-moneygrip-theme={theme}
                {...props}
            >
                {children}
            </div>
        </ThemeContext>
    );
}

export function useMoneyGripTheme(): ThemeContextValue {
    return useContext(ThemeContext);
}

export function VisuallyHidden({className, ...props}: HTMLAttributes<HTMLSpanElement>) {
    return <span className={cx(styles.visuallyHidden, className)} {...props} />;
}

export interface IconProps {
    icon: LucideIcon;
    label?: string;
    size?: "md" | "sm";
}

export function Icon({icon: IconComponent, label, size = "md"}: IconProps) {
    return (
        <IconComponent
            aria-hidden={label ? undefined : true}
            aria-label={label}
            className={cx(styles.icon, size === "sm" && styles.iconSmall)}
            focusable="false"
        />
    );
}

type TextElement = "div" | "label" | "p" | "small" | "span";

export interface TextProps extends HTMLAttributes<HTMLElement> {
    as?: TextElement;
    muted?: boolean;
    size?: "body" | "caption" | "lead" | "small";
    weight?: "medium" | "regular" | "semibold";
}

export function Text({
                         as: Element = "p",
                         className,
                         muted = false,
                         size = "body",
                         weight = "regular",
                         ...props
                     }: TextProps) {
    return (
        <Element
            className={cx(styles.text, styles[`text-${size}`], styles[`weight-${weight}`], muted && styles.muted, className)}
            {...props}
        />
    );
}

type HeadingElement = "h1" | "h2" | "h3" | "h4";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    as?: HeadingElement;
    size?: "lg" | "md" | "sm" | "xl";
}

export function Heading({as: Element = "h2", className, size = "md", ...props}: HeadingProps) {
    return <Element className={cx(styles.heading, styles[`heading-${size}`], className)} {...props} />;
}

export interface MoneyGripLogoProps {
    compact?: boolean;
    label?: string;
}

export function MoneyGripLogo({compact = false, label = "MoneyGrip"}: MoneyGripLogoProps) {
    return (
        <span className={styles.logo}>
      <span className={styles.logoMark} aria-hidden="true">
        MG
      </span>
            {compact ? <VisuallyHidden>{label}</VisuallyHidden> : <span>{label}</span>}
    </span>
    );
}

export interface ContentSlotProps {
    children?: ReactNode;
}
