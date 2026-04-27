import React from 'react';

import { TriplePlatformPreview } from './TriplePlatformPreview';
import {
  BASELINE_PLATFORM,
  parseAppPlatform,
  PLATFORM_SCOPE_CLASS,
  PlatformThemeProvider,
} from '../src/theme';

/** Minimal `context` shape used by the preview (Storybook passes full `StoryContext`). */
export type PmlPreviewContext = {
  id: string;
  globals?: Record<string, unknown>;
};

/**
 * Preview chrome only — **do not** call `useGlobals` / `useArgs` / `useThemeSync` here.
 * Storybook allows those only in the **decorator** (or story) function, not nested components.
 */
function PreviewCanvasShell({
  isDark,
  children,
}: {
  isDark: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="sb-pml-preview-canvas"
      data-theme={isDark ? ('dark' as const) : undefined}
    >
      {children}
    </div>
  );
}

export function PmlStorybookDecorator({
  Story,
  context,
}: {
  Story: React.ComponentType;
  context: PmlPreviewContext;
}) {
  const theme = (context.globals?.theme as string) || 'light';
  const isDark = theme === 'dark';
  const rawPlatform = context.globals?.platform;

  if (rawPlatform === 'compare') {
    return (
      <PreviewCanvasShell isDark={isDark}>
        <TriplePlatformPreview Story={Story} isDark={isDark} storyKey={context.id} />
      </PreviewCanvasShell>
    );
  }

  const platform = parseAppPlatform(rawPlatform);
  const isMobilePlatform = platform === BASELINE_PLATFORM;
  const themeAttrs = {
    'data-pml-platform': platform,
    'data-theme': isDark ? ('dark' as const) : undefined,
  };

  if (isMobilePlatform) {
    return (
      <PreviewCanvasShell isDark={isDark}>
        <PlatformThemeProvider platform={platform}>
          <div
            className="sb-pml-bottom-sheet-host sb-pml-storybook-phone-host"
            {...themeAttrs}
            style={{
              color: 'var(--text-neutral-strong)',
              width: 'min(376px, 100%)',
              maxWidth: '100%',
              margin: '0 auto',
              position: 'relative',
              transform: 'translateZ(0)',
              boxSizing: 'border-box',
            }}
          >
            <Story />
          </div>
        </PlatformThemeProvider>
      </PreviewCanvasShell>
    );
  }

  return (
    <PreviewCanvasShell isDark={isDark}>
      <PlatformThemeProvider platform={platform}>
        <div
          className={PLATFORM_SCOPE_CLASS}
          {...themeAttrs}
          style={{
            color: 'var(--text-neutral-strong)',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Story />
        </div>
      </PlatformThemeProvider>
    </PreviewCanvasShell>
  );
}
