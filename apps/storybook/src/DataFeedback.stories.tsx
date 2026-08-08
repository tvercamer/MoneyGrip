import {
    Alert,
    AlertDialog,
    Avatar,
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    DataTable,
    DefinitionList,
    DropdownMenu,
    EmptyState,
    Inline,
    Money,
    Popover,
    Progress,
    Skeleton,
    Spinner,
    Stack,
    Stat,
    Text,
    Toast,
    Tooltip,
    VisuallyHidden,
} from "@moneygrip/ui";
import type {Meta, StoryObj} from "@storybook/react-vite";
import {ArchiveRestore, Inbox, MoreHorizontal, Trash2} from "lucide-react";
import {useState} from "react";

const meta = {
    title: "Components/Data and feedback",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardsAndStatus: Story = {
    render: () => (
        <section className="story-section">
            <div className="story-grid">
                <Card>
                    <Stat
                        context={<Badge tone="success">Up 8.4%</Badge>}
                        label="Total value"
                        value={<Money value={126840.32}/>}
                    />
                </Card>
                <Card>
                    <Stat context="Across 4 owners" label="Positions" value="17"/>
                </Card>
                <Card>
                    <Stat context="Updated yesterday" label="Unrealized gain" value={<Money value={23590.32}/>}/>
                </Card>
            </div>
            <Card padding="none" raised>
                <CardHeader actions={<Button size="sm">Edit</Button>} description="Bolero account"
                            title="Account summary"/>
                <CardBody>
                    <DefinitionList
                        items={[
                            {label: "Account holder", value: "Household"},
                            {label: "Currency", value: "EUR"},
                            {label: "Last transaction", value: "03/08/2026"},
                        ]}
                    />
                </CardBody>
                <CardFooter>
                    <Text muted size="small">
                        All amounts include transaction costs.
                    </Text>
                </CardFooter>
            </Card>
            <Inline>
                <Badge>Draft</Badge>
                <Badge tone="accent">Shared</Badge>
                <Badge tone="success">Complete</Badge>
                <Badge tone="warning">Needs review</Badge>
                <Badge tone="danger">Failed</Badge>
                <Badge tone="info">Imported</Badge>
                <Avatar alt="Timo Vercamer" fallback="TV"/>
                <Avatar alt="Sofie" fallback="SV" size="sm"/>
            </Inline>
        </section>
    ),
};

interface Holding {
    id: string;
    name: string;
    owner: string;
    value: number;
}

const holdings: Holding[] = [
    {id: "vwce", name: "Vanguard FTSE All-World", owner: "Shared", value: 52344.11},
    {id: "iwda", name: "iShares MSCI World", owner: "Children", value: 14206.28},
    {id: "asml", name: "ASML Holding", owner: "Timo", value: 9842},
];

export const Tables: Story = {
    render: () => (
        <Card padding="none">
            <DataTable
                caption="Largest positions"
                columns={[
                    {cell: (row) => row.name, header: "Investment", id: "name"},
                    {cell: (row) => <Badge tone="accent">{row.owner}</Badge>, header: "Owner", id: "owner"},
                    {
                        align: "end",
                        cell: (row) => <Money value={row.value}/>,
                        header: "Value",
                        id: "value",
                    },
                    {
                        align: "end",
                        cell: () => (
                            <Button size="sm" variant="ghost">
                                <MoreHorizontal aria-hidden="true"/>
                            </Button>
                        ),
                        header: <VisuallyHidden>Actions</VisuallyHidden>,
                        id: "actions",
                    },
                ]}
                getRowKey={(row) => row.id}
                rows={holdings}
            />
        </Card>
    ),
};

export const FeedbackStates: Story = {
    render: () => (
        <Stack gap="4">
            <Alert title="Prices are up to date" description="End-of-day prices were fetched successfully."
                   tone="success"/>
            <Alert
                title="Review this transaction"
                description="The recorded TOB differs from the expected amount."
                tone="warning"
                actions={<Button size="sm">Review</Button>}
            />
            <Alert title="Price unavailable" description="The previous closing price is shown instead." tone="danger"/>
            <Progress label="Import progress" value={68} valueLabel="68%"/>
            <Inline>
                <Spinner label="Loading transactions"/>
                <Skeleton aria-label="Loading value" width="12rem"/>
            </Inline>
            <Toast
                title="Transaction archived"
                description="You can restore it for 30 days."
                action={
                    <Button size="sm" variant="ghost">
                        <ArchiveRestore aria-hidden="true"/> Undo
                    </Button>
                }
            />
            <EmptyState
                actions={<Button variant="primary">Add transaction</Button>}
                description="Transactions you add will appear here."
                icon={<Inbox aria-hidden="true"/>}
                title="No transactions yet"
            />
        </Stack>
    ),
};

function OverlayExample() {
    const [open, setOpen] = useState(false);
    return (
        <Stack gap="5">
            <Inline>
                <Button onClick={() => setOpen(true)} variant="danger">
                    <Trash2 aria-hidden="true"/> Archive account
                </Button>
                <Popover label="Portfolio view">
                    <Stack gap="2">
                        <Button variant="ghost">Everyone</Button>
                        <Button variant="ghost">Timo</Button>
                    </Stack>
                </Popover>
                <DropdownMenu
                    label="More actions"
                    items={[
                        {id: "duplicate", label: "Duplicate", onSelect: () => undefined},
                        {danger: true, id: "archive", label: "Archive", onSelect: () => undefined},
                    ]}
                />
                <Tooltip content="Uses the latest closing price">
                    <Button variant="ghost">Pricing method</Button>
                </Tooltip>
            </Inline>
            <AlertDialog
                closeLabel="Close dialog"
                description="The account will be recoverable for 30 days."
                footer={
                    <Inline>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={() => setOpen(false)} variant="danger">
                            Archive
                        </Button>
                    </Inline>
                }
                onOpenChange={setOpen}
                open={open}
                title="Archive this account?"
            >
                <Text>Positions and transactions will disappear from active portfolio views.</Text>
            </AlertDialog>
        </Stack>
    );
}

export const Overlays: Story = {
    render: () => <OverlayExample/>,
};
