import { SectionHeader, type SectionHeaderSize } from '../SectionHeader';
import { Card } from '../Card';
import { ListItem, type ListItemValueType } from '../ListItem';
import { Button, type ButtonType, type ButtonSize } from '../Button';
import type { LogoCategory } from '../Logo/Logo';
import './ReminderWidget.css';

export type ReminderVariant = 'single' | 'carousel';

export interface ReminderItem {
  /** Show leading avatar / logo */
  showLeading?: boolean;
  /** Show trailing icon (close) */
  showTrailing?: boolean;
  /** Company / stock name */
  name?: string;
  /** Price text (ListItem secondaryText) */
  price?: string;
  /** Change value text (e.g. "(-0.30%)") */
  change?: string;
  /** Positive (green) or negative (red) */
  changeType?: ListItemValueType;
  /** Bottom CTA text */
  ctaText?: string;
  /** CTA button label */
  ctaLabel?: string;
  /** CTA button variant */
  ctaVariant?: ButtonType;
  /** CTA button size */
  ctaSize?: ButtonSize;
  /** Avatar logo name (from Logo component) */
  logoName?: string;
  /** Avatar logo category */
  logoCategory?: LogoCategory;
  /** Close callback */
  onClose?: () => void;
  /** CTA button callback */
  onCtaClick?: () => void;
}

export interface ReminderWidgetProps {
  /** Single full-width card vs horizontally scrollable carousel */
  variant?: ReminderVariant;
  /** Show section header */
  showHeader?: boolean;
  /** Section header title */
  headerTitle?: string;
  /** Section header size */
  headerSize?: SectionHeaderSize;
  /** Show chevron next to title */
  headerChevron?: boolean;
  /** Show subtext below title */
  headerShowSubtext?: boolean;
  /** Subtext content */
  headerSubtext?: string;
  /** Title click handler */
  onTitleClick?: () => void;
  /** Reminder items */
  items?: ReminderItem[];
  className?: string;
}

const defaultItems: ReminderItem[] = [
  {
    name: 'Reliance Industries',
    price: '92.50',
    change: '(0.30%)',
    changeType: 'negative',
    ctaText: 'Complete your order',
    ctaLabel: 'Buy',
    logoCategory: 'stocks',
    logoName: 'Reliance Industries',
  },
];

function ReminderCard({
  item,
  variant,
}: {
  item: ReminderItem;
  variant: ReminderVariant;
}) {
  const {
    showLeading = true,
    showTrailing = true,
    name = 'Reliance Industries',
    price = '92.50',
    change = '(0.30%)',
    changeType = 'negative',
    ctaText = 'Complete your order',
    ctaLabel = 'Buy',
    ctaVariant = 'filled',
    ctaSize = 'small',
    logoName,
    logoCategory = 'stocks',
    onClose,
    onCtaClick,
  } = item;

  const cardCls = variant === 'carousel' ? 'rw__card--carousel' : 'rw__card--single';

  return (
    <Card className={cardCls}>
      <div className="rw__card-inner">
        <ListItem
          emphasis="low"
          showLeading={showLeading}
          avatarType="logo"
          avatarLogoName={logoName}
          avatarLogoCategory={logoCategory}
          showPrimaryText={true}
          primaryText={name}
          showSubtext={true}
          showSecondaryText={true}
          secondaryText={price}
          showValueText={true}
          valueText={change}
          valueType={changeType}
          showTrailing={showTrailing}
          trailing="icon"
          trailingIcon="cross"
          showSeparator={false}
          onClick={onClose}
          className="rw__list-item"
        />

        <div className="rw__divider" />

        <div className="rw__footer">
          <p className="rw__cta-text">{ctaText}</p>
          <Button
            variant={ctaVariant}
            size={ctaSize}
            label={ctaLabel}
            onClick={onCtaClick}
          />
        </div>
      </div>
    </Card>
  );
}

export const ReminderWidget = ({
  variant = 'single',
  showHeader = true,
  headerTitle = 'Pickup where you left',
  headerSize = 'extra-large',
  headerChevron = true,
  headerShowSubtext = false,
  headerSubtext = '',
  onTitleClick,
  items = defaultItems,
  className,
}: ReminderWidgetProps) => {
  void onTitleClick;
  const cls = ['rw', `rw--${variant}`, !showHeader && 'rw--no-header', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cls}>
      {showHeader && (
        <SectionHeader
          size={headerSize}
          title={headerTitle}
          showChevron={headerChevron}
          showSubtext={headerShowSubtext}
          subtext={headerSubtext}
          trailing="none"
          showChips={false}
          className="rw__section-header"
        />
      )}

      <div className="rw__cards">
        {items.map((item, i) => (
          <ReminderCard key={i} item={item} variant={variant} />
        ))}
      </div>
    </div>
  );
};
