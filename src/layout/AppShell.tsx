import type { ReactNode } from 'react';
import './AppShell.css';

export type AppScreenId = 'stock-home';

export interface AppNavItem {
  id: AppScreenId;
  label: string;
}

const DEFAULT_NAV: AppNavItem[] = [{ id: 'stock-home', label: 'PML Home' }];

export interface AppShellProps {
  /** Current screen id (drives nav highlight) */
  activeScreen: AppScreenId;
  /** Called when user picks a nav item */
  onNavigate: (id: AppScreenId) => void;
  /** light = default semantic tokens from :root; dark = [data-theme="dark"] */
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
  /** Main preview column (e.g. phone frame) */
  children: ReactNode;
  /** Optional override nav items */
  navItems?: AppNavItem[];
}

export const AppShell = ({
  activeScreen,
  onNavigate,
  theme,
  onThemeChange,
  children,
  navItems = DEFAULT_NAV,
}: AppShellProps) => {
  return (
    <div
      className="app-shell"
      data-theme={theme === 'dark' ? 'dark' : undefined}
    >
      <aside className="app-shell__aside" aria-label="App navigation">
        <div className="app-shell__theme">
          <span className="app-shell__theme-label" id="app-theme-label">
            Theme
          </span>
          <div
            className="app-shell__theme-toggle"
            role="group"
            aria-labelledby="app-theme-label"
          >
            <button
              type="button"
              className="app-shell__theme-btn"
              aria-pressed={theme === 'light'}
              onClick={() => onThemeChange('light')}
            >
              Light
            </button>
            <button
              type="button"
              className="app-shell__theme-btn"
              aria-pressed={theme === 'dark'}
              onClick={() => onThemeChange('dark')}
            >
              Dark
            </button>
          </div>
        </div>
        <div className="app-shell__brand">Screens</div>
        <nav className="app-shell__nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="app-shell__nav-item"
              aria-current={activeScreen === item.id ? 'true' : undefined}
              onClick={() => onNavigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="app-shell__main">{children}</main>
    </div>
  );
};
