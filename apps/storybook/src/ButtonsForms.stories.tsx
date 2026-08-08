import {
    Button,
    ButtonGroup,
    Checkbox,
    CurrencyField,
    Heading,
    IconButton,
    Inline,
    NumberField,
    PercentageField,
    RadioGroup,
    SearchField,
    SelectField,
    Stack,
    Switch,
    TextareaField,
    TextField,
} from "@moneygrip/ui";
import type {Meta, StoryObj} from "@storybook/react-vite";
import {Bell, Download, Plus, Search} from "lucide-react";
import {useState} from "react";

const meta = {
    title: "Components/Buttons and forms",
    parameters: {
        docs: {
            description: {
                component:
                    "Buttons and fields use native controls, visible labels, clear focus states and application-provided text.",
            },
        },
    },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Buttons: Story = {
    render: () => (
        <Stack gap="6">
            <div>
                <Heading as="h2">Variants</Heading>
            </div>
            <Inline>
                <Button variant="primary">
                    <Plus aria-hidden="true"/> Add transaction
                </Button>
                <Button variant="secondary">
                    <Download aria-hidden="true"/> Export
                </Button>
                <Button variant="ghost">Cancel</Button>
                <Button variant="danger">Delete</Button>
                <Button loading>Saving</Button>
                <Button disabled>Unavailable</Button>
            </Inline>
            <Inline>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <IconButton icon={<Search aria-hidden="true"/>} label="Search"/>
                <IconButton icon={<Bell aria-hidden="true"/>} label="Notifications" variant="ghost"/>
            </Inline>
            <ButtonGroup aria-label="Display density">
                <Button size="sm" variant="primary">
                    Comfortable
                </Button>
                <Button size="sm">Compact</Button>
            </ButtonGroup>
        </Stack>
    ),
};

function FormExample() {
    const [ownership, setOwnership] = useState("shared");
    return (
        <form className="story-section story-narrow" onSubmit={(event) => event.preventDefault()}>
            <TextField label="Investment name" placeholder="e.g. Vanguard FTSE All-World"/>
            <CurrencyField description="Use a comma as decimal separator." label="Purchase amount"
                           placeholder="1.250,00"/>
            <Inline align="start" wrap={false}>
                <NumberField label="Quantity" min={0} step="any"/>
                <PercentageField label="Tax rate"/>
            </Inline>
            <SelectField
                defaultValue="shared"
                label="Owner"
                options={[
                    {label: "Timo", value: "timo"},
                    {label: "Sofie", value: "sofie"},
                    {label: "Shared", value: "shared"},
                ]}
            />
            <SearchField hideLabel label="Search securities" placeholder="Search by name or ISIN"/>
            <RadioGroup
                label="Ownership"
                name="ownership"
                onChange={(event) => setOwnership(event.currentTarget.value)}
                options={[
                    {description: "Belongs to one person.", label: "Individual", value: "individual"},
                    {
                        description: "Shared by selected household members.",
                        label: "Shared",
                        value: "shared",
                    },
                ]}
                value={ownership}
            />
            <Checkbox description="The transaction can be restored later." label="Archive after saving"/>
            <Switch description="Hide financial figures by default." label="Privacy mode"/>
            <TextareaField label="Notes" optionalText="Optional" rows={4}/>
            <TextField error="Enter a valid ISIN." label="ISIN" value="INVALID" readOnly/>
            <Inline>
                <Button type="submit" variant="primary">
                    Save transaction
                </Button>
                <Button>Cancel</Button>
            </Inline>
        </form>
    );
}

export const FormControls: Story = {
    render: () => <FormExample/>,
};
