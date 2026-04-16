import type { StorybookConfig } from '@storybook/react-vite';

/**
 * App / full-page screens live in the Vite dev app (`npm run dev`) with AppShell —
 * not in Storybook. Storybook is for components, widgets, and foundation tokens only.
 */
const config: StorybookConfig = {
  stories: [
    '../src/Introduction.stories.tsx',
    /* CSF before MDX: doc pages use `<Meta of={…Stories} />`; loading `.mdx` first can leave that import empty at runtime. */
    '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/**/*.mdx',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/react-vite',
};
export default config;
