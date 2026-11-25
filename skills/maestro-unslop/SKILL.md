---
name: maestro-unslop
description: >-
  Use when rescuing or refactoring an AI-looking, generic, or legacy-bloated website, section, or component ("unslop") using modern web rules.
metadata:
  author: fadhilafif98
  version: "1.0.0"
  tags:
    - web-design
    - unslop
    - anti-slop
    - refactoring
    - modern-web
---

# Maestro Unslop

## Purpose

Surgically rescue existing websites, sections, or UI components that look generic, templated, or AI-generated—while preserving the project's stack, routes, forms, and locked brand identity.

**Role split in `design-skills`:**
- Use **`maestro-unslop`** to clean up and upgrade **existing code** (component, section, or full page) or **craft a new anti-slop component** from a custom idea.
- Use sibling **maestro** to **build a full new website from scratch** (10-phase creative direction).
- Use sibling **design-consulting** for **advisory audits** without editing code.

Communicate in the user's language, briefly. For every slop tell removed, state *why* it failed and *what real substance* replaced it.

## Prerequisites

- **Standalone ready:** works with Node.js 18+ using `references/unslop-checklist.md`, `references/business-kinds.md`, `references/component-craft.md`, `references/dealt-moments.md`, and optional replacement helper `scripts/unslop-deal.mjs`.
- **Optional sibling skills:**
  - **maestro**: when installed alongside this skill, enables real-browser Chromium QA (maestro inspect script), source/brand linting (maestro brand-check script), and extended design guides (tells, brand-guardian, copy, modern-web-platform).
  - **modern-web-guidance**: consult before replacing custom JS widgets (modals, popovers, anchor positioning, scroll-driven animations, forms, INP).
- **Optional:** `image-generator` subagent when broken/stock/missing visuals need bespoke art-directed replacements.

## House Rules (Non-Negotiable)

These nine rules govern every unslop pass:

1. **Business kind decides the medium.** Shaders, dark-neon grounds, lit UI panels, pulsing diagrams, and WebGL belong *only* to `software`, `tech`, and `gaming`. `place`, `service`, and physical `product` pages must strip tech-slop and lead with real/bespoke photography, flat colour, and crisp typography.
2. **One section per screen at desktop (`1440x900`).** On full-page rescues, the hero owns the first screen alone; each section is 1–2 screens tall with no next-section heading peeking into the fold.
3. **Equal left and right edges.** Align nav, hero, sections, and footer to one consistent container measure.
4. **No captions under visuals.** Let framing, heading, or UI carry meaning; place any image credits in one quiet footer line or the project credits log.
5. **Every visual renders, never an empty ground.** Verify `1440`, `768`, and `390px`—zero broken images, zero blank JS reveal bands, zero half-screen voids.
6. **Real product UI or real visuals—never fake dashboards.** Replace grey-bar/donut mocks on `software` pages with live HTML UI showing what the product actually operates on. Upgrade photographable subjects to real or bespoke AI photos at anchor scale (≥ 35% of the fold).
7. **Quiet micro-interactions + 1–2 dealt moments.** Tactile button press (`:active` scale `0.97`), subtle framed photo zoom (`1.025`), clean underline draw, and at most **1–2 dealt moments** per page (see the dealt-moments reference). Strip identical fade-ups, card tilts, and auto-playing carousels.
8. **Modern native platform over legacy JS and CSS slop.** Replace `<div class="modal">` with `<dialog>`, JS accordions with `<details name>`, `<div onclick>` with `<button>` or `<a>`, `100vh` with `100svh`, `overflow: hidden` (on sticky ancestors) with `overflow-x: clip`, and `:invalid` with `:user-invalid`. Gate Newly Available Baseline APIs (`animation-timeline`, `@starting-style`, `anchor-name`, `text-box-trim`, `field-sizing`) behind `@supports (...)`.
9. **Removal is not enough — apply 70/30 reference component craft.** Never replace slop with bare wireframes or weak hand-coded approximations. Source 2–4 real components directly from the approved studios in `references/component-craft.md` (**Aceternity UI, Skiper UI, Magic UI v3, React Bits / Pro, Uiverse**): keep **70%** of the proven component geometry and motion physics, and adapt **30%** to the project's OKLCH tokens, non-reflex fonts, bespoke visuals (`image-generator` or live HTML UI), business-kind guardrails, and `modern-web-guidance` native APIs.

## Business-Kind × Surface Routing

Declare the business kind before editing and map it to a `surface` profile for the browser inspector:

| Business Kind | Examples | `surface` | Medium & Visual Rules |
|---|---|---|---|
| `software` | SaaS, dev tools, AI apps, APIs | `persuade` / `operate` | Live HTML product UI, lit panels, max 1 pulsing diagram, dark or light allowed |
| `tech` | Hardware, robotics, fintech infra | `persuade` / `experience` | Anchor-scale hardware visuals + specs, max 1 shader/canvas moment, dark or light allowed |
| `gaming` | Indie/AAA games, engines, studios | `experience` | Full-bleed key art, world/crew showcase, max 1 scene/shader, dark allowed |
| `product` | Physical goods, DTC, furniture, beans | `persuade` | Photography-led (distinct view per section, interactive swatch), flat grounds, zero shaders |
| `service` | Clinic, law firm, agency, contractor | `persuade` | People/rooms/case-work photos, concrete outcome rows, flat grounds, zero shaders |
| `place` | Cafe, bakery, restaurant, hotel, shop | `persuade` | Photography-led, visit/hours block early, 1 type moment, flat grounds, zero shaders |

See `references/business-kinds.md` for target screen rhythm and copy budgets (60–80 words/screen).

## Sibling Skill Integration (Optional, Preferred)

When the sibling **maestro** skill is installed alongside this skill:

| Capability | Usage |
|---|---|
| Browser gate (maestro inspect script) | Run with `--surface <experience\|persuade\|operate\|read> --name <step> --widths 1440,390 --shots fold` |
| Source & brand linter (maestro brand-check script) | Run against the target site directory (pass `--config` pointing to the project brand JSON when a brand lock exists) |
| Extended references | Borrow maestro's tells, brand-guardian, copy, and modern-web-platform guides |

If **maestro** is absent, run standalone using `references/unslop-checklist.md` §6 and mark unmeasured browser metrics `"not measured"`.

## Instructions: Surgical Unslop Workflow

Detect scope from the request: **Component** (rescue existing OR craft a new custom component idea), **Section** (hero, features, pricing, footer), or **Full Page** (existing landing page or app route). Preserve existing stack, routes, forms, and `LOCKED` brand assets (from the project's brand lock JSON or existing logo/colours).

### Step 1: Measure & Classify
1. Classify the business kind (`software|tech|gaming|product|service|place`) and `surface` (`experience|persuade|operate|read`).
2. Read the target HTML/CSS/JS/components and extract current tokens, fonts, layout structure, and any brand locks.
3. If **maestro** is installed and the target is a renderable page, capture baseline measurements with maestro's brand-check script and inspect script (`--name before --surface <surface> --widths 1440,390 --shots fold`).

### Step 2: Diagnose Slop (`references/unslop-checklist.md`)
Audit the target across all **5 slop buckets** and list concrete evidence:
1. **Visual tells (Waves 1–3):** violet/neon glows, gradient text, glassmorphism/drop shadows, emoji icons, eyebrows/pill badges, fake dashboards, OR the Wave 3 rut (warm cream + serif + terracotta + mono labels + `01/02/03`), plus reflex fonts (`Inter`, `Poppins`, `Space Grotesk`, `Playfair Display`, etc.).
2. **Structural tells:** generic split-card heroes, 3 equal icon-card grids, repeated adjacent section skeletons, timid hero (< 35% focal mass), horizontal overflow at `390px`, inconsistent radii or > 5 type sizes.
3. **Copy & truth tells (EN/ID):** AI filler verbs (*unlock, supercharge, seamless, solusi terbaik, terdepan*), generic CTAs (*Get started, Learn more, Selengkapnya*), 3+ line `h1`, invented proof (*10,000+ teams*, stock quotes).
4. **Motion & A11y tells:** identical fade-ups, `transition: all`, `scale(0)` entrances, unguarded `opacity: 0` reveals (blank without JS), low contrast (< 4.5:1), `maximum-scale=1`, missing labels/alt.
5. **Legacy web platform slop:** `<div class="modal">`, JS accordions, `<div onclick>`, `100vh` clipping, `overflow: hidden` breaking sticky, `:invalid` premature errors, missing `text-wrap: balance/pretty`, `@container`, `subgrid`, or `content-visibility: auto`.

> If a full page is structurally beyond repair, say so clearly and recommend handing off to sibling **maestro** for a clean rebuild—or proceed with surgical unslop if the user wants to keep the existing skeleton.

### Step 3: Surgical Replacement (Apply House Rules)
1. **Optional replacement deal:** If current fonts or palette are pure slop (and not brand-locked), run `node scripts/unslop-deal.mjs --kind <kind> --brief "<one line>" [--keep palette|type]` to pick deterministic non-reflex fonts, an OKLCH palette, and 1–2 dealt moments.
2. **Consolidate tokens:** Keep ≤ 5 type sizes, 1 radius rule, OKLCH colour tokens, and canonical easing curves inside the project's existing stylesheet or tokens file.
3. **Replace or craft with 70/30 or Custom Component path (House Rule 9):**
   - **70/30 Reference-First (default):** Source 2–4 fitting components from `references/component-craft.md` (Aceternity UI, Skiper UI, Magic UI v3, React Bits / Pro, Uiverse) — install via registry CLI on React/Tailwind stacks or port faithfully on vanilla/other stacks — keeping 70% of their proven craft and adapting 30% to project tokens, non-reflex fonts, and business-kind boundaries.
   - **Custom Component Idea (when novel):** If the user brings an original component idea not covered by the 6 registries, follow `references/component-craft.md` §4: query **modern-web-guidance** first, compose on native Baseline primitives, enforce compositor-only physics, full UI states (`idle`/`loading`/`empty`/`error`/`success`), keyboard/ARIA support, `<noscript>` fallback, and business-kind guardrails.
   - Modernize legacy internals to Baseline native APIs via **modern-web-guidance** (`<dialog>`, `popover`, `<details name>`, `100svh`, `overflow-x: clip`, `@container`, `subgrid`, `:user-invalid`, `text-wrap: balance/pretty`, `content-visibility: auto`, `@media (prefers-reduced-motion: no-preference)`).
   - Tighten copy (`h1` ≤ 2 lines, specific verbs, honest `[FILL: ...]` / `<!-- REPLACE: ... -->` / `<!-- SAMPLE -->` for missing proof) and pair with bespoke visuals (`image-generator`) or live HTML product UI.

### Step 4: Hard Gate & Before/After Report
1. Run maestro's brand-check script (0 errors) and inspect script (`--name after --surface <surface> --widths 1440,390 --shots fold`, 0 FAIL). If standalone without **maestro**, run the manual gate checklist (`references/unslop-checklist.md` §6–7) and mark browser metrics `"not measured"`.
2. Report concisely:
   - Business kind + scope (`component | section | full page`).
   - **Before → After → Why** table covering key removals and replacements.
   - Gate results (measured vs not measured) and any remaining `[FILL]` / `REPLACE` / `SAMPLE` slots.

## Hard Rules

- Never build a new website from scratch with this skill; hand off greenfield builds to **maestro**.
- Never put shaders, WebGL, dark-neon grounds, or fake dashboards on `place`, `service`, or non-tech `product` pages.
- Never swap Wave 1 slop (violet glow) for Wave 3 slop (cream + serif + terracotta + mono eyebrows + `01/02/03`).
- Never introduce reflex fonts (`Inter`, `Poppins`, `Space Grotesk`, `Playfair Display`, `DM Sans`, `Plus Jakarta Sans`, etc.) unless brand-locked.
- Never invent testimonials, logos, or metrics; never use `transition: all`, `scale(0)` entrances, `100vh` hero locks, `<div onclick>`, or unguarded `opacity: 0` reveals.
- Never alter `LOCKED` brand items without approval; never claim an unrun browser check.

## Available Scripts

| Script | Purpose | Arguments |
|---|---|---|
| `scripts/unslop-deal.mjs` *(optional helper)* | Deterministic replacement dealer for non-reflex fonts, OKLCH palette, hero framing, and 1–2 dealt moments | `--kind <software\|tech\|gaming\|product\|service\|place> --brief "<text>" [--keep palette,type] [--seed n] [--json]` |

## Examples

```bash
# 1. Optional: deal replacement non-reflex fonts, OKLCH palette, and dealt moments (keeping existing palette)
node scripts/unslop-deal.mjs --kind place --brief "neighborhood coffee roastery in Bandung" --keep palette

# 2. Deal replacement direction as JSON for a software component/page rescue
node scripts/unslop-deal.mjs --kind software --brief "Postgres SQL migration diff checker" --json
```

## Limitations

- Designed strictly for refactoring/rescuing existing code; greenfield multi-page builds belong in **maestro**.
- Without sibling **maestro**, browser metrics (contrast ratios, overflow, CWV, no-JS render) cannot be auto-measured and must be marked `"not measured"`.

## Troubleshooting

| Error | Cause | Solution |
|---|---|---|
| Page looks bare after removing tells | Slop stripped without filling structural gaps | Apply House Rule 9: scale up the primary visual/type (≥ 35% fold), tighten copy/spacing, or add real proof/UI |
| Sibling browser inspector not found | **maestro** skill not installed alongside `maestro-unslop` | Use standalone checklist (`references/unslop-checklist.md` §6–7), mark browser checks `"not measured"`, suggest installing **maestro** |
| `unslop-deal.mjs` exits 2 | Invalid `--kind` or missing `--brief` | Pass `--kind` from `software\|tech\|gaming\|product\|service\|place` and a non-empty `--brief` |

## Files

| File | Use in |
|---|---|
| `references/unslop-checklist.md` | Steps 2–4: 5 slop buckets (3-wave visual, structural, copy EN/ID, motion/a11y, modern web platform), standalone gate, litmus tests |
| `references/business-kinds.md` | Steps 1 & 3: 6 business-kind boundaries (Tech vs Non-Tech), target screen rhythm, copy budgets |
| `references/component-craft.md` | Step 3: studio-grade kinetic component craft (Aceternity/Skiper/Magic UI/React Bits/Uiverse) implemented with native `modern-web-guidance` APIs |
| `references/dealt-moments.md` | Step 3: 1–2 dealt moments per page + quiet micro-interaction & resilience guards |
| `scripts/unslop-deal.mjs` | Step 3 (optional): deterministic replacement fonts, OKLCH palette, hero framing, and dealt moments |
