import type { AppPlatform } from '../theme';

/**
 * Viewport rules for the Vite app’s {@link ViewportPlatformProvider}.
 * Tablet min aligns with `--bottom-sheet-modal-breakpoint` (600px) in numbers.css.
 */
export const VIEWPORT_TABLET_MIN_PX = 600;
export const VIEWPORT_WEB_MIN_PX = 1024;

export function viewportWidthToPlatform(width: number): AppPlatform {
  if (width >= VIEWPORT_WEB_MIN_PX) return 'web';
  if (width >= VIEWPORT_TABLET_MIN_PX) return 'tablet';
  return 'mobile';
}
