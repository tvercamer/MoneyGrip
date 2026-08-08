import {MoneyGripI18nProvider} from "@moneygrip/i18n";
import type {Preview} from "@storybook/react-vite";
import "@moneygrip/theme";
import "@moneygrip/theme/styles.css";
import {ThemeProvider} from "@moneygrip/ui";
import "@moneygrip/ui/styles.css";
import "../src/storybook.css";

const preview: Preview = {
    decorators: [
        (Story, context) => (
            <MoneyGripI18nProvider locale={context.globals.locale}>
                <ThemeProvider className="moneygrip-story-surface" mode={context.globals.mode}>
                    <Story/>
                </ThemeProvider>
            </MoneyGripI18nProvider>
        ),
    ],
    globalTypes: {
        locale: {
            description: "Interface locale",
            toolbar: {
                icon: "globe",
                items: [
                    {title: "Nederlands (België)", value: "nl-BE"},
                    {title: "English (Belgium)", value: "en-BE"},
                ],
            },
        },
        mode: {
            description: "Theme color mode",
            toolbar: {
                icon: "contrast",
                items: [
                    {title: "Light", value: "light"},
                    {title: "Dark", value: "dark"},
                    {title: "System", value: "system"},
                ],
            },
        },
    },
    initialGlobals: {
        locale: "nl-BE",
        mode: "light",
    },
    parameters: {
        a11y: {
            test: "error",
        },
        controls: {
            expanded: true,
            sort: "requiredFirst",
        },
        layout: "padded",
        options: {
            storySort: {
                order: ["Introduction", "Foundations", "Components", "Patterns"],
            },
        },
    },
};

export default preview;
