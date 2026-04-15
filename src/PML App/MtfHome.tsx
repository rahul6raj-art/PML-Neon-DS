import { useState } from 'react';
import { Badge } from '../components/Badge';
import { BottomNav } from '../components/BottomNav';
import { BrandLogo, brandLogoThemeForAppColorScheme } from '../components/BrandLogo';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Header } from '../components/Header';
import { Icon } from '../components/Icon';
import { SectionHeader } from '../components/SectionHeader';
import type { TabItem } from '../components/Tab';
import {
  MTF_ACTIVE_POSITIONS_MOCK,
  MTF_FAQ_MOCK,
  MTF_HEALTH_MOCK,
  MTF_QUICK_ACTIONS_MOCK,
  MTF_RETURN_ON_MARGIN_MOCK,
  MTF_SCANNER_CARDS_MOCK,
} from './mtfMockData';
import './MtfHome.css';

const HEADER_TABS: TabItem[] = [
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'ipos', label: 'IPOs', showBadge: true, badgeContent: '3' },
  { value: 'nfo', label: 'NFO' },
  { value: 'mtf', label: 'MTF' },
];

export interface MtfHomePageProps {
  colorScheme?: 'light' | 'dark';
}

export function MtfHomePage({ colorScheme = 'dark' }: MtfHomePageProps) {
  const [activeTab, setActiveTab] = useState('mtf');
  const headerIsDark = colorScheme === 'dark';
  const brandLogoTheme = brandLogoThemeForAppColorScheme(colorScheme);
  const health = MTF_HEALTH_MOCK;
  const knobLeft = `${health.buyingPowerUsedPct}%`;

  return (
    <div className="mtf-home">
      <div className="mtf-content">
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
          className="mtf-home__header"
        />

        <section className="mtf-section" aria-label="Return on margin">
          <div className="mtf-section__content">
            <Card stroke={false} className="mtf-rom-card">
              <div className="mtf-rom__stack">
                <div>
                  <p className="mtf-rom__label">Return on Margin</p>
                  <p className="mtf-rom__headline">{MTF_RETURN_ON_MARGIN_MOCK.headlinePct}</p>
                </div>
                <Badge
                  type="text"
                  context="positive"
                  muted
                  label={MTF_RETURN_ON_MARGIN_MOCK.insightBadge}
                />
                <hr className="mtf-rom__divider" />
                <div className="mtf-rom__stats">
                  <div className="mtf-rom__stat">
                    <p className="mtf-rom__stat-label">{MTF_RETURN_ON_MARGIN_MOCK.marginLabel}</p>
                    <p className="mtf-rom__stat-value">{MTF_RETURN_ON_MARGIN_MOCK.marginValue}</p>
                  </div>
                  <div className="mtf-rom__stat-rule" aria-hidden />
                  <div className="mtf-rom__stat">
                    <p className="mtf-rom__stat-label">{MTF_RETURN_ON_MARGIN_MOCK.profitLabel}</p>
                    <p className="mtf-rom__stat-value mtf-rom__stat-value--profit">
                      {MTF_RETURN_ON_MARGIN_MOCK.profitValue}
                    </p>
                  </div>
                  <div className="mtf-rom__stat-rule" aria-hidden />
                  <div className="mtf-rom__stat">
                    <p className="mtf-rom__stat-label">{MTF_RETURN_ON_MARGIN_MOCK.interestLabel}</p>
                    <p className="mtf-rom__stat-value mtf-rom__stat-value--loss">
                      {MTF_RETURN_ON_MARGIN_MOCK.interestValue}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="mtf-section" aria-label="Active positions">
          <SectionHeader
            size="extra-large"
            title="Active Positions"
            showChevron={false}
            trailing="none"
            showSubtext={false}
            className="mtf-section-header"
          />
          <div className="mtf-section__content">
            <div className="mtf-quick-row" role="toolbar" aria-label="MTF quick actions">
              {MTF_QUICK_ACTIONS_MOCK.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  className="mtf-quick-action"
                  aria-label={a.label}
                >
                  <span className="mtf-quick-action__icon" aria-hidden>
                    <Icon name={a.icon} size={24} />
                  </span>
                  {a.label}
                </button>
              ))}
            </div>
            <div className="mtf-positions-stack">
              {MTF_ACTIVE_POSITIONS_MOCK.map((p) => (
                <Card key={p.id} stroke={false} className="mtf-position-card">
                  <div className="mtf-position__row">
                    <div className="mtf-position__lhs">
                      <p className="mtf-position__title">{p.name}</p>
                      <p className="mtf-position__meta">{p.marginLabel}</p>
                    </div>
                    <div className="mtf-position__rhs">
                      <p
                        className={`mtf-position__pl ${
                          p.pnlSentiment === 'positive'
                            ? 'mtf-position__pl--positive'
                            : 'mtf-position__pl--negative'
                        }`}
                      >
                        {p.pnlLabel}
                      </p>
                      <Badge type="text" context="default" muted label={p.leverageBadge} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mtf-section" aria-label="Opportunity scanners">
          <SectionHeader
            size="extra-large"
            title="Opportunity Scanners"
            showChevron
            trailing="none"
            showSubtext={false}
            className="mtf-section-header"
          />
          <div className="mtf-scanners" role="region" aria-label="Scanner cards">
            {MTF_SCANNER_CARDS_MOCK.map((s) => (
              <Card key={s.id} stroke={false} className="mtf-scanner-card">
                <div className="mtf-scanner__top">
                  <div className="mtf-scanner__names">
                    <p className="mtf-scanner__name">{s.name}</p>
                    <p className="mtf-scanner__cat">{s.category}</p>
                  </div>
                  <Badge type="text" context="default" muted label={s.tagBadge} />
                </div>
                <hr className="mtf-scanner__rule" />
                <div className="mtf-scanner__meta">
                  <span>{s.leverageLine}</span>
                  <span>
                    Risk:{' '}
                    <span
                      className={
                        s.riskSentiment === 'positive' ? 'mtf-scanner__risk-low' : undefined
                      }
                    >
                      {s.riskLabel}
                    </span>
                  </span>
                </div>
                <hr className="mtf-scanner__rule" />
                <div className="mtf-scanner__actions">
                  <Button
                    htmlType="button"
                    variant="stroke"
                    size="small"
                    label="Simulate"
                    icon="none"
                    className="mtf-btn-simulate"
                  />
                  <Button
                    htmlType="button"
                    variant="filled"
                    size="small"
                    label="Trade"
                    icon="none"
                  />
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mtf-section" aria-label="Common questions">
          <SectionHeader
            size="extra-large"
            title="Common Questions"
            showChevron
            trailing="none"
            showSubtext={false}
            className="mtf-section-header"
          />
          <div className="mtf-section__content">
            <div className="mtf-faq-stack">
              {MTF_FAQ_MOCK.map((f) => (
                <article key={f.id} className="mtf-faq-card">
                  <h3 className="mtf-faq-card__q">{f.question}</h3>
                  <p className="mtf-faq-card__a">{f.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mtf-section" aria-label="MTF health">
          <SectionHeader
            size="extra-large"
            title="MTF Health"
            showChevron
            trailing="none"
            showSubtext={false}
            className="mtf-section-header"
          />
          <div className="mtf-section__content">
            <Card stroke={false} className="mtf-health-card">
              <div className="mtf-health__head">
                <div className="mtf-health__titles">
                  <p className="mtf-health__title">{health.title}</p>
                  <p className="mtf-health__sub">{health.subtitle}</p>
                </div>
                <Badge type="text" context="notice" muted label={health.riskBadge} />
              </div>
              <div className="mtf-health__bar-wrap">
                <div className="mtf-health__knob" style={{ left: knobLeft }} aria-hidden />
                <div className="mtf-health__track" aria-hidden>
                  <div
                    className="mtf-health__fill"
                    style={{ width: `${health.buyingPowerUsedPct}%` }}
                  />
                </div>
              </div>
              <div className="mtf-health__foot">
                <span>{health.buyingPowerLabel}</span>
                <span>
                  {health.buyingPowerDetail}
                  <span className="mtf-health__stat-accent">{health.buyingPowerPctDisplay}</span>
                </span>
              </div>
            </Card>
          </div>
        </section>

        <div className="mtf-footer">
          <div className="mtf-footer__logo">
            <BrandLogo theme={brandLogoTheme} size={32} />
          </div>
          <div className="mtf-footer__tagline">Invest & Rise with</div>
          <div className="mtf-footer__brand">India&apos;s Growth Story</div>
        </div>
      </div>

      <div className="mtf-bottom-nav">
        <BottomNav />
      </div>
    </div>
  );
}

export default MtfHomePage;
