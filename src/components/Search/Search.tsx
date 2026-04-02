import {
  type ChangeEvent,
  type KeyboardEvent,
  useCallback,
  useId,
  useRef,
  useState,
} from 'react';
import { Icon } from '../Icon/Icon';
import './Search.css';

export type SearchSize = 'large' | 'medium';

export interface SearchProps {
  /** Size variant */
  size?: SearchSize;
  /** Show outlined border style instead of flat */
  stroke?: boolean;
  /** Show leading search icon */
  leadingIcon?: boolean;
  /** Show trailing mic icon */
  trailingIcon?: boolean;
  /** Placeholder text */
  label?: string;
  /** Controlled value */
  value?: string;
  /** Uncontrolled default */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Called when close/clear button is clicked */
  onClear?: () => void;
  /** Called when mic icon is clicked */
  onMicClick?: () => void;
  /** Called on Enter key */
  onSubmit?: (value: string) => void;
  /** Disabled state */
  disabled?: boolean;
  className?: string;
  id?: string;
}

export const Search = ({
  size = 'large',
  stroke = false,
  leadingIcon = true,
  trailingIcon = true,
  label = 'Label',
  value: controlledValue,
  defaultValue = '',
  onChange,
  onClear,
  onMicClick,
  onSubmit,
  disabled = false,
  className,
  id: externalId,
}: SearchProps) => {
  const generatedId = useId();
  const rootId = externalId ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = controlledValue !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const [focused, setFocused] = useState(false);

  const currentValue = isControlled ? controlledValue : internal;
  const hasValue = currentValue.length > 0;

  const isLarge = size === 'large';
  const iconSize = isLarge ? 24 : 20;
  const trailingIconSize = isLarge ? 22 : 20;
  const closeIconSize = isLarge ? 24 : 20;

  const showClose =
    (size === 'medium') || focused || hasValue;

  const wrapperClass = [
    'search',
    `search--${size}`,
    stroke && 'search--stroke',
    focused && 'search--focus',
    hasValue && 'search--filled',
    disabled && 'search--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const setValue = useCallback(
    (next: string) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue('');
    onClear?.();
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit(currentValue);
    }
  };

  return (
    <div className={wrapperClass} id={rootId}>
      <div className="search__field">
        <div className="search__input-area">
          {leadingIcon && (
            <span className="search__leading-icon">
              <Icon name="search_outline" size={iconSize} />
            </span>
          )}

          <input
            ref={inputRef}
            type="text"
            className="search__input"
            placeholder={label}
            value={currentValue}
            disabled={disabled}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            aria-label={label}
          />

          {trailingIcon && (
            <button
              type="button"
              className="search__trailing-icon"
              disabled={disabled}
              onClick={onMicClick}
              aria-label="Voice search"
              tabIndex={-1}
            >
              <Icon name="mic_outline" size={trailingIconSize} />
            </button>
          )}
        </div>
      </div>

      {showClose && (
        <button
          type="button"
          className="search__close"
          disabled={disabled}
          onClick={handleClear}
          aria-label="Clear search"
          tabIndex={-1}
        >
          <span className="search__close-icon">
            <Icon name="cross" size={closeIconSize} />
          </span>
        </button>
      )}
    </div>
  );
};
