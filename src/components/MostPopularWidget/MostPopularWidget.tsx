import { useCallback, useMemo, useState, type KeyboardEvent } from 'react';
import { Card } from '../Card';
import { Chip } from '../Chip';
import { SectionHeader } from '../SectionHeader';
import {
  POPULAR_MOCK_BY_SEGMENT,
  POPULAR_SEGMENT_LABELS,
  type PopularListItem,
  type PopularSegment,
} from './mostPopularMockData';
import './MostPopularWidget.css';

export interface MostPopularWidgetProps {
  title?: string;
  showHeader?: boolean;
  /** Makes the title row keyboard-activable (e.g. navigate to full list). */
  onTitleClick?: () => void;
  /** Controlled segment */
  segment?: PopularSegment;
  onSegmentChange?: (s: PopularSegment) => void;
  /** Override list data (e.g. from API) */
  itemsBySegment?: Record<PopularSegment, PopularListItem[]>;
  onRowClick?: (item: PopularListItem, segment: PopularSegment) => void;
  className?: string;
}

function formatChg(pct: number) {
  const up = pct >= 0;
  return `${up ? '+' : ''}${pct.toFixed(2)}%`;
}

export function MostPopularWidget({
  title = 'Most popular',
  showHeader = true,
  onTitleClick,
  segment: controlledSegment,
  onSegmentChange,
  itemsBySegment = POPULAR_MOCK_BY_SEGMENT,
  onRowClick,
  className,
}: MostPopularWidgetProps) {
  const [internalSeg, setInternalSeg] = useState<PopularSegment>('stocks');
  const segment = controlledSegment ?? internalSeg;

  const setSeg = (s: PopularSegment) => {
    onSegmentChange?.(s);
    if (controlledSegment === undefined) setInternalSeg(s);
  };

  const rows = useMemo(
    () => itemsBySegment[segment] ?? [],
    [itemsBySegment, segment],
  );

  const handleTitleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!onTitleClick) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onTitleClick();
      }
    },
    [onTitleClick],
  );

  const rootCls = ['mpw', className].filter(Boolean).join(' ');

  const sectionHeader = (
    <SectionHeader
      size="large"
      title={title}
      showChevron
      trailing="none"
      showSubtext={false}
      className="mpw__section-header"
    />
  );

  return (
    <section className={rootCls} aria-label={title}>
      {showHeader &&
        (onTitleClick ? (
          <div
            className="mpw__section-header-wrap"
            role="button"
            tabIndex={0}
            onClick={onTitleClick}
            onKeyDown={handleTitleKeyDown}
            aria-label={`${title}, view details`}
          >
            {sectionHeader}
          </div>
        ) : (
          sectionHeader
        ))}

      <div className="mpw__filters" role="group" aria-label="Instrument type">
        {POPULAR_SEGMENT_LABELS.map(({ key, label }) => (
          <Chip
            key={key}
            size="large"
            type={segment === key ? 'selected' : 'default'}
            label={label}
            onPress={() => setSeg(key)}
          />
        ))}
      </div>

      <Card className="mpw__card">
        <ul className="mpw__list">
          {rows.map((item) => {
            const up = item.changePct >= 0;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className="mpw__row"
                  onClick={() => onRowClick?.(item, segment)}
                >
                  <div className="mpw__main">
                    <div className="mpw__title">{item.title}</div>
                    <div className="mpw__sub">{item.subtitle}</div>
                  </div>
                  <div className="mpw__rhs">
                    <div className="mpw__ltp">{item.ltp}</div>
                    <div
                      className={[
                        'mpw__chg',
                        up ? 'mpw__chg--up' : 'mpw__chg--down',
                      ].join(' ')}
                    >
                      {formatChg(item.changePct)}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </Card>
    </section>
  );
}
