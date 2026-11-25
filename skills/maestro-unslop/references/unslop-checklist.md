# Unslop Diagnosis & Surgical Replacement Playbook

Use this checklist to diagnose why an existing page, section, or component reads as AI-generated or legacy-bloated, and replace every defect cleanly.

> **Core Rule (Removal ≠ Replacement):** Never delete a tell and leave an empty box. Every removal must be paired with a structural upgrade: larger focal scale, real content/proof, a cleaner layout family, a native web primitive, or a bespoke visual.

## 1. Visual Tells (3 Waves)

| Wave | Tell to Spot | Surgical Replacement |
|---|---|---|
| W1 | Violet/indigo/cyan hero gradients, glowing buttons, gradient-filled headline text | Flat ground + solid high-contrast ink (`--ink`), flat primary button named for the action |
| W1 | Glassmorphism cards (`backdrop-filter: blur`) & soft grey drop shadows on every box | Opaque surfaces 1 tone step from ground, or remove boxes and separate with space |
| W1 | Emoji used as icons or feature bullets (`🚀`, `✨`, `⚡`) | Plain words, real product icons, or bespoke photography |
| W2 | Eyebrow micro-label above every heading (`OUR FEATURES`), pill badge above `h1` (`✨ Introducing`) | Fold the key fact into the `h1` or supporting sentence; delete the badge |
| W2 | Floating blurred pill navbar; pulsing green "Live / Available" dot | Plain aligned bar (wordmark + 3–5 links + 1 CTA); delete fake status dots |
| W2 | Fake dashboard mockup made of grey bars, random sparklines, and donut charts | One real HTML UI fragment showing what the product actually operates on |
| W3 | **Anti-slop rut:** warm cream (`#F4F1EA`) + high-contrast serif + terracotta accent + mono micro-labels + `01/02/03` + hairlines everywhere | Palette derived from business kind/subject; sans or non-reflex display face; order by scale/position, not `01/02/03` |
| W3 | Decorative `→`/`↗` on every link; middle-dot meta strings (`LOG · W42 · #04`); crosshairs/crop-marks/coordinates | Verb carries the action (max 1 directional arrow where needed); plain sentence; delete fake chrome |

## 2. Reflex Font Blocklist

Replace unless locked by an existing brand book (`design/brand.json` → `fonts.locked`):
- **Sans:** Inter, Roboto, Open Sans, Lato, Montserrat, Poppins, Raleway, Space Grotesk, DM Sans, Outfit, Plus Jakarta Sans, Instrument Sans, Geist, Mona Sans.
- **Serif / Display:** Playfair Display, Fraunces, Cormorant, Lora, Crimson, Newsreader, Syne, Recoleta, Clash Display, Bebas Neue.
- **Mono:** Space Mono, JetBrains Mono.

Run `node <skill>/scripts/unslop-deal.mjs` when you need a deterministic non-reflex pairing from Google Fonts / Fontshare, and verify weights before shipping.

## 3. Structural Tells

| Tell | Surgical Replacement |
|---|---|
| Generic split-card hero (text left + stat card/form/widget right) or centred headline + 2 buttons + grey mockup | Committed hero: full-bleed photo + tight type, anchor-scale product, giant wordmark, or live HTML product UI (focal mass ≥ 35% of fold) |
| 3 identical equal-height feature cards with tinted icon squares | Asymmetric 2-column editorial, alternating visual/text rows, tabbed live UI frame, or typographic ledger |
| Same layout skeleton repeated in adjacent sections | Name every section's layout in 1 word (`hero`, `visit`, `list`, `strip`, `split`, `ledger`); never repeat a word back-to-back |
| Horizontal overflow on `390px` (fixed-width grids, `min-width` traps) | Fluid CSS Grid (`minmax(0, 1fr)`), `overflow-x: clip`, bespoke mobile stacking |
| Everything centred (> 70% of text) | Left-anchor body and lists; reserve centring for at most 1 deliberate moment |
| 9+ inconsistent font sizes or medium `12–16px` radius on every element | Lock ≤ 5 type sizes on a clear scale; pick 1 radius rule (`0–2px` sharp, `4–6px` crisp, or pill for buttons only) |

## 4. Copy & Truth Tells (EN & ID)

| Tell | Surgical Replacement |
|---|---|
| Filler verbs/adjectives: *unlock, supercharge, seamless, elevate, empower, effortless, revolutionize, cutting-edge, world-class* · ID: *solusi terbaik, terdepan, revolusioner, tingkatkan bisnis Anda, wujudkan impian, kualitas terbaik* | Plain concrete verb + specific outcome only this business can claim |
| Rhetorical-question headings ("Ready to transform your workflow?") or "Not just X. It's Y." / "Bukan sekadar X..." | Direct statement of what the product/place does |
| Tricolon slogans ("Fast. Simple. Secure.") & generic CTAs ("Get started", "Learn more", "Selengkapnya") | Action-specific CTA ("Book a tasting", "Inspect a sample diff", "Lihat menu hari ini") |
| `h1` wrapping to 3+ lines | Cut to ≤ 2 lines at desktop and mobile (~20–42 chars) |
| Invented proof ("Trusted by 10,000+ teams", stock testimonials, fake logo walls) | Real proof, or honest `[FILL: client quote]` / remove the section entirely |

## 5. Legacy Web & Modern Platform Slop (`modern-web-guidance`)

Prefer native Baseline browser APIs over legacy CSS workarounds and JS widget bloat. Gate Newly Available APIs behind `@supports (...)` so Safari/Firefox degrade cleanly.

| Legacy Slop Pattern | Modern Native Replacement | Baseline Policy |
|---|---|---|
| `<div class="modal">` + `z-index: 9999` + manual focus trap JS | `<dialog>` + `showModal()` + `::backdrop` (built-in `Esc` & top-layer) | Widely Available |
| JS dropdown/tooltip positioning (Popper/Floating UI for simple menus) | `popover` + `popovertarget` (+ `anchor-name` / `position-anchor` with fallback) | Widely / Newly (`@supports`) |
| Custom JS height-measuring accordion or `max-height: 9999px` hacks | `<details name="group"><summary>…</summary></details>` (+ `interpolate-size: allow-keywords` / `@starting-style`) | Widely / Newly (`@supports`) |
| `<div onclick>` / `<span onclick>` clickable traps | Native `<button type="button">` or `<a href>` with `:focus-visible` | Widely Available |
| `height: 100vh` clipping hero CTA on mobile Safari/Chrome | `min-height: 100svh` (stable) or `100dvh` | Widely Available |
| `overflow: hidden` on page/wrapper breaking `position: sticky` | `overflow-x: clip` | Widely Available |
| Viewport-only media queries for reusable cards/modules | Container Queries (`container-type: inline-size` + `@container`) & `grid-template-rows: subgrid` | Widely Available |
| Ragged 2-line headings & orphan words in body paragraphs | `text-wrap: balance` on headings; `text-wrap: pretty` on body (+ progressive `text-box-trim`) | Widely / Newly (`@supports`) |
| `:invalid` styling inputs red before the user types | `:user-invalid` / `:user-valid` (+ `field-sizing: content` on auto-grow textareas) | Widely / Newly (`@supports`) |
| Heavy JS scroll listeners for simple reveals / slow long pages / blocked INP | `@supports (animation-timeline: view())` CSS reveals; `content-visibility: auto; contain-intrinsic-size: auto 600px;` on below-fold sections; `await scheduler.yield()` for heavy filter tasks | Progressive / Widely |

## 6. Standalone Gate Checklist (When Sibling `maestro` Is Absent)

Before reporting done, verify every item (mark any browser-only metric `"not measured"` if no Chromium tool is available):

- [ ] **Business-kind fit:** Zero shaders/dark-neon/fake-UI on `place`/`service`/`product`; real HTML UI on `software`.
- [ ] **Fold & framing:** Hero focal element ≥ 35% of fold, `h1` ≤ 2 lines, equal left/right container edges, 1 section per screen at `1440x900`.
- [ ] **Zero Wave 1–3 tells:** No violet glows, no cream+terracotta+mono+`01/02` rut, no reflex fonts, no generic 3-card icon grids, no captions under visuals.
- [ ] **Modern platform hygiene:** Native `<dialog>`/`<details>`/`<button>`, `100svh`, `overflow-x: clip`, `:user-invalid`, `text-wrap: balance/pretty`, `@supports` on Newly Available APIs.
- [ ] **No-JS & Reduced Motion:** Hidden reveal targets gated behind `.js` on `<html>`; `prefers-reduced-motion: reduce` removes travel/pinning.
- [ ] **A11y & Mobile:** Body text ≥ 16px, contrast ≥ 4.5:1 (3:1 large), valid `<label>` and `img[alt]`, no `maximum-scale=1`, zero horizontal overflow at `390px` and `320px`.
- [ ] **Truth:** Zero invented proof; all placeholders marked `[FILL: ...]`, `<!-- REPLACE: ... -->`, or `<!-- SAMPLE -->`.

## 7. Quick Litmus Tests (Before Ship)

1. **Swap Test:** Put a competitor's logo/name on the hero. If it still fits untouched, the copy or visual has no subject specificity—rewrite.
2. **Squint Test:** Blur the page at `1440px`. Two or three clear visual masses should lead; uniform card wallpaper fails.
3. **5-Second Test:** A stranger can name what is sold, for whom, and the single next action without scrolling.
4. **Phone Test:** At `390px`, the layout reads intentionally composed—zero overflow, readable ≥ 16px body, thumb-friendly CTAs.

*Synthesizes anti-slop rules, motion hygiene, modern web platform guidance, litmus checks, and tells registries from `NOTICE.md` (`leonxlnx/taste-skill`, `pbakaus/impeccable`, `emilkowalski/skills`, `garrytan/gstack`, `anthropics/skills`, `GoogleChrome/modern-web-guidance`).*
