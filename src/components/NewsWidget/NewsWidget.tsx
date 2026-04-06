import { Badge } from '../Badge';
import type { BadgeContext } from '../Badge/Badge';
import { Icon } from '../Icon';
import { SectionHeader, type SectionHeaderSize } from '../SectionHeader';
import './NewsWidget.css';

/** Badge tone for a news chip (subset of `BadgeContext`). */
export type NewsWidgetBadgeContext = 'positive' | 'negative' | 'notice' | 'default';

export interface NewsWidgetItem {
  title: string;
  badges: { label: string; context: NewsWidgetBadgeContext }[];
  body: string;
  time: string;
}

export interface NewsWidgetProps {
  /** Section title (e.g. `Stocks in the News`). */
  title?: string;
  /** Show `SectionHeader` above the horizontal scroller. */
  showSectionHeader?: boolean;
  /** Passed to `SectionHeader` when the header is shown. */
  sectionHeaderSize?: SectionHeaderSize;
  /** Chevron next to the section title. */
  showChevron?: boolean;
  /** News cards (horizontal scroll). */
  items: NewsWidgetItem[];
  /** When false, badge chips are hidden on every card (data in `items[].badges` is ignored for display). */
  showBadges?: boolean;
  className?: string;
  /** Fires when a card’s trailing chevron is pressed. */
  onCardAction?: (index: number) => void;
}

/** Default demo data — matches Stock Home “Stocks in the News”. */
export const NEWS_WIDGET_DEMO_ITEMS: NewsWidgetItem[] = [
  {
    title: 'Zomato Profit Surge',
    badges: [{ label: 'Bullish', context: 'positive' }],
    body: 'Q3 profits jumped 200%. Analysts may upgrade the stock',
    time: '25 Jan, 10:12 AM',
  },
  {
    title: 'Tata Motors',
    badges: [
      { label: 'Bullish', context: 'positive' },
      { label: 'Volume Breakout', context: 'notice' },
    ],
    body: 'Price crossed ₹980 with 1.8× higher than usual trading volume.',
    time: '25 Jan, 10:12 AM',
  },
];

/**
 * Horizontal **news** strip: section header + scrollable cards (badges, title, body, time).
 * Used on Stock Home; styles use tokens (`--surface-*`, `--card-padding-*`, etc.).
 */
export const NewsWidget = ({
  title = 'Stocks in the News',
  showSectionHeader = true,
  sectionHeaderSize = 'large',
  showChevron = true,
  items,
  showBadges = true,
  className,
  onCardAction,
}: NewsWidgetProps) => {
  const rootCls = ['nw', className].filter(Boolean).join(' ');

  return (
    <div className={rootCls}>
      {showSectionHeader && (
        <SectionHeader
          size={sectionHeaderSize}
          title={title}
          showChevron={showChevron}
          trailing="none"
          showSubtext={false}
        />
      )}
      <div className="nw__scroll">
        {items.map((news, i) => (
          <article className="nw__card" key={`${news.title}-${i}`}>
            <div className="nw__card-top">
              <div className="nw__card-head">
                {showBadges && news.badges.length > 0 && (
                  <div className="nw__card-badges">
                    {news.badges.map((b, j) => (
                      <Badge
                        key={`${b.label}-${j}`}
                        type="text"
                        context={b.context as BadgeContext}
                        label={b.label}
                        muted
                      />
                    ))}
                  </div>
                )}
                <h3 className="nw__card-title">{news.title}</h3>
              </div>
              <button
                type="button"
                className="nw__card-chevron"
                aria-label={`Open ${news.title}`}
                onClick={() => onCardAction?.(i)}
              >
                <Icon name="caret_small_right_main" size={24} />
              </button>
            </div>
            <hr className="nw__card-divider" />
            <p className="nw__card-body">{news.body}</p>
            <p className="nw__card-time">{news.time}</p>
          </article>
        ))}
      </div>
    </div>
  );
};
