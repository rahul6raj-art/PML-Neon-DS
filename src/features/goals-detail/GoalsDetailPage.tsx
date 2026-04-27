import { Header } from '../../components/Header/Header';
import { Card } from '../../components/Card/Card';
import { SectionHeader } from '../../components/SectionHeader/SectionHeader';
import { ListItem } from '../../components/ListItem/ListItem';
import { BottomNav } from '../../components/BottomNav/BottomNav';
import { Icon } from '../../components/Icon/Icon';
import { ActivityTimeline } from '../../components/ActivityTimeline';
import type { TimelineStep } from '../../components/ActivityTimeline';
import './GoalsDetailPage.css';

const fmtInr = (amount: number) => `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

const TX_ROWS = [
  { id: '1', primary: 'Goal Top up', secondary: 'Vacation to Mexico', amount: 1310, time: '04:03 PM' },
  { id: '2', primary: 'Goal Top up', secondary: 'Vacation to Mexico', amount: 1310, time: '04:03 PM' },
  { id: '3', primary: 'Goal Top up', secondary: 'Vacation to Mexico', amount: 1310, time: '04:03 PM' },
];

const GOALS_JOURNEY_TIMELINE_STEPS: TimelineStep[] = [
  {
    status: 'completed',
    title: 'Goal Started',
    subtitle: 'Your journey begins today.',
    showBadge: true,
    badgeLabel: '04:03 PM',
  },
  {
    status: 'awaiting',
    title: '25% contribution',
    subtitle: 'On track for your target.',
  },
  {
    status: 'awaiting',
    title: '50% contribution',
    subtitle: 'Halfway to your goal.',
  },
  {
    status: 'awaiting',
    title: '75% contribution',
    subtitle: 'Almost there.',
  },
  {
    status: 'awaiting',
    title: 'Goal achieved',
    subtitle: 'Celebrate your milestone.',
  },
];

function ProgressRing({ percent }: { percent: number }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  const dash = (percent / 100) * c;
  return (
    <div className="gdp-progress-ring" aria-label={`${percent} percent complete`}>
      <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden>
        <circle
          cx="36"
          cy="36"
          r={r}
          fill="none"
          stroke="var(--surface-level-3)"
          strokeWidth="6"
        />
        <circle
          cx="36"
          cy="36"
          r={r}
          fill="none"
          stroke="var(--text-positive-strong)"
          strokeWidth="6"
          strokeDasharray={`${dash} ${c}`}
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
        />
      </svg>
      <span className="gdp-progress-ring__pct">{percent}%</span>
    </div>
  );
}

/**
 * Goals detail — savings goal progress, journey timeline, and recent top-ups.
 * Standalone feature screen (Vite / product); not wired through Storybook.
 */
export function GoalsDetailPage() {
  const saved = 175000;
  const target = 250000;
  const pct = Math.round((saved / target) * 100);
  const left = target - saved;

  return (
    <div className="gdp-stock-home">
      <div className="gdp-sh-content">
        <Header
          type="regular"
          title="Goals"
          statusBarTheme="light"
          showBackButton
          rhsIcons={['menu_dots_vertical_outline']}
          showBorderBottom={false}
        />

        <div className="gdp-hero">
          <div className="gdp-hero__visual" aria-hidden>
            <Icon name="handbag_filled" size={48} />
          </div>
          <h1 className="gdp-hero__title title-1-bold">Vacation to Mexico</h1>
          <p className="gdp-hero__subtitle body-regular">
            ⏳ Woohoo! You&apos;ll reach this goal in 2 weeks.
          </p>
        </div>

        <div className="sh-section__content" style={{ paddingInline: 'var(--spacing-16)' }}>
          <Card className="gdp-progress-card">
            <div className="gdp-progress-top">
              <div className="gdp-progress-copy">
                <p className="gdp-progress-copy__label">You&apos;ve already saved</p>
                <p className="gdp-progress-copy__amount">{fmtInr(saved)}</p>
                <p className="gdp-progress-copy__target">out of {fmtInr(target)}</p>
              </div>
              <ProgressRing percent={pct} />
            </div>
            <div className="gdp-progress-bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
              <div className="gdp-progress-bar__fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="gdp-progress-meta">
              <span>Your progress</span>
              <strong>{fmtInr(left)} left</strong>
            </div>
            <div className="gdp-progress-footer">
              <span>14 days to go</span>
              <span>Ends: Jul 3rd, 2025</span>
            </div>
          </Card>
        </div>

        <section className="sh-section" aria-label="Your Journey">
          <SectionHeader
            title="Your Journey"
            size="extra-large"
            trailing="none"
            showSubtext={false}
            showChevron
          />
          <p className="gdp-caps-label">Today</p>
          <Card className="gdp-journey-card">
            <div className="gdp-journey-card__inner">
              <ActivityTimeline
                direction="vertical"
                steps={GOALS_JOURNEY_TIMELINE_STEPS}
                className="gdp-journey__timeline"
              />
            </div>
          </Card>
        </section>

        <section className="sh-section" aria-label="Transaction list">
          <SectionHeader
            title="Transaction list"
            size="extra-large"
            trailing="none"
            showSubtext={false}
            showChevron
          />
          <p className="gdp-caps-label">Today</p>
          <Card className="gdp-tx-card">
            <div className="gdp-tx-card__inner">
              {TX_ROWS.map((row, index) => (
                <ListItem
                  key={row.id}
                  emphasis="high"
                  showLeading
                  avatarType="icon"
                  avatarIconName="home_filled"
                  avatarSize="regular"
                  avatarBadgeType="action"
                  avatarBadgeIcon="plus_outline"
                  showPrimaryText
                  primaryText={row.primary}
                  showSecondaryText
                  secondaryText={row.secondary}
                  showSubtext
                  showBadge={false}
                  showTrailing
                  trailing="text"
                  trailingText={`+${fmtInr(row.amount)}`}
                  trailingSubtext={row.time}
                  trailingTextTone="positive"
                  showSeparator={index < TX_ROWS.length - 1}
                  separatorInset={false}
                />
              ))}
            </div>
          </Card>
        </section>
      </div>

      <div className="gdp-sh-bottom-nav">
        <BottomNav
          activeIndex={1}
          items={[
            { icon: 'chart', label: 'Insights' },
            { icon: 'airplane_departure_outline', label: 'Goals' },
            { icon: 'rupee', label: 'Transactions' },
            { icon: 'person_outline', label: 'Profile' },
          ]}
        />
      </div>
    </div>
  );
}
