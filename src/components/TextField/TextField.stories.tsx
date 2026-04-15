import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './TextField';
import { iconNames } from '../Icon';

const iconOptions = ['(none)', ...iconNames];
const iconMapping = Object.fromEntries([
  ['(none)', undefined],
  ...iconNames.map((n) => [n, n]),
]);

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    emphasis: {
      control: 'inline-radio',
      options: ['high', 'low'],
      description: 'Emphasis level — high uses 16px text, low uses 14px text',
      table: { category: 'Appearance', defaultValue: { summary: 'high' } },
    },
    label: {
      control: 'text',
      description: 'Floating label text',
      table: { category: 'Content', defaultValue: { summary: 'Label' } },
    },
    value: {
      control: 'text',
      description: 'Controlled input value',
      table: { category: 'State', defaultValue: { summary: 'undefined' } },
    },
    defaultValue: {
      control: 'text',
      description: 'Default value (uncontrolled)',
      table: { category: 'State', defaultValue: { summary: '' } },
    },
    assistiveText: {
      control: 'text',
      description: 'Assistive helper text below the field',
      table: { category: 'Content' },
    },
    errorText: {
      control: 'text',
      description: 'Error message — replaces assistive text with red text',
      table: { category: 'Content' },
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
    disabled: {
      control: 'boolean',
      description: 'Disable the field',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    placeholder: {
      control: 'text',
      description: 'Native placeholder (hidden by floating label pattern)',
      table: { category: 'Content' },
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
      description: 'HTML input type',
      table: { category: 'Behaviour', defaultValue: { summary: 'text' } },
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Playground ────────────────────────────────────── */
export const Playground: Story = {
  args: {
    emphasis: 'high',
    label: 'Label',
    assistiveText: '',
    errorText: '',
    showLeadingIcon: false,
    showTrailingIcon: false,
    disabled: false,
  },
};

/* ═══════════════════════════════════════════════════
   Emphasis Variants
   ═══════════════════════════════════════════════════ */
export const HighEmphasis: Story = {
  name: 'Emphasis / High',
  args: {
    emphasis: 'high',
    label: 'Label',
  },
};

export const LowEmphasis: Story = {
  name: 'Emphasis / Low',
  args: {
    emphasis: 'low',
    label: 'Label',
  },
};

/* ═══════════════════════════════════════════════════
   State Simulations
   ═══════════════════════════════════════════════════ */
export const Normal: Story = {
  name: 'State / Normal',
  args: {
    emphasis: 'high',
    label: 'Label',
  },
};

export const Filled: Story = {
  name: 'State / Filled',
  args: {
    emphasis: 'high',
    label: 'Label',
    defaultValue: 'Input Text',
  },
};

export const FilledLow: Story = {
  name: 'State / Filled (Low)',
  args: {
    emphasis: 'low',
    label: 'Label',
    defaultValue: 'Input Text',
  },
};

/* ═══════════════════════════════════════════════════
   With Assistive Text
   ═══════════════════════════════════════════════════ */
export const WithAssistiveText: Story = {
  name: 'Helper / Assistive Text',
  args: {
    emphasis: 'high',
    label: 'Label',
    assistiveText: 'Assistive text',
  },
};

export const WithAssistiveTextLow: Story = {
  name: 'Helper / Assistive Text (Low)',
  args: {
    emphasis: 'low',
    label: 'Label',
    assistiveText: 'Assistive text',
  },
};

/* ═══════════════════════════════════════════════════
   Error State
   ═══════════════════════════════════════════════════ */
export const WithError: Story = {
  name: 'Error / Normal',
  args: {
    emphasis: 'high',
    label: 'Label',
    errorText: 'Error text',
  },
};

export const WithErrorFilled: Story = {
  name: 'Error / Filled',
  args: {
    emphasis: 'high',
    label: 'Label',
    defaultValue: 'Input Text',
    errorText: 'Error text',
  },
};

export const WithErrorLow: Story = {
  name: 'Error / Low Emphasis',
  args: {
    emphasis: 'low',
    label: 'Label',
    errorText: 'Error text',
  },
};

/* ═══════════════════════════════════════════════════
   Disabled
   ═══════════════════════════════════════════════════ */
export const Disabled: Story = {
  name: 'State / Disabled',
  args: {
    emphasis: 'high',
    label: 'Label',
    disabled: true,
  },
};

export const DisabledFilled: Story = {
  name: 'State / Disabled Filled',
  args: {
    emphasis: 'high',
    label: 'Label',
    defaultValue: 'Input Text',
    disabled: true,
  },
};

export const DisabledWithAssistive: Story = {
  name: 'State / Disabled + Assistive',
  args: {
    emphasis: 'high',
    label: 'Label',
    assistiveText: 'Assistive text',
    disabled: true,
  },
};

export const DisabledLow: Story = {
  name: 'State / Disabled (Low)',
  args: {
    emphasis: 'low',
    label: 'Label',
    disabled: true,
  },
};

/* ═══════════════════════════════════════════════════
   With Icons
   ═══════════════════════════════════════════════════ */
export const WithLeadingIcon: Story = {
  name: 'Icon / Leading',
  args: {
    emphasis: 'high',
    label: 'Search',
    showLeadingIcon: true,
    leadingIcon: 'search_outline',
  },
};

export const WithTrailingIcon: Story = {
  name: 'Icon / Trailing',
  args: {
    emphasis: 'high',
    label: 'Label',
    showTrailingIcon: true,
    trailingIcon: 'x_circle_filled',
    defaultValue: 'Input Text',
  },
};

export const WithBothIcons: Story = {
  name: 'Icon / Both',
  args: {
    emphasis: 'high',
    label: 'Search',
    showLeadingIcon: true,
    leadingIcon: 'search_outline',
    showTrailingIcon: true,
    trailingIcon: 'x_circle_filled',
    defaultValue: 'Input Text',
  },
};

/* ═══════════════════════════════════════════════════
   Interactive Demo (Controlled)
   ═══════════════════════════════════════════════════ */
const ControlledDemo = () => {
  const [value, setValue] = useState('');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <TextField
        emphasis="high"
        label="Username"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        assistiveText="Enter your username"
      />
      <p style={{ margin: 0, fontSize: 14, color: 'var(--text-neutral-medium)' }}>
        Value: <strong>{value || '(empty)'}</strong>
      </p>
    </div>
  );
};

export const Controlled: Story = {
  name: 'Interactive / Controlled',
  render: () => <ControlledDemo />,
};

/* ═══════════════════════════════════════════════════
   Validation Demo
   ═══════════════════════════════════════════════════ */
const ValidationDemo = () => {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const showError = touched && !isValid && email.length > 0;

  return (
    <TextField
      emphasis="high"
      label="Email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onBlur={() => setTouched(true)}
      errorText={showError ? 'Please enter a valid email address' : undefined}
      assistiveText={!showError ? 'We\'ll never share your email' : undefined}
      showTrailingIcon={email.length > 0}
      trailingIcon="x_circle_filled"
    />
  );
};

export const WithValidation: Story = {
  name: 'Interactive / Validation',
  render: () => <ValidationDemo />,
};

/* ═══════════════════════════════════════════════════
   Password Demo
   ═══════════════════════════════════════════════════ */
export const PasswordField: Story = {
  name: 'Usage / Password',
  args: {
    emphasis: 'high',
    label: 'Password',
    type: 'password',
    showTrailingIcon: true,
    trailingIcon: 'eye_open_filled',
  },
};

/* ═══════════════════════════════════════════════════
   All Variants Matrix
   ═══════════════════════════════════════════════════ */
export const AllVariants: Story = {
  name: 'Matrix / All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Row 1: High Emphasis */}
      <div>
        <p style={{ margin: '0 0 12px', fontWeight: 600 }}>High Emphasis</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <TextField emphasis="high" label="Normal" />
          <TextField emphasis="high" label="Filled" defaultValue="Input Text" />
          <TextField emphasis="high" label="With Assistive" assistiveText="Assistive text" />
          <TextField emphasis="high" label="Error" errorText="Error text" />
          <TextField emphasis="high" label="Error Filled" defaultValue="Input Text" errorText="Error text" />
          <TextField emphasis="high" label="Disabled" disabled />
          <TextField emphasis="high" label="Disabled Filled" defaultValue="Input Text" disabled />
        </div>
      </div>

      {/* Row 2: Low Emphasis */}
      <div>
        <p style={{ margin: '0 0 12px', fontWeight: 600 }}>Low Emphasis</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <TextField emphasis="low" label="Normal" />
          <TextField emphasis="low" label="Filled" defaultValue="Input Text" />
          <TextField emphasis="low" label="With Assistive" assistiveText="Assistive text" />
          <TextField emphasis="low" label="Error" errorText="Error text" />
          <TextField emphasis="low" label="Error Filled" defaultValue="Input Text" errorText="Error text" />
          <TextField emphasis="low" label="Disabled" disabled />
          <TextField emphasis="low" label="Disabled Filled" defaultValue="Input Text" disabled />
        </div>
      </div>
    </div>
  ),
};

/* ═══════════════════════════════════════════════════
   Form Example
   ═══════════════════════════════════════════════════ */
export const FormExample: Story = {
  name: 'Usage / Form',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 344 }}>
      <TextField emphasis="high" label="First Name" />
      <TextField emphasis="high" label="Last Name" />
      <TextField emphasis="high" label="Email" type="email" assistiveText="We'll never share your email" />
      <TextField emphasis="high" label="Password" type="password" showTrailingIcon trailingIcon="eye_open_filled" />
      <TextField emphasis="high" label="Phone" type="tel" showLeadingIcon leadingIcon="phone_message_filled" />
    </div>
  ),
};
