import {Badge, MoneyGripLogo} from "@moneygrip/ui";
import {usePathname} from "next/navigation";
import {MONEYGRIP_DEFAULT_TOOL, MONEYGRIP_TOOLS} from "@/options";
import styles from "./AppSidebar.module.css";

export default function SidebarBrand() {
    const pathname = usePathname();

    function getCurrentTool() {
        for (const tool of MONEYGRIP_TOOLS) {
            if (pathname.startsWith(tool.path)) {
                return tool.label;
            }
        }
        return MONEYGRIP_DEFAULT_TOOL.path;
    }

    return (
        <div className={styles.brandBlock}>
            <MoneyGripLogo/>
            <Badge tone="accent">{getCurrentTool()}</Badge>
        </div>
    );
}
