import {Badge, MoneyGripLogo} from "@moneygrip/ui";
import styles from "./AppSidebar.module.css";

export default function SidebarBrand() {
    return (
        <div className={styles.brandBlock}>
            <MoneyGripLogo/>
            <Badge tone="accent">Tool</Badge>
        </div>
    );
}
