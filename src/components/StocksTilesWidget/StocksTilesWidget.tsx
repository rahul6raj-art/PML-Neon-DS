import type { ReactNode } from 'react';
import { Badge } from '../Badge';
import type { BadgeContext } from '../Badge/Badge';
import { Icon } from '../Icon';
import { Logo } from '../Logo';
import { SectionHeader } from '../SectionHeader';
import type {
  StocksTilesChangeSentiment,
  StocksTilesItem,
  StocksTilesWidgetProps,
} from './types';
import './StocksTilesWidget.css';

/** Same sign rules as **StocksCard** — leading +/- matches **sentiment**. */
function formatChangeLabelForSentiment(
  label: string,
  sentiment: StocksTilesChangeSentiment,
): string {
  const t = label.trim();
  if (sentiment === 'neutral') {
    return t;
  }
  if (sentiment === 'negative') {
    if (t.startsWith('+')) {
      return `-${t.slice(1)}`;
    }
    if (t.startsWith('-')) {
      return t;
    }
    return `-${t}`;
  }
  if (t.startsWith('-')) {
    return `+${t.slice(1)}`;
  }
  if (t.startsWith('+')) {
    return t;
  }
  return `+${t}`;
}

function badgeContextForChange(sentiment: StocksTilesChangeSentiment): BadgeContext {
  if (sentiment === 'positive') return 'positive';
  if (sentiment === 'negative') return 'negative';
  return 'default';
}

function resolveChangeAsBadge(
  item: StocksTilesItem,
  widgetDefault: boolean,
): boolean {
  if (item.changeAsBadge !== undefined) {
    return item.changeAsBadge;
  }
  return widgetDefault;
}

function resolveTopMediaNode(item: StocksTilesItem): {
  node: ReactNode | null;
  kind: 'custom' | 'logo' | 'icon' | null;
} {
  if (item.leading != null) {
    return { node: item.leading, kind: 'custom' };
  }
  const logoName = item.leadingLogoName?.trim();
  if (logoName) {
    return {
      node: (
        <Logo
          name={logoName}
          category={item.leadingLogoCategory ?? 'stocks'}
          size={40}
          shape="rounded"
          alt={`${item.title} logo`}
        />
      ),
      kind: 'logo',
    };
  }
  const iconName = item.leadingIconName?.trim();
  if (iconName) {
    return {
      node: (
        <div className="stw__top-media-icon" aria-hidden>
          <Icon name={iconName} size={22} />
        </div>
      ),
      kind: 'icon',
    };
  }
  return { node: null, kind: null };
}

/**
 * Horizontal **stock tiles** strip: optional **`SectionHeader`** + scrollable tiles
 * (optional **top** icon / **Logo**, status **Badge**, title, price, move as **Badge** or text).
 * Figma: [PML — Review File · Stocks Tiles](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1614-5966).
 */
export const StocksTilesWidget = ({
  title = 'Stocks tiles',
  showSectionHeader = true,
  sectionHeaderSize = 'extra-large',
  showChevron,
  items,
  changeAsBadge = true,
  showStatusBadges = true,
  showTopMedia = true,
  className,
  onTilePress,
}: StocksTilesWidgetProps) => {
  const rootCls = ['stw', className].filter(Boolean).join(' ');

  return (
    <div className={rootCls}>
      {showSectionHeader && (
        <SectionHeader
          size={sectionHeaderSize}
          title={title}
          {...(showChevron !== undefined ? { showChevron } : {})}
          trailing="none"
          showSubtext={false}
        />
      )}
      <div className="stw__scroll">
        {items.map((item, index) => {
          const hasChangeRow = item.changeLabel.trim().length > 0;
          const formattedChange = hasChangeRow
            ? formatChangeLabelForSentiment(
                item.changeLabel,
                item.changeSentiment,
              )
            : '';
          const useBadge = resolveChangeAsBadge(item, changeAsBadge);
          const statusText = item.statusBadgeLabel?.trim();
          const showStatus = showStatusBadges && Boolean(statusText);

          const { node: mediaNode, kind: mediaKind } = resolveTopMediaNode(item);
          const itemAllowsMedia = item.showTopMedia !== false;
          const showMedia =
            showTopMedia && itemAllowsMedia && mediaNode != null;
          const mediaDecorative = mediaKind === 'icon';

          const tileCls = [
            'stw__tile',
            onTilePress && 'stw__tile--pressable',
          ]
            .filter(Boolean)
            .join(' ');

          const inner = (
            <>
              {showMedia && (
                <div
                  className="stw__top-media"
                  {...(mediaDecorative ? { 'aria-hidden': true as const } : {})}
                >
                  {mediaNode}
                </div>
              )}
              {showStatus && (
                <div className="stw__status-row">
                  <Badge
                    type="text"
                    context={item.statusBadgeContext ?? 'notice'}
                    label={statusText!}
                    muted
                  />
                </div>
              )}
              <div className="stw__body">
                <div className="stw__title-row">
                  <span className="stw__title body-medium">{item.title}</span>
                </div>
                <div className="stw__price-row">
                  <span className="stw__price">{item.price}</span>
                </div>
                {hasChangeRow && (
                  <div className="stw__change-row">
                    {useBadge ? (
                      <Badge
                        type="text"
                        context={badgeContextForChange(item.changeSentiment)}
                        label={formattedChange}
                        muted
                      />
                    ) : (
                      <span
                        className={[
                          'stw__change-text',
                          `stw__change-text--${item.changeSentiment}`,
                        ].join(' ')}
                      >
                        {formattedChange}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </>
          );

          const key = `${item.title}-${index}`;

          if (onTilePress) {
            return (
              <button
                key={key}
                type="button"
                className={tileCls}
                onClick={() => onTilePress(index)}
              >
                {inner}
              </button>
            );
          }

          return (
            <div key={key} className={tileCls}>
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
};
