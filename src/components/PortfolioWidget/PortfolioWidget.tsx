import { useState } from 'react';
import { Chip } from '../Chip';
import { Icon } from '../Icon';
import { GraphWidget } from '../GraphWidget';
import './PortfolioWidget.css';

/** Default chart path — viewBox 0 0 346 116, ends at ripple (positive). */
export const PORTFOLIO_WIDGET_CHART_PATH_POSITIVE =
  'M 0 92 L 48 86 L 96 78 L 144 62 L 192 48 L 240 38 L 288 34 L 308 32';

/** Negative / loss curve — ends at (308, 94). */
export const PORTFOLIO_WIDGET_CHART_PATH_NEGATIVE =
  'M 0 28 L 48 34 L 96 44 L 144 58 L 192 72 L 240 82 L 288 90 L 308 94';

export const PORTFOLIO_WIDGET_TIME_RANGES = ['1D', '1W', '1M', '6M', '1Y', 'All'] as const;

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
  className?: string;
}

/**
 * Portfolio summary block: total value, 1D returns, **GraphWidget**, time-range chips,
 * invested / overall returns, optional buying-power card (Stock Home).
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
  className,
}: PortfolioWidgetProps) => {
  const [internalRange, setInternalRange] = useState(defaultActiveRangeIndex);
  const activeRange = controlledRange ?? internalRange;

  const [internalVisible, setInternalVisible] = useState(defaultValuesVisible);
  const isVisibilityControlled = controlledVisible !== undefined;
  const valuesVisible = isVisibilityControlled ? controlledVisible : internalVisible;

  const setRange = (i: number) => {
    if (controlledRange === undefined) setInternalRange(i);
    onRangeChange?.(i);
  };

  const toggleValuesVisibility = () => {
    const next = !valuesVisible;
    if (!isVisibilityControlled) setInternalVisible(next);
    onValuesVisibilityChange?.(next);
    onEyePress?.();
  };

  const mask = showEyeToggle ? !valuesVisible : false;
  const show = (text: string) => (mask ? maskPortfolioDigits(text) : text);

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
            type="button"
            className="pw__eye-btn"
            aria-label={valuesVisible ? 'Hide amounts' : 'Show amounts'}
            onClick={toggleValuesVisibility}
          >
            <Icon name={valuesVisible ? 'eye_outline' : 'eye_slash_outline'} size={20} />
          </button>
        )}
      </div>
      <div className="pw__returns">
        <span className="pw__returns-label">{returnsLabel}</span>
        <span className="pw__returns-value">{show(returnsValue)}</span>
      </div>

      <div className="pw__chart">
        <GraphWidget
          chartKey={String(activeRange)}
          svgPath={svgPath}
          isPositive={chartPositive}
          indicatorY={chartIndicatorY}
          aria-label={chartAriaLabel}
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
