import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import type { AvatarType, AvatarSize, AvatarIcon } from './Avatar';
import type { LogoCategory } from '../Logo/Logo';
import {
  MUTUAL_FUND_NAMES,
  PAYMENT_NAMES,
  BANK_NAMES,
  STOCK_NAMES,
  INDEX_NAMES,
} from '../Logo/logoNames';

const ALL_LOGO_NAMES = [
  ...MUTUAL_FUND_NAMES,
  ...PAYMENT_NAMES,
  ...BANK_NAMES,
  ...STOCK_NAMES,
  ...INDEX_NAMES,
];

const SAMPLE_PHOTO =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&h=256&fit=crop&crop=face';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['profile', 'initials', 'logo', 'icon'] as AvatarType[],
      description: 'Content type — Profile photo, Initials, Logo, or Icon',
      table: { defaultValue: { summary: 'profile' } },
    },
    size: {
      control: 'select',
      options: ['small', 'regular', 'large', 'extraLarge'] as AvatarSize[],
      description: 'Size — Small (32), Regular (48), Large (64), Extra Large (128)',
      table: { defaultValue: { summary: 'regular' } },
    },
    icon: {
      control: 'inline-radio',
      options: ['none', 'status', 'action'] as AvatarIcon[],
      description: 'Badge icon position',
      table: { defaultValue: { summary: 'none' } },
    },
    selected: {
      control: 'boolean',
      description: 'Green selection ring with checkmark badge',
      table: { defaultValue: { summary: 'false' } },
    },
    src: {
      control: 'text',
      description: 'Profile image URL (type=profile)',
    },
    initials: {
      control: 'text',
      description: 'Initials text (type=initials)',
      table: { defaultValue: { summary: 'VS' } },
    },
    logoSrc: {
      control: 'text',
      description: 'Logo image URL (type=logo)',
    },
    logoName: {
      control: 'select',
      options: ALL_LOGO_NAMES,
      description: 'Logo brand name from the Logo component (type=logo)',
    },
    logoCategory: {
      control: 'select',
      options: ['mutualFunds', 'payments', 'banks', 'stocks', 'indices'] as LogoCategory[],
      description: 'Logo category (type=logo)',
      table: { defaultValue: { summary: 'mutualFunds' } },
    },
    iconName: {
      control: 'text',
      description: 'Icon name from icon set (type=icon)',
      table: { defaultValue: { summary: 'person_outline' } },
    },
    badgeIcon: {
      control: 'text',
      description: 'Custom badge icon name for status/action',
    },
    onClick: { action: 'click', table: { category: 'Events' } },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

/* ─── Playground ─────────────────────────────────── */
export const Playground: Story = {
  args: {
    type: 'profile',
    size: 'regular',
    icon: 'none',
    selected: false,
    src: SAMPLE_PHOTO,
    initials: 'VS',
    logoName: 'HDFC',
    logoCategory: 'mutualFunds',
  },
};

/* ══════════════════════════════════════════════════
   TYPE VARIANTS
   ══════════════════════════════════════════════════ */
export const Profile: Story = {
  name: 'Profile',
  args: { type: 'profile', size: 'large', src: SAMPLE_PHOTO },
};

export const Initials: Story = {
  name: 'Initials',
  args: { type: 'initials', size: 'large', initials: 'VS' },
};

export const LogoType: Story = {
  name: 'Logo',
  args: { type: 'logo', size: 'large', logoName: 'HDFC', logoCategory: 'mutualFunds' },
};

export const IconType: Story = {
  name: 'Icon',
  args: { type: 'icon', size: 'large', iconName: 'person_outline' },
};

/* ══════════════════════════════════════════════════
   SIZE VARIANTS
   ══════════════════════════════════════════════════ */
export const AllSizes: Story = {
  name: 'All Sizes',
  args: {},
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 'var(--spacing-24)',
      }}
    >
      <Avatar type="profile" size="small" src={SAMPLE_PHOTO} />
      <Avatar type="profile" size="regular" src={SAMPLE_PHOTO} />
      <Avatar type="profile" size="large" src={SAMPLE_PHOTO} />
      <Avatar type="profile" size="extraLarge" src={SAMPLE_PHOTO} />
    </div>
  ),
};

/* ══════════════════════════════════════════════════
   BADGE VARIANTS
   ══════════════════════════════════════════════════ */
export const StatusBadge: Story = {
  name: 'Status Badge',
  args: { type: 'profile', size: 'regular', icon: 'status', src: SAMPLE_PHOTO },
};

export const ActionBadge: Story = {
  name: 'Action Badge',
  args: { type: 'profile', size: 'regular', icon: 'action', src: SAMPLE_PHOTO },
};

/* ══════════════════════════════════════════════════
   SELECTED STATE
   ══════════════════════════════════════════════════ */
export const Selected: Story = {
  name: 'Selected',
  args: { type: 'profile', size: 'large', selected: true, src: SAMPLE_PHOTO },
};

export const SelectedInitials: Story = {
  name: 'Selected / Initials',
  args: { type: 'initials', size: 'large', selected: true, initials: 'VS' },
};

/* ══════════════════════════════════════════════════
   NO IMAGE FALLBACK
   ══════════════════════════════════════════════════ */
export const NoImage: Story = {
  name: 'No Image (Fallback)',
  args: { type: 'profile', size: 'large' },
};

/* ══════════════════════════════════════════════════
   FULL MATRIX
   ══════════════════════════════════════════════════ */
const types: AvatarType[] = ['profile', 'initials', 'logo', 'icon'];
const sizes: AvatarSize[] = ['small', 'regular', 'large', 'extraLarge'];
const icons: AvatarIcon[] = ['none', 'status', 'action'];

export const AllVariants: Story = {
  name: 'All Variants',
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, fontFamily: 'var(--font-family)' }}>
      {types.map((t) => (
        <div key={t}>
          <p style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-medium)', textTransform: 'capitalize' }}>
            {t}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {sizes.map((s) => (
              <div
                key={s}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 'var(--spacing-24) var(--spacing-32)',
                }}
              >
                {icons.map((ic) => (
                  <Avatar
                    key={ic}
                    type={t}
                    size={s}
                    icon={ic}
                    src={t === 'profile' ? SAMPLE_PHOTO : undefined}
                    logoName={t === 'logo' ? 'HDFC' : undefined}
                    logoCategory={t === 'logo' ? 'mutualFunds' : undefined}
                    initials="VS"
                  />
                ))}
                <Avatar
                  type={t}
                  size={s}
                  selected
                  src={t === 'profile' ? SAMPLE_PHOTO : undefined}
                  logoName={t === 'logo' ? 'HDFC' : undefined}
                  logoCategory={t === 'logo' ? 'mutualFunds' : undefined}
                  initials="VS"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
