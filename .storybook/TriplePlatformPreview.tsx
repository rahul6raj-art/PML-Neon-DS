import React, { useLayoutEffect, useRef } from 'react';

import { PlatformThemeProvider } from '../src/theme';
import type { AppPlatform } from '../src/theme';

/** Distinct scope classes so three injected token blocks do not overwrite each other. */
const SCOPE_CLASS: Record<AppPlatform, string> = {
  mobile: 'sb-pml-density-col-mobile',
  tablet: 'sb-pml-density-col-tablet',
  web: 'sb-pml-density-col-web',
};

const PLATFORM_LABEL: Record<AppPlatform, string> = {
  mobile: 'Mobile',
  tablet: 'Tablet',
  web: 'Web',
};

const ORDER: AppPlatform[] = ['mobile', 'tablet', 'web'];

/**
 * Fixed column width so `layout: centered` stories (e.g. 344px card-width components) still fit
 * inside the padded panel. Flexible `flex: 1 1 280px` columns shrink below that and centered
 * content overflows horizontally — the first column often clips on the left.
 */
const COLUMN_OUTER_PX = 376;

export type TriplePlatformPreviewProps = {
  Story: React.ComponentType;
  isDark: boolean;
  /** Stable id when the story changes — resets horizontal scroll so Mobile stays in view. */
  storyKey?: string;
};

/**
 * Renders the same story three times with independent platform token scopes (Storybook toolbar).
 *
 * Uses a full-width scrollport so Storybook’s centered preview does not push a single
 * `max-content`-wide row off-screen (Mobile was often unreachable horizontally).
 */
export function TriplePlatformPreview({ Story, isDark, storyKey }: TriplePlatformPreviewProps) {
  const dataTheme = isDark ? 'dark' : undefined;
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollLeft = 0;
      el.scrollTop = 0;
    }
  }, [storyKey]);

  /*
   * Storybook’s preview shell often uses overflow: hidden / overflow-x: hidden, which clips the
   * 100vw breakout and tall stories. Loosen only while this preview is mounted.
   */
  useLayoutEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const revert: Array<{
      node: HTMLElement;
      overflow: string;
      overflowX: string;
      overflowY: string;
    }> = [];

    let node: HTMLElement | null = scrollEl.parentElement;
    let depth = 0;
    while (node && depth < 20) {
      const cs = getComputedStyle(node);
      const snap = {
        node,
        overflow: node.style.overflow,
        overflowX: node.style.overflowX,
        overflowY: node.style.overflowY,
      };
      let changed = false;

      if (cs.overflow === 'hidden') {
        node.style.overflow = 'auto';
        changed = true;
      } else {
        if (cs.overflowX === 'hidden' || cs.overflowX === 'clip') {
          node.style.overflowX = 'auto';
          changed = true;
        }
        if (cs.overflowY === 'hidden' || cs.overflowY === 'clip') {
          node.style.overflowY = 'auto';
          changed = true;
        }
      }

      if (changed) {
        revert.push(snap);
      }

      node = node.parentElement;
      depth += 1;
    }

    return () => {
      revert.forEach(({ node, overflow, overflowX, overflowY }) => {
        node.style.overflow = overflow;
        node.style.overflowX = overflowX;
        node.style.overflowY = overflowY;
      });
    };
  }, [storyKey]);

  return (
    <div
      ref={scrollRef}
      className="sb-pml-triple-scrollport"
      style={{
        color: 'var(--text-neutral-strong)',
      }}
    >
      <div className="sb-pml-triple-row">
        {ORDER.map((platform) => (
          <PlatformThemeProvider key={platform} platform={platform} scopeClassName={SCOPE_CLASS[platform]}>
            <div
              className={SCOPE_CLASS[platform]}
              data-pml-platform={platform}
              data-theme={dataTheme}
              style={{
                flex: `0 0 ${COLUMN_OUTER_PX}px`,
                width: COLUMN_OUTER_PX,
                minWidth: COLUMN_OUTER_PX,
                maxWidth: COLUMN_OUTER_PX,
                background: 'var(--surface-level-1)',
                color: 'var(--text-neutral-strong)',
                padding: 'var(--spacing-16)',
                borderRadius: 'var(--radius-8)',
                transition: 'background 0.2s ease, color 0.2s ease',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  fontSize: 'var(--font-size-caption)',
                  fontWeight: 600,
                  color: 'var(--text-neutral-moderate)',
                  marginBottom: 'var(--spacing-12)',
                  letterSpacing: '0.02em',
                }}
              >
                {PLATFORM_LABEL[platform]}
                {platform === 'mobile' ? ' (baseline)' : ' (scoped tokens)'}
              </div>
              <div
                className={[
                  'sb-pml-triple-story-host',
                  platform === 'mobile' ? 'sb-pml-bottom-sheet-host' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{
                  width: '100%',
                  minWidth: 0,
                  boxSizing: 'border-box',
                  /* Do not add overflow-x here — it captures horizontal wheel/trackpad before the triple row. */
                  overflowX: 'visible',
                  overflowY: 'visible',
                  /* Establishes a containing block for `position: fixed` (e.g. BottomSheet) so overlays
                     stay inside this column; viewport @media alone cannot distinguish Mobile vs Web columns. */
                  position: 'relative',
                  transform: 'translateZ(0)',
                }}
              >
                <Story />
              </div>
            </div>
          </PlatformThemeProvider>
        ))}
      </div>
    </div>
  );
}
