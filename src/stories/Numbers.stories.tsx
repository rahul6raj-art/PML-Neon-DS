import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import '../tokens/numbers.css';

/* ─── Token data ──────────────────────────────────────── */

interface PrimitiveUnit { name: string; variable: string; value: number }

const PRIMITIVE_UNITS: PrimitiveUnit[] = [
  { name: 'Unit 1',   variable: '--unit-1',   value: 2 },
  { name: 'Unit 2',   variable: '--unit-2',   value: 4 },
  { name: 'Unit 3',   variable: '--unit-3',   value: 6 },
  { name: 'Unit 4',   variable: '--unit-4',   value: 8 },
  { name: 'Unit 6',   variable: '--unit-6',   value: 12 },
  { name: 'Unit 7',   variable: '--unit-7',   value: 16 },
  { name: 'Unit 9',   variable: '--unit-9',   value: 24 },
  { name: 'Unit 10',  variable: '--unit-10',  value: 32 },
  { name: 'Unit 11',  variable: '--unit-11',  value: 48 },
  { name: 'Unit 12',  variable: '--unit-12',  value: 56 },
  { name: 'Unit 13',  variable: '--unit-13',  value: 60 },
  { name: 'Unit Max', variable: '--unit-max', value: 200 },
];

interface SemanticToken {
  name: string;
  variable: string;
  value: number | string;
  primitiveRef: string;
  note?: string;
}

interface SemanticSection { title: string; tokens: SemanticToken[] }

const SEMANTIC_SECTIONS: SemanticSection[] = [
  {
    title: 'Spacing',
    tokens: [
      { name: 'Spacing 2px',  variable: '--spacing-2',  value: 2,  primitiveRef: 'Unit 1' },
      { name: 'Spacing 4px',  variable: '--spacing-4',  value: 4,  primitiveRef: 'Unit 2' },
      { name: 'Spacing 6px',  variable: '--spacing-6',  value: 6,  primitiveRef: 'Unit 3' },
      { name: 'Spacing 8px',  variable: '--spacing-8',  value: 8,  primitiveRef: 'Unit 4' },
      { name: 'Spacing 12px', variable: '--spacing-12', value: 12, primitiveRef: 'Unit 6' },
      { name: 'Spacing 16px', variable: '--spacing-16', value: 16, primitiveRef: 'Unit 7', note: 'Card Default' },
      { name: 'Spacing 24px', variable: '--spacing-24', value: 24, primitiveRef: 'Unit 9' },
      { name: 'Spacing 32px', variable: '--spacing-32', value: 32, primitiveRef: 'Unit 10' },
      { name: 'Spacing 48px', variable: '--spacing-48', value: 48, primitiveRef: 'Unit 11' },
      { name: 'Spacing 56px', variable: '--spacing-56', value: 56, primitiveRef: 'Unit 12', note: 'Section gaps' },
      { name: 'Spacing 60px', variable: '--spacing-60', value: 60, primitiveRef: 'Unit 13' },
    ],
  },
  {
    title: 'Radius',
    tokens: [
      { name: 'Radius 4px',     variable: '--radius-4',    value: 4,   primitiveRef: 'Unit 2',  note: 'Badges' },
      { name: 'Radius 8px',     variable: '--radius-8',    value: 8,   primitiveRef: 'Unit 4' },
      { name: 'Radius 12px',    variable: '--radius-12',   value: 12,  primitiveRef: 'Unit 6' },
      { name: 'Radius 16px',    variable: '--radius-16',   value: 16,  primitiveRef: 'Unit 7' },
      { name: 'Radius 24px',    variable: '--radius-24',   value: 24,  primitiveRef: 'Unit 9',  note: 'Card Default' },
      { name: 'Fully Rounded',  variable: '--radius-full', value: 200, primitiveRef: 'Unit Max' },
    ],
  },
];

/* ─── Styles ─────────────────────────────────────────── */

const rowStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
  borderBottom: '1px solid var(--surface-level-4)',
};

const labelStyle: React.CSSProperties = { width: 160, fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-family)' };
const varStyle: React.CSSProperties = { flex: 1, fontSize: 12, fontFamily: 'monospace', color: 'var(--text-neutral-medium)' };
const valStyle: React.CSSProperties = { width: 80, fontSize: 13, fontFamily: 'monospace', textAlign: 'right' as const, fontWeight: 600 };

function SectionTitle({ children }: { children: string }) {
  return (
    <h3 style={{ fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-family)', margin: '32px 0 8px', padding: '8px 0', borderBottom: '2px solid var(--text-neutral-strong)' }}>
      {children}
    </h3>
  );
}

/* ─── Primitive Units Page ───────────────────────────── */

function PrimitiveUnits() {
  return (
    <div style={{ padding: 24, background: 'var(--surface-level-1)', fontFamily: 'var(--font-family)', minWidth: 600 }}>
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 24px' }}>Primitive Number Tokens</h2>

      <div style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--surface-level-4)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: 0.5, color: 'var(--text-neutral-medium)' }}>
        <span style={{ width: 80 }}>Visual</span>
        <span style={{ width: 160 }}>Token Name</span>
        <span style={{ flex: 1 }}>CSS Variable</span>
        <span style={{ width: 80, textAlign: 'right' as const }}>Value</span>
      </div>

      {PRIMITIVE_UNITS.map((u) => (
        <div key={u.variable} style={rowStyle}>
          <div style={{ width: 80, display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: Math.min(u.value, 80), height: 20,
              background: 'var(--text-primary-strong)', borderRadius: 2, opacity: 0.8,
              transition: 'width 0.3s ease',
            }} />
          </div>
          <span style={labelStyle}>{u.name}</span>
          <code style={varStyle}>var({u.variable})</code>
          <span style={valStyle}>{u.value}px</span>
        </div>
      ))}

      <div style={{ marginTop: 32, padding: 16, background: 'var(--background-offset-1)', borderRadius: 8, fontSize: 13, color: 'var(--text-neutral-moderate)', lineHeight: 1.6 }}>
        <strong>Scale note:</strong> Units 5 and 8 are intentionally skipped in the naming convention.
        The unit numbers do not correspond 1:1 to pixel values — they represent steps in the spacing scale.
      </div>
    </div>
  );
}

/* ─── Semantic Tokens Page ───────────────────────────── */

function SemanticTokens() {
  return (
    <div style={{ padding: 24, background: 'var(--surface-level-1)', fontFamily: 'var(--font-family)', minWidth: 600 }}>
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 24px' }}>Semantic Number Tokens</h2>

      <div style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--surface-level-4)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: 0.5, color: 'var(--text-neutral-medium)' }}>
        <span style={{ width: 80 }}>Visual</span>
        <span style={{ width: 160 }}>Token Name</span>
        <span style={{ flex: 1 }}>CSS Variable</span>
        <span style={{ width: 100 }}>Primitive</span>
        <span style={{ width: 80, textAlign: 'right' as const }}>Value</span>
      </div>

      {SEMANTIC_SECTIONS.map((section) => (
        <div key={section.title}>
          <SectionTitle>{section.title}</SectionTitle>
          {section.tokens.map((t) => {
            const isRadius = section.title === 'Radius';
            const px = typeof t.value === 'number' ? t.value : 200;
            return (
              <div key={t.variable} style={rowStyle}>
                <div style={{ width: 80, display: 'flex', alignItems: 'center', justifyContent: isRadius ? 'center' : 'flex-start' }}>
                  {isRadius ? (
                    <div style={{
                      width: 36, height: 36, border: '2px solid var(--text-primary-strong)',
                      borderRadius: px >= 200 ? '50%' : px,
                      background: 'rgba(0, 136, 255, 0.06)',
                    }} />
                  ) : (
                    <div style={{
                      width: Math.min(px, 80), height: 20,
                      background: 'var(--text-positive-strong)', borderRadius: 2, opacity: 0.8,
                    }} />
                  )}
                </div>
                <div style={{ width: 160 }}>
                  <span style={labelStyle}>{t.name}</span>
                  {t.note && (
                    <span style={{ display: 'block', fontSize: 11, color: 'var(--text-neutral-medium)', fontWeight: 400, marginTop: 2 }}>{t.note}</span>
                  )}
                </div>
                <code style={varStyle}>var({t.variable})</code>
                <span style={{ width: 100, fontSize: 12, fontFamily: 'monospace', color: 'var(--text-neutral-medium)' }}>{t.primitiveRef}</span>
                <span style={valStyle}>{t.value}px</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ─── Stories ─────────────────────────────────────────── */

const NumberTokens = () => {
  const [tab, setTab] = useState<'semantic' | 'primitive'>('semantic');

  const tabBtn = (label: string, value: typeof tab) => ({
    style: {
      padding: '8px 20px', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-family)',
      border: 'none', borderRadius: 8, cursor: 'pointer' as const,
      background: tab === value ? 'var(--text-primary-strong)' : 'var(--surface-level-4)',
      color: tab === value ? 'var(--surface-level-1)' : 'var(--text-neutral-strong)',
    } as React.CSSProperties,
    onClick: () => setTab(value),
  });

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 0 16px', borderBottom: '1px solid var(--border-neutral-medium)', marginBottom: 0 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button {...tabBtn('Semantic', 'semantic')}>Semantic</button>
          <button {...tabBtn('Primitive', 'primitive')}>Primitive</button>
        </div>
      </div>
      {tab === 'semantic' ? <SemanticTokens /> : <PrimitiveUnits />}
    </div>
  );
};

const meta: Meta = {
  title: 'Foundation/Number Tokens',
  component: NumberTokens,
  parameters: { layout: 'padded', controls: { disable: true } },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Spacing: Story = {
  render: () => <SemanticTokens />,
};

export const Primitives: Story = {
  render: () => <PrimitiveUnits />,
};
