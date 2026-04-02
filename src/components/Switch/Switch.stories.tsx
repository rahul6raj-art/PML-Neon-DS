import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    on: {
      control: 'boolean',
      description: 'Whether the switch is toggled on',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: { defaultValue: { summary: 'false' } },
    },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Interactive Playground ───────────────────────────── */

export const Playground: Story = {
  args: {
    on: false,
    disabled: false,
  },
};

/* ── All Four Variants (matches design grid) ─────────── */

export const OnEnabled: Story = {
  name: 'On / Enabled',
  args: { on: true, disabled: false },
};

export const OffEnabled: Story = {
  name: 'Off / Enabled',
  args: { on: false, disabled: false },
};

export const OnDisabled: Story = {
  name: 'On / Disabled',
  args: { on: true, disabled: true },
};

export const OffDisabled: Story = {
  name: 'Off / Disabled',
  args: { on: false, disabled: true },
};

/* ── Interactive Toggle ──────────────────────────────── */

const InteractiveDemo = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Switch on={isOn} onChange={() => setIsOn(!isOn)} />
      <span style={{ fontFamily: 'var(--font-family)', fontSize: 14, color: 'var(--text-neutral-strong)' }}>
        {isOn ? 'On' : 'Off'}
      </span>
    </div>
  );
};

export const Interactive: Story = {
  name: 'Interactive / Toggle',
  render: () => <InteractiveDemo />,
};

/* ── Interactive with Label ──────────────────────────── */

const LabeledSwitchDemo = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
    analytics: false,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const items: { key: keyof typeof settings; label: string; disabled?: boolean }[] = [
    { key: 'notifications', label: 'Push notifications' },
    { key: 'darkMode', label: 'Dark mode' },
    { key: 'autoSave', label: 'Auto-save drafts' },
    { key: 'analytics', label: 'Share analytics (disabled)', disabled: true },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      {items.map((item) => (
        <div
          key={item.key}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-family)',
              fontSize: 16,
              fontWeight: 500,
              color: item.disabled ? 'var(--text-neutral-weak)' : 'var(--text-neutral-strong)',
            }}
          >
            {item.label}
          </span>
          <Switch
            on={settings[item.key]}
            disabled={item.disabled}
            onChange={() => toggle(item.key)}
          />
        </div>
      ))}
    </div>
  );
};

export const InteractiveSettingsPanel: Story = {
  name: 'Interactive / Settings Panel',
  render: () => <LabeledSwitchDemo />,
};

/* ── Full Matrix ─────────────────────────────────────── */

export const FullMatrix: Story = {
  name: 'Matrix / Complete',
  parameters: { layout: 'padded' },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '100px repeat(2, 1fr)',
        gap: '16px 24px',
        alignItems: 'center',
      }}
    >
      <span />
      <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-neutral-medium)' }}>On</span>
      <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-neutral-medium)' }}>Off</span>

      <span style={{ fontSize: 11, color: 'var(--text-neutral-medium)' }}>Enabled</span>
      <span><Switch on /></span>
      <span><Switch /></span>

      <span style={{ fontSize: 11, color: 'var(--text-neutral-medium)' }}>Disabled</span>
      <span><Switch on disabled /></span>
      <span><Switch disabled /></span>
    </div>
  ),
};
