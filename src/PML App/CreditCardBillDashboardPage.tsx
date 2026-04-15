import type { ReactNode } from 'react';
import { Alert, type AlertState } from '../components/Alert';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Header } from '../components/Header';
import { SectionHeader } from '../components/SectionHeader';
import {
  CREDIT_CARD_BILL_MOCK,
  CREDIT_CARD_PAYMENT_HISTORY_MOCK,
  type CreditCardPaymentHistoryItem,
} from './creditCardBillMockData';
import './CreditCardBillDashboardPage.css';

export interface CreditCardBillDashboardPageProps {
  colorScheme?: 'light' | 'dark';
  onBack?: () => void;
  /** Bill snapshot — defaults to mock */
  bill?: typeof CREDIT_CARD_BILL_MOCK;
  paymentHistory?: CreditCardPaymentHistoryItem[];
  onPayNow?: () => void;
  onViewStatement?: () => void;
  /** Blocks Pay now (e.g. in-flight payment) */
  payDisabled?: boolean;
  payDisabledReason?: string;
  /** e.g. bank confirmation pending */
  secondaryBanner?: string;
  /** Extra block below Recent payments (e.g. autopay placeholder) */
  bottomSlot?: ReactNode;
}

function fmtInr(n: number) {
  return n.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function statusBadge(status: CreditCardPaymentHistoryItem['status']) {
  if (status === 'success')
    return (
      <Badge type="text" context="positive" muted label="Success" />
    );
  if (status === 'pending')
    return <Badge type="text" context="notice" muted label="Processing" />;
  if (status === 'reversed')
    return <Badge type="text" context="notice" muted label="Reversed" />;
  return <Badge type="text" context="negative" muted label="Failed" />;
}

export function CreditCardBillDashboardPage({
  colorScheme = 'dark',
  onBack,
  bill = CREDIT_CARD_BILL_MOCK,
  paymentHistory = CREDIT_CARD_PAYMENT_HISTORY_MOCK,
  onPayNow,
  onViewStatement,
  payDisabled = false,
  payDisabledReason,
  secondaryBanner,
  bottomSlot,
}: CreditCardBillDashboardPageProps) {
  const headerIsDark = colorScheme === 'dark';

  return (
    <div className="ccb">
      <Header
        key={colorScheme}
        type="regular"
        title="Credit card"
        subtitle={`${bill.maskedCardLabel} · · · · ${bill.last4}`}
        statusBarTheme={headerIsDark ? 'dark' : 'light'}
        showBackButton={Boolean(onBack)}
        onBack={onBack}
        showGradient={false}
        className="ccb__header"
      />

      <div className="ccb__content">
        {(bill.reminderBanner || secondaryBanner) && (
          <div className="ccb__banners" aria-label="Notices">
            {bill.reminderBanner && (
              <Alert
                type="sleek"
                state={(bill.reminderAlertState ?? 'primary') as AlertState}
                showIcon
                iconContent={bill.reminderAlertIcon}
                description={bill.reminderBanner}
                showCta={false}
                showClose={false}
                className="ccb__alert"
              />
            )}
            {secondaryBanner && (
              <Alert
                type="sleek"
                state="warning"
                showIcon
                iconContent="clock_circle_outline"
                description={secondaryBanner}
                showCta={false}
                showClose={false}
                className="ccb__alert"
              />
            )}
          </div>
        )}

        <section
          className="ccb__section"
          aria-label={bill.billGenerated ? 'Your bill' : 'Account summary'}
        >
          <SectionHeader
            size="large"
            title={bill.billGenerated ? 'Your bill' : 'Account summary'}
            showChevron
            trailing="none"
            showSubtext={false}
            className="ccb__section-header"
          />
          <div className="ccb-section__content">
            {bill.statusChips && bill.statusChips.length > 0 && (
              <div
                className="ccb__status-chips"
                role="status"
                aria-label="Bill status"
              >
                {bill.statusChips.map((c) => (
                  <Badge
                    key={c.label}
                    type="text"
                    context={c.context}
                    muted
                    label={c.label}
                  />
                ))}
              </div>
            )}
            <Card className="ccb__bill-card">
              {bill.billGenerated ? (
                <>
                  <div className="ccb__kv">
                    <div className="ccb__row">
                      <span className="ccb__row-label">Total amount due</span>
                      <span className="ccb__row-value ccb__row-value--emphasis">
                        ₹{fmtInr(bill.totalDue)}
                      </span>
                    </div>
                    <div className="ccb__row">
                      <span className="ccb__row-label">Minimum due</span>
                      <span className="ccb__row-value">₹{fmtInr(bill.minimumDue)}</span>
                    </div>
                    {bill.remainingDue !== undefined && bill.remainingDue > 0.005 && (
                      <div className="ccb__row">
                        <span className="ccb__row-label">Remaining due</span>
                        <span className="ccb__row-value">₹{fmtInr(bill.remainingDue)}</span>
                      </div>
                    )}
                    <div className="ccb__row">
                      <span className="ccb__row-label">Current outstanding</span>
                      <span className="ccb__row-value">₹{fmtInr(bill.currentOutstanding)}</span>
                    </div>
                    <div className="ccb__row">
                      <span className="ccb__row-label">Due date</span>
                      <span className="ccb__row-value">{bill.dueDateLabel}</span>
                    </div>
                  </div>
                  <hr className="ccb__divider" />
                  <p className="ccb__statement-meta">
                    Statement period: {bill.statementPeriodLabel}
                  </p>
                </>
              ) : (
                <div className="ccb__kv">
                  <div className="ccb__row">
                    <span className="ccb__row-label">Current outstanding</span>
                    <span className="ccb__row-value ccb__row-value--emphasis">
                      ₹{fmtInr(bill.currentOutstanding)}
                    </span>
                  </div>
                  {bill.nextStatementDateLabel && (
                    <p className="ccb__statement-meta">
                      Next statement: {bill.nextStatementDateLabel}
                    </p>
                  )}
                </div>
              )}
            </Card>

            <div className="ccb__actions">
              {payDisabled && payDisabledReason && (
                <p className="ccb__inline-hint" role="status">
                  {payDisabledReason}
                </p>
              )}
              <Button
                htmlType="button"
                variant="filled"
                size="large"
                label="Pay now"
                icon="none"
                disabled={payDisabled}
                onClick={onPayNow}
              />
              <Button
                htmlType="button"
                variant="stroke"
                size="large"
                label={
                  bill.billGenerated
                    ? 'View & download statement'
                    : 'View account activity'
                }
                icon="none"
                onClick={onViewStatement}
              />
            </div>
          </div>
        </section>

        <section className="ccb__section" aria-label="Recent payments">
          <SectionHeader
            size="large"
            title="Recent payments"
            showChevron
            trailing="none"
            showSubtext={false}
            className="ccb__section-header"
          />
          <div className="ccb-section__content">
            <div className="ccb__history">
              {paymentHistory.map((p) => (
                <div key={p.id} className="ccb__history-item">
                  <div className="ccb__history-main">
                    <p className="ccb__history-amt">₹{fmtInr(p.amount)}</p>
                    <p className="ccb__history-meta">
                      {p.dateLabel} · {p.methodLabel}
                    </p>
                    <p className="ccb__history-ref">Ref: {p.referenceId}</p>
                  </div>
                  {statusBadge(p.status)}
                </div>
              ))}
            </div>
          </div>
        </section>
        {bottomSlot}
      </div>
    </div>
  );
}

export default CreditCardBillDashboardPage;
