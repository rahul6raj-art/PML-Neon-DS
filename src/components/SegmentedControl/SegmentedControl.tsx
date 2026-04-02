import { type ReactNode, useState, useCallback } from 'react';
import { Icon } from '../Icon';
import './SegmentedControl.css';

export interface SegmentItem {
  /** Unique value for this segment */
  value: string;
  /** Display label */
  label: string;
  /** Show a leading icon */
  showLeadingIcon?: boolean;
  /** Leading icon name or ReactNode */
  leadingIcon?: string | ReactNode;
  /** Show a trailing icon */
  showTrailingIcon?: boolean;
  /** Trailing icon name or ReactNode */
  trailingIcon?: string | ReactNode;
  /** Show a badge indicator */
  showBadge?: boolean;
  /** Badge text content */
  badgeContent?: string;
  /** Whether this segment is disabled */
  disabled?: boolean;
}

export interface SegmentedControlProps {
  /** Array of segment items (2 or 3) */
  segments: SegmentItem[];
  /** Currently selected segment value (controlled) */
  value?: string;
  /** Default selected value (uncontrolled) */
  defaultValue?: string;
  /** Callback when selection changes */
  onChange?: (value: string) => void;
  /** Component width */
  width?: number | string;
  /** Additional CSS class */
  className?: string;
  /** Disable the entire control */
  disabled?: boolean;
}

function renderIcon(icon: string | ReactNode | undefined, fallback: string) {
  if (!icon) return <Icon name={fallback} size={16} />;
  if (typeof icon === 'string') return <Icon name={icon} size={16} />;
  return icon;
}

export const SegmentedControl = ({
  segments,
  value: controlledValue,
  defaultValue,
  onChange,
  width = 344,
  className,
  disabled = false,
}: SegmentedControlProps) => {
  const [internalValue, setInternalValue] = useState(
    () => defaultValue ?? segments[0]?.value ?? '',
  );

  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? controlledValue : internalValue;

  const handleSelect = useCallback(
    (segValue: string) => {
      if (disabled) return;
      if (!isControlled) setInternalValue(segValue);
      onChange?.(segValue);
    },
    [disabled, isControlled, onChange],
  );

  const containerClasses = [
    'segmented-control',
    disabled && 'segmented-control--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style = typeof width === 'number' ? { width: `${width}px` } : { width };

  return (
    <div className={containerClasses} style={style} role="tablist">
      {segments.map((seg) => {
        const isActive = activeValue === seg.value;
        const isDisabled = disabled || seg.disabled;
        const segClasses = [
          'segment',
          isActive && 'segment--active',
          isDisabled && 'segment--disabled',
        ]
          .filter(Boolean)
          .join(' ');

        const showLeading = seg.showLeadingIcon || seg.leadingIcon;
        const showTrailing = seg.showTrailingIcon || seg.trailingIcon;

        return (
          <button
            key={seg.value}
            className={segClasses}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            disabled={isDisabled}
            onClick={() => handleSelect(seg.value)}
          >
            {showLeading && (
              <span className="segment__icon">
                {renderIcon(seg.leadingIcon, 'star_filled')}
              </span>
            )}
            <span className="segment__label">{seg.label}</span>
            {showTrailing && (
              <span className="segment__icon">
                {renderIcon(seg.trailingIcon, 'star_filled')}
              </span>
            )}
            {seg.showBadge && (
              <span className="segment__badge">
                {seg.badgeContent || ''}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
