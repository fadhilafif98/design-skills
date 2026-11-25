// Syncs package.json version into SKILL.md frontmatters and README.md badge.
// Runs automatically on `npm version patch|minor|major`.
import fs from 'node:fs';

const { version } = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const targets = [
  {
    file: 'skills/maestro/SKILL.md',
    re: /^(\s*version:\s*["']?)[\d.]+(["']?)$/m,
    replace: `$1${version}$2`,
  },
  {
    file: 'skills/design-consulting/SKILL.md',
    re: /^(\s*version:\s*["']?)[\d.]+(["']?)$/m,
    replace: `$1${version}$2`,
  },
  {
    file: 'skills/maestro-unslop/SKILL.md',
    re: /^(\s*version:\s*["']?)[\d.]+(["']?)$/m,
    replace: `$1${version}$2`,
  },
  {
    file: 'README.md',
    re: /(badge\/version-v)[\d.]+(-)/,
    replace: `$1${version}$2`,
  },
];

for (const { file, re, replace } of targets) {
  const src = fs.readFileSync(file, 'utf8');
  if (!re.test(src)) {
    console.error(`sync-version: pattern not found in ${file}`);
    process.exit(1);
  }
  const next = src.replace(re, replace);
  if (next !== src) fs.writeFileSync(file, next, 'utf8');
}

console.log(`Synced version ${version} across SKILL.md files and README.md`);
