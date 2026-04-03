import type { Meta, StoryObj } from '@storybook/react';
import { GraphWidget, type GraphWidgetProps } from './GraphWidget';

/** Sample paths — not exported: Storybook treats named exports in *.stories.tsx as stories. */
const DEMO_PATH_POSITIVE =
  'M 0 92 L 48 86 L 96 78 L 144 62 L 192 48 L 240 38 L 288 34 L 308 32 L 346 28';
const DEMO_PATH_NEGATIVE =
  'M 0 28 L 48 34 L 96 44 L 144 58 L 192 72 L 240 82 L 288 90 L 308 94 L 346 98';

const meta: Meta<typeof GraphWidget> = {
  title: 'Widgets/Graph Widget',
  component: GraphWidget,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 346, background: 'var(--surface-level-4, #1a1a1a)' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    svgPath: { control: 'text' },
    isPositive: { control: 'boolean' },
    indicatorY: { control: { type: 'range', min: 0, max: 116, step: 1 } },
  },
};

export default meta;

type Story = StoryObj<typeof GraphWidget>;

export const Positive: Story = {
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
