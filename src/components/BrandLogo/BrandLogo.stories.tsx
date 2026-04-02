import type { Meta, StoryObj } from '@storybook/react';
import { BrandLogo } from './BrandLogo';
import type { BrandLogoTheme } from './BrandLogo';

const meta: Meta<typeof BrandLogo> = {
  title: 'Components/BrandLogo',
  component: BrandLogo,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    theme: {
      control: 'inline-radio',
      options: ['light', 'dark'] as BrandLogoTheme[],
      description: 'Light (for light backgrounds) or Dark (for dark backgrounds)',
      table: { defaultValue: { summary: 'light' } },
    },
    size: {
      control: { type: 'number', min: 16, max: 120, step: 2 },
      description: 'Logo size in pixels',
      table: { defaultValue: { summary: '34' } },
    },
    alt: {
      control: 'text',
      description: 'Accessible alt text',
      table: { defaultValue: { summary: 'PML Logo' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BrandLogo>;

/* ─── Playground ─────────────────────────────────── */
export const Playground: Story = {
  args: {
    theme: 'light',
    size: 34,
  },
};

/* ═══════════════════════════════════════════════════
   THEME VARIANTS
   ═══════════════════════════════════════════════════ */
export const Light: Story = {
  name: 'Light',
  args: { theme: 'light', size: 34 },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-level-4)', padding: 24, borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
};

export const Dark: Story = {
  name: 'Dark',
  args: { theme: 'dark', size: 34 },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-level-3)', padding: 24, borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
};

/* ═══════════════════════════════════════════════════
   SIZE VARIANTS
   ═══════════════════════════════════════════════════ */
const SizesRender = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: 'var(--font-family)' }}>
    {[24, 34, 48, 64].map((s) => (
      <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <BrandLogo theme="light" size={s} />
        <span style={{ fontSize: 11, color: 'var(--text-neutral-medium)' }}>{s}px</span>
      </div>
    ))}
  </div>
);

export const Sizes: Story = {
  name: 'Sizes',
  render: () => <SizesRender />,
};

/* ═══════════════════════════════════════════════════
   ALL VARIANTS
   ═══════════════════════════════════════════════════ */
const AllVariantsRender = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: 'var(--font-family)' }}>
    <div>
      <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-medium)' }}>Light</p>
      <div style={{ background: 'var(--surface-level-4)', padding: 16, borderRadius: 12, display: 'inline-flex', gap: 16, alignItems: 'center' }}>
        <BrandLogo theme="light" size={24} />
        <BrandLogo theme="light" size={34} />
        <BrandLogo theme="light" size={48} />
        <BrandLogo theme="light" size={64} />
      </div>
    </div>
    <div>
      <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, color: 'var(--text-neutral-medium)' }}>Dark</p>
      <div style={{ background: 'var(--surface-level-3)', padding: 16, borderRadius: 12, display: 'inline-flex', gap: 16, alignItems: 'center' }}>
        <BrandLogo theme="dark" size={24} />
        <BrandLogo theme="dark" size={34} />
        <BrandLogo theme="dark" size={48} />
        <BrandLogo theme="dark" size={64} />
      </div>
    </div>
  </div>
);

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => <AllVariantsRender />,
};
