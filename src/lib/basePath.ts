export const PUBLIC_BASE_PATH = process.env['NEXT_PUBLIC_BASE_PATH'] ?? '';

export function withBasePath(href: string): string {
  if (!PUBLIC_BASE_PATH || !href.startsWith('/')) return href;
  if (href.startsWith(`${PUBLIC_BASE_PATH}/`) || href === PUBLIC_BASE_PATH) return href;
  return `${PUBLIC_BASE_PATH}${href}`;
}
