# Information Architecture, UX Psychology & Conversion

Visual craft gets attention; information architecture and conversion clarity turn attention into action. Use this guide in **Phase 1 (Intake)**, **Phase 4 (Argument & Copy)**, and **Phase 5 (Build)** — especially for business websites, SaaS, e-commerce, clinics, and multi-page sites.

Synthesised from Elementor's 8-step web design process, Laws of UX (Jon Yablonski), Nielsen Norman Group (NN/g), Baymard Institute, and Refactoring UI.

---

## 1. Classify the Surface First (Bridging Art Direction & Usability)

Every site (or page) belongs to one primary **surface class**. Declare `"surface"` in `design/brand.json` and pass `--surface <class>` to `inspect.sh` so automated rules match the job of the page:

| Surface | Typical sites | Visual ambition vs. Usability balance | `inspect.sh` profile |
|---|---|---|---|
| `experience` *(default)* | Portfolio, luxury hospitality, editorial campaign, studio, launch microsite | Story, spatial choreography, and memorability lead | Full flagship strictness (`static-page`, `card-grid`, `rigid-header`, `timid-hero` = FAIL) |
| `persuade` | SaaS landing, company profile, local business, clinic, agency, e-commerce storefront | Clear value prop, proof, scannability, and frictionless primary action lead | Strict on clarity/a11y/SEO/tells; `static-page` & media-rich `card-grid` downgraded to WARN |
| `operate` | Web app, dashboard, booking portal, configurator, admin | Speed, predictability, states, and zero-friction task completion lead | Relaxes campaign rules (`static-page`, `card-grid`, `rigid-header`, `timid-hero`, `display-scale`) |
| `read` | Blog, documentation, knowledge base, editorial article | Reading measure (45–75ch), heading scan, TOC, and wayfinding lead | Relaxes campaign rules; enforces typography, contrast, heading order, and landmarks |

**Rule:** Never sacrifice a trust convention (pricing clarity, readable navigation, clear form labels, fast product filtering) for art-direction theatre.

---

## 2. Sitemap, Multi-Page IA & Wireframe Skeleton

Before writing visual CSS or section code, map the **Information Architecture** in `design/brief.md` (single-page = section map; multi-page = sitemap + navigation tree).

### Single-page vs. Multi-page decision
- **Single-page** when: one offer, one audience, one primary action, and total content fits comfortably in 5–7 focused chapters.
- **Multi-page** when: multiple distinct audiences/services, > 6 products/case studies, SEO targeting multiple topics, or required legal/support pages.

### Multi-page Sitemap rules (NN/g + Miller's / Hick's Law)
1. **Top-level navigation ≤ 5–7 items** (wordmark + 3–5 links + 1 primary CTA). More choices increase decision time (*Hick's Law*).
2. **Flat hierarchy:** every key page reachable in ≤ 2 clicks from Home.
3. **Trunk Test (wayfinding on every inner page):** a visitor dropped onto any URL must immediately know:
   - What site this is (clickable wordmark → Home);
   - What page they are on (`aria-current="page"` + clear `<h1>`);
   - Main sections & where they sit (breadcrumbs on depth ≥ 3);
   - How to act or get help (persistent primary CTA or contact link).
4. **Required utility pages** for production multi-page sites:
   - `404` page with helpful navigation back to key pages;
   - Legal pages (`Privacy Policy`, `Terms`) linked in the footer whenever forms or analytics exist.

### Content-first Wireframe (before styling)
Write the section order as a plain **Job → Proof → Next Step** outline before touching layout CSS:
```
1. Hero        → Answer "what is this, for whom, why care?" + 1 primary CTA
2. Proof/Value → Concrete evidence or live interactive mechanism ("the live thing")
3. Offer/Work  → Real items (menu, suites, plans, case studies) with honest specs/prices
4. Objections  → Answer the top 3–5 visitor doubts (timeline, price, fit, guarantee)
5. Action      → Frictionless conversion stage (booking, form, checkout, contact)
6. Footer      → Full contact details, hours/location, secondary links, legal
```

---

## 3. UX Psychology & Conversion Architecture

Apply proven cognitive laws instead of guessing layout hierarchy:

| Law / Principle | Practical rule on the page |
|---|---|
| **Jakob's Law** | Visitors spend most of their time on other sites. Keep navigation, cart/booking, search, and form controls familiar; innovate in art direction and *the live thing*, not by hiding basic controls. |
| **Fitts's Law** | Make the primary CTA large, high-contrast, and placed where the eye naturally lands at the end of a claim (and ≥ 44×44px in the thumb zone on mobile). |
| **Hick's Law** | One primary action per viewport. If a user must choose between plans/tiers, show 3 max and highlight the recommended option clearly. |
| **Von Restorff Effect** | Reserve the brand's accent colour for the primary action and at most one focal indicator so it visually isolates from the rest of the page. |
| **Aesthetic-Usability Effect** | High visual craft earns initial patience, but breaks instantly if a form fails, text is unreadable, or a page lags. |
| **Peak-End Rule** | Invest the highest craft in the **first impression (hero)**, **one signature interactive moment**, and **the final conversion / confirmation state**. |

### Funnel & Conversion Checklist (for `persuade` & business sites)
1. **Above-the-fold clarity:** state the offer, audience, and primary action without forcing scroll.
2. **Proof near every claim:** pair claims with verifiable evidence (real numbers, named case outcomes, genuine testimonials, physical address/credentials). Never invent proof; mark missing real proof `[FILL: ...]`.
3. **Objection handling without generic accordion boxes:** answer real buying doubts (pricing, process, cancellation/warranty, delivery/location) using scannable editorial Q&A lists, comparison tables, or inline micro-copy next to the CTA.
4. **Risk-reducing CTA micro-copy:** place one short, truthful line directly under the primary CTA removing friction (e.g., *"Gratis konsultasi 15 menit · Tanpa kartu kredit"* or *"Balas dalam 2 jam kerja"*).
5. **Form & Booking UX (Baymard):**
   - Ask only for fields needed right now (every extra field drops completion).
   - Single-column form flow; visible `<label>` above every input (never placeholder-only).
   - Correct HTML `type`, `inputmode`, and `autocomplete` attributes.
   - Inline validation on blur/submit with actionable error messages (*"Masukkan nomor WhatsApp 10–13 digit"*, not *"Invalid input"*).
   - Clear **confirmation / thank-you state** telling the user what happens next and when.

---

## 4. Complete UI States Matrix (Refactoring UI)

Every interactive component (forms, filters, booking widgets, and *the live thing*) must design and handle all relevant states — never only the happy path:

| State | What the user must see |
|---|---|
| **Idle / Default** | Clear affordance and initial real content |
| **Hover / Focus** | Crisp pointer feedback (gated to `@media (hover: hover)`) and visible `:focus-visible` ring |
| **Active / Pressed** | Tactile press response (`scale(0.97)` or immediate state toggle) |
| **Loading / Pending** | Disabled trigger + subtle inline spinner or skeleton preserving layout height (zero CLS) |
| **Empty** | Helpful message explaining why nothing is shown + one clear recovery action (e.g. "Reset filter") |
| **Error** | Plain-language cause + exact next step to fix or retry; announced via `aria-live="polite"` |
| **Success** | Unmistakable confirmation + what happens next |
| **Disabled** | Visually distinct and explains why (never silently dead) |

---

## 5. Non-Designer Maintainability & Content Handoff

Non-designers will eventually update prices, menus, schedules, or photos. Build so edits don't break the design:
- **Separate repeatable data from layout:** keep menus, pricing tiers, schedules, FAQs, or catalog items in a clean structured block or data file (`data/*.json` or clearly delimited HTML/CMS schema) instead of burying text inside brittle absolute positioning.
- **Defensive layout constraints:** enforce `object-fit: cover` with defined `aspect-ratio` on all replaceable photos; use `text-wrap: balance` and fluid `clamp()` so a slightly longer client headline won't shatter the grid.
- **Editable slot inventory:** list every client-replaceable copy/image slot (`[FILL: ...]`, `<!-- REPLACE: ... -->`, `<!-- SAMPLE -->`) in the final report so the owner knows exactly what to swap before going live.
