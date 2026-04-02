import type { Meta, StoryObj } from '@storybook/react';
import { Keyboard } from './Keyboard';

const meta: Meta<typeof Keyboard> = {
  title: 'Components/Keyboard',
  component: Keyboard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      description: 'Colour mode',
      table: { defaultValue: { summary: 'light' } },
    },
    type: {
      control: 'inline-radio',
      options: ['alphabetic', 'numeric', 'dictation', 'emoji'],
      description: 'Keyboard type',
      table: { defaultValue: { summary: 'alphabetic' } },
    },
  },
  args: {
    mode: 'light',
    type: 'alphabetic',
  },
};

export default meta;
type Story = StoryObj<typeof Keyboard>;

export const Default: Story = {};

export const LightAlphabetic: Story = {
  args: { mode: 'light', type: 'alphabetic' },
};

export const DarkAlphabetic: Story = {
  args: { mode: 'dark', type: 'alphabetic' },
};

export const LightNumeric: Story = {
  args: { mode: 'light', type: 'numeric' },
};

export const DarkNumeric: Story = {
  args: { mode: 'dark', type: 'numeric' },
};

export const LightDictation: Story = {
  args: { mode: 'light', type: 'dictation' },
};

export const DarkDictation: Story = {
  args: { mode: 'dark', type: 'dictation' },
};

export const LightEmoji: Story = {
  args: { mode: 'light', type: 'emoji' },
};

export const DarkEmoji: Story = {
  args: { mode: 'dark', type: 'emoji' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <Keyboard mode="light" type="alphabetic" />
      <Keyboard mode="dark" type="alphabetic" />
      <Keyboard mode="light" type="numeric" />
      <Keyboard mode="dark" type="numeric" />
      <Keyboard mode="light" type="dictation" />
      <Keyboard mode="dark" type="dictation" />
      <Keyboard mode="light" type="emoji" />
      <Keyboard mode="dark" type="emoji" />
    </div>
  ),
};
