# Awwwards Patterns: what the first screen actually does

The rest of this skill says what not to do. This file says what Sites of the Day **do**, as mechanisms you can build, not looks to copy. Read it in Phase 2, before writing any concept.

## 1. Why generated heroes look generated

Three habits produce almost every generated first screen:

1. **The split hero with a box.** Headline and paragraph on the left, a card or widget on the right (a meter, a clock, a form, a stat panel), a button underneath. Changing the colours, fonts and the widget's content doesn't change the skeleton. Three concepts built this way are one concept.
2. **Timid scale.** An 80–100px headline on a 1440px screen with nothing else large. Nothing dominates, so the screen reads as a document, not a poster.
3. **No pictures.** A hotel, a restaurant, a product or a place shown with type and boxes only. Juries score imagery first, and a page without pictures can't compete unless type does the work of a picture.

Award-level first screens do the opposite: **one thing takes the screen**, the type and the picture **interact** (overlap, interleave, mask, crop each other), and the information sits small and exact around it.

## 2. The ambition floor (measured by `inspect.sh`)

| Rule | Value | Rule id |
|---|---|---|
| One dominant element (picture, or the glyphs of the display type) | ≥ 35% of the desktop fold; below 20% fails | `timid-hero` |
| No boxed card or widget beside the headline | none | `hero-card` |
| Concepts in the picker differ in skeleton (anchor, dominant kind, picture cover, scale) | all three different | `same-skeleton` |
| Display size against body size | ≥ 6× at 1440 (type-led: ≥ 10×) | reported |
| Picture-led concept: pictures cover the fold | ≥ 50% | reported |

The live thing belongs in the section where it proves the claim, usually the second or third screen. On the first screen it may appear only as part of the composition (a bar along a picture's edge, a word in the headline that changes), never as a panel beside the headline.

## 3. Hero compositions

Every direction picks **one** primary hero composition id (or a deliberate hybrid from `awwwards-references.md` §1). Each entry: the mechanism, what it needs, how it recomposes on a phone, and its rut.

### `type-over-image`
- **Mechanism:** one full-bleed picture; the display type set at 12–20vw, crossing the picture, often bleeding off one edge. Small facts (place, action) sit in the corners.
- **Needs:** one strong picture with a calm area where the type lands.
- **Phone:** picture 70–100svh, type 2 lines at ~18vw, action pinned in thumb reach.
- **Rut:** dark overlay on the whole picture; centred headline + two buttons over a stock photo.

### `inline-images`
- **Mechanism:** the headline is huge and runs over 2–3 lines; small pictures sit inside the lines between words, at cap height or taller. The pictures open on hover or scroll.
- **Needs:** 2–4 detail pictures (material, hands, objects).
- **Phone:** keep one inline picture; the rest become a strip below.
- **Rut:** emoji or icons in place of the pictures.

### `giant-wordmark`
- **Mechanism:** the name or one word set edge to edge across the full width; a picture or the information sits below or behind, cropped by the letters' baseline.
- **Needs:** a short name or one word that carries the idea.
- **Phone:** the word still fills the width (it gets smaller, not wrapped).
- **Rut:** a big word with nothing else on the screen.

### `framed-picture`
- **Mechanism:** one tall picture in a deliberate inset frame (55–70% of the width, off-centre), extreme space around it, type small and exact at the corners or one large line crossing the frame's edge.
- **Needs:** one excellent picture. Quiet luxury, architecture, galleries.
- **Phone:** the picture goes nearly full width; the corner type stacks above and below.
- **Rut:** a small picture lost in space, grey text.

### `filmstrip`
- **Mechanism:** a row of tall crops running off the right edge, dragged or moved by scroll; the headline sits above or crosses the strip.
- **Needs:** 4–8 pictures from one shoot (rooms, dishes, works).
- **Phone:** native horizontal swipe with `scroll-snap`.
- **Rut:** equal thumbnails in a carousel with arrows.

### `mask-reveal`
- **Mechanism:** the picture is seen through a shape (the letters of the headline, a window, a doorway from the subject) that grows to the full screen as the visitor scrolls.
- **Needs:** one picture worth entering; a shape from the subject.
- **Phone:** the shape opens on a shorter scroll distance; reduced motion shows the opened state.
- **Rut:** a random blob mask.

### `color-field`
- **Mechanism:** the whole screen is one colour from the subject; one huge word or number and one cut-out object or picture placed off-centre.
- **Needs:** a colour the subject owns; one object.
- **Phone:** same field, object above, word below.
- **Rut:** pastel field with a rounded card in the middle.

### `collage`
- **Mechanism:** 3–6 pictures of different sizes and depths overlap; the headline sits **between** layers (some pictures in front of the type, some behind) and they drift at different speeds.
- **Needs:** varied pictures of the subject's world, ideally with cut-out edges.
- **Phone:** 2–3 layers, less drift.
- **Rut:** tilted polaroids with tape.

### `index-hero`
- **Mechanism:** the first screen is the list (rooms, projects, dishes) set large; hovering or tapping an item shows its picture following the pointer or filling one side.
- **Needs:** a real list the visitor came for.
- **Phone:** the list stays; the picture shows inline under the tapped item.
- **Rut:** 01 / 02 / 03 numbering with hairlines.

### `product-ui`
- **Mechanism:** a real interface crop scaled like a photograph, bleeding off an edge, with the headline beside or over it.
- **Needs:** the real product UI.
- **Phone:** crop to the one meaningful part of the UI.
- **Rut:** grey-bar dashboard, floating laptop mockup.

### `scene`
- **Mechanism:** full-screen footage or a picture sequence that the scroll drives; type minimal, in a corner, changing per scene.
- **Needs:** real footage or a sequence of 6+ related pictures.
- **Phone:** shorter sequence; poster frame for reduced motion.
- **Rut:** stock drone footage with a dark gradient.

### `object-field`
- **Mechanism:** one drawn or cut-out object from the subject, very large (60%+ of the fold), on a plain field; the type wraps around it or crosses it.
- **Needs:** an object worth drawing (a tool, a package, a key).
- **Phone:** object first, type crossing its lower edge.
- **Rut:** a generic 3D blob or an icon blown up.

## 4. Moves that recur on Sites of the Day

Use them when the idea calls for them, not as decoration:
- **Extreme scale contrast:** display type 8–20× the body size; small text set exact, not grey.
- **Type and picture touching:** overlap, interleave, mask, or a word crossing a picture's edge. Elements that only sit side by side read as a template.
- **Pictures that move once with meaning:** clip-path reveals, scale 1.08→1 on entry, a picture that opens to the full screen.
- **One pinned sequence** that tells the idea (the process, the day, the walk from gate to room).
- **Pointer-following previews** on lists.
- **A colour event:** one section where the whole field changes.
- **A footer that is a screen:** the name set huge, real contact details.

## 5. Looking at real references

If WebSearch or WebFetch is available, look at 3–5 Sites of the Day in the subject's category (awwwards.com/websites/ filtered by category, e.g. hotel, architecture, food). For each, write **one line of mechanism** ("the hero is one tall photo in an off-centre frame; the name crosses its left edge"), never colours or fonts. Map each line to an id above. Never copy a layout one to one; take the mechanism and fill it with this subject's inventory.
