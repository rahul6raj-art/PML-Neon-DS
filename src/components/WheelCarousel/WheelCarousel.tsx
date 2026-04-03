import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import './WheelCarousel.css';

const DEFAULT_REPEAT_COUNT = 51;

function getMiddleSetIndex(repeatCount: number) {
  return Math.floor(repeatCount / 2);
}

export interface WheelCarouselProps {
  /** Tab labels (order defines scroll order) */
  items: string[];
  /** Selected value (controlled) */
  value?: string;
  /** Initial selection when uncontrolled */
  defaultValue?: string;
  /** Called when the centered tab changes (scroll or click) */
  onChange?: (value: string) => void;
  /** How many times `items` are repeated in the scroll track (odd number; large = fewer edge resets) */
  repeatCount?: number;
  className?: string;
  /** Accessible label for the tab list */
  'aria-label'?: string;
}

export const WheelCarousel = ({
  items,
  value: valueProp,
  defaultValue,
  onChange,
  repeatCount = DEFAULT_REPEAT_COUNT,
  className,
  'aria-label': ariaLabel = 'Wheel carousel',
}: WheelCarouselProps) => {
  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const tabChangeFromScroll = useRef(false);
  const isResettingScroll = useRef(false);
  const dragScrollStartRef = useRef(0);
  const pointerStartXRef = useRef(0);
  const selectedRef = useRef('');

  const [isDragging, setIsDragging] = useState(false);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [tabWidth, setTabWidth] = useState(62);

  const isControlled = valueProp !== undefined;
  const [uncontrolled, setUncontrolled] = useState(
    () => defaultValue ?? items[0] ?? ''
  );

  const selected = isControlled ? valueProp! : uncontrolled;

  const middleSetIndex = getMiddleSetIndex(repeatCount);
  const infiniteTabs = Array(repeatCount).fill(items).flat();
  const itemsKey = items.join('\u0001');

  const measureTabWidth = useCallback(() => {
    const root = tabsScrollRef.current;
    if (!root) return 62;
    const first = root.querySelector('.wheel-carousel__item-wrapper');
    if (!first) return 62;
    return Math.max(1, first.getBoundingClientRect().width);
  }, []);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  const applySelection = useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  // Place scroll in the middle set whenever items or measured width changes (not on every selection).
  useLayoutEffect(() => {
    if (!tabsScrollRef.current || items.length === 0) return;

    const w = measureTabWidth();
    setTabWidth(w);

    const selectedIndex = Math.max(0, items.indexOf(selected));
    const middleAbsolute = middleSetIndex * items.length + selectedIndex;
    const initialScroll = middleAbsolute * w;

    tabsScrollRef.current.scrollLeft = initialScroll;
    setScrollLeftState(initialScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- itemsKey gates runs; `selected`/`items` read when labels change
  }, [itemsKey, middleSetIndex, measureTabWidth]);

  const scrollToIndex = useCallback(
    (absoluteIndex: number, behavior: ScrollBehavior = 'smooth') => {
      if (!tabsScrollRef.current) return;
      const target = absoluteIndex * tabWidth;
      tabsScrollRef.current.scrollTo({ left: target, behavior });
    },
    [tabWidth]
  );

  // Controlled: external value changes — scroll to matching tab in current set without scroll-originated churn
  useEffect(() => {
    if (tabChangeFromScroll.current) {
      tabChangeFromScroll.current = false;
      return;
    }
    if (!tabsScrollRef.current || isDragging || isResettingScroll.current) return;
    if (items.length === 0) return;

    const tw = Math.max(1, tabWidth);
    const currentScroll = tabsScrollRef.current.scrollLeft;
    const currentIndex = Math.round(currentScroll / tw);
    const currentSetIndex = Math.floor(currentIndex / items.length);
    const currentItemIndex =
      ((currentIndex % items.length) + items.length) % items.length;
    const currentTab = items[currentItemIndex];

    if (currentTab !== selected) {
      const selectedIndex = items.indexOf(selected);
      if (selectedIndex < 0) return;
      const targetIndex = currentSetIndex * items.length + selectedIndex;
      const targetScroll = targetIndex * tw;
      if (Math.abs(tabsScrollRef.current.scrollLeft - targetScroll) > 1) {
        tabsScrollRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
      }
    }
    // itemsKey tracks `items` content for referential equality
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, isDragging, itemsKey, tabWidth]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleScroll = useCallback(() => {
    if (!tabsScrollRef.current || isResettingScroll.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      if (!tabsScrollRef.current || items.length === 0) return;
      const tw = Math.max(1, tabWidth);
      const currentScroll = tabsScrollRef.current.scrollLeft;
      setScrollLeftState(currentScroll);

      const centerIndex = Math.round(currentScroll / tw);
      const itemIndex =
        ((centerIndex % items.length) + items.length) % items.length;
      const centerTab = items[itemIndex];

      if (centerTab !== selectedRef.current) {
        tabChangeFromScroll.current = true;
        applySelection(centerTab);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applySelection, itemsKey, tabWidth]);

  const handleTabClick = (tab: string, absoluteIndex: number) => {
    scrollToIndex(absoluteIndex, 'smooth');
    tabChangeFromScroll.current = false;
    applySelection(tab);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!tabsScrollRef.current) return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setIsDragging(true);
    pointerStartXRef.current = e.clientX;
    dragScrollStartRef.current = tabsScrollRef.current.scrollLeft;
    setScrollLeftState(dragScrollStartRef.current);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !tabsScrollRef.current) return;
    e.preventDefault();
    const walk = e.clientX - pointerStartXRef.current;
    tabsScrollRef.current.scrollLeft = dragScrollStartRef.current - walk;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  if (items.length === 0) {
    return null;
  }

  const tw = Math.max(1, tabWidth);

  const rootClass = ['wheel-carousel', className].filter(Boolean).join(' ');
  const scrollClass = [
    'wheel-carousel__scroll',
    !isDragging ? 'wheel-carousel__scroll--snap' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClass}>
      <div className="wheel-carousel__pill">
        <div
          ref={tabsScrollRef}
          className={scrollClass}
          role="tablist"
          aria-label={ariaLabel}
          onScroll={handleScroll}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={(e) => {
            if (e.buttons === 0) handlePointerUp();
          }}
        >
          <div className="wheel-carousel__spacer" aria-hidden />
          {infiniteTabs.map((tab, absoluteIndex) => {
            const itemCenter = absoluteIndex * tw;
            const distanceFromCenter = scrollLeftState - itemCenter;
            const normalizedDistance = Math.min(
              Math.max(distanceFromCenter / (tw * 1.2), -1),
              1
            );
            const rawTabDistance = Math.abs(distanceFromCenter) / tw;
            const scale =
              1 +
              (1 - Math.abs(normalizedDistance)) * 0.08 -
              Math.abs(normalizedDistance) * 0.15;

            let opacity: number;
            if (rawTabDistance < 0.5) opacity = 1;
            else if (rawTabDistance < 1.5) opacity = 0.5;
            else opacity = 0;

            const isClosestToCenter = Math.abs(distanceFromCenter) < tw / 2;
            const isActive = tab === selected && isClosestToCenter;
            const isLeftSide = distanceFromCenter < 0;
            const isRightSide = distanceFromCenter > 0;

            const showDivider = absoluteIndex < infiniteTabs.length - 1;
            const nextItemCenter = (absoluteIndex + 1) * tw;
            const nextDistanceFromCenter = scrollLeftState - nextItemCenter;
            const nextRawTabDistance = Math.abs(nextDistanceFromCenter) / tw;
            const nextIsClosestToCenter =
              Math.abs(nextDistanceFromCenter) < tw / 2;
            const nextItem = infiniteTabs[absoluteIndex + 1];
            const nextIsActive =
              nextItem !== undefined &&
              nextItem === selected &&
              nextIsClosestToCenter;
            const dividerIsStrong = isActive || nextIsActive;
            const currentTabVisible = rawTabDistance < 1.5;
            const nextTabVisible = nextRawTabDistance < 1.5;
            const showVisibleDivider =
              showDivider && currentTabVisible && nextTabVisible;

            const btnClass = [
              'wheel-carousel__item',
              isActive ? 'wheel-carousel__item--active' : '',
              !isActive && isLeftSide ? 'wheel-carousel__item--left' : '',
              !isActive && isRightSide ? 'wheel-carousel__item--right' : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <div key={`${tab}-${absoluteIndex}`} className="wheel-carousel__item-wrapper">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-hidden={opacity === 0}
                  tabIndex={opacity === 0 ? -1 : 0}
                  className={btnClass}
                  style={{
                    transform: `scale(${scale})`,
                    opacity,
                    transition: isDragging
                      ? 'none'
                      : 'transform 0.15s ease-out, opacity 0.15s ease-out',
                    visibility: opacity === 0 ? 'hidden' : 'visible',
                  }}
                  onClick={() => handleTabClick(tab, absoluteIndex)}
                >
                  <span className="wheel-carousel__label">{tab}</span>
                </button>
                {showVisibleDivider ? (
                  <div
                    className={`wheel-carousel__divider${dividerIsStrong ? ' wheel-carousel__divider--strong' : ''}`}
                    aria-hidden
                  />
                ) : null}
              </div>
            );
          })}
          <div className="wheel-carousel__spacer" aria-hidden />
        </div>
      </div>
    </div>
  );
};
