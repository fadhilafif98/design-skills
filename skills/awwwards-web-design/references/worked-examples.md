# Worked Examples: the quality bar

Three briefs from three different categories, taken from prompt to a locked direction. **Match their specificity, never their content.**

Rules:
- Don't reuse an idea, grammar, colour, face, section order or headline from these examples. They exist to show the *procedure*.
- If your concept looks like one of these, it came from this page, not from your subject. Pick a fresh mechanism from `awwwards-references.md`.
- Note what each example rejects. The rejected default and predictable opposite are the lesson.

---

## A. Kedai kopi in Bandung (no own pictures)

**Prompt:** "buatkan website kedai kopi saya di Bandung"

**Questions (one batch):** main action → *Datang ke kedai* (Recommended) · what's different → *Roasting sendiri* · assets → *Logo + foto HP* · what to remember → *"Kopinya selalu baru"*.

**Inventory (excerpt, 3+ families):**
- Name: "Catat" = to note down.
- Place: Jl. Juanda, Dago; 17° mornings; 1930s shopfront with green-painted ventilation grilles (ASSUMPTION).
- Constraint: roasts only Tuesday and Friday (ASSUMPTION).
- Numbers: 14 seats.
- Ritual: regulars ask "what's roasted this week?"
- Artefact: the kraft bag label with the roast date stamped on.

**Rut:**
- Default: cream/brown, latte-art photo, "freshly roasted with love", menu as an image.
- Predictable opposite: editorial roast log with mono labels, hairlines, terracotta. **Both rejected.**

**Reference Blueprint (`awwwards-references.md`):** *Mejuma Tuscany* (`craft` / `poster`, `type-over-image` + `inline-images`).

**Chosen idea:** *On this page, **the stamped date on the roast bag** becomes **the hero and the clock of the whole site**.*
- The page counts down to the next roast day and shows what's left from the last one.
- Competitor test: another café has no roast days. ✓

**Live thing:** "Roasting berikutnya: Jumat, 2 hari lagi. Sisa dari Selasa: 6 kantong Kerinci." Interactive batch & grind-size selector built as a tactile stamped bag-label stage. No-JS fallback: the static date and batch table.

**Colour (Committed):** the green of the shopfront grilles carries ~40% of the surface. Ink is a deep roast brown; ground is a cool off-white from the morning fog. Use scene: phone in the morning, outdoors → light ground.

**First screen copy** (h1 is 29 characters, 2 lines on phone):
```
h1:     Disangrai Selasa & Jumat.
Sub:    Kedai kopi 14 kursi di Jl. Juanda, Dago. Biji kopi kami sangrai sendiri
        dua kali seminggu. Ini yang tersisa minggu ini.
Live:   [stamp] Roasting berikutnya: Jumat · Sisa: 6 kantong Kerinci
Button: Lihat menu & harga
```

**Sections:**
1. Stamp hero (`type-over-image` + inline detail crops).
2. Interactive roast-bag label & batch countdown stage (the live thing).
3. The two roast days as two drenched poster fields with parallax macro photography.
4. Menu with prices as an architectural index table.
5. The grilles, drawn in SVG, as the motif for the map and hours section.
6. Closing field in the green with the full-bleed wordmark and address.

**Pictures:** 6 bespoke AI-generated images (`image-generator`: macro roasted Kerinci beans on kraft paper, 1930s green Dutch ventilation grilles in 6am Dago fog, cupping spoon steam, enamel cup on teak counter) marked `REPLACE:` for the roaster's own photos.

---

## B. B2B software: invoicing for small shops

**Prompt:** "landing page untuk aplikasi invoice UMKM kami, namanya Lunas"

**Inventory (excerpt):**
- Name: "Lunas" = paid in full.
- Numbers: average invoice paid in 3 days vs. 14 before (user-stated).
- Artefact: the paper nota and the "LUNAS" stamp shops already use.
- Ritual: chasing customers on WhatsApp at month-end.
- Constraint: works without a laptop, on a phone.

**Rut:**
- Default: dark purple gradient, 3 feature cards with icons, logo wall.
- Predictable opposite: cream "human" fintech with serif headline and hand-drawn arrows. **Both rejected.**

**Chosen idea:** *On this page, **the LUNAS stamp** becomes **the moment every invoice on the page changes state**.*

**Live thing:** type an amount and a customer name, tap *Kirim*, and watch the real invoice render, get "sent" and get stamped *LUNAS*. All in HTML, with the product's real UI. No-JS fallback: a static sent invoice.

**Colour (Restrained):** paper white ground, ink from the product, the stamp's red as the only accent (on the action and the stamp). Use scene: a shop owner on a phone between customers → light, large type.

**First screen copy:**
```
h1:     Tagihan dibayar, bukan dikejar.
Sub:    Lunas mengirim invoice lewat WhatsApp dan mengingatkan pelanggan otomatis.
        Rata-rata tagihan pengguna kami lunas dalam 3 hari.
Button: Coba gratis 14 hari
```
The 3-day claim stays only because the user supplied it, with a source note in the report. Otherwise it would be `[FILL: …]`.

**Pictures:** real product UI crops (5) and one photo slot of a real shop counter (`REPLACE:`).

---

## C. Dental clinic in Jakarta (trust-led)

**Prompt:** "website klinik gigi, terserah kamu" → autopilot.

**Inventory (assumptions, all marked):**
- Place: Tebet, ground floor, wheelchair access.
- Constraint: one dentist, by appointment only.
- Numbers: 30-minute slots.
- Worry: pain and surprise costs.

**Rut:**
- Default: blue-white stock smiles, tooth icons, "senyum sehat".
- Predictable opposite: spa-like beige with serif "wellness". **Both rejected.**

**Chosen idea:** *On this page, **the price list and the 30-minute slot** become **the structure: every treatment is a row you can book**.*
- Trust comes from showing costs before anyone asks.
- Competitor test: most clinics hide prices. ✓

**Live thing:** pick a treatment, and the next three real free slots appear with the price. Fallback: WhatsApp link with the treatment prefilled.

**Colour (Committed):** one calm saturated colour from the clinic's signage holds the booking table; everything else is quiet. Use scene: someone anxious, at night, on a phone → light ground, high contrast, no motion surprises.

**First screen copy:**
```
h1:     Harga jelas sebelum duduk.
Sub:    Klinik gigi satu dokter di Tebet. Semua tindakan dan harganya ada di bawah,
        pilih jam yang kosong.
Button: Pilih jadwal
```

**Pictures:** no generic stock smiles. Bespoke AI-generated architectural interior and equipment photography (`image-generator`, marked `REPLACE:` for the real room and dentist), plus drawn SVG diagrams of each treatment in the palette.

---

## Why these are not slop

- Each idea passes the competitor test with a fact from its own inventory.
- Each first screen answers the visitor's first question in large type, with a real button.
- Each names its rut, both halves, and avoids it.
- Each live thing uses real content and works with a thumb.
- No invented proof. Assumptions stay marked until confirmed.
- No two examples share a grammar, colour strategy, or section order.
