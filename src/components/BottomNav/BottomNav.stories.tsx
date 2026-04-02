import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BottomNav } from './BottomNav';
import type { BottomNavItem } from './BottomNav';
import { iconNames } from '../Icon';

const ICON_OPTIONS = iconNames.reduce<Record<string, string>>(
  (acc, name) => {
    acc[name] = name;
    return acc;
  },
  { '(none)': '' },
);

interface BottomNavStoryArgs {
  itemCount: number;
  showHomeIndicator: boolean;
  showGradient: boolean;
  item1Label: string;
  item1Icon: string;
  item1ActiveIcon: string;
  item2Label: string;
  item2Icon: string;
  item2ActiveIcon: string;
  item3Label: string;
  item3Icon: string;
  item3ActiveIcon: string;
  item4Label: string;
  item4Icon: string;
  item4ActiveIcon: string;
  item5Label: string;
  item5Icon: string;
  item5ActiveIcon: string;
}

function buildItems(args: BottomNavStoryArgs): BottomNavItem[] {
  const defs = [
    { label: args.item1Label, icon: args.item1Icon, activeIcon: args.item1ActiveIcon },
    { label: args.item2Label, icon: args.item2Icon, activeIcon: args.item2ActiveIcon },
    { label: args.item3Label, icon: args.item3Icon, activeIcon: args.item3ActiveIcon },
    { label: args.item4Label, icon: args.item4Icon, activeIcon: args.item4ActiveIcon },
    { label: args.item5Label, icon: args.item5Icon, activeIcon: args.item5ActiveIcon },
  ];

  return defs.slice(0, args.itemCount).map((d) => ({
    icon: d.icon,
    activeIcon: d.activeIcon || undefined,
    label: d.label,
  }));
}

function PlaygroundRender(args: BottomNavStoryArgs) {
  const [active, setActive] = useState(0);
  const items = buildItems(args);

  return (
    <BottomNav
      items={items}
      activeIndex={active}
      onChange={setActive}
      showHomeIndicator={args.showHomeIndicator}
      showGradient={args.showGradient}
    />
  );
}

function itemArgTypes(n: number, label: string, icon: string, activeIcon: string) {
  return {
    [`item${n}Label`]: {
      control: 'text',
      description: `Tab ${n} label`,
      table: { defaultValue: { summary: label }, category: `Tab ${n}` },
    },
    [`item${n}Icon`]: {
      control: 'select',
      options: Object.keys(ICON_OPTIONS),
      mapping: ICON_OPTIONS,
      description: `Tab ${n} icon`,
      table: { defaultValue: { summary: icon }, category: `Tab ${n}` },
    },
    [`item${n}ActiveIcon`]: {
      control: 'select',
      options: Object.keys(ICON_OPTIONS),
      mapping: ICON_OPTIONS,
      description: `Tab ${n} active icon (optional, falls back to icon)`,
      table: { defaultValue: { summary: activeIcon || '(none)' }, category: `Tab ${n}` },
    },
  };
}

const meta: Meta<BottomNavStoryArgs> = {
  title: 'Components/Bottom Nav',
  component: BottomNav,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    itemCount: {
      control: { type: 'range', min: 2, max: 5, step: 1 },
      description: 'Number of navigation tabs',
      table: { defaultValue: { summary: '5' }, category: 'General' },
    },
    showHomeIndicator: {
      control: 'boolean',
      description: 'Show the Home Indicator bar at bottom',
      table: { defaultValue: { summary: 'true' }, category: 'General' },
    },
    showGradient: {
      control: 'boolean',
      description: 'Show green gradient glow behind active icon',
      table: { defaultValue: { summary: 'true' }, category: 'General' },
    },
    ...itemArgTypes(1, 'Home', 'home_outline', 'home_filled'),
    ...itemArgTypes(2, 'Stocks', 'chart', ''),
    ...itemArgTypes(3, 'F&O', 'copy_outline', ''),
    ...itemArgTypes(4, 'MF', 'handbag_outline', ''),
    ...itemArgTypes(5, 'All', 'rupee', ''),
  },
  args: {
    itemCount: 5,
    showHomeIndicator: true,
    showGradient: true,
    item1Label: 'Home',
    item1Icon: 'home_outline',
    item1ActiveIcon: '',
    item2Label: 'Stocks',
    item2Icon: 'chart',
    item2ActiveIcon: '',
    item3Label: 'F&O',
    item3Icon: 'copy_outline',
    item3ActiveIcon: '',
    item4Label: 'MF',
    item4Icon: 'handbag_outline',
    item4ActiveIcon: '',
    item5Label: 'All',
    item5Icon: 'rupee',
    item5ActiveIcon: '',
  },
  render: PlaygroundRender,
};

export default meta;
type Story = StoryObj<BottomNavStoryArgs>;

export const Playground: Story = {};

export const DefaultState: Story = {
  args: { itemCount: 5 },
};

export const WithoutHomeIndicator: Story = {
  args: { showHomeIndicator: false },
};

export const WithoutGradient: Story = {
  args: { showGradient: false },
};

export const ThreeTabs: Story = {
  args: {
    itemCount: 3,
    item1Label: 'Home',
    item1Icon: 'home_outline',
    item1ActiveIcon: '',
    item2Label: 'Search',
    item2Icon: 'search_outline',
    item2ActiveIcon: '',
    item3Label: 'Profile',
    item3Icon: 'person_outline',
    item3ActiveIcon: 'person_filled',
  },
};
