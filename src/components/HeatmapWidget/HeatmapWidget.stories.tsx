import type { Meta, StoryObj } from '@storybook/react';
import {
  HeatmapWidget,
  HEATMAP_DEFAULT_SECTORS_BY_WHEEL,
  HEATMAP_EXTENDED_WHEEL_ORDER,
  HEATMAP_STOCKS_SECTORS,
  type HeatmapWidgetProps,
} from './HeatmapWidget';

/**
 * Story-only controls (Default story): same pattern as Wheel Carousel — tab count + comma-separated labels.
 * `wheelCanonicalTabOrder` is set so Index/F&O mosaic height still applies when labels are renamed.
 */
type HeatmapStoryArgs = HeatmapWidgetProps & {
  storyItemCount?: number;
  storyLabelsCsv?: string;
};

function parseCsv(csv: string): string[] {
  return csv.split(',').map((s) => s.trim()).filter(Boolean);
}

function buildHeatmapDefaultStoryWheel(
  storyItemCount: number,
  storyLabelsCsv: string,
  defaultCanonical: string
) {
  const count = Math.min(7, Math.max(1, Math.floor(storyItemCount)));
  const keys = HEATMAP_EXTENDED_WHEEL_ORDER.slice(0, count);
  const parsed = parseCsv(storyLabelsCsv);
  const wheelItems = keys.map((k, i) => parsed[i] ?? k);
  const sectorsByWheel = Object.fromEntries(
    keys.map((k, i) => [wheelItems[i], HEATMAP_DEFAULT_SECTORS_BY_WHEEL[k] ?? []])
  );
  const idxDefault = HEATMAP_EXTENDED_WHEEL_ORDER.indexOf(
    defaultCanonical as (typeof HEATMAP_EXTENDED_WHEEL_ORDER)[number]
  );
  const defaultWheelValue =
    idxDefault >= 0 && idxDefault < wheelItems.length
      ? wheelItems[idxDefault]
      : wheelItems[0];
  return {
    wheelItems,
    sectorsByWheel,
    wheelCanonicalTabOrder: [...keys],
    defaultWheelValue,
  };
}

const maxStripCards = Math.max(
  1,
  ...HEATMAP_EXTENDED_WHEEL_ORDER.map(
    (k) => (HEATMAP_DEFAULT_SECTORS_BY_WHEEL[k] ?? []).length
  )
);

const meta: Meta<HeatmapStoryArgs> = {
  title: 'Widgets/Heatmap',
  component: HeatmapWidget,
  parameters: {
    docs: {
      description: {
        component:
          'Sector heatmap strip: **SectionHeader** title, **WheelCarousel**, and a horizontal strip of sector cards. Default data supports up to **7** wheel tabs (Index → … → Debt). `sectorsByWheel` keys must match `wheelItems`. Index and F&O use a taller mosaic than Stocks. On **Default**, use **Tab count** and **comma-separated labels**. See **HeatmapWidget.mdx**.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: 376,
          background: 'var(--surface-level-4)',
          alignSelf: 'flex-start',
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    storyItemCount: {
      name: 'Tab count',
      description:
        'How many wheel tabs (1 = Index only … 7 = full set through Debt). Default story only.',
      control: { type: 'range', min: 1, max: 7, step: 1 },
      table: { category: 'Story' },
    },
    storyLabelsCsv: {
      name: 'Tab labels (comma-separated)',
      description:
        'Rename wheel tabs in order (Default). Fewer names than Tab count uses canonical names: Index, Stocks, F&O, Commodities, ETF, Crypto, Debt.',
      control: 'text',
      table: { category: 'Story' },
    },
    defaultWheelValue: {
      description:
        'Canonical initial tab (mapped to the label at that position when labels are renamed).',
      control: 'select',
      options: [...HEATMAP_EXTENDED_WHEEL_ORDER],
    },
    maxSectorCards: {
      name: 'Sector cards (strip)',
      description: 'Caps how many sector cards show in the horizontal strip for the active tab.',
      control: { type: 'range', min: 1, max: maxStripCards, step: 1 },
    },
    wheelRepeatCount: {
      name: 'Wheel repeat count',
      description:
        'Passed to WheelCarousel as `repeatCount`: repetitions of the tab set in the infinite track (odd values recommended; default 51).',
      control: { type: 'number', min: 3, max: 101, step: 2 },
    },
    wheelItems: { table: { disable: true } },
    sectorsByWheel: { table: { disable: true } },
    wheelCanonicalTabOrder: { table: { disable: true } },
    sectors: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<HeatmapStoryArgs>;

export const Default: Story = {
  parameters: {
    controls: {
      exclude: ['wheelItems', 'sectorsByWheel', 'wheelCanonicalTabOrder'],
    },
  },
  args: {
    storyItemCount: 3,
    storyLabelsCsv: 'Index, Stocks, F&O',
    maxSectorCards: Math.min(8, maxStripCards),
    wheelRepeatCount: 51,
    defaultWheelValue: 'Stocks',
  },
  render: (args) => {
    const {
      storyItemCount = 3,
      storyLabelsCsv = '',
      defaultWheelValue = 'Stocks',
      wheelItems: _wi,
      sectorsByWheel: _sb,
      wheelCanonicalTabOrder: _wc,
      ...rest
    } = args;
    const built = buildHeatmapDefaultStoryWheel(
      storyItemCount,
      storyLabelsCsv,
      String(defaultWheelValue)
    );
    return (
      <HeatmapWidget
        {...rest}
        wheelItems={built.wheelItems}
        sectorsByWheel={built.sectorsByWheel}
        wheelCanonicalTabOrder={built.wheelCanonicalTabOrder}
        defaultWheelValue={built.defaultWheelValue}
      />
    );
  },
};

export const NoHeader: Story = {
  parameters: {
    controls: { exclude: ['storyItemCount', 'storyLabelsCsv'] },
  },
  args: {
    showHeader: false,
  },
};

export const TitleClickable: Story = {
  parameters: {
    controls: { exclude: ['storyItemCount', 'storyLabelsCsv'] },
  },
  args: {
    onTitleClick: () => {},
  },
};

/** Pins the strip; wheel still scrolls but does not swap data. */
export const StaticSectorList: Story = {
  parameters: {
    controls: { exclude: ['storyItemCount', 'storyLabelsCsv'] },
  },
  args: {
    sectors: HEATMAP_STOCKS_SECTORS.slice(0, 2),
  },
};
