import { Card } from '../Card';
import { ListItem } from '../ListItem';
import { Loading } from '../Loading';
import {
  SectionHeader,
  type SectionHeaderSize,
  type SectionHeaderTrailing,
} from '../SectionHeader';
import './AllocationBreakdownWidget.css';

export type AllocationBreakdownTrend = 'positive' | 'negative' | 'neutral';

export interface AllocationBreakdownRow {
  label: string;
  valueLabel: string;
  /** Portion 0–100; drives bar width */
  percent: number;
  trend?: AllocationBreakdownTrend;
}

export interface AllocationBreakdownWidgetProps {
  title?: string;
  showSectionHeader?: boolean;
  sectionHeaderSize?: SectionHeaderSize;
  showChevron?: boolean;
  trailing?: SectionHeaderTrailing;
  linkText?: string;
  onLinkPress?: () => void;
  buttonLabel?: string;
  onButtonPress?: () => void;
  rows?: AllocationBreakdownRow[];
  showRowTrend?: boolean;
  emptyMessage?: string;
  loading?: boolean;
  onRowClick?: (row: AllocationBreakdownRow, index: number) => void;
  className?: string;
}

export const AllocationBreakdownWidget = ({
  title = 'Allocation',
  showSectionHeader = true,
  sectionHeaderSize = 'extra-large',
  showChevron = true,
  trailing = 'none',
  linkText,
  onLinkPress,
  buttonLabel,
  onButtonPress,
  rows = [],
  emptyMessage = 'No allocation data yet.',
  loading = false,
  onRowClick,
  className,
}: AllocationBreakdownWidgetProps) => {
  const rootCls = ['abw', className].filter(Boolean).join(' ');

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

      <div className="abw__body">
        {loading ? (
          <div className="abw__loading" role="status" aria-live="polite">
            <Loading type="theme" label="Loading allocation" />
          </div>
        ) : rows.length === 0 ? (
          <p className="abw__empty">{emptyMessage}</p>
        ) : (
          <Card>
            <div className="abw__rows">
              {rows.map((row, index) => (
                <div key={`${row.label}-${index}`} className="abw__row">
                  <ListItem
                    variant="default"
                    emphasis="low"
                    showLeading={false}
                    primaryText={row.label}
                    secondaryText={row.valueLabel}
                    showSubtext
                    showSecondaryText
                    showTrailing
                    trailing="text"
                    trailingText={`${row.percent}%`}
                    showSeparator={false}
                    onClick={onRowClick ? () => onRowClick(row, index) : undefined}
                  />
                  <div className="abw__track" aria-hidden>
                    <div
                      className="abw__fill"
                      style={{ width: `${Math.min(100, Math.max(0, row.percent))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
