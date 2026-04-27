import type { StorybookConfig } from '@storybook/react-vite';

/**
 * Storybook is the primary surface for components, widgets, and foundation tokens.
 * `npm run dev` mounts an empty `App` (null) — tokens load from `main.tsx` / `index.css`.
 */
const config: StorybookConfig = {
  stories: [
    '../src/Introduction.stories.tsx',
    /* CSF before MDX: doc pages use `<Meta of={…Stories} />`; loading `.mdx` first can leave that import empty at runtime. In colocated `*.mdx`, import CSF as `./Foo.stories.tsx` (explicit extension) so the Storybook indexer resolves `of={}` to the CSF file. */
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
