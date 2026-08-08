import {useMoneyGripI18n} from "@moneygrip/i18n";
import {ArrowDownRight, ArrowUpRight, Minus} from "lucide-react";
import type {HTMLAttributes, ReactNode} from "react";
import {VisuallyHidden} from "./foundations";
import styles from "./styles.module.css";
import {type CustomProperties, cx} from "./utils";

export interface FinancialValueProps extends HTMLAttributes<HTMLSpanElement> {
    masked?: boolean;
    maskedLabel?: string;
}

export function FinancialValue({children, className, masked = false, maskedLabel, ...props}: FinancialValueProps) {
    return (
        <span className={cx(styles.financialValue, masked && styles.financialValueMasked, className)} {...props}>
      {masked ? (
          <>
              <span aria-hidden="true">••••••</span>
              <VisuallyHidden>{maskedLabel}</VisuallyHidden>
          </>
      ) : (
          children
      )}
    </span>
    );
}

export interface MoneyProps extends Omit<FinancialValueProps, "children"> {
    currency?: string;
    maximumFractionDigits?: number;
    minimumFractionDigits?: number;
    signDisplay?: Intl.NumberFormatOptions["signDisplay"];
    value: number;
}

export function Money({
                          currency = "EUR",
                          maximumFractionDigits = 2,
                          minimumFractionDigits = 2,
                          signDisplay = "auto",
                          value,
                          ...props
                      }: MoneyProps) {
    const {formatCurrency} = useMoneyGripI18n();
    return (
        <FinancialValue {...props}>
            {formatCurrency(value, currency, {
                maximumFractionDigits,
                minimumFractionDigits,
                signDisplay,
            })}
        </FinancialValue>
    );
}

export interface PercentageProps extends Omit<FinancialValueProps, "children"> {
    maximumFractionDigits?: number;
    signDisplay?: Intl.NumberFormatOptions["signDisplay"];
    value: number;
}

export function Percentage({maximumFractionDigits = 2, signDisplay = "auto", value, ...props}: PercentageProps) {
    const {formatPercent} = useMoneyGripI18n();
    return <FinancialValue {...props}>{formatPercent(value, {maximumFractionDigits, signDisplay})}</FinancialValue>;
}

export type TrendDirection = "down" | "flat" | "up";

export interface TrendProps extends HTMLAttributes<HTMLSpanElement> {
    direction?: TrendDirection;
    downLabel: string;
    flatLabel: string;
    upLabel: string;
    value?: ReactNode;
}

export function Trend({className, direction = "flat", downLabel, flatLabel, upLabel, value, ...props}: TrendProps) {
    const Icon = direction === "up" ? ArrowUpRight : direction === "down" ? ArrowDownRight : Minus;
    const label = direction === "up" ? upLabel : direction === "down" ? downLabel : flatLabel;
    return (
        <span className={cx(styles.trend, styles[`trend-${direction}`], className)} {...props}>
      <Icon aria-hidden="true"/>
            {value}
            <span className={styles.visuallyHidden}>{label}</span>
    </span>
    );
}

export interface GainLossProps extends Omit<MoneyProps, "signDisplay"> {
    downLabel: string;
    flatLabel: string;
    upLabel: string;
}

export function GainLoss({downLabel, flatLabel, upLabel, value, ...props}: GainLossProps) {
    const direction: TrendDirection = value > 0 ? "up" : value < 0 ? "down" : "flat";
    return (
        <Trend
            direction={direction}
            downLabel={downLabel}
            flatLabel={flatLabel}
            upLabel={upLabel}
            value={<Money signDisplay="always" value={value} {...props} />}
        />
    );
}

export interface AllocationSegment {
    id: string;
    label: ReactNode;
    value: number;
}

export interface AllocationBarProps {
    "aria-label": string;
    segments: AllocationSegment[];
}

export function AllocationBar({"aria-label": ariaLabel, segments}: AllocationBarProps) {
    const {formatPercent} = useMoneyGripI18n();
    const total = segments.reduce((sum, segment) => sum + segment.value, 0);
    return (
        <div className={styles.allocationRoot}>
            <div aria-label={ariaLabel} className={styles.allocationTrack} role="img">
                {segments.map((segment, index) => {
                    const percentage = total === 0 ? 0 : (segment.value / total) * 100;
                    return (
                        <span
                            className={styles.allocationSegment}
                            key={segment.id}
                            style={
                                {
                                    "--moneygrip-allocation-color": `var(--moneygrip-color-chart-${(index % 8) + 1})`,
                                    "--moneygrip-allocation-size": `${percentage}%`,
                                } as CustomProperties
                            }
                        />
                    );
                })}
            </div>
            <ul className={styles.allocationLegend}>
                {segments.map((segment, index) => (
                    <li className={styles.allocationLegendItem} key={segment.id}>
            <span
                className={styles.allocationSwatch}
                style={
                    {
                        "--moneygrip-allocation-color": `var(--moneygrip-color-chart-${(index % 8) + 1})`,
                    } as CustomProperties
                }
            />
                        <span>{segment.label}</span>
                        <span>{formatPercent(total === 0 ? 0 : segment.value / total)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
