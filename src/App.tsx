import { useEffect, useState } from 'react';
import './tokens/colors.css';
import './tokens/numbers.css';
import './tokens/typography.css';
import { AppShell } from './layout';
import {
  CreditCardBillDashboardPage,
  CreditCardBillPaymentFlowPage,
  CreditCardStatementDetailsPage,
  DiscoverPage,
  LoginPage,
  MtfHomePage,
  OrderPadPage,
  PortfolioDetailsPage,
  SignUpPage,
  StockHomePage,
} from './PML App';
import { OptionsTerminalPage } from './options-terminal';
import type { AppScreenId } from './layout';

const THEME_STORAGE_KEY = 'pml-theme';

function App() {
  const [activeScreen, setActiveScreen] = useState<AppScreenId>('stocks-discover');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof localStorage === 'undefined') return 'dark';
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : 'dark';
  });

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return (
    <AppShell
      activeScreen={activeScreen}
      onNavigate={setActiveScreen}
      theme={theme}
      onThemeChange={setTheme}
    >
      {activeScreen === 'stock-home' && <StockHomePage colorScheme={theme} />}
      {activeScreen === 'mtf-home' && <MtfHomePage colorScheme={theme} />}
      {activeScreen === 'stocks-discover' && (
        <DiscoverPage colorScheme={theme} />
      )}
      {activeScreen === 'portfolio-details' && (
        <PortfolioDetailsPage
          colorScheme={theme}
          onBack={() => setActiveScreen('stock-home')}
        />
      )}
      {activeScreen === 'order-pad' && (
        <OrderPadPage
          colorScheme={theme}
          onBack={() => setActiveScreen('stock-home')}
        />
      )}
      {activeScreen === 'credit-card-bill-dashboard' && (
        <CreditCardBillDashboardPage
          colorScheme={theme}
          onBack={() => setActiveScreen('stocks-discover')}
          onPayNow={() => setActiveScreen('credit-card-bill-pay')}
          onViewStatement={() => setActiveScreen('credit-card-statement-details')}
        />
      )}
      {activeScreen === 'credit-card-bill-pay' && (
        <CreditCardBillPaymentFlowPage
          colorScheme={theme}
          onExit={() => setActiveScreen('credit-card-bill-dashboard')}
        />
      )}
      {activeScreen === 'credit-card-statement-details' && (
        <CreditCardStatementDetailsPage
          colorScheme={theme}
          onBack={() => setActiveScreen('credit-card-bill-dashboard')}
          onPayNow={() => setActiveScreen('credit-card-bill-pay')}
          onViewFullStatement={() => {}}
          onDownloadStatement={() => {}}
          onSetupAutopay={() => {}}
        />
      )}
      {activeScreen === 'login' && (
        <LoginPage
          colorScheme={theme}
          onBack={() => setActiveScreen('stock-home')}
          onNavigateToSignUp={() => setActiveScreen('sign-up')}
        />
      )}
      {activeScreen === 'sign-up' && (
        <SignUpPage
          colorScheme={theme}
          onBack={() => setActiveScreen('login')}
          onLogIn={() => setActiveScreen('login')}
        />
      )}
      {activeScreen === 'options-terminal' && <OptionsTerminalPage />}
    </AppShell>
  );
}

export default App;
