<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/design-skills-wordmark-dark.png" />
    <img src="assets/design-skills-wordmark-light.png" alt="design-skills" width="340" />
  </picture>
</p>

<div align="center">

[![Version](https://img.shields.io/badge/version-v1.0.0-111318?style=flat-square)](CHANGELOG.md)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=nodedotjs&logoColor=white)](package.json)
[![skills.sh](https://skills.sh/b/fadhilafif98/design-skills?style=flat-square)](https://skills.sh/fadhilafif98/design-skills)
[![Blueprints](https://img.shields.io/badge/Design_Archetypes-15-111318?style=flat-square)](skills/maestro/references/design-archetypes.md)
[![Gate](https://img.shields.io/badge/Gate-CWV_%C2%B7_SEO_%C2%B7_WCAG_2.2_AA-E84A27?style=flat-square)](skills/maestro/scripts/inspect.mjs)
[![MIT license](https://img.shields.io/badge/license-MIT-f4c430?style=flat-square)](LICENSE)

<br />

<code>npx skills@latest add fadhilafif98/design-skills</code>

[Why](#why-use-it) · [Install](#install) · [Usage](#usage) · [Skills](#skills) · [Modes & Surfaces](#modes-and-surface-profiles) · [Changelog](CHANGELOG.md) · [FAQ](#faq)

</div>

---

**design-skills** turns an AI coding agent into your creative director, UX architect, and design engineer. Built for founders, developers, and small business owners who want award-level, conversion-ready websites without being designers. Type a plain prompt like *"build a website for my specialty coffee roastery in Portland"*: the agent extracts what only your business has, locks a curated design-archetype blueprint (70% proven architecture / 30% bespoke evolution), generates art-directed photography via AI, builds real scroll/motion choreography, measures the live page in Chromium (layout, Core Web Vitals, Technical SEO, WCAG 2.2 AA), and has an independent fresh-context critic score the result.

## Why use it

Agents don't have taste on their own. Give an AI a short prompt and it fills every undecided layer with the average of the internet. Tell it to avoid that, and it gives you the predictable opposite: cream ground, serif headline, terracotta accent, mono micro-labels, and `01/02/03`. Both are the rut.

These skills replace defaults with written decisions, and verify every layer with tools instead of hope:

```text
Subject → Idea → Rules → Words → Build → Choreography → Measure → Judge
```

- **Ideas come from your business, not your category.** The agent inventories 8–12 facts only you have (name, street, numbers, rituals, constraints), builds an idea sentence, and runs a competitor swap test.
- **70% Blueprint Architecture / 30% Subject Evolution.** Matches your brief to 15 curated design archetypes in [`design-archetypes.md`](skills/maestro/references/design-archetypes.md) (*Editorial Portal*, *Kinetic Wordmark*, *Daylight Atelier*, *Obsidian Canvas*, *Reactive Timeline*, *Chiaroscuro Stage*, *Linen Editorial*, etc.)—keeping 70% of the proven spatial/motion foundation and evolving 30% from your business.
- **IA, UX Psychology & Conversion built in.** Classifies the site's surface (`experience`, `persuade`, `operate`, `read`), maps multi-page sitemaps and conversion funnels, applies Laws of UX, and designs full UI states (`idle`, `loading`, `empty`, `error`, `success`).
- **Bespoke AI imagery first.** Generates cohesive art-directed visuals via `image-generator` matching the reference's lighting and color grade—no generic stock scraping.
- **One live thing.** Every site ships a custom interactive instrument with real content (e.g. roast schedule explorer, live scope/treatment configurator, interactive lookbook) plus a semantic `<noscript>` fallback.
- **Measured in a real browser, not eyeballed.** `inspect.sh` runs Chromium across `1440 / 768 / 390 / 320px`, `prefers-reduced-motion`, and no-JS. It measures headline lines, contrast, overflow, fonts, first-screen ambition, choreography, **Core Web Vitals (LCP, CLS, transfer weight)**, **Technical SEO (title, meta, Open Graph, JSON-LD, heading order)**, and **WCAG 2.2 AA (`img[alt]`, accessible names, form labels, landmarks, tap targets)**.
- **Judged by fresh eyes.** A separate subagent sees only the screenshots, brief, and archetype blueprint—scoring like an independent design juror with hard caps that block grade inflation.
- **The brand never drifts & no invented proof.** Identity is `LOCKED`, taste moves within `FLEXIBLE` bounds (`brand-check.mjs` lints every checkpoint), and missing real facts stay marked `[FILL: …]`, `REPLACE:`, `CONFIRM:`, or `SAMPLE`.

## Install

```bash
npx skills@latest add fadhilafif98/design-skills
```

Install a single skill, or install globally for Claude Code:

```bash
npx skills@latest add fadhilafif98/design-skills --skill maestro
npx skills@latest add fadhilafif98/design-skills -a claude-code -g
```

Install both for the full workflow. `design-consulting` works standalone, and automatically borrows `inspect.sh`, `brand-check.mjs`, and references from `maestro` when present.

### Manual install

Clone the repository and symlink the skills into your agent's skills directory (e.g. `~/.claude/skills` or `$CLAUDE_CONFIG_DIR/skills`):

```bash
ln -s "$PWD/skills/maestro"           ~/.claude/skills/maestro
ln -s "$PWD/skills/maestro-unslop"    ~/.claude/skills/maestro-unslop
ln -s "$PWD/skills/design-consulting" ~/.claude/skills/design-consulting
```

Start a new session afterwards so the agent loads the skills.

**Requirements:** Node 18+. The first `inspect.sh` run installs Playwright and Chromium into `~/.cache/maestro` (requires network once).

## Usage

```text
build a website for my specialty coffee roastery in Portland
```

```text
/maestro landing page for my interior design studio
```

```text
/design-consulting audit https://my-site.com
```

- **Autopilot:** Say **"up to you"** or **"just build it"** and the agent asks no questions—writes its assumptions, commits to the single best reference blueprint, generates visuals, and builds the complete experience.
- **Plain-word feedback:** React naturally (*"doesn't feel premium enough"*, *"too cluttered"*, *"looks AI-generated"*). The agent translates feelings into exact CSS/layout/motion levers without touching your locked brand.

## Skills

| Skill | Role | Pick it for |
|---|---|---|
| [`maestro`](skills/maestro/SKILL.md) | Build (10 phases + ledger) | Creating or redesigning a flagship, award-level website, portfolio, or campaign end-to-end |
| [`maestro-unslop`](skills/maestro-unslop/SKILL.md) | Surgical Unslop (page / section / component) | Rescuing an existing AI-looking, generic, or legacy-bloated UI—enforcing business-kind boundaries, 3-wave tells removal, and modern native web APIs without rebuilding from scratch |
| [`design-consulting`](skills/design-consulting/SKILL.md) | Advise (5 modes) | Discovery briefs, measured UX/SEO/brand audits, comparing design options, translating vague feedback, or locking a brand book |

<details>
<summary><strong>What's inside <code>maestro</code> (10 phases, 18 references, 4 CLI tools)</strong></summary>

Ten phases tracked in `design/decisions.md` so no step is silently skipped:
`Phase 0` Resume/Import → `Phase 1` Intake, Surface & Sitemap/IA → `Phase 2` Reference Match & AI Assets → `Phase 3` Lock Tokens & Brand → `Phase 4` Argument, Conversion & Copy → `Phase 5` Build + SEO/CWV/WCAG → `Phase 6` Choreography (GSAP/Lenis/Anime/Three) → `Phase 7` Stress Test & Pre-Launch QA → `Phase 8` Fresh-Eyes Critique → `Phase 9` Report.

| Module | What it covers |
|---|---|
| [`design-archetypes.md`](skills/maestro/references/design-archetypes.md) | 15 curated design archetypes (hero mechanism, section rhythm, motion stack, multi-chapter colour rules) |
| [`hero-patterns.md`](skills/maestro/references/hero-patterns.md) | 12 buildable hero compositions, measured ambition floor, recurring flagship layout moves |
| [`creative-direction.md`](skills/maestro/references/creative-direction.md) · [`art-directions.md`](skills/maestro/references/art-directions.md) | Subject inventory, rut naming, 70/30 reference matching, idea sentence, live thing, 12 composition grammars |
| [`ia-ux-conversion.md`](skills/maestro/references/ia-ux-conversion.md) | Surface classes (`experience`/`persuade`/`operate`/`read`), sitemap & multi-page IA, Laws of UX, conversion funnel, UI states matrix, content handoff |
| [`seo-perf-launch.md`](skills/maestro/references/seo-perf-launch.md) · [`modern-web-platform.md`](skills/maestro/references/modern-web-platform.md) | Technical SEO, Open Graph, JSON-LD, Core Web Vitals & image pipeline, WCAG 2.2 AA, Web Platform Baseline fallbacks, native `<dialog>`/`popover`/Anchor Positioning/`@container` |
| [`tells.md`](skills/maestro/references/tells.md) · [`copy.md`](skills/maestro/references/copy.md) | Dated 3-wave registry of AI-generated tells, argument-first copy, 2-line headline arithmetic, truth rules |
| [`typography.md`](skills/maestro/references/typography.md) · [`layout-composition.md`](skills/maestro/references/layout-composition.md) · [`visual-craft.md`](skills/maestro/references/visual-craft.md) | Verified font procedure, modular scale, frame & fullness, OKLCH colour, AI imagery rules |
| [`motion-playbook.md`](skills/maestro/references/motion-playbook.md) · [`interaction-details.md`](skills/maestro/references/interaction-details.md) | Decision gate, exact curves, GSAP/Lenis/Anime/Three recipes, pressables, forms, gestures, mobile |
| [`stress-test.md`](skills/maestro/references/stress-test.md) · [`critique.md`](skills/maestro/references/critique.md) · [`brand-guardian.md`](skills/maestro/references/brand-guardian.md) | Worst-case content states, 14-pass fresh-context juror rubric with caps, LOCKED/FLEXIBLE/FREE brand protocol |
| [`worked-examples.md`](skills/maestro/references/worked-examples.md) | 3 full briefs (café, B2B SaaS, clinic) taken to a locked direction |
| [`inspect.sh`](skills/maestro/scripts/inspect.sh) · [`brand-check.mjs`](skills/maestro/scripts/brand-check.mjs) · [`lookup.mjs`](skills/maestro/scripts/lookup.mjs) · [`deal.mjs`](skills/maestro/scripts/deal.mjs) | Real-browser Playwright gate (CWV, SEO, WCAG, tells, ambition, surface profiles), brand/legacy-pattern linter, on-demand token-efficient lookup CLI, and optional font/direction roller |

</details>

<details>
<summary><strong>What's inside <code>maestro-unslop</code> (Surgical Unslop: 3 references, replacement dealer, Baseline platform cleanup)</strong></summary>

- **Existing Code Only (Zero Overlap with `maestro`):** Rescues a single component, section, or full page while preserving existing stack, routes, forms, and `LOCKED` brand assets.
- **5-Bucket Diagnosis:** Strips Wave 1–3 visual tells, structural tells (3-card grids, timid heroes, phone overflow), AI copy clichés (EN/ID), broken motion/a11y, and legacy web bloat (`<div class="modal">` → `<dialog>`, JS accordions → `<details name>`, `100vh` → `100svh`, `overflow: hidden` → `overflow-x: clip`, `:invalid` → `:user-invalid`, `@container`, `subgrid`, `text-wrap: balance/pretty`, `@supports` Baseline fallbacks).
- **Business-Kind Guardrails:** Enforces Tech (`software`/`tech`/`gaming`) vs Non-Tech (`product`/`service`/`place`) boundaries—stripping shaders, dark-neon, and fake dashboards off non-tech sites.
- **70/30 Reference-First Component Craft:** Instead of reinventing flat wireframes from scratch, sources 2–4 real components from Aceternity UI, Skiper UI, Magic UI v3, React Bits / Pro, and Uiverse (70% proven craft / 30% OKLCH token, copy, business-kind, and `modern-web-guidance` adaptation).
- **Standalone + Sibling-Aware:** Works standalone with Node 18+ (`unslop-checklist.md`, `component-craft.md`, optional `unslop-deal.mjs`), and automatically borrows `inspect.sh` and `brand-check.mjs` when `maestro` is installed.

</details>

<details>
<summary><strong>What's inside <code>design-consulting</code> (5 modes)</strong></summary>

- **Discovery:** turn a vague idea into a brief, subject inventory, recommended direction, and ready-to-paste build prompt.
- **Audit:** measured browser pass (`inspect.sh` + `brand-check.mjs`), independent fresh-context critique, and a prioritized Top 3 with exact fixes.
- **Decide:** weighted decision matrix + swap test across 2–5 options, picking one clear winner.
- **Translate:** map subjective words (*"premium but warm"*) into exact design levers and a prompt pack.
- **Brand:** consistency audit against an existing brand book, or create `BRAND.md` + `brand.json` locks.

</details>

## Modes and surface profiles

### Build modes (`maestro`)

| Mode | When to use | Scope |
|---|---|---|
| **Quick** | Single section, component, or restyle | Reuses existing brand locks, 1 critique round |
| **Standard** *(default)* | New website or landing page | All 10 phases, 1 fresh-eyes critique round (≤ 20 min budget) |
| **Full** | Award-level showcase or flagship redesign | All 10 phases, full stress test, up to 3 critique rounds |

### Surface profiles (`inspect.sh --surface`)

Declare `"surface"` in `design/brand.json` or pass `--surface` to `inspect.sh` so automated checks match the page's job:

| Surface | Best for | Behaviour |
|---|---|---|
| `experience` *(default)* | Portfolio, hospitality, editorial campaign | Full flagship strictness (ambition, choreography, multi-chapter surfaces) |
| `persuade` | SaaS landing, company profile, clinic, storefront | Enforces clarity, conversion, SEO, CWV, WCAG; softens campaign-only tells to warnings |
| `operate` | Web app, dashboard, booking portal | Relaxes campaign-only rules (`card-grid`, `static-page`, `rigid-header`, `timid-hero`) |
| `read` | Docs, blog, long-form editorial | Relaxes campaign-only rules; enforces typography, contrast, heading order, and landmarks |

## Proving it works

```bash
# 1. Source linter, legacy-pattern & brand-lock regression tests (22 tests)
npm test

# 2. On-demand blueprint/reference lookup (token-efficient CLI)
npm run lookup -- list
npm run lookup -- blueprint daylight-atelier

# 3. Browser inspector against the planted-defect fixture (experience vs operate)
bash skills/maestro/scripts/inspect.sh skills/design-consulting/evals/files/slop-site/index.html --name fixture --shots page
bash skills/maestro/scripts/inspect.sh skills/design-consulting/evals/files/slop-site/index.html --surface operate --name fixture-op

# 4. Unguided baseline vs guided skill uplift comparison
npm run eval:compare -- <baseline.html> <guided.html> --surface experience
```

Behaviour evals live in `skills/*/evals/evals.json`. See [evals/README.md](evals/README.md) for running them against a no-skill baseline.

## FAQ

**Does this guarantee a design award?**
No. Juries decide, and your real content (photography, copy, product, brand) is the biggest factor. The skills enforce award-level architecture, report scores honestly (never rounding up), and flag every placeholder slot (`[FILL: …]`, `REPLACE:`, `CONFIRM:`, `SAMPLE`) for you to fill.

**Can I use this for a normal business site, SaaS, or e-commerce—not just artsy portfolios?**
Yes. Set `"surface": "persuade"` or `"operate"` in `design/brand.json` (or `--surface persuade` in `inspect.sh`). You keep full conversion, IA, SEO, Core Web Vitals, and WCAG 2.2 AA rigor without campaign-only rules fighting usability.

**Does it work if I already have a brand book or an existing codebase?**
Yes. Phase 0 runs in **Import mode** (`brand-guardian.md` §3): your logo, colours, and fonts are locked in `BRAND.md` and `brand.json`, and redesigns preserve your existing stack, routes, and forms.

**Which AI coding agents are supported?**
Any agent that supports the Agent Skills standard (`SKILL.md`), including Claude Code, Antigravity, Cursor, Codex, OpenCode, Gemini CLI, and GitHub Copilot.

<hr>

<p align="center"><em>“Taste is trained, not guessed.<br>
Replace defaults with decisions, measure them in a real browser,<br>
and read the <strong>why</strong> behind every fix.”</em></p>

<hr>

## Credits & License

Built on ideas from [emilkowalski/skills](https://github.com/emilkowalski/skills), [pbakaus/impeccable](https://github.com/pbakaus/impeccable), [leonxlnx/taste-skill](https://github.com/leonxlnx/taste-skill), [garrytan/gstack](https://github.com/garrytan/gstack), Anthropic's [frontend-design](https://github.com/anthropics/skills), [GoogleChrome/modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance), Elementor's Web Design Guide, Laws of UX, NN/g, Baymard, Refactoring UI, and Google web.dev. Licences and attributions: [NOTICE.md](NOTICE.md).

MIT: [LICENSE](LICENSE)
