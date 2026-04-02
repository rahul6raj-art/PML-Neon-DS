import { type ReactNode } from 'react';
import { Icon } from '../Icon';
import { Button, type ButtonType, type ButtonSize, type ButtonIconPosition } from '../Button';
import './Snackbar.css';

export type SnackbarPosition = 'fixed' | 'floating';
export type SnackbarContext = 'notice' | 'negative' | 'positive' | 'neutral' | 'brand';
export type SnackbarIcon = 'leading' | 'trailing' | 'none';

export interface SnackbarProps {
  /** Position style — fixed (with status bar) or floating (standalone bar) */
  position?: SnackbarPosition;
  /** Colour context */
  context?: SnackbarContext;
  /** Icon placement relative to text */
  icon?: SnackbarIcon;
  /** Icon name from icons folder, or a ReactNode */
  iconContent?: string | ReactNode;
  /** Whether to show the action button */
  showAction?: boolean;
  /** Action button label */
  actionLabel?: string;
  /** Action button variant (Button component) */
  actionVariant?: ButtonType;
  /** Action button size (Button component) */
  actionSize?: ButtonSize;
  /** Action button icon placement (Button component) */
  actionIcon?: ButtonIconPosition;
  /** Action button icon name or ReactNode (Button component) */
  actionIconContent?: string | ReactNode;
  /** Action button loading state (Button component) */
  actionLoading?: boolean;
  /** Action button disabled state (Button component) */
  actionDisabled?: boolean;
  /** Action button click handler */
  onAction?: () => void;
  /** Message text */
  message?: string;
  /** Additional class name */
  className?: string;
}

function renderIconSlot(iconContent: string | ReactNode | undefined) {
  if (!iconContent) return <Icon name="bell_filled" size={24} />;
  if (typeof iconContent === 'string') return <Icon name={iconContent} size={24} />;
  return iconContent;
}

export const Snackbar = ({
  position = 'floating',
  context = 'notice',
  icon = 'none',
  iconContent,
  showAction = false,
  actionLabel = 'Label',
  actionVariant = 'stroke',
  actionSize = 'extra-small',
  actionIcon = 'none',
  actionIconContent,
  actionLoading = false,
  actionDisabled = false,
  onAction,
  message = 'Multiline snackbar text goes here',
  className,
}: SnackbarProps) => {
  const rootClasses = [
    'snackbar',
    `snackbar--${position}`,
    `snackbar--${context}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const showIcon = icon !== 'none';

  return (
    <div className={rootClasses}>
      {position === 'fixed' && (
        <div className="snackbar__statusbar">
          <span className="snackbar__time">9:41</span>
          <span className="snackbar__signals">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none"><rect x="0" y="7" width="3" height="4" rx="0.5" fill="currentColor" /><rect x="4.5" y="4" width="3" height="7" rx="0.5" fill="currentColor" /><rect x="9" y="1" width="3" height="10" rx="0.5" fill="currentColor" /><rect x="13.5" y="0" width="3" height="11" rx="0.5" fill="currentColor" opacity="0.3" /></svg>
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M7.5 3.5C9.16 3.5 10.66 4.18 11.74 5.3L13.16 3.88C11.68 2.36 9.7 1.5 7.5 1.5C5.3 1.5 3.32 2.36 1.84 3.88L3.26 5.3C4.34 4.18 5.84 3.5 7.5 3.5ZM7.5 7.5C8.33 7.5 9.08 7.84 9.62 8.38L7.5 10.5L5.38 8.38C5.92 7.84 6.67 7.5 7.5 7.5Z" fill="currentColor" /></svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="2" stroke="currentColor" strokeOpacity="0.35" /><rect x="23" y="4" width="1.5" height="4" rx="0.5" fill="currentColor" fillOpacity="0.4" /><rect x="2" y="2" width="16" height="8" rx="1" fill="currentColor" /></svg>
          </span>
        </div>
      )}
      <div className="snackbar__container">
        <div className="snackbar__content">
          {showIcon && icon === 'leading' && (
            <span className="snackbar__icon">{renderIconSlot(iconContent)}</span>
          )}
          <span className="snackbar__text">{message}</span>
          {showIcon && icon === 'trailing' && (
            <span className="snackbar__icon">{renderIconSlot(iconContent)}</span>
          )}
        </div>
        {showAction && (
          <Button
            className="snackbar__action"
            variant={actionVariant}
            size={actionSize}
            icon={actionIcon}
            iconContent={actionIconContent}
            label={actionLabel}
            loading={actionLoading}
            disabled={actionDisabled}
            onClick={onAction}
          />
        )}
      </div>
    </div>
  );
};
