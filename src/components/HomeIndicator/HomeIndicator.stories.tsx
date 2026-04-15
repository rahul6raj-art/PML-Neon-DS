import type { Meta, StoryObj } from '@storybook/react';
import { HomeIndicator } from './HomeIndicator';

const meta: Meta<typeof HomeIndicator> = {
  title: 'Components/HomeIndicator',
  component: HomeIndicator,
  tags: ['autodocs'],
  argTypes: {
    inverse: {
      control: 'boolean',
      description: 'True = dark bar (light bg), False = light bar (dark bg)',
      table: { defaultValue: { summary: 'true' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof HomeIndicator>;

/* ─── Playground ─────────────────────────────────── */
export const Playground: Story = {
  args: { inverse: true },
};

/* ══════════════════════════════════════════════════
   VARIANTS
   ══════════════════════════════════════════════════ */
export const Dark: Story = {
  name: 'Inverse True (Dark Bar)',
  args: { inverse: true },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-level-1)', borderRadius: 12, border: '1px solid var(--border-neutral-weak)' }}>
        <Story />
      </div>
    ),
  ],
};

export const Light: Story = {
  name: 'Inverse False (Light Bar)',
  args: { inverse: false },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-level-3)', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
};

/* ══════════════════════════════════════════════════
   BOTH VARIANTS
   ══════════════════════════════════════════════════ */
export const AllVariants: Story = {
  name: 'All Variants',
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'var(--font-family)' }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-medium)' }}>
          Inverse = True (dark bar)
        </p>
        <div style={{ background: 'var(--surface-level-1)', borderRadius: 12, border: '1px solid var(--border-neutral-weak)' }}>
          <HomeIndicator inverse />
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-medium)' }}>
          Inverse = False (light bar)
        </p>
        <div style={{ background: 'var(--surface-level-3)', borderRadius: 12 }}>
          <HomeIndicator inverse={false} />
        </div>
      </div>
    </div>
  ),
};
