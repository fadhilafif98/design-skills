# Tells: the dated registry

A **tell** is a device that makes a page read as generated. Most began as good ideas on good sites. They became tells by being produced by default, everywhere, with no reason. That is why this list is dated, and why it names **procedures** instead of replacement fonts, colours or components. Every published "use this instead" list became the next wave of tells within months. This skill's own earlier version recommended mono labels, numbered lists and warm cream, and those are now on this page.

Check this file whenever you write CSS, layout or copy. `scripts/brand-check.mjs` (source) and `scripts/inspect.sh` (rendered page) catch most entries. Status:
- **ban** means it fails the gate. Keep it only if the brand or the subject owns it, and then write the reason in DESIGN.md §7 and add the rule to `brand.json` → `allow`.
- **warn** means you need a one-sentence reason a designer would accept.

## 1. First wave (2023–2024)

| Tell | Status | Do instead |
|---|---|---|
| Violet/indigo/blue gradients on hero, buttons, glows | ban | Colour strategy from `creative-direction.md` §6; flat fields |
| Gradient-filled headline text | ban | Solid ink |
| Glass panels: backdrop blur, translucent cards | warn | Opaque surfaces one tone step from the ground |
| Glowing or gradient "Get started" button | ban | Flat button named for what it does |
| Soft grey shadow under every card (`0 10px 15px rgba(0,0,0,.1)`) | ban | A tone step, or no box at all |
| Three identical feature cards, icon in a tinted square on each | ban | A composition derived from the content (§5) |
| Emoji as icons or bullets | ban | Words, or a real picture |
| Centred headline + subline + two buttons + product mockup | ban | The hero your concept describes |
| Headline left + card or widget right (meter, clock, form, stat panel) | ban (measured: `hero-card`) | A composition from `awwwards-patterns.md` §3; the live thing in the section that proves it |
| Inter / Roboto / Poppins / Montserrat as the only voice | warn | Font selection procedure in `typography.md` §1 |

## 2. Second wave (2025)

| Tell | Status | Do instead |
|---|---|---|
| Eyebrow: tiny tracked uppercase label above every heading | ban | Put the information in the heading or the first sentence, or drop it |
| Pill badge above the hero headline ("New", "✨ Introducing") | ban | Say it in the supporting sentence |
| One word of a headline in italic serif, colour or underline | warn | One face, one colour; the words carry the emphasis |
| Bento grid of equal rounded tiles as the feature section | warn | A composed section with one dominant element |
| Near-black ground + one neon accent + glow | ban | A dark palette chosen from the use scene, no glow |
| Floating rounded pill nav with blur | warn | A plain bar: wordmark, 3–5 links, one action |
| Fake dashboard hero made of grey bars and donuts | ban | A real interface fragment, or no image |
| Pulsing status dot ("Available for work", "Live") | warn | Remove, unless it reports a real state |
| The same fade-up on every section | ban | Motion budget in `motion-playbook.md` |

## 3. Third wave (2025–2026): the fix that became the look

The remedy for the first two waves was "warm it up, make it editorial". Models adopted it wholesale and it is now the most recognisable generated look.

| Tell | Status | Do instead |
|---|---|---|
| Warm cream ground (near `#F4F1EA`) + high-contrast serif + terracotta / rust / clay accent | ban together; terracotta alone warn; cream alone warn (`inspect` measures it) | Colours from the subject's own material, place or product. Warmth can come from a low-chroma stone, a deep ink, a photograph or a full warm field |
| Serif display as the shortcut to "premium" | warn | Premium = restraint, space, real imagery and craft, in whatever face fits the subject |
| Broadsheet cosplay: hairlines everywhere, zero radius, dense columns | ban | Structure from space, scale and tone steps |
| Monospace micro-labels as a "technical" voice | ban outside real code and data tables | The text face; `tabular-nums` where figures align |
| Index numbering 01 / 02 / 03, "(001)", "Step 02" | ban unless the content is a real sequence the visitor needs to follow | Order by position, size, or words; `<ol>` when it is a real list |
| Meta strings joined with middle dots (`LOG · MINGGU 42 · BATCH #0418`) | warn | One plain fact in a sentence |
| `→` or `↗` appended to every link and button | warn | The verb carries the action. One arrow where direction is the meaning |
| Performative section labels: "Field notes", "On our desks", "Quietly trusted by" | warn | Plain section names a visitor would search for |
| Tinted near-black (`#0B0B0B`, `#111`) standing in for black on every project | warn | Ink chosen from the palette strategy |
| Design-tool chrome as ornament: crosshairs, crop marks, grid overlays, coordinates, local time | ban | Remove |

These are not wrong forever. A real timetable has numbers; a code product has code; a stone-paper stationer may own cream. The test is: **does the device encode information this subject has, or does it decorate?** If you could guess the look from the category alone, or from "the category, avoiding the obvious", start over.

## 4. Fonts models reach for by reflex

Avoid as the primary voice unless the brand already owns them (`brand.json` → `fonts.locked`) or you can write a reason no other face satisfies. A subject association ("serif because coffee is craft") is not a reason.

Inter, Roboto, Open Sans, Lato, Montserrat, Poppins, Raleway, Space Grotesk, Space Mono, Fraunces, Playfair Display, Cormorant (Garamond), Lora, Crimson, Newsreader, Syne, IBM Plex, DM Sans/Serif, Outfit, Plus Jakarta Sans, Instrument Sans/Serif, Geist, Mona Sans, Recoleta, Clash Display, Bebas Neue, JetBrains Mono.

`brand-check.mjs` warns on all of them (`overused-font`).

## 5. Structural tells

| Tell | Status | Do instead |
|---|---|---|
| Stock section order: hero → logos → 3 features → testimonial → pricing → CTA | warn | The order of the argument (`copy.md` §1) |
| Same layout family in adjacent sections | ban | Name each section's layout in one word; no word twice in a row |
| Distinctive hero, then stock blocks below | ban | Carry the idea into pricing, FAQ and footer |
| Everything centred | warn (> 70% of text, measured) | Left-anchored; one centred moment |
| One medium radius (12–16px) on everything | warn | Square or fully round, decided once, by hierarchy |
| Nine nearly equal font sizes | warn (> 9, measured) | Five sizes, far apart |
| Headline of 3+ lines | ban (measured) | ≤ 2 lines at every width (`copy.md` §2) |
| Timid first screen: an 80–100px headline and nothing else large | ban (measured: `timid-hero` < 20% of the fold) | One picture or the display type takes ≥ 35% |
| Three concepts on one skeleton, differing only in colour, font and copy | ban (measured: `same-skeleton`) | One dealt composition per concept |
| A photographable subject (hotel, food, place, product) shown with type and boxes only | warn (measured: `no-fold-picture`) | Stock placeholders at real scale (`visual-craft.md` §4) |
| A void: half a screen of nothing, or text huddled on one side | warn (measured) | Close every void with something on its far side |
| Invented proof: logo walls, star rows, "10,000+ teams", testimonials with stock names | ban | Real proof, or none |
| A CSS box or icon where a picture belongs | warn | A real picture, a drawing made for this subject, or a design that needs none |

## 6. Copy tells

`brand-check.mjs` flags most of these as `copy-tell`, `generic-cta`, `cadence` and `em-dash`.

- Genre verbs and adjectives: *unlock, supercharge, seamless, elevate, empower, effortless, revolutionize, next-gen, cutting-edge, best-in-class, world-class, harness, leverage, delve*. Indonesian: *solusi terbaik, terdepan, revolusioner, tingkatkan bisnis Anda, wujudkan impian, kualitas terbaik, pelayanan terbaik, nomor satu*.
- The correction: "Not just X. It's Y." / "Bukan sekadar X…"
- Tricolon headlines ("Fast. Simple. Secure.").
- Labels that say nothing: "Get started", "Learn more", "Selengkapnya", "Klik di sini".
- Rhetorical-question headlines ("Siap membawa bisnis Anda ke level berikutnya?").
- More than a handful of em dashes.
- Unsourced numbers ("10x faster", "Dipercaya 1000+ klien").

Replace with a sentence only this business could say, built from the subject inventory (`creative-direction.md` §1).

## 7. Motion tells

Identical fade-up on every block; a dozen staggered hero entrances; hover lift on every card; bounce easing outside a playful world; infinite loops that mean nothing; reveals that fail and leave a blank band (`inspect` measures this); preloaders longer than the content needs.

## 8. Removal is not enough

A page with every tell removed and nothing put in their place is an empty page with good manners. Blind comparisons keep finding that **a rich page with some tells beats a thin page with none**. The tells were filling a gap where an idea should have been. Fill that gap first, in this order:
1. the idea from the subject,
2. full content,
3. real pictures or committed type at real scale,
4. and only then the checks.

When removing an ornament leaves space, don't refill it with another ornament. Make the main thing larger, add the content that was missing, or use a picture or a field of colour.

## Quick tests

1. **Squint:** blur the screenshot. Do two or three masses lead?
2. **Logo swap:** put the nearest competitor's name on it. If it still works, the page has no idea.
3. **Five seconds:** can a stranger say what this is, for whom, and what to do?
4. **Phone:** is 390px a composition of its own, or the desktop page squeezed?
5. **Token:** does every value come from DESIGN.md?

*Sources: compiled from the tells registries of pbakaus/impeccable (Apache-2.0), leonxlnx/taste-skill (MIT), garrytan/gstack (MIT) and anthropics/skills frontend-design. See NOTICE.md.*
