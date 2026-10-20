# Brand Guardian

The brand is the one thing that must not drift. Every phase, every section, and every feedback round passes through this guardian. Taste can evolve; identity cannot change silently.

Two files hold the lock:
- `design/BRAND.md`: human-readable rules (template: `templates/BRAND.md`)
- `design/brand.json`: machine-readable rules for `scripts/brand-check.mjs` (template: `templates/brand.json`)

They must always agree. When you change one, change the other in the same step.

---

## 1. Lock levels

Every brand element has exactly one level:

| Level | Meaning | Who can change it | Examples |
|---|---|---|---|
| **LOCKED** | Identity. Never changes inside this project without the change protocol | User, explicitly, via §4 | Logo + its usage, primary brand colors, display typeface, brand name spelling, address form (kamu/Anda), core promise |
| **FLEXIBLE** | Can move **within stated bounds** to serve taste/feedback | Agent, within bounds, logged in decisions.md | Accent coverage %, display size range, motion pace, section patterns, imagery crop |
| **FREE** | Execution details | Agent | Specific layouts per section, micro-interactions, copy wording that follows the voice rules |

Default when unsure: treat it as **LOCKED** and ask.

## 2. Where the brand comes from (source of truth)

Priority order. A higher source always overrides a lower one:

1. **Existing brand guidelines** (brand book PDF, Figma, style guide URL, existing logo files) → **Import mode** (§3)
2. **Explicit user statements** ("our color is #0B5D3B", "we always say 'Anda'")
3. **Existing website/materials** (current site, Instagram, packaging): extract and confirm
4. **Concept decisions from Phase 2–3** of this skill

If an art direction archetype conflicts with a higher source, **the brand wins** and the archetype adapts (e.g. Luxury Serif Minimal with the client's locked sans-serif display).

## 3. Import mode (client already has a brand)

1. Read every brand asset provided (PDF pages, images, URL via WebFetch, logo SVGs, existing CSS).
2. Extract: logo variants + clear space + minimum size + misuse rules, color values (convert to OKLCH, keep originals as comments), typefaces + weights, voice/tone rules, imagery rules, taglines, legal names.
3. Mark everything extracted as **LOCKED** unless the guide itself says it's flexible. Imported typefaces go in `brand.json` → `fonts.locked` (and `fonts.allowed`), so the linter doesn't flag a brand-owned face as a reflex default.
   If a locked element is itself a tell (a violet gradient logo, cream ground), keep it, note it in DESIGN.md §7, and add the rule to `brand.json` → `allow`. The brand wins over the tells registry.
4. Fill gaps (things the guide doesn't specify) as FLEXIBLE with bounds, and list them for the user to confirm.
5. Phase 2 then generates concepts **inside** the brand: concepts vary in structure, signature moment, and composition, never in locked identity.
6. Report: "Imported from: [sources]. Locked: [list]. Assumed (please confirm): [list]."

Never "improve" a client's logo, colors, or typeface. If something in the guide hurts accessibility (e.g. brand color fails contrast as text), keep it locked for its allowed uses and propose a compliant pairing. Never silently replace it.

## 4. Change protocol (for LOCKED items)

A LOCKED item changes only when **all** are true:
1. The user explicitly asks for that specific change, or approves your proposal via AskUserQuestion.
2. You state the impact ("changing the display font affects every headline and the logo lockup").
3. You update BRAND.md + brand.json + DESIGN.md together and log it in decisions.md with date and reason.
4. You re-run brand-check on the whole site.

Vague feedback ("make it more premium") **never** authorizes changing a LOCKED item. Solve it with FLEXIBLE levers first. If it truly can't be solved without touching identity, propose the change and ask.

## 5. Voice lock

Visual consistency without voice consistency still feels off-brand. BRAND.md must define:
- **Address form:** e.g. "kamu" (never "Anda"/"lo"), or "Anda" (never "kamu").
- **Personality in writing:** 3 IS / 3 IS NOT, each with a do/don't example sentence.
- **Sentence rules:** typical length, contractions/slang allowed or not, emoji policy (default: none), exclamation policy (default: max 1 per page).
- **Vocabulary:** preferred words (the brand's own terms, product names, spelling) and banned words (brand-specific + the copy tells in `tells.md` §6).
- **Capitalization & formatting:** brand name casing, headline case (sentence case recommended), number/currency format (`Rp 25.000`).
- **Three reference lines** written in the voice (hero, CTA, error message). New copy must sound like these.

Self-check every new piece of copy: *"Could this line appear on a competitor's site?"* If yes, rewrite with a brand truth.

## 6. Visual lock

- **Logo:** files allowed, minimum width (px), clear space (e.g. = height of the logomark), allowed backgrounds, misuse list (no stretch, recolor, shadow, rotate, outline, effects, animation that distorts it).
- **Color:** locked brand colors + their allowed roles (e.g. brand green = backgrounds and CTA only, never body text on white if contrast fails). Every color in code must come from tokens.
- **Type:** locked families and weights. No other `font-family` in code.
- **Imagery:** subject rules (real people/places/products), grade (warm, contrasty, grain or not), crop style, banned image types.
- **Iconography & shape:** stroke width, radius value, corner style.
- **Motion signature:** the brand's motion personality (pace, easing family). Feedback can tune the pace within bounds, but can't change the character (e.g. a calm brand never gets bouncy springs).

## 7. Brand gate (run at every checkpoint)

Run at: end of Phase 3, after the hero, after every section, after the motion pass, after every feedback change, and before the final report.

1. **Automated:**
   - `node <this-skill-dir>/scripts/brand-check.mjs <site-dir> --config design/brand.json`: errors must be zero. Warnings: fix, or justify in a code comment.
   - `bash <this-skill-dir>/scripts/inspect.sh <page> --name <step>`: zero FAIL. It also checks that rendered fonts are in `fonts.allowed` and that contrast holds.
2. **Visual:** look at the latest screenshots. Is the logo rendered at ≥ min size, with clear space, on an allowed background? Do photos follow the imagery rules?
3. **Voice:** re-read all new copy against the three reference lines and the IS/IS NOT list.
4. **Drift check:** compare the latest `inspect` slices to `design/inspect/brand-reference-*.png` (the approved hero). Does every section feel like the same brand? Name any section that drifts and fix it.

Record each gate result in decisions.md: `YYYY-MM-DD · gate after <phase> · brand-check 0 err / 2 warn (justified) · inspect 0 FAIL / 3 WARN · drift: none`.

## 8. Feedback loop under the guardian

When the user reacts ("kurang premium", "terlalu ramai", "kurang wow"):
1. Translate the feedback into levers.
2. Classify each lever: FLEXIBLE (apply within bounds) / LOCKED (needs protocol).
3. Apply FLEXIBLE changes; propose LOCKED ones with AskUserQuestion, recommending the option that keeps identity intact.
4. Run the brand gate. Show before/after screenshots.

## 9. Common drift patterns (watch for these)

| Drift | Cause | Prevention |
|---|---|---|
| New gray or tint appears in one section | Agent picked a "close enough" color | brand-check raw color rule |
| A second display font sneaks in for "variety" | Section-level creativity | font allowlist |
| Copy switches between kamu and Anda | Different sections written at different times | address-form rule in brand-check |
| CTA wording changes per section ("Pesan", "Order", "Beli sekarang") | No canonical CTA | Define canonical CTA labels in BRAND.md |
| Logo shrinks on mobile below legibility | Responsive pass | min logo width + visual gate |
| Motion gets bouncy in a calm brand | Feedback "more wow" | motion character is LOCKED |
| Stock photo slips in | Missing assets | imagery rules + REPLACE slots |
