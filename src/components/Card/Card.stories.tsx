import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    stroke: {
      control: 'boolean',
      description: 'Show border stroke around the card',
      table: { defaultValue: { summary: 'false' }, category: 'Variant' },
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler — makes the card interactive',
      table: { category: 'Events' },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class',
      table: { category: 'Misc' },
    },
    children: {
      control: false,
      description: 'Card content (ReactNode)',
      table: { category: 'Content' },
    },
  },
  args: {
    stroke: false,
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

/* ── Default (no stroke) ─────────────────────────── */
export const Default: Story = {};

/* ── With stroke ─────────────────────────────────── */
export const WithStroke: Story = {
  args: { stroke: true },
};

/* ── With content ────────────────────────────────── */
export const WithContent: Story = {
  args: { stroke: true },
  render: (args) => (
    <Card {...args}>
      <div style={{ padding: 20 }}>
        <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>
          Card title
        </h3>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--text-neutral-medium)' }}>
          This is some placeholder content inside the card container.
        </p>
      </div>
    </Card>
  ),
};

/* ── Clickable ───────────────────────────────────── */
export const Clickable: Story = {
  args: { stroke: true },
  render: (args) => (
    <Card {...args} onClick={() => alert('Card clicked!')}>
      <div style={{ padding: 20, textAlign: 'center', color: 'var(--text-neutral-moderate)' }}>
        Click me
      </div>
    </Card>
  ),
};

/* ── Side by side comparison ─────────────────────── */
export const Comparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <Card>
          <div style={{ padding: 20, color: 'var(--text-neutral-medium)', fontSize: 14 }}>
            No stroke
          </div>
        </Card>
        <span style={{ fontSize: 12, color: 'var(--text-neutral-medium)', marginTop: 8, display: 'block' }}>
          stroke=false
        </span>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Card stroke>
          <div style={{ padding: 20, color: 'var(--text-neutral-medium)', fontSize: 14 }}>
            With stroke
          </div>
        </Card>
        <span style={{ fontSize: 12, color: 'var(--text-neutral-medium)', marginTop: 8, display: 'block' }}>
          stroke=true
        </span>
      </div>
    </div>
  ),
};
