# Cursor: PML screen generation (master prompt)

Copy everything inside the **Prompt block** below into Cursor when you want a new screen. Replace the screen request in **How To Use** (or paste it with the block).

---

## Prompt block

You are implementing a new screen for the PML app using this repository’s design system.

**Before writing any React code, you must:**

1. Read and follow **`design-system-schema/design-system.registry.json`** — the only catalog of allowed **components**, **widgets**, **layouts**, and **tokens**.
2. Read and follow **`design-system-schema/screen-generation-rules.md`** — composition, styling, and **missing-piece** rules.
3. Use **`design-system-schema/screen-plan.schema.json`** as the **exact** JSON shape for Phase 1 (`screenPlanSchema` and all fields it defines).

**Hard constraints**

- Use **only** registry entries. **Do not invent** widgets, components, layouts, or tokens, or unnamed stand-ins.
- **Prefer widgets** over stitching the same UI from many **components** when a registry widget matches.
- **Prefer registered layouts** (e.g. `PhoneColumnScrollShell` / Stock Home pattern) over ad hoc wrappers for structure.
- Anything **required** but **not** in the registry must appear in **`missingPieces`** (per rules: `MISSING_WIDGET`, `MISSING_COMPONENT`, `MISSING_LAYOUT`, with a short description of what was needed). **Never omit or replace silently.**
- **Avoid arbitrary styling** when tokens or component props cover the need; keep imports aligned with this repo (`src/`, `*Page.css`).

**Include relevant UI states** where they apply: **loading**, **empty**, **error**, **success**, **disabled**, **selected**, **expanded**, **collapsed** — in both the plan (`sections[].states`, `globalStates`) and Phase 2 behavior.

---

### Phase 1: Screen Plan

Output **only** one JSON object matching **`screen-plan.schema.json`** → **`screenPlanSchema`**, including every field below when relevant (use empty arrays or minimal placeholders only if truly N/A).

**Top-level fields (in addition to `screenName`, `description`, `layouts`, `sections`, `globalStates`, `responsiveNotes`, `missingPieces`):**

- **`primaryActions`** — main CTAs for the whole screen (e.g. Pay now, Submit).
- **`secondaryActions`** — supporting actions (e.g. View statement, Skip).
- **`navigation`** — where the user can go next/back; registry or explicit pattern names.
- **`dataDependencies`** — APIs, props, or data the screen assumes (bullets as strings).
- **`copyConstraints`** — locale rules (e.g. **INR: no space after ₹**), tone, truncation.

**Each object in `sections` must include, when relevant:**

- Existing: `name`, `purpose`, `layout`, `widgets`, `components`, `states`.
- **`primaryAction`** — the main action for that section, if any.
- **`secondaryActions`** — extra actions for that section.
- **`dataNeeds`** — data that section needs to render (strings).

**Plan quality gate**

- **`layouts`** and **`sections`** must **agree** (every section’s `layout` and named widgets/components must be consistent with chosen shell and registry).
- **`missingPieces`** lists **every** gap; `[]` only if nothing is missing.
- **Do not start Phase 2** until Phase 1 is **complete** and **internally aligned** (no contradictions, no unnamed blocks). If the user asked for both phases in one message, output **Phase 1 JSON first**, then a clear separator, then Phase 2.

---

### Phase 2: React implementation

Produce **React** (and CSS as needed) **only after** Phase 1 is done and **strictly from that plan**.

- Do **not** add registry items that were not in the plan.
- **`missingPieces`** → do **not** ship fake production UI for those items; use TODOs or **`MISSING_*`** markers per **`screen-generation-rules.md`**.
- Implement **`states`**, **`primaryActions` / `secondaryActions`**, and **`dataDependencies`** as the plan describes (handlers can be stubs if the user allows).
- Apply **`copyConstraints`** in visible strings and formatting.
- Use **tokens** (`var(--…)`) and props; no stray hex/px when a token exists.

---

## How To Use

1. Ensure Cursor can read **`design-system-schema/design-system.registry.json`**, **`design-system-schema/screen-generation-rules.md`**, and **`design-system-schema/screen-plan.schema.json`** (same repo).
2. Paste the **Prompt block** above.
3. Append:

`Screen request: <describe the screen here>`

4. **Controlled:** ask for **Phase 1 only**, review the JSON (including new planning fields), then ask for **Phase 2**. **Single-shot:** ask for *Phase 1 then Phase 2 in one reply* — still output Phase 1 first, then Phase 2, separated.

---

*This file does not define a real screen — reusable instruction template only.*
