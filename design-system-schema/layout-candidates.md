# Best Candidate

**Agent note:** Cursor **`.cursor/rules/pml-screen-patterns.mdc`** (`alwaysApply: true`) requires reading this file (with **`DESIGN.md`** and **`design-system-schema/screen-generation-rules.md`**) when choosing or implementing the phone shell, scroll region, and section rhythm—the user does **not** need to attach it.

**Stock Home screen shell** — `StockHomePage` with co-located **`StockHome.css`**, using the **`.stock-home`** root, **`.sh-content`** scroll region, **`.sh-section` / `.sh-section__content`** section rhythm, and **`.sh-bottom-nav`** for the bottom bar wrapper.

This is the implementation the repo treats as the reference product frame (phone column, full height, scrollable body, optional sticky bottom nav), not the dev-only `AppShell`.

# Why It Fits

- Matches the **documented screen pattern** for PML: 376px-wide column (`--phone-column-width`), **`100vh`**, **`flex` column**, **`surface-level-4`** backdrop, **`text-align: left`**, **`overflow: hidden`** on the root.
- Defines the shared **`.sh-content`** model: **`flex: 1`**, **`overflow-y: auto`**, bottom padding token — the standard place for header + page content that scrolls together.
- Encodes **section spacing** (`--spacing-56`, `sh-section__content` padding) aligned with design-system rules.
- Places **`BottomNav`** in a **non-scrolling** sibling (`flex-shrink: 0`, `z-index`) under the scroll area — a real **sticky bottom chrome** pattern for tabbed apps.
- **Header** (with status bar) lives **inside** `.sh-content`, so it scrolls with the page on Stock Home; that is an explicit product choice for this screen.

# Import Path

- **Page (recommended):** `PML App/StockHome` — `StockHomePage`, `StockHomePageProps`, and import `./StockHome.css` from the same folder (or follow existing pages that duplicate the CSS pattern).
- **Barrel:** `PML App` also re-exports `StockHomePage` / `StockHomePageProps`.

There is **no** separate `layout/PhoneShell` module today; the shell is **this page + its CSS**.

# Key Props

- **`colorScheme?: 'light' | 'dark'`** — Drives header/status treatment and `BrandLogo` theme via `brandLogoThemeForAppColorScheme` (structural theming for the chrome, not layout geometry).

Layout structure itself is **class-driven** (`.stock-home`, `.sh-content`, …), not additional layout props.

# Layout Behavior

- **Sizing:** Root width `var(--phone-column-width)` (376px), height `100vh`, column flex.
- **Scrolling:** Only **`.sh-content`** scrolls vertically; root stays `overflow: hidden`.
- **Header:** `Header` is inside `.sh-content` (scrolls with content); `.stock-home__header` is `width: 100%`, `flex-shrink: 0` within that flow.
- **Bottom:** `.sh-bottom-nav` is **outside** `.sh-content`, **sibling** under `.stock-home`, fixed to the bottom of the column by flex (does not scroll away).
- **Mobile / safe area:** No `env(safe-area-inset-*)` usage in this CSS; status bar is handled via the **Header** component’s status bar props, not a separate safe-area layout primitive.

# Screens Using It

| Screen / file | Relationship |
|---------------|----------------|
| **`src/PML App/StockHome.tsx`** + **`StockHome.css`** | **Canonical** — defines `.stock-home`, `.sh-content`, `.sh-section*`, `.sh-bottom-nav`. |
| **`src/PML App/Discover.tsx`** + **`Discover.css`** | Same **geometry** (`.discover`, `.dv-content`, `.dv-section*`, bottom nav); comments describe **Stock Home rhythm**. |
| **`src/PML App/LoginPage.tsx`** + **`LoginPage.css`** | Same **outer column** + scrollable content stack; **no** `BottomNav`; header/body structure tuned for auth. |

# If Missing

A **dedicated reusable layout component** (e.g. `PhoneScrollShell`) **does not exist** yet — only this **page-level pattern**. For AI/registry work, either:

- **Treat `StockHomePage` + `StockHome.css` as the spec** and **copy the class structure** into new screens (with a page-specific BEM prefix if needed, as Discover does with `dv-`), or  
- **Later extract** a shared layout component that implements `.stock-home` / `.sh-content` / optional bottom slot, then register it under `layouts` in the design-system schema.

Until extraction, “registering” the shell means **documenting and reusing this pattern**, not importing a separate layout primitive.
