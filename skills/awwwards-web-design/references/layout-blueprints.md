# Concrete Awwwards Architectural Blueprints (Anti-Box & Anti-Card-Grid)

Lightweight models frequently collapse into `border: 1px solid` boxes, `repeat(3|4, 1fr)` card grids (`FAIL [card-grid]`, `FAIL [box-itis]`), or a monotonous dark-grey page (`FAIL [flat-surface-monotony]`). Use these CSS architectures instead.

## A. Fixed 4-Corner Viewport HUD + Full-Bleed Multi-Chapter Stage (`era-residence` Blueprint)
Never build a rigid top navbar or a monotonous dark-grey page when the reference is `era-residence`. Replicate its **4-Corner Fixed Viewport HUD**, **3-Tier Display + Overlapping Script Typography**, **`BY DAY — BY NIGHT` Switcher**, and **Multi-Chapter Surface Color Shifts** (`#F3F3EC` Alabaster ↔ `#B5CEDB` Powder Sky ↔ `#340C24` Velvet Plum).

Multi-chapter surface themes, fixed 4-corner viewport HUD, and 3-tier display + script title lockup:

```css
.theme-alabaster { background-color: var(--bg-alabaster); color: var(--ink-navy); }
.theme-sky       { background-color: var(--bg-powder-sky); color: var(--ink-navy); }
.theme-plum      { background-color: var(--bg-velvet-plum); color: var(--ink-light); }

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

.hero-title-lockup {
  text-align: center;
  position: relative;
  z-index: 4;
}
.hero-display-caps {
  font-family: var(--font-display);
  font-size: clamp(4.75rem, 11.5vw, 11.5rem);
  line-height: 0.875;
  letter-spacing: -0.024em;
  text-transform: uppercase;
}
.hero-script-overlap {
  font-family: var(--font-script);
  font-size: clamp(3rem, 7vw, 6.75rem);
  line-height: 1;
  margin-top: -0.32em;
  display: block;
  transform: rotate(-4deg);
}
```

## B. Floating Header + Overlapping Asymmetric Hero (`12-col` grid overlap)
Never put a rigid `background: var(--bg); border-bottom: 1px solid` header above the hero (`FAIL [rigid-header]`). Float the transparent header over the hero stage, let the display headline overlap the dominant media frame, and keep the working-form ledger strip to a single top hairline with no 4-sided boxes:

```css
.site-header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) var(--gutter);
  background: transparent;
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

## C. True Full-Bleed `100vw` Pinned Horizontal Filmstrip (No Equal Card Grids)
Never build a "filmstrip" as `grid-template-columns: repeat(4, 1fr)` inside `.container` (`FAIL [card-grid]`). Break out to `100vw`, use `display: flex; width: max-content`, alternate aspect ratios and widths so it reads as an exhibition, and use **zero** `1px` card borders:

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
.filmstrip-item--wide   { width: clamp(24rem, 46vw, 44rem); }
.filmstrip-item--tall   { width: clamp(18rem, 30vw, 28rem); }
.filmstrip-item--medium { width: clamp(20rem, 36vw, 34rem); }
```

## D. Editorial Index Rows with Hover Image Preview (No 2×2 Text Box Grids)
Instead of putting 4 features or rituals in a 2×2 grid of `border: 1px solid` boxes (`FAIL [card-grid]`, `FAIL [box-itis]`), stack them as full-width editorial rows separated **only** by a top hairline (`border-top: 1px solid var(--line)`):

```css
.editorial-index-row {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: var(--gutter);
  align-items: baseline;
  padding-block: var(--space-lg);
  border-top: 1px solid var(--line);
}
.editorial-index-row:last-child {
  border-bottom: 1px solid var(--line);
}
.editorial-index-title { grid-column: 1 / 5; }
.editorial-index-body  { grid-column: 5 / 10; }
.editorial-index-meta  { grid-column: 10 / 13; text-align: right; }
```
