import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AllocationBreakdownWidget,
  type AllocationBreakdownRow,
} from './AllocationBreakdownWidget';

const demoRows: AllocationBreakdownRow[] = [
  { label: 'Equity', valueLabel: '₹5,22,608', percent: 62 },
  { label: 'Debt / liquid', valueLabel: '₹2,02,300', percent: 24 },
  { label: 'Gold / commodities', valueLabel: '₹75,862', percent: 9 },
  { label: 'Alternatives', valueLabel: '₹42,146', percent: 5 },
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
    title: 'Allocation',
    rows: demoRows,
  },
};

export const Loading: Story = {
  args: {
    title: 'Allocation',
    rows: demoRows,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    title: 'Allocation',
    rows: [],
    emptyMessage: 'Allocation will appear once you invest.',
  },
};
