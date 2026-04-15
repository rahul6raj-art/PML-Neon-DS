/**
 * Mobile design tokens — numeric source of truth for spacing primitives, layout literals,
 * and typography sizes. Mirrors `numbers.css` and the scalable portion of `typography.css`.
 * Components keep using CSS variables; `PlatformThemeProvider` + `platformTokenSets` can inject
 * scoped overrides for non-baseline platforms (e.g. `tablet`, `web`).
 */
export const mobileTokens = {
  units: {
    1: 2,
    2: 4,
    3: 6,
    4: 8,
    6: 12,
    7: 16,
    9: 24,
    10: 32,
    11: 48,
    12: 56,
    13: 60,
    max: 200,
  },
  literals: {
    phoneColumnWidth: 376,
    cardWidth: 344,
    carouselCardWidth: 324,
    borderWidthHairline: 1,
    heatmapSectorCardWidth: 324,
    heatmapMosaicMinHeight: 100,
    heatmapCellMinHeight: 100,
    heatmapCellCompactMinHeight: 49,
    heatmapMosaicMinHeightTall: 132,
    heatmapCellMinHeightTall: 124,
    heatmapCellCompactMinHeightTall: 58,
    wheelCarouselPillHeight: 44,
    wheelCarouselPillMaxWidth: 190,
    wheelCarouselDividerHeight: 22,
    /** Kept as string so scaling does not collapse fractional pixels. */
    wheelCarouselDividerWidth: '0.5px',
    wheelCarouselMaskFadeIn: '10%',
    wheelCarouselMaskFadeOut: '90%',
  },
  typography: {
    fontSize: {
      body: 14,
      subtext: 12,
      display2: 36,
      title1: 22,
      display1: 42,
      display3: 32,
      title2: 20,
      title3: 18,
      title4: 16,
      caption: 10,
    },
    lineHeight: {
      body: 20,
      subtext: 16,
      display2: 40,
      title1: 28,
      display1: 48,
      display3: 36,
      title2: 24,
      title3: 24,
      title4: 22,
      caption: 12,
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
} as const;

export type DesignTokens = typeof mobileTokens;
