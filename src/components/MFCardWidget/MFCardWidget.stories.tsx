import type { Meta, StoryObj } from '@storybook/react';
import { iconNames } from '../Icon/Icon';
import type { LogoCategory } from '../Logo/Logo';
import {
  BANK_NAMES,
  INDEX_NAMES,
  MUTUAL_FUND_NAMES,
  PAYMENT_NAMES,
  STOCK_NAMES,
} from '../Logo/logoNames';
import { MFCardWidget, type MFCardWidgetProps } from './MFCardWidget';

/** All logo names from `logoNames.ts` — pick one, then match `logoCategory` for a valid asset. */
const ALL_LOGO_NAMES = Array.from(
  new Set([
    ...MUTUAL_FUND_NAMES,
    ...PAYMENT_NAMES,
    ...BANK_NAMES,
    ...STOCK_NAMES,
    ...INDEX_NAMES,
  ])
).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

/** Storybook-only: toggles subtext row (not a `MFCardWidget` prop). */
type MFCardPlaygroundArgs = MFCardWidgetProps & { showSubtext?: boolean };

const LOGO_CATEGORIES: LogoCategory[] = [
  'mutualFunds',
  'payments',
  'banks',
  'stocks',
  'indices',
];

const CARD_TYPES = ['large', 'medium', 'small', 'inline'] as const;

/** Icon names for subtext glyph; leading empty = no icon. */
const SUBTEXT_ICON_OPTIONS = ['', ...iconNames] as string[];

const meta = {
  title: 'Widgets/MF Card',
  component: MFCardWidget,
  parameters: {
    layout: 'centered',
    controls: {
      expanded: true,
      sort: 'alpha',
    },
    docs: {
      description: {
        component:
          'Paytm MF **Liquid Fund** card: badges, fund logo + name, optional alert strip. Variants: **Large** (two-up metrics), **Medium** (rating + footer), **Small** / **Inline** (compact fund row). [Figma source](https://www.figma.com/design/FYefy2l7igtb2A7C9XleT9/Paytm-MF-Components---Master?node-id=442-5710).',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: 376,
          padding: 24,
          background: 'var(--surface-level-4)',
          boxSizing: 'border-box',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    cardType: 'large',
    fundName: 'Fund Name',
    showAlertBanner: false,
    alertText: 'Multiline alert text goes here',
    showTags: true,
    tagsLhs: true,
    tagsRhs: false,
    sipActiveLabel: 'SIP Active',
    externalLabel: 'External',
    rhsTagLabel: 'STATUS',
    logoName: 'Kotak',
    logoCategory: 'mutualFunds' as LogoCategory,
    subtext: 'Text',
    subtextIconName: 'arrow_up_filled',
    primaryValue: '₹1,02,600',
    secondaryLabel: 'Subtext',
    dataLeftTitle: 'Title',
    dataLeftValue: 'Value',
    dataRightTitle: 'Title',
    dataRightValue: 'Value',
    ratingValue: '4',
    ratingTrailingText: 'Text 2',
    footerLabel: 'Label:',
    footerValue: '+2.40%',
    className: '',
  } satisfies MFCardWidgetProps,
  argTypes: {
    cardType: {
      name: 'cardType',
      description:
        '**large** — tags + fund + separator + two-up metrics. **medium** — tags + fund (RHS values) + separator + rating row. **small** / **inline** — compact fund row; optional alert on **small**.',
      control: 'inline-radio',
      options: [...CARD_TYPES],
      table: { category: 'Layout' },
    },
    className: {
      description: 'Optional extra class on the root `.mfcw` element.',
      control: 'text',
      table: { category: 'Layout' },
    },
    showAlertBanner: {
      description:
        'Shows the blue info strip behind the card (Large / Medium / Small). Not used for **inline**.',
      control: 'boolean',
      table: { category: 'Alert' },
    },
    alertText: {
      description: 'Copy inside the alert strip when `showAlertBanner` is true.',
      control: 'text',
      table: { category: 'Alert' },
    },
    showTags: {
      description: 'Show the badge row (SIP Active, External, optional RHS tag).',
      control: 'boolean',
      table: { category: 'Tags' },
    },
    tagsLhs: {
      description: 'When `showTags`, show left group: SIP Active + External.',
      control: 'boolean',
      table: { category: 'Tags' },
    },
    tagsRhs: {
      description: 'When `showTags`, show optional right badge (e.g. STATUS).',
      control: 'boolean',
      table: { category: 'Tags' },
    },
    sipActiveLabel: {
      description: 'Text for the green “SIP Active” badge.',
      control: 'text',
      table: { category: 'Tags' },
    },
    externalLabel: {
      description: 'Text for the neutral “External” badge.',
      control: 'text',
      table: { category: 'Tags' },
    },
    rhsTagLabel: {
      description: 'Text for the optional RHS badge when `tagsRhs` is true.',
      control: 'text',
      table: { category: 'Tags' },
    },
    fundName: {
      description: 'Primary fund name (Body Medium 14/20).',
      control: 'text',
      table: { category: 'Fund' },
    },
    logoName: {
      description:
        'Brand name passed to `Avatar` + `Logo`. Choose from the list; pair with `logoCategory` so the asset resolves (e.g. **Kotak** + **mutualFunds**).',
      control: 'select',
      options: ALL_LOGO_NAMES,
      table: { category: 'Fund' },
    },
    logoCategory: {
      description: 'Logo set used to resolve the fund image.',
      control: 'select',
      options: LOGO_CATEGORIES,
      table: { category: 'Fund' },
    },
    subtext: {
      description:
        'Subtext under the fund name (Large, Small, Inline). Hidden for **medium**.',
      control: 'text',
      table: { category: 'Fund' },
    },
    subtextIconName: {
      description:
        'Glyph name from `icons/svg/glyphs` (empty = no icon). Shown next to subtext when set.',
      control: 'select',
      options: SUBTEXT_ICON_OPTIONS,
      table: { category: 'Fund' },
    },
    primaryValue: {
      description:
        'Right column primary line (Medium / Small / Inline), e.g. current value.',
      control: 'text',
      table: { category: 'Fund' },
    },
    secondaryLabel: {
      description: 'Right column secondary line (grey subtext).',
      control: 'text',
      table: { category: 'Fund' },
    },
    dataLeftTitle: {
      description: 'Large variant: label above left metric.',
      control: 'text',
      table: { category: 'Large · metrics' },
    },
    dataLeftValue: {
      description: 'Large variant: value under left label (semibold).',
      control: 'text',
      table: { category: 'Large · metrics' },
    },
    dataRightTitle: {
      description: 'Large variant: label above right metric.',
      control: 'text',
      table: { category: 'Large · metrics' },
    },
    dataRightValue: {
      description: 'Large variant: value under right label (semibold).',
      control: 'text',
      table: { category: 'Large · metrics' },
    },
    ratingValue: {
      description: 'Medium variant: number next to the star.',
      control: 'text',
      table: { category: 'Medium · footer' },
    },
    ratingTrailingText: {
      description: 'Medium variant: text after the dot separator.',
      control: 'text',
      table: { category: 'Medium · footer' },
    },
    footerLabel: {
      description: 'Medium variant: grey label before the green value (e.g. `Label:`).',
      control: 'text',
      table: { category: 'Medium · footer' },
    },
    footerValue: {
      description: 'Medium variant: green emphasis value (e.g. return %).',
      control: 'text',
      table: { category: 'Medium · footer' },
    },
  },
} satisfies Meta<typeof MFCardWidget>;

export default meta;

type Story = StoryObj<typeof MFCardWidget>;

const base: MFCardWidgetProps = {
  fundName: 'Fund Name',
  logoName: 'Kotak',
  subtext: 'Text',
  subtextIconName: 'arrow_up_filled',
  dataLeftTitle: 'Title',
  dataLeftValue: 'Value',
  dataRightTitle: 'Title',
  dataRightValue: 'Value',
  primaryValue: '₹1,02,600',
  secondaryLabel: 'Subtext',
  ratingTrailingText: 'Text 2',
  footerValue: '+2.40%',
};

/** Interactive: use **Controls** to try every prop; switch `cardType` to see each layout. */
export const Playground: Story = {
  args: {
    ...base,
    cardType: 'large',
    showAlertBanner: false,
    showTags: true,
    tagsLhs: true,
    tagsRhs: false,
    sipActiveLabel: 'SIP Active',
    externalLabel: 'External',
    rhsTagLabel: 'STATUS',
    logoCategory: 'mutualFunds',
    alertText: 'Multiline alert text goes here',
    ratingValue: '4',
    footerLabel: 'Label:',
    className: '',
    showSubtext: true,
  } satisfies MFCardPlaygroundArgs,
  argTypes: {
    showSubtext: {
      name: 'showSubtext',
      description:
        'Show the fund subtext row (label + optional icon). When off, `subtext` and `subtextIconName` are cleared for the preview.',
      control: 'boolean',
      table: { category: 'Fund' },
    },
  },
  render: (args) => {
    const { showSubtext, subtext, subtextIconName, className, ...rest } =
      args as MFCardPlaygroundArgs;
    const showRow = showSubtext !== false;
    return (
      <MFCardWidget
        {...rest}
        subtext={showRow ? subtext : undefined}
        subtextIconName={showRow ? subtextIconName || undefined : undefined}
        className={className?.trim() ? className : undefined}
      />
    );
  },
};

export const Large: Story = {
  args: {
    ...base,
    cardType: 'large',
    showAlertBanner: false,
  },
};

export const LargeWithAlert: Story = {
  args: {
    ...base,
    cardType: 'large',
    showAlertBanner: true,
  },
};

export const Medium: Story = {
  args: {
    ...base,
    cardType: 'medium',
    showAlertBanner: false,
    subtext: undefined,
    subtextIconName: undefined,
  },
};

export const MediumWithAlert: Story = {
  args: {
    ...Medium.args,
    showAlertBanner: true,
  },
};

export const Small: Story = {
  args: {
    ...base,
    cardType: 'small',
    showAlertBanner: false,
  },
};

export const SmallWithAlert: Story = {
  args: {
    ...Small.args,
    showAlertBanner: true,
  },
};

export const Inline: Story = {
  args: {
    ...base,
    cardType: 'inline',
    showTags: false,
    showAlertBanner: false,
  },
};

export const TagsRhs: Story = {
  name: 'With RHS tag',
  args: {
    ...base,
    cardType: 'large',
    tagsRhs: true,
    tagsLhs: true,
  },
};
