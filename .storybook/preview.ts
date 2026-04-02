import type { Preview } from '@storybook/react-vite';
import React from 'react';

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
      const theme = context.globals.theme || 'light';
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
