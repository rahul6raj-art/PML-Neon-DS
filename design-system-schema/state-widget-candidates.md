# Empty State Candidate

**No dedicated reusable empty-state or “no data” block exists** in the codebase. Widgets (`ReminderWidget`, `NewsWidget`, etc.) assume populated arrays; they do not render a standard empty illustration + title + CTA.

The closest **page-level** pattern is **conditional content inside a `Card`** (e.g. a bill or settings screen that swaps summary rows for “not yet available” copy — still a compact key-value summary, not a generic “nothing here” module). That logic is **not** extracted as a component.

**`Loading`** (`components/Loading`) covers **in-flight** data only (dots, `role="status"`), not an empty dataset after a successful fetch.

# Error State Candidate

**`Alert`** (`components/Alert`) — product-facing **sleek** or **detailed** banner/card with semantic **`state`**: `primary` | `negative` | `warning` | `positive`, optional **icon**, **description** (and **title** on detailed), optional **CTA `Button`** via `showCta`, `ctaLabel`, `onCtaClick` (supports **retry**-style actions).

**Real screen usage:** Product screens stack **`Alert`** rows in a notices area (`type="sleek"`, `showCta={false}`, `showClose={false}`) for reminder and secondary banners — demonstrates **section-top / in-flow** placement with tokens and DS styling.

# Why They Fit

- **`Alert`** is the only **registry component** that encodes **multi-line messaging + optional action + dismiss** in one primitive, suitable for **errors, warnings, and recoverable failures** without inventing markup.
- **Empty** has **no** parallel primitive; teams would today duplicate **section + card + copy** or misuse **`Alert`** for neutral “no results,” which it can do visually but is **not** established as the empty-state pattern in code.

# Import Paths

- **`components/Alert`** — `Alert`, `AlertProps`, `AlertType`, `AlertState`
- **`components/Loading`** — `Loading`, `LoadingProps` (loading only; optional companion in the same screen region)
- **`components/Snackbar`** — transient / toast-style feedback (see Typical Usage); no bundled product app screens in this repo — usage is Storybook stories

# Common Props

**`Alert` (structural / messaging):**

- `type` — `sleek` | `detailed`
- `state` — `primary` | `negative` | `warning` | `positive`
- `description`, `showDescription` — main copy
- `title`, `showTitle` — detailed layout
- `showIcon`, `iconContent`
- `showCta`, `ctaLabel`, `ctaVariant`, `ctaSize`, `onCtaClick`, `ctaLoading`, `ctaDisabled` — **retry / secondary action**
- `showClose`, `onClose`
- `className` — slot into section spacing (e.g. banner stack)

**`Loading`:**

- `type` — `theme` | `monotone`
- `dotSize`, `label`, `className`

# Typical Usage

- **`Alert`:** Inside **`sh-section__content`** or a dedicated **banner stack** at the top of **`ccb__content`**-style scroll regions; above **`SectionHeader`** + list/card when the whole section needs a **warning or error**; use **`state="negative"`** + **`onCtaClick`** for **failed load / retry**.
- **`Loading`:** Center in a section body while data is fetching, or rely on **`Button`**’s built-in **`Loading`** for action-level spinners.
- **`Snackbar`:** Short-lived **error/success** after an action (if product adds global host); not a replacement for persistent section errors.

# If Missing

- **`EmptyStateSection` (widget to add):** **`SectionHeader`-optional** block with **title**, **body**, optional **leading `Icon` or illustration slot**, optional **`Button`** (e.g. “Explore” / “Refresh”), tokenized padding inside **`sh-section__content`** width — so lists and dashboards don’t hand-roll markup.
- **`ErrorStateSection` (optional widget):** Thin wrapper around **`Alert` detailed** + prescribed spacing + optional **retry** defaults, if you want a single name for “full section failed” vs inline banner.
- Until then, **`MISSING_WIDGET`** for empty states is accurate; use **`Alert`** only when a **banner** metaphor fits, not as a fake empty-state component.
