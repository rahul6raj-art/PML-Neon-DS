# PML app — implementation learnings

Short index of **decisions and gotchas** from building PML app previews. **Canonical specs** stay in **`DESIGN.md`**, **`.cursor/rules/pml-screen-patterns.mdc`**, **`design-system-schema/screen-generation-rules.md`**, and **`design-system-schema/layout-candidates.md`**.

**Note:** Eight demo screens (**Goals**, **Rewards**, **Doctor schedule**, **Order pad**, **Fintech wallet home**, **Cards**, **Portfolio details**, **MTF home**) used to live under **`src/PML App/`** and were removed earlier; the **`src/PML App/`** folder itself is now gone. **This file keeps their patterns** so new work does not rediscover the same issues.

---

## App shell inventory (current)

There is **no** in-app screen shell: **`AppShell`** was removed. The Vite **`App`** renders **nothing** (`null`). The **`src/PML App/`** directory (product previews) has been removed. Use **`npm run storybook`** for UI.

---

## Cross-screen patterns (apply everywhere)

### Phone column & scroll

- **376px** column (**`--phone-column-width`**), **`height: 100vh`** (or **`100dvh`** where safe-area matters), **`display: flex; flex-direction: column`**, **`overflow: hidden`** on the root page class.
- Main body scrolls in a **dedicated child** (e.g. **`.sh-content`**, **`*-page__scroll`**) with **`flex: 1`**, **`min-height: 0`**, **`overflow-y: auto`** — avoids the whole page fighting the shell.
- **Dense transactional flows:** split **scrollable body** from a **non-scrolling footer** when the spec shows a sticky primary CTA (historical **order pad** used **`.op-scroll`** + **`.op-footer`**).

### Sections & headers

- **`SectionHeader`:** default **`size="extra-large"`** for new product sections; list-style headers use **`trailing="none"`** + chevron — **not** a **“See all” / “View all”** text link beside the title unless PRD/Figma explicitly requires it.
- **Vertical rhythm between major blocks:** typically **`margin-top: var(--spacing-56)`** on **`.sh-section`**-style blocks (or documented exception); section content often **`padding: var(--spacing-16)`** on **`.sh-section__content`**.

### INR & numbers

- **No space** between **`₹`** and the amount (**`₹8,00,694`**, **`+₹240.50`**). Use **`en-IN`** grouping where helpers exist.
- **Loyalty / points balances** are **not INR** — use a dedicated formatter (historical **Rewards** used something like **`formatRewardPoints`**) and do not reuse INR helpers blindly.

### `TextField` inside `Card`

- **`TextField`** root defaults to **~344px** width; **`Card`** max width **includes** padding, so the **inner** track is narrower — fields can **visually overflow** the card.
- **Fix:** scope on the form/wrapper — **`.my-page__form .textfield { width: 100%; max-width: 100%; min-width: 0; }`**, with **`form`** **`min-width: 0`** when the parent is flex. **Historical:** auth previews (**`LoginPage.css`**, **`SignUpPage.css`**) and order-entry screens scoped **`.op-limit-field .textfield`** (and inner **`.textfield__box`**) so limit fields stayed inside the card.

### Stacked inputs in auth / card forms

- Use **`gap: var(--spacing-24)`** between stacked **`TextField`** rows — not **`--spacing-16`** unless spec says denser. Avoid **extra `margin-top`** on the submit block when **`gap`** already separates the last field from the CTA.

### Horizontal strips & carousels

- Prefer **`::before` / `::after`** flex **spacers** + **`scroll-padding-inline`** (and hidden scrollbars where needed) so first/last items **do not stick flush** to the viewport edge — same idea as **`ReminderWidget`** and **Stock Home**; removed demos (**Doctor schedule** day/doctor strips, **Rewards** check-in week / milestones) followed this.
- **Discover** (removed) carousels followed the same token rhythm; **StocksTilesWidget** horizontal scroll was scoped via **`.dv-strategies-stw`** when strategy tiles needed different density/colour.

### Bottom chrome

- Prefer **`BottomNav`** + **`HomeIndicator`** from the design system over **custom `role="tablist"`** bars unless **`BottomNav`** cannot meet the spec (FAB-center slot, etc.) — document **`MISSING_*`** if a reference demands it.
- **`activeIcon`:** only set when the product wants **outline → filled** on the **active** tab; otherwise omit **`activeIcon`** so active state is **tint + glow** only.

### Card-like stacked lists — two divider models

| Model | When | Mechanism |
|--------|------|-------------|
| **Custom row stacks** | Elevated surface with **no** inner card padding on the list area | **Inset** hairlines **`var(--card-padding-inline)`** from each side — **`::before`** on a **block row wrapper** (not a flex item). First/last row vertical pad **`--card-padding-block`**, middle rows denser — per **`pml-screen-patterns.mdc`**. *(Historical class names: task rows with **`__task-wrap`**, goal tx rows with **`__tx-row-wrap`**.)* |
| **`Card` + stacked `ListItem`** | Default **`Card`** horizontal padding wraps the list | Dividers **full width of the padded body**; scope **`li-item__separator`** / **`--inset`** to **`left: 0; right: 0`** + **`--border-neutral-weak`** on a **class on the `Card`** (e.g. **`.my-screen__tx-card`**). **`showSeparator`** between rows except the last. |

Do **not** assume only the first model when **`ListItem`** lives inside a padded **`Card`**.

### `ListItem` separators (global)

- Separators must use a **defined** border token — **`--border-neutral-weak`**. **`--border-neutral-light`** was **invalid** and made hairlines invisible (**`ListItem.css`** fix).

### Portfolio / Stock Home area

- **Do not** reimplement **PortfolioWidget** time chips / values layout in page CSS — compose **`PortfolioWidget`** on **Stock Home** and similar.

### States & compliance

- **Holdings / portfolio previews:** keep **loading**, **empty**, and **partial failure** paths explicit (dismissible **`Alert`**, skeleton **`Loading`**) — a removed **portfolio details** demo wired this via a **`previewState`**-style prop for Storybook.
- **Discover** (removed) included **informational / delayed data** placeholder copy — replace with real compliance text before ship when rebuilding (**`DESIGN.md`**).

### Theme & header

- When a page toggles **`colorScheme`**, **`Header`** may need **`key={colorScheme}`** so internal chrome resets with the scheme (was used on a removed **fintech wallet** preview).

### Bottom sheet (component, not a full “screen”)

- **Viewport &lt; 600px:** bottom sheet + **HomeIndicator**; **≥ 600px:** centered modal — breakpoint is **viewport width**, not Storybook platform density. Wide desktop preview still shows **modal** unless the preview host narrows the viewport (**`DESIGN.md`** + **`BottomSheet.css`**).

---

## Active screens (repo paths)

None — there is **no** **`src/PML App/`** tree. Add product screens under a feature folder when needed and compose them in **`App.tsx`** or Storybook only.

---

## Removed demos — patterns only (no `src/` files)

| Flow | What to remember when rebuilding |
|------|----------------------------------|
| **Cards** | **`SegmentedControl`**, **`GraphWidget`**, **`Card` + `ListItem`**: amounts via **`trailing="text"`**, **`align-items: flex-start`** on **`.li-item__main`**, separator overrides on the **card** class, **`showSeparator`** between rows. |
| **Goals** | Hero + summary **`Card`** (**`min-height: 0`** when dense); **`ActivityTimeline`**; transaction list = **custom row wrappers** + inset **`::before`** dividers (first model). |
| **Rewards** | Page **gradient**; optional **no `BottomNav`**; check-in **horizontal strip** + earn tasks **`Card`** with wrapper + inset dividers; primary **Check in** **`Button`** **`filled`** **`large`**. |
| **Doctor schedule** | **`StatusBar`** + top bar; **`TextField`** search; horizontal strips with **spacers**; **`Chip`** filters; appointment **`Card`**s; **`BottomNav`** not a custom tab bar. |
| **Order pad** | **`SegmentedControl`**, **`Tabs`**, **`CompactQuantityStepperWidget`**; **`.op-limit-field`** **`TextField`** width; purple MTF accent **`--colour-purple`**. |
| **Fintech wallet** | Homepage **`Header`** + **`BrandLogo`** theme; balance **`Card`** + quick actions; **`ListItem`** activity; **`BottomNav`**. |
| **MTF home** | Stock Home–style shell; **`SectionHeader`**, carousels with edge spacers, **`+₹`** where shown. |
| **Portfolio details** | **`PortfolioWidget`**, **`AllocationBreakdownWidget`**, **`HoldingsSectionWidget`**; loading / empty / partial **`Alert`**. |

---

## Widgets reused across screens

- **`StocksTilesWidget` / `Tile`:** optional top media, **`Badge`**, price + move; **`changeSentiment`** for sign handling; **`variant="strategy"`** + **`strategyItems`** for multi-card-in-one-tile. **INR** spacing rule applies in demo copy.
- **`GraphWidget`**, **`HeatmapWidget`**, **`AllocationBreakdownWidget`**, **`HoldingsSectionWidget`**, **`CompactQuantityStepperWidget`**, **`ActivityTimeline`** — prefer composition from **`src/components/`** over duplicating layout in feature CSS.

---

## Fidelity vs design system

- Reference-only chrome (e.g. **center FAB**, **filled home icon**) **does not override** registry components unless the user opts out in writing or **`MISSING_*`** is recorded — prefer **tokens + `BottomNav` / `Header` / `Card`** and note gaps in **`DESIGN.md`**.

---

*Last updated: **AppShell** removed; learnings for removed demos and archived previews preserved in this file.*
