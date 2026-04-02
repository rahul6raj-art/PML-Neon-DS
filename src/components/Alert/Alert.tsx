import { type ReactNode } from 'react';
import { Icon } from '../Icon';
import { Button, type ButtonType, type ButtonSize, type ButtonIconPosition } from '../Button';
import './Alert.css';

export type AlertType = 'sleek' | 'detailed';
export type AlertState = 'primary' | 'negative' | 'warning' | 'positive';

export interface AlertProps {
  /** Alert layout — sleek (compact bar) or detailed (card with title) */
  type?: AlertType;
  /** Colour state */
  state?: AlertState;
  /** Show the leading icon */
  showIcon?: boolean;
  /** Icon name from icons folder, or a ReactNode */
  iconContent?: string | ReactNode;
  /** Title text (detailed type) */
  title?: string;
  /** Show the title row (detailed type) */
  showTitle?: boolean;
  /** Description / message text */
  description?: string;
  /** Show the description */
  showDescription?: boolean;
  /** Show the CTA action button */
  showCta?: boolean;
  /** CTA button label */
  ctaLabel?: string;
  /** CTA button variant (Button component) */
  ctaVariant?: ButtonType;
  /** CTA button size (Button component) */
  ctaSize?: ButtonSize;
  /** CTA button icon placement (Button component) */
  ctaIcon?: ButtonIconPosition;
  /** CTA button icon name or ReactNode (Button component) */
  ctaIconContent?: string | ReactNode;
  /** CTA button loading state (Button component) */
  ctaLoading?: boolean;
  /** CTA button disabled state (Button component) */
  ctaDisabled?: boolean;
  /** CTA click handler */
  onCtaClick?: () => void;
  /** Show the close button */
  showClose?: boolean;
  /** Close click handler */
  onClose?: () => void;
  /** Additional class name */
  className?: string;
}

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4.5 4.5L11.5 11.5M11.5 4.5L4.5 11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

function renderAlertIcon(
  iconContent: string | ReactNode | undefined,
  size: number,
) {
  if (!iconContent)
    return <Icon name="exclamation_circle_outline" size={size} />;
  if (typeof iconContent === 'string')
    return <Icon name={iconContent} size={size} />;
  return iconContent;
}

export const Alert = ({
  type = 'sleek',
  state = 'primary',
  showIcon = true,
  iconContent,
  title = 'Title',
  showTitle = true,
  description = 'Multiline alert text goes here',
  showDescription = true,
  showCta = true,
  ctaLabel = 'Label',
  ctaVariant = 'filled',
  ctaSize = 'extra-small',
  ctaIcon = 'none',
  ctaIconContent,
  ctaLoading = false,
  ctaDisabled = false,
  onCtaClick,
  showClose = true,
  onClose,
  className,
}: AlertProps) => {
  const rootClasses = [
    'alert',
    `alert--${type}`,
    `alert--${state}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (type === 'detailed') {
    return (
      <div className={rootClasses}>
        <div className="alert__top">
          <div className="alert__body">
            {showTitle && (
              <div className="alert__title-row">
                <div className="alert__title-content">
                  {showIcon && (
                    <span className="alert__icon alert__icon--detailed">
                      {renderAlertIcon(iconContent, 20)}
                    </span>
                  )}
                  <span className="alert__title">{title}</span>
                </div>
              </div>
            )}
            {showDescription && (
              <p className="alert__description">{description}</p>
            )}
          </div>
          {showClose && (
            <Button
              className="alert__close"
              variant="link"
              size="extra-small"
              icon="only"
              iconContent={<CloseIcon />}
              onClick={onClose}
              aria-label="Close"
            />
          )}
        </div>
        {showCta && (
          <Button
            className="alert__cta"
            variant={ctaVariant}
            size={ctaSize}
            icon={ctaIcon}
            iconContent={ctaIconContent}
            label={ctaLabel}
            loading={ctaLoading}
            disabled={ctaDisabled}
            onClick={onCtaClick}
          />
        )}
      </div>
    );
  }

  return (
    <div className={rootClasses}>
      <div className="alert__content">
        {showIcon && (
          <span className="alert__icon alert__icon--sleek">
            {renderAlertIcon(iconContent, 16)}
          </span>
        )}
        <p className="alert__text">{description}</p>
      </div>
      <div className="alert__controls">
        {showCta && (
          <Button
            className="alert__cta"
            variant={ctaVariant}
            size={ctaSize}
            icon={ctaIcon}
            iconContent={ctaIconContent}
            label={ctaLabel}
            loading={ctaLoading}
            disabled={ctaDisabled}
            onClick={onCtaClick}
          />
        )}
        {showClose && (
          <Button
            className="alert__close alert__close--sleek"
            variant="link"
            size="extra-small"
            icon="only"
            iconContent={<CloseIcon />}
            onClick={onClose}
            aria-label="Close"
          />
        )}
      </div>
    </div>
  );
};
