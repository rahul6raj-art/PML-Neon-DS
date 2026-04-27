/** Point in **GraphWidget** viewBox space (default 346×116). */
export type ChartPathPoint = { readonly x: number; readonly y: number };

function fmt(n: number): string {
  return String(Math.round(n * 100) / 100);
}

/**
 * Builds a smooth SVG **`d`** through the given anchors (trading-style curve, not straight segments).
 * Uses uniform **Catmull–Rom** → cubic **Bézier** conversion; first/last points are duplicated for an open curve.
 */
export function smoothPathFromPoints(points: ReadonlyArray<ChartPathPoint>): string {
  const n = points.length;
  if (n === 0) return '';
  if (n === 1) return `M ${fmt(points[0].x)} ${fmt(points[0].y)}`;

  const at = (i: number) => points[Math.min(Math.max(i, 0), n - 1)]!;

  let d = `M ${fmt(points[0].x)} ${fmt(points[0].y)}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${fmt(cp1x)} ${fmt(cp1y)}, ${fmt(cp2x)} ${fmt(cp2y)}, ${fmt(p2.x)} ${fmt(p2.y)}`;
  }
  return d;
}

/**
 * Closed **`d`** with a **smooth** top edge (**`smoothPathFromPoints`**) and straight sides along
 * **`bottomY`** — use with the same anchor points passed to **`smoothPathFromPoints`** for the stroke
 * (Figma-style soft performance curve + area fill).
 */
export function closeAreaUnderSmoothCurve(
  points: ReadonlyArray<ChartPathPoint>,
  bottomY: number,
): string {
  const n = points.length;
  if (n < 2) return '';
  const top = smoothPathFromPoints(points);
  const first = points[0]!;
  const last = points[n - 1]!;
  return `${top} L ${fmt(last.x)} ${fmt(bottomY)} L ${fmt(first.x)} ${fmt(bottomY)} Z`;
}

/**
 * Close an **arbitrary open** top path (e.g. legacy **`M`+`C`** cubics) to the chart bottom for a fill.
 * Matches **PortfolioHome** paths that start at **`x = 0`** and end at **`x = 308`** in the **346×116** viewBox.
 */
export function closeAreaUnderOpenChartPath(
  openPathD: string,
  bottomY: number,
  endX: number = 308,
  startX: number = 0,
): string {
  const d = openPathD.trim();
  if (!d) return '';
  return `${d} L ${fmt(endX)} ${fmt(bottomY)} L ${fmt(startX)} ${fmt(bottomY)} Z`;
}

/** Sharp-corner polyline (`M` + `L`…), e.g. zig-zag trading series. */
export function linearPathFromPoints(points: ReadonlyArray<ChartPathPoint>): string {
  const n = points.length;
  if (n === 0) return '';
  let d = `M ${fmt(points[0].x)} ${fmt(points[0].y)}`;
  for (let i = 1; i < n; i++) {
    d += ` L ${fmt(points[i].x)} ${fmt(points[i].y)}`;
  }
  return d;
}

/**
 * Baseline from **start** → **end** with interior points alternating ±**amplitude** in **y**
 * (zig-zag around the trend). Endpoints sit exactly on the baseline so the ripple still aligns.
 *
 * @param segments — number of straight segments (`points = segments + 1`).
 */
export function zigZagLinePoints(
  start: ChartPathPoint,
  end: ChartPathPoint,
  segments: number,
  amplitude: number,
): ChartPathPoint[] {
  if (segments < 1) return [start, end];
  const pts: ChartPathPoint[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = start.x + (end.x - start.x) * t;
    let y = start.y + (end.y - start.y) * t;
    if (i > 0 && i < segments) {
      y += (i % 2 === 1 ? 1 : -1) * amplitude;
    }
    pts.push({ x, y });
  }
  return pts;
}

export type TradingVolatileLineOptions = {
  /**
   * Fraction of the horizontal span (0–1) kept at **`start.y`** before volatility ramps in
   * (flat “plateau” then noisy trend), like common mobile price charts.
   */
  flatLeadRatio?: number;
};

/**
 * Dense **jagged** polyline along the baseline **start**→**end** (TradingView-style: many short legs,
 * high-frequency wobble). Deterministic (sines only) — stable in Storybook / SSR.
 *
 * @param segments — how many small horizontal steps (`points = segments + 1`). Use **80–120** for a busy line.
 * @param volatility — typical vertical swing in viewBox units (scaled by an internal sine mix ~±1).
 */
export function tradingVolatileLinePoints(
  start: ChartPathPoint,
  end: ChartPathPoint,
  segments: number,
  volatility: number,
  options?: TradingVolatileLineOptions,
): ChartPathPoint[] {
  if (segments < 1) return [start, end];
  const flatLeadRatio = Math.min(1, Math.max(0, options?.flatLeadRatio ?? 0));
  const pts: ChartPathPoint[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const x = start.x + (end.x - start.x) * t;
    if (i === 0) {
      pts.push({ x: start.x, y: start.y });
      continue;
    }
    if (i === segments) {
      pts.push({ x: end.x, y: end.y });
      continue;
    }
    if (flatLeadRatio > 0 && t <= flatLeadRatio) {
      pts.push({ x, y: start.y });
      continue;
    }
    const u = flatLeadRatio > 0 ? (t - flatLeadRatio) / (1 - flatLeadRatio) : t;
    const baselineY = start.y + (end.y - start.y) * u;
    const envelope = Math.sin(Math.PI * u);
    const mixed =
      Math.sin(u * Math.PI * 2 * 23) * 0.42 +
      Math.sin(u * Math.PI * 2 * 47) * 0.38 +
      Math.sin(u * Math.PI * 2 * 11) * 0.5 +
      Math.sin(u * Math.PI * 2 * 61) * 0.32 +
      Math.sin(u * Math.PI * 2 * 89) * 0.24;
    const y = baselineY + envelope * volatility * mixed;
    pts.push({ x, y });
  }
  return pts;
}

/** Closed **`d`** for a vertical fade fill under an open polyline (line top → bottom edge → close). */
export function closeAreaUnderPolyline(
  points: ReadonlyArray<ChartPathPoint>,
  bottomY: number,
): string {
  const n = points.length;
  if (n < 2) return '';
  const line = linearPathFromPoints(points);
  const first = points[0]!;
  const last = points[n - 1]!;
  return `${line} L ${fmt(last.x)} ${fmt(bottomY)} L ${fmt(first.x)} ${fmt(bottomY)} Z`;
}
