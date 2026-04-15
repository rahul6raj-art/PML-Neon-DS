# Purpose

This workflow recreates the **structure and hierarchy** of a supplied visual reference using **our design system**—components, layouts, widgets, and tokens from the approved catalog. It is **not** an exercise in copying foreign pixels, one-off spacing, or reference-specific styling. The outcome should read as a native DS screen that faithfully carries the reference’s composition intent.

# Reference Translation Rules

- **Analyze the reference before writing code.** Identify regions, reading order, and relationships between blocks; do not improvise layout while coding.
- **Extract explicitly:** section order, layout structure (columns, stacks, grids implied by the reference), visual density, alignment habits, logical grouping, and any **sticky** vs **scrollable** regions.
- **Preserve composition intent**, not incidental styling from the reference (arbitrary colors, shadows, font stacks, or non-token spacing).
- **Do not redesign** the screen when a reference is provided: no reordering sections, merging blocks, or “improving” IA unless the brief explicitly allows it.

# Layout Preservation Rules

- Preserve **header / body / footer** (or equivalent shell) as distinct regions when the reference implies them.
- Preserve **sticky vs scrollable** behavior: if the reference keeps a bar, filter, or summary fixed while content moves, mirror that split using approved layouts or documented patterns.
- Preserve **major groupings and section order**; keep sibling groups in the same sequence unless a mapping conflict is declared under Missing Mappings.
- **Avoid adding or removing whitespace** without justification tied to token rhythm or an explicit mapping gap; do not “air out” or tighten the screen relative to the reference on taste alone.
- Keep **control density** close to the reference: similar number of visible controls per row/section and comparable vertical rhythm after token quantization.

# Design System Mapping Rules

- Every **major reference region** must map to an **approved** layout, widget, or component from the registry (or documented screen pattern that itself uses registry pieces).
- **Adapt visual language** to our design system: tokens for color, type, radius, elevation; component variants where they exist.
- **Do not invent** one-off wrappers, bespoke grid systems, or ad hoc layout patterns not grounded in registry layouts or established repo conventions.
- If **no exact mapping** exists, **declare** the gap (see Missing Mapping Rules)—do **not** approximate loosely with unrelated widgets or arbitrary CSS.

# Token Rules

- **Spacing** (gap, padding, margin, stack rhythm) must use **registered tokens only**—no arbitrary numeric values.
- **No arbitrary** `gap` / `padding` / `margin` literals when a token role exists; if multiple tokens are plausible, pick one and reuse it consistently across the screen.
- **Repeated section rhythm** (e.g. space between cards, between section title and content) should use the **same token choices** wherever the reference implies equal rhythm.
- Where the reference is **dense**, map to the **closest approved smaller-step tokens** and apply them **consistently**—do not mix ad hoc tight values with tokenized loose values in the same rhythm.

# Missing Mapping Rules

- When a reference pattern **cannot** be represented well with current design-system pieces, label it **`MISSING_MAPPING`** in the plan output (with a short description of what the reference needs and which registry gaps block a faithful implementation).
- **Prefer** declaring `MISSING_MAPPING` over silently shipping a weak stand-in (wrong widget, wrong layout shell, or token-violating layout).
- Do not use `MISSING_MAPPING` to bypass token rules; spacing and typography must still honor tokens even when a structural pattern is missing.

# Output Requirements

Before generating **any** implementation code for a reference-driven screen, produce these phases **in order**:

1. **Reference Blueprint** — Structured description of regions, order, stickiness, scroll model, grouping, and density as seen in the reference (no DS names yet).
2. **DS Mapping** — For each blueprint region: target layout / widget / component (registry id or documented pattern); note where one DS piece covers multiple reference blocks or vice versa.
3. **Token Plan** — Per region and for global rhythm: which spacing, type, color, radius, and related tokens apply; explicit rejection of any non-token literals.
4. **Missing Mappings** — List of `MISSING_MAPPING` items with rationale; empty section only if every region has an acceptable mapping.
5. **Risks** — Where hierarchy, density, or behavior might still diverge from the reference after mapping (e.g. token quantization, unavailable sticky primitive); no code until these phases are complete and reviewed if required by the workflow.
