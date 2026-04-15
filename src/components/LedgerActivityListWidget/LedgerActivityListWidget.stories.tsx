import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  LedgerActivityListWidget,
  type LedgerActivityItem,
} from './LedgerActivityListWidget';

const demoItems: LedgerActivityItem[] = [
  {
    primaryText: 'Bought · Reliance Industries Ltd.',
    secondaryText: '12 Apr 2026 · NSE',
    trailingText: '₹69,460',
  },
  {
    primaryText: 'SIP · Parag Parikh Flexi Cap Fund',
    secondaryText: '10 Apr 2026',
    trailingText: '₹15,000',
  },
];

const meta = {
  title: 'Widgets/Ledger activity list',
  component: LedgerActivityListWidget,
  decorators: [
    (Story) => (
      <div style={{ width: 376, background: 'var(--surface-level-4)', paddingBlock: 16 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LedgerActivityListWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Recent activity',
    items: demoItems,
  },
};

export const Loading: Story = {
  args: {
    title: 'Recent activity',
    items: demoItems,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    title: 'Recent activity',
    items: [],
    emptyMessage: 'No transactions in the last 90 days.',
  },
};

export const Unavailable: Story = {
  args: {
    title: 'Recent activity',
    items: [],
    unavailableMessage:
      'Recent activity is unavailable until you retry or the connection improves.',
  },
};
