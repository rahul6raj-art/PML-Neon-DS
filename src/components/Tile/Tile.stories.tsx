import type { Meta, StoryObj } from '@storybook/react';
import { Tile } from './Tile';
import type { TileVariant } from './Tile';
import { iconNames } from '../Icon';

const ICON_OPTIONS = iconNames.reduce<Record<string, string>>(
  (acc, name) => {
    acc[name] = name;
    return acc;
  },
  { '(none)': '' },
);

const meta: Meta<typeof Tile> = {
  title: 'Components/Tile',
  component: Tile,
  tags: ['autodocs'],
  argTypes: {
    /* ══ Variant ═════════════════════════════════════ */
    variant: {
      control: 'select',
      options: ['default', 'action'] as TileVariant[],
      description: 'Tile variant — "action" shows a favourite icon in the top-right',
      table: { defaultValue: { summary: 'default' }, category: 'Variant' },
    },

    /* ══ Content ═════════════════════════════════════ */
    icon: {
      control: 'select',
      options: Object.keys(ICON_OPTIONS),
      mapping: ICON_OPTIONS,
      description: 'Main icon (44×44)',
      table: { defaultValue: { summary: 'rupee' }, category: 'Content' },
    },
    title: {
      control: 'text',
      description: 'Title text (first line)',
      table: { defaultValue: { summary: 'Title' }, category: 'Content' },
    },
    label: {
      control: 'text',
      description: 'Label text (second line)',
      table: { defaultValue: { summary: 'label' }, category: 'Content' },
    },

    /* ══ Favourite (action only) ════════════════════ */
    favouriteOption: {
      control: 'boolean',
      description: 'Show gradient overlay behind the favourite icon (action variant only)',
      table: { defaultValue: { summary: 'false' }, category: 'Favourite' },
      if: { arg: 'variant', eq: 'action' },
    },
    favouriteIcon: {
      control: 'select',
      options: Object.keys(ICON_OPTIONS),
      mapping: ICON_OPTIONS,
      description: 'Favourite icon name',
      table: { defaultValue: { summary: 'star_outline' }, category: 'Favourite' },
      if: { arg: 'variant', eq: 'action' },
    },

    /* ══ Events ══════════════════════════════════════ */
    onClick: {
      action: 'clicked',
      description: 'Tile click handler',
      table: { category: 'Events' },
    },
    onFavouriteClick: {
      action: 'favouriteClicked',
      description: 'Favourite icon click handler',
      table: { category: 'Events' },
      if: { arg: 'variant', eq: 'action' },
    },
  },
  args: {
    variant: 'default',
    icon: 'rupee',
    title: 'Title',
    label: 'label',
    favouriteOption: false,
    favouriteIcon: 'star_outline',
  },
};

export default meta;
type Story = StoryObj<typeof Tile>;

/* ── Playground ──────────────────────────────────── */
export const Playground: Story = {};

/* ── Default ─────────────────────────────────────── */
export const Default: Story = {
  args: { variant: 'default', icon: 'rupee', title: 'Title', label: 'label' },
};

/* ── Action ──────────────────────────────────────── */
export const Action: Story = {
  args: { variant: 'action', icon: 'rupee', title: 'Title', label: 'label' },
};

/* ── Action + Favourite gradient ─────────────────── */
export const ActionWithFavourite: Story = {
  args: {
    variant: 'action',
    icon: 'rupee',
    title: 'Title',
    label: 'label',
    favouriteOption: true,
    favouriteIcon: 'star_outline',
  },
};

/* ── Grid demo ───────────────────────────────────── */
function GridRender() {
  const items = [
    { icon: 'home_outline', title: 'Home', label: 'label' },
    { icon: 'chart', title: 'Stocks', label: 'label' },
    { icon: 'handbag_outline', title: 'Shopping', label: 'label' },
    { icon: 'rupee', title: 'Payments', label: 'label' },
    { icon: 'bookmark_outline', title: 'Saved', label: 'label' },
    { icon: 'bell_outline', title: 'Alerts', label: 'label' },
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, maxWidth: 340 }}>
      {items.map((item, i) => (
        <Tile key={i} {...item} />
      ))}
    </div>
  );
}

export const Grid: Story = {
  render: GridRender,
  parameters: { controls: { disable: true } },
};
