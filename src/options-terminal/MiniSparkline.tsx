import { useId } from 'react';
import { Area, AreaChart, ResponsiveContainer, YAxis } from 'recharts';
import type { OhlcCandle } from './types';

/** Compact Recharts spark — complements the main SVG candlestick. */
export function MiniSparkline({ candles }: { candles: OhlcCandle[] }) {
  const uid = useId().replace(/:/g, '');
  const data = candles.slice(-32).map((c, i) => ({ i, c: c.c }));
  if (data.length < 2) return null;

  const gradId = `sparkFill-${uid}`;

  return (
    <div className="ot__spark">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
          <YAxis domain={['dataMin', 'dataMax']} hide />
          <Area
            type="monotone"
            dataKey="c"
            stroke="var(--text-primary-strong)"
            strokeWidth={1.5}
            fill={`url(#${gradId})`}
            fillOpacity={0.35}
            isAnimationActive={false}
          />
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--text-primary-strong)"
                stopOpacity={0.45}
              />
              <stop
                offset="100%"
                stopColor="var(--text-primary-strong)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
