import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Header } from '../components/Header';
import { CandlestickChart } from './CandlestickChart';
import { FloatingActionBar } from './FloatingActionBar';
import { GreeksPanel } from './GreeksPanel';
import { MarketDepthPanel } from './MarketDepthPanel';
import { MiniSparkline } from './MiniSparkline';
import { buildStrikeLadder } from './mockData';
import { QuickSelectPanel } from './QuickSelectPanel';
import { TradingDrawer } from './TradingDrawer';
import type { CallPut, ChartInterval, DrawerState } from './types';
import { useLtpFlash } from './useLtpFlash';
import { useOptionsFeed } from './useOptionsFeed';
import './OptionsTerminal.css';

const BASE = 22_498;

export function OptionsTerminalPage() {
  const [interval, setInterval] = useState<ChartInterval>('5m');
  const [callPut, setCallPut] = useState<CallPut>('call');
  const [strike, setStrike] = useState(22_500);
  const [depthOpen, setDepthOpen] = useState(true);
  const [greeksOpen, setGreeksOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [drawer, setDrawer] = useState<DrawerState>('closed');

  const { candles, depth, greeks, lastClose, midPrice } = useOptionsFeed(
    interval,
    BASE,
  );

  const headerFlash = useLtpFlash(lastClose);

  const ladder = useMemo(() => buildStrikeLadder(midPrice), [midPrice]);

  const moneynessLabel = useMemo(() => {
    const atm = ladder.find((r) => r.label === 'ATM')?.strike ?? 22_500;
    if (strike === atm) return 'ATM';
    if (callPut === 'call') return strike < atm ? 'ITM' : 'OTM';
    return strike > atm ? 'ITM' : 'OTM';
  }, [strike, ladder, callPut]);

  const symbol = useMemo(() => {
    const cp = callPut === 'call' ? 'CE' : 'PE';
    return `NIFTY ${strike.toLocaleString()} ${cp}`;
  }, [strike, callPut]);

  const pnlMock = useMemo(
    () => Math.round((lastClose - BASE) * 3.5 * 100) / 100,
    [lastClose],
  );

  const ltpRowFlash =
    headerFlash > 0
      ? 'ot__ltp--up'
      : headerFlash < 0
        ? 'ot__ltp--down'
        : '';

  return (
    <div className="ot">
      <Header
        type="large"
        title={symbol}
        statusBarTheme="dark"
        showBackButton={false}
        showGradient={false}
        rhsIcons={['search_outline']}
        className="ot__header"
      />

      <div className="ot__spark-row">
        <div className="ot__ltp-group">
          <motion.span
            key={lastClose}
            initial={{ opacity: 0.75 }}
            animate={{ opacity: 1 }}
            className={`ot__ltp ${ltpRowFlash}`.trim()}
          >
            {lastClose.toFixed(2)}
          </motion.span>
          <span className="ot__ltp-label">LTP</span>
        </div>
        <MiniSparkline candles={candles} />
      </div>

      <div className="ot-stack">
        <CandlestickChart
          candles={candles}
          interval={interval}
          onIntervalChange={setInterval}
          lastClose={lastClose}
        />

        <AnimatePresence initial={false}>
          {depthOpen && <MarketDepthPanel key="depth" book={depth} />}
          {greeksOpen && <GreeksPanel key="greeks" greeks={greeks} />}
          {quickOpen && (
            <QuickSelectPanel
              key="quick"
              rows={ladder}
              onPick={(s) => {
                setStrike(s);
                setQuickOpen(false);
              }}
            />
          )}
        </AnimatePresence>
      </div>

      <FloatingActionBar
        callPut={callPut}
        onCallPut={setCallPut}
        onBuy={() => setDrawer('partial')}
        onSell={() => setDrawer('full')}
        onToggleDepth={() => setDepthOpen((v) => !v)}
        onToggleGreeks={() => setGreeksOpen((v) => !v)}
        onToggleQuickFromTag={() => setQuickOpen((v) => !v)}
        depthOpen={depthOpen}
        greeksOpen={greeksOpen}
        quickOpen={quickOpen}
        moneynessLabel={moneynessLabel}
      />

      <TradingDrawer
        state={drawer}
        onState={setDrawer}
        pnl={pnlMock}
        symbol={symbol}
      />
    </div>
  );
}
