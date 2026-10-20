# Brand: [Brand name]

Source of truth: [brand book / user statements / existing site / this project's concept]
Last changed: [YYYY-MM-DD], see design/decisions.md
Machine-readable twin: design/brand.json (keep in sync)

## 1. Core (LOCKED)
- **Name:** [exact spelling + casing, e.g. "Kopi Catat", never "KopiCatat" or "KOPI CATAT" in body text]
- **Promise:** [one sentence the brand always delivers]
- **Brand truth:** [the fact the concept is built on]
- **Personality:** like [person]. IS [3 words]. IS NOT [3 words].

## 2. Logo (LOCKED)
- Files: `[path/logo.svg]` (primary), `[path/logo-mark.svg]` (mark), `[path/logo-light.svg]` (on dark)
- Minimum width: [__]px digital
- Clear space: [= height of the mark] on all sides
- Allowed backgrounds: [--bg, --ink, --accent]
- Never: stretch, recolor, rotate, add shadow/outline/gradient, animate in a way that distorts it, place on busy photos without a scrim

## 3. Color
| Token | Value | Level | Allowed roles |
|---|---|---|---|
| --brand-primary | oklch(__) /* original: #____ */ | LOCKED | [backgrounds, CTA] |
| --ink | oklch(__) | LOCKED | text |
| --bg | oklch(__) | FLEXIBLE (L 0.95–0.98) | page background |
| --accent | oklch(__) | LOCKED hue / FLEXIBLE coverage (2–10%) | [where] |

Rule: no color in code outside these tokens.

## 4. Typography
| Role | Family | Weights | Level |
|---|---|---|---|
| Display | [font] | [__] | LOCKED |
| Body | [font] | [__] | LOCKED |
| Mono/label | [font] | [__] | FLEXIBLE (may be removed) |

Display size range: [clamp min–max] (FLEXIBLE within range)

## 5. Voice (LOCKED rules, FREE wording)
- Address form: **[kamu / Anda]**. Never: [the other forms]
- Headline case: [sentence case]
- Sentence length: [short, ≤ 14 words in headlines]
- Emoji: [none] · Exclamation marks: [max 1 per page]
- Number/currency format: [Rp 25.000 · 08.00–17.00 WIB]
- Preferred terms: [brand's own words, product names]
- Banned words: [brand-specific] + copy tells (references/tells.md §6)
- Canonical CTA labels: primary "[__]", secondary "[__]"

| IS | Do | Don't |
|---|---|---|
| [precise] | "[example]" | "[example]" |
| [warm] | | |
| [unhurried] | | |

Reference lines (new copy must sound like these):
- Hero: "[...]"
- CTA: "[...]"
- Error/empty state: "[...]"

## 6. Imagery (LOCKED rules)
- Subjects: [real products, real place, real team; no stock people]
- Grade: [warm, medium contrast, light grain]
- Crop: [tight details, 4:5 and 16:9 only]
- Banned: [3D blobs, AI-generated people, generic laptop shots]

## 7. Shape & motion
- Radius: [__] (LOCKED) · Icon stroke: [1.5px]
- Motion character: [calm, expo-out, no bounce] (LOCKED)
- Pace: [narrative 900–1400ms] (FLEXIBLE within range)

## 8. Flexible bounds (what feedback may change without asking)
- [accent coverage 2–10%]
- [display size within range]
- [section patterns, image crops, motion pace within range]

## 9. Change log
| Date | Item | From → To | Approved by | Reason |
|---|---|---|---|---|
