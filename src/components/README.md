# `src/components` — design system

Reusable UI for Storybook and app shells. **Platform density** (Mobile / Tablet / Web) only affects declarations that read **token-backed CSS variables** — not raw `px`.

## Conventions

- Use **`src/tokens/`** semantics: `--spacing-*`, `--radius-*`, `--font-size-*`, `--line-height-*`, widths like `--card-width`, colors `--surface-*` / `--text-*`, etc.
- Do **not** encode platform selection inside a component; use centralized **`platformTokenSets`** / theme injection (see repo **`CONTRIBUTING.md`**).
- **Product screens** under `src/PML App/` (and similar) may keep fixed layout values where appropriate; this folder should stay **token-friendly** by default.

## Optional header for new `*.css` files

Copy at the top of a new stylesheet as a reminder for reviewers:

```css
/*
 * Shared DS component — prefer tokens (--spacing-*, --radius-*, --font-size-*, …)
 * over raw px so Mobile / Tablet / Web density stays consistent.
 * CONTRIBUTING.md — platform density & PR checklist.
 */
```
