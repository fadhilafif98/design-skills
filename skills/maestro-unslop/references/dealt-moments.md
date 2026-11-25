# Dealt Moments & Quiet Micro-Interactions

Every page gets **one hero entrance**, **quiet baseline micro-interactions**, and **1–2 dealt moments** matched to its business kind. Never repeat the same fade-up on every section.

## 1. Baseline Micro-Interactions (Always On)

Keep motion crisp, purposeful, and GPU-composited (`transform`, `opacity`, `clip-path` only). Never use `transition: all` or `ease-in` for UI entrances.

- **Buttons / Pressables:** Subtle hover step (background or ink shift, `160ms ease-out`) + tactile press (`:active { transform: scale(0.97); }`).
- **Linked Cards / Rows:** Crisp `translateY(-2px)` lift or hairline ink shift on `@media (hover: hover)` only.
- **Framed Photos:** Quiet `scale(1.025)` inside `overflow: clip` on hover (`320ms cubic-bezier(0.22, 1, 0.36, 1)`).
- **Text Links:** Clean underline draw or opacity shift; no decorative arrow bouncing.
- **Hero Entrance:** Runs once on load (`240–480ms`, `cubic-bezier(0.16, 1, 0.3, 1)`). Never start elements at `scale(0)`.

## 2. Resilience Guards (Mandatory)

```css
/* Default to visible static state; hide reveal targets ONLY when JS + motion opt-in apply */
@media (prefers-reduced-motion: no-preference) {
  .js [data-reveal] {
    opacity: 0;
    transform: translateY(14px);
  }
  .js [data-reveal="visible"] {
    opacity: 1;
    transform: none;
    transition: opacity 420ms cubic-bezier(0.16, 1, 0.3, 1),
                transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
  }
}
```

Never apply a global `animation-duration: 0.01ms !important` reset—keep non-motion color/background transitions alive and opt in to spatial motion per-rule inside `@media (prefers-reduced-motion: no-preference)`. Immediately mark any `[data-reveal]` already in or above the viewport as `visible` on load so no band ever stalls blank.

## 3. Dealt Moments Catalog (Pick 1, Max 2 on Long Pages)

### Photo- & Type-Led Moments (All Business Kinds — Required for `place`, `service`, `product`)

| ID | Moment | Best For | Implementation Note |
|---|---|---|---|
| `type-billboard` | One oversized typographic band (address, opening ritual, or core claim) spanning full container width | `place`, `service`, `product` | `clamp()` fluid display size, tight leading (`0.95`), high contrast, zero ornament |
| `photo-chapters` | Sticky left caption/index paired with 3–4 full-height photographic chapters scrolling on the right | `place`, `product`, `service` | CSS `position: sticky` + `IntersectionObserver` active state; stacks cleanly on mobile |
| `swatch-swap` | Interactive material/colour/roast selector that swaps the main visual and spec readout live | `product`, `place` | Native `<button aria-pressed>` + instant image/spec update; `<noscript>` shows default |
| `aperture-reveal` | Full-width visual that opens via `clip-path: inset(...)` as it enters the viewport | `place`, `product`, `gaming` | CSS scroll-driven `animation-timeline: view()` behind `@supports` with IntersectionObserver fallback |
| `index-drawer` | Clean ruled list (menu, FAQ, or case studies) using native `<details>` with smooth grid-row reveal | `service`, `place`, `product` | Native `<details>/<summary>`, zero third-party accordion bloat |

### Technical & Interactive Moments (Strictly `software`, `tech`, `gaming` Only)

| ID | Moment | Best For | Implementation Note |
|---|---|---|---|
| `live-ui-frame` | Real interactive HTML mockup of the product's core artifact (diff accept, query run, state toggle) | `software` | Real DOM controls with real state transitions; keyboard accessible |
| `pulse-diagram` | Clean SVG hub-and-branch or 3-lane pipeline diagram with subtle CSS stroke-dashoffset pulse | `software`, `tech` | Max 1 per page, crisp vector lines, pauses under `prefers-reduced-motion` |
| `telemetry-strip` | Tabular-nums engineering ledger or interactive spec/tier switcher | `tech`, `software` | `font-variant-numeric: tabular-nums`; real numbers or `[FILL]` |
| `ambient-canvas` | Single restrained 2D Canvas or shader backdrop inside hero or one `[data-visual]` frame | `tech`, `gaming`, `software` | Respect `prefers-reduced-motion`, pause when offscreen, never replace key art or product UI |

*Adapted from `leonxlnx/taste-skill` (MIT) dealt moments and `maestro` (`motion-playbook.md`, `interaction-details.md`).*
