# Stress Test: Break the Design Before Users Do

Demo content is chosen to make designs look good. Real content isn't. Before declaring done, feed the page **plausible worst-case content** and fix what breaks.

Adapted in part from emilkowalski/skills `break-ui` (MIT).

## Rules

1. **Plausible, never nonsense.** "aaaaaaaa…" proves nothing. Use content a real client would actually write.
2. **Change the data, not the CSS**, to provoke breaks.
3. **Report first, then fix.** Some breaks are design decisions (truncate vs wrap) and go to the user with a recommendation.
4. **Keep the fixture** as a regression test. Re-check every state after fixing, including the demo state.

## Step 1: Map every rendered value

Before inventing cases, list what the page renders:

| Field | Source | Type | Limit | Optional? |
|---|---|---|---|---|
| Hero headline | copy deck | text | ~32 chars (2 lines at 390px) | no |
| Menu item name | CMS / JSON | text | **unbounded** | no |
| Price | CMS | number (IDR) | — | yes ("Harga di kedai") |
| Testimonial photo | upload | image | any ratio | yes |

- Limits come from the schema, DB column, API types or `maxLength`. **"Unbounded" is itself a finding.**
- Flag mismatches (a 50-char input saving into a 255-char column; a CMS field with no limit feeding a 2-line heading).
- Include the easy-to-forget: badge text, relative times, data-driven button labels, tooltips, avatars/initials, and the **length of each list**.

## Step 2: One mixed worst-case fixture + states

Build one fixture where rows 1–3 each fail differently (long name in row 1, missing image in row 2, huge number in row 3), plus these states:

| State | Content |
|---|---|
| Demo | The pretty content |
| Worst case | The mixed fixture |
| Empty | Zero items |
| One | Exactly one item ("1 items"?) |
| Huge | 1,000+ items, and exactly page size and page size + 1 |

Add a **dev-only toggle** (fixed bottom-centre, instant switch, `?data=worst|empty|one|huge`) so every state can be screenshotted with `inspect.sh "index.html?data=worst"`. Remove it before shipping or strip it in production.

## Content catalog

| Case | Example |
|---|---|
| Long headline (real language) | Indonesian/German run 30–60% longer than English: *"Pengalaman Menginap yang Menenangkan di Tengah Hutan Pinus Lembang"* |
| One-word / very short headline | *"Kopi."* |
| Long compound word | *"Tanggungjawabnya"*, *"ketidakbertanggungjawaban"*, *"Benachrichtigungseinstellungen"* |
| Long email / URL | `reservasi.kantorpusat@namaperusahaan-group.test`, a 120-char URL |
| Long name | *"Raden Ayu Kusumawardhani Prameswari Notonegoro"*, `Đặng Thị Ngọc Hân`, `王秀英`, an Arabic RTL name |
| Messy whitespace / one name | `"  Sam   Lee "`, *"Sukarno"* (single name: initials must not break) |
| Emoji / ZWJ | `🦊 Fox` (charAt gives `�`), 👨‍👩‍👧 family, flags |
| Escaping | `O'Neil`, `<script>`, `&amp;`, `**bold**` (escape once) |
| Missing optional content | No subtitle, no image, no price, no testimonial photo |
| Counts | 0, 1, 7, 1.284, 1,2 jt, `142%`, `0.1 + 0.2` |
| Price formats | `Rp 1.250.000`, `Rp 15.000/bulan`, `Rp 1,2 jt`, "Hubungi kami" instead of a number |
| Dates & time | `1970-01-01`, timezone day shift (WIB/WITA/WIT), `08.00–22.00 WIB`, relative "baru saja" vs "3 tahun lalu" |
| Uneven list lengths | One feature with 3 words, the next with 40 (breaks equal-height cards) |
| Many items | Menu with 30 items; nav with 7 links; 12 logos |
| Image aspect mismatch | Portrait where landscape was designed; tiny low-res logo; broken URL |
| Tall scripts | Vietnamese and Thai need looser line-height; CJK has no spaces to wrap on |

Use `example.com` / `.test` domains for fake addresses.

## Failure signature → fix

| What you see | Fix |
|---|---|
| Avatar/icon/action squashed by long text | `flex-shrink: 0` on the fixed item |
| Text column overflows its flex/grid cell | `min-width: 0` on the flex child / `minmax(0, 1fr)` on the track |
| Long word or URL pushes layout wide | `overflow-wrap: anywhere` (never `word-break: break-all` on prose) |
| Badge wraps onto two lines | `white-space: nowrap` on the badge, let its row wrap instead |
| Icon misaligned once text wraps | `align-items: flex-start` on the row |
| Initials wrong for emoji/compound names | `Intl.Segmenter` graphemes; first + last word; fallback glyph |
| "1 items", "1.234" vs "1,234" | `Intl.PluralRules`, `Intl.NumberFormat('id-ID', …)` |
| Dates/relative times wrong | `Intl.DateTimeFormat`, `Intl.RelativeTimeFormat` with explicit `timeZone` |
| Live numbers jitter | `font-variant-numeric: tabular-nums` |
| Button label overflows | Size by content with a `min-width`, never a fixed width |
| Broken image leaves a hole | `onerror` → initials/typographic fallback; `aspect-ratio` slot + `object-fit: cover` |
| Truncated text unreadable | `title`/tooltip with the full value |
| 1,000 items freeze the page | Paginate or virtualise |
| Headline > 2 lines at 390px | Cut words, then widen the measure, size last; `text-wrap: balance` |

## Truncate, wrap or clamp

| Content | Rule |
|---|---|
| Identifying text (names, titles, menu items) | **Wrap** |
| Secondary metadata | End-truncate with `…` + full value in `title` |
| Emails, file names, hashes | **Middle-truncate** (`reservasi.ka…group.test`) |
| Card previews / descriptions | `line-clamp: 2` (or 3) |
| Numbers, amounts, prices, dates | **Never truncate.** Reflow the layout instead |

## Environment cases

Automated by `scripts/inspect.sh` (run it on every state above):

| Case | What it measures |
|---|---|
| 1440 / 768 / 390 widths | Headline lines, overflow, contrast, tap targets, small body text, blank stretches, hidden content after scroll |
| 320px | Sideways scroll, headline lines |
| Reduced motion | Text still invisible with motion reduced |
| JavaScript disabled | `<h1>` and content visible without JS |
| Fonts / images | Failed font loads, broken images |

Still **manual** (state in the report which ones you ran):

| Case | How |
|---|---|
| Browser zoom 200% | Text must not clip or overlap |
| Larger default font | Browser default font 20px; `rem` sizes must scale |
| Large phone landscape | 844×390: short height breaks `100svh` heroes |
| Ultra-wide | 2560px: does `--max` hold? do full-bleed images pixelate? |
| Slow network | DevTools "Slow 4G": what shows before fonts/images load? Layout shift on font swap? |
| Keyboard only | Tab through everything; focus always visible; Esc closes overlays |
| Real container width | A component placed in a 280px sidebar, not only full width |
| `dir="rtl"` | If any RTL content is possible |
| Touch | Hover-only controls (e.g. a "•••" menu revealed on hover) must be reachable |
| Real device | A phone a few years old, keyboard open |

## Critical JS-reveal rule

Elements hidden for reveal animations must be hidden **by JS**, or behind a `.js` class on `<html>`, so content never stays invisible if scripts fail:
```html
<script>document.documentElement.classList.add('js')</script>
<style>.js [data-reveal] { opacity: 0 }</style>
```
`inspect.sh` FAILs the page if the `<h1>` or 3+ text elements are invisible without JS or with reduced motion.

## Report format

**Part 1: Breaks**

| # | Severity | Field | Worst-case value | What happens | Fix (file:line) |
|---|---|---|---|---|---|
| 1 | Broken | Hero headline | Long ID headline at 390px | 4 lines, CTA pushed below the fold | Cut to 5 words; `text-wrap: balance` (index.html:42) |
| 2 | Ugly | Menu card | Item without photo | Card collapses, row misaligned | Reserve `aspect-ratio` slot with typographic fallback (menu.css:18) |
| 3 | Fragile | Price | `Rp 1.250.000` | Fits today, overflows at 320px | Allow the row to wrap (menu.css:31) |

Severity: **Broken** (information lost or action blocked) · **Ugly** (works, looks wrong) · **Fragile** (holds now, breaks with slightly worse data).

**Part 2: Decisions for you** (one line each, with a recommendation)
- Menu item with no price: show "Harga di kedai" (recommended) or hide the price column?

**Part 3: What held up**
- Navigation with 7 links wraps cleanly at 320px.

Close with: `fix all` / `fix 1, 3`. After fixing, re-run `inspect.sh` on every state, including Demo.
