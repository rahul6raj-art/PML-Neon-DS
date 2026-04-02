import {
  type ReactNode,
  useState,
  useRef,
  useEffect,
  useId,
  useCallback,
} from 'react';
import { Icon } from '../Icon';
import './Dropdown.css';

export type DropdownEmphasis = 'high' | 'low';

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps {
  /** Emphasis level — high (18px) or low (14px) */
  emphasis?: DropdownEmphasis;
  /** Floating label text */
  label?: string;
  /** Currently selected value */
  value?: string;
  /** Dropdown options */
  options?: DropdownOption[];
  /** Placeholder when no value selected */
  placeholder?: string;
  /** Show helper text below the field */
  showHelperText?: boolean;
  /** Assistive helper text content */
  helperText?: string;
  /** Show error text below the field */
  showErrorText?: boolean;
  /** Error message content — shown in red */
  errorText?: string;
  /** Show a leading icon */
  showLeadingIcon?: boolean;
  /** Leading icon name or ReactNode */
  leadingIcon?: string | ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Additional CSS class on the wrapper */
  className?: string;
}

function renderIcon(icon: string | ReactNode | undefined, fallback: string) {
  if (!icon) return <Icon name={fallback} size={24} />;
  if (typeof icon === 'string') return <Icon name={icon} size={24} />;
  return icon;
}

export const Dropdown = ({
  emphasis = 'high',
  label = 'Label',
  value: controlledValue,
  options = [],
  placeholder,
  showHelperText = false,
  helperText = 'Helper Text',
  showErrorText = false,
  errorText = 'Error Text',
  showLeadingIcon = false,
  leadingIcon,
  disabled = false,
  onChange,
  className,
}: DropdownProps) => {
  const generatedId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const [internalValue, setInternalValue] = useState('');
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const [isOpen, setIsOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);

  const selectedOption = options.find((o) => o.value === currentValue);
  const hasValue = !!currentValue;
  const isFloating = isOpen || hasValue;
  const hasError = showErrorText && !!errorText;
  const visibleHelper = hasError ? errorText : showHelperText ? helperText : undefined;
  const hasHelper = !!visibleHelper;
  const hasLeading = showLeadingIcon || !!leadingIcon;

  const wrapperCls = [
    'dropdown',
    `dropdown--${emphasis}`,
    isOpen && 'dropdown--open',
    hasValue && 'dropdown--filled',
    hasError && 'dropdown--error',
    disabled && 'dropdown--disabled',
    hasHelper && 'dropdown--has-helper',
    hasLeading && 'dropdown--has-leading',
    className,
  ].filter(Boolean).join(' ');

  const displayText = selectedOption?.label || currentValue || placeholder || '';
  const bottomCls = hasError ? 'dropdown__helper--error' : '';

  const selectOption = useCallback(
    (val: string) => {
      if (!isControlled) setInternalValue(val);
      onChange?.(val);
      setIsOpen(false);
    },
    [isControlled, onChange],
  );

  useEffect(() => {
    if (!isOpen) return;
    function handleOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && focusIndex >= 0 && menuRef.current) {
      const items = menuRef.current.querySelectorAll('[role="option"]');
      (items[focusIndex] as HTMLElement)?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusIndex, isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen && focusIndex >= 0) {
          selectOption(options[focusIndex].value);
        } else {
          setIsOpen(true);
          setFocusIndex(options.findIndex((o) => o.value === currentValue));
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusIndex(0);
        } else {
          setFocusIndex((prev) => Math.min(prev + 1, options.length - 1));
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setFocusIndex((prev) => Math.max(prev - 1, 0));
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className={wrapperCls} ref={wrapperRef}>
      {/* Trigger box */}
      <div
        className="dropdown__box"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={`${generatedId}-label`}
        aria-describedby={visibleHelper ? `${generatedId}-helper` : undefined}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setIsOpen((p) => !p)}
        onKeyDown={handleKeyDown}
      >
        {/* Floating label */}
        <label
          id={`${generatedId}-label`}
          className={`dropdown__label ${isFloating ? 'dropdown__label--float' : ''}`}
        >
          {label}
        </label>

        {/* Leading icon */}
        {hasLeading && (
          <span className="dropdown__icon dropdown__icon--leading">
            {renderIcon(leadingIcon, 'search_outline')}
          </span>
        )}

        {/* Value display */}
        <div className="dropdown__value-area">
          {hasValue && (
            <span className="dropdown__value">{displayText}</span>
          )}
        </div>

        {/* Caret icon — always visible */}
        <span className={`dropdown__caret ${isOpen ? 'dropdown__caret--open' : ''}`}>
          <Icon name="caret_small_down_main" size={24} />
        </span>
      </div>

      {/* Helper / error text */}
      {visibleHelper && (
        <p id={`${generatedId}-helper`} className={`dropdown__helper ${bottomCls}`}>
          {visibleHelper}
        </p>
      )}

      {/* Options menu */}
      {isOpen && options.length > 0 && (
        <ul
          ref={menuRef}
          className="dropdown__menu"
          role="listbox"
          aria-labelledby={`${generatedId}-label`}
        >
          {options.map((opt, i) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === currentValue}
              className={[
                'dropdown__option',
                opt.value === currentValue && 'dropdown__option--selected',
                i === focusIndex && 'dropdown__option--focused',
              ].filter(Boolean).join(' ')}
              onClick={() => selectOption(opt.value)}
              onMouseEnter={() => setFocusIndex(i)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
