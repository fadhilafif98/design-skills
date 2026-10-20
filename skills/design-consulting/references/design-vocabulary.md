# Design Vocabulary: Feeling → Levers → Prompt

Clients describe feelings. Designers and AI need levers. This table translates. The levers are **procedures**: each one is filled from the subject (its materials, place, numbers, product), never from a stock look. The "Don't default to" column lists what models reach for by reflex; using it requires a reason the subject supplies.

## 1. Feelings

| Client says | Precise meaning | Lever procedure | Don't default to | Prompt phrase |
|---|---|---|---|---|
| "Premium / expensive" | Restraint + space + quality signals | Halve the elements per screen; product or place shown large and real; slow narrative motion (900–1400ms reveals), fast UI; one accent used once or twice | Serif display on a cream ground with a gold/terracotta accent | "restraint: one dominant real image per screen, few words, generous space, slow reveals, accent only on the action" |
| "Clean" | Low element count + strong alignment | 2–3 shared left edges; no decoration; one focal point per screen | Hairline grids, thin dividers, mono labels as "structure" | "strict alignment on three edges, structure from space and tone steps, no ornaments" |
| "Modern" (ambiguous!) | Usually: big type, bold contrast, current but not trendy | Ask which reference. Then: decisive scale contrast (display ≥ 4× body), asymmetry inside the grid | Inter/Geist + dark mode + violet gradient | "oversized display type, asymmetric composition inside one grid" |
| "Friendly / approachable" | Warmth + human voice | Conversational copy in the brand's address form; real faces; one radius decided once; gentle springs (bounce 0) | Rounded cards with emoji and pastel gradients | "conversational copy, real people, one consistent radius, gentle motion" |
| "Trustworthy / professional" | Predictability + proof | Conventional navigation; real credentials next to the CTA; crisp 150–250ms interactions | Navy + gold + skyline photo | "calm and credible: conventional structure, real proof beside the action" |
| "Bold / stand out" | Scale extremes + commitment | Committed or Drenched color strategy; display at 10–14vw; one idea at full volume | Near-black with one neon accent and glow | "committed color covering most of the surface, display type at full width" |
| "Playful / fun" | Unexpected + physical | One live thing the visitor can play with, made from the product; springs with small bounce (0.15–0.3) after a throw | Stickers, emoji, rainbow gradients | "one draggable thing made from the product, springy physics, saturated committed palette from the product's packaging" |
| "Calm / peaceful" | Low motion + space + soft contrast | Fades only; small elements in large space; one rest per page | Beige + thin serif + hairlines | "vast space, fades only, colors taken from the place" |
| "Techy / precise" | Precision + real data | The real product UI as the hero; tabular numbers; fast sharp motion (≤ 250ms) | Dark ground + mono labels + scramble text + grid lines | "real interface fragment as the hero, tabular figures, sharp 200ms transitions" |
| "Artsy / creative" | Rule-breaking with intent | One deliberate break per section; cursor or scroll interaction carrying the idea | Broken grid with random rotations | "one deliberate grid break per section, interaction that carries the concept" |
| "Warm / homey / local" | The place and its hands | Real photos of the place and people; colors sampled from its materials and street; handwriting only if the owner's | Cream + terracotta + sage + paper grain | "colors sampled from the shop's own materials, real photos of the place, a drawing of its street" |
| "Cinematic / dramatic" | Full-bleed media + pacing | 100svh media, one pinned scene, slow transitions; requires real footage | Dark gradient overlays on stock video | "full-bleed real footage, one pinned scene, slow transitions" |
| "Feels cheap" (complaint) | Too many styles, weak type, default effects | Remove 30% of elements; one radius; no resting shadows; decisive type scale | — | — |
| "Feels like AI / template" (complaint) | Default patterns | Find the tells (`tells.md`); write the idea sentence from the subject inventory; replace stock sections with the argument | Swapping one tell for the next wave's tell | — |
| "Too busy" | Too many focal points | One focal point per viewport; double section spacing; fewer colors | — | — |
| "Boring / flat" | No contrast or rhythm | Bigger scale contrast; different composition per section; one signature moment | Adding gradients or shadows for "depth" | — |
| "Sluggish" | Slow/wrong easing | UI ≤ 300ms, strong ease-out, exits faster | — | — |

## 2. Color strategies (name one)

| Strategy | Means | Fits |
|---|---|---|
| **Restrained** | Tinted neutrals + one accent (≤ 10%) | Information-dense, premium, editorial |
| **Committed** | One saturated color carries 30–60% of the surface | Brands with an owned color, campaigns |
| **Full palette** | 3–4 named roles | Playful, consumer, food |
| **Drenched** | The surface is the color, section by section | Bold launches, events |

Light or dark follows the physical use scene, never a default.

## 3. Style names (what people mean)

| Term | Means |
|---|---|
| Swiss / International style | Grid-driven, sans-serif, asymmetric, objective, lots of white |
| Editorial | Magazine-like: big headlines, columns, pull quotes |
| Brutalism (web) | Raw HTML feel, thick borders, system/mono fonts, harsh contrast |
| Neo-brutalism | Brutalism + bright flat colors + hard offset shadows (templated now) |
| Minimalism | Few elements, much space. Hard because type and spacing must be perfect; an empty page is not minimal |
| Maximalism | Dense, layered, colorful, intentional chaos |
| Bento grid | Uneven tiles of features. Generic when tiles are equal |
| Glassmorphism | Frosted translucent panels. First-wave AI tell |
| Skeuomorphism | Imitates real materials/objects |
| Kinetic typography | Moving/morphing text as the main visual |
| Scrollytelling | Story told through scroll-driven scenes |
| Eyebrow / kicker | Small label above a heading. Second-wave tell |

## 4. Typography terms

| Term | Means |
|---|---|
| Display type | Large headline type (often a different font) |
| Serif / sans-serif / mono | With "feet" / without / fixed-width |
| Grotesk / grotesque | Sans-serifs with character (vs geometric like Futura) |
| Tracking | Letter-spacing across text |
| Kerning | Spacing between specific letter pairs |
| Leading | Line-height |
| Measure | Line length (ideal 45–75 characters) |
| Widow / orphan | A lonely word/line at the end or start of a paragraph or column |
| Rag | The uneven right edge of left-aligned text |
| Tabular figures | Digits of equal width so numbers align in columns and don't jitter when they change |
| Hierarchy | Order of importance shown visually |

## 5. Layout terms

| Term | Means |
|---|---|
| Above the fold | Visible without scrolling |
| Full-bleed | Edge to edge, no margin |
| Gutter | Space between grid columns |
| Whitespace / negative space | Empty space, used deliberately |
| Focal point | The element the eye goes to first |
| Rhythm | Repetition with variation across sections |
| Asymmetric split | Two columns of unequal width (e.g. 5/7) |
| Sticky / pinned | Element stays fixed while the page scrolls |

## 6. Motion terms

| Client describes | Term | Note |
|---|---|---|
| "Text slides up from behind a line" | Masked line reveal | |
| "Letters appear one by one" | Character stagger (SplitText) | |
| "Picture opens like a curtain" | Clip-path reveal | |
| "Page scrolls smoothly/buttery" | Smooth scroll (Lenis), with lerp | Smooths, never slows |
| "Section sticks then scrolls sideways" | Pinned horizontal scroll | |
| "Button pulls toward the mouse" | Magnetic hover | |
| "Image follows the cursor over a list" | Cursor-follow hover preview | |
| "Menu grows out of the button I clicked" | Origin-aware animation | `transform-origin` at the trigger; modals stay centred |
| "One thing turns into another" | Morph | vs **crossfade** (two things overlap and fade) vs **shared element transition** (same element travels between pages/states) |
| "The list rearranges smoothly" | Layout animation | |
| "It slides in from the side I swiped" | Direction-aware transition | |
| "Keep pressing to delete" | Hold to confirm | Slow fill on press (~2s linear), fast release (≤ 200ms) |
| "Swipe the card away" | Swipe to dismiss | Commit by velocity, not just distance |
| "It shakes when wrong" | Shake / wiggle | Error feedback; short |
| "It squishes when it lands" | Squash & stretch, anticipation, follow-through | Classic animation principles; playful brands only |
| "Feels fast even though it's not" | Perceptual duration | Faster easing and earlier first movement feel quicker than shorter durations |
| "Opens slowly, closes quickly" | Asymmetric timing / easing | Exits ≈ 60–75% of entrance |
| "Soft fade at the edge" | Mask (soft edge) | vs clip-path (hard edge) |
| "Grey placeholder that shimmers" | Skeleton / shimmer | |
| "Text types itself" | Typewriter | |
| "Numbers count up / roll" | Number ticker / odometer | Use tabular figures so width doesn't jump |
| "Bouncy" | Spring with bounce | Default UI springs have bounce 0 |
| "Things start fast and slow down" | Ease-out | |
| "Background moves slower than foreground" | Parallax | |
| "Text jumbles then resolves" | Scramble text | A tech-cliché; needs a reason |
| "Pages morph into each other" | Page transition / View Transitions | |
| "Elements appear one after another" | Stagger | 30–80ms per item, total < 600ms |
| "Gently breathing / pulsing" | Idle / pulse / float | Loops cost attention; pause off-screen |
| "Goes back and forth" | Alternate (yoyo) | |
| "Moves in steps, not smoothly" | Stepped animation | |
| "Stretchy at the edge when you overscroll" | Rubber-banding | |
| "It stutters / drops frames" | Jank | Usually layout properties animated, or a busy main thread |
| "Browser recalculates everything" | Layout thrashing | Reading and writing layout in a loop |
| "Smooth because the GPU does it" | Compositing | transform, opacity (and clip-path/filter in current browsers) |

## 7. Prompt pack template

```
Build [page type] for [business], audience [who], primary action [one, as a real button on the first screen].
Remember after the first screen: [one thing].
Idea: on this site, [something only this business has] becomes [device].
One live thing: [what the visitor can do, from the idea; works on a phone; has a no-JS fallback].
Scene: [who, where, light] → [light / dark] ground.
Color strategy: [Restrained / Committed / Full / Drenched], colors sampled from [subject's materials/place].
Type: [display role] at [size], tracking [value]; [body] [size]/[lh]. Headlines ≤ 2 lines (~32 characters).
Layout: one grid, equal margins; sections follow the argument: [claim → proof per section, no two adjacent alike].
Motion: [language]; interface ≤ 300ms strong ease-out; signature moment: [description]; reduced motion keeps fades.
Content: real copy in [language]; no invented proof; mark missing assets REPLACE.
Banned: eyebrow labels, mono micro-labels, 01/02 numbering, cream + terracotta, violet gradients, glass, icon cards, "Learn more", [client dislikes].
```
