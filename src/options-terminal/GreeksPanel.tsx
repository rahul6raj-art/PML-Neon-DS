import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import type { Greeks } from './types';

const fmt = (n: number, d: number) =>
  n.toLocaleString(undefined, {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });

export function GreeksPanel({ greeks }: { greeks: Greeks }) {
  const cells = [
    { k: 'Delta', v: greeks.delta, d: 4 },
    { k: 'Gamma', v: greeks.gamma, d: 6 },
    { k: 'Theta', v: greeks.theta, d: 4 },
    { k: 'Vega', v: greeks.vega, d: 4 },
  ] as const;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ type: 'spring', damping: 26, stiffness: 320 }}
      style={{ overflow: 'hidden' }}
    >
      <Card className="ot-market-card">
        <div className="ot-greeks__title">Greeks</div>
        <div className="ot-greeks__grid">
          {cells.map((c) => (
            <div key={c.k} className="ot-greeks__cell">
              <div className="ot-greeks__name">{c.k}</div>
              <div className="ot-greeks__val">{fmt(c.v, c.d)}</div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
