import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import '../tokens/colors.css';

/* ─── Token data ──────────────────────────────────────── */

interface Token { name: string; variable: string; light: string; dark: string }
interface Section { title: string; tokens: Token[] }

const SEMANTIC_SECTIONS: Section[] = [
  {
    title: 'Background',
    tokens: [
      { name: 'Offset 1',         variable: '--background-offset-1',         light: '#F5F8FA', dark: '#262B30' },
      { name: 'Offset 2',         variable: '--background-offset-2',         light: '#ECF2F8', dark: '#2A3540' },
      { name: 'Offset 3',         variable: '--background-offset-3',         light: '#D8E7F7', dark: '#324252' },
      { name: 'Primary Strong',   variable: '--background-primary-strong',   light: '#0088FF', dark: '#2CB1FE' },
      { name: 'Primary Weak',     variable: '--background-primary-weak',     light: '#D9EDFF', dark: '#0F303D' },
      { name: 'Positive Strong',  variable: '--background-positive-strong',  light: '#34A34D', dark: '#47FF8E' },
      { name: 'Positive Weak',    variable: '--background-positive-weak',    light: '#E1F1E4', dark: '#1D3928' },
      { name: 'Notice Strong',    variable: '--background-notice-strong',    light: '#FF8D28', dark: '#FF9D45' },
      { name: 'Notice Weak',      variable: '--background-notice-weak',      light: '#FFEEDF', dark: '#45311F' },
      { name: 'Negative Strong',  variable: '--background-negative-strong',  light: '#D12E20', dark: '#EA3424' },
      { name: 'Negative Weak',    variable: '--background-negative-weak',    light: '#F8E0DE', dark: '#361B18' },
      { name: 'Neutral Strong',   variable: '--background-neutral-strong',   light: '#101010', dark: '#FFFFFF' },
      { name: 'Neutral Medium',   variable: '--background-neutral-medium',   light: '#7E7E7E', dark: '#8B8C8C' },
      { name: 'Neutral Weak',     variable: '--background-neutral-weak',     light: '#EBECEE', dark: '#282828' },
      { name: 'Neutral Inverse',  variable: '--background-neutral-inverse',  light: '#FFFFFF', dark: '#101010' },
    ],
  },
  {
    title: 'Text',
    tokens: [
      { name: 'Neutral Strong',   variable: '--text-neutral-strong',    light: '#282828', dark: '#FFFFFF' },
      { name: 'Neutral Moderate',  variable: '--text-neutral-moderate',  light: '#414244', dark: '#EBECEE' },
      { name: 'Neutral Medium',    variable: '--text-neutral-medium',    light: '#7E7E7E', dark: '#8B8C8C' },
      { name: 'Neutral Weak',      variable: '--text-neutral-weak',      light: '#CACACA', dark: '#414244' },
      { name: 'Neutral Inverse',   variable: '--text-neutral-inverse',   light: '#FFFFFF', dark: '#282828' },
      { name: 'Primary Strong',    variable: '--text-primary-strong',    light: '#0088FF', dark: '#2CB1FE' },
      { name: 'Positive Strong',   variable: '--text-positive-strong',   light: '#34A34D', dark: '#47FF8E' },
      { name: 'Notice Strong',     variable: '--text-notice-strong',     light: '#FF8D28', dark: '#FF9D45' },
      { name: 'Negative Strong',   variable: '--text-negative-strong',   light: '#D12E20', dark: '#EA3424' },
      { name: 'Universal Light',   variable: '--text-universal-light',   light: '#FFFFFF', dark: '#FFFFFF' },
      { name: 'Universal Dark',    variable: '--text-universal-dark',    light: '#282828', dark: '#282828' },
    ],
  },
  {
    title: 'Icon',
    tokens: [
      { name: 'Neutral Strong',   variable: '--icon-neutral-strong',    light: '#282828', dark: '#FFFFFF' },
      { name: 'Neutral Moderate',  variable: '--icon-neutral-moderate',  light: '#414244', dark: '#EBECEE' },
      { name: 'Neutral Medium',    variable: '--icon-neutral-medium',    light: '#7E7E7E', dark: '#8B8C8C' },
      { name: 'Neutral Weak',      variable: '--icon-neutral-weak',      light: '#CACACA', dark: '#414244' },
      { name: 'Neutral Inverse',   variable: '--icon-neutral-inverse',   light: '#FFFFFF', dark: '#282828' },
      { name: 'Primary Strong',    variable: '--icon-primary-strong',    light: '#0088FF', dark: '#2CB1FE' },
      { name: 'Positive Strong',   variable: '--icon-positive-strong',   light: '#34A34D', dark: '#47FF8E' },
      { name: 'Notice Strong',     variable: '--icon-notice-strong',     light: '#FF8D28', dark: '#FF9D45' },
      { name: 'Negative Strong',   variable: '--icon-negative-strong',   light: '#D12E20', dark: '#EA3424' },
      { name: 'Universal Light',   variable: '--icon-universal-light',   light: '#FFFFFF', dark: '#FFFFFF' },
      { name: 'Universal Dark',    variable: '--icon-universal-dark',    light: '#282828', dark: '#282828' },
    ],
  },
  {
    title: 'Border',
    tokens: [
      { name: 'Neutral Strong',   variable: '--border-neutral-strong',    light: '#101010', dark: '#FFFFFF' },
      { name: 'Neutral Moderate',  variable: '--border-neutral-moderate',  light: '#7E7E7E', dark: '#CACACA' },
      { name: 'Neutral Medium',    variable: '--border-neutral-medium',    light: '#E0E0E0', dark: '#414244' },
      { name: 'Neutral Weak',      variable: '--border-neutral-weak',      light: '#EBECEE', dark: '#282828' },
      { name: 'Neutral Inverse',   variable: '--border-neutral-inverse',   light: '#FFFFFF', dark: '#101010' },
      { name: 'Primary Strong',    variable: '--border-primary-strong',    light: '#0088FF', dark: '#2CB1FE' },
      { name: 'Primary Weak',      variable: '--border-primary-weak',      light: '#D9EDFF', dark: '#0F303D' },
      { name: 'Positive Strong',   variable: '--border-positive-strong',   light: '#34A34D', dark: '#47FF8E' },
      { name: 'Positive Weak',     variable: '--border-positive-weak',     light: '#E1F1E4', dark: '#1D3928' },
      { name: 'Notice Strong',     variable: '--border-notice-strong',     light: '#FF8D28', dark: '#FF9D45' },
      { name: 'Notice Weak',       variable: '--border-notice-weak',       light: '#FFEEDF', dark: '#45311F' },
      { name: 'Negative Strong',   variable: '--border-negative-strong',   light: '#D12E20', dark: '#EA3424' },
      { name: 'Negative Weak',     variable: '--border-negative-weak',     light: '#F8E0DE', dark: '#361B18' },
    ],
  },
  {
    title: 'Overlay',
    tokens: [
      { name: 'Strong', variable: '--overlay-strong', light: 'rgba(16,16,16,0.70)', dark: 'rgba(16,16,16,0.89)' },
      { name: 'Weak',   variable: '--overlay-weak',   light: 'rgba(16,16,16,0.13)', dark: 'rgba(16,16,16,0.39)' },
    ],
  },
  {
    title: 'Surface',
    tokens: [
      { name: 'Level 1', variable: '--surface-level-1', light: '#FFFFFF', dark: '#161616' },
      { name: 'Level 2', variable: '--surface-level-2', light: '#FDFDFD', dark: '#101010' },
      { name: 'Level 3', variable: '--surface-level-3', light: '#FAFAFA', dark: '#1B1B1B' },
      { name: 'Level 4', variable: '--surface-level-4', light: '#F5F5F5', dark: '#101010' },
    ],
  },
  {
    title: 'Colours',
    tokens: [
      { name: 'Red Strong',         variable: '--colour-red-strong',         light: '#E85168', dark: '#EB6F82' },
      { name: 'Red Medium',          variable: '--colour-red-medium',          light: '#F197A4', dark: '#F3A9B4' },
      { name: 'Red Weak',            variable: '--colour-red-weak',            light: '#FFAED5', dark: '#FFCEE6' },
      { name: 'Orange',              variable: '--colour-orange',              light: '#FF8D28', dark: '#FF8D28' },
      { name: 'Orange Weak',         variable: '--colour-orange-weak',         light: '#F18C33', dark: '#FFA24F' },
      { name: 'Yellow Strong',       variable: '--colour-yellow-strong',       light: '#FFEB12', dark: '#FFEF45' },
      { name: 'Yellow Medium',       variable: '--colour-yellow-medium',       light: '#FFF371', dark: '#FFF58F' },
      { name: 'Yellow Weak',         variable: '--colour-yellow-weak',         light: '#FFF2CC', dark: '#40330C' },
      { name: 'Green',               variable: '--colour-green',               light: '#34A34D', dark: '#34A34D' },
      { name: 'Lime Green Strong',   variable: '--colour-lime-green-strong',   light: '#ACE851', dark: '#CDFF82' },
      { name: 'Lime Green Medium',   variable: '--colour-lime-green-medium',   light: '#CDF197', dark: '#E1FFB4' },
      { name: 'Lime Green Weak',     variable: '--colour-lime-green-weak',     light: '#ECFFB7', dark: '#F4FFD4' },
      { name: 'Mint',                variable: '--colour-mint',                light: '#85C894', dark: '#91FFBB' },
      { name: 'Teal',                variable: '--colour-teal',                light: '#00C3D0', dark: '#00C3D0' },
      { name: 'Cyan',                variable: '--colour-cyan',                light: '#00C0E8', dark: '#3CD3FE' },
      { name: 'Blue',                variable: '--colour-blue',                light: '#3C3CFF', dark: '#3D5DFF' },
      { name: 'Indigo',              variable: '--colour-indigo',              light: '#6155F5', dark: '#6155F5' },
      { name: 'Purple',              variable: '--colour-purple',              light: '#CB30E0', dark: '#CB30E0' },
      { name: 'Pink',                variable: '--colour-pink',                light: '#FF6784', dark: '#FF2D55' },
      { name: 'Brown',               variable: '--colour-brown',               light: '#AC7F5E', dark: '#AC7F5E' },
    ],
  },
  {
    title: 'Brand',
    tokens: [
      { name: 'Brand Blue',      variable: '--brand-blue',      light: '#00B8F5', dark: '#00B8F5' },
      { name: 'Brand Dark Blue',  variable: '--brand-dark-blue',  light: '#012A72', dark: '#FFFFFF' },
      { name: 'Brand White',      variable: '--brand-white',      light: '#FFFFFF', dark: '#012A72' },
    ],
  },
  {
    title: 'Glass',
    tokens: [
      { name: 'Tinted L1', variable: '--glass-tinted-l1', light: 'rgba(16,16,16,0.60)',    dark: 'rgba(255,255,255,0.60)' },
      { name: 'Tinted L2', variable: '--glass-tinted-l2', light: 'rgba(16,16,16,0.40)',    dark: 'rgba(255,255,255,0.40)' },
      { name: 'Tinted L3', variable: '--glass-tinted-l3', light: 'rgba(16,16,16,0.20)',    dark: 'rgba(255,255,255,0.20)' },
      { name: 'Tinted L4', variable: '--glass-tinted-l4', light: 'rgba(16,16,16,0.15)',    dark: 'rgba(255,255,255,0.15)' },
      { name: 'Tinted L5', variable: '--glass-tinted-l5', light: 'rgba(16,16,16,0.10)',    dark: 'rgba(255,255,255,0.10)' },
      { name: 'Clear L1',  variable: '--glass-clear-l1',  light: 'rgba(255,255,255,0)',     dark: 'rgba(16,16,16,0)' },
      { name: 'Clear L2',  variable: '--glass-clear-l2',  light: 'rgba(255,255,255,0.04)', dark: 'rgba(16,16,16,0.04)' },
      { name: 'Clear L3',  variable: '--glass-clear-l3',  light: 'rgba(255,255,255,0.08)', dark: 'rgba(16,16,16,0.08)' },
    ],
  },
];

interface PrimitiveToken { name: string; hex: string }
interface PrimitiveSection { title: string; tokens: PrimitiveToken[] }

const PRIMITIVE_SECTIONS: PrimitiveSection[] = [
  {
    title: 'Actions',
    tokens: [
      { name: 'Primary',          hex: '#0088FF' },
      { name: 'Primary Alt Light', hex: '#2CB1FE' },
      { name: 'Primary Alt Dark',  hex: '#1561B1' },
      { name: 'Positive',          hex: '#34A34D' },
      { name: 'Positive Dark',     hex: '#47FF8E' },
      { name: 'Notice',            hex: '#FF8D28' },
      { name: 'Notice Dark',       hex: '#FF9D45' },
      { name: 'Negative',          hex: '#D12E20' },
      { name: 'Negative Dark',     hex: '#EA3424' },
    ],
  },
  {
    title: 'Mono',
    tokens: [
      { name: '900', hex: '#101010' }, { name: '890', hex: '#1B1B1B' },
      { name: '880', hex: '#161616' }, { name: '875', hex: '#202020' },
      { name: '860', hex: '#282828' }, { name: '850', hex: '#303030' },
      { name: '800', hex: '#414244' }, { name: '700', hex: '#606163' },
      { name: '600', hex: '#7E7E7E' }, { name: '550', hex: '#8B8C8C' },
      { name: '450', hex: '#BFBFBF' }, { name: '400', hex: '#CACACA' },
      { name: '200', hex: '#E0E0E0' }, { name: '175', hex: '#EBECEE' },
      { name: '100', hex: '#F5F5F5' }, { name: '90',  hex: '#FAFAFA' },
      { name: '75',  hex: '#FDFDFD' }, { name: '50',  hex: '#FFFFFF' },
    ],
  },
  {
    title: 'Blue Offsets',
    tokens: [
      { name: 'Blue 100', hex: '#F5F8FA' }, { name: 'Blue 150', hex: '#ECF2F8' },
      { name: 'Blue 200', hex: '#D8E7F7' }, { name: 'Blue 800', hex: '#324252' },
      { name: 'Blue 850', hex: '#2A3540' }, { name: 'Blue 890', hex: '#262B30' },
    ],
  },
  {
    title: 'Action Offsets',
    tokens: [
      { name: 'Primary Tint',  hex: '#D9EDFF' }, { name: 'Primary Shade',  hex: '#0F303D' },
      { name: 'Positive Tint',  hex: '#E1F1E4' }, { name: 'Positive Shade',  hex: '#1D3928' },
      { name: 'Notice Tint',    hex: '#FFEEDF' }, { name: 'Notice Shade',    hex: '#45311F' },
      { name: 'Negative Tint',  hex: '#F8E0DE' }, { name: 'Negative Shade',  hex: '#361B18' },
      { name: 'Yellow Tint',    hex: '#FFF2CC' }, { name: 'Yellow Shade',    hex: '#40330C' },
    ],
  },
  {
    title: 'Grey Offsets',
    tokens: [
      { name: 'Pearl 50',  hex: '#FAFAFA' }, { name: 'Pearl 100', hex: '#F5F0F0' },
      { name: 'Pearl 200', hex: '#E8E1E1' }, { name: 'Pearl 800', hex: '#3B3535' },
      { name: 'Pearl 850', hex: '#302C2C' }, { name: 'Pearl 900', hex: '#181616' },
    ],
  },
  {
    title: 'Colours',
    tokens: [
      { name: 'Red',                hex: '#EB5D2A' }, { name: 'Red Strong',      hex: '#E85168' },
      { name: 'Red Strong Dark',    hex: '#EB6F82' }, { name: 'Red Medium',       hex: '#F197A4' },
      { name: 'Red Medium Dark',    hex: '#F3A9B4' }, { name: 'Red Weak',         hex: '#FFAED5' },
      { name: 'Red Weak Dark',      hex: '#FFCEE6' }, { name: 'Orange',           hex: '#FF8D28' },
      { name: 'Orange Weak',        hex: '#F18C33' }, { name: 'Orange Weak Dark', hex: '#FFA24F' },
      { name: 'Yellow Strong',      hex: '#FFEB12' }, { name: 'Yellow Strong Dark', hex: '#FFEF45' },
      { name: 'Yellow Medium',      hex: '#FFF371' }, { name: 'Yellow Medium Dark', hex: '#FFF58F' },
      { name: 'Green',              hex: '#34A34D' }, { name: 'Lime Green Strong', hex: '#ACE851' },
      { name: 'Lime Green Strong Dark', hex: '#CDFF82' }, { name: 'Lime Green Medium', hex: '#CDF197' },
      { name: 'Lime Green Medium Dark', hex: '#E1FFB4' }, { name: 'Lime Green Weak', hex: '#ECFFB7' },
      { name: 'Lime Green Weak Dark', hex: '#F4FFD4' }, { name: 'Mint', hex: '#85C894' },
      { name: 'Mint Dark', hex: '#91FFBB' }, { name: 'Teal', hex: '#00C3D0' },
      { name: 'Cyan', hex: '#00C0E8' }, { name: 'Cyan Dark', hex: '#3CD3FE' },
      { name: 'Blue', hex: '#3C3CFF' },
      { name: 'Blue Dark', hex: '#3D5DFF' }, { name: 'Indigo', hex: '#6155F5' },
      { name: 'Purple', hex: '#CB30E0' }, { name: 'Pink', hex: '#FF6784' },
      { name: 'Pink Alt', hex: '#FF2D55' }, { name: 'Brown', hex: '#AC7F5E' },
    ],
  },
  {
    title: 'Brand',
    tokens: [
      { name: 'Brand Blue',      hex: '#00B8F5' },
      { name: 'Brand Dark Blue', hex: '#012A72' },
      { name: 'Brand White',     hex: '#FFFFFF' },
    ],
  },
  {
    title: 'Overlays',
    tokens: [
      { name: '800 (89%)', hex: 'rgba(16,16,16,0.89)' },
      { name: '600 (70%)', hex: 'rgba(16,16,16,0.70)' },
      { name: '400 (39%)', hex: 'rgba(16,16,16,0.39)' },
      { name: '200 (13%)', hex: 'rgba(16,16,16,0.13)' },
    ],
  },
  {
    title: 'Materials',
    tokens: [
      { name: 'FF 100', hex: '#FFFFFF' },
      { name: 'FF 80',  hex: 'rgba(255,255,255,0.80)' },
      { name: 'FF 60',  hex: 'rgba(255,255,255,0.60)' },
      { name: 'FF 40',  hex: 'rgba(255,255,255,0.40)' },
      { name: 'FF 20',  hex: 'rgba(255,255,255,0.20)' },
      { name: 'FF 15',  hex: 'rgba(255,255,255,0.15)' },
      { name: 'FF 10',  hex: 'rgba(255,255,255,0.10)' },
      { name: '10 100', hex: '#101010' },
      { name: '10 80',  hex: 'rgba(16,16,16,0.80)' },
      { name: '10 60',  hex: 'rgba(16,16,16,0.60)' },
      { name: '10 40',  hex: 'rgba(16,16,16,0.40)' },
      { name: '10 20',  hex: 'rgba(16,16,16,0.20)' },
      { name: '10 15',  hex: 'rgba(16,16,16,0.15)' },
      { name: '10 10',  hex: 'rgba(16,16,16,0.10)' },
    ],
  },
];

/* ─── Swatch components ───────────────────────────────── */

const swatchStyle: React.CSSProperties = {
  width: 48, height: 48, borderRadius: 8, flexShrink: 0,
  border: '1px solid rgba(0,0,0,0.08)',
};

const rowStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0',
  borderBottom: '1px solid var(--surface-level-4)',
};

const labelStyle: React.CSSProperties = { width: 180, fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-family)' };
const varStyle: React.CSSProperties = { flex: 1, fontSize: 12, fontFamily: 'monospace', color: 'var(--text-neutral-medium)' };
const hexStyle: React.CSSProperties = { width: 180, fontSize: 12, fontFamily: 'monospace', textAlign: 'right' as const };

function SectionTitle({ children }: { children: string }) {
  return (
    <h3 style={{ fontSize: 16, fontWeight: 600, fontFamily: 'var(--font-family)', margin: '32px 0 8px', padding: '8px 0', borderBottom: '2px solid var(--text-neutral-strong)' }}>
      {children}
    </h3>
  );
}

/* ─── Semantic Color Page ─────────────────────────────── */

function SemanticColors({ mode }: { mode: 'light' | 'dark' }) {
  const bg = mode === 'dark' ? '#161616' : 'var(--surface-level-1)';
  const fg = mode === 'dark' ? 'var(--surface-level-1)' : 'var(--text-neutral-strong)';
  const border = mode === 'dark' ? '#303030' : 'var(--surface-level-4)';

  return (
    <div style={{ padding: 24, background: bg, color: fg, fontFamily: 'var(--font-family)', minWidth: 600 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Semantic Colour Tokens</h2>
        <span style={{ fontSize: 13, padding: '4px 12px', borderRadius: 20, background: mode === 'dark' ? 'var(--background-neutral-weak)' : 'var(--surface-level-4)', fontWeight: 500 }}>
          {mode === 'light' ? 'Light Mode' : 'Dark Mode'}
        </span>
      </div>

      <div style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: `1px solid ${border}`, fontSize: 11, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: 0.5, color: 'var(--text-neutral-medium)' }}>
        <span style={{ width: 48 }}>Swatch</span>
        <span style={{ width: 180 }}>Token Name</span>
        <span style={{ flex: 1 }}>CSS Variable</span>
        <span style={{ width: 180, textAlign: 'right' as const }}>Hex / Value</span>
      </div>

      {SEMANTIC_SECTIONS.map((section) => (
        <div key={section.title}>
          <SectionTitle>{section.title}</SectionTitle>
          {section.tokens.map((t) => {
            const color = mode === 'dark' ? t.dark : t.light;
            return (
              <div key={t.variable} style={{ ...rowStyle, borderColor: border }}>
                <div style={{ ...swatchStyle, background: color }} />
                <span style={labelStyle}>{t.name}</span>
                <code style={varStyle}>var({t.variable})</code>
                <span style={hexStyle}>{color}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ─── Primitive Color Page ────────────────────────────── */

function PrimitiveColors() {
  return (
    <div style={{ padding: 24, background: 'var(--surface-level-1)', fontFamily: 'var(--font-family)', minWidth: 600 }}>
      <h2 style={{ fontSize: 22, fontWeight: 600, margin: '0 0 24px' }}>Primitive Colour Tokens</h2>

      <div style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--surface-level-4)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: 0.5, color: 'var(--text-neutral-medium)' }}>
        <span style={{ width: 48 }}>Swatch</span>
        <span style={{ width: 200 }}>Token Name</span>
        <span style={{ flex: 1 }}>Value</span>
      </div>

      {PRIMITIVE_SECTIONS.map((section) => (
        <div key={section.title}>
          <SectionTitle>{section.title}</SectionTitle>
          {section.tokens.map((t, i) => (
            <div key={`${section.title}-${i}`} style={rowStyle}>
              <div style={{ ...swatchStyle, background: t.hex }} />
              <span style={{ ...labelStyle, width: 200 }}>{t.name}</span>
              <code style={{ ...varStyle, color: 'var(--text-neutral-moderate)' }}>{t.hex}</code>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─── Stories ─────────────────────────────────────────── */

const ColorTokens = () => {
  const [tab, setTab] = useState<'semantic' | 'primitive'>('semantic');
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const tabBtn = (label: string, value: typeof tab) => ({
    style: {
      padding: '8px 20px', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-family)',
      border: 'none', borderRadius: 8, cursor: 'pointer' as const,
      background: tab === value ? 'var(--text-primary-strong)' : 'var(--surface-level-4)',
      color: tab === value ? 'var(--surface-level-1)' : 'var(--text-neutral-strong)',
    } as React.CSSProperties,
    onClick: () => setTab(value),
  });

  const modeBtn = (label: string, value: typeof mode) => ({
    style: {
      padding: '6px 16px', fontSize: 12, fontWeight: 500, fontFamily: 'var(--font-family)',
      border: `1px solid ${mode === value ? 'var(--text-primary-strong)' : 'var(--border-neutral-medium)'}`, borderRadius: 6, cursor: 'pointer' as const,
      background: mode === value ? '#D9EDFF' : 'transparent',
      color: mode === value ? 'var(--text-primary-strong)' : 'var(--text-neutral-medium)',
    } as React.CSSProperties,
    onClick: () => setMode(value),
  });

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0 16px', borderBottom: '1px solid var(--border-neutral-medium)', marginBottom: 0 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button {...tabBtn('Semantic', 'semantic')}>Semantic</button>
          <button {...tabBtn('Primitive', 'primitive')}>Primitive</button>
        </div>
        {tab === 'semantic' && (
          <div style={{ display: 'flex', gap: 6 }}>
            <button {...modeBtn('Light', 'light')}>Light</button>
            <button {...modeBtn('Dark', 'dark')}>Dark</button>
          </div>
        )}
      </div>
      {tab === 'semantic' ? <SemanticColors mode={mode} /> : <PrimitiveColors />}
    </div>
  );
};

const meta: Meta = {
  title: 'Foundation/Color Tokens',
  component: ColorTokens,
  parameters: { controls: { disable: true } },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const SemanticLight: Story = {
  render: () => <SemanticColors mode="light" />,
};

export const SemanticDark: Story = {
  render: () => <SemanticColors mode="dark" />,
};

export const Primitives: Story = {
  render: () => <PrimitiveColors />,
};
