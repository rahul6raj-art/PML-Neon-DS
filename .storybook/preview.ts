import type { Preview } from '@storybook/react-vite';
import React from 'react';

import { useThemeSync } from './useThemeSync';
import {
  BASELINE_PLATFORM,
  parseAppPlatform,
  PLATFORM_SCOPE_CLASS,
  PlatformThemeProvider,
} from '../src/theme';
import { TriplePlatformPreview } from './TriplePlatformPreview';
import './triple-platform-preview.css';
import '../src/tokens/colors.css';
import '../src/tokens/numbers.css';
import '../src/tokens/typography.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color mode for components',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
    platform: {
      description: 'Token density: mobile (baseline), tablet, web',
      toolbar: {
        title: 'Platform',
        icon: 'browser',
        items: [
          { value: BASELINE_PLATFORM, title: 'Mobile' },
          { value: 'tablet', title: 'Tablet' },
          { value: 'web', title: 'Web' },
          { value: 'compare', title: 'Side by side' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
    platform: BASELINE_PLATFORM,
  },
  decorators: [
    (Story, context) => {
      useThemeSync();

      const theme = (context.globals?.theme as string) || 'light';
      const isDark = theme === 'dark';
      const rawPlatform = context.globals?.platform;

      if (rawPlatform === 'compare') {
        return React.createElement(TriplePlatformPreview, {
          Story,
          isDark,
          storyKey: context.id,
        });
      }

      const platform = parseAppPlatform(rawPlatform);
      const isMobilePlatform = platform === BASELINE_PLATFORM;

      const storyInner = isMobilePlatform
        ? React.createElement('div', {
            className: 'sb-pml-bottom-sheet-host sb-pml-storybook-phone-host',
            style: {
              width: 'min(376px, 100%)',
              maxWidth: '100%',
              margin: '0 auto',
              position: 'relative',
              transform: 'translateZ(0)',
              boxSizing: 'border-box',
            },
            children: React.createElement(Story),
          })
        : React.createElement(Story);

      return React.createElement(
        PlatformThemeProvider,
        { platform },
        React.createElement('div', {
          className: PLATFORM_SCOPE_CLASS,
          'data-theme': isDark ? 'dark' : undefined,
          style: {
            background: 'var(--surface-level-1)',
            color: 'var(--text-neutral-strong)',
            padding: '24px',
            minHeight: '100vh',
            width: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            transition: 'background 0.2s ease, color 0.2s ease',
          },
          children: storyInner,
        })
      );
    },
  ],
  parameters: {
    /* Default: full canvas width so Side by side + tall stories aren’t clipped. Stories may override (e.g. layout: centered). */
    layout: 'fullscreen',
    options: {
      storySort: {
        order: ['Introduction', 'Components', 'Widgets'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    backgrounds: { disable: true },
  },
};

export default preview;
