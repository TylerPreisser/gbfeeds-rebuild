// src/types/wizard.ts
// Feed-program wizard state machine types — used by WizardClient.tsx (useReducer).
// RSC-import-safe: no client-only imports.

import type { Region, Season, Goal } from './product';

// Re-export for convenience so wizard consumers only need to import from wizard.ts
export type { Region, Season, Goal };

// ─── Wizard state ───────────────────────────────────────────────────────────

/**
 * Complete state of the feed-program wizard.
 * Steps 1–4:
 *   1. Select region
 *   2. Select season
 *   3. Select goal
 *   4. View prescription pad result
 */
export type WizardState = {
  step: 1 | 2 | 3 | 4;
  region: Region | null;
  season: Season | null;
  goal: Goal | null;
};

/** Initial wizard state — always exported so WizardClient can reset cleanly */
export const WIZARD_INITIAL_STATE: WizardState = {
  step: 1,
  region: null,
  season: null,
  goal: null,
};

// ─── Wizard actions ─────────────────────────────────────────────────────────

export type WizardAction =
  | { type: 'SET_REGION'; region: Region }
  | { type: 'SET_SEASON'; season: Season }
  | { type: 'SET_GOAL'; goal: Goal }
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'RESET' };

// ─── Wizard reducer ─────────────────────────────────────────────────────────

/**
 * Pure reducer for the feed-program wizard.
 * Exported so Vitest can unit-test it without mounting a React component.
 */
export function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'SET_REGION':
      return { ...state, region: action.region };

    case 'SET_SEASON':
      return { ...state, season: action.season };

    case 'SET_GOAL':
      return { ...state, goal: action.goal };

    case 'NEXT': {
      // Advance only if we haven't reached the final step
      const nextStep = (state.step < 4 ? state.step + 1 : state.step) as
        | 1
        | 2
        | 3
        | 4;
      return { ...state, step: nextStep };
    }

    case 'PREV': {
      // Go back only if we're past step 1
      const prevStep = (state.step > 1 ? state.step - 1 : state.step) as
        | 1
        | 2
        | 3
        | 4;
      return { ...state, step: prevStep };
    }

    case 'RESET':
      return WIZARD_INITIAL_STATE;

    default:
      // TypeScript exhaustiveness check
      return state;
  }
}
