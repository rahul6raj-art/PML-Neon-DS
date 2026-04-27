import { useId } from 'react';

/** Original Figma 1649:7514 slice bounds in viewBox units (0–331 × 40). Left / middle / right. */
const FIGMA_SEG_BOUNDS = [
  { L: 0, R: 170 },
  { L: 169, R: 278 },
  { L: 277, R: 331 },
] as const;

const FULL_W = 331;
const FULL_H = 40;

/** Positive shares (sum 1 after normalization). One entry per bar partition; slice `i` reuses Figma crop `i % 3`. */
export type FigmaBarSegmentFractions = readonly number[];

function normalizeFractions(f: FigmaBarSegmentFractions): number[] {
  const n = f.length;
  if (n === 0) return [1 / 3, 1 / 3, 1 / 3];
  const parts = f.map((x) => Math.max(0, x));
  const s = parts.reduce((a, b) => a + b, 0);
  if (s <= 0) return Array.from({ length: n }, () => 1 / n);
  return parts.map((p) => p / s);
}

function FigmaPaths({
  paint0,
  paint1,
  paint2,
}: {
  paint0: string;
  paint1: string;
  paint2: string;
}) {
  return (
    <>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M321 0.117188C325.743 1.19737 331 9.68643 331 20C331 30.3134 325.743 38.8014 321 39.8818V40H277V0H321V0.117188Z"
        fill={`url(#${paint0})`}
      />
      <path
        d="M278 0C282.971 0 287 8.9543 287 20C287 31.0457 282.971 40 278 40H169V0H278Z"
        fill={`url(#${paint1})`}
      />
      <g data-figma-group="1597883652">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M170 0C174.971 0 179 8.9543 179 20C179 31.0457 174.971 40 170 40H13V0H170Z"
          fill={`url(#${paint2})`}
        />
        <ellipse cx="13" cy="20" rx="13" ry="20" fill="#ECFFB7" />
      </g>
    </>
  );
}

function FigmaGradients({
  paint0,
  paint1,
  paint2,
}: {
  paint0: string;
  paint1: string;
  paint2: string;
}) {
  return (
    <defs>
      <linearGradient id={paint0} x1="279.136" y1="20" x2="331" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF371" />
        <stop offset="1" stopColor="#FFEB12" />
      </linearGradient>
      <linearGradient id={paint1} x1="287" y1="20" x2="195.5" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E85168" />
        <stop offset="1" stopColor="#F197A4" />
      </linearGradient>
      <linearGradient id={paint2} x1="11" y1="20" x2="179" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#CDF197" />
        <stop offset="1" stopColor="#ACE851" />
      </linearGradient>
    </defs>
  );
}

/**
 * SVG from [Figma `1649:7514`](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1649-7514&t=A2RU4TiZE7uPzzJc-4) (`exportAsync`). Same paths, gradients, and ellipse. Optional **`segmentFractions`** (one weight per partition) sets slice widths; partition **`i`** uses Figma crop **`i % 3`** (left / middle / right) so extra rows keep the same file art, not new shapes.
 */
export function AllocationBreakdownFigmaBar16497514({
  className,
  segmentFractions,
  'aria-hidden': ariaHidden = true,
  focusable = false,
  preserveAspectRatio = 'none',
}: {
  className?: string;
  /** One non-negative weight per partition (normalized to sum 1). Omitted = static Figma layout (170:109:54 over 331). */
  segmentFractions?: FigmaBarSegmentFractions;
  'aria-hidden'?: boolean | 'true' | 'false';
  focusable?: boolean;
  preserveAspectRatio?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const paint0 = `paint0_linear_1649_7514_${uid}`;
  const paint1 = `paint1_linear_1649_7514_${uid}`;
  const paint2 = `paint2_linear_1649_7514_${uid}`;

  if (!segmentFractions) {
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
        <FigmaGradients paint0={paint0} paint1={paint1} paint2={paint2} />
        <FigmaPaths paint0={paint0} paint1={paint1} paint2={paint2} />
      </svg>
    );
  }

  const g = normalizeFractions(segmentFractions);
  const widths = g.map((gi) => gi * FULL_W);

  let xAcc = 0;
  const slices = g.map((_, i) => {
    const seg = FIGMA_SEG_BOUNDS[i % 3]!;
    const vbW = seg.R - seg.L;
    const wi = widths[i]!;
    const xi = xAcc;
    xAcc += wi;
    if (wi <= 0) return null;
    return (
      <svg
        key={i}
        x={xi}
        y={0}
        width={wi}
        height={FULL_H}
        viewBox={`${seg.L} 0 ${vbW} ${FULL_H}`}
        preserveAspectRatio="none"
        overflow="hidden"
      >
        <FigmaPaths paint0={paint0} paint1={paint1} paint2={paint2} />
      </svg>
    );
  });

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
      <FigmaGradients paint0={paint0} paint1={paint1} paint2={paint2} />
      {slices}
    </svg>
  );
}
