/** Mock for Credit Card Statement Details screen — replace with statement APIs. */

import type { CreditCardReminderAlertState } from './creditCardBillMockData';

export function formatCreditInrAmount(n: number): string {
  return n.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Prefix with ₹, no space (product rule). */
export function formatCreditInr(n: number): string {
  return `₹${formatCreditInrAmount(n)}`;
}

export type StatementBreakdownKind = 'charge' | 'credit';

export interface StatementBreakdownRow {
  label: string;
  amount: number;
  kind?: StatementBreakdownKind;
}

export interface StatementTransactionRow {
  merchant: string;
  dateLabel: string;
  amount: number;
  /** Appended to date line when present (Ledger `statusLabel` not rendered yet). */
  statusNote?: string;
}

export interface CreditCardStatementDetailsData {
  cardName: string;
  maskedCardNumber: string;
  issuer?: string;
  billStatus: string;
  totalDue: number;
  minimumDue: number;
  outstandingAmount: number;
  dueDateLabel: string;
  statementPeriodLabel: string;
  /** Sleek warning above Pay now */
  minimumDueDisclaimer?: string;
  /** Shown inside BillSummaryWidget card meta */
  helperText?: string;
  /** BillSummaryWidget sleek warning inside widget */
  statusNote?: string;
  /** Page-level banner above sections (e.g. autopay off) */
  reminderBanner?: string;
  reminderAlertState?: CreditCardReminderAlertState;
  reminderAlertIcon?: string;
  breakdownRows: StatementBreakdownRow[];
  transactions: StatementTransactionRow[];
  insightsTitle?: string;
  insightsBody?: string;
}

export const CREDIT_CARD_STATEMENT_MOCK: CreditCardStatementDetailsData = {
  cardName: 'PML Platinum',
  maskedCardNumber: '···· ···· ···· 4242',
  issuer: 'Issued by PML Bank',
  billStatus: 'Payment due',
  totalDue: 45231.55,
  minimumDue: 2261.58,
  outstandingAmount: 44890.12,
  dueDateLabel: '12 Apr 2026',
  statementPeriodLabel: '08 Mar 2026 – 07 Apr 2026',
  minimumDueDisclaimer:
    'Paying only the minimum avoids a late fee; interest may apply on the remaining balance.',
  helperText: 'Paying minimum due avoids late fee; interest may apply on the balance.',
  statusNote: 'Autopay is not enabled for this card.',
  reminderBanner:
    'A recent payment may take up to 2 working days to reflect on this statement.',
  reminderAlertState: 'primary',
  reminderAlertIcon: 'clock_circle_outline',
  breakdownRows: [
    { label: 'Purchases', amount: 38210.0, kind: 'charge' },
    { label: 'EMI / instalments', amount: 4200.0, kind: 'charge' },
    { label: 'Fees and charges', amount: 499.0, kind: 'charge' },
    { label: 'Interest', amount: 1522.55, kind: 'charge' },
    { label: 'Previous unpaid balance', amount: 0, kind: 'charge' },
    { label: 'Credits / refunds', amount: -1200.0, kind: 'credit' },
  ],
  transactions: [
    {
      merchant: 'City Mart — Groceries',
      dateLabel: '05 Apr 2026',
      amount: 3240.5,
    },
    {
      merchant: 'Metro Fuel',
      dateLabel: '04 Apr 2026',
      amount: 2500.0,
    },
    {
      merchant: 'Stream+ Annual',
      dateLabel: '02 Apr 2026',
      amount: 1499.0,
      statusNote: 'Pending',
    },
    {
      merchant: 'PharmaCare',
      dateLabel: '30 Mar 2026',
      amount: 892.25,
    },
  ],
  insightsTitle: 'Rewards on this statement',
  insightsBody:
    'Cashback earned: ₹612.40 · Reward points: +1,240. Interest accrues on unpaid amounts after the due date.',
};
