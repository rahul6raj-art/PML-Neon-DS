import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Search } from './Search';

function InteractiveDemo() {
  const [val, setVal] = useState('');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Search
        size="large"
        label="Search anything…"
        value={val}
        onChange={setVal}
        onClear={() => setVal('')}
        onSubmit={(v) => alert(`Search: ${v}`)}
      />
      <Search
        size="medium"
        stroke
        label="Quick search…"
        value={val}
        onChange={setVal}
        onClear={() => setVal('')}
      />
      <p style={{ fontFamily: 'var(--font-family)', fontSize: 13, color: 'var(--text-neutral-medium)' }}>
        Current value: <strong>{val || '(empty)'}</strong>
      </p>
    </div>
  );
}

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['large', 'medium'],
      description: 'Size variant — Large (52px) or Medium (40px)',
      table: { defaultValue: { summary: 'large' } },
    },
    stroke: {
      control: 'boolean',
      description: 'Outlined border style with tinted background',
      table: { defaultValue: { summary: 'false' } },
    },
    leadingIcon: {
      control: 'boolean',
      description: 'Show search icon on the left',
      table: { defaultValue: { summary: 'true' } },
    },
    trailingIcon: {
      control: 'boolean',
      description: 'Show mic icon on the right',
      table: { defaultValue: { summary: 'true' } },
    },
    label: {
      control: 'text',
      description: 'Placeholder text',
      table: { defaultValue: { summary: 'Label' } },
    },
    value: {
      control: 'text',
      description: 'Controlled input value',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: { defaultValue: { summary: 'false' } },
    },
    onClear: { action: 'clear', table: { category: 'Events' } },
    onChange: { action: 'change', table: { category: 'Events' } },
    onMicClick: { action: 'micClick', table: { category: 'Events' } },
    onSubmit: { action: 'submit', table: { category: 'Events' } },
  },
};

export default meta;
type Story = StoryObj<typeof Search>;

/* ─── Playground ─────────────────────────────────── */
export const Playground: Story = {
  args: {
    size: 'large',
    stroke: false,
    leadingIcon: true,
    trailingIcon: true,
    label: 'Label',
    disabled: false,
  },
};

/* ══════════════════════════════════════════════════
   LARGE — NO STROKE
   ══════════════════════════════════════════════════ */
export const LargeNormal: Story = {
  name: 'Large / Normal',
  args: { size: 'large', stroke: false, label: 'Label' },
};

export const LargeFilled: Story = {
  name: 'Large / Filled',
  args: { size: 'large', stroke: false, value: 'Input Text' },
};

/* ══════════════════════════════════════════════════
   LARGE — STROKE
   ══════════════════════════════════════════════════ */
export const LargeStrokeNormal: Story = {
  name: 'Large / Stroke / Normal',
  args: { size: 'large', stroke: true, label: 'Label' },
};

export const LargeStrokeFilled: Story = {
  name: 'Large / Stroke / Filled',
  args: { size: 'large', stroke: true, value: 'Input Text' },
};

/* ══════════════════════════════════════════════════
   MEDIUM — NO STROKE
   ══════════════════════════════════════════════════ */
export const MediumNormal: Story = {
  name: 'Medium / Normal',
  args: { size: 'medium', stroke: false, label: 'Label' },
};

export const MediumFilled: Story = {
  name: 'Medium / Filled',
  args: { size: 'medium', stroke: false, value: 'Input Text' },
};

/* ══════════════════════════════════════════════════
   MEDIUM — STROKE
   ══════════════════════════════════════════════════ */
export const MediumStrokeNormal: Story = {
  name: 'Medium / Stroke / Normal',
  args: { size: 'medium', stroke: true, label: 'Label' },
};

export const MediumStrokeFilled: Story = {
  name: 'Medium / Stroke / Filled',
  args: { size: 'medium', stroke: true, value: 'Input Text' },
};

/* ══════════════════════════════════════════════════
   ICON VARIANTS
   ══════════════════════════════════════════════════ */
export const NoLeadingIcon: Story = {
  name: 'No Leading Icon',
  args: { size: 'large', leadingIcon: false },
};

export const NoTrailingIcon: Story = {
  name: 'No Trailing Icon',
  args: { size: 'large', trailingIcon: false },
};

export const NoIcons: Story = {
  name: 'No Icons',
  args: { size: 'large', leadingIcon: false, trailingIcon: false },
};

/* ══════════════════════════════════════════════════
   DISABLED
   ══════════════════════════════════════════════════ */
export const Disabled: Story = {
  name: 'Disabled',
  args: { size: 'large', disabled: true, label: 'Search…' },
};

export const DisabledFilled: Story = {
  name: 'Disabled / Filled',
  args: { size: 'large', disabled: true, value: 'Locked query' },
};

/* ══════════════════════════════════════════════════
   INTERACTIVE DEMO
   ══════════════════════════════════════════════════ */
export const Interactive: Story = {
  name: 'Interactive Demo',
  args: {},
  render: () => <InteractiveDemo />,
};

/* ══════════════════════════════════════════════════
   ALL VARIANTS MATRIX
   ══════════════════════════════════════════════════ */
export const AllVariants: Story = {
  name: 'All Variants',
  args: {},
  render: () => (
    <div style={{ display: 'flex', gap: 80, fontFamily: 'var(--font-family)' }}>
      {/* Stroke = No */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-medium)' }}>
          No Stroke
        </p>
        <Search size="large" label="Label" />
        <Search size="large" label="Label" value="Input Text" />
        <Search size="medium" label="Label" />
        <Search size="medium" label="Label" value="Input Text" />
      </div>
      {/* Stroke = Yes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-medium)' }}>
          Stroke
        </p>
        <Search size="large" stroke label="Label" />
        <Search size="large" stroke label="Label" value="Input Text" />
        <Search size="medium" stroke label="Label" />
        <Search size="medium" stroke label="Label" value="Input Text" />
      </div>
    </div>
  ),
};
