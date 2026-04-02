import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../Icon';
import { Loading } from '../Loading';
import './Button.css';

export type ButtonType = 'filled' | 'stroke' | 'tonal' | 'link';
export type ButtonSize = 'large' | 'medium' | 'small' | 'extra-small';
export type ButtonIconPosition = 'none' | 'leading' | 'trailing' | 'only';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Visual type */
  variant?: ButtonType;
  /** Button size */
  size?: ButtonSize;
  /** Icon placement */
  icon?: ButtonIconPosition;
  /** Icon name from icons folder, or a ReactNode */
  iconContent?: string | ReactNode;
  /** Button label */
  label?: string;
  /** Loading state — shows animated dot loader */
  loading?: boolean;
  /** HTML button type */
  htmlType?: 'button' | 'submit' | 'reset';
}

const ICON_SIZES: Record<ButtonSize, number> = {
  large: 24,
  medium: 20,
  small: 16,
  'extra-small': 16,
};

const LOADER_DOT_SIZES: Record<ButtonSize, number> = {
  large: 10,
  medium: 8,
  small: 6,
  'extra-small': 6,
};

function renderBtnIcon(
  iconContent: string | ReactNode | undefined,
  size: number,
) {
  if (!iconContent)
    return <Icon name="arrow_right_outline" size={size} />;
  if (typeof iconContent === 'string')
    return <Icon name={iconContent} size={size} />;
  return iconContent;
}

export const Button = ({
  variant = 'filled',
  size = 'large',
  icon = 'none',
  iconContent,
  label = 'Label',
  loading = false,
  disabled = false,
  htmlType = 'button',
  className,
  children,
  ...rest
}: ButtonProps) => {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    icon === 'only' && 'btn--icon-only',
    loading && 'btn--loading',
    disabled && 'btn--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconSize = ICON_SIZES[size];
  const loaderDotSize = LOADER_DOT_SIZES[size];
  const loaderType = variant === 'filled' ? 'monotone' : 'theme';
  const showIcon = icon !== 'none' && !loading;
  const text = children ?? label;

  return (
    <button
      className={classes}
      type={htmlType}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <Loading type={loaderType} dotSize={loaderDotSize} label="Loading" />
      ) : (
        <>
          {showIcon && (icon === 'leading' || icon === 'only') && (
            <span className="btn__icon">
              {renderBtnIcon(iconContent, iconSize)}
            </span>
          )}
          {icon !== 'only' && <span className="btn__label">{text}</span>}
          {showIcon && icon === 'trailing' && (
            <span className="btn__icon">
              {renderBtnIcon(iconContent, iconSize)}
            </span>
          )}
        </>
      )}
    </button>
  );
};
