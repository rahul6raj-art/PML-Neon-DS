import { Button } from '../Button';
import { SectionHeader, type SectionHeaderSize } from '../SectionHeader';
import './GoalsWidget.css';

export type GoalsWidgetStatusTone = 'positive' | 'notice' | 'negative' | 'neutral';

export interface GoalsWidgetProps {
  /** Primary goal name (e.g. Long Term Wealth). */
  goalTitle: string;
  /** Status line under the title (e.g. On track) — **Subtext** per Figma **1670:7540**. */
  statusLabel: string;
  /** Colours **statusLabel** and bar fill (**notice** / **negative** use loss gradient on the bar). */
  statusTone?: GoalsWidgetStatusTone;
  /**
   * Optional trailing metric in the title row (e.g. **13.6%**).
   * Omit to hide the badge cell.
   */
  trailingBadge?: string;
  /** Progress toward target, **0–100** (bar fill + thumb). Values are clamped. */
  progressPercent: number;
  /** Saved amount copy (caller formats INR, e.g. **1.5L**). */
  savedDisplay: string;
  /** Target copy (caller formats, e.g. **10L**). */
  targetDisplay: string;
  /** `SectionHeader` title when **showSectionHeader**. */
  sectionTitle?: string;
  showSectionHeader?: boolean;
  sectionHeaderSize?: SectionHeaderSize;
  showChevron?: boolean;
  /** Makes the card surface focusable / button; parent handles navigation. */
  onCardPress?: () => void;
  /**
   * Optional footer CTAs per [Figma **1671:7584**](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1671-7584&t=A2RU4TiZE7uPzzJc-4): primary **filled**, secondary **tonal**, both **medium**.
   * Pass a non-empty **label** to show each button; **on*Press** optional (no-op when omitted).
   */
  primaryCtaLabel?: string;
  onPrimaryCtaPress?: () => void;
  secondaryCtaLabel?: string;
  onSecondaryCtaPress?: () => void;
  className?: string;
}

function clampPercent(n: number): number {
  if (Number.isNaN(n)) return 0;
  return Math.min(100, Math.max(0, n));
}

/**
 * Single **goal summary** card: **Body** title + **Subtext** status, optional **%** chip, **2px** bar + thumb,
 * **Saved** / **Target** footer, and optional **CTA** row (**`Button`** **filled** + **tonal**, **medium**) per [Figma **1671:7584**](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1671-7584&t=A2RU4TiZE7uPzzJc-4). Base card: [Figma **1670:7540**](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1670-7540&t=A2RU4TiZE7uPzzJc-4).
 */
export const GoalsWidget = ({
  goalTitle,
  statusLabel,
  statusTone = 'positive',
  trailingBadge,
  progressPercent,
  savedDisplay,
  targetDisplay,
  sectionTitle = 'Goals',
  showSectionHeader = true,
  sectionHeaderSize = 'extra-large',
  showChevron = true,
  onCardPress,
  primaryCtaLabel,
  onPrimaryCtaPress,
  secondaryCtaLabel,
  onSecondaryCtaPress,
  className,
}: GoalsWidgetProps) => {
  const barToneClass =
    statusTone === 'notice'
      ? 'glw--bar-notice'
      : statusTone === 'negative'
        ? 'glw--bar-negative'
        : null;
  const statusNeutralClass =
    statusTone === 'neutral' ? 'glw--status-neutral' : null;
  const rootCls = ['glw', barToneClass, statusNeutralClass, className]
    .filter(Boolean)
    .join(' ');
  const p = clampPercent(progressPercent);
  const cardCls = ['glw__card', onCardPress && 'glw__card--pressable']
    .filter(Boolean)
    .join(' ');

  const primaryCta = primaryCtaLabel?.trim();
  const secondaryCta = secondaryCtaLabel?.trim();
  const showCtaRow = Boolean(primaryCta || secondaryCta);

  return (
    <div className={rootCls}>
      {showSectionHeader && (
        <SectionHeader
          size={sectionHeaderSize}
          title={sectionTitle}
          showChevron={showChevron}
          trailing="none"
          showSubtext={false}
        />
      )}
      <div className="glw__wrap">
        <div
          className={cardCls}
          onClick={onCardPress}
          onKeyDown={
            onCardPress
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onCardPress();
                  }
                }
              : undefined
          }
          role={onCardPress ? 'button' : undefined}
          tabIndex={onCardPress ? 0 : undefined}
        >
          <div className="glw__top">
            <div className="glw__info">
              <span className="glw__title">{goalTitle}</span>
              <span className={`glw__status glw__status--${statusTone}`}>
                {statusLabel}
              </span>
            </div>
            {trailingBadge != null && trailingBadge !== '' ? (
              <div className="glw__badge">
                <span className="glw__badge-text">{trailingBadge}</span>
              </div>
            ) : null}
          </div>

          <div className="glw__bar-block">
            <div className="glw__track-shell">
              <div
                className="glw__track"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(p)}
                aria-label={`Progress toward goal: ${Math.round(p)} percent`}
              >
                <div className="glw__track-rail" aria-hidden />
                <div
                  className="glw__track-fill"
                  style={{ width: `${p}%` }}
                  aria-hidden
                />
              </div>
              <div
                className="glw__thumb"
                style={{ left: `${p}%` }}
                aria-hidden
              />
            </div>
            <div className="glw__footer">
              <span className="glw__foot-line">
                Saved:{' '}
                <span className="glw__foot-num">{savedDisplay}</span>
              </span>
              <span className="glw__foot-line">
                Target:{' '}
                <span className="glw__foot-num">{targetDisplay}</span>
              </span>
            </div>
          </div>

          {showCtaRow ? (
            <div className="glw__cta">
              {primaryCta ? (
                <Button
                  variant="filled"
                  size="medium"
                  label={primaryCta}
                  className="glw__cta-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPrimaryCtaPress?.();
                  }}
                />
              ) : null}
              {secondaryCta ? (
                <Button
                  variant="tonal"
                  size="medium"
                  label={secondaryCta}
                  className="glw__cta-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSecondaryCtaPress?.();
                  }}
                />
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
