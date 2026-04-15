import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';
import { Button } from '../Button';
import { iconNames } from '../Icon';

const iconOptions = ['(default)', ...iconNames];

const meta = {
  title: 'Components/Alert',
  component: Alert,
  subcomponents: { 'CTA Button': Button as React.ComponentType<unknown> },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['sleek', 'detailed'],
      description: 'Alert layout — sleek (compact bar) or detailed (card with title)',
      table: { defaultValue: { summary: 'sleek' } },
    },
    state: {
      control: 'select',
      options: ['primary', 'negative', 'warning', 'positive'],
      description: 'Colour state',
      table: { defaultValue: { summary: 'primary' } },
    },
    showIcon: {
      control: 'boolean',
      description: 'Show the leading icon',
      table: { defaultValue: { summary: 'true' }, category: 'Icon' },
    },
    iconContent: {
      control: 'select',
      options: iconOptions,
      description: `Pick from ${iconNames.length} icons in icons/svg/glyphs/`,
      mapping: Object.fromEntries([
        ['(default)', undefined],
        ...iconNames.map((n) => [n, n]),
      ]),
      table: { defaultValue: { summary: 'exclamation_circle_outline' }, category: 'Icon' },
    },
    title: {
      control: 'text',
      description: 'Title text (detailed type)',
      table: { category: 'Content' },
    },
    showTitle: {
      control: 'boolean',
      description: 'Show the title row (detailed type)',
      table: { defaultValue: { summary: 'true' }, category: 'Content' },
    },
    description: {
      control: 'text',
      description: 'Description / message text',
      table: { category: 'Content' },
    },
    showDescription: {
      control: 'boolean',
      description: 'Show the description',
      table: { defaultValue: { summary: 'true' }, category: 'Content' },
    },
    showCta: {
      control: 'boolean',
      description: 'Show the CTA action button',
      table: { defaultValue: { summary: 'true' }, category: 'CTA Button' },
    },
    ctaLabel: {
      control: 'text',
      description: 'CTA button label',
      table: { defaultValue: { summary: 'Label' }, category: 'CTA Button' },
    },
    ctaVariant: {
      control: 'select',
      options: ['filled', 'stroke', 'tonal', 'link'],
      description: 'Button visual type',
      table: { defaultValue: { summary: 'filled' }, category: 'CTA Button' },
    },
    ctaSize: {
      control: 'select',
      options: ['large', 'medium', 'small', 'extra-small'],
      description: 'Button size',
      table: { defaultValue: { summary: 'extra-small' }, category: 'CTA Button' },
    },
    ctaIcon: {
      control: 'select',
      options: ['none', 'leading', 'trailing', 'only'],
      description: 'Button icon placement',
      table: { defaultValue: { summary: 'none' }, category: 'CTA Button' },
    },
    ctaIconContent: {
      control: 'select',
      options: iconOptions,
      description: `Button icon — pick from ${iconNames.length} icons`,
      mapping: Object.fromEntries([
        ['(default)', undefined],
        ...iconNames.map((n) => [n, n]),
      ]),
      table: { category: 'CTA Button' },
    },
    ctaLoading: {
      control: 'boolean',
      description: 'Button loading state',
      table: { defaultValue: { summary: 'false' }, category: 'CTA Button' },
    },
    ctaDisabled: {
      control: 'boolean',
      description: 'Button disabled state',
      table: { defaultValue: { summary: 'false' }, category: 'CTA Button' },
    },
    showClose: {
      control: 'boolean',
      description: 'Show the close button',
      table: { defaultValue: { summary: 'true' }, category: 'Close Button' },
    },
    onCtaClick: { action: 'cta-clicked' },
    onClose: { action: 'closed' },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Interactive Playground ───────────────────────────── */

export const Playground: Story = {
  args: {
    type: 'sleek',
    state: 'primary',
    showIcon: true,
    title: 'Title',
    showTitle: true,
    description: 'Multiline alert text goes here',
    showDescription: true,
    showCta: true,
    ctaLabel: 'Label',
    showClose: true,
  },
};

/* ── Sleek — All States ──────────────────────────────── */

export const SleekPrimary: Story = {
  name: 'Sleek / Primary',
  args: { type: 'sleek', state: 'primary', description: 'Multiline alert text goes here' },
};

export const SleekNegative: Story = {
  name: 'Sleek / Negative',
  args: { type: 'sleek', state: 'negative', description: 'Multiline alert text goes here' },
};

export const SleekWarning: Story = {
  name: 'Sleek / Warning',
  args: { type: 'sleek', state: 'warning', description: 'Multiline alert text goes here' },
};

export const SleekPositive: Story = {
  name: 'Sleek / Positive',
  args: { type: 'sleek', state: 'positive', description: 'Multiline alert text goes here' },
};

/* ── Detailed — All States ───────────────────────────── */

export const DetailedPrimary: Story = {
  name: 'Detailed / Primary',
  args: { type: 'detailed', state: 'primary', title: 'Title', description: 'Multiline alert text goes here' },
};

export const DetailedNegative: Story = {
  name: 'Detailed / Negative',
  args: { type: 'detailed', state: 'negative', title: 'Title', description: 'Multiline alert text goes here' },
};

export const DetailedWarning: Story = {
  name: 'Detailed / Warning',
  args: { type: 'detailed', state: 'warning', title: 'Title', description: 'Multiline alert text goes here' },
};

export const DetailedPositive: Story = {
  name: 'Detailed / Positive',
  args: { type: 'detailed', state: 'positive', title: 'Title', description: 'Multiline alert text goes here' },
};

/* ── Visibility Toggles ──────────────────────────────── */

export const SleekNoIcon: Story = {
  name: 'Sleek / No Icon',
  args: { type: 'sleek', state: 'primary', showIcon: false, description: 'Alert without icon' },
};

export const SleekNoCta: Story = {
  name: 'Sleek / No CTA',
  args: { type: 'sleek', state: 'negative', showCta: false, description: 'Alert without action button' },
};

export const SleekNoClose: Story = {
  name: 'Sleek / No Close',
  args: { type: 'sleek', state: 'warning', showClose: false, description: 'Alert without close button' },
};

export const SleekTextOnly: Story = {
  name: 'Sleek / Text Only',
  args: { type: 'sleek', state: 'positive', showIcon: false, showCta: false, showClose: false, description: 'Plain alert message' },
};

export const DetailedNoTitle: Story = {
  name: 'Detailed / No Title',
  args: { type: 'detailed', state: 'primary', showTitle: false, description: 'Detailed alert without a title row' },
};

export const DetailedNoDescription: Story = {
  name: 'Detailed / No Description',
  args: { type: 'detailed', state: 'negative', showDescription: false, title: 'Title Only Alert' },
};

export const DetailedNoCta: Story = {
  name: 'Detailed / No CTA',
  args: { type: 'detailed', state: 'warning', showCta: false, title: 'Title', description: 'Alert without a CTA button' },
};

export const DetailedNoClose: Story = {
  name: 'Detailed / No Close',
  args: { type: 'detailed', state: 'positive', showClose: false, title: 'Title', description: 'Alert without a close button' },
};

/* ── Custom Icons ────────────────────────────────────── */

export const SleekInfoIcon: Story = {
  name: 'Sleek / Info Icon',
  args: { type: 'sleek', state: 'primary', iconContent: 'info_circle_filled', description: 'Something you should know' },
};

export const DetailedWarningIcon: Story = {
  name: 'Detailed / Warning Icon',
  args: { type: 'detailed', state: 'warning', iconContent: 'exclamation_hexagon_filled', title: 'Warning', description: 'Please check your input before continuing' },
};

export const DetailedCheckIcon: Story = {
  name: 'Detailed / Check Icon',
  args: { type: 'detailed', state: 'positive', iconContent: 'checkmark_circle_filled', title: 'Success', description: 'Your changes have been saved' },
};

/* ── Full Matrix ─────────────────────────────────────── */

export const FullMatrix: Story = {
  name: 'Matrix / Complete',
  render: () => {
    const states = ['primary', 'negative', 'warning', 'positive'] as const;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-neutral-medium)', marginBottom: 16 }}>
            Type: Sleek
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {states.map((s) => (
              <Alert key={s} type="sleek" state={s} description="Multiline alert text goes here" />
            ))}
          </div>
        </div>
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-neutral-medium)', marginBottom: 16 }}>
            Type: Detailed
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {states.map((s) => (
              <Alert key={s} type="detailed" state={s} title="Title" description="Multiline alert text goes here" />
            ))}
          </div>
        </div>
      </div>
    );
  },
};
