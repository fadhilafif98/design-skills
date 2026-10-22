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

Sources, in order: the user's words, their codebase/site/Instagram, then inference. Mark every inferred item **ASSUMPTION**. Assumptions may shape the concept. In copy they stay `[FILL: …]` until confirmed (`copy.md` §4).

## Step 2: Name the rut

1. If WebSearch is available, look at 3–5 real category sites ("[category] [city]", "best [category] website"). Otherwise use what you know. Don't present remembered patterns as observed findings.
2. Write two lines:
   - **The default:** what this category always ships. Coffee: cream/brown, latte-art hero, "freshly roasted", menu as a photo.
   - **The predictable opposite:** what "avoiding the default" produces. Coffee: editorial roast log with mono labels and terracotta. SaaS: "warm and human" cream instead of dark purple.

   **Both are the rut.** Your concepts may use neither as their core.
3. Keep the conventions that build trust: the menu is readable, prices are visible, address and hours are easy to find.
4. Write the insight: *"Every [category] does X because they assume [assumption]. But this business's visitors [evidence], so we do Y."*

## Step 3: Deal, don't pick

Your favourite direction is the category default in disguise. Let a die choose the raw material, then use judgement:

```bash
node <skill>/scripts/deal.mjs --brief "<one line about the subject>" [--have photos,video,product-ui] [--keep palette,type] [--seed n]
```

It deals **three different combinations**, each with:
- a concept generator (Step 4),
- an art-direction grammar (`art-directions.md`),
- a colour strategy (Step 6),
- a font-class pairing with candidate faces (verify every face before use, see `typography.md` §1).

A redeal is allowed only for a reason you can state: it needs an asset that doesn't exist, it contradicts a LOCKED brand element, or two concepts collapsed into one. Never redeal for comfort. Log every redeal in `decisions.md`.

If Node is unavailable, choose three generators and three grammars yourself that share **no** generator, grammar or colour strategy, and say so.

## Step 4: Find the idea

The direction is a way of composing. The idea is what makes the page belong to this subject. For each dealt combination, write:

> On this page, **[an item from the inventory]** becomes **[the device the generator and grammar call for]**.

Generators:

| Generator | The page… | Example |
|---|---|---|
| **Artefact** | *is* a printed thing from its world | the site reads as this shop's roast log; a hotel site as its room key folder |
| **Process as structure** | scrolls through the real process; sections are stages | farm → roast → cup → you |
| **Place as atmosphere** | feels like being there: its light, weather, materials | Dago's 6am fog clears as you scroll |
| **Ritual as interaction** | turns the customer ritual into the interaction | "what's roasted this week?" is the hero, answered live |
| **Number as hero** | makes a real number the visual centre | 14 seats, shown as the floor plan you book from |
| **Name as form** | lets the letters of the name hold the content | C-A-T-A-T as five columns of the menu |
| **Opposite category** | borrows the feeling another category owns | a bakery presented like a train timetable (fresh every 40 minutes) |

Rules:
- **The competitor test:** put the nearest real competitor in the sentence. If it still works, the idea belongs to the category. "A loaf of bread" is every bakery; "the seven doors of the street it's named after" is only this one.
- Spend at most **one** of the three concepts on the brief's literal metaphor.
- "Clean and modern" is not an idea. Neither is a slogan ("Coffee made with love"). An idea implies structure, visuals or interaction.

### One live thing

Every concept names **one thing the visitor can do, or that differs each visit**, made from the idea. In blind tests every winning page had one, and jurors named it first. Examples:
- type your name and see it on the roast-bag label;
- see what's roasted this week and how many bags are left;
- set the loan amount and read the real monthly figure;
- pick a wood and see the chair in it.

Rules for the live thing:
- it uses real content;
- it works on a phone with a thumb;
- it has a plain no-JS fallback;
- it never blocks reading;
- it is one thing, not a playground;
- it is **not a card beside the hero headline.** It lives in the section that proves the claim, or it is part of the hero's composition (a word in the headline that changes, a bar along the picture's edge).

## Step 5: Write, score, and split safe from risk

Write each concept as:

```
Name:              evocative, never "Option A"
Idea sentence:     On this page, [inventory item] becomes [device]
Generator · grammar · colour strategy:  (from the deal)
Default avoided:   [category default] and [predictable opposite]
Composition:       [the dealt hero composition, awwwards-patterns.md §3, and how this subject fills it]
Live thing:        [one interaction]
Signature moment:  [the once-per-visit motion moment, from the idea]
First screen:      [what you see, in one line]
Safe choices:      2–3 conventions kept, and why (trust, readability)
Risks:             2–3 departures, each: what it is · why it works · what it gains · what it costs
```

Score each concept 1–5:

| Criterion | Question |
|---|---|
| **Relevance** | Does it help the audience take the primary action and resolve their worry? |
| **Truth** | Is it built on an inventory item (confirmed counts more than assumed)? |
| **Distinctiveness** | Does it pass the competitor test and avoid both halves of the rut? |
| **Memorability** | Can someone describe the live thing or signature moment in one sentence an hour later? |
| **Feasibility** | Can it be built well with real assets, honest found pictures, or drawing? |

Discard anything ≤ 2 on Relevance or Feasibility.

**Swap test:** if you could swap the headlines between two concepts without anyone noticing, they are one concept. Redeal one.

Recommend the highest total; ties go to Truth. Present all three as equals in the picker, with your recommendation stated, not pre-selected.

## Step 6: Tune with axes and a colour strategy

Place the brand on 5 axes (1–5) from the brief. They justify every token:

| Axis | 1 | 5 | Moves |
|---|---|---|---|
| Temperature | cold | warm | neutral hue, accent hue, image grade |
| Volume | quiet | loud | display size, contrast, accent coverage |
| Order | strict | expressive | grid visibility, asymmetry, broken-grid moments |
| Era | classic | contemporary | type class, ornament, italics |
| Pace | slow | fast | narrative durations (1.4s ↔ 0.5s), easing sharpness |

**Colour strategy** (choose one; the deal proposes one):

| Strategy | What | Fits |
|---|---|---|
| **Restrained** | Tinted neutrals + one accent ≤ 10% | Information-dense, trust-led |
| **Committed** | One saturated colour carries 30–60% of the surface | Brands that own a colour |
| **Full palette** | 3–4 named roles, each with a job | Playful, youth, events |
| **Drenched** | The surface *is* the colour; sections change whole fields | Campaigns, launches, strong identities |

Colour commits at page scale. Take hues from the subject first: its material, its street's paint, the landscape outside, its packaging. Then check that the result isn't the third-wave look (`tells.md` §3).

**Light or dark is never a default.** Write one sentence of physical scene: *who uses this, where, under what light.*

> A commuter checking tomorrow's roast on a phone at 6am in a cold car → light ground, high contrast, large type.

Write the axes, strategy and scene sentence into DESIGN.md §0.

## Step 7: Show, don't describe

Non-designers can't judge concepts from text. Build the direction picker (`templates/direction-picker.html`). Show each concept's **real first screen**, built as its dealt composition:
- real copy;
- its own tokens and fonts;
- its real pictures (own, or stock placeholders) at their real size;
- one dominant thing, type and picture touching;
- a hint of the signature moment;
- its live thing as a working stub on a **second screen** under the hero, never as a card beside the headline.

Run `inspect.sh` on each variant (`--widths 1440 --no-extra --shots fold`) and look at each fold shot before showing the user. `same-skeleton` fails when two concepts share one first-screen shape: that is one concept. The user chooses by looking. Autopilot takes the top score, but still saves the picker so they can switch.

## Anti-patterns

- Concepts that differ only in colour or copy. That is one concept. So are three heroes with the same skeleton (headline left, card right) in different colours.
- A signature moment unrelated to the idea (a random WebGL blob). Cut it.
- Breaking a trust convention (hiding menu, prices, contact) for art. Never.
- A direction that needs assets the user doesn't have, with no honest way to fill them.
- A first screen with an idea, followed by stock blocks. Carry the idea into every section.

*Inventory, idea sentence and live thing adapted from leonxlnx/taste-skill (MIT). Rut, material families and colour strategies from pbakaus/impeccable (Apache-2.0). Safe/risk split and insight template from garrytan/gstack (MIT). See NOTICE.md.*
