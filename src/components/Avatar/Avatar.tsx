import type { ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import { Logo } from '../Logo/Logo';
import type { LogoCategory } from '../Logo/Logo';
import './Avatar.css';

export type AvatarType = 'profile' | 'initials' | 'logo' | 'icon';
export type AvatarSize = 'small' | 'regular' | 'large' | 'extraLarge';
export type AvatarIcon = 'none' | 'status' | 'action';

export interface AvatarProps {
  /** Content type displayed inside the avatar */
  type?: AvatarType;
  /** Avatar size */
  size?: AvatarSize;
  /** Badge icon position */
  icon?: AvatarIcon;
  /** Green selection ring with checkmark */
  selected?: boolean;

  /** Profile image URL (type=profile) */
  src?: string;
  /** Alt text for profile image */
  alt?: string;
  /** Initials text (type=initials), e.g. "VS" */
  initials?: string;
  /** Logo image URL (type=logo) */
  logoSrc?: string;
  /** Logo brand name, used with the Logo component (type=logo) */
  logoName?: string;
  /** Logo category for the Logo component (type=logo) */
  logoCategory?: LogoCategory;
  /** Custom icon name from icon set (type=icon) */
  iconName?: string;
  /** Custom badge icon name for status/action badge */
  badgeIcon?: string;
  /** Custom content to render inside the badge */
  badgeContent?: ReactNode;

  /** Click handler */
  onClick?: () => void;
  className?: string;
}

const SIZE_MAP = {
  small: 32,
  regular: 48,
  large: 64,
  extraLarge: 128,
} as const;

const BADGE_SIZE_MAP = {
  small: 12,
  regular: 16,
  large: 20,
  extraLarge: 32,
} as const;

const ICON_INSET_MAP = {
  small: '18.75%',
  regular: '16.67%',
  large: '15.63%',
  extraLarge: '14.84%',
} as const;

const INITIALS_CLASS_MAP = {
  small: 'avatar__initials-text--small',
  regular: 'avatar__initials-text--regular',
  large: 'avatar__initials-text--large',
  extraLarge: 'avatar__initials-text--xl',
} as const;

export const Avatar = ({
  type = 'profile',
  size = 'regular',
  icon = 'none',
  selected = false,
  src,
  alt = '',
  initials = 'VS',
  logoSrc,
  logoName,
  logoCategory = 'mutualFunds',
  iconName = 'person_outline',
  badgeIcon,
  badgeContent,
  onClick,
  className,
}: AvatarProps) => {
  const px = SIZE_MAP[size];
  const badgePx = BADGE_SIZE_MAP[size];
  const iconInset = ICON_INSET_MAP[size];
  const badgeIconSize = Math.round(badgePx * 0.75);

  const wrapperClass = [
    'avatar',
    `avatar--${size}`,
    `avatar--${type}`,
    selected && 'avatar--selected',
    onClick && 'avatar--clickable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderContent = () => {
    switch (type) {
      case 'profile':
        return (
          <div className="avatar__frame">
            {src ? (
              <img className="avatar__image" src={src} alt={alt} />
            ) : (
              <div className="avatar__placeholder">
                <Icon name="person_filled" size={Math.round(px * 0.5)} />
              </div>
            )}
          </div>
        );

      case 'initials':
        return (
          <div className="avatar__frame avatar__frame--initials">
            <div className="avatar__initials-bg" />
            <span className={`avatar__initials-text ${INITIALS_CLASS_MAP[size]}`}>
              {initials}
            </span>
          </div>
        );

      case 'logo':
        return (
          <div className="avatar__frame avatar__frame--logo">
            <Logo
              category={logoCategory}
              name={logoName ?? ''}
              src={logoSrc}
              alt={alt}
              size={px}
              shape="circle"
            />
          </div>
        );

      case 'icon':
        return (
          <div className="avatar__frame avatar__frame--icon">
            <div
              className="avatar__icon-inner"
              style={{ inset: iconInset }}
            >
              <Icon name={iconName} size={Math.round(px * (1 - parseFloat(iconInset) / 50))} />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderBadge = () => {
    if (icon === 'none' && !selected) return null;

    if (selected) {
      return (
        <span
          className="avatar__badge avatar__badge--selected avatar__badge--status"
          style={{ width: badgePx, height: badgePx }}
        >
          <Icon name="checkmark" size={badgeIconSize} />
        </span>
      );
    }

    const posClass =
      icon === 'status' ? 'avatar__badge--status' : 'avatar__badge--action';

    return (
      <span
        className={`avatar__badge ${posClass}`}
        style={{ width: badgePx, height: badgePx }}
      >
        {badgeContent ?? (
          <Icon name={badgeIcon ?? 'person_outline'} size={badgeIconSize} />
        )}
      </span>
    );
  };

  const Tag = onClick ? 'button' : 'div';

  return (
    <Tag
      className={wrapperClass}
      style={{ width: px, height: px }}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
      aria-label={
        type === 'profile'
          ? alt || 'User avatar'
          : type === 'initials'
            ? initials
            : 'Avatar'
      }
    >
      {renderContent()}
      {renderBadge()}
    </Tag>
  );
};
