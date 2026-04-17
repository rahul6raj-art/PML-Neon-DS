import { useEffect, useState } from 'react';
import './tokens/colors.css';
import './tokens/numbers.css';
import './tokens/typography.css';
import { AppShell } from './layout';
import { DiscoverPage, LoginPage, SignUpPage, StockHomePage } from './PML App';
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
      {activeScreen === 'stocks-discover' && (
        <DiscoverPage colorScheme={theme} />
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
    </AppShell>
  );
}

export default App;
