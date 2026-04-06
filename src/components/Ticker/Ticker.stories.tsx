import type { Meta, StoryObj } from '@storybook/react';
import {
  Ticker,
  TICKER_WIDGET_DEFAULT_ITEMS,
  TICKER_WIDGET_EXPIRY_ITEMS,
  TICKER_WIDGET_MIXED_EXPIRY_ITEMS,
  type TickerItem,
  type TickerProps,
} from './Ticker';

const MAX_TICKERS = 12;

const EXPIRY_LABEL_BY_INDEX = ['Expiry · 25 Jan', 'Expiry · 28 Jan', 'Expiry · 30 Jan'] as const;

/** Canned move/% per template slot so sentiment toggles stay visually consistent with the Badge. */
const PER_CARD_SENTIMENT_VARIANTS: Array<{
  positive: Pick<TickerItem, 'change' | 'percent' | 'positive'>;
  negative: Pick<TickerItem, 'change' | 'percent' | 'positive'>;
}> = [
  {
    positive: { change: '+70.15', percent: '(0.33%)', positive: true },
    negative: { change: '-70.15', percent: '(0.33%)', positive: false },
  },
  {
    positive: { change: '+120.50', percent: '(0.21%)', positive: true },
    negative: { change: '-625.15', percent: '(1.91%)', positive: false },
  },
  {
    positive: { change: '+300.00', percent: '(0.40%)', positive: true },
    negative: { change: '-225.15', percent: '(0.31%)', positive: false },
  },
];

/** Each pill uses template slot `i % 3` (NIFTY50 / NIFTYBANK / SENSEX cycle). */
function buildTickerItemsFromSlots(
  count: number,
  expirySlots: [boolean, boolean, boolean],
  sentimentSlots: [boolean, boolean, boolean],
): TickerItem[] {
  const n = Math.min(MAX_TICKERS, Math.max(1, Math.floor(Number(count)) || 1));
  const out: TickerItem[] = [];
  for (let i = 0; i < n; i++) {
    const slot = i % 3;
    const src = TICKER_WIDGET_DEFAULT_ITEMS[slot];
    const cycle = Math.floor(i / 3);
    const v = PER_CARD_SENTIMENT_VARIANTS[slot];
    const s = sentimentSlots[slot] ? v.positive : v.negative;
    out.push({
      ...src,
      ...s,
      name: cycle > 0 ? `${src.name} (${i + 1})` : src.name,
      ...(expirySlots[slot] ? { expiryLabel: EXPIRY_LABEL_BY_INDEX[slot] } : {}),
    });
  }
  return out;
}

type PlaygroundStoryArgs = Omit<TickerProps, 'items'> & {
  numberOfTickers: number;
  expiryNifty: boolean;
  expiryBank: boolean;
  expirySensex: boolean;
  positiveNifty: boolean;
  positiveBank: boolean;
  positiveSensex: boolean;
};

const perCardArgTypes = {
  expiryNifty: {
    name: 'NIFTY50 — expiry badge',
    description: 'Applies to every pill on the NIFTY50 slot in the 3-name cycle.',
    control: 'boolean' as const,
    table: { category: 'Per card' },
  },
  expiryBank: {
    name: 'NIFTYBANK — expiry badge',
    description: 'Applies to every pill on the NIFTYBANK slot in the cycle.',
    control: 'boolean' as const,
    table: { category: 'Per card' },
  },
  expirySensex: {
    name: 'SENSEX — expiry badge',
    description: 'Applies to every pill on the SENSEX slot in the cycle.',
    control: 'boolean' as const,
    table: { category: 'Per card' },
  },
  positiveNifty: {
    name: 'NIFTY50 — positive sentiment',
    description: 'Muted positive vs negative move/% Badge for the NIFTY50 slot.',
    control: 'boolean' as const,
    table: { category: 'Per card' },
  },
  positiveBank: {
    name: 'NIFTYBANK — positive sentiment',
    description: 'Muted positive vs negative move/% Badge for the NIFTYBANK slot.',
    control: 'boolean' as const,
    table: { category: 'Per card' },
  },
  positiveSensex: {
    name: 'SENSEX — positive sentiment',
    description: 'Muted positive vs negative move/% Badge for the SENSEX slot.',
    control: 'boolean' as const,
    table: { category: 'Per card' },
  },
};

const meta = {
  title: 'Widgets/Ticker',
  component: Ticker,
  parameters: {
    layout: 'centered',
    controls: { expanded: true, sort: 'alpha' },
    docs: {
      description: {
        component:
          '**Index strip** from Stock Home: horizontal scroll of pills (name, price, change + %). Set **`expiryLabel`** on any **row** to show a **muted** notice **Badge** inline at the front of that pill only. Root **`.tk`**. Padding **`0 var(--spacing-16)`**, hidden scrollbar, **`overflow-x: auto`**. See **Ticker.mdx**.',
      },
    },
    actions: { argTypesRegex: '^on.*' },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: 'var(--phone-column-width)',
          padding: '0 0 var(--spacing-24)',
          background: 'var(--surface-level-4)',
          boxSizing: 'border-box',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    items: TICKER_WIDGET_DEFAULT_ITEMS,
    topMargin: true,
    className: '',
  } satisfies TickerProps,
  argTypes: {
    items: {
      description:
        'Each row: `name`, `price`, `change`, `percent`, `positive`. Optional **`expiryLabel`** (non-empty) enables the badge on that pill only.',
      control: 'object',
      table: { category: 'Content' },
    },
    topMargin: {
      name: 'Top margin (Stock Home)',
      description: 'Applies `margin-top: var(--spacing-32)` like Stock Home below the header.',
      control: 'boolean',
      table: { category: 'Layout' },
    },
    className: {
      description: 'Optional class on root `.tk`.',
      control: 'text',
      table: { category: 'Layout' },
    },
  },
} satisfies Meta<typeof Ticker>;

export default meta;

type Story = StoryObj<typeof Ticker>;

/** All Playground knobs live in the **Controls** panel — nothing under the preview. */
export const Playground: StoryObj<PlaygroundStoryArgs> = {
  args: {
    numberOfTickers: 3,
    expiryNifty: true,
    expiryBank: false,
    expirySensex: false,
    positiveNifty: true,
    positiveBank: false,
    positiveSensex: false,
    topMargin: true,
    className: '',
  },
  argTypes: {
    numberOfTickers: {
      name: 'numberOfTickers',
      description: `How many pills (1–${MAX_TICKERS}). Repeats the three template slots; extra pills get a numbered suffix.`,
      control: { type: 'range', min: 1, max: MAX_TICKERS, step: 1 },
      table: { category: 'Playground' },
    },
    ...perCardArgTypes,
    items: { control: false, table: { disable: true } },
    topMargin: { table: { category: 'Layout' } },
    className: { table: { category: 'Layout' } },
  },
  render: (args) => {
    const a = args as PlaygroundStoryArgs;
    const items = buildTickerItemsFromSlots(
      a.numberOfTickers,
      [a.expiryNifty, a.expiryBank, a.expirySensex],
      [a.positiveNifty, a.positiveBank, a.positiveSensex],
    );
    return (
      <Ticker
        items={items}
        topMargin={a.topMargin}
        className={a.className?.trim() ? a.className : undefined}
      />
    );
  },
};

export const Default: Story = {
  args: {
    items: TICKER_WIDGET_DEFAULT_ITEMS,
  },
};

export const SinglePill: Story = {
  args: {
    items: [TICKER_WIDGET_DEFAULT_ITEMS[0]],
  },
};

export const NoTopMargin: Story = {
  args: {
    items: TICKER_WIDGET_DEFAULT_ITEMS,
    topMargin: false,
  },
};

/** Every pill has `expiryLabel` — all show the muted notice badge. */
export const AllExpiryBadges: Story = {
  name: 'All expiry badges',
  args: {
    items: TICKER_WIDGET_EXPIRY_ITEMS,
  },
};

/** Only NIFTY50 has `expiryLabel`; NIFTYBANK and SENSEX are plain pills. */
export const MixedExpiryPerCard: Story = {
  name: 'Mixed expiry (per card)',
  args: {
    items: TICKER_WIDGET_MIXED_EXPIRY_ITEMS,
  },
};
