import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const IntroductionPage = () => (
  <div style={{ maxWidth: 720, fontFamily: 'var(--font-family)', lineHeight: 1.6, color: 'var(--text-neutral-strong)' }}>
    <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 4 }}>PML Design System</h1>
    <p style={{ fontSize: 16, color: 'var(--text-neutral-medium)', marginTop: 0 }}>
      A comprehensive collection of production-ready UI components built to power consistent, accessible, and themeable interfaces.
    </p>

    <hr style={{ border: 'none', borderTop: '1px solid var(--border-neutral-medium)', margin: '24px 0' }} />

    <h2 style={{ fontSize: 22, fontWeight: 600 }}>What's Inside</h2>

    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Components</h3>
    <p style={{ margin: '0 0 12px' }}>Over <strong>35 components</strong> designed to pixel-exact specifications:</p>

    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, marginBottom: 24 }}>
      <thead>
        <tr style={{ borderBottom: '2px solid var(--border-neutral-medium)', textAlign: 'left' }}>
          <th style={{ padding: '8px 12px', fontWeight: 600 }}>Category</th>
          <th style={{ padding: '8px 12px', fontWeight: 600 }}>Components</th>
        </tr>
      </thead>
      <tbody>
        {[
          ['Actions', 'Button, Chip, Switch, Checkbox, Radio, Segmented Control'],
          ['Inputs', 'TextField, OTP TextField, Search, Dropdown'],
          ['Display', 'Badge, Avatar, Logo, Brand Logo, Card, Tile, Data Points'],
          ['Navigation', 'Header, Tab, Bottom Nav, Bottom Sheet, Bottom Sheet Header'],
          ['Feedback', 'Alert, Snackbar, Loading'],
          ['Layout', 'List Item, Section Header, Page Control, Overflow Menu'],
          ['Timeline', 'Activity Timeline'],
          ['System', 'Status Bar, Home Indicator, Keyboard'],
        ].map(([cat, items]) => (
          <tr key={cat} style={{ borderBottom: '1px solid var(--border-neutral-weak)' }}>
            <td style={{ padding: '8px 12px', fontWeight: 500 }}>{cat}</td>
            <td style={{ padding: '8px 12px', color: 'var(--text-neutral-moderate)' }}>{items}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Widgets</h3>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, marginBottom: 24 }}>
      <thead>
        <tr style={{ borderBottom: '2px solid var(--border-neutral-medium)', textAlign: 'left' }}>
          <th style={{ padding: '8px 12px', fontWeight: 600 }}>Widget</th>
          <th style={{ padding: '8px 12px', fontWeight: 600 }}>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ borderBottom: '1px solid var(--border-neutral-weak)' }}>
          <td style={{ padding: '8px 12px', fontWeight: 500 }}>Reminder Widget</td>
          <td style={{ padding: '8px 12px', color: 'var(--text-neutral-moderate)' }}>Stock reminder cards with single and carousel layouts</td>
        </tr>
      </tbody>
    </table>

    <hr style={{ border: 'none', borderTop: '1px solid var(--border-neutral-medium)', margin: '24px 0' }} />

    <h2 style={{ fontSize: 22, fontWeight: 600 }}>Design Tokens</h2>
    <p style={{ margin: '0 0 12px' }}>All components are powered by a unified <strong>token system</strong> — no hardcoded values.</p>

    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, marginBottom: 24 }}>
      <thead>
        <tr style={{ borderBottom: '2px solid var(--border-neutral-medium)', textAlign: 'left' }}>
          <th style={{ padding: '8px 12px', fontWeight: 600 }}>Token Layer</th>
          <th style={{ padding: '8px 12px', fontWeight: 600 }}>What It Covers</th>
        </tr>
      </thead>
      <tbody>
        {[
          ['Colors', 'Semantic palette — text, background, border, icon, surface tokens with light & dark mode'],
          ['Numbers', 'Spacing scale, border-radius, sizing units'],
          ['Typography', 'Font family, weight scale'],
        ].map(([layer, desc]) => (
          <tr key={layer} style={{ borderBottom: '1px solid var(--border-neutral-weak)' }}>
            <td style={{ padding: '8px 12px', fontWeight: 500 }}>{layer}</td>
            <td style={{ padding: '8px 12px', color: 'var(--text-neutral-moderate)' }}>{desc}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <hr style={{ border: 'none', borderTop: '1px solid var(--border-neutral-medium)', margin: '24px 0' }} />

    <h2 style={{ fontSize: 22, fontWeight: 600 }}>Theming</h2>
    <p>
      Every component supports <strong>light and dark modes</strong> out of the box.
      Use the <strong>sun/moon toggle</strong> in the toolbar to switch themes and see all components adapt in real time.
    </p>

    <hr style={{ border: 'none', borderTop: '1px solid var(--border-neutral-medium)', margin: '24px 0' }} />

    <h2 style={{ fontSize: 22, fontWeight: 600 }}>Getting Started</h2>
    <ol style={{ paddingLeft: 20, fontSize: 15 }}>
      <li><strong>Browse</strong> — Explore the sidebar to find a component</li>
      <li><strong>Interact</strong> — Use the Controls panel to tweak every prop</li>
      <li><strong>Theme</strong> — Toggle light/dark mode from the toolbar</li>
      <li><strong>Docs</strong> — Each component has auto-generated documentation with prop tables</li>
    </ol>

    <hr style={{ border: 'none', borderTop: '1px solid var(--border-neutral-medium)', margin: '24px 0' }} />
    <p style={{ fontSize: 13, color: 'var(--text-neutral-weak)', fontStyle: 'italic' }}>
      Built with React, Storybook, and CSS custom properties.
    </p>
  </div>
);

const meta: Meta = {
  title: 'Introduction',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    actions: { disable: true },
  },
};

export default meta;
type Story = StoryObj;

export const Welcome: Story = {
  render: () => <IntroductionPage />,
};
