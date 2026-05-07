import { promises as fs } from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'out');
const repoName = process.env['GITHUB_REPOSITORY']?.split('/')[1] ?? 'gbfeeds-rebuild';
const basePath = `/${repoName}`;

const textExtensions = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.txt',
  '.webmanifest',
  '.xml',
]);

async function walk(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(fullPath) : [fullPath];
    }),
  );
  return files.flat();
}

function prefixRootRelativeUrls(source: string): string {
  return source
    .replace(/(href|src|content|action)=("|')\/(?!\/|#|gbfeeds-rebuild\/)/g, `$1=$2${basePath}/`)
    .replace(/url\(("|')?\/(?!\/|#|gbfeeds-rebuild\/)/g, `url($1${basePath}/`)
    .replace(
      /(["'`])\/(?!\/|#|gbfeeds-rebuild\/)(_next|brand|icons|og|photos|products|textures)\//g,
      `$1${basePath}/$2/`,
    );
}

async function main() {
  const files = await walk(outDir);
  await fs.writeFile(path.join(outDir, '.nojekyll'), '');

  for (const file of files) {
    if (!textExtensions.has(path.extname(file))) continue;
    const original = await fs.readFile(file, 'utf8');
    const rewritten = prefixRootRelativeUrls(original);
    if (rewritten !== original) {
      await fs.writeFile(file, rewritten);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
