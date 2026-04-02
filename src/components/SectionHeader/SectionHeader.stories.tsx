import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SectionHeader } from './SectionHeader';
import type { SectionHeaderSize, SectionHeaderTrailing } from './SectionHeader';
import { iconNames } from '../Icon';

const ICON_OPTIONS = iconNames.reduce<Record<string, string>>(
  (acc, name) => {
    acc[name] = name;
    return acc;
  },
  { '(none)': '' },
);

interface SectionHeaderStoryArgs {
  size: SectionHeaderSize;
  trailing: SectionHeaderTrailing;
  title: string;
  showSubtext: boolean;
  subtext: string;
  showChevron: boolean;
  trailingText: string;
  linkText: string;
  buttonLabel: string;
  showIcon: boolean;
  iconName: string;
  showChips: boolean;
  chipLabels: string[];
}

function PlaygroundRender(args: SectionHeaderStoryArgs) {
  const [activeChip, setActiveChip] = useState(0);

  return (
    <SectionHeader
      size={args.size}
      trailing={args.trailing}
      title={args.title}
      showSubtext={args.showSubtext}
      subtext={args.subtext}
      showChevron={args.showChevron}
      trailingText={args.trailingText}
      linkText={args.linkText}
      buttonLabel={args.buttonLabel}
      showIcon={args.showIcon}
      iconName={args.iconName}
      showChips={args.showChips}
      chipLabels={args.chipLabels}
      activeChip={activeChip}
      onChipChange={setActiveChip}
    />
  );
}

const meta: Meta<SectionHeaderStoryArgs> = {
  title: 'Components/Section Header',
  component: SectionHeader,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 376 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['extra-large', 'large', 'medium', 'small'] as SectionHeaderSize[],
      description: 'Size variant',
      table: { defaultValue: { summary: 'extra-large' }, category: 'Appearance' },
    },
    trailing: {
      control: 'select',
      options: ['none', 'link', 'text', 'icons', 'button'] as SectionHeaderTrailing[],
      description: 'Trailing content type',
      table: { defaultValue: { summary: 'none' }, category: 'Appearance' },
    },
    title: {
      control: 'text',
      description: 'Title text',
      table: { defaultValue: { summary: 'Title Text' }, category: 'Content' },
    },
    showSubtext: {
      control: 'boolean',
      description: 'Show subtext below title',
      table: { defaultValue: { summary: 'true' }, category: 'Content' },
    },
    subtext: {
      control: 'text',
      description: 'Subtext below title',
      table: { defaultValue: { summary: '2-line subtext' }, category: 'Content' },
      if: { arg: 'showSubtext' },
    },
    showChevron: {
      control: 'boolean',
      description: 'Show chevron next to title (always shown for extra-large)',
      table: { defaultValue: { summary: 'false' }, category: 'Appearance' },
    },

    /* ── Trailing: Text ───────────────────────────── */
    trailingText: {
      control: 'text',
      description: 'Trailing text label',
      table: { defaultValue: { summary: 'Text' }, category: 'Trailing' },
      if: { arg: 'trailing', eq: 'text' },
    },

    /* ── Trailing: Link ───────────────────────────── */
    linkText: {
      control: 'text',
      description: 'Link text label',
      table: { defaultValue: { summary: 'Link' }, category: 'Trailing' },
      if: { arg: 'trailing', eq: 'link' },
    },

    /* ── Trailing: Button ─────────────────────────── */
    buttonLabel: {
      control: 'text',
      description: 'Button label text',
      table: { defaultValue: { summary: 'Button' }, category: 'Trailing' },
      if: { arg: 'trailing', eq: 'button' },
    },

    /* ── Trailing: Icons ──────────────────────────── */
    showIcon: {
      control: 'boolean',
      description: 'Show icon button',
      table: { defaultValue: { summary: 'true' }, category: 'Trailing' },
      if: { arg: 'trailing', eq: 'icons' },
    },
    iconName: {
      control: 'select',
      options: Object.keys(ICON_OPTIONS),
      mapping: ICON_OPTIONS,
      description: 'Icon name for the button',
      table: { defaultValue: { summary: 'rupee' }, category: 'Trailing' },
      if: { arg: 'trailing', eq: 'icons' },
    },

    /* ── Chips ────────────────────────────────────── */
    showChips: {
      control: 'boolean',
      description: 'Show chips row below',
      table: { defaultValue: { summary: 'false' }, category: 'Chips' },
    },
    chipLabels: {
      control: 'object',
      description: 'Array of chip labels',
      table: { defaultValue: { summary: "['Label','Label','Label','Label','Label']" }, category: 'Chips' },
      if: { arg: 'showChips' },
    },
  },
  args: {
    size: 'extra-large',
    trailing: 'none',
    title: 'Title Text',
    showSubtext: true,
    subtext: '2-line subtext',
    showChevron: false,
    trailingText: 'Text',
    linkText: 'Link',
    buttonLabel: 'Button',
    showIcon: true,
    iconName: 'rupee',
    showChips: false,
    chipLabels: ['Label', 'Label', 'Label', 'Label', 'Label'],
  },
  render: PlaygroundRender,
};

export default meta;
type Story = StoryObj<SectionHeaderStoryArgs>;

/* ── Playground ──────────────────────────────────── */
export const Playground: Story = {};

/* ── Size Variants ───────────────────────────────── */
export const ExtraLarge: Story = {
  args: { size: 'extra-large', trailing: 'none' },
};

export const Large: Story = {
  args: { size: 'large', trailing: 'none' },
};

export const Medium: Story = {
  args: { size: 'medium', trailing: 'none' },
};

export const Small: Story = {
  args: { size: 'small', trailing: 'none' },
};

/* ── Trailing Variants ───────────────────────────── */
export const TrailingText: Story = {
  args: { size: 'extra-large', trailing: 'text', trailingText: 'Text' },
};

export const TrailingLink: Story = {
  args: { size: 'extra-large', trailing: 'link', linkText: 'Link' },
};

export const TrailingButton: Story = {
  args: { size: 'extra-large', trailing: 'button', buttonLabel: 'Button' },
};

export const TrailingIcons: Story = {
  args: { size: 'extra-large', trailing: 'icons', showIcon: true, iconName: 'rupee' },
};

/* ── With Chips ──────────────────────────────────── */
export const WithChips: Story = {
  args: {
    size: 'extra-large',
    trailing: 'none',
    showChips: true,
    chipLabels: ['All', 'Popular', 'New', 'Trending', 'For You'],
  },
};

/* ── Chevron Toggle ──────────────────────────────── */
export const SmallWithChevron: Story = {
  args: { size: 'small', trailing: 'link', showChevron: true, linkText: 'View All' },
};

/* ── All sizes × trailing grid ───────────────────── */
function AllVariantsRender() {
  const sizes: SectionHeaderSize[] = ['extra-large', 'large', 'medium', 'small'];
  const trailings: SectionHeaderTrailing[] = ['none', 'text', 'link', 'button', 'icons'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {sizes.map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <strong style={{ fontSize: 13, color: 'var(--text-neutral-medium)', textTransform: 'uppercase', letterSpacing: 1 }}>
            {size}
          </strong>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            {trailings.map((trailing) => (
              <div key={`${size}-${trailing}`} style={{ width: 376 }}>
                <SectionHeader
                  size={size}
                  trailing={trailing}
                  title="Title Text"
                  subtext="2-line subtext"
                  iconName="rupee"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export const AllVariants: Story = {
  render: AllVariantsRender,
  parameters: { controls: { disable: true } },
};
