import { useState } from 'react';
import { Header } from '../components/Header';
import type { TabItem } from '../components/Tab';
import { SectionHeader } from '../components/SectionHeader';
import { Badge } from '../components/Badge';
import { Icon } from '../components/Icon';
import { BottomNav } from '../components/BottomNav';
import { BrandLogo, brandLogoThemeForAppColorScheme } from '../components/BrandLogo';
import { ReminderWidget } from '../components/ReminderWidget';
import type { ReminderItem } from '../components/ReminderWidget';
import { NewsWidget, NEWS_WIDGET_DEMO_ITEMS } from '../components/NewsWidget';
import { PortfolioWidget } from '../components/PortfolioWidget';
import { Ticker, TICKER_WIDGET_DEFAULT_ITEMS } from '../components/Ticker';
import { StocksCard, STOCKS_CARD_DEFAULT_PROPS } from '../components/StocksCard';
import './StockHome.css';

/* ─── Data types ─── */
interface SipCard {
  status: string;
  statusContext: 'notice' | 'positive' | 'negative' | 'default';
  title: string;
  subtitle: string;
}

/* ─── Static data ─── */
const HEADER_TABS: TabItem[] = [
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'ipos', label: 'IPOs', showBadge: true, badgeContent: '3' },
  { value: 'nfo', label: 'NFO' },
  { value: 'mtf', label: 'MTF' },
];

const SIP_CARDS: SipCard[] = [
  { status: 'Tomorrow', statusContext: 'notice', title: '₹18,500 sitting idle', subtitle: 'See where you can invest' },
  { status: 'Active', statusContext: 'positive', title: '58% in equity', subtitle: 'Rebalance your portfolio' },
];

const REMINDER_ITEMS: ReminderItem[] = [
  {
    showLeading: false,
    name: 'Axis Bank Ltd',
    price: '₹28,694.40',
    change: '₹28,694.40',
    changeType: 'positive',
    ctaText: '+0.2% Since you checked',
    ctaLabel: 'Buy',
    ctaVariant: 'filled',
    ctaSize: 'small',
  },
  {
    showLeading: false,
    name: 'ICICI Bank',
    price: '₹28,694.40',
    change: '₹28,694.40',
    changeType: 'negative',
    ctaText: 'Complete your order',
    ctaLabel: 'Buy',
    ctaVariant: 'filled',
    ctaSize: 'small',
  },
];

export interface StockHomePageProps {
  /** App preview theme — maps to BrandLogo: light surfaces use `light`, dark surfaces use `dark` */
  colorScheme?: 'light' | 'dark';
}

/* ─── Main Component ─── */
export const StockHomePage = ({ colorScheme = 'dark' }: StockHomePageProps) => {
  const [activeTab, setActiveTab] = useState('portfolio');

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

        <Ticker items={TICKER_WIDGET_DEFAULT_ITEMS} />

        {/* ── Portfolio Summary ── */}
        <PortfolioWidget />

        {/* ── Stocks (holdings card) ── */}
        <div className="sh-section">
          <SectionHeader
            size="large"
            title="Your stocks"
            showChevron
            trailing="none"
            showSubtext={false}
          />
          <div className="sh-section__content">
            <StocksCard {...STOCKS_CARD_DEFAULT_PROPS} />
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
                  <Badge
                    type="text"
                    context={sip.statusContext}
                    muted
                    label={sip.status}
                  />
                </div>
                <div className="sh-sip-card__body">
                  <div className="sh-sip-card__copy">
                    <div className="sh-sip-card__title">{sip.title}</div>
                    <div className="sh-sip-card__subtitle">{sip.subtitle}</div>
                  </div>
                  <button type="button" className="sh-sip-card__chevron" aria-label="Open">
                    <Icon name="caret_small_right_main" size={24} />
                  </button>
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
          <NewsWidget title="Stocks in the News" items={NEWS_WIDGET_DEMO_ITEMS} />
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
