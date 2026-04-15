import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import type { DepthBook } from './types';

export function MarketDepthPanel({ book }: { book: DepthBook }) {
  const maxQ = Math.max(
    ...book.bids.map((b) => b.qty),
    ...book.asks.map((a) => a.qty),
    1,
  );
  const bestBid = book.bids[0]?.price ?? 0;
  const bestAsk = book.asks[0]?.price ?? 0;
  const spread = Math.round((bestAsk - bestBid) * 100) / 100;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ type: 'spring', damping: 26, stiffness: 320 }}
      style={{ overflow: 'hidden' }}
    >
      <Card className="ot-market-card">
        <div className="ot-depth__title-row">
          <span className="ot-depth__title">Market depth</span>
          <span className="ot-depth__spread">
            Spread{' '}
            <span className="ot-depth__spread-val">{spread.toFixed(2)}</span>
          </span>
        </div>
        <div className="ot-depth__grid">
          <div>
            <div className="ot-depth__col-label ot-depth__col-label--bid">
              <span>Bid</span>
              <span>Qty</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {book.bids.slice(0, 6).map((b, i) => (
                <div
                  key={`b-${i}-${b.price}`}
                  className="ot-depth__row"
                >
                  <div
                    className="ot-depth__bar-bid"
                    style={{ width: `${(b.qty / maxQ) * 100}%` }}
                  />
                  <span className="ot-depth__price--bid">
                    {b.price.toFixed(2)}
                  </span>
                  <span className="ot-depth__qty">{b.qty}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="ot-depth__col-label ot-depth__col-label--ask">
              <span>Ask</span>
              <span>Qty</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {book.asks.slice(0, 6).map((a, i) => (
                <div
                  key={`a-${i}-${a.price}`}
                  className="ot-depth__row"
                >
                  <div
                    className="ot-depth__bar-ask"
                    style={{ width: `${(a.qty / maxQ) * 100}%` }}
                  />
                  <span className="ot-depth__price--ask">
                    {a.price.toFixed(2)}
                  </span>
                  <span className="ot-depth__qty">{a.qty}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
