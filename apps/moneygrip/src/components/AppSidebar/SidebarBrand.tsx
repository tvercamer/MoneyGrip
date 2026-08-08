import {Badge, MoneyGripLogo} from "@moneygrip/ui";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {MONEYGRIP_DEFAULT_TOOL, MONEYGRIP_TOOLS} from "@/options";
import styles from "./AppSidebar.module.css";

export default function SidebarBrand() {
    const pathname = usePathname();

    function getCurrentTool() {
        for (const tool of MONEYGRIP_TOOLS) {
            if (pathname.startsWith(tool.path)) {
                return tool;
            }
        }
        return MONEYGRIP_DEFAULT_TOOL;
    }

    return (
        <div className={styles.brandBlock}>
            <Link href={MONEYGRIP_DEFAULT_TOOL.path}>
                <MoneyGripLogo/>
            </Link>
            <Link href={getCurrentTool().path}>
                <Badge tone="accent">{getCurrentTool().label}</Badge>
            </Link>
        </div>
    );
}
