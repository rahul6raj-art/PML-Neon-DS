import type { Meta, StoryObj } from '@storybook/react';
import { GraphWidget, type GraphWidgetProps } from './GraphWidget';

/** Sample paths — not exported: Storybook treats named exports in *.stories.tsx as stories. */
/** Ends at (308, 32) — same as default indicator (ripple); no segment past the ripple. */
const DEMO_PATH_POSITIVE =
  'M 0 92 L 48 86 L 96 78 L 144 62 L 192 48 L 240 38 L 288 34 L 308 32';
/** Ends at (308, 94) — matches Negative story indicatorY. */
const DEMO_PATH_NEGATIVE =
  'M 0 28 L 48 34 L 96 44 L 144 58 L 192 72 L 240 82 L 288 90 L 308 94';

const meta: Meta<typeof GraphWidget> = {
  title: 'Widgets/Graph',
  component: GraphWidget,
  parameters: {
    docs: {
      description: {
        component:
          'Portfolio-style **performance chart**: optional gradient + glow line, ripple pulse, and inner dot — all **PML tokens**. **Playground** exposes **Positive return** plus **Appearance** toggles (gradient, ripple, dot). See **GraphWidget.mdx**.',
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
      description: 'SVG `d` in viewBox space; must end at the ripple coordinates.',
      control: 'text',
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
    indicatorY: 32,
    showGradient: true,
    showRipple: true,
    showDot: true,
  } satisfies GraphWidgetProps,
  argTypes: {
    svgPath: { control: false, table: { disable: true } },
    indicatorY: { control: false, table: { disable: true } },
  },
  render: (args) => (
    <GraphWidget
      {...args}
      svgPath={args.isPositive ? DEMO_PATH_POSITIVE : DEMO_PATH_NEGATIVE}
      indicatorY={args.isPositive ? 32 : 94}
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
    isPositive: true,
    indicatorY: 32,
  } satisfies GraphWidgetProps,
};

export const Negative: Story = {
  args: {
    svgPath: DEMO_PATH_NEGATIVE,
    isPositive: false,
    indicatorY: 94,
  } satisfies GraphWidgetProps,
};
