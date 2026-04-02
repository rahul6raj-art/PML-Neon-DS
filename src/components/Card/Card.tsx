import type { ReactNode } from 'react';
import './Card.css';

export interface CardProps {
  /** Show border stroke */
  stroke?: boolean;
  /** Card content */
  children?: ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS class */
  className?: string;
}

export const Card = ({
  stroke = false,
  children,
  onClick,
  className,
}: CardProps) => {
  const cls = [
    'card',
    stroke && 'card--stroke',
    onClick && 'card--clickable',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cls}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};
