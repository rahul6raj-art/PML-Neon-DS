import { useId } from 'react';
import './GraphWidget.css';

const DEFAULT_VIEW_W = 346;
const DEFAULT_VIEW_H = 116;
/** Default endpoint X in design coordinates (346-wide artboard). */
const DEFAULT_INDICATOR_X = 308;

export interface GraphWidgetProps {
  /** SVG `d` for the chart polyline / curve (viewBox 0 0 346 116 unless overridden). */
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
  const lineStroke = pos ? `url(#${lineGradPos})` : `url(#${lineGradNeg})`;
  const glowStroke = pos ? `url(#${glowGradPos})` : `url(#${glowGradNeg})`;
  const dotColor = pos ? '#47FF8E' : '#FF3B3B';

  const rootCls = ['gw', className].filter(Boolean).join(' ');

  return (
    <div className={rootCls} key={chartKey}>
      <svg
        className="gw__svg"
        width="100%"
        height={height}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        fill="none"
        preserveAspectRatio="none"
        role="img"
        aria-label={ariaLabel}
      >
        <defs>
          <linearGradient id={lineGradPos} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2CB1FE" />
            <stop offset="40%" stopColor="#3DD4A0" />
            <stop offset="100%" stopColor="#47FF8E" />
          </linearGradient>
          <linearGradient id={lineGradNeg} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF8D28" />
            <stop offset="50%" stopColor="#FF5533" />
            <stop offset="100%" stopColor="#FF0000" />
          </linearGradient>
          <linearGradient id={glowGradPos} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1a3a7a" stopOpacity={0.6} />
            <stop offset="35%" stopColor="#0a5a6a" stopOpacity={0.7} />
            <stop offset="70%" stopColor="#0a6a4a" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#1a7a4a" stopOpacity={0.9} />
          </linearGradient>
          <linearGradient id={glowGradNeg} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7a3a1a" stopOpacity={0.6} />
            <stop offset="50%" stopColor="#6a2a1a" stopOpacity={0.7} />
            <stop offset="100%" stopColor="#5a1a1a" stopOpacity={0.9} />
          </linearGradient>
          <filter id={filterWide} x="-150%" y="-500%" width="400%" height="1100%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="60" />
          </filter>
          <filter id={filterMedium} x="-120%" y="-400%" width="340%" height="900%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="38" />
          </filter>
          <filter id={filterSharp} x="-80%" y="-250%" width="260%" height="600%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="16" />
          </filter>
        </defs>

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
      </svg>

      <div
        className="gw__endpoint"
        style={{
          left: `${indicatorXRatio * 100}%`,
          top: `${(indicatorY / viewBoxHeight) * 100}%`,
        }}
      >
        <span className="gw__indicator-pulse" style={{ backgroundColor: dotColor }} />
        <span className="gw__indicator-mid" style={{ backgroundColor: dotColor }} />
        <span className="gw__indicator-dot" style={{ backgroundColor: dotColor }} />
      </div>
    </div>
  );
};
