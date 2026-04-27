import { useState } from 'react';
import { Header } from '../../components/Header/Header';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon/Icon';
import { SectionHeader } from '../../components/SectionHeader/SectionHeader';
import { ListItem } from '../../components/ListItem';
import { TextField } from '../../components/TextField/TextField';
import { Chip } from '../../components/Chip';
import './ExchangePage.css';

const fmtInr = (amount: number) =>
  `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

const PAIRS = [
  { from: 'INR', to: 'USD', rate: '1 USD = ₹83.12', label: 'US Dollar' },
  { from: 'INR', to: 'EUR', rate: '1 EUR = ₹90.45', label: 'Euro' },
  { from: 'INR', to: 'GBP', rate: '1 GBP = ₹105.20', label: 'British pound' },
] as const;

/**
 * Exchange — currency conversion hub: indicative quote card, amount field, popular pairs list.
 * Composes design-system primitives only; screen-scoped CSS prefix `ex-`.
 */
export function ExchangePage() {
  const [toIdx, setToIdx] = useState(0);
  const payAmount = 25000;
  const receiveAmount = 301.08;
  const rateLabel = 'Indicative rate · updates every few minutes';

  return (
    <>
      <Header
        type="regular"
        title="Exchange"
        statusBarTheme="light"
        showBackButton={false}
        rhsIcons={['zoom_in_outline', 'bell_outline']}
        showBorderBottom={false}
      />

      <section className="sh-section ex-section-swap" aria-label="New conversion">
        <SectionHeader size="extra-large" title="New conversion" trailing="none" showSubtext={false} />
        <div className="sh-section__content ex-swap-wrap">
          <Card className="ex-swap-card">
            <p className="ex-swap-card__eyebrow subtext-regular">You pay</p>
            <p className="ex-swap-card__currency-label body-medium">INR · Indian Rupee</p>
            <p className="ex-swap-card__amt display-3-medium">{fmtInr(payAmount)}</p>

            <div className="ex-swap-card__flip" aria-hidden="true">
              <Icon name="swap_outline" size={24} />
            </div>

            <p className="ex-swap-card__eyebrow subtext-regular">You receive</p>
            <div className="ex-swap-card__chips" role="group" aria-label="To currency">
              {PAIRS.map((p, i) => (
                <Chip
                  key={p.to}
                  type={i === toIdx ? 'selected' : 'default'}
                  size="extra-small"
                  label={p.to}
                  onPress={() => setToIdx(i)}
                />
              ))}
            </div>
            <p className="ex-swap-card__receive title-1-bold">
              {receiveAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
              {PAIRS[toIdx]?.to ?? 'USD'}
            </p>

            <form
              className="ex-swap-card__form"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <TextField
                label="Amount (INR)"
                emphasis="high"
                inputMode="decimal"
                defaultValue="25,000"
                assistiveText={rateLabel}
              />
              <Button variant="filled" size="large" label="Continue" htmlType="submit" className="ex-swap-card__cta" />
            </form>
          </Card>
        </div>
      </section>

      <section className="sh-section ex-section-pairs" aria-label="Popular pairs">
        <SectionHeader size="extra-large" title="Popular pairs" trailing="none" showSubtext={false} />
        <div className="sh-section__content ex-pairs-wrap">
          <Card className="ex-pairs-card">
            {PAIRS.map((p, i) => (
              <ListItem
                key={p.to}
                className="ex-pairs-card__li"
                emphasis="high"
                showLeading
                avatarType="icon"
                avatarIconName="swap_outline"
                avatarSize="small"
                showPrimaryText
                primaryText={`${p.from} → ${p.to}`}
                showSecondaryText
                secondaryText={p.label}
                showTrailing
                trailing="text"
                trailingText={p.rate}
                showSeparator={i < PAIRS.length - 1}
              />
            ))}
          </Card>
        </div>
      </section>
    </>
  );
}
