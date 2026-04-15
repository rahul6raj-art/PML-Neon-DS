import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '../components/Button';
import type { DrawerState } from './types';

export interface TradingDrawerProps {
  state: DrawerState;
  onState: (s: DrawerState) => void;
  pnl: number;
  symbol: string;
}

const heights: Record<Exclude<DrawerState, 'closed'>, string | number> = {
  partial: 120,
  full: '72%',
};

export function TradingDrawer({
  state,
  onState,
  pnl,
  symbol,
}: TradingDrawerProps) {
  if (state === 'closed') {
    return null;
  }

  return (
    <div className="ot-drawer-wrap">
      <AnimatePresence mode="sync">
        <motion.div
          key="drawer"
          initial={false}
          animate={{
            height: heights[state],
            transition: { type: 'spring', damping: 28, stiffness: 260 },
          }}
          className="ot-drawer"
        >
          <button
            type="button"
            className="ot-drawer__handle"
            onClick={() => {
              if (state === 'partial') onState('full');
              else onState('closed');
            }}
            aria-label={
              state === 'full'
                ? 'Close trading drawer'
                : 'Expand trading drawer'
            }
          >
            <div className="ot-drawer__handle-bar" />
          </button>

          <div className="ot-drawer__body">
            <div className="ot-drawer__meta">
              <span className="ot-drawer__label">Position · {symbol}</span>
              <span
                className={`ot-drawer__pnl ${
                  pnl >= 0 ? 'ot-drawer__pnl--pos' : 'ot-drawer__pnl--neg'
                }`}
              >
                {pnl >= 0 ? '+' : ''}₹{pnl.toFixed(2)}
              </span>
            </div>

            {state === 'full' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--spacing-8)',
                  paddingTop: 'var(--spacing-8)',
                  borderTop: '1px solid var(--border-neutral-weak)',
                }}
              >
                <div className="ot-drawer__field">
                  <label>
                    Quantity
                    <input type="number" defaultValue={50} />
                  </label>
                </div>
                <div className="ot-drawer__field">
                  <label>
                    Limit price
                    <input type="number" defaultValue={125.5} step={0.05} />
                  </label>
                </div>
                <div className="ot-drawer__actions">
                  <Button
                    variant="filled"
                    size="small"
                    icon="none"
                    label="Place buy"
                    className="ot-drawer__buy"
                  />
                  <Button
                    variant="filled"
                    size="small"
                    icon="none"
                    label="Place sell"
                    className="ot-drawer__sell"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
