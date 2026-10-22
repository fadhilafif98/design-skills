#!/usr/bin/env node
// Brand guardian + slop linter. Scans source for anything that drifts from design/brand.json, and for
// the copy and CSS tells that make a page read as generated.
// Usage: node brand-check.mjs <site-dir|file> [--config design/brand.json] [--allow rule,rule] [--json]
// With no design/brand.json it runs in tells-only mode (raw colours and fonts are not errors without a lock).
// Exit code 1 if any error is found, 2 on usage error. No dependencies. Node 18+.
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const flag = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const valued = new Set(['--config', '--allow']);
const root = path.resolve(args.find((a, i) => !a.startsWith('--') && !valued.has(args[i - 1])) || '.');
const rootDir = fs.existsSync(root) && fs.statSync(root).isFile() ? path.dirname(root) : root;
const configPath = path.resolve(flag('--config') || path.join(rootDir, 'design/brand.json'));
const asJson = args.includes('--json');

if (!fs.existsSync(root)) { console.error(`brand-check: not found: ${root}`); process.exit(2); }
// Without a brand.json (auditing someone else's site) only the tells and craft rules run.
const hasConfig = fs.existsSync(configPath);
if (!hasConfig && flag('--config')) { console.error(`brand-check: config not found: ${configPath}`); process.exit(2); }
const cfg = hasConfig ? JSON.parse(fs.readFileSync(configPath, 'utf8')) : { motion: { bannedEasings: ['ease-in'] } };
const voice = cfg.voice || {};
const motion = cfg.motion || {};
const allow = new Set([...(cfg.allow || []), ...((flag('--allow') || '').split(',').filter(Boolean))]);
const ignore = cfg.ignore || ['node_modules', '.git', 'design'];
const tokenFiles = (cfg.tokenFiles || []).map((f) => path.resolve(rootDir, f));
const tokenSelectors = cfg.tokenSelectors || [':root'];
const norm = (f) => f.toLowerCase().replace(/[\s_-]+/g, '');
const allowedFonts = new Set((cfg.fonts?.allowed || []).map(norm));
const lockedFonts = new Set((cfg.fonts?.locked || []).map(norm));
const GENERIC_FONTS = new Set(['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-sans-serif',
  'ui-serif', 'ui-monospace', 'ui-rounded', 'emoji', 'math', 'fangsong', 'inherit', 'initial', 'unset', 'revert',
  '-apple-system', 'blinkmacsystemfont', 'segoe ui', 'helvetica neue', 'helvetica', 'arial', 'apple color emoji',
  'segoe ui emoji', 'noto color emoji', 'roboto'].map(norm));
// Faces models reach for by reflex (impeccable, gstack, taste-skill registries, 2025–2026). A reason is required.
const OVERUSED_FONTS = ['Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Raleway', 'Space Grotesk', 'Space Mono',
  'Fraunces', 'Playfair Display', 'Cormorant', 'Cormorant Garamond', 'Lora', 'Crimson Text', 'Newsreader', 'Syne', 'IBM Plex Sans',
  'IBM Plex Mono', 'IBM Plex Serif', 'DM Sans', 'DM Serif Display', 'Outfit', 'Plus Jakarta Sans', 'Instrument Sans', 'Instrument Serif',
  'Geist', 'Geist Mono', 'Mona Sans', 'Recoleta', 'Clash Display', 'Bebas Neue', 'JetBrains Mono'].map(norm);

const CODE_EXT = new Set(['.css', '.scss', '.sass', '.less', '.html', '.htm', '.js', '.mjs', '.cjs', '.jsx', '.ts', '.tsx', '.vue', '.svelte', '.astro']);
const MARKUP_EXT = new Set(['.html', '.htm', '.jsx', '.tsx', '.vue', '.svelte', '.astro']);
const COMPONENT_EXT = new Set(['.jsx', '.tsx', '.vue', '.svelte', '.astro']);

const findings = [];
const report = (file, line, level, rule, msg) => {
  if (!allow.has(rule)) findings.push({ file: path.relative(rootDir, file) || path.basename(file), line, level, rule, msg });
};

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    const rel = path.relative(rootDir, p);
    if (ignore.some((ig) => rel === ig || rel.startsWith(ig + path.sep) || entry.name === ig)) continue;
    if (entry.isDirectory()) walk(p, out);
    else if (CODE_EXT.has(path.extname(entry.name))) out.push(p);
  }
  return out;
}

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const wordRe = (w, flags = 'g') => new RegExp(`(?<![\\p{L}\\p{N}])${esc(w)}(?![\\p{L}\\p{N}])`, flags + 'u');

const RAW_COLOR = /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|oklch|oklab|lab|lch|hwb|color)\(/g;
const TW_COLOR = /(?<![\w-])(?:[a-z]+:)*(?:bg|text|border|from|via|to|ring|fill|stroke|outline|decoration|shadow|divide|accent|caret)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}(?![\w-])/g;
const EMOJI = /\p{Extended_Pictographic}/u;

// Copy tells: generic marketing phrasing in English and Indonesian. Warnings: rewrite with a fact only this business has.
const COPY_TELLS = ['unlock', 'supercharge', 'seamless', 'seamlessly', 'elevate', 'revolutionize', 'revolutionise', 'next-gen',
  'next-generation', 'cutting-edge', 'game-changer', 'game-changing', 'empower', 'effortless', 'effortlessly', 'all-in-one',
  'harness the power', 'leverage', 'unleash', 'best-in-class', 'world-class', 'industry-leading', 'enterprise-grade',
  'future-proof', 'mission-critical', 'built for the modern', 'trusted by leading', 'take your business to the next level',
  'transform your', 'delve', 'solusi terbaik', 'solusi terpercaya', 'terdepan', 'revolusioner', 'inovatif dan terpercaya',
  'tingkatkan bisnis', 'wujudkan impian', 'kualitas terbaik', 'pelayanan terbaik', 'harga terjangkau dan kualitas terbaik',
  'nomor satu', 'satu-satunya solusi'];
const GENERIC_CTAS = ['Get started', 'Learn more', 'Click here', 'Read more', 'Discover more', 'Klik di sini', 'Selengkapnya', 'Pelajari lebih lanjut'];
const CADENCE = [/\bNot an? [a-z][^.!?]{1,40}[.!]\s+[A-Z][^.!?]{1,60}[.!]/, /[A-Z][^.!?]{4,80}[.!]\s+(?:No|Just)\s+[a-z][^.!?]{2,60}[.!]/,
  /\bBukan (?:sekadar|hanya) [^.!?]{1,40}[.!,]/i];

function checkColors(file, n, line) {
  if (!hasConfig) return;
  if (/<meta\b[^>]*name=["']theme-color["']/i.test(line)) return; // theme-color must be a literal; it is part of the brand
  for (const m of line.matchAll(RAW_COLOR)) {
    const before = line.slice(0, m.index);
    const after = line.slice(m.index + m[0].length);
    if (/(?:href|xlink:href|src|action|to)=["'][^"']*$/.test(before) || /url\([^)]*$/.test(before)) continue;
    if (m[0].startsWith('#')) {
      if (/[g-z_]/i.test((line.slice(m.index + 1).match(/^[\w-]*/) || [''])[0])) continue; // #about, #menu-list
      if (/^\s*[{.>+~[:]/.test(after) || /^\s*,[^;]*\{/.test(after)) continue; // CSS id selector: #cafe { / #cafe:hover
    }
    const hint = /\b(?:fill|stroke|stop-color)=["']$/.test(before) ? 'Use fill="currentColor" or style="fill: var(--token)"' : 'Use var(--token)';
    report(file, n, 'error', 'raw-color', `"${m[0]}" outside brand tokens. ${hint}`);
  }
  for (const m of line.matchAll(TW_COLOR)) report(file, n, 'error', 'raw-color', `Tailwind palette class "${m[0]}". Map brand tokens into the theme and use those names`);
}

function fontNames(list) {
  return list.split(',').map((raw) => raw.trim().replace(/^['"`]|['"`]$/g, '').trim()).filter((f) => f && !/^var\(/.test(f) && !/[(){}$]/.test(f));
}
function checkFontName(file, n, name, origin) {
  const k = norm(name);
  if (cfg.fonts?.allowGenericFallbacks !== false && GENERIC_FONTS.has(k)) return;
  if (allowedFonts.size && !allowedFonts.has(k)) report(file, n, 'error', 'font', `${origin} "${name}" is not in the brand allowlist`);
  else if (OVERUSED_FONTS.includes(k) && !lockedFonts.has(k)) report(file, n, 'warn', 'overused-font', `"${name}" is a reflex default. Keep it only with a reason no other face could satisfy (write it in DESIGN.md), or list it in fonts.locked if the brand owns it`);
}
function checkFonts(file, n, line, state) {
  const found = [];
  for (const d of line.matchAll(/(?<![\w-])font-family\s*:\s*([^;}{]+)/gi)) found.push(['Font', d[1]]);
  for (const d of line.matchAll(/(?<![\w-])font\s*:\s*([^;}{]+)/gi)) { // shorthand: [style] [weight] size[/lh] family
    const fam = d[1].match(/(?:[\d.]+(?:px|rem|em|%|pt|vw|vh|ch|vmin|vmax)|\)|xx?-?(?:small|large)|medium|smaller|larger)(?:\s*\/\s*(?:[\w.%-]+|var\([^)]*\)))?\s+([^\d\s/].*)$/); if (fam) found.push(['Font (shorthand)', fam[1]]);
  }
  for (const d of line.matchAll(/--[\w-]*(?:font|family|ff|typeface)[\w-]*\s*:\s*([^;}{]+)/gi)) found.push(['Font token', d[1]]);
  for (const d of line.matchAll(/fontFamily\s*:\s*['"`]([^'"`]+)['"`]/g)) found.push(['Font', d[1]]);
  for (const d of line.matchAll(/(?<![\w-])font-\[['"]?([^\]'"]+)['"]?\]/g)) found.push(['Tailwind font', d[1].replace(/_/g, ' ')]);
  if (state.inFontFamilyBlock) for (const d of line.matchAll(/['"`]([^'"`]+)['"`]/g)) found.push(['Tailwind theme font', d[1]]);
  for (const [origin, list] of found) for (const name of fontNames(list)) checkFontName(file, n, name, origin);
  for (const m of line.matchAll(/fonts\.googleapis\.com\/css2?\?([^"'\s>)]+)/g))
    for (const fam of m[1].matchAll(/family=([^:&;]+)/g)) checkFontName(file, n, decodeURIComponent(fam[1]).replace(/\+/g, ' '), 'Google Font');
  for (const m of line.matchAll(/api\.fontshare\.com\/v2\/css\?([^"'\s>)]+)/g))
    for (const fam of m[1].matchAll(/f(?:\[\]|%5B%5D)=([a-z0-9-]+)/gi)) checkFontName(file, n, fam[1].replace(/-/g, ' '), 'Fontshare font');
}

function checkCss(file, n, line) {
  if (!motion.allowTransitionAll && (/transition(?:-property)?\s*:\s*all\b/i.test(line) || /transition\s*:[^;]*,\s*all\s+[\d.]+m?s/i.test(line)))
    report(file, n, 'error', 'transition-all', 'transition: all. Name exact properties');
  for (const e of motion.bannedEasings || []) {
    const re = e === 'ease-in' ? /(?<![\w-])ease-in(?![\w-])/ : new RegExp(`(?<![\\w-])${esc(e)}(?![\\w-])`, 'i');
    if (re.test(line) && !/^\s*[.#][\w-]*\s*\{?$/.test(line)) report(file, n, 'error', 'easing', `Banned easing "${e}" (brand motion character)`);
  }
  if (/scale\(\s*0\s*\)/.test(line)) report(file, n, 'error', 'scale-zero', 'scale(0): nothing appears from nothing. Start at 0.95–0.97 with opacity 0');
  if (/background-clip\s*:\s*text/i.test(line)) report(file, n, 'warn', 'gradient-text', 'Gradient-filled text is a generated-page tell');
  if (/backdrop-filter\s*:\s*(?!none)/i.test(line)) report(file, n, 'warn', 'glass', 'backdrop-filter: glass panels are a tell unless the concept needs a material');
  if (/box-shadow\s*:[^;]*\b[1-9]\d*px\s+[1-9]\d*px\s+0(?:px)?\s/i.test(line)) report(file, n, 'warn', 'hard-shadow', 'Hard offset shadow: only inside a world that is truly neobrutalist');
  if (/(?:linear|radial|conic)-gradient\([^)]*(?:#(?:7c3aed|8b5cf6|6366f1|a855f7|9333ea)|purple|violet|indigo)/i.test(line)) report(file, n, 'warn', 'ai-gradient', 'Violet/indigo gradient: the first-wave generated look');
  const track = line.match(/letter-spacing\s*:\s*(-?[\d.]+)em/);
  if (track && parseFloat(track[1]) < -0.07) report(file, n, 'warn', 'tracking', `letter-spacing ${track[1]}em is too tight. Display floor is about -0.05em`);
  if (/grid-template-columns\s*:\s*repeat\(\s*[34]\s*,\s*(?:1fr|minmax\(\s*[1-9]\d*(?:px|rem))/i.test(line))
    report(file, n, 'error', 'equal-card-grid', 'grid-template-columns: repeat(3|4, 1fr) equal card grid is banned (tells.md §1). Use asymmetric 12-column spans, horizontal filmstrip (flex + width: max-content), or border-top index rows');
  if (/^\s*\.(?:section-tag|eyebrow|kicker|overtitle|section-label|sub-badge)\b/i.test(line))
    report(file, n, 'error', 'eyebrow-selector', 'Eyebrow/kicker class selector is banned (tells.md §2). Delete eyebrow tags above headings');
}

function textOf(line, ext) {
  if (COMPONENT_EXT.has(ext)) {
    const parts = [...line.matchAll(/>([^<>{}]+)</g)].map((m) => m[1]);
    const t = line.trim();
    if (!parts.length && t && !/[=;(){}<>]|^\/\/|^\*|^import\b|^export\b|^return\b/.test(t)) parts.push(t);
    return parts.join(' ');
  }
  return line.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ');
}

function checkText(file, n, text, state) {
  if (!text.trim()) return;
  state.chars += text.length;
  state.emDashes += (text.match(/—/g) || []).length;
  state.exclamations += (text.match(/!/g) || []).length;
  for (const f of voice.bannedAddressForms || [])
    if (wordRe(f).test(text)) report(file, n, 'error', 'address-form', `"${f}" found. Brand addresses the reader as "${voice.addressForm}"`);
  for (const w of voice.bannedWords || [])
    if (wordRe(w, 'gi').test(text)) report(file, n, 'error', 'banned-word', `Banned word "${w}"`);
  for (const w of COPY_TELLS)
    if (wordRe(w, 'gi').test(text) && !(voice.bannedWords || []).some((b) => b.toLowerCase() === w)) report(file, n, 'warn', 'copy-tell', `"${w}": generic marketing phrasing. Replace with a fact only this business has`);
  for (const c of voice.bannedCtas || [])
    if (wordRe(c, 'gi').test(text)) report(file, n, 'warn', 'cta', `Non-canonical CTA "${c}". Use: ${(voice.canonicalCtas || []).join(' / ')}`);
  for (const re of CADENCE) if (re.test(text)) state.cadence++;
  for (const v of cfg.brandNameBannedVariants || [])
    if (wordRe(v).test(text)) report(file, n, 'error', 'brand-name', `"${v}" misspells the brand name "${cfg.brandName}"`);
  if (voice.allowEmoji === false && EMOJI.test(text)) report(file, n, 'error', 'emoji', 'Emoji in copy');
  if (/lorem ipsum/i.test(text)) report(file, n, 'error', 'placeholder', 'Lorem ipsum in copy');
}

function checkLogo(file, n, line) {
  const logoCfg = cfg.logo || {};
  for (const m of line.matchAll(/<img\b[^>]*>/gi)) {
    const tag = m[0];
    const src = (tag.match(/\bsrc=\{?["']([^"']+)["']/) || [])[1] || '';
    if (!/logo/i.test(src)) continue;
    if (logoCfg.files?.length && !logoCfg.files.some((f) => src.endsWith(f) || src.endsWith(path.basename(f))))
      report(file, n, 'error', 'logo-file', `Logo "${src}" is not an approved logo file`);
    const w = parseInt((tag.match(/\bwidth=\{?["']?(\d+)/) || [])[1], 10);
    if (logoCfg.minWidthPx && w && w < logoCfg.minWidthPx) report(file, n, 'error', 'logo-size', `Logo width ${w}px < minimum ${logoCfg.minWidthPx}px`);
    if (!/\balt=["'][^"']+["']/.test(tag)) report(file, n, 'error', 'logo-alt', 'Logo needs alt text (the brand name)');
    if (/style=["'{][^>]*(filter|transform|box-shadow)/i.test(tag)) report(file, n, 'warn', 'logo-misuse', 'Inline filter/transform/shadow on the logo. Check misuse rules');
  }
  for (const m of line.matchAll(/<svg\b[^>]*>/gi)) {
    const tag = m[0];
    if (!/(?:class|id|className|aria-label|data-logo)=["'{][^"'}]*logo/i.test(tag) && !/\bdata-logo\b/.test(tag)) continue;
    const w = parseInt((tag.match(/\bwidth=\{?["']?(\d+)/) || [])[1], 10);
    if (logoCfg.minWidthPx && w && w < logoCfg.minWidthPx) report(file, n, 'error', 'logo-size', `Inline SVG logo width ${w}px < minimum ${logoCfg.minWidthPx}px`);
    if (!/\b(?:aria-label|aria-labelledby)=/.test(tag) && !/<title>/.test(line)) report(file, n, 'error', 'logo-alt', 'Inline SVG logo needs role="img" and aria-label (the brand name)');
  }
}

function scan(file) {
  const ext = path.extname(file);
  const isMarkup = MARKUP_EXT.has(ext);
  const isTokenFile = tokenFiles.includes(file);
  const isTailwindConfig = /^tailwind\.config\./.test(path.basename(file));
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const state = { exclamations: 0, emDashes: 0, chars: 0, cadence: 0, inFontFamilyBlock: false };
  let tokenDepth = 0, braceDepth = 0, fontBlockDepth = 0, inBlockComment = false;
  let inStyle = !isMarkup || COMPONENT_EXT.has(ext);
  let inScript = /\.(m?js|cjs|ts)$/.test(ext);

  lines.forEach((raw, i) => {
    const n = i + 1;
    let line = raw;
    if (inBlockComment) { const end = line.indexOf('*/'); if (end < 0) return; line = line.slice(end + 2); inBlockComment = false; }
    line = line.replace(/\/\*.*?\*\//g, '').replace(/<!--.*?-->/g, '');
    const open = line.indexOf('/*'); if (open >= 0) { line = line.slice(0, open); inBlockComment = true; }
    if (/^\s*\/\//.test(line)) return;

    const startInStyle = inStyle && !COMPONENT_EXT.has(ext) && isMarkup, startInScript = inScript && !COMPONENT_EXT.has(ext) && isMarkup;
    if (isMarkup && !COMPONENT_EXT.has(ext)) {
      if (/<style\b/i.test(line)) inStyle = true;
      if (/<script\b/i.test(line) && !/<\/script>/i.test(line)) inScript = true;
    }
    const opensToken = tokenSelectors.some((s) => line.includes(s)) && line.includes('{');
    if (opensToken && tokenDepth === 0) tokenDepth = braceDepth + 1;
    if (isTailwindConfig && /fontFamily\s*:\s*\{/.test(line)) { state.inFontFamilyBlock = true; fontBlockDepth = braceDepth + 1; }
    braceDepth += (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
    const inTokens = isTokenFile || (tokenDepth > 0 && braceDepth >= tokenDepth) || opensToken;
    if (tokenDepth > 0 && braceDepth < tokenDepth) tokenDepth = 0;

    if (!inTokens) checkColors(file, n, line);
    checkFonts(file, n, line, state);
    if (state.inFontFamilyBlock && braceDepth < fontBlockDepth) state.inFontFamilyBlock = false;
    if (inStyle || isMarkup || !inScript) checkCss(file, n, line);
    if (isMarkup) checkLogo(file, n, line);
    if (isMarkup) {
      // Visible text of this line: drop inline <style>/<script> blocks and whatever is still inside one.
      let vis = line;
      if (!COMPONENT_EXT.has(ext)) {
        if (startInStyle) { const k = vis.search(/<\/style>/i); vis = k < 0 ? '' : vis.slice(k + 8); }
        if (startInScript) { const k = vis.search(/<\/script>/i); vis = k < 0 ? '' : vis.slice(k + 9); }
        vis = vis.replace(/<(style|script)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ').replace(/<(style|script)\b[\s\S]*$/i, ' ');
      }
      checkText(file, n, textOf(vis, ext), state);
      for (const a of line.matchAll(/\b(?:alt|aria-label|title|placeholder)=["']([^"']+)["']/g)) checkText(file, n, a[1], state);
      for (const b of line.matchAll(/<(?:a|button)\b[^>]*>\s*([^<{]+?)\s*<\/(?:a|button)>/gi))
        for (const c of GENERIC_CTAS)
          if (new RegExp(`^${esc(c)}\\s*[→›>]?$`, 'i').test(b[1].trim())) report(file, n, 'warn', 'generic-cta', `"${c}" says nothing. Name what happens: "Pesan meja", "Lihat menu"`);
    }
    if (isMarkup && !COMPONENT_EXT.has(ext)) {
      if (line.toLowerCase().lastIndexOf('</style>') > line.toLowerCase().lastIndexOf('<style')) inStyle = false;
      if (line.toLowerCase().lastIndexOf('</script>') > line.toLowerCase().lastIndexOf('<script')) inScript = false;
    }
  });

  if (isMarkup && voice.maxExclamationsPerPage != null && state.exclamations > voice.maxExclamationsPerPage)
    report(file, 0, 'warn', 'exclamations', `${state.exclamations} exclamation marks (max ${voice.maxExclamationsPerPage})`);
  if (state.emDashes >= 8 && state.emDashes >= state.chars / 500)
    report(file, 0, 'warn', 'em-dash', `${state.emDashes} em dashes in ${state.chars} characters of copy. Use periods and commas`);
  if (state.cadence >= 3) report(file, 0, 'warn', 'cadence', `${state.cadence} aphoristic lines ("Not X. Y." / "Bukan sekadar…"). Say the fact plainly`);
}

const files = fs.statSync(root).isFile() ? [root] : walk(root);
files.forEach(scan);

const errors = findings.filter((f) => f.level === 'error').length;
const warns = findings.length - errors;
if (asJson) {
  console.log(JSON.stringify({ files: files.length, errors, warnings: warns, findings }, null, 2));
} else {
  for (const f of findings) console.log(`${f.file}:${f.line}: ${f.level} [${f.rule}] ${f.msg}`);
  console.log(`\nbrand-check: ${files.length} files · ${errors} errors · ${warns} warnings${hasConfig ? '' : ' · no brand.json: tells-only mode'}`);
}
process.exit(errors ? 1 : 0);
