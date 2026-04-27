import type { AvatarType, AvatarSize, AvatarIcon } from '../Avatar';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
import type { ButtonType, ButtonSize } from '../Button';
import { Icon } from '../Icon';
import type { LogoCategory } from '../Logo';
import type { ListItemTrailing, ListItemTrailingTextTone } from '../ListItem';

export type StocksCardChangeSentiment = 'positive' | 'negative' | 'neutral';
export type StocksCardStatusBadgeTone = 'notice' | 'primary';

function formatChangeLabelForSentiment(label: string, sentiment: StocksCardChangeSentiment): string {
  const t = label.trim();
  if (sentiment === 'neutral') {
    return t;
  }
  if (sentiment === 'negative') {
    if (t.startsWith('+')) {
      return `-${t.slice(1)}`;
    }
    if (t.startsWith('-')) {
      return t;
    }
    return `-${t}`;
  }
  if (t.startsWith('-')) {
    return `+${t.slice(1)}`;
  }
  if (t.startsWith('+')) {
    return t;
  }
  return `+${t}`;
}

export interface StocksCardRowProps {
  isMtf: boolean;
  showSeparator?: boolean;
  statusBadgeTone?: StocksCardStatusBadgeTone;
  statusLabel?: string;
  title: string;
  quantity: string;
  avgPriceLabel: string;
  price: string;
  changeLabel: string;
  changeSentiment: StocksCardChangeSentiment;
  quantityIconName: string;
  marginFooterLabel?: string;
  marginReturnLabel?: string;
  marginMultiplierLabel?: string;
  marginFooterIconName?: string;
  marginReturnSentiment?: StocksCardChangeSentiment;
  showLeading: boolean;
  avatarType: AvatarType;
  avatarSize: AvatarSize;
  avatarBadgeType: AvatarIcon;
  avatarSelected: boolean;
  avatarInitials?: string;
  avatarSrc?: string;
  avatarIconName?: string;
  avatarLogoName?: string;
  avatarLogoCategory?: LogoCategory;
  avatarBadgeIcon?: string;
  showTrailing: boolean;
  trailing?: ListItemTrailing;
  trailingText?: string;
  trailingSubtext?: string;
  trailingTextTone?: ListItemTrailingTextTone;
  trailingLinkText?: string;
  onTrailingLinkPress?: () => void;
  trailingButtonLabel?: string;
  trailingButtonVariant?: ButtonType;
  trailingButtonSize?: ButtonSize;
  onTrailingButtonPress?: () => void;
  className?: string;
}

export const StocksCardRow = ({
  isMtf,
  showSeparator = false,
  statusBadgeTone,
  statusLabel,
  title,
  quantity,
  avgPriceLabel,
  price,
  changeLabel,
  changeSentiment,
  quantityIconName,
  marginFooterLabel = 'Return on margin',
  marginReturnLabel = '+296.4%',
  marginMultiplierLabel = '(4x)',
  marginFooterIconName = 'chart',
  marginReturnSentiment,
  showLeading,
  avatarType,
  avatarSize,
  avatarBadgeType,
  avatarSelected,
  avatarInitials,
  avatarSrc,
  avatarIconName,
  avatarLogoName,
  avatarLogoCategory,
  avatarBadgeIcon,
  showTrailing,
  trailing = 'icon',
  trailingText = 'Text',
  trailingSubtext,
  trailingTextTone = 'default',
  trailingLinkText = 'Link',
  onTrailingLinkPress,
  trailingButtonLabel = 'Button',
  trailingButtonVariant = 'stroke',
  trailingButtonSize = 'small',
  onTrailingButtonPress,
  className,
}: StocksCardRowProps) => {
  const badgeTone = statusBadgeTone ?? (isMtf ? 'primary' : 'notice');
  const marginSentiment = marginReturnSentiment ?? changeSentiment;

  const root = ['sc-row', isMtf && 'sc-row--mtf', className].filter(Boolean).join(' ');

  const renderLeadingAvatar = () => (
    <div className="sc-row__leading">
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
  );

  const renderTrailingBlock = () => {
    if (!showTrailing) return null;

    switch (trailing) {
      case 'icon':
        return null;
      case 'text': {
        const stack = Boolean(trailingSubtext?.trim());
        const labelClass = [
          'sc-row__trailing-label',
          trailingTextTone === 'positive' && 'sc-row__trailing-label--positive',
          trailingTextTone === 'negative' && 'sc-row__trailing-label--negative',
        ]
          .filter(Boolean)
          .join(' ');
        return (
          <div
            className={['sc-row__trailing', 'sc-row__trailing--text', stack && 'sc-row__trailing--stack']
              .filter(Boolean)
              .join(' ')}
          >
            <span className={labelClass}>{trailingText}</span>
            {stack ? (
              <span className="sc-row__trailing-sub subtext-regular">{trailingSubtext}</span>
            ) : null}
          </div>
        );
      }
      case 'link':
        return (
          <div className="sc-row__trailing sc-row__trailing--link">
            <button className="sc-row__trailing-link" type="button" onClick={onTrailingLinkPress}>
              {trailingLinkText}
            </button>
          </div>
        );
      case 'button':
        return (
          <div className="sc-row__trailing sc-row__trailing--button">
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

  const renderMainRow = () => (
    <div className="sc-row__main">
      <div className="sc-row__lhs">
        <p className="sc-row__title body-medium">{title}</p>
        <div className="sc-row__meta">
          <span className="sc-row__qty">
            <span className="sc-row__qty-icon" aria-hidden>
              <Icon name={quantityIconName} size={12} />
            </span>
            <span className="sc-row__qty-value subtext-regular">{quantity}</span>
          </span>
          <span className="sc-row__dot subtext-regular" aria-hidden>
            •
          </span>
          <span className="sc-row__avg subtext-regular">{avgPriceLabel}</span>
        </div>
      </div>

      {showTrailing ? (
        <div className="sc-row__rhs-group">
          <div className="sc-row__rhs">
            <p className="sc-row__price body-regular">{price}</p>
            <p className={`sc-row__change subtext-regular sc-row__change--${changeSentiment}`}>
              {formatChangeLabelForSentiment(changeLabel, changeSentiment)}
            </p>
          </div>
          {renderTrailingBlock()}
        </div>
      ) : (
        <div className="sc-row__rhs">
          <p className="sc-row__price body-regular">{price}</p>
          <p className={`sc-row__change subtext-regular sc-row__change--${changeSentiment}`}>
            {formatChangeLabelForSentiment(changeLabel, changeSentiment)}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className={root}>
      <div className="sc-row__inner">
        {statusLabel ? (
          <div className="sc-row__tags">
            <Badge
              type="text"
              context={badgeTone === 'primary' ? 'primary' : 'notice'}
              muted
              label={statusLabel}
            />
          </div>
        ) : null}

        {showLeading ? (
          <div className="sc-row__body">
            {renderLeadingAvatar()}
            {renderMainRow()}
          </div>
        ) : (
          renderMainRow()
        )}

        {isMtf ? (
          <div className="sc-row__margin-footer">
            <div className="sc-row__margin-footer-lead">
              <span className="sc-row__margin-footer-icon" aria-hidden>
                <Icon name={marginFooterIconName} size={24} />
              </span>
              <span className="sc-row__margin-footer-label subtext-medium">{marginFooterLabel}</span>
            </div>
            <div className="sc-row__margin-footer-value">
              <span
                className={`sc-row__margin-footer-pct subtext-medium sc-row__margin-footer-pct--${marginSentiment}`}
              >
                {formatChangeLabelForSentiment(marginReturnLabel, marginSentiment)}
              </span>
              <span className="sc-row__margin-footer-mult subtext-medium">{marginMultiplierLabel}</span>
            </div>
          </div>
        ) : null}
      </div>

      {showSeparator ? <div className="sc-row__separator" /> : null}
    </div>
  );
};
