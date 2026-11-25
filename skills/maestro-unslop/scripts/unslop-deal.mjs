#!/usr/bin/env node
// Deterministic anti-slop replacement dealer for maestro-unslop.
// Deals: surface profile, visual/effect guardrails, non-reflex font pairing, OKLCH palette,
// hero composition, 1-2 dealt moments, and a non-repeating section layout sequence.
// Usage: node unslop-deal.mjs --kind <software|tech|gaming|product|service|place> --brief "<one line>" [--keep palette,type] [--seed n] [--json]
import { pathToFileURL } from 'node:url';

export const VALID_KINDS = ['software', 'tech', 'gaming', 'product', 'service', 'place'];

// Non-reflex Google Fonts & Fontshare candidates (zero overlap with reflex font blocklist).
const FONT_PAIRS = {
  software: [
    { display: 'Schibsted Grotesk (G)', body: 'Schibsted Grotesk (G)', mono: 'Fragment Mono (G)' },
    { display: 'Hanken Grotesk (G)', body: 'Figtree (G)', mono: 'Azeret Mono (G)' },
    { display: 'Host Grotesk (G)', body: 'Public Sans (G)', mono: 'Spline Sans Mono (G)' },
    { display: 'Switzer (F)', body: 'Switzer (F)', mono: 'Red Hat Mono (G)' },
  ],
  tech: [
    { display: 'Unbounded (G)', body: 'Public Sans (G)', mono: 'Martian Mono (G)' },
    { display: 'Cabinet Grotesk (F)', body: 'Albert Sans (G)', mono: 'Azeret Mono (G)' },
    { display: 'Red Hat Display (G)', body: 'Red Hat Text (G)', mono: 'Red Hat Mono (G)' },
    { display: 'Barlow Condensed (G)', body: 'Onest (G)', mono: 'Fragment Mono (G)' },
  ],
  gaming: [
    { display: 'Big Shoulders Display (G)', body: 'Onest (G)', mono: 'Martian Mono (G)' },
    { display: 'Panchang (F)', body: 'Figtree (G)', mono: 'Spline Sans Mono (G)' },
    { display: 'Antonio (G)', body: 'Rethink Sans (G)', mono: 'Azeret Mono (G)' },
  ],
  product: [
    { display: 'Bricolage Grotesque (G)', body: 'Source Sans 3 (G)', mono: null },
    { display: 'General Sans (F)', body: 'Karla (G)', mono: null },
    { display: 'Young Serif (G)', body: 'Figtree (G)', mono: null },
    { display: 'Epilogue (G)', body: 'Inclusive Sans (G)', mono: null },
  ],
  service: [
    { display: 'Source Serif 4 (G)', body: 'Source Sans 3 (G)', mono: null },
    { display: 'Hanken Grotesk (G)', body: 'Public Sans (G)', mono: null },
    { display: 'Literata (G)', body: 'Albert Sans (G)', mono: null },
    { display: 'Satoshi (F)', body: 'Atkinson Hyperlegible (G)', mono: null },
  ],
  place: [
    { display: 'Bricolage Grotesque (G)', body: 'Karla (G)', mono: null },
    { display: 'Gelasio (G)', body: 'Source Sans 3 (G)', mono: null },
    { display: 'Zodiak (F)', body: 'Figtree (G)', mono: null },
    { display: 'Rethink Sans (G)', body: 'Rethink Sans (G)', mono: null },
  ],
};

// Trade-appropriate OKLCH palettes — avoids violet-neon (W1) and cream+terracotta (W3).
const PALETTES = {
  software: [
    { name: 'Blueprint Slate', ground: 'oklch(0.985 0.004 250)', surface: 'oklch(0.955 0.008 250)', ink: 'oklch(0.18 0.02 255)', accent: 'oklch(0.52 0.16 250)' },
    { name: 'Carbon & Signal Amber', ground: 'oklch(0.15 0.01 255)', surface: 'oklch(0.21 0.014 255)', ink: 'oklch(0.96 0.006 250)', accent: 'oklch(0.76 0.15 72)' },
    { name: 'Chalk & Cobalt', ground: 'oklch(0.99 0.002 240)', surface: 'oklch(0.95 0.006 240)', ink: 'oklch(0.16 0.015 260)', accent: 'oklch(0.47 0.19 262)' },
  ],
  tech: [
    { name: 'Graphite & Oxide Green', ground: 'oklch(0.14 0.008 220)', surface: 'oklch(0.20 0.012 220)', ink: 'oklch(0.96 0.005 220)', accent: 'oklch(0.72 0.14 155)' },
    { name: 'Lab Porcelain & Crimson', ground: 'oklch(0.98 0.003 210)', surface: 'oklch(0.94 0.006 210)', ink: 'oklch(0.17 0.012 225)', accent: 'oklch(0.53 0.19 24)' },
    { name: 'Steel & Cobalt', ground: 'oklch(0.16 0.014 248)', surface: 'oklch(0.22 0.018 248)', ink: 'oklch(0.95 0.008 248)', accent: 'oklch(0.66 0.17 245)' },
  ],
  gaming: [
    { name: 'Obsidian & Vermilion', ground: 'oklch(0.13 0.01 25)', surface: 'oklch(0.19 0.016 25)', ink: 'oklch(0.96 0.008 60)', accent: 'oklch(0.62 0.21 29)' },
    { name: 'Deep Pine & Gold', ground: 'oklch(0.15 0.025 160)', surface: 'oklch(0.22 0.03 160)', ink: 'oklch(0.96 0.01 95)', accent: 'oklch(0.78 0.15 86)' },
  ],
  product: [
    { name: 'Cool Stone & Forest', ground: 'oklch(0.975 0.005 165)', surface: 'oklch(0.935 0.01 165)', ink: 'oklch(0.19 0.02 165)', accent: 'oklch(0.42 0.11 155)' },
    { name: 'Crisp Paper & Navy', ground: 'oklch(0.99 0.002 250)', surface: 'oklch(0.945 0.008 250)', ink: 'oklch(0.20 0.035 255)', accent: 'oklch(0.38 0.12 255)' },
    { name: 'Mist & Ochre', ground: 'oklch(0.97 0.006 230)', surface: 'oklch(0.925 0.01 230)', ink: 'oklch(0.18 0.015 235)', accent: 'oklch(0.60 0.14 78)' },
  ],
  service: [
    { name: 'Pure White & Deep Ink', ground: 'oklch(0.995 0.002 240)', surface: 'oklch(0.955 0.006 240)', ink: 'oklch(0.18 0.025 250)', accent: 'oklch(0.45 0.12 240)' },
    { name: 'Cool Linen & Slate Teal', ground: 'oklch(0.975 0.005 200)', surface: 'oklch(0.935 0.01 200)', ink: 'oklch(0.19 0.02 205)', accent: 'oklch(0.46 0.10 198)' },
    { name: 'Alabaster & Burgundy', ground: 'oklch(0.985 0.003 15)', surface: 'oklch(0.945 0.007 15)', ink: 'oklch(0.18 0.02 15)', accent: 'oklch(0.42 0.13 15)' },
  ],
  place: [
    { name: 'Daylight Chalk & Olive', ground: 'oklch(0.985 0.005 115)', surface: 'oklch(0.94 0.012 115)', ink: 'oklch(0.19 0.02 120)', accent: 'oklch(0.44 0.10 125)' },
    { name: 'Crisp White & Espresso Ink', ground: 'oklch(0.99 0.003 70)', surface: 'oklch(0.945 0.008 70)', ink: 'oklch(0.21 0.03 55)', accent: 'oklch(0.45 0.11 245)' },
    { name: 'Sea Fog & Deep Spruce', ground: 'oklch(0.975 0.006 190)', surface: 'oklch(0.93 0.012 190)', ink: 'oklch(0.18 0.025 190)', accent: 'oklch(0.40 0.09 182)' },
  ],
};

const CONFIG = {
  software: {
    surface: 'persuade',
    heroes: ['live-ui-split', 'centred-app-frame', 'asymmetric-ui-stage'],
    moments: ['live-ui-frame', 'pulse-diagram', 'telemetry-strip'],
    sections: ['hero', 'ui-stage', 'asymmetric-proof', 'diagram-band', 'pricing-ledger', 'closing'],
    radius: '6px (crisp technical)',
  },
  tech: {
    surface: 'persuade',
    heroes: ['anchor-hardware-stage', 'editorial-spec-hero', 'full-bleed-system'],
    moments: ['telemetry-strip', 'pulse-diagram', 'ambient-canvas', 'aperture-reveal'],
    sections: ['hero', 'spec-ledger', 'close-up-strip', 'deployment-context', 'closing'],
    radius: '2px (sharp precision)',
  },
  gaming: {
    surface: 'experience',
    heroes: ['full-bleed-key-art', 'title-over-world'],
    moments: ['aperture-reveal', 'ambient-canvas', 'photo-chapters'],
    sections: ['hero', 'world-showcase', 'gameplay-slot', 'crew-strip', 'closing'],
    radius: '0px (sharp cinematic)',
  },
  product: {
    surface: 'persuade',
    heroes: ['anchor-product-frame', 'full-bleed-in-use', 'asymmetric-editorial-product'],
    moments: ['swatch-swap', 'photo-chapters', 'aperture-reveal'],
    sections: ['hero', 'proof-in-use', 'swatch-detail', 'materials-band', 'closing'],
    radius: '4px (quiet hardware/craft)',
  },
  service: {
    surface: 'persuade',
    heroes: ['editorial-portrait-hero', 'outcome-statement-photo', 'framed-practice-hero'],
    moments: ['index-drawer', 'type-billboard', 'photo-chapters'],
    sections: ['hero', 'case-rows', 'process-ledger', 'practice-team', 'closing'],
    radius: '4px (restrained editorial)',
  },
  place: {
    surface: 'persuade',
    heroes: ['full-bleed-storefront', 'framed-craft-hero', 'type-over-space'],
    moments: ['type-billboard', 'photo-chapters', 'index-drawer', 'swatch-swap'],
    sections: ['hero', 'visit-hours', 'offer-editorial', 'craft-strip', 'closing'],
    radius: '0px (flat square photos)',
  },
};

export function dealDirection({ kind, brief, keep = [], seed = 1 }) {
  const normalizedKind = String(kind || '').toLowerCase();
  const cleanBrief = String(brief || '').trim();
  if (!VALID_KINDS.includes(normalizedKind) || !cleanBrief) {
    throw new Error(`Invalid arguments: kind must be one of ${VALID_KINDS.join('|')} and brief must be non-empty.`);
  }

  const keepSet = new Set(Array.isArray(keep) ? keep : String(keep || '').split(',').map((s) => s.trim()).filter(Boolean));
  const numericSeed = Number(seed) || 1;

  // Seeded PRNG (FNV-1a + Mulberry32) — deterministic for identical kind + brief + seed.
  let h = 2166136261 ^ numericSeed;
  for (const ch of `${normalizedKind}::${cleanBrief}#${numericSeed}`) {
    h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  }
  const rand = () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const pick = (arr) => arr[Math.floor(rand() * arr.length)];
  const shuffle = (arr) => {
    const out = [...arr];
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  };

  const isTech = ['software', 'tech', 'gaming'].includes(normalizedKind);
  const cfg = CONFIG[normalizedKind];
  const dealtPalette = keepSet.has('palette') ? null : pick(PALETTES[normalizedKind]);
  const dealtFonts = keepSet.has('type') ? null : pick(FONT_PAIRS[normalizedKind]);

  return {
    kind: normalizedKind,
    tier: isTech ? 'tech' : 'non-tech',
    surface: cfg.surface,
    brief: cleanBrief,
    seed: numericSeed,
    guardrails: isTech
      ? 'Tech allowed: live HTML UI, dark or light ground, max 1 pulsing diagram, max 1 shader/canvas moment.'
      : 'Non-Tech strict: real/bespoke photography, flat colour, clean type ONLY. Zero shaders, dark-neon, or fake dashboards.',
    hero: pick(cfg.heroes),
    moments: shuffle(cfg.moments).slice(0, 2),
    radiusRule: cfg.radius,
    sectionSequence: cfg.sections,
    palette: dealtPalette ?? 'Kept from existing brand tokens (--keep palette)',
    fonts: dealtFonts ?? 'Kept from existing brand tokens (--keep type)',
  };
}

function runCli() {
  const args = process.argv.slice(2);
  const flag = (name, fallback = '') => {
    const i = args.indexOf(`--${name}`);
    return i >= 0 && i + 1 < args.length ? args[i + 1] : fallback;
  };
  const kind = flag('kind', '');
  const brief = flag('brief', '');
  const keep = flag('keep', '');
  const seed = Number(flag('seed', '1')) || 1;
  const asJson = args.includes('--json');

  let out;
  try {
    out = dealDirection({ kind, brief, keep, seed });
  } catch {
    console.error(
      `usage: node unslop-deal.mjs --kind <${VALID_KINDS.join('|')}> --brief "<one line>" [--keep palette,type] [--seed n] [--json]`
    );
    process.exit(2);
  }

  if (asJson) {
    console.log(JSON.stringify(out, null, 2));
    process.exit(0);
  }

  console.log(`MAESTRO-UNSLOP DEAL · kind=${out.kind} (${out.tier}) · surface=${out.surface} · seed=${out.seed}`);
  console.log(`Brief     : "${out.brief}"`);
  console.log(`Guardrail : ${out.guardrails}`);
  console.log(`Hero      : ${out.hero}`);
  console.log(`Moments   : ${out.moments.join(' + ')} (see references/dealt-moments.md)`);
  console.log(`Radius    : ${out.radiusRule}`);
  console.log(`Sections  : ${out.sectionSequence.join(' -> ')}`);
  if (typeof out.palette === 'object') {
    console.log(`Palette   : ${out.palette.name}`);
    console.log(`            --bg: ${out.palette.ground} | --surface: ${out.palette.surface}`);
    console.log(`            --ink: ${out.palette.ink} | --accent: ${out.palette.accent}`);
  } else {
    console.log(`Palette   : ${out.palette}`);
  }
  if (typeof out.fonts === 'object') {
    console.log(`Fonts     : display=${out.fonts.display} | body=${out.fonts.body}${out.fonts.mono ? ` | mono=${out.fonts.mono}` : ''}`);
  } else {
    console.log(`Fonts     : ${out.fonts}`);
  }
  console.log(`\nVerify fonts on official listing before use. Redeal with --seed ${out.seed + 1} if needed.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runCli();
}
