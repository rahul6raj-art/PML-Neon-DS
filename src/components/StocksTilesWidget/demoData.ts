import type { StocksTilesItem } from './types';

export const STOCKS_TILES_WIDGET_DEMO_ITEMS: StocksTilesItem[] = [
  {
    title: 'Reliance Ind.',
    price: '₹2,890.50',
    changeLabel: '1.24%',
    changeSentiment: 'positive',
    statusBadgeLabel: 'Active',
    statusBadgeContext: 'notice',
    leadingLogoName: 'Reliance Industries',
    leadingLogoCategory: 'stocks',
  },
  {
    title: 'Tata Consultancy Services',
    price: '₹4,120.00',
    changeLabel: '0.42%',
    changeSentiment: 'positive',
    statusBadgeLabel: 'Active',
    statusBadgeContext: 'notice',
    leadingIconName: 'briefcase_outline',
  },
  {
    title: 'HDFC Bank',
    price: '₹1,650.20',
    changeLabel: '0.35%',
    changeSentiment: 'negative',
    statusBadgeLabel: 'Active',
    statusBadgeContext: 'notice',
    leadingLogoName: 'HDFC',
    leadingLogoCategory: 'banks',
  },
  {
    title: 'Infosys Ltd',
    price: '₹1,482.00',
    changeLabel: '0.00%',
    changeSentiment: 'neutral',
    statusBadgeLabel: 'Active',
    statusBadgeContext: 'notice',
    leadingLogoName: 'Infosys',
    leadingLogoCategory: 'stocks',
  },
];
