---
name: awwwards-web-design
description: >-
  Builds award-level websites from short prompts for non-designers, acting as creative director and design engineer. Use when the user asks to create, design, build, redesign or restyle a website, landing page, portfolio or company profile ("make a website for my coffee shop", "buatkan website kedai kopi saya", "landing page untuk aplikasi saya"), or reacts to one built this way ("kurang bagus", "kurang premium", "terlalu ramai", "looks like AI"). For advice, audits or decisions without building, use design-consulting.
---

# Awwwards Web Design

The user gives a short prompt and is not a designer. **You are the creative director and the design engineer.** You decide the direction from facts about the subject, build it, measure it in a real browser, and have it judged by eyes that didn't build it.

## Why pages come out generic

A model asked to invent a look returns the average of every page it has seen, or that average's predictable opposite. Every layer nobody decided gets filled with a default. This skill decides each layer in order, in writing, and checks each with tools rather than hope:

**Subject → Idea → Rules → Words → Build → Measure → Judge**

- **Ideas come from the subject, not the category.** An inventory of facts only this business has, an idea sentence, and a competitor test.
- **A die breaks the default.** `scripts/deal.mjs` deals three distinct directions to choose from.
- **Show, don't describe.** Concepts are rendered first screens the user switches between.
- **Pictures from the start.** The picture source is decided at intake, so photo-led directions stay in the deal and the concepts are shown with real pictures at real scale.
- **Measure, don't hope.** `inspect.sh` measures headline lines, contrast, overflow, fonts, hidden content, voids and tells at 1440/768/390/320, plus reduced-motion and no-JS. It also measures **ambition**: whether one thing dominates the first screen, whether a boxed card sits beside the headline, and whether the concepts share one skeleton. `brand-check.mjs` lints the source.
- **Judge with fresh eyes.** A subagent that never saw your reasoning scores the screenshots, with caps that block grade inflation.
- **The brand never drifts.** LOCKED identity, FLEXIBLE taste, checked at every gate.

Communicate **in the user's language**, briefly. Explain the *why* of major decisions in one line, because the user is learning. Never promise an award: juries decide, and real content matters most.

## Modes

| Mode | When | Phases |
|---|---|---|
| **Standard** (default) | New site or page | All, 1 critique round minimum |
| **Full** | User asks for award level, a portfolio piece, or "make it amazing" | All, up to 3 critique rounds, full stress test |
| **Quick** | One section, a component, a restyle of an existing page | 0, 3 (reuse locks), 5, 6, 9 (1 round) |

**Autopilot** ("terserah", "up to you", "just make it") changes who answers, not which phases run. Ask nothing; write assumptions; pick the top-scored concept; still build the picker.

## The ledger: no silent skips

Append one line per phase to `design/decisions.md`: `YYYY-MM-DD · Phase N · <artifact path or result> · <decision + why>`. A phase that doesn't apply gets `N/A because …`. Phase 9 refuses to report while any phase in the mode lacks a ledger line.

**Never write site code before Phases 1–4 have ledger lines.**

---

## Phase 0: Resume, import, or start
- `design/decisions.md` exists → read it plus `brief.md`, `BRAND.md`, `DESIGN.md`, `copy.md`. Never re-decide a locked layer unless the user asks or a critique says `rebuild`. Jump to the requested phase or the Feedback loop.
- The user has brand guidelines, a logo, colours or an existing site → **Import mode** (`brand-guardian.md` §3). Write `design/BRAND.md` + `design/brand.json` with imported items LOCKED and fonts in `fonts.locked`. Everything later works inside that lock.
- **Redesign** of an existing page → first run `inspect.sh <current> --out design/inspect/before` and `brand-check.mjs`, and note what must survive (routes, forms, data, brand assets). Keep the stack. No framework migration.

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
   - **picture source**: own / stock placeholders / generated / type-led (`visual-craft.md` §4). A subject that can be photographed (a place, a room, food, a product, people) and has no own pictures gets **stock placeholders**: free-licence photos (Unsplash, Pexels) used large, marked `REPLACE`, never presented as the client's own. Type-led only when the idea is type;
   - assumptions marked CONFIRM.

**Gate 1:** one primary action; a specific audience; the worry named; inventory spans 3 families; the picture source is decided.

## Phase 2: Direction
1. Read `awwwards-patterns.md` first, then `creative-direction.md`, `worked-examples.md`, `art-directions.md`, `tells.md`.
2. Name the rut: the category default **and** its predictable opposite (WebSearch 3–5 real sites if available).
3. Deal: `node <skill>/scripts/deal.mjs --brief "<one line>" [--have photos,video,product-ui,stock,generated] [--keep palette,type]`. Pass the picture source from the brief (`--have stock` for stock placeholders). Each concept gets a grammar, a **hero composition** (`awwwards-patterns.md` §3), a colour strategy and font candidates.
4. For each dealt combination write the concept block: idea sentence, competitor test, composition, live thing, signature moment, first screen, safe choices, risks (`creative-direction.md` §5). Score them, and run the swap test.
5. Get the pictures (`visual-craft.md` §4): download them into `design/assets/`, **open every one with Read** and keep only those that fit the idea and the light of the use scene. Record each in `design/credits.md`.
6. Build `design/direction-picker.html` from the template. Each concept's real first screen, built as its **dealt composition**:
   - real h1 (≤ 2 lines), its tokens and fonts, its pictures at their real size and crop;
   - one thing dominates (≥ 35% of the desktop fold), and type and picture touch (overlap, interleave, mask, cross an edge);
   - **no card or widget beside the headline.** The live thing goes in a second screen under the hero, as a working stub, or becomes part of the composition itself;
   - a hint of the signature moment.

   Before inspecting, write the **deal check** for each concept as a comment in its `<section>`: composition id, colour strategy and how the surface meets it (Committed = the colour covers 30–60%), display face from the dealt candidates. A concept that doesn't match its deal is rebuilt, not explained.
7. `bash <skill>/scripts/inspect.sh "design/direction-picker.html?v=N" --name conceptN --widths 1440,390 --no-extra` for each variant. 0 FAIL, including `timid-hero`, `hero-card` and `same-skeleton`. Read every screenshot. Run the squint test (`tells.md`): if the three folds blur into the same shape, redo them. Fix anything generic or broken.
8. Guided: present via AskUserQuestion. Each option gives the concept name, the idea in plain words, and why. Your recommendation comes first. Give the picker path (keys 1/2/3, ←/→). Autopilot: take the top score.

**Gate 2:** the chosen idea passes the competitor test; its live thing uses real content; it avoids both halves of the rut; the three concepts have different compositions and pass `inspect.sh` with 0 FAIL.

## Phase 3: Lock the rules
1. `templates/DESIGN.md` → `design/DESIGN.md`. Fill every field. §0 carries the idea, live thing, colour strategy, use scene, axes, safe/risks and imagery plan. Every later token traces to it.
2. Fonts: follow `typography.md` §1. **Verify each face on its official listing** and record it. No reflex defaults without a written reason.
3. Mandatory tokens:
   - OKLCH colour from the strategy and the subject;
   - ≤ 2 families;
   - five sizes at most;
   - a spacing scale;
   - one radius rule;
   - the canonical motion curves;
   - the banned list (`tells.md` + brand).
4. Lock the brand (`brand-guardian.md`): `design/BRAND.md` + `design/brand.json`, each element LOCKED / FLEXIBLE (bounds) / FREE, plus the voice lock. Import mode: only fill gaps.
5. Tokens in their own file (`css/tokens.css`), listed in `brand.json` → `tokenFiles`.

**Gate 3:** every value the site will use exists as a token; BRAND.md and brand.json agree; `brand-check.mjs` passes on the token file.

## Phase 4: The argument and the words
1. Write the argument: one claim per section, each with its proof (`copy.md` §1). Delete sections without a claim. The argument decides the order.
2. Write the whole copy deck in `design/copy.md`, in the audience's language and the BRAND.md voice.
   - The h1 is ≤ 2 lines at every width; do the arithmetic.
   - The first screen answers the visitor's first question.
   - One primary action, named for what it does.
   - Every section the visitor came for gets its full content.
3. Truth (`copy.md` §4):
   - Never invent claims, numbers, quotes, logos or reviews: use `[FILL: …]`.
   - Assumed brand truths stay `[FILL: …]` in copy until confirmed.
   - Sample details (dish names, sample prices) are written at full fidelity and marked `<!-- SAMPLE -->`.
4. Imagery plan: own → stock placeholders or generated → found archive (credited, open licence) → drawn → type-led (`visual-craft.md` §4). Aim for 6–12 real pictures; ≥ 4 is the floor. Every stock picture stands in for a real one and is listed as `REPLACE`.

## Phase 5: Build it still
Build with motion off in your head. A page that needs animation to look finished isn't finished.
1. **Stack:** existing codebase → follow it. None → `index.html` + CSS + vanilla JS.
2. **Tokens** first. Everything downstream references tokens only.
3. **The hero**, at desktop and phone width, as the chosen composition. Get the big thing big and the small things small before anything else exists (`awwwards-patterns.md` §2). Then `inspect.sh` + brand gate. Save the approved hero fold as `design/inspect/brand-reference-1440.png` and `-390.png` (the drift baseline).
4. **Sections, one at a time.** Each section gets a different layout from its neighbours and carries the idea, including pricing, FAQ and footer. After each: `inspect.sh` → read the slices → brand gate → `tells.md`.
5. **The live thing**, in the section where it proves the claim, with real content, a thumb-sized phone version, and a no-JS fallback.
6. **Fullness and frame** (`layout-composition.md` §9–10): equal margins, no voids, a heading per section, every screen a poster.

**The gate** (after the hero, each section, the motion pass, every feedback change, and before the report):
```bash
node <skill>/scripts/brand-check.mjs <site-dir> --config design/brand.json     # 0 errors
bash <skill>/scripts/inspect.sh <page> --name <step>                           # 0 FAIL; Read every slice it lists
```
- **Warnings:** fix them, or defend each in one sentence a designer would accept.
- **No arguing with the meter, and no hiding from it.** If a rule is a deliberate brand choice, add it to `brand.json` → `allow` and write the reason in DESIGN.md §7.
- **If the scripts can't run** (no Node, no network for the first Playwright install), say so. Use any browser screenshot tool or ask the user for screenshots, and mark every unmeasured check "not measured".

## Phase 6: Motion and interaction
1. Every animation passes `motion-playbook.md` §1 (frequency → purpose → easing → duration) and its "Never ship" table.
2. The budget:
   - the signature move from the idea;
   - entrances by **parts** within each section (staggered, once), not one fade per block;
   - feedback on every control;
   - one moving picture if an honest one exists.
3. `interaction-details.md` in full, including the mobile table and the live thing's thumb behaviour.
4. Reduced motion keeps opacity and colour and drops travel. GSAP/Lenis branch on `matchMedia`. Reveal targets are hidden only via an `html.js` class.
5. Gate. `inspect.sh` fails content that stays hidden after scrolling, with reduced motion, or without JS.

## Phase 7: Stress test
Run `stress-test.md` (worst-case content, empty/one/huge). Fix non-decision breaks. List decision breaks for the user with a recommendation.

## Phase 8: Critique by fresh eyes
Follow `critique.md`:
1. Check 0: capture validity.
2. Spawn a **fresh-context subagent**. Give it only the screenshot paths, the brief, the idea sentence and live thing, and `critique.md`. It runs 14 passes, scores with caps, and returns the round block ending in `Disposition: ship | fix | rebuild`.
3. No subagent available → critique yourself, prefixed `⚠️ DEGRADED: single-context critique`.
4. `rebuild` → back to Phase 2. `fix` → fix the top three in the order of `critique.md` §7, re-gate, and run a new fresh critique.
5. Stop at 3 rounds, or when a round resolves nothing.

Target: overall ≥ 7.5, no category < 7, no caps applied. If you miss it, say so. Never round up.

Fix log (required):

| Before | After | Why |
|---|---|---|
| `transition: all .3s ease-in` on menu | `opacity 200ms var(--ease-out), transform 240ms var(--ease-drawer)` | Exact properties; ease-in delays the first frame the user watches |

## Phase 9: Report
Don't report until all of these are true:
- `inspect.sh` shows 0 FAIL on the final page at every width;
- `brand-check.mjs` shows 0 errors;
- you opened every screenshot listed after the last change;
- the last critique round is written down;
- every phase of the mode has a ledger line.

**Never claim a check you didn't run.**

Tell the user, in their language, briefly:
1. The idea sentence, the subject fact it stands on, and the rut it avoids (one line each, teaching).
2. The live thing, and how to open the site. Screenshot paths: desktop fold, phone fold.
3. Final critique scores, caps, and what still falls short, honestly. Gate results. What is LOCKED.
4. Every `[FILL: …]`, `REPLACE:`, `SAMPLE`, stock and found picture (title, creator, licence, source), and every redeal with its reason. Real content is the biggest factor toward award level.
5. One next step (fill the assets, then a `design-consulting` audit).

## Feedback loop (the user reacts in plain words)
When the user says "kurang bagus", "terlalu ramai", "kurang premium", "kurang wow", "kayak AI":
1. Translate the words into levers (`../design-consulting/references/design-vocabulary.md` if present; otherwise reason from the axes and `tells.md`).
2. Map each lever to its layer:

   | Feedback | Layer |
   |---|---|
   | Taste words | axes / colour strategy in DESIGN.md §0, then propagate tokens |
   | Clarity words | Phase 1 / 4 |
   | "kurang wow", "kayak template" | hero composition and scale (`awwwards-patterns.md`), pictures, then idea, live thing, signature moment (Phase 2 / 6) |
   | "ramai" | remove ornaments, then refill with scale or content, never another ornament |
   | "kayak AI" | run `tells.md` against the screenshots |

3. Classify each lever against BRAND.md: FLEXIBLE → apply within bounds; LOCKED → never on vague feedback. Propose it via AskUserQuestion and follow the change protocol only on explicit approval.
4. Ambiguous → build 2 variants of the affected section with the picker pattern and let the user choose by looking.
5. Apply, gate, show before/after screenshots, and log it.

## Hard rules
- Never write site code before Phases 1–4 have ledger lines. Autopilot skips questions, not phases.
- Never present a concept only as text when you can render it.
- Never claim a visual result without reading the screenshots from the latest `inspect.sh` run.
- Never report while `inspect.sh` shows a FAIL or `brand-check.mjs` an error.
- Never invent proof: numbers, customers, quotes, reviews, logos, press. Never present a stock, found or generated picture as the client's own.
- Never ship a **ban** from `tells.md` without a recorded reason.
- Never use a font you haven't verified exists.
- Never write a value that isn't a token or justified.
- Never use `transition: all`, `ease-in` for UI, `scale(0)` entrances, ungated hover, or animation on keyboard-triggered UI.
- Never hide content in a way that depends on JS succeeding.
- Never put a card or widget beside the hero headline, and never show three concepts on one skeleton.
- Never break a trust convention (prices, contact, menu, navigation) for art.
- Never change a LOCKED brand element without explicit approval and the change protocol. Never "improve" a client's logo, colours or typeface.
- Never promise an award.

## Files

| File | Use in |
|---|---|
| `references/awwwards-patterns.md` | Phases 2, 5: hero compositions, the ambition floor, moves that recur on Sites of the Day |
| `references/creative-direction.md` | Phases 1–2: inventory, rut, deal, idea sentence, live thing, scoring, colour strategy, axes |
| `references/worked-examples.md` | Phases 1–3: three examples of the procedure. Never reuse their content |
| `references/art-directions.md` | Phase 2: eleven grammars, each with its rut |
| `references/tells.md` | Every phase that writes CSS, layout or copy: the dated registry |
| `references/copy.md` | Phase 4: argument, 2-line headline arithmetic, truth rules, voice |
| `references/typography.md` | Phases 3, 5: font procedure, scale, tracking, leading |
| `references/layout-composition.md` | Phases 4–5: grid, section patterns, hero, frame, fullness, mobile |
| `references/visual-craft.md` | Phases 3–5: colour, surfaces, imagery ladder and floor, details |
| `references/motion-playbook.md` | Phase 6: gate, curves, recipes, never-ship, performance, reduced motion |
| `references/interaction-details.md` | Phase 6: pressables, focus, forms, mobile, gestures, the live thing |
| `references/stress-test.md` | Phase 7 |
| `references/critique.md` | Phase 8: fresh-eyes protocol, passes, score, caps, fix order |
| `references/brand-guardian.md` | Phases 0, 3 and every gate: lock levels, import, change protocol, voice lock |
| `templates/DESIGN.md` · `BRAND.md` · `brand.json` · `direction-picker.html` | Phases 2–3 |
| `scripts/deal.mjs` | Phase 2: deals three distinct directions, each with its hero composition |
| `scripts/inspect.sh` | Every visual step: measures (including first-screen ambition) + legible viewport slices; exit 1 on FAIL |
| `scripts/brand-check.mjs` | Every gate: brand lock + copy/CSS tells; exit 1 on error |

`<skill>` is this skill's directory. The scripts need Node 18+. The first `inspect.sh` run installs Playwright and Chromium into `~/.cache/awwwards-web-design`, and needs network for that.
