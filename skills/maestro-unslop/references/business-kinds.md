# Business Kinds & Target Screen Rhythm

Business kind decides what visual medium belongs on the page—and what must be stripped during an unslop pass. Declare it before editing and match it to a `surface` profile (`experience | persuade | operate | read`) for browser QA.

## 1. The Tech vs Non-Tech Boundary

- **Tech (`software`, `tech`, `gaming`):** Allowed dark grounds, dark heroes, lit UI panels, live HTML product UI fragments, 1 pulsing node-and-line diagram, and at most 1 shader/canvas/WebGL moment (≤ 2 WebGL contexts total, zero scroll-jacked cards).
- **Non-Tech (`product`, `service`, `place`):** Photography, flat colour fields, clean typography, and real icons only. **No** shader backgrounds, CSS grain/glow grounds, neon dark heroes, pulsing diagrams, or fake UI dashboards.

> A maker who also welcomes visitors at a door (bakery with a webshop, ceramics studio with classes) is a **`place`**—its shop becomes the goods section. It is a `product` only when nothing happens at a physical door.

## 2. Screen-by-Screen Plans

Target **4–6 screens** total at `1440x900` (one section per screen, 60–80 words/screen outside UI mocks). Rotate layout families so no two adjacent sections share a skeleton.

### `place` (Cafe, bakery, restaurant, hotel, local shop, gym)
- **Surface:** `persuade` (default — enforces clarity, contrast, CWV, SEO, WCAG without requiring heavy GSAP/WebGL choreography engines).
- **Screen 1 (Hero):** Full-bleed or framed bespoke photograph of the space/craft, `h1` ≤ 2 lines, single primary action (menu, reserve, visit).
- **Screen 2 (Visit & Hours):** Practical block up front—district/street, hours, what is served today, clear map/directions link.
- **Screen 3 (The Offer):** Asymmetric editorial or two-column photo + crisp list (16px+ body, real prices or `[FILL: price]`, no 3-icon card grids).
- **Screen 4 (The Craft / Space):** Different composition from Screen 3 (e.g., 3–4 photo strip or full-width feature) + one type-led moment (the name, ritual, or address set large).
- **Screen 5 (Closing Footer):** Single-screen closing band with primary action, district/street, `.example` contact if unprovided, and 1-line image credits.

### `product` (Physical goods, DTC, furniture, coffee beans, bikes, apparel)
- **Surface:** `persuade`.
- **Screen 1 (Hero):** Product at anchor scale (≥ 35% of fold, never shrunk inside a grey rounded card), crisp headline stating what it is, single CTA.
- **Screen 2 (Proof in Use):** Different angle/photo showing every headline promise visually (e.g., a cargo bike shows the loaded rack).
- **Screen 3 (Details / Variants):** Interactive swatch or spec toggle that changes the displayed detail/image; no fact repeated twice.
- **Screen 4 (Materials / Makers):** Contrasting flat ground band with close-up craft photo + real specs/dimensions.
- **Screen 5 (Order / Closing):** Direct purchase/inquiry action + clean footer.

### `service` (Clinic, law firm, studio, agency, contractor, consultant)
- **Surface:** `persuade`.
- **Screen 1 (Hero):** Plain statement of who you help and what changes, paired with real people/environment/work photo (never generic handshake stock).
- **Screen 2 (Proof / Case Work):** One concrete case per row (60% visual/outcome, 40% plain result), or verified scope breakdown.
- **Screen 3 (How It Works / Process):** Clear sequence only if the client actually follows steps; avoid `01/02/03` decorative badges.
- **Screen 4 (Team / Practice):** Real people/credentials or `[FILL: team bio]`, addressing the visitor's #1 worry directly.
- **Screen 5 (Book / Closing):** Plain working form or booking action with clear response time, no 2-column gradient form card.

### `software` (SaaS, developer tools, AI apps, APIs, B2B)
- **Surface:** `persuade` (marketing) or `operate` (app/docs-heavy).
- **Screen 1 (Hero):** Plain value statement (`h1` ≤ 2 lines) + **one real interactive HTML UI frame** showing the actual artifact the tool works on (code diff, SQL plan, invoice ledger, workflow canvas)—never grey-bar/donut mocks.
- **Screen 2 (Core Mechanics):** 2–3 asymmetric feature bands or lit panels with rewritten HTML UI fragments + real product/ecosystem icons.
- **Screen 3 (Architecture / Integration):** Optional single clean diagram (hub + branches or 3 parallel lanes) showing how it fits into the user's stack.
- **Screen 4 (Pricing / Proof):** Honest tiers or real customer proof (never invented logo walls or "10,000+ teams").
- **Screen 5 (Closing):** Single primary CTA (e.g., install command or start trial) + clean footer.

### `tech` (Hardware, robotics, IoT, fintech infrastructure, deep tech)
- **Surface:** `persuade` or `experience`.
- **Screen 1 (Hero):** Anchor-scale hardware/system visual + plain engineering claim.
- **Screen 2 (System Breakdown):** Close-up parts, bench-use photo, or technical telemetry table (`tabular-nums`).
- **Screen 3 (Performance / Specs):** Real numbers or `[FILL: benchmark]` in a clean typographic ledger, plus at most 1 subtle canvas/shader moment.
- **Screen 4 (Deployment / Use Context):** Where it operates in the real world.
- **Screen 5 (Closing):** Spec sheet / inquiry CTA + footer.

### `gaming` (Games, interactive studios, engines)
- **Surface:** `experience`.
- **Screen 1 (Hero):** Game title in `h1`, one launch/premise line, full-bleed key art (never a raw shader replacing key art).
- **Screen 2 (World & Setting):** Wide visual showcase of the world/environment.
- **Screen 3 (Gameplay / Systems):** Interactive showcase or video slot (`<video>` with poster & play control) showing real mechanics.
- **Screen 4 (Crew / Studio / Editions):** Characters, studio craft, or release info.
- **Screen 5 (Closing):** Wishlist/play CTA + platform marks + footer.

## 3. Copy & Word Budget

- **Hero `h1`:** ≤ 2 lines at `1440px` and `390px` (~20–42 chars ideal).
- **Per-screen copy:** 60–80 words outside UI mocks or menus.
- **Navigation:** Wordmark + 3–5 links + 1 primary action. Plain bar, no floating blurred pill unless justified.
- **One primary action per screen.** Secondary links stay visually quiet.

*Adapted from `leonxlnx/taste-skill` (MIT) business-kind routing and `maestro` surface profiles (`ia-ux-conversion.md`, `copy.md`).*
