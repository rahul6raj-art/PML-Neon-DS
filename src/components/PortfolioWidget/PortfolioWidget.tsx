import { useRef, useState, type AnimationEvent } from 'react';
import {
  AllocationBreakdownWidget,
  type AllocationBreakdownRow,
} from '../AllocationBreakdownWidget';
import { Chip } from '../Chip';
import { Icon } from '../Icon';
import {
  GraphWidget,
  LEGACY_PORTFOLIO_HOME_CHART_PATH_1D,
  LEGACY_PORTFOLIO_HOME_CHART_PATH_1M,
  LEGACY_PORTFOLIO_HOME_CHART_PATH_1W,
  LEGACY_PORTFOLIO_HOME_CHART_PATH_1Y,
  LEGACY_PORTFOLIO_HOME_CHART_PATH_6M,
  LEGACY_PORTFOLIO_HOME_CHART_PATH_ALL,
  legacyPortfolioHomeChartAreaFill,
} from '../GraphWidget';
import './PortfolioWidget.css';

/** Legacy **PortfolioHome** cubic paths (same **`d`** as archived app). */
export const PORTFOLIO_WIDGET_CHART_PATH_POSITIVE = LEGACY_PORTFOLIO_HOME_CHART_PATH_1D;
export const PORTFOLIO_WIDGET_CHART_AREA_PATH_POSITIVE =
  legacyPortfolioHomeChartAreaFill(LEGACY_PORTFOLIO_HOME_CHART_PATH_1D);

/** 6M series was loss-coloured in **PortfolioHome** — reuse that path for negative demos. */
export const PORTFOLIO_WIDGET_CHART_PATH_NEGATIVE = LEGACY_PORTFOLIO_HOME_CHART_PATH_6M;
export const PORTFOLIO_WIDGET_CHART_AREA_PATH_NEGATIVE =
  legacyPortfolioHomeChartAreaFill(LEGACY_PORTFOLIO_HOME_CHART_PATH_6M);

export const PORTFOLIO_WIDGET_TIME_RANGES = ['1D', '1W', '1M', '6M', '1Y', 'All'] as const;

/** One entry per **`timeRanges`** index — drives returns row + **GraphWidget** for that chip. */
export type PortfolioWidgetRangeSnapshot = {
  returnsLabel: string;
  returnsValue: string;
  svgPath: string;
  /** Closed **`d`** for **GraphWidget** `areaFillPath` (same anchors as **svgPath**). */
  areaFillPath?: string;
  chartPositive: boolean;
  chartIndicatorY: number;
};

/** Demo series aligned with **`PORTFOLIO_WIDGET_TIME_RANGES`** (Stock Home–style chip strip). */
export const PORTFOLIO_WIDGET_RANGE_SNAPSHOTS_DEFAULT: readonly PortfolioWidgetRangeSnapshot[] = [
  {
    returnsLabel: '1D Returns:\u00a0',
    returnsValue: '+₹240.50 (2.40%)',
    svgPath: PORTFOLIO_WIDGET_CHART_PATH_POSITIVE,
    areaFillPath: PORTFOLIO_WIDGET_CHART_AREA_PATH_POSITIVE,
    chartPositive: true,
    chartIndicatorY: 32,
  },
  {
    returnsLabel: '1W Returns:\u00a0',
    returnsValue: '+₹1,850.20 (3.12%)',
    svgPath: LEGACY_PORTFOLIO_HOME_CHART_PATH_1W,
    areaFillPath: legacyPortfolioHomeChartAreaFill(LEGACY_PORTFOLIO_HOME_CHART_PATH_1W),
    chartPositive: true,
    chartIndicatorY: 30,
  },
  {
    returnsLabel: '1M Returns:\u00a0',
    returnsValue: '+₹5,420.80 (8.45%)',
    svgPath: LEGACY_PORTFOLIO_HOME_CHART_PATH_1M,
    areaFillPath: legacyPortfolioHomeChartAreaFill(LEGACY_PORTFOLIO_HOME_CHART_PATH_1M),
    chartPositive: true,
    chartIndicatorY: 25,
  },
  {
    returnsLabel: '6M Returns:\u00a0',
    returnsValue: '-₹12,340.60 (5.20%)',
    svgPath: LEGACY_PORTFOLIO_HOME_CHART_PATH_6M,
    areaFillPath: legacyPortfolioHomeChartAreaFill(LEGACY_PORTFOLIO_HOME_CHART_PATH_6M),
    chartPositive: false,
    chartIndicatorY: 80,
  },
  {
    returnsLabel: '1Y Returns:\u00a0',
    returnsValue: '+₹28,650.40 (18.92%)',
    svgPath: LEGACY_PORTFOLIO_HOME_CHART_PATH_1Y,
    areaFillPath: legacyPortfolioHomeChartAreaFill(LEGACY_PORTFOLIO_HOME_CHART_PATH_1Y),
    chartPositive: true,
    chartIndicatorY: 15,
  },
  {
    returnsLabel: 'All Returns:\u00a0',
    returnsValue: '+₹35,799 (28.28%)',
    svgPath: LEGACY_PORTFOLIO_HOME_CHART_PATH_ALL,
    areaFillPath: legacyPortfolioHomeChartAreaFill(LEGACY_PORTFOLIO_HOME_CHART_PATH_ALL),
    chartPositive: true,
    chartIndicatorY: 10,
  },
];

function snapshotForRangeIndex(
  rangeByPeriod: readonly PortfolioWidgetRangeSnapshot[] | undefined,
  activeRange: number,
): PortfolioWidgetRangeSnapshot | undefined {
  if (!rangeByPeriod?.length) return undefined;
  const i = Math.min(Math.max(0, activeRange), rangeByPeriod.length - 1);
  return rangeByPeriod[i];
}

/**
 * Privacy mask: each digit becomes `•`; commas and decimal points are omitted
 * (no `,` / `.` in the masked string). Other characters (₹, +, %, parens, spaces) stay.
 */
export function maskPortfolioDigits(text: string): string {
  let out = '';
  for (const ch of text) {
    if (/\d/.test(ch)) out += '•';
    else if (ch === ',' || ch === '.') continue;
    else out += ch;
  }
  return out;
}

export interface PortfolioWidgetProps {
  /** Section title above total value */
  headerTitle?: string;
  totalValue?: string;
  showEyeToggle?: boolean;
  /**
   * When amounts are visible (open eye). Omit for internal toggle state.
   * If set, use with `onValuesVisibilityChange` to update from the parent.
   */
  valuesVisible?: boolean;
  /** Initial visibility when `valuesVisible` is not controlled (default: true). */
  defaultValuesVisible?: boolean;
  /** Fires when the user toggles visibility (after the new value applies). */
  onValuesVisibilityChange?: (visible: boolean) => void;
  onEyePress?: () => void;
  returnsLabel?: string;
  returnsValue?: string;
  timeRanges?: readonly string[];
  /** Selected chip index (controlled). Omit to manage internally. */
  activeRangeIndex?: number;
  /** When uncontrolled, initial chip index */
  defaultActiveRangeIndex?: number;
  onRangeChange?: (index: number) => void;
  /**
   * When set (one snapshot per **`timeRanges`** index, in order), the selected chip drives **`returnsLabel`** / **`returnsValue`**, **`svgPath`**, **`chartPositive`**, and **`chartIndicatorY`**.
   * Omit to use the flat **`returns*`** / **`svgPath`** / **`chart*`** props for every chip (parent can still react via **`onRangeChange`** + controlled props).
   */
  rangeByPeriod?: readonly PortfolioWidgetRangeSnapshot[];
  svgPath?: string;
  chartPositive?: boolean;
  chartIndicatorY?: number;
  chartAriaLabel?: string;
  investedLabel?: string;
  investedAmount?: string;
  overallReturnsLabel?: string;
  overallReturnsValue?: string;
  showBuyingPower?: boolean;
  buyingPowerLabel?: string;
  buyingPowerAmount?: string;
  addFundsLabel?: string;
  onAddFundsPress?: () => void;
  /**
   * When **`true`** (default) and **`allocationRows`** is non-empty, renders **AllocationBreakdownWidget** below invested/returns.
   * Set **`false`** to hide the block without clearing row data (e.g. feature flag, loading).
   * @default true
   */
  showAllocation?: boolean;
  /** Row data for the allocation card; also pass **`showAllocation={false}`** to hide while keeping props. */
  allocationRows?: AllocationBreakdownRow[];
  allocationTitle?: string;
  /** Passed to **AllocationBreakdownWidget** — default **`figma-asset`**: **1661:7516** (composite frame) when **4** `allocationRows`, else **1649:7514** (slice widths from legend %). **`proportional-css`** = non-file approximation. */
  allocationBarVisual?: 'figma-asset' | 'proportional-css';
  allocationBarAssetSrc?: string;
  className?: string;
}

/**
 * Portfolio summary block: total value, period returns, **GraphWidget**, time-range **Chip** row (below chart),
 * invested / overall returns, optional buying-power card (Stock Home).
 * With **`rangeByPeriod`**, the selected chip updates returns copy + chart; **`onRangeChange`** still fires.
 */
export const PortfolioWidget = ({
  headerTitle = 'Total portfolio value',
  totalValue = '₹2,15,197',
  showEyeToggle = true,
  valuesVisible: controlledVisible,
  defaultValuesVisible = true,
  onValuesVisibilityChange,
  onEyePress,
  returnsLabel = '1D Returns:\u00a0',
  returnsValue = '+₹240.50 (2.40%)',
  timeRanges = PORTFOLIO_WIDGET_TIME_RANGES,
  activeRangeIndex: controlledRange,
  defaultActiveRangeIndex = 0,
  onRangeChange,
  rangeByPeriod,
  svgPath = PORTFOLIO_WIDGET_CHART_PATH_POSITIVE,
  chartPositive = true,
  chartIndicatorY = 32,
  chartAriaLabel = 'Portfolio value chart',
  investedLabel = 'Invested',
  investedAmount = '₹1,79,398',
  overallReturnsLabel = 'Overall Returns',
  overallReturnsValue = '+₹35,799 (28.28%)',
  showBuyingPower = true,
  buyingPowerLabel = 'Buying power',
  buyingPowerAmount = '₹15,450',
  addFundsLabel = 'Add Funds',
  onAddFundsPress,
  showAllocation = true,
  allocationRows,
  allocationTitle,
  allocationBarVisual = 'figma-asset',
  allocationBarAssetSrc,
  className,
}: PortfolioWidgetProps) => {
  const [internalRange, setInternalRange] = useState(defaultActiveRangeIndex);
  const activeRange = controlledRange ?? internalRange;

  const [internalVisible, setInternalVisible] = useState(defaultValuesVisible);
  const isVisibilityControlled = controlledVisible !== undefined;
  const valuesVisible = isVisibilityControlled ? controlledVisible : internalVisible;

  const eyeBtnRef = useRef<HTMLButtonElement>(null);

  const playEyeTapZoom = () => {
    if (
      typeof globalThis.matchMedia === 'function' &&
      globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const el = eyeBtnRef.current;
    if (!el) return;
    el.classList.remove('pw__eye-btn--zoom');
    void el.offsetWidth;
    el.classList.add('pw__eye-btn--zoom');
  };

  const onEyeBtnAnimationEnd = (e: AnimationEvent<HTMLButtonElement>) => {
    if (!e.animationName.includes('pw__eye-btn-zoom')) return;
    e.currentTarget.classList.remove('pw__eye-btn--zoom');
  };

  const setRange = (i: number) => {
    if (controlledRange === undefined) setInternalRange(i);
    onRangeChange?.(i);
  };

  const toggleValuesVisibility = () => {
    playEyeTapZoom();
    const next = !valuesVisible;
    if (!isVisibilityControlled) setInternalVisible(next);
    onValuesVisibilityChange?.(next);
    onEyePress?.();
  };

  const mask = showEyeToggle ? !valuesVisible : false;
  const show = (text: string) => (mask ? maskPortfolioDigits(text) : text);

  const snap = snapshotForRangeIndex(rangeByPeriod, activeRange);
  const effectiveReturnsLabel = snap?.returnsLabel ?? returnsLabel;
  const effectiveReturnsValue = snap?.returnsValue ?? returnsValue;
  const effectiveSvgPath = snap?.svgPath ?? svgPath;
  const effectiveChartPositive = snap?.chartPositive ?? chartPositive;
  const effectiveIndicatorY = snap?.chartIndicatorY ?? chartIndicatorY;
  const effectiveAreaFillPath =
    snap?.areaFillPath ??
    (!rangeByPeriod?.length
      ? effectiveChartPositive
        ? PORTFOLIO_WIDGET_CHART_AREA_PATH_POSITIVE
        : PORTFOLIO_WIDGET_CHART_AREA_PATH_NEGATIVE
      : undefined);
  const rangeChipLabel = timeRanges[activeRange] ?? String(activeRange);
  const effectiveChartAria = rangeByPeriod?.length
    ? `${chartAriaLabel}, ${rangeChipLabel}`
    : chartAriaLabel;

  const rootCls = ['pw', className].filter(Boolean).join(' ');

  return (
    <div className={rootCls}>
      <div className="pw__header">
        <div className="pw__title">{headerTitle}</div>
      </div>
      <div className="pw__value-row">
        <span className="pw__amount">{show(totalValue)}</span>
        {showEyeToggle && (
          <button
            ref={eyeBtnRef}
            type="button"
            className="pw__eye-btn"
            aria-label={valuesVisible ? 'Hide amounts' : 'Show amounts'}
            onClick={toggleValuesVisibility}
            onAnimationEnd={onEyeBtnAnimationEnd}
          >
            <Icon name={valuesVisible ? 'eye_outline' : 'eye_slash_outline'} size={20} />
          </button>
        )}
      </div>
      <div className="pw__returns">
        <span className="pw__returns-label">{effectiveReturnsLabel}</span>
        <span
          className={[
            'pw__returns-value',
            !effectiveChartPositive && 'pw__returns-value--negative',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {show(effectiveReturnsValue)}
        </span>
      </div>

      <div className="pw__chart">
        <GraphWidget
          chartKey={String(activeRange)}
          svgPath={effectiveSvgPath}
          areaFillPath={effectiveAreaFillPath}
          isPositive={effectiveChartPositive}
          indicatorY={effectiveIndicatorY}
          aria-label={effectiveChartAria}
        />
      </div>

      <div className="pw__chips">
        {timeRanges.map((r, i) => (
          <Chip
            key={r}
            label={r}
            size="extra-small"
            type={activeRange === i ? 'selected' : 'default'}
            onPress={() => setRange(i)}
          />
        ))}
      </div>

      <div className="pw__values">
        <div className="pw__values-row">
          <span className="pw__values-label">{investedLabel}</span>
          <span className="pw__values-amount">{show(investedAmount)}</span>
        </div>
        <div className="pw__values-row">
          <span className="pw__values-label">{overallReturnsLabel}</span>
          <span className="pw__values-positive">{show(overallReturnsValue)}</span>
        </div>
      </div>

      {showAllocation && allocationRows && allocationRows.length > 0 ? (
        <div className="pw__allocation">
          <AllocationBreakdownWidget
            title={allocationTitle ?? 'Allocations'}
            rows={allocationRows.map((r) => ({
              ...r,
              valueLabel: show(r.valueLabel),
              changeLabel: r.changeLabel ? show(r.changeLabel) : undefined,
            }))}
            showRowTrend
            allocationBarVisual={allocationBarVisual}
            allocationBarAssetSrc={allocationBarAssetSrc}
          />
        </div>
      ) : null}

      {showBuyingPower && (
        <div className="pw__buying">
          <div className="pw__buying-inner">
            <div>
              <div className="pw__buying-label">{buyingPowerLabel}</div>
              <div className="pw__buying-amount">{show(buyingPowerAmount)}</div>
            </div>
            <button type="button" className="pw__buying-action" onClick={onAddFundsPress}>
              {addFundsLabel} <Icon name="caret_small_right_main" size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
