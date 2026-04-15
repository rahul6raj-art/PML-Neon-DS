# Purpose

Reusable instructions for Cursor (or any assistant) to **plan**, **implement**, and **self-review** a mobile-first app screen using this repo’s design-system registry—without inventing unregistered pieces or drifting from project patterns.

# Inputs To Read

Before any planning or code, read these files in full (or as much as needed to be accurate):

1. `design-system-schema/design-system.registry.json` — canonical list of components, widgets, layouts, and tokens.
2. `design-system-schema/screen-generation-rules.md` — screen-building rules and constraints.
3. `design-system-schema/screen-plan.schema.json` — shape and requirements for the screen plan output.
4. `design-system-schema/screen-review-checklist.md` — QA checklist for the final pass.

**If a visual reference is provided** (screenshot, mock, or static image treated as the source of truth), also read **before** planning or code:

5. `design-system-schema/reference-adaptation-rules.md` — rules for translating references into DS without layout or hierarchy drift.
6. `design-system-schema/reference-blueprint.schema.json` — machine-readable template shape for the reference planning artifact (fill with real values during pre-work; file stays the structural contract).

Also follow repo conventions (e.g. `DESIGN.md`, Cursor rules for PML screens) when they apply.

## Reference-image-driven tasks

When a visual reference is in scope, treat the workflow as **strictly multi-phase** before any implementation:

**Mandatory reads** — In addition to **Inputs To Read** above, Cursor must load `reference-adaptation-rules.md` and `reference-blueprint.schema.json` so spacing, mapping, and gates match the reference workflow.

**Pre-code sequence** (complete in order; output may follow `reference-blueprint.schema.json` as the planning envelope):

1. **Reference Blueprint** — Regions, order, stickiness, scroll vs fixed areas, grouping, density (no implementation).
2. **DS Mapping** — Each reference region → registered layout / widget / component; no silent substitutes.
3. **Token Plan** — Registered tokens only for spacing, type, color, and related roles per area.
4. **Missing Mappings** — List gaps; use `MISSING_MAPPING` when no exact or strong DS mapping exists.
5. **Risks** — Residual divergence risks after tokenization or registry limits.

**Rules for reference-based work**

- **Do not redesign** the macro layout; preserve the reference’s overall structure and information architecture.
- Preserve **section order**, **grouping**, **density**, **sticky vs scroll regions**, and **CTA placement** as closely as registry and tokens allow.
- **Adapt visual language** to our design system (tokens, components, widgets)—do not copy foreign styling literals.
- Declare **`MISSING_MAPPING`** when an exact or strong mapping does not exist; do not approximate with unregistered or ill-fitting pieces.
- **Do not proceed to Phase 2 (React Implementation)** until the **Reference Blueprint** and **DS Mapping** are defined (and Missing Mappings / Risks addressed per `reference-adaptation-rules.md`).

For reference tasks, **Phase 1: Screen Plan** must be **consistent** with the completed reference pre-work (merge into `screen-plan.schema.json` output or attach the blueprint artifact as specified by your brief).

# Phase 1: Screen Plan

- Produce a **screen plan** that **conforms to** `screen-plan.schema.json` (field names, nesting, and required concepts as defined there).
- **Use widgets first**; map each major section to registered **widgets**, then **components** only where no widget fits.
- **Use layouts before ad hoc wrappers**: pick a registered **layout** for the screen shell and sections when one applies.
- **Do not invent missing design-system pieces silently.** When the registry lacks what the brief needs, **declare `missingPieces`** (or the schema’s equivalent) and describe the gap.
- If **repeated manual composition** would clearly appear across screens, suggest a **candidate widget** (name + responsibility) in the plan.

**Verification gate (required)** — Before Phase 1 is complete, the plan must **explicitly verify** (in short prose and/or plan fields such as `steps`, `validationRules`, `completionRules`, `failureRecovery` from `screen-plan.schema.json`):

- **Current step label** matches the **visible screen title** for that step (no mismatch between progress UI and content).
- **Stepper statuses** are correct: **previous** steps completed, **current** step in progress, **future** steps not completed.
- **Primary CTA** copy matches the **current step intent** (not a stale label from another step).
- **Validation rules** are defined for **every user input** that can block forward progress (list them in `validationRules` and/or per-section `validation`).
- **Success** and **failure** outcomes include **next actions** (retry, exit, view receipt, etc.) in `completionRules` / `failureRecovery` and in the described sections.
- For **payment / money** flows: **amounts and due values** use a **clear information hierarchy** (what is payable, minimum, total, due date, method)—called out in sections and copy constraints.

# Phase 2: React Implementation

- Implement in React **strictly from the approved registry**.
- **Use widgets first**; use **components** only where no registered widget covers the section.
- **Use layouts before ad hoc wrappers** for structure (shell, scroll regions, section frames)—avoid one-off `div` choreography when a layout is registered.
- Use **semantic tokens** and existing screen patterns; avoid raw hex, magic spacing, and unnecessary inline styles unless the schema explicitly allows an exception.
- **Do not invent missing design-system pieces silently.** Deferrals must be explicit in code comments **and** in **`missingPieces`** / review notes.
- Imports must match **real project paths**.

# Phase 3: Review

- Run a **self-review** against every item in `screen-review-checklist.md` (mentally or by listing pass/fail).
- For **multi-step transactional flows** (checkout, bill pay, confirmations), also verify explicitly in Review Notes:
  - **Stepper accuracy** — indicator matches step; completed vs future steps are not wrong.
  - **Title vs disclosure** — no chevron/disclosure styling on **static** headings; headings are not masquerading as rows.
  - **Dead space and density** — progress-to-content gap and section rhythm feel appropriate for a transactional flow (not oversized marketing gaps).
  - **Financial information hierarchy** — payable amount, dues, dates, and method read in a sensible order with enough emphasis on critical numbers.
  - **Validation clarity** — rules and errors are visible **near** inputs; blocking states are understandable before submit.
  - **Success and failure action completeness** — at least one **next** or **recovery** action beyond the headline message; safe exit where needed.
- Add **Review Notes**: what was hand-composed vs widgetized, any **partial compliance**, and **`missingPieces`** still true after implementation.
- If repeated manual composition appears, restate **candidate widget** promotion (name, props sketch, where it would live).

# Final Output Format

Respond in this **order** only:

1. **Screen Plan** — JSON or structured object matching `screen-plan.schema.json` (as specified in `screen-generation-rules.md` if stricter).
2. **React Code** — file paths and code blocks (or summarized diffs) as appropriate; no unrelated refactors.
3. **Review Notes** — checklist summary, `missingPieces`, manual composition, widget candidates.

# How To Use

Paste this entire file (or the sections above) into Cursor, then append your brief:

`Screen request: <describe the screen here>`

Optional: specify Figma link, states to cover, and whether Storybook or app shell wiring is required.
