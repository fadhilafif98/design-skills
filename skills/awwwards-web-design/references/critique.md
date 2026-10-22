# Critique: judging the render

Passing `inspect.sh` and `brand-check.mjs` means nothing banned or broken was measured. It doesn't mean the page is good. This file is how you find out.

**Judge the pictures, never the code.** You wrote the code, so you'll read your intentions into it. Screenshots only show what is there.

## 1. Who judges: a fresh pair of eyes

The agent that built the page is the worst judge of it, because it inherits its own framing and optimism. Run the critique in a **fresh-context subagent** (Agent tool, a new general-purpose agent, not a fork).

Give it only:
- the screenshot paths from `inspect.sh --shots page --widths 1440,390` (≤ 15 images);
- `design/brief.md` (purpose, audience, worry);
- the chosen reference site & blueprint (`references/awwwards-references.md`), the idea sentence, and the live thing from DESIGN.md §0;
- the path to this file.

Never give it your notes, your reasoning, or what you think is good. Prompt:

```
You are an Awwwards juror who did not build this page. Read <this file>, the reference blueprint in references/awwwards-references.md, and the brief at <path>.
Open each screenshot listed below once with the Read tool, desktop first, then phone,
then reduced-motion, no-JS and 320. Do check 0 first. One pass; don't re-open images. Then make the 14 passes, score with the caps,
and answer in the exact format of §6. Name problems like a designer to a colleague, with the
screenshot file where each is visible. Don't praise. Don't suggest code.
Screenshots: <list>
```

The critic must end with the `Disposition:` line. A reply without it counts as **no review**, not a pass.

If you can't spawn a subagent, critique yourself, and start the critique with `⚠️ DEGRADED: single-context critique`. Score once more as "the juror who did not build it" before you write numbers.

## 2. Check 0: are the pictures valid?

Before judging anything, open every screenshot and confirm it shows what its name claims:
- no black or blank regions;
- the top of the document is visible;
- fonts are loaded (no fallback serif where a grotesk was planned);
- reveal animations have settled.

An element hidden by animation timing reads as missing. If a capture is invalid, fix the capture (or the reveal) and rerun `inspect.sh --shots page`. Don't judge a broken photograph.

## 3. Fourteen passes

Make each pass on its own. Don't blend them.

1. **One second, then five.** Glance and look away. What did you see? There should be exactly one answer: a word, an image, an object. Then take five seconds as a stranger: what is this, who is it for, what do I do next?
2. **Squint.** The page should reduce to two or three large masses with clear size differences. Many similar medium masses means nothing leads.
3. **Cover the logo.** Could this first screen belong to a competitor or to another industry? Then scroll: does the idea reach pricing, FAQ and footer, or does the page turn into stock blocks?
4. **Edges.** Follow the left edge of every text block down the page. A composed page has two or three x positions reused on purpose. Six means things were placed one at a time.
5. **Space and frame.** Related things close, unrelated things far. The gap between sections should be clearly larger than any gap inside one. Look for any hole (accidental emptiness) as opposed to a rest (a decision). Outer margins should be equal, and no section should keep text in one half with the other half empty.
6. **Type.** Display to body ≥ 3×. Five sizes at most. No orphan word on a headline's last line. Paragraphs ≤ 75 characters wide. No centred text longer than 3 lines.
7. **Colour.** Name the proportions: what holds most of the surface, what supports, where the accent is. An accent in ten places means nothing.
8. **Images.** Count the real pictures. Is each one doing a job? Do crops share ratios? Do the images share one light and grade, or is it a stock mix? Look for grey boxes, stretched photos and fake screens.
9. **Sameness.** Write one word for each section's layout (split, list, full-bleed, statement, index, gallery…). The same word twice in a row, or three times on the page, is the template showing.
10. **Phone.** Is 390px its own composition, with its own crop and line breaks? Is the first screen still one clear thing?
11. **Fullness.** Is each desktop screen a composed poster, or a thin column of small grey text with dead ground on both sides? An austere page is not a restrained one.
12. **Substance.** Does every section the brief needs deliver its information completely (the whole menu with prices, every room, the price and what it includes)? Is the primary action a real button on the first screen?
13. **Collisions.** Is anything on top of a headline or button at any scroll position? Does anything run off the phone edge? Is there a blank band where a reveal didn't fire?
14. **Competitor, live thing, and 70/30 reference balance.** Put the nearest competitor's name into the idea sentence: does it still work? Name the live thing. Check the **70% Reference / 30% Evolution** balance against `DESIGN.md` §0 and `awwwards-references.md`: does the build preserve 70% of the reference's architectural caliber (layered hero depth, section rhythm, choreography) while developing 30% bespoke evolution for this subject (neither a lazy 100% clone of the reference nor a downgrade into flat static cards/accordions)? If any answer is weak, that is problem #1 for the round.

## 4. Score

Four criteria, 1–10 each, weighted like Awwwards: **Design 40% · Usability 30% · Creativity 20% · Content 10%**.

`overall = 0.4·design + 0.3·usability + 0.2·creativity + 0.1·content`

| | 9–10 | 8 | 7 | 6 | ≤ 5 |
|---|---|---|---|---|---|
| **Design** | Every screen holds as a poster; nothing could move | Confident, coherent; one or two soft spots a designer would see | Clean, clear system, little tension | Tidy but anonymous; reads as a kit | Weak hierarchy, accidental spacing, default type |
| **Usability** | What, who, what next, without scrolling; flawless on phone | Clear; minor friction | Works, with one real problem | You have to hunt, or something breaks | Broken |
| **Creativity** | A concept specific to this subject, not seen applied this way | A clear idea with one memorable move | Tasteful execution of a known approach | The category default | — |
| **Content** | Every line could only be about this subject; imagery is the subject | Concrete; a few generic lines | Clear, some filler | Slogans, stock | Placeholders |

**Calibration.** Real Sites of the Day land around **7.5–8.0** overall from the jury. An honest 8.5 is rare. If your first score for your own work is 9, score it again as the juror who didn't build it.

## 5. Caps (they override the arithmetic)

| Condition | Cap |
|---|---|
| Any `FAIL` still reported by `inspect.sh` or an `error` by `brand-check.mjs` | overall ≤ 6.0 |
| Any **ban** from `tells.md` visible in a screenshot without a recorded reason | overall ≤ 6.5 |
| Pass 3 fails (the page could belong to anyone) | creativity ≤ 6 |
| Idea sentence still works with a competitor's name (pass 14) | creativity ≤ 7 |
| No live thing, or the live thing is a plain unstyled HTML slider/form instead of a bespoke visual instrument | creativity ≤ 6.5 |
| One identical fade on every block, or a static page without scroll/reveal choreography (no Lenis/GSAP/clip-path/parallax) | design ≤ 6.5 |
| Lower sections collapse into plain stacked accordion boxes or generic 2-column form cards instead of the reference's section rhythm | design ≤ 6.5 |
| Fewer than 4 real pictures, unless the concept is type-led **and** DESIGN.md says so | design ≤ 6.5 |
| Nothing dominates the first screen, or a card or widget sits beside the hero headline | design ≤ 6 |
| Two or more desktop screens that are mostly empty, or running text small and grey | design ≤ 6.5 |
| Unequal margins, a section huddled on one side, or a blank stretch > ½ screen | design ≤ 6.5 |
| No real button for the primary action on the first screen | usability ≤ 7 |
| Five-second pass fails | usability ≤ 6 |
| Anything covering a headline at any scroll position | usability ≤ 6 |
| A blank band where a reveal didn't fire, or content clipped off-screen | usability ≤ 5 |
| Placeholder (grey box, lorem, "Image here") visible | content ≤ 5 |
| Unfilled `[FILL: …]` or `REPLACE:` slots | content ≤ 7 (tell the user) |
| A section the brief needs is missing or reduced to a few words | content ≤ 6 |

**Hard rejects.** Any one caps overall below 7 until resolved:
- a generic SaaS card grid as the first impression;
- a beautiful image with a weak brand;
- a strong headline with no clear action;
- busy imagery behind text;
- sections repeating the same mood statement;
- a carousel with no narrative purpose.

**Litmus (yes/no):**
- Is the brand unmistakable in the first screen?
- Is there one strong visual anchor?
- Can you understand the page by scanning headlines only?
- Does each section have one job?
- Are the cards necessary?
- Does the motion improve hierarchy?
- Would it still feel premium with every decorative shadow removed?

## 6. Write it down

Use exactly this shape so rounds can be compared:

```
ROUND n            (critic: fresh subagent | ⚠️ DEGRADED single-context)
Check 0:           captures valid | invalid: <which, why>
Seen in one second: …
Idea (one sentence): …
Live thing: …
Layout words: hero=… / s2=… / s3=… / …
Scores: design _ · usability _ · creativity _ · content _ → overall _._
Caps applied: …
Litmus failed: …
Top three problems (most visible first), each with screenshot file + fix:
1. …
2. …
3. …
Disposition: ship | fix | rebuild
```

`rebuild` means the idea or hierarchy is wrong: go back to Phase 2. `fix` means the top three are fixable in place. `ship` only when no problem a stranger would notice remains.

"Could be more polished" is not a finding. "The supporting paragraph starts 40px left of the headline's edge (`hero-1440-fold.png`)" is.

## 7. What to fix first

Later items can't rescue earlier ones:
1. **The idea.** If pass 3 fails, change the hero concept, not the details.
2. **Hierarchy.** One dominant element per screen.
3. **Composition.** Shared edges, section spacing, layout variety, holes.
4. **Typography.** Scale contrast, line breaks, measure, leading.
5. **Imagery.** Replace weak pictures; unify crops and grade.
6. **Colour.** Proportion and accent discipline.
7. **Detail.** States, focus, small alignments, phone refinements.
8. **Motion.** Last.

Diagnose the layer that leaks:

| Symptom | Leaking layer | Go to |
|---|---|---|
| Generic, fits any business | No subject truth / no idea | Phase 2 |
| Inconsistent colours/type | Loose rules | Phase 3 |
| Bland copy, unclear offer, thin sections | Content | Phase 4 |
| Unclear what to click | Purpose | Phase 1 |
| Neat but forgettable | No live thing; signature moment disconnected from the idea | Phase 2 / 6 |
| Busy, cheap | Too many ornaments | Remove 30%, back to tokens |
| Thin, wireframe-like | Ornaments removed, nothing added | Fullness: content, pictures, scale |
| Sluggish | Motion too slow or wrong easing | Phase 6 |
| A section feels like another brand | Drift | Brand gate |

Record every fix:

| Before | After | Why |
|---|---|---|
| `transition: all .3s ease-in` on menu | `opacity 200ms var(--ease-out), transform 240ms var(--ease-drawer)` | Exact properties; ease-in delays the first frame the user watches |

## 8. When to stop

**Standard mode: one round.** Critique → fix the top three → measure-only `inspect.sh`, then report. **Full mode:** at most three rounds: critique → fix → `inspect.sh --shots page` → fresh critique. Stop early when a round finds nothing a stranger would notice, or when a round resolves nothing (you are looping).

The target is overall ≥ 7.5 with no category under 7 and no caps applied. If round three is still below, say so plainly in the report with the remaining problems. Don't round up.

*Adapted from leonxlnx/taste-skill critique (MIT), with the isolation rule from pbakaus/impeccable (Apache-2.0) and the hard rejects and litmus from garrytan/gstack (MIT). See NOTICE.md.*
