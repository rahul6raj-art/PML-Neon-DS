import { type InputHTMLAttributes } from 'react';
import { Icon } from '../Icon';
import './Checkbox.css';

export type CheckboxState = 'checked' | 'unchecked' | 'indeterminate';
export type CheckboxLayout = 'inline' | 'block';
export type CheckboxLabelEmphasis = 'high' | 'low';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'checked'> {
  /** Check state — checked, unchecked, or indeterminate */
  state?: CheckboxState;
  /** Layout mode — inline (shrink-to-fit) or block (fill width) */
  layout?: CheckboxLayout;
  /** Label text */
  label?: string;
  /** Show or hide the label */
  showLabel?: boolean;
  /** Label font weight emphasis */
  labelEmphasis?: CheckboxLabelEmphasis;
  /** Disabled state */
  disabled?: boolean;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ICON_MAP: Record<CheckboxState, string> = {
  checked: 'checkbox_on_filled',
  unchecked: 'checkbox_unchecked_outline',
  indeterminate: 'checkbox_indeterminate_filled',
};

export const Checkbox = ({
  state = 'unchecked',
  layout = 'inline',
  label = 'Label',
  showLabel = true,
  labelEmphasis = 'high',
  disabled = false,
  onChange,
  name,
  value,
  className,
  ...rest
}: CheckboxProps) => {
  const classes = [
    'checkbox',
    `checkbox--${layout}`,
    `checkbox--emphasis-${labelEmphasis}`,
    disabled && 'checkbox--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconName = ICON_MAP[state];

  const getIconColor = () => {
    if (state === 'unchecked') {
      return disabled ? 'var(--border-neutral-medium)' : 'var(--icon-neutral-medium)';
    }
    return disabled ? 'var(--icon-neutral-weak)' : 'var(--icon-positive-strong)';
  };

  return (
    <label className={classes}>
      <input
        className="checkbox__input"
        type="checkbox"
        checked={state === 'checked'}
        disabled={disabled}
        onChange={onChange}
        name={name}
        value={value}
        ref={(el) => {
          if (el) el.indeterminate = state === 'indeterminate';
        }}
        {...rest}
      />
      <span className="checkbox__indicator">
        <Icon name={iconName} size={24} style={{ color: getIconColor() }} />
      </span>
      {showLabel && (
        <span className="checkbox__label">{label}</span>
      )}
    </label>
  );
};
