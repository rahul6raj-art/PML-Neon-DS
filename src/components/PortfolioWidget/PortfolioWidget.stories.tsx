import type { Meta, StoryObj } from '@storybook/react';
import {
  PortfolioWidget,
  PORTFOLIO_WIDGET_CHART_PATH_NEGATIVE,
  PORTFOLIO_WIDGET_CHART_PATH_POSITIVE,
  type PortfolioWidgetProps,
} from './PortfolioWidget';

type PortfolioWidgetStoryArgs = PortfolioWidgetProps;

const meta = {
  title: 'Widgets/Portfolio',
  component: PortfolioWidget,
  parameters: {
    layout: 'centered',
    controls: { expanded: true, sort: 'alpha' },
    docs: {
      description: {
        component:
          '**Portfolio summary** block from Stock Home: total value, 1D returns, **`GraphWidget`** chart, time-range chips (`Chip` extra-small), invested / overall returns, optional buying-power row, **eye toggle** (mask amounts + blur chart). Root class **`.pw`**. See **PortfolioWidget.mdx**.',
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
    className: { description: 'Extra class on root `.pw`.', control: 'text', table: { category: 'Layout' } },
  },
} satisfies Meta<typeof PortfolioWidget>;

export default meta;

type Story = StoryObj<typeof PortfolioWidget>;

export const Playground: Story = {
  render: (args) => {
    const { chartPositive, svgPath: _svg, chartIndicatorY: _y, ...rest } = args as PortfolioWidgetStoryArgs;
    const positive = chartPositive !== false;
    return (
      <PortfolioWidget
        {...rest}
        chartPositive={positive}
        svgPath={positive ? PORTFOLIO_WIDGET_CHART_PATH_POSITIVE : PORTFOLIO_WIDGET_CHART_PATH_NEGATIVE}
        chartIndicatorY={positive ? 32 : 94}
        className={rest.className?.trim() ? rest.className : undefined}
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
