import './CardControl.css';

export type CardControlDots = 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface CardControlProps {
  /** Total number of pages/dots (8 = "8+") */
  dots?: CardControlDots;
  /** Currently selected page (1-based) */
  selection?: number;
  /** Called when a dot is clicked */
  onChange?: (index: number) => void;
  /** Additional CSS class */
  className?: string;
}

type Dot = { size: number; selected: boolean };

function computeDots(dots: number, selection: number): Dot[] {
  const sel = Math.max(1, Math.min(selection, dots));

  if (dots <= 6) {
    return Array.from({ length: dots }, (_, i) => ({
      size: 6,
      selected: i + 1 === sel,
    }));
  }

  if (dots === 7) {
    if (sel === 7) {
      return [
        { size: 3, selected: false },
        { size: 6, selected: false },
        { size: 6, selected: false },
        { size: 6, selected: false },
        { size: 6, selected: false },
        { size: 6, selected: false },
        { size: 4, selected: true },
      ];
    }
    return [
      ...Array.from({ length: 6 }, (_, i) => ({
        size: 6,
        selected: i + 1 === sel,
      })),
      { size: 3, selected: false },
    ];
  }

  if (sel <= 4) {
    return [
      ...Array.from({ length: 6 }, (_, i) => ({
        size: 6,
        selected: i + 1 === sel,
      })),
      { size: 3, selected: false },
      { size: 2, selected: false },
    ];
  }

  if (sel === 5) {
    return [
      { size: 2, selected: false },
      { size: 3, selected: false },
      { size: 6, selected: false },
      { size: 6, selected: false },
      { size: 6, selected: true },
      { size: 6, selected: false },
      { size: 4.5, selected: false },
      { size: 3, selected: false },
    ];
  }

  return [
    { size: 2, selected: false },
    { size: 3, selected: false },
    ...Array.from({ length: 6 }, (_, i) => ({
      size: 6,
      selected: i === sel - 3,
    })),
  ];
}

export const CardControl = ({
  dots = 2,
  selection = 1,
  onChange,
  className,
}: CardControlProps) => {
  const dotList = computeDots(dots, selection);
  const cls = ['cc', className].filter(Boolean).join(' ');

  return (
    <div className={cls} role="tablist" aria-label="Page indicator">
      {dotList.map((dot, i) => (
        <span
          key={i}
          className="cc__slot"
          role="tab"
          aria-selected={dot.selected}
          tabIndex={dot.selected ? 0 : -1}
          onClick={() => onChange?.(i + 1)}
        >
          <span
            className={`cc__dot ${dot.selected ? 'cc__dot--active' : ''}`}
            style={{ width: dot.size, height: dot.size }}
          />
        </span>
      ))}
    </div>
  );
};
