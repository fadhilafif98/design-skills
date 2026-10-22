# Creative Direction Engine

How to get from "website for my coffee shop" to a direction a jury remembers, **without the user making design decisions**. Asked to invent a look, a model picks the category default, or the category default's predictable opposite. Both are the rut. This engine is built to get out of it. Do every step, even on autopilot.

---

## Step 1: Inventory the subject (8–12 items)

Distinctive ideas come from facts only this business has. In blind tests, the page that won was built from an item on such a list. The pages that lost had good compositions with a category idea.

Write `design/inventory.md`. Find at least **8 items**, spread across **at least 3 of these families**. If more than three items share one family (all "coffee materials"), keep digging.

| Family | Look for | Example: kedai kopi in Bandung |
|---|---|---|
| **Name** | What the name means, its letters, its language | "Catat" = to note down |
| **Place** | Street, door number, neighbourhood, its light, weather, shop signs, tiles, paint colours | Jl. Juanda, Dago; cold 17° mornings; Dutch-era ventilation grilles |
| **Numbers** | Seats, hours, price, year, batch size, minutes from somewhere | 1 kg batches, 14 seats, since 2019 |
| **Constraint** | What it lives with: one batch a day, closed Mondays, by appointment | Roasts only Tuesday and Friday |
| **Process** | What they do differently, step by step | Each batch cupped and logged before sale |
| **Material** | What is physically touched | Kraft roast bags, a steel cupping spoon, enamel cups |
| **Ritual** | What customers repeatedly do | Regulars ask "what's roasted this week?" |
| **Artefact** | Printed things of its world: ticket, label, receipt, menu board, timetable, logbook | The handwritten roast log, the bag label |
| **People** | Who makes it, who comes | Roaster is a farmer's son from Pangalengan |

Sources, in order: the user's words, their codebase/site/Instagram, then inference. Mark every inferred item **ASSUMPTION**. Assumptions may shape the concept. In copy they stay `[FILL: …]` or `<!-- CONFIRM -->` until confirmed (`copy.md` §4).

## Step 2: Name the rut

1. If WebSearch is available, look at 3–5 real category sites ("[category] [city]", "best [category] website"). Otherwise use what you know. Don't present remembered patterns as observed findings.
2. Write two lines:
   - **The default:** what this category always ships. Coffee: cream/brown, latte-art hero, "freshly roasted", menu as a photo.
   - **The predictable opposite:** what "avoiding the default" produces. Coffee: editorial roast log with mono labels and terracotta. SaaS: "warm and human" cream instead of dark purple.

   **Both are the rut.** Your direction may use neither as its core.
3. Keep the conventions that build trust: the menu is readable, prices are visible, address and hours are easy to find.
4. Write the insight: *"Every [category] does X because they assume [assumption]. But this business's visitors [evidence], so we do Y."*

## Step 3: Match to the Curated Awwwards Reference Catalog (70/30 Rule)

Instead of guessing or polling the user across multiple throwaway concepts, match the subject directly to the **single best reference site** in `references/awwwards-references.md` and apply the **70% Reference / 30% Evolution** rule:

1. Select the reference from `awwwards-references.md` §1 whose archetype, spatial tension, and pacing best elevate this specific subject.
2. **70% Reference Foundation (Keep visually and structurally close):** Adopt its **Technical Blueprint** (`awwwards-references.md` §2):
   - **Grammar ID** (`art-directions.md`),
   - **Hero Composition** (`awwwards-patterns.md` §3),
   - **Section Rhythm** (5+ distinct section patterns, never two adjacent alike),
   - **Motion & Scroll Stack** (Lenis + GSAP ScrollTrigger / SplitText / clip-path / parallax),
   - **Color Strategy** (Step 6) and verified **Font Pairing** (`typography.md` §1).
3. **30% Creative Evolution (Develop & expand from the reference):** Evolve the reference using facts from `design/inventory.md`—introduce a bespoke interactive instrument ("the live thing"), subject-derived OKLCH hues/textures, and custom visual motifs so the final execution feels like a tailored evolution of the reference, **never a 100% 1:1 clone** and never drifting away from the reference's core concept.
4. *(Optional fallback)*: Only if the user explicitly asks to compare 3 different options, run `node <skill>/scripts/deal.mjs --brief "<subject>"` and build `templates/direction-picker.html`. Otherwise, **auto-decide the single best reference direction** and commit all engineering budget to building the final site at full Awwwards fidelity.

## Step 4: Find the idea

The reference blueprint is a way of composing and moving. The **idea** is what makes the page belong only to this subject. Write:

> On this page, **[an item from the inventory]** becomes **[the architectural device the reference blueprint and generator call for]**.

Generators:

| Generator | The page… | Example |
|---|---|---|
| **Artefact** | *is* a printed or physical thing from its world | the site reads as this shop's stamped roast log; a hotel site as its architectural aperture |
| **Process as structure** | scrolls through the real process; sections are stages | farm → roast → cup → you |
| **Place as atmosphere** | feels like being there: its light, weather, materials | Dago's 6am fog clears as you scroll; 4m basalt walls dampen street noise |
| **Ritual as interaction** | turns the customer ritual into the interaction | "what's roasted this week?" is answered live |
| **Number as hero** | makes a real number the visual centre | 14 seats, shown as the interactive floor plan you book from |
| **Name as form** | lets the letters of the name hold the content | C-A-T-A-T as five columns of the menu |
| **Opposite category** | borrows the feeling another category owns | a bakery presented like a train departure board (fresh every 40 minutes) |

Rules:
- **The competitor test:** put the nearest real competitor in the sentence. If it still works, the idea belongs to the category. "A loaf of bread" is every bakery; "the seven doors of the street it's named after" is only this one.
- "Clean and modern" is not an idea. Neither is a slogan ("Coffee made with love"). An idea implies structure, visuals and interaction.

### One live thing

Every site builds **one custom interactive instrument the visitor can use, or that differs each visit**, made from the idea. In blind tests every winning page had one, and jurors named it first. Examples:
- scrub from 76 dB street noise to 28 dB courtyard stillness and watch the acoustic waveform flatten;
- see what's roasted this week, how many bags are left, and adjust grind size to see extraction notes;
- set the loan amount and watch the real monthly figure and amortization bar update;
- switch wood species and see the chair's grain and price update live.

Rules for the live thing:
- it uses real content;
- it is designed as a **bespoke visual instrument** (custom SVG/Canvas, tactile scrubber, interactive architectural diagram), never a default browser slider or plain HTML form box;
- it works on a phone with a thumb;
- it has a plain `<noscript>` fallback;
- it never blocks reading;
- it is **not a card beside the hero headline.** It lives in the section that proves the claim, or is integrated into the hero's edge/composition.

## Step 5: Verify and lock the direction

Document the chosen direction in `design/DESIGN.md` §0 and `design/decisions.md`:

```
Reference blueprint: [Site name + URL from awwwards-references.md]
70% Reference base:  [Hero mechanism, layout skeleton, section rhythm, and motion stack kept from reference]
30% Evolution:       [Bespoke twists, live thing, and visual/structural expansions developed from subject inventory]
Idea sentence:       On this page, [inventory item] becomes [device]
Grammar · Hero:      [grammar id] · [hero composition id from awwwards-patterns.md §3]
Default avoided:     [category default] and [predictable opposite]
Section rhythm:      hero=[...] → s2=[...] → s3=[...] → s4=[...] → s5=[...] (no two adjacent alike)
Live thing:          [bespoke interactive mechanism + no-JS fallback]
Signature moment:    [choreographed GSAP/Lenis scroll or pointer move]
Safe choices:        2–3 conventions kept, and why (trust, readability)
Risks:               2–3 departures, each: what it is · why it works · what it gains · what it costs
```

Score your chosen direction 1–5 before locking:

| Criterion | Question |
|---|---|
| **Relevance** | Does it help the audience take the primary action and resolve their worry? |
| **Truth** | Is it built on an inventory item (confirmed counts more than assumed)? |
| **Distinctiveness** | Does it pass the competitor test and avoid both halves of the rut? |
| **Memorability** | Can someone describe the live thing and signature choreography an hour later? |
| **Reference fidelity** | Does the planned DOM, imagery, and motion stack match the reference's ambition? |

If any criterion scores ≤ 3, sharpen the idea or pick a stronger mechanism from `awwwards-references.md` before moving to Phase 3.

## Step 6: Tune with axes and a colour strategy

Place the brand on 5 axes (1–5) from the brief. They justify every token:

| Axis | 1 | 5 | Moves |
|---|---|---|---|
| Temperature | cold | warm | neutral hue, accent hue, image grade |
| Volume | quiet | loud | display size, contrast, accent coverage |
| Order | strict | expressive | grid visibility, asymmetry, broken-grid moments |
| Era | classic | contemporary | type class, ornament, italics |
| Pace | slow | fast | narrative durations (1.4s ↔ 0.5s), easing sharpness |

**Colour strategy** (choose one matching the reference blueprint):

| Strategy | What | Fits |
|---|---|---|
| **Restrained** | Tinted neutrals + one accent ≤ 10% | Information-dense, quiet luxury, architectural, trust-led |
| **Committed** | One saturated colour carries 30–60% of the surface | Brands that own a colour |
| **Full palette** | 3–4 named roles, each with a job | Playful, youth, events, interactive playgrounds |
| **Drenched** | The surface *is* the colour; sections change whole fields | Campaigns, launches, strong identities |

Colour commits at page scale. Take hues from the subject first: its material, its street's paint, the landscape outside, its packaging. Then check that the result isn't the third-wave look (`tells.md` §3).

**Light or dark is never a default.** Write one sentence of physical scene: *who uses this, where, under what light.*

> A commuter checking tomorrow's roast on a phone at 6am in a cold car → light ground, high contrast, large type.

Write the axes, strategy and scene sentence into DESIGN.md §0.

## Step 7: Generate bespoke AI visual assets (`image-generator`)

Award-level composition fails without photography that matches its light and scale:
1. Plan **6–8 bespoke images** across the hero, interactive showcase, material/story sections, and gallery.
2. Invoke `image-generator` with art-directed prompts specifying:
   - exact subject matter from `design/inventory.md`;
   - focal length and framing (e.g., `85mm macro detail`, `24mm architectural wide angle with strong vertical lines`, `overhead flat-lay on dark basalt`);
   - lighting and color temperature matching DESIGN.md §1 (`chiaroscuro side-lighting`, `diffused 6am highland fog`, `harsh tropical noon shadow`);
   - zero fake text, zero watermarks, zero generic stock smiles.
3. Save generated images into `assets/` and verify every image visually.

## Anti-patterns

- Adopting a reference name in `DESIGN.md` but building a static page of stacked cards, plain accordions, and default forms.
- A hero where text and image sit in separate non-interacting boxes instead of overlapping, masking, or crossing edges.
- A signature moment unrelated to the idea (a random WebGL blob). Cut it.
- Breaking a trust convention (hiding menu, prices, contact) for art. Never.
- Scraping random web stock photos instead of generating cohesive visuals with `image-generator`.
- A first screen with an idea, followed by stock blocks. Carry the reference's section rhythm and choreography into every section down to the footer.

*Inventory, idea sentence and live thing adapted from leonxlnx/taste-skill (MIT). Rut, material families and colour strategies from pbakaus/impeccable (Apache-2.0). Safe/risk split and insight template from garrytan/gstack (MIT). See NOTICE.md.*
