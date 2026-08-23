import fs from 'node:fs';
import path from 'node:path';

const roots = ['app', 'components', 'content', 'i18n', 'lib', 'messages'];
const forbidden = [
  /farever(?:game|n)?/i,
  /metamist/i,
  /gmtreks/i,
  /mobalytics/i,
  /gamespot/i,
  /example\.com/i,
  /https?:\/\/(?!www\.buildcodex\.net|store\.steampowered\.com|www\.googletagmanager\.com|pl30983257\.profitableratecpmnetwork\.com\/fb64f8a45df041e88f19ca037df3a65a\/invoke\.js)/i
];
const extensions = new Set(['.ts', '.tsx', '.js', '.mjs', '.json', '.mdx']);
const violations = [];

function scan(target) {
  for (const entry of fs.readdirSync(target, {withFileTypes: true})) {
    const file = path.join(target, entry.name);
    if (entry.isDirectory()) scan(file);
    else if (extensions.has(path.extname(entry.name))) {
      const source = fs.readFileSync(file, 'utf8');
      for (const pattern of forbidden) {
        if (pattern.test(source)) violations.push(`${file}: ${pattern}`);
      }
    }
  }
}

for (const root of roots) scan(path.join(process.cwd(), root));

if (violations.length) {
  console.error(`Published-content audit failed:\n${violations.join('\n')}`);
  process.exit(1);
}

console.log('Published-content audit passed: no legacy site identity or domain found.');
