# Strong Mappings

These reference regions already map cleanly to **registered layouts/components** and **tokens** without structural compromise:

- **Phone column + scroll model** — **PhoneColumnScrollShell** pattern (`StockHome.css` geometry: root column, `.sh-content` scroll, optional bottom chrome sibling) supports a **sticky footer** when the action bar is implemented like `.sh-bottom-nav` (`flex-shrink: 0`, outside overflow).
- **Top navigation** — **Header** (`regular` / `large`, back, title/subtitle, `rhsIcons`) covers back + title + actions.
- **Buy / Sell (or two-mode) control** — **SegmentedControl** (2 segments) matches a compact side toggle.
- **Instrument context** — **Card** + **Logo** + **Badge** (exchange) + **ListItem** `default` for dense symbol/LTP/change rows.
- **Order type, product, validity** — **Radio** / **Chip** for small exclusive sets; **Dropdown** for longer option lists.
- **Price and numeric entry** — **TextField** with labels, assistive/error text.
- **Feature toggles** — **Switch** on labeled rows inside **Card**.
- **Inline status / validation** — **Alert** `sleek` for thin banners; field-level **errorText** on **TextField** / **Dropdown**.
- **Primary / secondary actions** — **Button** variants and sizes for footer CTAs.
- **Visual language** — **Spacing** (`--spacing-8`–`--spacing-16` for dense stacks), **surfaces** (`--surface-level-*`), **text** (`--text-neutral-*`, body/subtext sizes), **borders** (`--border-neutral-weak`, hairline) are sufficient for grouping and hierarchy.

# Weak Mappings

These can be shipped with the **current DS** but diverge from a **tight trading reference** unless callers accept composition or token tradeoffs:

- **Quantity entry** — Reference often shows a **single integrated stepper** (− / value / +). DS only offers **Button** (icon-only) + **TextField** (or read-only value) in a row. Works functionally; **visual and density fidelity** are weaker than a dedicated control.
- **Header vs scroll** — Registry **Header** notes prefer **outside** `.sh-content`; **Stock Home** documents header **inside** scroll. Order flows that need **fixed header + scroll form + sticky footer** must pick the **bill-style** variant explicitly—easy to get wrong if authors follow Stock Home only.
- **Vertical rhythm** — Default **`.sh-section`** `margin-top: var(--spacing-56)` can **over-loosen** compact order forms. Dense screens need either **fewer outer sections** (fields inside one or two **Cards**) or a **documented compact rhythm**; otherwise screenshot fidelity drops.
- **TextField width** — Default **~344px** root width may fight **narrow card gutters**; requires scoped overrides per **Card** / screen CSS—extra integration work, not a missing component.

# Missing Mappings

Do **not** pretend these reference patterns are **first-class DS** today; flag **`MISSING_MAPPING`** (and registry **`missingPieces`**) until support exists:

- **Integrated quantity stepper** — One control chrome for decrement / numeric value / increment; not a registered component or widget.
- **Order book / depth ladder** — Bid/ask stack or live depth UI; no matching **widget** in the registry.
- **Limit-price slider** (or draggable price) — No **Slider**; **TextField** only is a behavioral/visual gap if the reference depends on it.

# Recommended New Widgets

Reusable building blocks for **compact trading and order-entry** (not one-off page code):

| Candidate | Role |
|-----------|------|
| **Compact quantity stepper** | − / value / + with tokenized hit targets, optional lot-size step, disabled/min/max states; replaces ad hoc Button+TextField rows. |
| **Sticky order footer summary** | Reserved height, primary (and optional secondary) **Button**, summary line(s) for order value / charges / margin; documents interaction with **PhoneColumnScrollShell** bottom chrome. |
| **Quote selector row** | Symbol, exchange **Badge**, LTP, change with sentiment tokens; optional chevron for instrument switch; standardizes instrument strip. |
| **Trading mode selector** | Wrapper around **SegmentedControl** (or tabs) with DS spacing and buy/sell (or product) semantics preset—reduces copy-paste on every order screen. |
| **Order parameter card** | Single **Card** housing a **token-defined** vertical stack for order type, qty, price, product, validity, with consistent row density and dividers—keeps compact rhythm without new primitives per field. |

# Recommended New Layout Patterns

- **Compact transaction / order-entry shell** — Documented variant of **PhoneColumnScrollShell**: **Header** and **sticky footer** **outside** `.sh-content`; scroll region holds only form body; **padding-bottom** on `.sh-content` accounts for footer height + safe area. Single place to read **flex + overflow + z-index** rules for order, bill pay, and similar flows.
- **Optional: “dense section” token preset** — A named rhythm (e.g. stack `gap: var(--spacing-8)` between field rows, `var(--spacing-12)` between subgroups) referenced by **Order parameter card** and other transactional screens so authors do not mix 8/16/24 arbitrarily.

# Recommended Rule Changes

- **Registry or screen-generation note** — When a **visual reference** is **compact transactional**, allow **tighter sibling spacing** inside **Cards** via fixed token steps (**8 / 12**) without treating **`.sh-section` 56** as mandatory between every inner row.
- **Explicit pattern doc** — Add a short **“Order / bill shell”** bullet under **PhoneColumnScrollShell** (or a linked doc): header outside scroll + sticky summary/footer bar + scrollable form; resolves Header vs Stock Home ambiguity.
- **Stepper policy** — If **Button + TextField** composition is allowed temporarily, require **`MISSING_MAPPING`** (or **`MISSING_WIDGET`**) in the plan when the reference shows a **unified stepper** so fidelity gap is visible in review.

# Priority Order

Top **3** additions for **screenshot-to-DS fidelity** on trading/order screens:

1. **Compact quantity stepper** — Largest recurring visual gap vs typical references; unlocks dense, consistent qty rows across equity, F&O, and SIP-like flows.
2. **Compact transaction / order-entry shell** (layout pattern) — Locks **sticky footer**, **scroll**, and **header** behavior once; prevents structural drift across order and payment flows.
3. **Sticky order footer summary** widget — Standardizes summary + CTA bar (loading, disabled, dual CTA) so footers are not reimplemented with ad hoc flex and magic spacing each time.
