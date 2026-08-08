import {Container, Divider, Grid, Heading, Inline, Stack, Text} from "@moneygrip/ui";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta = {
    title: "Foundations/Editorial Grid",
    parameters: {
        docs: {
            description: {
                component:
                    "The Editorial Grid theme uses semantic tokens. Components never depend directly on a palette value.",
            },
        },
    },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const swatches = [
    ["Canvas", "var(--moneygrip-color-canvas)"],
    ["Surface", "var(--moneygrip-color-surface)"],
    ["Raised", "var(--moneygrip-color-surface-raised)"],
    ["Accent", "var(--moneygrip-color-accent-soft)"],
    ["Positive", "var(--moneygrip-color-positive-soft)"],
    ["Negative", "var(--moneygrip-color-negative-soft)"],
    ["Warning", "var(--moneygrip-color-warning-soft)"],
    ["Information", "var(--moneygrip-color-info-soft)"],
];

export const ColorTokens: Story = {
    render: () => (
        <section className="story-section">
            <div>
                <Heading as="h1" size="lg">
                    Semantic color
                </Heading>
                <Text muted>Every swatch adapts to the selected color mode.</Text>
            </div>
            <div className="story-grid">
                {swatches.map(([label, color]) => (
                    <div className="story-swatch" key={label} style={{"--swatch-color": color} as React.CSSProperties}>
                        <Text weight="semibold">{label}</Text>
                    </div>
                ))}
            </div>
        </section>
    ),
};

export const Typography: Story = {
    render: () => (
        <Stack gap="5">
            <Heading as="h1" size="xl">
                A calm overview of family finances
            </Heading>
            <Heading as="h2" size="lg">
                Portfolio value and growth
            </Heading>
            <Heading as="h3" size="md">
                Investments by household member
            </Heading>
            <Heading as="h4" size="sm">
                Recent transactions
            </Heading>
            <Divider/>
            <Text size="lead">Source Sans 3 keeps dense figures legible without feeling clinical.</Text>
            <Text>Body text is optimized for straightforward explanations and everyday financial language.</Text>
            <Text muted size="small">
                Secondary information remains readable and never drops below 14px.
            </Text>
            <Text size="caption" weight="semibold">
                Belgian household portfolio
            </Text>
        </Stack>
    ),
};

export const LayoutPrimitives: Story = {
    render: () => (
        <Container>
            <Stack gap="6">
                <Inline justify="space-between">
                    <Heading as="h2">Stack and Inline</Heading>
                    <Text muted>Responsive by default</Text>
                </Inline>
                <Grid minItemWidth="12rem">
                    {["One", "Two", "Three", "Four"].map((label) => (
                        <div
                            className="story-swatch"
                            key={label}
                            style={{"--swatch-color": "var(--moneygrip-color-surface)"} as React.CSSProperties}
                        >
                            <Text weight="semibold">{label}</Text>
                        </div>
                    ))}
                </Grid>
            </Stack>
        </Container>
    ),
};
