import {defineConfig} from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
    build: {
        lib: {
            entry: "src/index.ts",
            formats: ["es"],
        },
        rolldownOptions: {
            output: {
                assetFileNames: (assetInfo) =>
                    assetInfo.names.some((name) => name.endsWith(".css")) ? "theme.css" : "assets/[name][extname]",
                entryFileNames: "index.js",
            },
        },
    },
    plugins: [dts({include: ["src"]})],
});
