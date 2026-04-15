import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import { motion } from 'framer-motion';
import { Chip } from '../components/Chip';
import type { ChartInterval, OhlcCandle } from './types';
import { useLtpFlash } from './useLtpFlash';

const INTERVALS: ChartInterval[] = ['1m', '5m', '15m'];

export interface CandlestickChartProps {
  candles: OhlcCandle[];
  interval: ChartInterval;
  onIntervalChange: (i: ChartInterval) => void;
  lastClose: number;
}

export function CandlestickChart({
  candles,
  interval,
  onIntervalChange,
  lastClose,
}: CandlestickChartProps) {
  const flashDir = useLtpFlash(lastClose);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 320, h: 220 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setSize({ w: Math.max(200, r.width), h: Math.max(160, r.height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const margin = { top: 8, right: 12, bottom: 28, left: 44 };
  const innerW = size.w - margin.left - margin.right;
  const innerH = size.h - margin.top - margin.bottom;

  const { x, y, bodies } = useMemo(() => {
    if (candles.length === 0) {
      return {
        x: scaleBand<number>().domain([]).range([0, innerW]),
        y: scaleLinear().domain([0, 1]).range([innerH, 0]),
        bodies: [] as {
          cx: number;
          top: number;
          bot: number;
          w: number;
          up: boolean;
          i: number;
          yH: number;
          yL: number;
        }[],
      };
    }
    const lows = candles.map((c) => c.l);
    const highs = candles.map((c) => c.h);
    const min = Math.min(...lows) * 0.9995;
    const max = Math.max(...highs) * 1.0005;
    const xDom = candles.map((_, i) => i);
    const xS = scaleBand<number>()
      .domain(xDom)
      .range([0, innerW])
      .padding(0.35);
    const yS = scaleLinear().domain([min, max]).range([innerH, 0]);

    const b = candles.map((c, i) => {
      const up = c.c >= c.o;
      const x0 = xS(i);
      const w = xS.bandwidth();
      const cx = (x0 ?? 0) + w / 2;
      const yO = yS(c.o);
      const yC = yS(c.c);
      const yH = yS(c.h);
      const yL = yS(c.l);
      const top = Math.min(yO, yC);
      const bot = Math.max(yO, yC);
      return {
        cx,
        top,
        bot,
        w,
        up,
        i,
        yH,
        yL,
      };
    });

    return { x: xS, y: yS, bodies: b };
  }, [candles, innerW, innerH]);

  const [cross, setCross] = useState<{
    show: boolean;
    x: number;
    y: number;
    idx: number;
  }>({ show: false, x: 0, y: 0, idx: -1 });

  const onMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (candles.length === 0) return;
      const svg = e.currentTarget;
      const rect = svg.getBoundingClientRect();
      const px = e.clientX - rect.left - margin.left;
      const py = e.clientY - rect.top - margin.top;
      if (px < 0 || px > innerW || py < 0 || py > innerH) {
        setCross((c) => ({ ...c, show: false }));
        return;
      }
      const step = x.step();
      const idx = Math.min(
        candles.length - 1,
        Math.max(0, Math.floor(px / step)),
      );
      setCross({ show: true, x: px, y: py, idx });
    },
    [candles.length, innerW, innerH, margin.left, margin.top, x],
  );

  const onLeave = useCallback(() => {
    setCross((c) => ({ ...c, show: false }));
  }, []);

  const tip = cross.show && candles[cross.idx] ? candles[cross.idx] : null;

  const fmt = (n: number) => n.toFixed(2);
  const fmtT = (t: number) => {
    const d = new Date(t);
    return d.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const ltpFlash =
    flashDir > 0
      ? 'ot-chart__ltp--up'
      : flashDir < 0
        ? 'ot-chart__ltp--down'
        : '';

  const wickUp = 'var(--text-positive-strong)';
  const wickDown = 'var(--text-negative-strong)';
  const bodyUp = 'var(--background-positive-strong)';
  const bodyDown = 'var(--background-negative-strong)';
  const gridStroke = 'var(--border-neutral-weak)';
  const crossStroke = 'var(--border-neutral-medium)';
  const chartBg = 'var(--surface-level-4)';
  const axisFill = 'var(--text-neutral-medium)';

  return (
    <div className="ot-chart">
      <div className="ot-chart__toolbar">
        <div className="ot-chart__intervals">
          {INTERVALS.map((iv) => (
            <Chip
              key={iv}
              size="extra-small"
              type={interval === iv ? 'selected' : 'default'}
              label={iv}
              onPress={() => onIntervalChange(iv)}
            />
          ))}
        </div>
        <motion.span
          key={lastClose}
          initial={{ opacity: 0.75 }}
          animate={{ opacity: 1 }}
          className={`ot-chart__ltp ${ltpFlash}`.trim()}
        >
          {fmt(lastClose)}
        </motion.span>
      </div>

      <div ref={wrapRef} className="ot-chart__plot">
        <svg
          width={size.w}
          height={size.h}
          style={{ display: 'block', touchAction: 'none', userSelect: 'none' }}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          <rect width={size.w} height={size.h} fill={chartBg} />
          <g transform={`translate(${margin.left},${margin.top})`}>
            {[0, 0.25, 0.5, 0.75, 1].map((t) => {
              const yy = t * innerH;
              const price = y.invert(yy);
              return (
                <g key={t}>
                  <line
                    x1={0}
                    x2={innerW}
                    y1={yy}
                    y2={yy}
                    stroke={gridStroke}
                    strokeWidth={1}
                  />
                  <text
                    x={-6}
                    y={yy + 4}
                    textAnchor="end"
                    fill={axisFill}
                    fontSize={10}
                    fontFamily="var(--font-family)"
                  >
                    {price.toFixed(2)}
                  </text>
                </g>
              );
            })}

            {bodies.map((b) => (
              <g key={b.i}>
                <line
                  x1={b.cx}
                  x2={b.cx}
                  y1={b.yH}
                  y2={b.yL}
                  stroke={b.up ? wickUp : wickDown}
                  strokeWidth={1}
                />
                <rect
                  x={b.cx - b.w / 2 + 0.5}
                  y={b.top}
                  width={Math.max(1, b.w - 1)}
                  height={Math.max(1, b.bot - b.top)}
                  fill={b.up ? bodyUp : bodyDown}
                  opacity={0.95}
                />
              </g>
            ))}

            {cross.show && (
              <>
                <line
                  x1={cross.x}
                  x2={cross.x}
                  y1={0}
                  y2={innerH}
                  stroke={crossStroke}
                  strokeWidth={1}
                  strokeDasharray="4 3"
                  opacity={0.9}
                />
                <line
                  x1={0}
                  x2={innerW}
                  y1={cross.y}
                  y2={cross.y}
                  stroke={crossStroke}
                  strokeWidth={1}
                  strokeDasharray="4 3"
                  opacity={0.5}
                />
              </>
            )}
          </g>
        </svg>

        {tip && cross.show && (
          <div
            className="ot-chart__tooltip"
            style={{
              left: Math.min(
                size.w - 120,
                Math.max(8, margin.left + cross.x - 50),
              ),
              top: Math.max(8, margin.top + cross.y - 44),
            }}
          >
            <div className="ot-chart__tooltip-time">{fmtT(tip.t)}</div>
            <div>
              O {fmt(tip.o)} H {fmt(tip.h)}
            </div>
            <div>
              L {fmt(tip.l)} C {fmt(tip.c)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
