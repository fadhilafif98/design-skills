# Technical SEO, Performance (CWV), Accessibility & Pre-Launch QA

An award-level site that loads slowly, fails screen readers, breaks when shared on WhatsApp, or cannot be found on Google is unfinished. Apply this guide in **Phase 5 (Build)**, **Phase 7 (Stress Test)**, and **Phase 9 (Report)**.

Synthesised from Google web.dev (Core Web Vitals, Performance, Accessibility, SEO), WCAG 2.2 AA, Inclusive Components (Heydon Pickering), and Elementor's Launch Checklist.

---

## 1. Technical SEO & Social Sharing (Mandatory on Every Site)

Every HTML page must ship with complete metadata — `inspect.sh` checks these automatically:

### Required `<head>` baseline
```html
<html lang="id"> <!-- or en, matching the page copy -->
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Specific Offer — Brand Name</title> <!-- 30–60 chars, unique per page -->
  <meta name="description" content="One specific sentence naming what you offer, for whom, and where/why. 120–160 chars.">
  <link rel="canonical" href="https://example.com/"> <!-- <!-- CONFIRM: production URL --> -->
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <meta name="theme-color" content="#F3F3EC">

  <!-- Open Graph & Social Preview (WhatsApp, LinkedIn, X) -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Specific Offer — Brand Name">
  <meta property="og:description" content="Same crisp summary as meta description.">
  <meta property="og:image" content="https://example.com/assets/og-cover.jpg"> <!-- 1200×630 -->
  <meta property="og:url" content="https://example.com/">
  <meta name="twitter:card" content="summary_large_image">
</head>
```

### Semantic Structure & Structured Data (JSON-LD)
- **Landmarks:** `<header>`, `<nav aria-label="...">`, `<main id="main">`, `<footer>` (exactly one `<main>`).
- **Heading hierarchy:** exactly one visible `<h1>` per page; never skip heading levels (`h1 → h2 → h3`, never `h1 → h4` for styling — use CSS classes for visual size).
- **JSON-LD (`<script type="application/ld+json">`):** include at least one accurate Schema.org block matching the business (mark unconfirmed address/phone/URL with `<!-- CONFIRM -->`):
  - Local business / café / clinic / studio → `LocalBusiness` (or subtype: `CafeOrCoffeeShop`, `Dentist`, `LodgingBusiness`)
  - SaaS / company → `Organization` + `SoftwareApplication`
  - E-commerce / catalog → `Product` / `Offer`
  - FAQ section → `FAQPage`

---

## 2. Performance & Core Web Vitals Pipeline

Heavy AI imagery + GSAP/Lenis/Three.js will destroy Core Web Vitals unless actively budgeted.

### Targets (measured by `inspect.sh` via `PerformanceObserver`)
| Metric | Good (Pass) | Needs Work (WARN) | Poor (FAIL) |
|---|---|---|---|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s *(aim ≤ 1.5s)* | 2.5s – 4.0s | > 4.0s |
| **CLS** (Cumulative Layout Shift) | ≤ 0.10 | 0.10 – 0.25 | > 0.25 |
| **INP** (Interaction to Next Paint) | ≤ 200ms | 200ms – 500ms | > 500ms |
| **Initial transfer weight** | ≤ 1.5 MB | 1.5 – 3.5 MB | > 3.5 MB |

### Mandatory Asset & Script Rules
1. **Hero LCP image:**
   - Export/serve in **WebP or AVIF** (fallback JPG/PNG only when needed); target ≤ 200–350 KB for full-bleed hero.
   - Set explicit `width` and `height` attributes (or CSS `aspect-ratio`) to prevent CLS.
   - Add `fetchpriority="high"` and `decoding="async"` on the hero image; **never** put `loading="lazy"` on above-the-fold images.
2. **Below-the-fold images:**
   - Use `loading="lazy"` and `decoding="async"` plus explicit `width` and `height`.
   - Provide `srcset` + `sizes` whenever serving responsive widths (e.g. `640w, 1280w, 1920w`).
3. **Fonts:**
   - `<link rel="preconnect">` to font origin (or self-host `.woff2`); `font-display: swap`.
   - Preload only the primary display font if critical; never preload 6 weights.
4. **JavaScript & Motion libraries:**
   - Load GSAP/Lenis/Anime/Three.js with `defer` or dynamic `import()` so HTML and CSS paint immediately.
   - Gate WebGL/Three.js behind `prefers-reduced-motion: no-preference` and pause `requestAnimationFrame` loops when off-screen (`IntersectionObserver`) or tab hidden (`document.visibilityState`).

---

## 3. Accessibility (WCAG 2.2 AA) — Beyond Contrast

`inspect.sh` automatically checks contrast, tap targets, reduced motion, no-JS, `img[alt]`, accessible names, form labels, landmarks, and heading order. Build these in from the start:

1. **Skip link:** first focusable element inside `<body>`: `<a class="skip-link" href="#main">Skip to content</a>` (visually hidden until `:focus`).
2. **Images & SVG:**
   - Informative `<img>`: concise, meaningful `alt` describing what the image communicates.
   - Purely decorative `<img>` / `<svg>`: `alt=""` and `aria-hidden="true"`.
3. **Icon-only controls:** every button/link containing only an icon (menu toggle, close `×`, social icon, carousel arrow) must have `aria-label="..."` or `.sr-only` text.
4. **Text over photography/video:** `inspect.sh` flags `unknown-contrast` when text sits over imagery. Always place a directional scrim (`linear-gradient` darkened behind text) or solid backing plate so contrast stays ≥ 4.5:1 across the entire text bounding box.
5. **Keyboard & Overlays (Inclusive Components):**
   - Full keyboard reachability (`Tab` / `Shift+Tab`, `Enter` / `Space` on controls, `Esc` closes menus/modals/drawers).
   - Trap focus inside open modals/drawers and return focus to the triggering button on close.
   - Announce dynamic status updates (form errors, filter counts, *live thing* computed output) with `aria-live="polite"`.
6. **Forms:** every `<input>`, `<select>`, `<textarea>` paired with a visible `<label for="...">`; associate helper/error messages via `aria-describedby`.

---

## 4. Pre-Launch QA & Operational Readiness (Elementor Step 6 & 8)

Before handing over a production site (and noted in Phase 9 Report if left for the client):

1. **Functional Form & Integration:**
   - Wire forms to a real endpoint or mark clearly `<!-- CONFIRM: connect form action (Formspree / Resend / API) -->`.
   - Include a hidden honeypot field (or Turnstile/server validation) to curb spam without hurting UX.
   - Test empty submit, invalid email/phone, network failure, and success confirmation state.
2. **Analytics & Conversion Tracking:**
   - Provide a clean hook/placeholder for privacy-friendly analytics (Plausible, Umami, or GA4) and `data-track="cta-primary"` attributes on key conversion buttons so event tracking is trivial to enable.
3. **Legal & Trust Essentials:**
   - If the site collects leads, bookings, or analytics cookies, include footer links for Privacy Policy / Terms (marked `<!-- CONFIRM: legal page -->` if client supplies copy).
4. **Cross-Browser & Safari / iOS Sanity Check:**
   - `inspect.sh` runs Chromium. Explicitly verify (or guard in CSS/JS) common WebKit/Safari quirks:
     - Use `100svh` (not `100vh`) for mobile full-screen heroes.
     - Add `-webkit-backdrop-filter` alongside `backdrop-filter` if used.
     - Test `clip-path` animations and `position: sticky` inside overflow containers (`overflow: clip`, never `overflow: hidden` on sticky ancestors).
     - Ensure Lenis smooth scroll does not hijack native iOS momentum scrolling or `<select>` / modal scroll.
