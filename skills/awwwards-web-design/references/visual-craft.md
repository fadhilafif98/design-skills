# Visual Craft: Colour, Depth, Surfaces, Imagery

## 1. Colour

- **Strategy first, values second.** Choose Restrained / Committed / Full palette / Drenched (`creative-direction.md` §6), then pick hues **from the subject**: its material, its packaging, its street, the landscape outside. Check the result against the third-wave look (`tells.md` §3: cream + serif + terracotta; near-black + neon).
- **Light or dark from the use scene**, never by default. Write the scene sentence in DESIGN.md §0.
- **Define in OKLCH** for perceptually even steps: `oklch(L C H)`. Build tints by changing L.
- **Tinted neutrals:** chroma 0.005–0.02 toward the brand hue. Pure `#000` / `#fff` / flat grey feel digital. But a tinted near-black on every project is a tell too: derive the ink from the palette.
  ```css
  --ground: oklch(0.97 0.008 250);  /* example only: hue comes from the subject */
  --ink:    oklch(0.22 0.02 250);
  --line:   oklch(0.22 0.02 250 / 0.12);
  ```
- **Proportion:** in Restrained, ≤ 10% accent. The accent appears on the action and perhaps one other thing. In Committed or Drenched, the colour holds the surface and the ink does the work.
- **Running text in the full ink.** Grey is for secondary notes only. A page set in soft grey reads unfinished.
- **On coloured surfaces, tint secondary text from that hue**, never neutral grey.
- **Contrast** (measured by `inspect.sh`): body ≥ 4.5:1, large text (≥ 24px, or ≥ 18.7px bold) ≥ 3:1, UI boundaries ≥ 3:1. Muted text fails most often.
- **Dark themes:** don't invert. Ground L 0.14–0.20, never pure black. Reduce accent chroma slightly; one weight lighter for body; slightly more line-height.
- **Colour events:** a section that changes the whole field (colour by chapter, the final action filling the screen) is more memorable than accent everywhere. Nothing fades into anything: change fields cleanly.

## 2. Surfaces, borders, depth

- **Separate surfaces with a tone step**, not a line or a shadow. Hairlines everywhere are a tell. Lines belong to real tables and form fields.
- **Shadows are light, not decoration.** Only on what truly floats (menu, dialog, dragged item). Layered, low opacity, tinted toward the ground hue, offset downward:
  ```css
  --shadow-float: 0 2px 4px oklch(0.2 0.02 250 / 0.05), 0 12px 32px oklch(0.2 0.02 250 / 0.10);
  ```
  Never the default `0 10px 15px rgba(0,0,0,.1)` on every card. Never a zero-offset coloured halo (glow).
- **Elevation:** max 3 levels (flat, raised, overlay); one light direction everywhere. Declare elevation once: border **or** shadow, not both.
- **Radius:** decided once, by hierarchy. Square or fully round reads designed. A soft 9–16px on everything is the weak-site default (top sites: 52% square, 23% pill buttons). Nested radius = outer − padding.
- **Translucency** only if the concept needs a material. Never stack light translucent surfaces. Respect `prefers-reduced-transparency` (solid fallback).

## 3. Texture and atmosphere

- One atmospheric device per site at most (grain *or* a photographic texture *or* duotone), and only if the subject has it. Grain on a cream page is part of the third-wave look.
- Static, not animated, unless it is the concept.

## 4. Imagery

**One dominant image beats six small ones.** Pages with real pictures beat pages of drawings or type only in blind comparisons. Order of preference:

1. **The project's own:** photos, footage, real product UI.
2. **Stock placeholders**, when the subject can be photographed (a place, a room, food, a product, people) and the client has no pictures yet. They let the concepts and the build be judged at the scale the real photos will have. Rules:
   - **Sources:** Unsplash and Pexels (free licences that allow commercial use; credit anyway).
   - **Finding:** search the inventory, not the category ("board-formed concrete wall tropical shade", not "luxury villa"). Use WebSearch or WebFetch on the site's search page to get real photo page URLs. Never guess an image ID.
   - **Downloading:** Unsplash `curl -L -o design/assets/stock/<name>.jpg "https://unsplash.com/photos/<id>/download?w=2400"`; Pexels `curl -L -o … "https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg?auto=compress&w=2400"`, where `<id>` comes from the photo page URL. Check the file is an image (`file`), then **open it with Read** and judge it: right light, right material, no logos, no faces you can't use, one consistent grade with the others.
   - **Honesty:** every stock picture is a stand-in, marked `<!-- REPLACE: own photo of …, 4:5 -->` in the source and listed in `design/credits.md` and the report. A stock villa is never presented as this villa; the client replaces it before launch.
   - Pick a set that could come from one shoot. Mixed light and grade reads as stock even when each photo is good.
3. **Generated**, if an image tool is available. Never presented as the client's real product, room, dish or team.
4. **Real pictures of the subject's world from open collections**, when an honest one exists:
   - **Sources:** Openverse (openverse.org), Wikimedia Commons, museum open-access collections (Met, Rijksmuseum, Art Institute of Chicago).
   - **What to search for:** the inventory, not the category. The street in old postcards, an old map of the neighbourhood, the material up close, the trade in engravings, a botanical plate of the crop.
   - **Licence:** only licences that allow commercial use (CC0, CC BY, public domain). Download into `assets/found/`, record title, creator, licence and source URL in `design/credits.md`, and put a credit line in the footer.
   - **Use them large and with intent.** One archival photograph can be the hero; an enlarged engraving can become the page's motif; the real map can be the contact section.
   - **Honesty:** a found picture shows the world around the client. It is never presented as the client's own. A caption says what it is.
5. **Drawn in code from the subject**, for things no honest picture exists of (its objects, its tiles, its product's interface). Use one consistent flat graphic language in the palette's real colours, with `fill="currentColor"` or `var(--token)`.
6. **Type and colour alone**, when the concept is type-led. Say so in DESIGN.md. Never as the fallback for a photographable subject: use rung 2.

**The floor:** at least **4 real pictures** on a marketing page (photos, stock placeholders, archival images, footage, real UI crops), usually 6–12. Drawings don't count. Below that, `critique.md` caps Design at 6.5, unless the concept is deliberately type-led and DESIGN.md says so.

Treatment:
- Fixed aspect ratios from tokens. Same crop family, same grade.
- Square corners unless the grammar says otherwise (73% of studied sites).
- Nothing on top of a headline. A neutral scrim under text on a photo is the one gradient exception.
- No picture is better than a grey box, an icon or an abstract blob.
- Every `<img>`: `width` and `height` (or `aspect-ratio`), `alt`, `loading="lazy"` (hero: `fetchpriority="high"`), AVIF/WebP with `srcset`/`sizes`.
- Missing real assets: keep the slot and mark it `<!-- REPLACE: real roaster photo, 4:5 -->`. Every `REPLACE:` and every found picture goes in the report.

## 5. Icons

- Prefer no icons over decorative icons. Icons support labels; they don't replace them (except close, menu, arrow).
- One set, one stroke width, sized to the cap height of adjacent text.
- No icon-in-tinted-square stacks. No Unicode glyphs standing in for an icon system.

## 6. Details checklist (the ones models skip most)

- [ ] `::selection` themed from the palette
- [ ] `caret-color` and `accent-color` set on forms
- [ ] `:focus-visible` ring designed (2px, 2–3px offset, from the palette)
- [ ] Scrollbar themed subtly or left native (never hidden on scrollable content)
- [ ] `text-underline-offset: 0.2em` on links; `tabular-nums` on prices, times, tables
- [ ] `<meta name="theme-color">` per colour scheme
- [ ] Favicon (SVG + PNG) and an OG image in the site's own style
- [ ] Designed 404, empty, loading and error states
- [ ] Credits for every found picture in the footer and `design/credits.md`

*Imagery ladder and floor adapted from leonxlnx/taste-skill (MIT); craft-floor details from pbakaus/impeccable (Apache-2.0). See NOTICE.md.*
