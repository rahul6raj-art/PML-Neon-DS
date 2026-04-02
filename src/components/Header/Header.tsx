import type { ReactNode } from 'react';
import { BrandLogo } from '../BrandLogo';
import type { BrandLogoTheme } from '../BrandLogo';
import { Chip } from '../Chip';
import type { ChipSize } from '../Chip';
import { Icon } from '../Icon';
import { StatusBar } from '../StatusBar';
import type { StatusBarTheme } from '../StatusBar';
import { Tabs } from '../Tab';
import type { TabItem, TabSize } from '../Tab';
import './Header.css';

export type HeaderType = 'homepage' | 'large' | 'regular';

export interface HeaderProps {
  /** Header layout variant */
  type?: HeaderType;
  /** Page title */
  title?: string;
  /** Subtitle text below title */
  subtitle?: string;
  /** Time displayed in the status bar */
  time?: string;
  /** Status bar light/dark theme */
  statusBarTheme?: StatusBarTheme;

  /** Show back arrow on the left (Large & Regular) */
  showBackButton?: boolean;
  /** Back button click handler */
  onBack?: () => void;

  /** Right-hand side icon names (from icons folder) */
  rhsIcons?: string[];
  /** RHS icon click handler — receives icon name */
  onRhsIconClick?: (iconName: string) => void;

  /** Show tabs row below header */
  showTabs?: boolean;
  /** Tab items — uses the actual Tab component's TabItem interface */
  tabs?: TabItem[];
  /** Active tab value (controlled) */
  activeTabValue?: string;
  /** Tab change handler — receives the tab value string */
  onTabChange?: (value: string) => void;
  /** Tab size */
  tabSize?: TabSize;

  /** Show chips row */
  showChips?: boolean;
  /** Chip labels */
  chipLabels?: string[];
  /** Active chip index */
  activeChip?: number;
  /** Chip change handler */
  onChipChange?: (index: number) => void;
  /** Chip size */
  chipSize?: ChipSize;
  /** Per-chip: show leading icon */
  chipShowLeadingIcon?: boolean;
  /** Per-chip: leading icon name */
  chipLeadingIcon?: string;
  /** Per-chip: show trailing icon */
  chipShowTrailingIcon?: boolean;
  /** Per-chip: trailing icon name */
  chipTrailingIcon?: string;
  /** Per-chip: show badge */
  chipShowBadge?: boolean;
  /** Per-chip: badge content */
  chipBadgeContent?: string;

  /** Homepage: show decorative gradient glow behind header */
  showGradient?: boolean;
  /** Homepage: show brand logo */
  showBrandLogo?: boolean;
  /** Homepage: `dark` = DarkLogo on dark surfaces (dark app mode); `light` = LightLogo on light surfaces */
  brandLogoTheme?: BrandLogoTheme;
  /** Homepage: custom logo image src (overrides BrandLogo) */
  logoSrc?: string;
  /** Homepage: logo alt */
  logoAlt?: string;

  /** Show border line at the bottom of the header */
  showBorderBottom?: boolean;

  /** Large: LHS icon/avatar content */
  lhsIcon?: ReactNode;

  className?: string;
}

const DEFAULT_TABS: TabItem[] = [
  { value: 'tab-0', label: 'Tab' },
  { value: 'tab-1', label: 'Tab' },
  { value: 'tab-2', label: 'Tab' },
  { value: 'tab-3', label: 'Tab' },
  { value: 'tab-4', label: 'Tab' },
  { value: 'tab-5', label: 'Tab' },
];

export const Header = ({
  type = 'regular',
  title = 'Page Title',
  subtitle,
  time = '9:41',
  statusBarTheme = 'light',
  showBackButton = true,
  onBack,
  rhsIcons = [],
  onRhsIconClick,
  showTabs = false,
  tabs = DEFAULT_TABS,
  activeTabValue,
  onTabChange,
  tabSize = 'medium',
  showChips = false,
  chipLabels = ['Label', 'Label', 'Label'],
  activeChip = 0,
  onChipChange,
  chipSize = 'medium',
  chipShowLeadingIcon = false,
  chipLeadingIcon,
  chipShowTrailingIcon = false,
  chipTrailingIcon,
  chipShowBadge = false,
  chipBadgeContent,
  lhsIcon,
  showBorderBottom = false,
  showGradient = true,
  showBrandLogo = true,
  brandLogoTheme = 'light',
  logoSrc,
  logoAlt = 'Logo',
  className,
}: HeaderProps) => {
  const wrapperClass = [
    'header',
    `header--${type}`,
    showBorderBottom && 'header--border-bottom',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderHomepage = () => (
    <div className="header__homepage-wrap">
      <div className="header__bar">
        <div className="header__bar-lhs">
          {logoSrc ? (
            <div className="header__logo">
              <img src={logoSrc} alt={logoAlt} className="header__logo-img" />
            </div>
          ) : showBrandLogo ? (
            <BrandLogo key={brandLogoTheme} theme={brandLogoTheme} size={34} alt={logoAlt} />
          ) : null}
          <span className="header__bar-title">{title}</span>
        </div>
        <div className="header__bar-rhs">
          {rhsIcons.map((iconName) => (
            <button
              key={iconName}
              type="button"
              className="header__icon-btn"
              onClick={() => onRhsIconClick?.(iconName)}
              aria-label={iconName}
            >
              <Icon name={iconName} size={24} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLarge = () => (
    <>
      <div className="header__bar header__bar--glass">
        <div className="header__bar-row">
          {showBackButton && (
            <button
              type="button"
              className="header__icon-btn header__back-btn"
              onClick={onBack}
              aria-label="Go back"
            >
              <Icon name="caret_large_left_main" size={24} />
            </button>
          )}
          <div className="header__bar-rhs">
            {rhsIcons.map((iconName) => (
              <button
                key={iconName}
                type="button"
                className="header__icon-btn"
                onClick={() => onRhsIconClick?.(iconName)}
                aria-label={iconName}
              >
                <Icon name={iconName} size={24} />
              </button>
            ))}
          </div>
        </div>

        <div className="header__title-section">
          {lhsIcon && <div className="header__lhs-icon">{lhsIcon}</div>}
          <div className="header__title-block">
            <h1 className="header__title header__title--large">{title}</h1>
            {subtitle && (
              <p className="header__subtitle">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );

  const renderRegular = () => (
    <>
      <div className="header__bar header__bar--glass header__bar--regular">
        <div className="header__bar-cell header__bar-cell--lhs">
          {showBackButton && (
            <button
              type="button"
              className="header__icon-btn header__back-btn"
              onClick={onBack}
              aria-label="Go back"
            >
              <Icon name="caret_large_left_main" size={24} />
            </button>
          )}
        </div>

        <div className="header__bar-cell header__bar-cell--center">
          <span className="header__title header__title--regular">{title}</span>
          {subtitle && (
            <span className="header__subtitle header__subtitle--center">
              {subtitle}
            </span>
          )}
        </div>

        <div className="header__bar-cell header__bar-cell--rhs">
          {rhsIcons.map((iconName) => (
            <button
              key={iconName}
              type="button"
              className="header__icon-btn"
              onClick={() => onRhsIconClick?.(iconName)}
              aria-label={iconName}
            >
              <Icon name={iconName} size={24} />
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className={wrapperClass}>
      {type === 'homepage' && showGradient && (
        <div className="header__gradient" aria-hidden="true">
          <img
            className="header__gradient-img"
            src="/brand/header-gradient.svg"
            alt=""
            draggable={false}
          />
        </div>
      )}
      <StatusBar theme={statusBarTheme} time={time} />

      {type === 'homepage' && renderHomepage()}
      {type === 'large' && renderLarge()}
      {type === 'regular' && renderRegular()}

      {showTabs && (
        <Tabs
          tabs={tabs}
          value={activeTabValue}
          onChange={onTabChange}
          size={tabSize}
          width="100%"
          className="header__tabs-wrap"
        />
      )}

      {showChips && (
        <div className="header__chips">
          {chipLabels.map((label, i) => (
            <Chip
              key={i}
              type={i === activeChip ? 'selected' : 'default'}
              size={chipSize}
              label={label}
              showLeadingIcon={chipShowLeadingIcon}
              leadingIcon={chipLeadingIcon}
              showTrailingIcon={chipShowTrailingIcon}
              trailingIcon={chipTrailingIcon}
              showBadge={chipShowBadge}
              badgeContent={chipBadgeContent}
              onPress={() => onChipChange?.(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
