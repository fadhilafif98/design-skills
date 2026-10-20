# Design Skills For Non-Designers

For founders, developers and small business owners who want an award-level website without being designers.

Type a simple prompt like *"buatkan website kedai kopi saya di Bandung"*. The agent becomes your creative director:
- it finds what only your business has;
- it shows you three real first screens to choose from;
- it builds the site and measures it in a real browser;
- it has the result judged by a critic that never saw its reasoning.

## Why use it?

Agents don't have taste on their own. Give an AI a short prompt and it fills every decision you didn't make with the average of the internet. Ask it to avoid that, and it gives you the average's predictable opposite: cream, a serif headline, terracotta, little mono labels, 01/02/03. Both are the rut.

These skills replace defaults with decisions, and check each one with tools instead of hope:

**Subject → Idea → Rules → Words → Build → Measure → Judge**

- **The idea comes from your business, not your category.** The agent writes an inventory of facts only you have: your name, your street, your numbers, your constraints, your rituals. It turns one of them into the idea, and tests it by putting your nearest competitor's name in its place.
- **A die breaks the default.** `deal.mjs` deals three distinct directions (concept × grammar × hero composition × colour strategy × typefaces), so the agent doesn't fall back on its favourite look.
- **You choose by seeing.** The three concepts are real, switchable first screens. Press 1, 2, 3.
- **One live thing.** Every site gets one thing a visitor can do with real content: see what's roasted this week, pick a treatment and see the price and the next free slot.
- **Measured, not eyeballed.** `inspect.sh` opens the page in Chromium at 1440, 768, 390 and 320px, with reduced motion and with JavaScript off. It measures:
  - headline line counts, contrast ratios, sideways overflow, fonts actually rendered;
  - content that never appears, empty stretches, tap targets and zoom blocking;
  - generated-page tells.

  Then it saves screenshots small enough to actually read.
- **Judged by fresh eyes.** The critique runs in a separate agent that sees only the screenshots and the brief. It scores like an Awwwards juror, with caps that stop grade inflation.
- **The brand never drifts.** Identity is LOCKED, taste moves within FLEXIBLE bounds, and `brand-check.mjs` lints every checkpoint. Already have a brand book? It's imported and locked first.
- **No invented proof.** No fake testimonials, customer counts or logos. Unknown facts become `[FILL: …]` slots you fill in.

## Install

```bash
npx skills@latest add <your-github-username>/design-skills
```

Replace `<your-github-username>` with the account this repo is published under.

Install one skill, or install globally for Claude Code:

```bash
npx skills@latest add <your-github-username>/design-skills --skill awwwards-web-design
npx skills@latest add <your-github-username>/design-skills -a claude-code -g
```

Install both for the full experience. `design-consulting` works on its own, but borrows the inspector, linter and references from `awwwards-web-design` when it's present.

Manual install: clone the repo and link the skills into your Claude Code skills directory (`$CLAUDE_CONFIG_DIR/skills` if you use a custom config dir):

```bash
ln -s "$PWD/skills/awwwards-web-design" ~/.claude/skills/awwwards-web-design
ln -s "$PWD/skills/design-consulting"   ~/.claude/skills/design-consulting
```

Start a new Claude Code session afterwards.

**Requirements:** Node 18+. The first `inspect.sh` run installs Playwright and Chromium into `~/.cache/awwwards-web-design`, so it needs network once.

## Usage

```
buatkan website kedai kopi saya di Bandung
```

```
/awwwards-web-design landing page for my interior design studio
```

```
/design-consulting audit https://my-site.com
```

Say **"terserah"** or **"up to you"** and the agent runs on autopilot. It asks no questions, writes its assumptions down, and picks the top-scored concept; you can still switch later.

React in plain words, like *"kurang premium"*, *"terlalu ramai"* or *"kayak buatan AI"*. The agent translates them into exact design changes, without touching your locked brand.

## What's inside

### awwwards-web-design (build)

Ten phases with a ledger in `design/decisions.md`, so no step is silently skipped:
- **Phase 0:** resume or import
- **Phase 1:** intake and inventory
- **Phase 2:** direction
- **Phase 3:** lock the rules
- **Phase 4:** argument and copy
- **Phase 5:** build
- **Phase 6:** motion
- **Phase 7:** stress test
- **Phase 8:** fresh-eyes critique
- **Phase 9:** report

Modes: Quick, Standard, Full.

| File | What it is |
|---|---|
| [awwwards-patterns](./skills/awwwards-web-design/references/awwwards-patterns.md) | Twelve hero compositions as buildable mechanisms, the measured ambition floor, recurring Site of the Day moves |
| [creative-direction](./skills/awwwards-web-design/references/creative-direction.md) | Inventory, the rut, dealing, idea sentence, live thing, scoring, colour strategy |
| [worked-examples](./skills/awwwards-web-design/references/worked-examples.md) | Three briefs (café, B2B software, clinic) taken to a locked direction |
| [art-directions](./skills/awwwards-web-design/references/art-directions.md) | Eleven composition grammars, each with the rut it slides into. No fixed palettes or fonts |
| [tells](./skills/awwwards-web-design/references/tells.md) | Dated registry of generated-page tells, three waves, with procedures instead of replacements |
| [copy](./skills/awwwards-web-design/references/copy.md) | Argument-first writing, two-line headline arithmetic, truth rules |
| [typography](./skills/awwwards-web-design/references/typography.md) · [layout-composition](./skills/awwwards-web-design/references/layout-composition.md) · [visual-craft](./skills/awwwards-web-design/references/visual-craft.md) | Font procedure, scale, frame, fullness, colour, imagery ladder |
| [motion-playbook](./skills/awwwards-web-design/references/motion-playbook.md) · [interaction-details](./skills/awwwards-web-design/references/interaction-details.md) | Decision gate, exact curves, recipes, never-ship list, gestures, mobile |
| [stress-test](./skills/awwwards-web-design/references/stress-test.md) | Worst-case content, empty/one/huge states, failure signatures |
| [critique](./skills/awwwards-web-design/references/critique.md) | Fresh-context critic, 14 passes, Awwwards weights, caps, fix order |
| [brand-guardian](./skills/awwwards-web-design/references/brand-guardian.md) | LOCKED / FLEXIBLE / FREE, brand book import, change protocol, voice lock |
| [deal.mjs](./skills/awwwards-web-design/scripts/deal.mjs) | Deals three distinct directions, each with its own hero composition |
| [inspect.sh](./skills/awwwards-web-design/scripts/inspect.sh) | Real-browser measurement (including first-screen ambition: dominance, hero cards, shared skeletons) + legible screenshots; exit 1 on FAIL |
| [brand-check.mjs](./skills/awwwards-web-design/scripts/brand-check.mjs) | Brand lock + copy and CSS tells linter; works without a brand file for audits |

### design-consulting (advise)

A senior design consultant for people who aren't designers. It has five modes:
- **Discovery:** I don't know what I need.
- **Audit:** measured pass, then an independent critique, then a Top 3 with exact fixes.
- **Decide:** a weighted matrix and one pick.
- **Translate:** a feeling becomes levers and a ready-to-paste prompt.
- **Brand:** a consistency audit, and setting up a brand lock.

Every recommendation carries the principle behind it, so you build taste over time.

## Proving it works

```bash
# linter regression tests
node --test skills/awwwards-web-design/scripts/tests/brand-check.test.mjs

# inspector against a site with planted defects
bash skills/awwwards-web-design/scripts/inspect.sh skills/design-consulting/evals/files/slop-site/index.html --out .tmp/fixture --name fixture
```

Behaviour evals live in `skills/*/evals/evals.json`. See [evals/README.md](./evals/README.md) for running them against a no-skill baseline.

## Honest note

These skills chase Awwwards-level quality. They can't guarantee an award: juries decide, and **your real content** (photos, copy, brand) is the biggest factor. The agent marks every `[FILL: …]`, `REPLACE:` and `SAMPLE` slot you need to fill. It reports its critique scores honestly, including when they fall short.

Taste is trained. Read the *why* behind each decision. That's how you develop your own.

## Credits

Built on ideas from [emilkowalski/skills](https://github.com/emilkowalski/skills), [pbakaus/impeccable](https://github.com/pbakaus/impeccable), [leonxlnx/taste-skill](https://github.com/leonxlnx/taste-skill), [garrytan/gstack](https://github.com/garrytan/gstack) and Anthropic's [frontend-design](https://github.com/anthropics/skills). Licences and what was adapted: [NOTICE.md](./NOTICE.md).
