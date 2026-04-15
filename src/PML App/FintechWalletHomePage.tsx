import { useState } from 'react';
import { Avatar } from '../components/Avatar';
import { BottomNav, type BottomNavItem } from '../components/BottomNav';
import { BrandLogo, brandLogoThemeForAppColorScheme } from '../components/BrandLogo';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Header } from '../components/Header';
import { Icon } from '../components/Icon';
import { ListItem } from '../components/ListItem';
import { SectionHeader } from '../components/SectionHeader';
import { FINTECH_WALLET_CONTACTS, FINTECH_WALLET_TX } from './fintechWalletMockData';
import './FintechWalletHomePage.css';

const FWH_BOTTOM_NAV: BottomNavItem[] = [
  { icon: 'home_outline', label: 'Home' },
  { icon: 'search_outline', label: 'Search' },
  { icon: 'handbag_outline', label: 'Cards' },
  { icon: 'rupee', label: 'Wallet' },
  { icon: 'person_outline', label: 'Profile' },
];

export interface FintechWalletHomePageProps {
  colorScheme?: 'light' | 'dark';
}

export function FintechWalletHomePage({ colorScheme = 'dark' }: FintechWalletHomePageProps) {
  const [bottomNavIndex, setBottomNavIndex] = useState(0);
  const headerIsDark = colorScheme === 'dark';
  const brandLogoTheme = brandLogoThemeForAppColorScheme(colorScheme);

  return (
    <div className="fwh">
      <div className="fwh-content">
        <Header
          key={colorScheme}
          type="homepage"
          title=""
          brandLogoTheme={brandLogoTheme}
          showBrandLogo
          showGradient={false}
          statusBarTheme={headerIsDark ? 'dark' : 'light'}
          rhsIcons={['help']}
          className="fwh__header"
        />

        <div className="fwh__actions-row">
          <Button
            variant="filled"
            size="small"
            icon="leading"
            iconContent={<Icon name="star_filled" size={16} />}
            label="Rewards"
            htmlType="button"
          />
        </div>

        <section className="fwh-section fwh-balance" aria-label="Account balance">
          <button type="button" className="fwh-balance__label">
            Priya&apos;s card balance
            <Icon name="caret_small_down_main" size={16} aria-hidden />
          </button>
          <div className="fwh-balance__amount display-2-medium">₹5,21,098.31</div>
          <div className="fwh-balance__hold">Money on hold ₹2,500.00</div>
        </section>

        <div className="fwh-quick" role="group" aria-label="Quick actions">
          <Button
            variant="stroke"
            size="large"
            icon="leading"
            iconContent={<Icon name="arrow_up_outline" size={20} />}
            label="Send"
            htmlType="button"
          />
          <Button
            variant="stroke"
            size="large"
            icon="leading"
            iconContent={<Icon name="arrow_down_outline" size={20} />}
            label="Receive"
            htmlType="button"
          />
        </div>

        <div className="fwh-promo">
          <Card>
            <div className="fwh-promo__copy">
              <div className="fwh-promo__title">Send to bank contacts, tax-free limits apply</div>
              <p className="fwh-promo__body">
                UPI and bank transfers within your plan may be free. Check limits before you send.
              </p>
            </div>
            <div className="fwh-promo__art" aria-hidden>
              <Icon name="rupee" size={32} />
            </div>
          </Card>
        </div>

        <div className="fwh-section">
          <SectionHeader
            size="extra-large"
            title="Send again"
            showChevron
            trailing="none"
            showSubtext={false}
          />
          <div className="fwh-hscroll" role="list" aria-label="Frequent recipients">
            {FINTECH_WALLET_CONTACTS.map((c) => (
              <div key={c.id} className="fwh-contact" role="listitem">
                <button type="button" className="fwh-contact__btn" aria-label={`Send to ${c.name}`}>
                  <Avatar type="initials" size="large" initials={c.initials} icon="none" />
                  <span className="fwh-contact__name">{c.name}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="fwh-section fwh-history">
          <SectionHeader
            size="extra-large"
            title="Transaction history"
            showChevron
            trailing="none"
            showSubtext={false}
          />
          <div className="fwh-section__content">
            <Card>
              {FINTECH_WALLET_TX.map((tx, i) => (
                <ListItem
                  key={tx.id}
                  emphasis="high"
                  avatarType="initials"
                  avatarInitials={tx.avatarInitials}
                  avatarSize="regular"
                  showTrailing={false}
                  primaryText={tx.merchant}
                  showSubtext
                  showSecondaryText
                  secondaryText={tx.when}
                  showValueText
                  valueText={tx.amountLabel}
                  valueType={tx.amountType === 'positive' ? 'positive' : 'negative'}
                  showSeparator={i < FINTECH_WALLET_TX.length - 1}
                />
              ))}
            </Card>
          </div>
        </div>

        <div className="fwh-section fwh-section__content">
          <footer className="fwh-footer">
            <div className="fwh-footer__logo">
              <BrandLogo theme={brandLogoTheme} size={32} />
            </div>
            <p className="fwh-footer__note">Illustrative wallet preview · not live money movement</p>
          </footer>
        </div>
      </div>

      <div className="fwh-bottom-nav">
        <BottomNav
          items={FWH_BOTTOM_NAV}
          activeIndex={bottomNavIndex}
          onChange={setBottomNavIndex}
          showGradient
        />
      </div>
    </div>
  );
}

