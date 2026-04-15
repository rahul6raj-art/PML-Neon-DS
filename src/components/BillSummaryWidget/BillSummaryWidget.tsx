import { Alert } from '../Alert';
import { Badge } from '../Badge';
import { Card } from '../Card';
import { DataPoints } from '../DataPoints';
import { Loading } from '../Loading';
import { SectionHeader } from '../SectionHeader';
import './BillSummaryWidget.css';

export interface BillSummaryWidgetProps {
  cardName: string;
  maskedCardNumber: string;
  issuer?: string;
  billStatus: string;
  totalDue: string;
  minimumDue: string;
  outstandingAmount: string;
  dueDate: string;
  statementPeriod?: string;
  helperText?: string;
  statusNote?: string;
  showStatementPeriod?: boolean;
  loading?: boolean;
  partialFailureMessage?: string;
  onRetryFetch?: () => void;
  className?: string;
}

export function BillSummaryWidget({
  cardName,
  maskedCardNumber,
  issuer,
  billStatus,
  totalDue,
  minimumDue,
  outstandingAmount,
  dueDate,
  statementPeriod,
  helperText,
  statusNote,
  showStatementPeriod = true,
  loading = false,
  partialFailureMessage,
  onRetryFetch,
  className,
}: BillSummaryWidgetProps) {
  const rootClass = ['bsw', className].filter(Boolean).join(' ');

  if (loading) {
    return (
      <section className={rootClass} aria-label="Bill summary" aria-busy="true">
        <SectionHeader
          size="large"
          title="Bill summary"
          showChevron={false}
          trailing="none"
          showSubtext={false}
          className="bsw__section-header"
        />
        <div className="bsw__content">
          <div className="bsw__loading">
            <Loading type="theme" label="Loading bill" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={rootClass} aria-label="Bill summary">
      {statusNote && (
        <div className="bsw__banner">
          <Alert
            type="sleek"
            state="warning"
            showIcon
            iconContent="calendar_outline"
            description={statusNote}
            showDescription
            showCta={false}
            showClose={false}
          />
        </div>
      )}
      {partialFailureMessage && (
        <div className="bsw__banner">
          <Alert
            type="sleek"
            state="negative"
            showIcon
            description={partialFailureMessage}
            showDescription
            showCta={Boolean(onRetryFetch)}
            ctaLabel="Retry"
            ctaVariant="filled"
            ctaSize="small"
            onCtaClick={onRetryFetch}
            showClose={false}
          />
        </div>
      )}
      <SectionHeader
        size="large"
        title="Bill summary"
        showChevron={false}
        trailing="none"
        showSubtext={false}
        className="bsw__section-header"
      />
      <div className="bsw__content">
        <div className="bsw__identity" aria-label="Card">
          <p className="bsw__identity-name">{cardName}</p>
          <p className="bsw__identity-mask">{maskedCardNumber}</p>
          {issuer && <p className="bsw__identity-issuer">{issuer}</p>}
        </div>
        <div className="bsw__status-chips" role="status" aria-label="Bill status">
          <Badge type="text" context="notice" muted label={billStatus} />
        </div>
        <DataPoints
          type="2-spaced-out"
          className="bsw__datapoints"
          items={[
            {
              topLabel: 'Total due',
              data: totalDue,
              bottomLabel: 'On statement',
            },
            {
              topLabel: 'Minimum due',
              data: minimumDue,
              bottomLabel: 'To stay current',
            },
          ]}
        />
        <Card className="bsw__card">
          <div className="bsw__kv">
            <div className="bsw__row">
              <span className="bsw__row-label">Current outstanding</span>
              <span className="bsw__row-value bsw__row-value--emphasis">
                {outstandingAmount}
              </span>
            </div>
            <div className="bsw__row">
              <span className="bsw__row-label">Due date</span>
              <span className="bsw__row-value">{dueDate}</span>
            </div>
            {showStatementPeriod && statementPeriod && (
              <p className="bsw__meta">Statement period: {statementPeriod}</p>
            )}
            {helperText && <p className="bsw__meta">{helperText}</p>}
          </div>
        </Card>
      </div>
    </section>
  );
}
