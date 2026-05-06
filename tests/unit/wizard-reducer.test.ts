import { describe, it, expect } from 'vitest';
import { wizardReducer, WIZARD_INITIAL_STATE } from '@/types/wizard';
import type { WizardState } from '@/types/wizard';

describe('wizardReducer', () => {
  it('starts at step 1 with all fields null', () => {
    expect(WIZARD_INITIAL_STATE).toEqual({
      step: 1,
      region: null,
      season: null,
      goal: null,
    });
  });

  it('SET_REGION updates region without advancing step', () => {
    const next = wizardReducer(WIZARD_INITIAL_STATE, { type: 'SET_REGION', region: 'kansas' });
    expect(next.region).toBe('kansas');
    expect(next.step).toBe(1);
    expect(next.season).toBeNull();
    expect(next.goal).toBeNull();
  });

  it('SET_SEASON updates season', () => {
    const state: WizardState = { ...WIZARD_INITIAL_STATE, region: 'kansas' };
    const next = wizardReducer(state, { type: 'SET_SEASON', season: 'rut' });
    expect(next.season).toBe('rut');
    expect(next.region).toBe('kansas');
  });

  it('SET_GOAL updates goal', () => {
    const state: WizardState = {
      step: 3,
      region: 'kansas',
      season: 'rut',
      goal: null,
    };
    const next = wizardReducer(state, { type: 'SET_GOAL', goal: 'trophy' });
    expect(next.goal).toBe('trophy');
  });

  it('NEXT advances step from 1 to 2', () => {
    const next = wizardReducer(WIZARD_INITIAL_STATE, { type: 'NEXT' });
    expect(next.step).toBe(2);
  });

  it('NEXT does not advance past step 4', () => {
    const state: WizardState = { step: 4, region: 'kansas', season: 'rut', goal: 'trophy' };
    const next = wizardReducer(state, { type: 'NEXT' });
    expect(next.step).toBe(4);
  });

  it('PREV does not go below step 1', () => {
    const next = wizardReducer(WIZARD_INITIAL_STATE, { type: 'PREV' });
    expect(next.step).toBe(1);
  });

  it('RESET returns to initial state', () => {
    const dirty: WizardState = { step: 4, region: 'south', season: 'rut', goal: 'density' };
    const next = wizardReducer(dirty, { type: 'RESET' });
    expect(next).toEqual(WIZARD_INITIAL_STATE);
  });
});
