# Design System: [Brand]

## 0. Decisions (don't change without a reason in decisions.md)
- **Purpose:** [audience] visitors must [1 action]
- **Worry resolved:** [their doubt] → resolved by [section/proof]
- **The one thing to remember** after the first screen: [...]
- **Idea:** On this page, **[inventory item]** becomes **[device]**
- **Competitor test:** with [nearest competitor]'s name, the idea [fails ✓ / still works ✗]
- **Rut avoided:** default = [...]; predictable opposite = [...]
- **Live thing:** [what the visitor can do / what differs each visit] · no-JS fallback: [...]
- **Signature moment:** [once-per-visit motion, from the idea]
- **Grammar:** [id from art-directions.md] · deal seed [n] · redeals: [none / reason]
- **Colour strategy:** [Restrained / Committed / Full palette / Drenched], hues from [subject source]
- **Use scene:** [who, where, under what light] → [light / dark] ground
- **Brand axes (1–5):** Temperature _ · Volume _ · Order _ · Era _ · Pace _
- **Safe choices:** [2–3 conventions kept + why]
- **Risks:** [each: what · why it works · gain · cost]
- **Imagery plan:** [own photos / generated / found (credited) / drawn / type-led because …] · real pictures planned: [n ≥ 4]

## 1. Colour
```css
:root {
  /* OKLCH. Hues from: [subject source]. Strategy: [...] */
  --ground:  oklch(__ __ __);
  --surface: oklch(__ __ __);   /* one tone step from ground; no lines between surfaces */
  --ink:     oklch(__ __ __);   /* running text: full ink */
  --ink-2:   oklch(__ __ __);   /* secondary notes only; ≥ 4.5:1 on ground */
  --accent:  oklch(__ __ __);   /* where: [action + one detail] */
  --field-1: oklch(__ __ __);   /* Committed/Drenched: the colour that carries the surface */
}
```
Contrast pairs checked (`inspect.sh`): ink/ground __:1 · ink-2/ground __:1 · ground-on-accent __:1

## 2. Typography
- Display: `[face]` ([source], verified [date] · weights [..]), tracking [−0.02 to −0.04em], leading [0.9–1.0]
- Text: `[face or same family]`, 16–20px, leading 1.45–1.6, max 65ch
- Why these faces (not a reflex default): [one line]
- Hero headline: "[text]" = [n] chars → ≤ 2 lines at 1440 / 768 / 390 ✓
```css
:root {
  --fs-small: clamp(0.875rem, 0.85rem + 0.1vw, 0.95rem);
  --fs-body:  clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --fs-h2:    clamp(2rem, 1.4rem + 2.6vw, 4rem);
  --fs-display: clamp(2.75rem, 1.5rem + 6.5vw, 9rem);  /* max set by the 2-line rule, not by taste */
  --font-display: "[face]", [generic];
  --font-text: "[face]", [generic];
}
```
Five sizes at most on a page.

## 3. Space and frame
```css
:root {
  --space-1: 0.25rem; --space-2: 0.5rem; --space-3: 1rem; --space-4: 1.5rem;
  --space-5: 2.5rem;  --space-6: 4rem;   --space-7: 7.5rem; --space-8: 15rem;
  --gutter: clamp(1rem, 3vw, 2rem);   /* one pair of equal outer margins */
  --max: 1440px;
}
```
- Grid: [12] columns desktop, [4] mobile · text shares [2–3] left edges
- Section gap: `--space-7` to `--space-8` (120–240px desktop)

## 4. Shape
- Radius: `[0 / 999px / …]`, decided by hierarchy: [rule]
- Separation: tone steps. Lines only in real tables and forms.
- Shadow: only on [menu / dialog]: `--shadow-float`

## 5. Motion
```css
:root {
  --ease-out:      cubic-bezier(0.23, 1, 0.32, 1);   /* UI enters/exits */
  --ease-in-out:   cubic-bezier(0.77, 0, 0.175, 1);  /* on-screen movement */
  --ease-drawer:   cubic-bezier(0.32, 0.72, 0, 1);   /* sheets, drawers */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);    /* narrative reveals */
  --dur-press: 120ms; --dur-ui: 200ms; --dur-overlay: 300ms;   /* interface ≤ 300ms */
  --dur-reveal: [700–1100]ms; --dur-image: [1000–1600]ms;       /* narrative, from Pace */
}
```
- Character: [e.g. calm, expo-out, no bounce]
- Signature move: [...] · Section entrances: parts staggered 60–90ms, rising 16–32px, once
- Reduced motion: opacity/colour only, no travel; GSAP/Lenis branch on `matchMedia`

## 6. Components
- Primary button: [fill, radius, label = canonical CTA] · states: hover (fine pointer only), active scale 0.97, focus-visible, disabled
- Links: [underline offset 0.2em, …]
- Navigation: wordmark + [3–5] links + one action
- Footer: [designed close: name at full width, real contact]

## 7. Banned for this project
- Every **ban** in `references/tells.md`, plus: [brand-specific]
- Allowed exceptions (with reason; mirrored in `brand.json` → `allow`): [rule: reason]
