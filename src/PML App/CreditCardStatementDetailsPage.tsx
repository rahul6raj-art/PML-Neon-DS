import type { ReactNode } from 'react';
import { Alert, type AlertState } from '../components/Alert';
import { BillSummaryWidget } from '../components/BillSummaryWidget';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Header } from '../components/Header';
import { LedgerActivityListWidget } from '../components/LedgerActivityListWidget';
import { ListItem } from '../components/ListItem';
import { Loading } from '../components/Loading';
import { SectionHeader } from '../components/SectionHeader';
import {
  CREDIT_CARD_STATEMENT_MOCK,
  formatCreditInr,
  type CreditCardStatementDetailsData,
  type StatementBreakdownRow,
  type StatementTransactionRow,
} from './creditCardStatementMockData';
import './CreditCardStatementDetailsPage.css';

export interface CreditCardStatementDetailsPageProps {
  colorScheme?: 'light' | 'dark';
  onBack?: () => void;
  data?: CreditCardStatementDetailsData;
  /** Bill summary block (widget-level skeleton) */
  billSummaryLoading?: boolean;
  breakdownLoading?: boolean;
  /** Section-level fetch failure — SectionErrorBanner contract → Alert */
  breakdownError?: string;
  onRetryBreakdown?: () => void;
  transactionsLoading?: boolean;
  transactionsUnavailable?: string;
  /** BillSummaryWidget partial fetch */
  billSummaryPartialMessage?: string;
  onRetryBillSummary?: () => void;
  onPayNow?: () => void;
  onViewFullStatement?: () => void;
  onDownloadStatement?: () => void;
  onSetupAutopay?: () => void;
  payDisabled?: boolean;
  payDisabledReason?: string;
  bottomSlot?: ReactNode;
}

function formatBreakdownAmount(row: StatementBreakdownRow): string {
  const v = row.amount;
  const s = formatCreditInr(Math.abs(v));
  if (v < 0) return `-${s}`;
  return s;
}

function formatTransactionTrailing(row: StatementTransactionRow): string {
  const v = row.amount;
  const s = formatCreditInr(Math.abs(v));
  if (v < 0) return `-${s}`;
  return s;
}

function transactionSecondary(row: StatementTransactionRow): string {
  const base = row.dateLabel;
  if (row.statusNote) return `${base} · ${row.statusNote}`;
  return base;
}

export function CreditCardStatementDetailsPage({
  colorScheme = 'dark',
  onBack,
  data = CREDIT_CARD_STATEMENT_MOCK,
  billSummaryLoading = false,
  breakdownLoading = false,
  breakdownError,
  onRetryBreakdown,
  transactionsLoading = false,
  transactionsUnavailable,
  billSummaryPartialMessage,
  onRetryBillSummary,
  onPayNow,
  onViewFullStatement,
  onDownloadStatement,
  onSetupAutopay,
  payDisabled = false,
  payDisabledReason,
  bottomSlot,
}: CreditCardStatementDetailsPageProps) {
  const headerIsDark = colorScheme === 'dark';
  const hasBreakdownError = Boolean(breakdownError?.trim());
  const ledgerItems = data.transactions.map((t) => ({
    primaryText: t.merchant,
    secondaryText: transactionSecondary(t),
    trailingText: formatTransactionTrailing(t),
  }));

  return (
    <div className="ccsd">
      <Header
        key={colorScheme}
        type="regular"
        title="Statement details"
        subtitle={`${data.cardName} · ${data.maskedCardNumber}`}
        statusBarTheme={headerIsDark ? 'dark' : 'light'}
        showBackButton={Boolean(onBack)}
        onBack={onBack}
        showGradient={false}
        className="ccsd__header"
      />

      <div className="ccsd__content">
        {data.reminderBanner && (
          <div className="ccsd__banners" aria-label="Notices">
            <Alert
              type="sleek"
              state={(data.reminderAlertState ?? 'warning') as AlertState}
              showIcon
              iconContent={data.reminderAlertIcon ?? 'info_circle_outline'}
              description={data.reminderBanner}
              showDescription
              showCta={false}
              showClose={false}
              className="ccsd__alert"
            />
          </div>
        )}

        <section className="ccsd__section" aria-label="Bill summary">
          <BillSummaryWidget
            cardName={data.cardName}
            maskedCardNumber={data.maskedCardNumber}
            issuer={data.issuer}
            billStatus={data.billStatus}
            totalDue={formatCreditInr(data.totalDue)}
            minimumDue={formatCreditInr(data.minimumDue)}
            outstandingAmount={formatCreditInr(data.outstandingAmount)}
            dueDate={data.dueDateLabel}
            statementPeriod={data.statementPeriodLabel}
            helperText={data.helperText}
            statusNote={data.statusNote}
            showStatementPeriod
            loading={billSummaryLoading}
            partialFailureMessage={billSummaryPartialMessage}
            onRetryFetch={onRetryBillSummary}
          />
        </section>

        <section className="ccsd__section" aria-label="Bill breakdown">
          <SectionHeader
            size="large"
            title="Bill breakdown"
            showChevron={false}
            trailing="none"
            showSubtext={false}
            className="ccsd__section-header"
          />
          <div className="ccsd-section__content">
            {hasBreakdownError && (
              <Alert
                type="sleek"
                state="negative"
                showIcon
                description={breakdownError!}
                showDescription
                showCta={Boolean(onRetryBreakdown)}
                ctaLabel="Retry"
                ctaVariant="filled"
                ctaSize="small"
                onCtaClick={onRetryBreakdown}
                showClose={false}
                className="ccsd__alert"
              />
            )}
            {breakdownLoading && !hasBreakdownError && (
              <div className="ccsd__breakdown-loading" role="status" aria-live="polite">
                <Loading type="theme" label="Loading breakdown" />
              </div>
            )}
            {!breakdownLoading && !hasBreakdownError && data.breakdownRows.length > 0 ? (
              <Card className="ccsd__breakdown-card">
                <div className="ccsd__breakdown-rows">
                  {data.breakdownRows.map((row, i) => (
                    <ListItem
                      key={`${row.label}-${i}`}
                      variant="default"
                      showLeading={false}
                      showSubtext={false}
                      primaryText={row.label}
                      showTrailing
                      trailing="text"
                      trailingText={formatBreakdownAmount(row)}
                      showSeparator={i < data.breakdownRows.length - 1}
                      className={
                        row.kind === 'credit' || row.amount < 0
                          ? 'ccsd__breakdown-row--credit'
                          : undefined
                      }
                    />
                  ))}
                </div>
              </Card>
            ) : null}
            {!breakdownLoading && !hasBreakdownError && data.breakdownRows.length === 0 ? (
              <p className="ccsd__breakdown-empty">No breakdown is available for this statement.</p>
            ) : null}
          </div>
        </section>

        <section className="ccsd__section" aria-label="Recent statement transactions">
          <LedgerActivityListWidget
            title="Recent transactions"
            showChevron={false}
            trailing="none"
            linkText="View full statement"
            onLinkPress={onViewFullStatement}
            items={ledgerItems}
            loading={transactionsLoading}
            emptyMessage="No transactions on this statement yet."
            unavailableMessage={transactionsUnavailable}
          />
        </section>

        {data.insightsBody && (
          <section className="ccsd__section" aria-label={data.insightsTitle ?? 'Statement insights'}>
            <SectionHeader
              size="large"
              title={data.insightsTitle ?? 'Statement insights'}
              showChevron={false}
              trailing="none"
              showSubtext={false}
              className="ccsd__section-header"
            />
            <div className="ccsd-section__content">
              <Card className="ccsd__insights-card">
                <p className="ccsd__insights-copy">{data.insightsBody}</p>
              </Card>
            </div>
          </section>
        )}

        <section className="ccsd__section" aria-label="Payment actions">
          <div className="ccsd-section__content">
            <div className="ccsd__action-alerts">
              {data.minimumDueDisclaimer && (
                <Alert
                  type="sleek"
                  state="warning"
                  showIcon
                  iconContent="info_circle_outline"
                  description={data.minimumDueDisclaimer}
                  showDescription
                  showCta={false}
                  showClose={false}
                />
              )}
            </div>
            <div className="ccsd__actions">
              {payDisabled && payDisabledReason && (
                <p className="ccsd__inline-hint" role="status">
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
              {onDownloadStatement && (
                <Button
                  htmlType="button"
                  variant="stroke"
                  size="large"
                  label="Download statement"
                  icon="none"
                  onClick={onDownloadStatement}
                />
              )}
              {onSetupAutopay && (
                <Button
                  htmlType="button"
                  variant="stroke"
                  size="large"
                  label="Set up autopay"
                  icon="none"
                  onClick={onSetupAutopay}
                />
              )}
            </div>
          </div>
        </section>

        {bottomSlot}
      </div>
    </div>
  );
}

export default CreditCardStatementDetailsPage;
