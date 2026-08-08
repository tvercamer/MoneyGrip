import {Stack} from "@moneygrip/ui";
import AppSidebarNav from "@/components/AppSidebar/AppSidebarNav";
import SidebarBrand from "./SidebarBrand";

function AppSidebarComponent() {
    return (
        <Stack gap="8">
            <SidebarBrand/>
            <AppSidebarNav/>
        </Stack>
    );
}

export const AppSidebar = <AppSidebarComponent/>;

export default AppSidebar;
