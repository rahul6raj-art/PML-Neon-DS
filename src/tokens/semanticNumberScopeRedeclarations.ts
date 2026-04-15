/**
 * CSS custom-property lines (no selector) re-declared on a **platform scope** immediately after
 * scoped `--unit-*` overrides. Without this, descendants keep `:root`'s *computed* `--spacing-*` /
 * `--radius-*` pixels and ignore the new unit scale.
 *
 * **Keep in sync** with the matching semantic block in `src/tokens/numbers.css` (`:root`).
 */
export const SEMANTIC_NUMBER_SCOPE_REDECLARATIONS: readonly string[] = [
  '--spacing-2: var(--unit-1);',
  '--spacing-4: var(--unit-2);',
  '--spacing-6: var(--unit-3);',
  '--spacing-8: var(--unit-4);',
  '--spacing-12: var(--unit-6);',
  '--spacing-16: var(--unit-7);',
  '--spacing-24: var(--unit-9);',
  '--spacing-32: var(--unit-10);',
  '--spacing-48: var(--unit-11);',
  '--spacing-56: var(--unit-12);',
  '--spacing-60: var(--unit-13);',
  '--card-padding-block: var(--spacing-24);',
  '--card-padding-inline: var(--spacing-16);',
  '--radius-4: var(--unit-2);',
  '--radius-8: var(--unit-4);',
  '--radius-12: var(--unit-6);',
  '--radius-16: var(--unit-7);',
  '--radius-24: var(--unit-9);',
  '--radius-full: var(--unit-max);',
  '--radius-pill-40: calc(var(--spacing-32) + var(--spacing-8));',
  '--touch-target-standard: calc(var(--spacing-32) + var(--spacing-4));',
  '--wheel-carousel-pill-radius: var(--radius-pill-40);',
  '--wheel-carousel-label-column: calc(var(--spacing-32) + var(--spacing-8) + var(--spacing-2));',
  '--wheel-carousel-tab-gap: calc(var(--spacing-12) + var(--spacing-8));',
  '--wheel-carousel-tab-width: calc(var(--wheel-carousel-label-column) + var(--wheel-carousel-tab-gap));',
];
