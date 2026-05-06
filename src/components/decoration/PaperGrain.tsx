// src/components/decoration/PaperGrain.tsx
// RSC — no 'use client'. Fixed-position paper grain texture overlay.
// The CSS class .paper-grain is defined in src/styles/atmosphere.css.
// This component is aria-hidden — purely decorative.

/**
 * <PaperGrain> — fixed-position paper-fiber noise texture.
 *
 * Renders a <div> with the .paper-grain CSS class which applies:
 *   - background-image: url('/textures/grain.webp')
 *   - opacity: 0.06
 *   - mix-blend-mode: multiply
 *   - position: fixed, inset-0
 *   - pointer-events: none
 *
 * Mount once in the root layout inside <body> before {children}.
 * The atmosphere.css class handles all the visual behavior.
 *
 * @example
 * // In layout.tsx
 * <body>
 *   <PaperGrain />
 *   {children}
 * </body>
 */
export function PaperGrain() {
  return (
    <div
      className="paper-grain"
      aria-hidden="true"
      // pointer-events: none is set in atmosphere.css
    />
  );
}
