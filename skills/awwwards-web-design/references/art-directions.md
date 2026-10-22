# Art-Direction Grammars

A grammar is a **way of composing**: structure, contrast, type class, motion character. It is not a look.

There are deliberately no hex values and no named fonts here. The previous version shipped fixed palettes and faces per archetype, and every coffee shop came out Fraunces + cream + terracotta. That is the third-wave tell (`tells.md` §3). Colours come from the subject (`creative-direction.md` §6). Faces come from the font procedure (`typography.md` §1) and the candidates `scripts/deal.mjs` deals.

Use **one** grammar per project. The idea sentence decides what the grammar shows. Each grammar lists its **rut**: the generated look it slides into when you stop deciding.

---

## structured: Structured Grid
- **Fits:** studios, architects, consultancies, publishers, institutions
- **Composition:** strong column structure carried by alignment and space, not by drawn lines. Large type set on shared edges (2–3 left edges per page). Asymmetric splits (5/7, 4/8).
- **Type class:** grotesk or neo-grotesk display + same family text; weight and size do the hierarchy
- **Colour strategy:** restrained or committed
- **Motion:** precise, short; line reveals; no bounce
- **Signature-moment family:** an index the visitor scans and filters; hover previews that follow the pointer
- **Rut:** hairline grids, crosshairs, mono labels, 01/02/03, broadsheet cosplay

## quiet-luxury: Quiet Luxury
- **Fits:** fashion, jewellery, hotels, skincare, weddings, premium property
- **Composition:** extreme space; one large image or one line of type per screen; tall crops
- **Type class:** a refined display (high-contrast serif *or* a fine grotesk) + quiet text face; small sizes are generous, not tracked caps
- **Colour strategy:** restrained, or drenched in one deep colour from the product
- **Motion:** slow (1.2–1.6s narrative), image scale 1.06→1, clip reveals; smooth scroll optional
- **Signature-moment family:** a picture that opens to the whole screen; a material seen up close
- **Needs:** real photography (or a credible plan for it)
- **Rut:** cream + italic serif + gold/terracotta; "premium = serif"

## raw: Raw / Brutalist
- **Fits:** streetwear, music, events, independent studios, developer tools with attitude
- **Composition:** blunt blocks, type bleeding off edges, raw tables, hard contrast
- **Type class:** condensed or grotesk display at extreme size + a plain text face
- **Colour strategy:** full palette (2–3 loud flats) or drenched
- **Motion:** instant or stepped; hover inversion; one fast marquee at most
- **Signature-moment family:** the page reacts to one action wholesale (invert, reorder, reveal the raw data)
- **Rut:** neobrutalism kit: hard 4px offset shadows, black borders on rounded cards, yellow + black

## kinetic: Kinetic Type
- **Fits:** campaigns, launches, festivals, creative agencies
- **Composition:** type is the image; words fill screens; minimal pictures
- **Type class:** variable display with a wide range (weight or width axis) + a neutral text face
- **Colour strategy:** committed or drenched, two colours only
- **Motion:** per-line or per-word reveals, variable axes reacting to scroll or pointer, one pinned sequence
- **Signature-moment family:** the headline rearranges into the information
- **Rut:** gradient text, glitch effects, the whole hero animating on load

## craft: Hand and Material
- **Fits:** food, bakeries, makers, agriculture, local products, workshops
- **Composition:** material close-ups, drawings made for this subject, collage of real things from its world
- **Type class:** a text-friendly display with character (slab, soft grotesk, or a serif with warmth) + a humanist or grotesk text face
- **Colour strategy:** full palette or committed, with hues **taken from the actual material**: the glaze, the flour sack print, the market stall paint
- **Motion:** soft ease-out, drawings that draw themselves, small rotations on entry
- **Signature-moment family:** a drawing or diagram of the real process that builds as you scroll
- **Rut:** cream + terracotta + sage + Fraunces + grain + hand-drawn squiggles

## precision: Precision Tech
- **Fits:** developer tools, AI, fintech, hardware, infrastructure
- **Composition:** real product UI as the hero, cropped and scaled like a photograph; data and numbers as visual elements
- **Type class:** neo-grotesk or geometric display + same text; mono **only** inside real code and data
- **Colour strategy:** restrained or committed. Light or dark from the use scene, not by default
- **Motion:** fast and sharp (0.3–0.5s, expo-out); the product UI behaves like a live demo
- **Signature-moment family:** the live thing *is* the product working: type a query, see the real result
- **Needs:** real product UI, or an honest HTML-built fragment of it
- **Rut:** near-black + neon green/violet + glow, fake grey-bar dashboards, scramble text everywhere

## cinematic: Cinematic
- **Fits:** film, travel, automotive, property, brands with strong footage
- **Composition:** full-bleed media, minimal overlay, scroll-driven scenes
- **Type class:** wide or condensed display + a quiet text face
- **Colour strategy:** sampled from the footage
- **Motion:** scroll-scrubbed sequences, pinning, scene transitions
- **Signature-moment family:** the scroll drives the footage
- **Needs:** high-quality real video or photo sequences. Without them, don't pick this
- **Rut:** stock drone footage, dark gradient overlays on everything

## ma: Negative Space (Ma)
- **Fits:** architecture, ceramics, tea, galleries, photographers, minimalist products
- **Composition:** small elements in large space, balanced asymmetry, one object per screen
- **Type class:** a delicate serif or a light grotesk; few sizes
- **Colour strategy:** restrained; one tiny accent from the subject
- **Motion:** very little and slow; fades
- **Signature-moment family:** one small element that travels with the narrative
- **Rut:** empty page with good manners: thin, grey, underbuilt (`critique.md` cap: fullness)

## playful: Playful Maximal
- **Fits:** youth products, snacks and drinks, consumer apps, education, creators
- **Composition:** stickers, cut-outs, rotated elements, collage, rounded shapes applied consistently
- **Type class:** soft or heavy display + a friendly sans text face
- **Colour strategy:** full palette (3 curated saturated colours) or drenched sections
- **Motion:** springs with small bounce (0.15–0.3), the only grammar allowed to bounce; draggable things
- **Signature-moment family:** the product or mascot you can drag and throw
- **Rut:** rainbow gradients, emoji, 3D blobs

## archive: Archive and Collage
- **Fits:** places with history, cultural institutions, heritage brands, neighbourhood businesses with no photos of their own
- **Composition:** real found pictures of the subject's world (old postcards of the street, maps, engravings, museum objects) used large, credited, mixed with clean modern type
- **Type class:** a contemporary grotesk or serif that contrasts with the archive material
- **Colour strategy:** committed or full palette, taken from the archive images
- **Motion:** pictures that open, slow drifts; captions that name what each picture is
- **Signature-moment family:** then and now: the old view of the street becomes today's shop
- **Needs:** licence-clear archive images (`visual-craft.md` §4)
- **Rut:** sepia filters on everything, fake vintage grain, "est. 19xx" badges

## poster: Poster Fields
- **Fits:** events, restaurants, campaigns, studios with a strong colour
- **Composition:** each section is one poster: a full field of colour, one big image or word, the information set boldly
- **Type class:** one family, two or three sizes far apart
- **Colour strategy:** drenched; sections change the whole field
- **Motion:** field-to-field colour transitions tied to sections; restrained elsewhere
- **Signature-moment family:** colour by chapter; the date or the dish fills the screen
- **Rut:** pastel blocks with rounded cards inside

## clear: Clear Single Accent
- **Fits:** any business whose character is still unclear; a safe exit when every other grammar fails the subject
- **Composition:** big type, generous space, one strong image per section
- **Type class:** one confident grotesk family
- **Colour strategy:** restrained, accent from the logo or the product
- **Motion:** line reveals, one accent event (the final action fills the screen)
- **Signature-moment family:** the accent appears at one dramatic point
- **Rut:** this *is* the safe default. Pick it only when you can say why the others fail this subject, and log that

---

## Quick filter

```
Have own or AI-generated photos/video?  quiet-luxury, cinematic, poster, archive
Strictly type-led / code-drawn?         structured, kinetic, craft (drawn), clear
Physical / local / food?                craft, archive, poster, playful
Software / product?                     precision, structured, kinetic
Creative / portfolio?                   structured, raw, kinetic, ma
Premium?                                quiet-luxury, ma, poster
```

Match the grammar directly to the chosen reference in `references/awwwards-references.md` §1.

## Existing brand

When the brand already fixes colour or type (`--keep palette,type`), the grammar only deals **composition**. Map the brand's values onto the roles. The brand wins every conflict (`brand-guardian.md` §2).
