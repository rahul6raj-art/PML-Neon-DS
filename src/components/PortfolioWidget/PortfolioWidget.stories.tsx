import type { Meta, StoryObj } from '@storybook/react';
import type { AllocationBreakdownRow } from '../AllocationBreakdownWidget';
import {
  PortfolioWidget,
  PORTFOLIO_WIDGET_CHART_PATH_NEGATIVE,
  PORTFOLIO_WIDGET_CHART_PATH_POSITIVE,
  PORTFOLIO_WIDGET_RANGE_SNAPSHOTS_DEFAULT,
  type PortfolioWidgetProps,
} from './PortfolioWidget';

/** Same demo as **Widgets/Allocation breakdown** — segmented bar + legend under the portfolio chart. */
const PLAYGROUND_ALLOCATION_ROWS: AllocationBreakdownRow[] = [
  {
    label: 'Stocks',
    valueLabel: '₹8,00,694',
    percent: 58,
    changeLabel: '+2.40%',
    changeSentiment: 'positive',
  },
  {
    label: 'Mutual funds',
    valueLabel: '₹4,82,759',
    percent: 35,
    changeLabel: '-1.20%',
    changeSentiment: 'negative',
  },
  {
    label: 'Others',
    valueLabel: '₹2,06,896',
    percent: 15,
    changeLabel: '+0.80%',
    changeSentiment: 'positive',
  },
];

type PortfolioWidgetStoryArgs = PortfolioWidgetProps;

/** Docs page (replaces `PortfolioWidget.mdx` so Storybook indexing does not depend on a separate MDX graph). */
const PORTFOLIO_WIDGET_DOCS = `
**Portfolio summary** block from Stock Home: total value, period returns line, **\`GraphWidget\`**, time-range chips (\`Chip\` extra-small) **below** the chart, invested / overall returns, optional **\`AllocationBreakdownWidget\`** (same bar + legend as **Widgets/Allocation breakdown**), optional buying-power row, **eye toggle** (mask amounts; allocation rows mask too). Root class **\`.pw\`**.

## Playground

Use the **Playground** story below. Adjust **header**, **amounts**, **1D returns**, **Invested / Overall Returns**, **Show buying power card** (toggle off to hide the buying power block), **Show allocation card** (toggle off to hide **\`AllocationBreakdownWidget\`** without clearing \`allocationRows\`), **Allocation** rows (\`allocationRows\` — same segmented bar + legend as **Widgets/Allocation breakdown**; empty array also hides), and **Positive chart** (switches demo path + indicator to match gain vs loss). **Tap the eye** in the preview to mask or show amounts (digits become \`•\`, no commas or decimal points in the mask); the **chart stays visible**; **allocation row amounts and change lines** mask the same way. Open eye = amounts visible, slash eye = masked. Time-range chips use **\`Chip\` \`extra-small\`** and **\`space-between\`** alignment with **\`--card-padding-inline\`** inset — same as Stock Home.

## Structure

- **\`.pw\`** — root (\`max-width: var(--phone-column-width)\`).
- **\`.pw__chart\`** — wraps **\`GraphWidget\`**; \`chartKey\` follows selected range for line transitions.
- **Chips** — pass **\`activeRangeIndex\`** + **\`onRangeChange\`** for controlled selection, or **\`defaultActiveRangeIndex\`** for internal state. With **\`rangeByPeriod\`** (one snapshot per range label), the **returns** row and **chart** update from the selected chip; omit **\`rangeByPeriod\`** and drive **\`returnsValue\`** / **\`svgPath\`** yourself when the range changes.
- **\`.pw__allocation\`** — **\`AllocationBreakdownWidget\`** when **\`showAllocation\`** is true (default) and **\`allocationRows\`** is non-empty (\`margin-top: var(--spacing-56)\` from invested/returns).

## Privacy (eye)

- Internal state by default: **\`defaultValuesVisible\`** sets the first paint; tap toggles **\`eye_outline\`** (visible) vs **\`eye_slash_outline\`** (masked).
- **Controlled:** pass **\`valuesVisible\`** + **\`onValuesVisibilityChange\`** from the parent.
- **\`maskPortfolioDigits\`** turns digits into bullets and drops commas / decimal points; the graph is **not** hidden when masked.

## Chart paths

Exported **\`PORTFOLIO_WIDGET_CHART_PATH_POSITIVE\`** and **\`PORTFOLIO_WIDGET_CHART_PATH_NEGATIVE\`** use legacy **PortfolioHome** cubics (**\`LEGACY_PORTFOLIO_HOME_CHART_PATH_1D\`** / **\`…_6M\`**). Snapshots still carry **\`areaFillPath\`** from **\`legacyPortfolioHomeChartAreaFill\`** for symmetry; **\`GraphWidget\`** paints that soft fill **only for loss** by default (gains = blur + line). **\`chartIndicatorY\`** matches legacy (e.g. 32 vs 80).
`.trim();

const meta = {
  title: 'Widgets/Portfolio',
  component: PortfolioWidget,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true, sort: 'alpha' },
    docs: {
      description: {
        component: PORTFOLIO_WIDGET_DOCS,
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
    headerTitle: 'Total portfolio value',
    totalValue: '₹2,15,197',
    showEyeToggle: true,
    returnsLabel: '1D Returns:\u00a0',
    returnsValue: '+₹240.50 (2.40%)',
    chartPositive: true,
    rangeByPeriod: PORTFOLIO_WIDGET_RANGE_SNAPSHOTS_DEFAULT,
    chartAriaLabel: 'Portfolio value chart',
    investedLabel: 'Invested',
    investedAmount: '₹1,79,398',
    overallReturnsLabel: 'Overall Returns',
    overallReturnsValue: '+₹35,799 (28.28%)',
    showBuyingPower: true,
    buyingPowerLabel: 'Buying power',
    buyingPowerAmount: '₹15,450',
    addFundsLabel: 'Add Funds',
    defaultActiveRangeIndex: 0,
    defaultValuesVisible: true,
    showAllocation: true,
    allocationRows: PLAYGROUND_ALLOCATION_ROWS,
    allocationTitle: 'Allocations',
    className: '',
  } satisfies PortfolioWidgetProps,
  argTypes: {
    headerTitle: { description: 'Title above total value.', control: 'text', table: { category: 'Header' } },
    totalValue: { description: 'Main portfolio amount.', control: 'text', table: { category: 'Values' } },
    showEyeToggle: { description: 'Show eye visibility control.', control: 'boolean', table: { category: 'Header' } },
    defaultValuesVisible: {
      name: 'Initially show amounts',
      description:
        'Uncontrolled only: amounts visible on first mount. Tap the eye in the preview to mask; changing this control after load does not remount.',
      control: 'boolean',
      table: { category: 'Privacy' },
    },
    valuesVisible: {
      description: 'Controlled: set explicitly and update via `onValuesVisibilityChange` (omit for internal toggle).',
      control: false,
      table: { category: 'Privacy', disable: true },
    },
    onValuesVisibilityChange: { table: { category: 'Events' } },
    returnsLabel: { description: 'Prefix for 1D returns (include `\u00a0` after colon if needed).', control: 'text', table: { category: 'Returns' } },
    returnsValue: { description: '1D returns line (color is positive styling).', control: 'text', table: { category: 'Returns' } },
    chartPositive: {
      name: 'Positive chart',
      description: 'Gain curve vs loss curve; updates path and indicator Y to match demos.',
      control: 'boolean',
      table: { category: 'Chart' },
    },
    chartAriaLabel: { description: 'Accessible label for the chart.', control: 'text', table: { category: 'Chart' } },
    rangeByPeriod: {
      description:
        '**Per chip:** returns label/value + chart path + positive/negative. Same length/order as **`timeRanges`**. Default demo wires **1D → All**; remove to use flat **`returns*`** / **`svgPath`** for every chip.',
      control: 'object',
      table: { category: 'Chips' },
    },
    svgPath: { control: false, table: { disable: true } },
    chartIndicatorY: { control: false, table: { disable: true } },
    investedLabel: { control: 'text', table: { category: 'Values' } },
    investedAmount: { control: 'text', table: { category: 'Values' } },
    overallReturnsLabel: { control: 'text', table: { category: 'Values' } },
    overallReturnsValue: { control: 'text', table: { category: 'Values' } },
    showBuyingPower: {
      name: 'Show buying power card',
      description: 'When off, the buying power row (label, amount, Add Funds) is hidden.',
      control: 'boolean',
      table: { category: 'Buying power' },
    },
    buyingPowerLabel: {
      control: 'text',
      table: { category: 'Buying power' },
      if: { arg: 'showBuyingPower', eq: true },
    },
    buyingPowerAmount: {
      control: 'text',
      table: { category: 'Buying power' },
      if: { arg: 'showBuyingPower', eq: true },
    },
    addFundsLabel: {
      control: 'text',
      table: { category: 'Buying power' },
      if: { arg: 'showBuyingPower', eq: true },
    },
    timeRanges: { control: 'object', table: { category: 'Chips' } },
    activeRangeIndex: { description: 'Controlled selected chip index.', control: 'number', table: { category: 'Chips' } },
    defaultActiveRangeIndex: { description: 'Initial chip when uncontrolled.', control: 'number', table: { category: 'Chips' } },
    onEyePress: { table: { category: 'Events' } },
    onRangeChange: { table: { category: 'Events' } },
    onAddFundsPress: { table: { category: 'Events' } },
    showAllocation: {
      name: 'Show allocation card',
      description: 'When off, the allocation block is hidden; **`allocationRows`** can stay set (e.g. restore without retyping JSON).',
      control: 'boolean',
      table: { category: 'Allocation' },
    },
    allocationRows: {
      description: '**AllocationBreakdownWidget** rows (segmented bar + list). Empty array or omit to hide (unless **`showAllocation`** is already false).',
      control: 'object',
      table: { category: 'Allocation' },
    },
    allocationTitle: { control: 'text', table: { category: 'Allocation' } },
    allocationBarVisual: {
      control: 'inline-radio',
      options: ['figma-asset', 'proportional-css'],
      description:
        '**`figma-asset` (default)** = **1661:7516** (composite frame) when **4** rows, else **1649:7514** (widths from **`%`**). **`proportional-css`** = approximate rects by **`percent`**. Optional **`allocationBarAssetSrc`** for `<img>`.',
      table: { category: 'Allocation' },
    },
    allocationBarAssetSrc: {
      control: 'text',
      description: 'Optional `<img>` URL for `figma-asset` mode.',
      table: { category: 'Allocation' },
    },
    className: { description: 'Extra class on root `.pw`.', control: 'text', table: { category: 'Layout' } },
  },
} satisfies Meta<typeof PortfolioWidget>;

export default meta;

type Story = StoryObj<typeof PortfolioWidget>;

export const Playground: Story = {
  render: (args) => {
    const a = args as PortfolioWidgetStoryArgs;
    const { chartPositive, className, rangeByPeriod, ...rest } = a;
    const hasRange = Boolean(rangeByPeriod && rangeByPeriod.length > 0);
    const positive = chartPositive !== false;
    return (
      <PortfolioWidget
        {...rest}
        rangeByPeriod={rangeByPeriod}
        className={className?.trim() ? className : undefined}
        {...(!hasRange
          ? {
              chartPositive: positive,
              svgPath: positive ? PORTFOLIO_WIDGET_CHART_PATH_POSITIVE : PORTFOLIO_WIDGET_CHART_PATH_NEGATIVE,
              chartIndicatorY: positive ? 32 : 94,
            }
          : {})}
      />
    );
  },
};

export const Default: Story = {
  args: {},
};

export const WithoutBuyingPower: Story = {
  args: {
    showBuyingPower: false,
  },
};

/** Same portfolio block as Playground but allocation hidden (**`showAllocation: false`**; demo rows kept for controls). */
export const WithoutAllocation: Story = {
  args: {
    showAllocation: false,
    allocationRows: PLAYGROUND_ALLOCATION_ROWS,
  },
};

export const NoEyeToggle: Story = {
  args: {
    showEyeToggle: false,
  },
};

/** Opens with amounts masked (slash eye). Tap eye to reveal. */
export const StartsMasked: Story = {
  args: {
    defaultValuesVisible: false,
  },
};
