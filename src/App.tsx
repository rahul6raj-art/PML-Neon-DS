import { useState } from 'react';
import { SmartHomeScrollContent } from './features/smarthome';
import { ExchangePage } from './features/exchange';
import { BottomNav, type BottomNavItem } from './components/BottomNav/BottomNav';
import './AppTabShell.css';

const TAB_ITEMS: BottomNavItem[] = [
  { icon: 'home_outline', label: 'Home' },
  { icon: 'swap_outline', label: 'Exchange' },
  { icon: 'credit_card_outline', label: 'Cards' },
  { icon: 'chart', label: 'Insights' },
  { icon: 'person_plus_outline', label: 'Invite' },
];

function TabPlaceholder({ label }: { label: string }) {
  return (
    <div className="tab-shell-placeholder">
      <p className="tab-shell-placeholder__title title-3-medium">{label}</p>
      <p className="tab-shell-placeholder__body body-regular">Coming soon.</p>
    </div>
  );
}

/**
 * Phone column with shared bottom nav: **Home** (`SmartHomeScrollContent`), **Exchange** (`ExchangePage`),
 * placeholders for other tabs. **`bn__item[1]`** is **Exchange** (`swap_outline`).
 */
function App() {
  const [tab, setTab] = useState(0);

  return (
    <div
      style={{
        boxSizing: 'border-box',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
        background: 'var(--surface-level-3)',
      }}
    >
      <div className="smh-stock-home">
        <div className="smh-sh-content">
          {tab === 0 && <SmartHomeScrollContent />}
          {tab === 1 && <ExchangePage />}
          {tab === 2 && <TabPlaceholder label="Cards" />}
          {tab === 3 && <TabPlaceholder label="Insights" />}
          {tab === 4 && <TabPlaceholder label="Invite" />}
        </div>
        <div className="smh-sh-bottom-nav">
          <BottomNav activeIndex={tab} onChange={setTab} showGradient items={TAB_ITEMS} />
        </div>
      </div>
    </div>
  );
}

export default App;
