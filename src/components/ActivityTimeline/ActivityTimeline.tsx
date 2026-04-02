import { Icon } from '../Icon';
import './ActivityTimeline.css';

export type ActivityTimelineDirection = 'vertical' | 'horizontal';
export type StepStatus = 'completed' | 'awaiting';

export interface TimelineStep {
  /** Step status */
  status: StepStatus;
  /** Title text (vertical) or label (horizontal) */
  title: string;
  /** Subtitle text (vertical only) */
  subtitle?: string;
  /** Show a green action button on the right */
  showAction?: boolean;
  /** Action button label */
  actionLabel?: string;
  /** Action button click handler */
  onActionClick?: () => void;
  /** Show a status badge on the right */
  showBadge?: boolean;
  /** Badge label */
  badgeLabel?: string;
}

export interface ActivityTimelineProps {
  /** Timeline direction */
  direction?: ActivityTimelineDirection;
  /** Timeline steps */
  steps?: TimelineStep[];
  /** Additional CSS class */
  className?: string;
}

const DEFAULT_VERTICAL_STEPS: TimelineStep[] = [
  { status: 'completed', title: 'Title', subtitle: 'Subtitle' },
  { status: 'awaiting', title: 'Title', subtitle: 'Subtitle' },
  { status: 'awaiting', title: 'Title', subtitle: 'Subtitle' },
  { status: 'awaiting', title: 'Title', subtitle: 'Subtitle' },
  { status: 'awaiting', title: 'Title', subtitle: 'Subtitle' },
];

const DEFAULT_HORIZONTAL_STEPS: TimelineStep[] = [
  { status: 'completed', title: 'Success' },
  { status: 'awaiting', title: 'Awaited' },
  { status: 'awaiting', title: 'Awaited' },
  { status: 'awaiting', title: 'Awaited' },
];

function StatusIcon({ status }: { status: StepStatus }) {
  return (
    <span className={`at__status-icon at__status-icon--${status}`}>
      {status === 'completed' ? (
        <Icon name="checkmark_circle_filled" size={24} />
      ) : (
        <Icon name="radio_off_outline" size={24} />
      )}
    </span>
  );
}

function VerticalTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <div className="at__vertical">
      {steps.map((step, i) => {
        const isFirst = i === 0;
        const isLast = i === steps.length - 1;

        return (
          <div key={i} className="at__v-item">
            {/* Connector line above (hidden for first) */}
            <div className="at__v-track">
              <span className={`at__v-line ${isFirst ? 'at__v-line--hidden' : ''}`} />
              <StatusIcon status={step.status} />
              <span className={`at__v-line ${isLast ? 'at__v-line--hidden' : ''}`} />
            </div>

            {/* Content */}
            <div className="at__v-content">
              <div className="at__v-text">
                <span className="at__v-title">{step.title}</span>
                {step.subtitle && (
                  <span className="at__v-subtitle">{step.subtitle}</span>
                )}
              </div>

              {step.showAction && (
                <button
                  className="at__v-action"
                  type="button"
                  onClick={step.onActionClick}
                >
                  {step.actionLabel || 'Label'}
                </button>
              )}

              {step.showBadge && (
                <span className="at__v-badge">{step.badgeLabel || 'Label'}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function HorizontalTimeline({ steps }: { steps: TimelineStep[] }) {
  const completedCount = steps.filter((s) => s.status === 'completed').length;
  const progressPercent = steps.length > 1
    ? ((completedCount - 0.5) / (steps.length - 1)) * 100
    : completedCount > 0 ? 100 : 0;

  return (
    <div className="at__horizontal">
      {/* Progress bar */}
      <div className="at__h-bar-wrap">
        <div className="at__h-bar-track">
          <div
            className="at__h-bar-fill"
            style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
          />
        </div>
      </div>

      {/* Status circles + labels */}
      <div className="at__h-steps">
        {steps.map((step, i) => (
          <div key={i} className="at__h-step">
            <StatusIcon status={step.status} />
            <span
              className={`at__h-label ${
                step.status === 'completed' ? 'at__h-label--completed' : ''
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export const ActivityTimeline = ({
  direction = 'vertical',
  steps,
  className,
}: ActivityTimelineProps) => {
  const resolvedSteps =
    steps ?? (direction === 'vertical' ? DEFAULT_VERTICAL_STEPS : DEFAULT_HORIZONTAL_STEPS);

  const wrapperCls = ['at', `at--${direction}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperCls}>
      {direction === 'vertical' ? (
        <VerticalTimeline steps={resolvedSteps} />
      ) : (
        <HorizontalTimeline steps={resolvedSteps} />
      )}
    </div>
  );
};
