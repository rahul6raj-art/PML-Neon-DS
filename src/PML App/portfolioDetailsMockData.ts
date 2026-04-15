import type { StocksCardProps } from '../components/StocksCard';

export const PORTFOLIO_DETAILS_NAME = 'Growth portfolio';

export const PORTFOLIO_DETAILS_SUMMARY = {
  totalValue: '₹8,42,916',
  returnsLabel: '1D change:',
  returnsValue: '+₹12,340 (1.49%)',
  investedLabel: 'Invested',
  investedAmount: '₹6,10,200',
  overallReturnsLabel: 'Overall returns',
  overallReturnsValue: '+₹2,32,716 (38.12%)',
  buyingPowerLabel: 'Buying power',
  buyingPowerAmount: '₹45,000',
};

export const PORTFOLIO_DETAILS_HOLDINGS: StocksCardProps[] = [
  {
    title: 'Reliance Industries Ltd.',
    quantity: '24',
    avgPriceLabel: 'Avg: ₹2,450',
    price: '₹2,894.20',
    changeLabel: '+12.40 (0.43%)',
    changeSentiment: 'positive',
  },
  {
    title: 'HDFC Bank Ltd.',
    quantity: '18',
    avgPriceLabel: 'Avg: ₹1,620',
    price: '₹1,702.55',
    changeLabel: '-8.10 (0.47%)',
    changeSentiment: 'negative',
  },
  {
    title: 'Infosys Ltd.',
    quantity: '32',
    avgPriceLabel: 'Avg: ₹1,480',
    price: '₹1,512.00',
    changeLabel: '+4.20 (0.28%)',
    changeSentiment: 'positive',
  },
];

export interface PortfolioAllocationRow {
  assetClass: string;
  percent: number;
  valueLabel: string;
}

export const PORTFOLIO_DETAILS_ALLOCATION: PortfolioAllocationRow[] = [
  { assetClass: 'Equity', percent: 62, valueLabel: '₹5,22,608' },
  { assetClass: 'Debt / liquid', percent: 24, valueLabel: '₹2,02,300' },
  { assetClass: 'Gold / commodities', percent: 9, valueLabel: '₹75,862' },
  { assetClass: 'Alternatives', percent: 5, valueLabel: '₹42,146' },
];

export interface PortfolioActivityRow {
  title: string;
  subtitle: string;
  amountLabel: string;
}

export const PORTFOLIO_DETAILS_ACTIVITY: PortfolioActivityRow[] = [
  {
    title: 'Bought · Reliance Industries Ltd.',
    subtitle: '12 Apr 2026 · NSE',
    amountLabel: '₹69,460',
  },
  {
    title: 'SIP · Parag Parikh Flexi Cap Fund',
    subtitle: '10 Apr 2026',
    amountLabel: '₹15,000',
  },
  {
    title: 'Sold · Tata Motors Ltd.',
    subtitle: '08 Apr 2026 · BSE',
    amountLabel: '₹38,200',
  },
];
