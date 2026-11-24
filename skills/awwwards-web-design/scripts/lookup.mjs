#!/usr/bin/env node
// On-demand reference & blueprint lookup CLI for token-efficient agent context.
// Instead of reading entire catalogs, retrieve only the matched blueprint or section.
//
// Usage:
//   node lookup.mjs list                        List all 15 blueprint IDs and reference files
//   node lookup.mjs blueprint <id>              Print the exact spec for one Awwwards referenceId
//   node lookup.mjs search "<query>"            Search headings & snippets across references/*.md
//   node lookup.mjs section <file> "<heading>"  Print one section from a reference file
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const refsDir = path.resolve(__dirname, '../references');
const [cmd, arg1, arg2] = process.argv.slice(2);

function listRefFiles() {
  return fs.readdirSync(refsDir).filter((f) => f.endsWith('.md')).sort();
}

function readRef(file) {
  const name = file.endsWith('.md') ? file : `${file}.md`;
  const p = path.join(refsDir, name);
  if (!fs.existsSync(p)) {
    console.error(`lookup: reference not found: ${name}`);
    process.exit(2);
  }
  return { name, text: fs.readFileSync(p, 'utf8') };
}

function extractBlueprint(id) {
  const { text } = readRef('awwwards-references.md');
  const lines = text.split('\n');
  const target = id.toLowerCase();
  const re = new RegExp(`^###\\s+\\d+\\.\\s+\`${target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\``);
  const start = lines.findIndex((l) => re.test(l));
  if (start < 0) {
    console.error(`lookup: blueprint "${id}" not found. Run "lookup.mjs list" to see valid IDs.`);
    process.exit(2);
  }
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^###?\s+/.test(lines[i])) { end = i; break; }
  }
  console.log(lines.slice(start, end).join('\n').trim());
}

function extractSection(file, headingQuery) {
  const { name, text } = readRef(file);
  const lines = text.split('\n');
  const q = headingQuery.toLowerCase();
  const start = lines.findIndex((l) => /^#{1,4}\s+/.test(l) && l.toLowerCase().includes(q));
  if (start < 0) {
    console.error(`lookup: section "${headingQuery}" not found in ${name}`);
    process.exit(2);
  }
  const level = lines[start].match(/^(#+)/)[1].length;
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    const m = lines[i].match(/^(#+)\s+/);
    if (m && m[1].length <= level) { end = i; break; }
  }
  console.log(lines.slice(start, end).join('\n').trim());
}

function searchRefs(query) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) { console.error('lookup: provide a search query'); process.exit(2); }
  const hits = [];
  for (const file of listRefFiles()) {
    const lines = fs.readFileSync(path.join(refsDir, file), 'utf8').split('\n');
    let currentHeading = '(top)';
    let headingLine = 1;
    const seen = new Set();
    lines.forEach((line, idx) => {
      if (/^#{1,3}\s+/.test(line)) {
        currentHeading = line.replace(/^#+\s+/, '').trim();
        headingLine = idx + 1;
      }
      const lower = line.toLowerCase();
      const score = terms.reduce((acc, t) => acc + (lower.includes(t) ? 1 : 0), 0);
      if (score === terms.length) {
        const key = `${file}:${currentHeading}`;
        if (!seen.has(key)) {
          seen.add(key);
          hits.push({ file, heading: currentHeading, line: headingLine, snippet: line.trim().slice(0, 110) });
        }
      }
    });
  }
  if (!hits.length) { console.log(`No matches for "${query}".`); return; }
  for (const h of hits.slice(0, 20)) {
    console.log(`${h.file}:${h.line}  [${h.heading}]`);
    console.log(`  ${h.snippet}`);
  }
  if (hits.length > 20) console.log(`... +${hits.length - 20} more matches`);
}

function listAll() {
  const { text } = readRef('awwwards-references.md');
  const ids = [...text.matchAll(/^###\s+\d+\.\s+`([^`]+)`\s+—\s+\[([^\]]+)\]/gm)].map((m) => `  ${m[1].padEnd(18)} ${m[2]}`);
  console.log('Awwwards Blueprints (use: lookup.mjs blueprint <id>):');
  console.log(ids.join('\n'));
  console.log('\nReference Files (use: lookup.mjs section <file> "<heading>"):');
  for (const f of listRefFiles()) {
    const title = fs.readFileSync(path.join(refsDir, f), 'utf8').split('\n').find((l) => l.startsWith('# ')) || '';
    console.log(`  ${f.padEnd(28)} ${title.replace(/^#\s+/, '')}`);
  }
}

if (cmd === 'list') listAll();
else if (cmd === 'blueprint' && arg1) extractBlueprint(arg1);
else if (cmd === 'search' && arg1) searchRefs(arg1);
else if (cmd === 'section' && arg1 && arg2) extractSection(arg1, arg2);
else {
  console.error('Usage:\n  lookup.mjs list\n  lookup.mjs blueprint <id>\n  lookup.mjs search "<query>"\n  lookup.mjs section <file> "<heading>"');
  process.exit(2);
}
