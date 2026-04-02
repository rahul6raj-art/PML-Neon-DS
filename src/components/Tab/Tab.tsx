import { type ReactNode, useState, useCallback } from 'react';
import { Icon } from '../Icon';
import './Tab.css';

export type TabSize = 'medium' | 'large';

export interface TabItem {
  /** Unique value for this tab */
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
  /** Show a badge count */
  showBadge?: boolean;
  /** Badge count text */
  badgeContent?: string;
  /** Whether this tab is disabled */
  disabled?: boolean;
}

export interface TabsProps {
  /** Array of tab items */
  tabs: TabItem[];
  /** Currently active tab value (controlled) */
  value?: string;
  /** Default active tab value (uncontrolled) */
  defaultValue?: string;
  /** Callback when tab selection changes */
  onChange?: (value: string) => void;
  /** Tab size */
  size?: TabSize;
  /** Container width */
  width?: number | string;
  /** Additional CSS class */
  className?: string;
}

const ICON_SIZES: Record<TabSize, number> = {
  medium: 20,
  large: 24,
};

function renderIcon(icon: string | ReactNode | undefined, fallback: string, size: number) {
  if (!icon) return <Icon name={fallback} size={size} />;
  if (typeof icon === 'string') return <Icon name={icon} size={size} />;
  return icon;
}

export const Tabs = ({
  tabs,
  value: controlledValue,
  defaultValue,
  onChange,
  size = 'medium',
  width,
  className,
}: TabsProps) => {
  const [internalValue, setInternalValue] = useState(
    () => defaultValue ?? tabs[0]?.value ?? '',
  );

  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? controlledValue : internalValue;

  const handleSelect = useCallback(
    (tabValue: string) => {
      if (!isControlled) setInternalValue(tabValue);
      onChange?.(tabValue);
    },
    [isControlled, onChange],
  );

  const containerClasses = [
    'tabs',
    `tabs--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style: React.CSSProperties = {};
  if (width !== undefined) {
    style.width = typeof width === 'number' ? `${width}px` : width;
  }

  const iconSize = ICON_SIZES[size];

  return (
    <div className={containerClasses} style={style} role="tablist">
      {tabs.map((tab) => {
        const isActive = activeValue === tab.value;
        const isDisabled = tab.disabled;
        const tabClasses = [
          'tab',
          isActive && 'tab--active',
          isDisabled && 'tab--disabled',
        ]
          .filter(Boolean)
          .join(' ');

        const hasLeading = tab.showLeadingIcon || tab.leadingIcon;
        const hasTrailing = tab.showTrailingIcon || tab.trailingIcon;

        return (
          <button
            key={tab.value}
            className={tabClasses}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            disabled={isDisabled}
            onClick={() => handleSelect(tab.value)}
          >
            {hasLeading && (
              <span className="tab__icon">
                {renderIcon(tab.leadingIcon, 'star_filled', iconSize)}
              </span>
            )}
            <span className="tab__label">{tab.label}</span>
            {hasTrailing && (
              <span className="tab__icon">
                {renderIcon(tab.trailingIcon, 'star_filled', iconSize)}
              </span>
            )}
            {tab.showBadge && (
              <span className="tab__badge">{tab.badgeContent || '3'}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};
