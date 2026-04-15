import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SegmentedControl, type SegmentItem } from './SegmentedControl';
import { iconNames } from '../Icon';

const iconOptions = ['(none)', ...iconNames];

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  argTypes: {
    segments: {
      control: false,
      description: 'Array of SegmentItem objects (2 or 3 items)',
      table: { category: 'Data' },
    },
    value: {
      control: 'text',
      description: 'Controlled selected segment value',
      table: { category: 'State', defaultValue: { summary: 'undefined' } },
    },
    defaultValue: {
      control: 'text',
      description: 'Default selected value (uncontrolled mode)',
      table: { category: 'State' },
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when a segment is selected',
      table: { category: 'Events' },
    },
    width: {
      control: { type: 'number', min: 200, max: 600, step: 10 },
      description: 'Component width in pixels or CSS string',
      table: { category: 'Layout', defaultValue: { summary: '344' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the entire control',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Helpers ────────────────────────────────────────── */
const twoSegments: SegmentItem[] = [
  { value: 'first', label: 'First' },
  { value: 'second', label: 'Second' },
];

const threeSegments: SegmentItem[] = [
  { value: 'first', label: 'First' },
  { value: 'second', label: 'Second' },
  { value: 'third', label: 'Third' },
];

/* ── Playground (Interactive) ──────────────────────── */
interface PlaygroundArgs {
  segmentCount: 2 | 3;
  label1: string;
  label2: string;
  label3: string;
  showLeadingIcon1: boolean;
  leadingIcon1: string;
  showTrailingIcon1: boolean;
  trailingIcon1: string;
  showBadge1: boolean;
  badgeContent1: string;
  showLeadingIcon2: boolean;
  leadingIcon2: string;
  showTrailingIcon2: boolean;
  trailingIcon2: string;
  showBadge2: boolean;
  badgeContent2: string;
  showLeadingIcon3: boolean;
  leadingIcon3: string;
  showTrailingIcon3: boolean;
  trailingIcon3: string;
  showBadge3: boolean;
  badgeContent3: string;
  width: number;
  disabled: boolean;
}

const iconMapping = Object.fromEntries([
  ['(none)', undefined],
  ...iconNames.map((n) => [n, n]),
]);

export const Playground: StoryObj<PlaygroundArgs> = {
  argTypes: {
    segmentCount: {
      control: 'inline-radio',
      options: [2, 3],
      description: 'Number of segments',
      table: { category: 'Layout', defaultValue: { summary: '3' } },
    },
    label1: {
      control: 'text',
      description: 'Label for segment 1',
      table: { category: 'Segment 1' },
    },
    showLeadingIcon1: {
      control: 'boolean',
      description: 'Show leading icon on segment 1',
      table: { category: 'Segment 1' },
    },
    leadingIcon1: {
      control: 'select',
      options: iconOptions,
      mapping: iconMapping,
      description: 'Leading icon for segment 1',
      table: { category: 'Segment 1' },
    },
    showTrailingIcon1: {
      control: 'boolean',
      description: 'Show trailing icon on segment 1',
      table: { category: 'Segment 1' },
    },
    trailingIcon1: {
      control: 'select',
      options: iconOptions,
      mapping: iconMapping,
      description: 'Trailing icon for segment 1',
      table: { category: 'Segment 1' },
    },
    showBadge1: {
      control: 'boolean',
      description: 'Show badge on segment 1',
      table: { category: 'Segment 1' },
    },
    badgeContent1: {
      control: 'text',
      description: 'Badge text for segment 1',
      table: { category: 'Segment 1' },
    },
    label2: {
      control: 'text',
      description: 'Label for segment 2',
      table: { category: 'Segment 2' },
    },
    showLeadingIcon2: {
      control: 'boolean',
      description: 'Show leading icon on segment 2',
      table: { category: 'Segment 2' },
    },
    leadingIcon2: {
      control: 'select',
      options: iconOptions,
      mapping: iconMapping,
      description: 'Leading icon for segment 2',
      table: { category: 'Segment 2' },
    },
    showTrailingIcon2: {
      control: 'boolean',
      description: 'Show trailing icon on segment 2',
      table: { category: 'Segment 2' },
    },
    trailingIcon2: {
      control: 'select',
      options: iconOptions,
      mapping: iconMapping,
      description: 'Trailing icon for segment 2',
      table: { category: 'Segment 2' },
    },
    showBadge2: {
      control: 'boolean',
      description: 'Show badge on segment 2',
      table: { category: 'Segment 2' },
    },
    badgeContent2: {
      control: 'text',
      description: 'Badge text for segment 2',
      table: { category: 'Segment 2' },
    },
    label3: {
      control: 'text',
      description: 'Label for segment 3',
      table: { category: 'Segment 3' },
    },
    showLeadingIcon3: {
      control: 'boolean',
      description: 'Show leading icon on segment 3',
      table: { category: 'Segment 3' },
    },
    leadingIcon3: {
      control: 'select',
      options: iconOptions,
      mapping: iconMapping,
      description: 'Leading icon for segment 3',
      table: { category: 'Segment 3' },
    },
    showTrailingIcon3: {
      control: 'boolean',
      description: 'Show trailing icon on segment 3',
      table: { category: 'Segment 3' },
    },
    trailingIcon3: {
      control: 'select',
      options: iconOptions,
      mapping: iconMapping,
      description: 'Trailing icon for segment 3',
      table: { category: 'Segment 3' },
    },
    showBadge3: {
      control: 'boolean',
      description: 'Show badge on segment 3',
      table: { category: 'Segment 3' },
    },
    badgeContent3: {
      control: 'text',
      description: 'Badge text for segment 3',
      table: { category: 'Segment 3' },
    },
    width: {
      control: { type: 'number', min: 200, max: 600, step: 10 },
      description: 'Component width in pixels',
      table: { category: 'Layout', defaultValue: { summary: '344' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the entire control',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
  },
  args: {
    segmentCount: 3,
    label1: 'First',
    label2: 'Second',
    label3: 'Third',
    showLeadingIcon1: false,
    leadingIcon1: '(none)' as unknown as string,
    showTrailingIcon1: false,
    trailingIcon1: '(none)' as unknown as string,
    showBadge1: false,
    badgeContent1: '3',
    showLeadingIcon2: false,
    leadingIcon2: '(none)' as unknown as string,
    showTrailingIcon2: false,
    trailingIcon2: '(none)' as unknown as string,
    showBadge2: false,
    badgeContent2: '3',
    showLeadingIcon3: false,
    leadingIcon3: '(none)' as unknown as string,
    showTrailingIcon3: false,
    trailingIcon3: '(none)' as unknown as string,
    showBadge3: false,
    badgeContent3: '3',
    width: 344,
    disabled: false,
  },
  render: (args) => {
    const segments: SegmentItem[] = [
      {
        value: 'first',
        label: args.label1,
        showLeadingIcon: args.showLeadingIcon1,
        leadingIcon: args.leadingIcon1,
        showTrailingIcon: args.showTrailingIcon1,
        trailingIcon: args.trailingIcon1,
        showBadge: args.showBadge1,
        badgeContent: args.badgeContent1,
      },
      {
        value: 'second',
        label: args.label2,
        showLeadingIcon: args.showLeadingIcon2,
        leadingIcon: args.leadingIcon2,
        showTrailingIcon: args.showTrailingIcon2,
        trailingIcon: args.trailingIcon2,
        showBadge: args.showBadge2,
        badgeContent: args.badgeContent2,
      },
    ];

    if (args.segmentCount === 3) {
      segments.push({
        value: 'third',
        label: args.label3,
        showLeadingIcon: args.showLeadingIcon3,
        leadingIcon: args.leadingIcon3,
        showTrailingIcon: args.showTrailingIcon3,
        trailingIcon: args.trailingIcon3,
        showBadge: args.showBadge3,
        badgeContent: args.badgeContent3,
      });
    }

    return (
      <SegmentedControl
        segments={segments}
        defaultValue="first"
        width={args.width}
        disabled={args.disabled}
      />
    );
  },
};

/* ═══════════════════════════════════════════════════
   Segment Count Variants
   ═══════════════════════════════════════════════════ */
export const TwoSegments: Story = {
  name: 'Segments / Two',
  args: {
    segments: twoSegments,
    defaultValue: 'first',
    width: 344,
  },
};

export const ThreeSegments: Story = {
  name: 'Segments / Three',
  args: {
    segments: threeSegments,
    defaultValue: 'first',
    width: 344,
  },
};

/* ═══════════════════════════════════════════════════
   Active Segment Variants
   ═══════════════════════════════════════════════════ */
export const ActiveFirst: Story = {
  name: 'Active / First',
  args: {
    segments: threeSegments,
    defaultValue: 'first',
  },
};

export const ActiveSecond: Story = {
  name: 'Active / Second',
  args: {
    segments: threeSegments,
    defaultValue: 'second',
  },
};

export const ActiveThird: Story = {
  name: 'Active / Third',
  args: {
    segments: threeSegments,
    defaultValue: 'third',
  },
};

/* ═══════════════════════════════════════════════════
   With Icons
   ═══════════════════════════════════════════════════ */
export const WithLeadingIcons: Story = {
  name: 'Icons / Leading',
  args: {
    segments: [
      { value: 'home', label: 'Home', showLeadingIcon: true, leadingIcon: 'home_filled' },
      { value: 'search', label: 'Search', showLeadingIcon: true, leadingIcon: 'search_outline' },
      { value: 'profile', label: 'Profile', showLeadingIcon: true, leadingIcon: 'person_filled' },
    ],
    defaultValue: 'home',
  },
};

export const WithTrailingIcons: Story = {
  name: 'Icons / Trailing',
  args: {
    segments: [
      { value: 'inbox', label: 'Inbox', showTrailingIcon: true, trailingIcon: 'arrow_down_outline' },
      { value: 'sent', label: 'Sent', showTrailingIcon: true, trailingIcon: 'arrow_down_outline' },
      { value: 'drafts', label: 'Drafts', showTrailingIcon: true, trailingIcon: 'arrow_down_outline' },
    ],
    defaultValue: 'inbox',
  },
};

export const WithMixedIcons: Story = {
  name: 'Icons / Mixed',
  args: {
    segments: [
      { value: 'all', label: 'All', showLeadingIcon: true, leadingIcon: 'star_filled' },
      { value: 'fav', label: 'Favourites', showLeadingIcon: true, leadingIcon: 'like_filled' },
    ],
    defaultValue: 'all',
    width: 344,
  },
};

/* ═══════════════════════════════════════════════════
   With Badges
   ═══════════════════════════════════════════════════ */
export const WithBadges: Story = {
  name: 'Badges / Count',
  args: {
    segments: [
      { value: 'all', label: 'All', showBadge: true, badgeContent: '3' },
      { value: 'unread', label: 'Unread', showBadge: true, badgeContent: '5' },
      { value: 'starred', label: 'Starred' },
    ],
    defaultValue: 'all',
    width: 400,
  },
};

export const IconsAndBadges: Story = {
  name: 'Badges / With Icons',
  args: {
    segments: [
      { value: 'chat', label: 'Chat', showLeadingIcon: true, leadingIcon: 'chat_filled', showBadge: true, badgeContent: '3' },
      { value: 'calls', label: 'Calls', showLeadingIcon: true, leadingIcon: 'phone_message_filled' },
      { value: 'contacts', label: 'Contacts', showLeadingIcon: true, leadingIcon: 'contacts_filled' },
    ],
    defaultValue: 'chat',
    width: 420,
  },
};

/* ═══════════════════════════════════════════════════
   State Variants
   ═══════════════════════════════════════════════════ */
export const Disabled: Story = {
  name: 'State / Disabled',
  args: {
    segments: threeSegments,
    defaultValue: 'first',
    disabled: true,
  },
};

export const PartiallyDisabled: Story = {
  name: 'State / Partially Disabled',
  args: {
    segments: [
      { value: 'active', label: 'Active' },
      { value: 'disabled', label: 'Disabled', disabled: true },
      { value: 'also-active', label: 'Also Active' },
    ],
    defaultValue: 'active',
  },
};

/* ═══════════════════════════════════════════════════
   Width Variants
   ═══════════════════════════════════════════════════ */
export const NarrowWidth: Story = {
  name: 'Width / Narrow (240px)',
  args: {
    segments: twoSegments,
    defaultValue: 'first',
    width: 240,
  },
};

export const WideWidth: Story = {
  name: 'Width / Wide (500px)',
  args: {
    segments: threeSegments,
    defaultValue: 'first',
    width: 500,
  },
};

export const FullWidth: Story = {
  name: 'Width / 100%',
  args: {
    segments: threeSegments,
    defaultValue: 'first',
    width: '100%',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500 }}>
        <Story />
      </div>
    ),
  ],
};

/* ═══════════════════════════════════════════════════
   Interactive Demo (Controlled)
   ═══════════════════════════════════════════════════ */
const ControlledDemo = () => {
  const [selected, setSelected] = useState('day');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <SegmentedControl
        segments={[
          { value: 'day', label: 'Day' },
          { value: 'week', label: 'Week' },
          { value: 'month', label: 'Month' },
        ]}
        value={selected}
        onChange={setSelected}
      />
      <p style={{ margin: 0, fontSize: 14, color: 'var(--text-neutral-medium)' }}>
        Selected: <strong>{selected}</strong>
      </p>
    </div>
  );
};

export const Controlled: Story = {
  name: 'Interactive / Controlled',
  render: () => <ControlledDemo />,
};

/* ═══════════════════════════════════════════════════
   All Variants Matrix
   ═══════════════════════════════════════════════════ */
export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontWeight: 600 }}>2 Segments</p>
        <SegmentedControl segments={twoSegments} defaultValue="first" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontWeight: 600 }}>3 Segments</p>
        <SegmentedControl segments={threeSegments} defaultValue="first" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontWeight: 600 }}>With Leading Icons</p>
        <SegmentedControl
          segments={[
            { value: 'a', label: 'Home', showLeadingIcon: true, leadingIcon: 'home_filled' },
            { value: 'b', label: 'Search', showLeadingIcon: true, leadingIcon: 'search_outline' },
            { value: 'c', label: 'Profile', showLeadingIcon: true, leadingIcon: 'person_filled' },
          ]}
          defaultValue="a"
        />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontWeight: 600 }}>With Badges</p>
        <SegmentedControl
          segments={[
            { value: 'a', label: 'All', showBadge: true, badgeContent: '3' },
            { value: 'b', label: 'Unread', showBadge: true, badgeContent: '5' },
            { value: 'c', label: 'Starred' },
          ]}
          defaultValue="a"
          width={400}
        />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Disabled</p>
        <SegmentedControl segments={threeSegments} defaultValue="first" disabled />
      </div>
    </div>
  ),
};
