import type { ReactNode } from 'react';
import { Chip } from '../Chip';
import { Loading } from '../Loading';
import { SectionHeader } from '../SectionHeader';
import { TextField } from '../TextField';
import './AmountSelectionWidget.css';

export interface AmountOption {
  id: string;
  label: string;
}

export interface AmountSelectionWidgetProps {
  title: string;
  options: AmountOption[];
  selectedOptionId: string | null;
  customAmount: string;
  customAmountLabel: string;
  helperText?: string;
  validationMessage?: string;
  currency?: string;
  showCustomAmount: boolean;
  ctaEnabled: boolean;
  loading?: boolean;
  onOptionSelect: (optionId: string) => void;
  onCustomAmountChange: (value: string) => void;
  className?: string;
  /** Shown when not in custom mode (e.g. preset amount recap) */
  summaryContent?: ReactNode;
}

export function AmountSelectionWidget({
  title,
  options,
  selectedOptionId,
  customAmount,
  customAmountLabel,
  helperText,
  validationMessage,
  showCustomAmount,
  loading = false,
  onOptionSelect,
  onCustomAmountChange,
  className,
  summaryContent,
}: AmountSelectionWidgetProps) {
  const rootClass = ['asw', className].filter(Boolean).join(' ');

  return (
    <section className={rootClass} aria-label={title}>
      <SectionHeader
        size="large"
        title={title}
        showChevron={false}
        trailing="none"
        showSubtext={false}
        className="asw__section-header"
      />
      <div className="asw__content">
        {loading ? (
          <div className="asw__loading">
            <Loading type="theme" label="Loading amounts" />
          </div>
        ) : (
          <>
            <div
              className="asw__chip-row"
              role="group"
              aria-label="Amount options"
            >
              {options.map((opt) => (
                <Chip
                  key={opt.id}
                  type={selectedOptionId === opt.id ? 'selected' : 'default'}
                  size="small"
                  label={opt.label}
                  onPress={() => onOptionSelect(opt.id)}
                />
              ))}
            </div>
            {showCustomAmount && (
              <div className="asw__form">
                <TextField
                  label={customAmountLabel}
                  value={customAmount}
                  onChange={(e) => onCustomAmountChange(e.target.value)}
                  errorText={validationMessage || undefined}
                  assistiveText={
                    !validationMessage ? helperText : undefined
                  }
                  showLeadingIcon={false}
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder="0.00"
                />
              </div>
            )}
            {!showCustomAmount && summaryContent != null && (
              <div className="asw__summary">{summaryContent}</div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
