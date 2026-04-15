/** Mock “most popular” lists per segment — swap for API. */

export type PopularSegment = 'stocks' | 'fno' | 'index';

export interface PopularListItem {
  id: string;
  title: string;
  subtitle: string;
  ltp: string;
  changePct: number;
}

export const POPULAR_MOCK_BY_SEGMENT: Record<PopularSegment, PopularListItem[]> = {
  stocks: [
    {
      id: 's1',
      title: 'Reliance Ind.',
      subtitle: 'RELIANCE',
      ltp: '₹2,890.50',
      changePct: 1.12,
    },
    {
      id: 's2',
      title: 'HDFC Bank',
      subtitle: 'HDFCBANK',
      ltp: '₹1,650.20',
      changePct: -0.35,
    },
    {
      id: 's3',
      title: 'Infosys',
      subtitle: 'INFY',
      ltp: '₹1,420.00',
      changePct: 0.58,
    },
    {
      id: 's4',
      title: 'Tata Motors',
      subtitle: 'TATAMOTORS',
      ltp: '₹985.40',
      changePct: 2.04,
    },
  ],
  fno: [
    {
      id: 'f1',
      title: 'NIFTY 50 CE',
      subtitle: 'Weekly · ATM',
      ltp: '₹142.35',
      changePct: 4.2,
    },
    {
      id: 'f2',
      title: 'BANKNIFTY PE',
      subtitle: 'Monthly',
      ltp: '₹310.10',
      changePct: -1.8,
    },
    {
      id: 'f3',
      title: 'FINNIFTY CE',
      subtitle: 'Weekly',
      ltp: '₹88.90',
      changePct: 0.95,
    },
  ],
  index: [
    {
      id: 'i1',
      title: 'NIFTY 50',
      subtitle: 'Index',
      ltp: '24,321.45',
      changePct: 0.46,
    },
    {
      id: 'i2',
      title: 'NIFTY BANK',
      subtitle: 'Index',
      ltp: '51,102.10',
      changePct: -0.17,
    },
    {
      id: 'i3',
      title: 'NIFTY IT',
      subtitle: 'Index',
      ltp: '35,880.00',
      changePct: 0.72,
    },
  ],
};

export const POPULAR_SEGMENT_LABELS: { key: PopularSegment; label: string }[] = [
  { key: 'stocks', label: 'Stocks' },
  { key: 'fno', label: 'F&O' },
  { key: 'index', label: 'Index' },
];
