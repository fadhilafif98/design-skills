#!/usr/bin/env node
// Measures unguided baseline vs skill-guided uplift using inspect.sh --json.
// Usage: node scripts/eval-compare.mjs <baseline.html|url> <guided.html|url> [--surface experience|persuade|operate|read]
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inspectSh = path.resolve(__dirname, '../skills/awwwards-web-design/scripts/inspect.sh');

const args = process.argv.slice(2);
const surfaceIdx = args.indexOf('--surface');
let surface = 'experience';
if (surfaceIdx >= 0) {
  surface = args[surfaceIdx + 1] || 'experience';
  args.splice(surfaceIdx, 2);
}

const [baseline, guided] = args;
if (!baseline || !guided) {
  console.error('Usage: node scripts/eval-compare.mjs <baseline.html|url> <guided.html|url> [--surface experience|persuade|operate|read]');
  process.exit(2);
}

function runInspect(target, name) {
  const res = spawnSync('bash', [inspectSh, target, '--surface', surface, '--name', name, '--widths', '1440,390', '--json'], {
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  });
  if (!res.stdout || !res.stdout.trim().startsWith('{')) {
    console.error(`eval-compare: inspect.sh failed on ${target}\n${res.stderr || res.stdout}`);
    process.exit(1);
  }
  return JSON.parse(res.stdout);
}

const b = runInspect(baseline, 'eval-baseline');
const g = runInspect(guided, 'eval-guided');

const bRules = new Set(b.findings.filter((f) => f.level === 'FAIL').map((f) => f.rule));
const gRules = new Set(g.findings.filter((f) => f.level === 'FAIL').map((f) => f.rule));
const resolved = [...bRules].filter((r) => !gRules.has(r));
const regressions = [...gRules].filter((r) => !bRules.has(r));

const delta = (a, c) => {
  const d = c - a;
  return d === 0 ? '0' : d < 0 ? `${d} (better)` : `+${d} (worse)`;
};

console.log(`## Eval Uplift Report (\`surface=${surface}\`)\n`);
console.log(`| Metric | Baseline (Unguided) | Guided (Skill) | Delta |`);
console.log(`|---|---:|---:|---:|`);
console.log(`| **FAIL count** | ${b.fails} | ${g.fails} | ${delta(b.fails, g.fails)} |`);
console.log(`| **WARN count** | ${b.warns} | ${g.warns} | ${delta(b.warns, g.warns)} |`);
console.log(`| **CWV** | ${b.cwv?.[0] || 'n/a'} | ${g.cwv?.[0] || 'n/a'} | — |`);
console.log('');
console.log(`- **FAIL rules resolved (${resolved.length}):** ${resolved.length ? resolved.join(', ') : 'none'}`);
console.log(`- **New FAIL regressions (${regressions.length}):** ${regressions.length ? regressions.join(', ') : 'none'}`);
