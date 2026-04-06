import { Card } from '../Card';
import { ListItem } from '../ListItem';
import type {
  ListItemStocksChangeSentiment,
  ListItemStocksStatusBadgeTone,
  ListItemTrailing,
} from '../ListItem';
import type { AvatarType, AvatarSize, AvatarIcon } from '../Avatar';
import type { ButtonType, ButtonSize } from '../Button';
import type { LogoCategory } from '../Logo';
import './StocksCard.css';

export type StocksCardChangeSentiment = ListItemStocksChangeSentiment;
export type StocksCardLayout = 'standard' | 'mtf';

export interface StocksCardProps {
  /** **standard** = holdings row only. **mtf** = MTF tag + row + return-on-margin footer. */
  layout?: StocksCardLayout;
  /** Top status pill (e.g. Pledge, MTF). Omit to hide the tag row. */
  statusLabel?: string;
  /** **notice** (Pledge) vs **primary** (MTF). Defaults by **layout**. */
  statusBadgeTone?: ListItemStocksStatusBadgeTone;
  /** Company / stock name */
  title: string;
  /** Quantity shown next to the holdings icon */
  quantity: string;
  /** Second line left segment, e.g. `Avg: ₹330` (no space after ₹ per product rule) */
  avgPriceLabel: string;
  /** Primary price, e.g. `₹340.40` */
  price: string;
  /** Move + %, e.g. `+2.20 (0.65%)` */
  changeLabel: string;
  /** Colours the change line */
  changeSentiment?: StocksCardChangeSentiment;
  /** Icon for quantity (defaults to handbag per design) */
  quantityIconName?: string;
  /** MTF footer — left label */
  marginFooterLabel?: string;
  /** MTF footer — return % (sign follows **marginReturnSentiment**, fallback **changeSentiment**) */
  marginReturnLabel?: string;
  /** MTF footer — multiplier in primary blue */
  marginMultiplierLabel?: string;
  /** MTF footer — leading icon (24px) */
  marginFooterIconName?: string;
  /** Colours the MTF return % line */
  marginReturnSentiment?: StocksCardChangeSentiment;
  /** Same leading avatar as **ListItem**. Off by default on cards. */
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
  /** Same trailing slot as **ListItem** (text, link, button). Chevron **icon** is not used on holdings cards. Off by default. */
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
  onClick?: () => void;
  className?: string;
}

/**
 * Single-holding card: status tag, name, qty + avg, price + change.
 * **MTF** layout adds the margin footer strip. Row layout is **`ListItem`** (`stocks-card` / `stocks-card-mtf`) inside **`Card`**.
 */
export const StocksCard = ({
  layout = 'standard',
  statusBadgeTone,
  statusLabel,
  title,
  quantity,
  avgPriceLabel,
  price,
  changeLabel,
  changeSentiment = 'positive',
  quantityIconName = 'handbag_outline',
  marginFooterLabel = 'Return on margin',
  marginReturnLabel = '+296.4%',
  marginMultiplierLabel = '(4x)',
  marginFooterIconName = 'chart',
  marginReturnSentiment,
  showLeading = false,
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
  showTrailing = false,
  trailing,
  trailingIcon,
  trailingText,
  trailingLinkText,
  onTrailingLinkPress,
  trailingButtonLabel,
  trailingButtonVariant,
  trailingButtonSize,
  onTrailingButtonPress,
  onClick,
  className,
}: StocksCardProps) => {
  const root = ['stocks-card', className].filter(Boolean).join(' ');
  const isMtf = layout === 'mtf';

  const listVariant = isMtf ? 'stocks-card-mtf' : 'stocks-card';
  const resolvedBadgeTone =
    statusBadgeTone ?? (isMtf ? 'primary' : undefined);

  return (
    <Card stroke={false} onClick={onClick} className={root}>
      <ListItem
        variant={listVariant}
        showSeparator={false}
        stocksStatusBadgeTone={resolvedBadgeTone}
        stocksStatusLabel={statusLabel}
        stocksTitle={title}
        stocksQuantity={quantity}
        stocksAvgPriceLabel={avgPriceLabel}
        stocksPrice={price}
        stocksChangeLabel={changeLabel}
        stocksChangeSentiment={changeSentiment}
        stocksQuantityIconName={quantityIconName}
        stocksMarginFooterLabel={isMtf ? marginFooterLabel : undefined}
        stocksMarginReturnLabel={isMtf ? marginReturnLabel : undefined}
        stocksMarginMultiplierLabel={isMtf ? marginMultiplierLabel : undefined}
        stocksMarginFooterIconName={isMtf ? marginFooterIconName : undefined}
        stocksMarginReturnSentiment={isMtf ? marginReturnSentiment : undefined}
        showLeading={showLeading}
        avatarType={avatarType}
        avatarSize={avatarSize}
        avatarBadgeType={avatarBadgeType}
        avatarSelected={avatarSelected}
        avatarInitials={avatarInitials}
        avatarSrc={avatarSrc}
        avatarIconName={avatarIconName}
        avatarLogoName={avatarLogoName}
        avatarLogoCategory={avatarLogoCategory}
        avatarBadgeIcon={avatarBadgeIcon}
        showTrailing={showTrailing}
        trailing={trailing}
        trailingIcon={trailingIcon}
        trailingText={trailingText}
        trailingLinkText={trailingLinkText}
        onTrailingLinkPress={onTrailingLinkPress}
        trailingButtonLabel={trailingButtonLabel}
        trailingButtonVariant={trailingButtonVariant}
        trailingButtonSize={trailingButtonSize}
        onTrailingButtonPress={onTrailingButtonPress}
      />
    </Card>
  );
};
