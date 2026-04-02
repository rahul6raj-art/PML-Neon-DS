import { Icon } from '../Icon';
import './DataPoints.css';

export type DataPointsType = '2-left-aligned' | '2-spaced-out' | '3';

export interface DataPointItem {
  /** Top label text */
  topLabel?: string;
  /** Main data value */
  data?: string;
  /** Bottom label text */
  bottomLabel?: string;
  /** Subtitle text (below the label group) */
  subtitle?: string;
  /** Show icon next to top label */
  showTitleIcon?: boolean;
  /** Icon name for the title icon */
  titleIcon?: string;
}

export interface DataPointsProps {
  /** Layout type */
  type?: DataPointsType;
  /** Data point items (2 for two-column types, 3 for three-column type) */
  items?: DataPointItem[];
  /** Additional CSS class */
  className?: string;
}

function getAlignment(
  type: DataPointsType,
  index: number,
  total: number,
): 'left' | 'center' | 'right' {
  if (type === '2-left-aligned') return 'left';
  if (type === '2-spaced-out') return index === 0 ? 'left' : 'right';
  if (index === 0) return 'left';
  if (index === total - 1) return 'right';
  return 'center';
}

const defaultItems: DataPointItem[] = [
  { topLabel: 'Top Label', data: 'Data', bottomLabel: 'Bottom Label', subtitle: 'Subtitle' },
  { topLabel: 'Top Label', data: 'Data', bottomLabel: 'Bottom Label', subtitle: 'Subtitle' },
];

export const DataPoints = ({
  type = '2-left-aligned',
  items = defaultItems,
  className,
}: DataPointsProps) => {
  const visibleItems = type === '3' ? items.slice(0, 3) : items.slice(0, 2);

  const cls = ['dp', className].filter(Boolean).join(' ');

  return (
    <div className={cls}>
      {visibleItems.map((item, i) => {
        const align = getAlignment(type, i, visibleItems.length);
        return (
          <div
            key={i}
            className={`dp__col dp__col--${align}`}
          >
            {/* Label group */}
            <div className="dp__labels">
              {/* Title row: top label + optional icon */}
              <div className="dp__title-row">
                <span className="dp__top-label">{item.topLabel}</span>
                {item.showTitleIcon && (
                  <Icon
                    name={item.titleIcon || 'info_outline'}
                    size={16}
                    className="dp__title-icon"
                  />
                )}
              </div>

              {/* Data value */}
              <span className="dp__data">{item.data}</span>

              {/* Bottom label */}
              {item.bottomLabel && (
                <span className="dp__bottom-label">{item.bottomLabel}</span>
              )}
            </div>

            {/* Subtitle */}
            {item.subtitle && (
              <span className="dp__subtitle">{item.subtitle}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
