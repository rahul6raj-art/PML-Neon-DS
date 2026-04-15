import type { Meta, StoryObj } from '@storybook/react';
import {
  NewsWidget,
  NEWS_WIDGET_DEMO_ITEMS,
  type NewsWidgetBadgeContext,
  type NewsWidgetItem,
  type NewsWidgetProps,
} from './NewsWidget';

const SECTION_HEADER_SIZES = ['extra-large', 'large', 'medium', 'small'] as const;

const MAX_NEWS_CARDS = 12;

/** Cycle `NEWS_WIDGET_DEMO_ITEMS` so Playground can show more cards than the demo array. */
function itemsForCardCount(count: number, base: NewsWidgetItem[] = NEWS_WIDGET_DEMO_ITEMS): NewsWidgetItem[] {
  const n = Math.min(MAX_NEWS_CARDS, Math.max(1, Math.floor(Number(count)) || 1));
  const out: NewsWidgetItem[] = [];
  for (let i = 0; i < n; i++) {
    const src = base[i % base.length];
    const cycle = Math.floor(i / base.length);
    out.push({
      ...src,
      title: cycle > 0 ? `${src.title} (${i + 1})` : src.title,
    });
  }
  return out;
}

const EXTRA_BADGE_CONTEXTS: NewsWidgetBadgeContext[] = [
  'default',
  'notice',
  'positive',
  'negative',
];

/** Append generic extra badges to every card (Playground preview). */
function appendExtraBadgesPerCard(items: NewsWidgetItem[], extraCount: number): NewsWidgetItem[] {
  const n = Math.min(5, Math.max(0, Math.floor(Number(extraCount)) || 0));
  if (n === 0) return items;
  return items.map((it, cardIdx) => ({
    ...it,
    badges: [
      ...it.badges,
      ...Array.from({ length: n }, (_, i) => ({
        label: `Extra ${i + 1}`,
        context: EXTRA_BADGE_CONTEXTS[(i + cardIdx) % EXTRA_BADGE_CONTEXTS.length],
      })),
    ],
  }));
}

/** Storybook-only: drives `items` in Playground (not `NewsWidget` props). */
type NewsWidgetStoryArgs = NewsWidgetProps & {
  numberOfCards?: number;
  extraBadgesPerCard?: number;
};

const meta = {
  title: 'Widgets/News',
  component: NewsWidget,
  parameters: {
    controls: { expanded: true, sort: 'alpha' },
    docs: {
      description: {
        component:
          '**Stocks in the News** strip: optional `SectionHeader` + horizontal scroll of cards (badges, title, body, timestamp). Matches Stock Home. Use **`showBadges`** to hide chips. In **Playground**, **number of cards** grows the strip (demo cycles), and **extra badges per card** appends sample badges for overflow layouts.',
      },
    },
    actions: { argTypesRegex: '^on.*' },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: 376,
          padding: '0 0 24px',
          background: 'var(--surface-level-4)',
          boxSizing: 'border-box',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    title: 'Stocks in the News',
    showSectionHeader: true,
    sectionHeaderSize: 'large',
    showChevron: true,
    showBadges: true,
    items: NEWS_WIDGET_DEMO_ITEMS,
    className: '',
  } satisfies NewsWidgetProps,
  argTypes: {
    title: {
      description: 'Section heading when `showSectionHeader` is true.',
      control: 'text',
      table: { category: 'Header' },
    },
    showSectionHeader: {
      description: 'Show `SectionHeader` above the scroller.',
      control: 'boolean',
      table: { category: 'Header' },
    },
    sectionHeaderSize: {
      description: '`SectionHeader` size token.',
      control: 'inline-radio',
      options: [...SECTION_HEADER_SIZES],
      table: { category: 'Header' },
    },
    showChevron: {
      description: 'Chevron beside the section title.',
      control: 'boolean',
      table: { category: 'Header' },
    },
    showBadges: {
      description: 'Show badge chips on each card (when off, `items[].badges` are not rendered).',
      control: 'boolean',
      table: { category: 'Content' },
    },
    items: {
      description:
        'News cards (horizontal scroll). Each item: `title`, `badges[]` (`label`, `context`: positive | negative | notice | default), `body`, `time`.',
      control: 'object',
      table: { category: 'Content' },
    },
    className: {
      description: 'Optional class on the root `.nw` element.',
      control: 'text',
      table: { category: 'Layout' },
    },
    onCardAction: {
      description: 'Click handler for a card’s chevron (index passed).',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof NewsWidget>;

export default meta;

type Story = StoryObj<typeof NewsWidget>;

const singleItem: NewsWidgetItem[] = [
  {
    title: 'Zomato Profit Surge',
    badges: [{ label: 'Bullish', context: 'positive' }],
    body: 'Q3 profits jumped 200%. Analysts may upgrade the stock',
    time: '25 Jan, 10:12 AM',
  },
];

export const Playground: Story = {
  args: {
    numberOfCards: 2,
    extraBadgesPerCard: 0,
  } satisfies Partial<NewsWidgetStoryArgs>,
  argTypes: {
    numberOfCards: {
      name: 'numberOfCards',
      description:
        `How many cards to render (1–${MAX_NEWS_CARDS}). Cycles **NEWS_WIDGET_DEMO_ITEMS**; repeated cycles get a numbered title suffix.`,
      control: { type: 'range', min: 1, max: MAX_NEWS_CARDS, step: 1 },
      table: { category: 'Content' },
    },
    extraBadgesPerCard: {
      name: 'extraBadgesPerCard',
      description:
        'Appends this many extra badges (`Extra 1` …) on **every** card after demo badges — use to test wrap and many chips.',
      control: { type: 'range', min: 0, max: 5, step: 1 },
      table: { category: 'Content' },
    },
    items: { control: false, table: { disable: true } },
  },
  render: (args) => {
    const { numberOfCards, extraBadgesPerCard, items: _items, ...rest } =
      args as NewsWidgetStoryArgs;
    let items = itemsForCardCount(numberOfCards ?? 2);
    items = appendExtraBadgesPerCard(items, extraBadgesPerCard ?? 0);
    return (
      <NewsWidget
        {...rest}
        items={items}
        className={rest.className?.trim() ? rest.className : undefined}
      />
    );
  },
};

export const Default: Story = {
  args: {
    items: NEWS_WIDGET_DEMO_ITEMS,
  },
};

export const SingleCard: Story = {
  args: {
    items: singleItem,
  },
};

export const NoSectionHeader: Story = {
  args: {
    showSectionHeader: false,
    items: NEWS_WIDGET_DEMO_ITEMS,
  },
};

export const ThreeCards: Story = {
  args: {
    items: [
      ...NEWS_WIDGET_DEMO_ITEMS,
      {
        title: 'Reliance Industries',
        badges: [{ label: 'Bearish', context: 'negative' }],
        body: 'Consolidation near key support; watch volume on close.',
        time: '24 Jan, 4:30 PM',
      },
    ],
  },
};
