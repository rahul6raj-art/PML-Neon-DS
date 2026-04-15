import { useCallback, useEffect, useMemo, useState } from 'react';
import { AmountSelectionWidget } from '../components/AmountSelectionWidget';
import { BillSummaryWidget } from '../components/BillSummaryWidget';
import { Button } from '../components/Button';
import { FlowStepperWidget } from '../components/FlowStepperWidget';
import { Header } from '../components/Header';
import { PaymentMethodSelectionWidget } from '../components/PaymentMethodSelectionWidget';
import { PaymentOutcomeWidget } from '../components/PaymentOutcomeWidget';
import { PaymentReviewWidget } from '../components/PaymentReviewWidget';
import {
  CREDIT_CARD_BILL_MOCK,
  type CreditCardBillSnapshot,
} from './creditCardBillMockData';
import {
  CREDIT_CARD_PAYMENT_METHODS_MOCK,
  type SavedPaymentMethod,
} from './creditCardPaymentFlowMockData';
import './CreditCardBillPaymentFlowPage.css';

export type CreditCardPaymentFlowStep =
  | 'bill-summary'
  | 'amount'
  | 'payment-method'
  | 'review'
  | 'processing'
  | 'success'
  | 'failure';

export type CreditCardAmountMode = 'minimum' | 'total' | 'custom';

const FLOW_STEP_IDS = [
  'bill-summary',
  'amount',
  'payment-method',
  'review',
] as const;

const FLOW_STEPS = [
  { id: 'bill-summary', label: 'Bill summary', shortLabel: 'Bill' },
  { id: 'amount', label: 'Amount', shortLabel: 'Amount' },
  { id: 'payment-method', label: 'Payment method', shortLabel: 'Method' },
  { id: 'review', label: 'Review', shortLabel: 'Review' },
] as const;

function fmtInr(n: number) {
  return n.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function parseInrInput(raw: string): number | null {
  const cleaned = raw.replace(/[₹,\s]/g, '').trim();
  if (cleaned === '' || cleaned === '.') return null;
  if (!/^\d*\.?\d*$/.test(cleaned)) return null;
  const frac = cleaned.split('.')[1];
  if (frac && frac.length > 2) return null;
  const n = Number(cleaned);
  if (Number.isNaN(n)) return null;
  return n;
}

function validateCustomAmount(
  n: number | null,
  maxOutstanding: number,
): string | null {
  if (n === null) return 'Enter an amount';
  if (n <= 0) return 'Amount must be greater than zero';
  if (n > maxOutstanding) {
    return `Amount cannot exceed ₹${fmtInr(maxOutstanding)} (current outstanding)`;
  }
  return null;
}

function flowStepperState(step: CreditCardPaymentFlowStep): {
  currentStepId: string;
  completedStepIds: string[];
} {
  const all = [...FLOW_STEP_IDS];
  switch (step) {
    case 'bill-summary':
      return { currentStepId: 'bill-summary', completedStepIds: [] };
    case 'amount':
      return { currentStepId: 'amount', completedStepIds: ['bill-summary'] };
    case 'payment-method':
      return {
        currentStepId: 'payment-method',
        completedStepIds: ['bill-summary', 'amount'],
      };
    case 'review':
      return {
        currentStepId: 'review',
        completedStepIds: ['bill-summary', 'amount', 'payment-method'],
      };
    case 'failure':
      return {
        currentStepId: 'review',
        completedStepIds: ['bill-summary', 'amount', 'payment-method'],
      };
    case 'processing':
    case 'success':
      return { currentStepId: 'review', completedStepIds: all };
    default:
      return { currentStepId: 'bill-summary', completedStepIds: [] };
  }
}

function paymentRef() {
  return `PMLCC${Date.now().toString().slice(-10)}`;
}

export interface CreditCardBillPaymentFlowPageProps {
  colorScheme?: 'light' | 'dark';
  bill?: CreditCardBillSnapshot;
  paymentMethods?: SavedPaymentMethod[];
  onExit?: () => void;
  /** When true, payment attempts end in failure (for demos / tests). */
  simulatePaymentFailure?: boolean;
  /** Simulated gateway delay before success or failure. */
  processingMs?: number;
}

export function CreditCardBillPaymentFlowPage({
  colorScheme = 'dark',
  bill = CREDIT_CARD_BILL_MOCK,
  paymentMethods = CREDIT_CARD_PAYMENT_METHODS_MOCK,
  onExit,
  simulatePaymentFailure = false,
  processingMs = 1800,
}: CreditCardBillPaymentFlowPageProps) {
  const headerIsDark = colorScheme === 'dark';

  const [step, setStep] = useState<CreditCardPaymentFlowStep>('bill-summary');
  const [amountMode, setAmountMode] = useState<CreditCardAmountMode>('total');
  const [customAmountInput, setCustomAmountInput] = useState('');
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(
    () => paymentMethods[0]?.id ?? null,
  );
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [failureMessage, setFailureMessage] = useState<string | null>(null);
  const [successRef, setSuccessRef] = useState<string | null>(null);

  const maxPay = bill.currentOutstanding;

  const customParsed = useMemo(
    () => parseInrInput(customAmountInput),
    [customAmountInput],
  );
  const customError = useMemo(() => {
    if (amountMode !== 'custom') return null;
    return validateCustomAmount(customParsed, maxPay);
  }, [amountMode, customParsed, maxPay]);

  const resolvedAmount = useMemo(() => {
    if (amountMode === 'minimum') return bill.minimumDue;
    if (amountMode === 'total') return bill.totalDue;
    return customParsed ?? 0;
  }, [amountMode, bill.minimumDue, bill.totalDue, customParsed]);

  const selectedMethod = useMemo(
    () => paymentMethods.find((m) => m.id === selectedMethodId) ?? null,
    [paymentMethods, selectedMethodId],
  );

  const amountStepValid =
    amountMode !== 'custom' || (customParsed !== null && !customError);

  const canContinueAmount = amountStepValid;
  const canContinueMethod = Boolean(selectedMethodId);
  const canSubmitReview = termsAccepted;

  const goBack = useCallback(() => {
    if (step === 'bill-summary') {
      onExit?.();
      return;
    }
    if (step === 'amount') setStep('bill-summary');
    else if (step === 'payment-method') setStep('amount');
    else if (step === 'review') setStep('payment-method');
    else if (step === 'failure') {
      setFailureMessage(null);
      setStep('review');
    } else if (step === 'success') {
      onExit?.();
    }
  }, [onExit, step]);

  useEffect(() => {
    if (step !== 'processing') return;
    const t = window.setTimeout(() => {
      if (simulatePaymentFailure) {
        setFailureMessage(
          'We could not reach your bank. No money was debited. You can retry or use another method.',
        );
        setStep('failure');
      } else {
        setSuccessRef(paymentRef());
        setStep('success');
      }
    }, processingMs);
    return () => window.clearTimeout(t);
  }, [step, simulatePaymentFailure, processingMs]);

  const { currentStepId, completedStepIds } = useMemo(
    () => flowStepperState(step),
    [step],
  );

  const showTimeline = step !== 'processing';

  const handlePayClick = useCallback(() => {
    setStep('processing');
  }, []);

  const handleRetry = useCallback(() => {
    setFailureMessage(null);
    setStep('processing');
  }, []);

  const subtitle = `${bill.maskedCardLabel} · · · · ${bill.last4}`;

  const billStatusLabel =
    bill.statusChips?.[0]?.label ?? bill.billPaymentStatusLabel ?? 'Bill';

  const methodRows = useMemo(
    () =>
      paymentMethods.map((m) => ({
        id: m.id,
        primaryLabel: m.label,
        secondaryLabel: m.detail,
      })),
    [paymentMethods],
  );

  const amountOptions = useMemo(
    () => [
      {
        id: 'minimum' as const,
        label: `Minimum · ₹${fmtInr(bill.minimumDue)}`,
      },
      {
        id: 'total' as const,
        label: `Total due · ₹${fmtInr(bill.totalDue)}`,
      },
      { id: 'custom' as const, label: 'Custom' },
    ],
    [bill.minimumDue, bill.totalDue],
  );

  const amountSummary = useMemo(() => {
    const amt =
      amountMode === 'minimum' ? bill.minimumDue : bill.totalDue;
    const suffix =
      amountMode === 'minimum' ? '(minimum due)' : '(total due on statement)';
    return (
      <>
        Paying <strong>₹{fmtInr(amt)}</strong> {suffix}
      </>
    );
  }, [amountMode, bill.minimumDue, bill.totalDue]);

  return (
    <div className="ccb-pay">
      <Header
        key={colorScheme}
        type="regular"
        title="Pay bill"
        subtitle={subtitle}
        statusBarTheme={headerIsDark ? 'dark' : 'light'}
        showBackButton={step !== 'processing'}
        onBack={goBack}
        showGradient={false}
        className="ccb-pay__header"
      />

      <div className="ccb-pay__content">
        {showTimeline && (
          <div className="ccb-pay__timeline">
            <FlowStepperWidget
              steps={[...FLOW_STEPS]}
              currentStepId={currentStepId}
              completedStepIds={completedStepIds}
              orientation="horizontal"
              ariaLabel="Bill payment progress"
            />
          </div>
        )}

        {step === 'bill-summary' && (
          <div className="ccb-pay__section">
            <BillSummaryWidget
              cardName={bill.maskedCardLabel}
              maskedCardNumber={`· · · · ${bill.last4}`}
              billStatus={billStatusLabel}
              totalDue={`₹${fmtInr(bill.totalDue)}`}
              minimumDue={`₹${fmtInr(bill.minimumDue)}`}
              outstandingAmount={`₹${fmtInr(bill.currentOutstanding)}`}
              dueDate={bill.dueDateLabel}
              statementPeriod={bill.statementPeriodLabel}
              showStatementPeriod={bill.billGenerated}
              statusNote={bill.reminderBanner}
            />
            <div className="ccb-pay-section__content">
              <div className="ccb-pay__actions">
                <Button
                  htmlType="button"
                  variant="filled"
                  size="large"
                  label="Continue"
                  icon="none"
                  onClick={() => setStep('amount')}
                />
              </div>
            </div>
          </div>
        )}

        {step === 'amount' && (
          <div className="ccb-pay__section">
            <AmountSelectionWidget
              title="Choose amount"
              options={amountOptions}
              selectedOptionId={amountMode}
              customAmount={customAmountInput}
              customAmountLabel="Amount (INR)"
              helperText={`Up to ₹${fmtInr(maxPay)} outstanding`}
              validationMessage={customError ?? undefined}
              showCustomAmount={amountMode === 'custom'}
              ctaEnabled={canContinueAmount}
              onOptionSelect={(id) =>
                setAmountMode(id as CreditCardAmountMode)
              }
              onCustomAmountChange={setCustomAmountInput}
              summaryContent={amountSummary}
            />
            <div className="ccb-pay-section__content">
              <div className="ccb-pay__actions">
                <Button
                  htmlType="button"
                  variant="filled"
                  size="large"
                  label="Continue"
                  icon="none"
                  disabled={!canContinueAmount}
                  onClick={() => setStep('payment-method')}
                />
              </div>
            </div>
          </div>
        )}

        {step === 'payment-method' && (
          <div className="ccb-pay__section">
            <PaymentMethodSelectionWidget
              title="Payment method"
              methods={methodRows}
              selectedMethodId={selectedMethodId}
              onMethodSelect={setSelectedMethodId}
            />
            <div className="ccb-pay-section__content">
              <div className="ccb-pay__actions">
                <Button
                  htmlType="button"
                  variant="filled"
                  size="large"
                  label="Continue"
                  icon="none"
                  disabled={!canContinueMethod}
                  onClick={() => {
                    setTermsAccepted(false);
                    setStep('review');
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {step === 'review' && selectedMethod && (
          <div className="ccb-pay__section">
            <PaymentReviewWidget
              title="Review & confirm"
              cardLabel={`${bill.maskedCardLabel} · · · · ${bill.last4}`}
              amountLabel="Paying"
              amountValue={`₹${fmtInr(resolvedAmount)}`}
              methodLabel="Method"
              methodValue={selectedMethod.label}
              summaryRows={[
                {
                  label: 'Outstanding after pay*',
                  value: `₹${fmtInr(Math.max(0, bill.currentOutstanding - resolvedAmount))}`,
                },
              ]}
              disclaimer="*Illustrative — actual posting depends on bank confirmation."
              confirmationChecked={termsAccepted}
              confirmationLabel="I confirm the amount and payment method are correct."
              onConfirmationChange={setTermsAccepted}
            />
            <div className="ccb-pay-section__content">
              <div className="ccb-pay__actions">
                <Button
                  htmlType="button"
                  variant="filled"
                  size="large"
                  label="Confirm and pay"
                  icon="none"
                  disabled={!canSubmitReview}
                  onClick={handlePayClick}
                />
              </div>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="ccb-pay__section">
            <PaymentOutcomeWidget
              status="processing"
              title="Processing payment"
              message="Please wait—We're confirming with your bank. Do not leave this screen."
              loading
            />
          </div>
        )}

        {step === 'success' && successRef && (
          <div className="ccb-pay__section" aria-label="Payment successful">
            <PaymentOutcomeWidget
              status="success"
              title="Payment successful"
              message="Your payment is submitted. You will see it in Recent payments once the bank confirms."
              amountPaid={`₹${fmtInr(resolvedAmount)}`}
              referenceId={successRef}
              supportText="Save the reference if you need to contact support."
              primaryActionLabel="Done"
              onPrimaryAction={() => onExit?.()}
            />
          </div>
        )}

        {step === 'failure' && failureMessage && (
          <div className="ccb-pay__section" aria-label="Payment failed">
            <PaymentOutcomeWidget
              status="failure"
              title="Couldn't complete payment"
              message={failureMessage}
              supportText="Your amount and payment method are unchanged. You can retry from here or go back to review to edit before paying again."
              primaryActionLabel="Retry"
              onPrimaryAction={handleRetry}
              secondaryActionLabel="Back to review"
              onSecondaryAction={() => {
                setFailureMessage(null);
                setStep('review');
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CreditCardBillPaymentFlowPage;
