import type { Meta, StoryObj } from '@storybook/react';
import { STOCKS_TILES_WIDGET_DEMO_ITEMS } from './demoData';
import { StocksTilesWidget } from './StocksTilesWidget';
import type { StocksTilesItem, StocksTilesWidgetProps } from './types';
import type { SectionHeaderSize } from '../SectionHeader';

/** Storybook-only: **Playground** controls; not passed to the widget. */
type StocksTilesWidgetPlaygroundArgs = StocksTilesWidgetProps & {
  storyPressableTiles?: boolean;
};

const SECTION_HEADER_SIZES: SectionHeaderSize[] = [
  'extra-large',
  'large',
  'medium',
  'small',
];

const meta = {
  title: 'Widgets/Stocks tiles',
  component: StocksTilesWidget,
  parameters: {
    controls: { expanded: true, sort: 'alpha' },
    docs: {
      description: {
        component:
          'Horizontal **stock tiles**: optional **`SectionHeader`** (chevron **off** by default), scrollable tiles with optional **top** **`Icon`** / **`Logo`**, status **Badge**, **title**, **price**, move as **Badge** or text. Toggle **`showTopMedia`** to show or hide the top brand row. [Figma — Stocks Tiles](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1614-5966).',
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
    title: 'Stocks tiles',
    showSectionHeader: false,
    sectionHeaderSize: 'extra-large',
    showChevron: false,
    items: STOCKS_TILES_WIDGET_DEMO_ITEMS,
    changeAsBadge: false,
    showStatusBadges: false,
    showTopMedia: false,
    className: '',
    onTilePress: undefined,
  } satisfies StocksTilesWidgetProps,
  argTypes: {
    title: {
      description: 'Section title when `showSectionHeader` is true.',
      control: 'text',
      table: { category: 'Header' },
    },
    showSectionHeader: {
      description: 'Show **SectionHeader** above the strip.',
      control: 'boolean',
      table: { category: 'Header' },
    },
    sectionHeaderSize: {
      description: '**SectionHeader** size.',
      control: 'select',
      options: SECTION_HEADER_SIZES,
      table: { category: 'Header' },
    },
    showChevron: {
      description: 'Chevron on the section title.',
      control: 'boolean',
      table: { category: 'Header' },
    },
    changeAsBadge: {
      name: 'Change as Badge',
      description:
        'When true, tiles use a muted **Badge** for the move unless a tile sets **`changeAsBadge`** itself.',
      control: 'boolean',
      table: { category: 'Tiles' },
    },
    showStatusBadges: {
      name: 'Show status badges',
      description: 'When false, **`statusBadgeLabel`** is hidden on every tile.',
      control: 'boolean',
      table: { category: 'Tiles' },
    },
    showTopMedia: {
      name: 'Show top icon / logo',
      description:
        'When **true**, each tile shows the **top** **`Icon`**, **`Logo`**, or custom **`leading`** slot when the item supplies media. When **false**, the top row is hidden for every tile.',
      control: 'boolean',
      table: { category: 'Tiles' },
    },
    items: {
      description:
        'Tile data: **`title`**, **`price`**, **`changeLabel`** + **`changeSentiment`** (if **`changeLabel`** is empty after trim, the change row is hidden); optional **`statusBadgeLabel`**; top slot: **`leading`**, **`leadingLogoName`** + **`leadingLogoCategory`**, or **`leadingIconName`** (logo wins over icon). Per-tile **`showTopMedia`: false** hides media for that row. **`changeAsBadge`** overrides the widget when set on a tile.',
      control: 'object',
      table: { category: 'Tiles' },
    },
    onTilePress: {
      description: 'When set, each tile is a **button** and receives the tile index.',
      table: { category: 'Events' },
    },
    className: { control: 'text', table: { category: 'Layout' } },
  },
} satisfies Meta<typeof StocksTilesWidget>;

export default meta;
type Story = StoryObj<typeof StocksTilesWidget>;

export const Playground: StoryObj<StocksTilesWidgetPlaygroundArgs> = {
  args: {
    storyPressableTiles: false,
  },
  argTypes: {
    storyPressableTiles: {
      name: 'Pressable tiles',
      description:
        'When on, each tile is a **button** with a stub handler (tap target + focus ring). When off, tiles are static **div**s unless you set **`onTilePress`** via the object control.',
      control: 'boolean',
      table: { category: 'Tiles' },
    },
  },
  render: (args) => {
    const { storyPressableTiles, onTilePress, ...rest } =
      args as StocksTilesWidgetPlaygroundArgs;
    return (
      <StocksTilesWidget
        {...rest}
        onTilePress={
          storyPressableTiles ? () => {} : onTilePress
        }
      />
    );
  },
};

/** Moves as Badges + status + top icon / logo (default demo data). */
export const WithBadgesAndTopMedia: Story = {
  args: {
    showSectionHeader: true,
    showChevron: true,
    items: STOCKS_TILES_WIDGET_DEMO_ITEMS,
    changeAsBadge: true,
    showStatusBadges: true,
    showTopMedia: true,
  },
};

/** Coloured subtext for change (no Badge); keeps status + top media. */
export const TextMoves: Story = {
  args: {
    title: 'Text moves',
    showSectionHeader: true,
    showChevron: true,
    changeAsBadge: false,
    showStatusBadges: true,
    showTopMedia: true,
    items: STOCKS_TILES_WIDGET_DEMO_ITEMS.map((it) => ({
      ...it,
      changeAsBadge: false,
    })),
  },
};

/** No status row; top media still from items. */
export const StatusBadgesOff: Story = {
  args: {
    title: 'No status badges',
    showSectionHeader: true,
    showChevron: true,
    changeAsBadge: true,
    showTopMedia: true,
    showStatusBadges: false,
    items: STOCKS_TILES_WIDGET_DEMO_ITEMS.map((it) => ({
      ...it,
      statusBadgeLabel: undefined,
      statusBadgeContext: undefined,
    })),
  },
};

/** Top icon / logo row off (widget-level). */
export const TopMediaOff: Story = {
  args: {
    title: 'No top media',
    showSectionHeader: true,
    showChevron: true,
    changeAsBadge: true,
    showStatusBadges: true,
    showTopMedia: false,
  },
};

/** Strip only — no section header. */
export const NoSectionHeader: Story = {
  args: {
    showSectionHeader: false,
    showChevron: false,
    changeAsBadge: true,
    showStatusBadges: true,
    showTopMedia: true,
    items: STOCKS_TILES_WIDGET_DEMO_ITEMS,
  },
};

const PRESS_DEMO: StocksTilesItem[] = [
  {
    title: 'State Bank of India',
    price: '₹812.40',
    changeLabel: '2.10%',
    changeSentiment: 'positive',
    leadingIconName: 'rupee',
  },
  {
    title: 'Wipro Ltd',
    price: '₹298.15',
    changeLabel: '0.55%',
    changeSentiment: 'negative',
    leadingIconName: 'chart',
  },
];

export const PressableTiles: Story = {
  args: {
    title: 'Tap a tile',
    showSectionHeader: true,
    showChevron: true,
    changeAsBadge: true,
    showStatusBadges: false,
    showTopMedia: true,
    items: PRESS_DEMO,
    onTilePress: () => {},
  },
};
