import { useArgs, useEffect, useGlobals, useStoryContext } from 'storybook/preview-api';

type ThemeMode = 'light' | 'dark';

function isThemeMode(v: unknown): v is ThemeMode {
  return v === 'light' || v === 'dark';
}

/**
 * When the toolbar / globals.theme changes, push that value into story args (theme,
 * brandLogoTheme, mode) so Controls stay in sync. Keyboard uses `mode` for kb--light/kb--dark.
 *
 * **Do not call this from the root `.storybook/preview` decorator** — Storybook preview hooks
 * must run only in the decorator closure or in a story, and mixing them with React’s `useEffect`
 * there can **blank the entire preview**. Global theme still applies via `context.globals.theme`
 * in **`PmlStorybookDecorator`**. Opt in from an individual story’s **`render`** if you need
 * args sync for that story only.
 *
 * We do **not** sync args → globals: in the same render cycle, args can still be stale while
 * globals already updated, so updateGlobals would revert the toolbar and cause a flicker loop.
 */
export function useThemeSync(): void {
  const [globals] = useGlobals();
  const [args, updateArgs] = useArgs();
  const { id: storyId } = useStoryContext();
  const globalTheme = (globals.theme as string | undefined) ?? 'light';

  useEffect(() => {
    const patch: Partial<Record<'theme' | 'brandLogoTheme' | 'mode', ThemeMode>> = {};
    if (isThemeMode(args.theme) && args.theme !== globalTheme) {
      patch.theme = globalTheme;
    }
    if (isThemeMode(args.brandLogoTheme) && args.brandLogoTheme !== globalTheme) {
      patch.brandLogoTheme = globalTheme;
    }
    if (isThemeMode(args.mode) && args.mode !== globalTheme) {
      patch.mode = globalTheme;
    }

    if (Object.keys(patch).length > 0) {
      updateArgs(patch);
    }
    // Intentionally omit args from deps: only react to toolbar (globals) or story changes.
    // Including args would re-apply globals over user Control changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- args read when globalTheme/storyId change
  }, [globalTheme, storyId, updateArgs]);
}
