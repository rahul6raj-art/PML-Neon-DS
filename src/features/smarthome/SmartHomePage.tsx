import { useState } from 'react';
import { Header } from '../../components/Header/Header';
import { Card } from '../../components/Card/Card';
import { CardControl } from '../../components/CardControl';
import { SectionHeader } from '../../components/SectionHeader/SectionHeader';
import { ListItem } from '../../components/ListItem';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon/Icon';
import './SmartHomePage.css';

const QUICK_ACTIONS = [
  { iconContent: 'plus_outline', label: 'Top up' },
  { iconContent: 'arrow_turn_right_outline', label: 'Transfer' },
  { iconContent: 'swap_outline', label: 'Exchange' },
] as const;

const fmtInr = (amount: number) =>
  `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

const fmtInrSigned = (amount: number) => {
  const abs = Math.abs(amount);
  const core = fmtInr(abs);
  return amount < 0 ? `-${core}` : `+${core}`;
};

/**
 * SmartHome scroll body — account hero, quick actions, transaction peek, SmartWallet grid, promos.
 * Bottom nav and phone shell live in **`App.tsx`** so tab **Exchange** can swap the main surface.
 */
export function SmartHomeScrollContent() {
  const [accountPage, setAccountPage] = useState(1);
  const available = 50000;
  const expensesTotal = 1211;
  const expensesDelta = -145;
  const expensesPct = 12;

  return (
    <>
        <Header
          type="regular"
          title="SmartHome"
          statusBarTheme="light"
          showBackButton={false}
          rhsIcons={['zoom_in_outline', 'bell_outline']}
          showBorderBottom={false}
        />

        <div className="smh-hero-wrap">
          <Card className="smh-hero-card">
            <ListItem
              className="smh-hero-card__account-li"
              emphasis="high"
              showLeading
              avatarType="icon"
              avatarIconName="person_circle"
              avatarSize="small"
              showPrimaryText
              primaryText="Primary account"
              showSubtext={false}
              showTrailing
              trailing="icon"
              trailingIcon="menu_dots_vertical_outline"
              showSeparator={false}
            />

            <p className="smh-hero-card__balance-label subtext-regular">Available balance</p>
            <p className="smh-hero-card__balance-amt display-3-medium">{fmtInr(available)}</p>

            <div className="smh-hero-card__actions" role="group" aria-label="Quick actions">
              {QUICK_ACTIONS.map(({ iconContent, label }) => (
                <Button
                  key={label}
                  variant="stroke"
                  size="extra-small"
                  icon="leading"
                  iconContent={iconContent}
                  label={label}
                  htmlType="button"
                  className="smh-hero-card__action-btn"
                />
              ))}
            </div>

            <div className="smh-hero-card__tx">
              <button type="button" className="smh-tx-hdr">
                <span className="smh-tx-hdr__title body-medium">Transactions</span>
                <span className="smh-tx-hdr__chevron" aria-hidden>
                  <Icon name="caret_small_right_main" size={20} />
                </span>
              </button>
              <ListItem
                className="smh-hero-card__tx-li"
                emphasis="high"
                showLeading
                avatarType="initials"
                avatarInitials="AU"
                avatarSize="regular"
                showPrimaryText
                primaryText="To savings pocket"
                showSecondaryText
                secondaryText="Today, 3:30 PM"
                showTrailing
                trailing="text"
                trailingText={fmtInrSigned(-250)}
                trailingTextTone="negative"
                showSeparator={false}
              />
            </div>
          </Card>

          <div className="smh-account-pager-wrap" aria-label="Account pages">
            <CardControl dots={3} selection={accountPage} onChange={setAccountPage} />
          </div>
        </div>

        <section className="sh-section smh-section-wallet" aria-label="SmartWallet">
          <SectionHeader
            className="smh-wallet-section-header"
            size="extra-large"
            title="SmartWallet"
            showChevron={false}
            trailing="icons"
            showSubtext={false}
            iconName="plus_outline"
          />
          <div className="sh-section__content smh-wallet-grid">
            <Card className="smh-mini-card smh-mini-card--expenses">
              <p className="smh-mini-card__eyebrow subtext-regular">Expenses in Jul</p>
              <p className="smh-mini-card__value title-2-bold">{fmtInr(expensesTotal)}</p>
              <p className="smh-mini-card__delta body-regular">
                <Icon name="arrow_down_outline" size={16} />
                <span>
                  {fmtInrSigned(expensesDelta)} ({expensesPct}%)
                </span>
              </p>
              <div className="smh-seg-bar" aria-hidden>
                <span className="smh-seg-bar__seg smh-seg-bar__seg--1" />
                <span className="smh-seg-bar__seg smh-seg-bar__seg--2" />
                <span className="smh-seg-bar__seg smh-seg-bar__seg--3" />
                <span className="smh-seg-bar__seg smh-seg-bar__seg--4" />
                <span className="smh-seg-bar__seg smh-seg-bar__seg--5" />
              </div>
            </Card>

            <Card className="smh-mini-card smh-mini-card--cards-teaser">
              <p className="smh-mini-card__cards-title title-3-bold">My cards</p>
              <div className="smh-mini-card__cards-visual" aria-hidden>
                <div className="smh-mini-card__cards-plastic" />
              </div>
            </Card>
          </div>
        </section>

        <div className="sh-section__content smh-promo-row" aria-label="Shortcuts">
          <Card className="smh-promo-card">
            <Icon name="person_plus_outline" size={28} />
            <p className="smh-promo-card__title body-semibold">Invite friends and earn</p>
            <p className="smh-promo-card__meta subtext-regular">Share your link</p>
          </Card>
          <Card className="smh-promo-card">
            <Icon name="bank_outline" size={28} />
            <p className="smh-promo-card__title body-semibold">Savings</p>
            <p className="smh-promo-card__meta subtext-regular">Grow your balance</p>
          </Card>
        </div>
    </>
  );
}
