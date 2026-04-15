import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { Chip } from '../components/Chip';
import { Icon } from '../components/Icon';
import type { CallPut } from './types';

export interface FloatingActionBarProps {
  callPut: CallPut;
  onCallPut: (v: CallPut) => void;
  onBuy: () => void;
  onSell: () => void;
  onToggleDepth: () => void;
  onToggleGreeks: () => void;
  onToggleQuickFromTag: () => void;
  depthOpen: boolean;
  greeksOpen: boolean;
  quickOpen: boolean;
  moneynessLabel: string;
}

export function FloatingActionBar({
  callPut,
  onCallPut,
  onBuy,
  onSell,
  onToggleDepth,
  onToggleGreeks,
  onToggleQuickFromTag,
  depthOpen,
  greeksOpen,
  quickOpen,
  moneynessLabel,
}: FloatingActionBarProps) {
  return (
    <motion.div
      layout
      className="ot-fab"
      transition={{ type: 'spring', damping: 28, stiffness: 380 }}
    >
      <Chip
        size="extra-small"
        type={quickOpen ? 'selected' : 'default'}
        label={moneynessLabel}
        onPress={onToggleQuickFromTag}
        className="ot-fab__tag"
      />

      <div className="ot-fab__cp">
        <button
          type="button"
          onClick={() => onCallPut('call')}
          className={`ot-fab__cp-btn ot-fab__cp-btn--call ${
            callPut === 'call' ? 'ot-fab__cp-btn--on' : ''
          }`}
        >
          CALL
        </button>
        <button
          type="button"
          onClick={() => onCallPut('put')}
          className={`ot-fab__cp-btn ot-fab__cp-btn--put ${
            callPut === 'put' ? 'ot-fab__cp-btn--on' : ''
          }`}
        >
          PUT
        </button>
      </div>

      <Button
        variant="filled"
        size="small"
        icon="none"
        label="BUY"
        onClick={onBuy}
        className="ot-fab__buy"
      />
      <Button
        variant="filled"
        size="small"
        icon="none"
        label="SELL"
        onClick={onSell}
        className="ot-fab__sell"
      />

      <button
        type="button"
        onClick={onToggleDepth}
        aria-pressed={depthOpen}
        className="ot-fab__icon-btn"
      >
        <Icon name="chart" size={18} />
      </button>
      <button
        type="button"
        onClick={onToggleGreeks}
        aria-pressed={greeksOpen}
        className="ot-fab__icon-btn ot-fab__icon-btn--greek"
      >
        <Icon name="doc_text_outline" size={18} />
      </button>
    </motion.div>
  );
}
