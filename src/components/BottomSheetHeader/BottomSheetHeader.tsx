import { type ReactNode } from 'react';
import { Icon } from '../Icon';
import { Chip } from '../Chip';
import './BottomSheetHeader.css';

export type BottomSheetHeaderVariant = 'default' | 'image';

export interface BottomSheetHeaderProps {
  /** Header type — "default" has title/subtitle/tabs, "image" is a 240px image area */
  variant?: BottomSheetHeaderVariant;
  /** Show drag handle bar (default variant only) */
  dragHandle?: boolean;
  /** Show title text (default variant only) */
  title?: boolean;
  /** Title text content */
  titleText?: string;
  /** Show subtitle text (default variant only) */
  subtitle?: boolean;
  /** Subtitle text content */
  subtitleText?: string;
  /** Show secondary action icon (default variant only) */
  secondaryIcons?: boolean;
  /** Secondary icon name */
  secondaryIcon?: string;
  /** Show dismiss (X) button */
  dismiss?: boolean;
  /** Show tab chips (default variant only) */
  tabs?: boolean;
  /** Tab labels */
  tabLabels?: string[];
  /** Active tab index (0-based) */
  activeTabIndex?: number;
  /** Called when a tab is clicked */
  onTabChange?: (index: number) => void;
  /** Called when dismiss button is clicked */
  onDismiss?: () => void;
  /** Called when secondary icon is clicked */
  onSecondaryClick?: () => void;
  /** Image/illustration content for "image" variant */
  headerContent?: ReactNode;
  /** Additional CSS class */
  className?: string;
}

export const BottomSheetHeader = ({
  variant = 'default',
  dragHandle = false,
  title = true,
  titleText = 'Title',
  subtitle = true,
  subtitleText = '2-line subtext',
  secondaryIcons = true,
  secondaryIcon = 'share_ios',
  dismiss = true,
  tabs = true,
  tabLabels = ['Label', 'Label', 'Label', 'Label', 'Label'],
  activeTabIndex = 0,
  onTabChange,
  onDismiss,
  onSecondaryClick,
  headerContent,
  className,
}: BottomSheetHeaderProps) => {
  const isDefault = variant === 'default';
  const isImage = variant === 'image';

  const wrapperCls = [
    'bsh',
    isDefault ? 'bsh--default' : 'bsh--image',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const showIcons = isDefault && (secondaryIcons || dismiss);

  return (
    <div className={wrapperCls}>
      {/* ── Image variant: background content ── */}
      {isImage && headerContent && (
        <div className="bsh__image-content">{headerContent}</div>
      )}

      {/* ── Default: drag handle ── */}
      {isDefault && dragHandle && <div className="bsh__drag-handle" />}

      {/* ── Default: section header row (title + icons) ── */}
      {isDefault && (
        <div className="bsh__section">
          <div className="bsh__row">
            <div className="bsh__title-area">
              {title && <p className="bsh__title">{titleText}</p>}
            </div>

            {showIcons && (
              <div className="bsh__icons">
                {secondaryIcons && (
                  <button
                    className="bsh__icon-btn"
                    type="button"
                    onClick={onSecondaryClick}
                    aria-label="More options"
                  >
                    <Icon name={secondaryIcon} size={24} />
                  </button>
                )}
                {dismiss && (
                  <button
                    className="bsh__icon-btn"
                    type="button"
                    onClick={onDismiss}
                    aria-label="Close"
                  >
                    <Icon name="cross" size={24} />
                  </button>
                )}
              </div>
            )}
          </div>

          {subtitle && (
            <div className="bsh__subtitle-row">
              <p className="bsh__subtitle">{subtitleText}</p>
            </div>
          )}
        </div>
      )}

      {/* ── Default: tabs ── */}
      {isDefault && tabs && (
        <div className="bsh__tabs">
          {tabLabels.map((label, i) => (
            <Chip
              key={i}
              label={label}
              type={i === activeTabIndex ? 'selected' : 'default'}
              size="medium"
              onPress={() => onTabChange?.(i)}
            />
          ))}
        </div>
      )}

      {/* ── Image variant: dismiss only ── */}
      {isImage && dismiss && (
        <button
          className="bsh__icon-btn bsh__dismiss-image"
          type="button"
          onClick={onDismiss}
          aria-label="Close"
        >
          <Icon name="cross" size={24} />
        </button>
      )}
    </div>
  );
};
