# Curated Awwwards Reference Catalog & Technical Blueprints

This catalog replaces random dealing with **70/30 Reference Evolution Architecture**. The agent analyzes the subject, selects the **single best reference** from this approved catalog, and builds the site using the **70% Reference / 30% Subject Evolution Rule**:
- **70% Reference Foundation (Keep close to the reference):** Adopt the reference's spatial ambition, grid proportions, hero mechanism, scroll/motion choreography stack, and surface/lighting discipline so the visual caliber feels unmistakably close to the reference.
- **30% Creative Evolution (Develop & elevate from the subject):** Evolve the layout details, custom interactive instrument ("the live thing"), bespoke AI imagery, subject-derived OKLCH color nuance, and section transitions from the business's own inventory (`design/inventory.md`). **Never clone the reference 100% 1:1**, and never drift so far that it loses the reference's soul.

> [!IMPORTANT]
> **Strict Catalog Rule**: Any future addition to this reference list MUST strictly come from the official `https://www.awwwards.com/` catalog (`https://www.awwwards.com/sites/...`). Never add external URLs outside of the Awwwards catalog.

---

## 1. Quick Selector Matrix

| # | Reference Site | Archetype / Vibe | Grammar ID | Hero Composition | Best Fit For |
|---|---|---|---|---|---|
| 1 | [Emotion Agency](https://emotion-agency.com/) | Dark Brutalist Luxury | `cinematic` / `raw` | `type-over-image` + `mask-reveal` | Creative agencies, digital products, high-end studios |
| 2 | [LXL Creative](https://www.lxlcreative.co.uk/) | Bold Editorial Grid | `structured` | `giant-wordmark` + `index-hero` | Design consultancies, fashion, architectural practices |
| 3 | [Era Residence](https://www.era-residence.com/) | Quiet Luxury & Hospitality | `quiet-luxury` | `framed-picture` + `filmstrip` | Real estate, luxury resorts, boutique villas, fine dining |
| 4 | [Don't Board Me](https://dontboardme.com/) | Expressive & Playful Neo-Brutalist | `playful` | `collage` + `object-field` | Indie startups, creative services, pet/consumer brands, events |
| 5 | [Oryzo AI](https://oryzo.ai/) | High-Tech AI & Atmospheric Depth | `precision` | `product-ui` + `scene` | SaaS, AI platforms, fintech, modern developer tools |
| 6 | [Mont-Fort](https://mont-fort.com/) | Swiss Editorial & Heritage | `structured` / `ma` | `framed-picture` + `giant-wordmark` | Asset management, consulting, legal, prestige services |
| 7 | [Anime.js](https://animejs.com/) | Kinetic & Interactive Playground | `kinetic` / `precision` | `object-field` + `product-ui` | Dev tools, interactive libraries, documentation, tech products |
| 8 | [Onlines](https://onlines.com.ar/) | Fluid Dynamic Commerce | `poster` / `kinetic` | `filmstrip` + `color-field` | E-commerce, streetwear, modern retail, digital showcases |
| 9 | [Squared Media](https://www.squared-media.nl/) | Precision Digital Agency | `structured` / `cinematic` | `type-over-image` | Production houses, marketing agencies, B2B digital services |
| 10 | [Structure Engineering](https://structureengineering.com.au/) | Industrial Precision | `structured` / `precision` | `giant-wordmark` + `framed-picture` | Engineering, architecture, construction, industrial tech |
| 11 | [Ray Corral](https://raycorral.com/) | Immersive Visual Portfolio | `cinematic` / `ma` | `scene` + `filmstrip` | Artists, photographers, directors, personal brands |
| 12 | [Mejuma Tuscany](https://www.awwwards.com/sites/mejuma-tuscany) | Artisanal Organic & Earthy | `craft` / `quiet-luxury` | `type-over-image` + `inline-images` | Agriturismo, cafés, bakeries, wine/olive oil, artisanal goods |
| 13 | [Santioni Spirits](https://santionispirits.com/) | Cinematic Product Storytelling | `cinematic` / `quiet-luxury` | `object-field` + `mask-reveal` | Premium beverages, fragrance, roasteries, craft luxury goods |
| 14 | [Shopify Editions (Winter 2026)](https://www.shopify.com/editions/winter2026) | Modular High-Density Showcase | `precision` / `poster` | `index-hero` + `collage` | Feature releases, enterprise showcases, multi-product hubs |
| 15 | [Adobe x Bowie 75](https://adobexbowie75.com/) | Experimental & Kinetic Collage | `archive` / `kinetic` | `collage` + `mask-reveal` | Culture, music, interactive exhibitions, campaign microsites |

---

## 2. Structural & Motion Blueprints (Mandatory Implementation Spec)

A site that only copies colors and fonts while rendering static stacked HTML blocks **fails** the reference match. You must implement the selected reference's **Hero Mechanism**, **Section Rhythm**, **Motion & Scroll Stack**, and **Interactive Signature**.

### 1. Emotion Agency (`https://emotion-agency.com/`)
- **Hero Mechanism**: Full-viewport dark stage (`100svh`), massive bleeding grotesk/condensed display headline (`10–14vw`) intersecting an expanding `clip-path` media portal (`inset(18% 22% 18% 22%)` → `inset(0%)` on scroll).
- **Section Rhythm**: Hero stage → Asymmetric 5/7 manifesto with sticky label → Full-bleed interactive case index with cursor-following video/image preview (`gsap.quickTo`) → Horizontal pinned showcase track → Full-viewport takeover footer.
- **Motion Stack**: Lenis smooth scroll + GSAP ScrollTrigger scrub on hero portal + SplitText masked line reveals (`expo.out`, `0.9s`) + custom magnetic cursor on fine pointers.
- **Color & Surface**: Deep obsidian/charcoal (`L 0.14–0.17`), crisp bone ink (`L 0.94`), one electric/acid or stark monochrome accent (`≤ 8%` coverage), `0px` radius.

### 2. LXL Creative (`https://www.lxlcreative.co.uk/`)
- **Hero Mechanism**: Edge-to-edge `giant-wordmark` (`14–18vw`) anchored at top or bottom of the viewport, paired with an off-center high-fashion editorial crop (`framed-picture`, `55%` width) that overlaps the baseline of the display type.
- **Section Rhythm**: Giant wordmark hero → 12-column asymmetric split (cols 1–4 sticky thesis, cols 6–12 staggered tall imagery) → Interactive project index row (hover expands row height or reveals inline media) → Statement pull-quote field → Monumental footer.
- **Motion Stack**: Lenis + GSAP ScrollTrigger parallax between overlapping type and image layers + staggered clip-path image reveals (`inset(0 0 100% 0)` → `inset(0)`).
- **Color & Surface**: High-contrast editorial monochrome or warm stone (`L 0.96` ground, `L 0.15` ink) with one bold drenched section transition.

### 3. Era Residence (`https://www.era-residence.com/`)
- **Hero Mechanism**: Architectural `framed-picture` or `mask-reveal` (`65–75%` viewport coverage) with delicate, high-contrast display type (`8–11vw`) crossing the image frame edge, and an integrated architectural booking/availability bar anchored cleanly along the bottom edge (never a card beside the headline).
- **Section Rhythm**: Architectural aperture hero → Calm asymmetric story split with macro material close-up → Pinned horizontal `filmstrip` of suites/spaces with live spec switching → Interactive floorplan / acoustic / light explorer (the live thing) → Full-screen sanctuary reservation takeover.
- **Motion Stack**: Slow, unhurried narrative pacing (`1.2–1.6s`, `--ease-out-expo`), image scale `1.12 → 1.0` inside overflow frames on scroll, horizontal scroll-snap or GSAP pinned gallery on desktop.
- **Color & Surface**: Derived from physical building materials (limestone, basalt, weathered timber, deep foliage). Tone-step surface separation, zero box-shadows, `0px` radius.

### 4. Don't Board Me (`https://dontboardme.com/`)
- **Hero Mechanism**: Drenched `color-field` or layered `collage` with oversized expressive typography (`10–13vw`), cut-out subject imagery overlapping the headline letters, and tactile pressable controls.
- **Section Rhythm**: Expressive collage hero → Interactive calculator/configurator ("live thing" front and center in section 2) → Asymmetric comparison table (us vs. the boring alternative) → Draggable/throwable sticker or card proof deck → Full-bleed color-change CTA footer.
- **Motion Stack**: Spring physics (`bounce: 0.15–0.25`) on interactive cards/stickers, rotation nudges on scroll, instant tactile button depression (`scale(0.96)`).
- **Color & Surface**: `Drenched` or `Full palette` (3–4 curated saturated hues from the subject), bold borders or sharp tone steps, pill (`999px`) or crisp custom radii.

### 5. Oryzo AI (`https://oryzo.ai/`)
- **Hero Mechanism**: Atmospheric dark or high-craft technical canvas (`product-ui` / `scene`) where a real, interactive HTML/Canvas product interface crop bleeds off the viewport edge at photographic scale, paired with razor-sharp neo-grotesk display type.
- **Section Rhythm**: Live interface hero → Interactive live-query / state-machine sandbox (visitor manipulates inputs and sees real computed output) → Uneven architectural bento (1 dominant 8-col cell + 4-col stack, never 3 equal cards) → Live telemetry / benchmark table (`tabular-nums`) → Terminal-clean conversion close.
- **Motion Stack**: Fast, surgical transitions (`200–350ms`, `--ease-out`), interactive canvas/SVG data flow driven by scroll or pointer, zero decorative bounce.
- **Color & Surface**: Precision OKLCH dark (`L 0.15–0.19`) or lab-white (`L 0.97`) with tinted technical surfaces and one high-chroma signal accent used strictly on active states and data highlights.

### 6. Mont-Fort (`https://mont-fort.com/`)
- **Hero Mechanism**: Swiss precision `framed-picture` + `giant-wordmark`: strict 12-column mathematical alignment, monumental serif/grotesk headline (`8–10vw`) locked to column 1, paired with a calm architectural or alpine/subject photograph anchored in columns 6–12.
- **Section Rhythm**: Swiss grid hero → Key figures / live interactive ledger or portfolio allocation tool (`tabular-nums`) → Sticky left-rail thesis with scrolling evidence chapters → Structured specification matrix → Understated institutional footer.
- **Motion Stack**: Restrained, dignified line reveals (`700ms`, `expo.out`), subtle parallax on imagery, crisp `150ms` link underlines.
- **Color & Surface**: `Restrained` palette (cool mineral off-white or deep slate ground, full-contrast ink, single heritage accent `≤ 5%`).

### 7. Anime.js (`https://animejs.com/`)
- **Hero Mechanism**: Live reactive `object-field` / `product-ui` canvas where geometric ticks, timeline tracks, or subject parameters respond in real time to pointer coordinates or scrub controls right on the first screen.
- **Section Rhythm**: Interactive kinetic hero → Live parameter playground (sliders/toggles mutating live DOM/SVG targets) → Staggered choreography breakdown (side-by-side code/spec and live visual result) → High-density specification index → Kinetic footer.
- **Motion Stack**: Choreographed timelines, staggered grid/tick animations, scrubbable progress bars, `requestAnimationFrame` / GSAP ticker synchronization.
- **Color & Surface**: Deep technical charcoal ground with coded color roles (3–4 high-legibility signal hues) for parameters and states.

### 8. Onlines (`https://onlines.com.ar/`)
- **Hero Mechanism**: Kinetic `filmstrip` + `color-field`: oversized display type (`11–15vw`) crossing a horizontal strip of tall editorial product crops (`4:5`) that shift on scroll or drag.
- **Section Rhythm**: Kinetic filmstrip hero → Live filterable/interactive catalog lookbook (instant state swap + image preview) → Full-bleed editorial campaign spread → Marquee of real inventory/drop data → Drenched color-takeover checkout/action footer.
- **Motion Stack**: Lenis + scroll-velocity skew/shift on filmstrips + cursor-following quick-view badge + fast `200ms` filter transitions.
- **Color & Surface**: `Committed` or `Drenched` bold fields, stark contrast ink, zero soft card shadows.

### 9. Squared Media (`https://www.squared-media.nl/`)
- **Hero Mechanism**: High-contrast `type-over-image` / video stage with bold grotesk typography anchored to shared vertical grid rails and an interactive reel/showcase trigger integrated into the composition.
- **Section Rhythm**: Full-bleed stage hero → Asymmetric split value argument with real metrics → Interactive service/case matrix with hover image reveals → Process timeline driven by scroll progress → Bold agency conversion footer.
- **Motion Stack**: Clip-path wipes on media, SplitText line-by-line entrances, magnetic primary CTA, smooth scroll-linked progress indicator.
- **Color & Surface**: Stark contrast (deep ink vs crisp light ground, Alternating dark/light chapters), punchy single accent on CTAs.

### 10. Structure Engineering (`https://structureengineering.com.au/`)
- **Hero Mechanism**: Industrial `giant-wordmark` + `framed-picture`: structural span typography (`9–13vw`) with exposed architectural alignment (2–3 strict vertical x-axes) and dramatic structural photography.
- **Section Rhythm**: Structural span hero → Interactive load / span / specification calculator or project filter (the live thing) → Sticky-title project dossier (large photography + tabular engineering specs) → Capability index table → Monumental blueprint footer.
- **Motion Stack**: Linear/expo structural reveals, SVG diagram line-drawing on scroll (`strokeDashoffset` scrubbed), crisp `150ms` tabular state switches.
- **Color & Surface**: Raw steel/concrete neutrals (`Restrained` or `Committed`) + one high-visibility industrial safety/signal accent (`≤ 10%`), `0px` radius.

### 11. Ray Corral (`https://raycorral.com/`)
- **Hero Mechanism**: Visceral `scene` / `filmstrip` where imagery occupies `70%+` of the viewport and minimal, razor-sharp typography sits anchored in the corners like a camera viewfinder or gallery plate.
- **Section Rhythm**: Full-bleed visual scene hero → Pinned horizontal sequence or asymmetrical staggered gallery (1 huge image + 2 tight detail crops) → Interactive work index (pointer-following floating preview) → Sparse biography/manifesto statement → Full-screen contact close.
- **Motion Stack**: Lenis + GSAP ScrollTrigger scrub, smooth image scale (`1.15 → 1.0`), crossfade/clip transitions between works.
- **Color & Surface**: Gallery-dark or archival-paper ground sampled from the photography's dominant shadow/highlight tone.

### 12. Mejuma Tuscany (`https://www.awwwards.com/sites/mejuma-tuscany`)
- **Hero Mechanism**: Warm editorial `type-over-image` + `inline-images`: tactile macro photography of the place/harvest/craft filling the fold, with expressive display typography that interleaves small detail crops inside the text lines.
- **Section Rhythm**: Sensory full-bleed hero → Live harvest / batch / daily menu / tasting notes interactive board (the live thing) → Asymmetric story sequence (origin → process → table) with overlapping photography → Full menu/product table with real prices → Warm invitation footer with map & hours.
- **Motion Stack**: Gentle organic ease-out (`--ease-out-expo`, `1.1–1.4s`), inline image expansion on scroll/hover, subtle parallax drift between foreground and background photos.
- **Color & Surface**: Hues sampled directly from the subject's terroir (olive leaf, volcanic soil, unbleached linen, espresso roast—never generic AI `#F4F1EA` + terracotta unless justified by subject material).

### 13. Santioni Spirits (`https://santionispirits.com/`)
- **Hero Mechanism**: Chiaroscuro `object-field` + `mask-reveal`: the hero product/vessel/artifact lit dramatically at `60%+` viewport height over a dark or drenched field, with display typography wrapping behind and in front of the object (layered z-index depth).
- **Section Rhythm**: Layered object-depth hero → Scroll-driven tasting / anatomy / process breakdown (pinned object or sequence with callouts appearing per scroll step) → Interactive batch / cocktail / pairing selector (the live thing) → Provenance & craft gallery → Dramatic bottle/product takeover footer.
- **Motion Stack**: ScrollTrigger pinned anatomy sequence, multi-layer parallax (background type → mid object → foreground detail), slow `1.4s` clip reveals.
- **Color & Surface**: Deep chiaroscuro ground (mahogany, obsidian, midnight, or deep botanical green) + metallic/amber/botanical accent sampled from the product.

### 14. Shopify Editions (`https://www.shopify.com/editions/winter2026`)
- **Hero Mechanism**: High-density modular `index-hero` + `collage`: bold editorial masthead with an interactive chapter/feature switcher that dynamically reorganizes or jumps the viewport across a rich multi-module showcase.
- **Section Rhythm**: Interactive masthead + chapter index → Sticky chapter rail with asymmetric feature showcase cards (live interactive demos inside key cells) → Full-width visual interlude → Searchable/filterable specification matrix → High-impact launch CTA.
- **Motion Stack**: Snappy layout transitions (`250ms --ease-in-out`), scroll-spy active chapter indicator, interactive micro-demos inside feature stages.
- **Color & Surface**: `Full palette` or chapter-by-chapter `Drenched` color events (each major section shifts surface tone cleanly).

### 15. Adobe x Bowie 75 (`https://adobexbowie75.com/`)
- **Hero Mechanism**: Multi-layered `collage` + `mask-reveal`: overlapping archival/generated media plates at different z-depths, display typography slicing through the collage, and an interactive layer/sound/artifact toggle.
- **Section Rhythm**: Layered collage hero → Interactive artifact/timeline explorer (visitor scrubs eras or toggles layers) → Pinned horizontal exhibition wall → Drenched statement quote screen → Archival credits & takeover close.
- **Motion Stack**: Multi-speed parallax planes on scroll and pointer move, clip-path polygon masks, bold chromatic field shifts.
- **Color & Surface**: High-saturation `Drenched` or `Full palette` chromatic contrasts with sharp `0px` editorial framing.

---

## 3. Mandatory 70/30 Execution Checklist for Phase 2 & Phase 5–6

When you pick a reference from this catalog, apply the **70% Reference / 30% Evolution** rule:

1. **Record the 70/30 Split in `design/DESIGN.md` §0**:
   - **70% Reference Foundation**: Name the Reference Site, Hero Composition ID, Section Rhythm, and Motion Stack inherited from the blueprint above.
   - **30% Subject Evolution**: State explicitly what is evolved and expanded for this subject (the bespoke interactive "live thing", custom motif/artifact from `inventory.md`, unique color/material adaptation, and expanded section mechanics) so it is neither a 100% clone nor a generic departure.
2. **AI Visual Assets (`image-generator`)**: Generate **6–8 bespoke visual assets** matching the reference's lighting discipline and focal length, but depicting this subject's authentic materials, environment, and artifacts. Save to `assets/`. Never scrape stock photos.
3. **Layered Depth in the Hero**: Type and image must physically interact (overlap via z-index, clip-path mask, inline interleave, or edge-crossing) following the 70% reference structure, while introducing a 30% evolved signature twist tied to the subject's idea.
4. **No Boring HTML Widgets Below the Fold**: Never drop plain default `<details>` accordions, unstyled `<input type="range">` sliders, or generic 2-column form cards into the page. Every interactive section must feel like a natural evolution of the reference's stagecraft.
5. **Real Choreography Engine**: Include **Lenis + GSAP + ScrollTrigger** (with `prefers-reduced-motion` and no-JS `.js` class safety) to execute the reference's scroll-driven reveals, parallax planes, or pinned sequences.
