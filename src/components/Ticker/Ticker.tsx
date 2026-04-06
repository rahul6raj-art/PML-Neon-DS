import { Badge } from '../Badge';
import './Ticker.css';

/**
 * One pill in the strip — **expiry is configured per item** (no global ticker prop).
 * Set `expiryLabel` only on rows that should show the badge.
 */
export interface TickerItem {
  name: string;
  price: string;
  change: string;
  percent: string;
  /** Drives muted positive vs negative **Badge** for `change` + `percent`. */
  positive: boolean;
  /**
   * When set to a non-empty string (after trim), shows a muted notice **Badge**
   * inline at the front of **this** pill only. Omit or leave empty on other rows.
   */
  expiryLabel?: string;
}

export interface TickerProps {
  /**
   * One object per pill, left-to-right. Each row’s optional `expiryLabel` is independent
   * (e.g. NIFTY with badge, NIFTYBANK without).
   */
  items: TickerItem[];
  /** Stock Home: `margin-top: var(--spacing-32)`. Default true. */
  topMargin?: boolean;
  className?: string;
}

/** Default strip — matches Stock Home demo (no expiry badges). */
export const TICKER_WIDGET_DEFAULT_ITEMS: TickerItem[] = [
  { name: 'NIFTY50', price: '25,155.50', change: '+70.15', percent: '(0.33%)', positive: true },
  { name: 'NIFTYBANK', price: '58,323.5', change: '-625.15', percent: '(1.91%)', positive: false },
  { name: 'SENSEX', price: '81,923.5', change: '-225.15', percent: '(0.31%)', positive: false },
];

/** Every row includes an expiry label (all pills show the badge). */
export const TICKER_WIDGET_EXPIRY_ITEMS: TickerItem[] = [
  {
    name: 'NIFTY50',
    price: '25,155.50',
    change: '+70.15',
    percent: '(0.33%)',
    positive: true,
    expiryLabel: 'Expiry · 25 Jan',
  },
  {
    name: 'NIFTYBANK',
    price: '58,323.5',
    change: '-625.15',
    percent: '(1.91%)',
    positive: false,
    expiryLabel: 'Expiry · 28 Jan',
  },
  {
    name: 'SENSEX',
    price: '81,923.5',
    change: '-225.15',
    percent: '(0.31%)',
    positive: false,
    expiryLabel: 'Expiry · 30 Jan',
  },
];

/** Only some rows show expiry — e.g. NIFTY50 with badge, NIFTYBANK and SENSEX without. */
export const TICKER_WIDGET_MIXED_EXPIRY_ITEMS: TickerItem[] = [
  {
    name: 'NIFTY50',
    price: '25,155.50',
    change: '+70.15',
    percent: '(0.33%)',
    positive: true,
    expiryLabel: 'Expiry · 25 Jan',
  },
  {
    name: 'NIFTYBANK',
    price: '58,323.5',
    change: '-625.15',
    percent: '(1.91%)',
    positive: false,
  },
  {
    name: 'SENSEX',
    price: '81,923.5',
    change: '-225.15',
    percent: '(0.31%)',
    positive: false,
  },
];

/**
 * Horizontal scrolling index strip: name, price, move + % as **Badge** (Stock Home ticker).
 * Optional **per-item** `expiryLabel` adds a muted notice badge inline at the front of that pill only.
 */
export const Ticker = ({ items, topMargin = true, className }: TickerProps) => {
  const rootCls = ['tk', topMargin && 'tk--top-margin', className].filter(Boolean).join(' ');

  return (
    <div className={rootCls} role="list">
      {items.map((t, i) => {
        const expiryText = t.expiryLabel?.trim();
        const hasExpiryBadge = Boolean(expiryText);

        const deltaLabel = `${t.change} ${t.percent}`;
        const namePriceDelta = (
          <>
            <span className="tk__name">{t.name}</span>
            <div className="tk__values">
              <span className="tk__price">{t.price}</span>
              <div className="tk__change">
                <Badge
                  type="text"
                  context={t.positive ? 'positive' : 'negative'}
                  muted
                  label={deltaLabel}
                />
              </div>
            </div>
          </>
        );

        return (
          <div
            className={hasExpiryBadge ? 'tk__item tk__item--expiry' : 'tk__item'}
            key={`${t.name}-${i}`}
            role="listitem"
          >
            {hasExpiryBadge ? (
              <>
                <div className="tk__expiry">
                  <Badge type="text" context="notice" muted label={expiryText!} />
                </div>
                <div className="tk__item-main">{namePriceDelta}</div>
              </>
            ) : (
              namePriceDelta
            )}
          </div>
        );
      })}
    </div>
  );
};
