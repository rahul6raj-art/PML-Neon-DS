import type { Meta, StoryObj } from '@storybook/react';
import { Tile } from './Tile';
import type { TileProps, TileStrategyItem, TileVariant } from './Tile';
import { iconNames } from '../Icon';

const DEFAULT_STRATEGY_STRIP: TileStrategyItem[] = [
  {
    icon: 'briefcase_outline',
    title: 'Stable Indian Co.',
    label: 'Quality large caps',
  },
  {
    icon: 'chart',
    title: 'Consistent profit maker',
    label: 'Earnings momentum',
  },
  {
    icon: 'volume_up_outline',
    title: 'High volume today',
    label: 'Unusual activity',
  },
  {
    icon: 'filter_outline',
    title: 'Quality filters',
    label: 'Saved screeners',
  },
  {
    icon: 'bookmark_outline',
    title: 'Dividend yield',
    label: 'Income names',
  },
  {
    icon: 'bell_outline',
    title: 'Analyst picks',
    label: 'Consensus buys',
  },
];

const ICON_OPTIONS = iconNames.reduce<Record<string, string>>(
  (acc, name) => {
    acc[name] = name;
    return acc;
  },
  { '(none)': '' },
);

const meta: Meta<typeof Tile> = {
  title: 'Components/Tile',
  component: Tile,
  tags: ['autodocs'],
  argTypes: {
    /* ══ Variant ═════════════════════════════════════ */
    variant: {
      control: 'select',
      options: ['default', 'action', 'strategy'] as TileVariant[],
      description:
        '**default** / **action** (favourite) / **strategy** — **Discover → Curated strategies** rhythm (see **`StocksTilesWidget`** + **`Discover.css`** **`.dv-strategies-stw`**).',
      table: { defaultValue: { summary: 'default' }, category: 'Variant' },
    },

    /* ══ Content ═════════════════════════════════════ */
    icon: {
      control: 'select',
      options: Object.keys(ICON_OPTIONS),
      mapping: ICON_OPTIONS,
      description: 'Main icon (44×44)',
      table: { defaultValue: { summary: 'rupee' }, category: 'Content' },
    },
    title: {
      control: 'text',
      description: 'Title text (first line)',
      table: { defaultValue: { summary: 'Title' }, category: 'Content' },
    },
    label: {
      control: 'text',
      description: 'Label text (second line)',
      table: { defaultValue: { summary: 'label' }, category: 'Content' },
    },

    /* ══ Favourite (action only) ════════════════════ */
    favouriteOption: {
      control: 'boolean',
      description: 'Show gradient overlay behind the favourite icon (action variant only)',
      table: { defaultValue: { summary: 'false' }, category: 'Favourite' },
      if: { arg: 'variant', eq: 'action' },
    },
    favouriteIcon: {
      control: 'select',
      options: Object.keys(ICON_OPTIONS),
      mapping: ICON_OPTIONS,
      description: 'Favourite icon name',
      table: { defaultValue: { summary: 'star_outline' }, category: 'Favourite' },
      if: { arg: 'variant', eq: 'action' },
    },

    /* ══ Events ══════════════════════════════════════ */
    onClick: {
      action: 'clicked',
      description: 'Tile click handler',
      table: { category: 'Events' },
    },
    onFavouriteClick: {
      action: 'favouriteClicked',
      description: 'Favourite icon click handler',
      table: { category: 'Events' },
      if: { arg: 'variant', eq: 'action' },
    },
    strategyItems: {
      control: 'object',
      description:
        '**Strategy** only. Non-empty **array** → horizontal strip (overrides **Strategy cards (count)** in **Playground**). Each item: **`icon`**, **`title`**, **`label`**.',
      if: { arg: 'variant', eq: 'strategy' },
      table: { category: 'Strategy strip' },
    },
    onStrategyItemPress: {
      action: 'strategyItemPressed',
      description: '**Strategy** strip: receives the tapped card **index**.',
      if: { arg: 'variant', eq: 'strategy' },
      table: { category: 'Events' },
    },
  },
  args: {
    variant: 'default',
    icon: 'rupee',
    title: 'Title',
    label: 'label',
    favouriteOption: false,
    favouriteIcon: 'star_outline',
  },
};

export default meta;
type Story = StoryObj<typeof Tile>;

type TilePlaygroundArgs = TileProps & {
  /** **Playground** only: when **variant** is **strategy** and **`strategyItems`** is empty, builds a strip of this many demo cards (1 = single tile). */
  storyStrategyCardCount?: number;
};

/* ── Playground ──────────────────────────────────── */
export const Playground: StoryObj<TilePlaygroundArgs> = {
  args: {
    storyStrategyCardCount: 1,
  },
  argTypes: {
    storyStrategyCardCount: {
      name: 'Strategy cards (count)',
      control: { type: 'number', min: 1, max: 6, step: 1 },
      description:
        '**Strategy** only (when **`strategyItems`** is empty). **1** = one tile from **icon** / **title** / **label**. **2–6** = demo strip.',
      if: { arg: 'variant', eq: 'strategy' },
      table: { category: 'Strategy strip' },
    },
  },
  render: (args) => {
    const {
      storyStrategyCardCount = 1,
      strategyItems: rawItems,
      onStrategyItemPress,
      ...rest
    } = args as TilePlaygroundArgs;

    if (rest.variant !== 'strategy') {
      const a = args as TilePlaygroundArgs;
      const { storyStrategyCardCount, strategyItems, ...tileArgs } = a;
      void storyStrategyCardCount;
      void strategyItems;
      return <Tile {...tileArgs} />;
    }

    const manualStrip =
      Array.isArray(rawItems) && rawItems.length > 0 ? rawItems : null;

    if (manualStrip) {
      return (
        <Tile
          {...(rest as TileProps)}
          variant="strategy"
          strategyItems={manualStrip}
          onStrategyItemPress={onStrategyItemPress}
        />
      );
    }

    const n = Math.min(
      6,
      Math.max(1, Math.floor(Number(storyStrategyCardCount) || 1)),
    );
    if (n <= 1) {
      const a = args as TilePlaygroundArgs;
      const {
        storyStrategyCardCount,
        strategyItems,
        onStrategyItemPress,
        ...tileArgs
      } = a;
      void storyStrategyCardCount;
      void strategyItems;
      void onStrategyItemPress;
      return <Tile {...tileArgs} variant="strategy" />;
    }

    return (
      <Tile
        {...(rest as TileProps)}
        variant="strategy"
        strategyItems={DEFAULT_STRATEGY_STRIP.slice(0, n)}
        onStrategyItemPress={onStrategyItemPress}
      />
    );
  },
};

/* ── Default ─────────────────────────────────────── */
export const Default: Story = {
  args: { variant: 'default', icon: 'rupee', title: 'Title', label: 'label' },
};

/* ── Action ──────────────────────────────────────── */
export const Action: Story = {
  args: { variant: 'action', icon: 'rupee', title: 'Title', label: 'label' },
};

/* ── Action + Favourite gradient ─────────────────── */
export const ActionWithFavourite: Story = {
  args: {
    variant: 'action',
    icon: 'rupee',
    title: 'Title',
    label: 'label',
    favouriteOption: true,
    favouriteIcon: 'star_outline',
  },
};

/** **Discover → Curated strategies** single tile — use **Controls** (variant **strategy**, **icon** / **title** / **label**). */
export const StrategyDiscoverCurated: Story = {
  args: {
    variant: 'strategy',
    icon: 'briefcase_outline',
    title: 'Stable Indian Co.',
    label: 'Quality large caps',
    onClick: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          'Horizontal strips in the app use **`StocksTilesWidget`** with **Discover** **`.dv-strategies-stw`** overrides (`Widgets/Stocks tiles`). This **Tile** variant matches one tile’s look for isolated previews.',
      },
    },
  },
};

/** Strategy strip via **`strategyItems`** (same three as **Discover**); edit **`strategyItems`** in **Controls** to add or remove cards. */
export const StrategyStripRow: Story = {
  args: {
    variant: 'strategy',
    strategyItems: DEFAULT_STRATEGY_STRIP.slice(0, 3),
    onStrategyItemPress: () => {},
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: 'var(--spacing-16)',
          background: 'var(--surface-level-4)',
          boxSizing: 'border-box',
          maxWidth: 'var(--phone-column-width)',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Uses **`strategyItems`** on one **`Tile`**. Production horizontal lists should still prefer **`StocksTilesWidget`** (same data shape as **Discover**).',
      },
    },
  },
};

/** Six demo cards — scroll the strip. */
export const StrategyStripManyCards: Story = {
  args: {
    variant: 'strategy',
    strategyItems: DEFAULT_STRATEGY_STRIP,
    onStrategyItemPress: () => {},
  },
  decorators: StrategyStripRow.decorators,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates **`strategyItems`** with more than three entries.',
      },
    },
  },
};

/* ── Grid demo ───────────────────────────────────── */
function GridRender() {
  const items = [
    { icon: 'home_outline', title: 'Home', label: 'label' },
    { icon: 'chart', title: 'Stocks', label: 'label' },
    { icon: 'handbag_outline', title: 'Shopping', label: 'label' },
    { icon: 'rupee', title: 'Payments', label: 'label' },
    { icon: 'bookmark_outline', title: 'Saved', label: 'label' },
    { icon: 'bell_outline', title: 'Alerts', label: 'label' },
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, maxWidth: 340 }}>
      {items.map((item, i) => (
        <Tile key={i} {...item} />
      ))}
    </div>
  );
}

export const Grid: Story = {
  render: GridRender,
  parameters: { controls: { disable: true } },
};
