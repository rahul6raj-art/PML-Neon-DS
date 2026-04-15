# Structure

- [ ] Uses the correct product shell / layout (e.g. phone column, scroll region, header placement) per project rules
- [ ] Screen structure matches reference patterns (sections, rhythm, naming) — not a one-off layout
- [ ] Imports resolve to real project paths (no stale or guessed paths)
- [ ] Mobile-first: primary layout works at the target phone width before wider breakpoints
- [ ] Layout is structurally stable (no accidental overflow, flex/grid gaps consistent)

# Flow Accuracy

- [ ] Current step indicator matches the visible screen
- [ ] Completed and future steps are represented correctly
- [ ] CTA label matches the current step action
- [ ] Back navigation logic is consistent

# Transaction UX

- [ ] Amount hierarchy is easy to understand
- [ ] Custom amount has helper text and meaningful validation
- [ ] Review screen repeats the critical payment details
- [ ] Success screen includes useful next actions
- [ ] Failure screen includes retry and safe exit
- [ ] Static titles are not styled like tappable disclosure rows

# Design System Usage

- [ ] Prefers registered **widgets** over hand-built stacks of the same primitives
- [ ] No **unregistered** components, layouts, or tokens introduced without updating the registry / schema (or calling it out explicitly)
- [ ] Spacing, radii, and colors use **semantic tokens** — not raw hex or arbitrary px where a token exists
- [ ] Typography roles (sizes, weights) align with tokens / existing screens
- [ ] No unnecessary **inline styles**; screen CSS is scoped and token-driven where possible
- [ ] Cards, chips, buttons, and inputs use design-system components — not parallel “local” variants for the same job

# Reference Fidelity

- [ ] Macro layout matches the reference closely
- [ ] Section order and grouping match the reference
- [ ] Sticky vs scrollable regions match the reference intent
- [ ] Control density is close to the reference
- [ ] Spacing rhythm is consistent across sibling sections
- [ ] Spacing uses registered tokens rather than arbitrary values
- [ ] CTA placement matches the reference pattern
- [ ] Any fidelity loss is explained by `MISSING_MAPPING`, not silent approximation

# States

- [ ] **Loading** state is clear (skeleton, spinner, or widget-level loading — as appropriate)
- [ ] **Empty** state has purposeful copy and a next action when the product expects one
- [ ] **Error** and **partial-failure** paths are handled (banner, inline message, or section fallback — not a silent blank)
- [ ] Success / default state still reads correctly when optional data is missing

# Content

- [ ] Copy matches product conventions (e.g. currency formatting, labels, tone)
- [ ] No placeholder lorem or TODO strings left in user-visible text
- [ ] Lists and summaries show sensible limits (e.g. “top N”) where overload is likely

# Responsiveness

- [ ] Primary viewport is the intended mobile column; horizontal scroll is intentional (e.g. carousels), not accidental
- [ ] Tap targets and spacing remain usable at small widths
- [ ] Long text truncates or wraps without breaking layout

# Accessibility

- [ ] Interactive controls are real controls (`button`, `a`, inputs) with **accessible names** (visible label, `aria-label`, or `aria-labelledby` where needed)
- [ ] Heading / section hierarchy makes sense for screen readers (no skipped levels for decoration)
- [ ] Focus order follows visual order; focus states are visible where custom styling is used
- [ ] Images / icons that convey meaning are not relied on alone without text

# Maintainability

- [ ] Repeated composition across screens is noted for **promotion to a widget** if it appears again
- [ ] Screen-specific CSS is minimal and prefixed; shared patterns live in components/widgets
- [ ] Storybook or app entry exists where the team expects discoverability for this screen
- [ ] Obvious dead code, unused imports, and duplicate styles are removed before merge
