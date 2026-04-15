/** Mock scrip + market data for Order Pad — replace with quotes / RMS APIs. */

export interface OrderPadExchangeQuote {
  code: 'NSE' | 'BSE';
  label: string;
  ltpFormatted: string;
}

export const ORDER_PAD_SCRIP_NAME = 'Reliance Industries';

export const ORDER_PAD_EXCHANGES: OrderPadExchangeQuote[] = [
  { code: 'NSE', label: 'NSE', ltpFormatted: '₹1,281.15' },
  { code: 'BSE', label: 'BSE', ltpFormatted: '₹1,280.80' },
];

/** Default limit price string (INR, no space after ₹) */
export const ORDER_PAD_DEFAULT_LIMIT = '1,281.20';

export const ORDER_PAD_MAX_QTY = 9999;

export const ORDER_PAD_REQUIRED_ESTIMATE = '₹1.31K + Charges';

export const ORDER_PAD_BALANCE = '₹1,500';

export const ORDER_PAD_MTF_PROMO =
  'Earn ₹44 more with MTF when price rises 5%*';
