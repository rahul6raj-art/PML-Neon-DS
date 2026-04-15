import type { Meta, StoryObj } from '@storybook/react';
import { DataPoints } from './DataPoints';
import type { DataPointsType, DataPointItem } from './DataPoints';
import { iconNames } from '../Icon';

const ICON_OPTIONS = iconNames.reduce<Record<string, string>>(
  (acc, name) => {
    acc[name] = name;
    return acc;
  },
  { '(none)': '' },
);

type FlatArgs = {
  type: DataPointsType;
  col1TopLabel: string;
  col1Data: string;
  col1BottomLabel: string;
  col1Subtitle: string;
  col1ShowIcon: boolean;
  col1Icon: string;
  col2TopLabel: string;
  col2Data: string;
  col2BottomLabel: string;
  col2Subtitle: string;
  col2ShowIcon: boolean;
  col2Icon: string;
  col3TopLabel: string;
  col3Data: string;
  col3BottomLabel: string;
  col3Subtitle: string;
  col3ShowIcon: boolean;
  col3Icon: string;
};

function argsToItems(args: FlatArgs): DataPointItem[] {
  const items: DataPointItem[] = [
    {
      topLabel: args.col1TopLabel,
      data: args.col1Data,
      bottomLabel: args.col1BottomLabel,
      subtitle: args.col1Subtitle,
      showTitleIcon: args.col1ShowIcon,
      titleIcon: args.col1Icon,
    },
    {
      topLabel: args.col2TopLabel,
      data: args.col2Data,
      bottomLabel: args.col2BottomLabel,
      subtitle: args.col2Subtitle,
      showTitleIcon: args.col2ShowIcon,
      titleIcon: args.col2Icon,
    },
  ];

  if (args.type === '3') {
    items.push({
      topLabel: args.col3TopLabel,
      data: args.col3Data,
      bottomLabel: args.col3BottomLabel,
      subtitle: args.col3Subtitle,
      showTitleIcon: args.col3ShowIcon,
      titleIcon: args.col3Icon,
    });
  }

  return items;
}

const meta: Meta<FlatArgs> = {
  title: 'Components/Data Points',
  tags: ['autodocs'],
  argTypes: {
    /* ══ Layout Type ═════════════════════════════════ */
    type: {
      control: 'select',
      options: ['2-left-aligned', '2-spaced-out', '3'] as DataPointsType[],
      description: 'Layout type — number of columns and alignment',
      table: { defaultValue: { summary: '2-left-aligned' }, category: 'Layout' },
    },

    /* ══ Column 1 ════════════════════════════════════ */
    col1TopLabel: {
      control: 'text',
      description: 'Column 1 — top label',
      table: { defaultValue: { summary: 'Top Label' }, category: 'Column 1' },
    },
    col1Data: {
      control: 'text',
      description: 'Column 1 — data value',
      table: { defaultValue: { summary: 'Data' }, category: 'Column 1' },
    },
    col1BottomLabel: {
      control: 'text',
      description: 'Column 1 — bottom label',
      table: { defaultValue: { summary: 'Bottom Label' }, category: 'Column 1' },
    },
    col1Subtitle: {
      control: 'text',
      description: 'Column 1 — subtitle',
      table: { defaultValue: { summary: 'Subtitle' }, category: 'Column 1' },
    },
    col1ShowIcon: {
      control: 'boolean',
      description: 'Column 1 — show icon next to top label',
      table: { defaultValue: { summary: 'false' }, category: 'Column 1' },
    },
    col1Icon: {
      control: 'select',
      options: Object.keys(ICON_OPTIONS),
      mapping: ICON_OPTIONS,
      description: 'Column 1 — title icon',
      table: { defaultValue: { summary: 'info_outline' }, category: 'Column 1' },
      if: { arg: 'col1ShowIcon' },
    },

    /* ══ Column 2 ════════════════════════════════════ */
    col2TopLabel: {
      control: 'text',
      description: 'Column 2 — top label',
      table: { defaultValue: { summary: 'Top Label' }, category: 'Column 2' },
    },
    col2Data: {
      control: 'text',
      description: 'Column 2 — data value',
      table: { defaultValue: { summary: 'Data' }, category: 'Column 2' },
    },
    col2BottomLabel: {
      control: 'text',
      description: 'Column 2 — bottom label',
      table: { defaultValue: { summary: 'Bottom Label' }, category: 'Column 2' },
    },
    col2Subtitle: {
      control: 'text',
      description: 'Column 2 — subtitle',
      table: { defaultValue: { summary: 'Subtitle' }, category: 'Column 2' },
    },
    col2ShowIcon: {
      control: 'boolean',
      description: 'Column 2 — show icon next to top label',
      table: { defaultValue: { summary: 'false' }, category: 'Column 2' },
    },
    col2Icon: {
      control: 'select',
      options: Object.keys(ICON_OPTIONS),
      mapping: ICON_OPTIONS,
      description: 'Column 2 — title icon',
      table: { defaultValue: { summary: 'info_outline' }, category: 'Column 2' },
      if: { arg: 'col2ShowIcon' },
    },

    /* ══ Column 3 (type=3 only) ══════════════════════ */
    col3TopLabel: {
      control: 'text',
      description: 'Column 3 — top label',
      table: { defaultValue: { summary: 'Top Label' }, category: 'Column 3' },
      if: { arg: 'type', eq: '3' },
    },
    col3Data: {
      control: 'text',
      description: 'Column 3 — data value',
      table: { defaultValue: { summary: 'Data' }, category: 'Column 3' },
      if: { arg: 'type', eq: '3' },
    },
    col3BottomLabel: {
      control: 'text',
      description: 'Column 3 — bottom label',
      table: { defaultValue: { summary: 'Bottom Label' }, category: 'Column 3' },
      if: { arg: 'type', eq: '3' },
    },
    col3Subtitle: {
      control: 'text',
      description: 'Column 3 — subtitle',
      table: { defaultValue: { summary: 'Subtitle' }, category: 'Column 3' },
      if: { arg: 'type', eq: '3' },
    },
    col3ShowIcon: {
      control: 'boolean',
      description: 'Column 3 — show icon next to top label',
      table: { defaultValue: { summary: 'false' }, category: 'Column 3' },
      if: { arg: 'type', eq: '3' },
    },
    col3Icon: {
      control: 'select',
      options: Object.keys(ICON_OPTIONS),
      mapping: ICON_OPTIONS,
      description: 'Column 3 — title icon',
      table: { defaultValue: { summary: 'info_outline' }, category: 'Column 3' },
      if: { arg: 'col3ShowIcon' },
    },
  },
  args: {
    type: '2-left-aligned',
    col1TopLabel: 'Top Label',
    col1Data: 'Data',
    col1BottomLabel: 'Bottom Label',
    col1Subtitle: 'Subtitle',
    col1ShowIcon: false,
    col1Icon: 'info_outline',
    col2TopLabel: 'Top Label',
    col2Data: 'Data',
    col2BottomLabel: 'Bottom Label',
    col2Subtitle: 'Subtitle',
    col2ShowIcon: false,
    col2Icon: 'info_outline',
    col3TopLabel: 'Top Label',
    col3Data: 'Data',
    col3BottomLabel: 'Bottom Label',
    col3Subtitle: 'Subtitle',
    col3ShowIcon: false,
    col3Icon: 'info_outline',
  },
  render: (args) => <DataPoints type={args.type} items={argsToItems(args)} />,
};

export default meta;
type Story = StoryObj<FlatArgs>;

/* ── Playground ──────────────────────────────────── */
export const Playground: Story = {};

/* ── 2 — Left Aligned ───────────────────────────── */
export const TwoLeftAligned: Story = {
  args: { type: '2-left-aligned' },
};

/* ── 2 — Spaced Out ─────────────────────────────── */
export const TwoSpacedOut: Story = {
  args: { type: '2-spaced-out' },
};

/* ── 3 Columns ───────────────────────────────────── */
export const ThreeColumns: Story = {
  args: { type: '3' },
};

/* ── With Icons ──────────────────────────────────── */
export const WithIcons: Story = {
  args: {
    type: '2-spaced-out',
    col1ShowIcon: true,
    col1Icon: 'info_outline',
    col2ShowIcon: true,
    col2Icon: 'info_outline',
  },
};

/* ── Real data example ───────────────────────────── */
export const PortfolioExample: Story = {
  args: {
    type: '2-spaced-out',
    col1TopLabel: 'Invested',
    col1Data: '₹1,25,000',
    col1BottomLabel: '12 Jan 2024',
    col1Subtitle: '10 Stocks',
    col2TopLabel: 'Current',
    col2Data: '₹1,42,350',
    col2BottomLabel: '+13.88%',
    col2Subtitle: '+₹17,350',
  },
};

/* ── Three column real data ──────────────────────── */
export const ThreeColumnExample: Story = {
  args: {
    type: '3',
    col1TopLabel: 'Day Change',
    col1Data: '+₹230',
    col1BottomLabel: '+0.16%',
    col1Subtitle: 'Today',
    col2TopLabel: 'Invested',
    col2Data: '₹1,25,000',
    col2BottomLabel: 'Total',
    col2Subtitle: '10 Stocks',
    col3TopLabel: 'Current',
    col3Data: '₹1,42,350',
    col3BottomLabel: '+13.88%',
    col3Subtitle: 'Returns',
  },
};
