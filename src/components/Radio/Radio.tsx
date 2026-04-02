import { type InputHTMLAttributes } from 'react';
import { Icon } from '../Icon';
import './Radio.css';

export type RadioType = 'radio' | 'tick';
export type RadioSize = 'large' | 'medium';
export type RadioLabelEmphasis = 'high' | 'low';

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Indicator style — classic radio dot or checkmark tick */
  type?: RadioType;
  /** Whether the radio is selected */
  checked?: boolean;
  /** Label text */
  label?: string;
  /** Show or hide the label */
  showLabel?: boolean;
  /** Label font weight emphasis */
  labelEmphasis?: RadioLabelEmphasis;
  /** Component size */
  size?: RadioSize;
  /** Disabled state */
  disabled?: boolean;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ICON_MAP = {
  radioChecked: 'radio_on',
  radioUnchecked: 'radio_off_outline',
  tickChecked: 'checkmark_circle_filled',
  tickUnchecked: 'radio_off_outline',
} as const;

export const Radio = ({
  type = 'radio',
  checked = false,
  label = 'Label',
  showLabel = true,
  labelEmphasis = 'high',
  size = 'large',
  disabled = false,
  onChange,
  name,
  value,
  ...rest
}: RadioProps) => {
  const classes = [
    'radio',
    `radio--${size}`,
    `radio--emphasis-${labelEmphasis}`,
    disabled && 'radio--disabled',
  ]
    .filter(Boolean)
    .join(' ');

  const iconColor = disabled ? 'var(--icon-neutral-weak)' : 'var(--icon-positive-strong)';
  const uncheckedColor = disabled ? 'var(--border-neutral-medium)' : 'var(--icon-neutral-medium)';

  const getIconName = () => {
    if (type === 'tick') {
      return checked ? ICON_MAP.tickChecked : ICON_MAP.tickUnchecked;
    }
    return checked ? ICON_MAP.radioChecked : ICON_MAP.radioUnchecked;
  };

  const color = checked ? iconColor : uncheckedColor;

  return (
    <label className={classes}>
      <input
        className="radio__input"
        type="radio"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        name={name}
        value={value}
        {...rest}
      />
      <span className="radio__indicator">
        <Icon name={getIconName()} size={24} style={{ color }} />
      </span>
      {showLabel && (
        <span className="radio__label">{label}</span>
      )}
    </label>
  );
};
