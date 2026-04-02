import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';
import type { DropdownEmphasis, DropdownOption } from './Dropdown';
import { iconNames } from '../Icon';

const iconOptions = ['(none)', ...iconNames];
const iconMapping = Object.fromEntries([
  ['(none)', undefined],
  ...iconNames.map((n) => [n, n]),
]);

const sampleOptions: DropdownOption[] = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
  { label: 'Option 4', value: 'opt4' },
  { label: 'Option 5', value: 'opt5' },
];

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    /* ══ Variant ═════════════════════════════════════ */
    emphasis: {
      control: 'inline-radio',
      options: ['high', 'low'] as DropdownEmphasis[],
      description: 'Emphasis level — high uses 18px text, low uses 14px text',
      table: { category: 'Variant', defaultValue: { summary: 'high' } },
    },
    showHelperText: {
      control: 'boolean',
      description: 'Show helper text below the field',
      table: { category: 'Variant', defaultValue: { summary: 'false' } },
    },
    showErrorText: {
      control: 'boolean',
      description: 'Show error text below the field (overrides helper text)',
      table: { category: 'Variant', defaultValue: { summary: 'false' } },
    },
    showLeadingIcon: {
      control: 'boolean',
      description: 'Show a leading icon',
      table: { category: 'Variant', defaultValue: { summary: 'false' } },
    },

    /* ══ Content ═════════════════════════════════════ */
    label: {
      control: 'text',
      description: 'Floating label text',
      table: { category: 'Content', defaultValue: { summary: 'Label' } },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no value is selected',
      table: { category: 'Content' },
    },
    helperText: {
      control: 'text',
      description: 'Helper text content',
      table: { category: 'Content', defaultValue: { summary: 'Helper Text' } },
      if: { arg: 'showHelperText' },
    },
    errorText: {
      control: 'text',
      description: 'Error text content',
      table: { category: 'Content', defaultValue: { summary: 'Error Text' } },
      if: { arg: 'showErrorText' },
    },

    /* ══ State ═══════════════════════════════════════ */
    value: {
      control: 'select',
      options: ['', ...sampleOptions.map((o) => o.value)],
      description: 'Currently selected value',
      table: { category: 'State', defaultValue: { summary: '' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },

    /* ══ Icon ════════════════════════════════════════ */
    leadingIcon: {
      control: 'select',
      options: iconOptions,
      mapping: iconMapping,
      description: 'Leading icon name',
      table: { category: 'Icon' },
      if: { arg: 'showLeadingIcon' },
    },

    /* ══ Data ════════════════════════════════════════ */
    options: {
      control: 'object',
      description: 'Dropdown options array',
      table: { category: 'Data' },
    },

    /* ══ Events ══════════════════════════════════════ */
    onChange: {
      action: 'changed',
      description: 'Called when an option is selected',
      table: { category: 'Events' },
    },
  },
  args: {
    emphasis: 'high',
    label: 'Label',
    value: '',
    options: sampleOptions,
    showHelperText: false,
    helperText: 'Helper Text',
    showErrorText: false,
    errorText: 'Error Text',
    showLeadingIcon: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

/* ── Playground ──────────────────────────────────── */
export const Playground: Story = {};

/* ── High — Normal ───────────────────────────────── */
export const HighNormal: Story = {
  args: { emphasis: 'high' },
};

/* ── Low — Normal ────────────────────────────────── */
export const LowNormal: Story = {
  args: { emphasis: 'low' },
};

/* ── With Helper Text ────────────────────────────── */
export const WithHelperText: Story = {
  args: { showHelperText: true, helperText: 'Helper Text' },
};

/* ── With Error Text ─────────────────────────────── */
export const WithErrorText: Story = {
  args: { showErrorText: true, errorText: 'Error Text' },
};

/* ── With Leading Icon ───────────────────────────── */
export const WithLeadingIcon: Story = {
  args: { showLeadingIcon: true },
};

/* ── Filled ──────────────────────────────────────── */
export const Filled: Story = {
  args: { value: 'opt1' },
};

/* ── Filled + Leading Icon ───────────────────────── */
export const FilledWithIcon: Story = {
  args: { value: 'opt1', showLeadingIcon: true },
};

/* ── Disabled ────────────────────────────────────── */
export const Disabled: Story = {
  args: { disabled: true },
};

/* ── Interactive demo ────────────────────────────── */
function InteractiveRender() {
  const [val, setVal] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Dropdown
        emphasis="high"
        label="Select an option"
        value={val}
        options={sampleOptions}
        onChange={setVal}
      />
      <Dropdown
        emphasis="low"
        label="With helper"
        value={val}
        options={sampleOptions}
        showHelperText
        helperText="Helper Text"
        onChange={setVal}
      />
      <Dropdown
        emphasis="high"
        label="With error"
        value={val}
        options={sampleOptions}
        showErrorText
        errorText="Error Text"
        onChange={setVal}
      />
      <Dropdown
        emphasis="low"
        label="With leading icon"
        value={val}
        options={sampleOptions}
        showLeadingIcon
        onChange={setVal}
      />
    </div>
  );
}

export const Interactive: Story = {
  render: InteractiveRender,
  parameters: { controls: { disable: true } },
};

/* ── All states comparison ───────────────────────── */
function AllStatesRender() {
  const opts = sampleOptions;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px 32px' }}>
      {/* Row 1: Normal */}
      <Dropdown emphasis="high" label="Label" options={opts} />
      <Dropdown emphasis="high" label="Label" options={opts} showHelperText helperText="Helper Text" />
      <Dropdown emphasis="high" label="Label" options={opts} showErrorText errorText="Error Text" />

      {/* Row 2: Filled */}
      <Dropdown emphasis="high" label="Label" value="opt1" options={opts} />
      <Dropdown emphasis="high" label="Label" value="opt1" options={opts} showHelperText helperText="Helper Text" />
      <Dropdown emphasis="high" label="Label" value="opt1" options={opts} showErrorText errorText="Error Text" />

      {/* Row 3: With leading icon */}
      <Dropdown emphasis="high" label="Label" options={opts} showLeadingIcon />
      <Dropdown emphasis="high" label="Label" options={opts} showLeadingIcon showHelperText helperText="Helper Text" />
      <Dropdown emphasis="high" label="Label" options={opts} showLeadingIcon showErrorText errorText="Error Text" />

      {/* Row 4: Leading icon + Filled */}
      <Dropdown emphasis="high" label="Label" value="opt1" options={opts} showLeadingIcon />
      <Dropdown emphasis="high" label="Label" value="opt1" options={opts} showLeadingIcon showHelperText helperText="Helper Text" />
      <Dropdown emphasis="high" label="Label" value="opt1" options={opts} showLeadingIcon showErrorText errorText="Error Text" />
    </div>
  );
}

export const AllStates: Story = {
  render: AllStatesRender,
  parameters: { controls: { disable: true } },
};
