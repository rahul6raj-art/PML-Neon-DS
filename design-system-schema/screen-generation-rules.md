# Screen Generation Rules

- Treat **`design-system-schema/design-system.registry.json`** as the single catalog of allowed building blocks and tokens. Do not assume items exist unless they appear there.
- **Do not invent** new components, widgets, layouts, or CSS custom properties/tokens. If something is not in the registry, follow **Missing Piece Rules** instead of substituting silently.
- **Prefer widgets** over stitching the same UI from many low-level components when a widget in the registry matches the use case.
- **Prefer registered layouts** (and established screen patterns such as the phone column + `.sh-content` scroll model documented for this repo) over ad hoc wrapper `div`s for page structure.
- Keep **names, import paths, and composition** aligned with the registry so generated screens stay consistent and implementable.

# Allowed Building Blocks

- **Components** — Small, reusable UI primitives (buttons, inputs, chips, list rows, headers, etc.). Use them for atomic controls and patterns not covered by a widget.
- **Widgets** — Composed blocks (timelines, carousels, portfolio strips, etc.) built from components. Use when the screen needs that whole pattern.
- **Layouts** — Structural shells and framing (e.g. dev preview shell). Use for outer structure where the registry defines a layout; otherwise follow documented screen layout conventions that map to tokens and shared CSS patterns.
- **Tokens** — The **only** approved styling vocabulary for spacing, color, type, radius, shadow, and sizing categories present in the registry. No parallel ad hoc scales.

# Layout Rules

- Use **approved layouts** from the registry for structure they are meant to cover; do not replace them with arbitrary flex/grid wrappers without registry support.
- Prefer **shallow, predictable nesting**: screen root → sections → widgets/components. Avoid deep anonymous wrappers.
- Use **token-based spacing** (`--spacing-*`, `--card-padding-*`, section rhythm from project rules) for gaps and padding.
- **Do not combine** custom margins on children with a parent’s gap-based layout in ways that fight the design system; prefer one mechanism (usually gap + token padding on sections).
- Respect **responsive rules** and constraints described on registry entries (e.g. layout entries); where the registry is silent, follow existing screen references in the repo rather than inventing breakpoints.

# Styling Rules

- Apply **spacing, color, and typography** via registry tokens and existing component/widget APIs only.
- **Avoid inline styles** except for rare cases (e.g. dynamic values not expressible as tokens). Default to CSS modules or co-located screen CSS using `var(--token)`.
- **Do not use arbitrary literals** (random hex, px, font sizes) when a token exists for that role.

# Widget Preference Rules

- **Search widgets first** for the closest match to the screen requirement (e.g. “horizontal card scroller with header” → matching widget if listed).
- **Fall back to components** only when no widget fits; compose from the smallest sufficient set of registry components.

# Missing Piece Rules

- If the screen **requires** a building block that is **not** in the registry, output a clear placeholder in the plan or code comment, using exactly one of:
  - `MISSING_WIDGET`
  - `MISSING_COMPONENT`
  - `MISSING_LAYOUT`
- **Do not** invent a substitute or unnamed clone and treat it as official. Flag the gap so humans can extend the registry or implement explicitly.

# Flow Accuracy Rules

- For **multi-step flows**, the **current step indicator** must always match the **visible screen content** (no progress ahead of the UI, no stale step behind).
- **Completed** steps may be shown as complete **only for previous** steps; **never** mark a **future** step as complete.
- The **page heading** must describe the **current** screen; do not use heading patterns that imply a **tappable row** unless **real navigation** exists to that destination.
- The **primary CTA label** must match the **current step intent** exactly (e.g. Continue vs Confirm and pay vs Retry)—no generic mislabeled actions.
- **Back** must return to the **previous step** in the flow without dropping **valid selections**, unless the product spec **explicitly** resets state on that transition.

# Payment UX Rules

- **Payment flows** must surface financial hierarchy clearly: **payable amount**, **minimum due**, **total due**, **due date**, and **selected payment method** (and card/account identity where applicable).
- **Custom amount** flows must show **helper text** and **validation rules** adjacent to the input (or in the same visual group), not only after submit.
- **Review** screens must **restate** card (or account), **amount**, **payment method**, and **expected result** (e.g. posting note) **before** irreversible confirmation.
- **Success** screens must include **at least one next action** beyond the completion message (e.g. Done, view bill, receipt)—not a dead-end.
- **Failure** screens must include a **retry path** and a **safe exit path** (e.g. back to review or dashboard)—not only error copy.
- **Important financial content** must prioritize **clarity** over **visual minimalism**; do not hide critical numbers or status behind decorative austerity.

# Visual Hierarchy Rules

- **`SectionHeader` (PML app):** Default **`size="extra-large"`** for primary section titles unless PRD/Figma specifies a smaller size for density. For list / drill-in sections, use **`showChevron`** with **`trailing="none"`** (patterns often mis-labeled “See more” or “+ Add” beside the title). **Do not** use **`trailing="link"`** (or trailing text as a faux link) for that affordance; the chevron is the standard treatment.
- Do **not** use **chevron** or **disclosure** on **`SectionHeader`** for **static** headings — titles that **never** lead to navigation, expand/collapse, or a fuller list (**`showChevron={false}`**, **`trailing="none"`**). A chevron must not imply interaction that does not exist.
- Avoid **large dead space** between the **progress indicator** and **main content** unless an **existing product pattern** in the repo requires it; keep transactional flows tight.
- **Section spacing** in transactional flows should feel **dense and purposeful**—use tokens, but prefer rhythms that match bill/pay/checkout references over marketing-style gaps.
- **Inactive** step labels and **metadata** must stay **readable** and must not fall below **practical contrast** (treat “inactive” as de-emphasized, not illegible).

# Reference Fidelity Rules

When a **visual reference** is provided (screenshot, mock, or existing screen used as reference), apply these rules **in addition** to everything above.

- Preserve the reference’s **macro layout**, **section order**, **grouping**, **control density**, and **CTA placement** unless the design system **cannot** support that structure—then declare the limit; do not “fix” the reference on taste.
- **Do not redesign** the screen or **rebalance whitespace** without **justification** tied to token quantization, registry constraints, or an explicit `MISSING_MAPPING` / `MISSING_*` gap.
- **Every major reference region** must be **mapped** to approved **layouts**, **widgets**, or **components** from the registry **before** code generation—no orphan regions stitched with ad hoc wrappers.
- **Every major spacing decision** must use **registered tokens** only; **no arbitrary** gap, padding, margin, or ad hoc scale values when a token role exists.
- If the **closest** DS mapping is **weak** (wrong widget, wrong density, wrong structure), declare **`MISSING_MAPPING`** (per `reference-adaptation-rules.md`) instead of approximating loosely.
- Keep **sibling sections** on a **shared spacing rhythm** unless the reference **clearly** establishes different emphasis between those siblings; do not randomize rhythm screen-to-screen within one reference implementation.
- **Sticky footer**, **sticky CTA**, and **scrollable content** behavior must be **planned explicitly** in the screen plan when the reference shows them—do not imply stickiness only in CSS without a documented split.
- If the reference uses **compact controls** or **dense forms**, map to the **closest DS-supported density** and keep that density **consistent** across the same screen (no mixed ad hoc tight + loose patches).

# Output Process

1. **Analyze** the screen requirement (flows, states, density, copy constraints such as INR formatting if specified).
2. **Produce a screen structure plan** (sections, hierarchy, key interactions) using only registry names.
3. **Choose layouts** from the registry where applicable; otherwise state the documented screen shell pattern you will follow.
4. **Choose widgets** that cover whole sections or patterns.
5. **Fill gaps** with registry **components** only.
6. **Apply tokens and states** (semantic colors, spacing scale, typography tokens/classes) per registry and component props.
7. **Generate final React code** that imports real paths from the registry, composes as planned, and leaves `MISSING_*` markers only where the registry has no match.
