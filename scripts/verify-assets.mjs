import {readdir, readFile} from 'node:fs/promises';
import path from 'node:path';

const directory = path.join(process.cwd(), 'public/assets/mistfall-hunter');
const files = (await readdir(directory)).filter((name) => name.endsWith('.webp'));
const manifest = await readFile(path.join(directory, 'SOURCES.md'), 'utf8');
const missing = files.filter((file) => !manifest.includes(`\`${file}\``));

if (files.length < 5 || missing.length) {
  throw new Error(`Asset verification failed. Undocumented: ${missing.join(', ')}`);
}

console.log(`Verified ${files.length} local Mistfall Hunter assets.`);
