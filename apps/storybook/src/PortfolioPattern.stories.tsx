import {
  AppShell,
  Badge,
  Button,
  Card,
  CardHeader,
  DataTable,
  GainLoss,
  Heading,
  IconButton,
  Inline,
  LineChart,
  Money,
  MoneyGripLogo,
  PageHeader,
  SidebarNav,
  Stack,
  Stat,
  SummaryGrid,
  Text,
} from "@moneygrip/ui";
import type {Meta, StoryObj} from "@storybook/react-vite";
import {ArrowLeftRight, ChartNoAxesCombined, LayoutDashboard, Plus, Search, Users, WalletCards} from "lucide-react";

const meta = {
    title: "Patterns/Editorial portfolio shell",
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component: "A composition test for the design system, not the Portfolio application implementation.",
            },
        },
    },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const data = [
    {id: "vwce", name: "Vanguard FTSE All-World", owner: "Shared", value: 52344.11, gain: 0.184},
    {id: "iwda", name: "iShares MSCI World", owner: "Children", value: 14206.28, gain: 0.127},
    {id: "asml", name: "ASML Holding", owner: "Timo", value: 9842, gain: 0.081},
];

export const DesktopComposition: Story = {
    render: () => (
        <AppShell
            header={
                <Inline justify="space-between" wrap={false}>
                    <Heading as="h2" size="sm">
                        Portfolio
                    </Heading>
                    <Inline wrap={false}>
                        <IconButton icon={<Search aria-hidden="true"/>} label="Search" variant="ghost"/>
                        <Button variant="primary">
                            <Plus aria-hidden="true"/> Transaction
                        </Button>
                    </Inline>
                </Inline>
            }
            sidebar={
                <Stack gap="8">
                    <MoneyGripLogo/>
                    <SidebarNav
                        aria-label="Main navigation"
                        items={[
                            {active: true, href: "#overview", icon: LayoutDashboard, label: "Overview"},
                            {href: "#people", icon: Users, label: "People"},
                            {href: "#accounts", icon: WalletCards, label: "Accounts"},
                            {href: "#transactions", icon: ArrowLeftRight, label: "Transactions"},
                            {href: "#reports", icon: ChartNoAxesCombined, label: "Reports"},
                        ]}
                    />
                </Stack>
            }
        >
            <Stack gap="6">
                <PageHeader
                    actions={<Button>Everyone</Button>}
                    description="Combined view across all household allocations."
                    eyebrow="Whole household"
                    title="Good afternoon, Timo"
                />
                <SummaryGrid>
                    <Card>
                        <Stat label="Total value" value={<Money value={126840.32}/>}/>
                    </Card>
                    <Card>
                        <Stat label="Contributions" value={<Money value={103250}/>}/>
                    </Card>
                    <Card>
                        <Stat
                            label="Result"
                            value={<GainLoss downLabel="Loss" flatLabel="No change" upLabel="Gain" value={23590.32}/>}
                        />
                    </Card>
                </SummaryGrid>
                <Card>
                    <CardHeader description="Last six months" title="Value development"/>
                    <LineChart
                        data={[
                            {contribution: 82000, month: "Sep", value: 91300},
                            {contribution: 85500, month: "Oct", value: 94800},
                            {contribution: 90000, month: "Nov", value: 102200},
                            {contribution: 94000, month: "Dec", value: 105900},
                            {contribution: 98000, month: "Jan", value: 113600},
                            {contribution: 103250, month: "Feb", value: 126840},
                        ]}
                        description="Portfolio value increases over six months"
                        height={230}
                        series={[
                            {dataKey: "value", label: "Value"},
                            {colorIndex: 2, dataKey: "contribution", label: "Contributions"},
                        ]}
                        xKey="month"
                    />
                </Card>
                <Card padding="none">
                    <CardHeader description="Updated yesterday" title="Largest positions"/>
                    <DataTable
                        caption="Largest positions"
                        columns={[
                            {cell: (row) => row.name, header: "Investment", id: "name"},
                            {
                                cell: (row) => <Badge tone="accent">{row.owner}</Badge>,
                                header: "Owner",
                                id: "owner",
                            },
                            {
                                align: "end",
                                cell: (row) => <Money value={row.value}/>,
                                header: "Value",
                                id: "value",
                            },
                            {
                                align: "end",
                                cell: (row) => (
                                    <GainLoss downLabel="Loss" flatLabel="No change" upLabel="Gain"
                                              value={row.gain * row.value}/>
                                ),
                                header: "Result",
                                id: "result",
                            },
                        ]}
                        getRowKey={(row) => row.id}
                        rows={data}
                    />
                </Card>
                <Text muted size="small">
                    Sample data only. Calculations will be specified in the separate Portfolio project.
                </Text>
            </Stack>
        </AppShell>
    ),
};
