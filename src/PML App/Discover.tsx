import { useMemo, useState } from 'react';
import { Badge } from '../components/Badge';
import { BottomNav, type BottomNavItem } from '../components/BottomNav';
import { Chip } from '../components/Chip';
import { BrandLogo, brandLogoThemeForAppColorScheme } from '../components/BrandLogo';
import { HeatmapWidget } from '../components/HeatmapWidget';
import { Header } from '../components/Header';
import { Icon } from '../components/Icon';
import { NewsWidget, NEWS_WIDGET_DEMO_ITEMS } from '../components/NewsWidget';
import { SectionHeader } from '../components/SectionHeader';
import type { TabItem } from '../components/Tab';
import { Ticker, type TickerItem } from '../components/Ticker';
import {
  DISCOVER_EXPERT_RECS,
  DISCOVER_INDEX_CHIPS,
  DISCOVER_MOVERS_FILTERS,
  DISCOVER_MOVERS_POPULAR,
  DISCOVER_SCREENERS,
  DISCOVER_STRATEGIES,
} from './discoverMockData';
import './Discover.css';

const PRIMARY_TABS: TabItem[] = [
  { value: 'discover', label: 'Discover' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'orders', label: 'Orders', showBadge: true, badgeContent: '2' },
  { value: 'watchlist', label: 'Watchlist', showBadge: true, badgeContent: '1' },
];

/** PRD: Home, Stocks, F&O, MF, More — Stocks active on this screen */
const DISCOVER_BOTTOM_NAV: BottomNavItem[] = [
  { icon: 'home_outline', label: 'Home' },
  { icon: 'chart', label: 'Stocks' },
  { icon: 'swap_outline', label: 'F&O' },
  { icon: 'handbag_outline', label: 'MF' },
  { icon: 'menu_dots_vertical_outline', label: 'More' },
];

export interface DiscoverPageProps {
  colorScheme?: 'light' | 'dark';
}

function formatIndexValue(n: number) {
  return n.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function DiscoverPage({ colorScheme = 'dark' }: DiscoverPageProps) {
  const [activePrimaryTab, setActivePrimaryTab] = useState('discover');
  const [moverFilterIndex, setMoverFilterIndex] = useState(0);
  const [bottomNavIndex, setBottomNavIndex] = useState(1);

  const headerIsDark = colorScheme === 'dark';
  const brandLogoTheme = brandLogoThemeForAppColorScheme(colorScheme);

  const movers = useMemo(() => {
    void moverFilterIndex;
    return DISCOVER_MOVERS_POPULAR;
  }, [moverFilterIndex]);

  const discoverTickerItems = useMemo((): TickerItem[] => {
    return DISCOVER_INDEX_CHIPS.map((ix) => {
      const positive = ix.changePct >= 0;
      const abs = ix.changeAbs;
      const change =
        abs >= 0 ? `+${abs.toFixed(2)}` : `-${Math.abs(abs).toFixed(2)}`;
      const percent = `(${ix.changePct >= 0 ? '+' : ''}${ix.changePct.toFixed(2)}%)`;
      return {
        name: ix.name,
        price: formatIndexValue(ix.value),
        change,
        percent,
        positive,
      };
    });
  }, []);

  return (
    <div className="discover">
      <div className="dv-content">
        <Header
          key={colorScheme}
          type="homepage"
          title="Stocks"
          brandLogoTheme={brandLogoTheme}
          showBrandLogo
          showGradient={false}
          statusBarTheme={headerIsDark ? 'dark' : 'light'}
          rhsIcons={['search_outline', 'bell_outline']}
          showTabs
          tabs={PRIMARY_TABS}
          activeTabValue={activePrimaryTab}
          onTabChange={(v) => setActivePrimaryTab(v)}
          tabSize="medium"
          className="discover__header"
        />

        <div className="discover-indices" role="region" aria-label="Market indices">
          <Ticker items={discoverTickerItems} topMargin={false} />
        </div>

        <p className="dv-market-status" role="status">
          Quotes shown are illustrative. Label delayed or last close per your data
          entitlements in production.
        </p>

        <div className="dv-section">
          <HeatmapWidget
            title="Heatmap"
            defaultWheelValue="Stocks"
            wheelItems={['Index', 'Stocks', 'F&O']}
            onTitleClick={() => {}}
            maxSectorCards={4}
          />
        </div>

        <div className="dv-section">
          <SectionHeader
            size="extra-large"
            title="Market Movers"
            showChevron
            trailing="none"
            showSubtext={false}
          />
          <div
            className="dv-mover-filters"
            role="toolbar"
            aria-label="Mover filters"
          >
            {DISCOVER_MOVERS_FILTERS.map((label, i) => (
              <Chip
                key={label}
                size="large"
                type={i === moverFilterIndex ? 'selected' : 'default'}
                label={label}
                onPress={() => setMoverFilterIndex(i)}
              />
            ))}
          </div>
          <div className="dv-mover-scroll" aria-label="Market movers">
            {movers.map((m) => {
              const up = m.changePct >= 0;
              return (
                <button
                  key={m.symbol}
                  type="button"
                  className="dv-mover-card"
                  onClick={() => {}}
                >
                  <div className="dv-mover-card__sym">{m.symbol}</div>
                  <div className="dv-mover-card__name">{m.name}</div>
                  <div className="dv-mover-card__price">₹{formatIndexValue(m.price)}</div>
                  <div
                    className={[
                      'dv-mover-card__pct',
                      up ? 'dv-mover-card__pct--up' : 'dv-mover-card__pct--down',
                    ].join(' ')}
                  >
                    {up ? '+' : ''}
                    {m.changePct.toFixed(2)}%
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="dv-section">
          <SectionHeader
            size="extra-large"
            title="Curated strategies"
            showChevron
            trailing="none"
            showSubtext={false}
          />
          <div className="dv-strategy-scroll" aria-label="Curated strategies">
            {DISCOVER_STRATEGIES.map((s) => (
              <button
                key={s.id}
                type="button"
                className="dv-strategy-card"
                onClick={() => {}}
              >
                <div className="dv-strategy-card__icon" aria-hidden>
                  <Icon name={s.iconName} size={22} />
                </div>
                <div>
                  <div className="dv-strategy-card__title">{s.title}</div>
                  <div className="dv-strategy-card__sub">{s.subtitle}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="dv-section">
          <SectionHeader
            size="extra-large"
            title="Expert recommendations"
            showChevron
            trailing="none"
            showSubtext={false}
          />
          <div className="dv-rec-list">
            {DISCOVER_EXPERT_RECS.map((r) => (
              <button
                key={r.id}
                type="button"
                className="dv-rec-card"
                onClick={() => {}}
              >
                <div className="dv-rec-card__tags">
                  <Badge type="text" context={r.riskContext} muted label={r.riskLabel} />
                  <Badge type="text" context={r.styleContext} muted label={r.styleLabel} />
                </div>
                <div className="dv-rec-card__title">{r.title}</div>
                <p className="dv-rec-card__summary">{r.summary}</p>
                <div className="dv-rec-card__meta">
                  <span className="dv-rec-card__analysts">
                    From {r.analystCount} analysts
                  </span>
                  <Icon name="caret_small_right_main" size={20} aria-hidden />
                </div>
              </button>
            ))}
          </div>
          <p className="dv-rec-disclaimer">
            Informational content only; not personalized financial advice. See detail
            view for freshness and sources.
          </p>
        </div>

        <div className="dv-section">
          <NewsWidget
            title="Stocks in the News"
            items={NEWS_WIDGET_DEMO_ITEMS}
            showChevron
          />
        </div>

        <div className="dv-section">
          <SectionHeader
            size="extra-large"
            title="Smart screeners"
            showChevron
            trailing="none"
            showSubtext={false}
          />
          <div className="dv-screener-scroll" aria-label="Screener shortcuts">
            {DISCOVER_SCREENERS.map((sc) => (
              <button
                key={sc.id}
                type="button"
                className="dv-screener-card"
                onClick={() => {}}
              >
                <div className="dv-screener-card__label">{sc.label}</div>
                <div className="dv-screener-card__desc">{sc.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="dv-section">
          <div className="dv-section__content">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-12)',
                padding: 'var(--spacing-16) 0',
              }}
            >
              <BrandLogo theme={brandLogoTheme} size={28} alt="" />
              <span
                style={{
                  fontSize: 'var(--font-size-subtext)',
                  color: 'var(--text-neutral-medium)',
                }}
              >
                Discover more on Paytm Money
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="dv-bottom-nav">
        <BottomNav
          items={DISCOVER_BOTTOM_NAV}
          activeIndex={bottomNavIndex}
          onChange={setBottomNavIndex}
          showGradient
        />
      </div>
    </div>
  );
}

export default DiscoverPage;
