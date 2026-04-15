import { Card } from '../Card';
import { Checkbox } from '../Checkbox';
import { Loading } from '../Loading';
import { SectionHeader } from '../SectionHeader';
import './PaymentReviewWidget.css';

export interface ReviewSummaryRow {
  label: string;
  value: string;
}

export interface PaymentReviewWidgetProps {
  title: string;
  /** Account / card identity line (value for the “Card” row). */
  cardLabel: string;
  amountLabel: string;
  amountValue: string;
  methodLabel: string;
  methodValue: string;
  summaryRows?: ReviewSummaryRow[];
  disclaimer: string;
  confirmationChecked: boolean;
  confirmationLabel: string;
  onConfirmationChange: (checked: boolean) => void;
  loading?: boolean;
  className?: string;
}

export function PaymentReviewWidget({
  title,
  cardLabel,
  amountLabel,
  amountValue,
  methodLabel,
  methodValue,
  summaryRows = [],
  disclaimer,
  confirmationChecked,
  confirmationLabel,
  onConfirmationChange,
  loading = false,
  className,
}: PaymentReviewWidgetProps) {
  const rootClass = ['prw', className].filter(Boolean).join(' ');

  return (
    <section className={rootClass} aria-label={title}>
      <SectionHeader
        size="large"
        title={title}
        showChevron={false}
        trailing="none"
        showSubtext={false}
        className="prw__section-header"
      />
      <div className="prw__content">
        {loading ? (
          <div className="prw__loading">
            <Loading type="theme" label="Loading review" />
          </div>
        ) : (
          <>
            <Card className="prw__card">
              <div className="prw__kv">
                <div className="prw__row">
                  <span className="prw__row-label">Card</span>
                  <span className="prw__row-value">{cardLabel}</span>
                </div>
                <div className="prw__row">
                  <span className="prw__row-label">{amountLabel}</span>
                  <span className="prw__row-value prw__row-value--emphasis">
                    {amountValue}
                  </span>
                </div>
                <div className="prw__row">
                  <span className="prw__row-label">{methodLabel}</span>
                  <span className="prw__row-value">{methodValue}</span>
                </div>
                {summaryRows.map((row) => (
                  <div key={row.label} className="prw__row">
                    <span className="prw__row-label">{row.label}</span>
                    <span className="prw__row-value">{row.value}</span>
                  </div>
                ))}
              </div>
              <p className="prw__meta">{disclaimer}</p>
            </Card>
            <div className="prw__checkbox-wrap">
              <Checkbox
                state={confirmationChecked ? 'checked' : 'unchecked'}
                layout="block"
                label={confirmationLabel}
                showLabel
                onChange={(e) => onConfirmationChange(e.target.checked)}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
