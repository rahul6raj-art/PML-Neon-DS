# PML app — implementation learnings

Short index of **decisions and gotchas** from building PML app previews. **Canonical specs** stay in **`DESIGN.md`**, **`.cursor/rules/pml-screen-patterns.mdc`**, **`design-system-schema/screen-generation-rules.md`**, and **`design-system-schema/layout-candidates.md`**.

**Note:** Eight demo screens (**Goals**, **Rewards**, **Doctor schedule**, **Order pad**, **Fintech wallet home**, **Cards**, **Portfolio details**, **MTF home**) used to live under **`src/PML App/`** and were removed earlier; the **`src/PML App/`** folder itself is now gone. **This file keeps their patterns** so new work does not rediscover the same issues.

### Pattern drills vs shipped product

Some **`src/features/*`** pages and **`App.tsx`** wiring may exist **only** to practice **shell geometry**, **`.sh-section` / `.sh-section__content` rhythm**, **`SectionHeader` → `Card` spacing**, **shared shell CSS inheritance**, and **bottom tab chrome** — **not** as final product UX. **What must survive if those files are deleted** is already captured here and in **`.cursor/rules/pml-screen-patterns.mdc`**, **`design-system-schema/layout-candidates.md`**, and **`design-system-schema/screen-generation-rules.md`** (plus **`DESIGN.md`** when flows are product-owned). **Skills = those written patterns + Storybook component catalog**, not retention of any one drill screen. When building a drill: still **diff the reference screen** in the same shell (**Sections & headers → Reuse shell CSS → treat the prior screen as spec**); then **promote** any new rule into **`pml-screen-patterns.mdc`** / **this file** so it survives removal of the example code.

---

## App shell inventory (current)

**`AppShell`** was removed. **`src/PML App/`** is gone — use **`npm run storybook`** for the component catalog. The Vite **`App`** entry may host **temporary teaching previews** (e.g. tabbed shell + feature scroll bodies); that markup is **optional** and may be replaced or deleted without losing layout rules, as long as **this file** and **`pml-screen-patterns.mdc`** stay updated when new patterns are discovered.

---

## Consolidated — App drill screens (layout & spacing)

Single checklist distilled from **`App.tsx`** + **`SmartHomeScrollContent`** / **`SmartHomePage.css`**, **`ExchangePage`**, and **`GoalsDetailPage`** / **`GoalsDetailPage.css`**. **Deleting those feature files does not remove this guidance** — it lives here and in **`pml-screen-patterns.mdc`** / **`layout-candidates.md`**.

| Topic | Rule |
|--------|------|
| **Phone column** | **`width: var(--phone-column-width)`** (**376px**), **`min-height: 100vh`**, column **`flex`**, **`overflow: hidden`**, **`text-align: left`**, page backdrop **`--surface-level-4`** (or outer host **`--surface-level-3`** when centering the column). |
| **Scroll** | Main body in **`.smh-sh-content`** (or **`gdp-sh-content`**): **`flex: 1`**, **`min-height: 0`**, **`overflow-y: auto`**, bottom **`padding-bottom: var(--spacing-16)`** where used. |
| **Bottom nav** | Sibling **below** scroll (**`.smh-sh-bottom-nav`**): **`flex-shrink: 0`**, **`BottomNav`** + optional **`HomeIndicator`**, **`activeIndex` / `onChange`** for tabs. Outline icons; omit **`activeIcon`** unless spec wants filled-on-active. |
| **Tab shell** | **`App.tsx`**: one **`smh-stock-home`** root; swap **`SmartHomeScrollContent`** / **`ExchangePage`** / placeholders by tab index — pattern for **shared chrome + distinct scroll bodies**. |
| **Section vertical gap** | **`.smh-stock-home .sh-section { margin-top: var(--spacing-56) }`** = space **between major blocks** (e.g. after hero). **Not** for first **`sh-section`** immediately after **`Header`** only — override with **`margin-top: var(--spacing-16)`** via a **more specific** selector (e.g. **`.smh-stock-home .sh-section.ex-section-swap`**). |
| **Title → first card** | When **`.sh-section__content`** uses **`padding-block: 0`**, add **`display: flex; flex-direction: column; gap: var(--spacing-16)`** on **`.sh-section`** so **`SectionHeader`** and the first **`Card`** are not flush. **Refs:** **`.smh-section-wallet`**, **`.ex-section-swap`**, **`.ex-section-pairs`**. |
| **`sh-section__content` + layout** | Keep **`sh-section__content`** + second class (**`smh-wallet-grid`**, **`smh-promo-row`**, **`ex-swap-wrap`**) for gutters + grid/row **`display`** / **`gap`**. |
| **`SectionHeader` + icons** | Do **not** patch **`SectionHeader.css`** for one screen — use **`className`** + feature CSS (e.g. **`.smh-wallet-section-header .sh__title-row`**). |
| **`SectionHeader` XL, no chevron** | **`size="extra-large"`** + **`showChevron={false}`** for static XL titles. **Omit **`showChevron`** to get default (XL → chevron on). **`showChevron={true}`** forces chevron. Widgets that wrap **`SectionHeader`** must **not** pass **`showChevron={false}`** unless they mean it — **omit** the prop to inherit defaults (see **`StocksTilesWidget`**). |
| **Forms in cards** | **`TextField`**: **`width: 100%; max-width: 100%; min-width: 0`** scoped on the card/form; stacked fields **`gap: var(--spacing-24)`**. |
| **INR** | No space between **`₹`** and digits (**`fmtInr`** / **`en-IN`**). |
| **Goals detail shell** | Parallel Stock Home pattern: **`.gdp-stock-home`** + **`.gdp-sh-content`** + **`GoalsDetailPage.css`**; **`ActivityTimeline`** in **`Card`**; **`ListItem`** in **`Card`** with **`.gdp-tx-card`** separator overrides per **`pml-screen-patterns.mdc`**. |

---

## Cross-screen patterns (apply everywhere)

### Phone column & scroll

- **376px** column (**`--phone-column-width`**), **`height: 100vh`** (or **`100dvh`** where safe-area matters), **`display: flex; flex-direction: column`**, **`overflow: hidden`** on the root page class.
- Main body scrolls in a **dedicated child** (e.g. **`.sh-content`**, **`*-page__scroll`**) with **`flex: 1`**, **`min-height: 0`**, **`overflow-y: auto`** — avoids the whole page fighting the shell.
- **Dense transactional flows:** split **scrollable body** from a **non-scrolling footer** when the spec shows a sticky primary CTA (historical **order pad** used **`.op-scroll`** + **`.op-footer`**).

### Sections & headers

- **Reuse shell CSS → treat the prior screen as spec:** When a new tab or screen shares another feature’s **root / layout classes** (e.g. **`.smh-stock-home`** + rules in **`SmartHomePage.css`**), **open that reference screen’s TSX and CSS** and compare **order of children** after **`Header`** (hero vs first **`sh-section`**). **`grep`** the shared stylesheet for **`sh-section`**, **`sh-section__content`**, **`margin-top`**, **`gap`** — anything that keys off a class your new markup also uses inherits those values. **Smart Home** (**`SmartHomeScrollContent`**) is the reference for anything still mounted under **`App.tsx`**’s **`smh-stock-home`** shell; diff against it **before** assuming **16px** / **56px** rhythm “by default.”
- **`SectionHeader`:** default **`size="extra-large"`** for new product sections; list-style headers use **`trailing="none"`** + chevron — **not** a **“See all” / “View all”** text link beside the title unless PRD/Figma explicitly requires it.
- **Screen-specific `SectionHeader` layout (flex / alignment):** Do **not** edit **`src/components/SectionHeader/SectionHeader.css`** to match one screen’s browser preview (e.g. **`justify-content`** or **`align-items`** on **`.sh__title-row`** / **`.sh__title-line`**) — those classes are **shared** and the change applies app-wide. Instead: pass **`className`** on **`SectionHeader`** for that screen (e.g. **`smh-wallet-section-header`**) and put the overrides in the **feature** stylesheet (**`SmartHomePage.css`**), scoped under that class. **Reference:** SmartWallet block on **Smart Home** — **`.smh-wallet-section-header .sh__title-row`** (**`align-items: center`**, **`justify-content: center`**) and **`.smh-wallet-section-header .sh__title-line`** (**`justify-content: flex-start`**).
- **Vertical rhythm between major blocks:** typically **`margin-top: var(--spacing-56)`** on **`.sh-section`**-style blocks (or documented exception); section content often **`padding: var(--spacing-16)`** on **`.sh-section__content`**.
- **`sh-section__content` + feature layout class:** Keep the **Stock Home–style** content wrapper class **`sh-section__content`** so page-level rules (e.g. **`.smh-stock-home .sh-section__content`** — **16px** gutters, vertical pad policy) apply consistently. Add a **second** class for **layout only** on that node — e.g. **`sh-section__content smh-wallet-grid`** (two-column **`Card`** tiles under SmartWallet) and **`sh-section__content smh-promo-row`** (horizontal shortcut **`Card`**s). Scope grid/row **`display`**, **`gap`**, and **`margin-top`** in the **feature** CSS on the **combined** selector or the **`smh-*`** class. When the block has a **`SectionHeader`**, wrap in **`<section class="sh-section …">`**; blocks **without** a section title may still use **`sh-section__content`** + **`aria-label`** on the content wrapper for the same gutter rhythm (**Smart Home** promos).
- **`SectionHeader` → card when `padding-block: 0` on content:** If **`sh-section__content`** has **`padding-block: 0`** (shared page rule), use **`display: flex; flex-direction: column; gap: var(--spacing-16)`** on the parent **`.sh-section`** so there is still **16px** between the header and the first **`Card`**. Same pattern as **`.smh-section-wallet`** / **Exchange** **`.ex-section-swap`**. See **`.cursor/rules/pml-screen-patterns.mdc`** → **Section pattern** → **`SectionHeader` → first card (vertical)**.
- **First `.sh-section` after `Header` (no hero):** **`.smh-stock-home .sh-section { margin-top: var(--spacing-56) }`** is for blocks **below** the Smart Home hero. If another tab/screen starts with **`Header` → `sh-section`** with no hero, override the first section with **`margin-top: var(--spacing-16)`** (higher-specificity selector, e.g. **`.smh-stock-home .sh-section.ex-section-swap`**) so the gap under the app header is not **56px**.

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

There is **no** canonical **`src/PML App/`** tree. **`src/features/*`** + **`App.tsx`** may hold **pattern drills** or product previews — see **Pattern drills vs shipped product** above. Prefer **Storybook** for stable component review; promote any rhythm learned from throwaway screens into **written specs** before deleting drill code.

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

*Last updated: **Consolidated — App drill screens** checklist; **`StocksTilesWidget`** **`showChevron`** omit-by-default; **pattern drills**; **Sections & headers**.*
