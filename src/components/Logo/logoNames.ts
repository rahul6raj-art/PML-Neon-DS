export const MUTUAL_FUND_NAMES = [
  'Nippon', 'Kotak', 'ICICI', 'HDFC', 'HSBC', 'IDBI', 'Axis',
  'Mirae', 'UTI', 'LIC', 'Quant', 'Quantum', 'Edelweiss', 'Motilal',
  'Bandhan', 'Invesco', 'PPFAS', 'ITC', 'DSP', 'JIO BlackRock', 'JIO',
  'Tata', 'Canara Robeco', 'Sundaram MF', 'Baroda BNP Paribas',
  'Mahindra Manulife', 'Bajaj Finserv', 'Navi', 'Groww', 'AngelOne',
  'PGIM', 'Reliance', 'SBI', 'Aditya Birla',
] as const;

export const PAYMENT_NAMES = [
  'Paytm', 'Phonepe', 'GPay', 'CRED', 'BHIM', 'BarathPay',
] as const;

export const BANK_NAMES = [
  'SBI (State Bank of India', 'HDFC', 'South Indian Bank', 'Axis Bank',
  'HSBC', 'ICICI', 'PNB Punjab National Bank', 'Union Bank',
  'Canara Bank', 'Aditya Birla Payment Bank', 'Jana Bank',
] as const;

export const STOCK_NAMES = [
  'Yes Bank', 'Reliance Industries', 'Tata Motors', 'Wipro', 'Vi',
  'LG', 'One97', 'PC Jewellers', 'Axis', 'MRF', 'Adani', 'Infosys',
  'SBI', 'NSDL',
] as const;

export const INDEX_NAMES = [
  'Nifty 50', 'Nifty Bank', 'Sensex', 'All Nifty', 'All BSE', 'Gift Nifty',
] as const;

export type MutualFundName = (typeof MUTUAL_FUND_NAMES)[number];
export type PaymentName = (typeof PAYMENT_NAMES)[number];
export type BankName = (typeof BANK_NAMES)[number];
export type StockName = (typeof STOCK_NAMES)[number];
export type IndexName = (typeof INDEX_NAMES)[number];
export type LogoName = string;
