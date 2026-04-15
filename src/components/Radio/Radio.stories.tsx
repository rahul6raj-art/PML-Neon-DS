import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './Radio';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['radio', 'tick'],
      description: 'Indicator style — classic radio dot or checkmark tick',
      table: { defaultValue: { summary: 'radio' } },
    },
    checked: {
      control: 'boolean',
      description: 'Whether the radio is selected',
      table: { defaultValue: { summary: 'false' }, category: 'State' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: { defaultValue: { summary: 'false' }, category: 'State' },
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
    size: {
      control: 'select',
      options: ['large', 'medium'],
      description: 'Component size — large (16px) or medium (14px)',
      table: { defaultValue: { summary: 'large' } },
    },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Interactive Playground ───────────────────────────── */

export const Playground: Story = {
  args: {
    type: 'radio',
    checked: false,
    label: 'Label',
    showLabel: true,
    labelEmphasis: 'high',
    size: 'large',
    disabled: false,
  },
};

/* ── Type: Radio — Checked ───────────────────────────── */

export const RadioCheckedLargeHigh: Story = {
  name: 'Radio / Checked / Large / High',
  args: { type: 'radio', checked: true, size: 'large', labelEmphasis: 'high', label: 'Label' },
};

export const RadioCheckedLargeLow: Story = {
  name: 'Radio / Checked / Large / Low',
  args: { type: 'radio', checked: true, size: 'large', labelEmphasis: 'low', label: 'Label' },
};

export const RadioCheckedMediumHigh: Story = {
  name: 'Radio / Checked / Medium / High',
  args: { type: 'radio', checked: true, size: 'medium', labelEmphasis: 'high', label: 'Label' },
};

export const RadioCheckedMediumLow: Story = {
  name: 'Radio / Checked / Medium / Low',
  args: { type: 'radio', checked: true, size: 'medium', labelEmphasis: 'low', label: 'Label' },
};

/* ── Type: Radio — Unchecked ─────────────────────────── */

export const RadioUncheckedLargeHigh: Story = {
  name: 'Radio / Unchecked / Large / High',
  args: { type: 'radio', checked: false, size: 'large', labelEmphasis: 'high', label: 'Label' },
};

export const RadioUncheckedLargeLow: Story = {
  name: 'Radio / Unchecked / Large / Low',
  args: { type: 'radio', checked: false, size: 'large', labelEmphasis: 'low', label: 'Label' },
};

export const RadioUncheckedMediumHigh: Story = {
  name: 'Radio / Unchecked / Medium / High',
  args: { type: 'radio', checked: false, size: 'medium', labelEmphasis: 'high', label: 'Label' },
};

export const RadioUncheckedMediumLow: Story = {
  name: 'Radio / Unchecked / Medium / Low',
  args: { type: 'radio', checked: false, size: 'medium', labelEmphasis: 'low', label: 'Label' },
};

/* ── Type: Tick — Checked ────────────────────────────── */

export const TickCheckedLargeHigh: Story = {
  name: 'Tick / Checked / Large / High',
  args: { type: 'tick', checked: true, size: 'large', labelEmphasis: 'high', label: 'Label' },
};

export const TickCheckedLargeLow: Story = {
  name: 'Tick / Checked / Large / Low',
  args: { type: 'tick', checked: true, size: 'large', labelEmphasis: 'low', label: 'Label' },
};

export const TickCheckedMediumHigh: Story = {
  name: 'Tick / Checked / Medium / High',
  args: { type: 'tick', checked: true, size: 'medium', labelEmphasis: 'high', label: 'Label' },
};

export const TickCheckedMediumLow: Story = {
  name: 'Tick / Checked / Medium / Low',
  args: { type: 'tick', checked: true, size: 'medium', labelEmphasis: 'low', label: 'Label' },
};

/* ── Type: Tick — Unchecked ──────────────────────────── */

export const TickUncheckedLargeHigh: Story = {
  name: 'Tick / Unchecked / Large / High',
  args: { type: 'tick', checked: false, size: 'large', labelEmphasis: 'high', label: 'Label' },
};

export const TickUncheckedMediumHigh: Story = {
  name: 'Tick / Unchecked / Medium / High',
  args: { type: 'tick', checked: false, size: 'medium', labelEmphasis: 'high', label: 'Label' },
};

/* ── Disabled States ─────────────────────────────────── */

export const RadioCheckedDisabled: Story = {
  name: 'Disabled / Radio Checked',
  args: { type: 'radio', checked: true, disabled: true, label: 'Label' },
};

export const RadioUncheckedDisabled: Story = {
  name: 'Disabled / Radio Unchecked',
  args: { type: 'radio', checked: false, disabled: true, label: 'Label' },
};

export const TickCheckedDisabled: Story = {
  name: 'Disabled / Tick Checked',
  args: { type: 'tick', checked: true, disabled: true, label: 'Label' },
};

export const TickUncheckedDisabled: Story = {
  name: 'Disabled / Tick Unchecked',
  args: { type: 'tick', checked: false, disabled: true, label: 'Label' },
};

/* ── Without Label ───────────────────────────────────── */

export const RadioNoLabel: Story = {
  name: 'Radio / No Label',
  args: { type: 'radio', checked: true, showLabel: false },
};

export const TickNoLabel: Story = {
  name: 'Tick / No Label',
  args: { type: 'tick', checked: true, showLabel: false },
};

/* ── Interactive Radio Group ─────────────────────────── */

const RadioGroupDemo = ({
  radioType,
  size,
  labelEmphasis,
}: {
  radioType: 'radio' | 'tick';
  size: 'large' | 'medium';
  labelEmphasis: 'high' | 'low';
}) => {
  const [selected, setSelected] = useState('option1');
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4 (disabled)', disabled: true },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {options.map((opt) => (
        <Radio
          key={opt.value}
          type={radioType}
          name="demo-group"
          value={opt.value}
          checked={selected === opt.value}
          onChange={() => setSelected(opt.value)}
          label={opt.label}
          size={size}
          labelEmphasis={labelEmphasis}
          disabled={opt.disabled}
        />
      ))}
      <p style={{ fontSize: 12, color: 'var(--text-neutral-medium)', marginTop: 8 }}>
        Selected: <strong>{selected}</strong>
      </p>
    </div>
  );
};

export const InteractiveRadioGroup: Story = {
  name: 'Interactive / Radio Group',
  render: () => <RadioGroupDemo radioType="radio" size="large" labelEmphasis="high" />,
};

export const InteractiveTickGroup: Story = {
  name: 'Interactive / Tick Group',
  render: () => <RadioGroupDemo radioType="tick" size="large" labelEmphasis="high" />,
};

export const InteractiveRadioMedium: Story = {
  name: 'Interactive / Radio Medium Low',
  render: () => <RadioGroupDemo radioType="radio" size="medium" labelEmphasis="low" />,
};

export const InteractiveTickMedium: Story = {
  name: 'Interactive / Tick Medium Low',
  render: () => <RadioGroupDemo radioType="tick" size="medium" labelEmphasis="low" />,
};

/* ── Full Matrix ─────────────────────────────────────── */

export const FullMatrix: Story = {
  name: 'Matrix / Complete',
  render: () => {
    const types = ['radio', 'tick'] as const;
    const sizes = ['large', 'medium'] as const;
    const emphases = ['high', 'low'] as const;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {types.map((t) => (
          <div key={t}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-neutral-medium)', marginBottom: 16, textTransform: 'capitalize' }}>
              Type: {t}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '120px repeat(4, 1fr)', gap: '12px 16px', alignItems: 'center' }}>
              <span />
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-neutral-medium)' }}>Checked</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-neutral-medium)' }}>Checked Disabled</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-neutral-medium)' }}>Unchecked</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-neutral-medium)' }}>Unchecked Disabled</span>

              {sizes.map((s) =>
                emphases.map((e) => (
                  <React.Fragment key={`${s}-${e}`}>
                    <span style={{ fontSize: 11, color: 'var(--text-neutral-medium)' }}>
                      {s} / {e}
                    </span>
                    <span><Radio type={t} checked size={s} labelEmphasis={e} label="Label" /></span>
                    <span><Radio type={t} checked disabled size={s} labelEmphasis={e} label="Label" /></span>
                    <span><Radio type={t} size={s} labelEmphasis={e} label="Label" /></span>
                    <span><Radio type={t} disabled size={s} labelEmphasis={e} label="Label" /></span>
                  </React.Fragment>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
