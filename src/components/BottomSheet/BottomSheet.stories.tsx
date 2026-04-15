import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BottomSheet } from './BottomSheet';

const PlaceholderImage = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, var(--background-positive-weak) 0%, var(--background-positive-weak) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 48,
    }}
  >
    🖼️
  </div>
);

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/Bottom Sheet',
  component: BottomSheet,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '**Mobile (viewport under 600px):** always a **bottom sheet** — anchored to the bottom, top radii only, slide-up, home indicator. **600px and wider (tablet / web):** centered **modal** (full corner radius, elevated shadow, no home indicator). Resize the preview or use device emulation to compare.',
      },
    },
  },
  argTypes: {
    /* ══ Variant ═════════════════════════════════════ */
    showHeader: {
      control: 'boolean',
      description: 'Show header image area (240px)',
      table: { category: 'Variant', defaultValue: { summary: 'true' } },
    },
    showDismiss: {
      control: 'boolean',
      description: 'Show dismiss (X) button',
      table: { category: 'Variant', defaultValue: { summary: 'true' } },
      if: { arg: 'showHeader' },
    },
    showTitle: {
      control: 'boolean',
      description: 'Show title text',
      table: { category: 'Variant', defaultValue: { summary: 'true' } },
    },
    showSubtitle: {
      control: 'boolean',
      description: 'Show subtitle text',
      table: { category: 'Variant', defaultValue: { summary: 'true' } },
    },
    showPrimaryCta: {
      control: 'boolean',
      description: 'Show primary CTA button',
      table: { category: 'Variant', defaultValue: { summary: 'true' } },
    },
    showSecondaryCta: {
      control: 'boolean',
      description: 'Show secondary CTA button',
      table: { category: 'Variant', defaultValue: { summary: 'true' } },
    },

    /* ══ Content ═════════════════════════════════════ */
    title: {
      control: 'text',
      description: 'Title text (22px Bold)',
      table: { category: 'Content', defaultValue: { summary: 'Title Text' } },
      if: { arg: 'showTitle' },
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle text (14px Regular)',
      table: { category: 'Content', defaultValue: { summary: 'Subtitle' } },
      if: { arg: 'showSubtitle' },
    },
    primaryCtaLabel: {
      control: 'text',
      description: 'Primary CTA button label',
      table: { category: 'Content', defaultValue: { summary: 'Label' } },
      if: { arg: 'showPrimaryCta' },
    },
    secondaryCtaLabel: {
      control: 'text',
      description: 'Secondary CTA button label',
      table: { category: 'Content', defaultValue: { summary: 'Label' } },
      if: { arg: 'showSecondaryCta' },
    },

    /* ══ State ═══════════════════════════════════════ */
    open: {
      control: 'boolean',
      description: 'Whether the bottom sheet is visible',
      table: { category: 'State', defaultValue: { summary: 'true' } },
    },

    /* ══ Events ══════════════════════════════════════ */
    onClose: {
      action: 'closed',
      description: 'Called when dismiss button or backdrop is clicked',
      table: { category: 'Events' },
    },
    onPrimaryClick: {
      action: 'primaryClicked',
      description: 'Primary CTA click handler',
      table: { category: 'Events' },
    },
    onSecondaryClick: {
      action: 'secondaryClicked',
      description: 'Secondary CTA click handler',
      table: { category: 'Events' },
    },

    /* ══ Hidden ══════════════════════════════════════ */
    headerContent: { control: false },
    className: { control: false },
  },
  args: {
    open: true,
    showHeader: true,
    showDismiss: true,
    showTitle: true,
    title: 'Title Text',
    showSubtitle: true,
    subtitle: 'Subtitle',
    showPrimaryCta: true,
    primaryCtaLabel: 'Label',
    showSecondaryCta: true,
    secondaryCtaLabel: 'Label',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', background: 'var(--surface-level-4)', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

/* ── Playground ──────────────────────────────────── */
export const Playground: Story = {
  args: {
    headerContent: <PlaceholderImage />,
  },
};

/* ── With Header Image ───────────────────────────── */
export const WithHeaderImage: Story = {
  args: {
    headerContent: <PlaceholderImage />,
  },
};

/* ── Without Header ──────────────────────────────── */
export const WithoutHeader: Story = {
  args: {
    showHeader: false,
  },
};

/* ── Title Only ──────────────────────────────────── */
export const TitleOnly: Story = {
  args: {
    showHeader: false,
    showSubtitle: false,
    title: 'Are you sure?',
    primaryCtaLabel: 'Confirm',
    secondaryCtaLabel: 'Cancel',
  },
};

/* ── Single CTA ──────────────────────────────────── */
export const SingleCta: Story = {
  args: {
    showHeader: false,
    showSecondaryCta: false,
    title: 'Success!',
    subtitle: 'Your transaction has been completed.',
    primaryCtaLabel: 'Done',
  },
};

/* ── No Dismiss ──────────────────────────────────── */
export const NoDismiss: Story = {
  args: {
    showDismiss: false,
    headerContent: <PlaceholderImage />,
  },
};

/* ── Interactive demo ────────────────────────────── */
function InteractiveRender() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '12px 24px',
          fontSize: 16,
          fontWeight: 600,
          borderRadius: 12,
          border: '2px solid var(--text-positive-strong)',
          background: 'var(--text-positive-strong)',
          color: 'var(--surface-level-1)',
          cursor: 'pointer',
        }}
      >
        Open Bottom Sheet
      </button>
      <BottomSheet
        open={isOpen}
        onClose={() => setIsOpen(false)}
        headerContent={<PlaceholderImage />}
        title="Welcome Back"
        subtitle="Tap below to continue to your portfolio."
        primaryCtaLabel="Continue"
        secondaryCtaLabel="Not now"
        onPrimaryClick={() => setIsOpen(false)}
        onSecondaryClick={() => setIsOpen(false)}
      />
    </div>
  );
}

export const Interactive: Story = {
  render: InteractiveRender,
  parameters: { controls: { disable: true } },
};
