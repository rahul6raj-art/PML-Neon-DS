import { Badge } from '../Badge';
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
export type ListItemVariant = 'default' | 'stocks-card' | 'stocks-card-mtf';
export type ListItemStocksChangeSentiment = 'positive' | 'negative' | 'neutral';

/** Leading +/- on the change line matches **sentiment** (negative → minus, positive → plus). */
function formatStocksChangeLabelForSentiment(
  label: string,
  sentiment: ListItemStocksChangeSentiment,
): string {
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

export type ListItemStocksStatusBadgeTone = 'notice' | 'primary';

export interface ListItemProps {
  /** Row layout. `stocks-card` / `stocks-card-mtf` match **Stocks Card** (MTF adds margin footer). */
  variant?: ListItemVariant;
  emphasis?: ListItemEmphasis;

  /* ── Stocks card row (when variant === 'stocks-card' | 'stocks-card-mtf') ── */
  /** Company / stock name */
  stocksTitle?: string;
  /** Top status pill (e.g. Pledge, MTF). Omit to hide the tag row. */
  stocksStatusLabel?: string;
  /** Badge colour: **notice** (e.g. Pledge) vs **primary** (e.g. MTF). Defaults by variant. */
  stocksStatusBadgeTone?: ListItemStocksStatusBadgeTone;
  /** Quantity shown next to the holdings icon */
  stocksQuantity?: string;
  /** Second line left segment, e.g. `Avg: ₹330` */
  stocksAvgPriceLabel?: string;
  /** Primary price, e.g. `₹340.40` */
  stocksPrice?: string;
  /** Move + %, e.g. `+2.20 (0.65%)`. Leading sign is normalized from **stocksChangeSentiment**. */
  stocksChangeLabel?: string;
  /** Colours the change line */
  stocksChangeSentiment?: ListItemStocksChangeSentiment;
  /** Icon for quantity (defaults to handbag per design) */
  stocksQuantityIconName?: string;

  /* ── MTF margin footer (variant === 'stocks-card-mtf' only) ── */
  /** Left label in the footer strip */
  stocksMarginFooterLabel?: string;
  /** Return % segment; sign follows **stocksMarginReturnSentiment** (fallback: stocksChangeSentiment). */
  stocksMarginReturnLabel?: string;
  /** Multiplier in primary blue, e.g. `(4x)` */
  stocksMarginMultiplierLabel?: string;
  /** Leading icon in the footer (24px) */
  stocksMarginFooterIconName?: string;
  /** Colours the return % line (defaults to **stocksChangeSentiment**) */
  stocksMarginReturnSentiment?: ListItemStocksChangeSentiment;

  /* ── Leading (Avatar) ────────────────────────── */
  /** Stocks-card variants: leading is **off** unless **`true`** (explicit). Default list row defaults to **true**. */
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
  /** Stocks-card variants: trailing is **off** unless **`true`** (explicit). Default list row defaults to **true**. */
  showTrailing?: boolean;
  /** For **stocks-card** / **stocks-card-mtf**, **`icon`** (chevron) is not rendered — use text / link / button if you need a trailing action. */
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
  variant = 'default',
  emphasis = 'high',

  stocksTitle = 'Reliance Industries Ltd.',
  stocksStatusLabel,
  stocksQuantity = '12',
  stocksAvgPriceLabel = 'Avg: ₹330',
  stocksPrice = '₹340.40',
  stocksChangeLabel = '+2.20 (0.65%)',
  stocksChangeSentiment = 'positive',
  stocksQuantityIconName = 'handbag_outline',

  stocksStatusBadgeTone,
  stocksMarginFooterLabel = 'Return on margin',
  stocksMarginReturnLabel = '+296.4%',
  stocksMarginMultiplierLabel = '(4x)',
  stocksMarginFooterIconName = 'chart',
  stocksMarginReturnSentiment,

  showLeading,
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

  showTrailing,
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
  const isStocksVariant = variant === 'stocks-card' || variant === 'stocks-card-mtf';
  const isMtfStocksVariant = variant === 'stocks-card-mtf';

  /** Default list rows show leading avatar; stocks-card rows hide leading unless **showLeading={true}**. */
  const resolvedShowLeading = isStocksVariant
    ? showLeading === true
    : showLeading ?? true;

  /** Default list rows show trailing; stocks-card rows hide trailing unless **showTrailing={true}**. */
  const resolvedShowTrailing = isStocksVariant
    ? showTrailing === true
    : showTrailing ?? true;

  const renderLeadingAvatar = () => (
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
  );

  const renderTrailingBlock = () => {
    if (!resolvedShowTrailing) return null;

    switch (trailing) {
      case 'icon':
        if (isStocksVariant) return null;
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

  if (isStocksVariant) {
    const badgeTone =
      stocksStatusBadgeTone ?? (isMtfStocksVariant ? 'primary' : 'notice');
    const marginReturnSentiment =
      stocksMarginReturnSentiment ?? stocksChangeSentiment;

    const stocksRoot = [
      'li-item',
      'li-item--stocks-card',
      isMtfStocksVariant && 'li-item--stocks-card-mtf',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const renderStocksMainRow = () => (
      <div className="li-item__stocks-row">
        <div className="li-item__stocks-lhs">
          <p className="li-item__stocks-title body-medium">{stocksTitle}</p>
          <div className="li-item__stocks-meta">
            <span className="li-item__stocks-qty">
              <span className="li-item__stocks-qty-icon" aria-hidden>
                <Icon name={stocksQuantityIconName} size={12} />
              </span>
              <span className="li-item__stocks-qty-value subtext-regular">{stocksQuantity}</span>
            </span>
            <span className="li-item__stocks-dot subtext-regular" aria-hidden>
              •
            </span>
            <span className="li-item__stocks-avg subtext-regular">{stocksAvgPriceLabel}</span>
          </div>
        </div>

        {resolvedShowTrailing ? (
          <div className="li-item__stocks-rhs-group">
            <div className="li-item__stocks-rhs">
              <p className="li-item__stocks-price body-regular">{stocksPrice}</p>
              <p
                className={`li-item__stocks-change subtext-regular li-item__stocks-change--${stocksChangeSentiment}`}
              >
                {formatStocksChangeLabelForSentiment(
                  stocksChangeLabel,
                  stocksChangeSentiment,
                )}
              </p>
            </div>
            {renderTrailingBlock()}
          </div>
        ) : (
          <div className="li-item__stocks-rhs">
            <p className="li-item__stocks-price body-regular">{stocksPrice}</p>
            <p
              className={`li-item__stocks-change subtext-regular li-item__stocks-change--${stocksChangeSentiment}`}
            >
              {formatStocksChangeLabelForSentiment(
                stocksChangeLabel,
                stocksChangeSentiment,
              )}
            </p>
          </div>
        )}
      </div>
    );

    return (
      <div
        className={stocksRoot}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        <div className="li-item__stocks-inner">
          {stocksStatusLabel ? (
            <div className="li-item__stocks-tags">
              <Badge
                type="text"
                context={badgeTone === 'primary' ? 'primary' : 'notice'}
                muted
                label={stocksStatusLabel}
              />
            </div>
          ) : null}

          {resolvedShowLeading ? (
            <div className="li-item__stocks-body">
              {renderLeadingAvatar()}
              {renderStocksMainRow()}
            </div>
          ) : (
            renderStocksMainRow()
          )}

          {isMtfStocksVariant ? (
            <div className="li-item__stocks-margin-footer">
              <div className="li-item__stocks-margin-footer-lead">
                <span className="li-item__stocks-margin-footer-icon" aria-hidden>
                  <Icon name={stocksMarginFooterIconName} size={24} />
                </span>
                <span className="li-item__stocks-margin-footer-label subtext-medium">
                  {stocksMarginFooterLabel}
                </span>
              </div>
              <div className="li-item__stocks-margin-footer-value">
                <span
                  className={`li-item__stocks-margin-footer-pct subtext-medium li-item__stocks-margin-footer-pct--${marginReturnSentiment}`}
                >
                  {formatStocksChangeLabelForSentiment(
                    stocksMarginReturnLabel,
                    marginReturnSentiment,
                  )}
                </span>
                <span className="li-item__stocks-margin-footer-mult subtext-medium">
                  {stocksMarginMultiplierLabel}
                </span>
              </div>
            </div>
          ) : null}
        </div>

        {showSeparator && <div className="li-item__separator" />}
      </div>
    );
  }

  const wrapperCls = [
    'li-item',
    `li-item--${emphasis}`,
    resolvedShowLeading && 'li-item--with-leading',
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

  return (
    <div
      className={wrapperCls}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Leading avatar */}
      {resolvedShowLeading && renderLeadingAvatar()}

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

          {renderTrailingBlock()}
        </div>
      </div>

      {showSeparator && (
        <div className={`li-item__separator ${resolvedShowLeading ? 'li-item__separator--inset' : ''}`} />
      )}
    </div>
  );
};
