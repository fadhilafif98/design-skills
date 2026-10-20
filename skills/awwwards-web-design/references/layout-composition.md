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

*Frame and fullness rules from leonxlnx/taste-skill (MIT); working-form action and memory test from pbakaus/impeccable (Apache-2.0). See NOTICE.md.*
