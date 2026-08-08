import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
    build: {
        lib: {
            entry: "src/index.ts",
            formats: ["es"],
        },
        rolldownOptions: {
            external: [
                "@moneygrip/i18n",
                "@moneygrip/theme",
                "lucide-react",
                "react",
                "react-dom",
                "react/jsx-runtime",
                "recharts",
            ],
            output: {
                assetFileNames: (assetInfo) =>
                    assetInfo.names.some((name) => name.endsWith(".css")) ? "ui.css" : "assets/[name][extname]",
                entryFileNames: "index.js",
            },
        },
    },
    plugins: [react(), dts({include: ["src"]})],
});
