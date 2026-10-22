# Layout & Composition

## 1. Core principles

1. **One focal point per viewport.** On every screen, there is exactly one thing that wins. If two things compete, shrink one.
2. **Contrast creates hierarchy:** size, weight, color, space, and position. Use 2+ at once for the most important element.
3. **Whitespace is a material, not leftover.** Premium = more space. Section padding on award sites is commonly 120–240px desktop.
4. **Asymmetry with intent.** Off-center compositions feel designed; everything-centered feels templated. Balance visual weight, not geometry.
5. **Rhythm through variation.** Adjacent sections must differ in layout pattern, density, or alignment, while sharing tokens.
6. **Alignment is non-negotiable.** Every element snaps to the grid or deliberately breaks it (and only one thing breaks it per section).

## 2. Grid

```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: var(--gutter);
  padding-inline: var(--gutter);
  max-width: var(--max);
  margin-inline: auto;
}
/* mobile: 4 columns */
@media (max-width: 767px) { .grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
```
- Use **named spans** that repeat: e.g. text in cols 2–7, image in 8–12. Consistency across sections is what makes asymmetry feel intentional.
- Full-bleed elements break out with `grid-column: 1 / -1` on a wrapper without padding, or a `full` named line.
- Don't draw the grid. Hairline grids and crosshairs are a tell (`tells.md` §3). Let alignment show it.

## 3. Section pattern catalog (rotate, never repeat back-to-back)

| Pattern | Use for |
|---|---|
| **Type-only hero**: giant headline, small supporting line, one CTA | Strong brand voice, no great photo |
| **Split asymmetric** (5/7 or 4/8) text + media | Product/story sections |
| **Full-bleed media** with minimal overlay | Emotional beat, cinematic pause |
| **Index list** with hover previews (numbers only if it is a real sequence) | Services, projects, menu |
| **Big numbers / stats row** (only real numbers) | Proof |
| **Sticky side title + scrolling content** | Process, long explanations |
| **Horizontal scroll track** (pinned) | Gallery, timeline (desktop only) |
| **Marquee** | Only for real content that scrolls (today's batches, a running schedule). Max 1 per page |
| **Bento** (deliberately uneven cells) | Feature overview. Avoid equal 3×2 grids. |
| **Quote spotlight**: one testimonial set huge | Social proof (real quotes only) |
| **Closing CTA takeover**: accent color fills viewport | Final conversion beat |
| **Index/table** with rules and columns | Pricing, specs, menu, schedule |

## 4. Hero rules

- Above the fold must answer: **what is this, for whom, what do I do next.** Within 5 seconds.
- One primary CTA. A secondary action, if any, is a text link.
- The signature moment often lives here, but **content must be readable during/without it**.
- Use `min-height: 100svh` (not `100vh`) so mobile browser chrome doesn't cut it.
- Avoid the generic stack: badge → centered headline → subline → two buttons → product mockup. A split hero (copy left, product right, badge row) is the same template in another coat. So is **copy left, a card or widget right** (a meter, a clock, a form, a stat panel): `inspect.sh` fails it as `hero-card`.
- **Build the hero as a composition** from `awwwards-patterns.md` §3: one thing dominates (≥ 35% of the desktop fold, measured as `timid-hero`), and type and picture touch.
- **Working-form action** (Persuade pages): where the action has a working form, make it reachable from the first screen. That means a booking bar with real dates along the picture's edge, a menu with prices, a search that searches, built into the composition, never as a card beside the headline. A decorative link pointing at it elsewhere doesn't count.
- **Memory test:** if someone left after one viewport, what would they describe an hour later? If the answer is "a website", start over.
- Hero media, when real pictures exist, covers about half the first screen or more (68% of top-scored sites).

## 5. Spacing system

- Use only spacing tokens. Base on 4 or 8.
- **Proximity:** space inside a group < space between groups (at least 2×).
- Vertical rhythm: section padding > block gap > element gap > text gap, each a clear step.
- Optical adjustments win over math: icons next to text, circular shapes, and punctuation often need nudging.

## 6. Imagery composition

- Fixed aspect ratios from tokens (`aspect-ratio: 4 / 5`, `16 / 9`, `1 / 1`), with `object-fit: cover` and a deliberate `object-position`.
- Crop tight and with intent. Detail shots beat wide generic shots.
- Consistent treatment across all images (same grade, grain, or duotone).
- Mix scales: one huge image + small details reads editorial. Equal-sized thumbnails read catalog.

## 7. Mobile recomposition (not just stacking)

- Re-order for mobile priority (CTA early).
- Convert horizontal scroll/pins to vertical stacks or native swipe (`scroll-snap-type: x mandatory`).
- Reduce section padding to ~60–50% of desktop, but keep generous.
- Keep one memorable mobile moment. Don't just delete the signature moment, adapt it.
- Tap targets ≥ 44×44px, primary actions in thumb reach (lower half).

## 8. Navigation

- Minimal: logo + 3–5 links + CTA, or logo + menu button for editorial sites.
- Full-screen menu is fine if it's designed as a page (big type, stagger reveal ≤ 400ms).
- Sticky header hides on scroll down, shows on scroll up. Never cover content permanently on mobile.
- Footer is a design moment (big wordmark, real contact info), not a link dump.

## 9. The frame (measured by `inspect.sh`)

- **One pair of equal outer margins** at every width. Asymmetry lives inside the grid, never in the frame.
- **No voids.** When a section's text sits in one half, the other half holds its picture, list, figure or second column, never nothing. A deliberate rest is a placed picture or a field of colour, once per page.
- **No blank stretch** taller than about half a screen.
- **A heading on every section** the visitor came for, and the page's title in the one `h1` on the first screen.
- Text blocks share **2–3 left edges** across the whole page.

## 10. Fullness

Removing ornaments leaves space. Fill it with **scale** (make the main thing larger), **full content** (the whole menu, every room), **real pictures**, or **a field of flat colour**. Don't refill it with another ornament. In blind tests a rich page with some tells beat a thin page with none, every time.

Each desktop screen should hold as a poster: one dominant thing and the content it carries.

## 11. Concrete Awwwards Architectural Blueprints (Anti-Box & Anti-Card-Grid)

Lightweight models frequently collapse into `border: 1px solid` boxes, `repeat(3|4, 1fr)` card grids (`FAIL [card-grid]`, `FAIL [box-itis]`), or a monotonous dark-grey page (`FAIL [flat-surface-monotony]`). Use these exact CSS/HTML architectures instead:

### A. Fixed 4-Corner Viewport HUD + Full-Bleed Multi-Chapter Stage (`era-residence` Blueprint)
Never build a rigid top navbar or a monotonous dark-grey page when the reference is `era-residence`. Replicate its **4-Corner Fixed Viewport HUD**, **3-Tier Display + Overlapping Script Typography**, **`BY DAY — BY NIGHT` Switcher**, and **Multi-Chapter Surface Color Shifts** (`#F3F3EC` Alabaster ↔ `#B5CEDB` Powder Sky ↔ `#340C24` Velvet Plum):

```css
/* 1. Multi-Chapter Full-Bleed Surface Themes (required by inspect.sh referenceId="era-residence") */
.theme-alabaster { background-color: var(--bg-alabaster); color: var(--ink-navy); }
.theme-sky       { background-color: var(--bg-powder-sky); color: var(--ink-navy); }
.theme-plum      { background-color: var(--bg-velvet-plum); color: var(--ink-light); }

/* 2. Fixed 4-Corner Viewport HUD (replaces top navbar) */
.viewport-hud {
  position: fixed;
  inset: 0;
  z-index: 90;
  pointer-events: none;
  padding: clamp(1.25rem, 2.5vw, 3rem);
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr auto;
}
.hud-seal-tl    { grid-column: 1; grid-row: 1; pointer-events: auto; }
.hud-cta-tr     { grid-column: 3; grid-row: 1; text-align: right; pointer-events: auto; }
.hud-progress-l { grid-column: 1; grid-row: 2; align-self: center; }
.hud-scroll-bl  { grid-column: 1; grid-row: 3; align-self: end; }

/* 3. Monumental 3-Tier Display + Overlapping Script Title */
.hero-title-lockup {
  text-align: center;
  position: relative;
  z-index: 4;
}
.hero-display-caps {
  font-family: var(--font-display); /* Ultra-condensed Didone serif */
  font-size: clamp(4.75rem, 11.5vw, 11.5rem);
  line-height: 0.875;
  letter-spacing: -0.024em;
  text-transform: uppercase;
}
.hero-script-overlap {
  font-family: var(--font-script); /* Calligraphic script */
  font-size: clamp(3rem, 7vw, 6.75rem);
  line-height: 1;
  margin-top: -0.32em;
  display: block;
  transform: rotate(-4deg);
}
```

### B. Floating Header + Overlapping Asymmetric Hero (`12-col` grid overlap)
Never put a rigid `background: var(--bg); border-bottom: 1px solid` header above the hero (`FAIL [rigid-header]`). Float the header over the hero stage, and let the display headline overlap the dominant media frame on the 12-column grid:

```css
.site-header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) var(--gutter);
  background: transparent; /* No border-bottom! */
}
.hero-stage {
  min-height: 100svh;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: 1fr auto auto;
  column-gap: var(--gutter);
  padding: calc(var(--space-xl) + 2rem) var(--gutter) var(--space-lg);
  align-items: end;
}
.hero-media-frame {
  grid-column: 5 / 13;
  grid-row: 1 / 3;
  height: 76svh;
  overflow: hidden;
}
.hero-copy-overlap {
  grid-column: 1 / 8;
  grid-row: 2 / 3;
  z-index: 2;
  pointer-events: none;
}
/* Working-form ledger strip: single top hairline, NO 4-sided cell boxes */
.hero-ledger-bar {
  grid-column: 1 / 13;
  grid-row: 3 / 4;
  display: grid;
  grid-template-columns: 2fr 2fr 2fr auto;
  column-gap: var(--space-lg);
  align-items: end;
  padding-top: var(--space-md);
  margin-top: var(--space-md);
  border-top: 1px solid var(--line);
}
```

### C. True Full-Bleed `100vw` Pinned Horizontal Filmstrip (No Equal Card Grids)
Never build a "filmstrip" as `grid-template-columns: repeat(4, 1fr)` inside `.container` (`FAIL [card-grid]`). Break out to `100vw`, use `display: flex; width: max-content`, vary the frame widths/aspect ratios, and use **zero** `1px` card borders:

```css
.filmstrip-pin-section {
  width: 100%;
  overflow: hidden;
  padding-block: var(--space-2xl);
}
.filmstrip-track {
  display: flex;
  align-items: flex-end;
  gap: clamp(2.5rem, 5vw, 5rem);
  width: max-content;
  padding-inline: var(--gutter);
  will-change: transform;
}
/* Alternate aspect ratios & widths so it reads as an exhibition, not a catalog */
.filmstrip-item--wide   { width: clamp(24rem, 46vw, 44rem); }
.filmstrip-item--tall   { width: clamp(18rem, 30vw, 28rem); }
.filmstrip-item--medium { width: clamp(20rem, 36vw, 34rem); }
```

### D. Editorial Index Rows with Hover Image Preview (No 2×2 Text Box Grids)
Instead of putting 4 features or rituals in a 2×2 grid of `border: 1px solid` boxes (`FAIL [card-grid]`, `FAIL [box-itis]`), stack them as full-width editorial rows separated **only** by `border-top: 1px solid var(--line)`:

```css
.editorial-index-row {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: var(--gutter);
  align-items: baseline;
  padding-block: var(--space-lg);
  border-top: 1px solid var(--line); /* Only top hairline, never a 4-sided box */
}
.editorial-index-row:last-child {
  border-bottom: 1px solid var(--line);
}
.editorial-index-title { grid-column: 1 / 5; }
.editorial-index-body  { grid-column: 5 / 10; }
.editorial-index-meta  { grid-column: 10 / 13; text-align: right; }
```

*Frame and fullness rules from leonxlnx/taste-skill (MIT); working-form action and memory test from pbakaus/impeccable (Apache-2.0). See NOTICE.md.*
