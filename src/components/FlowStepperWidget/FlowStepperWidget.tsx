import {
  ActivityTimeline,
  type StepStatus,
  type TimelineStep,
} from '../ActivityTimeline';
import './FlowStepperWidget.css';

export interface FlowStep {
  id: string;
  label: string;
  shortLabel?: string;
}

export type FlowStepperStatus = 'default' | 'loading' | 'disabled';

export interface FlowStepperWidgetProps {
  steps: FlowStep[];
  currentStepId: string;
  completedStepIds: string[];
  status?: FlowStepperStatus;
  orientation?: 'horizontal' | 'vertical';
  onStepPress?: (stepId: string) => void;
  className?: string;
  /** Maps to root `aria-label` for the progress region */
  ariaLabel?: string;
}

function toTimelineSteps(
  steps: FlowStep[],
  currentStepId: string,
  completedStepIds: string[],
): TimelineStep[] {
  const currentIndex = steps.findIndex((s) => s.id === currentStepId);
  const allMarkedComplete =
    steps.length > 0 && steps.every((s) => completedStepIds.includes(s.id));

  return steps.map((s, i) => {
    let st: StepStatus = 'awaiting';
    if (allMarkedComplete || (currentIndex >= 0 && i < currentIndex)) {
      st = 'completed';
    }
    return {
      title: s.shortLabel ?? s.label,
      status: st,
    };
  });
}

export function FlowStepperWidget({
  steps,
  currentStepId,
  completedStepIds,
  status = 'default',
  orientation = 'horizontal',
  className,
  ariaLabel = 'Payment progress',
}: FlowStepperWidgetProps) {
  const timelineSteps = toTimelineSteps(steps, currentStepId, completedStepIds);
  const rootClass = [
    'fsw',
    status === 'disabled' && 'fsw--disabled',
    status === 'loading' && 'fsw--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClass} aria-label={ariaLabel} role="navigation">
      <ActivityTimeline
        direction={orientation}
        steps={timelineSteps}
        className="fsw__timeline"
      />
    </div>
  );
}
