# Typography

Award sites are typography-led. Type is the cheapest way to look expensive and the fastest way to look like slop.

## 1. Choosing faces (a procedure, not a list)

1. **Brand first.** If the brand owns typefaces, use them (`brand.json` → `fonts.locked`). Stop here.
2. **Write three words** for the voice from the brief (e.g. *precise, unhurried, local*). Not "modern", not "elegant".
3. **Pick the class** the grammar calls for (`art-directions.md`): grotesk, neutral, humanist, geometric, condensed, wide, text serif, display serif, slab, soft.
4. **Take candidates** from `scripts/deal.mjs` (or the same classes yourself). Reject any face on the reflex list (`tells.md` §4) unless you can write a reason no other face could satisfy. "It feels like coffee" is not a reason.
5. **Verify, don't recall.** Open the official listing (fonts.google.com / fontshare.com). Confirm the face exists, has the weights and italics you need, covers the language, has tabular figures if numbers matter, and has a licence that allows the use. If you can't verify, mark it `pending verification` in DESIGN.md and say so in the report. Never invent a face.
6. **Set the hero headline in it** at real size, in the picker, and look at the screenshot before committing.

Pairing:
- **One family is normal** (a third of studied award sites use one). Two is the limit. Add mono only for real code or data tables.
- Pair by **contrast of role**: expressive display + quiet text. Two expressive faces fight; two neutral faces bore.
- One superfamily with a width or weight axis can carry the whole hierarchy.

## 2. Scale

Use a ratio with **bold contrast**. Timid scales (1.125–1.2) are a top slop signal on marketing sites.

| Ratio | Use |
|---|---|
| 1.25 | Dense product UI (not for heroes) |
| 1.333 (perfect fourth) | Calm editorial |
| 1.5 (perfect fifth) | Confident marketing |
| 1.618+ / custom jumps | Expressive, display-led |

Largest type on top-scored gallery sites: median **8.4vw** (weak sites: 5vw). Display to body: **≥ 3×**, typically 4×+. **Two or three sizes do the visible work**: one very large, one small, little in between. Five sizes per page is the ceiling (`inspect.sh` warns over 9).

The size limit is the line count, not a number: every headline **≤ 2 lines at every width** (`copy.md` §2). Size last; cut words first.

Fluid sizes with `clamp(min, preferred, max)`. Use `rem` in min/max so user font-size settings still scale.

## 3. Tracking (letter-spacing) depends on size

| Size | Tracking |
|---|---|
| Display ≥ 64px | −0.02em to −0.04em (−0.05em floor; `brand-check` warns below −0.07em) |
| Headings 32–64px | −0.01em to −0.02em |
| Body 15–20px | 0 |
| Small text 11–14px | +0.01em to +0.02em |
| All-caps (rare: a real sign, a short button) | +0.06em to +0.12em |

One `letter-spacing` value for every size is always wrong somewhere.

## 4. Leading (line-height) runs inverse to size

| Size | Line-height |
|---|---|
| Display | 0.85–1.0 (check ascenders/descenders don't collide) |
| Headings | 1.05–1.2 |
| Body | 1.5–1.65 |
| Small/UI | 1.3–1.45 |

## 5. Measure & rag

- Body: **55–72 characters** per line (`max-width: 65ch`).
- `text-wrap: balance` on headings (no widows/lonely last word).
- `text-wrap: pretty` on paragraphs.
- Left-aligned body text. Centered text only for ≤ 3 short lines.
- Never justify on the web without `hyphens: auto` and a known language (`lang` attribute set).

## 6. Details that signal craft

```css
html { -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility;
       font-optical-sizing: auto; font-kerning: normal; }
.num, table, .price { font-variant-numeric: tabular-nums; }
.display { font-feature-settings: "ss01", "liga"; } /* check what the font offers */
```
- Real typographic quotes and apostrophes: “ ” ‘ ’, not " '.
- Real dashes: en dash for ranges (2020–2026), em dash for breaks.
- `&nbsp;` between number and unit (12&nbsp;km), and to prevent orphans in key lines.
- Hanging punctuation for large pull quotes (`hanging-punctuation: first;` in Safari, or negative text-indent).
- Optical alignment: large display type often needs `margin-left: -0.05em` to look aligned with body text below.
- Italic of a serif display as a deliberate accent (one word), not random emphasis.
- Underlines: `text-underline-offset: 0.2em; text-decoration-thickness: 1px;`

## 7. Hierarchy recipe

Build every level from **size + weight + tracking + leading + color** together. Not size alone.

```
Display         clamp(3.5rem, 2rem + 9vw, 12rem), weight per font, −0.04em, lh 0.92
H2              clamp(2.25rem, 1.5rem + 3vw, 4.5rem), −0.02em, lh 1.05
H3              1.25–1.5rem, −0.01em, lh 1.2
Body            1rem–1.125rem, lh 1.6, max 65ch
Small           0.875rem, +0.01em, full ink or one step lighter (never pale grey)
```

## 8. Loading

- Self-host or use `<link rel="preconnect">` + `display=swap`.
- `<link rel="preload" as="font" type="font/woff2" crossorigin>` for the display face only.
- Subset if possible. WOFF2 only.
- Match fallback metrics (`size-adjust`, `ascent-override`) to avoid layout shift when fonts swap.
- Run SplitText **after** `document.fonts.ready`, otherwise lines split wrong.

## 9. Mobile

- Body ≥ 16px (also prevents iOS input zoom).
- Display re-tuned for 390px. Long words in big type can overflow, so test with the real headline and use `overflow-wrap: anywhere` only as a last resort. Prefer rewriting or resizing.
- Reduce negative tracking slightly on small screens.

## 10. What not to build

- No eyebrow labels above headings, no tiny tracked caps scattered around (`tells.md` §2). Put the information in the heading.
- No mono outside real code/data. No 01/02/03 unless the content is a sequence.
- No single accent word in a headline set in italic or colour.
- Running text in the full ink. A page set in soft grey reads unfinished.
