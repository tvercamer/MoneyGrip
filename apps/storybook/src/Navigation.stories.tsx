import {Breadcrumbs, Heading, Pagination, SidebarNav, Stack, Tabs, Text} from "@moneygrip/ui";
import type {Meta, StoryObj} from "@storybook/react-vite";
import {ChartNoAxesCombined, LayoutDashboard, Users, WalletCards} from "lucide-react";
import {useState} from "react";

const meta = {
    title: "Components/Navigation",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const TabsAndBreadcrumbs: Story = {
    render: () => (
        <Stack gap="6">
            <Breadcrumbs
                aria-label="Breadcrumb"
                items={[
                    {href: "#portfolio", label: "Portfolio"},
                    {href: "#accounts", label: "Accounts"},
                    {label: "Bolero"},
                ]}
            />
            <Tabs
                aria-label="Portfolio view"
                items={[
                    {id: "all", label: "Everyone", panel: <Text>Combined household portfolio.</Text>},
                    {id: "timo", label: "Timo", panel: <Text>Investments allocated to Timo.</Text>},
                    {
                        id: "shared",
                        label: "Shared",
                        panel: <Text>Positions shared by Timo and Sofie.</Text>,
                    },
                    {disabled: true, id: "archived", label: "Archived", panel: null},
                ]}
            />
        </Stack>
    ),
};

export const Sidebar: Story = {
    render: () => (
        <aside style={{maxWidth: 260}}>
            <SidebarNav
                aria-label="Main navigation"
                items={[
                    {active: true, href: "#overview", icon: LayoutDashboard, label: "Overview"},
                    {href: "#people", icon: Users, label: "People"},
                    {href: "#accounts", icon: WalletCards, label: "Accounts"},
                    {href: "#reports", icon: ChartNoAxesCombined, label: "Reports"},
                ]}
            />
        </aside>
    ),
};

function PaginationExample() {
    const [page, setPage] = useState(2);
    return (
        <Stack gap="3">
            <Heading as="h2" size="sm">
                Page {page}
            </Heading>
            <Pagination
                currentPage={page}
                labels={{
                    label: "Transaction pages",
                    next: "Next page",
                    page: (number) => `Go to page ${number}`,
                    previous: "Previous page",
                }}
                onPageChange={setPage}
                totalPages={5}
            />
        </Stack>
    );
}

export const PageNavigation: Story = {
    render: () => <PaginationExample/>,
};
