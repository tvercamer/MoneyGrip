import type {ReactNode} from "react";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";
import styles from "./styles.module.css";
import type {CustomProperties} from "./utils";

export type ChartDatum = Record<string, number | string>;

export interface ChartSeries {
    colorIndex?: number;
    dataKey: string;
    label: string;
}

export interface ChartFrameProps {
    children: ReactNode;
    description: string;
    legend?: ChartSeries[];
}

export function ChartFrame({children, description, legend}: ChartFrameProps) {
    return (
        <figure className={styles.chartFrame}>
            <figcaption className={styles.visuallyHidden}>{description}</figcaption>
            <div aria-label={description} className={styles.chartPlot} role="img">
                {children}
            </div>
            {legend ? <ChartLegend series={legend}/> : null}
        </figure>
    );
}

export function ChartLegend({series}: { series: ChartSeries[] }) {
    return (
        <ul className={styles.chartLegend}>
            {series.map((item, index) => (
                <li className={styles.chartLegendItem} key={item.dataKey}>
          <span
              className={styles.chartSwatch}
              style={
                  {
                      "--moneygrip-chart-color": `var(--moneygrip-color-chart-${item.colorIndex ?? (index % 8) + 1})`,
                  } as CustomProperties
              }
          />
                    {item.label}
                </li>
            ))}
        </ul>
    );
}

const tooltipStyle = {
    background: "var(--moneygrip-color-surface-raised)",
    border: "1px solid var(--moneygrip-color-border)",
    borderRadius: "var(--moneygrip-radius-md)",
    boxShadow: "var(--moneygrip-shadow-md)",
    color: "var(--moneygrip-color-text)",
};

export interface LineChartProps {
    data: ChartDatum[];
    description: string;
    height?: number;
    series: ChartSeries[];
    valueFormatter?: (value: number) => string;
    xKey: string;
}

export function LineChart({data, description, height = 280, series, valueFormatter, xKey}: LineChartProps) {
    return (
        <ChartFrame description={description} legend={series}>
            <ResponsiveContainer height={height} width="100%">
                <RechartsLineChart accessibilityLayer data={data} margin={{bottom: 4, left: 0, right: 12, top: 8}}>
                    <CartesianGrid stroke="var(--moneygrip-color-border)" vertical={false}/>
                    <XAxis axisLine={false} dataKey={xKey} tickLine={false}/>
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        width={68}
                        {...(valueFormatter ? {tickFormatter: valueFormatter} : {})}
                    />
                    <RechartsTooltip
                        contentStyle={tooltipStyle}
                        formatter={(value) => (valueFormatter && typeof value === "number" ? valueFormatter(value) : value)}
                    />
                    {series.map((item, index) => (
                        <Line
                            dataKey={item.dataKey}
                            dot={false}
                            key={item.dataKey}
                            name={item.label}
                            stroke={`var(--moneygrip-color-chart-${item.colorIndex ?? (index % 8) + 1})`}
                            strokeWidth={2}
                            type="monotone"
                        />
                    ))}
                </RechartsLineChart>
            </ResponsiveContainer>
        </ChartFrame>
    );
}

export interface BarChartProps extends LineChartProps {
    stacked?: boolean;
}

export function BarChart({
                             data,
                             description,
                             height = 280,
                             series,
                             stacked = false,
                             valueFormatter,
                             xKey,
                         }: BarChartProps) {
    return (
        <ChartFrame description={description} legend={series}>
            <ResponsiveContainer height={height} width="100%">
                <RechartsBarChart accessibilityLayer data={data} margin={{bottom: 4, left: 0, right: 12, top: 8}}>
                    <CartesianGrid stroke="var(--moneygrip-color-border)" vertical={false}/>
                    <XAxis axisLine={false} dataKey={xKey} tickLine={false}/>
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        width={68}
                        {...(valueFormatter ? {tickFormatter: valueFormatter} : {})}
                    />
                    <RechartsTooltip
                        contentStyle={tooltipStyle}
                        formatter={(value) => (valueFormatter && typeof value === "number" ? valueFormatter(value) : value)}
                    />
                    {series.map((item, index) => (
                        <Bar
                            dataKey={item.dataKey}
                            fill={`var(--moneygrip-color-chart-${item.colorIndex ?? (index % 8) + 1})`}
                            key={item.dataKey}
                            name={item.label}
                            radius={[4, 4, 0, 0]}
                            {...(stacked ? {stackId: "total"} : {})}
                        />
                    ))}
                </RechartsBarChart>
            </ResponsiveContainer>
        </ChartFrame>
    );
}

export interface DonutDatum {
    colorIndex?: number;
    id: string;
    label: string;
    value: number;
}

export interface DonutChartProps {
    data: DonutDatum[];
    description: string;
    height?: number;
    valueFormatter?: (value: number) => string;
}

export function DonutChart({data, description, height = 280, valueFormatter}: DonutChartProps) {
    const legend = data.map((item, index) => ({
        colorIndex: item.colorIndex ?? (index % 8) + 1,
        dataKey: item.id,
        label: item.label,
    }));
    return (
        <ChartFrame description={description} legend={legend}>
            <ResponsiveContainer height={height} width="100%">
                <RechartsPieChart accessibilityLayer>
                    <Pie data={data} dataKey="value" innerRadius="58%" nameKey="label" outerRadius="84%"
                         paddingAngle={2}>
                        {data.map((item, index) => (
                            <Cell fill={`var(--moneygrip-color-chart-${item.colorIndex ?? (index % 8) + 1})`}
                                  key={item.id}/>
                        ))}
                    </Pie>
                    <RechartsTooltip
                        contentStyle={tooltipStyle}
                        formatter={(value) => (valueFormatter && typeof value === "number" ? valueFormatter(value) : value)}
                    />
                </RechartsPieChart>
            </ResponsiveContainer>
        </ChartFrame>
    );
}

export interface SparklineProps {
    colorIndex?: number;
    data: number[];
    description: string;
    height?: number;
}

export function Sparkline({colorIndex = 1, data, description, height = 48}: SparklineProps) {
    const chartData = data.map((value, index) => ({index, value}));
    return (
        <ChartFrame description={description}>
            <ResponsiveContainer height={height} width="100%">
                <RechartsLineChart accessibilityLayer data={chartData}>
                    <Line
                        dataKey="value"
                        dot={false}
                        isAnimationActive={false}
                        stroke={`var(--moneygrip-color-chart-${colorIndex})`}
                        strokeWidth={2}
                        type="monotone"
                    />
                </RechartsLineChart>
            </ResponsiveContainer>
        </ChartFrame>
    );
}
