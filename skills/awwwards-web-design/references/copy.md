# Copy: words are the first design decision

A four-line headline can't be rescued by typography, and a page of slogans can't be rescued by layout. Write the whole page as plain text (a **copy deck** in `design/copy.md`) before any markup.

## 1. Write the argument first

Answer in one line each:
- Who is reading, and what do they already know?
- What is this, said the way its maker would say it to a friend?
- What single thing should the reader believe after one screen?
- What would make them believe it (a picture of the thing, a number, a name, a demonstration)?
- What do they do next?

Then list the page as **claims, one per section, each with its proof**:

```
1. Kopi yang disangrai sendiri, tiap minggu, di Dago.          → this week's roast, large
2. Setiap batch dicicip dulu sebelum dijual.                   → tasting notes + roast curve
3. Bijinya dari tiga kebun di Pangalengan, ini namanya.        → the farms, photographed
4. Buka 07.00–22.00, Jl. Ir. H. Juanda 120.                    → map, hours, button
```

A section with no claim is filler: delete it. The order of the argument is the order of the page. This is how you escape the stock order (hero, logos, features, testimonial, pricing, CTA).

## 2. Headlines: two lines or fewer, at every width

A headline is a title, held in one glance. On studied gallery sites the hero headline has a median of **5 words and about 32 characters**. `inspect.sh` fails any `h1` over two lines at any width.

Do the arithmetic before you fall in love with a sentence:

```
characters per line ≈ line width px ÷ (font size px × k)
k ≈ 0.40 condensed · 0.50 most grotesks and serifs at display size · 0.58 wide faces, all caps
```

| Where | Line width | Size | Per line | Two-line budget |
|---|---|---|---|---|
| Phone 390, 20px gutters | 350px | 44px | ~16 | **~32 chars** |
| Phone 390 | 350px | 34px | ~21 | ~42 chars |
| Tablet 768 | 690px | 64px | ~22 | ~44 chars |
| Desktop 12-col | 1100px | 104px | ~21 | ~42 chars |

- About **32 characters** survives everywhere at a confident size. Up to ~42 works if the phone size drops to the mid-30s.
- Indonesian runs 20–40% longer than English. Budget for it, don't translate an English headline and shrink it.
- Control the break: `max-width` in `ch`, `text-wrap: balance`, and an authored `<br>` where it matters (hide it under a breakpoint if it wraps on phone).
- Never fix a long headline by shrinking it. Five words at 64px beat nine words at 28px.
- Section headings: two to five words.
- **A statement is not a headline.** An intro sentence or quote set large is a `<p>` or `<blockquote>` at ≤ 36px desktop / 24px phone, about 25 words max.

## 3. Supporting line, body, buttons

- One supporting sentence directly under the headline (32–48px below it), visible with it, never held back by an animation. If the headline is a name or a figure of speech, this sentence says plainly what the thing is.
- **The first screen answers the visitor's first question in large type.** Event: what, when, where. Product: what it is and what it costs or does. Place: what, where, open when. Person: who and what they do.
- **One primary action**, a real button on the first screen, named for what happens: "Pesan meja", "Lihat menu & harga", "Coba gratis 14 hari". Never "Submit", "Get started", "Learn more".
- An action keeps its name through the flow: a "Pesan" button produces a "Pesanan diterima" message.
- Body in the full ink at 16px or more. Grey is for secondary notes.
- Every section the visitor came for (menu, rooms, schedule, price) has its own heading and its own nav link.
- **Write the full content.** The whole menu with prices, each room with its details, every talk. Thin sections are the commonest reason a clean page loses to a busier one.

## 4. Truth: what you may write

**Truth binds claims, not demonstrations.**

| Kind | Rule | Mark |
|---|---|---|
| **Claims about the business**: history, process, numbers, awards, customers, quotes, reviews, logos, press, ratings | Never invent. Use only what the user stated or confirmed | Unconfirmed: `[FILL: jumlah batch per minggu]` in the page, listed in the report |
| **Assumed brand truths** from the brief (`CONFIRM`) | May shape the concept. In copy they stay marked until confirmed | `[FILL: …]`. Never as a live sentence |
| **Sample details** where the brief leaves gaps: dish names, room names, sample prices, project titles | Write them at full fidelity so the design is judged at real density | `<!-- SAMPLE -->` in markup; listed in the report for the client to replace |
| **Pictures** | Never present a found or generated picture as the client's own product, room, dish or team | `REPLACE:` slot + credit (see `visual-craft.md` §4) |

Don't let honesty become timidity. Refusing a bold direction because its demonstration content doesn't exist yet is the wrong reflex. Build it with labelled sample content.

## 5. Voice

- Write from the visitor's side: name things by what they understand, not by how the business is organised ("Jam buka", not "Operasional").
- Active voice, plain verbs, sentence case, no filler. Each element does one job.
- Errors say what went wrong and how to fix it. They don't apologise and are never vague. An empty state is an invitation to act.
- Follow the BRAND.md voice lock: address form (kamu/Anda), canonical CTAs, the three reference lines.
- **Self-check every line:** could it appear on a competitor's site? If yes, rewrite with an item from the subject inventory.

## 6. Things that read as generated

See `tells.md` §6. Most are flagged by `brand-check.mjs`:
- genre verbs ("unlock", "solusi terbaik");
- "Not just X. It's Y.";
- tricolons;
- rhetorical questions;
- em-dash habits;
- unsourced numbers;
- "Get started".

## 7. Micro-typography

- Real quotes and apostrophes (“ ” ‘ ’).
- En dash for ranges: `07.00–22.00`, `Rp 25.000–40.000`.
- `&nbsp;` between number and unit (`1&nbsp;kg`, `Rp&nbsp;25.000`) and before the last word of key lines.
- Indonesian number format: `Rp 1.250.000`, `08.00 WIB`, `12 Okt 2026`. Use `Intl.NumberFormat('id-ID')` for anything generated.
- Set `lang` on `<html>` so hyphenation and quotes are right.

*Headline arithmetic and argument-first method adapted from leonxlnx/taste-skill (MIT); truth rule from pbakaus/impeccable (Apache-2.0); writing rules from anthropics/skills frontend-design. See NOTICE.md.*
