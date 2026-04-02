import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BottomSheetHeader } from './BottomSheetHeader';

const ICON_OPTIONS = [
  'share_ios',
  'share_android',
  'bell_outline',
  'bell_filled',
  'bookmark_outline',
  'bookmark_filled',
  'search_outline',
  'filter_outline',
  'edit_outline',
  'star_outline',
  'info_circle_outline',
  'help',
];

const PlaceholderImage = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, var(--background-positive-weak) 0%, var(--background-positive-weak) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 48,
    }}
  >
    🖼️
  </div>
);

const meta: Meta<typeof BottomSheetHeader> = {
  title: 'Components/Bottom Sheet Header',
  component: BottomSheetHeader,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    /* ══ Variant ═════════════════════════════════════ */
    variant: {
      control: 'inline-radio',
      options: ['default', 'image'],
      description: 'Header type',
      table: { category: 'Variant', defaultValue: { summary: 'default' } },
    },

    /* ══ Toggles ════════════════════════════════════ */
    dragHandle: {
      control: 'boolean',
      description: 'Show drag handle bar at top',
      table: { category: 'Toggles', defaultValue: { summary: 'false' } },
      if: { arg: 'variant', eq: 'default' },
    },
    title: {
      control: 'boolean',
      description: 'Show title text',
      table: { category: 'Toggles', defaultValue: { summary: 'true' } },
      if: { arg: 'variant', eq: 'default' },
    },
    subtitle: {
      control: 'boolean',
      description: 'Show subtitle text',
      table: { category: 'Toggles', defaultValue: { summary: 'true' } },
      if: { arg: 'variant', eq: 'default' },
    },
    secondaryIcons: {
      control: 'boolean',
      description: 'Show secondary action icon',
      table: { category: 'Toggles', defaultValue: { summary: 'true' } },
      if: { arg: 'variant', eq: 'default' },
    },
    dismiss: {
      control: 'boolean',
      description: 'Show dismiss (X) button',
      table: { category: 'Toggles', defaultValue: { summary: 'true' } },
    },
    tabs: {
      control: 'boolean',
      description: 'Show tab chips',
      table: { category: 'Toggles', defaultValue: { summary: 'true' } },
      if: { arg: 'variant', eq: 'default' },
    },

    /* ══ Content ════════════════════════════════════ */
    titleText: {
      control: 'text',
      description: 'Title text (22px Medium)',
      table: { category: 'Content', defaultValue: { summary: 'Title' } },
      if: { arg: 'title' },
    },
    subtitleText: {
      control: 'text',
      description: 'Subtitle text (12px Regular)',
      table: { category: 'Content', defaultValue: { summary: '2-line subtext' } },
      if: { arg: 'subtitle' },
    },
    secondaryIcon: {
      control: 'select',
      options: ICON_OPTIONS,
      description: 'Secondary icon name',
      table: { category: 'Content', defaultValue: { summary: 'share_ios' } },
      if: { arg: 'secondaryIcons' },
    },
    tabLabels: {
      control: 'object',
      description: 'Array of tab label strings',
      table: { category: 'Content' },
      if: { arg: 'tabs' },
    },
    activeTabIndex: {
      control: { type: 'number', min: 0, max: 10 },
      description: 'Active tab index (0-based)',
      table: { category: 'Content', defaultValue: { summary: '0' } },
      if: { arg: 'tabs' },
    },

    /* ══ Events ═════════════════════════════════════ */
    onDismiss: {
      action: 'dismissed',
      description: 'Called when dismiss button is clicked',
      table: { category: 'Events' },
    },
    onSecondaryClick: {
      action: 'secondaryClicked',
      description: 'Called when secondary icon is clicked',
      table: { category: 'Events' },
    },
    onTabChange: {
      action: 'tabChanged',
      description: 'Called when a tab is clicked',
      table: { category: 'Events' },
    },

    /* ══ Hidden ═════════════════════════════════════ */
    headerContent: { control: false },
    className: { control: false },
  },
  args: {
    variant: 'default',
    dragHandle: false,
    title: true,
    titleText: 'Title',
    subtitle: true,
    subtitleText: '2-line subtext',
    secondaryIcons: true,
    secondaryIcon: 'share_ios',
    dismiss: true,
    tabs: true,
    tabLabels: ['Label', 'Label', 'Label', 'Label', 'Label'],
    activeTabIndex: 0,
  },
};

export default meta;
type Story = StoryObj<typeof BottomSheetHeader>;

/* ── Playground ──────────────────────────────────── */
export const Playground: Story = {};

/* ── Default Header — full ───────────────────────── */
export const DefaultFull: Story = {
  args: {
    variant: 'default',
    dragHandle: true,
  },
};

/* ── Default — no tabs ───────────────────────────── */
export const DefaultNoTabs: Story = {
  args: {
    variant: 'default',
    tabs: false,
  },
};

/* ── Default — title only ────────────────────────── */
export const DefaultTitleOnly: Story = {
  args: {
    variant: 'default',
    subtitle: false,
    tabs: false,
    secondaryIcons: false,
    titleText: 'Select an option',
  },
};

/* ── Default — with drag handle ──────────────────── */
export const DefaultWithDragHandle: Story = {
  args: {
    variant: 'default',
    dragHandle: true,
    tabs: false,
    subtitle: false,
  },
};

/* ── Image Header ────────────────────────────────── */
export const ImageHeader: Story = {
  args: {
    variant: 'image',
    headerContent: <PlaceholderImage />,
  },
};

/* ── Image — no dismiss ──────────────────────────── */
export const ImageNoDismiss: Story = {
  args: {
    variant: 'image',
    dismiss: false,
    headerContent: <PlaceholderImage />,
  },
};

/* ── Interactive tabs demo ───────────────────────── */
function InteractiveTabs() {
  const [active, setActive] = useState(0);
  const labels = ['All', 'Stocks', 'Mutual Funds', 'ETFs', 'Bonds'];

  return (
    <BottomSheetHeader
      variant="default"
      dragHandle
      titleText="Investments"
      subtitleText="Browse your portfolio categories"
      tabLabels={labels}
      activeTabIndex={active}
      onTabChange={setActive}
    />
  );
}

export const InteractiveTabsDemo: Story = {
  render: InteractiveTabs,
  parameters: { controls: { disable: true } },
};
