import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AllocationBreakdownWidget,
  type AllocationBreakdownRow,
} from './AllocationBreakdownWidget';

/** Allocation block (1644:6023); default bar = **exact Figma** [1649:7514](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1649-7514&t=A2RU4TiZE7uPzzJc-4) vector (`figma-asset`). */
const demoRows: AllocationBreakdownRow[] = [
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

const meta = {
  title: 'Widgets/Allocation breakdown',
  component: AllocationBreakdownWidget,
  decorators: [
    (Story) => (
      <div style={{ width: 376, background: 'var(--surface-level-4)', paddingBlock: 16 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AllocationBreakdownWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Allocations',
    rows: demoRows,
  },
};

export const Loading: Story = {
  args: {
    title: 'Allocations',
    rows: demoRows,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    title: 'Allocations',
    rows: [],
    emptyMessage: 'Allocation will appear once you invest.',
  },
};

export const WithoutChangeLines: Story = {
  args: {
    title: 'Allocations',
    showRowTrend: false,
    rows: demoRows.map((r) => ({
      label: r.label,
      valueLabel: r.valueLabel,
      percent: r.percent,
    })),
  },
};

/** Four rows — [Figma **`1661:7516`**](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1661-7516&t=A2RU4TiZE7uPzzJc-4) composite bar + legend % from data. */
export const FourPartitions: Story = {
  args: {
    title: 'Allocations',
    rows: [
      { label: 'Equity', valueLabel: '₹4,10,000', percent: 45, changeLabel: '+1.1%', changeSentiment: 'positive' },
      { label: 'Debt', valueLabel: '₹2,05,000', percent: 25, changeLabel: '+0.2%', changeSentiment: 'positive' },
      { label: 'Gold', valueLabel: '₹82,000', percent: 12, changeLabel: '-0.4%', changeSentiment: 'negative' },
      { label: 'Cash', valueLabel: '₹48,000', percent: 8, changeLabel: '0%', changeSentiment: 'neutral' },
    ],
  },
};

/** Raw API percents (not forced to sum 100); bar still uses weight ratios. */
export const RawPercentLabels: Story = {
  args: {
    title: 'Allocations',
    normalizeBarPercents: false,
    rows: [
      { label: 'A', valueLabel: '₹1,00,000', percent: 40 },
      { label: 'B', valueLabel: '₹50,000', percent: 30 },
      { label: 'C', valueLabel: '₹25,000', percent: 20 },
    ],
  },
};
