import type { Meta, StoryObj } from '@storybook/react';
import { GraphWidget, type GraphWidgetProps } from './GraphWidget';
import {
  LEGACY_PORTFOLIO_HOME_CHART_PATH_1D,
  LEGACY_PORTFOLIO_HOME_CHART_PATH_6M,
  legacyPortfolioHomeChartAreaFill,
} from './legacyPortfolioHomeChartPaths';

const DEMO_PATH_POSITIVE = LEGACY_PORTFOLIO_HOME_CHART_PATH_1D;
const DEMO_AREA_POSITIVE = legacyPortfolioHomeChartAreaFill(DEMO_PATH_POSITIVE);

const DEMO_PATH_NEGATIVE = LEGACY_PORTFOLIO_HOME_CHART_PATH_6M;
const DEMO_AREA_NEGATIVE = legacyPortfolioHomeChartAreaFill(DEMO_PATH_NEGATIVE);

const meta: Meta<typeof GraphWidget> = {
  title: 'Widgets/Graph',
  component: GraphWidget,
  parameters: {
    docs: {
      description: {
        component:
          'Portfolio-style **performance chart**: optional gradient + glow line, ripple pulse, and inner dot — **PML tokens**. Demos use the same **cubic** paths as legacy **PortfolioHome** (**Playground** / **Positive return** + **Appearance**). See **GraphWidget.mdx**.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 346, background: 'var(--surface-level-4, #1a1a1a)' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    svgPath: {
      description:
        'SVG path d for the stroke (demos: legacy PortfolioHome cubics, M+C); must end at the ripple coordinates.',
      control: 'text',
    },
    areaFillPath: {
      description:
        'Optional closed path d under the line (demos: legacyPortfolioHomeChartAreaFill / closeAreaUnderOpenChartPath). Shown only when **showAreaFill** is true or chart is **loss** (default).',
      control: false,
      table: { disable: true },
    },
    showAreaFill: {
      description:
        'Paint **areaFillPath**. Default **off** for gains (blur + line only), **on** for losses. Set **true** to show the soft fill on a gain chart.',
      control: 'boolean',
      table: { category: 'Appearance' },
    },
    isPositive: {
      name: 'Positive return',
      description:
        'Gain (teal/green gradients) vs loss (orange/red). Drives line glow and ripple color.',
      control: 'boolean',
    },
    indicatorY: {
      description: 'Ripple vertical position in viewBox units (0 = top).',
      control: { type: 'range', min: 0, max: 116, step: 1 },
    },
    showGradient: {
      name: 'Gradient + glow',
      description:
        'Horizontal gradient stroke and blurred glow layers. Off = single solid line (token `--gw-line-3`).',
      control: 'boolean',
      table: { category: 'Appearance' },
    },
    showRipple: {
      name: 'Ripple (pulse)',
      description: 'Outer animated pulse ring at the endpoint.',
      control: 'boolean',
      table: { category: 'Appearance' },
    },
    showDot: {
      name: 'Dot (inner ring + center)',
      description: 'Inner ring and center dot at the endpoint.',
      control: 'boolean',
      table: { category: 'Appearance' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof GraphWidget>;

/** Interactive: toggle **Positive return** to preview gain vs loss (path + indicator update). */
export const Playground: Story = {
  args: {
    isPositive: true,
    svgPath: DEMO_PATH_POSITIVE,
    areaFillPath: DEMO_AREA_POSITIVE,
    indicatorY: 32,
    showGradient: true,
    showRipple: true,
    showDot: true,
  } satisfies GraphWidgetProps,
  argTypes: {
    svgPath: { control: false, table: { disable: true } },
    areaFillPath: { control: false, table: { disable: true } },
    indicatorY: { control: false, table: { disable: true } },
  },
  render: (args) => (
    <GraphWidget
      {...args}
      svgPath={args.isPositive ? DEMO_PATH_POSITIVE : DEMO_PATH_NEGATIVE}
      areaFillPath={args.isPositive ? DEMO_AREA_POSITIVE : DEMO_AREA_NEGATIVE}
      indicatorY={args.isPositive ? 32 : 80}
      isPositive={args.isPositive}
    />
  ),
};

/**
 * Export name must stay `GraphDemoPathPositive` so the story id remains
 * `widgets-graph-widget--graph-demo-path-positive` (old bookmarks / default URLs).
 * Display name in the sidebar is overridden to "Positive".
 */
export const GraphDemoPathPositive: Story = {
  name: 'Positive',
  args: {
    svgPath: DEMO_PATH_POSITIVE,
    areaFillPath: DEMO_AREA_POSITIVE,
    isPositive: true,
    indicatorY: 32,
  } satisfies GraphWidgetProps,
};

export const Negative: Story = {
  args: {
    svgPath: DEMO_PATH_NEGATIVE,
    areaFillPath: DEMO_AREA_NEGATIVE,
    isPositive: false,
    indicatorY: 80,
  } satisfies GraphWidgetProps,
};
