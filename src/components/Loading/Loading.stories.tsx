import type { Meta, StoryObj } from '@storybook/react';
import { Loading } from './Loading';
import type { LoadingType } from './Loading';

const meta: Meta<typeof Loading> = {
  title: 'Components/Loading',
  component: Loading,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['theme', 'monotone'] as LoadingType[],
      description: 'Visual style — Theme (navy→cyan) or Monotone (grayscale)',
      table: { defaultValue: { summary: 'theme' } },
    },
    dotSize: {
      control: { type: 'number', min: 8, max: 40, step: 2 },
      description: 'Size of each dot in pixels',
      table: { defaultValue: { summary: '20' } },
    },
    label: {
      control: 'text',
      description: 'Accessible label for screen readers',
      table: { defaultValue: { summary: 'Loading' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loading>;

/* ─── Playground ─────────────────────────────────── */
export const Playground: Story = {
  args: {
    type: 'theme',
    dotSize: 20,
    label: 'Loading',
  },
};

/* ══════════════════════════════════════════════════
   TYPE VARIANTS
   ══════════════════════════════════════════════════ */
export const Theme: Story = {
  name: 'Theme',
  args: { type: 'theme', dotSize: 20 },
};

export const Monotone: Story = {
  name: 'Monotone',
  args: { type: 'monotone', dotSize: 20 },
  parameters: { backgrounds: { default: 'dark' } },
};

/* ══════════════════════════════════════════════════
   MONOTONE ON DARK BACKGROUND
   ══════════════════════════════════════════════════ */
export const MonotoneOnDark: Story = {
  name: 'Monotone (Dark BG)',
  args: { type: 'monotone', dotSize: 20 },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        borderRadius: 12,
        background: 'var(--surface-level-2)',
      }}
    >
      <Loading {...args} />
    </div>
  ),
};

/* ══════════════════════════════════════════════════
   SIZE VARIANTS
   ══════════════════════════════════════════════════ */
export const Sizes: Story = {
  name: 'Size Variants',
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
      <div style={{ textAlign: 'center' }}>
        <Loading type="theme" dotSize={12} />
        <p style={{ margin: '8px 0 0', fontSize: 11, color: 'var(--text-neutral-medium)', fontFamily: 'var(--font-family)' }}>Small (12px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Loading type="theme" dotSize={20} />
        <p style={{ margin: '8px 0 0', fontSize: 11, color: 'var(--text-neutral-medium)', fontFamily: 'var(--font-family)' }}>Default (20px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Loading type="theme" dotSize={32} />
        <p style={{ margin: '8px 0 0', fontSize: 11, color: 'var(--text-neutral-medium)', fontFamily: 'var(--font-family)' }}>Large (32px)</p>
      </div>
    </div>
  ),
};

/* ══════════════════════════════════════════════════
   BOTH TYPES SIDE BY SIDE
   ══════════════════════════════════════════════════ */
export const AllVariants: Story = {
  name: 'All Variants',
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: 'var(--font-family)' }}>
      <div>
        <p style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-medium)' }}>Theme</p>
        <Loading type="theme" />
      </div>
      <div
        style={{
          padding: 24,
          borderRadius: 8,
          background: 'var(--surface-level-2)',
        }}
      >
        <p style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-medium)' }}>Monotone (on dark)</p>
        <Loading type="monotone" />
      </div>
    </div>
  ),
};
