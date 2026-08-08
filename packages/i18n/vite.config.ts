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
            external: ["react", "react/jsx-runtime"],
            output: {entryFileNames: "index.js"},
        },
    },
    plugins: [react(), dts({include: ["src"]})],
});
