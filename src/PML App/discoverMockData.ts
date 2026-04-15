/** Mock data for Stocks Discover — replace with API responses (PRD: indices, movers, strategies, etc.). */

export interface IndexChipData {
  id: string;
  name: string;
  value: number;
  changeAbs: number;
  changePct: number;
}

export interface MoverCardData {
  symbol: string;
  name: string;
  price: number;
  changePct: number;
}

export interface StrategyCardData {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
}

export interface ExpertRecData {
  id: string;
  riskLabel: string;
  styleLabel: string;
  title: string;
  summary: string;
  analystCount: number;
}

export interface ScreenerShortcutData {
  id: string;
  label: string;
  description: string;
}

export const DISCOVER_INDEX_CHIPS: IndexChipData[] = [
  { id: 'n50', name: 'NIFTY 50', value: 24_321.45, changeAbs: 112.3, changePct: 0.46 },
  { id: 'nbank', name: 'NIFTY BANK', value: 51_102.1, changeAbs: -89.2, changePct: -0.17 },
  { id: 'nmid', name: 'NIFTY MIDCAP', value: 48_920.0, changeAbs: 45.0, changePct: 0.09 },
  { id: 'nsm', name: 'NIFTY SMALLCAP', value: 17_880.55, changeAbs: 22.1, changePct: 0.12 },
];

export const DISCOVER_MOVERS_POPULAR: MoverCardData[] = [
  { symbol: 'RELIANCE', name: 'Reliance Ind.', price: 2_890.5, changePct: 1.24 },
  { symbol: 'TCS', name: 'TCS', price: 4_120.0, changePct: 0.42 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1_650.2, changePct: -0.35 },
];

export const DISCOVER_MOVERS_FILTERS = [
  'Popular',
  'Mooning',
  'Rocket',
  'Busy',
] as const;

export const DISCOVER_STRATEGIES: StrategyCardData[] = [
  {
    id: 's1',
    title: 'Stable Indian Co.',
    subtitle: 'Quality large caps',
    iconName: 'briefcase_outline',
  },
  {
    id: 's2',
    title: 'Consistent profit maker',
    subtitle: 'Earnings momentum',
    iconName: 'chart',
  },
  {
    id: 's3',
    title: 'High volume today',
    subtitle: 'Unusual activity',
    iconName: 'volume_up_outline',
  },
];

export const DISCOVER_EXPERT_RECS: ExpertRecData[] = [
  {
    id: 'e1',
    riskLabel: 'Medium Risk',
    styleLabel: 'Swing Trade',
    title: 'Accumulate on dips — IT services',
    summary: 'Analysts cite resilient deal wins vs. seasonal weakness.',
    analystCount: 3,
  },
  {
    id: 'e2',
    riskLabel: 'Low Risk',
    styleLabel: 'Wealth',
    title: 'Defensive tilt — FMCG leaders',
    summary: 'Consensus view: margin stability through FY26.',
    analystCount: 5,
  },
];

export const DISCOVER_SCREENERS: ScreenerShortcutData[] = [
  { id: 'sc1', label: 'RSI oversold', description: '14-period RSI < 30' },
  { id: 'sc2', label: 'Bullish engulfing', description: 'Daily candle pattern' },
  { id: 'sc3', label: 'Strong uptrend', description: 'Price vs 50 DMA' },
];
