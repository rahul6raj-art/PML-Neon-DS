# Strong Areas

- **Tokens** — Semantic colors, spacing scale, radius, shadows, and phone-column sizing (`--phone-column-width`, `--card-width`, carousel widths) give a usable styling vocabulary for generated screens.
- **Primitives** — Core components cover forms (`TextField`, `Checkbox`, `Radio`, `Switch`, `OtpTextField`), actions (`Button`), containment (`Card`, `Tile`), lists (`ListItem`), navigation chrome (`Tabs`, `Header`, `BottomNav`, `BottomSheet`), feedback (`Alert`, `Snackbar`, `Loading`), and density controls (`Chip`, `SegmentedControl`, `Dropdown`).
- **Domain widgets** — Rich blocks exist for investing-style UIs: `PortfolioWidget`, `HeatmapWidget`, `GraphWidget`, `ReminderWidget`, `NewsWidget`, `StocksCard`, `MFCardWidget`, `Ticker`, `WheelCarousel`, and structure helpers (`SectionHeader`, `Search`, `ActivityTimeline`).
- **Rules + plan shape** — `screen-generation-rules.md` enforces registry-only composition and explicit `MISSING_*` handling; `screen-plan.schema.json` forces a named plan before code.

# Gaps

- **Layouts** — The registry lists **one** layout (`AppShell`), and it is a **dev/preview harness**, not a product screen shell. Complex screens still rely on undocumented class patterns (e.g. phone column + inner scroll), so “prefer layouts from the registry” offers almost no structural choice for real app UI.
- **Responsiveness** — `tokens.breakpoints` is **empty**; layout entries do not encode product breakpoints. Rules defer to “existing screen references,” which are **outside** the registry, weakening machine-readable consistency.
- **Stacking / layering** — `tokens.zIndex` is **empty**; no tokenized stacking for overlays, sheets, and sticky headers—models tend to be per-component CSS, not plan-friendly.
- **Screen plan** — `sections[].states` is an unbounded string list with **no** link to props, data fetching, or global error handling. There is no place for navigation targets, primary actions, or copy constraints (e.g. INR) unless squeezed into free text.
- **Overlay patterns** — Strong **bottom** sheet story (`BottomSheet`); no registered **centered modal / dialog** pattern for confirmations or lightweight forms.
- **Lists and settings** — No registry widget for a generic **scrollable list screen** (section + many `ListItem`s + loading/empty) or **settings / multi-field form** block; generators will either overuse bespoke markup or emit `MISSING_WIDGET`.
- **Registry hygiene** — The merged registry embeds literal `"name": "string"` inside some **component `props`** objects (e.g. option shapes). That is template noise, not a real component name, and can confuse models parsing the file.

# Recommended Missing Widgets

Name these (or equivalents) when adding to the design system so Cursor can stop inventing one-offs:

- **`EmptyStateSection`** — Illustration/icon slot, title, body, optional primary/secondary `Button`; for lists and dashboards when data is absent.
- **`ErrorStateSection`** — Inline or full-section error with retry CTA; distinct from `Alert` when the whole section fails.
- **`KeyValueSummary`** / **`DetailSummaryCard`** — Labeled rows (charges, totals, metadata) using tokens and `ListItem`-like rhythm without hand-rolled grids.
- **`FilterOrSortStrip`** — Optional row of `Chip`s / `SegmentedControl` wired for common filter patterns when `Header` alone is not enough (registry already has `Chip`; a composed strip reduces duplication).
- **`SettingsFormBlock`** — Repeated label + control rows with tokenized vertical rhythm for long forms (still using `TextField`, `Switch`, etc.).
- **`ModalDialog` / `CenterAlertSheet`** — Focus-trapped centered dialog for confirmations and short forms; complements `BottomSheet`.

# Recommended Missing Layouts

- **`PhoneScrollShell`** (or **`ScreenFrame`**) — Formal registry entry for the **376px column**, **flex column**, **header area**, and **`.sh-content`-style scroll region** described in project screen rules—so Phase 1 can name a real `layout` instead of “documented pattern.”
- **`AppChromeLayout`** (optional, future) — Product shell with **sticky header + scroll body + `BottomNav` + `HomeIndicator`** as a single documented composition, if multiple screens share it verbatim.

# Recommended Missing Rules

- **Cross-link plan and states** — Require `sections[].states` to map to **concrete behaviors** (e.g. `loading` → skeleton or `Loading`; `empty` → `EmptyStateSection` or `MISSING_WIDGET`).
- **INR and locale** — Add a short, explicit rule (or registry `notes`) for **₹ formatting** so it is not rediscovered from chat each time.
- **Overlay choice** — When to use **`BottomSheet`** vs full-screen vs a future **center modal**; when to use **`Snackbar`** vs inline `Alert`.
- **Responsive default** — State that **phone-column-first** is canonical until breakpoint tokens exist; forbid inventing breakpoints in generated CSS.
- **Screen reference without registry** — Either move **Stock Home–style patterns** into `layouts`/`widgets` or add a **“documented patterns”** appendix file that the rules explicitly name (still machine-readable), so “follow repo docs” is not an open-ended escape hatch.

# Priority Fixes

1. **Add `PhoneScrollShell` (or equivalent) to `layouts.schema.json`** and regenerate **`design-system.registry.json`** — largest win for structural consistency of complex screens.
2. **Add `EmptyStateSection` and `ErrorStateSection`** (widgets or composed components) and register them — reduces invented empty/error UI.
3. **Clean nested `"string"` placeholders** inside **`components.schema.json`** prop examples, then refresh the registry — improves parse reliability for AIs.
4. **Extend `screen-plan.schema.json`** with optional fields such as `primaryActions`, `navigation`, `dataDependencies`, or `copyConstraints` — keeps Phase 1 structured for flows, not only layout.
5. **Populate `tokens.breakpoints`** (even a single `--breakpoint-tablet: 1024px`) from real `index.css` usage, or document the same in registry `notes` — closes the responsive gap honestly.
