import type { ReactNode } from 'react';
import type { BadgeContext } from '../Badge/Badge';
import type { LogoCategory } from '../Logo';
import type { SectionHeaderSize } from '../SectionHeader';

export type StocksTilesChangeSentiment = 'positive' | 'negative' | 'neutral';

/**
 * Top **icon / logo** slot: optional **`leading`** custom node, or **`leadingLogoName`** (**`Logo`**),
 * or **`leadingIconName`** (**`Icon`** in a surface chip). **`leadingLogoName`** wins over **`leadingIconName`** when both are set.
 */
export interface StocksTilesItem {
  /** Primary line — full **company** name (single line; long names ellipsize in the tile). */
  title: string;
  price: string;
  /**
   * Move / secondary metric. When **empty** (after trim), the **change** row is omitted
   * (e.g. strategy shortcut tiles that only need **title** + **price** + top **icon**).
   */
  changeLabel: string;
  changeSentiment: StocksTilesChangeSentiment;
  /**
   * Optional per-tile override of widget **`changeAsBadge`**.
   * Omit on every tile so the widget toggle applies to the whole strip; set only when one row must differ (e.g. mixed demo).
   */
  changeAsBadge?: boolean;
  /**
   * Optional status chip **between** top media and title (e.g. Active, MTF). Hidden when empty or when widget **`showStatusBadges`** is false.
   * Omit on all tiles for a strip with no status row; use the same **`statusBadgeLabel`** / **`statusBadgeContext`** on each tile when every row should match.
   */
  statusBadgeLabel?: string;
  statusBadgeContext?: BadgeContext;
  /** **`Logo`** brand name (resolved via **`leadingLogoCategory`**). */
  leadingLogoName?: string;
  leadingLogoCategory?: LogoCategory;
  /** **`Icon`** glyph name when no logo (or secondary to logo if only icon is set). */
  leadingIconName?: string;
  /** Custom top slot (wins over **`leadingLogoName`** / **`leadingIconName`**). */
  leading?: ReactNode;
  /**
   * When `false`, hides top media for this tile even if the widget **`showTopMedia`** is true.
   * When omitted, the widget toggle applies.
   */
  showTopMedia?: boolean;
}

export interface StocksTilesWidgetProps {
  title?: string;
  showSectionHeader?: boolean;
  sectionHeaderSize?: SectionHeaderSize;
  /**
   * Passed to **`SectionHeader`**. **Omit** for component default (**extra-large** shows chevron).
   * **`false`** hides chevron even at **extra-large** (static title).
   */
  showChevron?: boolean;
  items: StocksTilesItem[];
  /**
   * Default for tiles: render **`changeLabel`** as a muted **Badge** (positive / negative / default).
   * Per-item **`changeAsBadge`** overrides when set.
   */
  changeAsBadge?: boolean;
  /** When false, **`statusBadgeLabel`** is never shown (chips row off). */
  showStatusBadges?: boolean;
  /**
   * When true, shows the **top** icon / logo row per tile when the item supplies **`leading`**, **`leadingLogoName`**, or **`leadingIconName`**.
   * Storybook / product toggles this to enable or disable the strip.
   */
  showTopMedia?: boolean;
  className?: string;
  onTilePress?: (index: number) => void;
}
