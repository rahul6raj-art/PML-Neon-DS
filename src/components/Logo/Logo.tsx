import { useEffect, useState } from 'react';
import { getBrandColors, getLogoSrc } from './logoDomains';
import './Logo.css';

export type LogoCategory =
  | 'mutualFunds'
  | 'payments'
  | 'banks'
  | 'stocks'
  | 'indices';

export interface LogoProps {
  /** Logo category */
  category?: LogoCategory;
  /** Brand / company name */
  name?: string;
  /** Logo image source URL (overrides auto-resolved local image) */
  src?: string;
  /** Alt text */
  alt?: string;
  /** Size in pixels (default 32) */
  size?: number;
  /** Border radius style */
  shape?: 'square' | 'rounded' | 'circle';
  className?: string;
}

export const Logo = ({
  category = 'mutualFunds',
  name = '',
  src,
  alt,
  size = 32,
  shape = 'square',
  className,
}: LogoProps) => {
  const [imgError, setImgError] = useState(false);
  const altText = alt ?? name ?? `${category} logo`;

  const resolvedSrc = src ?? getLogoSrc(name, category);
  const showImage = !!resolvedSrc && !imgError;

  useEffect(() => {
    setImgError(false);
  }, [src, name, category]);

  const wrapperClass = [
    'logo',
    `logo--${shape}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const initials = name
    ? name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : category.slice(0, 2).toUpperCase();

  const { bg, fg } = getBrandColors(name);
  const fontSize = size <= 24 ? 9 : size <= 32 ? 11 : size <= 48 ? 14 : 18;

  return (
    <div
      className={wrapperClass}
      style={{ width: size, height: size }}
      title={name}
    >
      {showImage ? (
        <img
          className="logo__image"
          src={resolvedSrc}
          alt={altText}
          draggable={false}
          onError={() => setImgError(true)}
        />
      ) : (
        <span
          className="logo__brand"
          style={{ background: bg, color: fg, fontSize }}
          aria-label={altText}
        >
          {initials}
        </span>
      )}
    </div>
  );
};
