import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PageControl, type PageControlProps } from './PageControl';

type FlatArgs = Omit<PageControlProps, 'selection'> & {
  sel2?: number;
  sel3?: number;
  sel4?: number;
  sel5?: number;
  sel6?: number;
  sel7?: number;
  sel8?: number;
};

function getSelection(args: FlatArgs): number {
  switch (args.dots) {
    case 2: return args.sel2 ?? 1;
    case 3: return args.sel3 ?? 1;
    case 4: return args.sel4 ?? 1;
    case 5: return args.sel5 ?? 1;
    case 6: return args.sel6 ?? 1;
    case 7: return args.sel7 ?? 1;
    case 8: return args.sel8 ?? 1;
    default: return 1;
  }
}

const meta: Meta<FlatArgs> = {
  title: 'Components/Page Control',
  component: PageControl,
  tags: ['autodocs'],
  render: (args) => (
    <PageControl
      dots={args.dots}
      selection={getSelection(args)}
      onChange={args.onChange}
      className={args.className}
    />
  ),
  argTypes: {
    /* ══ Variant ═════════════════════════════════════ */
    dots: {
      control: 'inline-radio',
      options: [2, 3, 4, 5, 6, 7, 8],
      description: 'Total number of pages/dots (8 = "8+")',
      table: { category: 'Variant', defaultValue: { summary: '2' } },
    },

    /* ══ Selection (per dots count) ═════════════════ */
    sel2: {
      control: 'inline-radio',
      options: [1, 2],
      name: 'Selection',
      description: 'Active page',
      table: { category: 'Variant', defaultValue: { summary: '1' } },
      if: { arg: 'dots', eq: 2 },
    },
    sel3: {
      control: 'inline-radio',
      options: [1, 2, 3],
      name: 'Selection',
      description: 'Active page',
      table: { category: 'Variant', defaultValue: { summary: '1' } },
      if: { arg: 'dots', eq: 3 },
    },
    sel4: {
      control: 'inline-radio',
      options: [1, 2, 3, 4],
      name: 'Selection',
      description: 'Active page',
      table: { category: 'Variant', defaultValue: { summary: '1' } },
      if: { arg: 'dots', eq: 4 },
    },
    sel5: {
      control: 'inline-radio',
      options: [1, 2, 3, 4, 5],
      name: 'Selection',
      description: 'Active page',
      table: { category: 'Variant', defaultValue: { summary: '1' } },
      if: { arg: 'dots', eq: 5 },
    },
    sel6: {
      control: 'inline-radio',
      options: [1, 2, 3, 4, 5, 6],
      name: 'Selection',
      description: 'Active page',
      table: { category: 'Variant', defaultValue: { summary: '1' } },
      if: { arg: 'dots', eq: 6 },
    },
    sel7: {
      control: 'inline-radio',
      options: [1, 2, 3, 4, 5, 6, 7],
      name: 'Selection',
      description: 'Active page',
      table: { category: 'Variant', defaultValue: { summary: '1' } },
      if: { arg: 'dots', eq: 7 },
    },
    sel8: {
      control: 'inline-radio',
      options: [1, 2, 3, 4, 5, 6, 7, 8],
      name: 'Selection',
      description: 'Active page (8+ mode)',
      table: { category: 'Variant', defaultValue: { summary: '1' } },
      if: { arg: 'dots', eq: 8 },
    },

    /* ══ Events ═════════════════════════════════════ */
    onChange: {
      action: 'changed',
      description: 'Called when a dot is clicked',
      table: { category: 'Events' },
    },

    /* ══ Hidden ═════════════════════════════════════ */
    className: { control: false },
  },
  args: {
    dots: 2,
    sel2: 1,
    sel3: 1,
    sel4: 1,
    sel5: 1,
    sel6: 1,
    sel7: 1,
    sel8: 1,
  },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-level-4)', padding: 32, borderRadius: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<FlatArgs>;

/* ── Playground ──────────────────────────────────── */
export const Playground: Story = {};

/* ── 3 Dots ──────────────────────────────────────── */
export const ThreeDots: Story = {
  args: { dots: 3, sel3: 2 },
};

/* ── 5 Dots ──────────────────────────────────────── */
export const FiveDots: Story = {
  args: { dots: 5, sel5: 3 },
};

/* ── 7 Dots — last ───────────────────────────────── */
export const SevenDotsLast: Story = {
  args: { dots: 7, sel7: 7 },
};

/* ── 8+ Dots — start ────────────────────────────── */
export const EightPlusStart: Story = {
  args: { dots: 8, sel8: 1 },
};

/* ── 8+ Dots — middle ───────────────────────────── */
export const EightPlusMiddle: Story = {
  args: { dots: 8, sel8: 5 },
};

/* ── 8+ Dots — end ──────────────────────────────── */
export const EightPlusEnd: Story = {
  args: { dots: 8, sel8: 8 },
};

/* ── All Variants grid ───────────────────────────── */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 24 }}>
      {([2, 3, 4, 5, 6, 7, 8] as const).map((dots) => (
        <div key={dots} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--text-neutral-medium)', fontFamily: 'var(--font-family)' }}>
            {dots === 8 ? '8+ dots' : `${dots} dots`}
          </span>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {Array.from({ length: dots }, (_, i) => (
              <PageControl key={i} dots={dots} selection={i + 1} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

/* ── Interactive demo ────────────────────────────── */
function InteractiveRender() {
  const [active, setActive] = useState(1);
  const dots = 8;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
        padding: 32,
        fontFamily: 'var(--font-family)',
      }}
    >
      <div style={{ fontSize: 14, color: 'var(--text-neutral-medium)' }}>
        Page {active} of {dots}+
      </div>
      <PageControl dots={dots} selection={active} onChange={setActive} />
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={() => setActive((p) => Math.max(1, p - 1))}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: '1px solid var(--border-neutral-medium)',
            background: 'var(--surface-level-1)',
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          ← Prev
        </button>
        <button
          onClick={() => setActive((p) => Math.min(dots, p + 1))}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: '1px solid var(--border-neutral-medium)',
            background: 'var(--surface-level-1)',
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export const Interactive: Story = {
  render: InteractiveRender,
  parameters: { controls: { disable: true } },
};
