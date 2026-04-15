import type { ChartInterval, DepthBook, Greeks, OhlcCandle, StrikeRow } from './types';

const mul: Record<ChartInterval, number> = {
  '1m': 60_000,
  '5m': 300_000,
  '15m': 900_000,
};

/** Seeded pseudo-random for stable SSR-ish demos */
function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

export function generateOhlc(
  count: number,
  interval: ChartInterval,
  seed = 42,
): OhlcCandle[] {
  const rand = seeded(seed);
  const step = mul[interval];
  const now = Date.now();
  const start = now - count * step;
  let price = 22_450 + rand() * 80;
  const out: OhlcCandle[] = [];

  for (let i = 0; i < count; i++) {
    const t = start + i * step;
    const drift = (rand() - 0.48) * 12;
    const o = price;
    const c = Math.max(22_200, o + drift + (rand() - 0.5) * 8);
    const h = Math.max(o, c) + rand() * 10;
    const l = Math.min(o, c) - rand() * 10;
    price = c;
    out.push({
      t,
      o,
      h,
      l,
      c,
    });
  }

  return out;
}

export function generateDepth(mid: number, seed = 7): DepthBook {
  const rand = seeded(seed);
  const levels = 8;
  const tick = 0.05;
  const bids: { price: number; qty: number }[] = [];
  const asks: { price: number; qty: number }[] = [];

  for (let i = 0; i < levels; i++) {
    bids.push({
      price: Math.round((mid - (i + 1) * tick) * 100) / 100,
      qty: Math.round(200 + rand() * 4_000),
    });
    asks.push({
      price: Math.round((mid + (i + 1) * tick) * 100) / 100,
      qty: Math.round(200 + rand() * 4_000),
    });
  }

  return { bids, asks };
}

export function generateGreeks(seed = 3): Greeks {
  const rand = seeded(seed);
  return {
    delta: 0.42 + rand() * 0.08,
    gamma: 0.0012 + rand() * 0.0004,
    theta: -18.5 - rand() * 4,
    vega: 9.2 + rand() * 1.5,
  };
}

export function buildStrikeLadder(spot: number): StrikeRow[] {
  const step = 50;
  const center = Math.round(spot / step) * step;
  const rows: StrikeRow[] = [];
  for (let i = -4; i <= 4; i++) {
    const strike = center + i * step;
    let label: StrikeRow['label'] = 'OTM';
    if (strike === center) label = 'ATM';
    else if (strike < center) label = 'ITM';
    rows.push({
      strike,
      label,
      last: 120 + Math.abs(i) * 12 + (i % 2) * 3,
    });
  }
  return rows;
}

export function tickLastCandle(
  candles: OhlcCandle[],
  delta: number,
): OhlcCandle[] {
  if (candles.length === 0) return candles;
  const next = [...candles];
  const last = { ...next[next.length - 1] };
  const nc = Math.max(last.l, Math.min(last.h, last.c + delta));
  last.c = nc;
  last.h = Math.max(last.h, nc);
  last.l = Math.min(last.l, nc);
  next[next.length - 1] = last;
  return next;
}

export function nudgeDepth(book: DepthBook): DepthBook {
  const rand = seeded(Date.now() % 100_000);
  const bump = () => Math.round(rand() * 120);
  return {
    bids: book.bids.map((r) => ({
      ...r,
      qty: Math.max(50, r.qty + bump() - 60),
    })),
    asks: book.asks.map((r) => ({
      ...r,
      qty: Math.max(50, r.qty + bump() - 60),
    })),
  };
}
