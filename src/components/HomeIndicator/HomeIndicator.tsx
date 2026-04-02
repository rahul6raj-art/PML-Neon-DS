import './HomeIndicator.css';

export interface HomeIndicatorProps {
  /** True = dark bar (for light backgrounds), False = light bar (for dark backgrounds) */
  inverse?: boolean;
  className?: string;
}

export const HomeIndicator = ({
  inverse = true,
  className,
}: HomeIndicatorProps) => {
  const wrapperClass = [
    'home-indicator',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClass} aria-hidden="true">
      <div
        className={`home-indicator__bar ${inverse ? 'home-indicator__bar--dark' : 'home-indicator__bar--light'}`}
      />
    </div>
  );
};
