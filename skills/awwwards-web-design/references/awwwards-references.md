# Curated Awwwards Reference Catalog & Exact Design Systems

This catalog replaces random dealing with **70/30 Reference Design-System Replication**. The agent analyzes the subject, selects the **single best reference** from this approved catalog (`referenceId` locked in `design/brand.json`), and builds the site using the **70% Reference Design System / 30% Subject Evolution Rule**:
- **70% Reference Design System (Exact Structural & Token Replication):** Replicate the reference's **exact viewport HUD chrome**, **chapter-by-chapter color-field transitions** (`Drenched` / multi-surface shifts, never one flat monotonous dark page), **3-tier typography architecture** (Display + Script/Accent + Body), **spatial scale (`10–13vw` headlines, `0.88` line-height)**, and **GSAP/Lenis scroll choreography**.
- **30% Subject Evolution (Adapted Content, Palette Hue Shift, & Live Thing):** Adapt the content, bespoke interactive instrument ("the live thing"), and AI-generated photography (`image-generator`) to the business's own inventory (`design/inventory.md`). **Never invent a generic dark/gold SaaS or dark-mode box layout when the reference uses multi-chapter color fields, daylight sky photography, or editorial typography.**

> [!IMPORTANT]
> **Strict Catalog & Machine-Gate Rule**:
> 1. Any future addition to this reference list MUST strictly come from the official `https://www.awwwards.com/` catalog (`https://www.awwwards.com/sites/...`).
> 2. Set `"referenceId"` in `design/brand.json` (e.g. `"referenceId": "era-residence"`). `inspect.sh` and `brand-check.mjs` mechanically verify that your rendered DOM and CSS tokens match the chosen reference's design system!

---

## 1. Quick Selector Matrix

| `referenceId` | Reference Site | Live Surface & Color System | 3-Tier Typography System | Viewport HUD & Hero Architecture | Best Fit For |
|---|---|---|---|---|---|
| `emotion-agency` | [Emotion Agency](https://emotion-agency.com/) | Soft Lavender (`#F5EFFF`) ↔ Deep Plum (`#2A1647`) ↔ Obsidian (`#0E0A14`) | Condensed Serif (`96–160px`, `lh 0.80`) + Grotesk (`PP Neue Montreal`) + Mono (`IBM Plex Mono`) | Corner HUD nav + Expanding `clip-path` portal intersecting giant serif | Creative agencies, digital products, studios |
| `lxl-creative` | [LXL Creative](https://www.lxlcreative.co.uk/) | Espresso Ground (`#27201D`) ↔ Warm Cream Ink (`#FCF2BD`) ↔ Flame Orange (`#FF5121`) / Cobalt (`#055DFF`) | Ultra-Wide Display (`Owners Wide` / `Syne` / `Unbounded`) + Script Accent (`Scribo`) + Geometric (`Manrope`) | Edge-to-edge giant wordmark (`14–18vw`) + overlapping asymmetric editorial crop | Design consultancies, fashion, architecture |
| `era-residence` | [Era Residence](https://www.era-residence.com/) | **4-Chapter Color Shift**: Alabaster (`#F3F3EC`) ↔ Powder Sky (`#B5CEDB`) ↔ Velvet Plum (`#340C24`) · Ink Deep Navy (`#17233B`) | **Ultra-Condensed Didone** (`11–12vw`, `lh 0.88`) + **Calligraphic Script** (`6–7.5vw` overlapping) + **Extended Sans** (`13px`) | **4-Corner Fixed HUD** (rotating seal TL, stacked underline CTA TR, scroll counter `00–100` L) + Full-bleed daylight sky hero + Day/Night toggle | Real estate, luxury resorts, boutique villas, hospitality, fine dining |
| `dontboardme` | [Don't Board Me](https://dontboardme.com/) | Drenched Color-Field Chapters (Warm Butter ↔ Cobalt ↔ Coral ↔ Cream) + Crisp Ink | Oversized Expressive Display (`10–13vw`) + Script/Handwritten callouts + Clean Sans | Layered collage hero + tactile pressable sticker/card physics | Indie startups, consumer brands, pet/lifestyle, events |
| `oryzo` | [Oryzo AI](https://oryzo.ai/) | Deep Espresso-Obsidian (`#100904`) ↔ Warm Parchment Ink (`#FFEDD7`) + Amber Signal | Variable Grotesk Display (`Halyard` / `Hanken Grotesk` / `Sora`) + Technical Mono | Atmospheric canvas stage + live interactive product/query sandbox | SaaS, AI platforms, fintech, developer tools |
| `mont-fort` | [Mont-Fort](https://mont-fort.com/) | Alpine White (`#FFFFFF`) ↔ Glacier Blue (`#2D628C`) ↔ Mist (`#81A0BB`) ↔ Deep Slate | Wide Geometric Uppercase (`Century Gothic` / `Josefin Sans`, tracked `+0.04em`) + Clean Sans | Swiss 12-col mathematical frame + full-bleed alpine/architectural photography | Asset management, consulting, legal, prestige B2B |
| `animejs` | [Anime.js](https://animejs.com/) | Technical Charcoal (`#1F1E1E`) ↔ Raised Slate (`#252423`) + Signal Red (`#FF4B4B`) & Coded Hues | Condensed Industrial (`DIN` / `Barlow Condensed`) + Technical Mono | Live reactive timeline/tick matrix responding to pointer/scroll on screen 1 | Dev tools, interactive libraries, technical products |
| `onlines` | [Onlines](https://onlines.com.ar/) | Stark Gallery White (`#FFFFFF`) ↔ Warm Snow (`#FCF9F9`) ↔ Carbon Ink (`#1D1D1F`) | Tight Neo-Grotesk (`96–140px`, `ls -0.02em`) + Tabular Mono specs | Kinetic horizontal `filmstrip` hero + live filterable lookbook | E-commerce, streetwear, modern retail, catalogs |
| `squared-media` | [Squared Media](https://www.squared-media.nl/) | Pitch Carbon (`#0C0C0B`) ↔ Sage Stone (`#B8C0A5` / `#DBE0CD`) ↔ Signal Orange (`#FF4500`) | Geometric Sans (`Figtree`) + Technical Display (`Space Grotesk`) + Mono | High-contrast chapter shifts + clip-path video/image wipes + hover index | Production houses, marketing agencies, B2B digital |
| `structure-eng` | [Structure Engineering](https://structureengineering.com.au/) | Architectural Concrete (`#F5F5F5`) ↔ Stark Black (`#000000`) ↔ Brass Olive (`#B9B36D`) | Neo-Grotesk Display (`82–130px`, `lh 1.0`) + Technical Mono (`PP Fraktion Mono`) | Exposed structural grid rails + SVG line-drawing diagrams on scroll | Engineering, architecture, construction, industrial |
| `ray-corral` | [Ray Corral](https://raycorral.com/) | Archival Warm Paper (`#F8F7F2`) ↔ Gallery Charcoal (`#333333` / `#0C0C0C`) | Stark Neo-Grotesk (`98–140px`, `lh 1.0`) + Signature Script (`Bacalisties`) | Camera viewfinder corner HUD + `70%+` viewport visual scenes + horizontal sequence | Artists, photographers, directors, portfolios |
| `mejuma-tuscany` | [Mejuma Tuscany](https://www.awwwards.com/sites/mejuma-tuscany) | Sun-Baked Linen (`#F4EFE6`) ↔ Olive Grove (`#2C3527`) ↔ Terracotta Earth (`#9E472A`) | High-Contrast Editorial Serif + Inline photography inside headline lines + Humanist Sans | Sensory macro photography hero + inline-images typography + harvest/menu board | Agriturismo, cafés, bakeries, wine/olive oil, F&B |
| `santioni` | [Santioni Spirits](https://santionispirits.com/) | Chiaroscuro Obsidian (`#121212`) ↔ Deep Amber / Mahogany (`#2A140D`) + Crisp White (`#FFFFFF`) | Bespoke Display Serif (`Charles Rosie` / `Bodoni Moda`) + Classic Serif | Layered z-index depth (giant type behind + in front of lit hero subject) | Spirits, fragrance, roasteries, luxury goods |
| `shopify-editions` | [Shopify Editions](https://www.shopify.com/editions/winter2026) | Multi-Chapter Color Events: Pitch Black (`#000000`) ↔ Warm Ivory (`#F7F7EE`) ↔ Forest Olive (`#292919`) | Editorial Serif (`HW Cigars` / `Instrument Serif`) + Neo-Grotesk (`Neue Montreal`) | Modular chapter switcher + sticky rail with live interactive micro-demos | Feature releases, multi-product hubs, enterprise |
| `adobe-bowie` | [Adobe x Bowie 75](https://adobexbowie75.com/) | Drenched Chromatic Chapters (Electric Cobalt ↔ Crimson ↔ Acid Yellow ↔ Archive Black) | Expressive Cut-Up Display + Archival Sans | Multi-plane parallax collage + polygon clip-path masks + interactive layer toggle | Culture, music, exhibitions, campaign microsites |

---

## 2. Deep Design-System Specifications (Mandatory 70% Foundation)

> [!CAUTION]
> **Why AI builds fail to look like the reference**: AI models read "luxury residence" and invent a generic dark-grey `#141414` + gold `#D4AF37` page with a top navbar, 4-column card grids, and small headings. That is **0% like Era Residence**. When a reference is chosen, you MUST copy its **exact structural and visual DNA** below:

### Reference 3 Deep Spec: `era-residence` (`https://www.era-residence.com/`)
Built by *The First The Last®* (Awwwards SOTD & Developer Award). Every hospitality, villa, resort, or real-estate build using `era-residence` MUST replicate these **7 exact design-system pillars**:

1. **Multi-Chapter Surface Color System (NEVER a monotonous dark/gold page!)**:
   - Era Residence shifts the **entire viewport background (`100vw`)** across 3 distinct architectural color chapters, with **Deep Navy Ink (`#17233B`)** on light/sky chapters and **Warm Alabaster (`#F3F3EC`)** on plum chapters:
   ```css
   :root {
     /* Exact Era Residence Color System (adaptable 30% hue shift only if subject demands, keeping exact L/C contrast) */
     --bg-alabaster:  oklch(0.96 0.008 95);   /* #F3F3EC Warm Mediterranean Limestone */
     --bg-powder-sky: oklch(0.83 0.038 230);  /* #B5CEDB Coastal Sky Chapter */
     --bg-velvet-plum:oklch(0.20 0.065 345);  /* #340C24 Deep Evening Plum Chapter */
     --accent-bloom:  oklch(0.84 0.085 350);  /* #F8BBCB Bougainvillea Bloom Accent */
     --ink-navy:      oklch(0.25 0.045 255);  /* #17233B Primary Editorial Ink */
     --ink-light:     oklch(0.96 0.008 95);   /* #F3F3EC Ink on Plum / Hero Sky */
     --line-navy:     oklch(0.25 0.045 255 / 0.14);
     --line-light:    oklch(0.96 0.008 95 / 0.18);
   }
   ```
   - **Mandatory Rule**: At least **3 distinct full-bleed background chapters** (`theme-plum`, `theme-sky`, `theme-alabaster`) must appear as you scroll down the page. `inspect.sh` will **FAIL** (`FAIL [flat-surface-monotony]`) if every section shares the same dark or light background!

2. **3-Tier Typography System (Ultra-Condensed Didone + Overlapping Script + Extended Micro-Sans)**:
   - **Display (`--font-display`)**: Ultra-condensed high-contrast Didone serif (`Six Caps`, `Bodoni Moda` condensed, `Prata`, or `Cormorant Upright`), set **ALL-CAPS**, `font-size: clamp(4.5rem, 11.5vw, 11.5rem)` (`172px–192px` at `1440px`), `line-height: 0.88`, `letter-spacing: -0.024em`.
   - **Script Accent (`--font-script`)**: Calligraphic script (`Pinyon Script`, `Monsieur La Doulaise`, `Alex Brush`, or `Cormorant Garamond` italic swash), `font-size: clamp(3rem, 7vw, 7.25rem)` (`108px` at `1440px`), `line-height: 1.0`, physically **overlapping** the bottom of the uppercase Display headline (`margin-top: -0.32em`) and tilted slightly (`transform: rotate(-4deg)`).
   - **Body / UI (`--font-text`)**: Crisp geometric sans (`Plus Jakarta Sans` / `Public Sans` / `Syne`), compact editorial scale (`13px–15px` for architectural specs, `16px` for narrative), plus wide-tracked micro-captions (`letter-spacing: 0.28em` ONLY on single architectural coordinate/horizon lines, never as eyebrows above every `h2`).

3. **Fixed 4-Corner Architectural Viewport HUD (No Top Navbar Bar!)**:
   - Era Residence has **NO traditional horizontal header bar** (`Home | About | Rooms | Contact`). Instead, it uses a fixed `pointer-events: none` 4-corner architectural HUD (`padding: 32px 48px`):
     - **Top-Left**: Circular rotating architectural seal (`SVG` text-on-path spinning slowly around a central botanical/geometric emblem, `76×76px`).
     - **Top-Right**: Stacked right-aligned typographic CTA (`SELECT A PAVILION` / `RESERVE SANCTUARY` in condensed display caps `28px` with `1px` underline, followed below by `BOOK A CALL` and `CONTACT` in `11px` caps).
     - **Left Rail (Vertical Center-to-Bottom)**: Live vertical progress hairline + numeric scroll percentage (`00` → `100` updated on scroll) + vertical rotated `SCROLL ↓` indicator at bottom-left.
     - **Bottom-Center of Hero**: Circular outline magnetic button (`140×140px`, `border-radius: 50%`, `1px solid rgba(255,255,255,0.35)`) reading `EXPLORE PAVILIONS`.

4. **Hero Stage + Interactive `BY DAY — BY NIGHT` Atmosphere Switcher**:
   - The hero is a **full-bleed `100vw × 100svh` architectural scene** (in Day mode: brilliant azure coastal/tropical sky in the upper 55%, sunlit limestone/stone architecture and turquoise water pool in the lower 45%, with lush bougainvillea/palm foliage framing the edges).
   - Centered in the sky is the monumental 2-line condensed serif title (`ERA / RESIDENCE` or `KALA / RESIDENCE`) overlapped by the calligraphic script location (`Estepona` or `Canggu Bali`).
   - Directly below the script sits the horizontal Horizon Split:
     `A PLACE` &nbsp;&nbsp;&nbsp; **[ `BY DAY` ─── `BY NIGHT` ]** &nbsp;&nbsp;&nbsp; `TO RETURN TO`
   - Clicking `BY DAY` / `BY NIGHT` smoothly crossfades the hero architectural photography and page lighting theme between sunlit daytime and warm architectural dusk/night!
   - On the architecture below, 2–3 subtle circular pulsing architectural hotspot rings (`36×36px`) reveal material/room callouts on hover.

5. **Section-by-Section Compositional Choreography (No Stacked Card Grids!)**:
   - **Chapter 1 (Hero Stage, `100svh` → Pinned Pull-Back)**: Full-bleed sky & architecture with 3-tier center title, `BY DAY / BY NIGHT` switcher, and hotspot rings.
   - **Chapter 2 (`theme-sky` Powder Sky `#B5CEDB`)**: Centered compact editorial thesis at the top of the sky field, with a cutout/masked architectural facade rising from the bottom-left and palm foliage on the right, followed by a monumental `11vw` condensed display statement (`BUILT TO STAY`).
   - **Chapter 3 (`theme-alabaster` Warm Alabaster `#F3F3EC`)**: Centered 3-line Display + Script statement (`THE SANCTUARY YOU WANTED` / *yours* / `THIS SEASON`) with an **organic hand-drawn SVG coastal/topographic route line** across the bottom showing real travel distances (`NGURAH RAI 35 MIN` — `SEMINYAK 15 MIN` — `BATU BOLONG 4 MIN` — `TANAH LOT 20 MIN`).
   - **Chapter 4 (`theme-alabaster` → `theme-plum` Asymmetric Split Collage)**: Left column holds a deep Velvet Plum (`#340C24`) vertical block with an inset portrait courtyard photo and overflowing botanical foliage; right column holds a cropped terrace photo at top, a `56px` condensed serif statement (`EVERY DETAIL WAS SELECTED TO CREATE...`), a compact specification paragraph, and a large `160×160px` circular outline button (`VIEW AVAILABLE PAVILIONS`).
   - **Chapter 5 (Interactive Residence / Suite Selector & Floorplan Explorer — "The Live Thing")**: Interactive architectural unit ledger where clicking/hovering each residence updates the live architectural floorplan SVG, m² breakdown, acoustic/thermal metrics, and nightly/ownership rate.
   - **Chapter 6 (`theme-plum` Velvet Plum `#340C24` Monumental Closing Takeover)**: Top inset lifestyle crop, central botanical emblem, **monumental `10vw` condensed serif contact number / direct concierge line (`+62 (811) 3890-2400`)** with subtle 3D perspective/wave stagger on the digits, address below, and minimal bottom corners.

---

## 3. Photography & Color Curation Rules (Mandatory for `image-generator`)

Why did `design-test-2`'s previous images and colors feel like AI slop? Because every image was dark, murky, and low-contrast, sitting on a dark-grey background. Follow these rules on every project:

1. **Bright, High-Dynamic-Range Daylight & Golden-Hour Architectural Photography**:
   - Unless the reference is strictly obsidian noir (`santioni`, `oryzo`), **at least 60% of generated images MUST be shot in crisp natural daylight** with a clear sky or bright architectural surfaces so the page breathes like a real editorial shoot.
   - For `era-residence`, `mont-fort`, `mejuma-tuscany`, `ray-corral`, and `onlines`:
     - **Hero Day Image Prompt**: *"Architectural photography of [subject], shot on Hasselblad H6D 24mm tilt-shift lens, brilliant clear azure blue sky occupying the upper half of the frame, sunlit pale limestone and volcanic stone cantilevered pavilions below, crystal turquoise reflection pool in foreground, vibrant magenta bougainvillea and tropical palms framing the right edge, crisp Mediterranean/tropical sunlight, Architectural Digest editorial grade, zero text."*
     - **Hero Night Image Prompt** (for the Day/Night toggle): *"Same architectural angle at blue-hour twilight, deep indigo-plum sky, warm 2700K concealed architectural cove lighting glowing inside the stone pavilions and reflecting on the mirror-still pool."*
     - **Botanical / Material Cutout & Collage Prompts**: Crisp sunlit close-ups of textured stone, water courtyards, and vibrant botanical accents (bougainvillea, frangipani, olive branches) with high micro-contrast.
2. **Ban the Murky Dark-Grey + Yellow-Gold AI Slop Palette**:
   - Never default to `oklch(0.15 ...)` charcoal + `oklch(0.78 ...)` yellow-brass across the whole page.
   - Use **Multi-Chapter Color Fields**: pair a crisp light editorial ground (`#F3F3EC` Alabaster) with a cool atmospheric chapter (`#B5CEDB` Powder Sky) and a deep jewel-toned chapter (`#340C24` Velvet Plum, `#17233B` Deep Navy, or `#1E2D24` Deep Cypress).

---

## 4. Mandatory 70/30 Execution Checklist for Phase 2, 3, 5, 6

1. **Lock `"referenceId"` in `design/brand.json`**:
   - Example: `"referenceId": "era-residence"`.
   - `inspect.sh` reads `referenceId` and enforces reference-specific structural gates (e.g., multi-chapter background shifts, 3-tier font pairing, 4-corner HUD, `≥ 9vw` display scale).
2. **Replicate the Reference's Exact CSS Token Architecture in `css/tokens.css`**:
   - Define the reference's multi-chapter surface tokens (`--bg-chapter-1`, `--bg-chapter-2`, `--bg-chapter-3`), 3-tier font tokens (`--font-display`, `--font-script`, `--font-text`), and monumental display scale (`--fs-display: clamp(4.5rem, 11.5vw, 11.5rem)`).
3. **Generate Cohesive Daylight + Twilight Visual Assets (`image-generator`)**:
   - Generate 6–8 high-craft images matching the reference's exact sky/subject ratio and daylight color temperature.
4. **Build the Reference's Exact Section Choreography**:
   - Never substitute a reference's bespoke sections (like Era's SVG coastal distance map, 4-corner HUD, Day/Night toggle, or plum/alabaster split collage) with generic 3-column cards or 2-column form boxes.
