import type { Meta, StoryObj } from '@storybook/react';
import { MostPopularWidget } from './MostPopularWidget';

const meta = {
  title: 'Widgets/MostPopularWidget',
  component: MostPopularWidget,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div
        data-theme="dark"
        style={{
          background: '#000000',
          padding: 24,
          minHeight: '100vh',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ width: 376, maxWidth: '100%' }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof MostPopularWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

/** Title row is a focusable control (e.g. navigate to full “most popular” screen). */
export const ClickableTitle: Story = {
  args: {
    onTitleClick: () => {},
  },
};
