# Motion Playbook

Two kinds of motion live on an Awwwards site, and they follow **different rules**. Mixing them up is the most common motion mistake.

| | **Interface motion** | **Narrative motion** |
|---|---|---|
| What | Buttons, menus, modals, hovers, toasts, tabs, form feedback | Hero intro, section entrances, pinned stories, page transitions, signature moment |
| Seen | Many times per visit | Once or a few times |
| Goal | Feel instant and responsive | Tell the story, create the memorable moment |
| Duration | 100–300ms | 600–1600ms allowed |
| Priority | Never slow the user | Never block content |

Build the page **still** first. A page that needs animation to look finished is not finished. Motion is the last layer (except scroll scenes that decide composition; build those with the section).

Adapted in part from emilkowalski/skills (MIT).

---

## 1. Decision gate (answer in order before writing any animation)

### 1a. Should it animate at all? (frequency)
| How often the user triggers it | Decision |
|---|---|
| Keyboard-driven or 100+ times per session | **No animation** |
| Many times per visit (nav hover, list hover, tabs) | Minimal: colour/opacity only, ≤150ms |
| Occasional (menu open, modal, accordion) | Standard interface motion |
| Once per visit (hero intro, section entrance, signature moment) | Narrative motion allowed |

**Function check:** data the user reads or acts on (prices, charts, forms, menus) never moves for style. Cursor-tracking decoration belongs on a marketing beat, not on a price table.

### 1b. What is the purpose? (must name one)
- **Feedback:** confirms the press/hover was received
- **Continuity:** shows where something came from or went to
- **State change:** shows that something changed (loading → done)
- **Hierarchy/attention:** directs the eye to the one thing that matters now
- **Storytelling:** carries the big idea (narrative motion only)

No purpose → no animation. "Delight" is a purpose only at the once-per-visit tier.

### 1c. Which easing?
```
Default (unsure)?                    → ease-out
Entering or exiting the screen?      → ease-out (strong)
Moving/morphing while on screen?     → ease-in-out (strong)
Colour / opacity hover?              → ease, short
Constant motion (marquee, progress)? → linear
Scroll-scrubbed?                     → linear / 'none' (scroll is the easing)
Drag / gesture / interruptible?      → spring
Never                                → ease-in for UI (it delays the moment the user watches)
```

Built-in CSS keywords are too weak for deliberate motion. Canonical tokens:
```css
:root {
  --ease-out:      cubic-bezier(0.23, 1, 0.32, 1);   /* UI enters/exits */
  --ease-in-out:   cubic-bezier(0.77, 0, 0.175, 1);  /* on-screen movement, morphs */
  --ease-drawer:   cubic-bezier(0.32, 0.72, 0, 1);   /* iOS-like sheets, drawers, menus */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);    /* narrative reveals */
}
```
GSAP equivalents: `power3.out`/`quint.out` (UI), `expo.out` (narrative), `power4.inOut` (morphs).
A new curve comes from easings.dev or easings.co and is named as a token. Never hand-roll or approximate values.

### 1d. How long?
| Element | Duration |
|---|---|
| Press feedback (`:active`) | 100–160ms |
| Hover colour/underline | 150–200ms |
| Tooltip, small popover | 125–200ms |
| Dropdown, menu | 150–250ms |
| Modal, drawer, full-screen menu | 200–500ms |
| Text line reveal | 700–1000ms, stagger 60–100ms per line |
| Image reveal (clip/scale) | 1000–1600ms |
| Page transition | 500–900ms total, content visible by ~400ms |
| Preloader/intro | ≤ 2000ms total, skipped on repeat visits |

**Interface motion stays under 300ms** unless a reason is written next to it. Faster *feels* higher quality.

### 1e. Which tool / engine? (Match the chosen Awwwards reference's Motion Stack)

Do NOT treat `Lenis + GSAP` as the only animation stack. Choose the engine(s) that match the chosen reference in `awwwards-references.md` §2:

| Engine / Stack | Best For | Reference Archetypes |
|---|---|---|
| **1. CSS `transition` / `@starting-style` / View Transitions API / Scroll-Driven CSS (`animation-timeline: view()`)** | Micro-interactions, hover/press states, off-main-thread reveals, MPA/SPA page transitions | All 15 references (baseline UI layer) |
| **2. GSAP (`ScrollTrigger`, `SplitText`, `Flip`, `Draggable`, `Observer`) + Lenis** | Scroll-scrubbed `clip-path` portals, pinned horizontal filmstrips, masked line reveals, layout morphs (`Flip`) | `era-residence`, `emotion-agency`, `lxl-creative`, `onlines`, `squared-media`, `ray-corral`, `mejuma-tuscany` |
| **3. Anime.js v4 (`animate`, `stagger`, `createTimeline`, `createDraggable`, `onScroll`, SVG morph/line-drawing)** | High-density grid/tick matrices, SVG path morphing & `strokeDashoffset` engineering diagrams, spring physics, parameter playgrounds | `animejs`, `dontboardme`, `structure-eng`, `shopify-editions` |
| **4. Three.js / WebGL / Custom GLSL Shaders (`THREE.WebGLRenderer`, `ShaderMaterial`, post-processing, interactive particles/cloth/fluid)** | 3D object-field heroes, atmospheric depth planes, shader displacement on scroll/pointer, volumetric lighting, interactive 3D vessels/artifacts | `oryzo`, `santioni`, `emotion-agency`, `adobe-bowie`, `mont-fort` |
| **5. Motion (Framer Motion / `motion` vanilla) + Matter.js / 2D Canvas Physics** | Spring-driven UI, throwable/draggable sticker decks, 2D rigid-body collisions, real-time audio/acoustic waveform canvases | `dontboardme`, `shopify-editions`, `oryzo`, `animejs` |

GSAP, Anime.js, Three.js, and `requestAnimationFrame` run on the **main thread** (or WebGL context). Anything that plays during navigation, fetching or hydration (page transitions, loading indicators, tab indicators) must be CSS, WAAPI or View Transitions. Always pause off-screen WebGL/Canvas `requestAnimationFrame` loops via `IntersectionObserver` and disable heavy motion when `prefers-reduced-motion: reduce` matches.

---

## 2. Physical rules (what separates crafted from generic)

1. **Nothing appears from nothing.** Never `scale(0)`. Enter from `scale(0.9–0.97)` + `opacity: 0`, or `translateY(8–16px)`.
2. **Origin-aware.** Popovers/dropdowns scale from their trigger (`transform-origin` at the trigger edge). Modals stay centred.
3. **Exit faster than enter.** Exits ≈ 60–75% of the enter duration. Hold-to-confirm can be slow; release is always fast (≤200ms).
4. **Interruptible.** Hover/toggle states use CSS `transition` (retargets), not `@keyframes` (restarts). Toasts and toggles never use keyframes. Gestures use springs and keep velocity.
5. **Press feedback.** Every pressable: `transform: scale(0.97)` on `:active`, 120ms `--ease-out`.
6. **Stagger is short.** UI lists 30–80ms per item; display lines 60–100ms. Total sequence < 600ms. Never block interaction while staggering. Never everything at once.
7. **One motion language.** Same curves and duration family site-wide. Personality decides the family: Luxury/Ma = slower + expo; Tech/Brutalist = fast + sharp; Playful = springs with small bounce.
8. **Mask ugly crossfades.** If two states overlap visibly, add `filter: blur(2–5px)` mid-transition (stay under 20px; blur is expensive).
9. **Hover only where hover exists.** Gate hover motion in `@media (hover: hover) and (pointer: fine)`.
10. **Mirror reversible transitions.** Open with ease-out, close with the same curve reversed in time, not a different curve.

### Springs
| Use | Value |
|---|---|
| Default UI (critically damped) | Motion `{ type: 'spring', bounce: 0, duration: 0.4 }` (damping 1.0, response 0.3–0.4) |
| Drawer / sheet | damping 0.8, response 0.3 |
| After a flick or throw (momentum exists) | `bounce: 0.2` |
| Playful Maximal archetype only | `bounce: 0.15–0.3` on decorative elements; never on forms or prices |

Bounce without prior momentum reads as a toy. A calm brand never bounces.

---

## 3. Award-page motion budget

- **One signature move**, born from the big idea (see `creative-direction.md`). Max **1 heavy** narrative moment (pin/scrub/WebGL) per page.
- **Per-section entrance of the parts**, not of the block: heading, then text, then picture, staggered 60–90ms, rising 16–32px with opacity, `once: true` as the section enters.
- Vary by content type: lines mask up, images clip, numbers count or scramble, lists stagger. The same fade-up on every block is a template tell.
- **Feedback on every control:** press, hover (gated), focus.
- Content readable within ~1s of entering the viewport. Never content that stays hidden if a script or trigger fails: `inspect.sh` scrolls the page, renders with reduced motion and without JS, and FAILs hidden text.
- Disable pin/horizontal scroll below 768px unless tested on real phones.
- Custom cursor only if it carries the concept. Never on touch; never hide the native cursor over text fields.

---

## 4. Never ship (self-check before every motion commit)

| Never | Instead |
|---|---|
| `transition: all` | Name exact properties |
| `scale(0)` entrance | `scale(0.95)` + opacity 0 |
| `ease-in` on UI | `--ease-out` |
| Built-in `ease-out` on a deliberate animation | `--ease-out` token |
| Motion on a keyboard-triggered or 100+/day action | Instant |
| UI motion > 300ms without a written reason | 150–250ms |
| `transform-origin: center` on an anchored popover | Origin at the trigger edge (modals exempt) |
| `@keyframes` on toasts or toggles | `transition` (interruptible) |
| Animating `width/height/top/left/margin/padding` | `transform` (accordion height is the one tolerated case, measured in JS, never to `auto`) |
| Motion `x`/`y` shorthands under load | `transform: "translateX(...)"` string |
| Ungated `:hover` | `@media (hover: hover) and (pointer: fine)` |
| No reduced-motion branch | §6 |
| Everything entering at once | 30–80ms stagger |
| Identical fade-up on every section | Per-part entrance, varied by content type |
| Bounce/elastic in a calm brand | Critically damped |

---

## 5. Performance

### Property tiers
| Tier | Properties | Rule |
|---|---|---|
| Composite (cheap) | `transform`, `opacity`, and in current Chrome/Firefox `filter`, `clip-path` | Animate these |
| Paint | `box-shadow`, `border-radius`, `color`, `background-color` | Short and small areas only |
| Layout (expensive) | `width`, `height`, `top`, `left`, `margin`, `padding`, `font-size` | Never animate |

### Swaps
| Instead of | Use |
|---|---|
| Animated `box-shadow` | `filter: drop-shadow()` or a pseudo-element shadow faded with opacity |
| `display`/`visibility` toggles mid-animation | `opacity` (+ `pointer-events`) |
| `margin-left` on a sidebar | `translateX` (does not reflow neighbours) |
| React `setState` per frame | Write `ref.current.style.transform` |
| Animating a CSS variable on a parent with many children | `transform` on the element directly |

### Rules
- `will-change` only after you **see** a 1px shift at start/end or **measure** dropped frames. Browsers already promote transform/opacity animations; every layer costs GPU memory. It earns its place on large blurred/filtered paints. Keep the layer small.
- Large `filter: blur()` and `backdrop-filter` are expensive (Safari especially). Never animate them over big areas.
- Pause off-screen loops (IntersectionObserver). Respect `document.hidden`.
- **Budget:** 16.7ms per frame at 60Hz, **8ms at 120Hz**. Design against 8ms.
- **Verify on a real mid-range phone** (local IP + Safari Web Inspector / Chrome remote). DevTools CPU throttling models a slow CPU, not a weak GPU or small memory.

### Diagnose jank in this order
1. Animated properties (layout/paint tier?)
2. Busy main thread (hydration, fetch, long tasks during the animation)
3. Re-render per frame (framework state in the loop)
4. Gets worse as content grows (inherited CSS variable recalculation)
5. Animated CSS variable
6. Blur > 20px or `backdrop-filter` over a large area
7. Only then `will-change`

---

## 6. Accessibility: reduced motion means fewer and gentler, not zero

- **Keep:** opacity fades and colour changes (≤200ms), press feedback as colour/opacity.
- **Remove:** translation, scale, parallax, pinning, scroll-scrubbing, auto-playing loops, smooth-scroll libraries.
- Avoid slow full-viewport loops (~0.2Hz) and moving backgrounds at all times; ease light/dark switches.

Default pattern (per component):
```css
.reveal { transition: opacity 600ms var(--ease-out), transform 600ms var(--ease-out); }
@media (prefers-reduced-motion: reduce) {
  .reveal { transition: opacity 200ms ease; transform: none !important; }
  .sheet  { transition: opacity 200ms ease; transform: none; }
}
```
Global kill only as a **fallback** for third-party CSS you can't edit (it also kills feedback):
```css
@media (prefers-reduced-motion: reduce) {
  .vendor-widget *, .vendor-widget *::before, .vendor-widget *::after {
    animation-duration: 0.01ms !important; animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important; scroll-behavior: auto !important;
  }
}
```
**GSAP, WAAPI and Lenis ignore CSS media queries.** JS must branch on `matchMedia('(prefers-reduced-motion: reduce)')` (or `gsap.matchMedia()`) and set end states instantly, keeping only short fades.

Also honour `prefers-reduced-transparency` (solid surfaces, no blur) and `prefers-contrast: more` (near-solid surfaces with a border).

---

## 7. Setup (vanilla HTML)

GSAP and all its plugins (including SplitText) are free since 2025. **Before use, check the current versions on jsdelivr/cdnjs and pin exact versions.** The versions below are an example, not a recommendation:

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.20/dist/lenis.min.js"></script>
```

```js
gsap.registerPlugin(ScrollTrigger, SplitText);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

if (!reduce) {
  const lenis = new Lenis({ lerp: 0.1 });          // light smoothing, not scroll-jacking
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
```
Smooth scroll is optional. Skip it if it fights native feel (anchor links, find-in-page, trackpads). Never alter wheel speed or direction.

Hide reveal targets **only from JS** so content survives a failed script:
```html
<script>document.documentElement.classList.add('js')</script>
<style>.js [data-reveal] { opacity: 0 }</style>
```

---

## 8. Interface recipes (exact values)

| Component | Recipe |
|---|---|
| Button press | `transition: transform 120ms var(--ease-out)`; `:active { transform: scale(0.97) }` |
| Popover / dropdown | 200ms `--ease-out`, from `scale(0.95)` + opacity 0, `transform-origin` at trigger |
| Tooltip | 125ms, from `scale(0.97)` + opacity 0. Once one tooltip is open, neighbours open instantly: `[data-instant] { transition-duration: 0ms }` |
| Modal | 250ms `--ease-out`, from `scale(0.96)` + opacity 0, centred; backdrop opacity on the same timing; exit ~180ms |
| Drawer / sheet | `translateY(100%)` → 0, 500ms `--ease-drawer`; exit faster |
| Toast | 400ms `ease`, enter via `@starting-style` from `translateY(100%)`; exit to the same edge; errors persist, successes auto-dismiss 4–6s (pause on hover and when the tab is hidden) |
| Hold to confirm | overlay `clip-path: inset(0 100% 0 0)` → `inset(0)`, 2s linear while pressed; release 200ms `--ease-out` |
| Scroll reveal (block) | `clip-path: inset(0 0 100% 0)` → `inset(0)`, 600ms `--ease-in-out`, once, root margin `-100px` |
| Tabs indicator | duplicate the tab list styled active, clip it to the active tab, animate the clip 250ms `--ease-in-out` (text and background change in sync) |
| Comparison slider | `clip-path: inset(0 50% 0 0)` driven by drag |

```css
.btn { transition: transform 120ms var(--ease-out), background-color 180ms ease; }
.btn:active { transform: scale(0.97); }

@media (hover: hover) and (pointer: fine) {
  .link { background: linear-gradient(currentColor 0 0) 0 100% / 0 1px no-repeat;
          transition: background-size 220ms var(--ease-out); }
  .link:hover { background-size: 100% 1px; }
}

.menu[open] .menu-panel {
  transition: opacity 200ms var(--ease-out), transform 240ms var(--ease-drawer);
  @starting-style { opacity: 0; transform: translateY(-8px) scale(0.97); }
}
```

Page transitions: prefer the **View Transitions API** (`document.startViewTransition` for SPAs, `@view-transition { navigation: auto; }` for MPAs) with an instant swap as fallback.
Simple scroll reveals: CSS `animation-timeline: view()` inside `@supports`, GSAP for anything choreographed.

---

## 9. Narrative patterns (GSAP)

### Line-by-line headline reveal (mask)
```js
document.fonts.ready.then(() => {
  document.querySelectorAll('[data-reveal-lines]').forEach((el) => {
    const split = SplitText.create(el, { type: 'lines', mask: 'lines', autoSplit: true });
    gsap.from(split.lines, {
      yPercent: 110, duration: reduce ? 0 : 0.9, ease: 'expo.out', stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
});
```

### Section entrance by parts
```js
gsap.utils.toArray('[data-section]').forEach((sec) => {
  const parts = sec.querySelectorAll('[data-part]');           // heading, text, picture
  if (reduce) return gsap.set(parts, { opacity: 1, y: 0 });
  gsap.from(parts, { opacity: 0, y: 24, duration: 0.8, ease: 'expo.out', stagger: 0.075,
    scrollTrigger: { trigger: sec, start: 'top 80%', once: true } });
});
```

### Image clip-path reveal
```js
gsap.utils.toArray('[data-clip]').forEach((el) => {
  gsap.fromTo(el, { clipPath: 'inset(0% 0% 100% 0%)' },
    { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
  gsap.fromTo(el.querySelector('img'), { scale: 1.15 },
    { scale: 1, duration: 1.6, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
});
```

### Pinned section + horizontal scroll (desktop only)
```js
ScrollTrigger.matchMedia({
  '(min-width: 768px) and (prefers-reduced-motion: no-preference)': () => {
    const track = document.querySelector('.h-track');
    gsap.to(track, {
      x: () => -(track.scrollWidth - innerWidth), ease: 'none',
      scrollTrigger: { trigger: '.h-section', pin: true, scrub: 1,
        end: () => '+=' + track.scrollWidth, invalidateOnRefresh: true },
    });
  },
});
```

### Magnetic button (fine pointer only)
```js
if (finePointer && !reduce) document.querySelectorAll('[data-magnetic]').forEach((btn) => {
  const xTo = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
  const yTo = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });
  btn.addEventListener('pointermove', (e) => {
    const r = btn.getBoundingClientRect();
    xTo((e.clientX - r.left - r.width / 2) * 0.25);
    yTo((e.clientY - r.top - r.height / 2) * 0.25);
  });
  btn.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
});
```

### SVG line drawn on scroll
```js
document.querySelectorAll('[data-draw] path').forEach((p) => {
  const len = p.getTotalLength();
  gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: reduce ? 0 : len },
    { strokeDashoffset: 0, ease: 'none',
      scrollTrigger: { trigger: p, start: 'top 80%', end: 'bottom 40%', scrub: true } });
});
```

### Cursor-following preview (hover list)
`position: fixed` element + `gsap.quickTo` (or `anime. createAnimatable`) on `pointermove`; swap `src` on row hover; scale in from 0.9 + opacity. Fine pointer only. Preload the images. Mouse-driven decoration is always smoothed (quickTo/spring, 0.15–0.4s). Raw 1:1 feels mechanical; heavy lag feels broken.

---

## 9b. Multi-Engine Choreography Recipes (Anime.js, Three.js / WebGL, Interactive Canvas)

When the reference calls for **Anime.js**, **Three.js / WebGL shaders**, or **2D Physics / Canvas**, use these production-ready patterns (always gated by `prefers-reduced-motion` and `IntersectionObserver` so off-screen canvases pause):

### A. Anime.js — Staggered Grid / Tick Matrix & SVG Line Drawing (`animejs`, `structure-eng`, `dontboardme`)
```html
<script src="https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js"></script>
```
```js
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// 1. Staggered 2D grid / tick ripple from pointer or center
if (!reduce && typeof anime !== 'undefined') {
  anime({
    targets: '[data-grid-tick]',
    scale: [
      { value: 1.35, easing: 'easeOutSine', duration: 260 },
      { value: 1, easing: 'easeInOutQuad', duration: 500 }
    ],
    rotate: () => anime.random(-12, 12),
    delay: anime.stagger(45, { grid: [14, 6], from: 'center' }),
    autoplay: true
  });

  // 2. Precision SVG structural / topographic path drawing
  anime({
    targets: '[data-anime-draw] path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutCubic',
    duration: 1400,
    delay: anime.stagger(180)
  });
}
```

### B. Three.js / WebGL — Interactive Shader / 3D Atmospheric Stage (`oryzo`, `santioni`, `emotion-agency`, `adobe-bowie`)
Always mount the `<canvas data-webgl-stage>` behind or inside the hero composition so semantic HTML text (`<h1>`, `<p>`, `<button>`) remains crisp, accessible, and readable even if WebGL is disabled:
```html
<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"></script>
```
```js
const canvas = document.querySelector('[data-webgl-stage]');
if (canvas && typeof THREE !== 'undefined' && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.z = 3.2;

  // Custom shader plane or sculpted 3D geometry reacting to pointer & scroll
  const uniforms = {
    uTime: { value: 0 },
    uPointer: { value: new THREE.Vector2(0.5, 0.5) },
    uScroll: { value: 0 }
  };
  const geo = new THREE.PlaneGeometry(4, 2.5, 64, 64);
  const mat = new THREE.ShaderMaterial({
    uniforms,
    wireframe: true,
    transparent: true,
    vertexShader: `
      uniform float uTime;
      uniform vec2 uPointer;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 pos = position;
        float dist = distance(uv, uPointer);
        pos.z += sin(pos.x * 3.0 + uTime) * 0.12 + smoothstep(0.45, 0.0, dist) * 0.22;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      void main() {
        gl_FragColor = vec4(0.95, 0.88, 0.78, 0.28);
      }
    `
  });
  const mesh = new THREE.Mesh(geo, mat);
  scene.add(mesh);

  let isVisible = true;
  new IntersectionObserver(([entry]) => { isVisible = entry.isIntersecting; }).observe(canvas);
  window.addEventListener('pointermove', (e) => {
    uniforms.uPointer.value.set(e.clientX / innerWidth, 1.0 - e.clientY / innerHeight);
  }, { passive: true });

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas.parentElement;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  const tick = (t) => {
    if (isVisible && !document.hidden) {
      uniforms.uTime.value = t * 0.0012;
      uniforms.uScroll.value = window.scrollY / innerHeight;
      renderer.render(scene, camera);
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
```

---

## 10. Review format

When reviewing or fixing motion, use the table, then the verdict:

| Before | After | Why |
|---|---|---|
| `transition: all .3s ease-in` on menu | `opacity 200ms, transform 240ms var(--ease-drawer)` | Exact properties; ease-in delays the first movement |

Group findings by tier, highest first:
1. Feel-breaking (wrong easing, keyboard animation, `scale(0)`, dropped frames)
2. Missed simplifications (motion that should be deleted)
3. Performance
4. Interruptibility & timing
5. Origin, physicality, cohesion
6. Accessibility (reduced motion, transparency, contrast)

Fix in this order: **delete → reduce → fix easing → fix origin → make interruptible → move to composite properties → asymmetric timing → polish → accessibility and cohesion.**

End with **Block** (any tier-1 finding, or missing reduced-motion branch) or **Approve**. Cite `file:line` for each finding.

## 11. Debugging

- Slow everything 4× (`gsap.globalTimeline.timeScale(0.25)`) or play at 10% in DevTools → Animations to inspect curves, overlaps, origins.
- Test on a real phone a few years old.
- Re-review with fresh eyes the next day. Timing problems are invisible right after building.
