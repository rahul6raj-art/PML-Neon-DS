import {
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import './OtpTextField.css';

export type OtpLength = 4 | 6;
export type OtpHelperType = 'none' | 'warning' | 'error';

export interface OtpTextFieldProps {
  /** Number of OTP digits */
  length?: OtpLength;
  /** Show "One Time Password (OTP)" title above cells */
  otpFieldTitle?: boolean;
  /** Title text override */
  titleText?: string;
  /** Controlled value (digits only) */
  value?: string;
  /** Uncontrolled default */
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;

  /** Validation helper style */
  helper?: OtpHelperType;
  /** Error message text */
  errorText?: string;
  /** Warning message text */
  warningText?: string;

  /** Show active "Resend OTP" link (Yes) or countdown timer (No) */
  resend?: boolean;
  /** Active resend link label */
  resendAction?: string;
  onResend?: () => void;
  /** Timer text when resend is disabled */
  resendTime?: string;

  /** Show "Try another verification method" link */
  altMethod?: boolean;
  /** Alternate method link label */
  alternateAction?: string;
  onAlternateMethod?: () => void;

  className?: string;
  id?: string;
}

const DIGIT_RE = /^\d$/;

function padDigits(s: string, len: number): string[] {
  const chars = s.replace(/\D/g, '').slice(0, len).split('');
  while (chars.length < len) chars.push('');
  return chars;
}

export const OtpTextField = ({
  length = 6,
  otpFieldTitle = true,
  titleText = 'One Time Password (OTP)',
  value: controlledValue,
  defaultValue = '',
  onChange,
  onComplete,
  disabled = false,

  helper = 'none',
  errorText = 'Error Text',
  warningText = 'Warning Text',

  resend = true,
  resendAction = 'Resend OTP',
  onResend,
  resendTime = 'Resend OTP in 00:24',

  altMethod = false,
  alternateAction = 'Try another verification method',
  onAlternateMethod,

  className,
  id: externalId,
}: OtpTextFieldProps) => {
  const generatedId = useId();
  const rootId = externalId ?? generatedId;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isControlled = controlledValue !== undefined;
  const [internal, setInternal] = useState(() =>
    padDigits(defaultValue, length).join(''),
  );

  const raw = isControlled ? controlledValue : internal;
  const digits = padDigits(raw ?? '', length);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const setValue = useCallback(
    (next: string) => {
      const cleaned = next.replace(/\D/g, '').slice(0, length);
      if (!isControlled) setInternal(cleaned);
      onChange?.(cleaned);
      if (cleaned.length === length) onComplete?.(cleaned);
    },
    [isControlled, length, onChange, onComplete],
  );

  const updateDigitAt = (index: number, char: string) => {
    const arr = [...digits];
    arr[index] = char;
    setValue(arr.join(''));
  };

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (v === '') {
      updateDigitAt(index, '');
      return;
    }
    const last = v.slice(-1);
    if (!DIGIT_RE.test(last)) return;
    updateDigitAt(index, last);
    if (index < length - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        updateDigitAt(index, '');
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        updateDigitAt(index - 1, '');
      }
      e.preventDefault();
      return;
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
      e.preventDefault();
    }
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      e.preventDefault();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!pasted) return;
    setValue(pasted);
    const nextFocus = Math.min(pasted.length, length - 1);
    requestAnimationFrame(() => inputRefs.current[nextFocus]?.focus());
  };

  const hasHelperMsg = helper !== 'none';
  const helperMsg = helper === 'error' ? errorText : helper === 'warning' ? warningText : '';
  const is4 = length === 4;

  const wrapperClass = [
    'otp',
    is4 ? 'otp--len-4' : 'otp--len-6',
    helper === 'error' && 'otp--error',
    helper === 'warning' && 'otp--warning',
    disabled && 'otp--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const groupLabelId = `${rootId}-label`;
  const helperId = `${rootId}-helper`;

  const resendEl = resend ? (
    <button
      type="button"
      className="otp__link"
      disabled={disabled}
      onClick={onResend}
    >
      {resendAction}
    </button>
  ) : (
    <span className="otp__timer">{resendTime}</span>
  );

  const altEl = altMethod ? (
    <button
      type="button"
      className="otp__link"
      disabled={disabled}
      onClick={onAlternateMethod}
    >
      {alternateAction}
    </button>
  ) : null;

  return (
    <div className={wrapperClass} id={rootId}>
      {otpFieldTitle && (
        <p className="otp__title" id={groupLabelId}>
          {titleText}
        </p>
      )}

      <div
        className="otp__cells"
        role="group"
        aria-labelledby={otpFieldTitle ? groupLabelId : undefined}
        aria-describedby={hasHelperMsg ? helperId : undefined}
        aria-invalid={helper === 'error' ? true : undefined}
      >
        {Array.from({ length }, (_, i) => {
          const filled = !!digits[i];
          const cellClass = [
            'otp__cell',
            filled && 'otp__cell--filled',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <div key={i} className={cellClass}>
              <input
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                disabled={disabled}
                className="otp__input"
                value={digits[i] ?? ''}
                aria-label={`Digit ${i + 1} of ${length}`}
                onChange={(e) => handleChange(i, e)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
              />
            </div>
          );
        })}
      </div>

      {/* ── Footer meta section ── */}
      <div className={`otp__meta ${altMethod ? 'otp__meta--with-alt' : ''}`}>
        {/* 6-digit: always horizontal row */}
        {!is4 && (
          <div className="otp__footer-row">
            {hasHelperMsg && (
              <p
                id={helperId}
                className={`otp__helper otp__helper--${helper}`}
              >
                {helperMsg}
              </p>
            )}
            <div className="otp__footer-actions">{resendEl}</div>
          </div>
        )}

        {/* 4-digit without helper: left-aligned row */}
        {is4 && !hasHelperMsg && (
          <div className="otp__footer-row otp__footer-row--left">
            <div className="otp__footer-actions otp__footer-actions--left">
              {resendEl}
            </div>
          </div>
        )}

        {/* 4-digit WITH helper: vertical stack */}
        {is4 && hasHelperMsg && (
          <div className={`otp__footer-stack ${altMethod ? 'otp__footer-stack--tight' : ''}`}>
            <p
              id={helperId}
              className={`otp__helper otp__helper--${helper}`}
            >
              {helperMsg}
            </p>
            <div className="otp__footer-actions otp__footer-actions--left">
              {resendEl}
            </div>
          </div>
        )}

        {/* Alt method row */}
        {altMethod && (
          <div className={`otp__alt-row ${is4 ? 'otp__alt-row--left' : ''}`}>
            {altEl}
          </div>
        )}
      </div>
    </div>
  );
};
