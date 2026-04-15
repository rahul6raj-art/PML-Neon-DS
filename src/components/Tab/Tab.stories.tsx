import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, type TabItem } from './Tab';
import { iconNames } from '../Icon';

const iconOptions = ['(none)', ...iconNames];
const iconMapping = Object.fromEntries([
  ['(none)', undefined],
  ...iconNames.map((n) => [n, n]),
]);

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      control: false,
      description: 'Array of TabItem objects',
      table: { category: 'Data' },
    },
    value: {
      control: 'text',
      description: 'Controlled active tab value',
      table: { category: 'State', defaultValue: { summary: 'undefined' } },
    },
    defaultValue: {
      control: 'text',
      description: 'Default active tab value (uncontrolled)',
      table: { category: 'State' },
    },
    onChange: {
      action: 'changed',
      description: 'Callback when a tab is selected',
      table: { category: 'Events' },
    },
    size: {
      control: 'inline-radio',
      options: ['medium', 'large'],
      description: 'Tab size — affects font size and padding',
      table: { category: 'Appearance', defaultValue: { summary: 'medium' } },
    },
    width: {
      control: { type: 'number', min: 200, max: 800, step: 10 },
      description: 'Container width in pixels or CSS string',
      table: { category: 'Layout' },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Helpers ────────────────────────────────────────── */
const twoTabs: TabItem[] = [
  { value: 'tab1', label: 'Tab' },
  { value: 'tab2', label: 'Tab' },
];

const threeTabs: TabItem[] = [
  { value: 'tab1', label: 'Tab' },
  { value: 'tab2', label: 'Tab' },
  { value: 'tab3', label: 'Tab' },
];

const fourTabs: TabItem[] = [
  { value: 'tab1', label: 'Tab' },
  { value: 'tab2', label: 'Tab' },
  { value: 'tab3', label: 'Tab' },
  { value: 'tab4', label: 'Tab' },
];

const fiveTabs: TabItem[] = [
  { value: 'tab1', label: 'Tab' },
  { value: 'tab2', label: 'Tab' },
  { value: 'tab3', label: 'Tab' },
  { value: 'tab4', label: 'Tab' },
  { value: 'tab5', label: 'Tab' },
];

const sixTabs: TabItem[] = [
  { value: 'tab1', label: 'Tab' },
  { value: 'tab2', label: 'Tab' },
  { value: 'tab3', label: 'Tab' },
  { value: 'tab4', label: 'Tab' },
  { value: 'tab5', label: 'Tab' },
  { value: 'tab6', label: 'Tab' },
];

/* ── Playground (Interactive) ──────────────────────── */
interface PlaygroundArgs {
  tabCount: 2 | 3 | 4 | 5 | 6;
  size: 'medium' | 'large';
  label1: string;
  label2: string;
  label3: string;
  label4: string;
  label5: string;
  label6: string;
  showLeadingIcon1: boolean;
  leadingIcon1: string;
  showBadge1: boolean;
  badgeContent1: string;
  disabled3: boolean;
  width: number;
}

export const Playground: StoryObj<PlaygroundArgs> = {
  argTypes: {
    tabCount: {
      control: 'inline-radio',
      options: [2, 3, 4, 5, 6],
      description: 'Number of tabs',
      table: { category: 'Layout', defaultValue: { summary: '3' } },
    },
    size: {
      control: 'inline-radio',
      options: ['medium', 'large'],
      description: 'Tab size',
      table: { category: 'Appearance', defaultValue: { summary: 'medium' } },
    },
    label1: { control: 'text', table: { category: 'Tab 1' } },
    label2: { control: 'text', table: { category: 'Tab 2' } },
    label3: { control: 'text', table: { category: 'Tab 3' } },
    label4: { control: 'text', table: { category: 'Tab 4' } },
    label5: { control: 'text', table: { category: 'Tab 5' } },
    label6: { control: 'text', table: { category: 'Tab 6' } },
    showLeadingIcon1: {
      control: 'boolean',
      description: 'Show leading icon on tab 1',
      table: { category: 'Tab 1' },
    },
    leadingIcon1: {
      control: 'select',
      options: iconOptions,
      mapping: iconMapping,
      description: 'Leading icon for tab 1',
      table: { category: 'Tab 1' },
    },
    showBadge1: {
      control: 'boolean',
      description: 'Show badge on tab 1',
      table: { category: 'Tab 1' },
    },
    badgeContent1: {
      control: 'text',
      description: 'Badge text for tab 1',
      table: { category: 'Tab 1' },
    },
    disabled3: {
      control: 'boolean',
      description: 'Disable tab 3',
      table: { category: 'Tab 3' },
    },
    width: {
      control: { type: 'number', min: 200, max: 800, step: 10 },
      description: 'Container width in pixels',
      table: { category: 'Layout', defaultValue: { summary: '376' } },
    },
  },
  args: {
    tabCount: 3,
    size: 'medium',
    label1: 'Home',
    label2: 'Profile',
    label3: 'Settings',
    label4: 'Inbox',
    label5: 'Search',
    label6: 'More',
    showLeadingIcon1: false,
    leadingIcon1: '(none)' as unknown as string,
    showBadge1: false,
    badgeContent1: '3',
    disabled3: false,
    width: 376,
  },
  render: (args) => {
    const allLabels = [args.label1, args.label2, args.label3, args.label4, args.label5, args.label6];
    const tabs: TabItem[] = Array.from({ length: args.tabCount }, (_, i) => ({
      value: `tab${i + 1}`,
      label: allLabels[i],
      ...(i === 0 && {
        showLeadingIcon: args.showLeadingIcon1,
        leadingIcon: args.leadingIcon1,
        showBadge: args.showBadge1,
        badgeContent: args.badgeContent1,
      }),
      ...(i === 2 && { disabled: args.disabled3 }),
    }));

    return (
      <Tabs
        tabs={tabs}
        defaultValue="tab1"
        size={args.size}
        width={args.width}
      />
    );
  },
};

/* ═══════════════════════════════════════════════════
   Tab Count — Medium
   ═══════════════════════════════════════════════════ */
export const TwoTabsMedium: Story = {
  name: 'Count / 2 Tabs (Medium)',
  args: { tabs: twoTabs, defaultValue: 'tab1', size: 'medium', width: 376 },
};

export const ThreeTabsMedium: Story = {
  name: 'Count / 3 Tabs (Medium)',
  args: { tabs: threeTabs, defaultValue: 'tab1', size: 'medium', width: 376 },
};

export const FourTabsMedium: Story = {
  name: 'Count / 4 Tabs (Medium)',
  args: { tabs: fourTabs, defaultValue: 'tab1', size: 'medium', width: 376 },
};

export const FiveTabsMedium: Story = {
  name: 'Count / 5 Tabs (Medium)',
  args: { tabs: fiveTabs, defaultValue: 'tab1', size: 'medium', width: 376 },
};

export const SixTabsMedium: Story = {
  name: 'Count / 6 Tabs (Medium)',
  args: { tabs: sixTabs, defaultValue: 'tab1', size: 'medium', width: 376 },
};

/* ═══════════════════════════════════════════════════
   Tab Count — Large
   ═══════════════════════════════════════════════════ */
export const ThreeTabsLarge: Story = {
  name: 'Count / 3 Tabs (Large)',
  args: { tabs: threeTabs, defaultValue: 'tab1', size: 'large', width: 376 },
};

export const SixTabsLarge: Story = {
  name: 'Count / 6 Tabs (Large)',
  args: { tabs: sixTabs, defaultValue: 'tab1', size: 'large', width: 376 },
};

/* ═══════════════════════════════════════════════════
   With Icons
   ═══════════════════════════════════════════════════ */
export const WithLeadingIcons: Story = {
  name: 'Icons / Leading',
  args: {
    tabs: [
      { value: 'home', label: 'Home', showLeadingIcon: true, leadingIcon: 'home_filled' },
      { value: 'search', label: 'Search', showLeadingIcon: true, leadingIcon: 'search_outline' },
      { value: 'profile', label: 'Profile', showLeadingIcon: true, leadingIcon: 'person_filled' },
    ],
    defaultValue: 'home',
    width: 376,
  },
};

export const WithTrailingIcons: Story = {
  name: 'Icons / Trailing',
  args: {
    tabs: [
      { value: 'inbox', label: 'Inbox', showTrailingIcon: true, trailingIcon: 'arrow_down_outline' },
      { value: 'sent', label: 'Sent', showTrailingIcon: true, trailingIcon: 'arrow_down_outline' },
      { value: 'draft', label: 'Draft', showTrailingIcon: true, trailingIcon: 'arrow_down_outline' },
    ],
    defaultValue: 'inbox',
    width: 376,
  },
};

/* ═══════════════════════════════════════════════════
   With Badges
   ═══════════════════════════════════════════════════ */
export const WithBadges: Story = {
  name: 'Badges / Count',
  args: {
    tabs: [
      { value: 'all', label: 'All', showBadge: true, badgeContent: '12' },
      { value: 'unread', label: 'Unread', showBadge: true, badgeContent: '3' },
      { value: 'starred', label: 'Starred' },
    ],
    defaultValue: 'all',
    width: 376,
  },
};

export const IconsAndBadges: Story = {
  name: 'Badges / With Icons',
  args: {
    tabs: [
      { value: 'chat', label: 'Chat', showLeadingIcon: true, leadingIcon: 'chat_filled', showBadge: true, badgeContent: '5' },
      { value: 'calls', label: 'Calls', showLeadingIcon: true, leadingIcon: 'phone_message_filled' },
      { value: 'contacts', label: 'Contacts', showLeadingIcon: true, leadingIcon: 'contacts_filled' },
    ],
    defaultValue: 'chat',
    width: 420,
  },
};

/* ═══════════════════════════════════════════════════
   Disabled Tabs
   ═══════════════════════════════════════════════════ */
export const WithDisabledTab: Story = {
  name: 'State / Disabled Tab',
  args: {
    tabs: [
      { value: 'active', label: 'Active' },
      { value: 'disabled', label: 'Disabled', disabled: true },
      { value: 'also-active', label: 'Also Active' },
    ],
    defaultValue: 'active',
    width: 376,
  },
};

/* ═══════════════════════════════════════════════════
   Size Comparison
   ═══════════════════════════════════════════════════ */
export const SizeComparison: Story = {
  name: 'Size Comparison',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Medium</p>
        <Tabs
          tabs={[
            { value: 'a', label: 'Tab' },
            { value: 'b', label: 'Tab' },
            { value: 'c', label: 'Tab' },
          ]}
          defaultValue="a"
          size="medium"
          width={376}
        />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Large</p>
        <Tabs
          tabs={[
            { value: 'a', label: 'Tab' },
            { value: 'b', label: 'Tab' },
            { value: 'c', label: 'Tab' },
          ]}
          defaultValue="a"
          size="large"
          width={376}
        />
      </div>
    </div>
  ),
};

/* ═══════════════════════════════════════════════════
   Interactive (Controlled)
   ═══════════════════════════════════════════════════ */
const ControlledDemo = () => {
  const [selected, setSelected] = useState('overview');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Tabs
        tabs={[
          { value: 'overview', label: 'Overview' },
          { value: 'features', label: 'Features' },
          { value: 'pricing', label: 'Pricing' },
          { value: 'reviews', label: 'Reviews' },
        ]}
        value={selected}
        onChange={setSelected}
        width={376}
      />
      <p style={{ margin: 0, fontSize: 14, color: 'var(--text-neutral-medium)', paddingLeft: 16 }}>
        Active: <strong>{selected}</strong>
      </p>
    </div>
  );
};

export const Controlled: Story = {
  name: 'Interactive / Controlled',
  render: () => <ControlledDemo />,
};

/* ═══════════════════════════════════════════════════
   Real-world Example
   ═══════════════════════════════════════════════════ */
export const RealWorld: Story = {
  name: 'Usage / Product Page',
  render: () => (
    <Tabs
      tabs={[
        { value: 'description', label: 'Description' },
        { value: 'specs', label: 'Specifications' },
        { value: 'reviews', label: 'Reviews', showBadge: true, badgeContent: '24' },
        { value: 'faq', label: 'FAQ' },
      ]}
      defaultValue="description"
      size="medium"
      width={500}
    />
  ),
};

export const NavigationTabs: Story = {
  name: 'Usage / Navigation',
  render: () => (
    <Tabs
      tabs={[
        { value: 'home', label: 'Home', showLeadingIcon: true, leadingIcon: 'home_filled' },
        { value: 'explore', label: 'Explore', showLeadingIcon: true, leadingIcon: 'search_outline' },
        { value: 'library', label: 'Library', showLeadingIcon: true, leadingIcon: 'bookmark_filled' },
        { value: 'profile', label: 'Profile', showLeadingIcon: true, leadingIcon: 'person_filled' },
      ]}
      defaultValue="home"
      size="large"
      width={500}
    />
  ),
};

/* ═══════════════════════════════════════════════════
   All Tab Counts (Medium) — Matrix
   ═══════════════════════════════════════════════════ */
export const AllCountsMedium: Story = {
  name: 'Matrix / All Counts (Medium)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {[sixTabs, fiveTabs, fourTabs, threeTabs, twoTabs].map((tabs, i) => (
        <div key={i}>
          <p style={{ margin: '0 0 8px', fontWeight: 600 }}>{tabs.length} Tabs</p>
          <Tabs tabs={tabs} defaultValue="tab1" size="medium" width={376} />
        </div>
      ))}
    </div>
  ),
};

export const AllCountsLarge: Story = {
  name: 'Matrix / All Counts (Large)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {[sixTabs, fiveTabs, fourTabs, threeTabs, twoTabs].map((tabs, i) => (
        <div key={i}>
          <p style={{ margin: '0 0 8px', fontWeight: 600 }}>{tabs.length} Tabs</p>
          <Tabs tabs={tabs} defaultValue="tab1" size="large" width={376} />
        </div>
      ))}
    </div>
  ),
};
