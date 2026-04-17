import {
  type ChangeEvent,
  type KeyboardEvent,
  useCallback,
  useMemo,
} from 'react';
import { Icon } from '../Icon';
import { usePlatformTheme } from '../../theme';
import './CompactQuantityStepperWidget.css';

function toNum(v: number | string): number {
  if (typeof v === 'number')
    return Number.isFinite(v) ? v : 0;
  const n = parseFloat(String(v).replace(/,/g, '').trim());
  return Number.isFinite(n) ? n : 0;
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export interface CompactQuantityStepperWidgetProps {
  /** Displayed quantity (controlled). */
  value: number | string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  /** Accessible name for the decrement control */
  decrementLabel?: string;
  /** Accessible name for the increment control */
  incrementLabel?: string;
  onDecrement?: () => void;
  onIncrement?: () => void;
  onChange?: (value: number | string) => void;
  className?: string;
  /**
   * On **web** only: caption prefix below the quantity; rendered as **`Prefix:display`**
   * where **`display`** matches the field (updates with **`value`**).
   * Omit for default **`Qty`** → **`Qty:1`**; pass **`''`** to hide the caption on web.
   */
  valueCaption?: string;
}

const MINUS_GLYPH = '\u2212';

export function CompactQuantityStepperWidget({
  value,
  min = 0,
  max = 999_999_999,
  step = 1,
  disabled = false,
  decrementLabel = 'Decrease quantity',
  incrementLabel = 'Increase quantity',
  onDecrement,
  onIncrement,
  onChange,
  className,
  valueCaption,
}: CompactQuantityStepperWidgetProps) {
  const platform = usePlatformTheme();
  const web = platform === 'web';

  const numeric = useMemo(() => toNum(value), [value]);
  const strValue = String(value);

  const captionBelow = useMemo(() => {
    if (!web) return null;
    if (valueCaption === '') return null;
    const prefix = (valueCaption ?? 'Qty').trim();
    if (!prefix) return null;
    return `${prefix}:${strValue}`;
  }, [web, valueCaption, strValue]);

  const minReached = numeric <= min;
  const maxReached = numeric >= max;

  const emitChange = useCallback(
    (next: number) => {
      const clamped = clamp(next, min, max);
      const rounded =
        step > 0 ? Math.round(clamped / step) * step : clamped;
      const finalVal = clamp(rounded, min, max);
      onChange?.(finalVal);
    },
    [min, max, step, onChange],
  );

  const handleDecrement = useCallback(() => {
    if (disabled || minReached) return;
    emitChange(numeric - step);
    onDecrement?.();
  }, [disabled, minReached, emitChange, numeric, step, onDecrement]);

  const handleIncrement = useCallback(() => {
    if (disabled || maxReached) return;
    emitChange(numeric + step);
    onIncrement?.();
  }, [disabled, maxReached, emitChange, numeric, step, onIncrement]);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      onChange?.(raw);
    },
    [onChange],
  );

  const handleInputKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleDecrement();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleIncrement();
      }
    },
    [disabled, handleDecrement, handleIncrement],
  );

  const rootClass = [
    'cqsw',
    web && 'cqsw--web',
    disabled && 'cqsw--disabled',
    !disabled && minReached && 'cqsw--min-reached',
    !disabled && maxReached && 'cqsw--max-reached',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const decDisabled = disabled || minReached;
  const incDisabled = disabled || maxReached;

  return (
    <div className={rootClass} role="group" aria-label="Quantity stepper">
      <div className="cqsw__box">
        <button
          type="button"
          className="cqsw__step cqsw__step--dec"
          aria-label={decrementLabel}
          disabled={decDisabled}
          onClick={handleDecrement}
        >
          <span className="cqsw__glyph" aria-hidden>
            {MINUS_GLYPH}
          </span>
        </button>
        <div className="cqsw__input-area">
          <div className={['cqsw__stack', web && 'cqsw__stack--web'].filter(Boolean).join(' ')}>
            <input
              className="cqsw__input"
              value={strValue}
              disabled={disabled}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              inputMode="decimal"
              autoComplete="off"
              aria-label="Quantity"
            />
            {captionBelow && (
              <span className="cqsw__caption" aria-hidden>
                {captionBelow}
              </span>
            )}
          </div>
        </div>
        <button
          type="button"
          className="cqsw__step cqsw__step--inc"
          aria-label={incrementLabel}
          disabled={incDisabled}
          onClick={handleIncrement}
        >
          <Icon name="plus_outline" size={20} aria-hidden />
        </button>
      </div>
    </div>
  );
}
