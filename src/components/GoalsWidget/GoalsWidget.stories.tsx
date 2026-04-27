import type { Meta, StoryObj } from '@storybook/react';
import { GoalsWidget, type GoalsWidgetProps } from './GoalsWidget';

const meta: Meta<typeof GoalsWidget> = {
  title: 'Widgets/Goals',
  component: GoalsWidget,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Single **goal** card: **Body** title, **Subtext** status, optional **%** chip, **2px** bar + thumb, **Saved** / **Target**, optional **CTA** pair (**`Button`** **filled** + **tonal**). [Figma **1670:7540**](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1670-7540&t=A2RU4TiZE7uPzzJc-4), [CTAs **1671:7584**](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1671-7584&t=A2RU4TiZE7uPzzJc-4). **Controls** live on **GoalsWidget.mdx** (Playground).',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 376, background: 'var(--surface-level-4)', paddingBlock: 24 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    goalTitle: {
      description: 'Goal name (**Body** medium).',
      control: 'text',
      table: { category: 'Content' },
    },
    statusLabel: {
      description: 'Status line (**Subtext**).',
      control: 'text',
      table: { category: 'Content' },
    },
    statusTone: {
      description:
        'Drives status colour, **%** chip surface, and bar gradient (**notice** / **negative** → loss treatment).',
      control: 'select',
      options: ['positive', 'notice', 'negative', 'neutral'],
      table: { category: 'Content' },
    },
    trailingBadge: {
      description: 'Trailing **%** chip (e.g. **13.6%**). Empty string hides.',
      control: 'text',
      table: { category: 'Content' },
    },
    savedDisplay: {
      description: 'Saved amount string (parent formats INR).',
      control: 'text',
      table: { category: 'Content' },
    },
    targetDisplay: {
      description: 'Target string (parent formats).',
      control: 'text',
      table: { category: 'Content' },
    },
    progressPercent: {
      description: 'Progress **0–100** (bar fill + thumb).',
      control: { type: 'range', min: 0, max: 100, step: 1 },
      table: { category: 'Progress' },
    },
    sectionTitle: {
      description: '`SectionHeader` title when header is shown.',
      control: 'text',
      table: { category: 'Section' },
    },
    showSectionHeader: {
      description: 'Show **`SectionHeader`** above the card.',
      control: 'boolean',
      table: { category: 'Section' },
    },
    sectionHeaderSize: {
      description: 'Passed to **`SectionHeader`**.',
      control: 'select',
      options: ['extra-large', 'large', 'medium', 'small'],
      table: { category: 'Section' },
    },
    showChevron: {
      description: 'Chevron on **`SectionHeader`**.',
      control: 'boolean',
      table: { category: 'Section' },
    },
    primaryCtaLabel: {
      description: 'Primary CTA label (**`Button`** **filled** **medium**). Empty hides.',
      control: 'text',
      table: { category: 'CTA' },
    },
    secondaryCtaLabel: {
      description: 'Secondary CTA label (**`Button`** **tonal** **medium**). Empty hides.',
      control: 'text',
      table: { category: 'CTA' },
    },
    onCardPress: { table: { disable: true } },
    onPrimaryCtaPress: { table: { disable: true } },
    onSecondaryCtaPress: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof GoalsWidget>;

const playgroundArgs = {
  goalTitle: 'Long Term Wealth',
  statusLabel: 'On track',
  statusTone: 'positive' as const,
  trailingBadge: '13.6%',
  progressPercent: 35,
  savedDisplay: '1.5L',
  targetDisplay: '10L',
  sectionTitle: 'Goals',
  showSectionHeader: true,
  sectionHeaderSize: 'extra-large' as const,
  showChevron: true,
  primaryCtaLabel: 'Add Money',
  secondaryCtaLabel: 'View Goals',
} satisfies GoalsWidgetProps;

/** All props are tunable from **GoalsWidget.mdx** via **Controls**. */
export const Playground: Story = {
  args: playgroundArgs,
  render: (args) => (
    <GoalsWidget
      {...args}
      onPrimaryCtaPress={
        args.primaryCtaLabel?.trim() ? () => undefined : undefined
      }
      onSecondaryCtaPress={
        args.secondaryCtaLabel?.trim() ? () => undefined : undefined
      }
    />
  ),
};

export const Default: Story = {
  args: {
    goalTitle: 'Long Term Wealth',
    statusLabel: 'On track',
    statusTone: 'positive',
    trailingBadge: '13.6%',
    progressPercent: 35,
    savedDisplay: '1.5L',
    targetDisplay: '10L',
  } satisfies GoalsWidgetProps,
};

export const Behind: Story = {
  name: 'Behind schedule',
  args: {
    ...Default.args,
    statusLabel: 'Behind schedule',
    statusTone: 'notice',
    trailingBadge: '8.2%',
    progressPercent: 18,
    savedDisplay: '80,000',
    targetDisplay: '10L',
  } satisfies GoalsWidgetProps,
};

export const NoSectionHeader: Story = {
  args: {
    ...Default.args,
    showSectionHeader: false,
  } satisfies GoalsWidgetProps,
};

export const PressableCard: Story = {
  args: {
    ...Default.args,
    onCardPress: () => {
      // Storybook action would go here; keep no-op for a11y demo
    },
  } satisfies GoalsWidgetProps,
};

/** [Figma **1671:7584**](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1671-7584&t=A2RU4TiZE7uPzzJc-4) — **Add Money** + **View Goals**. */
export const WithCtas: Story = {
  args: {
    ...Default.args,
    primaryCtaLabel: 'Add Money',
    onPrimaryCtaPress: () => undefined,
    secondaryCtaLabel: 'View Goals',
    onSecondaryCtaPress: () => undefined,
  } satisfies GoalsWidgetProps,
};
