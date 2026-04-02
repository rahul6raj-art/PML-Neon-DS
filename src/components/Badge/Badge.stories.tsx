import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';
import { iconNames } from '../Icon';

const iconOptions = ['(none)', ...iconNames];

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'count', 'dot'],
      description: 'Badge display type',
      table: { defaultValue: { summary: 'text' } },
    },
    context: {
      control: 'select',
      options: [
        'default',
        'default-alt',
        'primary',
        'positive',
        'notice',
        'negative',
        'highlight',
        'live',
      ],
      description: 'Semantic context / color scheme',
      table: { defaultValue: { summary: 'default' } },
    },
    muted: {
      control: 'boolean',
      description: 'Use the muted (lighter) color variant',
      table: { defaultValue: { summary: 'false' } },
    },
    label: {
      control: 'text',
      description: 'Text label (type="text" only)',
      if: { arg: 'type', neq: 'dot' },
    },
    count: {
      control: { type: 'number', min: 0, max: 999 },
      description: 'Count value (type="count" only)',
      if: { arg: 'type', eq: 'count' },
    },
    showLeadingIcon: {
      control: 'boolean',
      description: 'Show a leading icon',
      table: { defaultValue: { summary: 'false' }, category: 'Icons' },
    },
    showTrailingIcon: {
      control: 'boolean',
      description: 'Show a trailing icon',
      table: { defaultValue: { summary: 'false' }, category: 'Icons' },
    },
    leadingIcon: {
      control: 'select',
      options: iconOptions,
      description: 'Leading icon — pick from 204 icons in icons/svg/glyphs/',
      mapping: Object.fromEntries([
        ['(none)', undefined],
        ...iconNames.map((n) => [n, n]),
      ]),
      table: { defaultValue: { summary: 'star_filled' }, category: 'Icons' },
    },
    trailingIcon: {
      control: 'select',
      options: iconOptions,
      description: 'Trailing icon — pick from 204 icons in icons/svg/glyphs/',
      mapping: Object.fromEntries([
        ['(none)', undefined],
        ...iconNames.map((n) => [n, n]),
      ]),
      table: { defaultValue: { summary: 'star_filled' }, category: 'Icons' },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Interactive Playground ───────────────────────────── */

export const Playground: Story = {
  args: {
    type: 'text',
    context: 'default',
    muted: false,
    label: 'Label',
    count: 3,
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
};

/* ── Type: Text ──────────────────────────────────────── */

export const TextDefault: Story = {
  name: 'Text / Default',
  args: { type: 'text', context: 'default', label: 'Label' },
};

export const TextDefaultMuted: Story = {
  name: 'Text / Default Muted',
  args: { type: 'text', context: 'default', muted: true, label: 'Label' },
};

export const TextPrimary: Story = {
  name: 'Text / Primary',
  args: { type: 'text', context: 'primary', label: 'Label' },
};

export const TextPrimaryMuted: Story = {
  name: 'Text / Primary Muted',
  args: { type: 'text', context: 'primary', muted: true, label: 'Label' },
};

export const TextPositive: Story = {
  name: 'Text / Positive',
  args: { type: 'text', context: 'positive', label: 'Label' },
};

export const TextNotice: Story = {
  name: 'Text / Notice',
  args: { type: 'text', context: 'notice', label: 'Label' },
};

export const TextNegative: Story = {
  name: 'Text / Negative',
  args: { type: 'text', context: 'negative', label: 'Label' },
};

export const TextHighlight: Story = {
  name: 'Text / Highlight',
  args: { type: 'text', context: 'highlight', label: 'Label' },
};

export const TextLive: Story = {
  name: 'Text / Live',
  args: { type: 'text', context: 'live', label: 'Label' },
};

export const TextLiveMuted: Story = {
  name: 'Text / Live Muted',
  args: { type: 'text', context: 'live', muted: true, label: 'Label' },
};

/* ── With Icons ──────────────────────────────────────── */

export const WithLeadingIcon: Story = {
  name: 'Text / With Leading Icon',
  args: {
    type: 'text',
    context: 'primary',
    label: 'Featured',
    showLeadingIcon: true,
    leadingIcon: 'star_filled',
  },
};

export const WithTrailingIcon: Story = {
  name: 'Text / With Trailing Icon',
  args: {
    type: 'text',
    context: 'positive',
    label: 'Success',
    showTrailingIcon: true,
    trailingIcon: 'checkmark_circle_filled',
  },
};

export const WithBothIcons: Story = {
  name: 'Text / With Both Icons',
  args: {
    type: 'text',
    context: 'notice',
    label: 'Warning',
    showLeadingIcon: true,
    showTrailingIcon: true,
    leadingIcon: 'exclamation_circle_filled',
    trailingIcon: 'x_circle_filled',
  },
};

export const InfoBadge: Story = {
  name: 'Text / Info Badge',
  args: {
    type: 'text',
    context: 'primary',
    muted: true,
    label: 'Info',
    showLeadingIcon: true,
    leadingIcon: 'info_circle_filled',
  },
};

export const SecuredBadge: Story = {
  name: 'Text / Secured Badge',
  args: {
    type: 'text',
    context: 'highlight',
    label: 'Secured',
    showLeadingIcon: true,
    leadingIcon: 'lock_filled',
  },
};

export const NotificationBadge: Story = {
  name: 'Text / Notification Badge',
  args: {
    type: 'text',
    context: 'negative',
    label: 'Alert',
    showLeadingIcon: true,
    leadingIcon: 'bell_filled',
  },
};

/* ── Type: Count ─────────────────────────────────────── */

export const CountDefault: Story = {
  name: 'Count / Default',
  args: { type: 'count', context: 'default', count: 3 },
};

export const CountPrimary: Story = {
  name: 'Count / Primary',
  args: { type: 'count', context: 'primary', count: 3 },
};

export const CountPositive: Story = {
  name: 'Count / Positive',
  args: { type: 'count', context: 'positive', count: 3 },
};

export const CountNegative: Story = {
  name: 'Count / Negative',
  args: { type: 'count', context: 'negative', count: 3 },
};

export const CountHighlight: Story = {
  name: 'Count / Highlight',
  args: { type: 'count', context: 'highlight', count: 3 },
};

/* ── Type: Dot ───────────────────────────────────────── */

export const DotDefault: Story = {
  name: 'Dot / Default',
  args: { type: 'dot', context: 'default' },
};

export const DotPrimary: Story = {
  name: 'Dot / Primary',
  args: { type: 'dot', context: 'primary' },
};

export const DotPositive: Story = {
  name: 'Dot / Positive',
  args: { type: 'dot', context: 'positive' },
};

export const DotNegative: Story = {
  name: 'Dot / Negative',
  args: { type: 'dot', context: 'negative' },
};

export const DotLive: Story = {
  name: 'Dot / Live',
  args: { type: 'dot', context: 'live' },
};

/* ── Matrices ────────────────────────────────────────── */

const contexts = [
  'default',
  'default-alt',
  'primary',
  'positive',
  'notice',
  'negative',
  'highlight',
  'live',
] as const;

export const AllTextVariants: Story = {
  name: 'Matrix / Text (all contexts)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {contexts.map((ctx) => (
        <div key={ctx} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Badge type="text" context={ctx} label="Label" />
          <Badge type="text" context={ctx} label="Label" muted />
        </div>
      ))}
    </div>
  ),
};

export const AllTextWithIcons: Story = {
  name: 'Matrix / Text + Icons (all contexts)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {contexts.map((ctx) => (
        <div key={ctx} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Badge type="text" context={ctx} label="Label" showLeadingIcon leadingIcon="star_filled" />
          <Badge type="text" context={ctx} label="Label" showTrailingIcon trailingIcon="arrow_right_filled" />
          <Badge type="text" context={ctx} label="Label" showLeadingIcon showTrailingIcon leadingIcon="info_circle_filled" trailingIcon="x_circle_filled" />
          <Badge type="text" context={ctx} label="Label" showLeadingIcon showTrailingIcon muted leadingIcon="star_filled" trailingIcon="checkmark_circle_filled" />
        </div>
      ))}
    </div>
  ),
};

export const AllCountVariants: Story = {
  name: 'Matrix / Count (all contexts)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {contexts
        .filter((c) => c !== 'live')
        .map((ctx) => (
          <div key={ctx} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Badge type="count" context={ctx} count={3} />
            <Badge type="count" context={ctx} count={3} muted />
          </div>
        ))}
    </div>
  ),
};

export const AllDotVariants: Story = {
  name: 'Matrix / Dot (all contexts)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {contexts.map((ctx) => (
        <div key={ctx} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Badge type="dot" context={ctx} />
          <Badge type="dot" context={ctx} muted />
        </div>
      ))}
    </div>
  ),
};

export const FullMatrix: Story = {
  name: 'Matrix / Complete',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(6, 1fr)', gap: 8, alignItems: 'center', fontSize: 11, fontWeight: 600, color: 'var(--text-neutral-medium)' }}>
        <span />
        <span>Text</span>
        <span>Text Muted</span>
        <span>Count</span>
        <span>Count Muted</span>
        <span>Dot</span>
        <span>Dot Muted</span>
      </div>
      {contexts.map((ctx) => (
        <div
          key={ctx}
          style={{
            display: 'grid',
            gridTemplateColumns: '100px repeat(6, 1fr)',
            gap: 8,
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-neutral-medium)', textTransform: 'capitalize' }}>
            {ctx}
          </span>
          <span><Badge type="text" context={ctx} label="Label" /></span>
          <span><Badge type="text" context={ctx} label="Label" muted /></span>
          {ctx !== 'live' ? (
            <>
              <span><Badge type="count" context={ctx} count={3} /></span>
              <span><Badge type="count" context={ctx} count={3} muted /></span>
            </>
          ) : (
            <>
              <span style={{ fontSize: 10, color: 'var(--text-neutral-weak)' }}>--</span>
              <span style={{ fontSize: 10, color: 'var(--text-neutral-weak)' }}>--</span>
            </>
          )}
          <span><Badge type="dot" context={ctx} /></span>
          <span><Badge type="dot" context={ctx} muted /></span>
        </div>
      ))}
    </div>
  ),
};
