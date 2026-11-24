# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-11-24

First formal SemVer release of `design-skills`.

### Added
- **Information Architecture, UX & Conversion** ([`ia-ux-conversion.md`](skills/maestro/references/ia-ux-conversion.md)): surface classes (`experience`, `persuade`, `operate`, `read`), multi-page sitemap & Trunk Test wayfinding, Laws of UX, conversion funnel, Baymard form UX, full UI states matrix, and non-designer content handoff.
- **Technical SEO, Core Web Vitals, WCAG 2.2 AA & Pre-Launch QA** ([`seo-perf-launch.md`](skills/maestro/references/seo-perf-launch.md)): `<head>` metadata, Open Graph, JSON-LD Schema.org, LCP/CLS/INP & image optimization pipeline, WCAG 2.2 AA checklist, and Safari/iOS guards.
- **Upgraded Browser Inspector** ([`inspect.mjs`](skills/maestro/scripts/inspect.mjs)):
  - `--surface experience|persuade|operate|read` profiles (and `surface` in `brand.json`) so app/docs/business sites aren't penalized by campaign-only rules.
  - Real Core Web Vitals measurement (`PerformanceObserver` for LCP & CLS) + transfer weight budget.
  - Automated Technical SEO (`seo-title`, `seo-lang`, `seo-meta`, `seo-og`, `seo-favicon`, `seo-schema`, `heading-order`) and WCAG 2.2 AA checks (`img-alt`, `accessible-name`, `form-label`, `landmark-main`, `img-dimensions`, `image-contrast`).
- **Curated Design Archetype System**: 15 full design-system blueprints with 70/30 blueprint evolution, multi-engine choreography (`GSAP`, `Lenis`, `Anime.js`, `Three.js/WebGL`, Canvas physics), and `brand-check.mjs` + `inspect.sh` hard gates.
- **Design Consulting Skill**: 5 consulting modes (Discovery, Audit, Decide, Translate, Brand) with surface-aware rubric and fresh-context critique protocol.
- **Modern Web Platform & Baseline Fallback Policy** ([`modern-web-platform.md`](skills/maestro/references/modern-web-platform.md)): native `<dialog>`, Popover API, CSS Anchor Positioning, `@container`, Subgrid, `text-box-trim`, CSS Scroll-Driven Animations, View Transitions, `:user-invalid`, `content-visibility`, `scheduler.yield()`, and optional `modern-web-guidance` sibling integration.
- **On-Demand Lookup CLI** ([`lookup.mjs`](skills/maestro/scripts/lookup.mjs)): token-efficient `list`, `blueprint <id>`, `search`, and `section` commands so agents fetch only the needed reference slice.
- **Legacy Web Pattern Scanner** ([`brand-check.mjs`](skills/maestro/scripts/brand-check.mjs)): flags `100vh` (`legacy-100vh`), `outline: none` without `:focus-visible` (`legacy-outline-none`), `<div onclick>` (`legacy-div-click`), and zoom-blocking viewport meta (`legacy-viewport-zoom`).
- **Eval Uplift Runner** ([`eval-compare.mjs`](scripts/eval-compare.mjs)): quantifies unguided baseline vs skill-guided delta across FAIL/WARN counts and Core Web Vitals.
- **Branding & Versioning**: dual light/dark SVG banners, standalone SVG logo (`assets/`), updated `README.md`, `package.json`, and `scripts/sync-version.mjs`.
