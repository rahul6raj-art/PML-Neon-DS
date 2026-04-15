import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './Logo';
import type { LogoCategory } from './Logo';
import {
  MUTUAL_FUND_NAMES,
  PAYMENT_NAMES,
  BANK_NAMES,
  STOCK_NAMES,
  INDEX_NAMES,
} from './logoNames';

const ALL_NAMES = [
  ...MUTUAL_FUND_NAMES,
  ...PAYMENT_NAMES,
  ...BANK_NAMES,
  ...STOCK_NAMES,
  ...INDEX_NAMES,
];

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    category: {
      control: 'select',
      options: ['mutualFunds', 'payments', 'banks', 'stocks', 'indices'] as LogoCategory[],
      description: 'Logo category',
      table: { defaultValue: { summary: 'mutualFunds' } },
    },
    name: {
      control: 'select',
      options: ALL_NAMES,
      description: 'Brand / company name',
    },
    src: {
      control: 'text',
      description: 'Logo image URL',
    },
    alt: {
      control: 'text',
      description: 'Alt text for accessibility',
    },
    size: {
      control: { type: 'number', min: 16, max: 128, step: 8 },
      description: 'Logo size in pixels',
      table: { defaultValue: { summary: '32' } },
    },
    shape: {
      control: 'inline-radio',
      options: ['square', 'rounded', 'circle'],
      description: 'Border radius shape',
      table: { defaultValue: { summary: 'square' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

/* ─── Playground ─────────────────────────────────── */
export const Playground: Story = {
  args: {
    category: 'mutualFunds',
    name: 'HDFC',
    size: 32,
    shape: 'square',
  },
};

/* ══════════════════════════════════════════════════
   WITH IMAGE
   ══════════════════════════════════════════════════ */
export const WithImage: Story = {
  name: 'With Image',
  args: {
    name: 'SBI',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/64px-SBI-logo.svg.png',
    size: 32,
    shape: 'rounded',
  },
};

/* ══════════════════════════════════════════════════
   SHAPE VARIANTS
   ══════════════════════════════════════════════════ */
export const Shapes: Story = {
  name: 'Shape Variants',
  args: {},
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Logo name="HDFC" shape="square" />
        <p style={{ margin: '8px 0 0', fontSize: 11, color: 'var(--text-neutral-medium)' }}>Square</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo name="ICICI" shape="rounded" />
        <p style={{ margin: '8px 0 0', fontSize: 11, color: 'var(--text-neutral-medium)' }}>Rounded</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo name="Axis" shape="circle" />
        <p style={{ margin: '8px 0 0', fontSize: 11, color: 'var(--text-neutral-medium)' }}>Circle</p>
      </div>
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
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Logo name="Nippon" size={24} shape="rounded" />
      <Logo name="Nippon" size={32} shape="rounded" />
      <Logo name="Nippon" size={48} shape="rounded" />
      <Logo name="Nippon" size={64} shape="rounded" />
    </div>
  ),
};

/* ══════════════════════════════════════════════════
   CATEGORY: MUTUAL FUNDS
   ══════════════════════════════════════════════════ */
export const MutualFunds: Story = {
  name: 'Mutual Funds',
  args: {},
  render: () => (
    <div>
      <p style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-medium)', fontFamily: 'var(--font-family)' }}>
        Mutual Funds — {MUTUAL_FUND_NAMES.length} logos
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {MUTUAL_FUND_NAMES.map((n) => (
          <div key={n} style={{ textAlign: 'center' }}>
            <Logo category="mutualFunds" name={n} shape="rounded" />
            <p style={{ margin: '4px 0 0', fontSize: 9, color: 'var(--text-neutral-medium)', fontFamily: 'var(--font-family)', maxWidth: 32, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {n}
            </p>
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ══════════════════════════════════════════════════
   CATEGORY: PAYMENTS
   ══════════════════════════════════════════════════ */
export const Payments: Story = {
  name: 'Payments',
  args: {},
  render: () => (
    <div>
      <p style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-medium)', fontFamily: 'var(--font-family)' }}>
        Payments — {PAYMENT_NAMES.length} logos
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {PAYMENT_NAMES.map((n) => (
          <div key={n} style={{ textAlign: 'center' }}>
            <Logo category="payments" name={n} shape="rounded" />
            <p style={{ margin: '4px 0 0', fontSize: 9, color: 'var(--text-neutral-medium)', fontFamily: 'var(--font-family)' }}>{n}</p>
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ══════════════════════════════════════════════════
   CATEGORY: BANKS
   ══════════════════════════════════════════════════ */
export const Banks: Story = {
  name: 'Banks',
  args: {},
  render: () => (
    <div>
      <p style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-medium)', fontFamily: 'var(--font-family)' }}>
        Banks — {BANK_NAMES.length} logos
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {BANK_NAMES.map((n) => (
          <div key={n} style={{ textAlign: 'center' }}>
            <Logo category="banks" name={n} shape="rounded" />
            <p style={{ margin: '4px 0 0', fontSize: 9, color: 'var(--text-neutral-medium)', fontFamily: 'var(--font-family)', maxWidth: 32, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {n}
            </p>
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ══════════════════════════════════════════════════
   CATEGORY: STOCKS
   ══════════════════════════════════════════════════ */
export const Stocks: Story = {
  name: 'Stocks',
  args: {},
  render: () => (
    <div>
      <p style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-medium)', fontFamily: 'var(--font-family)' }}>
        Stocks — {STOCK_NAMES.length} logos
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {STOCK_NAMES.map((n) => (
          <div key={n} style={{ textAlign: 'center' }}>
            <Logo category="stocks" name={n} shape="rounded" />
            <p style={{ margin: '4px 0 0', fontSize: 9, color: 'var(--text-neutral-medium)', fontFamily: 'var(--font-family)', maxWidth: 32, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {n}
            </p>
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ══════════════════════════════════════════════════
   CATEGORY: INDICES
   ══════════════════════════════════════════════════ */
export const Indices: Story = {
  name: 'Indices',
  args: {},
  render: () => (
    <div>
      <p style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-medium)', fontFamily: 'var(--font-family)' }}>
        Indices — {INDEX_NAMES.length} logos
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {INDEX_NAMES.map((n) => (
          <div key={n} style={{ textAlign: 'center' }}>
            <Logo category="indices" name={n} shape="rounded" />
            <p style={{ margin: '4px 0 0', fontSize: 9, color: 'var(--text-neutral-medium)', fontFamily: 'var(--font-family)', maxWidth: 48, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {n}
            </p>
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ══════════════════════════════════════════════════
   ALL CATEGORIES
   ══════════════════════════════════════════════════ */
export const AllCategories: Story = {
  name: 'All Categories',
  args: {},
  render: () => {
    const categories: { label: string; cat: LogoCategory; names: readonly string[] }[] = [
      { label: 'Mutual Funds', cat: 'mutualFunds', names: MUTUAL_FUND_NAMES },
      { label: 'Payments', cat: 'payments', names: PAYMENT_NAMES },
      { label: 'Banks', cat: 'banks', names: BANK_NAMES },
      { label: 'Stocks', cat: 'stocks', names: STOCK_NAMES },
      { label: 'Indices', cat: 'indices', names: INDEX_NAMES },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: 'var(--font-family)' }}>
        {categories.map(({ label, cat, names }) => (
          <div key={cat}>
            <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-medium)' }}>
              {label} ({names.length})
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {names.map((n) => (
                <Logo key={n} category={cat} name={n} shape="rounded" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
