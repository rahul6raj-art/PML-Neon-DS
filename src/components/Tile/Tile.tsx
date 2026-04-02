import { Icon } from '../Icon';
import './Tile.css';

export type TileVariant = 'default' | 'action';

export interface TileProps {
  /** Tile variant */
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
  className,
}: TileProps) => {
  const isAction = variant === 'action';

  const cls = [
    'tile',
    `tile--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cls}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Main icon */}
      <div className="tile__icon-wrap">
        <Icon name={icon} size={44} className="tile__icon" />
      </div>

      {/* Text block */}
      <div className="tile__text">
        <span className="tile__title">{title}</span>
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
