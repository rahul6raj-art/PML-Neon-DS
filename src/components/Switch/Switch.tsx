import { type InputHTMLAttributes } from 'react';
import './Switch.css';

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Whether the switch is toggled on */
  on?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Switch = ({
  on = false,
  disabled = false,
  onChange,
  name,
  value,
  className,
  ...rest
}: SwitchProps) => {
  const classes = [
    'switch',
    on && 'switch--on',
    disabled && 'switch--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={classes}>
      <input
        className="switch__input"
        type="checkbox"
        checked={on}
        disabled={disabled}
        onChange={onChange}
        name={name}
        value={value}
        role="switch"
        aria-checked={on}
        {...rest}
      />
      <span className="switch__track">
        <span className="switch__thumb" />
      </span>
    </label>
  );
};
