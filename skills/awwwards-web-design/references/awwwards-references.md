# Curated Awwwards Reference Catalog & Exact Design Systems (All 15 Archetypes)

This catalog replaces random dealing with **70/30 Reference Design-System Replication** across **all 15 approved Awwwards reference sites**. The agent analyzes the subject, selects the **single best reference** from the 15 sites below (`referenceId` locked in `design/brand.json`), and builds the site using the **70% Reference Design System / 30% Subject Evolution Rule**:
- **70% Reference Design System (Exact Structural & Token Replication):** Replicate the chosen reference's **exact surface/chapter color architecture**, **typography hierarchy & scale**, **viewport HUD / navigation chrome**, **hero stagecraft**, and **GSAP/Lenis scroll choreography**.
- **30% Subject Evolution (Adapted Content, Palette Hue Shift, & Live Thing):** Evolve the layout details, bespoke interactive instrument ("the live thing"), and AI-generated photography (`image-generator`) from the business's own inventory (`design/inventory.md`). **Never clone 100% 1:1, and never collapse into generic dark/gold SaaS or bordered card-grid slop.**

> [!IMPORTANT]
> **Strict Catalog & Machine-Gate Rule**:
> 1. Any future addition to this reference list MUST strictly come from the official `https://www.awwwards.com/` catalog (`https://www.awwwards.com/sites/...`).
> 2. Set `"referenceId"` in `design/brand.json` to the chosen ID from the table below (e.g. `"emotion-agency"`, `"lxl-creative"`, `"era-residence"`, `"oryzo"`, etc.). `inspect.sh` and `brand-check.mjs` mechanically verify that your rendered DOM and CSS tokens match that specific reference's design system!

---

## 1. Quick Selector Matrix (15 Awwwards Reference Systems)

| # | `referenceId` | Reference Site | Live Surface & Color System | Typography System | Viewport Chrome, Hero & Motion Engine | Best Fit For |
|---|---|---|---|---|---|---|
| 1 | `emotion-agency` | [Emotion Agency](https://emotion-agency.com/) | Soft Lavender (`#F5EFFF`) ↔ Deep Plum (`#2A1647`) ↔ Obsidian (`#0E0A14`) | High-Contrast Editorial Serif (`96–160px`, `lh 0.80`) + Grotesk (`Neue Montreal`) + Mono (`IBM Plex Mono`) | Corner HUD + Expanding `clip-path` portal + **GSAP ScrollTrigger + Three.js WebGL shader plane** | Creative agencies, digital studios, design/tech consultancies |
| 2 | `lxl-creative` | [LXL Creative](https://www.lxlcreative.co.uk/) | Espresso Ground (`#27201D`) ↔ Warm Cream (`#FCF2BD`) ↔ Flame Orange (`#FF5121`) / Cobalt (`#055DFF`) | Ultra-Wide Display (`Owners Wide` / `Unbounded` / `Syne`, `12–16vw`) + Script (`Scribo`) + Geometric (`Manrope`) | Edge-to-edge giant wordmark + **GSAP Flip / ScrollTrigger + Lenis** | Fashion, branding studios, architectural practices, culture |
| 3 | `era-residence` | [Era Residence](https://www.era-residence.com/) | Alabaster (`#F3F3EC`) ↔ Powder Sky (`#B5CEDB`) ↔ Velvet Plum (`#340C24`) · Ink Navy (`#17233B`) | Ultra-Condensed Didone (`11–12vw`, `lh 0.88`) + Overlapping Calligraphic Script (`6–7vw`) + Extended Sans (`13px`) | 4-Corner Fixed HUD + Daylight sky hero + Day/Night toggle + **GSAP ScrollTrigger/SplitText + Anime.js SVG path draw** | Real estate, luxury resorts, boutique villas, hospitality, fine dining |
| 4 | `dontboardme` | [Don't Board Me](https://dontboardme.com/) | Drenched Color-Field Chapters: Warm Butter (`#FFF3B0`) ↔ Cobalt (`#1D4ED8`) ↔ Coral (`#FF5A36`) ↔ Cream (`#FAF6F0`) | Oversized Expressive Display (`10–13vw`, `lh 0.90`) + Handwritten callouts + Clean Sans | Layered cutout collage hero + **Anime.js spring physics + GSAP Draggable / Matter.js 2D physics** | Indie startups, consumer/pet brands, creative services, events |
| 5 | `oryzo` | [Oryzo AI](https://oryzo.ai/) | Deep Espresso-Obsidian (`#100904`) ↔ Warm Parchment (`#FFEDD7`) + Amber Signal (`#F59E0B`) | Variable Grotesk Display (`Halyard` / `Hanken Grotesk` / `Sora`, `64–120px`) + Technical Mono | Atmospheric canvas stage + **Three.js / Custom GLSL Shader / Interactive 2D Canvas + GSAP** | SaaS, AI platforms, fintech, modern developer tools |
| 6 | `mont-fort` | [Mont-Fort](https://mont-fort.com/) | Alpine White (`#FFFFFF`) ↔ Glacier Blue (`#2D628C`) ↔ Mist (`#81A0BB`) ↔ Deep Slate (`#0F172A`) | Wide Geometric Uppercase (`Century Gothic` / `Josefin Sans`, tracked `+0.04em`) + Clean Sans (`Plus Jakarta Sans`) | Swiss 12-col mathematical frame + **Three.js atmospheric depth / WebGL displacement + GSAP** | Asset management, wealth, legal, strategy consulting, prestige B2B |
| 7 | `animejs` | [Anime.js](https://animejs.com/) | Technical Charcoal (`#1F1E1E`) ↔ Raised Slate (`#252423`) + Signal Red (`#FF4B4B`) & Coded Parameter Hues | Condensed Industrial (`DIN` / `Barlow Condensed`) + Technical Mono (`JetBrains Mono`) | Live reactive timeline/tick matrix + **Anime.js (`stagger`, `timeline`, SVG morph, spring physics)** | Dev tools, open-source libraries, APIs, interactive documentation |
| 8 | `onlines` | [Onlines](https://onlines.com.ar/) | Stark Gallery White (`#FFFFFF`) ↔ Warm Snow (`#FCF9F9`) ↔ Carbon Ink (`#1D1D1F`) + Drenched Footer | Tight Neo-Grotesk (`Inter Display`, `96–140px`, `ls -0.02em`) + Tabular Mono (`JetBrains Mono`) | Kinetic horizontal `filmstrip` hero + **Lenis velocity skew + GSAP Flip filter transitions** | E-commerce, streetwear, modern retail, catalog drops |
| 9 | `squared-media` | [Squared Media](https://www.squared-media.nl/) | Pitch Carbon (`#0C0C0B`) ↔ Sage Stone (`#B8C0A5` / `#DBE0CD`) ↔ Signal Orange (`#FF4500`) | Geometric Sans (`Figtree`, `80–130px`) + Technical Display (`Space Grotesk`) + Mono | High-contrast chapter shifts + **GSAP ScrollTrigger clip-path wipes + View Transitions API** | Production houses, marketing agencies, B2B growth studios |
| 10 | `structure-eng` | [Structure Engineering](https://structureengineering.com.au/) | Architectural Concrete (`#F5F5F5`) ↔ Stark Black (`#000000`) ↔ Brass Olive (`#B9B36D`) | Neo-Grotesk Display (`Sequel Sans` / `Archivo`, `82–136px`, `lh 1.0`) + Technical Mono (`PP Fraktion Mono`) | Exposed structural grid rails + **Anime.js SVG `strokeDashoffset` engineering diagrams + GSAP** | Engineering, architecture, construction, industrial tech |
| 11 | `ray-corral` | [Ray Corral](https://raycorral.com/) | Archival Warm Paper (`#F8F7F2`) ↔ Gallery Charcoal (`#333333` / `#0C0C0C`) | Stark Neo-Grotesk (`Helvetica Now` / `Syne`, `98–140px`, `lh 1.0`) + Signature Script (`Bacalisties` / `Pinyon Script`) | Camera viewfinder corner HUD + **Lenis + GSAP ScrollTrigger horizontal sequence + WebGL image planes** | Artists, photographers, directors, personal portfolios |
| 12 | `mejuma-tuscany` | [Mejuma Tuscany](https://www.awwwards.com/sites/mejuma-tuscany) | Sun-Baked Linen (`#F4EFE6`) ↔ Olive Grove (`#2C3527`) ↔ Terracotta Earth (`#9E472A`) | High-Contrast Editorial Serif (`Cormorant` / `Newsreader`) + Inline photography in text + Humanist Sans | Sensory macro photography hero + **GSAP inline-image expansion + Lenis smooth parallax** | Agriturismo, cafés, bakeries, wine/olive oil, artisanal F&B |
| 13 | `santioni` | [Santioni Spirits](https://santionispirits.com/) | Chiaroscuro Obsidian (`#121212`) ↔ Deep Mahogany (`#2A140D`) + Crisp White (`#FFFFFF`) & Amber Gold | Bespoke Display Serif (`Charles Rosie` / `Bodoni Moda`, `84–140px`) + Classic Serif (`Cormorant`) | Layered z-index depth + **Three.js 3D vessel / WebGL lighting stage + GSAP pinned anatomy** | Spirits, fragrance, specialty roasteries, craft luxury goods |
| 14 | `shopify-editions` | [Shopify Editions](https://www.shopify.com/editions/winter2026) | Multi-Chapter Color Events: Pitch Black (`#000000`) ↔ Warm Ivory (`#F7F7EE`) ↔ Forest Olive (`#292919`) | Editorial Serif (`HW Cigars` / `Instrument Serif`, `72–128px`) + Neo-Grotesk (`Neue Montreal`) | Modular chapter switcher + **Anime.js / Motion interactive micro-demos + GSAP ScrollTrigger** | Feature releases, multi-product hubs, enterprise showcases |
| 15 | `adobe-bowie` | [Adobe x Bowie 75](https://adobexbowie75.com/) | Drenched Chromatic Chapters: Electric Cobalt (`#0038FF`) ↔ Crimson (`#E11D48`) ↔ Acid Yellow (`#FACC15`) ↔ Black | Expressive Cut-Up Display (`96–150px`) + Archival Sans & Mono | Multi-plane parallax collage + **Three.js / WebGL displacement + GSAP Draggable & polygon masks** | Culture, music, interactive exhibitions, campaign microsites |

---

## 2. Complete Design-System Specifications for All 15 References (Mandatory 70% Foundation)

Every reference below contains its **exact extracted Design System** (Color Chapters, Typography Lockup, Viewport Chrome, Hero Stagecraft, Section Rhythm, and Photography Grade). When you select a `referenceId`, you MUST implement its complete specification:

---

### 1. `emotion-agency` — [Emotion Agency](https://emotion-agency.com/)
- **Color System (3-Chapter Chromatic Shift)**:
  - `--bg-lavender: oklch(0.96 0.025 300)` (`#F5EFFF` Soft Lavender Primary Ground)
  - `--bg-plum: oklch(0.23 0.08 300)` (`#2A1647` Deep Violet-Plum Chapter)
  - `--bg-obsidian: oklch(0.14 0.02 300)` (`#0E0A14` Cinema Dark Stage)
  - `--ink-plum: oklch(0.23 0.08 300)` (`#2A1647` Primary Ink on Lavender) · `--ink-light: oklch(0.98 0.005 300)` (`#FFFFFF` on Plum/Obsidian)
- **Typography Architecture (3-Tier Serif + Grotesk + Mono)**:
  - `--font-display`: High-contrast editorial serif (`Instrument Serif`, `Playfair Display`, or `Bodoni Moda`), `clamp(4.5rem, 9.5vw, 10rem)` (`96–160px`), `line-height: 0.80`, `letter-spacing: -0.03em`.
  - `--font-text`: Neo-grotesk (`Plus Jakarta Sans` / `Hanken Grotesk`), `16px–18px`, `line-height: 1.5`.
  - `--font-mono`: Technical mono (`IBM Plex Mono`), `12px–13px` used strictly for real project timestamps, reel durations, and index coordinates.
- **Viewport Chrome & Hero Mechanism**:
  - Corner technical HUD (`top-left` wordmark, `top-right` time/reel trigger + menu pill).
  - Full-viewport hero where the giant `0.80` line-height serif headline slices across an expanding `clip-path` showreel/image portal (`inset(18% 22% 18% 22%)` → `inset(0% 0% 0% 0%)` scrubbed on scroll).
- **Section Rhythm**:
  - `s1` Clip-path portal hero on `#F5EFFF` → `s2` Asymmetric 5/7 manifesto with sticky left rail → `s3` Full-bleed `#2A1647` interactive case index with cursor-following floating media preview (`gsap.quickTo`) → `s4` Horizontal pinned showcase track → `s5` Interactive scope/project estimator ("the live thing") → `s6` Full-viewport `#0E0A14` takeover footer.
- **Photography & Visual Grade**: High-fashion editorial portraits, crisp 3D/architectural renders with violet/cool rim lighting, and high-contrast studio photography.

---

### 2. `lxl-creative` — [LXL Creative](https://www.lxlcreative.co.uk/)
- **Color System (Espresso + Warm Butter Cream + High-Chroma Signal Chapters)**:
  - `--bg-espresso: oklch(0.24 0.018 45)` (`#27201D` Deep Espresso Ground)
  - `--bg-butter: oklch(0.95 0.065 98)` (`#FCF2BD` Warm Cream Chapter)
  - `--bg-flame: oklch(0.65 0.22 35)` (`#FF5121` Flame Orange Chapter) · `--accent-cobalt: oklch(0.52 0.24 260)` (`#055DFF`)
  - `--ink-cream: oklch(0.95 0.065 98)` (`#FCF2BD` on Espresso) · `--ink-espresso: oklch(0.24 0.018 45)` (`#27201D` on Butter/Flame)
- **Typography Architecture (3-Tier Ultra-Wide Display + Script + Geometric Sans)**:
  - `--font-display`: Ultra-wide/extended display (`Unbounded`, `Syne`, or `Archivo Black`), `clamp(4rem, 13vw, 13.5rem)`, `line-height: 0.88`, uppercase.
  - `--font-script`: Expressive brush/calligraphic script (`Caveat`, `Permanent Marker`, or `Pinyon Script`) for kinetic marginalia and overlapping callouts.
  - `--font-text`: Clean geometric sans (`Manrope`), `16px–18px`, `line-height: 1.55`.
- **Viewport Chrome & Hero Mechanism**:
  - Edge-to-edge `14–16vw` ultra-wide wordmark anchored across the viewport, overlapped by an off-center `4:5` editorial portrait frame (`55%` width) that shifts vertically on scroll parallax.
- **Section Rhythm**:
  - `s1` Giant wordmark + overlapping portrait hero on `#27201D` → `s2` 12-col asymmetric split (cols 1–4 sticky thesis, cols 6–12 staggered tall imagery) → `s3` Full-bleed `#FCF2BD` interactive project/service index (hover expands row height + reveals inline image) → `s4` Live interactive brand/campaign configurator ("the live thing") → `s5` Drenched `#FF5121` statement pull-quote & monumental footer.
- **Photography & Visual Grade**: Warm analog film grain, punchy studio fashion/product photography, hard sun shadows, bold color blocking.

---

### 3. `era-residence` — [Era Residence](https://www.era-residence.com/)
- **Color System (4-Chapter Mediterranean/Tropical Surface Shift)**:
  - `--bg-alabaster: oklch(0.96 0.008 95)` (`#F3F3EC` Warm Limestone Ground)
  - `--bg-powder-sky: oklch(0.83 0.038 230)` (`#B5CEDB` Coastal Sky Chapter)
  - `--bg-velvet-plum: oklch(0.20 0.065 345)` (`#340C24` Deep Evening Plum Chapter)
  - `--accent-bloom: oklch(0.84 0.085 350)` (`#F8BBCB` Bougainvillea Bloom)
  - `--ink-navy: oklch(0.25 0.045 255)` (`#17233B` Primary Ink on Alabaster/Sky) · `--ink-light: oklch(0.96 0.008 95)` (`#F3F3EC` on Plum/Hero)
- **Typography Architecture (3-Tier Ultra-Condensed Didone + Overlapping Script + Extended Sans)**:
  - `--font-display`: Ultra-condensed Didone serif (`Six Caps`, `Bodoni Moda`, `Prata`, or `Cormorant Upright`), `clamp(4.75rem, 11.5vw, 11.5rem)` (`172–192px`), `line-height: 0.875`, `letter-spacing: -0.024em`, uppercase.
  - `--font-script`: Calligraphic script (`Pinyon Script`, `Monsieur La Doulaise`, or `Alex Brush`), `clamp(3rem, 7vw, 6.75rem)` (`108px`), overlapping the bottom of `--font-display` (`margin-top: -0.32em`, `transform: rotate(-4deg)`).
  - `--font-text`: Extended/geometric sans (`Plus Jakarta Sans` / `Public Sans`), `13px–16px`.
- **Viewport Chrome & Hero Mechanism**:
  - **Fixed 4-Corner Viewport HUD** (`pointer-events: none`, no top navbar!): Top-left rotating SVG seal (`76×76px`), Top-right stacked underline CTA (`SELECT AN APARTMENT` / `BOOK A CALL` / `CONTACT`), Left-rail vertical scroll counter (`00` → `100`), Bottom-left `SCROLL ↓`.
  - **Full-Bleed Daylight Sky Hero + `BY DAY — BY NIGHT` Switcher**: Upper 55% clear azure sky holding the centered 3-tier lockup (`ERA RESIDENCE` + *Estepona*) and the horizontal `A PLACE` — `[ BY DAY | BY NIGHT ]` — `TO RETURN TO` switcher; lower 45% sunlit stone architecture, turquoise pool, and bougainvillea foliage with circular hotspot rings.
- **Section Rhythm**:
  - `s1` Full-bleed Day/Night hero stage → `s2` `#B5CEDB` Powder Sky architectural cutout + `11vw` `BUILT TO STAY` statement → `s3` `#F3F3EC` Alabaster `THE COAST YOU WANTED / yours / THIS YEAR` + organic hand-drawn SVG coastal route map (`10 MIN` · `20 MIN`) → `s4` Asymmetric split collage (Left `#340C24` Velvet Plum block with inset courtyard photo & overflowing flowers; Right terrace crop + `56px` condensed serif + `160×160px` circular button) → `s5` Interactive apartment/pavilion floorplan & unit selector ("the live thing") → `s6` `#340C24` Velvet Plum closing takeover with monumental `10vw` phone/concierge number (`+34 (655) 408-648`).
- **Photography & Visual Grade**: 70% crisp sunlit architectural photography with azure blue sky, turquoise water, pale stone, and magenta bougainvillea; 30% warm 2700K blue-hour twilight renders for the Night toggle.

---

### 4. `dontboardme` — [Don't Board Me](https://dontboardme.com/)
- **Color System (4-Chapter Drenched Playful Fields)**:
  - `--bg-butter: oklch(0.94 0.09 95)` (`#FFF3B0` Sunlit Butter)
  - `--bg-cobalt: oklch(0.48 0.20 260)` (`#1D4ED8` Electric Cobalt)
  - `--bg-coral: oklch(0.66 0.20 30)` (`#FF5A36` Punchy Coral)
  - `--bg-cream: oklch(0.97 0.015 85)` (`#FAF6F0` Warm Paper)
  - `--ink-dark: oklch(0.18 0.02 260)` (`#111827`)
- **Typography Architecture (Expressive Display + Handwritten Note + Clean Sans)**:
  - `--font-display`: Heavy expressive display (`Syne`, `Fraunces`, or `Cabinet Grotesk`), `clamp(4rem, 11vw, 11rem)`, `line-height: 0.90`, `-0.03em`.
  - `--font-script`: Handwritten marker/script (`Caveat` / `Gloria Hallelujah`) for annotations and arrows.
  - `--font-text`: Friendly humanist sans (`Plus Jakarta Sans` / `DM Sans`), `16px–18px`.
- **Viewport Chrome & Hero Mechanism**:
  - Floating corner pill buttons (`border: 2px solid var(--ink-dark)`, `border-radius: 999px`) with instant tactile press (`scale(0.95)`).
  - Drenched color-field hero with `11vw` headline and cutout subject photography overlapping the letters.
- **Section Rhythm**:
  - `s1` Drenched collage hero → `s2` Interactive care/pricing calculator ("the live thing" with live breakdown) → `s3` Side-by-side comparison matrix (Us vs. Traditional Boarding) on a contrasting color chapter → `s4` Draggable/tilted photo proof cards → `s5` Full-viewport Coral/Cobalt booking takeover.
- **Photography & Visual Grade**: Bright, high-key natural light subject photography with clean alpha cutouts and playful framing.

---

### 5. `oryzo` — [Oryzo AI](https://oryzo.ai/)
- **Color System (Warm Obsidian-Espresso + Parchment Ink + Amber Telemetry)**:
  - `--bg-obsidian: oklch(0.15 0.02 55)` (`#100904` Deep Espresso-Black)
  - `--bg-surface: oklch(0.20 0.025 55)` (`#1C120B` Raised Technical Surface)
  - `--bg-parchment: oklch(0.95 0.035 75)` (`#FFEDD7` Warm Parchment Contrast Chapter)
  - `--ink-parchment: oklch(0.95 0.035 75)` (`#FFEDD7`) · `--accent-amber: oklch(0.78 0.16 70)` (`#F59E0B`)
- **Typography Architecture (Variable Grotesk + Technical Mono)**:
  - `--font-display`: Crisp variable neo-grotesk (`Hanken Grotesk`, `Sora`, or `Schibsted Grotesk`), `clamp(3.5rem, 7.5vw, 7.5rem)`, `line-height: 0.96`, `-0.03em`.
  - `--font-mono`: Tabular technical mono (`JetBrains Mono` / `IBM Plex Mono`) for live telemetry, latency ms, and query tokens.
- **Viewport Chrome & Hero Mechanism**:
  - Minimal technical top bar with live system status telemetry + primary action pill.
  - Atmospheric hero stage where a live interactive HTML/Canvas product interface or neural data plane bleeds off the viewport edge at photographic scale.
- **Section Rhythm**:
  - `s1` Atmospheric product-stage hero → `s2` Live interactive AI/query sandbox ("the live thing": visitor switches prompts/parameters and sees real computed output) → `s3` Uneven architectural bento (1 dominant 8-col interactive canvas + 4-col stack) → `s4` Warm Parchment (`#FFEDD7`) contrast chapter with live benchmark ledger (`tabular-nums`) → `s5` Terminal-clean conversion close.
- **Photography & Visual Grade**: Warm tungsten-lit macro hardware/architectural renders, volumetric amber/parchment light rays on deep espresso-black.

---

### 6. `mont-fort` — [Mont-Fort](https://mont-fort.com/)
- **Color System (Swiss Alpine Multi-Chapter Palette)**:
  - `--bg-alpine: oklch(0.99 0.002 240)` (`#FFFFFF` Crisp Alpine White)
  - `--bg-glacier: oklch(0.48 0.085 245)` (`#2D628C` Glacier Blue Chapter)
  - `--bg-mist: oklch(0.68 0.055 240)` (`#81A0BB` Alpine Mist Chapter)
  - `--ink-black: oklch(0.12 0.01 240)` (`#000000`) · `--ink-white: oklch(0.99 0.002 240)` (`#FFFFFF`)
- **Typography Architecture (Wide Geometric Uppercase + Swiss Sans)**:
  - `--font-display`: Wide geometric sans (`Josefin Sans`, `Questrial`, or `Tenor Sans`), `clamp(3.25rem, 6.5vw, 6.5rem)`, uppercase, `letter-spacing: +0.04em`, `line-height: 1.15`.
  - `--font-text`: Clean Swiss sans (`Plus Jakarta Sans` / `Public Sans`), `16px`, `line-height: 1.6`.
- **Viewport Chrome & Hero Mechanism**:
  - Strict 12-column mathematical grid alignment with visible hairlines (`1px solid rgba(255,255,255,0.25)` on Glacier/Alpine scenes).
  - Full-bleed high-altitude alpine or architectural daylight photography with wide-tracked geometric display typography locked to the grid rails.
- **Section Rhythm**:
  - `s1` Alpine full-bleed hero → `s2` `#2D628C` Glacier Blue chapter with interactive capital/portfolio allocation simulator ("the live thing", `tabular-nums`) → `s3` `#FFFFFF` Alpine White sticky left-rail thesis with scrolling evidence chapters → `s4` Structured specification/governance matrix → `s5` Understated institutional footer.
- **Photography & Visual Grade**: Ultra-sharp daylight alpine peaks, modern glass/stone architecture under crisp blue sky, zero murky darkness.

---

### 7. `animejs` — [Anime.js](https://animejs.com/)
- **Color System (Technical Charcoal + Multi-Hue Signal Palette)**:
  - `--bg-charcoal: oklch(0.23 0.005 60)` (`#1F1E1E` Primary Technical Ground)
  - `--bg-slate: oklch(0.26 0.006 60)` (`#252423` Raised Instrument Panel)
  - `--ink-bone: oklch(0.96 0.006 70)` (`#F6F4F2`)
  - `--signal-red: oklch(0.65 0.22 25)` (`#FF4B4B`) · `--signal-cyan: oklch(0.78 0.14 210)` · `--signal-amber: oklch(0.82 0.16 80)`
- **Typography Architecture (Condensed Industrial + Tabular Mono)**:
  - `--font-display`: Condensed technical grotesk (`Barlow Condensed`, `Chakra Petch`, or `Oswald`), `clamp(3.5rem, 7.5vw, 7.5rem)`, `line-height: 0.94`.
  - `--font-mono`: Precision mono (`JetBrains Mono`) for timeline ticks, parameter readouts, and code snippets.
- **Viewport Chrome & Hero Mechanism**:
  - Exposed ruler/timeline tick marks along the viewport edges.
  - First screen is a **live reactive object-field / timeline playground** where scrubbers or pointer coordinates mutate 40+ SVG/DOM nodes at 60fps.
- **Section Rhythm**:
  - `s1` Live kinetic timeline hero → `s2` Interactive parameter playground ("the live thing": sliders for easing, stagger, spring physics mutating live targets) → `s3` Side-by-side specification & live visual result stages → `s4` High-density API/capability matrix → `s5` Kinetic tick-mark footer.
- **Photography & Visual Grade**: Precision vector/canvas geometry, glowing oscilloscope waveforms, high-contrast technical diagrams.

---

### 8. `onlines` — [Onlines](https://onlines.com.ar/)
- **Color System (Stark Gallery White + Warm Snow + Carbon Takeover)**:
  - `--bg-white: oklch(0.99 0.001 0)` (`#FFFFFF` Gallery White)
  - `--bg-snow: oklch(0.98 0.005 20)` (`#FCF9F9` Warm Snow Chapter)
  - `--bg-carbon: oklch(0.22 0.005 260)` (`#1D1D1F` Carbon Takeover Chapter)
  - `--ink-carbon: oklch(0.22 0.005 260)` (`#1D1D1F`) · `--ink-muted: oklch(0.55 0.008 260)` (`#666666`)
- **Typography Architecture (Tight Neo-Grotesk + Tabular Mono)**:
  - `--font-display`: Tight display grotesk (`Inter Tight`, `Hanken Grotesk`, or `Syne`), `clamp(4.5rem, 9vw, 9.5rem)` (`96–140px`), `line-height: 0.96`, `letter-spacing: -0.025em`.
  - `--font-mono`: `JetBrains Mono` (`12px–13px`) for SKU codes, dimensions, and live stock counts.
- **Viewport Chrome & Hero Mechanism**:
  - Minimal gallery header (`wordmark` left, live filter/cart count right).
  - Oversized `9vw` display headline slicing across a horizontal `filmstrip` of tall `4:5` editorial crops that shift with scroll velocity.
- **Section Rhythm**:
  - `s1` Kinetic filmstrip hero on `#FFFFFF` → `s2` Live filterable lookbook / catalog index ("the live thing": instant category/material filter + hover quick-view) → `s3` Full-bleed `100vw` editorial campaign spread → `s4` `#1D1D1F` Carbon takeover chapter with specification ledger & direct checkout/action close.
- **Photography & Visual Grade**: Crisp daylight studio lookbook photography, clean neutral backdrops, sharp garment/product textures.

---

### 9. `squared-media` — [Squared Media](https://www.squared-media.nl/)
- **Color System (Pitch Carbon ↔ Sage Stone ↔ Signal Orange)**:
  - `--bg-carbon: oklch(0.15 0.005 90)` (`#0C0C0B` Pitch Carbon)
  - `--bg-sage: oklch(0.79 0.035 125)` (`#B8C0A5` Sage Stone Chapter)
  - `--bg-sage-light: oklch(0.89 0.025 120)` (`#DBE0CD` Soft Mineral Chapter)
  - `--accent-orange: oklch(0.64 0.24 35)` (`#FF4500` Signal Orange)
  - `--ink-bone: oklch(0.94 0.01 90)` (`#EEECE7` on Carbon) · `--ink-forest: oklch(0.23 0.025 135)` (`#182113` on Sage)
- **Typography Architecture (Geometric Display + Technical Sans + Mono)**:
  - `--font-display`: Bold geometric sans (`Figtree`, `Plus Jakarta Sans`, or `Archivo`), `clamp(4rem, 8.5vw, 8.5rem)`, `line-height: 0.94`, `-0.03em`.
  - `--font-mono`: `Space Grotesk` / `JetBrains Mono` for technical metadata.
- **Viewport Chrome & Hero Mechanism**:
  - High-contrast floating bar with Signal Orange (`#FF4500`) primary CTA button.
  - Full-bleed stage hero with giant geometric typography anchored to strict vertical grid rails and an integrated showreel/case aperture that expands on scroll.
- **Section Rhythm**:
  - `s1` Carbon stage hero (`#0C0C0B`) → `s2` Full-bleed Sage Stone (`#B8C0A5`) asymmetric value argument with real performance metrics → `s3` Interactive case/service matrix with hover image reveals → `s4` Interactive ROI / production scope calculator ("the live thing") → `s5` Signal Orange (`#FF4500`) conversion takeover footer.
- **Photography & Visual Grade**: High-contrast commercial production stills, natural sage/stone outdoor lighting paired with studio close-ups.

---

### 10. `structure-eng` — [Structure Engineering](https://structureengineering.com.au/)
- **Color System (Architectural Concrete ↔ Stark Black ↔ Brass Olive)**:
  - `--bg-concrete: oklch(0.96 0.002 90)` (`#F5F5F5` Raw Concrete Ground)
  - `--bg-black: oklch(0.12 0.002 0)` (`#000000` Structural Black Chapter)
  - `--bg-olive: oklch(0.75 0.08 102)` (`#B9B36D` Anodized Brass-Olive Chapter)
  - `--ink-black: oklch(0.12 0.002 0)` (`#000000`) · `--ink-white: oklch(0.99 0.001 0)` (`#FFFFFF`)
- **Typography Architecture (Industrial Neo-Grotesk + Technical Mono)**:
  - `--font-display`: Industrial neo-grotesk (`Archivo`, `Schibsted Grotesk`, or `Hanken Grotesk`), `clamp(4rem, 8vw, 8.5rem)` (`82–136px`), `line-height: 0.98`, `-0.025em`.
  - `--font-mono`: Technical mono (`IBM Plex Mono` / `Space Mono`) for load ratings, span lengths (m), and structural tolerances.
- **Viewport Chrome & Hero Mechanism**:
  - Exposed architectural grid coordinates and structural span lines.
  - Giant `8.5vw` wordmark locked to the top grid rail above a crisp wide-angle structural photograph with SVG load-path overlays.
- **Section Rhythm**:
  - `s1` Structural span hero on `#F5F5F5` → `s2` Interactive structural span / load / material calculator ("the live thing" with live SVG diagram deformation) → `s3` `#000000` Black chapter with sticky-title project dossiers & tabular engineering specs → `s4` `#B9B36D` Brass-Olive capability matrix → `s5` Monumental blueprint footer.
- **Photography & Visual Grade**: Bright daylight architectural & structural engineering photography (cantilevered concrete, steel trusses, timber spans against clear sky).

---

### 11. `ray-corral` — [Ray Corral](https://raycorral.com/)
- **Color System (Archival Warm Paper ↔ Gallery Charcoal)**:
  - `--bg-paper: oklch(0.97 0.008 90)` (`#F8F7F2` Archival Warm Paper)
  - `--bg-charcoal: oklch(0.16 0.004 0)` (`#0C0C0C` Darkroom Charcoal Chapter)
  - `--ink-charcoal: oklch(0.28 0.005 0)` (`#333333`) · `--ink-paper: oklch(0.97 0.008 90)` (`#F8F7F2`)
- **Typography Architecture (Stark Neo-Grotesk + Signature Calligraphic Script)**:
  - `--font-display`: Stark neo-grotesk (`Syne`, `Hanken Grotesk`, or `Archivo`), `clamp(4.5rem, 9.5vw, 9.5rem)` (`98–140px`), `line-height: 0.96`.
  - `--font-script`: Flowing personal signature script (`Pinyon Script` / `Monsieur La Doulaise`) overlapping the display typography.
- **Viewport Chrome & Hero Mechanism**:
  - Camera viewfinder / gallery plate corner HUD (4 corners anchored with work count, light/darkroom toggle, and index trigger).
  - Imagery occupies `70%+` of the viewport on `#F8F7F2` paper ground with razor-sharp corner typography.
- **Section Rhythm**:
  - `s1` Viewfinder gallery hero on `#F8F7F2` → `s2` Pinned horizontal exhibition sequence (alternating `16:10` wide and `4:5` portrait plates, zero borders) → `s3` Interactive archive/commission index ("the live thing": filter by medium/year with floating cursor preview) → `s4` `#0C0C0C` Darkroom chapter with artist manifesto → `s5` Minimal exhibition colophon footer.
- **Photography & Visual Grade**: Museum-grade fine-art & architectural photography, natural daylight shadows, rich tonal dynamic range.

---

### 12. `mejuma-tuscany` — [Mejuma Tuscany](https://www.awwwards.com/sites/mejuma-tuscany)
- **Color System (Sun-Baked Tuscan Linen ↔ Olive Grove ↔ Terracotta Earth)**:
  - `--bg-linen: oklch(0.95 0.015 85)` (`#F4EFE6` Sun-Baked Unbleached Linen)
  - `--bg-olive: oklch(0.30 0.035 135)` (`#2C3527` Deep Olive Grove Chapter)
  - `--bg-terracotta: oklch(0.48 0.11 38)` (`#9E472A` Warm Terracotta Chapter)
  - `--ink-soil: oklch(0.22 0.02 65)` (`#231D18` Volcanic Soil Ink) · `--ink-linen: oklch(0.95 0.015 85)`
- **Typography Architecture (High-Contrast Editorial Serif with Inline Photos + Humanist Sans)**:
  - `--font-display`: High-contrast warm serif (`Cormorant Garamond`, `Newsreader`, or `Playfair Display`), `clamp(3.75rem, 8.5vw, 8.5rem)`, `line-height: 0.95`, with **inline pill/rectangular miniature photographs interleaved directly inside the headline lines**.
  - `--font-text`: Warm humanist sans (`Plus Jakarta Sans` / `Source Sans 3`), `16px–18px`.
- **Viewport Chrome & Hero Mechanism**:
  - Floating organic header over a sun-drenched macro harvest/estate scene, transitioning into the inline-image serif manifesto.
- **Section Rhythm**:
  - `s1` Golden-hour sensory hero + inline-photo headline → `s2` `#2C3527` Olive Grove chapter with live harvest / tasting notes / seasonal menu interactive board ("the live thing") → `s3` `#F4EFE6` Linen asymmetric story sequence (terroir → craft → table) with overlapping sunlit photography → `s4` Complete menu/cellar ledger with real prices (`tabular-nums`) → `s5` `#9E472A` Terracotta table/stay reservation close.
- **Photography & Visual Grade**: Golden-hour Mediterranean/tropical sunlight, tactile macro shots of linen, stone, olive/palm leaves, artisan food, and poured wine/coffee.

---

### 13. `santioni` — [Santioni Spirits](https://santionispirits.com/)
- **Color System (Chiaroscuro Obsidian ↔ Deep Mahogany-Amber + Crisp White)**:
  - `--bg-obsidian: oklch(0.17 0.005 0)` (`#121212` Chiaroscuro Obsidian)
  - `--bg-mahogany: oklch(0.22 0.045 45)` (`#2A140D` Aged Cask Mahogany Chapter)
  - `--bg-parchment: oklch(0.94 0.02 80)` (`#F2ECE1` Vintage Label Chapter)
  - `--ink-white: oklch(0.99 0.002 0)` (`#FFFFFF`) · `--accent-amber: oklch(0.76 0.14 70)` (`#D99B26`)
- **Typography Architecture (Bespoke Display Serif + Classic Text Serif)**:
  - `--font-display`: High-contrast apothecary/luxury serif (`Bodoni Moda`, `Cinzel`, or `Prata`), `clamp(4.25rem, 9.5vw, 9.5rem)`, `line-height: 0.90`, `letter-spacing: 0.02em`.
  - `--font-text`: Refined editorial sans/serif (`Plus Jakarta Sans` / `Cormorant`), `16px–18px`.
- **Viewport Chrome & Hero Mechanism**:
  - **3-Plane Layered Z-Index Hero (`object-field`)**: Plane 1 (back) holds the giant `9.5vw` display title; Plane 2 (middle) holds a dramatic rim-lit cutout of the hero bottle/vessel/artifact (`65%` viewport height); Plane 3 (front) holds foreground botanical/ice/material details and secondary italic script/caption.
- **Section Rhythm**:
  - `s1` 3-plane layered depth hero on `#121212` → `s2` Scroll-pinned anatomy/process breakdown (callouts appear along the vessel as you scroll) → `s3` `#2A140D` Mahogany chapter with interactive alchemy / tasting / pairing mixer ("the live thing") → `s4` `#F2ECE1` Vintage Label provenance & batch ledger → `s5` Dramatic allocation/acquisition close.
- **Photography & Visual Grade**: Studio chiaroscuro rim lighting through amber glass, condensation droplets, charred oak, botanicals, and crisp parchment contrast.

---

### 14. `shopify-editions` — [Shopify Editions](https://www.shopify.com/editions/winter2026)
- **Color System (Multi-Chapter Editorial Color Events)**:
  - `--bg-ivory: oklch(0.97 0.012 100)` (`#F7F7EE` Warm Editorial Ivory)
  - `--bg-olive: oklch(0.26 0.03 110)` (`#292919` Deep Forest Olive Chapter)
  - `--bg-black: oklch(0.12 0.002 0)` (`#000000` High-Contrast Showcase Chapter)
  - `--ink-dark: oklch(0.18 0.01 100)` (`#1A1A16`) · `--ink-ivory: oklch(0.97 0.012 100)` (`#F7F7EE`)
- **Typography Architecture (High-Contrast Editorial Serif + Crisp Neo-Grotesk)**:
  - `--font-display`: Tall condensed editorial serif (`Instrument Serif`, `Playfair Display`, or `Newsreader`), `clamp(4rem, 8.5vw, 8.5rem)`, `line-height: 0.92`, `-0.025em`.
  - `--font-text`: Neo-grotesk (`Plus Jakarta Sans` / `Inter`), `15px–17px`, with sticky chapter index numbers (`tabular-nums`).
- **Viewport Chrome & Hero Mechanism**:
  - Sticky left/top chapter navigation rail with scroll-spy active chapter indicator and live search/filter trigger.
  - High-density editorial masthead combining `8.5vw` serif typography with an interactive multi-chapter jump board.
- **Section Rhythm**:
  - `s1` `#F7F7EE` Ivory editorial masthead + interactive chapter directory → `s2` `#292919` Forest Olive chapter with sticky left rail + uneven 8/4 interactive feature stage ("the live thing" embedded live inside the dominant cell) → `s3` Full-width visual interlude → `s4` `#000000` Black chapter with searchable/filterable specification matrix → `s5` High-impact conversion close.
- **Photography & Visual Grade**: Crisp editorial still-life + razor-sharp interactive UI stages, zero generic blurred SaaS mockups.

---

### 15. `adobe-bowie` — [Adobe x Bowie 75](https://adobexbowie75.com/)
- **Color System (Drenched Chromatic Exhibition Chapters)**:
  - `--bg-cobalt: oklch(0.45 0.26 264)` (`#0038FF` Electric Cobalt)
  - `--bg-crimson: oklch(0.55 0.22 20)` (`#E11D48` Ziggy Crimson)
  - `--bg-acid: oklch(0.86 0.18 92)` (`#FACC15` Acid Yellow)
  - `--bg-archive: oklch(0.14 0.01 260)` (`#0A0A0F` Archive Black)
- **Typography Architecture (Expressive Cut-Up Display + Archival Mono)**:
  - `--font-display`: Bold expressive display (`Syne`, `Unbounded`, or `Oswald`), `clamp(4.5rem, 10vw, 10.5rem)`, `line-height: 0.88`.
  - `--font-mono`: Archival typewriter/mono (`IBM Plex Mono` / `Space Mono`) for era dates, catalog numbers, and artifact notes.
- **Viewport Chrome & Hero Mechanism**:
  - Exhibition HUD with era/layer switcher and audio/visual state toggle.
  - Multi-plane parallax collage hero with polygon `clip-path` masks and display type slicing across overlapping archival plates.
- **Section Rhythm**:
  - `s1` Multi-plane collage hero on `#0038FF` → `s2` Interactive era/artifact scrubbing explorer ("the live thing") → `s3` `#E11D48` Crimson pinned horizontal exhibition wall → `s4` `#FACC15` Acid Yellow statement quote screen → `s5` `#0A0A0F` Archival credits & takeover close.
- **Photography & Visual Grade**: High-saturation duotone/chromatic treatments, sharp polygon cutouts, tactile paper/halftone collage contrast.

---

## 3. Universal Photography & Color Curation Rules (Mandatory for `image-generator`)

Why did earlier AI builds look like generic slop? Because models defaulted to dark, murky, underexposed AI renders sitting on a single `#141414` dark-grey background. Follow these universal rules across all 15 references:

1. **Match the Reference's Exact Lighting & Daylight Ratio**:
   - **Daylight-Led References (`era-residence`, `mont-fort`, `mejuma-tuscany`, `ray-corral`, `onlines`, `structure-eng`, `dontboardme`, `emotion-agency`, `shopify-editions`)**: At least **60–80% of generated images MUST be shot in crisp natural daylight** (clear azure sky, sunlit stone/linen/concrete, crystal water reflections, vibrant botanical accents, high micro-contrast).
   - **Chiaroscuro / Studio References (`santioni`, `oryzo`, `lxl-creative`, `squared-media`, `animejs`, `adobe-bowie`)**: Use high-contrast directional studio rim lighting, warm tungsten/amber highlights, or punchy chromatic backdrops—**never** muddy, low-contrast grey-black fog.
2. **Ban Single-Surface Monotony (`FAIL [flat-surface-monotony]`)**:
   - Every reference in this catalog shifts its full-bleed background across **2 to 4 curated color chapters** as you scroll. Define `--bg-chapter-1`, `--bg-chapter-2`, `--bg-chapter-3` in `css/tokens.css` from the chosen reference specification above and apply them across sections.

---

## 4. Mandatory 70/30 Execution Checklist for Phase 2, 3, 5, 6

1. **Select the Best Reference & Lock `"referenceId"` in `design/brand.json`**:
   - Match the user's business to the best fit among the **15 `referenceId`s** in §1.
   - Write `"referenceId": "<id>"` in `design/brand.json`. `inspect.sh` automatically loads the corresponding validation profile (`REF_PROFILES[referenceId]`) and checks chapter color variety, font family count, display scale, and HUD/navigation structure.
2. **Replicate the Reference's Exact CSS Token System (`70% Foundation`)**:
   - Copy the chosen reference's OKLCH chapter tokens, 2- or 3-tier typography roles, and display scale directly into `css/tokens.css`.
3. **Develop the Subject Evolution (`30% Evolution`)**:
   - Adapt the hues/materials to the subject's world, build the bespoke interactive "live thing" from `design/inventory.md`, and generate 6–8 cohesive AI photographs via `image-generator`.
