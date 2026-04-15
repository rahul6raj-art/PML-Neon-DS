import { deepMerge } from '../utils/deepMerge';
import { scaleTokens } from '../utils/scaleTokens';
import type { DesignTokens } from './mobile';
import { mobileTokens } from './mobile';

/** Factor applied to {@link mobileTokens} to derive the default `web` density set. */
export const WEB_TOKEN_SCALE = 0.875;

const scaledWebTokens = scaleTokens(
  mobileTokens as unknown as Record<string, unknown>,
  WEB_TOKEN_SCALE,
  { skipNumericScaleForSubtreeKeys: new Set(['fontWeight']) }
) as DesignTokens;

/**
 * Optional manual overrides after scaling (spacing, radius, layout literals, typography, etc.).
 */
export type WebTokenOverrides = Partial<{
  units: Partial<DesignTokens['units']>;
  literals: Partial<DesignTokens['literals']>;
  typography: Partial<{
    fontSize: Partial<DesignTokens['typography']['fontSize']>;
    lineHeight: Partial<DesignTokens['typography']['lineHeight']>;
    fontWeight: Partial<DesignTokens['typography']['fontWeight']>;
  }>;
}>;

export const webTokenOverrides: WebTokenOverrides = {};

export const webTokens: DesignTokens = deepMerge(
  scaledWebTokens,
  webTokenOverrides as Record<string, unknown>
);
