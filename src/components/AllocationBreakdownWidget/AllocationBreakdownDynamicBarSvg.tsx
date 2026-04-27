import { useId } from 'react';

/** One segment in userSpace (viewBox width **331**). Used only by `proportional-css` (not Figma vector parity). */
export interface AllocationDynamicBarSegment {
  x: number;
  width: number;
  /** CSS color, usually `var(--colour-*)` */
  color: string;
}

const VB_W = 331;
const VB_H = 40;
const PILL_RX = 20;

/**
 * **Approximation only** (rects + gradients): segment widths follow data; **not** the Figma **`1649:7514`** paths.
 * For the **same graphic as the file**, use **`figma-asset`** → `AllocationBreakdownFigmaBar16497514`.
 */
export function AllocationBreakdownDynamicBarSvg({
  segments,
}: {
  segments: AllocationDynamicBarSegment[];
}) {
  const uid = useId().replace(/:/g, '');
  const clipId = `abw-dyn-clip-${uid}`;

  return (
    <svg
      className="abw__dynamic-bar-svg"
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="none"
      width="100%"
      height={VB_H}
      aria-hidden
      focusable="false"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x={0} y={0} width={VB_W} height={VB_H} rx={PILL_RX} ry={PILL_RX} />
        </clipPath>
        {segments.map((s, i) => (
          <linearGradient
            key={`abw-dyn-gv-${uid}-${i}`}
            id={`abw-dyn-gv-${uid}-${i}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="var(--primitive-material-ff-100)" stopOpacity="0.38" />
            <stop offset="14%" stopColor={s.color} stopOpacity="1" />
            <stop offset="48%" stopColor={s.color} stopOpacity="1" />
            <stop offset="100%" stopColor="var(--surface-level-4)" stopOpacity="0.35" />
          </linearGradient>
        ))}
        {segments.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <linearGradient
              key={`abw-dyn-gh-${uid}-${i}`}
              id={`abw-dyn-gh-${uid}-${i}`}
              x1={flip ? '1' : '0'}
              y1="0"
              x2={flip ? '0' : '1'}
              y2="0"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" stopColor="var(--surface-level-4)" stopOpacity="0.2" />
              <stop offset="46%" stopColor={s.color} stopOpacity="0.95" />
              <stop offset="100%" stopColor="var(--surface-level-4)" stopOpacity="0.2" />
            </linearGradient>
          );
        })}
      </defs>

      <g clipPath={`url(#${clipId})`}>
        {segments.map((s, i) => (
          <rect
            key={`abw-dyn-seg-${uid}-${i}`}
            x={s.x}
            y={0}
            width={s.width}
            height={VB_H}
            fill={`url(#abw-dyn-gv-${uid}-${i})`}
          />
        ))}
        {segments.map((s, i) => (
          <rect
            key={`abw-dyn-shade-${uid}-${i}`}
            x={s.x}
            y={0}
            width={s.width}
            height={VB_H}
            fill={`url(#abw-dyn-gh-${uid}-${i})`}
            opacity={0.4}
          />
        ))}
        <ellipse cx="13" cy="20" rx="13" ry="20" fill="#ECFFB7" />
      </g>
    </svg>
  );
}
