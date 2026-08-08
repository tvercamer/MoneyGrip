import type {Metadata} from "next";
import {headers} from "next/headers";
import type {ReactNode} from "react";
import Providers from "@/components/Providers";
import Shell from "@/components/Shell";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
    const requestHeaders = await headers();
    const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
    const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
    const baseUrl = new URL(`${protocol}://${host}`);

    return {
        metadataBase: baseUrl,
        title: "MoneyGrip",
        description: "A finance suite tailored to Flemish households.",
        openGraph: {
            title: "MoneyGrip",
            description: "A finance suite tailored to Flemish households.",
            images: [{alt: "MoneyGrip", height: 630, url: "/og.png", width: 1200}],
        },
        twitter: {
            card: "summary_large_image",
            title: "MoneyGrip",
            description: "A finance suite tailored to Flemish households.",
            images: ["/og.png"],
        },
    };
}

export default function RootLayout({children}: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="nl-BE">
        <body>
        <Providers>
            <Shell>{children}</Shell>
        </Providers>
        </body>
        </html>
    );
}
