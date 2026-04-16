import { Icon } from '../Icon';
import './Tile.css';

export type TileVariant = 'default' | 'action' | 'strategy';

/** One card when **`Tile`** **`variant="strategy"`** is used with **`strategyItems`** (horizontal strip). */
export interface TileStrategyItem {
  icon: string;
  title: string;
  label: string;
}

export interface TileProps {
  /**
   * Tile variant.
   * **`strategy`**: same rhythm as **Stocks Discover → Curated strategies** (top **icon** chip, **24px** to title, **2px** to descriptor, descriptor **neutral medium**); product carousels can use **`StocksTilesWidget`** + **`Discover.css`** **`.dv-strategies-stw`** overrides.
   */
  variant?: TileVariant;
  /** Main icon name */
  icon?: string;
  /** Title text (first line) */
  title?: string;
  /** Label text (second line) */
  label?: string;
  /** Show gradient behind the favourite icon (action variant only) */
  favouriteOption?: boolean;
  /** Favourite icon name */
  favouriteIcon?: string;
  /** Click handler */
  onClick?: () => void;
  /** Favourite icon click handler */
  onFavouriteClick?: () => void;
  /**
   * **`variant="strategy"` only.** When set with at least one entry, renders a horizontal scroll of strategy cards.
   * Omit or use a single-tile **`icon`** / **`title`** / **`label`** instead.
   */
  strategyItems?: TileStrategyItem[];
  /** **`variant="strategy"`** + **`strategyItems`**: called with the tapped card index. */
  onStrategyItemPress?: (index: number) => void;
  /** Additional CSS class */
  className?: string;
}

export const Tile = ({
  variant = 'default',
  icon = 'rupee',
  title = 'Title',
  label = 'label',
  favouriteOption = false,
  favouriteIcon = 'star_outline',
  onClick,
  onFavouriteClick,
  strategyItems,
  onStrategyItemPress,
  className,
}: TileProps) => {
  const isAction = variant === 'action';
  const isStrategy = variant === 'strategy';
  const iconSize = isStrategy ? 22 : 44;
  const strategyStrip =
    isStrategy &&
    Array.isArray(strategyItems) &&
    strategyItems.length > 0;

  const cls = [
    'tile',
    `tile--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  if (strategyStrip) {
    const stripCls = ['tile-strategy-strip', className].filter(Boolean).join(' ');
    return (
      <div className={stripCls} role="list" aria-label="Strategy tiles">
        {strategyItems!.map((item, index) => {
          const pressable = Boolean(onStrategyItemPress);
          return (
            <div
              key={`${item.title}-${index}`}
              className="tile tile--strategy"
              role={pressable ? 'button' : undefined}
              tabIndex={pressable ? 0 : undefined}
              onClick={
                pressable ? () => onStrategyItemPress!(index) : undefined
              }
              onKeyDown={
                pressable
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onStrategyItemPress!(index);
                      }
                    }
                  : undefined
              }
            >
              <div className="tile__icon-wrap">
                <Icon name={item.icon} size={22} className="tile__icon" />
              </div>
              <div className="tile__text">
                <span className="tile__title--strategy body-medium">
                  {item.title}
                </span>
                <span className="tile__label">{item.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cls}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Main icon */}
      <div className="tile__icon-wrap">
        <Icon name={icon} size={iconSize} className="tile__icon" />
      </div>

      {/* Text block */}
      <div className="tile__text">
        <span
          className={
            isStrategy ? 'tile__title--strategy body-medium' : 'tile__title'
          }
        >
          {title}
        </span>
        <span className="tile__label">{label}</span>
      </div>

      {/* Favourite — always visible in action variant */}
      {isAction && (
        <>
          {/* Gradient overlay — only when favouriteOption is on */}
          {favouriteOption && <div className="tile__fav-gradient" />}

          {/* Favourite icon button — always visible */}
          <button
            className="tile__fav-btn"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onFavouriteClick?.();
            }}
            aria-label="Favourite"
          >
            <Icon name={favouriteIcon} size={24} />
          </button>
        </>
      )}
    </div>
  );
};
