// Regression tests for brand-check.mjs. Run: node --test skills/awwwards-web-design/scripts/tests/
// Each case is a should-flag or should-pass fixture. Add one whenever a false positive or a miss is found.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const script = path.join(here, '..', 'brand-check.mjs');
const baseConfig = {
  brandName: 'Kopi Catat',
  brandNameBannedVariants: ['KopiCatat'],
  referenceId: 'mejuma-tuscany',
  tokenFiles: ['css/tokens.css'],
  fonts: { allowed: ['Hanken Grotesk'], allowGenericFallbacks: true },
  voice: { addressForm: 'kamu', bannedAddressForms: ['Anda'], bannedWords: ['unlock'], allowEmoji: false,
    canonicalCtas: ['Mampir ke kedai'], bannedCtas: ['Order sekarang'], maxExclamationsPerPage: 1 },
  logo: { files: ['assets/logo.svg'], minWidthPx: 96 },
  motion: { bannedEasings: ['ease-in', 'bounce'], allowTransitionAll: false },
};

function run(files, config = baseConfig) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'brand-check-'));
  fs.mkdirSync(path.join(dir, 'design'));
  fs.writeFileSync(path.join(dir, 'design/brand.json'), JSON.stringify(config));
  for (const [name, body] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(dir, name)), { recursive: true });
    fs.writeFileSync(path.join(dir, name), body);
  }
  let out;
  try { out = execFileSync('node', [script, dir, '--json'], { encoding: 'utf8' }); }
  catch (e) { out = e.stdout; }
  fs.rmSync(dir, { recursive: true, force: true });
  return JSON.parse(out).findings;
}
const rules = (findings) => findings.map((f) => f.rule);

test('font defined in a token file is checked', () => {
  assert.ok(rules(run({ 'css/tokens.css': ':root {\n  --font-display: "Inter", sans-serif;\n}' })).includes('font'));
});
test('font shorthand is checked', () => {
  assert.ok(rules(run({ 'a.css': '.h { font: 700 4rem/1 "Poppins", sans-serif; }' })).includes('font'));
});
test('Fontshare link is checked', () => {
  assert.ok(rules(run({ 'i.html': '<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400&display=swap" rel="stylesheet">' })).includes('font'));
});
test('Tailwind theme fonts and arbitrary font classes are checked', () => {
  const f = run({ 'tailwind.config.js': "module.exports = { theme: { extend: {\n fontFamily: {\n  display: ['Syne', 'sans-serif'],\n },\n} } }",
    'p.jsx': "export const P = () => <h1 className=\"font-['Outfit']\">Halo</h1>;" });
  assert.equal(f.filter((x) => x.rule === 'font').length, 2);
});
test('allowed font and generic fallbacks pass', () => {
  assert.deepEqual(rules(run({ 'a.css': '.h { font-family: "Hanken Grotesk", system-ui, sans-serif; font: 500 1rem/1.5 var(--font-body); }' })), []);
});
test('overused font warns without an allowlist, unless the brand locks it', () => {
  const open = { ...baseConfig, fonts: {} };
  assert.ok(rules(run({ 'a.css': '.h { font-family: Inter, sans-serif; }' }, open)).includes('overused-font'));
  const locked = { ...baseConfig, fonts: { locked: ['Inter'] } };
  assert.ok(!rules(run({ 'a.css': '.h { font-family: Inter, sans-serif; }' }, locked)).includes('overused-font'));
});
test('raw colours outside tokens are errors; inside tokens they pass', () => {
  assert.ok(rules(run({ 'a.css': '.x { color: #2b2118; }' })).includes('raw-color'));
  assert.deepEqual(rules(run({ 'css/tokens.css': ':root { --ink: oklch(0.2 0.01 60); --bg: #f2f2f2; }' })), []);
});
test('theme-color meta, id selectors and hash links are not colours', () => {
  const f = run({ 'i.html': '<meta name="theme-color" content="#F4EDE1">\n<style>#cafe { padding: 0 }\n#bad:hover { opacity: 1 }</style>\n<a href="/menu#cafe">Menu</a>' });
  assert.ok(!rules(f).includes('raw-color'), JSON.stringify(f));
});
test('SVG fill colour gets a currentColor hint', () => {
  const f = run({ 'i.html': '<svg><path d="M0 0" stroke="#2B2118"/></svg>' });
  assert.match(f.find((x) => x.rule === 'raw-color').msg, /currentColor/);
});
test('Tailwind palette classes are raw colours', () => {
  assert.ok(rules(run({ 'p.tsx': 'export const B = () => <a className="hover:bg-purple-500 text-white">Menu</a>;' })).includes('raw-color'));
});
test('JSX code identifiers are not copy, JSX text is', () => {
  const f = run({ 'App.jsx': 'export default function App() {\n  const unlock = () => {};\n  return <p onClick={unlock}>Kami unlock rasa</p>;\n}' });
  assert.equal(f.filter((x) => x.rule === 'banned-word').length, 1);
  assert.equal(f.find((x) => x.rule === 'banned-word').line, 3);
});
test('address form, brand name and emoji are enforced', () => {
  const r = rules(run({ 'i.html': '<p>Silakan Anda mampir ke KopiCatat ☕</p>' }));
  for (const rule of ['address-form', 'brand-name', 'emoji']) assert.ok(r.includes(rule), rule);
});
test('inline SVG logo is checked for size and name', () => {
  const r = rules(run({ 'i.html': '<svg class="logo" width="40"><path d="M0 0"/></svg>' }));
  assert.ok(r.includes('logo-size') && r.includes('logo-alt'));
});
test('motion rules: transition all, ease-in, scale(0); ease-in-out passes', () => {
  const r = rules(run({ 'a.css': '.a { transition: all 300ms ease; }\n.b { transition: opacity 200ms ease-in; }\n.c { transform: scale(0); }\n.d { transition: transform 200ms ease-in-out; }' }));
  assert.ok(r.includes('transition-all') && r.includes('easing') && r.includes('scale-zero'));
  assert.equal(r.filter((x) => x === 'easing').length, 1);
});
test('copy tells and generic CTAs warn', () => {
  const r = rules(run({ 'i.html': '<p>Solusi terbaik untuk bisnis kamu.</p>\n<a href="/x">Learn more</a>' }));
  assert.ok(r.includes('copy-tell') && r.includes('generic-cta'));
});
test('comments are ignored', () => {
  assert.deepEqual(rules(run({ 'a.css': '/* old: color: #ff0000; font-family: Inter */\n.a { color: var(--ink); }' })), []);
});
test('--allow and config.allow suppress a rule', () => {
  assert.deepEqual(rules(run({ 'a.css': '.a { backdrop-filter: blur(8px); }' }, { ...baseConfig, allow: ['glass'] })), []);
});
test('generic CTAs are caught per link, even two on one line', () => {
  const f = run({ 'i.html': '<a class="btn" href="#">Get started</a> <a class="btn" href="#">Learn more</a>' });
  assert.equal(f.filter((x) => x.rule === 'generic-cta').length, 2);
});
test('without brand.json it runs tells-only: no raw-colour errors, motion and copy tells still flagged', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'brand-check-'));
  fs.writeFileSync(path.join(dir, 'a.html'), '<style>.a { color: #123456; transition: all .3s; }</style><p>Solusi terbaik</p>');
  let out; try { out = execFileSync('node', [script, dir, '--json'], { encoding: 'utf8' }); } catch (e) { out = e.stdout; }
  fs.rmSync(dir, { recursive: true, force: true });
  const r = rules(JSON.parse(out).findings);
  assert.ok(!r.includes('raw-color') && r.includes('transition-all') && r.includes('copy-tell'));
});
test('equal 3/4-column card grids and eyebrow selectors are flagged as errors', () => {
  const r = rules(run({ 'a.css': '.cards { grid-template-columns: repeat(3, 1fr); }\n.section-tag { text-transform: uppercase; }' }));
  assert.ok(r.includes('equal-card-grid') && r.includes('eyebrow-selector'));
});
test('missing or invalid referenceId in brand.json is flagged as an error', () => {
  const r = rules(run({ 'a.css': '.a { color: var(--ink); }' }, { ...baseConfig, referenceId: 'invalid-ref' }));
  assert.ok(r.includes('reference-id'));
});
