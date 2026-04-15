/** Mock data for credit card bill payment PRD — replace with CMS / card system APIs. */

import type { BadgeContext } from '../components/Badge';

export type PaymentHistoryStatus = 'success' | 'pending' | 'failed' | 'reversed';

/** Matches `Alert` `state` when `reminderBanner` is shown in an Alert */
export type CreditCardReminderAlertState =
  | 'primary'
  | 'warning'
  | 'positive'
  | 'negative';

export interface CreditCardBillSnapshot {
  maskedCardLabel: string;
  /** Last four digits for display */
  last4: string;
  billGenerated: boolean;
  totalDue: number;
  minimumDue: number;
  currentOutstanding: number;
  dueDateLabel: string;
  statementPeriodLabel: string;
  /** When no statement yet */
  nextStatementDateLabel?: string;
  /** In-app reminder line (e.g. due soon) */
  reminderBanner?: string;
  /** Visual state for Alert when showing `reminderBanner` */
  reminderAlertState?: CreditCardReminderAlertState;
  /** Icon name in `icons/svg/glyphs` for reminder Alert */
  reminderAlertIcon?: string;
  /** Remaining on current statement after payments */
  remainingDue?: number;
  /** Status chips for dashboard (Paid, Due soon, …) */
  statusChips?: { label: string; context: BadgeContext }[];
  /** Short bill/payment status line for pay flows (e.g. Payment due) */
  billPaymentStatusLabel?: string;
}

export interface CreditCardPaymentHistoryItem {
  id: string;
  amount: number;
  status: PaymentHistoryStatus;
  dateLabel: string;
  methodLabel: string;
  referenceId: string;
}

export const CREDIT_CARD_BILL_MOCK: CreditCardBillSnapshot = {
  maskedCardLabel: 'Platinum',
  last4: '4242',
  billGenerated: true,
  totalDue: 45231.55,
  minimumDue: 2261.58,
  currentOutstanding: 44890.12,
  dueDateLabel: '12 Apr 2026',
  statementPeriodLabel: '08 Mar 2026 – 07 Apr 2026',
  reminderBanner: 'Due in 5 days',
  reminderAlertState: 'warning',
  reminderAlertIcon: 'calendar_outline',
  billPaymentStatusLabel: 'Payment due',
  statusChips: [{ label: 'Payment due', context: 'notice' }],
};

export const CREDIT_CARD_PAYMENT_HISTORY_MOCK: CreditCardPaymentHistoryItem[] = [
  {
    id: 'p1',
    amount: 15000.0,
    status: 'success',
    dateLabel: '02 Apr 2026, 4:18 PM',
    methodLabel: 'UPI',
    referenceId: 'PMLCC8829103',
  },
  {
    id: 'p2',
    amount: 5000.0,
    status: 'pending',
    dateLabel: '28 Mar 2026, 11:02 AM',
    methodLabel: 'Net banking',
    referenceId: 'PMLCC8829044',
  },
  {
    id: 'p3',
    amount: 2000.0,
    status: 'failed',
    dateLabel: '15 Mar 2026, 9:41 PM',
    methodLabel: 'Debit card',
    referenceId: 'PMLCC8828991',
  },
];
