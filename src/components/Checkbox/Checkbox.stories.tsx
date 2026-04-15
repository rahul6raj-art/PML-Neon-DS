import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['checked', 'unchecked', 'indeterminate'],
      description: 'Check state — checked, unchecked, or indeterminate',
      table: { defaultValue: { summary: 'unchecked' } },
    },
    layout: {
      control: 'select',
      options: ['inline', 'block'],
      description: 'Layout mode — inline (shrink-to-fit) or block (fill width)',
      table: { defaultValue: { summary: 'inline' } },
    },
    label: {
      control: 'text',
      description: 'Label text',
      table: { category: 'Label' },
    },
    showLabel: {
      control: 'boolean',
      description: 'Show or hide the label',
      table: { defaultValue: { summary: 'true' }, category: 'Label' },
    },
    labelEmphasis: {
      control: 'select',
      options: ['high', 'low'],
      description: 'Label font weight — high (medium 500) or low (regular 400)',
      table: { defaultValue: { summary: 'high' }, category: 'Label' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: { defaultValue: { summary: 'false' }, category: 'State' },
    },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Interactive Playground ───────────────────────────── */

export const Playground: Story = {
  args: {
    state: 'unchecked',
    layout: 'inline',
    label: 'Label',
    showLabel: true,
    labelEmphasis: 'high',
    disabled: false,
  },
};

/* ── State: Checked ──────────────────────────────────── */

export const CheckedInlineHigh: Story = {
  name: 'Checked / Inline / High',
  args: { state: 'checked', layout: 'inline', labelEmphasis: 'high', label: 'Label' },
};

export const CheckedInlineLow: Story = {
  name: 'Checked / Inline / Low',
  args: { state: 'checked', layout: 'inline', labelEmphasis: 'low', label: 'Label' },
};

export const CheckedBlockHigh: Story = {
  name: 'Checked / Block / High',
  args: { state: 'checked', layout: 'block', labelEmphasis: 'high', label: 'Label' },
  decorators: [(Story) => <div style={{ width: 352 }}><Story /></div>],
};

export const CheckedBlockLow: Story = {
  name: 'Checked / Block / Low',
  args: { state: 'checked', layout: 'block', labelEmphasis: 'low', label: 'Label' },
  decorators: [(Story) => <div style={{ width: 352 }}><Story /></div>],
};

/* ── State: Unchecked ────────────────────────────────── */

export const UncheckedInlineHigh: Story = {
  name: 'Unchecked / Inline / High',
  args: { state: 'unchecked', layout: 'inline', labelEmphasis: 'high', label: 'Label' },
};

export const UncheckedInlineLow: Story = {
  name: 'Unchecked / Inline / Low',
  args: { state: 'unchecked', layout: 'inline', labelEmphasis: 'low', label: 'Label' },
};

export const UncheckedBlockHigh: Story = {
  name: 'Unchecked / Block / High',
  args: { state: 'unchecked', layout: 'block', labelEmphasis: 'high', label: 'Label' },
  decorators: [(Story) => <div style={{ width: 352 }}><Story /></div>],
};

export const UncheckedBlockLow: Story = {
  name: 'Unchecked / Block / Low',
  args: { state: 'unchecked', layout: 'block', labelEmphasis: 'low', label: 'Label' },
  decorators: [(Story) => <div style={{ width: 352 }}><Story /></div>],
};

/* ── State: Indeterminate ────────────────────────────── */

export const IndeterminateInlineHigh: Story = {
  name: 'Indeterminate / Inline / High',
  args: { state: 'indeterminate', layout: 'inline', labelEmphasis: 'high', label: 'Label' },
};

export const IndeterminateInlineLow: Story = {
  name: 'Indeterminate / Inline / Low',
  args: { state: 'indeterminate', layout: 'inline', labelEmphasis: 'low', label: 'Label' },
};

export const IndeterminateBlockHigh: Story = {
  name: 'Indeterminate / Block / High',
  args: { state: 'indeterminate', layout: 'block', labelEmphasis: 'high', label: 'Label' },
  decorators: [(Story) => <div style={{ width: 352 }}><Story /></div>],
};

export const IndeterminateBlockLow: Story = {
  name: 'Indeterminate / Block / Low',
  args: { state: 'indeterminate', layout: 'block', labelEmphasis: 'low', label: 'Label' },
  decorators: [(Story) => <div style={{ width: 352 }}><Story /></div>],
};

/* ── Disabled States ─────────────────────────────────── */

export const CheckedDisabled: Story = {
  name: 'Disabled / Checked',
  args: { state: 'checked', disabled: true, label: 'Label' },
};

export const UncheckedDisabled: Story = {
  name: 'Disabled / Unchecked',
  args: { state: 'unchecked', disabled: true, label: 'Label' },
};

export const IndeterminateDisabled: Story = {
  name: 'Disabled / Indeterminate',
  args: { state: 'indeterminate', disabled: true, label: 'Label' },
};

export const CheckedDisabledBlockLow: Story = {
  name: 'Disabled / Checked / Block / Low',
  args: { state: 'checked', disabled: true, layout: 'block', labelEmphasis: 'low', label: 'Label' },
  decorators: [(Story) => <div style={{ width: 352 }}><Story /></div>],
};

/* ── Without Label ───────────────────────────────────── */

export const CheckedNoLabel: Story = {
  name: 'Checked / No Label',
  args: { state: 'checked', showLabel: false },
};

export const UncheckedNoLabel: Story = {
  name: 'Unchecked / No Label',
  args: { state: 'unchecked', showLabel: false },
};

export const IndeterminateNoLabel: Story = {
  name: 'Indeterminate / No Label',
  args: { state: 'indeterminate', showLabel: false },
};

/* ── Interactive Checkbox Group ───────────────────────── */

const CheckboxGroupDemo = ({
  layout,
  labelEmphasis,
}: {
  layout: 'inline' | 'block';
  labelEmphasis: 'high' | 'low';
}) => {
  const [items, setItems] = useState([
    { id: 'terms', label: 'Accept terms and conditions', checked: false },
    { id: 'newsletter', label: 'Subscribe to newsletter', checked: true },
    { id: 'notifications', label: 'Enable notifications', checked: false },
    { id: 'beta', label: 'Join beta programme (disabled)', checked: false, disabled: true },
  ]);

  const allChecked = items.filter((i) => !i.disabled).every((i) => i.checked);
  const someChecked = items.some((i) => i.checked) && !allChecked;

  const toggleItem = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)));
  };

  const toggleAll = () => {
    const newVal = !allChecked;
    setItems((prev) => prev.map((i) => (i.disabled ? i : { ...i, checked: newVal })));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: layout === 'block' ? 352 : 'auto' }}>
      <Checkbox
        state={allChecked ? 'checked' : someChecked ? 'indeterminate' : 'unchecked'}
        layout={layout}
        labelEmphasis={labelEmphasis}
        label="Select all"
        onChange={toggleAll}
      />
      <div style={{ paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((item) => (
          <Checkbox
            key={item.id}
            state={item.checked ? 'checked' : 'unchecked'}
            layout={layout}
            labelEmphasis={labelEmphasis}
            label={item.label}
            disabled={item.disabled}
            onChange={() => toggleItem(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export const InteractiveInlineGroup: Story = {
  name: 'Interactive / Inline Group',
  render: () => <CheckboxGroupDemo layout="inline" labelEmphasis="high" />,
};

export const InteractiveBlockGroup: Story = {
  name: 'Interactive / Block Group',
  render: () => <CheckboxGroupDemo layout="block" labelEmphasis="high" />,
};

export const InteractiveBlockLowGroup: Story = {
  name: 'Interactive / Block Low Group',
  render: () => <CheckboxGroupDemo layout="block" labelEmphasis="low" />,
};

/* ── Full Matrix ─────────────────────────────────────── */

export const FullMatrix: Story = {
  name: 'Matrix / Complete',
  render: () => {
    const states = ['checked', 'indeterminate', 'unchecked'] as const;
    const emphases = ['high', 'low'] as const;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {(['inline', 'block'] as const).map((lay) => (
          <div key={lay}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-neutral-medium)', marginBottom: 16, textTransform: 'capitalize' }}>
              Layout: {lay}
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '100px repeat(3, 1fr)',
                gap: '12px 16px',
                alignItems: 'center',
                ...(lay === 'block' ? { width: 800 } : {}),
              }}
            >
              <span />
              {states.map((s) => (
                <span key={s} style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-neutral-medium)', textTransform: 'capitalize' }}>
                  {s}
                </span>
              ))}

              {emphases.map((e) => (
                <React.Fragment key={`enabled-${e}`}>
                  <span style={{ fontSize: 11, color: 'var(--text-neutral-medium)' }}>
                    {e} / enabled
                  </span>
                  {states.map((s) => (
                    <span key={s}>
                      <Checkbox state={s} layout={lay} labelEmphasis={e} label="Label" />
                    </span>
                  ))}
                </React.Fragment>
              ))}

              {emphases.map((e) => (
                <React.Fragment key={`disabled-${e}`}>
                  <span style={{ fontSize: 11, color: 'var(--text-neutral-medium)' }}>
                    {e} / disabled
                  </span>
                  {states.map((s) => (
                    <span key={s}>
                      <Checkbox state={s} layout={lay} labelEmphasis={e} label="Label" disabled />
                    </span>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
