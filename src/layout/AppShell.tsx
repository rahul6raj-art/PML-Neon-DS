import type { ReactNode } from 'react';
import './AppShell.css';

export type AppScreenId = 'stock-home' | 'stocks-discover' | 'login' | 'sign-up';

export interface AppNavItem {
  id: AppScreenId;
  label: string;
  /** Sidebar section heading (defaults to “Screens” if omitted) */
  group?: string;
}

const DEFAULT_NAV: AppNavItem[] = [
  { id: 'stock-home', label: 'Stock home', group: 'Stocks & portfolio' },
  { id: 'stocks-discover', label: 'Discover', group: 'Stocks & portfolio' },
  { id: 'login', label: 'Log in', group: 'Auth' },
  { id: 'sign-up', label: 'Sign up', group: 'Auth' },
];

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

function navGroups(items: AppNavItem[]): { group: string; items: AppNavItem[] }[] {
  const order: string[] = [];
  const map = new Map<string, AppNavItem[]>();
  for (const item of items) {
    const g = item.group ?? 'Screens';
    if (!map.has(g)) {
      order.push(g);
      map.set(g, []);
    }
    map.get(g)!.push(item);
  }
  return order.map((group) => ({ group, items: map.get(group)! }));
}

export const AppShell = ({
  activeScreen,
  onNavigate,
  theme,
  onThemeChange,
  children,
  navItems = DEFAULT_NAV,
}: AppShellProps) => {
  const groups = navGroups(navItems);

  return (
    <div
      className="app-shell"
      data-theme={theme === 'dark' ? 'dark' : undefined}
    >
      <aside className="app-shell__aside" aria-label="App screen navigation">
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
        <nav className="app-shell__nav" aria-label="Screens">
          {groups.map(({ group, items }) => (
            <div key={group} className="app-shell__nav-group">
              <h2 className="app-shell__nav-heading">{group}</h2>
              <div className="app-shell__nav-list">
                {items.map((item) => (
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
              </div>
            </div>
          ))}
        </nav>
      </aside>
      <main className="app-shell__main">{children}</main>
    </div>
  );
};
