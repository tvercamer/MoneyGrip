import "./AppHeader.styles.css";

export default function AppToolsNavigation() {
    const MONEYGRIP_TOOLS = ["Ledger", "Subscriptions", "Budget", "Reports", "Other"];

    return (
        <nav aria-label="MoneyGrip Tools" className="toolNav">
            {MONEYGRIP_TOOLS.map((tool, idx) => (
                <button
                    key={idx}
                    aria-current={tool === "Ledger" ? "page" : undefined}
                    disabled={tool !== "Ledger"}
                    type="button"
                >
                    {tool}
                </button>
            ))}
        </nav>
    );
}
