import { Button } from '../Button';
import { Card } from '../Card';
import { Loading } from '../Loading';
import {
  SectionHeader,
  type SectionHeaderSize,
  type SectionHeaderTrailing,
} from '../SectionHeader';
import { StocksCard, type StocksCardProps } from '../StocksCard';
import './HoldingsSectionWidget.css';

export interface HoldingsSectionWidgetProps {
  title?: string;
  showSectionHeader?: boolean;
  sectionHeaderSize?: SectionHeaderSize;
  showChevron?: boolean;
  trailing?: SectionHeaderTrailing;
  linkText?: string;
  onLinkPress?: () => void;
  buttonLabel?: string;
  onButtonPress?: () => void;
  items?: StocksCardProps[];
  loading?: boolean;
  emptyMessage?: string;
  emptyCtaLabel?: string;
  onEmptyCtaClick?: () => void;
  className?: string;
}

export const HoldingsSectionWidget = ({
  title = 'Top holdings',
  showSectionHeader = true,
  sectionHeaderSize = 'large',
  showChevron = true,
  trailing = 'none',
  linkText,
  onLinkPress,
  buttonLabel,
  onButtonPress,
  items = [],
  loading = false,
  emptyMessage = 'You don’t have any holdings in this list yet.',
  emptyCtaLabel,
  onEmptyCtaClick,
  className,
}: HoldingsSectionWidgetProps) => {
  const rootCls = ['hsw', className].filter(Boolean).join(' ');
  const showEmptyCta = Boolean(emptyCtaLabel?.trim() && onEmptyCtaClick);

  const body = (() => {
    if (loading) {
      return (
        <div className="hsw__loading" role="status" aria-live="polite">
          <Loading type="theme" label="Loading holdings" />
        </div>
      );
    }
    if (items.length === 0) {
      return (
        <Card>
          <div className="hsw__empty">
            <p className="hsw__empty-copy">{emptyMessage}</p>
            {showEmptyCta && (
              <Button
                variant="filled"
                size="medium"
                label={emptyCtaLabel!}
                onClick={onEmptyCtaClick}
              />
            )}
          </div>
        </Card>
      );
    }
    return (
      <div className="hsw__stack">
        {items.map((row) => (
          <StocksCard key={row.title} {...row} />
        ))}
      </div>
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
      <div className="hsw__body">{body}</div>
    </div>
  );
};
