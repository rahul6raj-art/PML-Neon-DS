import type { Meta, StoryObj } from '@storybook/react';
import { StatusBar } from './StatusBar';
import type { StatusBarTheme } from './StatusBar';

const meta: Meta<typeof StatusBar> = {
  title: 'Components/StatusBar',
  component: StatusBar,
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'] as StatusBarTheme[],
      description: 'Light (dark text) or Dark (white text on dark bg)',
      table: { defaultValue: { summary: 'light' } },
    },
    time: {
      control: 'text',
      description: 'Time string displayed on the left',
      table: { defaultValue: { summary: '9:41' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBar>;

/* ─── Playground ─────────────────────────────────── */
export const Playground: Story = {
  args: {
    theme: 'light',
    time: '9:41',
  },
};

/* ══════════════════════════════════════════════════
   THEME VARIANTS
   ══════════════════════════════════════════════════ */
export const Light: Story = {
  name: 'Light',
  args: { theme: 'light', time: '9:41' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-level-1)', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
};

export const Dark: Story = {
  name: 'Dark',
  args: { theme: 'dark', time: '9:41' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-level-3)', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
};

/* ══════════════════════════════════════════════════
   BOTH THEMES SIDE BY SIDE
   ══════════════════════════════════════════════════ */
export const AllVariants: Story = {
  name: 'All Variants',
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'var(--font-family)' }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-medium)' }}>Light</p>
        <div style={{ background: 'var(--surface-level-1)', borderRadius: 12, border: '1px solid var(--border-neutral-weak)' }}>
          <StatusBar theme="light" time="9:41" />
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-medium)' }}>Dark</p>
        <div style={{ background: 'var(--surface-level-3)', borderRadius: 12 }}>
          <StatusBar theme="dark" time="9:41" />
        </div>
      </div>
    </div>
  ),
};

/* ══════════════════════════════════════════════════
   CUSTOM TIME
   ══════════════════════════════════════════════════ */
export const CustomTime: Story = {
  name: 'Custom Time',
  args: { theme: 'light', time: '12:30' },
};
