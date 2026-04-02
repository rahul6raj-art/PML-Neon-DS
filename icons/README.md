# Icons (SVG assets for React)

**Shared design system library** — lives at repo root. Use when icons match the Figma file or as sensible fallbacks for AI-generated designs (see `.cursor/vertical-setup.md` §Icons).

SVG exports from the design system Figma library, for use in React (e.g. inline SVGs or a small icon component with `currentColor`).

- **`svg/glyphs/`** — Single-color glyph icons (24×24). Use `currentColor` for fill in React.

## Two styles per glyph

Most glyphs have **two variants** in Figma (Fill = False/True). Both are exported:

| Style    | Suffix           | Use case |
|----------|------------------|----------|
| Outlined | `*_outline.svg`  | Default state, navigation, secondary actions |
| Filled   | `*_filled.svg`   | Active/selected state, emphasis |

- **151 icons** have both variants → you get `name_outline.svg` and `name_filled.svg`.
- **43 icons** are single-style (carets, checkmark, plus, etc.) → one file `name.svg`.

Naming base from `.cursor/rules/pods3/icons/glyphs.mdc` (e.g. `arrow_up_outline.svg`, `arrow_up_filled.svg`, `plus.svg`).  
Source: Paytm Design System — Icons v3 (Figma).

**Current export:** 201 glyph SVGs in `svg/glyphs/` (outline + filled where applicable, single file for single-style icons). Re-export any missing icons from Figma using the same pattern (COMPONENT_SET → export `children[0]` and `children[1]`; replace `fill="#282828"` with `fill="currentColor"`).

- **`svg/flat/`** — Multi-color illustrative icons (24×24). Do **not** use `currentColor`; keep original fills.  
  **Export:** 20 flat SVGs from Icons v3 Figma, page “Flat”. Naming from `.cursor/rules/pods3/icons/flat.mdc` (e.g. `trophy.svg`, `cashback.svg`, `offer_badge.svg`).
- **`svg/logos/`** — Brand/bank logos; fixed color, do not tint (optional).

## Relationship to `app/public/icons/`

`app/public/icons/` is an **app-specific subset** used at runtime (served by Vite). When the app needs a glyph that isn’t in a screen’s fetch folder, copy it from `icons/svg/glyphs/` into `app/public/icons/glyphs/`. This folder is populated from here when needed — do not maintain a separate copy.
