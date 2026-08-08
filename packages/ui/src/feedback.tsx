import {AlertCircle, CheckCircle2, Info, TriangleAlert} from "lucide-react";
import type {HTMLAttributes, ReactNode} from "react";
import {Heading, Text, VisuallyHidden} from "./foundations";
import {Stack} from "./layout";
import styles from "./styles.module.css";
import {type CustomProperties, cx} from "./utils";

export type FeedbackTone = "danger" | "info" | "neutral" | "success" | "warning";

const toneIcons = {
    danger: AlertCircle,
    info: Info,
    neutral: Info,
    success: CheckCircle2,
    warning: TriangleAlert,
};

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    actions?: ReactNode;
    description?: ReactNode;
    title: ReactNode;
    tone?: FeedbackTone;
}

export function Alert({actions, className, description, title, tone = "neutral", ...props}: AlertProps) {
    const ToneIcon = toneIcons[tone];
    return (
        <div
            className={cx(styles.alert, styles[`tone-${tone}`], className)}
            role={tone === "danger" ? "alert" : "status"}
            {...props}
        >
            <ToneIcon aria-hidden="true" className={styles.alertIcon}/>
            <div className={styles.alertContent}>
                <Text weight="semibold">{title}</Text>
                {description ? <Text size="small">{description}</Text> : null}
            </div>
            {actions ? <div className={styles.alertActions}>{actions}</div> : null}
        </div>
    );
}

export interface SpinnerProps {
    label: string;
    size?: "md" | "sm";
}

export function Spinner({label, size = "md"}: SpinnerProps) {
    return (
        <span className={cx(styles.spinner, size === "sm" && styles.spinnerSmall)} role="status">
      <VisuallyHidden>{label}</VisuallyHidden>
    </span>
    );
}

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    "aria-label": string;
    height?: string;
    width?: string;
}

export function Skeleton({
                             "aria-label": ariaLabel,
                             className,
                             height = "1rem",
                             style,
                             width = "100%",
                             ...props
                         }: SkeletonProps) {
    return (
        <div
            aria-label={ariaLabel}
            className={cx(styles.skeleton, className)}
            role="status"
            style={
                {
                    "--moneygrip-skeleton-height": height,
                    "--moneygrip-skeleton-width": width,
                    ...style,
                } as CustomProperties
            }
            {...props}
        />
    );
}

export interface ProgressProps {
    label: ReactNode;
    max?: number;
    value: number;
    valueLabel?: ReactNode;
}

export function Progress({label, max = 100, value, valueLabel}: ProgressProps) {
    const clampedValue = Math.min(Math.max(value, 0), max);
    return (
        <div className={styles.progressRoot}>
            <div className={styles.progressHeader}>
                <Text size="small" weight="medium">
                    {label}
                </Text>
                {valueLabel ? (
                    <Text muted size="small">
                        {valueLabel}
                    </Text>
                ) : null}
            </div>
            <div
                aria-label={String(label)}
                aria-valuemax={max}
                aria-valuemin={0}
                aria-valuenow={clampedValue}
                className={styles.progressTrack}
                role="progressbar"
            >
        <span
            className={styles.progressValue}
            style={{"--moneygrip-progress": `${(clampedValue / max) * 100}%`} as CustomProperties}
        />
            </div>
        </div>
    );
}

export interface EmptyStateProps {
    actions?: ReactNode;
    description?: ReactNode;
    icon?: ReactNode;
    title: ReactNode;
}

export function EmptyState({actions, description, icon, title}: EmptyStateProps) {
    return (
        <section className={styles.emptyState}>
            {icon ? <div className={styles.emptyStateIcon}>{icon}</div> : null}
            <Stack align="center" gap="2">
                <Heading as="h2" size="sm">
                    {title}
                </Heading>
                {description ? <Text muted>{description}</Text> : null}
            </Stack>
            {actions ? <div>{actions}</div> : null}
        </section>
    );
}
