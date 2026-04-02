import {
  type InputHTMLAttributes,
  type ReactNode,
  useState,
  useRef,
  useId,
} from 'react';
import { Icon } from '../Icon';
import './TextField.css';

export type TextFieldEmphasis = 'high' | 'low';

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Emphasis level — high (16px) or low (14px) */
  emphasis?: TextFieldEmphasis;
  /** Floating label text */
  label?: string;
  /** Controlled input value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Assistive helper text below the field */
  assistiveText?: string;
  /** Error message — shown in red, replaces assistive text */
  errorText?: string;
  /** Show a leading icon */
  showLeadingIcon?: boolean;
  /** Leading icon name or ReactNode */
  leadingIcon?: string | ReactNode;
  /** Show a trailing icon */
  showTrailingIcon?: boolean;
  /** Trailing icon name or ReactNode */
  trailingIcon?: string | ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS class on the wrapper */
  className?: string;
}

function renderIcon(icon: string | ReactNode | undefined, fallback: string) {
  if (!icon) return <Icon name={fallback} size={24} />;
  if (typeof icon === 'string') return <Icon name={icon} size={24} />;
  return icon;
}

export const TextField = ({
  emphasis = 'high',
  label = 'Label',
  value: controlledValue,
  defaultValue = '',
  assistiveText,
  errorText,
  showLeadingIcon = false,
  leadingIcon,
  showTrailingIcon = false,
  trailingIcon,
  disabled = false,
  className,
  id: externalId,
  onFocus,
  onBlur,
  onChange,
  ...rest
}: TextFieldProps) => {
  const generatedId = useId();
  const inputId = externalId ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? controlledValue : internalValue;

  const [isFocused, setIsFocused] = useState(false);
  const hasValue = currentValue.length > 0;
  const isFloating = isFocused || hasValue;
  const hasError = !!errorText;
  const hasHelper = !!errorText || !!assistiveText;
  const hasLeading = showLeadingIcon || leadingIcon;
  const hasTrailing = showTrailingIcon || trailingIcon;

  const wrapperClasses = [
    'textfield',
    `textfield--${emphasis}`,
    isFocused && 'textfield--focus',
    hasValue && 'textfield--filled',
    hasError && 'textfield--error',
    disabled && 'textfield--disabled',
    hasHelper && 'textfield--has-helper',
    hasLeading && 'textfield--has-leading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const helperText = errorText || assistiveText;
  const helperClass = hasError ? 'textfield__helper--error' : '';

  return (
    <div className={wrapperClasses}>
      <div
        className="textfield__box"
        onClick={() => inputRef.current?.focus()}
      >
        <label
          className={`textfield__label ${isFloating ? 'textfield__label--float' : ''}`}
          htmlFor={inputId}
        >
          {label}
        </label>

        {hasLeading && (
          <span className="textfield__icon textfield__icon--leading">
            {renderIcon(leadingIcon, 'search_outline')}
          </span>
        )}

        <div className="textfield__input-area">
          <input
            ref={inputRef}
            id={inputId}
            className="textfield__input"
            value={currentValue}
            disabled={disabled}
            placeholder=" "
            aria-invalid={hasError || undefined}
            aria-describedby={helperText ? `${inputId}-helper` : undefined}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            onChange={(e) => {
              if (!isControlled) setInternalValue(e.target.value);
              onChange?.(e);
            }}
            {...rest}
          />
        </div>

        {hasTrailing && (
          <span className="textfield__icon textfield__icon--trailing">
            {renderIcon(trailingIcon, 'x_circle_filled')}
          </span>
        )}
      </div>

      {helperText && (
        <p
          id={`${inputId}-helper`}
          className={`textfield__helper ${helperClass}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};
