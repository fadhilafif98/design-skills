# 70/30 Reference-First Component Craft

Do **not** reinvent weak, flat approximations of high-craft components from scratch. Instead, **search and pull real, battle-tested components** from the 6 curated component libraries below, then apply the **70/30 Adaptation Ratio**:

- **70% Reference Component:** Preserve the proven visual geometry, motion physics, timing, layering, and micro-interaction craft from the reference component.
- **30% Subject & Platform Adaptation:**
  1. Re-skin with the project's **OKLCH colour tokens**, **verified non-reflex fonts**, **1 radius rule**, and **real copy/imagery** (never keep demo placeholder text or neon rainbow defaults on non-tech sites).
  2. Enforce **Business-Kind Guardrails** (`references/business-kinds.md`): keep shaders/WebGL/dark-glows strictly for `software`, `tech`, and `gaming`; use editorial, scroll-photo, typography, and tactile card components for `place`, `service`, and `product`.
  3. Modernize any legacy internals via **`modern-web-guidance`**: replace `<div class="modal">` → `<dialog>`, JS accordions → `<details name>` + `interpolate-size: allow-keywords`, `100vh` → `100svh`, `overflow: hidden` (sticky) → `overflow-x: clip`, `:invalid` → `:user-invalid`, and gate spatial motion with `@media (prefers-reduced-motion: no-preference)`.

> **Budget:** Pick **2–4 components per page** (1 hero/text move + 1–2 showcase/interactive components + 1 tactile control). Never pile 10 unrelated effects onto one screen.

## 1. Approved Component Registries

| Library | URL | Best For | Sourcing Method |
|---|---|---|---|
| **Aceternity UI** | `https://ui.aceternity.com/components` | Hero spotlights, bento grids, 3D/parallax cards, sticky scroll reveals, floating navs, lamp/beam accents (`tech`/`software`) | Registry CLI (`npx shadcn@latest add @aceternity/<name>`) or inspect official component docs & adapt |
| **Skiper UI** | `https://skiper-ui.com/components` | Editorial scroll reveals, image stacks, hover-expand galleries, minimal kinetic sections, smooth drawers (`place`/`product`/`service`) | Inspect official component docs / copy source & adapt |
| **Magic UI v3** | `https://v3.magicui.design/docs` | Marquees, bento grids, animated beams, border beams, dock, shimmer/shiny buttons, number tickers, text reveals | Registry CLI (`npx shadcn@latest add @magicui/<name>`) or official docs |
| **React Bits** | `https://reactbits.dev/get-started/index` | SplitText, BlurText, ScrollReveal, TiltedCard, Stack, SpotlightCard, Magnet, Dock, Masonry, CircularGallery | Registry CLI (`npx jsrepo add` / `npx shadcn@latest add`) or official docs |
| **React Bits Pro** | `https://pro.reactbits.dev/docs/components` | Production-grade complex layouts, flagship hero/showcase blocks (when user has Pro access) | Use only when the user has Pro access/credentials; otherwise use free equivalents |
| **Uiverse** | `https://uiverse.io/elements` | Pure HTML/CSS micro-controls: tactile buttons, switches, loaders, inputs, checkboxes, cards (zero React required) | Copy MIT-licensed HTML/CSS element directly & tokenize |

## 2. Sourcing Workflow (By Project Stack)

1. **Match the slot to a real component:** Pick the exact component from the table below (or search the 6 libraries' docs) before writing custom markup.
2. **React / Next.js / Tailwind stack:** Install or copy the official component directly from its registry/docs (check existing `package.json` dependencies first; state any new peer dependency like `motion` or `gsap` clearly).
3. **Vanilla HTML/CSS, Astro, Vue, or Svelte stack:**
   - Prefer **Uiverse** (pure HTML/CSS) and CSS-first components from **Skiper UI / Magic UI / React Bits**.
   - Port the exact component structure, keyframes, and physics parameters faithfully (70%), replacing React hooks with lightweight native DOM + **`modern-web-guidance`** APIs (`animation-timeline: view()`, `document.startViewTransition()`, `@property`, `<dialog>`, `<details name>`).
4. **Apply the 30% Unslop Pass:**
   - Strip reflex fonts (`Inter`, `Poppins`, `Space Grotesk`), generic demo copy, and off-brand neon glows.
   - Bind all colours/radii/type to the project's tokens.
   - Verify contrast (≥ 4.5:1), keyboard focus (`:focus-visible` on unclipped parent), pause control on > 5s auto-loops (WCAG 2.2.2), and `prefers-reduced-motion`.

## 3. Component Selection Matrix (By Role & Business Kind)

| Page Slot | Non-Tech (`place`, `service`, `product`) | Tech (`software`, `tech`, `gaming`) |
|---|---|---|
| **Hero / Headline** | React Bits `SplitText` / `BlurText` · Skiper UI editorial image-reveal hero | Aceternity `Spotlight` / `ContainerScroll` · Magic UI `TextAnimate` / `Safari` frame |
| **Visual Showcase** | Skiper UI hover-expand gallery / sticky card stack · React Bits `Masonry` / `Stack` | Magic UI `BentoGrid` + `AnimatedBeam` · Aceternity `StickyScrollReveal` |
| **Interactive Proof** | React Bits `TiltedCard` / `CircularGallery` · Magic UI `Marquee` (with pause control) | Magic UI `Terminal` / `NumberTicker` · Aceternity `Tabs` / `CardSpotlight` |
| **Tactile Controls** | Uiverse CSS buttons/toggles · React Bits `Magnet` · Native `<dialog>` + `<details name>` | Magic UI `ShimmerButton` / `Dock` · Uiverse switches · Native `<dialog>` + `popover` |

## 4. Novel / Custom Component Idea Path

When the user brings an **original component idea** (e.g., an interactive flavor wheel, custom pricing estimator, live audio/roast curve, or bespoke comparison tool):

1. **Check the 6 registries first:** If an existing component covers ≥ 70% of the interaction mechanics, use the **70/30 Reference-First** path above.
2. **Build custom only when genuinely novel — at studio craft level:**
   - **Consult `modern-web-guidance` first** to anchor the interaction on native Baseline APIs (`<dialog>`, `popover`, `anchor-name`, `animation-timeline: view()`, `document.startViewTransition()`, `@property`, `interpolate-size`, `@container`, `subgrid`, `:user-invalid`).
   - **Motion & Physics:** Keep every animation compositor-only (`opacity`, `transform`, `clip-path`, `mask-image`), use tuned easing (`cubic-bezier(0.16, 1, 0.3, 1)` or spring physics), and opt in via `@media (prefers-reduced-motion: no-preference)`.
   - **Complete States & Accessibility:** Implement keyboard navigation, visible `:focus-visible` on unclipped parents, ARIA roles/live regions (`aria-pressed`, `aria-live`), all relevant UI states (`idle`, `loading`, `empty`, `error`, `success`), and a semantic `<noscript>` fallback.
   - **Anti-Slop & Business-Kind Discipline:** Bind strictly to the project's OKLCH tokens, verified non-reflex fonts, and Tech vs Non-Tech rules (no neon shaders/dark glows on `place`/`service`/`product`).

## 5. License & Honesty Check

- Verify each component's license (MIT/open vs Pro-only) before copying; never bypass paywalls on Pro-only components.
- Never replace a slop page with hand-coded bare wireframe boxes when a real reference component fits the slot.
- Never claim a component was pulled from a registry if you wrote it from scratch; state clearly which reference component was adapted and what 30% changed.
