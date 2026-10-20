#!/usr/bin/env node
// Deals three distinct creative-direction combinations so the agent does not fall back on the category default.
// Each combination: concept generator × art-direction grammar × hero composition × colour strategy × font-class pairing.
// Usage: node deal.mjs --brief "<one line>" [--have photos,video,product-ui,stock,generated,found] [--keep palette,type] [--seed n] [--json]
// stock / generated / found count as pictures: photo-led grammars and compositions stay in the deal.
// Same brief + seed = same deal. Change --seed to redeal (log the reason in design/decisions.md).
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 ? args[i + 1] : d; };
const brief = flag('brief', '');
if (!brief) { console.error('usage: node deal.mjs --brief "<one line about the subject>" [--have photos,video,product-ui,stock,generated,found] [--keep palette,type] [--seed n] [--json]'); process.exit(2); }
const have = new Set((flag('have', '') || '').split(',').filter(Boolean));
const keep = new Set((flag('keep', '') || '').split(',').filter(Boolean));
const seed = Number(flag('seed', '1'));
const asJson = args.includes('--json');

// Seeded RNG: deterministic per brief + seed.
let h = 2166136261 ^ seed;
for (const c of brief + '#' + seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
const rand = () => { h += 0x6d2b79f5; let t = h; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const shuffle = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

const GENERATORS = {
  artefact: 'Artefact: the page is a printed thing from its world (label, ticket, logbook, menu board, timetable)',
  process: 'Process as structure: the scroll follows the real process; sections are stages',
  place: 'Place as atmosphere: its light, weather and materials become colour, texture and motion',
  ritual: 'Ritual as interaction: the customer ritual becomes the live thing',
  number: 'Number as hero: a real number becomes the visual centre and the structure',
  name: 'Name as form: the letters or meaning of the name hold the content',
  opposite: 'Opposite category: borrow the feeling another category owns',
};

// Font candidates by class. G = Google Fonts, F = Fontshare. None of these is on the reflex list in tells.md §4.
// Verify each before use: it exists on the official listing, has the weights you need, and its licence allows the use.
const FONTS = {
  grotesk: ['Hanken Grotesk (G)', 'Schibsted Grotesk (G)', 'Host Grotesk (G)', 'Bricolage Grotesque (G)', 'Rethink Sans (G)', 'Onest (G)', 'Albert Sans (G)', 'General Sans (F)', 'Switzer (F)', 'Cabinet Grotesk (F)', 'Supreme (F)', 'Author (F)'],
  neutral: ['Public Sans (G)', 'Figtree (G)', 'Inclusive Sans (G)', 'Red Hat Text (G)', 'Wix Madefor Text (G)', 'Atkinson Hyperlegible (G)', 'Karla (G)', 'Satoshi (F)'],
  humanist: ['Source Sans 3 (G)', 'Alegreya Sans (G)', 'Ranade (F)', 'Synonym (F)'],
  geometric: ['Urbanist (G)', 'Red Hat Display (G)', 'Epilogue (G)', 'Lexend (G)', 'Kumbh Sans (G)'],
  condensed: ['Big Shoulders Display (G)', 'Antonio (G)', 'Saira Condensed (G)', 'Barlow Condensed (G)', 'League Gothic (G)', 'Archivo Narrow (G)', 'Tanker (F)'],
  wide: ['Unbounded (G)', 'Krona One (G)', 'Dela Gothic One (G)', 'Syncopate (G)', 'Panchang (F)'],
  textSerif: ['Source Serif 4 (G)', 'Literata (G)', 'Spectral (G)', 'Petrona (G)', 'Gelasio (G)', 'Alegreya (G)', 'Besley (G)', 'Piazzolla (G)', 'Libre Caslon Text (G)'],
  displaySerif: ['Bodoni Moda (G)', 'Gloock (G)', 'Young Serif (G)', 'Libre Caslon Display (G)', 'Gilda Display (G)', 'Zodiak (F)', 'Gambetta (F)', 'Erode (F)', 'Sentient (F)', 'Boska (F)', 'Bespoke Serif (F)', 'Gambarino (F)'],
  slab: ['Zilla Slab (G)', 'Bitter (G)', 'Arvo (G)', 'Aleo (G)'],
  soft: ['Bagel Fat One (G)', 'Shrikhand (G)', 'Rammetto One (G)', 'Fredoka (G)', 'Gluten (G)', 'Chillax (F)', 'Pally (F)'],
  mono: ['Martian Mono (G)', 'Azeret Mono (G)', 'Fragment Mono (G)', 'Red Hat Mono (G)', 'Spline Sans Mono (G)'],
};

// Grammars mirror references/art-directions.md. pairs = [display class, text class]; needs = assets required.
const GRAMMARS = {
  structured: { name: 'Structured Grid', pairs: [['grotesk', 'grotesk'], ['grotesk', 'neutral'], ['geometric', 'neutral']], colour: ['restrained', 'committed'] },
  'quiet-luxury': { name: 'Quiet Luxury', pairs: [['displaySerif', 'neutral'], ['grotesk', 'textSerif'], ['displaySerif', 'textSerif']], colour: ['restrained', 'drenched'], needs: ['photos'] },
  raw: { name: 'Raw / Brutalist', pairs: [['condensed', 'neutral'], ['condensed', 'grotesk'], ['wide', 'grotesk']], colour: ['full', 'drenched'] },
  kinetic: { name: 'Kinetic Type', pairs: [['wide', 'neutral'], ['condensed', 'grotesk'], ['grotesk', 'grotesk']], colour: ['committed', 'drenched'] },
  craft: { name: 'Hand and Material', pairs: [['slab', 'humanist'], ['soft', 'grotesk'], ['displaySerif', 'humanist'], ['grotesk', 'textSerif']], colour: ['full', 'committed'] },
  precision: { name: 'Precision Tech', pairs: [['grotesk', 'grotesk'], ['geometric', 'neutral'], ['neutral', 'neutral']], colour: ['restrained', 'committed'] },
  cinematic: { name: 'Cinematic', pairs: [['wide', 'neutral'], ['condensed', 'neutral']], colour: ['committed', 'restrained'], needs: ['video|photos'] },
  ma: { name: 'Negative Space (Ma)', pairs: [['textSerif', 'textSerif'], ['neutral', 'neutral'], ['displaySerif', 'neutral']], colour: ['restrained'] },
  playful: { name: 'Playful Maximal', pairs: [['soft', 'neutral'], ['soft', 'geometric'], ['condensed', 'neutral']], colour: ['full', 'drenched'] },
  archive: { name: 'Archive and Collage', pairs: [['grotesk', 'textSerif'], ['textSerif', 'neutral'], ['condensed', 'neutral']], colour: ['committed', 'full'] },
  poster: { name: 'Poster Fields', pairs: [['grotesk', 'grotesk'], ['condensed', 'neutral'], ['displaySerif', 'neutral']], colour: ['drenched', 'full'] },
};
// Hero compositions mirror references/awwwards-patterns.md §3. grammars = where the composition fits.
const COMPOSITIONS = {
  'type-over-image': { grammars: ['quiet-luxury', 'cinematic', 'poster', 'kinetic', 'raw', 'clear'], needs: ['pictures'] },
  'inline-images': { grammars: ['kinetic', 'craft', 'playful', 'archive', 'structured', 'clear'], needs: ['pictures'] },
  'giant-wordmark': { grammars: ['raw', 'kinetic', 'poster', 'structured', 'precision', 'clear'] },
  'framed-picture': { grammars: ['quiet-luxury', 'ma', 'archive', 'structured', 'craft'], needs: ['pictures'] },
  filmstrip: { grammars: ['quiet-luxury', 'cinematic', 'archive', 'craft', 'structured'], needs: ['pictures'] },
  'mask-reveal': { grammars: ['cinematic', 'kinetic', 'quiet-luxury', 'poster'], needs: ['pictures'] },
  'color-field': { grammars: ['poster', 'kinetic', 'raw', 'playful', 'clear', 'craft'] },
  collage: { grammars: ['archive', 'craft', 'playful', 'raw'], needs: ['pictures'] },
  'index-hero': { grammars: ['structured', 'archive', 'raw', 'ma'] },
  'product-ui': { grammars: ['precision'], needs: ['product-ui'] },
  scene: { grammars: ['cinematic'], needs: ['video|pictures'] },
  'object-field': { grammars: ['craft', 'playful', 'poster', 'ma'] },
};
const IMAGE_LED = ['quiet-luxury', 'cinematic', 'poster', 'archive'];

const STRATEGIES = {
  restrained: 'Restrained: tinted neutrals + one accent ≤ 10%',
  committed: 'Committed: one saturated colour carries 30–60% of the surface',
  full: 'Full palette: 3–4 named roles, each with a job',
  drenched: 'Drenched: the surface is the colour; sections change whole fields',
};

const PICTURES = ['photos', 'stock', 'generated', 'found'];
const hasAsset = (need) => need.split('|').some((n) => have.has(n) || (n === 'pictures' && PICTURES.some((p) => have.has(p))) || (n === 'photos' && PICTURES.some((p) => have.has(p))));
const fits = (entry) => !(entry.needs || []).some((n) => !hasAsset(n));
const eligible = Object.entries(GRAMMARS).filter(([, g]) => fits(g)).map(([id]) => id);
let grammars = shuffle(eligible).slice(0, 3);
// With pictures available, at least one concept is picture-led: a type-only deal for a photographable subject is the generated look.
const imageLed = eligible.filter((g) => IMAGE_LED.includes(g));
if (imageLed.length && !grammars.some((g) => IMAGE_LED.includes(g))) grammars[2] = pick(imageLed);
const usedCompositions = new Set();
const dealComposition = (gid) => {
  const ok = Object.entries(COMPOSITIONS).filter(([id, c]) => fits(c) && !usedCompositions.has(id));
  const matched = ok.filter(([, c]) => c.grammars.includes(gid));
  const id = pick(matched.length ? matched : ok)[0];
  usedCompositions.add(id);
  return id;
};
const generators = shuffle(Object.keys(GENERATORS)).slice(0, 3);
const usedStrategies = new Set();
const deals = grammars.map((gid, i) => {
  const g = GRAMMARS[gid];
  const options = g.colour.filter((s) => !usedStrategies.has(s));
  const strategy = keep.has('palette') ? null : pick(options.length ? options : g.colour);
  if (strategy) usedStrategies.add(strategy);
  const [display, text] = pick(g.pairs);
  const candidates = (cls) => shuffle(FONTS[cls]).slice(0, 3);
  return {
    n: i + 1,
    generator: generators[i], generatorText: GENERATORS[generators[i]],
    grammar: gid, grammarName: g.name,
    composition: dealComposition(gid),
    colour: strategy, colourText: strategy ? STRATEGIES[strategy] : 'Kept: map the brand palette onto ground / ink / accent roles',
    type: keep.has('type') ? null : { display, displayCandidates: candidates(display), text, textCandidates: display === text ? 'same family as display' : candidates(text) },
  };
});

const out = { brief, seed, have: [...have], keep: [...keep], dealt: deals };
if (fs.existsSync('design') && fs.statSync('design').isDirectory()) fs.writeFileSync(path.join('design', 'deal.json'), JSON.stringify(out, null, 2));
if (asJson) { console.log(JSON.stringify(out, null, 2)); process.exit(0); }

console.log(`DEAL · seed ${seed} · "${brief}"${have.size ? ` · have: ${[...have].join(', ')}` : ' · no pictures (photographable subject? rerun with --have stock)'}\n`);
for (const d of deals) {
  console.log(`Concept ${d.n}`);
  console.log(`  Generator : ${d.generatorText}`);
  console.log(`  Grammar   : ${d.grammarName} (${d.grammar}), see art-directions.md, including its rut`);
  console.log(`  Hero      : ${d.composition}, see awwwards-patterns.md §3`);
  console.log(`  Colour    : ${d.colourText}`);
  if (d.type) console.log(`  Type      : display ${d.type.display} → ${d.type.displayCandidates.join(' / ')}\n              text ${d.type.text} → ${Array.isArray(d.type.textCandidates) ? d.type.textCandidates.join(' / ') : d.type.textCandidates}`);
  else console.log('  Type      : Kept: map the brand typefaces onto display / text roles');
  console.log('');
}
console.log(`Next: for each concept write the idea sentence ("On this page, [inventory item] becomes [device]"), the live thing,
and the competitor test (creative-direction.md §4). Build each concept's hero as its dealt composition, in its dealt
colour strategy and font class: the picker checklist verifies all three. Verify every font on its official listing before use.
Redeal (--seed ${seed + 1}) only for a stated reason; log it in design/decisions.md.`);
