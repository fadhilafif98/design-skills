---
name: awwwards-web-design
description: >-
  Builds award-level websites from short prompts for non-designers, acting as creative director and design engineer. Use when the user asks to create, design, build, redesign or restyle a website, landing page, portfolio or company profile ("make a website for my coffee shop", "buatkan website kedai kopi saya", "landing page untuk aplikasi saya"), or reacts to one built this way ("kurang bagus", "kurang premium", "terlalu ramai", "looks like AI"). For advice, audits or decisions without building, use design-consulting.
---

# Awwwards Web Design

The user gives a short prompt and is not a designer. **You are the creative director and the design engineer.** You decide the direction from facts about the subject, match it to a proven Awwwards reference architecture, generate bespoke AI imagery, build it with real scroll/motion choreography, measure it in a real browser, and have it judged by eyes that didn't build it.

## Why pages come out generic

A model asked to invent a look returns the average of every page it has seen, or that average's predictable opposite. Every layer nobody decided gets filled with a default. This skill decides each layer in order, in writing, and checks each with tools rather than hope:

**Subject → Idea → Rules → Words → Build → Choreography → Measure → Judge**

- **Ideas come from the subject, not the category.** An inventory of facts only this business has, an idea sentence, and a competitor test.
- **Curated reference catalog with 70/30 evolution.** Reference architecture is matched directly against the approved Awwwards catalog (`references/awwwards-references.md`). The final build inherits **70% from the reference** (spatial ambition, layout skeleton, hero mechanism, motion/scroll stack) and develops **30% creative evolution** from the subject's own inventory—never a 100% clone, and never drifting away from the reference's concept.
- **Decisive direction.** The agent evaluates and commits to the single best direction directly with full technical justification; no user decision paralysis or multi-screen polling.
- **AI-generated visuals first.** All images and media are generated directly via AI (`image-generator`) to match the reference's lighting and color grade, strictly eliminating web stock scraping.
- **Full Awwwards choreography, never static blocks.** Built with layered depth, custom interactive stages, and real scroll/reveal choreography (Lenis + GSAP ScrollTrigger/SplitText) while keeping a rock-solid static/no-JS/reduced-motion floor.
- **Measure, don't hope.** `inspect.sh` measures headline lines, contrast, overflow, fonts, hidden content, voids, tells, first-screen ambition, and choreography signals at 1440/768/390/320, plus reduced-motion and no-JS. Measuring needs no screenshots: it takes pictures only when asked (`--shots`), for the critique, into a temp dir outside the project. `brand-check.mjs` lints the source.
- **Judge with fresh eyes.** A subagent that never saw your reasoning scores the screenshots against the chosen Awwwards reference bar, with caps that block grade inflation.
- **The brand never drifts.** LOCKED identity, FLEXIBLE taste, checked at every gate.

Communicate **in the user's language**, briefly. Explain the *why* of major decisions in one line, because the user is learning. Never promise an award: juries decide, and real content matters most.

## Modes

| Mode | When | Phases |
|---|---|---|
| **Standard** (default) | New site or page | All, 1 critique round, ≤ 20 minutes |
| **Full** | User asks for award level, a portfolio piece, or "make it amazing" | All, up to 3 critique rounds, full stress test, ~60 minutes |
| **Quick** | One section, a component, a restyle of an existing page | 0, 3 (reuse locks), 5, 6, 9 (1 round) |

**Autopilot** ("terserah", "up to you", "just make it") changes who answers, not which phases run. Ask nothing; write assumptions; commit directly to the single best reference direction and build the full experience.

## Time budget (Standard: 20 minutes to the finished page)

Quality comes from deciding each layer once, not from looping. Note the start time in the ledger's Phase 0 line and check it at each phase.

| Phases | Budget | What makes it fast |
|---|---|---|
| 0–1 | 2 min | One question batch or none; inventory and brief are short lists, not essays |
| 2 | 2 min | Direct catalog match (`references/awwwards-references.md`) + single best recommendation + parallel AI asset generation |
| 3–4 | 3 min | Fill the templates tersely; copy deck written once, at full density |
| 5–7 | 9 min | Build the complete page with reference layout architecture, custom live thing, and GSAP/Lenis choreography; gate twice (hero, full page), measure-only |
| 8 | 3 min | One juror round on ≤ 15 screenshots; fix the top three; re-gate measure-only, no second juror |
| 9 | 1 min | Report |

Over budget in a phase → finish it at the floor its gate needs and move on. Never spend the time on a second critique round in Standard: tell the user what still falls short and offer Full mode.

## The ledger: no silent skips

Append one line per phase to `design/decisions.md`: `YYYY-MM-DD · Phase N · <artifact path or result> · <decision + why>`. A phase that doesn't apply gets `N/A because …`. Phase 9 refuses to report while any phase in the mode lacks a ledger line.

**Never write site code before Phases 1–4 have ledger lines.**

---

## Phase 0: Resume, import, or start
- `design/decisions.md` exists → read it plus `brief.md`, `BRAND.md`, `DESIGN.md`, `copy.md`. Never re-decide a locked layer unless the user asks or a critique says `rebuild`. Jump to the requested phase or the Feedback loop.
- The user has brand guidelines, a logo, colours or an existing site → **Import mode** (`brand-guardian.md` §3). Write `design/BRAND.md` + `design/brand.json` with imported items LOCKED and fonts in `fonts.locked`. Everything later works inside that lock.
- **Redesign** of an existing page → first run `inspect.sh <current> --name before --shots fold` and `brand-check.mjs`, and note what must survive (routes, forms, data, brand assets). Keep the stack. No framework migration.

## Phase 1: Intake and inventory
1. Infer what you can (prompt, codebase, existing site): industry, place, audience, primary action, language, assets.
2. Guided: **one** AskUserQuestion batch, **max 4** plain questions, each with a "(Recommended)" option. Ask only what you can't infer, in priority order:
   1. primary action;
   2. what makes them different;
   3. assets (logo, real photos/video, brand colours, nothing);
   4. "the one thing someone should remember after the first screen".

   Never ask about fonts, colours, layout or motion.
3. Write `design/inventory.md`: 8–12 subject items across ≥ 3 families (`creative-direction.md` §1). Mark inferred items ASSUMPTION.
4. Write `design/brief.md`:
   - purpose sentence;
   - audience worry → how the site resolves it;
   - the one thing to remember;
   - personality IS / IS NOT;
   - use scene (who, where, what light);
   - **picture source**: own / AI generated (`image-generator`, default when no own photos) / type-led (`visual-craft.md` §4). Never fetch stock photos from the internet when AI generation is available;
   - assumptions marked CONFIRM.

**Gate 1:** one primary action; a specific audience; the worry named; inventory spans 3 families; the picture source is decided.

## Phase 2: Direction (Reference Architecture & AI Asset Generation)
1. Read `references/awwwards-references.md` first, then `references/awwwards-patterns.md`, `references/creative-direction.md`, and `references/tells.md`.
2. Name the rut: the category default **and** its predictable opposite.
3. Match to the approved reference catalog (`references/awwwards-references.md`). Select the **single best reference site** matching the subject's archetype and apply the **70% Reference / 30% Subject Evolution Rule** (`awwwards-references.md` §3). *(Strict rule: any additions to the catalog must come strictly from `https://www.awwwards.com/` catalog)*.
4. Formulate the single best direction (70% Reference + 30% Evolution):
   - **70% Reference Foundation**: reference site & blueprint from `awwwards-references.md` §2 (hero mechanism, section rhythm, motion stack, surface discipline);
   - **30% Subject Evolution**: how the reference is developed and elevated for this business using `design/inventory.md` so it stays close to the reference concept without copying it 100%;
   - idea sentence (`On this page, [inventory item] becomes [device]`);
   - competitor test;
   - hero composition (`awwwards-patterns.md` §3);
   - live thing (custom interactive mechanism proving the core claim);
   - signature moment (choreographed scroll/cursor/reveal move);
   - colour strategy and verified typography pairing (`typography.md` §1).
5. Generate visual assets: use `image-generator` subagent to generate **6–8 bespoke high-craft images** directly into `assets/` (and log prompts/specs). Tailor every prompt to the reference's lighting, focal length, material texture, and color temperature. Open and verify each asset fits the use scene. Never scrape stock photos.
6. Auto-decide: state the chosen direction and reference blueprint clearly with technical reasoning. Do NOT present a multi-choice picker or ask the user to choose. Record decision immediately in `design/decisions.md`.

**Gate 2:** the chosen idea passes the competitor test; its live thing uses real content; it avoids both halves of the rut; reference blueprint is mapped from `awwwards-references.md`; bespoke AI images are generated and verified.

## Phase 3: Lock the rules
1. `templates/DESIGN.md` → `design/DESIGN.md`. Fill every field. §0 carries the reference blueprint, idea, live thing, signature moment, colour strategy, use scene, axes, safe/risks and imagery plan. Every later token traces to it.
2. Fonts: follow `typography.md` §1. **Verify each face on its official listing** and record it. No reflex defaults (`tells.md` §4) without a written reason.
3. Mandatory tokens:
   - **`referenceId` locked in `design/brand.json`** (e.g., `"referenceId": "era-residence"`) so `inspect.sh` enforces the reference's structural profile;
   - **Multi-chapter OKLCH surface colours** replicated from the reference (`--bg-chapter-1`, `--bg-chapter-2`, `--bg-chapter-3`, never a monotonous single dark-grey page);
   - **Reference typography architecture** (2–3 families matching the reference's exact Display + Script/Accent + Body roles);
   - five sizes at most, with monumental display scale (`≥ 9–11.5vw` at desktop when required by the reference);
   - a spacing scale;
   - one radius rule;
   - the canonical motion curves;
   - the banned list (`tells.md` + brand).
4. Lock the brand (`brand-guardian.md`): `design/BRAND.md` + `design/brand.json`, each element LOCKED / FLEXIBLE (bounds) / FREE, plus the voice lock. Import mode: only fill gaps.
5. Tokens in their own file (`css/tokens.css`), listed in `brand.json` → `tokenFiles`.

**Gate 3:** every value the site will use exists as a token; BRAND.md and brand.json agree; `brand-check.mjs` passes on the token file.

## Phase 4: The argument and the words
1. Write the argument: one claim per section, each with its proof (`copy.md` §1), mapped to the section rhythm of the chosen reference in `awwwards-references.md`. Delete sections without a claim.
2. Write the whole copy deck in `design/copy.md`, in the audience's language and the BRAND.md voice.
   - The h1 is ≤ 2 lines at every width; do the arithmetic.
   - The first screen answers the visitor's first question.
   - One primary action, named for what it does.
   - Every section the visitor came for gets its full content.
3. Truth (`copy.md` §4):
   - Never invent claims, numbers, quotes, logos or reviews: use `[FILL: …]` in copy deck and mark unconfirmed client contact/legal details with HTML comments `<!-- CONFIRM: ... -->`.
   - Sample details (dish names, suite specs, sample prices) are written at full fidelity and marked `<!-- SAMPLE -->`.
4. Imagery plan: own → AI-generated (`image-generator`, 6–8 bespoke pictures) → drawn in code (`<svg>`/`<canvas>`) → type-led (`visual-craft.md` §4). Every AI-generated picture standing in for a real client photo is marked `<!-- REPLACE: ... -->` in markup and listed in `design/credits.md`.

## Phase 5: Build the reference architecture
Build the layout with the spatial ambition, depth, and tactile density of the chosen Awwwards reference (`awwwards-references.md` §2):
1. **Stack:** existing codebase → follow it. None → semantic `index.html` + modular CSS (`css/tokens.css`, `css/styles.css`) + ES6 JS (`js/main.js`) + GSAP (`gsap`, `ScrollTrigger`, `SplitText`) + `Lenis`.
2. **Tokens** first. Everything downstream references tokens only.
3. **The hero**, at desktop and phone width, built as the reference's exact composition (`awwwards-patterns.md` §3):
   - One thing dominates (`≥ 35%` of the desktop fold).
   - **Type and picture physically interact**: overlap via z-index layers, clip-path mask aperture, inline image interleave, or display type crossing the frame edge.
   - Never build a generic split hero (copy left, boxed card right) or a centered stack over a darkened rectangle.
   - Run the gate on the hero before building the rest.
4. **All sections following the reference's Section Rhythm.** Each section must be an art-directed stage that differs in composition from its neighbours (`layout-composition.md` §3):
   - **No boring HTML widgets**: never ship plain stacked accordion boxes, default browser range sliders, or generic 2-column form cards. Turn suites/catalogs into interactive filmstrips, hover-preview indices, or split architectural stages; turn calculators/meters into bespoke visual instruments (custom canvas/SVG waveforms, interactive diagrams, tactile scrubbers); turn booking/conversion into a full-bleed architectural takeover.
   - Check each section against `tells.md` as you write it.
5. **The live thing**, built as a signature interactive instrument in the section where it proves the claim, with real content, thumb-friendly mobile ergonomics, and a semantic `<noscript>` fallback.
6. **Fullness and frame** (`layout-composition.md` §9–10): equal outer margins, shared vertical alignment rails (2–3 left edges across the page), no voids, and a monumental designed footer.

**The gate** (after the hero, after the full page, after the critique fixes, after every feedback change):
```bash
node <skill>/scripts/brand-check.mjs <site-dir> --config design/brand.json     # 0 errors
bash <skill>/scripts/inspect.sh <page> --name <step>                           # 0 FAIL; measure-only, no screenshots
```
The gate reads numbers, not pictures. Take screenshots only where eyes are needed: the critique (Phase 8) or visual feedback comparison.
- **Warnings:** fix them, or defend each in one sentence a designer would accept.
- **No arguing with the meter, and no hiding from it.** If a rule is a deliberate brand choice, add it to `brand.json` → `allow` and write the reason in DESIGN.md §7.
- **If the scripts can't run** (no Node, no network for the first Playwright install), say so. Use any browser screenshot tool or ask the user for screenshots, and mark every unmeasured check "not measured".

## Phase 6: Choreography and interaction (Mandatory)
An Awwwards site is not a static document with `:hover` transitions. Execute the reference's **Motion Stack** (`awwwards-references.md` §2 & `motion-playbook.md`):
1. **Choreography engine**: wire up **Lenis** smooth scrolling + **GSAP ScrollTrigger** (and **SplitText** where line masks apply), gated cleanly behind `matchMedia('(prefers-reduced-motion: no-preference)')`.
2. **The motion budget** (all four required):
   - **The signature moment** from the reference blueprint: e.g., scroll-scrubbed `clip-path` aperture expansion, pinned horizontal filmstrip/showcase, multi-plane parallax collage, or live pointer-reactive canvas/preview (`gsap.quickTo`).
   - **Choreographed section entrances by parts**: masked headline lines (`yPercent: 110 → 0`, `expo.out`), image clip/scale reveals (`clip-path: inset(...)` + `scale: 1.12 → 1`), and staggered supporting elements (`60–90ms`). Never use one identical fade-up on every block.
   - **Tactile interface feedback** on every control (`:active` scale `0.97`, magnetic pull or crisp fill sweep on primary CTAs, custom cursor or hover preview where the reference calls for it).
   - **Interactive visual feedback on the live thing** (smooth number interpolation, reactive SVG/Canvas visualiser, or dynamic state choreography).
3. **Resilience & accessibility (`motion-playbook.md` §6–7)**:
   - Reveal targets are hidden **only** when `document.documentElement.classList.add('js')` is active, and ScrollTrigger/IntersectionObserver immediately reveals elements already in or above the viewport so scrolling or jumping never leaves a blank band.
   - `prefers-reduced-motion: reduce` disables Lenis, scroll-pinning, and translation travel, keeping instant end-states and short opacity/colour fades (`≤ 200ms`).
   - `inspect.sh` tests reduced-motion and no-JS and FAILs any content that stays hidden.

## Phase 7: Stress test
Standard: the gate already covers 320px, reduced motion and no-JS; add one look at the longest real string (name, price, headline) and the empty/boundary state of the live thing. Full: run `stress-test.md` (worst-case content, empty/one/huge). Fix non-decision breaks. List decision breaks for the user with a recommendation.

## Phase 8: Critique by fresh eyes
Follow `critique.md`:
1. Capture once: `bash <skill>/scripts/inspect.sh <page> --name final --widths 1440,390 --shots page` (fold + up to 5 more screens per width, plus reduced-motion, no-JS and 320 folds: ≤ 15 images). Check 0: capture validity.
2. Spawn a **fresh-context subagent**. Give it only the screenshot paths, the brief, the chosen reference site from `awwwards-references.md`, the idea sentence and live thing, and `critique.md`. It runs 14 passes (including checking whether the build truly matches the reference's visual ambition rather than falling back to static cards/forms), scores with caps, and returns the round block ending in `Disposition: ship | fix | rebuild`.
3. No subagent available → critique yourself, prefixed `⚠️ DEGRADED: single-context critique`.
4. `rebuild` → back to Phase 2. `fix` → fix the top three in the order of `critique.md` §7 and re-gate (measure-only).
5. Standard: one round. Full: a new fresh critique after each fix, up to 3 rounds; stop early when a round resolves nothing.

Target: overall ≥ 7.5, no category < 7, no caps applied. If you miss it, say so. Never round up.

Fix log (required):

| Before | After | Why |
|---|---|---|
| `transition: all .3s ease-in` on menu | `opacity 200ms var(--ease-out), transform 240ms var(--ease-drawer)` | Exact properties; ease-in delays the first frame the user watches |

## Phase 9: Report
Don't report until all of these are true:
- `inspect.sh` shows 0 FAIL on the final page at every width;
- `brand-check.mjs` shows 0 errors;
- the last critique round is written down, with the fixes made after it;
- every phase of the mode has a ledger line.

**Never claim a check you didn't run.**

Tell the user, in their language, briefly:
1. The matched Awwwards reference site, the idea sentence, the subject fact it stands on, and the rut it avoids (one line each, teaching).
2. The live thing, the signature choreography moment, and how to open the site.
3. Final critique scores, caps, and what still falls short, honestly. Gate results. What is LOCKED.
4. Every `[FILL: …]`, `REPLACE:`, `CONFIRM:`, `SAMPLE`, and AI-generated asset (`design/credits.md`). Real content is the biggest factor toward award level.
5. One next step (replace sample/generated assets with real photography, then run a `design-consulting` audit).

## Feedback loop (the user reacts in plain words)
When the user says "kurang bagus", "terlalu ramai", "kurang premium", "kurang wow", "kayak AI":
1. Translate the words into levers (`../design-consulting/references/design-vocabulary.md` if present; otherwise reason from the axes and `tells.md`).
2. Map each lever to its layer:

   | Feedback | Layer |
   |---|---|
   | Taste words | axes / colour strategy in DESIGN.md §0, then propagate tokens |
   | Clarity words | Phase 1 / 4 |
   | "kurang wow", "kayak template" | upgrade hero mechanism, layered depth, and scroll choreography from `awwwards-references.md` §2 & `awwwards-patterns.md` (Phase 2 / 5 / 6) |
   | "ramai" | remove ornaments, then refill with scale or content, never another ornament |
   | "kayak AI" | run `tells.md` against the screenshots |

3. Classify each lever against BRAND.md: FLEXIBLE → apply within bounds; LOCKED → never on vague feedback. Propose it via AskUserQuestion and follow the change protocol only on explicit approval.
4. Apply, gate, and log it. Take `--shots fold` before and after only when the change is visual and you need to see it.

## Hard rules
- Never write site code before Phases 1–4 have ledger lines. Autopilot skips questions, not phases.
- Never force the user to choose between 3 concepts when 1 best recommendation can be decided by the agent directly from `references/awwwards-references.md`.
- Never fetch or scrape stock photos/videos from the internet when AI image/media generation (`image-generator`) is available.
- Never add external reference URLs outside the official `https://www.awwwards.com/` catalog.
- Never ship a static-feeling page of plain HTML cards, default accordions, or unstyled form boxes, and never copy a reference 100% 1:1: always apply the **70% Reference / 30% Subject Evolution** rule (70% reference layout/motion architecture + 30% bespoke creative development from the subject).
- Always build the final product using the complete engineering and quality checks of this skill (tokens, copy, build, choreography, Chromium inspect gate, subagent critique).
- Never claim a visual result you haven't seen in a screenshot (`inspect.sh --shots`).
- Never report while `inspect.sh` shows a FAIL or `brand-check.mjs` an error.
- Never invent proof: numbers, customers, quotes, reviews, logos, press. Never present a generated or found picture as the client's own without a `REPLACE:` note.
- Never ship a **ban** from `tells.md` without a recorded reason.
- Never use a font you haven't verified exists.
- Never write a value that isn't a token or justified.
- Never use `transition: all`, `ease-in` for UI, `scale(0)` entrances, ungated hover, or animation on keyboard-triggered UI.
- Never hide content in a way that depends on JS succeeding.
- Never put a card or widget beside the hero headline.
- Never break a trust convention (prices, contact, menu, navigation) for art.
- Never change a LOCKED brand element without explicit approval and the change protocol. Never "improve" a client's logo, colours or typeface.
- Never promise an award.

## Files

| File | Use in |
|---|---|
| `references/awwwards-references.md` | Phases 2, 5, 6: approved Awwwards reference catalog with technical blueprints (hero mechanism, section rhythm, motion stack) |
| `references/awwwards-patterns.md` | Phases 2, 5: twelve hero compositions, the ambition floor, moves that recur on Sites of the Day |
| `references/creative-direction.md` | Phases 1–2: inventory, rut, reference matching, idea sentence, live thing, scoring, colour strategy, axes |
| `references/worked-examples.md` | Phases 1–3: three examples of the procedure. Never reuse their content |
| `references/art-directions.md` | Phase 2: eleven grammars, each with its rut |
| `references/tells.md` | Every phase that writes CSS, layout or copy: the dated registry |
| `references/copy.md` | Phase 4: argument, 2-line headline arithmetic, truth rules, voice |
| `references/typography.md` | Phases 3, 5: font procedure, scale, tracking, leading |
| `references/layout-composition.md` | Phases 4–5: grid, section patterns, hero, frame, fullness, mobile |
| `references/visual-craft.md` | Phases 3–5: colour, surfaces, AI imagery generation priority, details |
| `references/motion-playbook.md` | Phase 6: gate, curves, GSAP/Lenis setup, recipes, never-ship, performance, reduced motion |
| `references/interaction-details.md` | Phase 6: pressables, focus, forms, mobile, gestures, the live thing |
| `references/stress-test.md` | Phase 7 |
| `references/critique.md` | Phase 8: fresh-eyes protocol, 14 passes, reference-bar check, score, caps, fix order |
| `references/brand-guardian.md` | Phases 0, 3 and every gate: lock levels, import, change protocol, voice lock |
| `templates/DESIGN.md` · `BRAND.md` · `brand.json` | Phase 3 |
| `templates/direction-picker.html` · `scripts/deal.mjs` | Optional legacy tools (only when user explicitly requests multi-variant comparison) |
| `scripts/inspect.sh` | Every gate: measures (including first-screen ambition and choreography signals); `--shots fold\|page` adds screenshots in a temp dir for critique; exit 1 on FAIL |
| `scripts/brand-check.mjs` | Every gate: brand lock + copy/CSS tells; exit 1 on error |

`<skill>` is this skill's directory. The scripts need Node 18+. The first `inspect.sh` run installs Playwright and Chromium into `~/.cache/awwwards-web-design`, and needs network for that.
