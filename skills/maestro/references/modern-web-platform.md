# Modern Web Platform & Baseline Fallback Policy

Prefer **native browser APIs** over heavy JavaScript libraries and legacy CSS workarounds. Platform-native features are faster, smaller, and ship with built-in keyboard/screen-reader accessibility.

Synthesised from [GoogleChrome/modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance) and Web Platform Baseline.

---

## 1. Baseline Browser Support Policy

- **Baseline Widely Available:** use directly without polyfills (e.g. CSS Grid, `subgrid`, `@container`, `<dialog>`, `popover`, `oklch()`, `100svh`, `aspect-ratio`, `overflow: clip`, `:focus-visible`, `loading="lazy"`, `fetchpriority`).
- **Baseline Newly Available / Limited:** use with `@supports (...)` progressive enhancement or a lightweight (≤ 20-line) fallback so Safari/Firefox degrade gracefully without shipping heavy polyfills (e.g. `animation-timeline`, `@starting-style`, `interpolate-size`, `anchor-name`, `text-box-trim`, `field-sizing`, View Transitions).
- **Sibling skill integration:** if the `modern-web-guidance` skill is installed in your agent environment, consult it first before writing custom JS/CSS for dialogs, popovers, anchor positioning, scroll-driven animations, forms, or INP optimization.

---

## 2. Native UI Primitives (Replace JS Widget Bloat)

| Need | Native Modern Solution | Legacy Pattern to Avoid |
|---|---|---|
| Modal / Lightbox / Drawer | `<dialog>` + `showModal()` + `::backdrop` + built-in `Esc` close & top-layer | `<div class="modal">` + manual `z-index: 9999` + custom focus trap JS |
| Dropdown / Tooltip / Menu | Popover API (`popover` + `popovertarget`) + CSS Anchor Positioning (`anchor-name`, `position-anchor`) | Popper.js / Floating UI for simple tooltips & menus |
| Exclusive Accordion / FAQ | `<details name="faq-group"><summary>...</summary>...</details>` | Custom JS height-measuring accordion |
| Entry/Exit & `height: auto` | `@starting-style` + `transition-behavior: allow-discrete` + `interpolate-size: allow-keywords` | JS `scrollHeight` toggling or `max-height: 9999px` hacks |
| Clickable Controls | Native `<button type="button">` and `<a href>` | `<div onclick>` / `<span onclick>` |

---

## 3. Modern CSS Layout, Typography & Motion

1. **Mobile Viewport Height:** always use `100svh` (stable) or `100dvh` (dynamic) instead of `100vh` so mobile browser bars never clip hero headlines or primary CTAs.
2. **Sticky-Safe Overflow:** use `overflow-x: clip` (not `overflow: hidden`) on ancestors of `position: sticky` elements.
3. **Component-Level Responsiveness:** use **Container Queries (`container-type: inline-size` + `@container`)** for reusable cards/modules and **CSS Subgrid** (`grid-template-rows: subgrid`) to align uneven peer content cleanly.
4. **Optical Typography Craft:**
   - `text-wrap: balance` on display headings (`h1`, `h2`); `text-wrap: pretty` on body paragraphs to prevent orphan words.
   - `text-box-trim: trim-both; text-box-edge: cap alphabetic;` (progressive enhancement) to eliminate invisible font-metric padding above/below monumental display headlines.
5. **Native Scroll-Driven Animations & View Transitions:**
   - For simple scroll progress bars, parallax planes, or section reveals, prefer **CSS Scroll-Driven Animations** (`animation-timeline: view()` / `scroll()`) wrapped in `@supports (animation-timeline: view())` and `@media (prefers-reduced-motion: no-preference)`. Reserve GSAP ScrollTrigger for complex pinned timelines, SplitText choreography, or multi-stage narrative sequences.
   - Use **View Transitions API** (`@view-transition { navigation: auto; }` for multi-page sites, `document.startViewTransition()` for state/filter changes) gated by `prefers-reduced-motion`.

---

## 4. Modern Forms & Runtime Performance

- **Validation without premature errors:** style invalid fields with `:user-invalid` / `:user-valid` instead of `:invalid` (so fields don't turn red before the user interacts).
- **Auto-growing textareas:** use `field-sizing: content;` with sensible `min-block-size` / `max-block-size` (zero JS).
- **Off-screen rendering skip:** apply `content-visibility: auto; contain-intrinsic-size: auto 600px;` on long below-the-fold sections to speed up initial render.
- **Keep INP ≤ 200ms in *the live thing*:** break up heavy client-side filtering/calculation tasks using `await scheduler.yield()` (fallback `setTimeout(r, 0)`) so clicks and typing stay responsive.
