import { Alert } from '../Alert';
import { Button } from '../Button';
import { DataPoints } from '../DataPoints';
import { Loading } from '../Loading';
import './PaymentOutcomeWidget.css';

export type PaymentOutcomeStatus = 'processing' | 'success' | 'failure';

export interface PaymentOutcomeWidgetProps {
  status: PaymentOutcomeStatus;
  title?: string;
  message: string;
  amountPaid?: string;
  referenceId?: string;
  supportText?: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  loading?: boolean;
  className?: string;
}

export function PaymentOutcomeWidget({
  status,
  title,
  message,
  amountPaid,
  referenceId,
  supportText,
  primaryActionLabel,
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction,
  loading = false,
  className,
}: PaymentOutcomeWidgetProps) {
  const root = ['pow', className].filter(Boolean).join(' ');

  if (status === 'processing') {
    const processingTitle = title ?? 'Processing payment';
    return (
      <section
        className={root}
        aria-live="polite"
        aria-busy={loading || true}
        aria-label={processingTitle}
      >
        <div className="pow__processing">
          <Loading type="theme" label={processingTitle} />
          <p className="pow__processing-title">{processingTitle}</p>
          <p className="pow__processing-message">{message}</p>
        </div>
      </section>
    );
  }

  if (status === 'success') {
    const items = [
      ...(amountPaid
        ? [
            {
              topLabel: 'Amount paid' as const,
              data: amountPaid,
              bottomLabel: 'INR' as const,
            },
          ]
        : []),
      ...(referenceId
        ? [
            {
              topLabel: 'Reference' as const,
              data: referenceId,
              bottomLabel: 'Save for support' as const,
            },
          ]
        : []),
    ];
    const showKpis = items.length === 2;

    return (
      <section className={root} aria-label={title ?? 'Payment successful'}>
        <div className="pow__content">
          <Alert
            type="detailed"
            state="positive"
            showIcon
            iconContent="checkmark_circle_filled"
            title={title ?? 'Payment successful'}
            showTitle
            description={message}
            showDescription
            showCta={false}
            showClose={false}
          />
          {showKpis && (
            <DataPoints
              type="2-spaced-out"
              className="pow__datapoints"
              items={items}
            />
          )}
          {supportText && (
            <p className="pow__support">{supportText}</p>
          )}
          <div className="pow__actions">
            {primaryActionLabel && onPrimaryAction && (
              <Button
                htmlType="button"
                variant="filled"
                size="large"
                label={primaryActionLabel}
                icon="none"
                onClick={onPrimaryAction}
              />
            )}
            {secondaryActionLabel && onSecondaryAction && (
              <Button
                htmlType="button"
                variant="stroke"
                size="large"
                label={secondaryActionLabel}
                icon="none"
                onClick={onSecondaryAction}
              />
            )}
          </div>
        </div>
      </section>
    );
  }

  /* failure */
  return (
    <section className={root} aria-label={title ?? 'Payment failed'}>
      <div className="pow__content">
        <Alert
          type="detailed"
          state="negative"
          showIcon
          iconContent="exclamation_circle_outline"
          title={title ?? 'Payment unsuccessful'}
          showTitle
          description={message}
          showDescription
          showCta={false}
          showClose={false}
        />
        {supportText && <p className="pow__support">{supportText}</p>}
        <div className="pow__actions">
          {primaryActionLabel && onPrimaryAction && (
            <Button
              htmlType="button"
              variant="filled"
              size="large"
              label={primaryActionLabel}
              icon="none"
              onClick={onPrimaryAction}
            />
          )}
          {secondaryActionLabel && onSecondaryAction && (
            <Button
              htmlType="button"
              variant="stroke"
              size="large"
              label={secondaryActionLabel}
              icon="none"
              onClick={onSecondaryAction}
            />
          )}
        </div>
      </div>
    </section>
  );
}
