# Report Templates

Write in the user's language. Keep reports scannable: headings, tables, short lines.

---

## Discovery report

```markdown
# Design Direction: [Brand]

## In one sentence
[audience] should [action] because [specific value]. The site should feel like [person].

## The brief
- The one thing to remember after the first screen: [answer]
- Use scene: [who, where, on what device, under what light] → [light / dark] because [reason]
- Subject inventory (only this business has these): [8–12 items; assumptions marked CONFIRM]
- Idea: On this site, **[inventory item]** becomes **[device]**. Competitor test: [passes because …]
- One live thing: [what the visitor can do or see that comes from the idea]

## Recommended direction: [name]
- Why: [answer → implication, 2–3 bullets]
- Color strategy: [Restrained / Committed / Full / Drenched] because [reason]
- Type: [role of display + body, chosen for this subject; fonts verified on Google Fonts/Fontshare]
- Motion: [language] · Signature moment: [description]

### SAFE CHOICES (keep the category's trust conventions)
- [convention] because [why playing safe helps]

### RISKS (deliberate departures)
| Risk | Why it works | What you gain | What it costs |
|---|---|---|---|
| | | | |

## Alternative: [name]
- Choose this if: [condition] · Trade-off: [gain / loss]

## Prepare these before building
- [ ] [asset] (why it matters)

## Banned for this brand
- [tells from tells.md + client dislikes]

## Ready-to-paste prompt
[prompt pack from design-vocabulary.md §7]

## Next step
[one action]
```

---

## Audit report

```markdown
[⚠️ DEGRADED: single-context review — only if no independent critic ran]
# Design Audit: [site/page]
Surface: [Persuade / Operate / Read / Experience, per section if hybrid]
Sources — Measured: [inspect.sh 1440/768/390/320 + reduced motion + no-JS | brand-check | Lighthouse | none]
          Looked at: [screenshots, codebase, URL text]
          Not verified: [list]

## Verdict
[2–3 sentences: what it is now, the biggest problem, the potential]
Disposition: **[ship / fix / rebuild]** because [reason]
Overall: x.x/10 (caps applied: [list or "none"])

## Top 3 (do these first)
1. **[title]**: [problem + evidence] → [exact fix]. *Principle: [one line]*
2. ...
3. ...

## Measured
| Check | Result |
|---|---|
| Contrast | [n] FAIL / all pass / not measured |
| Headline lines (1440/768/390) | |
| Sideways scroll (390/320) | |
| Content without JS / reduced motion | |
| Fonts rendered | |
| Tap targets (phone) | |

## Hard rejects & litmus
- Hard rejects hit: [list or none]
- Litmus: [1 yes · 2 no (why) · …]

## Scores
| Dimension | Score | Evidence |
|---|---|---|
| Clarity | x | ... |
| ... (12 rows) | | |

## All findings
| # | Severity | Type | Area | Problem (evidence) | Fix (exact) | Principle | Effort |
|---|---|---|---|---|---|---|---|

## Fix table
| Before | After | Why |
|---|---|---|

## Stress check
| Case | Result | Fix |
|---|---|---|

## What held up (keep it)
- [one line each]

## Roadmap
- **This week:** [Top 3]
- **This month:** [P1/P2]
- **Later:** [P3 / rebuild items]

## Next step
[one action, e.g. "Shall I apply the Top 3?"]
```

---

## Decision report

```markdown
# Decision: [question]
Goal: [audience + action]

## Pick: [option]
[2–3 sentences why, tied to the goal]

## Swap test
[Options X and Y could swap headlines without anyone noticing → treated as one option] or [All options are genuinely different]

## Matrix
| Criterion (weight) | A | B | C |
|---|---|---|---|
| Clarity (30) | | | |
| Brand fit (25) | | | |
| Distinctiveness (20) | | | |
| Usability (15) | | | |
| Feasibility (10) | | | |
| **Total** | | | |

## Steal from the others
- From [B]: [ambition or system discipline, not its surface style]

## Next step
[one action]
```

---

## Translate report

```markdown
# From "[client's words]" to a design

## What you mean (most likely)
[precise term], which means [plain explanation]

## The levers
| Lever | Value | Don't default to |
|---|---|---|
| Type | | |
| Color (strategy) | | |
| Space | | |
| Shape | | |
| Motion | | |
| Imagery | | |

## Idea
On this site, **[subject thing]** becomes **[device]**.

## Other interpretations
- [term]: if you meant [x]

## Prompt
[prompt pack]

## Words to avoid in prompts
[vague words + why]
```

---

## Brand report

```markdown
# Brand Consistency: [brand / site]
Source of truth: [brand book | statements | derived from page X]. brand-check: [n] errors · [n] warnings | not run (reason)

## Verdict
[2–3 sentences: how consistent, where it drifts most, risk]

## Consistency by pillar
| Pillar | Score /10 | Evidence |
|---|---|---|
| Logo | | |
| Color | | |
| Typography | | |
| Voice | | |
| Imagery | | |
| Motion | | |

## Top 3
1. **[title]**: [drift] → [exact fix]. *Principle: [one line]*

## Drift list
| # | Where | Pillar | Drift (evidence) | Fix | Level (LOCKED/FLEXIBLE) |
|---|---|---|---|---|---|

## Should be LOCKED (not yet)
- [element]: [why]

## Next step
[one action, e.g. "Approve BRAND.md so the lock takes effect"]
```

When the sibling templates are absent, BRAND.md needs at least: core (name spelling, promise, personality IS/IS NOT), logo rules, color tokens with level and allowed roles, type families with level, voice (address form, CTA labels, banned words, 3 reference lines), imagery rules, motion character, flexible bounds, change log.
