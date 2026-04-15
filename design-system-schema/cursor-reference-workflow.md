# Purpose

Reusable instructions for Cursor (or any assistant) to **build or update** a screen from a **visual reference** while staying inside this repo’s **design system**. The reference sets composition, order, density, and behavior expectations; **tokens, components, widgets, and layouts** come from the registry—not copied foreign styling.

# Inputs To Read

Before any analysis, planning, or code, read these files in full (or as much as needed to be accurate):

1. `design-system-schema/design-system.registry.json` — canonical components, widgets, layouts, and tokens.
2. `design-system-schema/screen-generation-rules.md` — screen-building rules and constraints.
3. `design-system-schema/screen-review-checklist.md` — QA checklist for the final pass.
4. `design-system-schema/reference-adaptation-rules.md` — rules for translating references into DS without layout or hierarchy drift.
5. `design-system-schema/reference-blueprint.schema.json` — planning envelope shape for reference-driven pre-work (fill with real values in Phase 1 output).

Follow repo conventions (e.g. `DESIGN.md`, project Cursor rules) when they apply.

# Phase 1: Reference Analysis

Complete **before** any screen plan or implementation. Deliver, in order:

1. **Reference Blueprint** — Regions, section order, grouping, visual density, alignment habits, sticky vs scrollable areas, CTA placement (prose and/or structure aligned with `reference-blueprint.schema.json`).
2. **DS Mapping** — Each reference region → registered **layout** / **widget** / **component**; no silent substitutes.
3. **Token Plan** — Registered tokens only for spacing, typography, color, radius, and related roles per area; no arbitrary literals where a token exists.
4. **Missing Mappings** — Gaps where the reference cannot be represented well; use **`MISSING_MAPPING`** per `reference-adaptation-rules.md` when no exact or strong mapping exists.
5. **Risks** — Residual divergence (token quantization, registry limits, behavior mismatch) after mapping.

**Do not redesign** the macro layout during analysis; describe what the reference shows.

# Phase 2: Screen Plan

- Produce a **normal screen or flow plan** (e.g. conforming to `screen-plan.schema.json` and `screen-generation-rules.md`) **only after Phase 1 is complete**.
- **Section order** and **macro layout** must stay **aligned with the reference** and with Phase 1’s blueprint.
- **Layouts / widgets / components** in the plan must **match Phase 1 DS Mapping**; update Phase 1 first if the plan exposes a mapping error.

# Phase 3: React Implementation

- Use **approved design-system pieces only** (registry + documented patterns); imports must match **real project paths**.
- **Preserve macro layout and density** from the reference within token and component constraints.
- **Do not redesign** the screen (no reordering sections, changing grouping, or moving CTAs for taste).
- If a **required pattern** is missing from the DS, **report it** (`MISSING_MAPPING`, comments, and plan/review notes)—**do not** invent a weak approximation or unregistered structure.

# Phase 4: Review

- **Compare** the implemented screen **against the reference** (structure, hierarchy, density, sticky behavior, CTAs).
- **Explicitly call out** any **spacing** or **hierarchy** differences introduced by tokens, components, or platform constraints.
- **Call out** any **`MISSING_MAPPING`** (or equivalent) items that **reduced fidelity**.
- **Identify** repeated **reference-driven patterns** that should be promoted to a **widget** or **layout** for reuse.
- **Five visual differences (required)** — List **five** concrete visual deltas versus the reference (minor is fine: e.g. chip radius step, label weight, icon size, 8px vs 12px rhythm, hint text color). If fewer than five material differences exist, list every genuine one and state **Total differences: N** with **N < 5**; do not invent gaps.
- **Classify each difference** under the two buckets below (same item may touch both only if accurate):

**Design-system constraints** — Divergence forced or strongly shaped by the DS: registered **tokens** (spacing/type/color steps), **component/widget APIs**, missing registry pieces, platform or accessibility rules, or documented **`MISSING_MAPPING`** tradeoffs.

**Implementation drift** — Divergence from avoidable execution: wrong token choice when a closer one exists, extra wrappers or margins, copy/paste spacing, incorrect variant, stale copy, or bugs—not mandated by the registry or tokens.

# Final Output Format

Respond in this **order** only:

1. **Reference Analysis** — Reference Blueprint, DS Mapping, Token Plan, Missing Mappings, Risks (Phase 1).
2. **Screen Plan** — Structured plan matching project schema/rules (Phase 2).
3. **React Code** — File paths and code blocks (or summarized diffs) as appropriate; no unrelated refactors.
4. **Review Notes** — Checklist summary, reference comparison, fidelity notes, widget/layout candidates (Phase 4); include **five visual differences** (or all found if fewer) split into **design-system constraints** vs **implementation drift**.

# How To Use

Paste this entire file into Cursor, then append:

`Reference: <image or existing screen>`

`Task: <new screen or update existing screen>`

`Non-negotiables: <what must stay close to the reference>`

Optional: Figma link, target routes, Storybook vs app shell, and states to cover.
