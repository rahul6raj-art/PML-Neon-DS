import { Card } from '../Card';
import { Loading } from '../Loading';
import { Radio } from '../Radio';
import { SectionHeader } from '../SectionHeader';
import './PaymentMethodSelectionWidget.css';

export interface PaymentMethodRow {
  id: string;
  primaryLabel: string;
  secondaryLabel?: string;
}

export interface PaymentMethodSelectionWidgetProps {
  title: string;
  methods: PaymentMethodRow[];
  selectedMethodId: string | null;
  helperText?: string;
  emptyMessage?: string;
  unavailableMessage?: string;
  loading?: boolean;
  onMethodSelect: (methodId: string) => void;
  className?: string;
}

export function PaymentMethodSelectionWidget({
  title,
  methods,
  selectedMethodId,
  helperText,
  emptyMessage,
  unavailableMessage,
  loading = false,
  onMethodSelect,
  className,
}: PaymentMethodSelectionWidgetProps) {
  const rootClass = ['pmsw', className].filter(Boolean).join(' ');

  return (
    <section className={rootClass} aria-label={title}>
      <SectionHeader
        size="large"
        title={title}
        showChevron={false}
        trailing="none"
        showSubtext={false}
        className="pmsw__section-header"
      />
      <div className="pmsw__content">
        {loading && (
          <div className="pmsw__loading">
            <Loading type="theme" label="Loading payment methods" />
          </div>
        )}
        {!loading && unavailableMessage && (
          <p className="pmsw__fallback" role="status">
            {unavailableMessage}
          </p>
        )}
        {!loading && !unavailableMessage && methods.length === 0 && emptyMessage && (
          <p className="pmsw__fallback" role="status">
            {emptyMessage}
          </p>
        )}
        {!loading && !unavailableMessage && methods.length > 0 && (
          <Card className="pmsw__card">
            <fieldset className="pmsw__fieldset">
              <legend className="pmsw__fieldset-legend">
                Saved payment methods
              </legend>
              {methods.map((m) => (
                <div
                  key={m.id}
                  className="pmsw__method-row"
                  onClick={() => onMethodSelect(m.id)}
                >
                  <Radio
                    name="pmsw-method"
                    value={m.id}
                    checked={selectedMethodId === m.id}
                    onChange={() => onMethodSelect(m.id)}
                    showLabel={false}
                    aria-label={
                      m.secondaryLabel
                        ? `${m.primaryLabel}, ${m.secondaryLabel}`
                        : m.primaryLabel
                    }
                  />
                  <span className="pmsw__method-text">
                    <span className="pmsw__method-label">{m.primaryLabel}</span>
                    {m.secondaryLabel && (
                      <span className="pmsw__method-detail">{m.secondaryLabel}</span>
                    )}
                  </span>
                </div>
              ))}
            </fieldset>
          </Card>
        )}
        {helperText && !loading && (
          <p className="pmsw__helper">{helperText}</p>
        )}
      </div>
    </section>
  );
}
