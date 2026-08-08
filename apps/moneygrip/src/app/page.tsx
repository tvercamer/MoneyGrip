"use server";

import {redirect} from "next/navigation";
import {MONEYGRIP_DEFAULT_TOOL} from "@/options";

export default async function Home() {
    redirect(MONEYGRIP_DEFAULT_TOOL.path);
}
