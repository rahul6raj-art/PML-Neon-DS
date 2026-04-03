import type { Preview } from '@storybook/react-vite';
import React from 'react';

import { useThemeSync } from './useThemeSync';
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
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      // Call preview hooks here (decorator body), not inside a nested React component.
      useThemeSync();

      // Toolbar / globals drive the preview shell immediately. Do not prefer args here — after a
      // toolbar change, args can still be one frame behind globals, which hid dark mode below.
      const theme = (context.globals?.theme as string) || 'light';
      const isDark = theme === 'dark';

      return React.createElement(
        'div',
        {
          'data-theme': isDark ? 'dark' : undefined,
          style: {
            background: isDark
              ? 'var(--surface-level-1)'
              : 'var(--surface-level-1)',
            color: isDark
              ? 'var(--text-neutral-strong)'
              : 'var(--text-neutral-strong)',
            padding: '24px',
            minHeight: '100%',
            transition: 'background 0.2s ease, color 0.2s ease',
          },
        },
        React.createElement(Story)
      );
    },
  ],
  parameters: {
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
