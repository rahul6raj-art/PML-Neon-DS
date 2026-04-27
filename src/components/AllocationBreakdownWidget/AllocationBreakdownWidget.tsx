import { Card } from '../Card';
import { Loading } from '../Loading';
import {
  SectionHeader,
  type SectionHeaderSize,
  type SectionHeaderTrailing,
} from '../SectionHeader';
import './AllocationBreakdownWidget.css';
import {
  AllocationBreakdownDynamicBarSvg,
  type AllocationDynamicBarSegment,
} from './AllocationBreakdownDynamicBarSvg';
import { AllocationBreakdownFigmaBar16497514 } from './AllocationBreakdownFigmaBar16497514';
import { AllocationBreakdownFigmaBar16617516 } from './AllocationBreakdownFigmaBar16617516';
import allocationBarFigma16497514Url from './pml-review-file-1649-7514-allocation-bar.svg?url';
import allocationBarFigma16617516Url from './pml-review-file-1661-7516-allocation-bar.svg?url';

/**
 * Optional **`allocationBarAssetSrc`** for **`figma-asset`** (`<img>`). Default inline vectors:
 * [Figma **`1649:7514`**](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1649-7514&t=A2RU4TiZE7uPzzJc-4) (≠4 rows), [Figma **`1661:7516`**](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1661-7516&t=A2RU4TiZE7uPzzJc-4) (**4 rows**). **`ALLOCATION_BAR_FIGMA_1661_7516_SRC`** for optional `<img>` when showing four slices.
 */
export const ALLOCATION_BAR_FIGMA_1649_7514_SRC = allocationBarFigma16497514Url;

/** Four-row bar — [Figma **`1661:7516`**](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1661-7516&t=A2RU4TiZE7uPzzJc-4). */
export const ALLOCATION_BAR_FIGMA_1661_7516_SRC = allocationBarFigma16617516Url;

/** @deprecated Use **`ALLOCATION_BAR_FIGMA_1649_7514_SRC`**. */
export const ALLOCATION_BAR_FIGMA_1644_6026_SRC = ALLOCATION_BAR_FIGMA_1649_7514_SRC;

export type AllocationBreakdownTrend = 'positive' | 'negative' | 'neutral';

export type AllocationChangeSentiment = 'positive' | 'negative' | 'neutral';

export interface AllocationBreakdownRow {
  label: string;
  valueLabel: string;
  /** Portion 0–100; drives bar partition weights and legend % when normalized */
  percent: number;
  /** Second line on the right (e.g. +2.40%). Hidden when empty or when `showRowTrend` is false. */
  changeLabel?: string;
  /** Colour for the change line; falls back from `trend` when omitted */
  changeSentiment?: AllocationChangeSentiment;
  /** Swatch + dynamic bar segment; defaults cycle lime / red / yellow / cyan (aligned with Figma **1661:7516** four-part bar). */
  swatchFill?: string;
  trend?: AllocationBreakdownTrend;
}

// Order matches Figma 1661:7516 legend → bar (lime, pink, yellow, cyan/teal cap).
const SWATCH_CYCLE = [
  'var(--colour-lime-green-strong)',
  'var(--colour-red-medium)',
  'var(--colour-yellow-strong)',
  'var(--colour-cyan)',
] as const;

function swatchForRow(row: AllocationBreakdownRow, index: number): string {
  if (row.swatchFill) return row.swatchFill;
  return SWATCH_CYCLE[index % SWATCH_CYCLE.length];
}

function resolveChangeSentiment(row: AllocationBreakdownRow): AllocationChangeSentiment {
  if (row.changeSentiment) return row.changeSentiment;
  if (row.trend === 'positive') return 'positive';
  if (row.trend === 'negative') return 'negative';
  return 'neutral';
}

function clampPercent(p: number): number {
  return Math.min(100, Math.max(0, p));
}

/** One normalized weight per legend row — same order/values as `listPercents`, for Figma bar slice widths. */
function barSegmentFractionsFromListPercents(listPercents: number[]): readonly number[] {
  const n = listPercents.length;
  if (n === 0) return [1 / 3, 1 / 3, 1 / 3];
  const parts = listPercents.map((p) => Math.max(0, p));
  const s = parts.reduce((a, b) => a + b, 0) || 1;
  return parts.map((p) => p / s);
}

/** Shares of 100 matching legend/bar weights when `normalizeBarPercents` is true. */
function partitionPercents(weights: number[]): number[] {
  const n = weights.length;
  if (n === 0) return [];
  const sum = weights.reduce((a, b) => a + b, 0);
  if (sum <= 0) {
    const base = Math.floor(100 / n);
    const out = Array.from({ length: n }, () => base);
    out[n - 1] = out[n - 1]! + (100 - base * n);
    return out;
  }
  const rounded = weights.map((w) => Math.round((Math.max(0, w) / sum) * 100));
  const diff = 100 - rounded.reduce((a, b) => a + b, 0);
  if (diff !== 0) rounded[rounded.length - 1] = Math.max(0, rounded[rounded.length - 1]! + diff);
  return rounded;
}

export interface AllocationBreakdownWidgetProps {
  title?: string;
  showSectionHeader?: boolean;
  sectionHeaderSize?: SectionHeaderSize;
  showChevron?: boolean;
  trailing?: SectionHeaderTrailing;
  linkText?: string;
  onLinkPress?: () => void;
  buttonLabel?: string;
  onButtonPress?: () => void;
  rows?: AllocationBreakdownRow[];
  /**
   * When false, hides the optional change line even if `changeLabel` is set.
   * @default true
   */
  showRowTrend?: boolean;
  emptyMessage?: string;
  loading?: boolean;
  onRowClick?: (row: AllocationBreakdownRow, index: number) => void;
  /**
   * **`figma-asset` (default)** — Figma vectors: [ **`1649:7514`**](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1649-7514&t=A2RU4TiZE7uPzzJc-4) when **row count ≠ 4** (`AllocationBreakdownFigmaBar16497514`, one slice per row, crops **`i % 3`**, widths from legend **`%`**); [ **`1661:7516`**](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1661-7516&t=A2RU4TiZE7uPzzJc-4) when **exactly 4 rows** (`AllocationBreakdownFigmaBar16617516`) — **single** frame `exportAsync` (fixed proportions; legend **`%`** still from data). **`allocationBarAssetSrc`** (`<img>`) overrides both and stays static.
   * **`proportional-css`** — **not** Figma parity: approximate rects + gradients so segment **widths** follow **`percent`** (use only when you accept visual drift from the file).
   * @default 'figma-asset'
   */
  allocationBarVisual?: 'figma-asset' | 'proportional-css';
  /** With `figma-asset`, optional `<img src>` instead of inline SVG (static asset; no % width mapping). */
  allocationBarAssetSrc?: string;
  /**
   * When true (default), legend **`%`** is normalized to shares of 100 from **`percent`** (aligned with bar).
   * When false, raw **`percent`** (clamped 0–100).
   * @default true
   */
  normalizeBarPercents?: boolean;
  className?: string;
}

function segmentedBarAriaLabel(rows: AllocationBreakdownRow[], weights: number[]) {
  const sum = weights.reduce((a, b) => a + b, 0) || 1;
  return rows.map((r, i) => `${r.label} ${Math.round((weights[i]! / sum) * 100)} percent`).join(', ');
}

const DYNAMIC_BAR_GUTTER_U = 0;
const DYNAMIC_BAR_VB_W = 331;

function buildDynamicBarSegments(
  rows: AllocationBreakdownRow[],
  weights: number[],
): AllocationDynamicBarSegment[] {
  const n = rows.length;
  if (n === 0) return [];
  const sum = weights.reduce((a, b) => a + b, 0) || 1;
  const totalGutter = Math.max(0, n - 1) * DYNAMIC_BAR_GUTTER_U;
  const usable = DYNAMIC_BAR_VB_W - totalGutter;
  let x = 0;
  return rows.map((row, i) => {
    const w = (Math.max(0, weights[i]!) / sum) * usable;
    const seg: AllocationDynamicBarSegment = { x, width: w, color: swatchForRow(row, i) };
    x += w + (i < n - 1 ? DYNAMIC_BAR_GUTTER_U : 0);
    return seg;
  });
}

function SegmentedBar({
  rows,
  visual,
  assetSrc,
  listPercents,
}: {
  rows: AllocationBreakdownRow[];
  visual: 'figma-asset' | 'proportional-css';
  assetSrc?: string;
  listPercents: number[];
}) {
  const weights = rows.map((r) => Math.max(0, r.percent));
  const ariaLabel = segmentedBarAriaLabel(rows, weights);

  if (visual === 'figma-asset') {
    return (
      <div className="abw__segmented-bar abw__segmented-bar--figma-asset" role="img" aria-label={ariaLabel}>
        {assetSrc ? (
          <img
            className="abw__segmented-bar-img"
            src={assetSrc}
            alt=""
            width={331}
            height={40}
            decoding="async"
          />
        ) : rows.length === 4 ? (
          <AllocationBreakdownFigmaBar16617516
            className="abw__segmented-bar-svg"
            aria-hidden
            focusable={false}
            preserveAspectRatio="none"
          />
        ) : (
          <AllocationBreakdownFigmaBar16497514
            className="abw__segmented-bar-svg"
            segmentFractions={barSegmentFractionsFromListPercents(listPercents)}
            aria-hidden
            focusable={false}
            preserveAspectRatio="none"
          />
        )}
      </div>
    );
  }

  const segments = buildDynamicBarSegments(rows, weights);
  return (
    <div className="abw__segmented-bar abw__segmented-bar--dynamic-svg" role="img" aria-label={ariaLabel}>
      <AllocationBreakdownDynamicBarSvg segments={segments} />
    </div>
  );
}

function LegendRow({
  row,
  index,
  showChange,
  onRowClick,
  listPercent,
}: {
  row: AllocationBreakdownRow;
  index: number;
  showChange: boolean;
  onRowClick?: (row: AllocationBreakdownRow, index: number) => void;
  listPercent: number;
}) {
  const swatch = swatchForRow(row, index);
  const changeLine =
    showChange && row.changeLabel && row.changeLabel.length > 0 ? row.changeLabel : null;
  const sentiment = resolveChangeSentiment(row);
  const rowClass = ['abw__legend-row', onRowClick && 'abw__legend-row--interactive']
    .filter(Boolean)
    .join(' ');

  const inner = (
    <>
      <span className="abw__swatch" style={{ background: swatch }} aria-hidden />
      <div className="abw__legend-main">
        <div className="abw__legend-left">
          <span className="abw__legend-label">{row.label}</span>
          <span className="abw__legend-pct">{listPercent}%</span>
        </div>
        <div className="abw__legend-right">
          <span className="abw__legend-value">{row.valueLabel}</span>
          {changeLine ? (
            <span
              className={[
                'abw__legend-change',
                sentiment === 'positive' && 'abw__legend-change--positive',
                sentiment === 'negative' && 'abw__legend-change--negative',
                sentiment === 'neutral' && 'abw__legend-change--neutral',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {changeLine}
            </span>
          ) : null}
        </div>
      </div>
    </>
  );

  if (onRowClick) {
    return (
      <button type="button" className={rowClass} onClick={() => onRowClick(row, index)}>
        {inner}
      </button>
    );
  }

  return <div className={rowClass}>{inner}</div>;
}

export const AllocationBreakdownWidget = ({
  title = 'Allocations',
  showSectionHeader = true,
  sectionHeaderSize = 'extra-large',
  showChevron = true,
  trailing = 'none',
  linkText,
  onLinkPress,
  buttonLabel,
  onButtonPress,
  rows = [],
  showRowTrend = true,
  emptyMessage = 'No allocation data yet.',
  loading = false,
  onRowClick,
  allocationBarVisual = 'figma-asset',
  allocationBarAssetSrc,
  normalizeBarPercents = true,
  className,
}: AllocationBreakdownWidgetProps) => {
  const rootCls = ['abw', className].filter(Boolean).join(' ');
  const rowWeights = rows.map((r) => Math.max(0, r.percent));
  const listPercents = normalizeBarPercents
    ? partitionPercents(rowWeights)
    : rows.map((r) => clampPercent(r.percent));

  return (
    <div className={rootCls}>
      {showSectionHeader && (
        <SectionHeader
          size={sectionHeaderSize}
          title={title}
          trailing={trailing}
          showSubtext={false}
          showChevron={showChevron}
          linkText={linkText}
          onLinkPress={onLinkPress}
          buttonLabel={buttonLabel}
          onButtonPress={onButtonPress}
        />
      )}

      <div className="abw__body">
        {loading ? (
          <div className="abw__loading" role="status" aria-live="polite">
            <Loading type="theme" label="Loading allocation" />
          </div>
        ) : rows.length === 0 ? (
          <p className="abw__empty">{emptyMessage}</p>
        ) : (
          <Card className="abw__card-shell">
            <div className="abw__card-inner">
              <SegmentedBar
                rows={rows}
                visual={allocationBarVisual}
                assetSrc={allocationBarAssetSrc}
                listPercents={listPercents}
              />
              <div className="abw__legend">
                {rows.map((row, index) => (
                  <LegendRow
                    key={`${row.label}-${index}`}
                    row={row}
                    index={index}
                    listPercent={listPercents[index] ?? 0}
                    showChange={showRowTrend}
                    onRowClick={onRowClick}
                  />
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
