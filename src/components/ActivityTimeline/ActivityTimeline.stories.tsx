import type { Meta, StoryObj } from '@storybook/react';
import { ActivityTimeline } from './ActivityTimeline';
import type {
  ActivityTimelineDirection,
  TimelineStep,
  StepStatus,
} from './ActivityTimeline';

interface ActivityTimelineStoryArgs {
  direction: ActivityTimelineDirection;
  stepCount: number;
  step1Status: StepStatus;
  step1Title: string;
  step1Subtitle: string;
  step1ShowAction: boolean;
  step1ActionLabel: string;
  step1ShowBadge: boolean;
  step1BadgeLabel: string;
  step2Status: StepStatus;
  step2Title: string;
  step2Subtitle: string;
  step2ShowAction: boolean;
  step2ActionLabel: string;
  step2ShowBadge: boolean;
  step2BadgeLabel: string;
  step3Status: StepStatus;
  step3Title: string;
  step3Subtitle: string;
  step3ShowAction: boolean;
  step3ActionLabel: string;
  step3ShowBadge: boolean;
  step3BadgeLabel: string;
  step4Status: StepStatus;
  step4Title: string;
  step4Subtitle: string;
  step5Status: StepStatus;
  step5Title: string;
  step5Subtitle: string;
}

function buildSteps(args: ActivityTimelineStoryArgs): TimelineStep[] {
  const isVert = args.direction === 'vertical';
  const all: TimelineStep[] = [
    {
      status: args.step1Status,
      title: args.step1Title,
      subtitle: isVert ? args.step1Subtitle : undefined,
      showAction: isVert ? args.step1ShowAction : undefined,
      actionLabel: args.step1ActionLabel,
      showBadge: isVert ? args.step1ShowBadge : undefined,
      badgeLabel: args.step1BadgeLabel,
    },
    {
      status: args.step2Status,
      title: args.step2Title,
      subtitle: isVert ? args.step2Subtitle : undefined,
      showAction: isVert ? args.step2ShowAction : undefined,
      actionLabel: args.step2ActionLabel,
      showBadge: isVert ? args.step2ShowBadge : undefined,
      badgeLabel: args.step2BadgeLabel,
    },
    {
      status: args.step3Status,
      title: args.step3Title,
      subtitle: isVert ? args.step3Subtitle : undefined,
      showAction: isVert ? args.step3ShowAction : undefined,
      actionLabel: args.step3ActionLabel,
      showBadge: isVert ? args.step3ShowBadge : undefined,
      badgeLabel: args.step3BadgeLabel,
    },
    {
      status: args.step4Status,
      title: args.step4Title,
      subtitle: isVert ? args.step4Subtitle : undefined,
    },
    {
      status: args.step5Status,
      title: args.step5Title,
      subtitle: isVert ? args.step5Subtitle : undefined,
    },
  ];

  return all.slice(0, args.stepCount);
}

function stepArgTypes(
  n: number,
  defaults: { status: StepStatus; title: string; subtitle: string },
  withExtras: boolean,
) {
  const base: Record<string, object> = {
    [`step${n}Status`]: {
      control: 'inline-radio',
      options: ['completed', 'awaiting'] as StepStatus[],
      description: `Step ${n} status`,
      table: { defaultValue: { summary: defaults.status }, category: `Step ${n}` },
    },
    [`step${n}Title`]: {
      control: 'text',
      description: `Step ${n} title / label`,
      table: { defaultValue: { summary: defaults.title }, category: `Step ${n}` },
    },
    [`step${n}Subtitle`]: {
      control: 'text',
      description: `Step ${n} subtitle (vertical only)`,
      table: { defaultValue: { summary: defaults.subtitle }, category: `Step ${n}` },
      if: { arg: 'direction', eq: 'vertical' },
    },
  };

  if (withExtras) {
    Object.assign(base, {
      [`step${n}ShowAction`]: {
        control: 'boolean',
        description: `Step ${n} show action button`,
        table: { defaultValue: { summary: 'false' }, category: `Step ${n}` },
        if: { arg: 'direction', eq: 'vertical' },
      },
      [`step${n}ActionLabel`]: {
        control: 'text',
        description: `Step ${n} action label`,
        table: { defaultValue: { summary: 'Label' }, category: `Step ${n}` },
        if: { arg: `step${n}ShowAction` },
      },
      [`step${n}ShowBadge`]: {
        control: 'boolean',
        description: `Step ${n} show status badge`,
        table: { defaultValue: { summary: 'false' }, category: `Step ${n}` },
        if: { arg: 'direction', eq: 'vertical' },
      },
      [`step${n}BadgeLabel`]: {
        control: 'text',
        description: `Step ${n} badge label`,
        table: { defaultValue: { summary: 'Label' }, category: `Step ${n}` },
        if: { arg: `step${n}ShowBadge` },
      },
    });
  }

  return base;
}

const meta: Meta<ActivityTimelineStoryArgs> = {
  title: 'Components/Activity Timeline',
  component: ActivityTimeline,
  tags: ['autodocs'],
  decorators: [
    (_, context) => (
      <ActivityTimeline
        direction={(context.args as ActivityTimelineStoryArgs).direction}
        steps={buildSteps(context.args as ActivityTimelineStoryArgs)}
      />
    ),
  ],
  argTypes: {
    direction: {
      control: 'inline-radio',
      options: ['vertical', 'horizontal'] as ActivityTimelineDirection[],
      description: 'Timeline direction',
      table: { defaultValue: { summary: 'vertical' }, category: 'General' },
    },
    stepCount: {
      control: { type: 'range', min: 2, max: 5, step: 1 },
      description: 'Number of steps',
      table: { defaultValue: { summary: '5' }, category: 'General' },
    },
    ...stepArgTypes(1, { status: 'completed', title: 'Title', subtitle: 'Subtitle' }, true),
    ...stepArgTypes(2, { status: 'awaiting', title: 'Title', subtitle: 'Subtitle' }, true),
    ...stepArgTypes(3, { status: 'awaiting', title: 'Title', subtitle: 'Subtitle' }, true),
    ...stepArgTypes(4, { status: 'awaiting', title: 'Title', subtitle: 'Subtitle' }, false),
    ...stepArgTypes(5, { status: 'awaiting', title: 'Title', subtitle: 'Subtitle' }, false),
  },
  args: {
    direction: 'vertical',
    stepCount: 5,
    step1Status: 'completed',
    step1Title: 'Title',
    step1Subtitle: 'Subtitle',
    step1ShowAction: false,
    step1ActionLabel: 'Label',
    step1ShowBadge: false,
    step1BadgeLabel: 'Label',
    step2Status: 'awaiting',
    step2Title: 'Title',
    step2Subtitle: 'Subtitle',
    step2ShowAction: false,
    step2ActionLabel: 'Label',
    step2ShowBadge: false,
    step2BadgeLabel: 'Label',
    step3Status: 'awaiting',
    step3Title: 'Title',
    step3Subtitle: 'Subtitle',
    step3ShowAction: false,
    step3ActionLabel: 'Label',
    step3ShowBadge: false,
    step3BadgeLabel: 'Label',
    step4Status: 'awaiting',
    step4Title: 'Title',
    step4Subtitle: 'Subtitle',
    step5Status: 'awaiting',
    step5Title: 'Title',
    step5Subtitle: 'Subtitle',
  },
};

export default meta;
type Story = StoryObj<ActivityTimelineStoryArgs>;

export const Playground: Story = {};

export const Vertical: Story = {
  args: { direction: 'vertical', stepCount: 5 },
};

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
    stepCount: 4,
    step1Status: 'completed',
    step1Title: 'Success',
    step2Status: 'awaiting',
    step2Title: 'Awaited',
    step3Status: 'awaiting',
    step3Title: 'Awaited',
    step4Status: 'awaiting',
    step4Title: 'Awaited',
  },
};

export const PartialProgress: Story = {
  args: {
    direction: 'vertical',
    stepCount: 5,
    step1Status: 'completed',
    step1Title: 'Order Placed',
    step1Subtitle: 'Mon, 24 Mar 2025',
    step2Status: 'completed',
    step2Title: 'Payment Confirmed',
    step2Subtitle: 'Mon, 24 Mar 2025',
    step3Status: 'awaiting',
    step3Title: 'Processing',
    step3Subtitle: 'Expected by Wed, 26 Mar',
    step3ShowAction: true,
    step3ActionLabel: 'Track',
    step4Status: 'awaiting',
    step4Title: 'Shipped',
    step4Subtitle: 'Pending',
    step5Status: 'awaiting',
    step5Title: 'Delivered',
    step5Subtitle: 'Pending',
  },
};

export const WithActionAndBadge: Story = {
  args: {
    direction: 'vertical',
    stepCount: 3,
    step1Status: 'completed',
    step1Title: 'Fund Transfer Initiated',
    step1Subtitle: '24 Mar, 10:30 AM',
    step1ShowBadge: true,
    step1BadgeLabel: 'Done',
    step2Status: 'awaiting',
    step2Title: 'Verification Pending',
    step2Subtitle: 'Awaiting approval',
    step2ShowAction: true,
    step2ActionLabel: 'Verify',
    step3Status: 'awaiting',
    step3Title: 'Credited to Account',
    step3Subtitle: 'Pending',
  },
};
