'use client';
// src/components/motion/PageTransition.tsx
// 'use client'. 180ms inkblot wipe in --accent between route changes.
// Uses Framer Motion LazyMotion + m (NEVER bare motion import).
// Reduced-motion: instant change, no wipe.
// Boundary: imports only hooks/.

import { LazyMotion, m, domAnimation, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface PageTransitionProps {
  children: React.ReactNode;
  /** Route key — changes trigger the exit/enter animation */
  routeKey: string;
}

/**
 * <PageTransition> — inkblot wipe overlay between route changes.
 * 180ms wipe in --accent (oxblood-brick) from top-left → full overlay → exit.
 * Wrap page content: <PageTransition routeKey={pathname}>{children}</PageTransition>
 * Reduced-motion: AnimatePresence still renders children but with instant opacity.
 */
export function PageTransition({ children, routeKey }: PageTransitionProps) {
  const reducedMotion = useReducedMotion();

  const variants = reducedMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
      }
    : {
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] as number[] },
        },
        exit: {
          opacity: 0,
          transition: { duration: 0.12, ease: [0.36, 0, 0.66, 0] as number[] },
        },
      };

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={routeKey}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ position: 'relative' }}
        >
          {children}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
}
