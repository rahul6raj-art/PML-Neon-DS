# Contributing

## Platform density and shared components

Storybook can preview **Mobile**, **Tablet**, and **Web** density via scoped token injection (see `src/theme.ts`, Storybook **Introduction → Platform density**). Layout values that use **semantic CSS variables** from `src/tokens/` follow the active platform; raw **`px`** in component CSS does not.

### What this applies to

| Area | Expectation |
|------|-------------|
| **`src/components/**`** (design-system primitives and reusable widgets) | Prefer **tokens** (`--spacing-*`, `--radius-*`, `--font-size-*`, `--line-height-*`, `--card-width`, token-driven icon sizes, etc.). Avoid introducing new hardcoded **`px`** when a token exists. |
| **`src/PML App/**`, feature folders (e.g. `src/options-terminal/`), one-off marketing or product layouts | May use fixed **`px`** where the design is product-specific; still prefer tokens when the same pattern exists in the system. |
| **Artwork, logos, illustrations, pixel-perfect assets** | Fixed sizes are normal; document if they intentionally ignore platform scale. |

### Authoring rules (shared DS)

1. Prefer **`var(--…)`** from `src/tokens/` over magic **`px`** for spacing, radii, typography, and common widths.
2. **Do not** add `if (platform === …)` (or similar) inside shared components — platform lives in **`platformTokenSets`**, Storybook preview, and token derivation (`mobile.ts`, `tablet.ts`, `web.ts`).
3. Keep the **numeric source of truth** in token maps / CSS variables; extend tokens when Figma needs a new step instead of one-off pixels in many files.
4. **Legitimate `px`** in shared CSS still happens (e.g. **hairline borders** via `--border-width-hairline`, device-chrome stand-ins, third-party embeds). Prefer a **named token** when the value is part of the design language.

### PR checklist (shared `src/components/` CSS or layout)

- [ ] New spacing / radius / type / card width uses an existing **semantic variable** where possible.
- [ ] No new **platform branching** in the component.
- [ ] If **`px`** is required, it is **obviously intentional** (asset, hairline, documented exception) — not a duplicate of an available token.
- [ ] Storybook **Platform** toolbar checked for regressions on stories that cover the change (use **Side by side** to compare Mobile / Tablet / Web at once).

### Tooling note

**ESLint** runs on `*.{ts,tsx}` only; it does **not** validate `.css`. Reviews and the checklist above are the main guardrails unless we add a dedicated CSS linter later.

See also **`src/components/README.md`** (optional file header for new stylesheets).
