import type { Meta, StoryObj } from '@storybook/react-vite';
import { STOCKS_CARD_DEFAULT_PROPS } from '../StocksCard';
import { HoldingsSectionWidget } from './HoldingsSectionWidget';

const meta = {
  title: 'Widgets/Holdings section',
  component: HoldingsSectionWidget,
  decorators: [
    (Story) => (
      <div style={{ width: 376, background: 'var(--surface-level-4)', paddingBlock: 16 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HoldingsSectionWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Top holdings',
    items: [
      STOCKS_CARD_DEFAULT_PROPS,
      {
        ...STOCKS_CARD_DEFAULT_PROPS,
        title: 'HDFC Bank Ltd.',
        changeLabel: '-8.10 (0.47%)',
        changeSentiment: 'negative',
      },
    ],
  },
};

export const Loading: Story = {
  args: {
    title: 'Top holdings',
    items: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    title: 'Top holdings',
    items: [],
    emptyMessage: 'You don’t have any stock holdings in this portfolio yet.',
    emptyCtaLabel: 'Discover stocks',
    onEmptyCtaClick: () => {},
  },
};
