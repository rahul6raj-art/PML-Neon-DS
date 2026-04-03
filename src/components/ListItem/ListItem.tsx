import { Icon } from '../Icon';
import { Avatar } from '../Avatar';
import type { AvatarType, AvatarSize, AvatarIcon } from '../Avatar';
import { Button } from '../Button';
import type { ButtonType, ButtonSize } from '../Button';
import type { LogoCategory } from '../Logo';
import './ListItem.css';

export type ListItemEmphasis = 'high' | 'low';
export type ListItemTrailing = 'none' | 'icon' | 'text' | 'link' | 'button';
export type ListItemValueType = 'positive' | 'negative';

export interface ListItemProps {
  emphasis?: ListItemEmphasis;

  /* ── Leading (Avatar) ────────────────────────── */
  showLeading?: boolean;
  avatarType?: AvatarType;
  avatarSize?: AvatarSize;
  avatarBadgeType?: AvatarIcon;
  avatarSelected?: boolean;
  avatarInitials?: string;
  avatarSrc?: string;
  avatarIconName?: string;
  avatarLogoName?: string;
  avatarLogoCategory?: LogoCategory;
  avatarBadgeIcon?: string;

  /* ── Primary ─────────────────────────────────── */
  showPrimaryIcon?: boolean;
  primaryIcon?: string;
  showPrimaryText?: boolean;
  primaryText?: string;

  /* ── Subtext row ─────────────────────────────── */
  showSubtext?: boolean;
  showBadge?: boolean;
  badgeLabel?: string;
  showSubtextIcon?: boolean;
  subtextIcon?: string;
  showSecondaryText?: boolean;
  secondaryText?: string;

  /* ── Value indicator (colored %) ────────────── */
  showValueText?: boolean;
  valueText?: string;
  valueType?: ListItemValueType;

  /* ── Tertiary ────────────────────────────────── */
  showTertiaryText?: boolean;
  tertiaryText?: string;
  showTertiaryIcon1?: boolean;
  tertiaryIcon1?: string;
  showTertiaryIcon2?: boolean;
  tertiaryIcon2?: string;

  /* ── Trailing ────────────────────────────────── */
  showTrailing?: boolean;
  trailing?: ListItemTrailing;
  trailingIcon?: string;
  trailingText?: string;
  trailingLinkText?: string;
  onTrailingLinkPress?: () => void;
  trailingButtonLabel?: string;
  trailingButtonVariant?: ButtonType;
  trailingButtonSize?: ButtonSize;
  onTrailingButtonPress?: () => void;

  /* ── Misc ────────────────────────────────────── */
  showSeparator?: boolean;
  onClick?: () => void;
  className?: string;
}

export const ListItem = ({
  emphasis = 'high',

  showLeading = true,
  avatarType = 'initials',
  avatarSize = 'regular',
  avatarBadgeType = 'none',
  avatarSelected = false,
  avatarInitials = 'VS',
  avatarSrc,
  avatarIconName = 'person_outline',
  avatarLogoName,
  avatarLogoCategory = 'mutualFunds',
  avatarBadgeIcon,

  showPrimaryIcon = false,
  primaryIcon = 'info_circle_outline',
  showPrimaryText = true,
  primaryText = 'Primary',

  showSubtext = true,
  showBadge = false,
  badgeLabel = 'Label',
  showSubtextIcon = false,
  subtextIcon = 'info_circle_outline',
  showSecondaryText = true,
  secondaryText = 'Secondary',

  showValueText = false,
  valueText = '(0.30%)',
  valueType = 'negative',

  showTertiaryText = false,
  tertiaryText = 'Tertiary',
  showTertiaryIcon1 = false,
  tertiaryIcon1 = 'info_circle_outline',
  showTertiaryIcon2 = false,
  tertiaryIcon2 = 'info_circle_outline',

  showTrailing = true,
  trailing = 'icon',
  trailingIcon = 'caret_small_right_main',
  trailingText = 'Text',
  trailingLinkText = 'Link',
  onTrailingLinkPress,
  trailingButtonLabel = 'Button',
  trailingButtonVariant = 'stroke',
  trailingButtonSize = 'small',
  onTrailingButtonPress,

  showSeparator = true,
  onClick,
  className,
}: ListItemProps) => {
  const wrapperCls = [
    'li-item',
    `li-item--${emphasis}`,
    showLeading && 'li-item--with-leading',
    showPrimaryIcon && 'li-item--with-primary-icon',
    className,
  ].filter(Boolean).join(' ');

  const displayValue = (() => {
    if (!valueText) return valueText;
    const prefix = valueType === 'positive' ? '+' : '-';
    const hasParen = valueText.startsWith('(');
    const inner = hasParen ? valueText.slice(1, -1) : valueText;
    if (inner.startsWith('+') || inner.startsWith('-')) return valueText;
    const prefixed = `${prefix}${inner}`;
    return hasParen ? `(${prefixed})` : prefixed;
  })();

  const renderTrailing = () => {
    if (!showTrailing) return null;

    switch (trailing) {
      case 'icon':
        return (
          <div className="li-item__trailing li-item__trailing--icon">
            <Icon name={trailingIcon} size={24} />
          </div>
        );
      case 'text':
        return (
          <div className="li-item__trailing li-item__trailing--text">
            <span className="li-item__trailing-label">{trailingText}</span>
          </div>
        );
      case 'link':
        return (
          <div className="li-item__trailing li-item__trailing--link">
            <button
              className="li-item__trailing-link"
              type="button"
              onClick={onTrailingLinkPress}
            >
              {trailingLinkText}
            </button>
          </div>
        );
      case 'button':
        return (
          <div className="li-item__trailing li-item__trailing--button">
            <Button
              variant={trailingButtonVariant}
              size={trailingButtonSize}
              label={trailingButtonLabel}
              onClick={onTrailingButtonPress}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={wrapperCls}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Leading avatar */}
      {showLeading && (
        <div className="li-item__leading">
          <Avatar
            type={avatarType}
            size={avatarSize}
            icon={avatarBadgeType}
            selected={avatarSelected}
            initials={avatarType === 'initials' ? avatarInitials : undefined}
            src={avatarType === 'profile' ? avatarSrc : undefined}
            iconName={avatarType === 'icon' ? avatarIconName : undefined}
            logoName={avatarType === 'logo' ? avatarLogoName : undefined}
            logoCategory={avatarType === 'logo' ? avatarLogoCategory : undefined}
            badgeIcon={avatarBadgeType !== 'none' ? avatarBadgeIcon : undefined}
          />
        </div>
      )}

      {/* Content area */}
      <div className="li-item__content">
        <div className="li-item__main">
          <div className="li-item__text-block">
            {showPrimaryText && (
              <div className="li-item__primary-row">
                <span className="li-item__primary">{primaryText}</span>
                {showPrimaryIcon && (
                  <span className="li-item__primary-icon">
                    <Icon name={primaryIcon} size={20} />
                  </span>
                )}
              </div>
            )}

            {showSubtext && (
              <div className="li-item__secondary-row">
                {showBadge && (
                  <span className="li-item__badge">{badgeLabel}</span>
                )}
                {showSubtextIcon && (
                  <span className="li-item__subtext-icon">
                    <Icon name={subtextIcon} size={16} />
                  </span>
                )}
                {showSecondaryText && (
                  <span className="li-item__secondary">{secondaryText}</span>
                )}
                {showValueText && (
                  <span className={`li-item__value li-item__value--${valueType}`}>
                    {displayValue}
                  </span>
                )}
              </div>
            )}

            {showTertiaryText && (
              <div className="li-item__tertiary-row">
                {showTertiaryIcon2 && (
                  <span className="li-item__tertiary-icon">
                    <Icon name={tertiaryIcon2} size={16} />
                  </span>
                )}
                {showTertiaryIcon1 && (
                  <span className="li-item__tertiary-icon">
                    <Icon name={tertiaryIcon1} size={16} />
                  </span>
                )}
                <span className="li-item__tertiary">{tertiaryText}</span>
              </div>
            )}
          </div>

          {renderTrailing()}
        </div>
      </div>

      {showSeparator && (
        <div className={`li-item__separator ${showLeading ? 'li-item__separator--inset' : ''}`} />
      )}
    </div>
  );
};
