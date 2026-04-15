import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { OtpTextField } from './OtpTextField';

const meta = {
  title: 'Components/OtpTextField',
  component: OtpTextField,
  tags: ['autodocs'],
  argTypes: {
    length: {
      control: 'inline-radio',
      options: [4, 6],
      description: 'Number of OTP digits (OTP Length)',
      table: { category: 'Appearance', defaultValue: { summary: '6' } },
    },
    otpFieldTitle: {
      control: 'boolean',
      description: 'Show the title row',
      table: { category: 'Content', defaultValue: { summary: 'true' } },
    },
    titleText: {
      control: 'text',
      description: 'Title text override',
      table: { category: 'Content', defaultValue: { summary: 'One Time Password (OTP)' } },
    },
    value: {
      control: 'text',
      description: 'Controlled value (digits only)',
      table: { category: 'State' },
    },
    defaultValue: {
      control: 'text',
      description: 'Uncontrolled default digits',
      table: { category: 'State' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all inputs and actions',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    helper: {
      control: 'inline-radio',
      options: ['none', 'warning', 'error'],
      description: 'Helper type — also tints all cell borders',
      table: { category: 'Validation', defaultValue: { summary: 'none' } },
    },
    errorText: {
      control: 'text',
      description: 'Error message (shown when helper=error)',
      table: { category: 'Validation', defaultValue: { summary: 'Error Text' } },
    },
    warningText: {
      control: 'text',
      description: 'Warning message (shown when helper=warning)',
      table: { category: 'Validation', defaultValue: { summary: 'Warning Text' } },
    },
    resend: {
      control: 'boolean',
      description: 'Show active "Resend OTP" link (Yes) or countdown timer (No)',
      table: { category: 'Actions', defaultValue: { summary: 'true' } },
    },
    resendAction: {
      control: 'text',
      description: 'Resend link label',
      table: { category: 'Actions', defaultValue: { summary: 'Resend OTP' } },
    },
    resendTime: {
      control: 'text',
      description: 'Timer text when resend is off',
      table: { category: 'Actions', defaultValue: { summary: 'Resend OTP in 00:24' } },
    },
    altMethod: {
      control: 'boolean',
      description: 'Show "Try another verification method" row',
      table: { category: 'Actions', defaultValue: { summary: 'false' } },
    },
    alternateAction: {
      control: 'text',
      description: 'Alternate method link label',
      table: { category: 'Actions', defaultValue: { summary: 'Try another verification method' } },
    },
  },
} satisfies Meta<typeof OtpTextField>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ═══════════════════════════════════════════════════
   Playground
   ═══════════════════════════════════════════════════ */
export const Playground: Story = {
  args: {
    length: 6,
    otpFieldTitle: true,
    titleText: 'One Time Password (OTP)',
    helper: 'none',
    errorText: 'Error Text',
    warningText: 'Warning Text',
    resend: true,
    resendAction: 'Resend OTP',
    resendTime: 'Resend OTP in 00:24',
    altMethod: false,
    alternateAction: 'Try another verification method',
    disabled: false,
  },
};

/* ═══════════════════════════════════════════════════
   Helper=None variants
   ═══════════════════════════════════════════════════ */
export const SixDigitsResend: Story = {
  name: 'None / 6-digit / Resend',
  args: { length: 6, helper: 'none', resend: true, altMethod: false },
};

export const SixDigitsResendAlt: Story = {
  name: 'None / 6-digit / Resend + Alt',
  args: { length: 6, helper: 'none', resend: true, altMethod: true },
};

export const SixDigitsTimer: Story = {
  name: 'None / 6-digit / Timer',
  args: { length: 6, helper: 'none', resend: false, altMethod: false },
};

export const SixDigitsTimerAlt: Story = {
  name: 'None / 6-digit / Timer + Alt',
  args: { length: 6, helper: 'none', resend: false, altMethod: true },
};

export const FourDigitsResend: Story = {
  name: 'None / 4-digit / Resend',
  args: { length: 4, helper: 'none', resend: true, altMethod: false },
};

export const FourDigitsResendAlt: Story = {
  name: 'None / 4-digit / Resend + Alt',
  args: { length: 4, helper: 'none', resend: true, altMethod: true },
};

export const FourDigitsTimer: Story = {
  name: 'None / 4-digit / Timer',
  args: { length: 4, helper: 'none', resend: false, altMethod: false },
};

export const FourDigitsTimerAlt: Story = {
  name: 'None / 4-digit / Timer + Alt',
  args: { length: 4, helper: 'none', resend: false, altMethod: true },
};

/* ═══════════════════════════════════════════════════
   Helper=Error variants
   ═══════════════════════════════════════════════════ */
export const Error6Resend: Story = {
  name: 'Error / 6-digit / Resend',
  args: { length: 6, helper: 'error', resend: true, altMethod: false },
};

export const Error6ResendAlt: Story = {
  name: 'Error / 6-digit / Resend + Alt',
  args: { length: 6, helper: 'error', resend: true, altMethod: true },
};

export const Error6Timer: Story = {
  name: 'Error / 6-digit / Timer',
  args: { length: 6, helper: 'error', resend: false, altMethod: false },
};

export const Error6TimerAlt: Story = {
  name: 'Error / 6-digit / Timer + Alt',
  args: { length: 6, helper: 'error', resend: false, altMethod: true },
};

export const Error4Resend: Story = {
  name: 'Error / 4-digit / Resend',
  args: { length: 4, helper: 'error', resend: true, altMethod: false },
};

export const Error4ResendAlt: Story = {
  name: 'Error / 4-digit / Resend + Alt',
  args: { length: 4, helper: 'error', resend: true, altMethod: true },
};

export const Error4Timer: Story = {
  name: 'Error / 4-digit / Timer',
  args: { length: 4, helper: 'error', resend: false, altMethod: false },
};

export const Error4TimerAlt: Story = {
  name: 'Error / 4-digit / Timer + Alt',
  args: { length: 4, helper: 'error', resend: false, altMethod: true },
};

/* ═══════════════════════════════════════════════════
   Helper=Warning variants
   ═══════════════════════════════════════════════════ */
export const Warning6Resend: Story = {
  name: 'Warning / 6-digit / Resend',
  args: { length: 6, helper: 'warning', resend: true, altMethod: false },
};

export const Warning6ResendAlt: Story = {
  name: 'Warning / 6-digit / Resend + Alt',
  args: { length: 6, helper: 'warning', resend: true, altMethod: true },
};

export const Warning6Timer: Story = {
  name: 'Warning / 6-digit / Timer',
  args: { length: 6, helper: 'warning', resend: false, altMethod: false },
};

export const Warning6TimerAlt: Story = {
  name: 'Warning / 6-digit / Timer + Alt',
  args: { length: 6, helper: 'warning', resend: false, altMethod: true },
};

export const Warning4Resend: Story = {
  name: 'Warning / 4-digit / Resend',
  args: { length: 4, helper: 'warning', resend: true, altMethod: false },
};

export const Warning4ResendAlt: Story = {
  name: 'Warning / 4-digit / Resend + Alt',
  args: { length: 4, helper: 'warning', resend: true, altMethod: true },
};

export const Warning4Timer: Story = {
  name: 'Warning / 4-digit / Timer',
  args: { length: 4, helper: 'warning', resend: false, altMethod: false },
};

export const Warning4TimerAlt: Story = {
  name: 'Warning / 4-digit / Timer + Alt',
  args: { length: 4, helper: 'warning', resend: false, altMethod: true },
};

/* ═══════════════════════════════════════════════════
   Special states
   ═══════════════════════════════════════════════════ */
export const Disabled: Story = {
  name: 'State / Disabled',
  args: {
    length: 6,
    defaultValue: '123456',
    disabled: true,
    helper: 'none',
    resend: true,
  },
};

export const NoTitle: Story = {
  name: 'State / No Title',
  args: {
    length: 6,
    otpFieldTitle: false,
    helper: 'none',
    resend: true,
  },
};

/* ═══════════════════════════════════════════════════
   Interactive demo (Controlled)
   ═══════════════════════════════════════════════════ */
const InteractiveDemo = () => {
  const [value, setValue] = useState('');
  const [completed, setCompleted] = useState(false);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <OtpTextField
        length={6}
        value={value}
        onChange={(v) => {
          setValue(v);
          setCompleted(false);
        }}
        onComplete={() => setCompleted(true)}
        helper="none"
        resend
        resendAction="Resend OTP"
      />
      <p style={{ margin: 0, fontSize: 14, color: 'var(--text-neutral-medium)' }}>
        Value: <strong>{value || '(empty)'}</strong> ({value.length}/6)
        {completed && (
          <span style={{ color: 'var(--text-positive-strong)', marginLeft: 8 }}>Complete!</span>
        )}
      </p>
    </div>
  );
};

export const Interactive: Story = {
  name: 'Interactive / Controlled',
  args: {},
  render: () => <InteractiveDemo />,
};

/* ═══════════════════════════════════════════════════
   Full matrix
   ═══════════════════════════════════════════════════ */
export const AllVariants: Story = {
  name: 'Matrix / All Variants',
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      {/* 6-digit */}
      <div>
        <p style={{ margin: '0 0 16px', fontWeight: 600, fontSize: 16 }}>
          6-digit
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <OtpTextField length={6} helper="none" resend altMethod={false} />
          <OtpTextField length={6} helper="none" resend altMethod />
          <OtpTextField length={6} helper="none" resend={false} altMethod={false} />
          <OtpTextField length={6} helper="none" resend={false} altMethod />
          <OtpTextField length={6} helper="error" resend altMethod={false} />
          <OtpTextField length={6} helper="error" resend altMethod />
          <OtpTextField length={6} helper="error" resend={false} altMethod={false} />
          <OtpTextField length={6} helper="error" resend={false} altMethod />
          <OtpTextField length={6} helper="warning" resend altMethod={false} />
          <OtpTextField length={6} helper="warning" resend altMethod />
          <OtpTextField length={6} helper="warning" resend={false} altMethod={false} />
          <OtpTextField length={6} helper="warning" resend={false} altMethod />
        </div>
      </div>
      {/* 4-digit */}
      <div>
        <p style={{ margin: '0 0 16px', fontWeight: 600, fontSize: 16 }}>
          4-digit
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <OtpTextField length={4} helper="none" resend altMethod={false} />
          <OtpTextField length={4} helper="none" resend altMethod />
          <OtpTextField length={4} helper="none" resend={false} altMethod={false} />
          <OtpTextField length={4} helper="none" resend={false} altMethod />
          <OtpTextField length={4} helper="error" resend altMethod={false} />
          <OtpTextField length={4} helper="error" resend altMethod />
          <OtpTextField length={4} helper="error" resend={false} altMethod={false} />
          <OtpTextField length={4} helper="error" resend={false} altMethod />
          <OtpTextField length={4} helper="warning" resend altMethod={false} />
          <OtpTextField length={4} helper="warning" resend altMethod />
          <OtpTextField length={4} helper="warning" resend={false} altMethod={false} />
          <OtpTextField length={4} helper="warning" resend={false} altMethod />
        </div>
      </div>
    </div>
  ),
};
