export type ChartInterval = '1m' | '5m' | '15m';

export type CallPut = 'call' | 'put';

/** `closed` — no drawer in the DOM until user opens trading (FAB). */
export type DrawerState = 'closed' | 'partial' | 'full';

export interface OhlcCandle {
  t: number;
  o: number;
  h: number;
  l: number;
  c: number;
}

export interface DepthRow {
  price: number;
  qty: number;
}

export interface DepthBook {
  bids: DepthRow[];
  asks: DepthRow[];
}

export interface Greeks {
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
}

export interface StrikeRow {
  strike: number;
  label: 'ITM' | 'ATM' | 'OTM';
  last: number;
}
