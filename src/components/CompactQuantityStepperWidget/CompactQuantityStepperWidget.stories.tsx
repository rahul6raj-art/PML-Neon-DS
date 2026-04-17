import { useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  CompactQuantityStepperWidget,
  type CompactQuantityStepperWidgetProps,
} from './CompactQuantityStepperWidget';
import { PLATFORM_SCOPE_CLASS, PlatformThemeProvider } from '../../theme';

function StatefulStepper(
  props: Omit<CompactQuantityStepperWidgetProps, 'value' | 'onChange'> & {
    initialValue?: number | string;
  },
) {
  const { initialValue = 10, ...rest } = props;
  const [value, setValue] = useState<number | string>(initialValue);

  const onChange = useCallback((v: number | string) => {
    setValue(v);
  }, []);

  return (
    <CompactQuantityStepperWidget
      {...rest}
      value={value}
      onChange={onChange}
    />
  );
}

const meta = {
  title: 'Widgets/Compact quantity stepper',
  component: CompactQuantityStepperWidget,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '**Mobile / tablet:** single row, quantity in **title-2** semibold. **Web:** quantity and **±** glyphs use **12px** type; caption below shows **`Prefix:value`** (default **`Qty:10`**, updates with **`value`**) — pass **`valueCaption=""`** on web to hide.',
      },
    },
  },
  argTypes: {
    valueCaption: {
      control: 'text',
      description:
        'Web only: caption prefix → **Prefix:value** (default **Qty**; empty string hides)',
      table: { category: 'Web' },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: 376,
          background: 'var(--surface-level-4)',
          padding: 'var(--spacing-16)',
          boxSizing: 'border-box',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CompactQuantityStepperWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    value: 10,
    min: 1,
    max: 99,
    step: 1,
    onChange: () => {},
  },
  render: () => (
    <StatefulStepper
      initialValue={10}
      min={1}
      max={99}
      step={1}
      decrementLabel="Decrease quantity"
      incrementLabel="Increase quantity"
    />
  ),
} satisfies Story;

export const Disabled = {
  args: {
    value: 5,
    min: 1,
    max: 10,
    step: 1,
    disabled: true,
    onChange: () => {},
  },
  render: () => (
    <StatefulStepper
      initialValue={5}
      min={1}
      max={10}
      step={1}
      disabled
    />
  ),
} satisfies Story;

export const MinReached = {
  args: {
    value: 5,
    min: 5,
    max: 100,
    step: 1,
    onChange: () => {},
  },
  render: () => (
    <StatefulStepper
      initialValue={5}
      min={5}
      max={100}
      step={1}
    />
  ),
} satisfies Story;

export const MaxReached = {
  args: {
    value: 100,
    min: 1,
    max: 100,
    step: 1,
    onChange: () => {},
  },
  render: () => (
    <StatefulStepper
      initialValue={100}
      min={1}
      max={100}
      step={1}
    />
  ),
} satisfies Story;

/** Web density: 12px quantity + dynamic `Qty:{value}` under (toolbar **Platform → Web** also works). */
export const WebWithCaption = {
  name: 'Web / Caption under value',
  decorators: [
    (Story) => (
      <PlatformThemeProvider platform="web">
        <div
          className={PLATFORM_SCOPE_CLASS}
          data-pml-platform="web"
          style={{
            width: 376,
            background: 'var(--surface-level-4)',
            padding: 'var(--spacing-16)',
            boxSizing: 'border-box',
          }}
        >
          <Story />
        </div>
      </PlatformThemeProvider>
    ),
  ],
  render: () => (
    <StatefulStepper
      initialValue={10}
      min={1}
      max={18_000}
      step={1}
      decrementLabel="Decrease quantity"
      incrementLabel="Increase quantity"
    />
  ),
} satisfies Story;
