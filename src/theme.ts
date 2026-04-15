import {
  createContext,
  createElement,
  Fragment,
  useContext,
  useMemo,
} from 'react';
import type { ReactNode } from 'react';

import type { DesignTokens } from './tokens/mobile';
import { mobileTokens } from './tokens/mobile';
import { SEMANTIC_NUMBER_SCOPE_REDECLARATIONS } from './tokens/semanticNumberScopeRedeclarations';
import { tabletTokens } from './tokens/tablet';
import { webTokens } from './tokens/web';

/**
 * Numeric / density token sets per platform. Add keys here and matching toolbar items in
 * `.storybook/preview.ts` — injection runs for every key except {@link BASELINE_PLATFORM}.
 * Contributor notes: Storybook Introduction story, “Platform density” section.
 */
export const platformTokenSets = {
  mobile: mobileTokens,
  tablet: tabletTokens,
  web: webTokens,
} as const satisfies Record<string, DesignTokens>;

/** Baseline matches global `:root` from `numbers.css` / `typography.css` — no scoped override `<style>`. */
export const BASELINE_PLATFORM = 'mobile' as const;

export type AppPlatform = keyof typeof platformTokenSets;

export const PLATFORM_SCOPE_CLASS = 'sb-platform-scope';

const PlatformThemeContext = createContext<AppPlatform>(BASELINE_PLATFORM);

export function parseAppPlatform(value: unknown): AppPlatform {
  if (typeof value === 'string' && Object.hasOwn(platformTokenSets, value)) {
    return value as AppPlatform;
  }
  return BASELINE_PLATFORM;
}

export function usesScopedTokenInjection(platform: AppPlatform): boolean {
  return platform !== BASELINE_PLATFORM;
}

/**
 * Active density platform when wrapped by `PlatformThemeProvider` (e.g. Storybook preview).
 */
export function usePlatformTheme(): AppPlatform {
  return useContext(PlatformThemeContext);
}

export function usePlatformTokens(): DesignTokens {
  return platformTokenSets[usePlatformTheme()];
}

function splitCamelWithDigits(s: string): string {
  return s
    .replace(/([a-z])(\d)/gi, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

function literalKeyToCssVarName(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function formatCssValue(value: string | number): string {
  if (typeof value === 'string') {
    return value;
  }
  return `${value}px`;
}

/**
 * Flatten design tokens into CSS custom property declarations (no selector wrapper).
 * Used for non-baseline platforms: primitives + semantic re-binds + literals + typography.
 */
export function designTokensToCssDeclarations(tokens: DesignTokens): string[] {
  const lines: string[] = [];

  const units = tokens.units;
  for (const key of Object.keys(units) as (keyof typeof units)[]) {
    const value = units[key];
    const cssName = key === 'max' ? 'unit-max' : `unit-${String(key)}`;
    lines.push(`--${cssName}: ${formatCssValue(value)};`);
  }

  lines.push(...SEMANTIC_NUMBER_SCOPE_REDECLARATIONS);

  const literals = tokens.literals;
  for (const key of Object.keys(literals) as (keyof typeof literals)[]) {
    const value = literals[key];
    lines.push(`--${literalKeyToCssVarName(String(key))}: ${formatCssValue(value as string | number)};`);
  }

  const { fontSize, lineHeight } = tokens.typography;
  for (const key of Object.keys(fontSize) as (keyof typeof fontSize)[]) {
    lines.push(`--font-size-${splitCamelWithDigits(String(key))}: ${formatCssValue(fontSize[key])};`);
  }
  for (const key of Object.keys(lineHeight) as (keyof typeof lineHeight)[]) {
    lines.push(`--line-height-${splitCamelWithDigits(String(key))}: ${formatCssValue(lineHeight[key])};`);
  }

  return lines;
}

/**
 * @param scopeClassName CSS class name (no dot) for the selector that receives token overrides.
 *        Defaults to {@link PLATFORM_SCOPE_CLASS}. Use distinct names per column for side-by-side previews.
 */
export function getPlatformCssBlock(
  platform: AppPlatform,
  scopeClassName: string = PLATFORM_SCOPE_CLASS,
): string | null {
  if (!usesScopedTokenInjection(platform)) {
    return null;
  }
  const scope = scopeClassName.replace(/^\.+/, '').trim() || PLATFORM_SCOPE_CLASS;
  const tokenSet = platformTokenSets[platform];
  const body = designTokensToCssDeclarations(tokenSet).join('');
  return `.${scope}{${body}}`;
}

type PlatformThemeProviderProps = {
  platform: AppPlatform;
  children: ReactNode;
  /**
   * Class on the element that should receive scoped overrides (default {@link PLATFORM_SCOPE_CLASS}).
   * Must match the class on the wrapped subtree root when using non-baseline platforms.
   */
  scopeClassName?: string;
};

/**
 * Injects scoped CSS variable overrides for non-baseline platforms and exposes the active
 * platform on React context. Wrap the app or Storybook canvas root in an element with
 * {@link PLATFORM_SCOPE_CLASS} (or the same string as `scopeClassName`) so overrides apply.
 */
export function PlatformThemeProvider({ platform, children, scopeClassName }: PlatformThemeProviderProps) {
  const scope = scopeClassName ?? PLATFORM_SCOPE_CLASS;
  const css = useMemo(() => getPlatformCssBlock(platform, scope), [platform, scope]);

  return createElement(
    PlatformThemeContext.Provider,
    { value: platform },
    createElement(
      Fragment,
      null,
      css
        ? createElement('style', {
            'data-pml-platform': platform,
            dangerouslySetInnerHTML: { __html: css },
          })
        : null,
      children
    )
  );
}
