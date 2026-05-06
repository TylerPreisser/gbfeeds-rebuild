// PostCSS configuration for Tailwind v4.
// Must register @tailwindcss/postcss so the @theme block in tokens.css is
// processed and utility classes (flex, grid, bg-paper, text-ink, etc.) are
// emitted into the production CSS bundle.
//
// Without this file, Next.js ships globals.css raw — `@theme {}` is not a
// real CSS feature, the browser ignores everything inside it, and zero
// Tailwind utility classes exist at runtime.
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
