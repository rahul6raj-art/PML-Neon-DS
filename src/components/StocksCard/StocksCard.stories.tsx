import type { Meta, StoryObj } from '@storybook/react';
import type { AvatarType, AvatarSize, AvatarIcon } from '../Avatar';
import type { ButtonType, ButtonSize } from '../Button';
import { iconNames } from '../Icon';
import type { LogoCategory } from '../Logo';
import {
  MUTUAL_FUND_NAMES,
  PAYMENT_NAMES,
  BANK_NAMES,
  STOCK_NAMES,
  INDEX_NAMES,
} from '../Logo/logoNames';
import {
  STOCKS_CARD_DEFAULT_PROPS,
  STOCKS_CARD_MTF_DEFAULT_PROPS,
} from './StocksCard.data';
import { StocksCard, type StocksCardProps } from './StocksCard';
import type { ListItemTrailing } from '../ListItem';

const ALL_LOGO_NAMES = [
  ...MUTUAL_FUND_NAMES,
  ...PAYMENT_NAMES,
  ...BANK_NAMES,
  ...STOCK_NAMES,
  ...INDEX_NAMES,
];

const ICON_OPTIONS = iconNames.reduce<Record<string, string>>(
  (acc, name) => {
    acc[name] = name;
    return acc;
  },
  { '(none)': '' },
);

/** Story-only: toggles `statusLabel` visibility in Playground. */
type StocksCardStoryArgs = StocksCardProps & {
  showStatusBadge?: boolean;
};

const meta = {
  title: 'Widgets/Stocks Card',
  component: StocksCard,
  parameters: {
    docs: {
      description: {
        component:
          'Holdings card: optional status badge, name, qty + avg, price + change. **layout: mtf** adds the return-on-margin footer. Uses **Card**, **Badge**, **Icon**, **ListItem**. See **StocksCard.mdx**.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: 'var(--phone-column-width)',
          padding: 'var(--spacing-24) var(--spacing-16)',
          background: 'var(--surface-level-4)',
          boxSizing: 'border-box',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    ...STOCKS_CARD_DEFAULT_PROPS,
    showLeading: false,
    showTrailing: false,
    trailing: 'icon',
  } satisfies StocksCardProps,
  argTypes: {
    layout: {
      control: 'inline-radio',
      options: ['standard', 'mtf'],
      description: '**mtf** — MTF badge + return-on-margin footer strip.',
      table: { defaultValue: { summary: 'standard' }, category: 'Layout' },
    },
    statusBadgeTone: {
      control: 'inline-radio',
      options: ['notice', 'primary'],
      description: 'Override badge colour (defaults: standard → notice, MTF → primary).',
      table: { category: 'Layout' },
    },
    statusLabel: { control: 'text', table: { category: 'Content' } },
    title: { control: 'text', table: { category: 'Content' } },
    quantity: { control: 'text', table: { category: 'Content' } },
    avgPriceLabel: { control: 'text', table: { category: 'Content' } },
    price: { control: 'text', table: { category: 'Content' } },
    changeLabel: { control: 'text', table: { category: 'Content' } },
    changeSentiment: {
      control: 'inline-radio',
      options: ['positive', 'negative', 'neutral'],
      table: { category: 'Content' },
    },
    quantityIconName: { control: 'text', table: { category: 'Content' } },
    marginFooterLabel: {
      control: 'text',
      table: { category: 'MTF footer' },
      if: { arg: 'layout', eq: 'mtf' },
    },
    marginReturnLabel: {
      control: 'text',
      table: { category: 'MTF footer' },
      if: { arg: 'layout', eq: 'mtf' },
    },
    marginMultiplierLabel: {
      control: 'text',
      table: { category: 'MTF footer' },
      if: { arg: 'layout', eq: 'mtf' },
    },
    marginFooterIconName: {
      control: 'text',
      table: { category: 'MTF footer' },
      if: { arg: 'layout', eq: 'mtf' },
    },
    marginReturnSentiment: {
      control: 'inline-radio',
      options: ['positive', 'negative', 'neutral'],
      description: 'Colours the return % in the footer (defaults to **changeSentiment**).',
      table: { category: 'MTF footer' },
      if: { arg: 'layout', eq: 'mtf' },
    },
    showLeading: {
      control: 'boolean',
      description: 'Show **ListItem** leading avatar (same API as default list row).',
      table: { defaultValue: { summary: 'false' }, category: 'Leading (Avatar)' },
    },
    avatarType: {
      control: 'inline-radio',
      options: ['profile', 'initials', 'logo', 'icon'] as AvatarType[],
      table: { defaultValue: { summary: 'initials' }, category: 'Leading (Avatar)' },
      if: { arg: 'showLeading', truthy: true },
    },
    avatarSize: {
      control: 'inline-radio',
      options: ['small', 'regular', 'large', 'extraLarge'] as AvatarSize[],
      table: { defaultValue: { summary: 'regular' }, category: 'Leading (Avatar)' },
      if: { arg: 'showLeading', truthy: true },
    },
    avatarBadgeType: {
      control: 'inline-radio',
      options: ['none', 'status', 'action'] as AvatarIcon[],
      table: { defaultValue: { summary: 'none' }, category: 'Leading (Avatar)' },
      if: { arg: 'showLeading', truthy: true },
    },
    avatarSelected: {
      control: 'boolean',
      table: { defaultValue: { summary: 'false' }, category: 'Leading (Avatar)' },
      if: { arg: 'showLeading', truthy: true },
    },
    avatarInitials: {
      control: 'text',
      table: { category: 'Leading (Avatar)' },
      if: { arg: 'avatarType', eq: 'initials' },
    },
    avatarSrc: {
      control: 'text',
      table: { category: 'Leading (Avatar)' },
      if: { arg: 'avatarType', eq: 'profile' },
    },
    avatarIconName: {
      control: 'select',
      options: Object.keys(ICON_OPTIONS),
      mapping: ICON_OPTIONS,
      table: { category: 'Leading (Avatar)' },
      if: { arg: 'avatarType', eq: 'icon' },
    },
    avatarLogoName: {
      control: 'select',
      options: ALL_LOGO_NAMES,
      table: { defaultValue: { summary: 'HDFC' }, category: 'Leading (Avatar)' },
      if: { arg: 'avatarType', eq: 'logo' },
    },
    avatarLogoCategory: {
      control: 'select',
      options: ['mutualFunds', 'payments', 'banks', 'stocks', 'indices'] as LogoCategory[],
      table: { defaultValue: { summary: 'mutualFunds' }, category: 'Leading (Avatar)' },
      if: { arg: 'avatarType', eq: 'logo' },
    },
    avatarBadgeIcon: {
      control: 'select',
      options: Object.keys(ICON_OPTIONS),
      mapping: ICON_OPTIONS,
      table: { category: 'Leading (Avatar)' },
      if: { arg: 'showLeading', truthy: true },
    },
    showTrailing: {
      control: 'boolean',
      description: 'Show **ListItem** trailing (chevron, text, link, or button) on the holdings row.',
      table: { defaultValue: { summary: 'false' }, category: 'Trailing' },
    },
    trailing: {
      control: 'inline-radio',
      options: ['none', 'icon', 'text', 'link', 'button'] as ListItemTrailing[],
      description:
        'Trailing type. **icon** (chevron) is ignored on stocks cards — use **text**, **link**, or **button**.',
      table: { defaultValue: { summary: 'icon' }, category: 'Trailing' },
      if: { arg: 'showTrailing', truthy: true },
    },
    trailingIcon: {
      control: 'select',
      options: Object.keys(ICON_OPTIONS),
      mapping: ICON_OPTIONS,
      table: { category: 'Trailing' },
      if: { arg: 'trailing', eq: 'icon' },
    },
    trailingText: {
      control: 'text',
      table: { category: 'Trailing' },
      if: { arg: 'trailing', eq: 'text' },
    },
    trailingLinkText: {
      control: 'text',
      table: { category: 'Trailing' },
      if: { arg: 'trailing', eq: 'link' },
    },
    trailingButtonLabel: {
      control: 'text',
      table: { category: 'Trailing (Button)' },
      if: { arg: 'trailing', eq: 'button' },
    },
    trailingButtonVariant: {
      control: 'select',
      options: ['filled', 'stroke', 'tonal', 'link'] as ButtonType[],
      table: { category: 'Trailing (Button)' },
      if: { arg: 'trailing', eq: 'button' },
    },
    trailingButtonSize: {
      control: 'select',
      options: ['large', 'medium', 'small', 'extra-small'] as ButtonSize[],
      table: { category: 'Trailing (Button)' },
      if: { arg: 'trailing', eq: 'button' },
    },
    onClick: { action: 'clicked', table: { category: 'Events' } },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof StocksCard>;

export default meta;

type Story = StoryObj<typeof StocksCard>;

export const Default: Story = {};

/** Interactive docs entry: toggle **Show status badge** in Controls. */
export const Playground: StoryObj<StocksCardStoryArgs> = {
  args: {
    ...STOCKS_CARD_DEFAULT_PROPS,
    showLeading: false,
    showTrailing: false,
    trailing: 'icon',
    layout: 'standard',
    marginFooterLabel: STOCKS_CARD_MTF_DEFAULT_PROPS.marginFooterLabel,
    marginReturnLabel: STOCKS_CARD_MTF_DEFAULT_PROPS.marginReturnLabel,
    marginMultiplierLabel: STOCKS_CARD_MTF_DEFAULT_PROPS.marginMultiplierLabel,
    marginFooterIconName: STOCKS_CARD_MTF_DEFAULT_PROPS.marginFooterIconName,
    showStatusBadge: true,
  },
  argTypes: {
    showStatusBadge: {
      name: 'Show status badge',
      description:
        'Turn the top status **Badge** on or off. When on, **statusLabel** sets the pill (e.g. Pledge or MTF).',
      control: 'boolean',
      table: { category: 'Playground' },
    },
    statusLabel: {
      control: 'text',
      description: 'Badge copy when **Show status badge** is on.',
      table: { category: 'Playground' },
      if: { arg: 'showStatusBadge', truthy: true },
    },
    title: { table: { category: 'Content' } },
    quantity: { table: { category: 'Content' } },
    avgPriceLabel: { table: { category: 'Content' } },
    price: { table: { category: 'Content' } },
    changeLabel: { table: { category: 'Content' } },
    changeSentiment: { table: { category: 'Content' } },
    quantityIconName: { table: { category: 'Content' } },
    onClick: { action: 'clicked', table: { category: 'Events' } },
    className: { table: { disable: true } },
  },
  render: (args) => {
    const { showStatusBadge, statusLabel, ...cardArgs } = args;
    return (
      <StocksCard
        {...cardArgs}
        statusLabel={showStatusBadge ? statusLabel : undefined}
      />
    );
  },
};

export const WithoutStatus: Story = {
  name: 'Without status tag',
  args: {
    ...STOCKS_CARD_DEFAULT_PROPS,
    statusLabel: undefined,
  },
};

export const NegativeChange: Story = {
  name: 'Negative change',
  args: {
    ...STOCKS_CARD_DEFAULT_PROPS,
    changeLabel: '-4.10 (1.20%)',
    changeSentiment: 'negative',
  },
};

/** MTF layout — primary badge + return-on-margin pill. */
export const MTF: Story = {
  name: 'MTF (margin footer)',
  args: {
    ...STOCKS_CARD_MTF_DEFAULT_PROPS,
  },
};
