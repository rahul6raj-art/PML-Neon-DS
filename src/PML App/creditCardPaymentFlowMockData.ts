/** Saved instruments for credit card bill pay flow — replace with payments API. */

export interface SavedPaymentMethod {
  id: string;
  /** Primary line, e.g. UPI VPA or bank name */
  label: string;
  /** Secondary line, e.g. Primary · Verified */
  detail: string;
}

export const CREDIT_CARD_PAYMENT_METHODS_MOCK: SavedPaymentMethod[] = [
  {
    id: 'upi-1',
    label: 'UPI · jane.doe@okbank',
    detail: 'Primary',
  },
  {
    id: 'nb-1',
    label: 'Net banking · PML Bank',
    detail: 'Linked account',
  },
  {
    id: 'dc-1',
    label: 'Debit card · · · · 8891',
    detail: 'Saved card',
  },
];
