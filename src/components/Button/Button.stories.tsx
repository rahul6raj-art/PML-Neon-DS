import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { iconNames } from '../Icon';

const iconOptions = ['(none)', ...iconNames];

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'stroke', 'tonal', 'link'],
      description: 'Visual button type',
      table: { category: 'Appearance', defaultValue: { summary: 'filled' } },
    },
    size: {
      control: 'select',
      options: ['large', 'medium', 'small', 'extra-small'],
      description: 'Button size — affects height, padding, and font size',
      table: { category: 'Appearance', defaultValue: { summary: 'large' } },
    },
    icon: {
      control: 'select',
      options: ['none', 'leading', 'trailing', 'only'],
      description: 'Icon placement relative to the label',
      table: { category: 'Icon', defaultValue: { summary: 'none' } },
    },
    iconContent: {
      control: 'select',
      options: iconOptions,
      description: `Pick from ${iconNames.length} icons in icons/svg/glyphs/`,
      mapping: Object.fromEntries([
        ['(none)', undefined],
        ...iconNames.map((n) => [n, n]),
      ]),
      table: { category: 'Icon', defaultValue: { summary: 'arrow_right_outline' } },
    },
    label: {
      control: 'text',
      description: 'Button label text',
      table: { category: 'Content', defaultValue: { summary: 'Label' } },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading dot indicator and disable interaction',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state — greyed out, non-interactive',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Playground ────────────────────────────────────── */
export const Playground: Story = {
  args: {
    variant: 'filled',
    size: 'large',
    icon: 'none',
    label: 'Label',
    loading: false,
    disabled: false,
  },
};

/* ═══════════════════════════════════════════════════
   Type Variants
   ═══════════════════════════════════════════════════ */
export const Filled: Story = {
  name: 'Type / Filled',
  args: { variant: 'filled', label: 'Filled Button' },
};

export const Stroke: Story = {
  name: 'Type / Stroke',
  args: { variant: 'stroke', label: 'Stroke Button' },
};

export const Tonal: Story = {
  name: 'Type / Tonal',
  args: { variant: 'tonal', label: 'Tonal Button' },
};

export const Link: Story = {
  name: 'Type / Link',
  args: { variant: 'link', label: 'Link Button' },
};

/* ═══════════════════════════════════════════════════
   Size Variants
   ═══════════════════════════════════════════════════ */
export const SizeLarge: Story = {
  name: 'Size / Large',
  args: { size: 'large', label: 'Large' },
};

export const SizeMedium: Story = {
  name: 'Size / Medium',
  args: { size: 'medium', label: 'Medium' },
};

export const SizeSmall: Story = {
  name: 'Size / Small',
  args: { size: 'small', label: 'Small' },
};

export const SizeExtraSmall: Story = {
  name: 'Size / Extra Small',
  args: { size: 'extra-small', label: 'XS' },
};

/* ═══════════════════════════════════════════════════
   Icon Variants — Using icons from icons/svg/glyphs/
   ═══════════════════════════════════════════════════ */
export const IconLeading: Story = {
  name: 'Icon / Leading',
  args: { icon: 'leading', iconContent: 'arrow_left_outline', label: 'Back' },
};

export const IconTrailing: Story = {
  name: 'Icon / Trailing',
  args: { icon: 'trailing', iconContent: 'arrow_right_outline', label: 'Next' },
};

export const IconOnly: Story = {
  name: 'Icon / Only',
  args: { icon: 'only', iconContent: 'plus_outline' },
};

export const IconLeadingBookmark: Story = {
  name: 'Icon / Leading — Bookmark',
  args: { icon: 'leading', iconContent: 'bookmark_filled', label: 'Save' },
};

export const IconLeadingCart: Story = {
  name: 'Icon / Leading — Cart',
  args: { icon: 'leading', iconContent: 'cart_filled', label: 'Add to Cart' },
};

export const IconLeadingDownload: Story = {
  name: 'Icon / Leading — Download',
  args: { icon: 'leading', iconContent: 'download_filled', label: 'Download' },
};

export const IconTrailingShare: Story = {
  name: 'Icon / Trailing — Share',
  args: { icon: 'trailing', iconContent: 'share_ios', label: 'Share', variant: 'stroke' },
};

export const IconOnlyHeart: Story = {
  name: 'Icon / Only — Heart',
  args: { icon: 'only', iconContent: 'like_filled', variant: 'tonal' },
};

export const IconOnlyBell: Story = {
  name: 'Icon / Only — Bell',
  args: { icon: 'only', iconContent: 'bell_filled' },
};

/* ═══════════════════════════════════════════════════
   State Variants
   ═══════════════════════════════════════════════════ */
export const Disabled: Story = {
  name: 'State / Disabled',
  args: { disabled: true, label: 'Disabled' },
};

export const DisabledWithIcon: Story = {
  name: 'State / Disabled with Icon',
  args: { disabled: true, icon: 'leading', iconContent: 'lock_filled', label: 'Locked' },
};

export const LoadingState: Story = {
  name: 'State / Loading',
  args: { loading: true, label: 'Loading' },
};

/* ═══════════════════════════════════════════════════
   Filled — All States
   ═══════════════════════════════════════════════════ */
export const FilledAllStates: Story = {
  name: 'Filled / All States',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="filled" label="Normal" />
      <Button variant="filled" icon="leading" iconContent="checkmark_circle_filled" label="Confirm" />
      <Button variant="filled" label="Disabled" disabled />
      <Button variant="filled" label="Loading" loading />
      <Button variant="filled" icon="only" iconContent="plus_outline" />
    </div>
  ),
};

/* ═══════════════════════════════════════════════════
   Stroke — All States
   ═══════════════════════════════════════════════════ */
export const StrokeAllStates: Story = {
  name: 'Stroke / All States',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="stroke" label="Normal" />
      <Button variant="stroke" icon="leading" iconContent="doc_text_filled" label="With Icon" />
      <Button variant="stroke" label="Disabled" disabled />
      <Button variant="stroke" label="Loading" loading />
      <Button variant="stroke" icon="only" iconContent="share_ios" />
    </div>
  ),
};

/* ═══════════════════════════════════════════════════
   Tonal — All States
   ═══════════════════════════════════════════════════ */
export const TonalAllStates: Story = {
  name: 'Tonal / All States',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="tonal" label="Normal" />
      <Button variant="tonal" icon="leading" iconContent="like_filled" label="With Icon" />
      <Button variant="tonal" label="Disabled" disabled />
      <Button variant="tonal" label="Loading" loading />
      <Button variant="tonal" icon="only" iconContent="bookmark_filled" />
    </div>
  ),
};

/* ═══════════════════════════════════════════════════
   Link — All States
   ═══════════════════════════════════════════════════ */
export const LinkAllStates: Story = {
  name: 'Link / All States',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="link" label="Normal" />
      <Button variant="link" icon="trailing" iconContent="arrow_right_outline" label="With Icon" />
      <Button variant="link" label="Disabled" disabled />
      <Button variant="link" label="Loading" loading />
      <Button variant="link" icon="only" iconContent="info_circle_outline" />
    </div>
  ),
};

/* ═══════════════════════════════════════════════════
   All Sizes — Filled with Icons
   ═══════════════════════════════════════════════════ */
export const AllSizesFilled: Story = {
  name: 'Size Matrix / Filled',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="filled" size="large" icon="leading" iconContent="arrow_right_outline" label="Large" />
      <Button variant="filled" size="medium" icon="leading" iconContent="arrow_right_outline" label="Medium" />
      <Button variant="filled" size="small" icon="leading" iconContent="arrow_right_outline" label="Small" />
      <Button variant="filled" size="extra-small" icon="leading" iconContent="arrow_right_outline" label="XS" />
    </div>
  ),
};

/* ═══════════════════════════════════════════════════
   Icon Placement — All positions with Filled
   ═══════════════════════════════════════════════════ */
export const IconPlacement: Story = {
  name: 'Icon Placement / Filled',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="filled" icon="none" label="No Icon" />
      <Button variant="filled" icon="leading" iconContent="arrow_left_outline" label="Leading" />
      <Button variant="filled" icon="trailing" iconContent="arrow_right_outline" label="Trailing" />
      <Button variant="filled" icon="only" iconContent="plus_outline" />
    </div>
  ),
};

/* ═══════════════════════════════════════════════════
   Icon-Only — All Sizes
   ═══════════════════════════════════════════════════ */
export const IconOnlyAllSizes: Story = {
  name: 'Icon Only / All Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="filled" size="large" icon="only" iconContent="plus_outline" />
      <Button variant="filled" size="medium" icon="only" iconContent="plus_outline" />
      <Button variant="filled" size="small" icon="only" iconContent="plus_outline" />
      <Button variant="filled" size="extra-small" icon="only" iconContent="plus_outline" />
    </div>
  ),
};

/* ═══════════════════════════════════════════════════
   Icon Showcase — Various icons across types
   ═══════════════════════════════════════════════════ */
export const IconShowcase: Story = {
  name: 'Icon Showcase',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="filled" icon="leading" iconContent="cart_filled" label="Add to Cart" />
        <Button variant="filled" icon="leading" iconContent="download_filled" label="Download" />
        <Button variant="filled" icon="leading" iconContent="share_ios" label="Share" />
        <Button variant="filled" icon="trailing" iconContent="arrow_right_outline" label="Continue" />
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="stroke" icon="leading" iconContent="like_outline" label="Favourite" />
        <Button variant="stroke" icon="leading" iconContent="bookmark_outline" label="Save" />
        <Button variant="stroke" icon="leading" iconContent="doc_text_outline" label="Edit" />
        <Button variant="stroke" icon="leading" iconContent="copy_outline" label="Copy" />
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="tonal" icon="leading" iconContent="bell_filled" label="Notifications" />
        <Button variant="tonal" icon="leading" iconContent="camera_filled" label="Camera" />
        <Button variant="tonal" icon="leading" iconContent="calendar_filled" label="Schedule" />
        <Button variant="tonal" icon="leading" iconContent="star_filled" label="Rate" />
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="link" icon="trailing" iconContent="arrow_right_outline" label="Learn More" />
        <Button variant="link" icon="leading" iconContent="info_circle_outline" label="Details" />
        <Button variant="link" icon="leading" iconContent="eye_outline" label="Preview" />
        <Button variant="link" icon="leading" iconContent="web_outline" label="Website" />
      </div>
    </div>
  ),
};

/* ═══════════════════════════════════════════════════
   Icon-Only Showcase — Multiple icons
   ═══════════════════════════════════════════════════ */
export const IconOnlyShowcase: Story = {
  name: 'Icon Only / Showcase',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Button variant="filled" icon="only" iconContent="plus_outline" />
        <Button variant="filled" icon="only" iconContent="like_filled" />
        <Button variant="filled" icon="only" iconContent="share_ios" />
        <Button variant="filled" icon="only" iconContent="bell_filled" />
        <Button variant="filled" icon="only" iconContent="cart_filled" />
        <Button variant="filled" icon="only" iconContent="search_outline" />
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Button variant="stroke" icon="only" iconContent="doc_text_outline" />
        <Button variant="stroke" icon="only" iconContent="bin_outline" />
        <Button variant="stroke" icon="only" iconContent="copy_outline" />
        <Button variant="stroke" icon="only" iconContent="bookmark_outline" />
        <Button variant="stroke" icon="only" iconContent="download_outline" />
        <Button variant="stroke" icon="only" iconContent="camera_outline" />
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Button variant="tonal" icon="only" iconContent="star_filled" />
        <Button variant="tonal" icon="only" iconContent="eye_filled" />
        <Button variant="tonal" icon="only" iconContent="lock_filled" />
        <Button variant="tonal" icon="only" iconContent="filter_filled" />
        <Button variant="tonal" icon="only" iconContent="home_filled" />
        <Button variant="tonal" icon="only" iconContent="calendar_filled" />
      </div>
    </div>
  ),
};

/* ═══════════════════════════════════════════════════
   Loading — All Types
   ═══════════════════════════════════════════════════ */
export const LoadingAllTypes: Story = {
  name: 'Loading / All Types',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="filled" loading label="Filled" />
      <Button variant="stroke" loading label="Stroke" />
      <Button variant="tonal" loading label="Tonal" />
      <Button variant="link" loading label="Link" />
    </div>
  ),
};

/* ═══════════════════════════════════════════════════
   Disabled — All Types
   ═══════════════════════════════════════════════════ */
export const DisabledAllTypes: Story = {
  name: 'Disabled / All Types',
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="filled" disabled label="Filled" />
      <Button variant="stroke" disabled label="Stroke" />
      <Button variant="tonal" disabled label="Tonal" />
      <Button variant="link" disabled label="Link" />
    </div>
  ),
};

/* ═══════════════════════════════════════════════════
   Full Matrix — Type × Size (Normal state)
   ═══════════════════════════════════════════════════ */
const TYPES = ['filled', 'stroke', 'tonal', 'link'] as const;
const SIZES = ['large', 'medium', 'small', 'extra-small'] as const;

export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {TYPES.map((t) => (
        <div key={t}>
          <p style={{ margin: '0 0 8px', fontWeight: 600, textTransform: 'capitalize' }}>{t}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            {SIZES.map((s) => (
              <Button key={`${t}-${s}`} variant={t} size={s} label={s === 'extra-small' ? 'XS' : s.charAt(0).toUpperCase() + s.slice(1)} />
            ))}
            {SIZES.map((s) => (
              <Button key={`${t}-${s}-icon`} variant={t} size={s} icon="leading" iconContent="arrow_right_outline" label={s === 'extra-small' ? 'XS' : s.charAt(0).toUpperCase() + s.slice(1)} />
            ))}
            {SIZES.map((s) => (
              <Button key={`${t}-${s}-only`} variant={t} size={s} icon="only" iconContent="plus_outline" />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

/* ═══════════════════════════════════════════════════
   Full Matrix — All States per Type (Large)
   ═══════════════════════════════════════════════════ */
export const AllStatesMatrix: Story = {
  name: 'All States Matrix',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {TYPES.map((t) => (
        <div key={t}>
          <p style={{ margin: '0 0 8px', fontWeight: 600, textTransform: 'capitalize' }}>{t}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button variant={t} label="Normal" />
            <Button variant={t} icon="leading" iconContent="arrow_right_outline" label="Icon" />
            <Button variant={t} label="Disabled" disabled />
            <Button variant={t} icon="leading" iconContent="lock_filled" label="Disabled" disabled />
            <Button variant={t} label="Loading" loading />
            <Button variant={t} icon="only" iconContent="plus_outline" />
            <Button variant={t} icon="only" iconContent="like_filled" disabled />
          </div>
        </div>
      ))}
    </div>
  ),
};
