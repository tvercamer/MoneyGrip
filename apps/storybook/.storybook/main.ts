import type {StorybookConfig} from "@storybook/react-vite";

const config: StorybookConfig = {
    addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-vitest"],
    docs: {defaultName: "Documentation"},
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
};

export default config;
