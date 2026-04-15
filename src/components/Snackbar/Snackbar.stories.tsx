import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Snackbar } from './Snackbar';
import { Button } from '../Button';
import { iconNames } from '../Icon';

const iconOptions = ['(default)', ...iconNames];

const meta = {
  title: 'Components/Snackbar',
  component: Snackbar,
  subcomponents: { 'Action Button': Button as React.ComponentType<unknown> },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['fixed', 'floating'],
      description: 'Fixed includes a status bar (mobile); floating is standalone',
      table: { defaultValue: { summary: 'floating' } },
    },
    context: {
      control: 'select',
      options: ['notice', 'negative', 'positive', 'neutral', 'brand'],
      description: 'Colour context',
      table: { defaultValue: { summary: 'notice' } },
    },
    icon: {
      control: 'select',
      options: ['none', 'leading', 'trailing'],
      description: 'Icon placement relative to text',
      table: { defaultValue: { summary: 'none' }, category: 'Icon' },
    },
    iconContent: {
      control: 'select',
      options: iconOptions,
      description: `Pick from ${iconNames.length} icons in icons/svg/glyphs/`,
      mapping: Object.fromEntries([
        ['(default)', undefined],
        ...iconNames.map((n) => [n, n]),
      ]),
      table: { defaultValue: { summary: 'bell_filled' }, category: 'Icon' },
    },
    showAction: {
      control: 'boolean',
      description: 'Show the action button',
      table: { defaultValue: { summary: 'false' }, category: 'Action Button' },
    },
    actionLabel: {
      control: 'text',
      description: 'Action button label',
      table: { defaultValue: { summary: 'Label' }, category: 'Action Button' },
    },
    actionVariant: {
      control: 'select',
      options: ['filled', 'stroke', 'tonal', 'link'],
      description: 'Button visual type',
      table: { defaultValue: { summary: 'stroke' }, category: 'Action Button' },
    },
    actionSize: {
      control: 'select',
      options: ['large', 'medium', 'small', 'extra-small'],
      description: 'Button size',
      table: { defaultValue: { summary: 'extra-small' }, category: 'Action Button' },
    },
    actionIcon: {
      control: 'select',
      options: ['none', 'leading', 'trailing', 'only'],
      description: 'Button icon placement',
      table: { defaultValue: { summary: 'none' }, category: 'Action Button' },
    },
    actionIconContent: {
      control: 'select',
      options: iconOptions,
      description: `Button icon — pick from ${iconNames.length} icons`,
      mapping: Object.fromEntries([
        ['(default)', undefined],
        ...iconNames.map((n) => [n, n]),
      ]),
      table: { category: 'Action Button' },
    },
    actionLoading: {
      control: 'boolean',
      description: 'Button loading state',
      table: { defaultValue: { summary: 'false' }, category: 'Action Button' },
    },
    actionDisabled: {
      control: 'boolean',
      description: 'Button disabled state',
      table: { defaultValue: { summary: 'false' }, category: 'Action Button' },
    },
    message: {
      control: 'text',
      description: 'Snackbar message text',
    },
    onAction: { action: 'action-clicked' },
  },
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Interactive Playground ───────────────────────────── */

export const Playground: Story = {
  args: {
    position: 'floating',
    context: 'notice',
    icon: 'trailing',
    showAction: true,
    actionLabel: 'Label',
    message: 'Multiline snackbar text goes here',
  },
};

/* ── Floating — All Contexts ─────────────────────────── */

export const FloatingNotice: Story = {
  name: 'Floating / Notice',
  args: { position: 'floating', context: 'notice', icon: 'trailing', showAction: true, message: 'Something needs your attention' },
};

export const FloatingNegative: Story = {
  name: 'Floating / Negative',
  args: { position: 'floating', context: 'negative', icon: 'trailing', showAction: true, message: 'Action could not be completed' },
};

export const FloatingPositive: Story = {
  name: 'Floating / Positive',
  args: { position: 'floating', context: 'positive', icon: 'trailing', showAction: true, message: 'Successfully saved changes' },
};

export const FloatingNeutral: Story = {
  name: 'Floating / Neutral',
  args: { position: 'floating', context: 'neutral', icon: 'trailing', showAction: true, message: 'Your file has been uploaded' },
};

export const FloatingBrand: Story = {
  name: 'Floating / Brand',
  args: { position: 'floating', context: 'brand', icon: 'trailing', showAction: true, message: 'New update available' },
};

/* ── Fixed — All Contexts ────────────────────────────── */

export const FixedNotice: Story = {
  name: 'Fixed / Notice',
  args: { position: 'fixed', context: 'notice', icon: 'leading', showAction: true, message: 'Something needs your attention' },
};

export const FixedNegative: Story = {
  name: 'Fixed / Negative',
  args: { position: 'fixed', context: 'negative', icon: 'leading', showAction: true, message: 'Action could not be completed' },
};

export const FixedPositive: Story = {
  name: 'Fixed / Positive',
  args: { position: 'fixed', context: 'positive', icon: 'leading', showAction: true, message: 'Successfully saved changes' },
};

export const FixedNeutral: Story = {
  name: 'Fixed / Neutral',
  args: { position: 'fixed', context: 'neutral', icon: 'leading', showAction: true, message: 'Your file has been uploaded' },
};

export const FixedBrand: Story = {
  name: 'Fixed / Brand',
  args: { position: 'fixed', context: 'brand', icon: 'leading', showAction: true, message: 'New update available' },
};

/* ── Icon Positions ──────────────────────────────────── */

export const LeadingIcon: Story = {
  name: 'Icon / Leading',
  args: { position: 'floating', context: 'notice', icon: 'leading', showAction: true, message: 'Snackbar text goes here' },
};

export const TrailingIcon: Story = {
  name: 'Icon / Trailing',
  args: { position: 'floating', context: 'notice', icon: 'trailing', showAction: true, message: 'Snackbar text goes here' },
};

export const NoIcon: Story = {
  name: 'Icon / None',
  args: { position: 'floating', context: 'notice', icon: 'none', showAction: true, message: 'Snackbar text goes here' },
};

/* ── Without Action ──────────────────────────────────── */

export const FloatingNoAction: Story = {
  name: 'Floating / No Action',
  args: { position: 'floating', context: 'notice', icon: 'trailing', showAction: false, message: 'Snackbar text goes here' },
};

export const FixedNoAction: Story = {
  name: 'Fixed / No Action',
  args: { position: 'fixed', context: 'negative', icon: 'leading', showAction: false, message: 'Snackbar text goes here' },
};

export const NoIconNoAction: Story = {
  name: 'No Icon / No Action',
  args: { position: 'floating', context: 'neutral', icon: 'none', showAction: false, message: 'Snackbar text goes here' },
};

/* ── Custom Icons ────────────────────────────────────── */

export const WithInfoIcon: Story = {
  name: 'Custom / Info Icon',
  args: { position: 'floating', context: 'brand', icon: 'leading', iconContent: 'info_circle_filled', showAction: true, actionLabel: 'Learn More', message: 'A new version is available' },
};

export const WithWarningIcon: Story = {
  name: 'Custom / Warning Icon',
  args: { position: 'floating', context: 'notice', icon: 'leading', iconContent: 'exclamation_circle_filled', showAction: true, actionLabel: 'Retry', message: 'Connection is unstable' },
};

export const WithCheckIcon: Story = {
  name: 'Custom / Check Icon',
  args: { position: 'floating', context: 'positive', icon: 'leading', iconContent: 'checkmark_circle_filled', showAction: false, message: 'Changes saved successfully' },
};

/* ── Context × Icon × Action Matrix (Floating) ──────── */

export const FloatingMatrix: Story = {
  name: 'Matrix / Floating',
  render: () => {
    const contexts = ['notice', 'negative', 'positive', 'neutral', 'brand'] as const;
    const icons = ['leading', 'trailing', 'none'] as const;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(3, 1fr)', gap: '8px 12px', alignItems: 'start' }}>
          <span />
          {icons.map((i) => (
            <span key={i} style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-neutral-medium)', textTransform: 'capitalize' }}>
              {i} / Action
            </span>
          ))}
          {contexts.map((ctx) => (
            <React.Fragment key={ctx}>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-neutral-medium)', textTransform: 'capitalize', paddingTop: 8 }}>
                {ctx}
              </span>
              {icons.map((ic) => (
                <Snackbar key={ic} position="floating" context={ctx} icon={ic} showAction message="Snackbar text goes here" />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  },
};

/* ── Context × Icon × No Action Matrix (Floating) ───── */

export const FloatingNoActionMatrix: Story = {
  name: 'Matrix / Floating No Action',
  render: () => {
    const contexts = ['notice', 'negative', 'positive', 'neutral', 'brand'] as const;
    const icons = ['leading', 'trailing', 'none'] as const;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(3, 1fr)', gap: '8px 12px', alignItems: 'start' }}>
          <span />
          {icons.map((i) => (
            <span key={i} style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-neutral-medium)', textTransform: 'capitalize' }}>
              {i} / No Action
            </span>
          ))}
          {contexts.map((ctx) => (
            <React.Fragment key={ctx}>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-neutral-medium)', textTransform: 'capitalize', paddingTop: 8 }}>
                {ctx}
              </span>
              {icons.map((ic) => (
                <Snackbar key={ic} position="floating" context={ctx} icon={ic} showAction={false} message="Snackbar text goes here" />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  },
};
