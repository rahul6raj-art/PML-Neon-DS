import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { WheelCarousel } from './WheelCarousel';

const discoverTabs = ['Index', 'Stocks', 'ETF'] as const;

/** Fallback tab labels when CSV is short (aligned with Heatmap extended wheel; max 7). */
const LABEL_FALLBACK = [
  'Index',
  'Stocks',
  'F&O',
  'Commodities',
  'ETF',
  'Crypto',
  'Debt',
] as const;

function buildItemsFromStory(csv: string, count: number): string[] {
  const parsed = csv.split(',').map((s) => s.trim()).filter(Boolean);
  const n = Math.min(7, Math.max(1, Math.floor(count)));
  const out: string[] = [];
  for (let i = 0; i < n; i++) {
    out.push(parsed[i] ?? LABEL_FALLBACK[i] ?? `Tab ${i + 1}`);
  }
  return out;
}

type WheelCarouselStoryArgs = ComponentProps<typeof WheelCarousel> & {
  /** Story-only: how many tab labels to show (1–7). */
  storyItemCount?: number;
  /** Story-only: comma-separated tab labels (rename); shorter lists are padded from fallbacks. */
  storyLabelsCsv?: string;
};

const meta: Meta<WheelCarouselStoryArgs> = {
  title: 'Components/Wheel Carousel',
  component: WheelCarousel,
  tags: ['autodocs'],
  argTypes: {
    storyItemCount: {
      name: 'Tab count',
      description: 'How many tabs appear (Default story only).',
      control: { type: 'range', min: 1, max: 7, step: 1 },
      table: { category: 'Story' },
    },
    storyLabelsCsv: {
      name: 'Tab labels (comma-separated)',
      description:
        'Rename tabs in order (Default story). Example: Index, Stocks, F&O. Fewer names than Tab count uses built-in fallbacks for the rest.',
      control: 'text',
      table: { category: 'Story' },
    },
    items: {
      description: 'Tab labels (scroll order). On Default, use Tab count + comma-separated labels instead.',
    },
    repeatCount: {
      control: { type: 'number', min: 11, max: 101, step: 2 },
    },
  },
  args: {
    repeatCount: 51,
    'aria-label': 'Discover segments',
  },
};

export default meta;
type Story = StoryObj<WheelCarouselStoryArgs>;

export const Default: Story = {
  parameters: {
    controls: { exclude: ['items'] },
  },
  args: {
    storyItemCount: 3,
    storyLabelsCsv: 'Index, Stocks, ETF',
    defaultValue: 'Stocks',
  },
  render: (args) => {
    const {
      storyItemCount = 3,
      storyLabelsCsv = '',
      items: _items,
      ...rest
    } = args;
    const items = buildItemsFromStory(storyLabelsCsv, storyItemCount);
    const defaultValue = items.includes(rest.defaultValue as string)
      ? rest.defaultValue
      : items[0];
    return (
      <WheelCarousel
        {...rest}
        items={items}
        defaultValue={defaultValue}
      />
    );
  },
};

export const DarkMode: Story = {
  parameters: {
    controls: { exclude: ['storyItemCount', 'storyLabelsCsv'] },
  },
  args: {
    items: [...discoverTabs],
    defaultValue: 'Stocks',
  },
};

export const Controlled: Story = {
  parameters: {
    controls: { exclude: ['storyItemCount', 'storyLabelsCsv'] },
  },
  args: {
    items: [...discoverTabs],
    defaultValue: 'Stocks',
  },
  render: function ControlledStory(args) {
    const { storyItemCount: _c, storyLabelsCsv: _l, ...wheelArgs } = args;
    const [value, setValue] = useState(wheelArgs.defaultValue ?? wheelArgs.items[0] ?? '');
    return (
      <div style={{ width: 'min(100%, 360px)' }}>
        <WheelCarousel
          {...wheelArgs}
          value={value}
          onChange={setValue}
        />
        <p
          style={{
            marginTop: 16,
            fontFamily: 'var(--font-family)',
            fontSize: 12,
            color: 'var(--text-neutral-medium)',
          }}
        >
          Selected: <strong style={{ color: 'var(--text-neutral-strong)' }}>{value}</strong>
        </p>
      </div>
    );
  },
};

export const TwoItems: Story = {
  parameters: {
    controls: { exclude: ['storyItemCount', 'storyLabelsCsv'] },
  },
  args: {
    items: ['Buy', 'Sell'],
    defaultValue: 'Buy',
  },
};
