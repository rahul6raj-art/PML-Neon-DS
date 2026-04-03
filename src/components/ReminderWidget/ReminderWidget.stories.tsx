import type { Meta, StoryObj } from '@storybook/react';
import { ReminderWidget, type ReminderWidgetProps, type ReminderItem } from './ReminderWidget';

/* ─── Per-card defaults ───────────────────────────────── */
const CARD_DEFAULTS: Required<
  Pick<ReminderItem, 'name' | 'price' | 'change' | 'changeType' | 'ctaText' | 'ctaLabel' | 'ctaVariant' | 'ctaSize' | 'logoName' | 'logoCategory' | 'showLeading' | 'showTrailing'>
>[] = [
  { name: 'Reliance Industries', price: '92.50',    change: '(0.30%)', changeType: 'negative', ctaText: 'Complete your order', ctaLabel: 'Buy',  ctaVariant: 'filled', ctaSize: 'small', logoName: 'Reliance Industries', logoCategory: 'stocks', showLeading: true, showTrailing: true },
  { name: 'Tata Motors',         price: '654.30',   change: '(1.25%)', changeType: 'positive', ctaText: 'Complete your order', ctaLabel: 'Buy',  ctaVariant: 'filled', ctaSize: 'small', logoName: 'Tata Motors',         logoCategory: 'stocks', showLeading: true, showTrailing: true },
  { name: 'Infosys',             price: '1,432.50', change: '(0.75%)', changeType: 'positive', ctaText: 'Complete your order', ctaLabel: 'Buy',  ctaVariant: 'filled', ctaSize: 'small', logoName: 'Infosys',             logoCategory: 'stocks', showLeading: true, showTrailing: true },
  { name: 'Wipro',               price: '412.80',   change: '(0.15%)', changeType: 'negative', ctaText: 'Complete your order', ctaLabel: 'Buy',  ctaVariant: 'filled', ctaSize: 'small', logoName: 'Wipro',               logoCategory: 'stocks', showLeading: true, showTrailing: true },
  { name: 'SBI',                 price: '567.20',   change: '(2.10%)', changeType: 'positive', ctaText: 'Complete your order', ctaLabel: 'Buy',  ctaVariant: 'filled', ctaSize: 'small', logoName: 'SBI',                 logoCategory: 'stocks', showLeading: true, showTrailing: true },
  { name: 'Adani',               price: '2,845.60', change: '(1.80%)', changeType: 'negative', ctaText: 'Complete your order', ctaLabel: 'Buy',  ctaVariant: 'filled', ctaSize: 'small', logoName: 'Adani',               logoCategory: 'stocks', showLeading: true, showTrailing: true },
  { name: 'MRF',                 price: '98,750',   change: '(0.45%)', changeType: 'positive', ctaText: 'Complete your order', ctaLabel: 'Buy',  ctaVariant: 'filled', ctaSize: 'small', logoName: 'MRF',                 logoCategory: 'stocks', showLeading: true, showTrailing: true },
  { name: 'Yes Bank',            price: '21.35',    change: '(3.20%)', changeType: 'negative', ctaText: 'Complete your order', ctaLabel: 'Buy',  ctaVariant: 'filled', ctaSize: 'small', logoName: 'Yes Bank',            logoCategory: 'stocks', showLeading: true, showTrailing: true },
];

const LOGO_OPTIONS = [
  'Reliance Industries', 'Tata Motors', 'Wipro', 'Infosys',
  'SBI', 'Adani', 'MRF', 'Yes Bank', 'Axis',
];
const LOGO_CAT_OPTIONS = ['mutualFunds', 'payments', 'banks', 'stocks', 'indices'];
const CTA_VARIANT_OPTIONS = ['filled', 'stroke', 'tonal', 'link'];
const CTA_SIZE_OPTIONS = ['large', 'medium', 'small', 'extra-small'];

/* ─── FlatArgs type (card1…card8 prefixed) ────────────── */
type CardPrefix = 'card1' | 'card2' | 'card3' | 'card4' | 'card5' | 'card6' | 'card7' | 'card8';
type CardFieldMap = {
  [P in CardPrefix as `${P}Name`]?: string;
} & {
  [P in CardPrefix as `${P}Price`]?: string;
} & {
  [P in CardPrefix as `${P}Change`]?: string;
} & {
  [P in CardPrefix as `${P}ChangeType`]?: 'positive' | 'negative';
} & {
  [P in CardPrefix as `${P}CtaText`]?: string;
} & {
  [P in CardPrefix as `${P}CtaLabel`]?: string;
} & {
  [P in CardPrefix as `${P}CtaVariant`]?: 'filled' | 'stroke' | 'tonal' | 'link';
} & {
  [P in CardPrefix as `${P}CtaSize`]?: 'large' | 'medium' | 'small' | 'extra-small';
} & {
  [P in CardPrefix as `${P}LogoName`]?: string;
} & {
  [P in CardPrefix as `${P}LogoCategory`]?: 'mutualFunds' | 'payments' | 'banks' | 'stocks' | 'indices';
} & {
  [P in CardPrefix as `${P}ShowLeading`]?: boolean;
} & {
  [P in CardPrefix as `${P}ShowTrailing`]?: boolean;
};

type FlatArgs = Omit<ReminderWidgetProps, 'items'> & {
  addCard3?: boolean;
  addCard4?: boolean;
  addCard5?: boolean;
  addCard6?: boolean;
  addCard7?: boolean;
  addCard8?: boolean;
} & CardFieldMap;

/* ─── Compute card count from chaining toggles ───────── */
function getCardCount(args: FlatArgs): number {
  if (args.variant === 'single') return 1;
  let count = 2;
  if (args.addCard3) { count++; } else return count;
  if (args.addCard4) { count++; } else return count;
  if (args.addCard5) { count++; } else return count;
  if (args.addCard6) { count++; } else return count;
  if (args.addCard7) { count++; } else return count;
  if (args.addCard8) { count++; }
  return count;
}

/* ─── Build items from per-card args ──────────────────── */
function buildItems(args: FlatArgs): ReminderItem[] {
  const count = getCardCount(args);
  return Array.from({ length: count }, (_, i) => {
    const n = i + 1;
    const d = CARD_DEFAULTS[i];
    const get = (field: string) => (args as Record<string, unknown>)[`card${n}${field}`];
    return {
      showLeading:  get('ShowLeading')  as boolean | undefined ?? d.showLeading,
      showTrailing: get('ShowTrailing') as boolean | undefined ?? d.showTrailing,
      name:         get('Name')         as string | undefined ?? d.name,
      price:        get('Price')        as string | undefined ?? d.price,
      change:       get('Change')       as string | undefined ?? d.change,
      changeType:   get('ChangeType')   as ReminderItem['changeType'] ?? d.changeType,
      ctaText:      get('CtaText')      as string | undefined ?? d.ctaText,
      ctaLabel:     get('CtaLabel')     as string | undefined ?? d.ctaLabel,
      ctaVariant:   get('CtaVariant')   as ReminderItem['ctaVariant'] ?? d.ctaVariant,
      ctaSize:      get('CtaSize')      as ReminderItem['ctaSize'] ?? d.ctaSize,
      logoName:     get('LogoName')     as string | undefined ?? d.logoName,
      logoCategory: get('LogoCategory') as ReminderItem['logoCategory'] ?? d.logoCategory,
    };
  });
}

/* ─── Generate argTypes for one card ──────────────────── */
function cardArgTypes(n: number) {
  const cat = `Card ${n}`;

  let visible: Record<string, unknown> = {};
  if (n === 2) {
    visible = { if: { arg: 'variant', eq: 'carousel' } };
  } else if (n >= 3 && n <= 8) {
    visible = { if: { arg: `addCard${n}` } };
  }

  return {
    [`card${n}ShowLeading`]: {
      control: 'boolean', name: 'Show Leading (Logo)',
      description: 'Show avatar / logo', table: { category: cat, defaultValue: { summary: 'true' } }, ...visible,
    },
    [`card${n}ShowTrailing`]: {
      control: 'boolean', name: 'Show Trailing (Close)',
      description: 'Show close icon', table: { category: cat, defaultValue: { summary: 'true' } }, ...visible,
    },
    [`card${n}Name`]: {
      control: 'text', name: 'Name',
      description: 'Company / stock name', table: { category: cat }, ...visible,
    },
    [`card${n}Price`]: {
      control: 'text', name: 'Price',
      description: 'Stock price', table: { category: cat }, ...visible,
    },
    [`card${n}Change`]: {
      control: 'text', name: 'Change',
      description: 'Change value (e.g. "(0.30%)")', table: { category: cat }, ...visible,
    },
    [`card${n}ChangeType`]: {
      control: 'inline-radio', options: ['positive', 'negative'], name: 'Change Type',
      description: 'Positive (green) or Negative (red)', table: { category: cat, defaultValue: { summary: CARD_DEFAULTS[n - 1].changeType } }, ...visible,
    },
    [`card${n}LogoName`]: {
      control: 'select', options: LOGO_OPTIONS, name: 'Logo',
      description: 'Stock logo name', table: { category: cat }, ...visible,
    },
    [`card${n}LogoCategory`]: {
      control: 'select', options: LOGO_CAT_OPTIONS, name: 'Logo Category',
      description: 'Logo category', table: { category: cat, defaultValue: { summary: 'stocks' } }, ...visible,
    },
    [`card${n}CtaText`]: {
      control: 'text', name: 'CTA Text',
      description: 'Footer text beside button', table: { category: cat }, ...visible,
    },
    [`card${n}CtaLabel`]: {
      control: 'text', name: 'CTA Label',
      description: 'Button label', table: { category: cat }, ...visible,
    },
    [`card${n}CtaVariant`]: {
      control: 'select', options: CTA_VARIANT_OPTIONS, name: 'CTA Variant',
      description: 'Button variant', table: { category: cat, defaultValue: { summary: 'filled' } }, ...visible,
    },
    [`card${n}CtaSize`]: {
      control: 'select', options: CTA_SIZE_OPTIONS, name: 'CTA Size',
      description: 'Button size', table: { category: cat, defaultValue: { summary: 'small' } }, ...visible,
    },
  };
}

/* ─── Generate default args for one card ──────────────── */
function cardArgs(n: number) {
  const d = CARD_DEFAULTS[n - 1];
  return {
    [`card${n}ShowLeading`]:  d.showLeading,
    [`card${n}ShowTrailing`]: d.showTrailing,
    [`card${n}Name`]:         d.name,
    [`card${n}Price`]:        d.price,
    [`card${n}Change`]:       d.change,
    [`card${n}ChangeType`]:   d.changeType,
    [`card${n}CtaText`]:      d.ctaText,
    [`card${n}CtaLabel`]:     d.ctaLabel,
    [`card${n}CtaVariant`]:   d.ctaVariant,
    [`card${n}CtaSize`]:      d.ctaSize,
    [`card${n}LogoName`]:     d.logoName,
    [`card${n}LogoCategory`]: d.logoCategory,
  };
}

/* ─── Meta ────────────────────────────────────────────── */
const meta: Meta<FlatArgs> = {
  title: 'Widgets/Reminder',
  component: ReminderWidget,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 376 }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <ReminderWidget
      variant={args.variant}
      showHeader={args.showHeader}
      headerTitle={args.headerTitle}
      headerSize={args.headerSize}
      headerChevron={args.headerChevron}
      headerShowSubtext={args.headerShowSubtext}
      headerSubtext={args.headerSubtext}
      items={buildItems(args)}
      className={args.className}
    />
  ),
  argTypes: {
    /* ── Layout ── */
    variant: {
      control: 'inline-radio',
      options: ['single', 'carousel'],
      description: 'Single full-width card or horizontally scrollable carousel',
      table: { category: 'Layout', defaultValue: { summary: 'single' } },
    },
    addCard3: {
      control: 'boolean', name: 'Add Card 3',
      description: 'Add a 3rd card to the carousel',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
      if: { arg: 'variant', eq: 'carousel' },
    },
    addCard4: {
      control: 'boolean', name: 'Add Card 4',
      description: 'Add a 4th card to the carousel',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
      if: { arg: 'addCard3' },
    },
    addCard5: {
      control: 'boolean', name: 'Add Card 5',
      description: 'Add a 5th card to the carousel',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
      if: { arg: 'addCard4' },
    },
    addCard6: {
      control: 'boolean', name: 'Add Card 6',
      description: 'Add a 6th card to the carousel',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
      if: { arg: 'addCard5' },
    },
    addCard7: {
      control: 'boolean', name: 'Add Card 7',
      description: 'Add a 7th card to the carousel',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
      if: { arg: 'addCard6' },
    },
    addCard8: {
      control: 'boolean', name: 'Add Card 8',
      description: 'Add an 8th card to the carousel',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
      if: { arg: 'addCard7' },
    },

    /* ── Section Header ── */
    showHeader: {
      control: 'boolean',
      description: 'Show the section header',
      table: { category: 'Section Header', defaultValue: { summary: 'true' } },
    },
    headerTitle: {
      control: 'text', name: 'Title',
      description: 'Section header title text',
      table: { category: 'Section Header' },
      if: { arg: 'showHeader', neq: false },
    },
    headerSize: {
      control: 'select', options: ['extra-large', 'large', 'medium', 'small'], name: 'Size',
      description: 'Section header size variant',
      table: { category: 'Section Header', defaultValue: { summary: 'extra-large' } },
      if: { arg: 'showHeader', neq: false },
    },
    headerChevron: {
      control: 'boolean', name: 'Chevron',
      description: 'Show chevron icon next to title',
      table: { category: 'Section Header', defaultValue: { summary: 'true' } },
      if: { arg: 'showHeader', neq: false },
    },
    headerShowSubtext: {
      control: 'boolean', name: 'Show Subtext',
      description: 'Show subtext below title',
      table: { category: 'Section Header', defaultValue: { summary: 'false' } },
      if: { arg: 'showHeader', neq: false },
    },
    headerSubtext: {
      control: 'text', name: 'Subtext',
      description: 'Subtext content',
      table: { category: 'Section Header' },
      if: { arg: 'headerShowSubtext', neq: false },
    },

    /* ── Per-card controls (Card 1 – Card 8) ── */
    ...cardArgTypes(1),
    ...cardArgTypes(2),
    ...cardArgTypes(3),
    ...cardArgTypes(4),
    ...cardArgTypes(5),
    ...cardArgTypes(6),
    ...cardArgTypes(7),
    ...cardArgTypes(8),
  },
  args: {
    variant: 'single',
    addCard3: false,
    addCard4: false,
    addCard5: false,
    addCard6: false,
    addCard7: false,
    addCard8: false,
    showHeader: true,
    headerTitle: 'Pickup where you left',
    headerSize: 'extra-large',
    headerChevron: true,
    headerShowSubtext: false,
    headerSubtext: 'Subtext goes here',
    ...cardArgs(1),
    ...cardArgs(2),
    ...cardArgs(3),
    ...cardArgs(4),
    ...cardArgs(5),
    ...cardArgs(6),
    ...cardArgs(7),
    ...cardArgs(8),
  },
};

export default meta;
type Story = StoryObj<FlatArgs>;

export const Default: Story = {};

export const SingleCard: Story = {
  args: { variant: 'single' },
};

export const TwoCardsCarousel: Story = {
  args: { variant: 'carousel' },
};

export const ThreeCardsCarousel: Story = {
  args: { variant: 'carousel', addCard3: true },
};

export const PositiveChange: Story = {
  args: {
    variant: 'single',
    card1Name: 'Tata Motors',
    card1Price: '654.30',
    card1Change: '(1.25%)',
    card1ChangeType: 'positive',
    card1LogoName: 'Tata Motors',
  },
};

export const NoHeader: Story = {
  args: { showHeader: false, variant: 'single' },
};

export const StrokeButton: Story = {
  args: { variant: 'single', card1CtaVariant: 'stroke', card1CtaLabel: 'View' },
};

export const MixedCarousel: Story = {
  args: { variant: 'carousel', addCard3: true, addCard4: true },
};
