import "./AppHeader.styles.css";

const MONEYGRIP_TOOLS = ["Ledger", "Subscriptions", "Budget", "Reports", "Other"];

export const AppHeader = (
    <header>
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
    </header>
);

export default AppHeader;
