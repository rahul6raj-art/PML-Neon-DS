import type { Meta, StoryObj } from '@storybook/react';
import { OverflowMenu } from './OverflowMenu';
import type { OverflowMenuIconAction, OverflowMenuSection } from './OverflowMenu';
import { iconNames } from '../Icon';

const ICON_OPTIONS = iconNames.reduce<Record<string, string>>(
  (acc, name) => {
    acc[name] = name;
    return acc;
  },
  { '(none)': '' },
);

interface OverflowMenuStoryArgs {
  showIconsSection: boolean;
  iconAction1Icon: string;
  iconAction1Label: string;
  iconAction2Icon: string;
  iconAction2Label: string;
  iconAction3Icon: string;
  iconAction3Label: string;
  showSection1: boolean;
  section1Title: string;
  section1ItemCount: number;
  s1Item1Icon: string;
  s1Item1Label: string;
  s1Item2Icon: string;
  s1Item2Label: string;
  s1Item3Icon: string;
  s1Item3Label: string;
  s1Item4Icon: string;
  s1Item4Label: string;
  showSection2: boolean;
  section2Title: string;
  section2ItemCount: number;
  s2Item1Icon: string;
  s2Item1Label: string;
  s2Item2Icon: string;
  s2Item2Label: string;
  s2Item3Icon: string;
  s2Item3Label: string;
  s2Item4Icon: string;
  s2Item4Label: string;
}

function buildIconActions(args: OverflowMenuStoryArgs): OverflowMenuIconAction[] {
  if (!args.showIconsSection) return [];
  return [
    { icon: args.iconAction1Icon, label: args.iconAction1Label },
    { icon: args.iconAction2Icon, label: args.iconAction2Label },
    { icon: args.iconAction3Icon, label: args.iconAction3Label },
  ];
}

function buildSections(args: OverflowMenuStoryArgs): OverflowMenuSection[] {
  const sections: OverflowMenuSection[] = [];

  if (args.showSection1) {
    const allItems = [
      { icon: args.s1Item1Icon, label: args.s1Item1Label },
      { icon: args.s1Item2Icon, label: args.s1Item2Label },
      { icon: args.s1Item3Icon, label: args.s1Item3Label },
      { icon: args.s1Item4Icon, label: args.s1Item4Label },
    ];
    sections.push({
      title: args.section1Title || undefined,
      items: allItems.slice(0, args.section1ItemCount),
    });
  }

  if (args.showSection2) {
    const allItems = [
      { icon: args.s2Item1Icon, label: args.s2Item1Label },
      { icon: args.s2Item2Icon, label: args.s2Item2Label },
      { icon: args.s2Item3Icon, label: args.s2Item3Label },
      { icon: args.s2Item4Icon, label: args.s2Item4Label },
    ];
    sections.push({
      title: args.section2Title || undefined,
      items: allItems.slice(0, args.section2ItemCount),
    });
  }

  return sections;
}

function PlaygroundRender(args: OverflowMenuStoryArgs) {
  return (
    <OverflowMenu
      showIconsSection={args.showIconsSection}
      iconActions={buildIconActions(args)}
      sections={buildSections(args)}
    />
  );
}

const iconArgType = (description: string, defaultVal: string, category: string) => ({
  control: 'select' as const,
  options: Object.keys(ICON_OPTIONS),
  mapping: ICON_OPTIONS,
  description,
  table: { defaultValue: { summary: defaultVal }, category },
});

const meta: Meta<OverflowMenuStoryArgs> = {
  title: 'Components/Overflow Menu',
  component: OverflowMenu,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    /* ── Icons Section ─────────────────────────────── */
    showIconsSection: {
      control: 'boolean',
      description: 'Show the top icon actions row',
      table: { defaultValue: { summary: 'true' }, category: 'Icons Section' },
    },
    iconAction1Icon: { ...iconArgType('Icon action 1 icon', 'share_ios', 'Icons Section'), if: { arg: 'showIconsSection' } },
    iconAction1Label: { control: 'text', description: 'Icon action 1 label', table: { defaultValue: { summary: 'Share' }, category: 'Icons Section' }, if: { arg: 'showIconsSection' } },
    iconAction2Icon: { ...iconArgType('Icon action 2 icon', 'copy_outline', 'Icons Section'), if: { arg: 'showIconsSection' } },
    iconAction2Label: { control: 'text', description: 'Icon action 2 label', table: { defaultValue: { summary: 'Copy' }, category: 'Icons Section' }, if: { arg: 'showIconsSection' } },
    iconAction3Icon: { ...iconArgType('Icon action 3 icon', 'bookmark_outline', 'Icons Section'), if: { arg: 'showIconsSection' } },
    iconAction3Label: { control: 'text', description: 'Icon action 3 label', table: { defaultValue: { summary: 'Save' }, category: 'Icons Section' }, if: { arg: 'showIconsSection' } },

    /* ── Section 1 ─────────────────────────────────── */
    showSection1: {
      control: 'boolean',
      description: 'Show text section 1',
      table: { defaultValue: { summary: 'true' }, category: 'Section 1' },
    },
    section1Title: { control: 'text', description: 'Section 1 title', table: { defaultValue: { summary: 'Section Title' }, category: 'Section 1' }, if: { arg: 'showSection1' } },
    section1ItemCount: { control: { type: 'range', min: 1, max: 4, step: 1 }, description: 'Number of items in section 1', table: { defaultValue: { summary: '4' }, category: 'Section 1' }, if: { arg: 'showSection1' } },
    s1Item1Icon: { ...iconArgType('Item 1 icon', 'eye_outline', 'Section 1'), if: { arg: 'showSection1' } },
    s1Item1Label: { control: 'text', description: 'Item 1 label', table: { defaultValue: { summary: 'View' }, category: 'Section 1' }, if: { arg: 'showSection1' } },
    s1Item2Icon: { ...iconArgType('Item 2 icon', 'copy_outline', 'Section 1'), if: { arg: 'showSection1' } },
    s1Item2Label: { control: 'text', description: 'Item 2 label', table: { defaultValue: { summary: 'Duplicate' }, category: 'Section 1' }, if: { arg: 'showSection1' } },
    s1Item3Icon: { ...iconArgType('Item 3 icon', 'download_outline', 'Section 1'), if: { arg: 'showSection1' } },
    s1Item3Label: { control: 'text', description: 'Item 3 label', table: { defaultValue: { summary: 'Download' }, category: 'Section 1' }, if: { arg: 'showSection1' } },
    s1Item4Icon: { ...iconArgType('Item 4 icon', 'bin_outline', 'Section 1'), if: { arg: 'showSection1' } },
    s1Item4Label: { control: 'text', description: 'Item 4 label', table: { defaultValue: { summary: 'Delete' }, category: 'Section 1' }, if: { arg: 'showSection1' } },

    /* ── Section 2 ─────────────────────────────────── */
    showSection2: {
      control: 'boolean',
      description: 'Show text section 2',
      table: { defaultValue: { summary: 'true' }, category: 'Section 2' },
    },
    section2Title: { control: 'text', description: 'Section 2 title', table: { defaultValue: { summary: 'Section Title' }, category: 'Section 2' }, if: { arg: 'showSection2' } },
    section2ItemCount: { control: { type: 'range', min: 1, max: 4, step: 1 }, description: 'Number of items in section 2', table: { defaultValue: { summary: '4' }, category: 'Section 2' }, if: { arg: 'showSection2' } },
    s2Item1Icon: { ...iconArgType('Item 1 icon', 'lock_outline', 'Section 2'), if: { arg: 'showSection2' } },
    s2Item1Label: { control: 'text', description: 'Item 1 label', table: { defaultValue: { summary: 'Lock' }, category: 'Section 2' }, if: { arg: 'showSection2' } },
    s2Item2Icon: { ...iconArgType('Item 2 icon', 'info_circle_outline', 'Section 2'), if: { arg: 'showSection2' } },
    s2Item2Label: { control: 'text', description: 'Item 2 label', table: { defaultValue: { summary: 'Info' }, category: 'Section 2' }, if: { arg: 'showSection2' } },
    s2Item3Icon: { ...iconArgType('Item 3 icon', 'help', 'Section 2'), if: { arg: 'showSection2' } },
    s2Item3Label: { control: 'text', description: 'Item 3 label', table: { defaultValue: { summary: 'Help' }, category: 'Section 2' }, if: { arg: 'showSection2' } },
    s2Item4Icon: { ...iconArgType('Item 4 icon', 'logout_outline', 'Section 2'), if: { arg: 'showSection2' } },
    s2Item4Label: { control: 'text', description: 'Item 4 label', table: { defaultValue: { summary: 'Log Out' }, category: 'Section 2' }, if: { arg: 'showSection2' } },
  },
  args: {
    showIconsSection: true,
    iconAction1Icon: 'share_ios',
    iconAction1Label: 'Share',
    iconAction2Icon: 'copy_outline',
    iconAction2Label: 'Copy',
    iconAction3Icon: 'bookmark_outline',
    iconAction3Label: 'Save',
    showSection1: true,
    section1Title: 'Section Title',
    section1ItemCount: 4,
    s1Item1Icon: 'eye_outline',
    s1Item1Label: 'View',
    s1Item2Icon: 'copy_outline',
    s1Item2Label: 'Duplicate',
    s1Item3Icon: 'download_outline',
    s1Item3Label: 'Download',
    s1Item4Icon: 'bin_outline',
    s1Item4Label: 'Delete',
    showSection2: true,
    section2Title: 'Section Title',
    section2ItemCount: 4,
    s2Item1Icon: 'lock_outline',
    s2Item1Label: 'Lock',
    s2Item2Icon: 'info_circle_outline',
    s2Item2Label: 'Info',
    s2Item3Icon: 'help',
    s2Item3Label: 'Help',
    s2Item4Icon: 'logout_outline',
    s2Item4Label: 'Log Out',
  },
  render: PlaygroundRender,
};

export default meta;
type Story = StoryObj<OverflowMenuStoryArgs>;

export const Playground: Story = {};

export const IconsOnly: Story = {
  args: { showIconsSection: true, showSection1: false, showSection2: false },
};

export const TextOnly: Story = {
  args: { showIconsSection: false, showSection1: true, showSection2: false },
};

export const SingleSection: Story = {
  args: { showIconsSection: true, showSection1: true, showSection2: false },
};

export const FullMenu: Story = {
  args: { showIconsSection: true, showSection1: true, showSection2: true },
};
