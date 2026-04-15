import { deepMerge } from '../utils/deepMerge';
import { scaleTokens } from '../utils/scaleTokens';
import type { DesignTokens } from './mobile';
import { mobileTokens } from './mobile';

/**
 * Density between **mobile** (1.0) and **web** (`0.875` in {@link ./web}).
 * Arithmetic midpoint: `(1 + 0.875) / 2` → **15/16 = 0.9375**.
 */
export const TABLET_TOKEN_SCALE = (1 + 0.875) / 2;

const scaledTabletTokens = scaleTokens(
  mobileTokens as unknown as Record<string, unknown>,
  TABLET_TOKEN_SCALE,
  { skipNumericScaleForSubtreeKeys: new Set(['fontWeight']) }
) as DesignTokens;

export type TabletTokenOverrides = Partial<{
  units: Partial<DesignTokens['units']>;
  literals: Partial<DesignTokens['literals']>;
  typography: Partial<{
    fontSize: Partial<DesignTokens['typography']['fontSize']>;
    lineHeight: Partial<DesignTokens['typography']['lineHeight']>;
    fontWeight: Partial<DesignTokens['typography']['fontWeight']>;
  }>;
}>;

export const tabletTokenOverrides: TabletTokenOverrides = {};

export const tabletTokens: DesignTokens = deepMerge(
  scaledTabletTokens,
  tabletTokenOverrides as Record<string, unknown>
);
