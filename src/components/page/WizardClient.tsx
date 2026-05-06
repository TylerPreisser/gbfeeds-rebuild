'use client';
// src/components/page/WizardClient.tsx
// 'use client' — useReducer wizard state.
// Steps: 1 Region → 2 Season → 3 Goal → 4 Prescription.
// Uses wizardReducer from @/types/wizard.
// Boundary: page/ imports composite/ + atomic/ + data/ + types/.

import { useReducer } from 'react';
import { wizardReducer, WIZARD_INITIAL_STATE } from '@/types/wizard';
import type { Region, Season, Goal } from '@/types/wizard';
import { getBundle } from '@/data/feed-program-map';
import { getAllProducts } from '@/data/products';
import { PrescriptionPad } from '@/components/composite/PrescriptionPad';
import { Heading } from '@/components/atomic/Heading';
import { Rule } from '@/components/atomic/Rule';
import { cn } from '@/lib/cn';

// ─── Step definitions ─────────────────────────────────────────────────────────

const REGION_CHIPS: Array<{ value: Region; label: string; description: string }> = [
  { value: 'kansas', label: 'Kansas', description: 'Central plains, heavy agriculture' },
  { value: 'midwest', label: 'Midwest', description: 'Corn belt, mixed timber/ag' },
  { value: 'plains', label: 'Plains', description: 'Open prairie, minimal cover' },
  { value: 'south', label: 'South', description: 'Warm climate, longer seasons' },
];

const SEASON_CHIPS: Array<{ value: Season; label: string; description: string }> = [
  { value: 'pre-rut', label: 'Pre-Rut', description: 'Late Sep → Mid Oct' },
  { value: 'rut', label: 'Rut', description: 'Mid Oct → Mid Nov' },
  { value: 'post-rut', label: 'Post-Rut', description: 'Mid Nov → Jan' },
  { value: 'antler-growth', label: 'Antler Growth', description: 'Apr → Aug' },
];

const GOAL_CHIPS: Array<{ value: Goal; label: string; description: string }> = [
  { value: 'trophy', label: 'Trophy', description: 'Pattern mature bucks' },
  { value: 'health', label: 'Herd Health', description: 'Does, fawns, all deer' },
  { value: 'density', label: 'Density', description: 'Hold deer on your land' },
];

// ─── Chip component ────────────────────────────────────────────────────────────

function SelectionChip({
  label,
  description,
  selected,
  onClick,
}: {
  label: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'text-left px-5 py-4 border transition-all duration-150',
        'focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]',
        'hover:border-[var(--color-ink)]',
        selected
          ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]'
          : 'border-[var(--color-rule)] bg-[var(--color-paper-3)] text-[var(--color-ink)]',
      )}
      aria-pressed={selected}
    >
      <span className="block font-display uppercase tracking-[0.02em] text-display-sm">
        {label}
      </span>
      <span
        className={cn(
          'block font-mono text-mono-xs tracking-[0.04em] uppercase mt-1 transition-colors',
          selected ? 'text-[var(--color-paper)] opacity-70' : 'text-[var(--color-ink-quiet)]',
        )}
      >
        {description}
      </span>
    </button>
  );
}

// ─── Wizard ───────────────────────────────────────────────────────────────────

/**
 * <WizardClient> — 4-step feed program wizard.
 * Step 1: region (4 chips)
 * Step 2: season (4 chips)
 * Step 3: goal (3 chips)
 * Step 4: <PrescriptionPad> output
 */
export function WizardClient() {
  const [state, dispatch] = useReducer(wizardReducer, WIZARD_INITIAL_STATE);

  const allProducts = getAllProducts();
  const productNames: Record<string, string> = {};
  const productPrices: Record<string, string> = {};
  for (const p of allProducts) {
    productNames[p.slug] = p.displayName;
    productPrices[p.slug] = p.salePriceUsd ?? p.priceUsd;
  }

  const canAdvanceStep1 = state.region !== null;
  const canAdvanceStep2 = state.season !== null;
  const canAdvanceStep3 = state.goal !== null;

  const bundle =
    state.region && state.season && state.goal
      ? getBundle(state.region, state.season, state.goal)
      : null;

  return (
    <div className="flex flex-col gap-8">

      {/* ── STEP PROGRESS ──────────────────────────────────────────────── */}
      <nav aria-label="Wizard steps" className="flex items-center gap-2">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <span
              className={cn(
                'w-6 h-6 flex items-center justify-center',
                'font-mono text-mono-xs tracking-[0.04em] border',
                s === state.step
                  ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]'
                  : s < state.step
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-paper)]'
                  : 'border-[var(--color-rule)] text-[var(--color-ink-quiet)]',
              )}
              aria-current={s === state.step ? 'step' : undefined}
            >
              {s < state.step ? '✓' : s}
            </span>
            {s < 4 && (
              <div
                className={cn(
                  'h-px w-8 transition-colors duration-300',
                  s < state.step ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-rule)]',
                )}
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </nav>

      <Rule weight="hair" />

      {/* ── STEP 1: REGION ───────────────────────────────────────────────── */}
      {state.step === 1 && (
        <section aria-label="Step 1: Select your region">
          <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)] mb-3">
            STEP 01 OF 04
          </p>
          <Heading as="h2" size="display-md" className="mb-6">
            Where Do You Hunt?
          </Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {REGION_CHIPS.map((chip) => (
              <SelectionChip
                key={chip.value}
                label={chip.label}
                description={chip.description}
                selected={state.region === chip.value}
                onClick={() => dispatch({ type: 'SET_REGION', region: chip.value })}
              />
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => dispatch({ type: 'NEXT' })}
              disabled={!canAdvanceStep1}
              className={cn(
                'px-8 py-3 font-display uppercase tracking-[0.02em] text-body-md',
                'border transition-colors duration-150',
                'focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]',
                canAdvanceStep1
                  ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[var(--color-gray-900)]'
                  : 'border-[var(--color-rule)] bg-transparent text-[var(--color-ink-quiet)] cursor-not-allowed',
              )}
              aria-disabled={!canAdvanceStep1}
            >
              NEXT →
            </button>
          </div>
        </section>
      )}

      {/* ── STEP 2: SEASON ───────────────────────────────────────────────── */}
      {state.step === 2 && (
        <section aria-label="Step 2: Select your season">
          <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)] mb-3">
            STEP 02 OF 04
          </p>
          <Heading as="h2" size="display-md" className="mb-6">
            What Season?
          </Heading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SEASON_CHIPS.map((chip) => (
              <SelectionChip
                key={chip.value}
                label={chip.label}
                description={chip.description}
                selected={state.season === chip.value}
                onClick={() => dispatch({ type: 'SET_SEASON', season: chip.value })}
              />
            ))}
          </div>
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => dispatch({ type: 'PREV' })}
              className="px-6 py-3 font-display uppercase tracking-[0.02em] text-body-sm
                border border-[var(--color-rule)] text-[var(--color-ink-quiet)]
                hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]
                transition-colors duration-150
                focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            >
              ← BACK
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: 'NEXT' })}
              disabled={!canAdvanceStep2}
              className={cn(
                'px-8 py-3 font-display uppercase tracking-[0.02em] text-body-md',
                'border transition-colors duration-150',
                'focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]',
                canAdvanceStep2
                  ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[var(--color-gray-900)]'
                  : 'border-[var(--color-rule)] bg-transparent text-[var(--color-ink-quiet)] cursor-not-allowed',
              )}
              aria-disabled={!canAdvanceStep2}
            >
              NEXT →
            </button>
          </div>
        </section>
      )}

      {/* ── STEP 3: GOAL ─────────────────────────────────────────────────── */}
      {state.step === 3 && (
        <section aria-label="Step 3: Select your goal">
          <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)] mb-3">
            STEP 03 OF 04
          </p>
          <Heading as="h2" size="display-md" className="mb-6">
            What&apos;s Your Goal?
          </Heading>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {GOAL_CHIPS.map((chip) => (
              <SelectionChip
                key={chip.value}
                label={chip.label}
                description={chip.description}
                selected={state.goal === chip.value}
                onClick={() => dispatch({ type: 'SET_GOAL', goal: chip.value })}
              />
            ))}
          </div>
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => dispatch({ type: 'PREV' })}
              className="px-6 py-3 font-display uppercase tracking-[0.02em] text-body-sm
                border border-[var(--color-rule)] text-[var(--color-ink-quiet)]
                hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]
                transition-colors duration-150
                focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            >
              ← BACK
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: 'NEXT' })}
              disabled={!canAdvanceStep3}
              className={cn(
                'px-8 py-3 font-display uppercase tracking-[0.02em] text-body-md',
                'border transition-colors duration-150',
                'focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]',
                canAdvanceStep3
                  ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[var(--color-gray-900)]'
                  : 'border-[var(--color-rule)] bg-transparent text-[var(--color-ink-quiet)] cursor-not-allowed',
              )}
              aria-disabled={!canAdvanceStep3}
            >
              BUILD MY PROGRAM →
            </button>
          </div>
        </section>
      )}

      {/* ── STEP 4: RESULT ───────────────────────────────────────────────── */}
      {state.step === 4 && bundle && (
        <section aria-label="Step 4: Your feed program prescription">
          <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-ink-quiet)] mb-3">
            STEP 04 OF 04 — YOUR PROGRAM
          </p>
          <PrescriptionPad
            bundle={bundle}
            productNames={productNames}
            productPrices={productPrices}
            className="mb-8"
          />
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => dispatch({ type: 'PREV' })}
              className="px-6 py-3 font-display uppercase tracking-[0.02em] text-body-sm
                border border-[var(--color-rule)] text-[var(--color-ink-quiet)]
                hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]
                transition-colors duration-150
                focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            >
              ← BACK
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: 'RESET' })}
              className="px-6 py-3 font-display uppercase tracking-[0.02em] text-body-sm
                border border-[var(--color-rule)] text-[var(--color-ink-quiet)]
                hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]
                transition-colors duration-150
                focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
            >
              START OVER
            </button>
          </div>
        </section>
      )}

      {/* Edge case: step 4 but no bundle (shouldn't happen with reducer guards) */}
      {state.step === 4 && !bundle && (
        <div className="py-8 text-center">
          <p className="font-mono text-mono-xs tracking-[0.04em] uppercase text-[var(--color-danger)]">
            Unable to find a bundle for this combination. Please call (620) 639-3337.
          </p>
          <button
            type="button"
            onClick={() => dispatch({ type: 'RESET' })}
            className="mt-4 px-6 py-3 font-display uppercase tracking-[0.02em]
              text-body-sm border border-[var(--color-rule)] text-[var(--color-ink-quiet)]
              hover:border-[var(--color-ink)] transition-colors duration-150"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}
