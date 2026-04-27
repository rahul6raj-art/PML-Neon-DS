import { useId } from 'react';

/**
 * Four-part allocation bar — single **`exportAsync`** from [Figma **`1661:7516`**](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1661-7516&t=A2RU4TiZE7uPzzJc-4): same paths, gradients, overlap, and ellipse as the frame (331×40). Legend **`%`** is still driven by data; the bar keeps **file** proportions so the graphic is not re-styled.
 */
const FULL_W = 331;
const FULL_H = 40;

function Figma1661Paths({
  paint0,
  paint1,
  paint2,
  paint3,
}: {
  paint0: string;
  paint1: string;
  paint2: string;
  paint3: string;
}) {
  return (
    <>
      <path
        d="M321 0.117188C325.743 1.19737 331 9.68643 331 20C331 30.3134 325.743 38.8014 321 39.8818V40H277V0H321V0.117188Z"
        fill={`url(#${paint0})`}
      />
      <path
        d="M281 0.117188C285.743 1.19737 291 9.68643 291 20C291 30.3134 285.743 38.8014 281 39.8818V40H237V0H281V0.117188Z"
        fill={`url(#${paint1})`}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M238 0C242.971 0 247 8.9543 247 20C247 31.0457 242.971 40 238 40H129V0H238Z"
        fill={`url(#${paint2})`}
      />
      <path
        d="M134 0C138.971 0 143 8.9543 143 20C143 31.0457 138.971 40 134 40H13V0H134Z"
        fill={`url(#${paint3})`}
      />
      <ellipse cx="13" cy="20" rx="13" ry="20" fill="#ECFFB7" />
    </>
  );
}

function Figma1661Gradients({
  paint0,
  paint1,
  paint2,
  paint3,
}: {
  paint0: string;
  paint1: string;
  paint2: string;
  paint3: string;
}) {
  return (
    <defs>
      <linearGradient id={paint0} x1="279.136" y1="20" x2="331" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#85C894" />
        <stop offset="1" stopColor="#00C0E8" />
      </linearGradient>
      <linearGradient id={paint1} x1="239.136" y1="20" x2="291" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF371" />
        <stop offset="1" stopColor="#FFEB12" />
      </linearGradient>
      <linearGradient id={paint2} x1="287" y1="20" x2="195.5" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E85168" />
        <stop offset="1" stopColor="#F197A4" />
      </linearGradient>
      <linearGradient id={paint3} x1="11" y1="20" x2="179" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#CDF197" />
        <stop offset="1" stopColor="#ACE851" />
      </linearGradient>
    </defs>
  );
}

export function AllocationBreakdownFigmaBar16617516({
  className,
  'aria-hidden': ariaHidden = true,
  focusable = false,
  preserveAspectRatio = 'none',
}: {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
  focusable?: boolean;
  preserveAspectRatio?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const paint0 = `paint0_linear_1661_7516_${uid}`;
  const paint1 = `paint1_linear_1661_7516_${uid}`;
  const paint2 = `paint2_linear_1661_7516_${uid}`;
  const paint3 = `paint3_linear_1661_7516_${uid}`;

  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      preserveAspectRatio={preserveAspectRatio}
      viewBox={`0 0 ${FULL_W} ${FULL_H}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
      aria-hidden={ariaHidden}
      focusable={focusable}
    >
      <Figma1661Gradients paint0={paint0} paint1={paint1} paint2={paint2} paint3={paint3} />
      <Figma1661Paths paint0={paint0} paint1={paint1} paint2={paint2} paint3={paint3} />
    </svg>
  );
}
