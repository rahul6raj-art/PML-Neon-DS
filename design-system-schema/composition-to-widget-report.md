# Candidate Widgets

1. **Asset allocation breakdown block** — `SectionHeader` + `Card` wrapping repeated rows of `ListItem` plus a token-styled progress track/fill (`pd-allocation__*` CSS). No registry widget today expresses “label + value + percent + bar.”
2. **Recent activity / ledger list section** — `SectionHeader` + `Card` + stacked `ListItem` rows (title, subtitle, trailing amount), plus section-level empty/unavailable copy outside the card. There is no widget for a dense transaction-style list; `ActivityTimeline` is step/progress UI, not a ledger.
3. **Top holdings section with empty state** — `SectionHeader` + vertical stack of `StocksCard` **or** `Card` + body copy + primary `Button`. `StocksCard` is already a widget, but the **section shell** (title rhythm, inter-card gap, empty CTA pattern) is hand-assembled per screen.
4. **Screen-level loading well (optional)** — Centered `Loading` inside a padded, token-typed region (`pd-loading`). Lower uniqueness than the three above; included only if we want consistent “hero area loading” across drill-downs.

*Out of scope for promotion (already covered by registry widgets or primitives):* `Header`, `PortfolioWidget` (includes `GraphWidget`), inline `Alert` for partial failure (registry **`SectionErrorBanner`** contract already maps to `Alert` — a thin file export could improve discoverability but is not a new composition pattern).

# Why They Should Become Widgets

- **Allocation rows:** Generators and humans repeatedly recreate the same structure (metric row + bar). Without a named widget, prompts drift on spacing (`--spacing-8` vs `--spacing-16`), bar height, rounding tokens, and whether `ListItem` separators appear — hurting visual parity and registry alignment.
- **Recent activity:** Fintech screens reuse “section title + card list + amount on the right” for orders, SIPs, payments, and corporate actions. Today each screen risks inconsistent `ListItem` props, separator rules, and empty vs error placement relative to `SectionHeader`.
- **Holdings section:** `StocksCard` is correct atomically, but “N cards with gap + empty state card” is a repeated **molecule**. Registering it gives AI a single import and props surface (`items`, `emptyTitle`, `emptyCtaLabel`, `onEmptyCta`) instead of re-deriving layout from `PortfolioDetailsPage.css` each time.
- **Loading well (if promoted):** Reduces one-off class names (`pd-loading`) and keeps loading blocks token-identical across pages.

# Suggested Widget Names

| Candidate | Suggested registry name |
|-----------|-------------------------|
| Allocation block | `AllocationBreakdownWidget` |
| Ledger / activity list | `LedgerActivityListWidget` |
| Holdings section + empty | `HoldingsSectionWidget` |
| Loading well (optional) | `ScreenSectionLoadingWidget` |

Names are domain-neutral (not “PortfolioDetails*”) so MF, credit, and insurance surfaces can reuse them.

# Likely Composed From

- **`AllocationBreakdownWidget`** — `SectionHeader`, `Card`, `ListItem` (default row, no leading, trailing percent text), optional token-based track/fill (internal layout, no new primitives). Optionally accept `items: { label, valueLabel, percent }[]`.
- **`LedgerActivityListWidget`** — `SectionHeader`, `Card`, `ListItem` (default, trailing text for amounts), props for `items`, optional `emptyMessage` / `unavailableMessage`, `onRowPress`. Not `ActivityTimeline` (different metaphor).
- **`HoldingsSectionWidget`** — `SectionHeader`, `StocksCard` (map over holdings props), `Card` + `Button` for empty state; spacing/gap rules co-located in widget CSS (`--spacing-16` stack).
- **`ScreenSectionLoadingWidget` (optional)** — `Loading` only; wrapper uses `--spacing-*` and `--text-secondary` for label styling.

# Priority Order

1. **`AllocationBreakdownWidget`** — Highest visual/specific structure not represented elsewhere; easiest for ad-hoc implementations to get wrong; high reuse (portfolio, MF, goal planning, risk).
2. **`LedgerActivityListWidget`** — Very high cross-screen frequency; standardizes list semantics and empty/partial states for prompt-driven generation.
3. **`HoldingsSectionWidget`** — Solid win for consistency and fewer duplicated section wrappers; slightly lower priority because the atomic `StocksCard` already exists and the composition is simpler than allocation or ledger patterns.
