import { type ReactNode, type HTMLAttributes } from 'react';
import { Icon } from '../Icon';
import './Chip.css';

export type ChipType = 'default' | 'selected' | 'disabled';
export type ChipSize = 'small' | 'medium' | 'large';

export interface ChipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'type'> {
  /** Visual type / state */
  type?: ChipType;
  /** Chip size */
  size?: ChipSize;
  /** Label text */
  label?: string;
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
  /** Click handler */
  onPress?: () => void;
}

const ICON_SIZES: Record<ChipSize, number> = {
  small: 20,
  medium: 20,
  large: 24,
};

function renderIcon(icon: string | ReactNode | undefined, fallback: string, size: number) {
  if (!icon) return <Icon name={fallback} size={size} />;
  if (typeof icon === 'string') return <Icon name={icon} size={size} />;
  return icon;
}

export const Chip = ({
  type = 'default',
  size = 'medium',
  label = 'Label',
  showLeadingIcon = false,
  leadingIcon,
  showTrailingIcon = false,
  trailingIcon,
  showBadge = false,
  badgeContent = '3',
  onPress,
  className,
  ...rest
}: ChipProps) => {
  const classes = [
    'chip',
    `chip--${type}`,
    `chip--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconSize = ICON_SIZES[size];
  const hasLeading = showLeadingIcon || leadingIcon;
  const hasTrailing = showTrailingIcon || trailingIcon;

  return (
    <div
      className={classes}
      role={type !== 'disabled' ? 'button' : undefined}
      tabIndex={type !== 'disabled' ? 0 : undefined}
      aria-disabled={type === 'disabled' || undefined}
      onClick={type !== 'disabled' ? onPress : undefined}
      onKeyDown={
        type !== 'disabled'
          ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPress?.(); } }
          : undefined
      }
      {...rest}
    >
      {hasLeading && (
        <span className="chip__icon">
          {renderIcon(leadingIcon, 'star_filled', iconSize)}
        </span>
      )}
      <span className="chip__label">{label}</span>
      {hasTrailing && (
        <span className="chip__icon">
          {renderIcon(trailingIcon, 'star_filled', iconSize)}
        </span>
      )}
      {showBadge && (
        <span className="chip__badge">{badgeContent}</span>
      )}
    </div>
  );
};
