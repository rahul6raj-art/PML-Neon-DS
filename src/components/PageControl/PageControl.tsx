import './PageControl.css';

export type PageControlDots = 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface PageControlProps {
  /** Total number of pages/dots (8 = "8+") */
  dots?: PageControlDots;
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
      size: 8,
      selected: i + 1 === sel,
    }));
  }

  if (dots === 7) {
    if (sel === 7) {
      return [
        { size: 6, selected: false },
        { size: 8, selected: false },
        { size: 8, selected: false },
        { size: 8, selected: false },
        { size: 8, selected: false },
        { size: 8, selected: false },
        { size: 8, selected: true },
      ];
    }
    return [
      ...Array.from({ length: 6 }, (_, i) => ({
        size: 8,
        selected: i + 1 === sel,
      })),
      { size: 6, selected: false },
    ];
  }

  if (sel <= 4) {
    return [
      ...Array.from({ length: 6 }, (_, i) => ({
        size: 8,
        selected: i + 1 === sel,
      })),
      { size: 6, selected: false },
      { size: 4, selected: false },
    ];
  }

  if (sel === 5) {
    return [
      { size: 4, selected: false },
      { size: 6, selected: false },
      { size: 8, selected: false },
      { size: 8, selected: false },
      { size: 8, selected: true },
      { size: 8, selected: false },
      { size: 6, selected: false },
      { size: 4, selected: false },
    ];
  }

  return [
    { size: 4, selected: false },
    { size: 6, selected: false },
    ...Array.from({ length: 6 }, (_, i) => ({
      size: 8,
      selected: i === sel - 3,
    })),
  ];
}

export const PageControl = ({
  dots = 2,
  selection = 1,
  onChange,
  className,
}: PageControlProps) => {
  const dotList = computeDots(dots, selection);
  const cls = ['pc', className].filter(Boolean).join(' ');

  return (
    <div className={cls} role="tablist" aria-label="Page control">
      {dotList.map((dot, i) => (
        <span
          key={i}
          className="pc__slot"
          role="tab"
          aria-selected={dot.selected}
          tabIndex={dot.selected ? 0 : -1}
          onClick={() => onChange?.(i + 1)}
        >
          <span
            className={`pc__dot ${dot.selected ? 'pc__dot--active' : ''}`}
            style={{ width: dot.size, height: dot.size }}
          />
        </span>
      ))}
    </div>
  );
};
