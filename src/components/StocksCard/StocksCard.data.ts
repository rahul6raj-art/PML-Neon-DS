import type { StocksCardProps } from './StocksCard';

/** Demo data for the standard Stocks Card. */
export const STOCKS_CARD_DEFAULT_PROPS: StocksCardProps = {
  statusLabel: 'Pledge',
  title: 'Reliance Industries Ltd.',
  quantity: '12',
  avgPriceLabel: 'Avg: ₹330',
  price: '₹340.40',
  changeLabel: '+2.20 (0.65%)',
  changeSentiment: 'positive',
};

/** MTF layout — margin footer variant. */
export const STOCKS_CARD_MTF_DEFAULT_PROPS: StocksCardProps = {
  layout: 'mtf',
  statusLabel: 'MTF',
  title: 'Reliance Industries Ltd.',
  quantity: '12',
  avgPriceLabel: 'Avg: ₹330',
  price: '₹340.40',
  changeLabel: '+2.20 (0.65%)',
  changeSentiment: 'positive',
  marginFooterLabel: 'Return on margin',
  marginReturnLabel: '+296.4%',
  marginMultiplierLabel: '(4x)',
  marginFooterIconName: 'chart',
};
