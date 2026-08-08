import {
    AllocationBar,
    BarChart,
    Card,
    DonutChart,
    GainLoss,
    Heading,
    LineChart,
    Money,
    Percentage,
    Sparkline,
    Stack,
    Text,
} from "@moneygrip/ui";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta = {
    title: "Components/Finance and charts",
    parameters: {
        docs: {
            description: {
                component:
                    "Finance primitives use the active locale. Charts include textual descriptions and never depend on color alone.",
            },
        },
    },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const performance = [
    {contributions: 82000, label: "Sep", value: 91300},
    {contributions: 85500, label: "Oct", value: 94800},
    {contributions: 90000, label: "Nov", value: 102200},
    {contributions: 94000, label: "Dec", value: 105900},
    {contributions: 98000, label: "Jan", value: 113600},
    {contributions: 103250, label: "Feb", value: 126840},
];

export const FormattedValues: Story = {
    render: () => (
        <Stack gap="4">
            <Heading as="h2">Financial values</Heading>
            <Text size="lead">
                <Money value={126840.32}/>
            </Text>
            <Text>
                <Percentage signDisplay="always" value={0.2285}/>
            </Text>
            <GainLoss downLabel="Loss" flatLabel="No change" upLabel="Gain" value={23590.32}/>
            <GainLoss downLabel="Loss" flatLabel="No change" upLabel="Gain" value={-1250.8}/>
            <Money masked maskedLabel="Hidden amount" value={126840.32}/>
            <AllocationBar
                aria-label="Portfolio allocation"
                segments={[
                    {id: "shared", label: "Shared", value: 54},
                    {id: "timo", label: "Timo", value: 23},
                    {id: "children", label: "Children", value: 18},
                    {id: "godson", label: "Godson", value: 5},
                ]}
            />
        </Stack>
    ),
};

export const ChartSet: Story = {
    render: () => (
        <div className="story-chart-grid">
            <Card>
                <LineChart
                    data={performance}
                    description="Portfolio value and contributions over six months"
                    series={[
                        {dataKey: "value", label: "Portfolio value"},
                        {colorIndex: 2, dataKey: "contributions", label: "Contributions"},
                    ]}
                    xKey="label"
                />
            </Card>
            <Card>
                <BarChart
                    data={[
                        {fees: 12, label: "Jan", tax: 34},
                        {fees: 8, label: "Feb", tax: 21},
                        {fees: 18, label: "Mar", tax: 42},
                        {fees: 10, label: "Apr", tax: 28},
                    ]}
                    description="Monthly transaction fees and taxes"
                    series={[
                        {colorIndex: 3, dataKey: "tax", label: "Tax"},
                        {colorIndex: 6, dataKey: "fees", label: "Fees"},
                    ]}
                    stacked
                    xKey="label"
                />
            </Card>
            <Card>
                <DonutChart
                    data={[
                        {id: "etf", label: "ETFs", value: 72},
                        {colorIndex: 2, id: "shares", label: "Shares", value: 22},
                        {colorIndex: 3, id: "cash", label: "Cash", value: 6},
                    ]}
                    description="Portfolio allocation by asset type"
                />
            </Card>
            <Card>
                <Stack gap="3">
                    <Text muted size="small">
                        Six-month trend
                    </Text>
                    <Sparkline data={[31, 34, 33, 38, 42, 40, 47, 52]}
                               description="Value trends upward over eight periods"/>
                </Stack>
            </Card>
        </div>
    ),
};
