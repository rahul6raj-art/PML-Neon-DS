import { type ReactNode, useSyncExternalStore } from 'react';
import { PlatformThemeProvider, type AppPlatform } from '../theme';
import { viewportWidthToPlatform } from './viewportPlatform';

function subscribe(onStoreChange: () => void) {
  window.addEventListener('resize', onStoreChange);
  return () => window.removeEventListener('resize', onStoreChange);
}

function getViewportPlatformSnapshot(): AppPlatform {
  return viewportWidthToPlatform(window.innerWidth);
}

/** SSR / non-browser: baseline mobile */
function getServerViewportPlatformSnapshot(): AppPlatform {
  return 'mobile';
}

/**
 * Maps browser width to token density + chrome (e.g. no status bar on web).
 * Storybook continues to use its own toolbar {@link PlatformThemeProvider}.
 */
export function ViewportPlatformProvider({ children }: { children: ReactNode }) {
  const platform = useSyncExternalStore(
    subscribe,
    getViewportPlatformSnapshot,
    getServerViewportPlatformSnapshot,
  );

  return <PlatformThemeProvider platform={platform}>{children}</PlatformThemeProvider>;
}
