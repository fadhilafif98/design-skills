# Interaction Details & Mobile Feel

Small invisible details compound. Users never notice them individually, but they feel the total.

Adapted in part from emilkowalski/skills (MIT).

## 1. Pressables (buttons, links, cards)

| Rule | Implementation |
|---|---|
| Instant press feedback | `:active { transform: scale(0.97) }`, 100–160ms `--ease-out` |
| Feedback on pointer-down, not click | Use `:active` / `pointerdown` for the visual response |
| Hover only on hover devices | `@media (hover: hover) and (pointer: fine)` (Tailwind v4 `hover:` already compiles to this) |
| Clear affordance | Links look like links (underline or distinct colour); buttons look pressable |
| Named for what happens | "Pesan meja", "Lihat menu", not "Submit" / "Learn more". Same name through the flow: button "Publish" → toast "Published" |
| Disabled ≠ invisible | Opacity ≥ 0.4 + `cursor: not-allowed` + say why nearby |
| Loading state | Keep button width fixed (`min-width`); swap label for spinner; block double-submit |
| Whole card clickable | One `<a>` with `::after { inset: 0 }` overlay, not nested links |
| Hit area | ≥ 44×44px; pad small icons with ~10px invisible hit area |

## 2. Focus & keyboard

- Every interactive element reachable by Tab, in visual order.
- `:focus-visible` ring designed, never removed: `outline: 2px solid var(--accent); outline-offset: 3px;` (check 3:1 against the ground).
- Skip link ("Langsung ke konten") as first focusable element.
- Menus/modals: trap focus, `Esc` closes, return focus to the trigger.
- **No animation on keyboard-triggered UI** (shortcuts, command palettes). Instant.

## 3. Forms

- Labels always visible (placeholder is not a label).
- Inputs ≥ 16px font (prevents iOS zoom), ≥ 44px tall.
- Correct attributes:

| Field | Attributes |
|---|---|
| Email | `type="email" autocomplete="email" autocapitalize="none" autocorrect="off" spellcheck="false"` |
| Phone / WhatsApp | `type="tel" inputmode="tel" autocomplete="tel"` |
| Amount / price | `inputmode="decimal"` |
| One-time code | `inputmode="numeric" autocomplete="one-time-code"` |
| Search | `type="search" enterkeyhint="search"` |
| Last field of a form | `enterkeyhint="send"` / `"done"` |
| Name | `autocomplete="name"` (never `autocapitalize="none"`) |

- Validate on blur, not on every keystroke. Errors sit next to the field, say what happened and how to fix it, in the interface's voice. Errors don't apologise.
- Success state is designed, not an `alert()`.
- No form backend? The primary action goes to the real destination (WhatsApp link with prefilled text, `mailto:` with subject and body). Never fake a payment form.

## 4. Mobile-native fixes (symptom → fix)

Baseline head:
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content">
<meta name="color-scheme" content="light">            <!-- or "light dark" if both are designed -->
<meta name="theme-color" content="…" media="(prefers-color-scheme: light)">
```
```css
html { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }
button, a, [role=button] { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
```
Never disable user zoom (`maximum-scale=1`, `user-scalable=no`).

| Symptom | Fix |
|---|---|
| Hover state sticks after tap | Gate hover styles in `@media (hover: hover) and (pointer: fine)` |
| Gray/blue flash on tap | `-webkit-tap-highlight-color: transparent` + your own `:active` |
| Hero cut off / jumps with browser chrome | `min-height: 100svh` on marketing heroes. **Never `100dvh` on a marketing hero** (it resizes while scrolling). `100dvh` only for app-like full screens |
| Page zooms into input | Input `font-size: 16px` minimum (`@media (pointer: coarse)` if desktop needs smaller) |
| Taps feel laggy | `touch-action: manipulation` + feedback on pointer-down |
| Inner scroller drags the page / pull-to-refresh | `overscroll-behavior: contain` on the inner scroller; `none` on root only if you own scrolling |
| Scroll janks while a gesture listener runs | Never `touchmove` + `preventDefault` (makes the listener non-passive); use `touch-action` instead |
| Content under notch / home bar | `viewport-fit=cover` + `padding-bottom: max(16px, env(safe-area-inset-bottom, 0px))` (always give `env()` a fallback inside `calc`/`max`) |
| Keyboard covers the input | `interactive-widget=resizes-content` + `scrollIntoView({ block: 'center' })` on focus |
| Long-press selects button text / shows callout | `user-select: none; -webkit-touch-callout: none` on controls (never on content) |
| Carousel scrolls the page vertically | `touch-action: pan-y` / `pan-x` on the gesture surface; prefer native `scroll-snap-type: x mandatory` over a JS spring |
| `touch-action: none` breaks scrolling | Only on surfaces that own every axis (a canvas, a map); `pan-x` on sheet handles |
| Status bar colour mismatched | `theme-color` meta per scheme |
| Text inflates in landscape | `-webkit-text-size-adjust: 100%` |
| Works in DevTools, wrong on phone | Test on a real phone a few years old: keyboard open, landscape, installed PWA (local IP + Safari Web Inspector) |

## 5. Gestures (drag, swipe, throw)

| Rule | Implementation |
|---|---|
| Capture the pointer | `el.setPointerCapture(e.pointerId)` on `pointerdown` |
| Respect the grab offset | Store `offset = pointer − elementPos` at down; never snap the element's centre to the finger |
| Velocity from history | Keep the last ~100ms of `{x, y, t}` samples; velocity = Δposition / Δtime over that window |
| Commit by velocity sign | Dismiss/commit if moving toward the target; reverse if moving away, regardless of position |
| Flick | `abs(distance) / elapsedMs > 0.11` px/ms commits even when short |
| Direction lock | ~10px hysteresis before deciding horizontal vs vertical |
| Momentum projection | `project(v, d = 0.998) = (v / 1000) * d / (1 − d)` (use 0.99 for snappier); snap to the stop nearest the projected end |
| Rubber band past an edge | `rubber(o, dim) = (o * dim * 0.55) / (dim + 0.55 * abs(o))` |
| Velocity handoff to the spring | `relativeVelocity = v / (target − current)` |
| Interruptible | Animate from the live (presentation) value, never from the old target; never lock out input mid-animation; independent X and Y springs |
| Cancel | Dragging away and back to the start cancels |
| Multi-touch guard | `if (isDragging) return` on a second pointer |
| No CSS transitions on gesture-driven elements | Springs only; CSS retargeting can't carry velocity |

## 6. Scroll behaviour

- Don't hijack scroll speed or direction. Smooth-scroll libraries smooth, never slow.
- Anchor links account for a sticky header: `scroll-margin-top: var(--header-h)`.
- Pinned sections have a clear end. Pins > 2 viewport heights need strong justification.
- Preserve scroll position on back navigation.
- Replace a 1px divider under a sticky bar with a scroll-edge fade (shadow or tone that appears only once content scrolls under it).

## 7. Cursor

- Custom cursor only when it expresses the concept (a lens for a photo studio). Keep the native cursor over text inputs and links unless the custom one clearly signals interactivity.
- Smooth the follow (quickTo/spring, 0.15–0.4s). Raw 1:1 feels mechanical; heavy lag feels broken.
- Disable on touch and with reduced motion.

## 8. The one live thing

An award page usually has one thing the visitor can do, or that differs per visit, made from the brand idea (pick a roast and read its tasting notes; set the loan and read the real monthly figure; see if the kitchen is open right now). Rules:
- Uses the subject's real content.
- Works on a phone with a thumb.
- Has a plain no-JS fallback (the information is still on the page).
- Never blocks reading; it is one thing, not a playground.

## 9. Feedback & states

Every async action: idle → pending (shown within 100ms) → success / error. Optimistic UI where safe.
Toasts enter and exit from the same edge. Errors stay until dismissed; successes auto-dismiss (4–6s), timer paused on hover and when the tab is hidden.
Empty states invite the next action. Loading keeps layout stable (skeletons sized like the content).

## 10. Theme the browser's own UI from the palette

Models skip these most reliably:
```css
::selection { background: var(--accent); color: var(--on-accent); }
:root { caret-color: var(--accent); accent-color: var(--accent); scrollbar-color: var(--muted) transparent; }
a { text-underline-offset: 0.2em; text-decoration-thickness: 1px; }
.num, table, .price { font-variant-numeric: tabular-nums; }
```

## 11. Preference signals

| Signal | Response |
|---|---|
| `prefers-reduced-motion: reduce` | See `motion-playbook.md` §6 |
| `prefers-reduced-transparency: reduce` | Solid surfaces, no `backdrop-filter` |
| `prefers-contrast: more` | Near-solid surfaces with a 1px border; muted text moves toward ink |
| `prefers-color-scheme` | Support only if both themes are designed; otherwise declare `color-scheme` so form controls match |

## 12. Wayfinding (every page answers four questions)

1. Where am I? (title, active nav state)
2. Where can I go? (visible navigation, 3–5 links)
3. What's here? (section headings that name their content)
4. How do I get out / back? (logo home link, back works, overlays close with Esc and a visible control)
