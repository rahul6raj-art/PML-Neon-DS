import { useId } from 'react';
import './GraphWidget.css';

const DEFAULT_VIEW_W = 346;
const DEFAULT_VIEW_H = 116;
/** Default endpoint X in design coordinates (346-wide artboard). */
const DEFAULT_INDICATOR_X = 308;

export interface GraphWidgetProps {
  /**
   * SVG `d` for the chart polyline / curve (viewBox 0 0 346 116 unless overridden).
   * The path should **end at the ripple** — last point at
   * `(indicatorXRatio × viewBoxWidth, indicatorY)` so the stroke meets the endpoint indicator.
   */
  svgPath: string;
  /** Green / teal gradients vs orange–red. */
  isPositive: boolean;
  /** Endpoint dot vertical position in viewBox units (0 = top of viewBox). */
  indicatorY: number;
  className?: string;
  /** Pixel height of the SVG (width is 100%). Default 116. */
  height?: number;
  /** ViewBox width. Default 346. */
  viewBoxWidth?: number;
  /** ViewBox height. Default 116. */
  viewBoxHeight?: number;
  /** Endpoint horizontal position as fraction of viewBox width (0–1). Default 308/346. */
  indicatorXRatio?: number;
  /** Accessible label for the chart graphic. */
  'aria-label'?: string;
  /** Optional key on the wrapper to remount when series changes (e.g. time period). */
  chartKey?: string;
  /** Multi-layer blur + horizontal gradient on the stroke. If false, a single solid line (`--gw-line-3`). Default true. */
  showGradient?: boolean;
  /** Outer animated pulse ring at the endpoint. Default true. */
  showRipple?: boolean;
  /** Inner ring + center dot at the endpoint. Default true. */
  showDot?: boolean;
}

/**
 * Portfolio-style line chart: multi-layer blurred glow + gradient stroke + HTML endpoint marker.
 * Pass `svgPath` in the same coordinate space as `viewBoxWidth` × `viewBoxHeight`.
 */
export const GraphWidget = ({
  svgPath,
  isPositive,
  indicatorY,
  className,
  height = DEFAULT_VIEW_H,
  viewBoxWidth = DEFAULT_VIEW_W,
  viewBoxHeight = DEFAULT_VIEW_H,
  indicatorXRatio = DEFAULT_INDICATOR_X / DEFAULT_VIEW_W,
  'aria-label': ariaLabel = 'Performance chart',
  chartKey,
  showGradient = true,
  showRipple = true,
  showDot = true,
}: GraphWidgetProps) => {
  const uid = useId().replace(/:/g, '');
  const lineGradPos = `gw-line-pos-${uid}`;
  const lineGradNeg = `gw-line-neg-${uid}`;
  const glowGradPos = `gw-glow-pos-${uid}`;
  const glowGradNeg = `gw-glow-neg-${uid}`;
  const filterWide = `gw-glow-wide-${uid}`;
  const filterMedium = `gw-glow-medium-${uid}`;
  const filterSharp = `gw-glow-sharp-${uid}`;

  const pos = isPositive;
  const lineStroke = showGradient
    ? pos
      ? `url(#${lineGradPos})`
      : `url(#${lineGradNeg})`
    : 'var(--gw-line-3)';
  const glowStroke = pos ? `url(#${glowGradPos})` : `url(#${glowGradNeg})`;

  const rootCls = ['gw', pos ? 'gw--positive' : 'gw--negative', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootCls} key={chartKey}>
      <svg
        className="gw__svg"
        width="100%"
        height={height}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        fill="none"
        preserveAspectRatio="none"
        overflow="visible"
        role="img"
        aria-label={ariaLabel}
      >
        <defs>
          {showGradient &&
            (pos ? (
              <>
                <linearGradient id={lineGradPos} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--gw-line-1)" />
                  <stop offset="40%" stopColor="var(--gw-line-2)" />
                  <stop offset="100%" stopColor="var(--gw-line-3)" />
                </linearGradient>
                <linearGradient id={glowGradPos} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--gw-glow-1)" stopOpacity={0.6} />
                  <stop offset="35%" stopColor="var(--gw-glow-2)" stopOpacity={0.7} />
                  <stop offset="70%" stopColor="var(--gw-glow-3)" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="var(--gw-glow-4)" stopOpacity={0.9} />
                </linearGradient>
              </>
            ) : (
              <>
                <linearGradient id={lineGradNeg} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--gw-line-1)" />
                  <stop offset="50%" stopColor="var(--gw-line-2)" />
                  <stop offset="100%" stopColor="var(--gw-line-3)" />
                </linearGradient>
                <linearGradient id={glowGradNeg} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--gw-glow-1)" stopOpacity={0.6} />
                  <stop offset="50%" stopColor="var(--gw-glow-2)" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="var(--gw-glow-3)" stopOpacity={0.9} />
                </linearGradient>
              </>
            ))}
          {showGradient && (
            <>
              <filter id={filterWide} x="-150%" y="-500%" width="400%" height="1100%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="60" />
              </filter>
              <filter id={filterMedium} x="-120%" y="-400%" width="340%" height="900%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="38" />
              </filter>
              <filter id={filterSharp} x="-80%" y="-250%" width="260%" height="600%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="16" />
              </filter>
            </>
          )}
        </defs>

        {showGradient ? (
          <>
            <path
              d={svgPath}
              stroke={glowStroke}
              strokeWidth="120"
              fill="none"
              filter={`url(#${filterWide})`}
              opacity={0.07}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="gw__blur-path"
            />

            <path
              d={svgPath}
              stroke={lineStroke}
              strokeWidth="80"
              fill="none"
              filter={`url(#${filterMedium})`}
              opacity={0.06}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d={svgPath}
              stroke={lineStroke}
              strokeWidth="30"
              fill="none"
              filter={`url(#${filterSharp})`}
              opacity={0.1}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d={svgPath}
              stroke={lineStroke}
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="gw__line"
            />
          </>
        ) : (
          <path
            d={svgPath}
            stroke={lineStroke}
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="gw__line"
          />
        )}
      </svg>

      {(showRipple || showDot) && (
        <div
          className="gw__endpoint"
          style={{
            left: `${indicatorXRatio * 100}%`,
            top: `${(indicatorY / viewBoxHeight) * 100}%`,
          }}
        >
          {showRipple && <span className="gw__indicator-pulse" />}
          {showDot && (
            <>
              <span className="gw__indicator-mid" />
              <span className="gw__indicator-dot" />
            </>
          )}
        </div>
      )}
    </div>
  );
};
