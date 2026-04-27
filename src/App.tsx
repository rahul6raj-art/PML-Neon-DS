/**
 * Vite entry root: there is no bundled product shell here — the design system lives in Storybook.
 * This screen avoids a confusing blank tab when running `npm run dev`.
 */
function App() {
  return (
    <div
      style={{
        boxSizing: 'border-box',
        minHeight: '100vh',
        padding: 'var(--spacing-24)',
        fontFamily: 'var(--font-family)',
        color: 'var(--text-neutral-strong)',
        background: 'var(--surface-level-4)',
        lineHeight: 1.5,
      }}
    >
      <h1 style={{ fontSize: 'var(--font-size-title-3)', margin: '0 0 var(--spacing-16)' }}>
        PML — Vite dev server
      </h1>
      <p style={{ margin: '0 0 var(--spacing-12)', color: 'var(--text-neutral-moderate)' }}>
        This app entry does not render product screens. Open the component library instead:
      </p>
      <code
        style={{
          display: 'block',
          padding: 'var(--spacing-12) var(--spacing-16)',
          borderRadius: 'var(--radius-8)',
          background: 'var(--surface-level-2)',
          border: 'var(--border-width-hairline) solid var(--border-neutral-weak)',
          fontSize: 'var(--font-size-body)',
        }}
      >
        npm run storybook
      </code>
    </div>
  );
}

export default App;
