import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import type { StrikeRow } from './types';

function tagClass(l: StrikeRow['label']) {
  if (l === 'ATM') return 'ot-quick__tag ot-quick__tag--atm';
  if (l === 'ITM') return 'ot-quick__tag ot-quick__tag--itm';
  return 'ot-quick__tag ot-quick__tag--otm';
}

export function QuickSelectPanel({
  rows,
  onPick,
}: {
  rows: StrikeRow[];
  onPick?: (strike: number) => void;
}) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ type: 'spring', damping: 26, stiffness: 320 }}
      style={{ overflow: 'hidden' }}
    >
      <Card className="ot-market-card">
        <div className="ot-quick__scroll">
          <div className="ot-quick__title">Quick select</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {rows.map((r) => (
              <button
                key={r.strike}
                type="button"
                onClick={() => onPick?.(r.strike)}
                className="ot-quick__row"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className={tagClass(r.label)}>{r.label}</span>
                  <span className="ot-quick__strike">
                    {r.strike.toLocaleString()}
                  </span>
                </div>
                <span className="ot-quick__px">₹{r.last.toFixed(2)}</span>
              </button>
            ))}
          </div>
          <div className="ot-quick__footer">
            Tap a strike for fast switch · CE chain
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
