// src/components/page/WizardDynamic.tsx
// 'use client' — required because next/dynamic ssr:false is only allowed
// in Client Components in Next.js 15 App Router.
// This thin wrapper holds the dynamic import so the RSC page stays clean.

'use client';

import dynamic from 'next/dynamic';

const WizardClient = dynamic(
  () => import('./WizardClient').then((m) => m.WizardClient),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[400px] bg-[var(--color-paper-3)] animate-pulse"
        aria-busy="true"
        aria-label="Loading wizard"
      />
    ),
  },
);

export function WizardDynamic() {
  return <WizardClient />;
}
