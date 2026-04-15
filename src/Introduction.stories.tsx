import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { TABLET_TOKEN_SCALE } from './tokens/tablet';
import { WEB_TOKEN_SCALE } from './tokens/web';

const codeBlockStyle: CSSProperties = {
  display: 'block',
  fontSize: 'var(--font-size-subtext)',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  background: 'var(--surface-level-2)',
  padding: 'var(--spacing-12)',
  borderRadius: 'var(--radius-8)',
  overflowX: 'auto',
  margin: 'var(--spacing-8) 0',
  border: 'var(--border-width-hairline) solid var(--border-neutral-weak)',
};

const IntroductionPage = () => (
  <div
    style={{
      maxWidth: 720,
      fontFamily: 'var(--font-family)',
      lineHeight: 1.6,
      color: 'var(--text-neutral-strong)',
    }}
  >
    <h1
      style={{
        fontSize: 'var(--font-size-display-3)',
        fontWeight: 700,
        marginBottom: 'var(--spacing-4)',
      }}
    >
      PML Design System
    </h1>
    <p
      style={{
        fontSize: 'var(--font-size-title-4)',
        color: 'var(--text-neutral-medium)',
        marginTop: 0,
      }}
    >
      A comprehensive collection of production-ready UI components built to power consistent, accessible, and themeable interfaces.
    </p>

    <div
      style={{
        marginTop: 'calc(var(--spacing-16) + var(--spacing-4))',
        padding: 'var(--spacing-16) calc(var(--spacing-16) + var(--spacing-4))',
        borderRadius: 'var(--radius-12)',
        background: 'var(--background-primary-weak)',
        border: 'var(--border-width-hairline) solid var(--border-primary-weak)',
        fontSize: 'var(--font-size-body)',
      }}
    >
      <strong style={{ color: 'var(--text-primary-strong)' }}>Full app screens</strong> (Stock home, Discover, Order pad, credit card flows, etc.) are{' '}
      <strong>not</strong> in Storybook. From the repo root run{' '}
      <code
        style={{
          fontSize: 'var(--font-size-body)',
          background: 'var(--surface-level-2)',
          padding: 'var(--unit-1) var(--spacing-8)',
          borderRadius: 'var(--spacing-6)',
        }}
      >
        npm run dev
      </code>
      {' '}and open <strong>http://localhost:5173</strong> — use the <strong>left sidebar</strong> to switch screens and theme.
    </div>

    <hr
      style={{
        border: 'none',
        borderTop: 'var(--border-width-hairline) solid var(--border-neutral-medium)',
        margin: 'var(--spacing-24) 0',
      }}
    />

    <h2 style={{ fontSize: 'var(--font-size-title-1)', fontWeight: 600 }}>What's Inside</h2>

    <h3 style={{ fontSize: 'var(--font-size-title-4)', fontWeight: 600, marginBottom: 'var(--spacing-8)' }}>Components</h3>
    <p style={{ margin: '0 0 var(--spacing-12)' }}>Over <strong>35 components</strong> designed to pixel-exact specifications:</p>

    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-size-body)', marginBottom: 'var(--spacing-24)' }}>
      <thead>
        <tr style={{ borderBottom: 'var(--unit-1) solid var(--border-neutral-medium)', textAlign: 'left' }}>
          <th style={{ padding: 'var(--spacing-8) var(--spacing-12)', fontWeight: 600 }}>Category</th>
          <th style={{ padding: 'var(--spacing-8) var(--spacing-12)', fontWeight: 600 }}>Components</th>
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
          <tr key={cat} style={{ borderBottom: 'var(--border-width-hairline) solid var(--border-neutral-weak)' }}>
            <td style={{ padding: 'var(--spacing-8) var(--spacing-12)', fontWeight: 500 }}>{cat}</td>
            <td style={{ padding: 'var(--spacing-8) var(--spacing-12)', color: 'var(--text-neutral-moderate)' }}>{items}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <h3 style={{ fontSize: 'var(--font-size-title-4)', fontWeight: 600, marginBottom: 'var(--spacing-8)' }}>Widgets</h3>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-size-body)', marginBottom: 'var(--spacing-24)' }}>
      <thead>
        <tr style={{ borderBottom: 'var(--unit-1) solid var(--border-neutral-medium)', textAlign: 'left' }}>
          <th style={{ padding: 'var(--spacing-8) var(--spacing-12)', fontWeight: 600 }}>Widget</th>
          <th style={{ padding: 'var(--spacing-8) var(--spacing-12)', fontWeight: 600 }}>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ borderBottom: 'var(--border-width-hairline) solid var(--border-neutral-weak)' }}>
          <td style={{ padding: 'var(--spacing-8) var(--spacing-12)', fontWeight: 500 }}>Reminder</td>
          <td style={{ padding: 'var(--spacing-8) var(--spacing-12)', color: 'var(--text-neutral-moderate)' }}>
            Stock reminder cards with single and carousel layouts
          </td>
        </tr>
      </tbody>
    </table>

    <hr
      style={{
        border: 'none',
        borderTop: 'var(--border-width-hairline) solid var(--border-neutral-medium)',
        margin: 'var(--spacing-24) 0',
      }}
    />

    <h2 style={{ fontSize: 'var(--font-size-title-1)', fontWeight: 600 }}>Design Tokens</h2>
    <p style={{ margin: '0 0 var(--spacing-12)' }}>
      Shared components are built on a unified <strong>token system</strong> (semantic CSS variables). Prefer tokens over ad hoc pixels so layouts can follow theme and platform density.
    </p>

    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-size-body)', marginBottom: 'var(--spacing-24)' }}>
      <thead>
        <tr style={{ borderBottom: 'var(--unit-1) solid var(--border-neutral-medium)', textAlign: 'left' }}>
          <th style={{ padding: 'var(--spacing-8) var(--spacing-12)', fontWeight: 600 }}>Token Layer</th>
          <th style={{ padding: 'var(--spacing-8) var(--spacing-12)', fontWeight: 600 }}>What It Covers</th>
        </tr>
      </thead>
      <tbody>
        {[
          ['Colors', 'Semantic palette — text, background, border, icon, surface tokens with light & dark mode'],
          ['Numbers', 'Spacing scale, border-radius, sizing units'],
          ['Typography', 'Font family, weight scale'],
        ].map(([layer, desc]) => (
          <tr key={layer} style={{ borderBottom: 'var(--border-width-hairline) solid var(--border-neutral-weak)' }}>
            <td style={{ padding: 'var(--spacing-8) var(--spacing-12)', fontWeight: 500 }}>{layer}</td>
            <td style={{ padding: 'var(--spacing-8) var(--spacing-12)', color: 'var(--text-neutral-moderate)' }}>{desc}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <hr
      style={{
        border: 'none',
        borderTop: 'var(--border-width-hairline) solid var(--border-neutral-medium)',
        margin: 'var(--spacing-24) 0',
      }}
    />

    <h2 style={{ fontSize: 'var(--font-size-title-1)', fontWeight: 600 }}>Theming</h2>
    <p>
      Every component supports <strong>light and dark modes</strong> out of the box.
      Use the <strong>sun/moon toggle</strong> in the toolbar to switch themes and see all components adapt in real time.
    </p>

    <hr
      style={{
        border: 'none',
        borderTop: 'var(--border-width-hairline) solid var(--border-neutral-medium)',
        margin: 'var(--spacing-24) 0',
      }}
    />

    <h2 style={{ fontSize: 'var(--font-size-title-1)', fontWeight: 600 }}>Platform density</h2>
    <p style={{ margin: '0 0 var(--spacing-12)' }}>
      Storybook wraps the canvas in scoped CSS so you can preview how shared UI feels at different <strong>density</strong> levels.
      Use the <strong>Platform</strong> toolbar: <strong>Mobile</strong>, <strong>Tablet</strong>, or <strong>Web</strong>. Choose <strong>Side by side</strong> to render the same story in three columns with independent token scopes so differences are easy to spot.
    </p>

    <h3 style={{ fontSize: 'var(--font-size-title-4)', fontWeight: 600, marginBottom: 'var(--spacing-8)' }}>What each platform means</h3>
    <ul style={{ margin: '0 0 var(--spacing-16)', paddingLeft: 'calc(var(--spacing-16) + var(--spacing-4))', fontSize: 'var(--font-size-body)' }}>
      <li>
        <strong>Mobile</strong> — Baseline. Uses global tokens from <code>numbers.css</code> / <code>typography.css</code> on <code>:root</code>. No extra density injection.
      </li>
      <li style={{ marginTop: 'var(--spacing-8)' }}>
        <strong>Tablet</strong> — Derived set: <code>mobileTokens</code> scaled by <strong>{TABLET_TOKEN_SCALE}</strong> (arithmetic midpoint between 1 and web:{' '}
        <code>(1 + {WEB_TOKEN_SCALE}) / 2</code>), then merged with optional overrides in <code>src/tokens/tablet.ts</code>.
      </li>
      <li style={{ marginTop: 'var(--spacing-8)' }}>
        <strong>Web</strong> — Denser desktop preview: <code>mobileTokens</code> scaled by <strong>{WEB_TOKEN_SCALE}</strong>, overrides in{' '}
        <code>src/tokens/web.ts</code>.
      </li>
    </ul>

    <h3 style={{ fontSize: 'var(--font-size-title-4)', fontWeight: 600, marginBottom: 'var(--spacing-8)' }}>What scales automatically</h3>
    <p style={{ margin: '0 0 var(--spacing-8)' }}>
      For <strong>Tablet</strong> and <strong>Web</strong>, the preview injects a scoped block on <code>.sb-platform-scope</code> (see <code>PlatformThemeProvider</code> in{' '}
      <code>src/theme.ts</code>): primitive units, semantic spacing/radius chains, layout literals (e.g. card widths), and typography sizes/line-heights from the token object.
      Components that use variables such as <code>var(--spacing-16)</code>, <code>var(--radius-8)</code>, <code>var(--font-size-body)</code>, <code>var(--card-width)</code>, and token-driven
      icon wrappers in CSS pick up the new values without code changes.
    </p>

    <h3 style={{ fontSize: 'var(--font-size-title-4)', fontWeight: 600, marginBottom: 'var(--spacing-8)' }}>What does not scale automatically</h3>
    <ul style={{ margin: '0 0 var(--spacing-16)', paddingLeft: 'calc(var(--spacing-16) + var(--spacing-4))', fontSize: 'var(--font-size-body)' }}>
      <li>Product-specific screens and one-off layouts (e.g. marketing frames, bespoke grids).</li>
      <li>Fixed SVG artwork, illustrations, or pixel-perfect decorative assets tied to a single size.</li>
      <li>Raw <code>px</code> in CSS or inline styles (including story demos) — they stay the same at every platform.</li>
      <li>Light/dark <strong>color</strong> mode (use the Theme toggle); platform density is separate from color tokens.</li>
    </ul>

    <p style={{ fontSize: 'var(--font-size-subtext)', color: 'var(--text-neutral-moderate)', marginBottom: 'var(--spacing-16)' }}>
      <strong>Rounding:</strong> scaled numbers use <code>Math.round</code>. Small steps can collide (e.g. tablet and web may both resolve to the same px for a tiny spacing step).
    </p>

    <h3 style={{ fontSize: 'var(--font-size-title-4)', fontWeight: 600, marginBottom: 'var(--spacing-8)' }}>Authoring guidance</h3>
    <ul style={{ margin: '0 0 var(--spacing-12)', paddingLeft: 'calc(var(--spacing-16) + var(--spacing-4))', fontSize: 'var(--font-size-body)' }}>
      <li>Prefer semantic CSS variables from <code>src/tokens/</code> (<code>--spacing-*</code>, <code>--radius-*</code>, <code>--font-size-*</code>, <code>--line-height-*</code>, etc.).</li>
      <li>Avoid hardcoded <code>px</code> in shared components when a token exists.</li>
      <li>Keep platform branching out of components — register new densities in <code>platformTokenSets</code> + Storybook toolbar, not inside each widget.</li>
      <li>Centralize numeric source of truth in <code>mobile.ts</code>; derive tablet/web (and future) sets with <code>scaleTokens</code> + optional overrides.</li>
    </ul>

    <p style={{ margin: '0 0 var(--spacing-4)', fontWeight: 600, fontSize: 'var(--font-size-body)' }}>Bad vs good (CSS)</p>
    <pre style={codeBlockStyle}>{`/* Bad — fixed px, ignores platform */
.teaser { padding: 16px; gap: 12px; border-radius: 8px; }

/* Good — tokens track Mobile / Tablet / Web */
.teaser {
  padding: var(--spacing-16);
  gap: var(--spacing-12);
  border-radius: var(--radius-8);
}`}</pre>

    <h3 style={{ fontSize: 'var(--font-size-title-4)', fontWeight: 600, margin: 'var(--spacing-16) 0 var(--spacing-8)' }}>
      Contributor checklist (shared <code>src/components/</code>)
    </h3>
    <ul style={{ margin: '0 0 var(--spacing-12)', paddingLeft: 'calc(var(--spacing-16) + var(--spacing-4))', fontSize: 'var(--font-size-body)' }}>
      <li>
        <strong>Shared DS</strong> — avoid new hardcoded <code>px</code> when a semantic token exists (<code>--spacing-*</code>, <code>--radius-*</code>, <code>--font-size-*</code>,{' '}
        <code>--line-height-*</code>, token-driven sizes). Keep platform logic out of components; use <code>platformTokenSets</code> / theme infrastructure.
      </li>
      <li>
        <strong>Product / screens / artwork</strong> — fixed <code>px</code> may be fine for one-off layouts, marketing frames, or assets; prefer tokens when matching DS rhythm.
      </li>
      <li>
        <strong>Repo docs</strong> — full PR checklist and tooling notes: <code>CONTRIBUTING.md</code>; optional CSS file header: <code>src/components/README.md</code>.
      </li>
    </ul>

    <hr
      style={{
        border: 'none',
        borderTop: 'var(--border-width-hairline) solid var(--border-neutral-medium)',
        margin: 'var(--spacing-24) 0',
      }}
    />

    <h2 style={{ fontSize: 'var(--font-size-title-1)', fontWeight: 600 }}>Getting Started</h2>
    <ol style={{ paddingLeft: 'calc(var(--spacing-16) + var(--spacing-4))', fontSize: 'var(--font-size-body)' }}>
      <li>
        <strong>Browse</strong> — Explore the sidebar to find a component
      </li>
      <li>
        <strong>Interact</strong> — Use the Controls panel to tweak every prop
      </li>
      <li>
        <strong>Theme</strong> — Toggle light/dark mode from the toolbar
      </li>
      <li>
        <strong>Platform</strong> — Toggle Mobile / Tablet / Web, or <strong>Side by side</strong> for three columns on the canvas
      </li>
      <li>
        <strong>Docs</strong> — Each component has auto-generated documentation with prop tables
      </li>
    </ol>

    <hr
      style={{
        border: 'none',
        borderTop: 'var(--border-width-hairline) solid var(--border-neutral-medium)',
        margin: 'var(--spacing-24) 0',
      }}
    />
    <p
      style={{
        fontSize: 'calc((var(--font-size-subtext) + var(--font-size-body)) / 2)',
        color: 'var(--text-neutral-weak)',
        fontStyle: 'italic',
      }}
    >
      Built with React, Storybook, and CSS custom properties.
    </p>
  </div>
);

const meta: Meta = {
  title: 'Introduction',
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
};

export default meta;
type Story = StoryObj;

export const Welcome: Story = {
  render: () => <IntroductionPage />,
};
