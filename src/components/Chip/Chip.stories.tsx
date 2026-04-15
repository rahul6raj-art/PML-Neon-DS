import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Chip } from './Chip';
import { iconNames } from '../Icon';

const iconOptions = ['(none)', ...iconNames];
const iconMapping = Object.fromEntries([
  ['(none)', undefined],
  ...iconNames.map((n) => [n, n]),
]);

const meta = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'selected', 'disabled'],
      description: 'Visual type / state of the chip',
      table: { category: 'Appearance', defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: ['extra-small', 'small', 'medium', 'large'],
      description:
        'Chip size — extra-small = compact pill (e.g. portfolio time range); smaller than small',
      table: { category: 'Appearance', defaultValue: { summary: 'medium' } },
    },
    label: {
      control: 'text',
      description: 'Chip label text',
      table: { category: 'Content', defaultValue: { summary: 'Label' } },
    },
    showLeadingIcon: {
      control: 'boolean',
      description: 'Show a leading icon',
      table: { category: 'Icon', defaultValue: { summary: 'false' } },
    },
    leadingIcon: {
      control: 'select',
      options: iconOptions,
      mapping: iconMapping,
      description: 'Leading icon name from icons folder',
      table: { category: 'Icon', defaultValue: { summary: '(none)' } },
    },
    showTrailingIcon: {
      control: 'boolean',
      description: 'Show a trailing icon',
      table: { category: 'Icon', defaultValue: { summary: 'false' } },
    },
    trailingIcon: {
      control: 'select',
      options: iconOptions,
      mapping: iconMapping,
      description: 'Trailing icon name from icons folder',
      table: { category: 'Icon', defaultValue: { summary: '(none)' } },
    },
    showBadge: {
      control: 'boolean',
      description: 'Show a badge count indicator',
      table: { category: 'Badge', defaultValue: { summary: 'false' } },
    },
    badgeContent: {
      control: 'text',
      description: 'Badge count text',
      table: { category: 'Badge', defaultValue: { summary: '3' } },
    },
    onPress: {
      action: 'pressed',
      description: 'Callback when chip is clicked',
      table: { category: 'Events' },
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Playground ────────────────────────────────────── */
const playgroundArgs = {
  type: 'default' as const,
  size: 'medium' as const,
  label: 'Label',
  showLeadingIcon: false,
  showTrailingIcon: false,
  showBadge: false,
  badgeContent: '3',
};

export const Playground: Story = {
  args: { ...playgroundArgs },
};

/** Same controls as Playground; defaults to `extra-small` (Stock Home time-range style). */
export const PlaygroundExtraSmall: Story = {
  name: 'Playground / Extra small',
  args: {
    ...playgroundArgs,
    size: 'extra-small',
  },
};

/* ═══════════════════════════════════════════════════
   Type Variants
   ═══════════════════════════════════════════════════ */
export const Default: Story = {
  name: 'Type / Default',
  args: { type: 'default', label: 'Default' },
};

export const Selected: Story = {
  name: 'Type / Selected',
  args: { type: 'selected', label: 'Selected' },
};

export const Disabled: Story = {
  name: 'Type / Disabled',
  args: { type: 'disabled', label: 'Disabled' },
};

/* ═══════════════════════════════════════════════════
   Size Variants
   ═══════════════════════════════════════════════════ */
export const SizeExtraSmall: Story = {
  name: 'Size / Extra small',
  args: { size: 'extra-small', label: 'Extra small' },
};

export const SizeSmall: Story = {
  name: 'Size / Small',
  args: { size: 'small', label: 'Small' },
};

export const SizeMedium: Story = {
  name: 'Size / Medium',
  args: { size: 'medium', label: 'Medium' },
};

export const SizeLarge: Story = {
  name: 'Size / Large',
  args: { size: 'large', label: 'Large' },
};

/* ═══════════════════════════════════════════════════
   With Icons
   ═══════════════════════════════════════════════════ */
export const LeadingIcon: Story = {
  name: 'Icon / Leading',
  args: { showLeadingIcon: true, leadingIcon: 'star_filled', label: 'Starred' },
};

export const TrailingIcon: Story = {
  name: 'Icon / Trailing',
  args: { showTrailingIcon: true, trailingIcon: 'x_circle_filled', label: 'Remove' },
};

export const BothIcons: Story = {
  name: 'Icon / Both',
  args: {
    showLeadingIcon: true,
    leadingIcon: 'checkmark_circle_filled',
    showTrailingIcon: true,
    trailingIcon: 'x_circle_filled',
    label: 'Complete',
  },
};

export const SelectedWithIcon: Story = {
  name: 'Icon / Selected',
  args: {
    type: 'selected',
    showLeadingIcon: true,
    leadingIcon: 'checkmark_circle_filled',
    label: 'Active',
  },
};

export const DisabledWithIcon: Story = {
  name: 'Icon / Disabled',
  args: {
    type: 'disabled',
    showLeadingIcon: true,
    leadingIcon: 'star_filled',
    label: 'Locked',
  },
};

/* ═══════════════════════════════════════════════════
   With Badge
   ═══════════════════════════════════════════════════ */
export const WithBadge: Story = {
  name: 'Badge / Default',
  args: { showBadge: true, badgeContent: '3', label: 'Updates' },
};

export const BadgeSelected: Story = {
  name: 'Badge / Selected',
  args: { type: 'selected', showBadge: true, badgeContent: '5', label: 'Inbox' },
};

export const BadgeDisabled: Story = {
  name: 'Badge / Disabled',
  args: { type: 'disabled', showBadge: true, badgeContent: '2', label: 'Archived' },
};

export const BadgeWithIcons: Story = {
  name: 'Badge / With Icons',
  args: {
    showLeadingIcon: true,
    leadingIcon: 'bell_filled',
    showBadge: true,
    badgeContent: '7',
    label: 'Alerts',
  },
};

/* ═══════════════════════════════════════════════════
   Type × Size Matrix
   ═══════════════════════════════════════════════════ */
const TYPES = ['default', 'selected', 'disabled'] as const;
const SIZES = ['extra-small', 'small', 'medium', 'large'] as const;

export const TypeSizeMatrix: Story = {
  name: 'Matrix / Type × Size',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {SIZES.map((s) => (
        <div key={s}>
          <p style={{ margin: '0 0 8px', fontWeight: 600, textTransform: 'capitalize' }}>{s}</p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {TYPES.map((t) => (
              <Chip key={`${t}-${s}`} type={t} size={s} label="Label" />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ═══════════════════════════════════════════════════
   All Features Combined
   ═══════════════════════════════════════════════════ */
export const AllFeatures: Story = {
  name: 'Matrix / All Features',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Plain</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <Chip type="default" label="Default" />
          <Chip type="selected" label="Selected" />
          <Chip type="disabled" label="Disabled" />
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontWeight: 600 }}>With Leading Icon</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <Chip type="default" showLeadingIcon leadingIcon="star_filled" label="Favourite" />
          <Chip type="selected" showLeadingIcon leadingIcon="checkmark_circle_filled" label="Applied" />
          <Chip type="disabled" showLeadingIcon leadingIcon="star_filled" label="Locked" />
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontWeight: 600 }}>With Trailing Icon</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <Chip type="default" showTrailingIcon trailingIcon="x_circle_filled" label="Removable" />
          <Chip type="selected" showTrailingIcon trailingIcon="x_circle_filled" label="Clear" />
          <Chip type="disabled" showTrailingIcon trailingIcon="x_circle_filled" label="Fixed" />
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontWeight: 600 }}>With Badge</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <Chip type="default" showBadge badgeContent="3" label="Updates" />
          <Chip type="selected" showBadge badgeContent="5" label="Active" />
          <Chip type="disabled" showBadge badgeContent="2" label="Archived" />
        </div>
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Icon + Badge</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <Chip type="default" showLeadingIcon leadingIcon="bell_filled" showBadge badgeContent="3" label="Alerts" />
          <Chip type="selected" showLeadingIcon leadingIcon="cart_filled" showBadge badgeContent="2" label="Cart" />
          <Chip type="disabled" showLeadingIcon leadingIcon="bookmark_filled" showBadge badgeContent="1" label="Saved" />
        </div>
      </div>
    </div>
  ),
};

/* ═══════════════════════════════════════════════════
   Real-world Usage Examples
   ═══════════════════════════════════════════════════ */
export const FilterChips: Story = {
  name: 'Usage / Filter Chips',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Chip type="selected" showLeadingIcon leadingIcon="checkmark_circle_filled" label="Electronics" />
      <Chip type="selected" showLeadingIcon leadingIcon="checkmark_circle_filled" label="Under $50" />
      <Chip type="default" label="Free Shipping" />
      <Chip type="default" label="In Stock" />
      <Chip type="default" label="Top Rated" />
    </div>
  ),
};

export const CategoryChips: Story = {
  name: 'Usage / Category Chips',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Chip type="selected" label="All" showBadge badgeContent="24" />
      <Chip type="default" label="Music" showLeadingIcon leadingIcon="music_filled" />
      <Chip type="default" label="Photos" showLeadingIcon leadingIcon="image_filled" />
      <Chip type="default" label="Calendar" showLeadingIcon leadingIcon="calendar_filled" />
      <Chip type="default" label="Location" showLeadingIcon leadingIcon="location_pin_filled" />
    </div>
  ),
};

export const RemovableChips: Story = {
  name: 'Usage / Removable Chips',
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Chip label="React" showTrailingIcon trailingIcon="x_circle_filled" />
      <Chip label="TypeScript" showTrailingIcon trailingIcon="x_circle_filled" />
      <Chip label="Storybook" showTrailingIcon trailingIcon="x_circle_filled" />
      <Chip label="Design" showTrailingIcon trailingIcon="x_circle_filled" />
    </div>
  ),
};

export const SizeComparison: Story = {
  name: 'Usage / Size Comparison',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Chip size="extra-small" showLeadingIcon leadingIcon="star_filled" showBadge badgeContent="3" label="XS" />
      <Chip size="small" showLeadingIcon leadingIcon="star_filled" showBadge badgeContent="3" label="Small" />
      <Chip size="medium" showLeadingIcon leadingIcon="star_filled" showBadge badgeContent="3" label="Medium" />
      <Chip size="large" showLeadingIcon leadingIcon="star_filled" showBadge badgeContent="3" label="Large" />
    </div>
  ),
};

const TIME_RANGES = ['1D', '1W', '1M', '6M', '1Y', 'All'];

export const TimeRangeRow: Story = {
  name: 'Usage / Time range (extra small)',
  render: function TimeRangeRowRender() {
    const [active, setActive] = useState(0);
    return (
      <div
        style={{
          width: 376,
          boxSizing: 'border-box',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 0,
        }}
      >
        {TIME_RANGES.map((r, i) => (
          <Chip
            key={r}
            label={r}
            size="extra-small"
            type={active === i ? 'selected' : 'default'}
            onPress={() => setActive(i)}
          />
        ))}
      </div>
    );
  },
};
