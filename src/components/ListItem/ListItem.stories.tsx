import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from './ListItem';
import type {
  ListItemEmphasis,
  ListItemTrailing,
  ListItemValueType,
} from './ListItem';
import type { AvatarType, AvatarSize, AvatarIcon } from '../Avatar';
import type { ButtonType, ButtonSize } from '../Button';
import { iconNames } from '../Icon';
import {
  MUTUAL_FUND_NAMES,
  PAYMENT_NAMES,
  BANK_NAMES,
  STOCK_NAMES,
  INDEX_NAMES,
} from '../Logo/logoNames';

const ICON_OPTIONS = iconNames.reduce<Record<string, string>>(
  (acc, name) => {
    acc[name] = name;
    return acc;
  },
  { '(none)': '' },
);

const ALL_LOGO_NAMES = [
  ...MUTUAL_FUND_NAMES,
  ...PAYMENT_NAMES,
  ...BANK_NAMES,
  ...STOCK_NAMES,
  ...INDEX_NAMES,
];

const meta: Meta<typeof ListItem> = {
  title: 'Components/List Item',
  component: ListItem,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    /* ══ Variant ════════════════════════════════════ */
    showLeading: {
      control: 'boolean',
      description: 'Show leading avatar (Leading)',
      table: { defaultValue: { summary: 'true' }, category: 'Variant' },
    },
    showPrimaryIcon: {
      control: 'boolean',
      description: 'Show icon next to primary text (Primary Icon)',
      table: { defaultValue: { summary: 'false' }, category: 'Variant' },
    },
    emphasis: {
      control: 'select',
      options: ['high', 'low'] as ListItemEmphasis[],
      description: 'Text emphasis — High = SemiBold, Low = Medium',
      table: { defaultValue: { summary: 'high' }, category: 'Variant' },
    },

    /* ══ Properties ═════════════════════════════════ */
    showPrimaryText: {
      control: 'boolean',
      description: 'Show primary text row',
      table: { defaultValue: { summary: 'true' }, category: 'Properties' },
    },
    primaryText: {
      control: 'text',
      description: 'Primary text content',
      table: { defaultValue: { summary: 'Primary' }, category: 'Properties' },
      if: { arg: 'showPrimaryText' },
    },
    primaryIcon: {
      control: 'select',
      options: Object.keys(ICON_OPTIONS),
      mapping: ICON_OPTIONS,
      description: 'Primary icon name',
      table: { defaultValue: { summary: 'info_circle_outline' }, category: 'Properties' },
      if: { arg: 'showPrimaryIcon' },
    },

    showSecondaryText: {
      control: 'boolean',
      description: 'Show secondary text label within subtext row',
      table: { defaultValue: { summary: 'true' }, category: 'Properties' },
    },
    secondaryText: {
      control: 'text',
      description: 'Secondary text content',
      table: { defaultValue: { summary: 'Secondary' }, category: 'Properties' },
      if: { arg: 'showSecondaryText' },
    },

    showTertiaryText: {
      control: 'boolean',
      description: 'Show tertiary text row',
      table: { defaultValue: { summary: 'false' }, category: 'Properties' },
    },
    tertiaryText: {
      control: 'text',
      description: 'Tertiary text content',
      table: { defaultValue: { summary: 'Tertiary' }, category: 'Properties' },
      if: { arg: 'showTertiaryText' },
    },
    showTertiaryIcon1: {
      control: 'boolean',
      description: 'Show tertiary icon 1',
      table: { defaultValue: { summary: 'false' }, category: 'Properties' },
      if: { arg: 'showTertiaryText' },
    },
    tertiaryIcon1: {
      control: 'select',
      options: Object.keys(ICON_OPTIONS),
      mapping: ICON_OPTIONS,
      description: 'Tertiary icon 1 name',
      table: { defaultValue: { summary: 'info_circle_outline' }, category: 'Properties' },
      if: { arg: 'showTertiaryIcon1' },
    },
    showTertiaryIcon2: {
      control: 'boolean',
      description: 'Show tertiary icon 2',
      table: { defaultValue: { summary: 'false' }, category: 'Properties' },
      if: { arg: 'showTertiaryText' },
    },
    tertiaryIcon2: {
      control: 'select',
      options: Object.keys(ICON_OPTIONS),
      mapping: ICON_OPTIONS,
      description: 'Tertiary icon 2 name',
      table: { defaultValue: { summary: 'info_circle_outline' }, category: 'Properties' },
      if: { arg: 'showTertiaryIcon2' },
    },

    showSeparator: {
      control: 'boolean',
      description: 'Show bottom separator line',
      table: { defaultValue: { summary: 'true' }, category: 'Properties' },
    },
    showBadge: {
      control: 'boolean',
      description: 'Show badge in subtext row',
      table: { defaultValue: { summary: 'false' }, category: 'Properties' },
    },
    badgeLabel: {
      control: 'text',
      description: 'Badge label text',
      table: { defaultValue: { summary: 'Label' }, category: 'Properties' },
      if: { arg: 'showBadge' },
    },
    showSubtextIcon: {
      control: 'boolean',
      description: 'Show icon in subtext row',
      table: { defaultValue: { summary: 'false' }, category: 'Properties' },
    },
    subtextIcon: {
      control: 'select',
      options: Object.keys(ICON_OPTIONS),
      mapping: ICON_OPTIONS,
      description: 'Subtext icon name',
      table: { defaultValue: { summary: 'info_circle_outline' }, category: 'Properties' },
      if: { arg: 'showSubtextIcon' },
    },
    showSubtext: {
      control: 'boolean',
      description: 'Show the entire subtext row',
      table: { defaultValue: { summary: 'true' }, category: 'Properties' },
    },

    /* ══ Value Indicator ════════════════════════════ */
    showValueText: {
      control: 'boolean',
      description: 'Show a colored value indicator in the subtext row',
      table: { defaultValue: { summary: 'false' }, category: 'Value Indicator' },
    },
    valueText: {
      control: 'text',
      description: 'Value text content (e.g. "(-0.30%)")',
      table: { defaultValue: { summary: '(-0.30%)' }, category: 'Value Indicator' },
      if: { arg: 'showValueText' },
    },
    valueType: {
      control: 'inline-radio',
      options: ['positive', 'negative'] as ListItemValueType[],
      description: 'Positive (green) or Negative (red)',
      table: { defaultValue: { summary: 'negative' }, category: 'Value Indicator' },
      if: { arg: 'showValueText' },
    },

    /* ══ Trailing ═══════════════════════════════════ */
    showTrailing: {
      control: 'boolean',
      description: 'Show trailing content',
      table: { defaultValue: { summary: 'true' }, category: 'Trailing' },
    },
    trailing: {
      control: 'inline-radio',
      options: ['icon', 'button', 'none'] as ListItemTrailing[],
      description: 'Trailing content type',
      table: { defaultValue: { summary: 'icon' }, category: 'Trailing' },
      if: { arg: 'showTrailing' },
    },
    trailingIcon: {
      control: 'select',
      options: Object.keys(ICON_OPTIONS),
      mapping: ICON_OPTIONS,
      description: 'Trailing icon name',
      table: { defaultValue: { summary: 'caret_small_right_main' }, category: 'Trailing' },
      if: { arg: 'trailing', eq: 'icon' },
    },
    trailingButtonLabel: {
      control: 'text',
      description: 'Button label',
      table: { defaultValue: { summary: 'Button' }, category: 'Trailing (Button)' },
      if: { arg: 'trailing', eq: 'button' },
    },
    trailingButtonVariant: {
      control: 'select',
      options: ['filled', 'stroke', 'tonal', 'link'] as ButtonType[],
      description: 'Button variant',
      table: { defaultValue: { summary: 'stroke' }, category: 'Trailing (Button)' },
      if: { arg: 'trailing', eq: 'button' },
    },
    trailingButtonSize: {
      control: 'select',
      options: ['large', 'medium', 'small', 'extra-small'] as ButtonSize[],
      description: 'Button size',
      table: { defaultValue: { summary: 'small' }, category: 'Trailing (Button)' },
      if: { arg: 'trailing', eq: 'button' },
    },

    /* ══ Leading — Avatar ══════════════════════════ */
    avatarType: {
      control: 'inline-radio',
      options: ['profile', 'initials', 'logo', 'icon'] as AvatarType[],
      description: 'Avatar content type',
      table: { defaultValue: { summary: 'initials' }, category: 'Leading (Avatar)' },
      if: { arg: 'showLeading' },
    },
    avatarSize: {
      control: 'inline-radio',
      options: ['small', 'regular', 'large', 'extraLarge'] as AvatarSize[],
      description: 'Avatar size',
      table: { defaultValue: { summary: 'regular' }, category: 'Leading (Avatar)' },
      if: { arg: 'showLeading' },
    },
    avatarBadgeType: {
      control: 'inline-radio',
      options: ['none', 'status', 'action'] as AvatarIcon[],
      description: 'Avatar badge position',
      table: { defaultValue: { summary: 'none' }, category: 'Leading (Avatar)' },
      if: { arg: 'showLeading' },
    },
    avatarSelected: {
      control: 'boolean',
      description: 'Green selection ring with checkmark',
      table: { defaultValue: { summary: 'false' }, category: 'Leading (Avatar)' },
      if: { arg: 'showLeading' },
    },
    avatarInitials: {
      control: 'text',
      description: 'Avatar initials',
      table: { defaultValue: { summary: 'VS' }, category: 'Leading (Avatar)' },
      if: { arg: 'avatarType', eq: 'initials' },
    },
    avatarSrc: {
      control: 'text',
      description: 'Avatar profile image URL',
      table: { defaultValue: { summary: '' }, category: 'Leading (Avatar)' },
      if: { arg: 'avatarType', eq: 'profile' },
    },
    avatarIconName: {
      control: 'select',
      options: Object.keys(ICON_OPTIONS),
      mapping: ICON_OPTIONS,
      description: 'Avatar icon name',
      table: { defaultValue: { summary: 'person_outline' }, category: 'Leading (Avatar)' },
      if: { arg: 'avatarType', eq: 'icon' },
    },
    avatarLogoName: {
      control: 'select',
      options: ALL_LOGO_NAMES,
      description: 'Logo brand name',
      table: { defaultValue: { summary: 'HDFC' }, category: 'Leading (Avatar)' },
      if: { arg: 'avatarType', eq: 'logo' },
    },
    avatarLogoCategory: {
      control: 'select',
      options: ['mutualFunds', 'payments', 'banks', 'stocks', 'indices'],
      description: 'Logo category',
      table: { defaultValue: { summary: 'mutualFunds' }, category: 'Leading (Avatar)' },
      if: { arg: 'avatarType', eq: 'logo' },
    },
    avatarBadgeIcon: {
      control: 'select',
      options: Object.keys(ICON_OPTIONS),
      mapping: ICON_OPTIONS,
      description: 'Custom badge icon name',
      table: { defaultValue: { summary: '' }, category: 'Leading (Avatar)' },
      if: { arg: 'showLeading' },
    },
  },
  args: {
    /* Variant */
    showLeading: true,
    showPrimaryIcon: false,
    emphasis: 'high',

    /* Properties */
    showPrimaryText: true,
    primaryText: 'Primary',
    primaryIcon: 'info_circle_outline',
    showSecondaryText: true,
    secondaryText: 'Secondary',
    showTertiaryText: false,
    tertiaryText: 'Tertiary',
    showTertiaryIcon1: false,
    tertiaryIcon1: 'info_circle_outline',
    showTertiaryIcon2: false,
    tertiaryIcon2: 'info_circle_outline',
    showSeparator: true,
    showBadge: false,
    badgeLabel: 'Label',
    showSubtextIcon: false,
    subtextIcon: 'info_circle_outline',
    showSubtext: true,

    /* Value Indicator */
    showValueText: false,
    valueText: '(0.30%)',
    valueType: 'negative',

    /* Trailing */
    showTrailing: true,
    trailing: 'icon',
    trailingIcon: 'caret_small_right_main',
    trailingButtonLabel: 'Button',
    trailingButtonVariant: 'stroke',
    trailingButtonSize: 'small',

    /* Leading (Avatar) */
    avatarType: 'initials',
    avatarSize: 'regular',
    avatarBadgeType: 'none',
    avatarSelected: false,
    avatarInitials: 'VS',
    avatarSrc: 'https://i.pravatar.cc/96?img=3',
    avatarIconName: 'person_outline',
    avatarLogoName: 'HDFC',
    avatarLogoCategory: 'banks',
    avatarBadgeIcon: '',
  },
};

export default meta;
type Story = StoryObj<typeof ListItem>;

export const Playground: Story = {};

export const HighEmphasisWithAvatar: Story = {
  args: { emphasis: 'high', showLeading: true },
};

export const HighEmphasisNoAvatar: Story = {
  args: { emphasis: 'high', showLeading: false },
};

export const LowEmphasisWithAvatar: Story = {
  args: { emphasis: 'low', showLeading: true },
};

export const LowEmphasisNoAvatar: Story = {
  args: { emphasis: 'low', showLeading: false },
};

export const WithPrimaryIcon: Story = {
  args: { showPrimaryIcon: true, primaryIcon: 'info_circle_outline' },
};

export const WithBadge: Story = {
  args: { showBadge: true, badgeLabel: 'New' },
};

export const WithTertiaryText: Story = {
  args: {
    showTertiaryText: true,
    tertiaryText: 'Additional info here',
    showTertiaryIcon1: true,
    tertiaryIcon1: 'clock_circle_outline',
  },
};

export const TrailingIcon: Story = {
  args: { trailing: 'icon', trailingIcon: 'caret_small_right_main' },
};

export const TrailingButton: Story = {
  args: {
    trailing: 'button',
    trailingButtonLabel: 'Action',
    trailingButtonVariant: 'stroke',
    trailingButtonSize: 'small',
  },
};

export const IconAvatar: Story = {
  args: {
    avatarType: 'icon',
    avatarIconName: 'person_outline',
    primaryText: 'Icon Avatar',
    secondaryText: 'Using icon type',
  },
};

export const ProfileAvatar: Story = {
  args: {
    avatarType: 'profile',
    avatarSrc: 'https://i.pravatar.cc/96?img=3',
    primaryText: 'Profile Avatar',
    secondaryText: 'With profile image',
  },
};

export const SelectedAvatar: Story = {
  args: {
    avatarSelected: true,
    primaryText: 'Selected Item',
    secondaryText: 'Green ring with checkmark',
  },
};

export const NegativeValue: Story = {
  args: {
    avatarType: 'logo',
    avatarLogoName: 'Reliance Industries',
    avatarLogoCategory: 'stocks',
    primaryText: 'Reliance Industries',
    secondaryText: '92.50',
    showValueText: true,
    valueText: '(0.30%)',
    valueType: 'negative',
    trailing: 'icon',
    trailingIcon: 'cross',
  },
};

export const PositiveValue: Story = {
  args: {
    avatarType: 'logo',
    avatarLogoName: 'Tata Motors',
    avatarLogoCategory: 'stocks',
    primaryText: 'Tata Motors',
    secondaryText: '654.30',
    showValueText: true,
    valueText: '(1.25%)',
    valueType: 'positive',
    trailing: 'icon',
    trailingIcon: 'cross',
  },
};

function ListRender() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 344 }}>
      <ListItem
        emphasis="high"
        primaryText="John Doe"
        secondaryText="Software Engineer"
        avatarInitials="JD"
        trailing="icon"
        trailingIcon="caret_small_right_main"
      />
      <ListItem
        emphasis="high"
        primaryText="Jane Smith"
        secondaryText="Product Designer"
        avatarInitials="JS"
        showPrimaryIcon
        primaryIcon="checkmark_circle_filled"
        trailing="button"
        trailingButtonLabel="View"
        trailingButtonVariant="link"
        trailingButtonSize="small"
      />
      <ListItem
        emphasis="low"
        primaryText="Alex Wilson"
        secondaryText="Marketing Lead"
        avatarInitials="AW"
        showBadge
        badgeLabel="New"
        trailing="button"
        trailingButtonLabel="Invite"
        trailingButtonVariant="stroke"
        trailingButtonSize="small"
      />
      <ListItem
        emphasis="low"
        primaryText="Sam Lee"
        secondaryText="DevOps Engineer"
        avatarInitials="SL"
        trailing="icon"
        trailingIcon="caret_small_right_main"
        showSeparator={false}
      />
    </div>
  );
}

export const ListExample: Story = {
  render: ListRender,
  parameters: { controls: { disable: true } },
};
