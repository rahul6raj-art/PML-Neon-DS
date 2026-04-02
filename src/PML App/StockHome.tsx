import { useState } from 'react';
import { Header } from '../components/Header';
import type { TabItem } from '../components/Tab';
import { Chip } from '../components/Chip';
import { SectionHeader } from '../components/SectionHeader';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';
import { Icon } from '../components/Icon';
import { BottomNav } from '../components/BottomNav';
import { BrandLogo, brandLogoThemeForAppColorScheme } from '../components/BrandLogo';
import { ReminderWidget } from '../components/ReminderWidget';
import type { ReminderItem } from '../components/ReminderWidget';
import './StockHome.css';

/* ─── Data types ─── */
interface TickerItem {
  name: string;
  price: string;
  change: string;
  percent: string;
  positive: boolean;
}

interface AllocationItem {
  name: string;
  value: string;
  returnLabel: string;
  returnValue: string;
  color: 'stocks' | 'mf' | 'others';
  percent: number;
}

interface SipCard {
  status: string;
  statusContext: 'notice' | 'positive' | 'negative' | 'default';
  title: string;
  subtitle: string;
}

interface NewsCard {
  title: string;
  badges: { label: string; context: 'positive' | 'negative' | 'notice' | 'default' }[];
  body: string;
  time: string;
}

/* ─── Static data ─── */
const TICKERS: TickerItem[] = [
  { name: 'NIFTY50', price: '25,155.50', change: '+70.15', percent: '(0.33%)', positive: true },
  { name: 'NIFTYBANK', price: '58,323.5', change: '-625.15', percent: '(1.91%)', positive: false },
  { name: 'SENSEX', price: '81,923.5', change: '-225.15', percent: '(0.31%)', positive: false },
];

const HEADER_TABS: TabItem[] = [
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'ipos', label: 'IPOs', showBadge: true, badgeContent: '3' },
  { value: 'nfo', label: 'NFO' },
  { value: 'mtf', label: 'MTF' },
];

const TIME_RANGES = ['1D', '1W', '1M', '6M', '1Y', 'All'];

const ALLOCATIONS: AllocationItem[] = [
  { name: 'Stocks', value: '₹ 8,00,694', returnLabel: 'Stocks', returnValue: '+10.70%', color: 'stocks', percent: 55 },
  { name: 'MF', value: '₹ 72,597', returnLabel: 'Mutual Funds', returnValue: '+8.85%', color: 'mf', percent: 30 },
  { name: 'Others', value: '₹ 40,000', returnLabel: 'Others', returnValue: '+1.53%', color: 'others', percent: 15 },
];

const SIP_CARDS: SipCard[] = [
  { status: 'Tomorrow', statusContext: 'notice', title: '₹18,500 sitting idle', subtitle: 'See where you can invest' },
  { status: 'Active', statusContext: 'positive', title: '58% in equity', subtitle: 'Rebalance your portfolio' },
];

const REMINDER_ITEMS: ReminderItem[] = [
  {
    showLeading: false,
    name: 'Axis Bank Ltd',
    price: '₹ 28,694.40',
    change: '₹ 28,694.40',
    changeType: 'positive',
    ctaText: '+0.2% Since you checked',
    ctaLabel: 'Buy',
    ctaVariant: 'filled',
    ctaSize: 'small',
  },
  {
    showLeading: false,
    name: 'ICICI Bank',
    price: '₹ 28,694.40',
    change: '₹ 28,694.40',
    changeType: 'negative',
    ctaText: 'Complete your order',
    ctaLabel: 'Buy',
    ctaVariant: 'filled',
    ctaSize: 'small',
  },
];

const NEWS_CARDS: NewsCard[] = [
  {
    title: 'Zomato Profit Surge',
    badges: [{ label: 'Bullish', context: 'positive' }],
    body: 'Q3 profits jumped 200%. Analysts may upgrade the stock',
    time: '25 Jan, 10:12 AM',
  },
  {
    title: 'Tata Motors',
    badges: [{ label: 'Bullish', context: 'positive' }, { label: 'Volume Breakout', context: 'notice' }],
    body: 'Price crossed ₹980 with 1.8× higher than usual trading volume.',
    time: '25 Jan, 10:12 AM',
  },
];

/* ─── Chart SVG (simplified portfolio line chart) ─── */
const PortfolioChart = () => (
  <svg viewBox="0 0 376 116" fill="none" className="sh-chart__svg" preserveAspectRatio="none">
    <defs>
      <linearGradient id="chartGrad" x1="188" y1="0" x2="188" y2="116" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--background-positive-strong)" stopOpacity="0.15" />
        <stop offset="1" stopColor="var(--background-positive-strong)" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M0 80 C40 75, 80 70, 120 60 C160 50, 180 55, 200 48 C220 41, 240 38, 260 35 C280 32, 310 40, 340 30 L376 25"
      stroke="var(--background-positive-strong)"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M0 80 C40 75, 80 70, 120 60 C160 50, 180 55, 200 48 C220 41, 240 38, 260 35 C280 32, 310 40, 340 30 L376 25 V116 H0 Z"
      fill="url(#chartGrad)"
    />
    <circle cx="340" cy="30" r="6" fill="var(--background-positive-strong)" />
    <circle cx="340" cy="30" r="10" fill="var(--background-positive-strong)" fillOpacity="0.2" />
  </svg>
);

export interface StockHomePageProps {
  /** App preview theme — maps to BrandLogo: light surfaces use `light`, dark surfaces use `dark` */
  colorScheme?: 'light' | 'dark';
}

/* ─── Main Component ─── */
export const StockHomePage = ({ colorScheme = 'dark' }: StockHomePageProps) => {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [activeRange, setActiveRange] = useState(0);

  const headerIsDark = colorScheme === 'dark';
  const brandLogoTheme = brandLogoThemeForAppColorScheme(colorScheme);

  return (
    <div className="stock-home">
      {/* Scrollable Content (status bar, header, tabs scroll with page) */}
      <div className="sh-content">
        <Header
          key={colorScheme}
          type="homepage"
          title="Home"
          brandLogoTheme={brandLogoTheme}
          showBrandLogo
          showGradient={false}
          statusBarTheme={headerIsDark ? 'dark' : 'light'}
          rhsIcons={['search_outline', 'bell_outline']}
          showTabs
          tabs={HEADER_TABS}
          activeTabValue={activeTab}
          onTabChange={setActiveTab}
          tabSize="medium"
          className="stock-home__header"
        />

        {/* Ticker Strip */}
        <div className="sh-ticker">
          {TICKERS.map((t) => (
            <div className="sh-ticker__item" key={t.name}>
              <span className="sh-ticker__name">{t.name}</span>
              <div className="sh-ticker__values">
                <span className="sh-ticker__price">{t.price}</span>
                <span className={`sh-ticker__change ${t.positive ? 'sh-ticker__change--positive' : 'sh-ticker__change--negative'}`}>
                  <span>{t.change}</span>
                  <span>{t.percent}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Portfolio Summary ── */}
        <div className="sh-portfolio">
          <div className="sh-portfolio__header">
            <div className="sh-portfolio__title">Total portfolio value</div>
          </div>
          <div className="sh-portfolio__value-row">
            <span className="sh-portfolio__amount">₹2,15,197</span>
            <button className="sh-portfolio__eye-btn" aria-label="Toggle visibility">
              <Icon name="eye_slash_outline" size={20} />
            </button>
          </div>
          <div className="sh-portfolio__returns">
            <span className="sh-portfolio__returns-label">1D Returns:&nbsp;</span>
            <span className="sh-portfolio__returns-value">+ ₹240.50 (2.40%)</span>
          </div>

          {/* Chart */}
          <div className="sh-chart">
            <PortfolioChart />
          </div>

          {/* Time Range Chips */}
          <div className="sh-chips">
            {TIME_RANGES.map((r, i) => (
              <Chip
                key={r}
                label={r}
                size="small"
                type={activeRange === i ? 'selected' : 'default'}
                onPress={() => setActiveRange(i)}
              />
            ))}
          </div>

          {/* Values */}
          <div className="sh-values">
            <div className="sh-values__row">
              <span className="sh-values__label">Invested</span>
              <span className="sh-values__amount">₹1,79,398</span>
            </div>
            <div className="sh-values__row">
              <span className="sh-values__label">Overall Returns</span>
              <span className="sh-values__positive">+₹35,799 (28.28%)</span>
            </div>
          </div>

          {/* Buying Power */}
          <div className="sh-buying">
            <div className="sh-buying__inner">
              <div>
                <div className="sh-buying__label">Buying power</div>
                <div className="sh-buying__amount">₹15,450</div>
              </div>
              <button className="sh-buying__action">
                Add Funds <Icon name="caret_small_right_main" size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Allocations ── */}
        <div className="sh-section">
          <SectionHeader
            size="large"
            title="Allocations"
            showChevron
            trailing="none"
            showSubtext={false}
          />
          <div className="sh-section__content">
            <Card>
              <div className="sh-allocation">
                <div className="sh-allocation__bar">
                  {ALLOCATIONS.map((a) => (
                    <div
                      key={a.color}
                      className={`sh-allocation__segment sh-allocation__segment--${a.color}`}
                      style={{ flex: a.percent }}
                    />
                  ))}
                </div>
                <div className="sh-allocation__list">
                  {ALLOCATIONS.map((a) => (
                    <div className="sh-allocation__item" key={a.color}>
                      <div className={`sh-allocation__dot sh-allocation__dot--${a.color}`} />
                      <div className="sh-allocation__info">
                        <div className="sh-allocation__info-left">
                          <span className="sh-allocation__name">{a.name}</span>
                          <span className="sh-allocation__value">{a.value}</span>
                        </div>
                        <div className="sh-allocation__info-right">
                          <span className="sh-allocation__return-label">{a.returnLabel}</span>
                          <span className="sh-allocation__return-value">{a.returnValue}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* ── Portfolio Intelligence / Upcoming SIPs ── */}
        <div className="sh-section">
          <SectionHeader
            size="large"
            title="Portfolio Intelligence"
            showChevron
            trailing="none"
            showSubtext={false}
          />
          <div className="sh-hscroll">
            {SIP_CARDS.map((sip, i) => (
              <div className="sh-sip-card" key={i}>
                <div className="sh-sip-card__status">
                  <Badge type="text" context={sip.statusContext} label={sip.status} />
                </div>
                <div className="sh-sip-card__title">{sip.title}</div>
                <div className="sh-sip-card__subtitle">
                  {sip.subtitle}
                  <span className="sh-sip-card__chevron">
                    <Icon name="caret_small_right_main" size={16} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Goals ── */}
        <div className="sh-section">
          <SectionHeader
            size="large"
            title="Goals"
            showChevron
            trailing="none"
            showSubtext={false}
          />
          <div className="sh-section__content">
            <div className="sh-goal-card">
              <div className="sh-goal-card__header">
                <div>
                  <div className="sh-goal-card__title">Long Term Wealth</div>
                  <div className="sh-goal-card__status">On track</div>
                </div>
                <div className="sh-goal-card__badge">13.6%</div>
              </div>
              <div className="sh-goal-card__progress">
                <div className="sh-goal-card__bar">
                  <div className="sh-goal-card__bar-fill" style={{ width: '35%' }} />
                  <div className="sh-goal-card__bar-dot" style={{ left: '35%' }} />
                </div>
              </div>
              <div className="sh-goal-card__labels">
                <div className="sh-goal-card__label-item">
                  <span className="sh-goal-card__label-key">Saved:</span>
                  <span className="sh-goal-card__label-val">1.5L</span>
                </div>
                <div className="sh-goal-card__label-item">
                  <span className="sh-goal-card__label-key">Target:</span>
                  <span className="sh-goal-card__label-val">10L</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Pickup Where You Left ── */}
        <div className="sh-section">
          <SectionHeader
            size="large"
            title="Pickup where you left"
            showChevron
            trailing="none"
            showSubtext={false}
          />
          <ReminderWidget
            variant="carousel"
            showHeader={false}
            items={REMINDER_ITEMS}
          />
        </div>

        {/* ── Today's Market Mood ── */}
        <div className="sh-section">
          <SectionHeader
            size="large"
            title="Today's Market Mood"
            showChevron
            trailing="none"
            showSubtext={false}
          />
          <div className="sh-section__content">
            <div className="sh-market__card">
              <div className="sh-market__icon">
                <Icon name="chart" size={32} />
              </div>
              <div className="sh-market__info">
                <div className="sh-market__label-row">
                  <span className="sh-market__label">Markets are</span>
                  <span className="sh-market__status">Stable</span>
                </div>
                <div className="sh-market__desc">Good time for long term entries</div>
              </div>
              <span className="sh-market__arrow">
                <Icon name="caret_small_right_main" size={24} />
              </span>
            </div>
          </div>
        </div>

        {/* ── Stocks in the News ── */}
        <div className="sh-section">
          <SectionHeader
            size="large"
            title="Stocks in the News"
            showChevron
            trailing="none"
            showSubtext={false}
          />
          <div className="sh-hscroll">
            {NEWS_CARDS.map((news, i) => (
              <div className="sh-news-card" key={i}>
                <div className="sh-news-card__top">
                  <div>
                    <div className="sh-news-card__title">{news.title}</div>
                    <div className="sh-news-card__badges">
                      {news.badges.map((b, j) => (
                        <Badge key={j} type="text" context={b.context} label={b.label} />
                      ))}
                    </div>
                  </div>
                  <button className="sh-news-card__chevron" aria-label="Open">
                    <Icon name="caret_small_right_main" size={24} />
                  </button>
                </div>
                <hr className="sh-news-card__divider" />
                <div className="sh-news-card__body">{news.body}</div>
                <div className="sh-news-card__time">{news.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="sh-footer">
          <div className="sh-footer__logo">
            <BrandLogo theme={brandLogoTheme} size={32} />
          </div>
          <div className="sh-footer__tagline">Invest & Rise with</div>
          <div className="sh-footer__brand">India's Growth Story</div>
          <div className="sh-footer__disclaimer">
            Paytm Money Private Limited<br />
            Member of NSE & BSE
          </div>
        </div>
      </div>

      {/* ── Bottom Nav ── */}
      <div className="sh-bottom-nav">
        <BottomNav />
      </div>
    </div>
  );
};

export default StockHomePage;
