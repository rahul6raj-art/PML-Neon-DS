import { useState } from 'react';
import { Icon } from '../Icon';
import { HomeIndicator } from '../HomeIndicator';
import './BottomNav.css';

export interface BottomNavItem {
  /** Icon name (inactive state) */
  icon: string;
  /** Icon name when active (falls back to `icon` if omitted) */
  activeIcon?: string;
  /** Tab label */
  label: string;
}

export interface BottomNavProps {
  /** Navigation items (max recommended: 5) */
  items?: BottomNavItem[];
  /** Active tab index (controlled) */
  activeIndex?: number;
  /** Tab change handler */
  onChange?: (index: number) => void;
  /** Show the Home Indicator bar at the bottom */
  showHomeIndicator?: boolean;
  /** Show a green gradient glow behind the active icon */
  showGradient?: boolean;
  /** Additional CSS class */
  className?: string;
}

const DEFAULT_ITEMS: BottomNavItem[] = [
  { icon: 'home_outline', label: 'Home' },
  { icon: 'chart', label: 'Stocks' },
  { icon: 'handbag_outline', label: 'MF' },
  { icon: 'rupee', label: 'All' },
];

export const BottomNav = ({
  items = DEFAULT_ITEMS,
  activeIndex: controlledIndex,
  onChange,
  showHomeIndicator = true,
  showGradient = true,
  className,
}: BottomNavProps) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const activeIndex = controlledIndex ?? internalIndex;

  const handlePress = (index: number) => {
    if (onChange) {
      onChange(index);
    } else {
      setInternalIndex(index);
    }
  };

  const wrapperCls = ['bn', className].filter(Boolean).join(' ');

  return (
    <div className={wrapperCls}>
      <nav className="bn__bar" role="tablist">
        {items.map((item, i) => {
          const isActive = i === activeIndex;
          const iconName = isActive && item.activeIcon ? item.activeIcon : item.icon;
          const itemCls = ['bn__item', isActive && 'bn__item--active']
            .filter(Boolean)
            .join(' ');

          return (
            <button
              key={i}
              className={itemCls}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handlePress(i)}
            >
              <span className="bn__icon-wrap">
                {isActive && showGradient && <span className="bn__glow" aria-hidden="true" />}
                <Icon name={iconName} size={24} />
              </span>
              <span className="bn__label">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {showHomeIndicator && <HomeIndicator />}
    </div>
  );
};

BottomNav.displayName = 'BottomNav';
