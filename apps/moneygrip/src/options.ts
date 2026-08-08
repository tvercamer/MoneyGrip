import {
    Building2,
    CalendarDays,
    ChartNoAxesCombined,
    Handshake,
    LayoutDashboard,
    ReceiptText,
    Users,
    WalletCards,
} from "lucide-react";

export const MONEYGRIP_TOOLS = [
    {label: "Ledger", path: "/ledger"},
    {label: "Subscriptions", path: "/subscriptions"},
];

export const MONEYGRIP_DEFAULT_TOOL = MONEYGRIP_TOOLS[0];

export const MONEYGRIP_LEDGER_TOOLS = [
    {name: "overview", label: "Overzicht", path: "#overview", icon: LayoutDashboard},
    {name: "assets", label: "Beleggingen", path: "#assets", icon: WalletCards},
    {name: "transactions", label: "Verrichtingen", path: "#transactions", icon: ReceiptText},
    {name: "reports", label: "Rapporten", path: "#reports", icon: ChartNoAxesCombined},
    {name: "accounts", label: "Accounts", path: "#accounts", icon: Building2},
    {name: "members", label: "Leden", path: "#members", icon: Users},
];

export const MONEYGRIP_SUBSCRIPTIONS_TOOLS = [
    {name: "overview", label: "Overzicht", path: "#overview", icon: LayoutDashboard},
    {name: "subscriptions", label: "Abonnementen", path: "#subscriptions", icon: Handshake},
    {name: "calendar", label: "Kalender", path: "#calendar", icon: CalendarDays},
    {name: "accounts", label: "Accounts", path: "#accounts", icon: Building2},
    {name: "members", label: "Leden", path: "#members", icon: Users},
];
