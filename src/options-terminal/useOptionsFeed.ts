import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ChartInterval, DepthBook, Greeks, OhlcCandle } from './types';
import {
  generateDepth,
  generateGreeks,
  generateOhlc,
  nudgeDepth,
  tickLastCandle,
} from './mockData';

const TICK_MS = 900;

export function useOptionsFeed(interval: ChartInterval, basePrice: number) {
  const [candles, setCandles] = useState<OhlcCandle[]>(() =>
    generateOhlc(80, interval),
  );
  const [depth, setDepth] = useState<DepthBook>(() =>
    generateDepth(basePrice),
  );
  const [greeks, setGreeks] = useState<Greeks>(() => generateGreeks());

  useEffect(() => {
    setCandles(generateOhlc(80, interval));
  }, [interval]);

  const midPrice = useMemo(() => {
    const c = candles[candles.length - 1];
    return c?.c ?? basePrice;
  }, [candles, basePrice]);

  const lastClose = useMemo(
    () => candles[candles.length - 1]?.c ?? basePrice,
    [candles, basePrice],
  );

  useEffect(() => {
    setDepth(generateDepth(midPrice));
  }, [interval, midPrice]);

  const onTick = useCallback(() => {
    const delta = (Math.random() - 0.5) * 2.4;
    setCandles((prev) => tickLastCandle(prev, delta));
    setDepth((d) => nudgeDepth(d));
    setGreeks((g) => ({
      delta:
        Math.round((g.delta + (Math.random() - 0.5) * 0.002) * 10_000) /
        10_000,
      gamma:
        Math.round((g.gamma + (Math.random() - 0.5) * 0.00002) * 1_000_000) /
        1_000_000,
      theta:
        Math.round((g.theta + (Math.random() - 0.5) * 0.2) * 100) / 100,
      vega:
        Math.round((g.vega + (Math.random() - 0.5) * 0.04) * 100) / 100,
    }));
  }, []);

  useEffect(() => {
    const id = window.setInterval(onTick, TICK_MS);
    return () => window.clearInterval(id);
  }, [onTick]);

  return {
    candles,
    depth,
    greeks,
    lastClose,
    midPrice,
  };
}
