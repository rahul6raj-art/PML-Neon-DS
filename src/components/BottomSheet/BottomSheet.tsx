import { type ReactNode, useEffect, useCallback } from 'react';
import { Button } from '../Button';
import { HomeIndicator } from '../HomeIndicator';
import { BottomSheetHeader } from '../BottomSheetHeader';
import './BottomSheet.css';

export interface BottomSheetProps {
  /** Whether the bottom sheet is visible */
  open?: boolean;
  /** Show dismiss (X) button in header */
  showDismiss?: boolean;
  /** Header content — image, illustration, or any ReactNode (240px area) */
  headerContent?: ReactNode;
  /** Show header area */
  showHeader?: boolean;
  /** Show title text */
  showTitle?: boolean;
  /** Title text */
  title?: string;
  /** Show subtitle text */
  showSubtitle?: boolean;
  /** Subtitle text */
  subtitle?: string;
  /** Show primary CTA button */
  showPrimaryCta?: boolean;
  /** Primary CTA label */
  primaryCtaLabel?: string;
  /** Show secondary CTA button */
  showSecondaryCta?: boolean;
  /** Secondary CTA label */
  secondaryCtaLabel?: string;
  /** Called when dismiss button is clicked or backdrop is tapped */
  onClose?: () => void;
  /** Primary CTA click handler */
  onPrimaryClick?: () => void;
  /** Secondary CTA click handler */
  onSecondaryClick?: () => void;
  /** Additional CSS class */
  className?: string;
}

export const BottomSheet = ({
  open = true,
  showDismiss = true,
  headerContent,
  showHeader = true,
  showTitle = true,
  title = 'Title Text',
  showSubtitle = true,
  subtitle = 'Subtitle',
  showPrimaryCta = true,
  primaryCtaLabel = 'Label',
  showSecondaryCta = true,
  secondaryCtaLabel = 'Label',
  onClose,
  onPrimaryClick,
  onSecondaryClick,
  className,
}: BottomSheetProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [open, handleKeyDown]);

  if (!open) return null;

  const sheetCls = ['bs__sheet', className].filter(Boolean).join(' ');
  const hasText = showTitle || showSubtitle;
  const hasCtas = showPrimaryCta || showSecondaryCta;

  return (
    <div className="bs">
      {/* Backdrop */}
      <div className="bs__backdrop" onClick={onClose} aria-hidden="true" />

      {/* Sheet */}
      <div className={sheetCls} role="dialog" aria-modal="true" aria-label={title}>
        {/* Header — uses BottomSheetHeader (image variant) */}
        {showHeader && (
          <BottomSheetHeader
            variant="image"
            dismiss={showDismiss}
            onDismiss={onClose}
            headerContent={headerContent}
          />
        )}

        {/* Body */}
        <div className="bs__body">
          {/* Title / Subtitle */}
          {hasText && (
            <div className="bs__text">
              {showTitle && <h2 className="bs__title">{title}</h2>}
              {showSubtitle && <p className="bs__subtitle">{subtitle}</p>}
            </div>
          )}

          {/* CTA Buttons */}
          {hasCtas && (
            <div className="bs__ctas">
              {showPrimaryCta && (
                <Button
                  variant="filled"
                  size="large"
                  label={primaryCtaLabel}
                  onClick={onPrimaryClick}
                />
              )}
              {showSecondaryCta && (
                <Button
                  variant="stroke"
                  size="large"
                  label={secondaryCtaLabel}
                  onClick={onSecondaryClick}
                />
              )}
            </div>
          )}

        </div>

        {/* Home Indicator — full width, outside padded body */}
        <HomeIndicator />
      </div>
    </div>
  );
};
