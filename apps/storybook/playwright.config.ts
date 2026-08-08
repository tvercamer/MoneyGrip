import {defineConfig, devices} from "@playwright/test";

export default defineConfig({
    expect: {
        toHaveScreenshot: {
            animations: "disabled",
            maxDiffPixelRatio: 0.01,
        },
    },
    fullyParallel: true,
    projects: [
        {
            name: "desktop-chromium",
            use: {
                ...devices["Desktop Chrome"],
                viewport: {height: 900, width: 1365},
            },
        },
        {
            name: "iphone-13",
            use: {
                ...devices["iPhone 13"],
                browserName: "chromium",
            },
        },
    ],
    reporter: "list",
    snapshotPathTemplate: "{testDir}/{testFilePath}-snapshots/{arg}-{projectName}{ext}",
    testDir: "./e2e",
    use: {
        baseURL: "http://127.0.0.1:6007",
    },
    webServer: {
        command: "pnpm exec storybook dev -p 6007 --ci",
        reuseExistingServer: true,
        timeout: 120_000,
        url: "http://127.0.0.1:6007",
    },
});
