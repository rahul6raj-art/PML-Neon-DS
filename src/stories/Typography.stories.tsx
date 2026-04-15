import type { Meta, StoryObj } from '@storybook/react';
import '../tokens/typography.css';

/* ─── Type scale data ────────────────────────────────── */

interface TypeStyle {
  name: string;
  className: string;
  weight: string;
  weightNum: number;
  size: number;
  lineHeight: number;
  tracking: number;
}

interface TypeCategory { title: string; styles: TypeStyle[] }

const TYPE_SCALE: TypeCategory[] = [
  {
    title: 'Display 1',
    styles: [
      { name: 'Display 1 - Bold',   className: 'display-1-bold',   weight: 'Bold',   weightNum: 700, size: 42, lineHeight: 48, tracking: 0 },
      { name: 'Display 1 - Medium', className: 'display-1-medium', weight: 'Medium', weightNum: 500, size: 42, lineHeight: 48, tracking: 0 },
    ],
  },
  {
    title: 'Display 2',
    styles: [
      { name: 'Display 2 - Bold',   className: 'display-2-bold',   weight: 'Bold',   weightNum: 700, size: 36, lineHeight: 40, tracking: 0 },
      { name: 'Display 2 - Medium', className: 'display-2-medium', weight: 'Medium', weightNum: 500, size: 36, lineHeight: 40, tracking: 0 },
    ],
  },
  {
    title: 'Display 3',
    styles: [
      { name: 'Display 3 - Bold',   className: 'display-3-bold',   weight: 'Bold',   weightNum: 700, size: 32, lineHeight: 36, tracking: 0 },
      { name: 'Display 3 - Medium', className: 'display-3-medium', weight: 'Medium', weightNum: 500, size: 32, lineHeight: 36, tracking: 0 },
    ],
  },
  {
    title: 'Title 1',
    styles: [
      { name: 'Title 1 - Bold', className: 'title-1-bold', weight: 'Bold', weightNum: 700, size: 22, lineHeight: 28, tracking: 0 },
    ],
  },
  {
    title: 'Title 2',
    styles: [
      { name: 'Title 2 - Bold', className: 'title-2-bold', weight: 'Bold', weightNum: 700, size: 20, lineHeight: 24, tracking: 0 },
    ],
  },
  {
    title: 'Title 3',
    styles: [
      { name: 'Title 3 - Bold',   className: 'title-3-bold',   weight: 'Bold',   weightNum: 700, size: 18, lineHeight: 24, tracking: 0 },
      { name: 'Title 3 - Medium', className: 'title-3-medium', weight: 'Medium', weightNum: 500, size: 18, lineHeight: 24, tracking: 0 },
    ],
  },
  {
    title: 'Title 4',
    styles: [
      { name: 'Title 4 - Bold',      className: 'title-4-bold',     weight: 'Bold',      weightNum: 700, size: 16, lineHeight: 22, tracking: 0 },
      { name: 'Title 4 - Semi Bold', className: 'title-4-semibold', weight: 'Semi Bold', weightNum: 600, size: 16, lineHeight: 22, tracking: 0 },
      { name: 'Title 4 - Medium',    className: 'title-4-medium',   weight: 'Medium',    weightNum: 500, size: 16, lineHeight: 22, tracking: 0 },
      { name: 'Title 4 - Regular',   className: 'title-4-regular',  weight: 'Regular',   weightNum: 400, size: 16, lineHeight: 22, tracking: 0 },
    ],
  },
  {
    title: 'Body',
    styles: [
      { name: 'Body - Bold',      className: 'body-bold',     weight: 'Bold',      weightNum: 700, size: 14, lineHeight: 20, tracking: 0 },
      { name: 'Body - Semi Bold', className: 'body-semibold', weight: 'Semi Bold', weightNum: 600, size: 14, lineHeight: 20, tracking: 0 },
      { name: 'Body - Medium',    className: 'body-medium',   weight: 'Medium',    weightNum: 500, size: 14, lineHeight: 20, tracking: 0 },
      { name: 'Body - Regular',   className: 'body-regular',  weight: 'Regular',   weightNum: 400, size: 14, lineHeight: 20, tracking: 0 },
    ],
  },
  {
    title: 'Subtext',
    styles: [
      { name: 'Subtext - Bold',      className: 'subtext-bold',     weight: 'Bold',      weightNum: 700, size: 12, lineHeight: 16, tracking: 0 },
      { name: 'Subtext - Semi Bold', className: 'subtext-semibold', weight: 'Semi Bold', weightNum: 600, size: 12, lineHeight: 16, tracking: 0 },
      { name: 'Subtext - Medium',    className: 'subtext-medium',   weight: 'Medium',    weightNum: 500, size: 12, lineHeight: 16, tracking: 0 },
      { name: 'Subtext - Regular',   className: 'subtext-regular',  weight: 'Regular',   weightNum: 400, size: 12, lineHeight: 16, tracking: 0 },
    ],
  },
  {
    title: 'Caption',
    styles: [
      { name: 'Caption - Semi Bold', className: 'caption-semibold', weight: 'Semi Bold', weightNum: 600, size: 10, lineHeight: 12, tracking: 0 },
      { name: 'Caption - Regular',   className: 'caption-regular',  weight: 'Regular',   weightNum: 400, size: 10, lineHeight: 12, tracking: 0 },
    ],
  },
];

/* ─── Styles ─────────────────────────────────────────── */

const rowStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 0, padding: '24px 0',
  borderBottom: '1px solid var(--border-neutral-weak)',
};

const headerRow: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 0, padding: '16px 0',
  borderBottom: '1.4px solid var(--text-neutral-medium)', fontSize: 14, fontWeight: 600,
  fontFamily: 'var(--font-family)', color: 'var(--text-neutral-strong)',
};

const colName: React.CSSProperties = { width: 380, paddingRight: 24 };
const colWeight: React.CSSProperties = { width: 100, fontSize: 14, fontFamily: 'var(--font-family)' };
const colSize: React.CSSProperties = { width: 80, fontSize: 14, fontFamily: 'monospace', color: 'var(--text-neutral-moderate)' };
const colLH: React.CSSProperties = { width: 90, fontSize: 14, fontFamily: 'monospace', color: 'var(--text-neutral-moderate)' };
const colTrack: React.CSSProperties = { width: 80, fontSize: 14, fontFamily: 'monospace', color: 'var(--text-neutral-moderate)' };
const colClass: React.CSSProperties = { flex: 1, fontSize: 12, fontFamily: 'monospace', color: 'var(--text-neutral-medium)' };

function CategoryDivider({ title }: { title: string }) {
  return (
    <div style={{ padding: '28px 0 4px', fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-family)', textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-neutral-medium)' }}>
      {title}
    </div>
  );
}

/* ─── Type Scale Page ────────────────────────────────── */

function TypeScalePage() {
  return (
    <div style={{ padding: 24, background: 'var(--surface-level-1)', fontFamily: 'var(--font-family)', minWidth: 700 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, margin: 0, color: 'var(--text-neutral-strong)' }}>Typography</h2>
        <div style={{ padding: '8px 16px', background: 'var(--background-offset-2)', borderRadius: 8, fontSize: 13, color: 'var(--text-primary-strong)', fontWeight: 500 }}>
          Font: Inter Subset
        </div>
      </div>

      <div style={{ display: 'flex', gap: 24, alignItems: 'center', padding: '24px 0 40px', borderBottom: '1px solid var(--border-neutral-weak)', marginBottom: 8 }}>
        <div style={{ fontSize: 120, fontWeight: 500, color: 'var(--text-neutral-strong)', lineHeight: 1 }}>Aa</div>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-neutral-strong)', marginBottom: 12 }}>Inter Subset</div>
          <div style={{ display: 'flex', gap: 16, fontSize: 18, color: 'var(--text-neutral-strong)', marginBottom: 16 }}>
            <span style={{ fontWeight: 400 }}>Regular</span>
            <span style={{ fontWeight: 500 }}>Medium</span>
            <span style={{ fontWeight: 600 }}>Semibold</span>
            <span style={{ fontWeight: 700 }}>Bold</span>
          </div>
          <div style={{ fontSize: 16, color: 'var(--text-neutral-medium)', lineHeight: 1.8 }}>
            A B C D E F G H I J K L M N O P Q R S T U V W X Y Z<br />
            a b c d e f g h i j k l m n o p q r s t u v w x y z<br />
            0 1 2 3 4 5 6 7 8 9
          </div>
        </div>
      </div>

      <div style={headerRow}>
        <span style={colName}>Name</span>
        <span style={colWeight}>Weight</span>
        <span style={colSize}>Size</span>
        <span style={colLH}>Line height</span>
        <span style={colTrack}>Tracking</span>
        <span style={colClass}>CSS Class</span>
      </div>

      {TYPE_SCALE.map((category) => (
        <div key={category.title}>
          <CategoryDivider title={category.title} />
          {category.styles.map((s) => (
            <div key={s.className} style={rowStyle}>
              <div style={colName}>
                <span style={{
                  fontFamily: 'var(--font-family)',
                  fontSize: s.size,
                  lineHeight: `${s.lineHeight}px`,
                  fontWeight: s.weightNum,
                  letterSpacing: s.tracking,
                  color: 'var(--text-neutral-strong)',
                  display: 'block',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {s.name}
                </span>
              </div>
              <span style={{ ...colWeight, fontWeight: 600, color: 'var(--text-neutral-strong)' }}>{s.weight}</span>
              <span style={colSize}>{s.size}px</span>
              <span style={colLH}>{s.lineHeight}</span>
              <span style={colTrack}>{s.tracking}</span>
              <code style={colClass}>.{s.className}</code>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─── Specimen Page ──────────────────────────────────── */

function SpecimenPage() {
  const sampleText = 'The quick brown fox jumps over the lazy dog';
  return (
    <div style={{ padding: 24, background: 'var(--surface-level-1)', fontFamily: 'var(--font-family)', minWidth: 600 }}>
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 32px', color: 'var(--text-neutral-strong)' }}>Type Specimen</h2>

      {TYPE_SCALE.map((category) => (
        <div key={category.title} style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-neutral-medium)', marginBottom: 12, paddingBottom: 8, borderBottom: '2px solid var(--text-neutral-strong)' }}>
            {category.title}
          </div>
          {category.styles.map((s) => (
            <div key={s.className} style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '16px 0', borderBottom: '1px solid var(--surface-level-4)' }}>
              <span style={{ width: 180, fontSize: 12, fontFamily: 'monospace', color: 'var(--text-neutral-medium)', flexShrink: 0 }}>
                {s.size}/{s.lineHeight} · {s.weight}
              </span>
              <span style={{
                fontFamily: 'var(--font-family)',
                fontSize: s.size,
                lineHeight: `${s.lineHeight}px`,
                fontWeight: s.weightNum,
                color: 'var(--text-neutral-strong)',
                flex: 1,
              }}>
                {sampleText}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─── Stories ─────────────────────────────────────────── */

const meta: Meta = {
  title: 'Foundation/Typography',
  component: TypeScalePage,
  parameters: { controls: { disable: true } },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Specimen: Story = {
  render: () => <SpecimenPage />,
};
