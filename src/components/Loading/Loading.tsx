import './Loading.css';

export type LoadingType = 'theme' | 'monotone';

export interface LoadingProps {
  /** Visual style — Theme (navy-to-cyan) or Monotone (grayscale) */
  type?: LoadingType;
  /** Size of each dot in pixels */
  dotSize?: number;
  /** Accessible label */
  label?: string;
  className?: string;
}

const THEME_COLORS = [
  'var(--primitive-brand-dark-blue)',
  'var(--primitive-actions-primary-alt-dark)',
  'var(--primitive-actions-primary)',
  'var(--primitive-brand-blue)',
  'var(--primitive-colour-cyan)',
];
const MONO_COLORS = [
  'var(--primitive-mono-400)',
  'var(--primitive-mono-200)',
  'var(--primitive-mono-200)',
  'var(--primitive-mono-175)',
  'var(--primitive-mono-100)',
];

export const Loading = ({
  type = 'theme',
  dotSize = 20,
  label = 'Loading',
  className,
}: LoadingProps) => {
  const colors = type === 'theme' ? THEME_COLORS : MONO_COLORS;
  const gap = Math.round(dotSize * 0.3);

  const wrapperClass = ['loading', className].filter(Boolean).join(' ');

  return (
    <div
      className={wrapperClass}
      style={{ gap }}
      role="status"
      aria-label={label}
    >
      {colors.map((color, i) => (
        <span
          key={i}
          className="loading__dot"
          style={{
            width: dotSize,
            height: dotSize,
            backgroundColor: color,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
      <span className="loading__sr-only">{label}</span>
    </div>
  );
};
