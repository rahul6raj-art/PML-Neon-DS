# Common Home (Dark) — implementation notes

**Agent note:** Cursor rule **`.cursor/rules/pml-screen-patterns.mdc`** (`alwaysApply: true`) bundles mandatory reads for this repo: **`DESIGN.md`** (this file), **`design-system-schema/screen-generation-rules.md`**, and **`design-system-schema/layout-candidates.md`**—open them when in scope; the user does **not** need to paste or say “follow DESIGN.md”.

Source: [PML — Review File](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1562-5365), frame **Common Home | Dark** (`1562:5365`).

## Visual theme & atmosphere

Dense, finance-first mobile screen on a **fixed 376px-wide** canvas: vertical stack of portfolio hero, chips, stat rows, allocation + lists, and a bottom bar. Alignment is **left** for labels and section titles; **numeric values** sit on the **trailing** edge of rows. Mood is dark, high-contrast, with **green positive** and **blue primary** accents; spacing is regular and card-led rather than airy.

## Color palette & roles (from Figma variables on this node)

| Hex | Role (on this screen) |
|-----|------------------------|
| `#101010` | App / page background — `Surface/Level 4`, `Background/Universal Dark` |
| `#161616`–`#202020` (levels) | Elevated surfaces / chrome — `Surface/Level 1` … `Surface/Level 3` |
| `#ffffff` | Primary text — `Text/Neutral Strong` |
| `#ebecee` | Secondary body / icons — `Text/Neutral Moderate`, `Icon/Neutral Moderate` |
| `#8b8c8c` | Tertiary / muted labels — `Text/Neutral Medium`, `Icon/Neutral Medium` |
| `#47ff8e` | Positive numbers, success chips, “good” states — `Text/Positive Strong`, `Background/Positive Strong`, `Icon/Positive Strong` |
| `#2cb1fe` | Primary links / emphasis text — `Text/Primary Strong`, `Background/Primary Strong`, `Border/Primary Strong` |
| `#00b8f5` | Brand accent (where used) — `Brand/Primary` |
| `#282828` | Hairline dividers / weak borders — `Border/Neutral Weak` |
| `#414244` | Medium borders — `Border/Neutral Medium` |
| `#ea3424` | Negative — `Text/Negative Strong` (if negative deltas appear) |

*Note: Exact fills on decorative vectors (chart, allocation arcs) may use additional blues/yellows from the library (`Colours/*`); list above covers semantic UI tokens referenced on this frame.*

## Typography

**Family (from variables):** **Inter Subset** (all styles below).

| Style token | Size | Weight | Line height | Typical use on screen |
|-------------|------|--------|-------------|------------------------|
| `Display 2 - Medium` | 36px | 500 (Medium) | 40px | Large portfolio currency (e.g. hero amount; text box height **40px** in layout) |
| `Title 1 - Regular` | 22px | 400 | 28px | Section titles (e.g. **28px**-tall title row “Total portfolio value”) |
| `Title 4 - Medium` | 16px | 500 | 22px | Emphasized mid titles (where 22px line fits) |
| `Title 4 - Regular` | 16px | 400 | 20px | 16px titles with 20px line |
| `Body - Regular` | 14px | 400 | 20px | Body rows, ticker, list titles, KPI rows (**20px** row height common) |
| `Body - Medium` | 14px | 500 | 20px | Slightly stronger body |
| `Body - Semi Bold` | 14px | 600 | 20px | Strong body / labels |
| `Subtext - Regular` | 12px | 400 | 16px | Captions, meta, chip internals |
| `Subtext - Medium` / `Subtext - Semi Bold` | 12px | 500 / 600 | 16px | Badges, dense labels |

## Layout principles

### Spacing system

- **Base unit:** **4px** (`Spacing/Spacing - 4px`); system also uses **2px**, **8px**, **12px**, **16px**, **24px**, **48px**.
- **Screen horizontal inset:** **16px** — content blocks are **344px** wide inside a **376px** frame (`16 + 344 + 16`).
- **Between major vertical blocks:** **48px** — matches token `Spacing/Spacing - 48px (Sections)` and measured gaps between stacked sections (e.g. portfolio block → next section).
- **Inside sections (examples from layout tree):**
  - **8px** between section title block and key value row (title frame height **32px**, next block starts **y = 40**).
  - **16px** between chip row (**24px** tall) and “Invested / Overall Returns” block (chips end **y = 24**, values start **y = 40**).
  - **12px** between two stacked stat lines in a pair (**20px** line + **12px** gap + **20px** line = **52px** block).
  - **16px** between allocation breakdown rows (**52px** row + **16px** gap + next row).
- **Cards (default padding token):** `Spacing/Spacing - 16px (Card Default)` / `Padding/Padding Horizontal - 3XL` = **16px** horizontal (and commonly vertical) for card interiors.

### Grid & container

- **Width:** **376px** artboard; **no multi-column grid** — single column.
- **Content width:** **344px** for primary text and cards (16px gutters).
- **Horizontal scroll:** **Ticker** strip is **36px** tall; index groups are laid out in a row wider than the viewport (multiple **282px** / **256px** segments), so **horizontal scroll** for indices — *inferred*; vertical scroll for the page.
- **Tablet/desktop:** Not represented on this node; treat as **mobile-only** spec unless a separate frame exists.

### Cards

- **Corner radius:** Default card radius token **`Radius/Radius - 24px (Card Default)`** = **24px**; also **`Radius/Radius - 16px`** / **`Radius/Radius - 2XL` (20px)** for smaller UI.
- **Padding:** **16px** typical internal inset (e.g. buying-power row, list rows, allocation content); some blocks use **24px** top padding for first content line (e.g. carousel/list cards).
- **Borders / shadows:** Weak border token `#282828` for dividers; **no large drop shadow** called out in variables — depth reads as **surface level + fills** (inferred).
- **Internal rhythm (examples):**
  - **Title → value:** **4px** vertical step in buying-power stack (**16px** label + **4px** gap + **20px** value — measured from nested frames).
  - **List row:** **44px** two-line row (**20px** + **4px** + **20px**); **16px** horizontal padding inside list containers.
  - **Section header → card body:** often **16px** (e.g. **32px** header + **16px** gap → content at **48px**).

## Depth & elevation

- **Surfaces:** Layered **dark grays** (`Surface/Level 1`–`4`, `#101010` base) rather than heavy shadow.
- **Glass:** Tokens exist (`Glass/*`) for tinted bars — use only where instances reference them (e.g. optional button chrome).
- **Chart:** Line work + glow-style marker — treat as **illustration layer**, not a separate elevation system. **Default demos:** legacy **PortfolioHome** cubics (**`M`+`C`**, **`LEGACY_PORTFOLIO_HOME_CHART_PATH_*`**). **Gain** charts: **blur + stroke only** (no under-line gradient in **`GraphWidget`** by default). **Loss** charts: optional soft fill from **`legacyPortfolioHomeChartAreaFill`** / **`closeAreaUnderOpenChartPath`**. **Alternatives:** **`smoothPathFromPoints`** + **`closeAreaUnderSmoothCurve`** (marketing-style, e.g. [Review File **`1404:4431`**](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1404-4431&t=A2RU4TiZE7uPzzJc-4)) or **`linearPathFromPoints`(`zigZagLinePoints`…)** + **`closeAreaUnderPolyline`** when a polyline is intentional.

## Responsive behavior

- **Stacks:** All sections **stack vertically**; no side-by-side main grid at this breakpoint.
- **Scrolls:** **Vertical** page scroll (frame height **2733px**); **horizontal** for **ticker** and **horizontally duplicated** list columns (e.g. paired cards at **x = 0** and **x = 336** imply a **carousel / horizontal swipe** pattern).
- **Fixed chrome:** **Header** (**142px** tall region) and **bottom nav + home indicator** (**102px** total: **68px** nav + **34px** home indicator) — *inferred* sticky behavior from structure, not from prototype data in export.

## Do’s & don’ts

1. **Do** keep the **376px** column and **16px** side gutters; **do not** stretch content edge-to-edge on this pattern.
2. **Do** align **labels left** and **numbers right** in KPI rows (**344px** row with split ends).
3. **Do** use **48px** between major sections and **8px / 16px / 12px** for inner rhythm as measured above.
4. **Do** use **Inter Subset** with the **Body 14/20** and **Subtext 12/16** pair for density without changing line heights arbitrarily.
5. **Do** reserve **`#47ff8e`** for positive / success and **`#2cb1fe` / `#00b8f5`** for primary/brand emphasis per variables.
6. **Don’t** mix ad-hoc **8px** vs **4px** spacing without checking the **4px base** grid.
7. **Don’t** assume **32px** section headers everywhere — one block uses **28px** section height (e.g. “Upcoming SIPs”); match component instance, don’t normalize blindly.
8. **Don’t** add heavy shadows; rely on **surface level** and **1px-ish dividers** (`#282828`) where lines appear.

## Agent prompt guide (copy-paste)

**Spacing & layout**

> Implement a **376px**-wide mobile column. Apply **16px** horizontal padding so main content is **344px** wide. Use **48px** vertical gap between major sections, **16px** between chip bands and the next block, **12px** between paired stat lines, and **8px** between a section title and the first numeric row. Snap spacing to **4px** multiples (2/4/8/12/16/24/48).

**Grid**

> Single-column layout; allow **overflow-x: auto** (or carousel) for the **36px**-tall **ticker** row and any **duplicate** card columns offset by **336px** (second column starts at **x = 336** in design).

**Cards**

> Default cards: **24px** corner radius (`Radius - 24px Card Default`), **16px** internal padding, background from **`Surface/Level 2` or `Level 3`** (typically **`#202020` / `#1b1b1b`**) over **`Surface/Level 4` `#101010`** page. Use **`#282828`** dividers instead of thick borders. Title/body stack: **20px** title line, **4px** gap, **20px** secondary line where two lines sit in a **44px** row.

**Typography**

> Use **Inter Subset**: hero amount **`Display 2 - Medium` (36/40, 500)**; section titles **`Title 1 - Regular` (22/28)** or **`Title 4` (16/20–22)**; dense UI **`Body` 14/20**; meta **`Subtext` 12/16**.

**Color**

> Page **`#101010`**; primary text **`#ffffff`**; secondary **`#ebecee`**; muted **`#8b8c8c`**; positive **`#47ff8e`**; primary accent **`#2cb1fe`**; brand **`#00b8f5`**; borders **`#282828`** / **`#414244`**.

---

## Archived demo screens (removed from repo)

The following flows used to ship as in-app previews (historically under **`src/PML App/`**, now deleted) and were **removed** to shrink the maintenance surface: **Stock home**, **Discover**, **Log in**, **Sign up**, plus earlier demos (**Goals**, **Rewards**, **Doctor schedule**, **Order pad**, **Fintech wallet home**, **Cards**, **Portfolio details**, **MTF home**). **Patterns and gotchas** from building them (dividers, **`BottomNav`**, **`TextField` in `Card`**, scroll + sticky footer, INR, etc.) are kept in **`docs/LEARNINGS.md`** — use that file when re-implementing similar surfaces.

**Discover (PRD) — archived:** The live Discover implementation (`Discover.tsx`, `Discover.css`, mock data) is no longer in the repo. PRD notes: **376px column**, **`Header`** (homepage + primary tabs), **`HeatmapWidget`**, **`Chip` `extra-small`** mover filters, carousels, **`NewsWidget`**, **`BottomNav`**. Compliance placeholders (informational disclaimer, delayed-data line) belonged in that screen before ship.

---

## Allocation breakdown widget

**Source:** [PML — Review File — Allocation block](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1644-6023), node **`1644:6023`** (layout + list). **Segmented bar (default = Figma file):** [Figma **`1649:7514`**](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1649-7514&t=A2RU4TiZE7uPzzJc-4) when the list is **not** exactly four rows (`AllocationBreakdownFigmaBar16497514` / bundled SVG); [Figma **`1661:7516`**](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1661-7516&t=A2RU4TiZE7uPzzJc-4) when there are **exactly four** rows (`AllocationBreakdownFigmaBar16617516` / bundled SVG — **one** composite `exportAsync` frame: overlapping paths + gradients as in the file). Legend **`%`** follows row weights; the bar keeps **fixed** Figma proportions (no flex-assembled segments). **`proportional-css`** is **not** that vector: **`AllocationBreakdownDynamicBarSvg`** only when product accepts drift. **`normalizeBarPercents`** (default true) aligns legend **`%`**.

**Code:** `AllocationBreakdownWidget.tsx` / `AllocationBreakdownWidget.css` — optional **`SectionHeader`**, **`Card`**, **40px** pill **bar** + **`--spacing-24`** gap + **legend rows**: **16px** swatch, **label** + **percent**, **INR amount** + optional **change** line, **16px** padding each side of hairline **row dividers** (list block ↔ divider). **`PortfolioWidget`**: **`allocationRows`**. Match [Figma `1644:6023`](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1644-6023&t=A2RU4TiZE7uPzzJc-4) + bars [`1649:7514`](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1649-7514&t=A2RU4TiZE7uPzzJc-4) / [`1661:7516`](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1661-7516&t=A2RU4TiZE7uPzzJc-4) in Storybook **Widgets/Allocation breakdown** / **Widgets/Portfolio**.

---

## Stocks Tiles widget

**Source:** [PML — Review File](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1614-5966), frame **Stocks Tiles** (`1614:5966`).

**Code:** `StocksTilesWidget.tsx`, `StocksTilesWidget.css` — optional **`SectionHeader`** (chevron **off** by default) + horizontal scroll of **tiles** (`--unit-max` width, **`--surface-level-1`**, **no outer border**): optional **top** **`Icon`** / **`Logo`** row (toggle **`showTopMedia`**), optional **status** **`Badge`** between media and title, one primary **`title`** line (full **company** name, e.g. **Reliance Ind.**), **`price`**, and move as muted **Badge** or **subtext**. Empty **`changeLabel`** hides the move row (e.g. **Discover → Curated strategies** shortcut copy in **`price`**). Historical Discover scoped strategy spacing / descriptor colour on **`.dv-strategies-stw`**. For strategy-style tiles in isolation, **`Tile`** **`variant="strategy"`** (`Tile.tsx` / **Components/Tile** in Storybook) uses the same rhythm; optional **`strategyItems`** renders a horizontal strip of multiple cards inside one **`Tile`**. **`changeSentiment`** drives sign normalization (same idea as **ListItem** stock rows). **INR:** no space after **`₹`** in demo copy.

---

## Goals widget

**Source:** [Goals card **1670:7540**](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1670-7540&t=A2RU4TiZE7uPzzJc-4); optional **CTA row** [**1671:7584**](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1671-7584&t=A2RU4TiZE7uPzzJc-4) (**Add Money** **filled** + **View Goals** **tonal**, **medium**, **12px** gap, equal flex width).

**Code:** `GoalsWidget.tsx` / `GoalsWidget.css` — optional **`SectionHeader`** (**`extra-large`**, **`trailing="none"`**) + **16px**-inset card (**`--surface-level-1`**, **`--radius-24`**, **`--card-padding-*`**) per [Figma **1670:7540**](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=1670-7540&t=A2RU4TiZE7uPzzJc-4): **goal** line **`Body` medium** **14/20** (**1670:7548**); **status** **`Subtext` regular** **12/16** (**1670:7549**); optional **%** chip (**`--radius-12`**, pad **`12×8`**, **`Title 4` medium** **16/22**): fill **`--background-positive-weak`** + text **`--text-positive-strong`** by default; with **`statusTone` `notice` / `negative`** use **`--background-notice-weak`** / **`--background-negative-weak`** and matching strong text (**1670:7555–7556** pattern). **Bar:** **2px**-tall track (**`--spacing-2`**) on **`--background-neutral-weak`**, **`.glw__track-shell`** **`24px`** tall for handle clearance; **fill** = same **horizontal gradient** axis as **GraphWidget** positive line (notice/negative → loss gradient); **thumb** ≈ **12px** rounded square + token **glow** rings (**1670:7562** asset approximated in CSS). **Footer** — labels **`Body` regular** **14/20** **`--text-neutral-moderate`**; amounts **`Body` medium** **14/20** **`--text-neutral-strong`**; **2px** gap label ↔ value (**1670:7567** + amount emphasis). **`progressPercent`** clamped **0–100**. Parent formats **INR** strings for saved/target. **CTAs:** pass **`primaryCtaLabel`** / **`secondaryCtaLabel`** (non-empty shows **`Button`**); handlers **`onPrimaryCtaPress`** / **`onSecondaryCtaPress`**; clicks **`stopPropagation`** so a pressable card does not absorb taps.

---

## Bottom Sheet (responsive surface)

**Code:** `BottomSheet.tsx`, `BottomSheet.css`, `BottomSheetHeader`.

- **Mobile viewport** (below **600px**, token `--bottom-sheet-modal-breakpoint` in `numbers.css`): **Bottom sheet only** — never the centered modal. Fixed overlay, sheet anchored to the bottom, `border-radius` on top corners only, slide-up motion, **HomeIndicator** at the bottom of the sheet. CSS re-asserts this for `max-width: 599px` so narrow layouts cannot pick up modal styles.
- **Tablet / web viewport** (**600px** and up): **Centered modal** — same content and `role="dialog"`, overlay centered with padding, sheet uses **full** `border-radius-24`, stronger elevation shadow, **no** home indicator, `padding-bottom` on the sheet for body/CTA breathing room.

Breakpoint is **viewport-based** (not Storybook “Platform” density), so a wide desktop window still uses the modal even if the app column is phone-width; use a narrow preview or device width **under 600px** to see the bottom sheet.

**Storybook (wide canvas):** toolbar **Mobile** and **Side by side → Mobile** wrap the story in `sb-pml-bottom-sheet-host` (plus a transform host so `position: fixed` stays in-column). `BottomSheet.css` then applies true sheet chrome (home indicator, slide-up, top radii) with selectors that load **after** the viewport `@media (≥600px)` modal block so they always win.
