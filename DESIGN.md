# Common Home (Dark) — implementation notes

**Agent note:** Cursor rule **`.cursor/rules/pml-screen-patterns.mdc`** (`alwaysApply: true`) requires reading this file when relevant to new UI work—the user does **not** need to say “follow DESIGN.md”.

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
- **Chart:** Line work + glow-style marker — treat as **illustration layer**, not a separate elevation system.

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

## Stocks Discover (product PRD)

**Code:** `Discover.tsx`, `Discover.css`, `discoverMockData.ts` — same **376px column**, **`Header`** (homepage + primary tabs), **`HeatmapWidget`** (wheel **Index / Stocks / F&O**, default **Stocks**), **`Chip` `extra-small`** mover filters, horizontal carousels with token spacing, **`NewsWidget`**, **`BottomNav`** (five tabs, **Stocks** selected). Data is **mock** until backend contracts (indices, movers, strategies, recommendations, news, screeners) are wired.

**Compliance copy:** Expert block includes an **informational-only** disclaimer; index row includes a **delayed / entitlement** placeholder line. Replace with real entitlements and legal review before ship.

---

## MTF (Margin Trading Facility) home

**Source:** [PML — Review File](https://www.figma.com/design/rwkx4gcYijqguNZUK361jv/PML---Review-File?node-id=814-4571), frame **MTF** (`814:4571`).

**Code:** `MtfHome.tsx`, `MtfHome.css`, `mtfMockData.ts` — same **376px** **Stock Home–style shell** (`.mtf-home`, `.mtf-content` scroll, `.mtf-bottom-nav`): **`Header`** (Home + tabs **Portfolio / IPOs / NFO / MTF**, **MTF** selected), **Return on margin** summary **`Card`** + **`Badge`** + three-column stats, **Active Positions** (`SectionHeader` + quick-action **`button`**s + position **`Card`**s), **Opportunity Scanners** horizontal carousel (**`Card`** + **`Button`** Simulate/Trade, edge spacers + `scroll-padding-inline`), **Common Questions** (FAQ **`Card`**s), **MTF Health** (`Card` + **`Badge`** notice + token gradient bar + buying-power copy), **`BottomNav`**. **INR:** no space after `₹` on amounts; profit line uses `+₹` form where shown.

---

## Order Pad (equity order entry)

**Source:** [4.0 — Order Pad](https://www.figma.com/design/rS7HCW00LH1onTHwaLn99N/4.0---Order-Pad?node-id=7500-107975) (`7500:107975`).

**Code:** `OrderPadPage.tsx`, `OrderPadPage.css`, `orderPadMockData.ts` — **376px** column: scrollable **`.op-scroll`** + **non-scrolling** **`.op-footer`**. **`Header`** `large` (back, scrip title, **`titleTrailing`**: **`Badge`** `live` + Buy/Sell pill), **`Radio`** rows for **NSE/BSE** + LTP, **`SegmentedControl`** for **Delivery / Intraday / Pay Later (MTF - 4x)** (purple “Pay Later” via **`--colour-purple`**), **`Tabs`** for **Regular / Stop-Loss / SIP**, **`Card`** with **`CompactQuantityStepperWidget`**, limit **`TextField`**, **Market Depth** disclosure placeholder, footer MTF promo **`Checkbox`**, required/balance rows, primary **Buy/Sell** CTA (token **positive/negative** fills). **`TextField`** width scoped in **`.op-limit-field`**. **INR:** no space after **`₹`**.

---

## Credit card bill payment (PRD)

**Product PRD** (full journey: bill generation → payment → reconciliation). **Code today:** `CreditCardBillDashboardPage.tsx`, `CreditCardBillDashboardPage.css`, `creditCardBillMockData.ts` — **Bill discovery (B)** only: bill summary, due date, **Pay now** / statement CTAs, **recent payments** with success / pending / failed badges. **Statement details (single screen):** `CreditCardStatementDetailsPage.tsx` + `creditCardStatementMockData.ts` — bill summary via **`BillSummaryWidget`**, INR breakdown rows, recent statement lines via **`LedgerActivityListWidget`**, optional insights card, notices + **Pay now** / download / autopay. **INR:** no space after `₹`.

| PRD area | App / Storybook status |
|----------|-------------------------|
| A Bill generation | Not built — notifications & statement engine |
| **B Bill discovery** | **Dashboard screen** (mock bill + history) |
| C Payment initiation (amounts) | Not built — add step: total / min / outstanding / custom + validations |
| D Payment method | Not built |
| E Review & confirm | Not built |
| F–M Processing, success, pending, failure, settlement, reconciliation, refunds | Backend + status UX — not built |

**Non-goals (PRD):** card application/onboarding; rewards-as-payment; post-statement merchant EMI — out of scope unless product expands.

**Next slices (suggested):** amount selection + warnings (min due / overpay); method picker with settlement copy; review screen; status/polling UI for pending; receipt download stub; payment history from API.

**Shell:** **Screens → Credit card bill**; back returns to **Stocks Discover**. Theme follows `data-theme` on `AppShell`.

---

## Bottom Sheet (responsive surface)

**Code:** `BottomSheet.tsx`, `BottomSheet.css`, `BottomSheetHeader`.

- **Mobile viewport** (below **600px**, token `--bottom-sheet-modal-breakpoint` in `numbers.css`): **Bottom sheet only** — never the centered modal. Fixed overlay, sheet anchored to the bottom, `border-radius` on top corners only, slide-up motion, **HomeIndicator** at the bottom of the sheet. CSS re-asserts this for `max-width: 599px` so narrow layouts cannot pick up modal styles.
- **Tablet / web viewport** (**600px** and up): **Centered modal** — same content and `role="dialog"`, overlay centered with padding, sheet uses **full** `border-radius-24`, stronger elevation shadow, **no** home indicator, `padding-bottom` on the sheet for body/CTA breathing room.

Breakpoint is **viewport-based** (not Storybook “Platform” density), so a wide desktop window still uses the modal even if the app column is phone-width; use a narrow preview or device width **under 600px** to see the bottom sheet.

**Storybook (wide canvas):** toolbar **Mobile** and **Side by side → Mobile** wrap the story in `sb-pml-bottom-sheet-host` (plus a transform host so `position: fixed` stays in-column). `BottomSheet.css` then applies true sheet chrome (home indicator, slide-up, top radii) with selectors that load **after** the viewport `@media (≥600px)` modal block so they always win.
