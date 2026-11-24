---
name: maestro
description: >-
  Use when building, redesigning, or restyling award-level websites, landing pages, or portfolios from short prompts. Directs architecture, bespoke imagery, motion choreography, and browser QA.
metadata:
  author: fadhilafif98
  version: "1.0.0"
  tags:
    - web-design
    - maestro
    - frontend
    - ui-ux
    - motion
---

# Maestro

## Purpose

Act as creative director and design engineer for non-designers who provide short prompts. Decide every layer in order, in writing, match a curated design-archetype blueprint (70% Blueprint / 30% Subject Evolution), generate bespoke AI imagery, implement scroll/motion choreography, measure in a real browser, and run fresh-eyes critique.

**Pipeline:** `Subject -> Idea -> Rules -> Words -> Build -> Choreography -> Measure -> Judge`

Communicate in the user's language, briefly. Explain the *why* of major decisions in one line. Never promise an award.

## Prerequisites

- **Node.js 18+** for `brand-check.mjs`, `lookup.mjs`, and `inspect.sh`.
- **Network access on first `inspect.sh` run** to install Playwright + Chromium into `~/.cache/maestro`.
- **Optional:** `image-generator` subagent for bespoke visual assets; `modern-web-guidance` sibling skill for modern native web APIs.

## Instructions

### Modes & Time Budget

| Mode | When | Phases | Budget |
|---|---|---|---|
| **Standard** (default) | New site or page | All, 1 critique round | <= 20 min |
| **Full** | Award-level / portfolio piece | All, up to 3 critique rounds + full stress test | ~60 min |
| **Quick** | One section, component, or restyle | 0, 3 (reuse locks), 5, 6, 9 (1 round) | <= 10 min |

**Autopilot** ("terserah", "up to you", "just make it") skips intake questions, not phases: write assumptions and commit to the single best reference direction.

**Ledger (no silent skips):** Append one line per phase to `design/decisions.md`: `YYYY-MM-DD | Phase N | <artifact or result> | <decision + why>`. Mark unused phases `N/A because ...`. Never write site code before Phases 1-4 have ledger lines.

### Phase 0: Resume, import, or start
- `design/decisions.md` exists -> read it plus `brief.md`, `BRAND.md`, `DESIGN.md`, `copy.md`. Never re-decide a locked layer unless asked or critique says `rebuild`.
- Existing brand guidelines/logo/colours -> **Import mode** (`references/brand-guardian.md` §3): write `design/BRAND.md` + `design/brand.json` with imported items LOCKED.
- **Redesign** -> run `inspect.sh <current> --name before --shots fold` and `brand-check.mjs` first; keep existing stack and routes.

### Phase 1: Intake and inventory (2 min)
1. Infer industry, place, audience, primary action, language, and assets from prompt/codebase.
2. Guided: **one** AskUserQuestion batch, max 4 plain questions with `(Recommended)` defaults (primary action, differentiator, assets, one thing to remember). Never ask about fonts, colours, layout, or motion.
3. Write `design/inventory.md`: 8-12 subject facts across >= 3 families (`references/creative-direction.md` §1); mark inferences `ASSUMPTION`.
4. Write `design/brief.md`: surface class (`experience|persuade|operate|read`, `references/ia-ux-conversion.md` §1), sitemap/IA (nav <= 5-7 items), purpose & funnel, audience worry -> proof, one thing to remember, personality IS/IS NOT, use scene, picture source (own / AI `image-generator` / type-led; never scrape stock photos), and `CONFIRM` assumptions.

**Gate 1:** surface class, sitemap/IA, primary action, specific audience, worry, 3-family inventory, and picture source decided.

### Phase 2: Direction & AI Assets (2 min)
1. Run `node <skill>/scripts/lookup.mjs list` or `blueprint <id>` to pull only the matched blueprint from `references/design-archetypes.md`, then consult `references/hero-patterns.md`, `references/creative-direction.md`, and `references/tells.md`.
2. Name the rut (category default and its predictable opposite).
3. Select the single best archetype from `references/design-archetypes.md` and apply **70% Blueprint / 30% Subject Evolution**:
   - **70% Reference:** hero mechanism, section rhythm, motion stack, surface discipline.
   - **30% Evolution:** idea sentence (`On this page, [inventory item] becomes [device]`), competitor test, live thing, signature moment, colour strategy, verified typography (`references/typography.md` §1).
4. Generate **6-8 bespoke high-craft images** via `image-generator` into `assets/` matched to reference lighting, lens, and colour grade. Verify each asset.
5. Auto-decide and log in `design/decisions.md` (no multi-choice picker unless requested).

**Gate 2:** idea passes competitor test, live thing uses real content, rut avoided, blueprint mapped, AI images verified.

### Phase 3: Lock the rules (1.5 min)
1. Fill `templates/DESIGN.md` -> `design/DESIGN.md` (§0 traces every downstream token).
2. Verify every font on its official listing (`references/typography.md` §1); no reflex defaults (`references/tells.md` §4).
3. Define tokens in `css/tokens.css` (listed in `design/brand.json` -> `tokenFiles`): `referenceId`, multi-chapter OKLCH surfaces (`--bg-chapter-1/2/3`), 2-3 reference font roles, <= 5 type sizes, spacing scale, one radius rule, canonical motion curves, banned tells.
4. Write `design/BRAND.md` + `design/brand.json` with LOCKED / FLEXIBLE / FREE bounds (`references/brand-guardian.md`).

**Gate 3:** all values tokenized, `BRAND.md` and `brand.json` agree, `brand-check.mjs` passes.

### Phase 4: Argument and copy (1.5 min)
1. One claim per section with proof (`references/copy.md` §1) and conversion role (`references/ia-ux-conversion.md` §2-3), mapped to reference section rhythm. Delete claimless sections.
2. Write `design/copy.md` in audience language and BRAND voice: `h1` <= 2 lines at all widths, first screen answers visitor's first question, one primary action.
3. Truth rules (`references/copy.md` §4): never invent proof; mark unconfirmed facts `[FILL: ...]` / `<!-- CONFIRM: ... -->`, sample details `<!-- SAMPLE -->`, and AI stand-in photos `<!-- REPLACE: ... -->` + `design/credits.md`.

### Phase 5: Build reference architecture (6 min)
1. Follow existing stack, or semantic `index.html` + `css/tokens.css` + `css/styles.css` + `js/main.js` + reference motion stack (`GSAP/ScrollTrigger/SplitText/Lenis`, `Anime.js`, `Three.js/GLSL`, or `Canvas 2D`). Follow `references/modern-web-platform.md` (native `<dialog>`, `popover`, `@container`, `100svh`, `overflow: clip`, `:user-invalid`, `@supports` fallbacks).
2. Build tokens first; reference tokens only downstream.
3. Build hero per `references/hero-patterns.md` §3: one dominant focal element (>= 35% desktop fold), physical type/picture interaction (overlap, clip-path aperture, inline interleave, edge-crossing). Never ship a generic split card hero. Gate hero before continuing.
4. Build all sections rotating layouts (`references/layout-composition.md` §3): no plain stacked accordions, default range sliders, or generic 2-column form cards. Check `references/tells.md`.
5. Build the **live thing** with real content, full UI states (`references/ia-ux-conversion.md` §4), thumb-friendly mobile UX, and `<noscript>` fallback.
6. Enforce frame, fullness, SEO, CWV, and WCAG baseline (`references/layout-composition.md` §9-10, `references/seo-perf-launch.md` §1-3).

**Gate (after hero, full page, critique fixes, feedback):** run `brand-check.mjs` (0 errors) and `inspect.sh` (0 FAIL, measure-only). Fix warnings or justify in `DESIGN.md` §7 + `brand.json` -> `allow`.

### Phase 6: Choreography and interaction (3 min)
Execute the reference motion stack (`references/motion-playbook.md` §1e, §9, §9b) gated behind `matchMedia('(prefers-reduced-motion: no-preference)')`:
1. **Signature moment:** scroll-scrubbed clip-path aperture, pinned horizontal filmstrip, multi-plane parallax, or pointer-reactive canvas (`gsap.quickTo`).
2. **Choreographed entrances:** masked headline lines (`expo.out`), image clip/scale reveals, staggered supporting elements (60-90ms). Never repeat one identical fade-up.
3. **Tactile controls & live thing feedback:** `:active` scale `0.97`, magnetic/fill CTA feedback, smooth value interpolation (`references/interaction-details.md`).
4. **Resilience:** hide reveal targets only behind `.js` on `<html>`; immediately reveal in/above-viewport items; `prefers-reduced-motion: reduce` disables Lenis/pinning/travel (<= 200ms opacity fades).

### Phase 7: Stress test & Pre-launch QA
Standard: gate covers 320px, reduced motion, no-JS, CWV, SEO, WCAG; manually verify longest real string, empty/error/loading states, and pre-launch hooks (`references/seo-perf-launch.md` §4). Full: run `references/stress-test.md`.

### Phase 8: Critique by fresh eyes (3 min)
Follow `references/critique.md`:
1. Capture once: `bash <skill>/scripts/inspect.sh <page> --name final --widths 1440,390 --shots page` (<= 15 images). Verify Check 0.
2. Spawn a **fresh-context subagent** with only screenshot paths, brief, reference blueprint, idea sentence, live thing, and `references/critique.md`. It runs 14 passes, applies caps, and ends with `Disposition: ship | fix | rebuild`.
3. If no subagent is available, self-critique prefixed `[DEGRADED: single-context critique]`.
4. `rebuild` -> Phase 2; `fix` -> fix top 3 (`references/critique.md` §7) and re-gate measure-only. Standard: 1 round; Full: up to 3 rounds. Target: overall >= 7.5, no category < 7, no caps. Log fixes in a Before / After / Why table.

### Phase 9: Report (1 min)
Refuse to report unless `inspect.sh` has 0 FAIL, `brand-check.mjs` has 0 errors, the critique round is logged, and every phase has a ledger line. Never claim an unrun check. Summarize briefly: matched reference + idea + rut avoided; live thing + signature moment + open command; honest scores/caps/gate results + LOCKED items; all `[FILL]`, `REPLACE:`, `CONFIRM:`, `SAMPLE`, and AI assets (`design/credits.md`); one next step.

### Feedback Loop
Translate plain feedback ("kurang bagus", "ramai", "kurang premium", "kayak AI") via `../design-consulting/references/design-vocabulary.md` or `references/tells.md`. Map taste -> DESIGN.md §0 tokens; clarity -> Phase 1/4; "kurang wow" -> Phase 2/5/6 architecture/motion; "ramai" -> strip ornaments and refill with scale/content. Apply FLEXIBLE changes within bounds; ask approval for LOCKED items; re-gate and log.

### Hard Rules
- Never write site code before Phases 1-4 have ledger lines.
- Never scrape stock photos when `image-generator` is available; never clone third-party sites or assets.
- Always apply 70% Reference / 30% Subject Evolution; never ship flat card grids or 100% clones.
- Never claim unverified visual results, invent proof, use unverified fonts, or promise awards.
- Never use `transition: all`, `ease-in` for UI, `scale(0)` entrances, ungated hover, or JS-dependent visibility without `.js` guard.
- Never alter LOCKED brand elements without explicit approval.

## Available Scripts

| Script | Purpose | Arguments |
|---|---|---|
| `scripts/lookup.mjs` | Query curated design archetype blueprints on demand to save context tokens | `list \| blueprint <id> \| search <term> \| section <file> <heading>` |
| `scripts/brand-check.mjs` | Lint source for brand drift, copy/CSS tells, and legacy web patterns | `<site-dir> [--config design/brand.json] [--json]` |
| `scripts/inspect.sh` | Render page in Chromium across viewports/states, measure QA, optional screenshots | `<file-or-url> [--name <step>] [--widths 1440,390] [--shots none\|fold\|page] [--surface <class>]` |
| `scripts/deal.mjs` | Legacy multi-variant picker generator (only when explicitly requested) | `<args>` |

## Examples

```bash
# 1. Lookup matched design archetype blueprint (equivalent to run_script("lookup.mjs", ["blueprint", "daylight-atelier"]))
node <skill>/scripts/lookup.mjs blueprint daylight-atelier

# 2. Run mandatory build gate (measure-only, no screenshots)
node <skill>/scripts/brand-check.mjs ./site --config design/brand.json
bash <skill>/scripts/inspect.sh ./site/index.html --name build --surface experience

# 3. Capture screenshots for Phase 8 fresh-eyes critique
bash <skill>/scripts/inspect.sh ./site/index.html --name final --widths 1440,390 --shots page
```

## Limitations

- Automated browser checks require Node 18+ and Playwright/Chromium; without them, visual and contrast checks must be marked "not measured".
- AI-generated placeholder imagery (`REPLACE:`) and sample copy (`SAMPLE`) cannot replace authentic client photography and verified business proof.
- Standard mode caps critique at 1 round (<= 20 min); deep polish requires Full mode.

## Troubleshooting

| Error | Cause | Solution |
|---|---|---|
| `inspect.sh` fails on first run | Missing network or blocked Playwright Chromium download | Install Chromium in `~/.cache/maestro` with network access, or run manual screenshot fallback and mark checks "not measured" |
| `brand-check.mjs` exits 1 | Unapproved font, hardcoded token, or banned tell in source | Replace with token in `css/tokens.css`, or document justified exception in `DESIGN.md` §7 and `design/brand.json` -> `allow` |
| `inspect.sh` FAIL on no-JS or reduced-motion | Reveal elements default to `opacity: 0` in base CSS | Gate hidden initial states behind `.js [data-reveal]` and disable travel under `prefers-reduced-motion: reduce` |

## Files

| File | Use in |
|---|---|
| `references/design-archetypes.md` · `hero-patterns.md` | Phases 2, 5, 6: curated blueprints, 12 hero compositions |
| `references/creative-direction.md` · `art-directions.md` · `worked-examples.md` | Phases 1-3: inventory, rut, grammars, examples |
| `references/tells.md` · `copy.md` · `typography.md` | Phases 3-5: dated tells, copy deck, verified fonts |
| `references/layout-composition.md` · `layout-blueprints.md` · `visual-craft.md` | Phases 3-5: grid, section rotation, CSS blueprints, colour, AI imagery |
| `references/motion-playbook.md` · `interaction-details.md` · `modern-web-platform.md` | Phases 5-6: motion engines, tactile UI, Baseline web APIs |
| `references/ia-ux-conversion.md` · `seo-perf-launch.md` · `stress-test.md` | Phases 1, 4, 5, 7: surface classes, IA, SEO/CWV/WCAG, QA |
| `references/critique.md` · `brand-guardian.md` | Phases 0, 3, 8: 14-pass critique, caps, brand locks |
| `templates/DESIGN.md` · `BRAND.md` · `brand.json` · `direction-picker.html` | Phase 3 templates |
