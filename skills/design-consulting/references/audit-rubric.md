# Audit Rubric

Self-contained: works without the sibling skill. Thresholds marked **(measured)** come from `inspect.sh` or a browser tool; if you didn't measure, write "not measured", never a guess.

## 0. Classify the surface first

Judge each section by its surface. A tool's landing page is Persuade; a fashion house's docs are Read.

| Surface | Examples | What matters most | Rules specific to it |
|---|---|---|---|
| **Persuade** | Landing, marketing, pricing, company profile | First screen says what/for whom/next step; proof; one idea carried through | Primary action is a real button on the first screen, in its working form when possible (a booking widget beats a link to one). Split hero (copy left, mockup right, badge row) or centred headline over a row of cards is a template whatever paints it. Memory test: what would someone describe an hour after one viewport? |
| **Operate** | App, dashboard, admin, settings | Speed, density, states, predictability | Quiet borders and repeated panels are normal. No marketing motion on data. Every action has idle/pending/success/error. Navigation answers: where am I, where can I go, how do I get back |
| **Read** | Docs, articles, blog | Measure, rhythm, wayfinding | Body 16–20px, measure 45–75ch, headings scannable alone, table of contents for long pages |
| **Experience** | Portfolio, gallery, campaign | The idea, the work shown large, memorability | Motion may lead, but content readable within ~1s and fully visible with reduced motion and without JS |

## 1. The 12 dimensions

Score each 0–10 with evidence. Anchors: **3** broken / actively hurts, **5** works but generic, **7** solid and consistent, **9** distinctive and crafted.

Weights (Persuade; adjust and state for other surfaces): Clarity 15, Hierarchy 10, Typography 10, Layout 10, Color 5, Imagery 5, Copy 10, Distinctiveness 10, Motion 5, Interaction & mobile 10, Accessibility 5, Performance 5.

### 1. Clarity & purpose (Rule)
- 5-second test: what is it, for whom, what to do next? Title is the page's one `h1` and sits on the first screen **(measured)**.
- Exactly one primary action per viewport; a secondary action is a text link.
- Value proposition specific ("Roasted Tuesdays in Dago, 1 kg at a time", not "We help businesses grow").
- **Trunk test** (nav): on any inner page, can a stranger answer: what site is this, what page am I on, what are the main sections, where am I in them, how do I search/contact, how do I get home? 3 or fewer clear answers = FAIL, P1 regardless of polish.

### 2. Visual hierarchy (Rule)
- Squint: the page reduces to 2–3 large masses, one clearly first.
- One focal point per viewport.
- Display ≥ 3× body on Persuade/Experience; each heading level ≥ 1.25× the next.
- **Red flags:** everything medium, competing images, two equal CTAs.

### 3. Typography (Taste + Rule)
- ≤ 2 families **(measured: fonts rendered)**; overused reflex faces need a reason (`tells.md`).
- ≤ 5 sizes doing visible work (WARN above 9) **(measured)**.
- Headlines ≤ 2 lines at 1440/768/390 **(measured)**; ~32 characters survives everywhere at a confident size.
- Display tracking −0.02 to −0.05em (tighter than −0.07em is a defect); body 0; leading display 0.9–1.05, body 1.45–1.65.
- Body ≥ 16px **(measured on phone)**; measure 45–75ch; `text-wrap: balance` on headings; no orphan last word.
- Real quotes/dashes; tabular numerals in prices and tables.

### 4. Layout & composition (Taste)
- One grid; equal outer margins; text blocks share 2–3 left edges across the page.
- Adjacent sections differ in composition (write one word per section: split, list, full-bleed, statement, table…; the same word twice in a row is the template showing).
- Section gap clearly larger than any gap inside a section (120–240px desktop).
- No blank stretch taller than about half a screen **(measured)**; no section huddled on one side with the other half empty.
- Mobile is its own composition, not a squeeze.

### 5. Color (Taste + Rule)
- **Reference Design System & Multi-Chapter Strategy**: When auditing against a reference in `../awwwards-web-design/references/awwwards-references.md`, check whether the site replicates the reference's multi-chapter color system (e.g. `era-residence` shifting across `#F3F3EC` Warm Alabaster, `#B5CEDB` Powder Sky, and `#340C24` Velvet Plum with `#17233B` Deep Navy ink) vs collapsing into a monotonous single-surface dark-grey/gold AI default (`FAIL [flat-surface-monotony]`).
- Accent on the action and at most one other thing.
- Contrast: body ≥ 4.5:1, large text (≥ 24px or ≥ 18.7px bold) ≥ 3:1, UI boundaries ≥ 3:1 **(measured)**. Secondary text on a colored surface is tinted from that hue, never gray.
- Light vs dark follows the physical use scene and reference chapters, never a flat dark-mode default.

### 6. Imagery & iconography (Taste)
- Real pictures or bespoke daylight/twilight AI architectural photography (`image-generator`) beat drawings, which beat stock. Count real pictures: fewer than 4 on a Persuade/Experience page reads unfinished.
- **No murky low-contrast AI renders**: For hospitality, real estate, and editorial sites, at least 60% of photography must have crisp natural daylight, clear azure/coastal sky contrast, water reflections, and botanical accents rather than dark, underexposed AI gloom.
- Shared crop ratios and one grade; no stretched images, grey boxes, or fake dashboards of grey bars.
- One icon set, one stroke; icons support labels.

### 7. Copy & content (Taste + Rule)
- Every headline could only be about this business (swap the name: does it still work? then it's generic).
- No copy tells (unlock, seamless, elevate, "solusi terbaik", "Not X. Y." cadence, more than a few em dashes) **(brand-check)**.
- CTAs say what happens ("Pesan meja", not "Learn more"). The same action keeps the same name through the flow.
- Proof is real (testimonials, numbers, logos) or absent. Invented proof is a P0 trust defect.
- Every section the visitor came for (menu with prices, rooms, schedule) is complete.

### 8. Brand distinctiveness (Taste)
- Logo swap / competitor test: would a competitor's name fit? Yes → ≤ 5.
- One idea stated in a sentence; does it reach pricing, FAQ, and footer, or stop after the hero?
- Tells present (`tells.md`): each is a reason, not automatically a defect, but an unexplained tell caps this dimension at 6.

### 9. Motion (Rule + Taste)
- Frequency gate: keyboard or 100+/day actions not animated; hover ≤ 150ms color/opacity.
- Interface motion ≤ 300ms; exits faster than enters; no `ease-in` on UI; no `transition: all`; no `scale(0)`.
- Narrative motion serves the idea; not one identical fade-up on every block.
- Content visible with reduced motion and without JS **(measured)**. A reduced-motion rule that kills all feedback is also a defect.

### 10. Interaction & mobile (Rule)
- Press feedback, hover gated to hover devices, designed `:focus-visible`.
- Forms: visible labels, inputs ≥ 16px, correct `type`/`inputmode`/`autocomplete`, errors that say how to fix.
- Phone: `100svh` heroes, safe areas, tap targets ≥ 44px **(measured)**, no sideways scroll at 320px **(measured)**.

### 11. Accessibility (Rule)
- Landmarks, one `h1`, no skipped heading levels, alt text, meaningful link text.
- Keyboard: everything reachable, visible focus, Esc closes overlays.
- 200% zoom without loss; zoom never disabled.

### 12. Performance (Rule)
- LCP < 2.5s (aim < 1.5s for marketing), CLS < 0.1, if measured (Lighthouse/PageSpeed). Otherwise "not measured".
- Image dimensions set; font metric overrides; animations on transform/opacity.
- No uncaught JS errors **(measured)**.

## 2. Hard rejects (any one caps the overall below 8)

- Generic SaaS card grid as the first impression
- Beautiful image with a weak or absent brand
- Strong headline with no clear action
- Busy imagery behind text
- Sections repeating the same mood statement
- Carousel with no narrative purpose
- App UI made of stacked cards
- Invented proof (testimonials, logos, statistics)

## 3. Litmus (yes / no; each "no" is a finding)

1. Is the brand unmistakable in the first screen?
2. Is there one strong visual anchor?
3. Is the page understandable by scanning the headlines only?
4. Does each section have one job?
5. Are the cards necessary?
6. Does motion improve hierarchy?
7. Would it feel premium with all decorative shadows removed?

## 4. Caps (override the arithmetic)

| Condition | Cap |
|---|---|
| Any measured FAIL unresolved | overall ≤ 6.0 |
| Headline ≥ 3 lines at any width, eyebrow labels, mono micro-labels, 01/02 numbering without a real sequence, decorative gradient, or resting shadows visible | overall ≤ 6.5 |
| Could belong to a competitor (competitor test fails) | distinctiveness ≤ 6 |
| No clear title on the first screen | clarity ≤ 6 |
| No real button for the primary action on the first screen (Persuade) | clarity ≤ 7 |
| Placeholder content (grey box, lorem, "Image here") | copy ≤ 5 |
| A section the visitor came for is missing or a few words | copy ≤ 6 |
| Content invisible where a reveal didn't fire, or clipped off-screen | interaction ≤ 5 |
| Two or more mostly empty screens, or running text small and grey | layout ≤ 6.5 |

**Calibration:** real Awwwards Sites of the Day land around 7.5–8.0 overall. An honest 8.5 is rare. Most real business sites score 4–6. If your first overall is 9, re-score as the juror who didn't build it.

## 5. Severity

| Severity | Meaning | Tiebreak |
|---|---|---|
| **P0** | Blocks the primary action, excludes users (a11y), breaks on common devices, or invented proof | Would a user contact support about this? Yes → P0/P1 |
| **P1** | Looks generic or untrustworthy, or clearly hurts usability | |
| **P2** | Inconsistency or missed craft that compounds | |
| **P3** | Polish | |

## 6. Priority and disposition

`Priority = Impact (P0 4 / P1 3 / P2 2 / P3 1) ÷ Effort (S 1 / M 2 / L 3)`. Top 3 = highest priority, but always include any P0 Rule finding.

Disposition, one word:
- **ship**: no P0/P1; the Top 3 are improvements, not repairs.
- **fix**: P0/P1 exist but the idea and structure hold.
- **rebuild**: the competitor test fails and the hierarchy or structure fails; fixing details won't rescue it. Hand off to `awwwards-web-design`.

Fix order (later items can't rescue earlier ones): idea → hierarchy → composition → typography → imagery → color → detail → motion.
