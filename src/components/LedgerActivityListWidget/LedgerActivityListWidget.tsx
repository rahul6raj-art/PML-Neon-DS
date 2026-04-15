import { Card } from '../Card';
import { ListItem } from '../ListItem';
import { Loading } from '../Loading';
import {
  SectionHeader,
  type SectionHeaderSize,
  type SectionHeaderTrailing,
} from '../SectionHeader';
import './LedgerActivityListWidget.css';

export interface LedgerActivityItem {
  primaryText: string;
  secondaryText: string;
  trailingText: string;
  /** Reserved for future per-row badge; not rendered yet */
  statusLabel?: string;
}

export interface LedgerActivityListWidgetProps {
  title?: string;
  showSectionHeader?: boolean;
  sectionHeaderSize?: SectionHeaderSize;
  showChevron?: boolean;
  trailing?: SectionHeaderTrailing;
  linkText?: string;
  onLinkPress?: () => void;
  buttonLabel?: string;
  onButtonPress?: () => void;
  items?: LedgerActivityItem[];
  loading?: boolean;
  emptyMessage?: string;
  /** When set (non-empty), shows plain copy instead of the Card (e.g. partial fetch failure) */
  unavailableMessage?: string;
  onItemClick?: (item: LedgerActivityItem, index: number) => void;
  className?: string;
}

export const LedgerActivityListWidget = ({
  title = 'Recent activity',
  showSectionHeader = true,
  sectionHeaderSize = 'extra-large',
  showChevron = true,
  trailing = 'none',
  linkText,
  onLinkPress,
  buttonLabel,
  onButtonPress,
  items = [],
  loading = false,
  emptyMessage = 'No recent activity yet.',
  unavailableMessage,
  onItemClick,
  className,
}: LedgerActivityListWidgetProps) => {
  const rootCls = ['lalw', className].filter(Boolean).join(' ');
  const showUnavailable = Boolean(unavailableMessage?.trim());

  const body = (() => {
    if (loading) {
      return (
        <div className="lalw__loading" role="status" aria-live="polite">
          <Loading type="theme" label="Loading activity" />
        </div>
      );
    }
    if (showUnavailable) {
      return <p className="lalw__unavailable">{unavailableMessage}</p>;
    }
    if (items.length === 0) {
      return <p className="lalw__empty">{emptyMessage}</p>;
    }
    return (
      <Card>
        <div className="lalw__rows">
          {items.map((row, i) => (
            <ListItem
              key={`${row.primaryText}-${i}`}
              variant="default"
              showLeading={false}
              primaryText={row.primaryText}
              secondaryText={row.secondaryText}
              showSubtext
              showSecondaryText
              showTrailing
              trailing="text"
              trailingText={row.trailingText}
              showSeparator={i < items.length - 1}
              onClick={onItemClick ? () => onItemClick(row, i) : undefined}
            />
          ))}
        </div>
      </Card>
    );
  })();

  return (
    <div className={rootCls}>
      {showSectionHeader && (
        <SectionHeader
          size={sectionHeaderSize}
          title={title}
          trailing={trailing}
          showSubtext={false}
          showChevron={showChevron}
          linkText={linkText}
          onLinkPress={onLinkPress}
          buttonLabel={buttonLabel}
          onButtonPress={onButtonPress}
        />
      )}
      <div className="lalw__body">{body}</div>
    </div>
  );
};
