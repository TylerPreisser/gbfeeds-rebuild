// mdx-components.tsx
// Root MDX component mapping — required by next-mdx-remote/rsc at the repo root.
// Maps MDX element types to GB Feeds atomic components.
// RSC: no 'use client'.

import type { MDXComponents } from 'mdx/types';
import { Heading } from '@/components/atomic/Heading';
import { Text } from '@/components/atomic/Text';
import { Rule } from '@/components/atomic/Rule';
import { Link } from '@/components/atomic/Link';

/**
 * MDX component overrides for GB Feeds journal articles.
 * h1 → Heading display-lg
 * h2 → Heading display-md
 * h3 → Heading display-sm
 * p  → Text body-md with journal line-height
 * blockquote → DM Serif italic block
 * code → JetBrains Mono inline
 * pre → JetBrains Mono block
 * hr  → Rule hair
 * a   → Link
 */
// Named getMDXComponents (not useMDXComponents) to avoid react-hooks/rules-of-hooks
// when called from async RSC pages. next-mdx-remote/rsc only needs the components map.
export function getMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, ...props }) => (
      <Heading as="h1" size="display-lg" className="mt-8 mb-4" {...props}>
        {children}
      </Heading>
    ),
    h2: ({ children, ...props }) => (
      <Heading as="h2" size="display-md" className="mt-10 mb-5" {...props}>
        {children}
      </Heading>
    ),
    h3: ({ children, ...props }) => (
      <Heading as="h3" size="display-sm" className="mt-8 mb-4" {...props}>
        {children}
      </Heading>
    ),
    p: ({ children, ...props }) => (
      <Text
        variant="body-md"
        className="leading-[1.5] text-[var(--color-ink-muted)] mb-5"
        {...props}
      >
        {children}
      </Text>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="my-8 pl-5 border-l-2 border-[var(--color-accent)]"
        {...props}
      >
        <div className="font-body italic text-body-lg text-[var(--color-ink)] leading-[1.3]">
          {children}
        </div>
      </blockquote>
    ),
    code: ({ children, ...props }) => (
      <code
        className="font-mono text-mono-xs tracking-[0.04em] bg-[var(--color-paper-2)]
          border border-[var(--color-rule)] px-1.5 py-0.5 rounded-none"
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre
        className="font-mono text-mono-xs tracking-[0.04em] bg-[var(--color-paper-2)]
          border border-[var(--color-rule)] p-4 overflow-x-auto my-6"
        {...props}
      >
        {children}
      </pre>
    ),
    hr: () => <Rule weight="hair" className="my-8" />,
    a: ({ href, children, ...props }) => (
      <Link href={href ?? '#'} variant="inline" {...props}>
        {children}
      </Link>
    ),
    ul: ({ children, ...props }) => (
      <ul className="list-none flex flex-col gap-2 mb-5" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal list-inside flex flex-col gap-2 mb-5 ml-4" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li
        className="flex items-start gap-3 font-body text-body-md text-[var(--color-ink-muted)] leading-[1.5]"
        {...props}
      >
        <span
          className="shrink-0 mt-[0.6em] w-4 h-px bg-[var(--color-accent)]"
          aria-hidden="true"
        />
        <span>{children}</span>
      </li>
    ),
    strong: ({ children, ...props }) => (
      <strong className="font-display uppercase tracking-[0.02em]" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em className="font-body italic text-[var(--color-ink)]" {...props}>
        {children}
      </em>
    ),
    ...components,
  };
}
