import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import type { HeaderType } from './Header';
import type { BrandLogoTheme } from '../BrandLogo';
import type { TabItem, TabSize } from '../Tab';
import type { ChipSize } from '../Chip';
import { Avatar } from '../Avatar';

const ICON_OPTIONS = [
  'search_outline',
  'bell_outline',
  'bell_filled',
  'person_outline',
  'person_filled',
  'home_outline',
  'home_filled',
  'star_outline',
  'star_filled',
  'filter_outline',
  'share_ios',
  'share_android',
  'menu_lines_3_horizontal',
  'menu_dots_vertical_outline',
  'info_circle_outline',
  'download_outline',
  'upload_outline',
  'handbag_outline',
  'like_outline',
  'forward_outline',
  'mappin_outline',
  'lock_outline',
  'eye_outline',
  'image_outline',
  'sync',
  'help',
];

interface HeaderStoryArgs {
  type: HeaderType;
  title: string;
  subtitle?: string;
  time: string;
  showBackButton: boolean;
  showBorderBottom: boolean;
  showGradient: boolean;
  showBrandLogo: boolean;
  brandLogoTheme: BrandLogoTheme;
  logoSrc?: string;
  logoAlt?: string;
  iconCount: number;
  icon1: string;
  icon2: string;
  icon3: string;
  showTabs: boolean;
  tabSize: TabSize;
  tabCount: number;
  tab1Label: string;
  tab1ShowBadge: boolean;
  tab1BadgeContent: string;
  tab1ShowLeadingIcon: boolean;
  tab1LeadingIcon: string;
  tab1ShowTrailingIcon: boolean;
  tab1TrailingIcon: string;
  tab2Label: string;
  tab2ShowBadge: boolean;
  tab2BadgeContent: string;
  tab2ShowLeadingIcon: boolean;
  tab2LeadingIcon: string;
  tab2ShowTrailingIcon: boolean;
  tab2TrailingIcon: string;
  tab3Label: string;
  tab3ShowBadge: boolean;
  tab3BadgeContent: string;
  tab3ShowLeadingIcon: boolean;
  tab3LeadingIcon: string;
  tab3ShowTrailingIcon: boolean;
  tab3TrailingIcon: string;
  tab4Label: string;
  tab4ShowBadge: boolean;
  tab4BadgeContent: string;
  tab4ShowLeadingIcon: boolean;
  tab4LeadingIcon: string;
  tab4ShowTrailingIcon: boolean;
  tab4TrailingIcon: string;
  tab5Label: string;
  tab5ShowBadge: boolean;
  tab5ShowLeadingIcon: boolean;
  tab6Label: string;
  tab6ShowBadge: boolean;
  tab6ShowLeadingIcon: boolean;
  showChips: boolean;
  chipSize: ChipSize;
  chipLabels: string[];
  chipShowLeadingIcon: boolean;
  chipLeadingIcon: string;
  chipShowTrailingIcon: boolean;
  chipTrailingIcon: string;
  chipShowBadge: boolean;
  chipBadgeContent: string;
}

function buildRhsIcons(args: { iconCount: number; icon1: string; icon2: string; icon3: string }) {
  return [args.icon1, args.icon2, args.icon3].slice(0, args.iconCount);
}

function buildTabs(args: HeaderStoryArgs): TabItem[] {
  const defs = [
    { label: args.tab1Label, showBadge: args.tab1ShowBadge, badgeContent: args.tab1BadgeContent, showLeadingIcon: args.tab1ShowLeadingIcon, leadingIcon: args.tab1LeadingIcon, showTrailingIcon: args.tab1ShowTrailingIcon, trailingIcon: args.tab1TrailingIcon },
    { label: args.tab2Label, showBadge: args.tab2ShowBadge, badgeContent: args.tab2BadgeContent, showLeadingIcon: args.tab2ShowLeadingIcon, leadingIcon: args.tab2LeadingIcon, showTrailingIcon: args.tab2ShowTrailingIcon, trailingIcon: args.tab2TrailingIcon },
    { label: args.tab3Label, showBadge: args.tab3ShowBadge, badgeContent: args.tab3BadgeContent, showLeadingIcon: args.tab3ShowLeadingIcon, leadingIcon: args.tab3LeadingIcon, showTrailingIcon: args.tab3ShowTrailingIcon, trailingIcon: args.tab3TrailingIcon },
    { label: args.tab4Label, showBadge: args.tab4ShowBadge, badgeContent: args.tab4BadgeContent, showLeadingIcon: args.tab4ShowLeadingIcon, leadingIcon: args.tab4LeadingIcon, showTrailingIcon: args.tab4ShowTrailingIcon, trailingIcon: args.tab4TrailingIcon },
    { label: args.tab5Label, showBadge: args.tab5ShowBadge, showLeadingIcon: args.tab5ShowLeadingIcon, showTrailingIcon: false },
    { label: args.tab6Label, showBadge: args.tab6ShowBadge, showLeadingIcon: args.tab6ShowLeadingIcon, showTrailingIcon: false },
  ];
  return defs.slice(0, args.tabCount).map((d, i) => ({
    value: `tab-${i}`,
    label: d.label,
    showBadge: d.showBadge,
    badgeContent: d.showBadge ? (d as Record<string, unknown>).badgeContent as string : undefined,
    showLeadingIcon: d.showLeadingIcon,
    leadingIcon: d.showLeadingIcon ? (d as Record<string, unknown>).leadingIcon as string : undefined,
    showTrailingIcon: d.showTrailingIcon,
    trailingIcon: d.showTrailingIcon ? (d as Record<string, unknown>).trailingIcon as string : undefined,
  }));
}

function PlaygroundRender(args: HeaderStoryArgs) {
  const [activeTab, setActiveTab] = useState('tab-0');
  const [activeChip, setActiveChip] = useState(0);
  const tabs = buildTabs(args);

  return (
    <Header
      type={args.type}
      title={args.title}
      subtitle={args.subtitle}
      time={args.time}
      showBackButton={args.showBackButton}
      showBorderBottom={args.showBorderBottom}
      showGradient={args.showGradient}
      showBrandLogo={args.showBrandLogo}
      brandLogoTheme={args.brandLogoTheme}
      logoSrc={args.logoSrc}
      logoAlt={args.logoAlt}
      rhsIcons={buildRhsIcons(args)}
      showTabs={args.showTabs}
      tabs={tabs}
      activeTabValue={activeTab}
      onTabChange={setActiveTab}
      tabSize={args.tabSize}
      showChips={args.showChips}
      chipLabels={args.chipLabels}
      activeChip={activeChip}
      onChipChange={setActiveChip}
      chipSize={args.chipSize}
      chipShowLeadingIcon={args.chipShowLeadingIcon}
      chipLeadingIcon={args.chipLeadingIcon}
      chipShowTrailingIcon={args.chipShowTrailingIcon}
      chipTrailingIcon={args.chipTrailingIcon}
      chipShowBadge={args.chipShowBadge}
      chipBadgeContent={args.chipBadgeContent}
    />
  );
}

const TAB_DEFAULTS = {
  label: 'Tab', showBadge: false, badgeContent: '3',
  showLeadingIcon: false, leadingIcon: 'star_filled',
  showTrailingIcon: false, trailingIcon: 'star_filled',
};

function tabArgTypes(n: number) {
  const cat = `Tab ${n}`;
  return {
    [`tab${n}Label`]: { control: 'text', description: `Tab ${n} label`, table: { category: cat }, if: { arg: 'showTabs' } },
    [`tab${n}ShowBadge`]: { control: 'boolean', description: `Tab ${n}: show badge`, table: { category: cat }, if: { arg: 'showTabs' } },
    [`tab${n}BadgeContent`]: { control: 'text', description: `Tab ${n}: badge content`, table: { category: cat }, if: { arg: 'showTabs' } },
    [`tab${n}ShowLeadingIcon`]: { control: 'boolean', description: `Tab ${n}: show leading icon`, table: { category: cat }, if: { arg: 'showTabs' } },
    [`tab${n}LeadingIcon`]: { control: 'select', options: ICON_OPTIONS, description: `Tab ${n}: leading icon`, table: { category: cat }, if: { arg: 'showTabs' } },
    [`tab${n}ShowTrailingIcon`]: { control: 'boolean', description: `Tab ${n}: show trailing icon`, table: { category: cat }, if: { arg: 'showTabs' } },
    [`tab${n}TrailingIcon`]: { control: 'select', options: ICON_OPTIONS, description: `Tab ${n}: trailing icon`, table: { category: cat }, if: { arg: 'showTabs' } },
  };
}

function tabShortArgTypes(n: number) {
  const cat = `Tab ${n}`;
  return {
    [`tab${n}Label`]: { control: 'text', description: `Tab ${n} label`, table: { category: cat }, if: { arg: 'showTabs' } },
    [`tab${n}ShowBadge`]: { control: 'boolean', description: `Tab ${n}: show badge`, table: { category: cat }, if: { arg: 'showTabs' } },
    [`tab${n}ShowLeadingIcon`]: { control: 'boolean', description: `Tab ${n}: show leading icon`, table: { category: cat }, if: { arg: 'showTabs' } },
  };
}

const meta: Meta<HeaderStoryArgs> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['homepage', 'large', 'regular'] as HeaderType[],
      description: 'Header layout variant',
      table: { defaultValue: { summary: 'regular' }, category: 'Layout' },
    },
    title: {
      control: 'text',
      description: 'Page title text',
      table: { defaultValue: { summary: 'Page Title' }, category: 'Content' },
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle text below the title',
      table: { category: 'Content' },
    },
    time: {
      control: 'text',
      description: 'Status bar time string',
      table: { defaultValue: { summary: '9:41' }, category: 'Content' },
    },
    showBackButton: {
      control: 'boolean',
      description: 'Show back arrow on the left (Large & Regular)',
      table: { defaultValue: { summary: 'true' }, category: 'Layout' },
    },
    showBorderBottom: {
      control: 'boolean',
      description: 'Show a border line at the bottom of the header',
      table: { defaultValue: { summary: 'false' }, category: 'Layout' },
    },
    showGradient: {
      control: 'boolean',
      description: 'Show decorative gradient glow (Homepage)',
      table: { defaultValue: { summary: 'true' }, category: 'Layout' },
    },
    showBrandLogo: {
      control: 'boolean',
      description: 'Show PML brand logo (Homepage)',
      table: { defaultValue: { summary: 'true' }, category: 'Brand Logo' },
    },
    brandLogoTheme: {
      control: 'inline-radio',
      options: ['light', 'dark'] as BrandLogoTheme[],
      description: 'Brand logo theme (Homepage)',
      table: { defaultValue: { summary: 'light' }, category: 'Brand Logo' },
    },
    logoSrc: {
      control: 'text',
      description: 'Custom logo image src (overrides BrandLogo)',
      table: { category: 'Brand Logo' },
    },

    /* ── RHS Icons ─────────────────────────────────── */
    iconCount: {
      control: { type: 'range', min: 0, max: 3, step: 1 },
      description: 'Number of right-hand side action icons',
      table: { defaultValue: { summary: '2' }, category: 'RHS Icons' },
    },
    icon1: {
      control: 'select', options: ICON_OPTIONS,
      description: 'First RHS icon',
      table: { defaultValue: { summary: 'search_outline' }, category: 'RHS Icons' },
    },
    icon2: {
      control: 'select', options: ICON_OPTIONS,
      description: 'Second RHS icon',
      table: { defaultValue: { summary: 'bell_outline' }, category: 'RHS Icons' },
    },
    icon3: {
      control: 'select', options: ICON_OPTIONS,
      description: 'Third RHS icon',
      table: { defaultValue: { summary: 'person_outline' }, category: 'RHS Icons' },
    },

    /* ── Tabs ──────────────────────────────────────── */
    showTabs: {
      control: 'boolean',
      description: 'Show tabs row below header content',
      table: { defaultValue: { summary: 'false' }, category: 'Tabs' },
    },
    tabSize: {
      control: 'inline-radio', options: ['medium', 'large'],
      description: 'Tab size',
      table: { defaultValue: { summary: 'medium' }, category: 'Tabs' },
      if: { arg: 'showTabs' },
    },
    tabCount: {
      control: { type: 'range', min: 1, max: 6, step: 1 },
      description: 'Number of tabs',
      table: { defaultValue: { summary: '6' }, category: 'Tabs' },
      if: { arg: 'showTabs' },
    },
    ...tabArgTypes(1),
    ...tabArgTypes(2),
    ...tabArgTypes(3),
    ...tabArgTypes(4),
    ...tabShortArgTypes(5),
    ...tabShortArgTypes(6),

    /* ── Chips ─────────────────────────────────────── */
    showChips: {
      control: 'boolean',
      description: 'Show chips row below header content',
      table: { defaultValue: { summary: 'false' }, category: 'Chip Properties' },
    },
    chipSize: {
      control: 'inline-radio',
      options: ['extra-small', 'small', 'medium', 'large'],
      description: 'Chip size',
      table: { defaultValue: { summary: 'medium' }, category: 'Chip Properties' },
      if: { arg: 'showChips' },
    },
    chipLabels: {
      control: 'object',
      description: 'Array of chip label strings',
      table: { category: 'Chip Properties' },
      if: { arg: 'showChips' },
    },
    chipShowLeadingIcon: {
      control: 'boolean',
      description: 'Show leading icon on chips',
      table: { defaultValue: { summary: 'false' }, category: 'Chip Properties' },
      if: { arg: 'showChips' },
    },
    chipLeadingIcon: {
      control: 'select', options: ICON_OPTIONS,
      description: 'Leading icon name for chips',
      table: { defaultValue: { summary: 'star_filled' }, category: 'Chip Properties' },
      if: { arg: 'showChips' },
    },
    chipShowTrailingIcon: {
      control: 'boolean',
      description: 'Show trailing icon on chips',
      table: { defaultValue: { summary: 'false' }, category: 'Chip Properties' },
      if: { arg: 'showChips' },
    },
    chipTrailingIcon: {
      control: 'select', options: ICON_OPTIONS,
      description: 'Trailing icon name for chips',
      table: { defaultValue: { summary: 'star_filled' }, category: 'Chip Properties' },
      if: { arg: 'showChips' },
    },
    chipShowBadge: {
      control: 'boolean',
      description: 'Show badge on chips',
      table: { defaultValue: { summary: 'false' }, category: 'Chip Properties' },
      if: { arg: 'showChips' },
    },
    chipBadgeContent: {
      control: 'text',
      description: 'Badge content for chips',
      table: { defaultValue: { summary: '3' }, category: 'Chip Properties' },
      if: { arg: 'showChips' },
    },
  },
};

export default meta;
type Story = StoryObj<HeaderStoryArgs>;

/* ─── Playground ─────────────────────────────────── */
export const Playground: Story = {
  args: {
    type: 'homepage',
    title: 'Title',
    subtitle: undefined,
    time: '9:41',
    showBackButton: true,
    showBorderBottom: false,
    showGradient: true,
    showBrandLogo: true,
    brandLogoTheme: 'light',
    iconCount: 2,
    icon1: 'search_outline',
    icon2: 'bell_outline',
    icon3: 'person_outline',
    showTabs: true,
    tabSize: 'medium',
    tabCount: 6,
    tab1Label: TAB_DEFAULTS.label, tab1ShowBadge: false, tab1BadgeContent: '3', tab1ShowLeadingIcon: false, tab1LeadingIcon: 'star_filled', tab1ShowTrailingIcon: false, tab1TrailingIcon: 'star_filled',
    tab2Label: TAB_DEFAULTS.label, tab2ShowBadge: false, tab2BadgeContent: '3', tab2ShowLeadingIcon: false, tab2LeadingIcon: 'star_filled', tab2ShowTrailingIcon: false, tab2TrailingIcon: 'star_filled',
    tab3Label: TAB_DEFAULTS.label, tab3ShowBadge: false, tab3BadgeContent: '3', tab3ShowLeadingIcon: false, tab3LeadingIcon: 'star_filled', tab3ShowTrailingIcon: false, tab3TrailingIcon: 'star_filled',
    tab4Label: TAB_DEFAULTS.label, tab4ShowBadge: false, tab4BadgeContent: '3', tab4ShowLeadingIcon: false, tab4LeadingIcon: 'star_filled', tab4ShowTrailingIcon: false, tab4TrailingIcon: 'star_filled',
    tab5Label: TAB_DEFAULTS.label, tab5ShowBadge: false, tab5ShowLeadingIcon: false,
    tab6Label: TAB_DEFAULTS.label, tab6ShowBadge: false, tab6ShowLeadingIcon: false,
    showChips: false,
    chipSize: 'medium',
    chipLabels: ['Label', 'Label', 'Label'],
    chipShowLeadingIcon: false,
    chipLeadingIcon: 'star_filled',
    chipShowTrailingIcon: false,
    chipTrailingIcon: 'star_filled',
    chipShowBadge: false,
    chipBadgeContent: '3',
  },
  render: (args) => <PlaygroundRender {...args} />,
};

/* ═══════════════════════════════════════════════════
   HOMEPAGE VARIANT
   ═══════════════════════════════════════════════════ */
function HomepageRender() {
  const [tab, setTab] = useState('tab-0');
  const tabs: TabItem[] = Array.from({ length: 6 }, (_, i) => ({ value: `tab-${i}`, label: 'Tab' }));
  return (
    <Header
      type="homepage" title="Title" showBrandLogo brandLogoTheme="light"
      rhsIcons={['search_outline', 'bell_outline']}
      showTabs tabs={tabs} activeTabValue={tab} onTabChange={setTab}
    />
  );
}

export const Homepage: Story = {
  name: 'Homepage',
  render: () => <HomepageRender />,
};

function HomepageChipsRender() {
  const [tab, setTab] = useState('tab-0');
  const [chip, setChip] = useState(0);
  const tabs: TabItem[] = Array.from({ length: 6 }, (_, i) => ({ value: `tab-${i}`, label: 'Tab' }));
  return (
    <Header
      type="homepage" title="Title" showBrandLogo brandLogoTheme="light"
      rhsIcons={['search_outline', 'bell_outline']}
      showTabs tabs={tabs} activeTabValue={tab} onTabChange={setTab}
      showChips chipLabels={['Label', 'Label', 'Label']} activeChip={chip} onChipChange={setChip}
    />
  );
}

export const HomepageWithChips: Story = {
  name: 'Homepage + Chips',
  render: () => <HomepageChipsRender />,
};

/* ═══════════════════════════════════════════════════
   LARGE VARIANT
   ═══════════════════════════════════════════════════ */
const LargeRender = () => (
  <Header type="large" title="Page Title" subtitle="Bottom Subtitle" showBackButton
    rhsIcons={['search_outline', 'bell_outline', 'person_outline']} />
);

export const Large: Story = {
  name: 'Large',
  render: () => <LargeRender />,
};

const LargeWithIconRender = () => (
  <Header type="large" title="Page Title" subtitle="Bottom Subtitle" showBackButton
    rhsIcons={['search_outline', 'bell_outline', 'person_outline']}
    lhsIcon={<Avatar type="logo" size="large" logoName="HDFC" logoCategory="mutualFunds" />} />
);

export const LargeWithIcon: Story = {
  name: 'Large + LHS Icon',
  render: () => <LargeWithIconRender />,
};

function LargeTabsRender() {
  const [tab, setTab] = useState('tab-0');
  const tabs: TabItem[] = Array.from({ length: 6 }, (_, i) => ({ value: `tab-${i}`, label: 'Tab' }));
  return (
    <Header type="large" title="Page Title" subtitle="Bottom Subtitle" showBackButton
      rhsIcons={['search_outline', 'bell_outline', 'person_outline']}
      showTabs tabs={tabs} activeTabValue={tab} onTabChange={setTab} />
  );
}

export const LargeWithTabs: Story = {
  name: 'Large + Tabs',
  render: () => <LargeTabsRender />,
};

function LargeChipsRender() {
  const [chip, setChip] = useState(0);
  return (
    <Header type="large" title="Page Title" subtitle="Bottom Subtitle" showBackButton
      rhsIcons={['search_outline', 'bell_outline', 'person_outline']}
      showChips chipLabels={['All', 'Stocks', 'Mutual Funds']} activeChip={chip} onChipChange={setChip} />
  );
}

export const LargeWithChips: Story = {
  name: 'Large + Chips',
  render: () => <LargeChipsRender />,
};

/* ═══════════════════════════════════════════════════
   REGULAR VARIANT
   ═══════════════════════════════════════════════════ */
const RegularRender = () => (
  <Header type="regular" title="Page Title" subtitle="Bottom Subtitle" showBackButton rhsIcons={['search_outline']} />
);

export const Regular: Story = {
  name: 'Regular',
  render: () => <RegularRender />,
};

function RegularTabsRender() {
  const [tab, setTab] = useState('tab-0');
  const tabs: TabItem[] = Array.from({ length: 6 }, (_, i) => ({ value: `tab-${i}`, label: 'Tab' }));
  return (
    <Header type="regular" title="Page Title" subtitle="Bottom Subtitle" showBackButton rhsIcons={['search_outline']}
      showTabs tabs={tabs} activeTabValue={tab} onTabChange={setTab} />
  );
}

export const RegularWithTabs: Story = {
  name: 'Regular + Tabs',
  render: () => <RegularTabsRender />,
};

function RegularChipsRender() {
  const [chip, setChip] = useState(0);
  return (
    <Header type="regular" title="Page Title" showBackButton rhsIcons={['search_outline']}
      showChips chipLabels={['Label', 'Label', 'Label']} activeChip={chip} onChipChange={setChip} />
  );
}

export const RegularWithChips: Story = {
  name: 'Regular + Chips',
  render: () => <RegularChipsRender />,
};

const RegularNoBackRender = () => (
  <Header type="regular" title="Page Title" subtitle="Bottom Subtitle" showBackButton={false} rhsIcons={['search_outline']} />
);

export const RegularNoBack: Story = {
  name: 'Regular — No Back Button',
  render: () => <RegularNoBackRender />,
};

/* ═══════════════════════════════════════════════════
   ALL VARIANTS OVERVIEW
   ═══════════════════════════════════════════════════ */
function AllVariantsRender() {
  const [homeTab, setHomeTab] = useState('tab-0');
  const tabs: TabItem[] = Array.from({ length: 6 }, (_, i) => ({ value: `tab-${i}`, label: 'Tab' }));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: 'var(--font-family)' }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-medium)' }}>Homepage</p>
        <Header type="homepage" title="Title" showBrandLogo
          rhsIcons={['search_outline', 'bell_outline']}
          showTabs tabs={tabs} activeTabValue={homeTab} onTabChange={setHomeTab} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-medium)' }}>Large</p>
        <Header type="large" title="Page Title" subtitle="Bottom Subtitle" showBackButton
          rhsIcons={['search_outline', 'bell_outline', 'person_outline']} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-medium)' }}>Regular</p>
        <Header type="regular" title="Page Title" subtitle="Bottom Subtitle" showBackButton rhsIcons={['search_outline']} />
      </div>
    </div>
  );
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => <AllVariantsRender />,
};
