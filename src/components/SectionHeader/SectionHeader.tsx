/**
 * PML convention (see `.cursor/rules/pml-screen-patterns.mdc`):
 * - Default **size** on app screens: **extra-large** unless PRD/Figma calls for smaller.
 * - List / drill-in sections: **showChevron** + **trailing="none"** — not **trailing="link"**
 *   for “See more” / “View all” beside the title. Use **trailing** variants only when PRD/Figma
 *   calls for a distinct trailing control.
 */
import { useState, type ReactNode } from 'react';
import { Icon } from '../Icon';
import { Button } from '../Button';
import { Chip } from '../Chip';
import './SectionHeader.css';

export type SectionHeaderSize = 'extra-large' | 'large' | 'medium' | 'small';
export type SectionHeaderTrailing = 'none' | 'link' | 'text' | 'icons' | 'button';

export interface SectionHeaderProps {
  /** Size variant — defaults **extra-large** (PML app standard for primary section titles). */
  size?: SectionHeaderSize;
  /** Trailing content type */
  trailing?: SectionHeaderTrailing;
  /** Title text */
  title?: string;
  /** Show subtext below title */
  showSubtext?: boolean;
  /** Subtext below title (string or rich content, e.g. badge + meta) */
  subtext?: ReactNode;
  /** Show chevron icon next to title (always shown for extra-large) */
  showChevron?: boolean;
  /** Trailing label when trailing = 'text' */
  trailingText?: string;
  /** Link label when trailing = 'link' */
  linkText?: string;
  /** Link press handler */
  onLinkPress?: () => void;
  /** Button label when trailing = 'button' */
  buttonLabel?: string;
  /** Button press handler */
  onButtonPress?: () => void;
  /** Show icon button when trailing = 'icons' */
  showIcon?: boolean;
  /** Icon name for the icon button */
  iconName?: string;
  /** Icon press handler */
  onIconPress?: () => void;
  /** Show chips row below */
  showChips?: boolean;
  /** Chip labels */
  chipLabels?: string[];
  /** Active chip index */
  activeChip?: number;
  /** Chip change handler */
  onChipChange?: (index: number) => void;
  /** Additional CSS class */
  className?: string;
}

const CHEVRON_SIZES: Record<SectionHeaderSize, number> = {
  'extra-large': 24,
  large: 24,
  medium: 20,
  small: 20,
};

export const SectionHeader = ({
  size = 'extra-large',
  trailing = 'none',
  title = 'Title Text',
  showSubtext = true,
  subtext = '2-line subtext',
  showChevron = false,
  trailingText = 'Text',
  linkText = 'Link',
  onLinkPress,
  buttonLabel = 'Button',
  onButtonPress,
  showIcon = true,
  iconName = 'rupee',
  onIconPress,
  showChips = false,
  chipLabels = ['Label', 'Label', 'Label', 'Label', 'Label'],
  activeChip: controlledActiveChip,
  onChipChange,
  className,
}: SectionHeaderProps) => {
  const [internalActiveChip, setInternalActiveChip] = useState(0);
  const activeChip = controlledActiveChip ?? internalActiveChip;

  const handleChipChange = (index: number) => {
    if (onChipChange) {
      onChipChange(index);
    } else {
      setInternalActiveChip(index);
    }
  };

  const isXL = size === 'extra-large';
  const displayChevron = isXL || showChevron;
  const chevronSize = CHEVRON_SIZES[size];

  const wrapperCls = [
    'sh',
    `sh--${size}`,
    className,
  ].filter(Boolean).join(' ');

  const renderTitleText = () => (
    <div className="sh__title-line">
      <span className="sh__title">{title}</span>
      {displayChevron && (
        <span className="sh__chevron">
          <Icon name="caret_small_right_main" size={chevronSize} />
        </span>
      )}
    </div>
  );

  const renderSubtext = () => (
    <div className="sh__subtext-row">
      {typeof subtext === 'string' || typeof subtext === 'number' ? (
        <span className="sh__subtext">{subtext}</span>
      ) : (
        <div className="sh__subtext sh__subtext--rich">{subtext}</div>
      )}
    </div>
  );

  const renderTrailingContent = () => {
    switch (trailing) {
      case 'text':
        return (
          <span className="sh__trailing-text">{trailingText}</span>
        );
      case 'link':
        return (
          <button className="sh__trailing-link" type="button" onClick={onLinkPress}>
            {linkText}
          </button>
        );
      case 'button':
        return (
          <Button
            variant="stroke"
            size="small"
            label={buttonLabel}
            onClick={onButtonPress}
          />
        );
      default:
        return null;
    }
  };

  const renderIconButtons = () => (
    <div className="sh__icon-buttons">
      {showIcon && (
        <button className="sh__icon-btn" type="button" onClick={onIconPress}>
          <Icon name={iconName} size={24} />
        </button>
      )}
    </div>
  );

  return (
    <div className={wrapperCls}>
      {trailing === 'icons' ? (
        <div className="sh__main">
          <div className="sh__title-row">
            {isXL ? (
              <div className="sh__left sh__left--inline">
                {renderTitleText()}
              </div>
            ) : (
              <div className="sh__left">
                {renderTitleText()}
                {showSubtext && renderSubtext()}
              </div>
            )}
            {renderIconButtons()}
          </div>
          {isXL && showSubtext && renderSubtext()}
        </div>
      ) : (
        <div className="sh__title-row">
          <div className="sh__left">
            {renderTitleText()}
            {showSubtext && renderSubtext()}
          </div>
          {renderTrailingContent()}
        </div>
      )}

      {showChips && (
        <div className="sh__chips">
          {chipLabels.map((label, i) => (
            <Chip
              key={i}
              type={i === activeChip ? 'selected' : 'default'}
              size="medium"
              label={label}
              onPress={() => handleChipChange(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
