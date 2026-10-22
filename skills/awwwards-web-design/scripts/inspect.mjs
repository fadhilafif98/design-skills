// Called by inspect.sh. Renders a page in a real browser and measures it. Screenshots only on request
// (--shots fold|page), written to a temp dir outside the project so they never ship with the site.
//
//   inspect.sh <file-or-url> [--shots none|fold|page] [--out DIR] [--name page] [--widths 1440,768,390]
//              [--config design/brand.json] [--allow rule,rule] [--no-extra] [--json]
//
// Exit code 0 = no FAIL. Exit code 1 = at least one FAIL (the page is not done). 2 = usage error.
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';

const require = createRequire(path.join(process.env.NODE_PATH || process.cwd(), 'noop.js'));
const { chromium } = require('playwright');

const args = process.argv.slice(2);
const flag = (name, def) => { const i = args.indexOf('--' + name); if (i < 0) return def; const v = args[i + 1]; args.splice(i, 2); return v; };
const has = (name) => { const i = args.indexOf('--' + name); if (i < 0) return false; args.splice(i, 1); return true; };
// Default out dir: per-project temp dir. Holds picker skeleton signatures and any screenshots.
const tmpOut = path.join(os.tmpdir(), 'awwwards-inspect', `${path.basename(process.cwd())}-${crypto.createHash('sha1').update(process.cwd()).digest('hex').slice(0, 8)}`);
const outDir = path.resolve(flag('out', tmpOut));
const shotMode = flag('shots', 'none');
const name = flag('name', 'page');
const widths = flag('widths', '1440,768,390').split(',').map(Number).filter(Boolean);
const configPath = flag('config', fs.existsSync('design/brand.json') ? 'design/brand.json' : '');
const asJson = has('json');
const noExtra = has('no-extra');
const MAX_SLICES = 6;
const SETTLE = 1800;

let target = args[0];
if (!['none', 'fold', 'page'].includes(shotMode)) { console.error('inspect: --shots must be none, fold or page'); process.exit(2); }
if (!target) { console.error('usage: inspect.sh <file-or-url> [--shots none|fold|page] [--out DIR] [--name NAME] [--widths 1440,768,390] [--config brand.json] [--allow rule,rule] [--json]'); process.exit(2); }

const cfg = configPath && fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath, 'utf8')) : {};
const allow = new Set([...(flag('allow', '') || '').split(',').filter(Boolean), ...(cfg.inspect?.allow || [])]);
const allowedFonts = (cfg.fonts?.allowed || []).map((f) => f.toLowerCase());

// Local files are served over http so module scripts, fetch() and relative assets behave as when hosted.
let server = null;
if (!/^(https?|file):\/\//.test(target)) {
  const [filePart, query = ''] = target.split('?');
  const file = path.resolve(filePart);
  if (!fs.existsSync(file)) { console.error(`inspect: no such file: ${file}`); process.exit(2); }
  const cwd = process.cwd();
  const root = file.startsWith(cwd + path.sep) ? cwd : path.dirname(file);
  const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript',
    '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
    '.woff': 'font/woff', '.ttf': 'font/ttf', '.otf': 'font/otf', '.mp4': 'video/mp4', '.webm': 'video/webm' };
  server = createServer((req, res) => {
    try {
      let f = path.resolve(path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname)));
      if (f !== root && !f.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
      if (fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
      res.writeHead(200, { 'content-type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream', 'cache-control': 'no-store' });
      fs.createReadStream(f).pipe(res);
    } catch { res.writeHead(404); res.end('not found'); }
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  target = `http://127.0.0.1:${server.address().port}/${path.relative(root, file).split(path.sep).map(encodeURIComponent).join('/')}${query ? '?' + query : ''}`;
}

fs.mkdirSync(outDir, { recursive: true });
const findings = [];
const shots = [];
const foldNotes = [];
let foldSig = null;
const add = (level, rule, where, msg) => { if (!allow.has(rule)) findings.push({ level, rule, where, msg }); };

// Runs inside the page. Returns measurements; judging happens in Node so the rules stay readable.
function measure() {
  const cv = document.createElement('canvas'); cv.width = cv.height = 1;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  const rgba = (css) => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = '#000'; cx.fillStyle = css; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
  const over = (top, bottom) => { const a = top[3]; return [0, 1, 2].map((i) => top[i] * a + bottom[i] * (1 - a)).concat(1); };
  const lum = ([r, g, b]) => { const f = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
  const label = (el) => { let s = el.tagName.toLowerCase(); if (el.id) s += '#' + el.id; else if (el.classList.length) s += '.' + [...el.classList].slice(0, 2).join('.'); const t = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40); return t ? `${s} "${t}"` : s; };
  const vw = innerWidth, vh = innerHeight, sy = scrollY;
  const docH = document.documentElement.scrollHeight;

  const visible = (el) => {
    const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1 || cs.visibility === 'hidden' || cs.display === 'none') return false;
    let o = 1; for (let e = el; e && e.nodeType === 1; e = e.parentElement) o *= parseFloat(getComputedStyle(e).opacity);
    return o > 0.05;
  };
  const effectiveBg = (el) => {
    let layers = [];
    for (let e = el; e && e.nodeType === 1; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.backgroundImage !== 'none' || /^(IMG|VIDEO|CANVAS)$/.test(e.tagName)) return null; // text on a picture: unknown
      const c = rgba(cs.backgroundColor); if (c[3] > 0) layers.push(c);
      if (c[3] >= 1) break;
    }
    return layers.reverse().reduce((acc, c) => over(c, acc), [255, 255, 255, 1]);
  };
  const lineCount = (el) => {
    const range = document.createRange(); range.selectNodeContents(el);
    const tops = []; const lh = parseFloat(getComputedStyle(el).fontSize) * 0.5;
    for (const r of range.getClientRects()) if (r.width > 1 && r.height > 1 && !tops.some((t) => Math.abs(t - r.top) < lh)) tops.push(r.top);
    return tops.length;
  };

  const out = { vw, vh, docH, scrollW: document.documentElement.scrollWidth, title: document.title, lang: document.documentElement.lang };
  out.viewportMeta = document.querySelector('meta[name=viewport]')?.content || '';
  out.h1 = [...document.querySelectorAll('h1')].map((h) => ({ label: label(h), visible: visible(h), top: h.getBoundingClientRect().top + sy, lines: lineCount(h), size: parseFloat(getComputedStyle(h).fontSize) }));
  out.headings = [...document.querySelectorAll('h2,h3')].filter(visible).map((h) => ({ label: label(h), lines: lineCount(h), tag: h.tagName }));
  out.overflow = [...document.querySelectorAll('body *')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.right > document.documentElement.clientWidth + 1 && getComputedStyle(e).position !== 'fixed' && !e.closest('[data-overflow-ok]'); }).filter((e) => !e.parentElement || e.parentElement.getBoundingClientRect().right <= vw + 1).slice(0, 5).map(label);

  const texts = [...document.querySelectorAll('body *')].filter((e) => !e.closest('svg,script,style,noscript,[aria-hidden="true"]') && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1));
  out.lowContrast = []; out.unknownContrast = 0; out.fontSizes = new Set(); out.families = new Set(); out.centered = 0; out.textCount = 0;
  out.trackedCaps = []; out.mono = []; out.smallBody = []; out.invisible = [];
  for (const el of texts.slice(0, 2500)) {
    const cs = getComputedStyle(el); const size = parseFloat(cs.fontSize);
    if (!visible(el)) {
      const r = el.getBoundingClientRect(); if (cs.display !== 'none' && r.width > 0 && !el.closest('nav,dialog,[role=dialog],[hidden],details:not([open]),[data-picker]') && (el.textContent || '').trim().length > 3) out.invisible.push(label(el));
      continue;
    }
    out.textCount++;
    out.fontSizes.add(Math.round(size));
    out.families.add(cs.fontFamily.split(',')[0].trim().replace(/^["']|["']$/g, ''));
    if (cs.textAlign === 'center') out.centered++;
    if (cs.textTransform === 'uppercase' && parseFloat(cs.letterSpacing) / size >= 0.06 && size <= 14) out.trackedCaps.push(label(el));
    if (/mono|courier|consolas/i.test(cs.fontFamily) && !el.closest('pre,code,kbd,samp,table,[data-ui]')) out.mono.push(label(el));
    if (vw <= 480 && el.tagName === 'P' && size < 16) out.smallBody.push(label(el));
    const bg = effectiveBg(el);
    if (!bg) { out.unknownContrast++; continue; }
    const fg = over(rgba(cs.color), bg);
    const large = size >= 24 || (size >= 18.66 && parseInt(cs.fontWeight, 10) >= 700);
    const r = ratio(fg, bg); const need = large ? 3 : 4.5;
    if (r < need) out.lowContrast.push({ label: label(el), ratio: Math.round(r * 100) / 100, need });
  }
  out.fontSizes = out.fontSizes.size; out.families = [...out.families];
  out.loadedFonts = [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family.replace(/^["']|["']$/g, ''));
  out.failedFonts = [...document.fonts].filter((f) => f.status === 'error').map((f) => f.family.replace(/^["']|["']$/g, ''));

  const all = [...document.querySelectorAll('body *')];
  out.gradients = all.filter((e) => /gradient\(/.test(getComputedStyle(e).backgroundImage) && getComputedStyle(e).backgroundClip !== 'text' && getComputedStyle(e).webkitBackgroundClip !== 'text' && visible(e) && e.getBoundingClientRect().width > 120).slice(0, 5).map(label);
  out.gradientText = all.filter((e) => getComputedStyle(e).webkitBackgroundClip === 'text' || getComputedStyle(e).backgroundClip === 'text').slice(0, 3).map(label);
  out.blur = all.filter((e) => { const b = getComputedStyle(e).backdropFilter; return b && b !== 'none'; }).slice(0, 5).map(label);
  out.shadows = all.filter((e) => { const s = getComputedStyle(e).boxShadow; return s !== 'none' && !/^(rgba?\([^)]*\)|oklch\([^)]*\)) 0px 0px 0px 1px$/.test(s) && visible(e); }).length;

  const media = [...document.querySelectorAll('img,video,picture,canvas')].filter((e) => { const r = e.getBoundingClientRect(); return r.width >= 160 && r.height >= 120; });
  out.mediaCount = media.length;
  out.brokenImages = [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.getAttribute('src')).map((i) => i.getAttribute('src'));

  if (vw <= 480) out.smallTargets = [...document.querySelectorAll('a,button,input,select,textarea,[role=button],summary')].filter((e) => {
    if (!visible(e) || e.closest('p,li p,figcaption')) return false; const r = e.getBoundingClientRect(); return Math.min(r.width, r.height) < 44 && !(e.tagName === 'A' && getComputedStyle(e).display === 'inline');
  }).slice(0, 6).map(label);

  // Vertical coverage: stretches of the page with no text, media, or coloured field.
  let pageBg = rgba(getComputedStyle(document.body).backgroundColor);
  if (pageBg[3] === 0) pageBg = rgba(getComputedStyle(document.documentElement).backgroundColor);
  out.pageBg = pageBg;
  const spans = [];
  for (const e of all) {
    const r = e.getBoundingClientRect(); if (r.height < 4 || r.width < 40) continue;
    const cs = getComputedStyle(e);
    const isText = [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    const isMedia = /^(IMG|VIDEO|CANVAS|SVG|PICTURE|IFRAME)$/i.test(e.tagName);
    const bgc = rgba(cs.backgroundColor);
    const isField = (bgc[3] > 0.5 && bgc.slice(0, 3).some((v, i) => Math.abs(v - pageBg[i]) > 6) && r.width > vw * 0.5) || cs.backgroundImage !== 'none';
    if ((isText || isMedia || isField) && visible(e)) spans.push([r.top + sy, r.bottom + sy]);
  }
  spans.sort((a, b) => a[0] - b[0]);
  let reach = 0; out.blank = [];
  for (const [t, b] of spans) { if (t - reach > vh * 0.55) out.blank.push([Math.round(reach), Math.round(t)]); reach = Math.max(reach, b); }
  if (docH - reach > vh * 0.55) out.blank.push([Math.round(reach), docH]);
  return out;
}

// Runs inside the page at scrollY 0. Measures the first screen's ambition: what dominates, how much is picture,
// whether a boxed card sits beside the headline, and a coarse skeleton signature to compare concepts.
function foldMeasure() {
  const vw = innerWidth, vh = innerHeight, A = vw * vh;
  const clip = (r) => Math.max(0, Math.min(r.right, vw) - Math.max(r.left, 0)) * Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
  const visible = (el) => {
    const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1 || cs.visibility === 'hidden' || cs.display === 'none') return false;
    let o = 1; for (let e = el; e && e.nodeType === 1; e = e.parentElement) o *= parseFloat(getComputedStyle(e).opacity);
    return o > 0.05;
  };
  const label = (el) => { let s = el.tagName.toLowerCase(); if (el.id) s += '#' + el.id; else if (el.classList.length) s += '.' + [...el.classList].slice(0, 2).join('.'); const t = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40); return t ? `${s} "${t}"` : s; };
  const skip = (el) => el.closest('[data-picker],script,style,noscript');

  // Display type: glyph area per block, from text-node rects so nested spans are not counted twice.
  const blocks = new Map();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (!n.textContent.trim() || !n.parentElement || skip(n.parentElement) || !visible(n.parentElement)) continue;
    if (parseFloat(getComputedStyle(n.parentElement).fontSize) < 40) continue;
    let b = n.parentElement; while (b.parentElement && getComputedStyle(b).display.startsWith('inline')) b = b.parentElement;
    const range = document.createRange(); range.selectNodeContents(n);
    const e = blocks.get(b) || { area: 0, l: Infinity, t: Infinity, r: -Infinity, btm: -Infinity };
    for (const r of range.getClientRects()) { const a = clip(r); if (!a) continue; e.area += a; e.l = Math.min(e.l, r.left); e.t = Math.min(e.t, r.top); e.r = Math.max(e.r, r.right); e.btm = Math.max(e.btm, r.bottom); }
    blocks.set(b, e);
  }
  let type = { area: 0, label: '' }, h1Ink = null;
  for (const [b, e] of blocks) {
    if (e.area > type.area) type = { area: e.area, label: label(b) };
    if (b.closest('h1') && e.area) h1Ink = h1Ink ? { l: Math.min(h1Ink.l, e.l), t: Math.min(h1Ink.t, e.t), r: Math.max(h1Ink.r, e.r), b: Math.max(h1Ink.b, e.btm) } : { l: e.l, t: e.t, r: e.r, b: e.btm };
  }
  const h1 = [...document.querySelectorAll('h1')].find(visible);
  if (!h1Ink && h1) { const r = h1.getBoundingClientRect(); h1Ink = { l: r.left, t: r.top, r: r.right, b: r.bottom }; }

  // Pictures: img/video/canvas/picture and CSS url() backgrounds. Drawings (svg) count for dominance, not for picture cover.
  const all = [...document.querySelectorAll('body *')].filter((e) => !skip(e));
  const pics = [], drawings = [];
  for (const e of all) {
    const r = e.getBoundingClientRect(); if (r.width < 80 || r.height < 60 || !clip(r) || !visible(e)) continue;
    if (/^(IMG|VIDEO|CANVAS|PICTURE)$/.test(e.tagName) || /url\(/.test(getComputedStyle(e).backgroundImage)) pics.push({ r, label: label(e) });
    else if (e.tagName === 'svg' && !e.parentElement.closest('svg')) drawings.push({ r, label: label(e) });
  }
  const largest = (list) => list.reduce((m, p) => (clip(p.r) > m.area ? { area: clip(p.r), label: p.label } : m), { area: 0, label: '' });
  const pic = largest(pics), drawing = largest(drawings);
  let hit = 0, total = 0;
  for (let x = vw / 64; x < vw; x += vw / 32) for (let y = vh / 40; y < vh; y += vh / 20) { total++; if (pics.some(({ r }) => x >= r.left && x <= r.right && y >= r.top && y <= r.bottom)) hit++; }
  const kinds = [['type', type], ['picture', pic], ['drawing', drawing]].sort((a, b) => b[1].area - a[1].area);

  // A boxed card beside the headline: a box (fill step, border or shadow) in the fold, in the headline's band, not under it.
  const bgOf = (el) => { for (let e = el; e; e = e.parentElement) { const c = getComputedStyle(e).backgroundColor; if (!/rgba\(0, 0, 0, 0\)|transparent/.test(c)) return c; } return 'rgb(255, 255, 255)'; };
  const boxed = (e) => {
    const cs = getComputedStyle(e);
    if (cs.boxShadow !== 'none') return true;
    if (['Top', 'Right', 'Bottom', 'Left'].filter((s) => parseFloat(cs[`border${s}Width`]) >= 1 && cs[`border${s}Style`] !== 'none').length >= 3) return true;
    return !/rgba\(0, 0, 0, 0\)|transparent/.test(cs.backgroundColor) && cs.backgroundColor !== bgOf(e.parentElement);
  };
  let card = null;
  if (h1Ink) for (const e of all) {
    if (e.closest('header,nav,a,button,h1') || e.contains(h1)) continue;
    const r = e.getBoundingClientRect(); const a = r.width * r.height;
    if (r.width > vw * 0.75 || a < A * 0.06 || clip(r) < a * 0.6 || !visible(e) || !(e.textContent || '').trim()) continue;
    if (/url\(/.test(getComputedStyle(e).backgroundImage) || pics.some((p) => clip(p.r) && p.r.left >= r.left - 1 && p.r.right <= r.right + 1 && p.r.width * p.r.height > a * 0.5)) continue;
    if (!boxed(e)) continue;
    const vOverlap = Math.min(r.bottom, h1Ink.b + (h1Ink.b - h1Ink.t)) - Math.max(r.top, h1Ink.t);
    const beside = r.left >= h1Ink.r - 8 || r.right <= h1Ink.l + 8;
    if (beside && vOverlap > 0) { card = label(e); break; }
  }

  const ps = [...document.querySelectorAll('p')].filter(visible).map((p) => parseFloat(getComputedStyle(p).fontSize)).sort((a, b) => a - b);
  const body = ps.length ? ps[Math.floor(ps.length / 2)] : 16;
  const h1Size = h1 ? parseFloat(getComputedStyle(h1).fontSize) : 0;
  const cx = h1Ink ? (h1Ink.l + h1Ink.r) / 2 / vw : 0, cy = h1Ink ? (h1Ink.t + h1Ink.b) / 2 / vh : 0;
  const cover = total ? hit / total : 0;
  return {
    dominant: { kind: kinds[0][0], share: kinds[0][1].area / A, label: kinds[0][1].label },
    pictureCover: cover, pictures: pics.length, card, h1Size, ratio: h1Size / body,
    sig: {
      anchorX: cx < 0.4 ? 'left' : cx > 0.6 ? 'right' : 'centre',
      anchorY: cy < 0.38 ? 'top' : cy > 0.62 ? 'bottom' : 'middle',
      dominant: kinds[0][0],
      cover: cover < 0.1 ? 'none' : cover < 0.5 ? 'part' : 'most',
      card: card ? 'beside' : 'none',
      scale: h1Size / vw < 0.06 ? 'small' : h1Size / vw < 0.1 ? 'large' : 'huge',
    },
  };
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = innerHeight / 3;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
  });
  await page.waitForTimeout(900);
}

function judge(m, w) {
  const at = `${w}px`;
  if (/user-scalable\s*=\s*(no|0)|maximum-scale\s*=\s*1(\.0)?(?![\d.])/i.test(m.viewportMeta)) add('FAIL', 'zoom-disabled', at, `Viewport meta disables zoom ("${m.viewportMeta}"). Never block pinch-zoom`);
  if (!m.viewportMeta) add('FAIL', 'viewport-meta', at, 'No <meta name="viewport">: phones render the desktop layout zoomed out');
  if (m.h1.length === 0) add('FAIL', 'h1', at, 'No <h1>. The first screen needs a title that says what this is');
  const shownH1 = m.h1.filter((h) => h.visible);
  if (shownH1.length > 1) add('WARN', 'h1', at, `${shownH1.length} visible <h1> elements`);
  for (const h of shownH1) {
    if (h.top > m.vh) add('FAIL', 'h1-fold', at, `${h.label} starts below the first screen`);
    if (h.lines > 2) add('FAIL', 'headline-lines', at, `${h.label} runs ${h.lines} lines. Max 2: cut words, then widen, size last`);
  }
  for (const h of m.headings) if (h.lines > 2) add('WARN', 'headline-lines', at, `${h.tag} ${h.label} runs ${h.lines} lines`);
  if (m.scrollW > w + 1) add('FAIL', 'overflow', at, `Page scrolls sideways (${m.scrollW}px > ${w}px): ${m.overflow.join(', ')}`);
  for (const c of m.lowContrast.slice(0, 8)) add('FAIL', 'contrast', at, `${c.label}: ${c.ratio}:1 (needs ${c.need}:1)`);
  if (m.lowContrast.length > 8) add('FAIL', 'contrast', at, `+${m.lowContrast.length - 8} more low-contrast text elements`);
  if (m.brokenImages.length) add('FAIL', 'broken-image', at, m.brokenImages.slice(0, 5).join(', '));
  if (m.failedFonts.length) add('FAIL', 'font-load', at, `Fonts failed to load: ${[...new Set(m.failedFonts)].join(', ')}`);
  if (allowedFonts.length) for (const f of m.families) if (!allowedFonts.includes(f.toLowerCase()) && !/^(serif|sans-serif|monospace|system-ui|ui-\w+|-apple-system)$/i.test(f))
    add('FAIL', 'font-brand', at, `Rendered text uses "${f}", not in brand.json fonts.allowed`);
  const [r, g, b] = m.pageBg;
  if (Math.min(r, g, b) >= 209 && r >= g && g >= b && r - b >= 6 && r - b <= 48)
    add('WARN', 'cream-ground', at, `Page ground rgb(${r} ${g} ${b}) is the warm-cream default of generated pages. Keep only if the subject's own material is this colour, and say so in DESIGN.md`);
  if (m.fontSizes > 9) add('WARN', 'type-sizes', at, `${m.fontSizes} distinct font sizes. Five far-apart sizes read as a system`);
  if (m.textCount > 10 && m.centered / m.textCount > 0.7) add('WARN', 'centered', at, `${Math.round((m.centered / m.textCount) * 100)}% of text is centred`);
  if (m.trackedCaps.length >= 3) add('WARN', 'tracked-caps', at, `${m.trackedCaps.length} tiny tracked-uppercase labels (template tell): ${m.trackedCaps.slice(0, 3).join(', ')}`);
  if (m.mono.length >= 3) add('WARN', 'mono-labels', at, `${m.mono.length} monospace text elements outside code/data: ${m.mono.slice(0, 3).join(', ')}`);
  if (m.gradientText.length) add('WARN', 'gradient-text', at, m.gradientText.join(', '));
  if (m.gradients.length) add('WARN', 'gradient', at, `Gradient backgrounds: ${m.gradients.join(', ')}. Justify (scrim, concept) or remove`);
  if (m.blur.length >= 2) add('WARN', 'glass', at, `backdrop-filter on ${m.blur.join(', ')}`);
  if (m.shadows > 6) add('WARN', 'shadows', at, `${m.shadows} elements with box-shadow. Shadows only on what floats`);
  for (const [a, b] of m.blank) add('WARN', 'blank-stretch', at, `Nothing from y=${a} to y=${b} (${Math.round((b - a) / m.vh * 100)}% of a screen)`);
  if (m.invisible.length >= 3) add('FAIL', 'hidden-after-scroll', at, `${m.invisible.length} text elements still invisible after scrolling through: ${m.invisible.slice(0, 4).join(', ')}`);
  if (m.smallTargets?.length) add('WARN', 'tap-target', at, `Tap targets < 44px: ${m.smallTargets.join(', ')}`);
  if (m.smallBody?.length) add('WARN', 'small-body', at, `Paragraph text < 16px on phone: ${m.smallBody.slice(0, 3).join(', ')}`);
}

function judgeFold(f, w) {
  const at = `${w}px`; const pct = (x) => `${Math.round(x * 100)}%`;
  foldNotes.push(`fold ${at}: dominant ${f.dominant.kind} ${pct(f.dominant.share)}${f.dominant.label ? ` (${f.dominant.label})` : ''} · pictures ${pct(f.pictureCover)} · h1 ${Math.round(f.h1Size)}px = ${f.ratio.toFixed(1)}× body`);
  if (w >= 768) {
    if (f.dominant.share < 0.2) add('FAIL', 'timid-hero', at, `Nothing dominates the first screen: the largest thing (${f.dominant.kind}) covers ${pct(f.dominant.share)}. Make one picture or the display type take ≥ 35% (awwwards-patterns.md §2)`);
    else if (f.dominant.share < 0.35) add('WARN', 'timid-hero', at, `The dominant ${f.dominant.kind} covers ${pct(f.dominant.share)} of the first screen. Award-level heroes give one thing ≥ 35%`);
    if (f.card) add('FAIL', 'hero-card', at, `Boxed card beside the headline: ${f.card}. This is the split-hero template. Move the live thing to the section that proves it, or make it part of the composition (awwwards-patterns.md §2)`);
  }
  if (w >= 1024 && f.ratio < 6) add('WARN', 'display-scale', at, `Display type is only ${f.ratio.toFixed(1)}× the body size. Award-level contrast is ≥ 6× (type-led ≥ 10×)`);
  if (f.pictures === 0 && f.dominant.kind === 'type' && w >= 1024) add('WARN', 'no-fold-picture', at, 'No picture on the first screen. Fine only for a type-led concept that DESIGN.md §0 declares; otherwise use the imagery plan (visual-craft.md §4)');
}

// Picker variants (concept1, concept2, …) must not share a skeleton. Each run saves its signature; siblings are compared.
function compareSkeletons(sig) {
  fs.writeFileSync(path.join(outDir, `${name}.fold.json`), JSON.stringify(sig));
  const m = name.match(/^(.*?)\d+$/); if (!m) return;
  for (const f of fs.readdirSync(outDir)) {
    const other = f.replace(/\.fold\.json$/, ''); if (other === f || other === name || !other.match(new RegExp(`^${m[1]}\\d+$`))) continue;
    const o = JSON.parse(fs.readFileSync(path.join(outDir, f), 'utf8'));
    const same = Object.keys(sig).filter((k) => sig[k] === o[k]);
    if (same.length >= Object.keys(sig).length - 1) add('FAIL', 'same-skeleton', 'picker', `${name} and ${other} share the same first-screen skeleton (${same.map((k) => `${k} ${sig[k]}`).join(', ')}). Different colours and fonts on one skeleton are one concept: build each from its dealt composition`);
  }
}

// Screen 1 is the fold shot, so slices start at screen 2.
async function slices(page, prefix) {
  const { docH, vh } = await page.evaluate(() => ({ docH: document.documentElement.scrollHeight, vh: innerHeight }));
  const n = Math.min(MAX_SLICES, Math.ceil(docH / vh));
  for (let i = 1; i < n; i++) {
    await page.evaluate((y) => scrollTo(0, y), i * vh);
    await page.waitForTimeout(250);
    const p = `${prefix}-${String(i + 1).padStart(2, '0')}.png`;
    await page.screenshot({ path: p }); shots.push(p);
  }
}

const browser = await chromium.launch();
try {
  for (const w of widths) {
    const mobile = w <= 480;
    const ctx = await browser.newContext({ viewport: { width: w, height: mobile ? 844 : 900 }, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
    const page = await ctx.newPage();
    page.on('pageerror', (e) => add('FAIL', 'js-error', `${w}px`, String(e.message).slice(0, 160)));
    await page.goto(target, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(SETTLE);
    if (shotMode !== 'none') { const fold = path.join(outDir, `${name}-${w}-fold.png`); await page.screenshot({ path: fold }); shots.push(fold); }
    await scrollThrough(page);
    judge(await page.evaluate(measure), w);
    await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(400);
    const fm = await page.evaluate(foldMeasure);
    judgeFold(fm, w);
    if (!foldSig && w >= 1024) foldSig = fm.sig;
    if (shotMode === 'page') await slices(page, path.join(outDir, `${name}-${w}`));
    await ctx.close();
  }

  if (!noExtra) {
    // Reduced motion: content must be fully visible with travel removed.
    const rm = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    const p1 = await rm.newPage();
    await p1.goto(target, { waitUntil: 'networkidle' }); await p1.waitForTimeout(SETTLE); await scrollThrough(p1);
    const m1 = await p1.evaluate(measure);
    if (m1.invisible.length >= 3) add('FAIL', 'reduced-motion', '1440px', `${m1.invisible.length} text elements invisible with reduced motion: ${m1.invisible.slice(0, 3).join(', ')}`);
    if (shotMode === 'page') { const rmShot = path.join(outDir, `${name}-reduced-motion.png`); await p1.screenshot({ path: rmShot }); shots.push(rmShot); }
    await rm.close();

    // No JavaScript: the content must still be there.
    const nj = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
    const p2 = await nj.newPage();
    await p2.goto(target, { waitUntil: 'load' }); await p2.waitForTimeout(600);
    const m2 = await p2.evaluate(measure);
    if (m2.h1.length && !m2.h1.some((h) => h.visible)) add('FAIL', 'no-js', '1440px', 'The <h1> is invisible without JavaScript. Hide reveal targets only from JS (html.js class)');
    if (m2.invisible.length >= 3) add('FAIL', 'no-js', '1440px', `${m2.invisible.length} text elements invisible without JavaScript`);
    if (shotMode === 'page') { const njShot = path.join(outDir, `${name}-no-js.png`); await p2.screenshot({ path: njShot }); shots.push(njShot); }
    await nj.close();

    // Narrowest phone: catches overflow the 390 pass hides.
    const nc = await browser.newContext({ viewport: { width: 320, height: 640 }, isMobile: true, hasTouch: true });
    const p3 = await nc.newPage();
    await p3.goto(target, { waitUntil: 'networkidle' }); await p3.waitForTimeout(SETTLE);
    const m3 = await p3.evaluate(measure);
    if (m3.scrollW > 321) add('FAIL', 'overflow', '320px', `Page scrolls sideways at 320px: ${m3.overflow.join(', ')}`);
    for (const h of m3.h1) if (h.lines > 3) add('WARN', 'headline-lines', '320px', `${h.label} runs ${h.lines} lines at 320px`);
    if (shotMode === 'page') { const ncShot = path.join(outDir, `${name}-320-fold.png`); await p3.screenshot({ path: ncShot }); shots.push(ncShot); }
    await nc.close();
  }
} finally {
  await browser.close();
  server?.close();
}

if (foldSig) compareSkeletons(foldSig);

const fails = findings.filter((f) => f.level === 'FAIL').length;
const warns = findings.length - fails;
if (asJson) console.log(JSON.stringify({ target, fails, warns, findings, fold: foldNotes, shots }, null, 2));
else {
  for (const n of foldNotes) console.log(n);
  for (const f of findings) console.log(`${f.level.padEnd(4)} [${f.rule}] ${f.where}: ${f.msg}`);
  if (shots.length) console.log(`\nScreenshots (temp, not part of the site):\n${shots.map((s) => '  ' + s).join('\n')}`);
  console.log(`\ninspect: ${fails} FAIL · ${warns} WARN${allow.size ? ` · allowed: ${[...allow].join(', ')}` : ''}`);
}
process.exit(fails ? 1 : 0);
