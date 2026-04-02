import { type ReactNode } from 'react';
import { Icon } from '../Icon';
import './Badge.css';

export type BadgeType = 'text' | 'count' | 'dot';

export type BadgeContext =
  | 'default'
  | 'default-alt'
  | 'primary'
  | 'positive'
  | 'notice'
  | 'negative'
  | 'highlight'
  | 'live';

export interface BadgeProps {
  /** Badge display type */
  type?: BadgeType;
  /** Semantic context / color scheme */
  context?: BadgeContext;
  /** Use the muted (lighter) color variant */
  muted?: boolean;
  /** Text label — used when type is "text" */
  label?: string;
  /** Count value — used when type is "count" */
  count?: number | string;
  /** Show a leading icon (type="text" only) */
  showLeadingIcon?: boolean;
  /** Show a trailing icon (type="text" only) */
  showTrailingIcon?: boolean;
  /** Leading icon name from icons folder, or a ReactNode */
  leadingIcon?: string | ReactNode;
  /** Trailing icon name from icons folder, or a ReactNode */
  trailingIcon?: string | ReactNode;
}

const DEFAULT_ICON = 'star_filled';

function renderIcon(icon: string | ReactNode | undefined, fallback: string) {
  if (!icon) return <Icon name={fallback} size={12} />;
  if (typeof icon === 'string') return <Icon name={icon} size={12} />;
  return icon;
}

export const Badge = ({
  type = 'text',
  context = 'default',
  muted = false,
  label = 'Label',
  count = 3,
  showLeadingIcon = false,
  showTrailingIcon = false,
  leadingIcon,
  trailingIcon,
}: BadgeProps) => {
  const classes = [
    'badge',
    `badge--${type}`,
    `badge--${context}`,
    muted && 'badge--muted',
  ]
    .filter(Boolean)
    .join(' ');

  if (type === 'dot') {
    if (context === 'live') {
      return (
        <span className={classes}>
          <span className="badge__blink" />
        </span>
      );
    }
    return <span className={classes} />;
  }

  if (type === 'count') {
    return (
      <span className={classes}>
        {count}
      </span>
    );
  }

  const shouldRenderLeading = showLeadingIcon || leadingIcon;
  const shouldRenderTrailing = showTrailingIcon || trailingIcon;

  return (
    <span className={classes}>
      {context === 'live' && <span className="badge__blink" />}
      {shouldRenderLeading && (
        <span className="badge__icon">
          {renderIcon(leadingIcon, DEFAULT_ICON)}
        </span>
      )}
      {label}
      {shouldRenderTrailing && (
        <span className="badge__icon">
          {renderIcon(trailingIcon, DEFAULT_ICON)}
        </span>
      )}
    </span>
  );
};
