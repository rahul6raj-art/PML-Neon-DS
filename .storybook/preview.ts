import type { Preview } from '@storybook/react-vite';
import React from 'react';

import { PmlStorybookDecorator } from './previewDecorator';
import { BASELINE_PLATFORM } from '../src/theme';
import './triple-platform-preview.css';
import './preview-canvas.css';
import '../src/tokens/colors.css';
import '../src/tokens/numbers.css';
import '../src/tokens/typography.css';
/** Base app styles (Tailwind + root rhythm) so the iframe is not an unstyled blank surface. */
import '../src/index.css';

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
    (Story, context) =>
      React.createElement(PmlStorybookDecorator, {
        Story,
        context,
      }),
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
